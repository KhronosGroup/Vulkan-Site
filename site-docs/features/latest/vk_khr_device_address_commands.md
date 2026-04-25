# VK_KHR_device_address_commands

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_device_address_commands.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution space](#_solution_space)
- [2._Solution_space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Address Ranges](#_address_ranges)
- [3.1._Address_Ranges](#_address_ranges)
- [3.2. Address Command Flags](#_address_command_flags)
- [3.2._Address_Command_Flags](#_address_command_flags)
- [3.3. Index and Vertex Binding](#_index_and_vertex_binding)
- [3.3._Index_and_Vertex_Binding](#_index_and_vertex_binding)
- [3.4. Indirect Commands](#_indirect_commands)
- [3.4._Indirect_Commands](#_indirect_commands)
- [3.5. Transfer Commands](#_transfer_commands)
- [3.5._Transfer_Commands](#_transfer_commands)
- [3.6. Synchronization](#_synchronization)
- [3.7. Conditional Rendering](#_conditional_rendering)
- [3.7._Conditional_Rendering](#_conditional_rendering)
- [3.8. Transform Feedback](#_transform_feedback)
- [3.8._Transform_Feedback](#_transform_feedback)
- [3.9. Buffer Markers](#_buffer_markers)
- [3.9._Buffer_Markers](#_buffer_markers)
- [3.10. Acceleration Structures](#_acceleration_structures)
- [3.10._Acceleration_Structures](#_acceleration_structures)
- [3.11. Features](#_features)
- [4. Issues](#_issues)
- [4.1. Why do commands take additional flags?](#_why_do_commands_take_additional_flags)
- [4.1._Why_do_commands_take_additional_flags?](#_why_do_commands_take_additional_flags)
- [4.2. Why does VkDeviceMemoryImageCopyKHR include a layout, rather than the layout being at the top level?](#_why_does_vkdevicememoryimagecopykhr_include_a_layout_rather_than_the_layout_being_at_the_top_level)
- [4.2._Why_does_VkDeviceMemoryImageCopyKHR_include_a_layout,_rather_than_the_layout_being_at_the_top_level?](#_why_does_vkdevicememoryimagecopykhr_include_a_layout_rather_than_the_layout_being_at_the_top_level)
- [5. Further Work](#_further_work)
- [5._Further_Work](#_further_work)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Address Ranges](#_address_ranges)
[3.2. Address Command Flags](#_address_command_flags)
[3.3. Index and Vertex Binding](#_index_and_vertex_binding)
[3.4. Indirect Commands](#_indirect_commands)
[3.5. Transfer Commands](#_transfer_commands)
[3.6. Synchronization](#_synchronization)
[3.7. Conditional Rendering](#_conditional_rendering)
[3.8. Transform Feedback](#_transform_feedback)
[3.9. Buffer Markers](#_buffer_markers)
[3.10. Acceleration Structures](#_acceleration_structures)
[3.11. Features](#_features)

[4. Issues](#_issues)

[4.1. Why do commands take additional flags?](#_why_do_commands_take_additional_flags)
[4.2. Why does VkDeviceMemoryImageCopyKHR include a layout, rather than the layout being at the top level?](#_why_does_vkdevicememoryimagecopykhr_include_a_layout_rather_than_the_layout_being_at_the_top_level)

[5. Further Work](#_further_work)

This extension enables applications to use device addresses in place of buffer objects for core functionality.

With the introduction of VK_KHR_buffer_device_address and its subsequent inclusion in Vulkan 1.2, applications have been able to obtain device addresses for buffers for use both in shaders and more recent extensions.

However, existing functionality still uses buffer objects, requiring that applications pass both buffer handles and device addresses around in order to have all bases covered.

This inconsistency should be addressed, so that applications only need to pass one handle around.

There only two real options for addressing this in the API - revise newer functionality to have versions which accept buffer objects, or revise older functionality to accept device addresses.
Revising newer functionality to support buffer handles would likely be a backwards step as device addresses become more widely used, so this extension adds new versions of older functions that accept addresses.

Many existing core and extension APIs use buffers rather than device addresses.
The following functions are added by this extension to replace existing functions with equivalents that accept device address ranges, rather than buffer objects and offsets.

This extension requires VK_KHR_buffer_device_address, VK_KHR_synchronization2, and VK_KHR_copy_commands2; all of which are satisfied by a Vulkan 1.3 implementation.

`VkDeviceAddressRangeKHR` describes the base address and size of the allocation to be used, which previously would have been described by a `VkBuffer` and an offset in many commands.

typedef struct VkDeviceAddressRangeKHR {
    VkDeviceAddress     address;
    VkDeviceSize        size;
} VkDeviceAddressRangeKHR;

When using a `VkDeviceAddressRangeKHR`, robust buffer access features work more or less as they always did, noting that out-of-bounds (OOB) accesses are now defined as outside of the specified range. For `robustBufferAccess`, OOB accesses can still return values from memory beyond the specified range as long as they are bound to the underlying buffer. For `robustBufferAccess2`, only values in the range or zeroes can be returned (factoring in alignment restrictions).

In many commands a stride is additionally needed, which can be specified with:

typedef struct VkStridedDeviceAddressRangeKHR {
    VkDeviceAddress     address;
    VkDeviceSize        size;
    VkDeviceSize        stride;
} VkStridedDeviceAddressRangeKHR;

Other than the additional specification of the stride, this functions identically to `VkDeviceAddressRangeKHR` and is validated in the same way.

Implementations may be able to optimize accesses when provided with additional information about an address.
Device address commands can take an additional set of flags; these are generally provided as hints, with the one exception of protected memory.

typedef enum VkAddressCommandFlagBitsKHR {
    VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR                                = 0x00000001,
    VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR                              = 0x00000002,
    VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR                     = 0x00000004,
    VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR             = 0x00000008,
    VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR          = 0x00000010,
    VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR  = 0x00000020,
} VkAddressCommandFlagBitsKHR;

typedef VkFlags VkAddressCommandFlagsKHR;

These flags indicate the following about an address range, as follows:

* 
`VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR` must be set if the memory is allocated from a protected memory type, and must not be set otherwise.

* 
`VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR` specifies that the address will be fully bound to physical memory when accessed. Must not be set if any part of the range is unbound at the point of access.

* 
`VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR` specifies that all buffers containing any part of the address range are created with `VK_BUFFER_USAGE_STORAGE_BUFFER_BIT`.

* 
`VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR` specifies that whether `VK_BUFFER_USAGE_STORAGE_BUFFER_BIT` was specified or not is unknown.

* 
`VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR` specifies that all buffers containing any part of the address range are created with `VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT`.

* 
`VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR` specifies that whether `VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT` was specified or not is unknown.

`VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR` and `VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR` must not be set together.
If neither is specified, the address must come from a buffer allocated without `VK_BUFFER_USAGE_STORAGE_BUFFER_BIT` usage.
`VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR` and `VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR` must not be set together.
If neither is specified, the address must come from a buffer allocated without `VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT` usage.

|  | The storage and transform feedback buffer flags consider aliases; if any buffers that any part of the address range overlaps with were created with/without the corresponding usage flags, they must be considered when setting this flag.
| --- | --- |
For example, if the `VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR` flag is set, all buffers which include the specified address range must include the SSBO usage flag.
Applications can avoid this situation by ensuring that different buffers are not bound to overlapping ranges of the same VkDeviceMemory object. |

Index and vertex binding functions work as they did before, but now taking address ranges.

typedef struct VkBindIndexBuffer3InfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
    VkIndexType                                 indexType;
} VkBindIndexBuffer3InfoKHR;

void vkCmdBindIndexBuffer3KHR(
    VkCommandBuffer                             commandBuffer,
    const VkBindIndexBuffer3InfoKHR*            pInfo);

typedef struct VkBindVertexBuffer3InfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkBool32                                    setStride;
    VkStridedDeviceAddressRangeKHR              addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
} VkBindVertexBuffer3InfoKHR;

void vkCmdBindVertexBuffers3KHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBindVertexBuffer3InfoKHR*           pBindingInfos);

These binding commands interact directly with equivalent buffer bindings, and a mixture of these functions can be used.

Indirect draw and dispatch commands that currently take buffer arguments now take device address ranges instead, but are otherwise entirely unchanged.

typedef struct VkDrawIndirect2InfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkStridedDeviceAddressRangeKHR              addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
    uint32_t                                    drawCount;
} VkDrawIndirect2InfoKHR;

typedef struct VkDrawIndirectCount2InfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkStridedDeviceAddressRangeKHR              addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
    VkDeviceAddressRangeKHR                     countAddressRange;
    VkAddressCommandFlagsKHR                    countAddressFlags;
    uint32_t                                    maxDrawCount;
} VkDrawIndirectCount2InfoKHR;

typedef struct VkDispatchIndirect2InfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
} VkDispatchIndirect2InfoKHR;

void vkCmdDrawIndirect2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirect2InfoKHR*               pInfo);

void vkCmdDrawIndexedIndirect2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirect2InfoKHR*               pInfo);

void vkCmdDrawIndirectCount2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirectCount2InfoKHR*          pInfo);

void vkCmdDrawIndexedIndirectCount2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirectCount2InfoKHR*          pInfo);

void vkCmdDrawMeshTasksIndirect2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirect2InfoKHR*               pInfo);

void vkCmdDrawMeshTasksIndirectCount2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkDrawIndirectCount2InfoKHR*          pInfo);

void vkCmdDispatchIndirect2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDispatchIndirect2InfoKHR*           pInfo);

`vkCmdDrawMesh*` commands are added as an interaction with [VK_EXT_mesh_shader](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_mesh_shader.html), and `vkCmdDraw*IndirectCount2KHR` commands are added as an interaction with [VK_KHR_draw_indirect_count](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_draw_indirect_count.html) or Vulkan 1.2.

Transfer commands involving buffer objects including copies, update, and fill, are modified to accept device addresses instead of buffer objects, and are renamed accordingly.
Copy commands are based on [VK_KHR_copy_commands2](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_copy_commands2.html), which is required by this extension.

typedef struct VkDeviceMemoryCopyKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDeviceAddressRangeKHR                     srcRange;
    VkAddressCommandFlagsKHR                    srcFlags;
    VkDeviceAddressRangeKHR                     dstRange;
    VkAddressCommandFlagsKHR                    dstFlags;
} VkDeviceMemoryCopyKHR;

typedef struct VkCopyDeviceMemoryInfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    regionCount;
    const VkDeviceMemoryCopyKHR*                pRegions;
} VkCopyDeviceMemoryInfoKHR;

void vkCmdCopyMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyDeviceMemoryInfoKHR*            pCopyMemoryInfo);

typedef struct VkDeviceMemoryImageCopyKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
    uint32_t                                    addressRowLength;
    uint32_t                                    addressImageHeight;
    VkImageSubresourceLayers                    imageSubresource;
    VkImageLayout                               imageLayout;
    VkOffset3D                                  imageOffset;
    VkExtent3D                                  imageExtent;
} VkDeviceMemoryImageCopyKHR;

typedef struct VkCopyDeviceMemoryImageInfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkImage                                     image;
    uint32_t                                    regionCount;
    const VkDeviceMemoryImageCopyKHR*           pRegions;
} VkCopyDeviceMemoryImageInfoKHR;

void vkCmdCopyMemoryToImageKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyDeviceMemoryImageInfoKHR*       pCopyMemoryInfo);

void vkCmdCopyImageToMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyDeviceMemoryImageInfoKHR*       pCopyMemoryInfo);

void vkCmdUpdateMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkDeviceAddressRangeKHR*              pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    VkDeviceSize                                dataSize,
    const void*                                 pData);

void vkCmdFillMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkDeviceAddressRangeKHR*              pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    uint32_t                                    data);

void vkCmdCopyQueryPoolResultsToMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount,
    const VkStridedDeviceAddressRangeKHR*       pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    VkQueryResultFlags                          queryResultFlags);

A new memory barrier type is added that accepts a memory range directly instead of a buffer object:

typedef struct VkMemoryRangeBarriersInfoKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    memoryRangeBarrierCount;
    const VkMemoryRangeBarrierKHR*              pMemoryRangeBarriers;
} VkMemoryRangeBarriersInfoKHR;

typedef struct VkMemoryRangeBarrierKHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkPipelineStageFlags2                       srcStageMask;
    VkAccessFlags2                              srcAccessMask;
    VkPipelineStageFlags2                       dstStageMask;
    VkAccessFlags2                              dstAccessMask;
    uint32_t                                    srcQueueFamilyIndex;
    uint32_t                                    dstQueueFamilyIndex;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
} VkMemoryRangeBarrierKHR;

`VkMemoryRangeBarriersInfoKHR` can be chained to [VkDependencyInfo](https://docs.vulkan.org/spec/latest//chapters/synchronization.html#VkDependencyInfo.html) structures to define memory dependencies on memory ranges directly, rather than buffer objects.

A revised version of [vkCmdBeginConditionalRenderingEXT](https://docs.vulkan.org/spec/latest/appendices/extensions.html#vkCmdBeginConditionalRenderingEXT.html) is added when [VK_EXT_conditional_rendering](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_conditional_rendering.html) is supported, that functions identically but takes an address range instead of a buffer and offset:

typedef struct VkConditionalRenderingBeginInfo2EXT {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
    VkConditionalRenderingFlagsEXT              flags;
} VkConditionalRenderingBeginInfo2EXT;

void vkCmdBeginConditionalRendering2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkConditionalRenderingBeginInfo2EXT*  pConditionalRenderingBegin);

Transform feedback commands added by [VK_EXT_transform_feedback](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_transform_feedback.html) now accept address ranges rather than buffer objects, but are otherwise unmodified.

typedef struct VkBindTransformFeedbackBuffer2InfoEXT {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
} VkBindTransformFeedbackBuffer2InfoEXT;

void vkCmdBindTransformFeedbackBuffers2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pBindingInfos);

void vkCmdBeginTransformFeedback2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterRange,
    uint32_t                                    counterRangeCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfos);

void vkCmdEndTransformFeedback2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterRange,
    uint32_t                                    counterRangeCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfos);

void vkCmdDrawIndirectByteCount2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    instanceCount,
    uint32_t                                    firstInstance,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfo,
    uint32_t                                    counterOffset,
    uint32_t                                    vertexStride);

If [VK_AMD_buffer_marker](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_AMD_buffer_marker.html) is supported, a new function is added that accepts an address rather than a buffer.
As precisely one `uint32_t` value is always written by this command, there is no associated size for the address.

typedef struct VkMemoryMarkerInfoAMD {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkPipelineStageFlags2KHR                    stage;
    VkDeviceAddressRangeKHR                     dstRange;
    VkAddressCommandFlagsKHR                    dstFlags;
    uint32_t                                    marker;
} VkMemoryMarkerInfoAMD;

void vkCmdWriteMarkerToMemoryAMD(
    VkCommandBuffer                             commandBuffer,
    const VkMemoryMarkerInfoAMD*                pInfo);

If [VK_KHR_acceleration_structure](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_acceleration_structure.html) is supported, a new function is added that accepts an address rather than a buffer.

typedef struct VkAccelerationStructureCreateInfo2KHR {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkAccelerationStructureCreateFlagsKHR       createFlags;
    VkDeviceAddressRangeKHR                     addressRange;
    VkAddressCommandFlagsKHR                    addressFlags;
    VkAccelerationStructureTypeKHR              type;
} VkAccelerationStructureCreateInfo2KHR;

VkResult vkCreateAccelerationStructure2KHR(
    VkDevice                                     device,
    const VkAccelerationStructureCreateInfo2KHR* pCreateInfo,
    const VkAllocationCallbacks*                 pAllocator,
    VkAccelerationStructureKHR*                  pAccelerationStructure);

Acceleration structure host commands cannot be used with acceleration structures created using `vkCreateAccelerationStructure2KHR`, and the `accelerationStructureHostCommands` feature must be `VK_FALSE`.

The following feature enables this extension:

typedef struct VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR {
    VkStructureType                             sType;
    void*                                       pNext;
    VkBool32                                    deviceAddressCommands;
} VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR;

This information is needed by some implementations.

This is a small opportune tweak; as copies may be to/from different subresources in the same image, which may be in different layouts, this allows copies between them and memory in a single command.

TBD.
