# VkDescriptorPoolInlineUniformBlockCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorPoolInlineUniformBlockCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorPoolInlineUniformBlockCreateInfo - Structure specifying the maximum number of inline uniform block bindings of a newly created descriptor pool

In order to be able to allocate descriptor sets having
[inline uniform block](../../../../spec/latest/chapters/descriptors.html#descriptors-inlineuniformblock) bindings the
descriptor pool **must** be created with specifying the inline uniform block
binding capacity of the descriptor pool, in addition to the total inline
uniform data capacity in bytes which is specified through a
[VkDescriptorPoolSize](VkDescriptorPoolSize.html) structure with a `descriptorType` value of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html).
This **can** be done by adding a
`VkDescriptorPoolInlineUniformBlockCreateInfo` structure to the
`pNext` chain of [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html).

The `VkDescriptorPoolInlineUniformBlockCreateInfo` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkDescriptorPoolInlineUniformBlockCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maxInlineUniformBlockBindings;
} VkDescriptorPoolInlineUniformBlockCreateInfo;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkDescriptorPoolInlineUniformBlockCreateInfo
typedef VkDescriptorPoolInlineUniformBlockCreateInfo VkDescriptorPoolInlineUniformBlockCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxInlineUniformBlockBindings` is the number of inline uniform
block bindings to allocate.

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorPoolInlineUniformBlockCreateInfo-sType-sType) VUID-VkDescriptorPoolInlineUniformBlockCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)

[VK_EXT_inline_uniform_block](VK_EXT_inline_uniform_block.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorPoolInlineUniformBlockCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
