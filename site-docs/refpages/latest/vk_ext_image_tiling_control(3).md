# VK_EXT_image_tiling_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_tiling_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_tiling_control](#VK_EXT_image_tiling_control)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_image_tiling_control - device extension

**Name String**

`VK_EXT_image_tiling_control`

**Extension Type**

Device extension

**Registered Extension Number**

688

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Noah Fredriks [noahf](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_tiling_control] @noahf%0A*Here describe the issue or question you have about the VK_EXT_image_tiling_control extension*)

**Extension Proposal**

[VK_EXT_image_tiling_control](../../../../features/latest/features/proposals/VK_EXT_image_tiling_control.html)

**Last Modified Date**

2026-06-19

**Interactions and External Dependencies**

* 
Interacts with [VK_KHR_maintenance4](VK_KHR_maintenance4.html)

* 
Interacts with [VK_KHR_maintenance5](VK_KHR_maintenance5.html)

* 
Interacts with [VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html)

**IP Status**

No known IP claims.

**Contributors**

* 
Noah Fredriks, AMD

* 
Stu Smith, AMD

* 
Tobias Hector, AMD

* 
Hans-Kristian Arntzen, Valve

* 
Ralph Potter, Samsung

* 
James Jones, NVIDIA

* 
Lionel Landwerlin, Intel

* 
Daniel Story, Nintendo

This extension provides per-image selection of optimal tiling arrangements
by extending [VkImageCreateInfo](VkImageCreateInfo.html) with
[VkImageTilingControlCreateInfoEXT](VkImageTilingControlCreateInfoEXT.html) when multiple arrangements are
supported by the implementation.

[VK_IMAGE_TILING_CONTROL_DEFAULT_EXT](VkImageTilingControlEXT.html) **can** be set to use the tiling
arrangement that is the same selection as with the
[VkImageTilingControlCreateInfoEXT](VkImageTilingControlCreateInfoEXT.html) structure omitted.

[VK_IMAGE_TILING_CONTROL_MIN_SIZE_EXT](VkImageTilingControlEXT.html) **can** be set to minimize memory
size requirements with reduced consideration for memory access performance.

[VK_IMAGE_TILING_CONTROL_MAX_PERFORMANCE_EXT](VkImageTilingControlEXT.html) **can** be set to maximize
memory access performance with reduced consideration for increases in memory
size requirements.

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html):

[VkImageTilingControlCreateInfoEXT](VkImageTilingControlCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImageTilingControlFeaturesEXT](VkPhysicalDeviceImageTilingControlFeaturesEXT.html)

* 
[VkImageTilingControlEXT](VkImageTilingControlEXT.html)

* 
`VK_EXT_IMAGE_TILING_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_TILING_CONTROL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_TILING_CONTROL_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_TILING_CONTROL_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2026-06-19 (Noah Fredriks)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_tiling_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
