# VK_KHR_maintenance3(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance3.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance3](#VK_KHR_maintenance3)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance3 - device extension

**Name String**

`VK_KHR_maintenance3`

**Extension Type**

Device extension

**Registered Extension Number**

169

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
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance3] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_maintenance3 extension*)

**Last Modified Date**

2017-09-05

**Contributors**

* 
Jeff Bolz, NVIDIA

`VK_KHR_maintenance3` adds a collection of minor features that were
intentionally left out or overlooked from the original Vulkan 1.0 release.

The new features are as follows:

* 
A limit on the maximum number of descriptors that are supported in a
single descriptor set layout.
Some implementations have a limit on the total size of descriptors in a
set, which cannot be expressed in terms of the limits in Vulkan 1.0.

* 
A limit on the maximum size of a single memory allocation.
Some platforms have kernel interfaces that limit the maximum size of an
allocation.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkGetDescriptorSetLayoutSupportKHR](vkGetDescriptorSetLayoutSupport.html)

* 
[VkDescriptorSetLayoutSupportKHR](VkDescriptorSetLayoutSupport.html)

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceMaintenance3PropertiesKHR](VkPhysicalDeviceMaintenance3Properties.html)

* 
`VK_KHR_MAINTENANCE3_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE3_SPEC_VERSION`

* 
`VK_KHR_MAINTENANCE_3_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_3_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES_KHR](VkStructureType.html)

* 
Revision 1, 2017-08-22

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance3).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
