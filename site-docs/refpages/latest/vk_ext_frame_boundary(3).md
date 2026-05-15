# VK_EXT_frame_boundary(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_frame_boundary.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_frame_boundary](#VK_EXT_frame_boundary)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_frame_boundary - device extension

**Name String**

`VK_EXT_frame_boundary`

**Extension Type**

Device extension

**Registered Extension Number**

376

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
James Fitzpatrick [jamesfitzpatrick](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_frame_boundary] @jamesfitzpatrick%0A*Here describe the issue or question you have about the VK_EXT_frame_boundary extension*)

**Extension Proposal**

[VK_EXT_frame_boundary](../../../../features/latest/features/proposals/VK_EXT_frame_boundary.html)

**Last Modified Date**

2023-06-14

**Contributors**

* 
James Fitzpatrick, Imagination Technologies

* 
Hugues Evrard, Google

* 
Melih Yasin Yalcin, Google

* 
Andrew Garrard, Imagination Technologies

* 
Jan-Harald Fredriksen, Arm

* 
Vassili Nikolaev, NVIDIA

* 
Ting Wei, Huawei

[VK_EXT_frame_boundary](#) is a device extension that helps **tools** (such
as debuggers) to group queue submissions per frames in non-trivial
scenarios, typically when [vkQueuePresentKHR](vkQueuePresentKHR.html) is not a relevant frame
boundary delimiter.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFrameBoundaryFeaturesEXT](VkPhysicalDeviceFrameBoundaryFeaturesEXT.html)

Extending [VkSubmitInfo](VkSubmitInfo.html), [VkSubmitInfo2](VkSubmitInfo2.html), [VkPresentInfoKHR](VkPresentInfoKHR.html), [VkBindSparseInfo](VkBindSparseInfo.html):

* 
[VkFrameBoundaryEXT](VkFrameBoundaryEXT.html)

* 
[VkFrameBoundaryFlagBitsEXT](VkFrameBoundaryFlagBitsEXT.html)

* 
[VkFrameBoundaryFlagsEXT](VkFrameBoundaryFlagsEXT.html)

* 
`VK_EXT_FRAME_BOUNDARY_EXTENSION_NAME`

* 
`VK_EXT_FRAME_BOUNDARY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_FRAME_BOUNDARY_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAME_BOUNDARY_FEATURES_EXT](VkStructureType.html)

* 
Revision 0, 2022-01-14 (Hugues Evard)

Initial proposal

Revision 1, 2023-06-14 (James Fitzpatrick)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_frame_boundary).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
