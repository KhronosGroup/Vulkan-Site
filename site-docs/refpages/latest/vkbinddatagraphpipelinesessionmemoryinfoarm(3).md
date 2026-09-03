# VkBindDataGraphPipelineSessionMemoryInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindDataGraphPipelineSessionMemoryInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindDataGraphPipelineSessionMemoryInfoARM - Structure describing how to bind a data graph pipeline session to memory

The `VkBindDataGraphPipelineSessionMemoryInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkBindDataGraphPipelineSessionMemoryInfoARM {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDataGraphPipelineSessionARM             session;
    VkDataGraphPipelineSessionBindPointARM    bindPoint;
    uint32_t                                  objectIndex;
    VkDeviceMemory                            memory;
    VkDeviceSize                              memoryOffset;
} VkBindDataGraphPipelineSessionMemoryInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`session` is the data graph pipeline session to be attached to
memory.

* 
`bindPoint` is the data graph pipeline session bind point to which
`memory` is to be attached.

* 
`objectIndex` is the index of the object for `bindPoint` at
which `memory` is to be attached.

* 
`memory` is a [VkDeviceMemory](VkDeviceMemory.html) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the resion of `memory`
which is to be bound to the data graph pipeline session.

Valid Usage

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09785) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09785

`session` **must** not have been bound to a memory object for
`bindPoint`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-09786) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-09786

`bindPoint` **must** have been returned as part of a
[VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html) whose
`bindPointType` member is
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM](VkDataGraphPipelineSessionBindPointTypeARM.html) by a
prior call to [vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html)
for `session`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09787) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09787

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-09788) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-09788

`memory` must have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html) with
`session`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09789) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memoryOffset-09789

`memoryOffset` **must** be an integer multiple of the `alignment`
member of the [VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call
to [vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html) with
`session`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-size-09790) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-size-09790

The `size` member of the [VkMemoryRequirements](VkMemoryRequirements.html) structure
returned from a call to
[vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html) with
`session` **must** be less than or equal to the size of `memory`
minus `memoryOffset`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09791) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09791

If `session` was created with the
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html) bit set,
the session **must** be bound to a memory object allocated with a memory
type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09792) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-09792

If `session` was created with the
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html) bit not
set, the session **must** not be bound to a memory object allocated with a
memory type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-objectIndex-09805) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-objectIndex-09805

`objectIndex` **must** be less than the value of `numObjects`
returned by [vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html)
for `bindPoint`

Valid Usage (Implicit)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-sType-sType) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_DATA_GRAPH_PIPELINE_SESSION_MEMORY_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-pNext-pNext) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-parameter) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) handle

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-parameter) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-bindPoint-parameter

 `bindPoint` **must** be a valid [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html) value

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-parameter) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-commonparent) VUID-VkBindDataGraphPipelineSessionMemoryInfoARM-commonparent

 Both of `memory`, and `session` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html), [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkBindDataGraphPipelineSessionMemoryARM](vkBindDataGraphPipelineSessionMemoryARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkBindDataGraphPipelineSessionMemoryInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
