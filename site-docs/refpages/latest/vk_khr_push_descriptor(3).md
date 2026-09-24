# VK_KHR_push_descriptor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_push_descriptor.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_push_descriptor](#VK_KHR_push_descriptor)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_push_descriptor - device extension

**Name String**

`VK_KHR_push_descriptor`

**Extension Type**

Device extension

**Registered Extension Number**

81

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_1

* 
Interacts with VK_KHR_descriptor_update_template

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_push_descriptor] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_push_descriptor extension*)

**Last Modified Date**

2017-09-12

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Michael Worcester, Imagination Technologies

This extension allows descriptors to be written into the command buffer,
while the implementation is responsible for managing their memory.
Push descriptors may enable easier porting from older APIs and in some cases
can be more efficient than writing descriptors into descriptor sets.

* 
[vkCmdPushDescriptorSetKHR](vkCmdPushDescriptorSet.html)

If [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) or [VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html) is supported:

* 
[vkCmdPushDescriptorSetWithTemplateKHR](vkCmdPushDescriptorSetWithTemplate.html)

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDevicePushDescriptorPropertiesKHR](VkPhysicalDevicePushDescriptorProperties.html)

* 
`VK_KHR_PUSH_DESCRIPTOR_EXTENSION_NAME`

* 
`VK_KHR_PUSH_DESCRIPTOR_SPEC_VERSION`

* 
Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES_KHR](VkStructureType.html)

If [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) or [VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html) is supported:

* 
Extending [VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html):

[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS_KHR](VkDescriptorUpdateTemplateType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2016-10-15 (Jeff Bolz)

Internal revisions

Revision 2, 2017-09-12 (Tobias Hector)

* 
Added interactions with Vulkan 1.1

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_push_descriptor).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
