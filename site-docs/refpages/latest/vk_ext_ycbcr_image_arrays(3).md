# VK_EXT_ycbcr_image_arrays(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_ycbcr_image_arrays.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_ycbcr_image_arrays](#VK_EXT_ycbcr_image_arrays)
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

VK_EXT_ycbcr_image_arrays - device extension

**Name String**

`VK_EXT_ycbcr_image_arrays`

**Extension Type**

Device extension

**Registered Extension Number**

253

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_ycbcr_image_arrays] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_ycbcr_image_arrays extension*)

**Last Modified Date**

2019-01-15

**Contributors**

* 
Piers Daniell, NVIDIA

This extension allows images of a format that requires
[Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) to be
created with multiple array layers, which is otherwise restricted.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceYcbcrImageArraysFeaturesEXT](VkPhysicalDeviceYcbcrImageArraysFeaturesEXT.html)

* 
`VK_EXT_YCBCR_IMAGE_ARRAYS_EXTENSION_NAME`

* 
`VK_EXT_YCBCR_IMAGE_ARRAYS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_IMAGE_ARRAYS_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2019-01-15 (Piers Daniell)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_ycbcr_image_arrays).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
