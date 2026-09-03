# GPU Performance API Interface

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/gpa_interface.html

## Table of Contents

- [GPU Performance API Objects](#_gpu_performance_api_objects)
- [GPU_Performance_API_Objects](#_gpu_performance_api_objects)
- [Beginning, ending, copying, and resetting a session](#_beginning_ending_copying_and_resetting_a_session)
- [Beginning,_ending,_copying,_and_resetting_a_session](#_beginning_ending_copying_and_resetting_a_session)
- [Beginning and ending sampling](#_beginning_and_ending_sampling)
- [Beginning_and_ending_sampling](#_beginning_and_ending_sampling)
- [Controlling GPU clocks](#_controlling_gpu_clocks)
- [Controlling_GPU_clocks](#_controlling_gpu_clocks)
- [Session status and results querying](#_session_status_and_results_querying)
- [Session_status_and_results_querying](#_session_status_and_results_querying)

## Content

The GPU Performance API (GPA) interface gives access to GPU performance
counters, streaming performance monitors (SPM), and thread traces (SQTT),
which help analyze the performance and execution characteristics of
applications.

GPU Performance API (GPA) session objects hold the results of sampled
performance counters and are represented by `VkGpaSessionAMD` handles:

// Provided by VK_AMD_gpa_interface
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkGpaSessionAMD)

To create a GPA session object, call:

// Provided by VK_AMD_gpa_interface
VkResult vkCreateGpaSessionAMD(
    VkDevice                                    device,
    const VkGpaSessionCreateInfoAMD*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkGpaSessionAMD*                            pGpaSession);

* 
`device` is the logical device that creates the GPA session object.

* 
`pCreateInfo` is a pointer to a [VkGpaSessionCreateInfoAMD](#VkGpaSessionCreateInfoAMD)
structure containing information about how the GPA session object is to
be created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pGpaSession` is a pointer to a handle in which the resulting GPA
session object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateGpaSessionAMD-device-parameter) VUID-vkCreateGpaSessionAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateGpaSessionAMD-pCreateInfo-parameter) VUID-vkCreateGpaSessionAMD-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkGpaSessionCreateInfoAMD](#VkGpaSessionCreateInfoAMD) structure

* 
[](#VUID-vkCreateGpaSessionAMD-pAllocator-parameter) VUID-vkCreateGpaSessionAMD-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateGpaSessionAMD-pGpaSession-parameter) VUID-vkCreateGpaSessionAMD-pGpaSession-parameter

 `pGpaSession` **must** be a valid pointer to a [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkCreateGpaSessionAMD-device-queuecount) VUID-vkCreateGpaSessionAMD-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkGpaSessionCreateInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaSessionCreateInfoAMD {
    VkStructureType    sType;
    const void*        pNext;
    VkGpaSessionAMD    secondaryCopySource;
} VkGpaSessionCreateInfoAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`secondaryCopySource` is a `VkGpaSessionAMD` handle whose
results **can** be copied into this session.

When sampling counters inside secondary command buffers, repeated
invocations of the same secondary command buffer causes the previous results
to be overwritten.
To avoid this a GPA session object’s memory layout **can** be cloned for use
with multiple secondary invocations by specifying its handle in
`secondaryCopySource`, allowing the new GPA session object to be the
target of a copy using [vkCmdCopyGpaSessionResultsAMD](#vkCmdCopyGpaSessionResultsAMD).

Valid Usage

* 
[](#VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-12461) VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-12461

`secondaryCopySource` **must** have been used previously to begin and
end a session, and it **must** not have been reset since then

Valid Usage (Implicit)

* 
[](#VUID-VkGpaSessionCreateInfoAMD-sType-sType) VUID-VkGpaSessionCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_SESSION_CREATE_INFO_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGpaSessionCreateInfoAMD-pNext-pNext) VUID-VkGpaSessionCreateInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-parameter) VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-parameter

 If `secondaryCopySource` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `secondaryCopySource` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

To destroy a GPA session object, call:

// Provided by VK_AMD_gpa_interface
void vkDestroyGpaSessionAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the GPA session.

* 
`gpaSession` is the handle of the GPA session to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyGpaSessionAMD-gpaSession-12408) VUID-vkDestroyGpaSessionAMD-gpaSession-12408

All submitted commands that refer to `gpaSession` **must** have
completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyGpaSessionAMD-device-parameter) VUID-vkDestroyGpaSessionAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyGpaSessionAMD-gpaSession-parameter) VUID-vkDestroyGpaSessionAMD-gpaSession-parameter

 If `gpaSession` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkDestroyGpaSessionAMD-pAllocator-parameter) VUID-vkDestroyGpaSessionAMD-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyGpaSessionAMD-gpaSession-parent) VUID-vkDestroyGpaSessionAMD-gpaSession-parent

 If `gpaSession` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `gpaSession` **must** be externally synchronized

Performance counters are sampled between calls to
[vkCmdBeginGpaSessionAMD](#vkCmdBeginGpaSessionAMD) and [vkCmdEndGpaSessionAMD](#vkCmdEndGpaSessionAMD).
As long as they are executed in order, [vkCmdBeginGpaSessionAMD](#vkCmdBeginGpaSessionAMD) and
[vkCmdEndGpaSessionAMD](#vkCmdEndGpaSessionAMD) **can** span multiple command buffers.

If a session is reused after calling [vkCmdEndGpaSessionAMD](#vkCmdEndGpaSessionAMD), the
session **must** first be reset using [vkResetGpaSessionAMD](#vkResetGpaSessionAMD).

To begin a GPA session, call:

// Provided by VK_AMD_gpa_interface
VkResult vkCmdBeginGpaSessionAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session to begin.

Valid Usage

* 
[](#VUID-vkCmdBeginGpaSessionAMD-gpaSession-12409) VUID-vkCmdBeginGpaSessionAMD-gpaSession-12409

If `gpaSession` has been used previously to begin and end a session,
[vkResetGpaSessionAMD](#vkResetGpaSessionAMD) **must** have first been called

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-12410) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-12410

If another GPA session has been started with
`vkCmdBeginGpaSessionAMD` in `commandBuffer`, it **must** have been
ended using [vkCmdEndGpaSessionAMD](#vkCmdEndGpaSessionAMD) before this call

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-parameter) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginGpaSessionAMD-gpaSession-parameter) VUID-vkCmdBeginGpaSessionAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-recording) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commandBuffer-cmdpool) VUID-vkCmdBeginGpaSessionAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginGpaSessionAMD-suspended) VUID-vkCmdBeginGpaSessionAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginGpaSessionAMD-videocoding) VUID-vkCmdBeginGpaSessionAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginGpaSessionAMD-commonparent) VUID-vkCmdBeginGpaSessionAMD-commonparent

 Both of `commandBuffer`, and `gpaSession` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginGpaSessionAMD is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To end a GPA session, call:

// Provided by VK_AMD_gpa_interface
VkResult vkCmdEndGpaSessionAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session to end.

Valid Usage

* 
[](#VUID-vkCmdEndGpaSessionAMD-gpaSession-12411) VUID-vkCmdEndGpaSessionAMD-gpaSession-12411

`gpaSession` **must** have previously begun using
[vkCmdBeginGpaSessionAMD](#vkCmdBeginGpaSessionAMD)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndGpaSessionAMD-commandBuffer-parameter) VUID-vkCmdEndGpaSessionAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndGpaSessionAMD-gpaSession-parameter) VUID-vkCmdEndGpaSessionAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkCmdEndGpaSessionAMD-commandBuffer-recording) VUID-vkCmdEndGpaSessionAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndGpaSessionAMD-commandBuffer-cmdpool) VUID-vkCmdEndGpaSessionAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndGpaSessionAMD-suspended) VUID-vkCmdEndGpaSessionAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndGpaSessionAMD-videocoding) VUID-vkCmdEndGpaSessionAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndGpaSessionAMD-commonparent) VUID-vkCmdEndGpaSessionAMD-commonparent

 Both of `commandBuffer`, and `gpaSession` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndGpaSessionAMD is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Executing secondary command buffers multiple times, that themselves record
results into sessions, causes their results to be overwritten.
To prevent results from being lost due to subsequent executions, the results
**can** be copied into another session.

To copy the results of a GPA session into another, call:

// Provided by VK_AMD_gpa_interface
void vkCmdCopyGpaSessionResultsAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session that is the
destination of the copy.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-parameter) VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-gpaSession-parameter) VUID-vkCmdCopyGpaSessionResultsAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-recording) VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-cmdpool) VUID-vkCmdCopyGpaSessionResultsAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-suspended) VUID-vkCmdCopyGpaSessionResultsAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-videocoding) VUID-vkCmdCopyGpaSessionResultsAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyGpaSessionResultsAMD-commonparent) VUID-vkCmdCopyGpaSessionResultsAMD-commonparent

 Both of `commandBuffer`, and `gpaSession` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action

State |

Conditional Rendering

vkCmdCopyGpaSessionResultsAMD is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The source of the copy is the GPA session handle provided when
`gpaSession` was created.

To reset a GPA session for reuse, call:

// Provided by VK_AMD_gpa_interface
VkResult vkResetGpaSessionAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession);

* 
`device` is the logical device the GPA session was created from.

* 
`gpaSession` is the handle of the GPA session to reset.

Valid Usage (Implicit)

* 
[](#VUID-vkResetGpaSessionAMD-device-parameter) VUID-vkResetGpaSessionAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkResetGpaSessionAMD-gpaSession-parameter) VUID-vkResetGpaSessionAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkResetGpaSessionAMD-gpaSession-parent) VUID-vkResetGpaSessionAMD-gpaSession-parent

 `gpaSession` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Resetting a session object has less overhead than destroying and then
creating a new one.

Once a session has begun, samples can then be captured during the command
buffer execution.

To begin a GPA sample, call:

// Provided by VK_AMD_gpa_interface
VkResult vkCmdBeginGpaSampleAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession,
    const VkGpaSampleBeginInfoAMD*              pGpaSampleBeginInfo,
    uint32_t*                                   pSampleID);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session to record the sample.

* 
`pGpaSampleBeginInfo` is a pointer to a
[VkGpaSampleBeginInfoAMD](#VkGpaSampleBeginInfoAMD) structure describing the sample
parameters.

* 
`pSampleID` is the unique sample ID returned for this sample.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginGpaSampleAMD-commandBuffer-parameter) VUID-vkCmdBeginGpaSampleAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginGpaSampleAMD-gpaSession-parameter) VUID-vkCmdBeginGpaSampleAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkCmdBeginGpaSampleAMD-pGpaSampleBeginInfo-parameter) VUID-vkCmdBeginGpaSampleAMD-pGpaSampleBeginInfo-parameter

 `pGpaSampleBeginInfo` **must** be a valid pointer to a valid [VkGpaSampleBeginInfoAMD](#VkGpaSampleBeginInfoAMD) structure

* 
[](#VUID-vkCmdBeginGpaSampleAMD-pSampleID-parameter) VUID-vkCmdBeginGpaSampleAMD-pSampleID-parameter

 `pSampleID` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkCmdBeginGpaSampleAMD-commandBuffer-recording) VUID-vkCmdBeginGpaSampleAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginGpaSampleAMD-commandBuffer-cmdpool) VUID-vkCmdBeginGpaSampleAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginGpaSampleAMD-suspended) VUID-vkCmdBeginGpaSampleAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginGpaSampleAMD-videocoding) VUID-vkCmdBeginGpaSampleAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginGpaSampleAMD-commonparent) VUID-vkCmdBeginGpaSampleAMD-commonparent

 Both of `commandBuffer`, and `gpaSession` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginGpaSampleAMD is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkGpaSampleBeginInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaSampleBeginInfoAMD {
    VkStructureType               sType;
    const void*                   pNext;
    VkGpaSampleTypeAMD            sampleType;
    VkBool32                      sampleInternalOperations;
    VkBool32                      cacheFlushOnCounterCollection;
    VkBool32                      sqShaderMaskEnable;
    VkGpaSqShaderStageFlagsAMD    sqShaderMask;
    uint32_t                      perfCounterCount;
    const VkGpaPerfCounterAMD*    pPerfCounters;
    uint32_t                      streamingPerfTraceSampleInterval;
    VkDeviceSize                  perfCounterDeviceMemoryLimit;
    VkBool32                      sqThreadTraceEnable;
    VkBool32                      sqThreadTraceSuppressInstructionTokens;
    VkDeviceSize                  sqThreadTraceDeviceMemoryLimit;
    VkPipelineStageFlags          timingPreSample;
    VkPipelineStageFlags          timingPostSample;
} VkGpaSampleBeginInfoAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleType` is a [VkGpaSampleTypeAMD](#VkGpaSampleTypeAMD) value specifying the type
of sample.

* 
`sampleInternalOperations` is a boolean indicating whether internal
driver operations are included in the results.

* 
`cacheFlushOnCounterCollection` is a boolean indicating whether the
driver should insert cache flush and invalidate events before and after
every sample.

* 
`sqShaderMaskEnable` is a boolean indicating whether
`sqShaderMask` specifies the shader stages to sample.
If [VK_FALSE](fundamentals.html#VK_FALSE), all shader stages are sampled.

* 
`sqShaderMask` is a bitmask of [VkGpaSqShaderStageFlagBitsAMD](#VkGpaSqShaderStageFlagBitsAMD)
values specifying which shader stages to sample.
Shader stage bits that are not relevant to the specific device are
ignored.

* 
`perfCounterCount` is the number of counters in the
`pPerfCounters` array

* 
`pPerfCounters` is a pointer to an array of
[VkGpaPerfCounterAMD](#VkGpaPerfCounterAMD) structures specifying the counters to be
sampled.
If `sampleType` is [VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD](#VkGpaSampleTypeAMD)
`pPerfCounters` specifies the counters that are sampled at the
beginning and at end of the sample period.
If `sampleType` is [VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD) then the SPM
data will be added to the samples RGP data blob.

* 
`streamingPerfTraceSampleInterval` is a value specifying the period
for SPM samples in cycles, and is ignored if `sampleType` is not
[VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD).

* 
`perfCounterDeviceMemoryLimit` is a value specifying the maximum
amount of GPU memory that this sample can allocate for SPM data.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD) this value
is ignored.

* 
`sqThreadTraceEnable` is a boolean specifying whether SQTT data
should be included.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD) this value
is ignored.

* 
`sqThreadTraceSuppressInstructionTokens` is a boolean specifying
whether instruction-level SQTT tokens should be captured.
If [VK_FALSE](fundamentals.html#VK_FALSE), the amount of sample data is significantly reduced.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD) this value
is ignored.

* 
`sqThreadTraceDeviceMemoryLimit` is a value specifying the maximum
amount of GPU memory in bytes that this sample can allocate for the SQTT
buffer.
If `0`, the maximum size to prevent dropping tokens towards the end of
the sample is allocated.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD) this value
is ignored.

* 
`timingPreSample` is a [VkPipelineStageFlags2](synchronization.html#VkPipelineStageFlags2) mask of pipeline
stages specifying where the begin timestamp should take place.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TIMING_AMD](#VkGpaSampleTypeAMD) this
value is ignored.

* 
`timingPostSample` is a [VkPipelineStageFlags2](synchronization.html#VkPipelineStageFlags2) mask of pipeline
stages specifying where the end timestamp should take place.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TIMING_AMD](#VkGpaSampleTypeAMD) this
value is ignored.

Valid Usage

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sampleType-12412) VUID-VkGpaSampleBeginInfoAMD-sampleType-12412

If `sampleType` is [VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD](#VkGpaSampleTypeAMD), the
[    `VkPhysicalDeviceGpaFeaturesAMD`::`perfCounters`](features.html#features-perfCounters) feature **must**
be enabled

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sampleType-12413) VUID-VkGpaSampleBeginInfoAMD-sampleType-12413

If `sampleType` is [VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD), at least one
of the [    `VkPhysicalDeviceGpaFeaturesAMD`::`streamingPerfCounters`](features.html#features-streamingPerfCounters) or
[    `VkPhysicalDeviceGpaFeaturesAMD`::`sqThreadTracing`](features.html#features-sqThreadTracing) features
**must** be enabled

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sqThreadTraceEnable-12414) VUID-VkGpaSampleBeginInfoAMD-sqThreadTraceEnable-12414

If `sqThreadTraceEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), the
[    `VkPhysicalDeviceGpaFeaturesAMD`::`sqThreadTracing`](features.html#features-sqThreadTracing) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sType-sType) VUID-VkGpaSampleBeginInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_SAMPLE_BEGIN_INFO_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGpaSampleBeginInfoAMD-pNext-pNext) VUID-VkGpaSampleBeginInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sampleType-parameter) VUID-VkGpaSampleBeginInfoAMD-sampleType-parameter

 `sampleType` **must** be a valid [VkGpaSampleTypeAMD](#VkGpaSampleTypeAMD) value

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sqShaderMask-parameter) VUID-VkGpaSampleBeginInfoAMD-sqShaderMask-parameter

 `sqShaderMask` **must** be a valid combination of [VkGpaSqShaderStageFlagBitsAMD](#VkGpaSqShaderStageFlagBitsAMD) values

* 
[](#VUID-VkGpaSampleBeginInfoAMD-pPerfCounters-parameter) VUID-VkGpaSampleBeginInfoAMD-pPerfCounters-parameter

 `pPerfCounters` **must** be a valid pointer to an array of `perfCounterCount` valid [VkGpaPerfCounterAMD](#VkGpaPerfCounterAMD) structures

* 
[](#VUID-VkGpaSampleBeginInfoAMD-timingPreSample-parameter) VUID-VkGpaSampleBeginInfoAMD-timingPreSample-parameter

 `timingPreSample` **must** be a valid combination of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkGpaSampleBeginInfoAMD-timingPostSample-parameter) VUID-VkGpaSampleBeginInfoAMD-timingPostSample-parameter

 `timingPostSample` **must** be a valid combination of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkGpaSampleBeginInfoAMD-perfCounterCount-arraylength) VUID-VkGpaSampleBeginInfoAMD-perfCounterCount-arraylength

 `perfCounterCount` **must** be greater than `0`

Values which **can** be set in [VkGpaSampleBeginInfoAMD](#VkGpaSampleBeginInfoAMD)::`sampleType`
are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaSampleTypeAMD {
    VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD = 0,
    VK_GPA_SAMPLE_TYPE_TRACE_AMD = 1,
    VK_GPA_SAMPLE_TYPE_TIMING_AMD = 2,
} VkGpaSampleTypeAMD;

* 
[VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD](#VkGpaSampleTypeAMD) specifies that one 64-bit result
will be returned per global performance counter, representing the
cumulative delta for that counter over the sample period.
Cumulative samples **must** begin and end in the same command buffer.

* 
[VK_GPA_SAMPLE_TYPE_TRACE_AMD](#VkGpaSampleTypeAMD) specifies that a buffer will be
filled with SQTT results data in RGP file format, and/or streaming
performance monitor data.
Trace samples **may** span multiple command buffers.

* 
[VK_GPA_SAMPLE_TYPE_TIMING_AMD](#VkGpaSampleTypeAMD) specifies that two 64-bit results
will be recorded to gather timestamp data.

Bits which **can** be set to control which GPU shader stages are sampled, are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaSqShaderStageFlagBitsAMD {
    VK_GPA_SQ_SHADER_STAGE_PS_BIT_AMD = 0x00000001,
    VK_GPA_SQ_SHADER_STAGE_VS_BIT_AMD = 0x00000002,
    VK_GPA_SQ_SHADER_STAGE_GS_BIT_AMD = 0x00000004,
    VK_GPA_SQ_SHADER_STAGE_ES_BIT_AMD = 0x00000008,
    VK_GPA_SQ_SHADER_STAGE_HS_BIT_AMD = 0x00000010,
    VK_GPA_SQ_SHADER_STAGE_LS_BIT_AMD = 0x00000020,
    VK_GPA_SQ_SHADER_STAGE_CS_BIT_AMD = 0x00000040,
} VkGpaSqShaderStageFlagBitsAMD;

* 
[VK_GPA_SQ_SHADER_STAGE_PS_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the pixel shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_VS_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the vertex shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_GS_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the geometry shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_ES_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the export shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_HS_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the hull shader stage.

* 
[VK_GPA_SQ_SHADER_STAGE_LS_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the local shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_CS_BIT_AMD](#VkGpaSqShaderStageFlagBitsAMD) specifies the compute shader
stage.

// Provided by VK_AMD_gpa_interface
typedef VkFlags VkGpaSqShaderStageFlagsAMD;

`VkGpaSqShaderStageFlagsAMD` is a bitmask type for setting a mask of
zero or more [VkGpaSqShaderStageFlagBitsAMD](#VkGpaSqShaderStageFlagBitsAMD).

The `VkGpaPerfCounterAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaPerfCounterAMD {
    VkGpaPerfBlockAMD    blockType;
    uint32_t             blockInstance;
    uint32_t             eventID;
} VkGpaPerfCounterAMD;

* 
`blockType` is a [VkGpaPerfBlockAMD](#VkGpaPerfBlockAMD) value specifying the GPU
block type to sample.

* 
`blockInstance` is a value specifying which instance of the GPU
block to sample.

* 
`eventID` is a value specifying the hardware-specific identifier of
the performance counter to sample.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaPerfCounterAMD-blockType-parameter) VUID-VkGpaPerfCounterAMD-blockType-parameter

 `blockType` **must** be a valid [VkGpaPerfBlockAMD](#VkGpaPerfBlockAMD) value

Values which **can** be set in [VkGpaPerfCounterAMD](#VkGpaPerfCounterAMD)::`blockType` are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaPerfBlockAMD {
    VK_GPA_PERF_BLOCK_CPF_AMD = 0,
    VK_GPA_PERF_BLOCK_IA_AMD = 1,
    VK_GPA_PERF_BLOCK_VGT_AMD = 2,
    VK_GPA_PERF_BLOCK_PA_AMD = 3,
    VK_GPA_PERF_BLOCK_SC_AMD = 4,
    VK_GPA_PERF_BLOCK_SPI_AMD = 5,
    VK_GPA_PERF_BLOCK_SQ_AMD = 6,
    VK_GPA_PERF_BLOCK_SX_AMD = 7,
    VK_GPA_PERF_BLOCK_TA_AMD = 8,
    VK_GPA_PERF_BLOCK_TD_AMD = 9,
    VK_GPA_PERF_BLOCK_TCP_AMD = 10,
    VK_GPA_PERF_BLOCK_TCC_AMD = 11,
    VK_GPA_PERF_BLOCK_TCA_AMD = 12,
    VK_GPA_PERF_BLOCK_DB_AMD = 13,
    VK_GPA_PERF_BLOCK_CB_AMD = 14,
    VK_GPA_PERF_BLOCK_GDS_AMD = 15,
    VK_GPA_PERF_BLOCK_SRBM_AMD = 16,
    VK_GPA_PERF_BLOCK_GRBM_AMD = 17,
    VK_GPA_PERF_BLOCK_GRBM_SE_AMD = 18,
    VK_GPA_PERF_BLOCK_RLC_AMD = 19,
    VK_GPA_PERF_BLOCK_DMA_AMD = 20,
    VK_GPA_PERF_BLOCK_MC_AMD = 21,
    VK_GPA_PERF_BLOCK_CPG_AMD = 22,
    VK_GPA_PERF_BLOCK_CPC_AMD = 23,
    VK_GPA_PERF_BLOCK_WD_AMD = 24,
    VK_GPA_PERF_BLOCK_TCS_AMD = 25,
    VK_GPA_PERF_BLOCK_ATC_AMD = 26,
    VK_GPA_PERF_BLOCK_ATC_L2_AMD = 27,
    VK_GPA_PERF_BLOCK_MC_VM_L2_AMD = 28,
    VK_GPA_PERF_BLOCK_EA_AMD = 29,
    VK_GPA_PERF_BLOCK_RPB_AMD = 30,
    VK_GPA_PERF_BLOCK_RMI_AMD = 31,
    VK_GPA_PERF_BLOCK_UMCCH_AMD = 32,
    VK_GPA_PERF_BLOCK_GE_AMD = 33,
    VK_GPA_PERF_BLOCK_GL1A_AMD = 34,
    VK_GPA_PERF_BLOCK_GL1C_AMD = 35,
    VK_GPA_PERF_BLOCK_GL1CG_AMD = 36,
    VK_GPA_PERF_BLOCK_GL2A_AMD = 37,
    VK_GPA_PERF_BLOCK_GL2C_AMD = 38,
    VK_GPA_PERF_BLOCK_CHA_AMD = 39,
    VK_GPA_PERF_BLOCK_CHC_AMD = 40,
    VK_GPA_PERF_BLOCK_CHCG_AMD = 41,
    VK_GPA_PERF_BLOCK_GUS_AMD = 42,
    VK_GPA_PERF_BLOCK_GCR_AMD = 43,
    VK_GPA_PERF_BLOCK_PH_AMD = 44,
    VK_GPA_PERF_BLOCK_UTCL1_AMD = 45,
    VK_GPA_PERF_BLOCK_GE_DIST_AMD = 46,
    VK_GPA_PERF_BLOCK_GE_SE_AMD = 47,
    VK_GPA_PERF_BLOCK_DF_MALL_AMD = 48,
    VK_GPA_PERF_BLOCK_SQ_WGP_AMD = 49,
    VK_GPA_PERF_BLOCK_PC_AMD = 50,
    VK_GPA_PERF_BLOCK_GL1XA_AMD = 51,
    VK_GPA_PERF_BLOCK_GL1XC_AMD = 52,
    VK_GPA_PERF_BLOCK_WGS_AMD = 53,
    VK_GPA_PERF_BLOCK_EACPWD_AMD = 54,
    VK_GPA_PERF_BLOCK_EASE_AMD = 55,
    VK_GPA_PERF_BLOCK_RLCUSER_AMD = 56,
    VK_GPA_PERF_BLOCK_GE1_AMD = VK_GPA_PERF_BLOCK_GE_AMD,
    VK_GPA_PERF_BLOCK_RLCLOCAL_AMD = VK_GPA_PERF_BLOCK_RLCUSER_AMD,
} VkGpaPerfBlockAMD;

To end a GPA sample, call:

// Provided by VK_AMD_gpa_interface
void vkCmdEndGpaSampleAMD(
    VkCommandBuffer                             commandBuffer,
    VkGpaSessionAMD                             gpaSession,
    uint32_t                                    sampleID);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session that is recording the
sample.

* 
`sampleID` is a unique sample ID returned by a previous call to
[vkCmdBeginGpaSampleAMD](#vkCmdBeginGpaSampleAMD).

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndGpaSampleAMD-commandBuffer-parameter) VUID-vkCmdEndGpaSampleAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndGpaSampleAMD-gpaSession-parameter) VUID-vkCmdEndGpaSampleAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkCmdEndGpaSampleAMD-commandBuffer-recording) VUID-vkCmdEndGpaSampleAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndGpaSampleAMD-commandBuffer-cmdpool) VUID-vkCmdEndGpaSampleAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndGpaSampleAMD-suspended) VUID-vkCmdEndGpaSampleAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndGpaSampleAMD-videocoding) VUID-vkCmdEndGpaSampleAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndGpaSampleAMD-commonparent) VUID-vkCmdEndGpaSampleAMD-commonparent

 Both of `commandBuffer`, and `gpaSession` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndGpaSampleAMD is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

For performance counters and thread tracing to produce meaningful results,
clock control and querying is available.

To set or query GPU clocks, call:

// Provided by VK_AMD_gpa_interface
VkResult vkSetGpaDeviceClockModeAMD(
    VkDevice                                    device,
    VkGpaDeviceClockModeInfoAMD*                pInfo);

* 
`device` is the logical device that sets the clocks.

* 
`pInfo` is a pointer to a [VkGpaDeviceClockModeInfoAMD](#VkGpaDeviceClockModeInfoAMD)
structure specifying the clock mode to set or query.

Valid Usage

* 
[](#VUID-vkSetGpaDeviceClockModeAMD-clockModes-12415) VUID-vkSetGpaDeviceClockModeAMD-clockModes-12415

The [    `VkPhysicalDeviceGpaFeaturesAMD`::`clockModes`](features.html#features-clockModes) feature **must**
be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkSetGpaDeviceClockModeAMD-device-parameter) VUID-vkSetGpaDeviceClockModeAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetGpaDeviceClockModeAMD-pInfo-parameter) VUID-vkSetGpaDeviceClockModeAMD-pInfo-parameter

 `pInfo` **must** be a valid pointer to a [VkGpaDeviceClockModeInfoAMD](#VkGpaDeviceClockModeInfoAMD) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkGpaDeviceClockModeInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaDeviceClockModeInfoAMD {
    VkStructureType            sType;
    const void*                pNext;
    VkGpaDeviceClockModeAMD    clockMode;
    float                      memoryClockRatioToPeak;
    float                      engineClockRatioToPeak;
} VkGpaDeviceClockModeInfoAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`clockMode` is a enum:VkGpaDeviceClockModeAMD value specify which
clock mode to set, or whether to query the current clocks.

* 
`memoryClockRatioToPeak` is the returned ratio of the current memory
clock to the maximum memory clock, if `clockMode` is
[VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](#VkGpaDeviceClockModeAMD).

* 
`engineClockRatioToPeak` is the returned ratio of the current engine
clock to the maximum engine clock, if `clockMode` is
[VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](#VkGpaDeviceClockModeAMD).

If `clockMode` is [VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](#VkGpaDeviceClockModeAMD),
`memoryClockRatioToPeak` and `engineClockRatioToPeak` are filled
with the ratios of their current values to their maximums respectively,
otherwise they are left unchanged.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaDeviceClockModeInfoAMD-sType-sType) VUID-VkGpaDeviceClockModeInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_DEVICE_CLOCK_MODE_INFO_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGpaDeviceClockModeInfoAMD-pNext-pNext) VUID-VkGpaDeviceClockModeInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGpaDeviceClockModeInfoAMD-clockMode-parameter) VUID-VkGpaDeviceClockModeInfoAMD-clockMode-parameter

 `clockMode` **must** be a valid [VkGpaDeviceClockModeAMD](#VkGpaDeviceClockModeAMD) value

Values which **can** be set in [VkGpaDeviceClockModeAMD](#VkGpaDeviceClockModeAMD) are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaDeviceClockModeAMD {
    VK_GPA_DEVICE_CLOCK_MODE_DEFAULT_AMD = 0,
    VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD = 1,
    VK_GPA_DEVICE_CLOCK_MODE_PROFILING_AMD = 2,
    VK_GPA_DEVICE_CLOCK_MODE_MIN_MEMORY_AMD = 3,
    VK_GPA_DEVICE_CLOCK_MODE_MIN_ENGINE_AMD = 4,
    VK_GPA_DEVICE_CLOCK_MODE_PEAK_AMD = 5,
} VkGpaDeviceClockModeAMD;

* 
[VK_GPA_DEVICE_CLOCK_MODE_DEFAULT_AMD](#VkGpaDeviceClockModeAMD) specifies that device clocks
and other power settings are restored to their default values.

* 
[VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](#VkGpaDeviceClockModeAMD) specifies that the current
clock values should be queried, with no new values set.

* 
[VK_GPA_DEVICE_CLOCK_MODE_PROFILING_AMD](#VkGpaDeviceClockModeAMD) specifies that clocks are
set to a constant amount which is known to be power and thermal
sustainable.
The engine/memory clock ratio will be kept the same as much as possible.

* 
[VK_GPA_DEVICE_CLOCK_MODE_MIN_MEMORY_AMD](#VkGpaDeviceClockModeAMD) specifies that the memory
clock is set to the lowest available level and the engine clock is set
to a thermal and power sustainable level.

* 
[VK_GPA_DEVICE_CLOCK_MODE_MIN_ENGINE_AMD](#VkGpaDeviceClockModeAMD) specifies that the engine
clock is set to the lowest available level and the memory clock is set
to a thermal and power sustainable level.

* 
[VK_GPA_DEVICE_CLOCK_MODE_PEAK_AMD](#VkGpaDeviceClockModeAMD) specifies that the clocks set to
maximum when possible and fans set to maximum.
Under power and thermal constraints device will clock down.

To query the GPU clock current values and their ratios to their maximums,
call:

// Provided by VK_AMD_gpa_interface
VkResult vkGetGpaDeviceClockInfoAMD(
    VkDevice                                    device,
    VkGpaDeviceGetClockInfoAMD*                 pInfo);

* 
`device` is the logical device to get clock information from.

* 
`pInfo` is a pointer to a [VkGpaDeviceGetClockInfoAMD](#VkGpaDeviceGetClockInfoAMD) structure
in which the clock values are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGpaDeviceClockInfoAMD-device-parameter) VUID-vkGetGpaDeviceClockInfoAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetGpaDeviceClockInfoAMD-pInfo-parameter) VUID-vkGetGpaDeviceClockInfoAMD-pInfo-parameter

 `pInfo` **must** be a valid pointer to a [VkGpaDeviceGetClockInfoAMD](#VkGpaDeviceGetClockInfoAMD) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkGpaDeviceGetClockInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaDeviceGetClockInfoAMD {
    VkStructureType    sType;
    void*              pNext;
    float              memoryClockRatioToPeak;
    float              engineClockRatioToPeak;
    uint32_t           memoryClockFrequency;
    uint32_t           engineClockFrequency;
} VkGpaDeviceGetClockInfoAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryClockRatioToPeak` is the returned ratio of the current memory
clock to the maximum memory clock.

* 
`engineClockRatioToPeak` is the returned ratio of the current engine
clock to the maximum engine clock.

* 
`memoryClockFrequency` is the current memory clock frequency in MHz.

* 
`engineClockFrequency` is the current engine clock frequency in MHz.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaDeviceGetClockInfoAMD-sType-sType) VUID-VkGpaDeviceGetClockInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_DEVICE_GET_CLOCK_INFO_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGpaDeviceGetClockInfoAMD-pNext-pNext) VUID-VkGpaDeviceGetClockInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

Once a GPA session has ended, its status can be queried by:

// Provided by VK_AMD_gpa_interface
VkResult vkGetGpaSessionStatusAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession);

* 
`device` is the logical device used to create the GPA session.

* 
`gpaSession` is the session whose status is queried.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGpaSessionStatusAMD-device-parameter) VUID-vkGetGpaSessionStatusAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetGpaSessionStatusAMD-gpaSession-parameter) VUID-vkGetGpaSessionStatusAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkGetGpaSessionStatusAMD-gpaSession-parent) VUID-vkGetGpaSessionStatusAMD-gpaSession-parent

 `gpaSession` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

A return value of [VK_SUCCESS](fundamentals.html#VkResult) indicates that the results are available
to be read using [vkGetGpaSessionResultsAMD](#vkGetGpaSessionResultsAMD).
If results are not available, [VK_NOT_READY](fundamentals.html#VkResult) is returned.

Once a GPA session’s results are available, they can be obtained by:

// Provided by VK_AMD_gpa_interface
VkResult vkGetGpaSessionResultsAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession,
    uint32_t                                    sampleID,
    size_t*                                     pSizeInBytes,
    void*                                       pData);

* 
`device` is the logical device used to create the GPA session.

* 
`gpaSession` is the session whose results are queried.

* 
`sampleID` is the sample ID, returned by
[vkCmdBeginGpaSampleAMD](#vkCmdBeginGpaSampleAMD), whose results are to be queried.

* 
`pSizeInBytes` is a pointer to a `size_t` value related to the
size of the results data, as described below.

* 
`pData` is either `NULL` or a pointer to an array of
`pSizeInBytes` bytes where the results will be written.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGpaSessionResultsAMD-device-parameter) VUID-vkGetGpaSessionResultsAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetGpaSessionResultsAMD-gpaSession-parameter) VUID-vkGetGpaSessionResultsAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](#VkGpaSessionAMD) handle

* 
[](#VUID-vkGetGpaSessionResultsAMD-pSizeInBytes-parameter) VUID-vkGetGpaSessionResultsAMD-pSizeInBytes-parameter

 `pSizeInBytes` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetGpaSessionResultsAMD-pData-parameter) VUID-vkGetGpaSessionResultsAMD-pData-parameter

 If the value referenced by `pSizeInBytes` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pSizeInBytes` bytes

* 
[](#VUID-vkGetGpaSessionResultsAMD-gpaSession-parent) VUID-vkGetGpaSessionResultsAMD-gpaSession-parent

 `gpaSession` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

If `pData` is `NULL`, then the number of bytes of data in the results is
returned in `pSizeInBytes`.
Otherwise, `pSizeInBytes` must point to a variable set by the
application to the number of elements in the `pData` array, and on
return the variable is overwritten with the number of bytes written to
`pData`.
If the value of `pSizeInBytes` is less than the size required to write
the results [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that the results were not written.
