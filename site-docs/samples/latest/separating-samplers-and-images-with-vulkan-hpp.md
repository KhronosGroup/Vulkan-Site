# Separating samplers and images with Vulkan-Hpp

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/api/hpp_separate_image_sampler/README.html

## Table of Contents

- [In the application](#_in_the_application)
- [In_the_application](#_in_the_application)
- [In the shader](#_in_the_shader)
- [In_the_shader](#_in_the_shader)
- [Comparison with combined image samplers](#_comparison_with_combined_image_samplers)
- [Comparison_with_combined_image_samplers](#_comparison_with_combined_image_samplers)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/hpp_separate_image_sampler). |
| --- | --- |

|  | A transcoded version of the API sample [Separate image sampler](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/separate_image_sampler) that illustrates the usage of the C++ bindings of vulkan provided by vulkan.hpp. |
| --- | --- |

This tutorial, along with the accompanying example code, shows how to separate samplers and images in a Vulkan application.
Opposite to combined image and samplers, this allows the application to freely mix an arbitrary set of samplers and images in the shader.

In the sample code, a single image and multiple samplers with different options will be created.
The sampler to be used for sampling the image can then be selected at runtime.
As image and sampler objects are separated, this only requires selecting a different descriptor at runtime.

From the application’s point of view, images and samplers are always created separately.
Access to the image is done via the image’s `vk::ImageView`.
Samplers are created using a `vk::Sampler` object, specifying how an image will be sampled.

The difference between separating and combining them starts at the descriptor level, which defines how the shader accesses the samplers and images.

A separate setup uses a descriptor of type `vk::DescriptorType::eSampledImage` for the sampled image, and a `vk::DescriptorType::eSampler` for the sampler, separating the image and sampler object:

// Image info only references the image
vk::DescriptorImageInfo image_info({}, texture.image->get_vk_image_view().get_handle(), vk::ImageLayout::eShaderReadOnlyOptimal);

// Sampled image descriptor
vk::WriteDescriptorSet image_write_descriptor_set(base_descriptor_set, 1, 0, vk::DescriptorType::eSampledImage, image_info);

// One set for the sampled image
std::array write_descriptor_sets = {{
	{base_descriptor_set, 0, 0, vk::DescriptorType::eUniformBuffer, {}, buffer_descriptor},        // Binding 0 : Vertex shader uniform buffer
	image_write_descriptor_set                                                                     // Binding 1 : Fragment shader sampled image
}};
get_device()->get_handle().updateDescriptorSets(write_descriptor_sets, {});

For this sample, we then create two samplers with different filtering options:

// Sets for each of the sampler
descriptor_set_alloc_info.pSetLayouts = &sampler_descriptor_set_layout;
for (size_t i = 0; i get_handle().allocateDescriptorSets(descriptor_set_alloc_info).front();

	// Descriptor info only references the sampler
	vk::DescriptorImageInfo sampler_info(samplers[i]);

	vk::WriteDescriptorSet sampler_write_descriptor_set(sampler_descriptor_sets[i], 0, 0, vk::DescriptorType::eSampler, sampler_info);

	get_device()->get_handle().updateDescriptorSets(sampler_write_descriptor_set, {});
}

At draw-time, the descriptor containing the sampled image is bound to set 0 and the descriptor for the currently selected sampler is bound to set 1:

// Bind the uniform buffer and sampled image to set 0
draw_cmd_buffers[i].bindDescriptorSets(vk::PipelineBindPoint::eGraphics, pipeline_layout, 0, base_descriptor_set, {});
// Bind the selected sampler to set 1
draw_cmd_buffers[i].bindDescriptorSets(vk::PipelineBindPoint::eGraphics, pipeline_layout, 1, sampler_descriptor_sets[selected_sampler], {});
...
draw_cmd_buffers[i].drawIndexed(index_count, 1, 0, 0, 0);

There are no changes in the shader code to get it working with vulkan.hpp.
With the above setup, the shader interface for the fragment shader also separates the sampler and image as two distinct uniforms:

layout (set = 0, binding = 1) uniform texture2D _texture;
layout (set = 1, binding = 0) uniform sampler _sampler;

To sample from the image referenced by `_texture`, with the currently set sampler in '_sampler', we create a sampled image in the fragment shader at runtime using the `sampler2D` function.

void main()
{
    vec4 color = texture(sampler2D(_texture, _sampler), inUV);
}

For reference, a combined image and sampler setup would differ for both the application and the shader.
The app would use a single descriptor of type `VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER`, and set both image and sampler related values in the descriptor:

// Descriptor info references image and sampler
vk::DescriptorImageInfo image_info(texture.sampler, texture.view, texture.image_layout);

vk::WriteDescriptorSet image_write_descriptor_set(descriptor_set, 1, {}, vk::DescriptorType::eCombinedImageSampler, image_info);

The shader interface only uses one uniform for accessing the combined image and sampler and also doesn’t construct a `sampler2D` at runtime:

layout (binding = 1) uniform sampler2D _combined_image;

void main()
{
    vec4 color = texture(_combined_image, inUV);
}

Compared to the separated setup, changing a sampler in this setup would either require creating multiple descriptors with each image/sampler combination or rebuilding the descriptor.
