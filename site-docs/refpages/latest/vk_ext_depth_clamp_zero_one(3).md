# VK_EXT_depth_clamp_zero_one(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_depth_clamp_zero_one.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_depth_clamp_zero_one](#VK_EXT_depth_clamp_zero_one)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_depth_clamp_zero_one](#_promotion_to_vk_khr_depth_clamp_zero_one)
- [Promotion_to_VK_KHR_depth_clamp_zero_one](#_promotion_to_vk_khr_depth_clamp_zero_one)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_depth_clamp_zero_one - device extension

**Name String**

`VK_EXT_depth_clamp_zero_one`

**Extension Type**

Device extension

**Registered Extension Number**

422

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_depth_clamp_zero_one](VK_KHR_depth_clamp_zero_one.html)
extension

**Contact**

* 
Graeme Leese [gnl21](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_depth_clamp_zero_one] @gnl21%0A*Here describe the issue or question you have about the VK_EXT_depth_clamp_zero_one extension*)

**Last Modified Date**

2021-07-29

**Contributors**

* 
Graeme Leese, Broadcom

This extension gives defined behavior to fragment depth values which end up
outside the conventional [0, 1] range.
It can be used to ensure portability in edge cases of features like
depthBias.
The particular behavior is chosen to match OpenGL to aid porting or
emulation.

All functionality in this extension is included in
`[VK_KHR_depth_clamp_zero_one](VK_KHR_depth_clamp_zero_one.html)`, with the suffix change to KHR.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDepthClampZeroOneFeaturesEXT](VkPhysicalDeviceDepthClampZeroOneFeaturesKHR.html)

* 
`VK_EXT_DEPTH_CLAMP_ZERO_ONE_EXTENSION_NAME`

* 
`VK_EXT_DEPTH_CLAMP_ZERO_ONE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_ZERO_ONE_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2021-07-29 (Graeme Leese)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_depth_clamp_zero_one).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
