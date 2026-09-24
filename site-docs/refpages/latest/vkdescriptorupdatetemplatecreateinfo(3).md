# VkDescriptorUpdateTemplateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorUpdateTemplateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorUpdateTemplateCreateInfo - Structure specifying parameters of a newly created descriptor update template

The [VkDescriptorUpdateTemplateCreateInfo](#) structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDescriptorUpdateTemplateCreateInfo {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDescriptorUpdateTemplateCreateFlags     flags;
    uint32_t                                  descriptorUpdateEntryCount;
    const VkDescriptorUpdateTemplateEntry*    pDescriptorUpdateEntries;
    VkDescriptorUpdateTemplateType            templateType;
    VkDescriptorSetLayout                     descriptorSetLayout;
    VkPipelineBindPoint                       pipelineBindPoint;
    VkPipelineLayout                          pipelineLayout;
    uint32_t                                  set;
} VkDescriptorUpdateTemplateCreateInfo;

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplateCreateInfo
typedef VkDescriptorUpdateTemplateCreateInfo VkDescriptorUpdateTemplateCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`descriptorUpdateEntryCount` is the number of elements in the
`pDescriptorUpdateEntries` array.

* 
`pDescriptorUpdateEntries` is a pointer to an array of
[VkDescriptorUpdateTemplateEntry](VkDescriptorUpdateTemplateEntry.html) structures describing the
descriptors to be updated by the descriptor update template.

* 
`templateType` Specifies the type of the descriptor update template.
If set to [VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](VkDescriptorUpdateTemplateType.html) it
**can** only be used to update descriptor sets with a fixed
`descriptorSetLayout`.
If set to [VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html) it
**can** only be used to push descriptor sets using the provided
`pipelineBindPoint`, `pipelineLayout`, and `set` number.

* 
`descriptorSetLayout` is the descriptor set layout used to build the
descriptor update template.
All descriptor sets which are going to be updated through the newly
created descriptor update template **must** be created with a layout that
matches (is the same as, or defined identically to) this layout.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](VkDescriptorUpdateTemplateType.html).
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) indicating the
type of the pipeline that will use the descriptors.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html)

* 
`pipelineLayout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program
the bindings.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html)

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html)

Valid Usage

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00350) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00350

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](VkDescriptorUpdateTemplateType.html),
`descriptorSetLayout` **must** be a valid `VkDescriptorSetLayout`
handle

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-10355) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-10355

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html),
and the [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) extension is not enabled,
[`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor) **must** be enabled

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00351) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00351

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html),
`pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00352) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00352

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html),
`pipelineLayout` **must** be a valid `VkPipelineLayout` handle

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00353) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00353

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html), `set`
**must** be the unique set number in the pipeline layout that uses a
descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-04615) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-04615

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](VkDescriptorUpdateTemplateType.html),
`descriptorSetLayout` **must** not contain a binding with type
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-sType-sType) VUID-VkDescriptorUpdateTemplateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-pNext-pNext) VUID-VkDescriptorUpdateTemplateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-flags-zerobitmask) VUID-VkDescriptorUpdateTemplateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-pDescriptorUpdateEntries-parameter) VUID-VkDescriptorUpdateTemplateCreateInfo-pDescriptorUpdateEntries-parameter

 `pDescriptorUpdateEntries` **must** be a valid pointer to an array of `descriptorUpdateEntryCount` valid [VkDescriptorUpdateTemplateEntry](VkDescriptorUpdateTemplateEntry.html) structures

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-parameter) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-parameter

 `templateType` **must** be a valid [VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html) value

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-descriptorUpdateEntryCount-arraylength) VUID-VkDescriptorUpdateTemplateCreateInfo-descriptorUpdateEntryCount-arraylength

 `descriptorUpdateEntryCount` **must** be greater than `0`

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-commonparent) VUID-VkDescriptorUpdateTemplateCreateInfo-commonparent

 Both of `descriptorSetLayout`, and `pipelineLayout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkDescriptorUpdateTemplateCreateFlags](VkDescriptorUpdateTemplateCreateFlags.html), [VkDescriptorUpdateTemplateEntry](VkDescriptorUpdateTemplateEntry.html), [VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkPipelineLayout](VkPipelineLayout.html), [VkStructureType](VkStructureType.html), [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html), [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorUpdateTemplateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
