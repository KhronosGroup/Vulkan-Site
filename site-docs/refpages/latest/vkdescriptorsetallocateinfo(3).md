# VkDescriptorSetAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetAllocateInfo - Structure specifying the allocation parameters for descriptor sets

The `VkDescriptorSetAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorSetAllocateInfo {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDescriptorPool                descriptorPool;
    uint32_t                        descriptorSetCount;
    const VkDescriptorSetLayout*    pSetLayouts;
} VkDescriptorSetAllocateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorPool` is the pool which the sets will be allocated from.

* 
`descriptorSetCount` determines the number of descriptor sets to be
allocated from the pool.

* 
`pSetLayouts` is a pointer to an array of descriptor set layouts,
with each member specifying how the corresponding descriptor set is
allocated.

Valid Usage

* 
[](#VUID-VkDescriptorSetAllocateInfo-apiVersion-07895) VUID-VkDescriptorSetAllocateInfo-apiVersion-07895

If the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled and
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
1.1,
`descriptorSetCount` **must** not be greater than the number of sets
that are currently available for allocation in `descriptorPool`

* 
[](#VUID-VkDescriptorSetAllocateInfo-apiVersion-07896) VUID-VkDescriptorSetAllocateInfo-apiVersion-07896

If the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled and
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
1.1,
`descriptorPool` **must** have enough free descriptor capacity
remaining to allocate the descriptor sets of the specified layouts

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-00308) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-00308

Each element of `pSetLayouts` **must** not have been created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html) set

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-03044) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-03044

If any element of `pSetLayouts` was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set, `descriptorPool` **must** have been created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) flag set

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-09380) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-09380

If `pSetLayouts`[i] was created with an element of
`pBindingFlags` that includes
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html), and
[VkDescriptorSetVariableDescriptorCountAllocateInfo](VkDescriptorSetVariableDescriptorCountAllocateInfo.html) is included in
the `pNext` chain, and
`VkDescriptorSetVariableDescriptorCountAllocateInfo`::`descriptorSetCount`
is not zero, then
[VkDescriptorSetVariableDescriptorCountAllocateInfo](VkDescriptorSetVariableDescriptorCountAllocateInfo.html)::`pDescriptorCounts`[i]
**must** be less than or equal to
[VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html)::`descriptorCount` for the
corresponding binding used to create `pSetLayouts`[i]

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-04610) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-04610

If any element of `pSetLayouts` was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) bit set,
`descriptorPool` **must** have been created with the
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](VkDescriptorPoolCreateFlagBits.html) flag set

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-08009) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-08009

Each element of `pSetLayouts` **must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetAllocateInfo-sType-sType) VUID-VkDescriptorSetAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_ALLOCATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetAllocateInfo-pNext-pNext) VUID-VkDescriptorSetAllocateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorSetVariableDescriptorCountAllocateInfo](VkDescriptorSetVariableDescriptorCountAllocateInfo.html)

* 
[](#VUID-VkDescriptorSetAllocateInfo-sType-unique) VUID-VkDescriptorSetAllocateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorSetAllocateInfo-descriptorPool-parameter) VUID-VkDescriptorSetAllocateInfo-descriptorPool-parameter

 `descriptorPool` **must** be a valid [VkDescriptorPool](VkDescriptorPool.html) handle

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-parameter) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-parameter

 `pSetLayouts` **must** be a valid pointer to an array of `descriptorSetCount` valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handles

* 
[](#VUID-VkDescriptorSetAllocateInfo-descriptorSetCount-arraylength) VUID-VkDescriptorSetAllocateInfo-descriptorSetCount-arraylength

 `descriptorSetCount` **must** be greater than `0`

* 
[](#VUID-VkDescriptorSetAllocateInfo-commonparent) VUID-VkDescriptorSetAllocateInfo-commonparent

 Both of `descriptorPool`, and the elements of `pSetLayouts` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorPool](VkDescriptorPool.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkStructureType](VkStructureType.html), [vkAllocateDescriptorSets](vkAllocateDescriptorSets.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
