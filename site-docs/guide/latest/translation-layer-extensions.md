# Translation Layer Extensions

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/extensions/translation_layer_extensions.html

## Table of Contents

- [VK_EXT_custom_border_color](#VK_EXT_custom_border_color)
- [VK_EXT_border_color_swizzle](#VK_EXT_border_color_swizzle)
- [VK_EXT_depth_clip_enable](#VK_EXT_depth_clip_enable)
- [VK_EXT_depth_clip_control](#VK_EXT_depth_clip_control)
- [VK_EXT_provoking_vertex](#VK_EXT_provoking_vertex)
- [VK_EXT_transform_feedback](#VK_EXT_transform_feedback)
- [VK_EXT_image_view_min_lod](#VK_EXT_image_view_min_lod)

## Content

There is a class of extensions that were only created to allow efficient ways for [translation layers](../portability_initiative.html#translation-layer) to map to Vulkan.

This includes replicating legacy behavior that is challenging for drivers to implement efficiently. This functionality is **not** considered forward looking, and is **not** expected to be promoted to a KHR extension or to core Vulkan.

Unless this is needed for translation, it is **highly recommended** that developers use alternative techniques of using the GPU to achieve the same functionality.

Vulkan provides a transparent black, opaque black, and opaque white `VkBorderColor` for `VkSampler` objects in the core spec. Both OpenGL and D3D have the option to set the sampler border to be a custom color.

After the publication of `VK_EXT_custom_border_color`, it was discovered that some implementations had undefined behavior when combining a sampler that uses a custom border color with image views whose component mapping is not the identity mapping.

The depth clip enable functionality is specified differently from D3D11 and Vulkan. Instead of `VkPipelineRasterizationStateCreateInfo::depthClampEnable`, D3D11 has [DepthClipEnable (D3D12_RASTERIZER_DESC)](https://docs.microsoft.com/en-us/windows/win32/api/d3d11/ns-d3d11-d3d11_rasterizer_desc), which only affects the viewport clip of depth values before rasterization and does not affect the depth clamp that always occurs in the output merger stage of the D3D11 graphics pipeline.

The depth clip control functionality allows the application to use the OpenGL depth range in NDC. In OpenGL it is `[-1, 1]` as opposed to Vulkan’s default of `[0, 1]`. Support for clip control was supported in OpenGL via the [ARB_clip_control](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_clip_control.txt) extension.

More info in the [depth chapter](../depth.html#user-defined-clipping-and-culling)

Vulkan’s defaults convention for provoking vertex is “first vertex” while OpenGL’s defaults convention is “last vertex”.

Everything needed for transform feedback can be done via a compute shader in Vulkan.

This extension provides an API-side version of the `MinLod` SPIR-V qualifier.
The new value is associated with the image view, and is
intended to match D3D12’s SRV ResourceMinLODClamp parameter.
Using MinLod and similar functionality is primarily intended for sparse texturing since higher resolution mip levels can be paged in and out on demand.
There are many ways to achieve a similar clamp in Vulkan. A `VkImageView` can clamp the base level, but a `MinLod` can also clamp to a fractional LOD
and does not have to modify the base texture dimension, which might simplify some algorithms. `VkSampler`​s can also clamp to fractional LOD, but
using many unique samplers for this purpose might not be practical.
