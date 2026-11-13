# VK_KHR_index_type_uint8(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_index_type_uint8.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_index_type_uint8](#VK_KHR_index_type_uint8)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_index_type_uint8 - device extension

**Name String**

`VK_KHR_index_type_uint8`

**Extension Type**

Device extension

**Registered Extension Number**

534

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
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_index_type_uint8] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_index_type_uint8 extension*)

**Last Modified Date**

2023-06-06

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension allows `uint8_t` indices to be used with
[vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceIndexTypeUint8FeaturesKHR](VkPhysicalDeviceIndexTypeUint8Features.html)

* 
`VK_KHR_INDEX_TYPE_UINT8_EXTENSION_NAME`

* 
`VK_KHR_INDEX_TYPE_UINT8_SPEC_VERSION`

* 
Extending [VkIndexType](VkIndexType.html):

[VK_INDEX_TYPE_UINT8_KHR](VkIndexType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2023-06-06 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_index_type_uint8).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
