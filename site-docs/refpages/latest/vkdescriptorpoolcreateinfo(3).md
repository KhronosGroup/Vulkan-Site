# VkDescriptorPoolCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorPoolCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorPoolCreateInfo - Structure specifying parameters of a newly created descriptor pool

Additional information about the pool is passed in a
`VkDescriptorPoolCreateInfo` structure:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorPoolCreateInfo {
    VkStructureType                sType;
    const void*                    pNext;
    VkDescriptorPoolCreateFlags    flags;
    uint32_t                       maxSets;
    uint32_t                       poolSizeCount;
    const VkDescriptorPoolSize*    pPoolSizes;
} VkDescriptorPoolCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html)
specifying certain supported operations on the pool.

* 
`maxSets` is the maximum number of descriptor sets that **can** be
allocated from the pool.

* 
`poolSizeCount` is the number of elements in `pPoolSizes`.

* 
`pPoolSizes` is a pointer to an array of [VkDescriptorPoolSize](VkDescriptorPoolSize.html)
structures, each containing a descriptor type and number of descriptors
of that type to be allocated in the pool.

If multiple `VkDescriptorPoolSize` structures containing the same
descriptor type appear in the `pPoolSizes` array then the pool will be
created with enough storage for the total number of descriptors of each
type.

Fragmentation of a descriptor pool is possible and **may** lead to descriptor
set allocation failures.
A failure due to fragmentation is defined as failing a descriptor set
allocation despite the sum of all outstanding descriptor set allocations
from the pool plus the requested allocation requiring no more than the total
number of descriptors requested at pool creation.
Implementations provide certain guarantees of when fragmentation **must** not
cause allocation failure, as described below.

If a descriptor pool has not had any descriptor sets freed since it was
created or most recently reset then fragmentation **must** not cause an
allocation failure (note that this is always the case for a pool created
without the [VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT](VkDescriptorPoolCreateFlagBits.html) bit
set).
Additionally, if all sets allocated from the pool since it was created or
most recently reset use the same number of descriptors (of each type) and
the requested allocation also uses that same number of descriptors (of each
type), then fragmentation **must** not cause an allocation failure.

If an allocation failure occurs due to fragmentation, an application **can**
create an additional descriptor pool to perform further descriptor set
allocations.

If `flags` has the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html)
bit set, descriptor pool creation **may** fail with the error
[VK_ERROR_FRAGMENTATION](VkResult.html) if the total number of descriptors across all
pools (including this one) created with this bit set exceeds
`maxUpdateAfterBindDescriptorsInAllPools`, or if fragmentation of the
underlying hardware resources occurs.

If a `pPoolSizes`[i]::`type` is
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), a
[VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html) structure in the `pNext`
chain **can** be used to specify which mutable descriptor types **can** be
allocated from the pool.
If included in the `pNext` chain,
[VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)::`pMutableDescriptorTypeLists`[i]
specifies which kind of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) descriptors
**can** be allocated from this pool entry.
If [VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html) does not exist in the
`pNext` chain, or
[VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)::`pMutableDescriptorTypeLists`[i]
is out of range, the descriptor pool allocates enough memory to be able to
allocate a [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) descriptor with any
supported [VkDescriptorType](VkDescriptorType.html) as a mutable descriptor.
A mutable descriptor **can** be allocated from a pool entry if the type list in
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) is a subset of the type list declared
in the descriptor pool, or if the pool entry is created without a descriptor
type list.
Multiple `pPoolSizes` entries with [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)
**can** be declared.
When multiple such pool entries are present in `pPoolSizes`, they
specify sets of supported descriptor types which either fully overlap,
partially overlap, or are disjoint.
Two sets fully overlap if the sets of supported descriptor types are equal.
If the sets are not disjoint they partially overlap.
A pool entry without a `VkMutableDescriptorTypeListEXT` assigned to it
is considered to partially overlap any other pool entry which has a
`VkMutableDescriptorTypeListEXT` assigned to it.
The application **must** ensure that partial overlap does not exist in
`pPoolSizes`.

