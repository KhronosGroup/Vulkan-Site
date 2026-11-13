# VK_EXT_index_type_uint8(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_index_type_uint8.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_index_type_uint8](#VK_EXT_index_type_uint8)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_index_type_uint8](#_promotion_to_vk_khr_index_type_uint8)
- [Promotion_to_VK_KHR_index_type_uint8](#_promotion_to_vk_khr_index_type_uint8)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_index_type_uint8 - device extension

**Name String**

`VK_EXT_index_type_uint8`

**Extension Type**

Device extension

**Registered Extension Number**

266

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_index_type_uint8](VK_KHR_index_type_uint8.html)
extension

Which in turn was *promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_index_type_uint8] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_index_type_uint8 extension*)

**Last Modified Date**

2019-05-02

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension allows `uint8_t` indices to be used with
[vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html).

All functionality in this extension is included in
`[VK_KHR_index_type_uint8](VK_KHR_index_type_uint8.html)`, with the suffix changed to KHR.
The original enum names are still available as aliases of the KHR
functionality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceIndexTypeUint8FeaturesEXT](VkPhysicalDeviceIndexTypeUint8Features.html)

* 
`VK_EXT_INDEX_TYPE_UINT8_EXTENSION_NAME`

* 
`VK_EXT_INDEX_TYPE_UINT8_SPEC_VERSION`

* 
Extending [VkIndexType](VkIndexType.html):

[VK_INDEX_TYPE_UINT8_EXT](VkIndexType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2019-05-02 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_index_type_uint8).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
