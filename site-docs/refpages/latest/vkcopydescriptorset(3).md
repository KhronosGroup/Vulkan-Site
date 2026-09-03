# VkCopyDescriptorSet(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyDescriptorSet.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyDescriptorSet - Structure specifying a copy descriptor set operation

The `VkCopyDescriptorSet` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCopyDescriptorSet {
    VkStructureType    sType;
    const void*        pNext;
    VkDescriptorSet    srcSet;
    uint32_t           srcBinding;
    uint32_t           srcArrayElement;
    VkDescriptorSet    dstSet;
    uint32_t           dstBinding;
    uint32_t           dstArrayElement;
    uint32_t           descriptorCount;
} VkCopyDescriptorSet;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSet`, `srcBinding`, and `srcArrayElement` are the source
set, binding, and array element, respectively.
If the descriptor binding identified by `srcSet` and
`srcBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then `srcArrayElement`
specifies the starting byte offset within the binding to copy from.

* 
`dstSet`, `dstBinding`, and `dstArrayElement` are the
destination set, binding, and array element, respectively.
If the descriptor binding identified by `dstSet` and
`dstBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then `dstArrayElement`
specifies the starting byte offset within the binding to copy to.

* 
`descriptorCount` is the number of descriptors to copy from the
source to destination.
If `descriptorCount` is greater than the number of remaining array
elements in the source or destination binding, those affect consecutive
bindings in a manner similar to [VkWriteDescriptorSet](VkWriteDescriptorSet.html) above.
If the descriptor binding identified by `srcSet` and
`srcBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then `descriptorCount`
specifies the number of bytes to copy and the remaining array elements
in the source or destination binding refer to the remaining number of
bytes in those.

If the `VkDescriptorSetLayoutBinding` for `dstBinding` is
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) and `srcBinding` is not
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), the new active descriptor type becomes
the descriptor type of `srcBinding`.
If both `VkDescriptorSetLayoutBinding` for `srcBinding` and
`dstBinding` are [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), the active
descriptor type in each source descriptor is copied into the corresponding
destination descriptor.
The active descriptor type **can** be different for each source descriptor.

|  | The intention is that copies to and from mutable descriptors is a simple
| --- | --- |
memcpy.
Copies between non-mutable and mutable descriptors are expected to require
one memcpy per descriptor to handle the difference in size, but this use
case with more than one `descriptorCount` is considered rare. |

Valid Usage

* 
[](#VUID-VkCopyDescriptorSet-srcBinding-00345) VUID-VkCopyDescriptorSet-srcBinding-00345

`srcBinding` **must** be a valid binding within `srcSet`

* 
[](#VUID-VkCopyDescriptorSet-srcArrayElement-00346) VUID-VkCopyDescriptorSet-srcArrayElement-00346

The sum of `srcArrayElement` and `descriptorCount` **must** be less
than or equal to the number of array elements in the descriptor set
binding specified by `srcBinding`, and all applicable
[consecutive bindings](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-00347) VUID-VkCopyDescriptorSet-dstBinding-00347

`dstBinding` **must** be a valid binding within `dstSet`

* 
[](#VUID-VkCopyDescriptorSet-dstArrayElement-00348) VUID-VkCopyDescriptorSet-dstArrayElement-00348

The sum of `dstArrayElement` and `descriptorCount` **must** be less
than or equal to the number of array elements in the descriptor set
binding specified by `dstBinding`, and all applicable
[consecutive bindings](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-02632) VUID-VkCopyDescriptorSet-dstBinding-02632

The type of `dstBinding` within `dstSet` **must** be equal to the
type of `srcBinding` within `srcSet`

* 
[](#VUID-VkCopyDescriptorSet-srcSet-00349) VUID-VkCopyDescriptorSet-srcSet-00349

If `srcSet` is equal to `dstSet`, then the source and
destination ranges of descriptors **must** not overlap, where the ranges
**may** include array elements from [    consecutive bindings](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkCopyDescriptorSet-srcBinding-02223) VUID-VkCopyDescriptorSet-srcBinding-02223

If the descriptor type of the descriptor set binding specified by
`srcBinding` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html),
`srcArrayElement` **must** be an integer multiple of `4`

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-02224) VUID-VkCopyDescriptorSet-dstBinding-02224

If the descriptor type of the descriptor set binding specified by
`dstBinding` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html),
`dstArrayElement` **must** be an integer multiple of `4`

* 
[](#VUID-VkCopyDescriptorSet-srcBinding-02225) VUID-VkCopyDescriptorSet-srcBinding-02225

If the descriptor type of the descriptor set binding specified by either
`srcBinding` or `dstBinding` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html), `descriptorCount`
**must** be an integer multiple of `4`

* 
[](#VUID-VkCopyDescriptorSet-srcSet-01918) VUID-VkCopyDescriptorSet-srcSet-01918

If `srcSet`’s layout was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) flag
set, then `dstSet`’s layout **must** also have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) flag
set

