# Run-time mip-map generation with Vulkan-Hpp

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/api/hpp_texture_mipmap_generation/README.html

## Table of Contents

- [Overview](#_overview)
- [Comparison](#_comparison)
- [Requirements](#_requirements)
- [Points of interest](#_points_of_interest)
- [Points_of_interest](#_points_of_interest)
- [Image setup](#_image_setup)
- [Upload base mip level](#_upload_base_mip_level)
- [Upload_base_mip_level](#_upload_base_mip_level)
- [Prepare base mip level](#_prepare_base_mip_level)
- [Prepare_base_mip_level](#_prepare_base_mip_level)
- [Generating the mip-chain](#_generating_the_mip_chain)
- [Generating_the_mip-chain](#_generating_the_mip_chain)
- [Final image layout transitions](#_final_image_layout_transitions)
- [Final_image_layout_transitions](#_final_image_layout_transitions)
- [Image View creation](#_image_view_creation)
- [Image_View_creation](#_image_view_creation)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/hpp_texture_mipmap_generation). |
| --- | --- |

|  | A transcoded version of the API sample [Texture mipmap generation](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/texture_mipmap_generation) that illustrates the usage of the C++ bindings of vulkan provided by vulkan.hpp. |
| --- | --- |

Generates a complete texture mip-chain at runtime from a base image using image blits and proper image barriers.

This examples demonstrates how to generate a complete texture mip-chain at runtime instead of loading offline generated mip-maps from a texture file.

While usually not applied for textures stored on the disk (that usually have the mips generated offline and stored in the file) this technique is often used for dynamic textures like cubemaps for reflections or other render-to-texture effects.

Having mip-maps for runtime generated textures offers lots of benefits, both in terms of image stability and performance.
Without mip mapping the image will become noisy, especially with high frequency textures (and texture components like specular) and using mip mapping will result in higher performance due to caching.

Though this example only generates one mip-chain for a single texture at the beginning this technique can also be used during normal frame rendering to generate mip-chains for dynamic textures.

Some GPUs also offer `asynchronous transfer queues` that may be used for doing such operations in the background.
To detect this, check for queue families with only the  `vk::QueueFlagBits::eTransfer` set.

Without mip mapping:

![Off](../../../_images/samples/api/texture_mipmap_generation/images/mip_mapping_off.jpg)

Using mip mapping with a bilinear filter:

![Bilinear](../../../_images/samples/api/texture_mipmap_generation/images/mip_mapping_bilinear.jpg)

Using mip mapping with an anisotropic filter:

![Anisotropic](../../../_images/samples/api/texture_mipmap_generation/images/mip_mapping_anisotropic.jpg)

To downsample from one mip level to the next, we will be using [`vk::CommandBuffer::blitImage`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCmdBlitImage.html).
This requires the format used to support the `vk::FormatFeatureFlagBits::eBlitSrc` and the  `vk::FormatFeatureFlagBits::eBlitDst` flags.
If these are not supported, the image format can’t be used to blit and you’d either have to choose a different format or use a custom shader to generate mip levels.
The example uses the `vk::Format::eR8G8B8A8Srgb` that should support these flags on most implementations.

***Note:*** Use [`vk::PhysicalDevice::getFormatProperties`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetPhysicalDeviceFormatProperties.html) to check if the format supports the blit flags first.

Even though we’ll only upload the first mip level initially, we create the image with number of desired mip levels.
The following formula is used to calculate the number of mip levels based on the max.
image extent:

texture.mip_levels = static_cast(floor(log2(std::max(texture.width, texture.height))) + 1);

This is then passed to the image create info:

vk::ImageCreateInfo image_create_info({},
                                      vk::ImageType::e2D,
                                      format,
                                      vk::Extent3D(texture.extent, 1),
                                      texture.mip_levels,
...

Setting the number of desired mip levels is necessary as this is used for allocating the correct amount of memory required by the image (`vk::Device::allocateMemory`).

Before generating the mip-chain we need to copy the image data loaded from disk into the newly generated image.
This image will be the base for our mip-chain:

vk::BufferImageCopy buffer_copy_region({}, {}, {}, {vk::ImageAspectFlagBits::eColor, 0, 0, 1}, {}, vk::Extent3D(texture.extent, 1));
copy_command.copyBufferToImage(staging_buffer, texture.image, vk::ImageLayout::eTransferDstOptimal, buffer_copy_region);

As we are going to blit ***from*** the base mip-level just uploaded we also need to insert an image memory barrier that transitions the image layout to `vk::ImageLayout::eTransferSrcOptimal` for the base mip level:

image_memory_barrier = vk::ImageMemoryBarrier(vk::AccessFlagBits::eTransferWrite,
                                              vk::AccessFlagBits::eTransferRead,
                                              vk::ImageLayout::eTransferDstOptimal,
                                              vk::ImageLayout::eTransferSrcOptimal,
                                              VK_QUEUE_FAMILY_IGNORED,
                                              VK_QUEUE_FAMILY_IGNORED,
                                              texture.image,
                                              {vk::ImageAspectFlagBits::eColor, 0, 1, 0, 1});
copy_command.pipelineBarrier(vk::PipelineStageFlagBits::eTransfer, vk::PipelineStageFlagBits::eTransfer, {}, {}, {}, image_memory_barrier);

There are two different ways of generating the mip-chain.
The first one is to blit down the whole mip-chain from level n-1 to n, the other way would be to always use the base image and blit down from that to all levels.
This example uses the first one.

***Note:*** Blitting (same for copying) images is done inside of a command buffer that has to be submitted and as such has to be synchronized before using the new image with e.g.
a `vk::Fence`.

We simply loop over all remaining mip levels (level 0 was loaded from disk) and prepare a `vk::ImageBlit` structure for each blit from mip level i-1 to level i.

First the source for our blit.
This is the previous mip level:

for (int32_t i = 1; i > (i - 1)), int32_t(texture.extent.height >> (i - 1)), int32_t(1)}}},
                           // Destination
                           {vk::ImageAspectFlagBits::eColor, i, 0, 1},
                           {{{}, {int32_t(texture.extent.width >> i), int32_t(texture.extent.height >> i), int32_t(1)}}});
}

Before we can blit to this mip level, we need to transition it’s image layout to `vk::ImageLayout::eTransferDstOptimal`:

// Prepare current mip level as image blit destination
  image_memory_barrier = vk::ImageMemoryBarrier({},
                                                vk::AccessFlagBits::eTransferWrite,
                                                vk::ImageLayout::eUndefined,
                                                vk::ImageLayout::eTransferDstOptimal,
                                                VK_QUEUE_FAMILY_IGNORED,
                                                VK_QUEUE_FAMILY_IGNORED,
                                                texture.image,
                                                {vk::ImageAspectFlagBits::eColor, i, 1, 0, 1});
  copy_command.pipelineBarrier(vk::PipelineStageFlagBits::eTransfer, vk::PipelineStageFlagBits::eTransfer, {}, {}, {}, image_memory_barrier);

Note that we set the `baseMipLevel` of the subresource range to `i`, so the image memory barrier will only affect the one mip level we want to copy to.

Now that the mip level we want to copy from and the one we’ll copy to are in the proper layout (transfer source and destination) we can issue the [`vk::CommandBuffer::blitImage`](https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCmdBlitImage.html) to copy from mip level (i-1) to mip level (i):

  blit_command.blitImage(texture.image, vk::ImageLayout::eTransferSrcOptimal, texture.image, vk::ImageLayout::eTransferDstOptimal, image_blit, vk::Filter::eLinear);

`vk::CommandBuffer::blitImage` does the down sampling from mip level (i-1) to mip level (i) using a linear filter, if you need better or more advanced filtering for this you need to resort to using custom shaders for generating the mip chain instead of blitting.

After the blit is done we can use this mip level as a base for the next level, so we transition the layout from `vk::ImageLayout::eTransferDstOptimal` to `vk::ImageLayout::eTransferSrcOptimal` so we can use this level as transfer source for the next level:

  image_memory_barrier = vk::ImageMemoryBarrier(vk::AccessFlagBits::eTransferWrite,
                                                vk::AccessFlagBits::eTransferRead,
                                                vk::ImageLayout::eTransferDstOptimal,
                                                vk::ImageLayout::eTransferSrcOptimal,
                                                VK_QUEUE_FAMILY_IGNORED,
                                                VK_QUEUE_FAMILY_IGNORED,
                                                texture.image,
                                                {vk::ImageAspectFlagBits::eColor, i, 1, 0, 1});
  copy_command.pipelineBarrier(vk::PipelineStageFlagBits::eTransfer, vk::PipelineStageFlagBits::eTransfer, {}, {}, {}, image_memory_barrier);
}

Once the loop is done we need to transition all mip levels of the image to their actual usage layout, which is `vk::ImageLayout::eShaderReadOnlyOptimal` for this example.

Note that after the loop above all levels will be in the `vk::ImageLayout::eTransferSrcOptimal` layout allowing us to transfer the whole image with a single barrier:

image_memory_barrier = vk::ImageMemoryBarrier(vk::AccessFlagBits::eTransferRead,
                                              vk::AccessFlagBits::eShaderRead,
                                              vk::ImageLayout::eTransferSrcOptimal,
                                              vk::ImageLayout::eShaderReadOnlyOptimal,
                                              VK_QUEUE_FAMILY_IGNORED,
                                              VK_QUEUE_FAMILY_IGNORED,
                                              texture.image,
                                              {vk::ImageAspectFlagBits::eColor, 0, texture.mip_levels, 0, 1});
copy_command.pipelineBarrier(vk::PipelineStageFlagBits::eTransfer, vk::PipelineStageFlagBits::eFragmentShader, {}, {}, {}, image_memory_barrier);

Submitting that command buffer will result in an image with a complete mip-chain and all mip levels being transitioned to the proper image layout for shader reads.

The Image View also requires information about how many Mip Levels are used.
This is specified in the `vk::ImageViewCreateInfo.subresourceRange.levelCount` field.

vk::ImageViewCreateInfo image_view_create_info({},
                                               texture.image,
                                               vk::ImageViewType::e2D,
                                               format,
                                               {vk::ComponentSwizzle::eR, vk::ComponentSwizzle::eG, vk::ComponentSwizzle::eB, vk::ComponentSwizzle::eA},
                                               {vk::ImageAspectFlagBits::eColor, 0, texture.mip_levels, 0, 1});
texture.view = get_device()->get_handle().createImageView(image_view_create_info);
