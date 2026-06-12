# VkPhysicalDeviceInlineUniformBlockProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceInlineUniformBlockProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceInlineUniformBlockProperties - Structure describing inline uniform block properties that can be supported by an implementation

The `VkPhysicalDeviceInlineUniformBlockProperties` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceInlineUniformBlockProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxInlineUniformBlockSize;
    uint32_t           maxPerStageDescriptorInlineUniformBlocks;
    uint32_t           maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks;
    uint32_t           maxDescriptorSetInlineUniformBlocks;
    uint32_t           maxDescriptorSetUpdateAfterBindInlineUniformBlocks;
} VkPhysicalDeviceInlineUniformBlockProperties;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkPhysicalDeviceInlineUniformBlockProperties
typedef VkPhysicalDeviceInlineUniformBlockProperties VkPhysicalDeviceInlineUniformBlockPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxInlineUniformBlockSize` is the maximum size in bytes of an
[inline uniform block](../../../../spec/latest/chapters/descriptorsets.html#descriptors-inlineuniformblock) binding.

* 

`maxPerStageDescriptorInlineUniformBlocks` is the maximum number of
inline uniform block bindings that **can** be accessible to a single shader
stage in a pipeline layout.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) count against this limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.

* 

`maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks`
is similar to `maxPerStageDescriptorInlineUniformBlocks` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetInlineUniformBlocks` is the maximum number of
inline uniform block bindings that **can** be included in descriptor
bindings in a pipeline layout across all pipeline shader stages and
descriptor set numbers.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) count against this limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.

* 

`maxDescriptorSetUpdateAfterBindInlineUniformBlocks`
is similar to `maxDescriptorSetInlineUniformBlocks` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

If the `VkPhysicalDeviceInlineUniformBlockProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInlineUniformBlockProperties-sType-sType) VUID-VkPhysicalDeviceInlineUniformBlockProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_inline_uniform_block](VK_EXT_inline_uniform_block.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceInlineUniformBlockProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
