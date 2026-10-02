# VK_KHR_maintenance10(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance10.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance10](#VK_KHR_maintenance10)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance10 - device extension

**Name String**

`VK_KHR_maintenance10`

**Extension Type**

Device extension

**Registered Extension Number**

631

**Revision**

1

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
Interacts with VK_VERSION_1_4

* 
Interacts with VK_KHR_copy_commands2

* 
Interacts with VK_KHR_dynamic_rendering

* 
Interacts with VK_KHR_dynamic_rendering_local_read

* 
Interacts with VK_KHR_format_feature_flags2

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance10] @zmike%0A*Here describe the issue or question you have about the VK_KHR_maintenance10 extension*)

**Extension Proposal**

[VK_KHR_maintenance10](../../../../features/latest/features/proposals/VK_KHR_maintenance10.html)

**Last Modified Date**

2025-05-13

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)`

* 
This extension interacts with `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)`

* 
This extension interacts with
`[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html)`

* 
This extension interacts with `[VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html)`

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Piers Daniell, NVIDIA

* 
Hans-Kristian Arntzen, Valve

[VK_KHR_maintenance10](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The new features are as follows:

* 
New image format feature bits that indicate support for copying depth or
stencil aspects using non-graphics queue families

* 
If [vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html) is called with `pSampleMask` set to
`NULL`, it is treated as if the mask has all bits set to `1`.

* 
Add vkCmdEndRendering2KHR as an extensible version of vkCmdEndRendering

* 
Add input attachment information to dynamic rendering

* 
Require that vertex inputs follow sRGB encoding when those formats are
used, instead of being underspecified.

* 
Add a query to determine if sRGB images are resolved in nonlinear or
linear space by default

* 
Add an optional feature to allow applications to override the default
sRGB resolve behavior

* 
Add resolve mode and depth-stencil resolve support to
`vkCmdResolveImage2` to bring it in-line with render pass attachment
resolves

* 
[vkCmdEndRendering2KHR](vkCmdEndRendering2KHR.html)

* 
[VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance10FeaturesKHR](VkPhysicalDeviceMaintenance10FeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMaintenance10PropertiesKHR](VkPhysicalDeviceMaintenance10PropertiesKHR.html)

Extending [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html):

* 
[VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html)

Extending [VkResolveImageInfo2](VkResolveImageInfo2.html):

* 
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)

* 
[VkRenderingAttachmentFlagBitsKHR](VkRenderingAttachmentFlagBitsKHR.html)

* 
[VkResolveImageFlagBitsKHR](VkResolveImageFlagBitsKHR.html)

* 
[VkRenderingAttachmentFlagsKHR](VkRenderingAttachmentFlagsKHR.html)

* 
[VkResolveImageFlagsKHR](VkResolveImageFlagsKHR.html)

* 
`VK_KHR_MAINTENANCE_10_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_10_SPEC_VERSION`

* 
Extending [VkAttachmentDescriptionFlagBits](VkAttachmentDescriptionFlagBits.html):

[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)

* 
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_FLAGS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_END_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RESOLVE_IMAGE_MODE_INFO_KHR](VkStructureType.html)

If [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) or [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html) and [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkRenderingAttachmentFlagBitsKHR](VkRenderingAttachmentFlagBitsKHR.html):

[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)

Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

* 
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_copy_commands2](VK_KHR_copy_commands2.html) is supported:

* 
Extending [VkResolveImageFlagBitsKHR](VkResolveImageFlagBitsKHR.html):

[VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html)

* 
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkRenderingAttachmentFlagBitsKHR](VkRenderingAttachmentFlagBitsKHR.html):

[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)

* 
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)

None.

* 
Revision 1, 2025-05-13 (Mike Blumenkrantz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance10).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
