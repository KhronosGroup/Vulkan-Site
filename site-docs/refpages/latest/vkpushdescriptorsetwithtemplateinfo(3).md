# VkPushDescriptorSetWithTemplateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPushDescriptorSetWithTemplateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPushDescriptorSetWithTemplateInfo - Structure specifying a descriptor set push operation using a descriptor update template

The `VkPushDescriptorSetWithTemplateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPushDescriptorSetWithTemplateInfo {
    VkStructureType               sType;
    const void*                   pNext;
    VkDescriptorUpdateTemplate    descriptorUpdateTemplate;
    VkPipelineLayout              layout;
    uint32_t                      set;
    const void*                   pData;
} VkPushDescriptorSetWithTemplateInfo;

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to VkPushDescriptorSetWithTemplateInfo
typedef VkPushDescriptorSetWithTemplateInfo VkPushDescriptorSetWithTemplateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorUpdateTemplate` is a descriptor update template defining
how to interpret the descriptor information in `pData`.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.
It **must** be compatible with the layout used to create the
`descriptorUpdateTemplate` handle.
If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)
structure off the `pNext`

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.
This **must** be the same number used to create the
`descriptorUpdateTemplate` handle.

* 
`pData` is a pointer to memory containing descriptors for the
templated update.

Valid Usage

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-commandBuffer-00366) VUID-VkPushDescriptorSetWithTemplateInfo-commandBuffer-00366

The `pipelineBindPoint` specified during the creation of the
descriptor update template **must** be supported by the
`commandBuffer`’s parent `VkCommandPool`’s queue family

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-pData-01686) VUID-VkPushDescriptorSetWithTemplateInfo-pData-01686

`pData` **must** be a valid pointer to a memory containing one or more
valid instances of [VkDescriptorImageInfo](VkDescriptorImageInfo.html),
[VkDescriptorBufferInfo](VkDescriptorBufferInfo.html), or [VkBufferView](VkBufferView.html) in a layout defined
by `descriptorUpdateTemplate` when it was created with
[vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-layout-07993) VUID-VkPushDescriptorSetWithTemplateInfo-layout-07993

`layout` **must** be compatible with the layout used to create
`descriptorUpdateTemplate`

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-07994) VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-07994

`descriptorUpdateTemplate` **must** have been created with a
`templateType` of
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-07995) VUID-VkPushDescriptorSetWithTemplateInfo-set-07995

`set` **must** be the same value used to create
`descriptorUpdateTemplate`

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-07304) VUID-VkPushDescriptorSetWithTemplateInfo-set-07304

`set` **must** be less than
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-11854) VUID-VkPushDescriptorSetWithTemplateInfo-set-11854

`set` **must** reference a valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle in
`layout`

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-07305) VUID-VkPushDescriptorSetWithTemplateInfo-set-07305

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-None-09495) VUID-VkPushDescriptorSetWithTemplateInfo-None-09495

If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-layout-09496) VUID-VkPushDescriptorSetWithTemplateInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-None-10359) VUID-VkPushDescriptorSetWithTemplateInfo-None-10359

If the [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) extension is not enabled,
[`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-sType-sType) VUID-VkPushDescriptorSetWithTemplateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-pNext-pNext) VUID-VkPushDescriptorSetWithTemplateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-sType-unique) VUID-VkPushDescriptorSetWithTemplateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-parameter) VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-parameter

 `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) handle

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-layout-parameter) VUID-VkPushDescriptorSetWithTemplateInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-pData-parameter) VUID-VkPushDescriptorSetWithTemplateInfo-pData-parameter

 `pData` **must** be a pointer value

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-commonparent) VUID-VkPushDescriptorSetWithTemplateInfo-commonparent

 Both of `descriptorUpdateTemplate`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html), [VkPipelineLayout](VkPipelineLayout.html), [VkStructureType](VkStructureType.html), [vkCmdPushDescriptorSetWithTemplate2](vkCmdPushDescriptorSetWithTemplate2.html), [vkCmdPushDescriptorSetWithTemplate2](vkCmdPushDescriptorSetWithTemplate2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPushDescriptorSetWithTemplateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
