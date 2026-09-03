# VK_NV_dedicated_allocation_image_aliasing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_dedicated_allocation_image_aliasing.html

## Table of Contents

- [Name](#_name)
- [VK_NV_dedicated_allocation_image_aliasing](#VK_NV_dedicated_allocation_image_aliasing)
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

VK_NV_dedicated_allocation_image_aliasing - device extension

**Name String**

`VK_NV_dedicated_allocation_image_aliasing`

**Extension Type**

Device extension

**Registered Extension Number**

241

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)

     and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Nuno Subtil [nsubtil](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_dedicated_allocation_image_aliasing] @nsubtil%0A*Here describe the issue or question you have about the VK_NV_dedicated_allocation_image_aliasing extension*)

**Last Modified Date**

2019-01-04

**Contributors**

* 
Nuno Subtil, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Eric Werness, NVIDIA

* 
Axel Gneiting, id Software

This extension allows applications to alias images on dedicated allocations,
subject to specific restrictions: the extent and the number of layers in the
image being aliased must be smaller than or equal to those of the original
image for which the allocation was created, and every other image parameter
must match.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV](VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV.html)

* 
`VK_NV_DEDICATED_ALLOCATION_IMAGE_ALIASING_EXTENSION_NAME`

* 
`VK_NV_DEDICATED_ALLOCATION_IMAGE_ALIASING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEDICATED_ALLOCATION_IMAGE_ALIASING_FEATURES_NV](VkStructureType.html)

* 
Revision 1, 2019-01-04 (Nuno Subtil)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_dedicated_allocation_image_aliasing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