* 
[](#VUID-VkCopyDescriptorSet-srcSet-04885) VUID-VkCopyDescriptorSet-srcSet-04885

If `srcSet`’s layout was created without
either the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)
flag or
the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html)
flag set, then `dstSet`’s layout **must** have been created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) flag
set

* 
[](#VUID-VkCopyDescriptorSet-srcSet-01920) VUID-VkCopyDescriptorSet-srcSet-01920

If the descriptor pool from which `srcSet` was allocated was created
with the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) flag set,
then the descriptor pool from which `dstSet` was allocated **must**
also have been created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) flag set

* 
[](#VUID-VkCopyDescriptorSet-srcSet-04887) VUID-VkCopyDescriptorSet-srcSet-04887

If the descriptor pool from which `srcSet` was allocated was created
without
either the [VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](VkDescriptorPoolCreateFlagBits.html) flag or
the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) flag set, then
the descriptor pool from which `dstSet` was allocated **must** have
been created without the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html) flag set

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-02753) VUID-VkCopyDescriptorSet-dstBinding-02753

If the descriptor type of the descriptor set binding specified by
`dstBinding` is [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html), then `dstSet`
**must** not have been allocated with a layout that included immutable
samplers for `dstBinding`

* 
[](#VUID-VkCopyDescriptorSet-dstSet-04612) VUID-VkCopyDescriptorSet-dstSet-04612

If `VkDescriptorSetLayoutBinding` for `dstSet` at
`dstBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), the new active
descriptor type **must** exist in the corresponding
`pMutableDescriptorTypeLists` list for `dstBinding` if the new
active descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkCopyDescriptorSet-srcSet-04613) VUID-VkCopyDescriptorSet-srcSet-04613

If `VkDescriptorSetLayoutBinding` for `srcSet` at
`srcBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) and the
`VkDescriptorSetLayoutBinding` for `dstSet` at `dstBinding`
is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), the active descriptor type
for the source descriptor **must** match the descriptor type of
`dstBinding`

* 
[](#VUID-VkCopyDescriptorSet-dstSet-04614) VUID-VkCopyDescriptorSet-dstSet-04614

If `VkDescriptorSetLayoutBinding` for `dstSet` at
`dstBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), and the new
active descriptor type is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), the
`pMutableDescriptorTypeLists` for `srcBinding` and
`dstBinding` **must** match exactly

Valid Usage (Implicit)

* 
[](#VUID-VkCopyDescriptorSet-sType-sType) VUID-VkCopyDescriptorSet-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_DESCRIPTOR_SET](VkStructureType.html)

* 
[](#VUID-VkCopyDescriptorSet-pNext-pNext) VUID-VkCopyDescriptorSet-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyDescriptorSet-srcSet-parameter) VUID-VkCopyDescriptorSet-srcSet-parameter

 `srcSet` **must** be a valid [VkDescriptorSet](VkDescriptorSet.html) handle

* 
[](#VUID-VkCopyDescriptorSet-dstSet-parameter) VUID-VkCopyDescriptorSet-dstSet-parameter

 `dstSet` **must** be a valid [VkDescriptorSet](VkDescriptorSet.html) handle

* 
[](#VUID-VkCopyDescriptorSet-commonparent) VUID-VkCopyDescriptorSet-commonparent

 Both of `dstSet`, and `srcSet` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSet](VkDescriptorSet.html), [VkStructureType](VkStructureType.html), [vkUpdateDescriptorSets](vkUpdateDescriptorSets.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkCopyDescriptorSet).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
