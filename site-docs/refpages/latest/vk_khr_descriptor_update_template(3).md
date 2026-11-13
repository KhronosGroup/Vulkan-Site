# VK_KHR_descriptor_update_template(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_descriptor_update_template.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_descriptor_update_template](#VK_KHR_descriptor_update_template)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_descriptor_update_template - device extension

**Name String**

`VK_KHR_descriptor_update_template`

**Extension Type**

Device extension

**Registered Extension Number**

86

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_EXT_debug_report

* 
Interacts with VK_KHR_push_descriptor

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Markus Tavenrath [mtavenrath](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_descriptor_update_template] @mtavenrath%0A*Here describe the issue or question you have about the VK_KHR_descriptor_update_template extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html)`

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Michael Worcester, Imagination Technologies

Applications may wish to update a fixed set of descriptors in a large number
of descriptor sets very frequently, i.e. during initialization phase or if
it is required to rebuild descriptor sets for each frame.
For those cases it is also not unlikely that all information required to
update a single descriptor set is stored in a single struct.
This extension provides a way to update a fixed set of descriptors in a
single [VkDescriptorSet](VkDescriptorSet.html) with a pointer to an application-defined data
structure describing the new descriptors.

[vkCmdPushDescriptorSetWithTemplateKHR](vkCmdPushDescriptorSetWithTemplate.html) is included as an interaction
with `[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html)`.
If Vulkan 1.1 and `VK_KHR_push_descriptor` are supported, this is included
by `[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html)`.

The base functionality in this extension is included in core Vulkan 1.1,
with the KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[VkDescriptorUpdateTemplateKHR](VkDescriptorUpdateTemplate.html)

* 
[vkCreateDescriptorUpdateTemplateKHR](vkCreateDescriptorUpdateTemplate.html)

* 
[vkDestroyDescriptorUpdateTemplateKHR](vkDestroyDescriptorUpdateTemplate.html)

* 
[vkUpdateDescriptorSetWithTemplateKHR](vkUpdateDescriptorSetWithTemplate.html)

If [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) is supported:

* 
[vkCmdPushDescriptorSetWithTemplateKHR](vkCmdPushDescriptorSetWithTemplate.html)

* 
[VkDescriptorUpdateTemplateCreateInfoKHR](VkDescriptorUpdateTemplateCreateInfo.html)

* 
[VkDescriptorUpdateTemplateEntryKHR](VkDescriptorUpdateTemplateEntry.html)

* 
[VkDescriptorUpdateTemplateTypeKHR](VkDescriptorUpdateTemplateType.html)

* 
[VkDescriptorUpdateTemplateCreateFlagsKHR](VkDescriptorUpdateTemplateCreateFlags.html)

* 
`VK_KHR_DESCRIPTOR_UPDATE_TEMPLATE_EXTENSION_NAME`

* 
`VK_KHR_DESCRIPTOR_UPDATE_TEMPLATE_SPEC_VERSION`

* 
Extending [VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html):

[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET_KHR](VkDescriptorUpdateTemplateType.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_KHR](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO_KHR](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_KHR_EXT](VkDebugReportObjectTypeEXT.html)

If [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) is supported:

* 
Extending [VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html):

[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS_KHR](VkDescriptorUpdateTemplateType.html)

* 
Revision 1, 2016-01-11 (Markus Tavenrath)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_descriptor_update_template).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
