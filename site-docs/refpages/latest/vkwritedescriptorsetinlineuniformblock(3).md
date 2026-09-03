# VkWriteDescriptorSetInlineUniformBlock(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteDescriptorSetInlineUniformBlock.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteDescriptorSetInlineUniformBlock - Structure specifying inline uniform block data

If the `descriptorType` member of [VkWriteDescriptorSet](VkWriteDescriptorSet.html) is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then the data to write to the
descriptor set is specified through a
`VkWriteDescriptorSetInlineUniformBlock` structure included in the
`pNext` chain of `VkWriteDescriptorSet`.

The `VkWriteDescriptorSetInlineUniformBlock` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkWriteDescriptorSetInlineUniformBlock {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           dataSize;
    const void*        pData;
} VkWriteDescriptorSetInlineUniformBlock;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkWriteDescriptorSetInlineUniformBlock
typedef VkWriteDescriptorSetInlineUniformBlock VkWriteDescriptorSetInlineUniformBlockEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dataSize` is the number of bytes of inline uniform block data
pointed to by `pData`.

* 
`pData` is a pointer to `dataSize` number of bytes of data to
write to the inline uniform block.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-02222) VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-02222

`dataSize` **must** be an integer multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-sType-sType) VUID-VkWriteDescriptorSetInlineUniformBlock-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK](VkStructureType.html)

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-pData-parameter) VUID-VkWriteDescriptorSetInlineUniformBlock-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-arraylength) VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-arraylength

 `dataSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](VkWriteDescriptorSet.html)

[VK_EXT_inline_uniform_block](VK_EXT_inline_uniform_block.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkWriteDescriptorSetInlineUniformBlock).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
