# VK_KHR_zero_initialize_workgroup_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_zero_initialize_workgroup_memory.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_zero_initialize_workgroup_memory](#VK_KHR_zero_initialize_workgroup_memory)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_zero_initialize_workgroup_memory - device extension

**Name String**

`VK_KHR_zero_initialize_workgroup_memory`

**Extension Type**

Device extension

**Registered Extension Number**

326

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
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Alan Baker [alan-baker](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_zero_initialize_workgroup_memory] @alan-baker%0A*Here describe the issue or question you have about the VK_KHR_zero_initialize_workgroup_memory extension*)

**Last Modified Date**

2020-11-18

**IP Status**

No known IP claims.

**Contributors**

* 
Alan Baker, Google

* 
Jeff Bolz, Nvidia

* 
Faith Ekstrand, Intel

This extension allows the use of a null constant initializer on shader
Workgroup memory variables, allowing implementations to expose any special
hardware or instructions they may have.
Zero initialization is commonly used by applications running untrusted
content (e.g. web browsers) as way of defeating memory-scraping attacks.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeaturesKHR](VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures.html)

* 
`VK_KHR_ZERO_INITIALIZE_WORKGROUP_MEMORY_EXTENSION_NAME`

* 
`VK_KHR_ZERO_INITIALIZE_WORKGROUP_MEMORY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES_KHR](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2020-11-18 (Alan Baker)

Internal draft version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_zero_initialize_workgroup_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
