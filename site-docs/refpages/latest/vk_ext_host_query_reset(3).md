# VK_EXT_host_query_reset(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_host_query_reset.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_host_query_reset](#VK_EXT_host_query_reset)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_host_query_reset - device extension

**Name String**

`VK_EXT_host_query_reset`

**Extension Type**

Device extension

**Registered Extension Number**

262

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
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Bas Nieuwenhuizen [BNieuwenhuizen](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_host_query_reset] @BNieuwenhuizen%0A*Here describe the issue or question you have about the VK_EXT_host_query_reset extension*)

**Last Modified Date**

2019-03-06

**IP Status**

No known IP claims.

**Contributors**

* 
Bas Nieuwenhuizen, Google

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

This extension adds a new function to reset queries from the host.

All functionality in this extension is included in core Vulkan 1.2, with the
EXT suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkResetQueryPoolEXT](vkResetQueryPool.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceHostQueryResetFeaturesEXT](VkPhysicalDeviceHostQueryResetFeatures.html)

* 
`VK_EXT_HOST_QUERY_RESET_EXTENSION_NAME`

* 
`VK_EXT_HOST_QUERY_RESET_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2019-03-12 (Bas Nieuwenhuizen)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_host_query_reset).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
