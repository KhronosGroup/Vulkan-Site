# VK_KHR_fragment_shading_rate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_fragment_shading_rate.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_fragment_shading_rate](#VK_KHR_fragment_shading_rate)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_fragment_shading_rate - device extension

**Name String**

`VK_KHR_fragment_shading_rate`

**Extension Type**

Device extension

**Registered Extension Number**

227

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

* 
Interacts with VK_KHR_format_feature_flags2

**SPIR-V Dependencies**

* 
[SPV_KHR_fragment_shading_rate](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_fragment_shading_rate.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_fragment_shading_rate] @tobski%0A*Here describe the issue or question you have about the VK_KHR_fragment_shading_rate extension*)

**Extension Proposal**

[VK_KHR_fragment_shading_rate](../../../../features/latest/features/proposals/VK_KHR_fragment_shading_rate.html)

**Last Modified Date**

2021-09-30

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_fragment_shading_rate`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_fragment_shading_rate.txt)

**Contributors**

* 
Tobias Hector, AMD

* 
Guennadi Riguer, AMD

* 
Matthaeus Chajdas, AMD

* 
Pat Brown, Nvidia

* 
Matthew Netsch, Qualcomm

* 
Slawomir Grajewski, Intel

* 
Jan-Harald Fredriksen, Arm

* 
Jeff Bolz, Nvidia

* 
Arseny Kapoulkine, Roblox

* 
Contributors to the VK_NV_shading_rate_image specification

* 
Contributors to the VK_EXT_fragment_density_map specification

This extension adds the ability to change the rate at which fragments are
shaded.
Rather than the usual single fragment invocation for each pixel covered by a
primitive, multiple pixels can be shaded by a single fragment shader
invocation.

Up to three methods are available to the application to change the fragment
shading rate:

* 
[Pipeline Fragment Shading Rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-pipeline), which allows the
specification of a rate per-draw.

* 
[Primitive Fragment Shading Rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-primitive), which allows the
specification of a rate per primitive, specified during shading.

* 
[Attachment Fragment Shading Rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-attachment), which allows the
specification of a rate per-region of the framebuffer, specified in a
specialized image attachment.

Additionally, these rates can all be specified and combined in order to
adjust the overall detail in the image at each point.

This functionality can be used to focus shading efforts where higher levels
of detail are needed in some parts of a scene compared to others.
This can be particularly useful in high resolution rendering, or for XR
contexts.

This extension also adds support for the `SPV_KHR_fragment_shading_rate`
extension which enables setting the
[primitive fragment shading rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-primitive), and allows querying the final shading rate from a fragment shader.

* 
[vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html)

* 
[vkGetPhysicalDeviceFragmentShadingRatesKHR](vkGetPhysicalDeviceFragmentShadingRatesKHR.html)

* 
[VkPhysicalDeviceFragmentShadingRateKHR](VkPhysicalDeviceFragmentShadingRateKHR.html)

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceFragmentShadingRateFeaturesKHR](VkPhysicalDeviceFragmentShadingRateFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentShadingRatePropertiesKHR](VkPhysicalDeviceFragmentShadingRatePropertiesKHR.html)

Extending [VkSubpassDescription2](VkSubpassDescription2.html):

* 
[VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkRenderingInfo](VkRenderingInfo.html):

[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html)

* 
[VkFragmentShadingRateCombinerOpKHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
`VK_KHR_FRAGMENT_SHADING_RATE_EXTENSION_NAME`

* 
`VK_KHR_FRAGMENT_SHADING_RATE_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](VkAccessFlagBits.html)

Extending [VkDynamicState](VkDynamicState.html):

* 
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_SHADING_RATE_STATE_CREATE_INFO_KHR](VkStructureType.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits2.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2020-05-06 (Tobias Hector)

Initial revision

Revision 2, 2021-09-30 (Jon Leech)

* 
Add interaction with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)` to `vk.xml`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_fragment_shading_rate).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