|  | The requirement of no partial overlap is intended to resolve ambiguity for
| --- | --- |
validation as there is no confusion which `pPoolSizes` entries will be
allocated from.
An implementation is not expected to depend on this requirement. |

Valid Usage

* 
[](#VUID-VkDescriptorPoolCreateInfo-descriptorPoolOverallocation-09227) VUID-VkDescriptorPoolCreateInfo-descriptorPoolOverallocation-09227

If the [    `descriptorPoolOverallocation`](../../../../spec/latest/chapters/features.html#features-descriptorPoolOverallocation) feature is not enabled, or
`flags` does not have
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](VkDescriptorPoolCreateFlagBits.html) set,
`maxSets` **must** be greater than `0`

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-09228) VUID-VkDescriptorPoolCreateInfo-flags-09228

If `flags` has the
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](VkDescriptorPoolCreateFlagBits.html) or
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](VkDescriptorPoolCreateFlagBits.html) bits
set, then [    `descriptorPoolOverallocation`](../../../../spec/latest/chapters/features.html#features-descriptorPoolOverallocation) **must** be enabled

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-04607) VUID-VkDescriptorPoolCreateInfo-flags-04607

If `flags` has the [VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](VkDescriptorPoolCreateFlagBits.html)
bit set, then the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html)
bit **must** not be set

* 
[](#VUID-VkDescriptorPoolCreateInfo-mutableDescriptorType-04608) VUID-VkDescriptorPoolCreateInfo-mutableDescriptorType-04608

If
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT.html)::`mutableDescriptorType`
is not enabled, `pPoolSizes` **must** not contain a
`descriptorType` of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-04609) VUID-VkDescriptorPoolCreateInfo-flags-04609

If `flags` has the [VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](VkDescriptorPoolCreateFlagBits.html)
bit set,
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT.html)::`mutableDescriptorType`
**must** be enabled

* 
[](#VUID-VkDescriptorPoolCreateInfo-pPoolSizes-04787) VUID-VkDescriptorPoolCreateInfo-pPoolSizes-04787

If `pPoolSizes` contains a `descriptorType` of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), any other
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) element in `pPoolSizes` **must**
not have sets of supported descriptor types which partially overlap

* 
[](#VUID-VkDescriptorPoolCreateInfo-pPoolSizes-09424) VUID-VkDescriptorPoolCreateInfo-pPoolSizes-09424

If `pPoolSizes` contains a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html), the `pNext` chain
**must** include a [VkDescriptorPoolInlineUniformBlockCreateInfo](VkDescriptorPoolInlineUniformBlockCreateInfo.html)
structure whose `maxInlineUniformBlockBindings` member is not zero

* 
[](#VUID-VkDescriptorPoolCreateInfo-pNext-09946) VUID-VkDescriptorPoolCreateInfo-pNext-09946

If a [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure is
included in the `pNext` chain, each member of
`pProcessingEngines` **must** be identical to an
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with the
`physicalDevice` that was used to create `device`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorPoolCreateInfo-sType-sType) VUID-VkDescriptorPoolCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDescriptorPoolCreateInfo-pNext-pNext) VUID-VkDescriptorPoolCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html), [VkDescriptorPoolInlineUniformBlockCreateInfo](VkDescriptorPoolInlineUniformBlockCreateInfo.html), or [VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)

* 
[](#VUID-VkDescriptorPoolCreateInfo-sType-unique) VUID-VkDescriptorPoolCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-parameter) VUID-VkDescriptorPoolCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html) values

* 
[](#VUID-VkDescriptorPoolCreateInfo-pPoolSizes-parameter) VUID-VkDescriptorPoolCreateInfo-pPoolSizes-parameter

 If `poolSizeCount` is not `0`, `pPoolSizes` **must** be a valid pointer to an array of `poolSizeCount` valid [VkDescriptorPoolSize](VkDescriptorPoolSize.html) structures

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorPoolCreateFlags](VkDescriptorPoolCreateFlags.html), [VkDescriptorPoolSize](VkDescriptorPoolSize.html), [VkStructureType](VkStructureType.html), [vkCreateDescriptorPool](vkCreateDescriptorPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorPoolCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
