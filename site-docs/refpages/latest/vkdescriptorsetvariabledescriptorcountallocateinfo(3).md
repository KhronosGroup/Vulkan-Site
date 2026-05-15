# VkDescriptorSetVariableDescriptorCountAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetVariableDescriptorCountAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetVariableDescriptorCountAllocateInfo - Structure specifying additional allocation parameters for descriptor sets

If the `pNext` chain of a [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html) structure
includes a `VkDescriptorSetVariableDescriptorCountAllocateInfo`
structure, then that structure includes an array of descriptor counts for
variable-sized descriptor bindings, one for each descriptor set being
allocated.

The `VkDescriptorSetVariableDescriptorCountAllocateInfo` structure is
defined as:

// Provided by VK_VERSION_1_2
typedef struct VkDescriptorSetVariableDescriptorCountAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           descriptorSetCount;
    const uint32_t*    pDescriptorCounts;
} VkDescriptorSetVariableDescriptorCountAllocateInfo;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorSetVariableDescriptorCountAllocateInfo
typedef VkDescriptorSetVariableDescriptorCountAllocateInfo VkDescriptorSetVariableDescriptorCountAllocateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorSetCount` is zero or the number of elements in
`pDescriptorCounts`.

* 
`pDescriptorCounts` is a pointer to an array of descriptor counts,
with each member specifying the number of descriptors in a
variable-sized descriptor binding in the corresponding descriptor set
being allocated.

If `descriptorSetCount` is zero or this structure is not included in the
`pNext` chain, then the variable lengths are considered to be zero.
Otherwise, `pDescriptorCounts`[i] is the number of descriptors in the
variable-sized descriptor binding in the corresponding descriptor set
layout.
If the variable-sized descriptor binding in the corresponding descriptor set
layout has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then
`pDescriptorCounts`[i] specifies the binding’s capacity in bytes.
If [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html)::`pSetLayouts`[i] does not include
a variable-sized descriptor binding, then `pDescriptorCounts`[i] is
ignored.

Valid Usage

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-descriptorSetCount-03045) VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-descriptorSetCount-03045

If `descriptorSetCount` is not zero, `descriptorSetCount` **must**
equal [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html)::`descriptorSetCount`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-sType-sType) VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-pDescriptorCounts-parameter) VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-pDescriptorCounts-parameter

 If `descriptorSetCount` is not `0`, `pDescriptorCounts` **must** be a valid pointer to an array of `descriptorSetCount` `uint32_t` values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html)

[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetVariableDescriptorCountAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
