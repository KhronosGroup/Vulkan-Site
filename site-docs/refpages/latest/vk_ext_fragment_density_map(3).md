# VK_EXT_fragment_density_map(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_fragment_density_map.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_fragment_density_map](#VK_EXT_fragment_density_map)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Examples](#_examples)
- [Fragment Density Map](#_fragment_density_map)
- [Fragment_Density_Map](#_fragment_density_map)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_fragment_density_map - device extension

**Name String**

`VK_EXT_fragment_density_map`

**Extension Type**

Device extension

**Registered Extension Number**

219

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

* 
Interacts with VK_KHR_format_feature_flags2

**SPIR-V Dependencies**

* 
[SPV_EXT_fragment_invocation_density](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_fragment_invocation_density.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_fragment_density_map] @mnetsch%0A*Here describe the issue or question you have about the VK_EXT_fragment_density_map extension*)

**Last Modified Date**

2025-05-20

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_fragment_invocation_density`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_fragment_invocation_density.txt)

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Robert VanReenen, Qualcomm Technologies, Inc.

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

* 
Tate Hornbeck, Qualcomm Technologies, Inc.

* 
Sam Holmes, Qualcomm Technologies, Inc.

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Jan-Harald Fredriksen, ARM

* 
Jeff Bolz, NVIDIA

* 
Pat Brown, NVIDIA

* 
Daniel Rakos, AMD

* 
Piers Daniell, NVIDIA

This extension allows an application to specify areas of the render target
where the fragment shader may be invoked fewer times.
These fragments are broadcasted out to multiple pixels to cover the render
target.

The primary use of this extension is to reduce workloads in areas where
lower quality may not be perceived such as the distorted edges of a lens or
the periphery of a user’s gaze.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentDensityMapFeaturesEXT](VkPhysicalDeviceFragmentDensityMapFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentDensityMapPropertiesEXT](VkPhysicalDeviceFragmentDensityMapPropertiesEXT.html)

Extending [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html):

* 
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkRenderingInfo](VkRenderingInfo.html):

[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)

* 
`VK_EXT_FRAGMENT_DENSITY_MAP_EXTENSION_NAME`

* 
`VK_EXT_FRAGMENT_DENSITY_MAP_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkFormatFeatureFlagBits.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html)

Extending [VkImageViewCreateFlagBits](VkImageViewCreateFlagBits.html):

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

Extending [VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html):

* 
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html)

* 
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](VkSamplerCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_CREATE_INFO_EXT](VkStructureType.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_FRAGMENT_DENSITY_MAP_BIT_EXT](VkFormatFeatureFlagBits2.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_INFO_EXT](VkStructureType.html)

* 
[`FragInvocationCountEXT`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-fraginvocationcount)

* 
[`FragSizeEXT`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-fragsize)

* 
[    `FragmentDensityEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentDensityEXT)

An image can be bound as a fragment density map attachment to a render pass.
This image contains normalized (x, y) float component fragment density
values for regions of the framebuffer that will be used in rasterization for
every subpass.
A float component ranges from (0.0, 1.0] where 1.0 means full density along
that axis.
Implementations [use these values as hints](../../../../spec/latest/chapters/fragmentdensitymapops.html#fragmentdensitymapops) to
optimize rendering in areas of low density.
Subpass color and depth attachments can be created as subsampled, which can
help to further optimize rendering in areas of low density.

The density map image can be modified by the application until calling
`vkCmdBeginRenderPass` for the render pass that uses the image.
If [VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html) is used,
then the application can modify the image until the device reads it during
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html).

// Create fragment density map
VkImageCreateInfo imageCreateInfo =
{
   .sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,
   .pNext = nullptr,
   .flags = 0,
   .imageType = VK_IMAGE_TYPE_2D,    // Must be 2D
   .format = VK_FORMAT_R8G8_UNORM,   // Must have VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT
   .extend = {64, 64, 1},
   .mipLevels = 1,
   .arrayLayers = 2,                 // 1 for each multiview view
   .samples = VK_SAMPLE_COUNT_1_BIT, // Must be 1x MSAA
   .tiling = tiling,
   .usage = VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT,
   // ...
};

vkCreateImage(device, &imageCreateInfo, nullptr, &fdmImage);

VkImageViewCreateInfo viewCreateInfo =
{
   .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO,
   .pNext = nullptr,
   .flags = 0,                      // VkImageViewCreateFlags
   .image = fdmImage,
   .viewType = VK_IMAGE_VIEW_TYPE_2D_ARRAY,
   .format = VK_FORMAT_R8G8_UNORM,
   .components = { 0 },             // VK_COMPONENT_SWIZZLE_IDENTITY
   .subresourceRange = {
        .aspectMask = VK_IMAGE_ASPECT_COLOR_BIT,
        .baseMipLevel = 0,
        .levelCount = 1,
        .baseArrayLayer = 0,
        .layerCount = 2,
   }
};

vkCreateImageView(device, &viewCreateInfo, nullptr, &fdmImageView);

// Add fdmImage to render pass

VkAttachmentReference fragmentDensityMapAttachmentReference =
{
   fdmAttachmentIdx,
   VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT,
};

VkRenderPassFragmentDensityMapCreateInfoEXT fdmAttachmentCreateInfo =
{
   VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_CREATE_INFO_EXT,
   // ...
   fragmentDensityMapAttachmentReference,
};

VkRenderPassCreateInfo2 renderPassCreateInfo =
{
   VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2,
   &fdmAttachmentCreateInfo,
   // ...
};

vkCreateRenderPass2(device, &renderPassCreateInfo, nullptr, &renderPass);

// Add fdmImage to framebuffer
// Color and depth attachments can be created with
// VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT
VkFramebufferCreateInfo framebufferCreateInfo =
{
   .sType = VK_STRUCTURE_TYPE_FRAME_BUFFER_CREATE_INFO,
   // ...
   .renderPass = renderPass,
   // ...
   .pAttachments = pAttachments, // Includes fdmImageView at fdmAttachmentIdx
   .width = 1024,
   .height = 1024,
   .layers = 1
};

vkCreateFramebuffer(device, &framebufferCreateInfo, nullptr, &framebuffer);

// Start recording render pass in command buffer

VkRenderPassBeginInfo renderPassBeginInfo =
{
   .sType = VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO,
   // ...
   .renderPass = renderPass,
   .framebuffer = framebuffer,
   // ...
};

// Can no longer modify the fdmImage's contents after this call
vkCmdBeginRenderPass2(commandBuffer, &renderPassBeginInfo, pSubpassBeginInfo);

* 
Revision 1, 2018-09-25 (Matthew Netsch)

Initial version

Revision 2, 2021-09-30 (Jon Leech)

* 
Add interaction with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)` to `vk.xml`

Revision 3, 2025-05-20 (Matthew Netsch)

* 
Fixes fragmentDensityTexelSize calculation equation

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
