# VK_EXT_image_sliced_view_of_3d(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_sliced_view_of_3d.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_sliced_view_of_3d](#VK_EXT_image_sliced_view_of_3d)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_image_sliced_view_of_3d - device extension

**Name String**

`VK_EXT_image_sliced_view_of_3d`

**Extension Type**

Device extension

**Registered Extension Number**

419

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_maintenance1](VK_KHR_maintenance1.html)

     and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_sliced_view_of_3d] @zmike%0A*Here describe the issue or question you have about the VK_EXT_image_sliced_view_of_3d extension*)

**Extension Proposal**

[VK_EXT_image_sliced_view_of_3d](../../../../features/latest/features/proposals/VK_EXT_image_sliced_view_of_3d.html)

**Last Modified Date**

2023-01-24

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Hans-Kristian Arntzen, Valve

* 
Ricardo Garcia, Igalia

* 
Shahbaz Youssefi, Google

* 
Piers Daniell, NVIDIA

This extension allows creating 3D views of 3D images such that the views
contain a subset of the slices in the image, using a Z offset and range, for
the purpose of using the views as storage image descriptors.
This matches functionality in D3D12 and is primarily intended to support
D3D12 emulation.

* 
Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

[VkImageViewSlicedCreateInfoEXT](VkImageViewSlicedCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT](VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT.html)

* 
`VK_EXT_IMAGE_SLICED_VIEW_OF_3D_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_SLICED_VIEW_OF_3D_SPEC_VERSION`

* 
[VK_REMAINING_3D_SLICES_EXT](VK_REMAINING_3D_SLICES_EXT.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_VIEW_SLICED_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_SLICED_VIEW_OF_3D_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2022-10-21 (Mike Blumenkrantz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_sliced_view_of_3d).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
