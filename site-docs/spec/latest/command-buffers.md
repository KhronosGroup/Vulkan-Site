# Command Buffers

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/cmdbuffers.html

## Table of Contents

- [Command Buffer Lifecycle](#commandbuffers-lifecycle)
- [Command_Buffer_Lifecycle](#commandbuffers-lifecycle)
- [Command Pools](#commandbuffers-pools)
- [Command Buffer Allocation and Management](#commandbuffer-allocation)
- [Command_Buffer_Allocation_and_Management](#commandbuffer-allocation)
- [Command Buffer Recording](#commandbuffers-recording)
- [Command_Buffer_Recording](#commandbuffers-recording)
- [Command Buffer Submission](#commandbuffers-submission)
- [Command_Buffer_Submission](#commandbuffers-submission)
- [Queue Forward Progress](#commandbuffers-submission-progress)
- [Queue_Forward_Progress](#commandbuffers-submission-progress)
- [Secondary Command Buffer Execution](#commandbuffers-secondary)
- [Secondary_Command_Buffer_Execution](#commandbuffers-secondary)
- [Nested Command Buffers](#commandbuffers-nested)
- [Nested_Command_Buffers](#commandbuffers-nested)
- [Command Buffer Device Mask](#commandbuffers-devicemask)
- [Command_Buffer_Device_Mask](#commandbuffers-devicemask)

## Content

Command buffers are objects used to record commands which **can** be
subsequently submitted to a device queue for execution.
There are two levels of command buffers - *primary command buffers*, which
**can** execute secondary command buffers, and which are submitted to queues,
and *secondary command buffers*, which **can** be executed by primary command
buffers, and which are not directly submitted to queues.

Command buffers are represented by `VkCommandBuffer` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkCommandBuffer)

Recorded commands include commands to bind pipelines and descriptor sets to
the command buffer, commands to modify dynamic state, commands to draw (for
graphics rendering), commands to dispatch (for compute), commands to execute
secondary command buffers (for primary command buffers only), commands to
copy buffers and images, and other commands.

Each command buffer manages state independently of other command buffers.
There is no inheritance of state across primary and secondary command
buffers, or between secondary command buffers.
When a command buffer begins recording, all state in that command buffer is
**undefined**.
When secondary command buffer(s) are recorded to execute on a primary
command buffer, the secondary command buffer inherits no state from the
primary command buffer, and all state of the primary command buffer is
**undefined** after an execute secondary command buffer command is recorded,
with the following exception(s):

* 
If the primary command buffer is inside a render pass instance, then the
render pass and subpass state is not disturbed by executing secondary
command buffers.

* 
If the primary command buffer has a descriptor heap bound, and the
address of that descriptor heap is specified in
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](#VkCommandBufferInheritanceDescriptorHeapInfoEXT) for every
secondary command buffer, that heap binding is not disturbed by
executing secondary command buffers.

For state dependent commands (such as draws and dispatches), any state
consumed by those commands **must** not be **undefined**.

[VkCommandBufferInheritanceViewportScissorInfoNV](#VkCommandBufferInheritanceViewportScissorInfoNV) defines an exception
allowing limited inheritance of dynamic viewport and scissor state.

Unless otherwise specified, and without explicit synchronization, the
various commands submitted to a queue via command buffers **may** execute in
arbitrary order relative to each other, and/or concurrently.
Also, the memory side effects of those commands **may** not be directly visible
to other commands without explicit memory dependencies.
This is true within a command buffer, and across command buffers submitted
to a given queue.
See [the synchronization chapter](synchronization.html#synchronization) for information on
[implicit](synchronization.html#synchronization-implicit) and explicit synchronization between
commands.

Each command buffer is always in one of the following states:

Initial

Command buffers in the *initial state* **can** only be transitioned to the
recording state, or freed.
When a command buffer is [allocated](#vkAllocateCommandBuffers), it is
in the *initial state*.
Command buffers in any state other than the pending state **can** be
transitioned to the initial state by calling [vkResetCommandPool](#vkResetCommandPool) on
the pool they were allocated from.
Command buffers allocated from a command pool created with
[VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#VkCommandPoolCreateFlagBits) and in any state
other than the pending state **can** also be transitioned to the initial
state by calling [vkResetCommandBuffer](#vkResetCommandBuffer).

Recording

Command buffers in the *recording state* **can** be used to record commands
via `vkCmd*` commands, be reset, or be freed.
Command buffers in the initial state **can** be transitioned to the
recording state by [vkBeginCommandBuffer](#vkBeginCommandBuffer).
Command buffers allocated from a command pool created with
[VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#VkCommandPoolCreateFlagBits) in the invalid,
recording, or executable state **can** also be transitioned to the
recording state by [vkBeginCommandBuffer](#vkBeginCommandBuffer).

Executable

A command buffer in the *executable state* **can** be
[submitted for execution](#commandbuffers-submission), reset, freed, or
[recorded to another command buffer](#commandbuffers-secondary).
Command buffers in the recording state are transitioned to the
executable state by [vkEndCommandBuffer](#vkEndCommandBuffer).
Command buffers in the pending state that were recorded without the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) flag immediately
return to the executable state as the final command in the command
buffer completes all execution, which can be observed via
[synchronization commands](synchronization.html#synchronization).

Pending

A command buffer in the *pending state* **must** not be modified by the
application, as it **may** be executing on the device.
Command buffers in the pending state that were recorded without the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) flag, or with the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) flag, **must** not be
submitted to the device for execution.
Command buffers in the executable state **can** be transitioned to the
pending state by [queue submission    commands](#commandbuffers-submission).
Once commands in the command buffer have completed all execution, the
command buffer is immediately in either the executable state, or in the
invalid state if it was recorded with the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) flag.
A [synchronization](synchronization.html#synchronization) command **can** be used to detect
when command execution is complete.

Invalid

A command buffer in the *invalid* state **can** be reset or freed.
Command buffers in any state other than the pending state will
transition to the invalid state if any memory or object, other than
[VkCommandPool](#VkCommandPool), that **may** be accessed when the command buffer is
accessed (e.g. an object bound to the command buffer) is destroyed or
freed.
Command buffers in any state other than the pending state will
transition to the invalid state if any command buffer executed within it
via [vkCmdExecuteCommands](#vkCmdExecuteCommands) transitions to any state other than the
pending or executable state.
Command buffers in the pending state that were recorded without the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) flag are immediately
invalid as the final command in the command buffer completes all
execution, which can be observed via [synchronization    commands](synchronization.html#synchronization).

![commandbuffer lifecycle](../_images/commandbuffer_lifecycle.svg)

Figure 1. Lifecycle of a command buffer

|  | The pending state is tied entirely to the status of execution of a command
| --- | --- |
buffer’s commands; once all commands are finished executing, the command
buffer is in the subsequent state (executable or invalid) with no further
intervention.

Detection of the final command in a command buffer completing all stages of
execution (i.e. [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits)) with a
[synchronization command](synchronization.html#synchronization) is sufficient to ensure the
command buffer is in the expected state. |

[Secondary command buffers](#commandbuffers-secondary) **can** be recorded to
a primary command buffer via [vkCmdExecuteCommands](#vkCmdExecuteCommands).
This partially ties the lifecycle of the two command buffers together - if
the primary is submitted to a queue, both the primary and any secondaries
recorded to it move to the *pending state*.
Similarly, once execution of the primary completes, it completes for any
command buffer recorded within it.

|  | Resetting or freeing a primary command buffer removes the lifecycle linkage
| --- | --- |
to all secondary command buffers that were recorded into it. |

Command pools are opaque objects that command buffer memory is allocated
from, and which allow the implementation to amortize the cost of resource
creation across multiple command buffers.
Command pools are externally synchronized, meaning that a command pool **must**
not be used concurrently in multiple threads.
That includes use via recording commands on any command buffers allocated
from the pool, as well as operations that allocate, free, and reset command
buffers or the pool itself.

Command pools are represented by `VkCommandPool` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkCommandPool)

To create a command pool, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateCommandPool(
    VkDevice                                    device,
    const VkCommandPoolCreateInfo*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCommandPool*                              pCommandPool);

* 
`device` is the logical device that creates the command pool.

* 
`pCreateInfo` is a pointer to a [VkCommandPoolCreateInfo](#VkCommandPoolCreateInfo)
structure specifying the state of the command pool object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pCommandPool` is a pointer to a [VkCommandPool](#VkCommandPool) handle in which
the created pool is returned.

Valid Usage

* 
[](#VUID-vkCreateCommandPool-queueFamilyIndex-01937) VUID-vkCreateCommandPool-queueFamilyIndex-01937

`pCreateInfo->queueFamilyIndex` **must** be the index of a queue family
available in the logical device `device`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCommandPool-device-parameter) VUID-vkCreateCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateCommandPool-pCreateInfo-parameter) VUID-vkCreateCommandPool-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCommandPoolCreateInfo](#VkCommandPoolCreateInfo) structure

* 
[](#VUID-vkCreateCommandPool-pAllocator-parameter) VUID-vkCreateCommandPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateCommandPool-pCommandPool-parameter) VUID-vkCreateCommandPool-pCommandPool-parameter

 `pCommandPool` **must** be a valid pointer to a [VkCommandPool](#VkCommandPool) handle

* 
[](#VUID-vkCreateCommandPool-device-queuecount) VUID-vkCreateCommandPool-device-queuecount

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

The `VkCommandPoolCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCommandPoolCreateInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkCommandPoolCreateFlags    flags;
    uint32_t                    queueFamilyIndex;
} VkCommandPoolCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkCommandPoolCreateFlagBits](#VkCommandPoolCreateFlagBits) indicating
usage behavior for the pool and command buffers allocated from it.

* 
`queueFamilyIndex` designates a queue family as described in section
[Queue Family Properties](devsandqueues.html#devsandqueues-queueprops).
All command buffers allocated from this command pool **must** be submitted
on queues from the same queue family.

Valid Usage

* 
[](#VUID-VkCommandPoolCreateInfo-flags-02860) VUID-VkCommandPoolCreateInfo-flags-02860

If the [`protectedMemory`](features.html#features-protectedMemory) feature is
not enabled, the [VK_COMMAND_POOL_CREATE_PROTECTED_BIT](#VkCommandPoolCreateFlagBits) bit of
`flags` **must** not be set

* 
[](#VUID-VkCommandPoolCreateInfo-pNext-09908) VUID-VkCommandPoolCreateInfo-pNext-09908

If the `pNext` chain includes a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure, then
`queueFamilyIndex` **must** designate a queue family that supports
[VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits)

* 
[](#VUID-VkCommandPoolCreateInfo-pNext-09909) VUID-VkCommandPoolCreateInfo-pNext-09909

If the `pNext` chain includes a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure, each member of
`pProcessingEngines` **must** be identical to
[VkQueueFamilyDataGraphPropertiesARM](VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphPropertiesARM)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with
`queueFamilyIndex` and the `physicalDevice` that was used to
create `device`

* 
[](#VUID-VkCommandPoolCreateInfo-queueFamilyIndex-11830) VUID-VkCommandPoolCreateInfo-queueFamilyIndex-11830

If `queueFamilyIndex` designates a queue family that supports
[VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits) and enumerates a foreign engine
through [vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with
type
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM),
the `pNext` chain must include
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) with
[VkPhysicalDeviceDataGraphProcessingEngineARM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineARM)::`isForeign` set
to [VK_TRUE](fundamentals.html#VK_TRUE) for all elements of `pProcessingEngines`

Valid Usage (Implicit)

* 
[](#VUID-VkCommandPoolCreateInfo-sType-sType) VUID-VkCommandPoolCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_POOL_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandPoolCreateInfo-pNext-pNext) VUID-VkCommandPoolCreateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM)

* 
[](#VUID-VkCommandPoolCreateInfo-sType-unique) VUID-VkCommandPoolCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandPoolCreateInfo-flags-parameter) VUID-VkCommandPoolCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkCommandPoolCreateFlagBits](#VkCommandPoolCreateFlagBits) values

Bits which **can** be set in [VkCommandPoolCreateInfo](#VkCommandPoolCreateInfo)::`flags`,
specifying usage behavior for a command pool, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandPoolCreateFlagBits {
    VK_COMMAND_POOL_CREATE_TRANSIENT_BIT = 0x00000001,
    VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT = 0x00000002,
  // Provided by VK_VERSION_1_1
    VK_COMMAND_POOL_CREATE_PROTECTED_BIT = 0x00000004,
} VkCommandPoolCreateFlagBits;

* 
[VK_COMMAND_POOL_CREATE_TRANSIENT_BIT](#VkCommandPoolCreateFlagBits) specifies that command
buffers allocated from the pool will be short-lived, meaning that they
will be reset or freed in a relatively short timeframe.
This flag **may** be used by the implementation to control memory
allocation behavior within the pool.

* 
[VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#VkCommandPoolCreateFlagBits) allows any command
buffer allocated from a pool to be individually reset to the
[initial state](#commandbuffers-lifecycle); either by calling
[vkResetCommandBuffer](#vkResetCommandBuffer), or via the implicit reset when calling
[vkBeginCommandBuffer](#vkBeginCommandBuffer).
If this flag is not set on a pool, then `vkResetCommandBuffer` **must**
not be called for any command buffer allocated from that pool.

* 
[VK_COMMAND_POOL_CREATE_PROTECTED_BIT](#VkCommandPoolCreateFlagBits) specifies that command
buffers allocated from the pool are protected command buffers.

// Provided by VK_VERSION_1_0
typedef VkFlags VkCommandPoolCreateFlags;

`VkCommandPoolCreateFlags` is a bitmask type for setting a mask of zero
or more [VkCommandPoolCreateFlagBits](#VkCommandPoolCreateFlagBits).

To trim a command pool, call:

// Provided by VK_VERSION_1_1
void vkTrimCommandPool(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    VkCommandPoolTrimFlags                      flags);

// Provided by VK_KHR_maintenance1
// Equivalent to vkTrimCommandPool
void vkTrimCommandPoolKHR(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    VkCommandPoolTrimFlags                      flags);

* 
`device` is the logical device that owns the command pool.

* 
`commandPool` is the command pool to trim.

* 
`flags` is reserved for future use.

Trimming a command pool recycles unused memory from the command pool back to
the system.
Command buffers allocated from the pool are not affected by the command.

|  | This command provides applications with some control over the internal
| --- | --- |
memory allocations used by command pools.

Unused memory normally arises from command buffers that have been recorded
and later reset, such that they are no longer using the memory.
On reset, a command buffer can return memory to its command pool, but the
only way to release memory from a command pool to the system requires
calling [vkResetCommandPool](#vkResetCommandPool), which cannot be executed while any command
buffers from that pool are still in use.
Subsequent recording operations into command buffers will reuse this memory
but since total memory requirements fluctuate over time, unused memory can
accumulate.

In this situation, trimming a command pool **may** be useful to return unused
memory back to the system, returning the total outstanding memory allocated
by the pool back to a more “average” value.

Implementations utilize many internal allocation strategies that make it
impossible to guarantee that all unused memory is released back to the
system.
For instance, an implementation of a command pool **may** involve allocating
memory in bulk from the system and sub-allocating from that memory.
In such an implementation any live command buffer that holds a reference to
a bulk allocation would prevent that allocation from being freed, even if
only a small proportion of the bulk allocation is in use.

In most cases trimming will result in a reduction in allocated but unused
memory, but it does not guarantee the “ideal” behavior.

Trimming **may** be an expensive operation, and **should** not be called
frequently.
Trimming **should** be treated as a way to relieve memory pressure after
application-known points when there exists enough unused memory that the
cost of trimming is “worth” it. |

Valid Usage (Implicit)

* 
[](#VUID-vkTrimCommandPool-device-parameter) VUID-vkTrimCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkTrimCommandPool-commandPool-parameter) VUID-vkTrimCommandPool-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](#VkCommandPool) handle

* 
[](#VUID-vkTrimCommandPool-flags-zerobitmask) VUID-vkTrimCommandPool-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-vkTrimCommandPool-commandPool-parent) VUID-vkTrimCommandPool-commandPool-parent

 `commandPool` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

// Provided by VK_VERSION_1_1
typedef VkFlags VkCommandPoolTrimFlags;

// Provided by VK_KHR_maintenance1
// Equivalent to VkCommandPoolTrimFlags
typedef VkCommandPoolTrimFlags VkCommandPoolTrimFlagsKHR;

`VkCommandPoolTrimFlags` is a bitmask type for setting a mask, but is
currently reserved for future use.

To reset a command pool, call:

// Provided by VK_VERSION_1_0
VkResult vkResetCommandPool(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    VkCommandPoolResetFlags                     flags);

* 
`device` is the logical device that owns the command pool.

* 
`commandPool` is the command pool to reset.

* 
`flags` is a bitmask of [VkCommandPoolResetFlagBits](#VkCommandPoolResetFlagBits) controlling
the reset operation.

Resetting a command pool recycles all of the resources from all of the
command buffers allocated from the command pool back to the command pool.
All command buffers that have been allocated from the command pool are put
in the [initial state](#commandbuffers-lifecycle).

Any primary command buffer allocated from another [VkCommandPool](#VkCommandPool) that
is in the [recording or executable state](#commandbuffers-lifecycle) and
has a secondary command buffer allocated from `commandPool` recorded
into it, becomes [invalid](#commandbuffers-lifecycle).

Valid Usage

* 
[](#VUID-vkResetCommandPool-commandPool-00040) VUID-vkResetCommandPool-commandPool-00040

All `VkCommandBuffer` objects allocated from `commandPool` **must**
not be in the [pending state](#commandbuffers-lifecycle)

Valid Usage (Implicit)

* 
[](#VUID-vkResetCommandPool-device-parameter) VUID-vkResetCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkResetCommandPool-commandPool-parameter) VUID-vkResetCommandPool-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](#VkCommandPool) handle

* 
[](#VUID-vkResetCommandPool-flags-parameter) VUID-vkResetCommandPool-flags-parameter

 `flags` **must** be a valid combination of [VkCommandPoolResetFlagBits](#VkCommandPoolResetFlagBits) values

* 
[](#VUID-vkResetCommandPool-commandPool-parent) VUID-vkResetCommandPool-commandPool-parent

 `commandPool` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Bits which **can** be set in [vkResetCommandPool](#vkResetCommandPool)::`flags`, controlling
the reset operation, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandPoolResetFlagBits {
    VK_COMMAND_POOL_RESET_RELEASE_RESOURCES_BIT = 0x00000001,
} VkCommandPoolResetFlagBits;

* 
[VK_COMMAND_POOL_RESET_RELEASE_RESOURCES_BIT](#VkCommandPoolResetFlagBits)
specifies that resetting a command pool recycles all of the resources
from the command pool back to the system.

// Provided by VK_VERSION_1_0
typedef VkFlags VkCommandPoolResetFlags;

`VkCommandPoolResetFlags` is a bitmask type for setting a mask of zero
or more [VkCommandPoolResetFlagBits](#VkCommandPoolResetFlagBits).

To destroy a command pool, call:

// Provided by VK_VERSION_1_0
void vkDestroyCommandPool(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the command pool.

* 
`commandPool` is the handle of the command pool to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

When a pool is destroyed, all command buffers allocated from the pool are
[freed](#vkFreeCommandBuffers).

Any primary command buffer allocated from another [VkCommandPool](#VkCommandPool) that
is in the [recording or executable state](#commandbuffers-lifecycle) and
has a secondary command buffer allocated from `commandPool` recorded
into it, becomes [invalid](#commandbuffers-lifecycle).

Valid Usage

* 
[](#VUID-vkDestroyCommandPool-commandPool-00041) VUID-vkDestroyCommandPool-commandPool-00041

All `VkCommandBuffer` objects allocated from `commandPool` **must**
not be in the [pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkDestroyCommandPool-commandPool-00042) VUID-vkDestroyCommandPool-commandPool-00042

If `VkAllocationCallbacks` were provided when `commandPool` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyCommandPool-commandPool-00043) VUID-vkDestroyCommandPool-commandPool-00043

If no `VkAllocationCallbacks` were provided when `commandPool`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCommandPool-device-parameter) VUID-vkDestroyCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyCommandPool-commandPool-parameter) VUID-vkDestroyCommandPool-commandPool-parameter

 If `commandPool` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `commandPool` **must** be a valid [VkCommandPool](#VkCommandPool) handle

* 
[](#VUID-vkDestroyCommandPool-pAllocator-parameter) VUID-vkDestroyCommandPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyCommandPool-commandPool-parent) VUID-vkDestroyCommandPool-commandPool-parent

 If `commandPool` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

To allocate command buffers, call:

// Provided by VK_VERSION_1_0
VkResult vkAllocateCommandBuffers(
    VkDevice                                    device,
    const VkCommandBufferAllocateInfo*          pAllocateInfo,
    VkCommandBuffer*                            pCommandBuffers);

* 
`device` is the logical device that owns the command pool.

* 
`pAllocateInfo` is a pointer to a [VkCommandBufferAllocateInfo](#VkCommandBufferAllocateInfo)
structure describing parameters of the allocation.
`commandPool` **may** be accessed any time one of the resulting command
buffers is accessed.

* 
`pCommandBuffers` is a pointer to an array of [VkCommandBuffer](#VkCommandBuffer)
handles in which the resulting command buffer objects are returned.
The array **must** be at least the length specified by the
`commandBufferCount` member of `pAllocateInfo`.
Each allocated command buffer begins in the initial state.

`vkAllocateCommandBuffers` **can** be used to allocate multiple command
buffers.
If the allocation of any of those command buffers fails, the implementation
**must** free all successfully allocated command buffer objects from this
command, set all entries of the `pCommandBuffers` array to `NULL` and
return the error.

|  | Filling `pCommandBuffers` with `NULL` values on failure is an exception
| --- | --- |
to the default error behavior that output parameters will have **undefined**
contents. |

When command buffers are first allocated, they are in the
[initial state](#commandbuffers-lifecycle).

Valid Usage (Implicit)

* 
[](#VUID-vkAllocateCommandBuffers-device-parameter) VUID-vkAllocateCommandBuffers-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAllocateCommandBuffers-pAllocateInfo-parameter) VUID-vkAllocateCommandBuffers-pAllocateInfo-parameter

 `pAllocateInfo` **must** be a valid pointer to a valid [VkCommandBufferAllocateInfo](#VkCommandBufferAllocateInfo) structure

* 
[](#VUID-vkAllocateCommandBuffers-pCommandBuffers-parameter) VUID-vkAllocateCommandBuffers-pCommandBuffers-parameter

 `pCommandBuffers` **must** be a valid pointer to an array of `pAllocateInfo->commandBufferCount` [VkCommandBuffer](#VkCommandBuffer) handles

* 
[](#VUID-vkAllocateCommandBuffers-device-queuecount) VUID-vkAllocateCommandBuffers-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkAllocateCommandBuffers-pAllocateInfo::commandBufferCount-arraylength) VUID-vkAllocateCommandBuffers-pAllocateInfo::commandBufferCount-arraylength

 `pAllocateInfo->commandBufferCount` **must** be greater than `0`

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

The `VkCommandBufferAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCommandBufferAllocateInfo {
    VkStructureType         sType;
    const void*             pNext;
    VkCommandPool           commandPool;
    VkCommandBufferLevel    level;
    uint32_t                commandBufferCount;
} VkCommandBufferAllocateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`commandPool` is the command pool from which the command buffers are
allocated.

* 
`level` is a [VkCommandBufferLevel](#VkCommandBufferLevel) value specifying the command
buffer level.

* 
`commandBufferCount` is the number of command buffers to allocate
from the pool.

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferAllocateInfo-sType-sType) VUID-VkCommandBufferAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_ALLOCATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandBufferAllocateInfo-pNext-pNext) VUID-VkCommandBufferAllocateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCommandBufferAllocateInfo-commandPool-parameter) VUID-VkCommandBufferAllocateInfo-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](#VkCommandPool) handle

* 
[](#VUID-VkCommandBufferAllocateInfo-level-parameter) VUID-VkCommandBufferAllocateInfo-level-parameter

 `level` **must** be a valid [VkCommandBufferLevel](#VkCommandBufferLevel) value

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

Possible values of [VkCommandBufferAllocateInfo](#VkCommandBufferAllocateInfo)::`level`,
specifying the command buffer level, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandBufferLevel {
    VK_COMMAND_BUFFER_LEVEL_PRIMARY = 0,
    VK_COMMAND_BUFFER_LEVEL_SECONDARY = 1,
} VkCommandBufferLevel;

* 
[VK_COMMAND_BUFFER_LEVEL_PRIMARY](#VkCommandBufferLevel) specifies a primary command
buffer.

* 
[VK_COMMAND_BUFFER_LEVEL_SECONDARY](#VkCommandBufferLevel) specifies a secondary command
buffer.

To reset a command buffer, call:

// Provided by VK_VERSION_1_0
VkResult vkResetCommandBuffer(
    VkCommandBuffer                             commandBuffer,
    VkCommandBufferResetFlags                   flags);

* 
`commandBuffer` is the command buffer to reset.
The command buffer **can** be in any state other than
[pending](#commandbuffers-lifecycle), and is moved into the
[initial state](#commandbuffers-lifecycle).

* 
`flags` is a bitmask of [VkCommandBufferResetFlagBits](#VkCommandBufferResetFlagBits)
controlling the reset operation.

Any primary command buffer that is in the [recording or executable state](#commandbuffers-lifecycle) and has `commandBuffer` recorded into
it, becomes [invalid](#commandbuffers-lifecycle).

After a command buffer is reset, any objects or memory specified by commands
recorded into the command buffer **must** no longer be accessed when the
command buffer is accessed by the implementation.

Valid Usage

* 
[](#VUID-vkResetCommandBuffer-commandBuffer-00045) VUID-vkResetCommandBuffer-commandBuffer-00045

`commandBuffer` **must** not be in the [    pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkResetCommandBuffer-commandBuffer-00046) VUID-vkResetCommandBuffer-commandBuffer-00046

`commandBuffer` **must** have been allocated from a pool that was
created with the [VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#VkCommandPoolCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkResetCommandBuffer-commandBuffer-parameter) VUID-vkResetCommandBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](#VkCommandBuffer) handle

* 
[](#VUID-vkResetCommandBuffer-flags-parameter) VUID-vkResetCommandBuffer-flags-parameter

 `flags` **must** be a valid combination of [VkCommandBufferResetFlagBits](#VkCommandBufferResetFlagBits) values

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Bits which **can** be set in [vkResetCommandBuffer](#vkResetCommandBuffer)::`flags`,
controlling the reset operation, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandBufferResetFlagBits {
    VK_COMMAND_BUFFER_RESET_RELEASE_RESOURCES_BIT = 0x00000001,
} VkCommandBufferResetFlagBits;

* 
[VK_COMMAND_BUFFER_RESET_RELEASE_RESOURCES_BIT](#VkCommandBufferResetFlagBits) specifies that most
or all memory resources currently owned by the command buffer **should** be
returned to the parent command pool.
If this flag is not set, then the command buffer **may** hold onto memory
resources and reuse them when recording commands.
`commandBuffer` is moved to the [initial    state](#commandbuffers-lifecycle).

// Provided by VK_VERSION_1_0
typedef VkFlags VkCommandBufferResetFlags;

`VkCommandBufferResetFlags` is a bitmask type for setting a mask of zero
or more [VkCommandBufferResetFlagBits](#VkCommandBufferResetFlagBits).

To free command buffers, call:

// Provided by VK_VERSION_1_0
void vkFreeCommandBuffers(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    uint32_t                                    commandBufferCount,
    const VkCommandBuffer*                      pCommandBuffers);

* 
`device` is the logical device that owns the command pool.

* 
`commandPool` is the command pool from which the command buffers
were allocated.

* 
`commandBufferCount` is the length of the `pCommandBuffers`
array.

* 
`pCommandBuffers` is a pointer to an array of handles of command
buffers to free.

Any primary command buffer that is in the [recording or executable state](#commandbuffers-lifecycle) and has any element of `pCommandBuffers`
recorded into it, becomes [invalid](#commandbuffers-lifecycle).

Valid Usage

* 
[](#VUID-vkFreeCommandBuffers-pCommandBuffers-00047) VUID-vkFreeCommandBuffers-pCommandBuffers-00047

All elements of `pCommandBuffers` **must** not be in the
[pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkFreeCommandBuffers-pCommandBuffers-00048) VUID-vkFreeCommandBuffers-pCommandBuffers-00048

`pCommandBuffers` **must** be a valid pointer to an array of
`commandBufferCount` `VkCommandBuffer` handles, each element of
which **must** either be a valid handle or `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkFreeCommandBuffers-device-parameter) VUID-vkFreeCommandBuffers-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkFreeCommandBuffers-commandPool-parameter) VUID-vkFreeCommandBuffers-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](#VkCommandPool) handle

* 
[](#VUID-vkFreeCommandBuffers-commandBufferCount-arraylength) VUID-vkFreeCommandBuffers-commandBufferCount-arraylength

 `commandBufferCount` **must** be greater than `0`

* 
[](#VUID-vkFreeCommandBuffers-commandPool-parent) VUID-vkFreeCommandBuffers-commandPool-parent

 `commandPool` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkFreeCommandBuffers-pCommandBuffers-parent) VUID-vkFreeCommandBuffers-pCommandBuffers-parent

 Each element of `pCommandBuffers` that is a valid handle **must** have been created, allocated, or retrieved from `commandPool`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

* 
Host access to each member of `pCommandBuffers` **must** be externally synchronized

To begin recording a command buffer, call:

// Provided by VK_VERSION_1_0
VkResult vkBeginCommandBuffer(
    VkCommandBuffer                             commandBuffer,
    const VkCommandBufferBeginInfo*             pBeginInfo);

* 
`commandBuffer` is the handle of the command buffer which is to be
put in the recording state.

* 
`pBeginInfo` is a pointer to a [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)
structure defining additional information about how the command buffer
begins recording.

Valid Usage

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00049) VUID-vkBeginCommandBuffer-commandBuffer-00049

`commandBuffer` **must** not be in the [    recording or pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00050) VUID-vkBeginCommandBuffer-commandBuffer-00050

If `commandBuffer` was allocated from a [VkCommandPool](#VkCommandPool) which
did not have the [VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#VkCommandPoolCreateFlagBits)
flag set, `commandBuffer` **must** be in the
[initial state](#commandbuffers-lifecycle)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00051) VUID-vkBeginCommandBuffer-commandBuffer-00051

If `commandBuffer` is a secondary command buffer, the
`pInheritanceInfo` member of `pBeginInfo` **must** be a valid
`VkCommandBufferInheritanceInfo` structure

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00052) VUID-vkBeginCommandBuffer-commandBuffer-00052

If `commandBuffer` is a secondary command buffer and either the
`occlusionQueryEnable` member of the `pInheritanceInfo` member
of `pBeginInfo` is [VK_FALSE](fundamentals.html#VK_FALSE), or the
[`occlusionQueryPrecise`](features.html#features-occlusionQueryPrecise) feature
is not enabled, then `pBeginInfo->pInheritanceInfo→queryFlags`
**must** not contain [VK_QUERY_CONTROL_PRECISE_BIT](queries.html#VkQueryControlFlagBits)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-02840) VUID-vkBeginCommandBuffer-commandBuffer-02840

If `commandBuffer` is a primary command buffer, then
`pBeginInfo->flags` **must** not set both the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) and the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) flags

Valid Usage (Implicit)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-parameter) VUID-vkBeginCommandBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](#VkCommandBuffer) handle

* 
[](#VUID-vkBeginCommandBuffer-pBeginInfo-parameter) VUID-vkBeginCommandBuffer-pBeginInfo-parameter

 `pBeginInfo` **must** be a valid pointer to a valid [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo) structure

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

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

The `VkCommandBufferBeginInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCommandBufferBeginInfo {
    VkStructureType                          sType;
    const void*                              pNext;
    VkCommandBufferUsageFlags                flags;
    const VkCommandBufferInheritanceInfo*    pInheritanceInfo;
} VkCommandBufferBeginInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkCommandBufferUsageFlagBits](#VkCommandBufferUsageFlagBits)
specifying usage behavior for the command buffer.

* 
`pInheritanceInfo` is a pointer to a
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) structure, used if
`commandBuffer` is a secondary command buffer.
If this is a primary command buffer, then this value is ignored.

Valid Usage

* 
[](#VUID-VkCommandBufferBeginInfo-flags-09123) VUID-VkCommandBufferBeginInfo-flags-09123

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits), the
[VkCommandPool](#VkCommandPool) that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-VkCommandBufferBeginInfo-flags-00055) VUID-VkCommandBufferBeginInfo-flags-00055

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits), the
`framebuffer` member of `pInheritanceInfo` **must** be either
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), or a valid `VkFramebuffer` that is compatible
with the `renderPass` member of `pInheritanceInfo`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-09240) VUID-VkCommandBufferBeginInfo-flags-09240

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits) and the
[`dynamicRendering`](features.html#features-dynamicRendering) feature is not
enabled, the `renderPass` member of `pInheritanceInfo` **must** not
be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06002) VUID-VkCommandBufferBeginInfo-flags-06002

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits) and the
`renderPass` member of `pInheritanceInfo` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain of `pInheritanceInfo`
**must** include a [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06003) VUID-VkCommandBufferBeginInfo-flags-06003

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits), the
`renderPass` member of `pInheritanceInfo` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and the `pNext` chain of
`pInheritanceInfo` includes a [VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD)
or [VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure, the
`colorAttachmentCount` member of that structure **must** be equal to
the value of
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`colorAttachmentCount`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06000) VUID-VkCommandBufferBeginInfo-flags-06000

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)
and the `renderPass` member of `pInheritanceInfo` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the `renderPass` member of `pInheritanceInfo` **must** be a valid
`VkRenderPass`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06001) VUID-VkCommandBufferBeginInfo-flags-06001

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)
and the `renderPass` member of `pInheritanceInfo` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the `subpass` member of `pInheritanceInfo` **must** be a valid
subpass index within the `renderPass` member of
`pInheritanceInfo`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-10617) VUID-VkCommandBufferBeginInfo-flags-10617

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)
, the `renderPass` member of `pInheritanceInfo` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and `renderPass` was created with [tile    shading enabled](renderpass.html#renderpass-tile-shading), [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM)
**must** be included in
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-10618) VUID-VkCommandBufferBeginInfo-flags-10618

If `flags` does not contain
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)
, the `renderPass` member of `pInheritanceInfo` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
or `renderPass` was not created with tile shading enabled,
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-10619) VUID-VkCommandBufferBeginInfo-flags-10619

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM) is included in
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`,
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`tileApronSize` **must**
be equal to the `tileApronSize` used to create `renderPass`

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferBeginInfo-sType-sType) VUID-VkCommandBufferBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_BEGIN_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandBufferBeginInfo-pNext-pNext) VUID-VkCommandBufferBeginInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDeviceGroupCommandBufferBeginInfo](#VkDeviceGroupCommandBufferBeginInfo)

* 
[](#VUID-VkCommandBufferBeginInfo-sType-unique) VUID-VkCommandBufferBeginInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandBufferBeginInfo-flags-parameter) VUID-VkCommandBufferBeginInfo-flags-parameter

 `flags` **must** be a valid combination of [VkCommandBufferUsageFlagBits](#VkCommandBufferUsageFlagBits) values

Bits which **can** be set in [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`flags`,
specifying usage behavior for a command buffer, are:

// Provided by VK_VERSION_1_0
typedef enum VkCommandBufferUsageFlagBits {
    VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT = 0x00000001,
    VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT = 0x00000002,
    VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT = 0x00000004,
} VkCommandBufferUsageFlagBits;

* 
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) specifies that each
recording of the command buffer will only be submitted once, and the
command buffer will be reset and recorded again between each submission.

* 
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits) specifies that a
secondary command buffer is considered to be entirely inside a render
pass.
If this is a primary command buffer, then this bit is ignored.

* 
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) specifies that a
command buffer **can** be resubmitted to any queue of the same queue family
while it is in the *pending state*, and recorded into multiple primary
command buffers.

// Provided by VK_VERSION_1_0
typedef VkFlags VkCommandBufferUsageFlags;

`VkCommandBufferUsageFlags` is a bitmask type for setting a mask of zero
or more [VkCommandBufferUsageFlagBits](#VkCommandBufferUsageFlagBits).

If the command buffer is a secondary command buffer, then the
`VkCommandBufferInheritanceInfo` structure defines any state that will
be inherited from the primary command buffer:

// Provided by VK_VERSION_1_0
typedef struct VkCommandBufferInheritanceInfo {
    VkStructureType                  sType;
    const void*                      pNext;
    VkRenderPass                     renderPass;
    uint32_t                         subpass;
    VkFramebuffer                    framebuffer;
    VkBool32                         occlusionQueryEnable;
    VkQueryControlFlags              queryFlags;
    VkQueryPipelineStatisticFlags    pipelineStatistics;
} VkCommandBufferInheritanceInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`renderPass` is a [VkRenderPass](renderpass.html#VkRenderPass) object defining which render
passes the `VkCommandBuffer` will be [    compatible](renderpass.html#renderpass-compatibility) with and **can** be executed within.

* 
`subpass` is the index of the subpass within the render pass
instance that the `VkCommandBuffer` will be executed within.

* 
`framebuffer` **can** refer to the [VkFramebuffer](renderpass.html#VkFramebuffer) object that the
`VkCommandBuffer` will be rendering to if it is executed within a
render pass instance.
It **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) if the framebuffer is not known.

|  | Specifying the exact framebuffer that the secondary command buffer will be
| --- | --- |
executed with **may** result in better performance at command buffer execution
time. |

* 
`occlusionQueryEnable` specifies whether the command buffer **can** be
executed while an occlusion query is active in the primary command
buffer.
If this is [VK_TRUE](fundamentals.html#VK_TRUE), then this command buffer **can** be executed
whether the primary command buffer has an occlusion query active or not.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then the primary command buffer **must** not
have an occlusion query active.

* 
`queryFlags` specifies the query flags that **can** be used by an
active occlusion query in the primary command buffer when this secondary
command buffer is executed.
If this value includes the [VK_QUERY_CONTROL_PRECISE_BIT](queries.html#VkQueryControlFlagBits) bit, then
the active query **can** return boolean results or actual sample counts.
If this bit is not set, then the active query **must** not use the
[VK_QUERY_CONTROL_PRECISE_BIT](queries.html#VkQueryControlFlagBits) bit.

* 
`pipelineStatistics` is a bitmask of
[VkQueryPipelineStatisticFlagBits](queries.html#VkQueryPipelineStatisticFlagBits) specifying the set of pipeline
statistics that **can** be counted by an active query in the primary
command buffer when this secondary command buffer is executed.
If this value includes a given bit, then this command buffer **can** be
executed whether the primary command buffer has a pipeline statistics
query active that includes this bit or not.
If this value excludes a given bit, then the active pipeline statistics
query **must** not be from a query pool that counts that statistic.

If the [VkCommandBuffer](#VkCommandBuffer) will not be executed within a render pass
instance,
or if the render pass instance was begun with [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering),
`renderPass`, `subpass`, and `framebuffer` are ignored.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceInfo-occlusionQueryEnable-00056) VUID-VkCommandBufferInheritanceInfo-occlusionQueryEnable-00056

If the [`inheritedQueries`](features.html#features-inheritedQueries) feature is
not enabled, `occlusionQueryEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkCommandBufferInheritanceInfo-queryFlags-00057) VUID-VkCommandBufferInheritanceInfo-queryFlags-00057

If the [`inheritedQueries`](features.html#features-inheritedQueries) feature is
enabled, `queryFlags` **must** be a valid combination of
[VkQueryControlFlagBits](queries.html#VkQueryControlFlagBits) values

* 
[](#VUID-VkCommandBufferInheritanceInfo-queryFlags-02788) VUID-VkCommandBufferInheritanceInfo-queryFlags-02788

If the [`inheritedQueries`](features.html#features-inheritedQueries) feature is
not enabled, `queryFlags` **must** be `0`

* 
[](#VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-02789) VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-02789

If the [    `pipelineStatisticsQuery`](features.html#features-pipelineStatisticsQuery) feature is enabled,
`pipelineStatistics` **must** be a valid combination of
[VkQueryPipelineStatisticFlagBits](queries.html#VkQueryPipelineStatisticFlagBits) values

* 
[](#VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-00058) VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-00058

If the [    `pipelineStatisticsQuery`](features.html#features-pipelineStatisticsQuery) feature is not enabled,
`pipelineStatistics` **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceInfo-sType-sType) VUID-VkCommandBufferInheritanceInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandBufferInheritanceInfo-pNext-pNext) VUID-VkCommandBufferInheritanceInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD), [VkCommandBufferInheritanceConditionalRenderingInfoEXT](#VkCommandBufferInheritanceConditionalRenderingInfoEXT), [VkCommandBufferInheritanceDescriptorHeapInfoEXT](#VkCommandBufferInheritanceDescriptorHeapInfoEXT), [VkCommandBufferInheritanceRenderPassTransformInfoQCOM](#VkCommandBufferInheritanceRenderPassTransformInfoQCOM), [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo), [VkCommandBufferInheritanceViewportScissorInfoNV](#VkCommandBufferInheritanceViewportScissorInfoNV), [VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT), [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID), [VkExternalFormatOHOS](resources.html#VkExternalFormatOHOS), [VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX), [VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM), [VkRenderingAttachmentLocationInfo](interfaces.html#VkRenderingAttachmentLocationInfo), [VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo), or [VkTileMemoryBindInfoQCOM](memory.html#VkTileMemoryBindInfoQCOM)

* 
[](#VUID-VkCommandBufferInheritanceInfo-sType-unique) VUID-VkCommandBufferInheritanceInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandBufferInheritanceInfo-commonparent) VUID-VkCommandBufferInheritanceInfo-commonparent

 Both of `framebuffer`, and `renderPass` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

|  | On some implementations, not using the
| --- | --- |
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) bit enables command
buffers to be patched in-place if needed, rather than creating a copy of the
command buffer. |

If a command buffer is in the [invalid, or executable state](#commandbuffers-lifecycle), and the command buffer was allocated from a command pool
with the [VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](#VkCommandPoolCreateFlagBits) flag set,
then `vkBeginCommandBuffer` implicitly resets the command buffer,
behaving as if `vkResetCommandBuffer` had been called with
[VK_COMMAND_BUFFER_RESET_RELEASE_RESOURCES_BIT](#VkCommandBufferResetFlagBits) not set.
After the implicit reset, `commandBuffer` is moved to the
[recording state](#commandbuffers-lifecycle).

If the [`commandBufferInheritance`](features.html#features-commandBufferInheritance)
feature is enabled, all graphics and compute state including bound pipeline
state, bound shader objects, bound vertex and index buffers, bound
descriptor sets and push constants,
descriptor heaps and push data,
and all previously set dynamic state is inherited by the secondary command
buffer from the primary or secondary command buffer that executes it.
Furthermore, all of the state set by this secondary command buffer is
inherited back to the primary or secondard command buffer that executes it.
If the [`commandBufferInheritance`](features.html#features-commandBufferInheritance)
feature is not enabled there is a limited amount of inheritance of state
into the secondary command buffer as specified below.

If the `pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
`VkCommandBufferInheritanceConditionalRenderingInfoEXT` structure, then
that structure controls whether a command buffer **can** be executed while
conditional rendering is [active](drawing.html#active-conditional-rendering) in the
primary command buffer.

The `VkCommandBufferInheritanceConditionalRenderingInfoEXT` structure is
defined as:

// Provided by VK_EXT_conditional_rendering
typedef struct VkCommandBufferInheritanceConditionalRenderingInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           conditionalRenderingEnable;
} VkCommandBufferInheritanceConditionalRenderingInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`conditionalRenderingEnable` specifies whether the command buffer
**can** be executed while conditional rendering is active in the primary
command buffer.
If this is [VK_TRUE](fundamentals.html#VK_TRUE), then this command buffer **can** be executed
whether the primary command buffer has active conditional rendering or
not.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then the primary command buffer **must** not
have conditional rendering active.

If this structure is not present, the behavior is as if
`conditionalRenderingEnable` is [VK_FALSE](fundamentals.html#VK_FALSE).

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-conditionalRenderingEnable-01977) VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-conditionalRenderingEnable-01977

If the [    `inheritedConditionalRendering`](features.html#features-inheritedConditionalRendering) feature is not enabled,
`conditionalRenderingEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-sType-sType) VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_CONDITIONAL_RENDERING_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

To begin recording a secondary command buffer compatible with execution
inside a render pass using [render pass transform](vertexpostproc.html#vertexpostproc-renderpass-transform), add the
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](#VkCommandBufferInheritanceRenderPassTransformInfoQCOM) to the
`pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) structure passed
to the [vkBeginCommandBuffer](#vkBeginCommandBuffer) command specifying the parameters for
transformed rasterization.

The `VkCommandBufferInheritanceRenderPassTransformInfoQCOM` structure is
defined as:

// Provided by VK_QCOM_render_pass_transform
typedef struct VkCommandBufferInheritanceRenderPassTransformInfoQCOM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSurfaceTransformFlagBitsKHR    transform;
    VkRect2D                         renderArea;
} VkCommandBufferInheritanceRenderPassTransformInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR) value
describing the transform to be applied to the render pass.

* 
`renderArea` is the render area that is affected by the command
buffer.

When the secondary is recorded to execute within a render pass instance
using [vkCmdExecuteCommands](#vkCmdExecuteCommands), the render pass transform parameters of
the secondary command buffer **must** be consistent with the render pass
transform parameters specified for the render pass instance.
In particular, the `transform` and `renderArea` for command buffer
**must** be identical to the `transform` and `renderArea` of the render
pass instance.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-transform-02864) VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-transform-02864

`transform` **must** be [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR),
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR),
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR), or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-sType-sType) VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDER_PASS_TRANSFORM_INFO_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

The `VkCommandBufferInheritanceViewportScissorInfoNV` structure is
defined as:

// Provided by VK_NV_inherited_viewport_scissor
typedef struct VkCommandBufferInheritanceViewportScissorInfoNV {
    VkStructureType      sType;
    const void*          pNext;
    VkBool32             viewportScissor2D;
    uint32_t             viewportDepthCount;
    const VkViewport*    pViewportDepths;
} VkCommandBufferInheritanceViewportScissorInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewportScissor2D` specifies whether the listed dynamic state is
inherited.

* 
`viewportDepthCount` specifies the maximum number of viewports to
inherit.
When `viewportScissor2D` is [VK_FALSE](fundamentals.html#VK_FALSE), the behavior is as if
this value is zero.

* 
`pViewportDepths` is a pointer to a [VkViewport](vertexpostproc.html#VkViewport) structure
specifying the expected depth range for each inherited viewport.

If the `pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
`VkCommandBufferInheritanceViewportScissorInfoNV` structure, then that
structure controls whether a command buffer **can** inherit the following state
from other command buffers:

* 
[VK_DYNAMIC_STATE_SCISSOR](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](pipelines.html#VkDynamicState)

as well as the following state, with restrictions on inherited depth values
and viewport count:

* 
[VK_DYNAMIC_STATE_VIEWPORT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](pipelines.html#VkDynamicState)

If `viewportScissor2D` is [VK_FALSE](fundamentals.html#VK_FALSE), then the command buffer does
not inherit the listed dynamic state, and **should** set this state itself.
If this structure is not present, the behavior is as if
`viewportScissor2D` is [VK_FALSE](fundamentals.html#VK_FALSE).

If `viewportScissor2D` is [VK_TRUE](fundamentals.html#VK_TRUE), then the listed dynamic state
is inherited, and the command buffer **must** not set this
state, except that the viewport and scissor count **may** be set by binding a
graphics pipeline that does not specify this state as dynamic.

|  | Due to this restriction, applications **should** ensure either all or none of
| --- | --- |
the graphics pipelines bound in this secondary command buffer use dynamic
viewport/scissor counts. |

When the command buffer is executed as part of a the execution of a
[vkCmdExecuteCommands](#vkCmdExecuteCommands) command, the inherited state (if enabled) is
determined by the following procedure, performed separately for each dynamic
state, and separately for each value for dynamic state that consists of
multiple values (e.g. multiple viewports).

* 
With i being the index of the executed command buffer in the
`pCommandBuffers` array of [vkCmdExecuteCommands](#vkCmdExecuteCommands), if i >
0 and any secondary command buffer from index 0 to i-1
modifies the state, the inherited state is provisionally set to the
final value set by the last such secondary command buffer.
Binding a graphics pipeline defining the state statically is equivalent
to setting the state to an **undefined** value.

* 
Otherwise, the tentatative inherited state is that of the primary
command buffer at the point the [vkCmdExecuteCommands](#vkCmdExecuteCommands) command was
recorded; if the state is **undefined**, then so is the provisional
inherited state.

* 
If the provisional inherited state is an **undefined** value, then the
state is not inherited.

* 
If the provisional inherited state is a viewport, with n being its
viewport index, then if n ≥ `viewportDepthCount`, or if
either [VkViewport](vertexpostproc.html#VkViewport)::`minDepth` or
[VkViewport](vertexpostproc.html#VkViewport)::`maxDepth` are not equal to the respective values
of the nth element of `pViewportDepths`, then the state is
not inherited.

* 
If the provisional inherited state passes both checks, then it becomes
the actual inherited state.

|  | There is no support for inheriting dynamic state from a secondary command
| --- | --- |
buffer executed as part of a different `vkCmdExecuteCommands` command. |

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04782) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04782

If the [    `inheritedViewportScissor2D`](features.html#features-inheritedViewportScissor2D) feature is not enabled,
`viewportScissor2D` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04783) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04783

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled and `viewportScissor2D` is [VK_TRUE](fundamentals.html#VK_TRUE), then
`viewportDepthCount` **must** be `1`

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04784) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04784

If `viewportScissor2D` is [VK_TRUE](fundamentals.html#VK_TRUE), then
`viewportDepthCount` **must** be greater than `0`

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04785) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04785

If `viewportScissor2D` is [VK_TRUE](fundamentals.html#VK_TRUE), then `pViewportDepths`
**must** be a valid pointer to an array of `viewportDepthCount` valid
`VkViewport` structures, except any requirements on `x`, `y`,
`width`, and `height` do not apply

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04786) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04786

If `viewportScissor2D` is [VK_TRUE](fundamentals.html#VK_TRUE), then the command buffer
**must** be recorded with the
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-sType-sType) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_VIEWPORT_SCISSOR_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

The `VkCommandBufferInheritanceRenderingInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkCommandBufferInheritanceRenderingInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkRenderingFlags         flags;
    uint32_t                 viewMask;
    uint32_t                 colorAttachmentCount;
    const VkFormat*          pColorAttachmentFormats;
    VkFormat                 depthAttachmentFormat;
    VkFormat                 stencilAttachmentFormat;
    VkSampleCountFlagBits    rasterizationSamples;
} VkCommandBufferInheritanceRenderingInfo;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkCommandBufferInheritanceRenderingInfo
typedef VkCommandBufferInheritanceRenderingInfo VkCommandBufferInheritanceRenderingInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`flags` is a bitmask of [VkRenderingFlagBits](renderpass.html#VkRenderingFlagBits) used by the render
pass instance.

* 
`viewMask` is the view mask used for rendering.

* 
`colorAttachmentCount` is the number of color attachments specified
in the render pass instance.

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](formats.html#VkFormat)
values defining the format of color attachments.

* 
`depthAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the depth attachment.

* 
`stencilAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the stencil attachment.

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) specifying
the number of samples used in rasterization.

If the `pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
`VkCommandBufferInheritanceRenderingInfo` structure, then that structure
controls parameters of dynamic render pass instances that the
[VkCommandBuffer](#VkCommandBuffer) **can** be executed within.
If [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)::`renderPass` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), or
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits) is not specified in
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`flags`, parameters of this structure
are ignored.

If `colorAttachmentCount` is `0` and the
[`variableMultisampleRate`](features.html#features-variableMultisampleRate) feature
is enabled, `rasterizationSamples` is ignored.

If `depthAttachmentFormat`, `stencilAttachmentFormat`, or any
element of `pColorAttachmentFormats` is [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
indicates that the corresponding attachment is unused within the render pass
and writes to those attachments are discarded.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-colorAttachmentCount-06004) VUID-VkCommandBufferInheritanceRenderingInfo-colorAttachmentCount-06004

If `colorAttachmentCount` is not `0`, `rasterizationSamples`
**must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-variableMultisampleRate-06005) VUID-VkCommandBufferInheritanceRenderingInfo-variableMultisampleRate-06005

If the [    `variableMultisampleRate`](features.html#features-variableMultisampleRate) feature is not enabled,
`rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits)
value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06540) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06540

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format that includes a depth component

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06007) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06007

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format with [potential format    features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-06492) VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-06492

If any element of `pColorAttachmentFormats` is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** be a format with
[potential format features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)
, or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR) if the
[`linearColorAttachment`](features.html#features-linearColorAttachment) feature
is enabled

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06541) VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06541

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format that includes a stencil aspect

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06199) VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-06199

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format with [potential format    features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06200) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-06200

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat) and
`stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat),
`depthAttachmentFormat` **must** equal `stencilAttachmentFormat`

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-multiview-06008) VUID-VkCommandBufferInheritanceRenderingInfo-multiview-06008

If the [`multiview`](features.html#features-multiview) feature is not enabled,
`viewMask` **must** be `0`

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-viewMask-06009) VUID-VkCommandBufferInheritanceRenderingInfo-viewMask-06009

The index of the most significant bit in `viewMask` **must** be less
than [`maxMultiviewViewCount`](devsandqueues.html#limits-maxMultiviewViewCount)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-sType-sType) VUID-VkCommandBufferInheritanceRenderingInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-flags-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-flags-parameter

 `flags` **must** be a valid combination of [VkRenderingFlagBits](renderpass.html#VkRenderingFlagBits) values

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-pColorAttachmentFormats-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachmentFormats` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkFormat](formats.html#VkFormat) values

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-depthAttachmentFormat-parameter

 `depthAttachmentFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-stencilAttachmentFormat-parameter

 `stencilAttachmentFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkCommandBufferInheritanceRenderingInfo-rasterizationSamples-parameter) VUID-VkCommandBufferInheritanceRenderingInfo-rasterizationSamples-parameter

 If `rasterizationSamples` is not `0`, `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

The
`VkAttachmentSampleCountInfoAMD`
or
`VkAttachmentSampleCountInfoNV`
structure is defined as:

// Provided by VK_AMD_mixed_attachment_samples with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkAttachmentSampleCountInfoAMD {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        colorAttachmentCount;
    const VkSampleCountFlagBits*    pColorAttachmentSamples;
    VkSampleCountFlagBits           depthStencilAttachmentSamples;
} VkAttachmentSampleCountInfoAMD;

// Provided by VK_NV_framebuffer_mixed_samples with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
// Equivalent to VkAttachmentSampleCountInfoAMD
typedef VkAttachmentSampleCountInfoAMD VkAttachmentSampleCountInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`colorAttachmentCount` is the number of color attachments specified
in a render pass instance.

* 
`pColorAttachmentSamples` is a pointer to an array of
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) values defining the sample count of color
attachments.

* 
`depthStencilAttachmentSamples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits)
value defining the sample count of a depth/stencil attachment.

If [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)::`renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), [VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)
is specified in [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`flags`, and the
`pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes
`VkAttachmentSampleCountInfoAMD`, then this structure defines the sample
counts of each attachment within the render pass instance.
If `VkAttachmentSampleCountInfoAMD` is not included, the value of
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples` is
used as the sample count for each attachment.
If [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)::`renderPass` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), or
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits) is not specified in
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`flags`, parameters of this structure
are ignored.

`VkAttachmentSampleCountInfoAMD` **can** also be included in the
`pNext` chain of [VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo).
When a graphics pipeline is created without a [VkRenderPass](renderpass.html#VkRenderPass), if this
structure is included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo), it specifies the sample count of
attachments used for rendering.
If this structure is not specified, and the pipeline does not include a
[VkRenderPass](renderpass.html#VkRenderPass), the value of
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples` is
used as the sample count for each attachment.
If a graphics pipeline is created with a valid [VkRenderPass](renderpass.html#VkRenderPass),
parameters of this structure are ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentSampleCountInfoAMD-sType-sType) VUID-VkAttachmentSampleCountInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

If the `pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
`VkCommandBufferInheritanceDescriptorHeapInfoEXT` structure, then that
structure indicates that the secondary will use the same descriptor heaps as
the primary command buffer.

The `VkCommandBufferInheritanceDescriptorHeapInfoEXT` structure is
defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkCommandBufferInheritanceDescriptorHeapInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    const VkBindHeapInfoEXT*    pSamplerHeapBindInfo;
    const VkBindHeapInfoEXT*    pResourceHeapBindInfo;
} VkCommandBufferInheritanceDescriptorHeapInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pSamplerHeapBindInfo` specifies the [VkBindHeapInfoEXT](descriptorheaps.html#VkBindHeapInfoEXT) of the
sampler heap bound using [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT) in the primary.
If this is `NULL`, it indicates that no sampler heap is bound.

* 
`pResourceHeapBindInfo` specifies the [VkBindHeapInfoEXT](descriptorheaps.html#VkBindHeapInfoEXT) of the
resource heap bound using [vkCmdBindResourceHeapEXT](descriptorheaps.html#vkCmdBindResourceHeapEXT) in the primary.
If this is `NULL`, it indicates that no resource heap is bound.

If this structure is not present, the behavior is as if
`pSamplerHeapBindInfo` and `pResourceHeapBindInfo` were both `NULL`.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11200) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11200

If the [`descriptorHeap`](features.html#features-descriptorHeap) feature is not
enabled, `pSamplerHeapBindInfo` **must** be `NULL`

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11201) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11201

If the [`descriptorHeap`](features.html#features-descriptorHeap) feature is not
enabled, `pResourceHeapBindInfo` **must** be `NULL`

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-11470) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-11470

If `pSamplerHeapBindInfo` is not `NULL`,
`pSamplerHeapBindInfo->heapRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-11471) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-11471

If `pResourceHeapBindInfo` is not `NULL`,
`pResourceHeapBindInfo->heapRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-sType-sType) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_DESCRIPTOR_HEAP_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-parameter) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-parameter

 If `pSamplerHeapBindInfo` is not `NULL`, `pSamplerHeapBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](descriptorheaps.html#VkBindHeapInfoEXT) structure

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-parameter) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-parameter

 If `pResourceHeapBindInfo` is not `NULL`, `pResourceHeapBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](descriptorheaps.html#VkBindHeapInfoEXT) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

Once recording starts, an application records a sequence of commands
(`vkCmd*`) to set state in the command buffer, draw, dispatch, and other
commands.

Several commands can also be recorded indirectly from `VkBuffer`
content, see [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

To complete recording of a command buffer, call:

// Provided by VK_VERSION_1_0
VkResult vkEndCommandBuffer(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer to complete recording.

The command buffer **must** have been in the [recording state](#commandbuffers-lifecycle), and, if successful, is moved to the
[executable state](#commandbuffers-lifecycle).

If there was an error during recording, the application will be notified by
an unsuccessful return code returned by `vkEndCommandBuffer`, and the
command buffer will be moved to the [invalid state](#commandbuffers-lifecycle).

In case the application recorded one or more [video encode operations](videocoding.html#video-encode-operations) into the command buffer, implementations **may** return the
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](fundamentals.html#VkResult) error if any of the
specified Video Std parameters do not adhere to the syntactic or semantic
requirements of the used video compression standard, or if values derived
from parameters according to the rules defined by the used video compression
standard do not adhere to the capabilities of the video compression standard
or the implementation.

|  | Applications **should** not rely on the
| --- | --- |
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](fundamentals.html#VkResult) error being returned by any
command as a means to verify Video Std parameters, as implementations are
not required to report the error in any specific set of cases. |

Valid Usage

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00059) VUID-vkEndCommandBuffer-commandBuffer-00059

`commandBuffer` **must** be in the [    recording state](#commandbuffers-lifecycle)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00060) VUID-vkEndCommandBuffer-commandBuffer-00060

If `commandBuffer` is a primary command buffer, there **must** not be
an active render pass instance

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00061) VUID-vkEndCommandBuffer-commandBuffer-00061

All queries made [active](queries.html#queries-operation-active) during the
recording of `commandBuffer` **must** have been made inactive

* 
[](#VUID-vkEndCommandBuffer-None-01978) VUID-vkEndCommandBuffer-None-01978

Conditional rendering **must** not be
[active](drawing.html#active-conditional-rendering)

* 
[](#VUID-vkEndCommandBuffer-None-06991) VUID-vkEndCommandBuffer-None-06991

There **must** be no video session object bound

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-01815) VUID-vkEndCommandBuffer-commandBuffer-01815

If `commandBuffer` is a secondary command buffer, there **must** not be
an outstanding [vkCmdBeginDebugUtilsLabelEXT](debugging.html#vkCmdBeginDebugUtilsLabelEXT) command recorded to
`commandBuffer` that has not previously been ended by a call to
[vkCmdEndDebugUtilsLabelEXT](debugging.html#vkCmdEndDebugUtilsLabelEXT)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00062) VUID-vkEndCommandBuffer-commandBuffer-00062

If `commandBuffer` is a secondary command buffer, there **must** not be
an outstanding [vkCmdDebugMarkerBeginEXT](debugging.html#vkCmdDebugMarkerBeginEXT) command recorded to
`commandBuffer` that has not previously been ended by a call to
[vkCmdDebugMarkerEndEXT](debugging.html#vkCmdDebugMarkerEndEXT)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-12372) VUID-vkEndCommandBuffer-commandBuffer-12372

`commandBuffer` **must** not have any shader instrumentation
[active](shaders.html#shaders-instrumentation-active)

Valid Usage (Implicit)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-parameter) VUID-vkEndCommandBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](#VkCommandBuffer) handle

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

When a command buffer is in the executable state, it **can** be submitted to a
queue for execution.

|  | Submission can be a high overhead operation, and applications **should**
| --- | --- |
attempt to batch work together into as few calls to `vkQueueSubmit`
or `vkQueueSubmit2`
as possible. |

To submit command buffers to a queue, call:

// Provided by VK_VERSION_1_3
VkResult vkQueueSubmit2(
    VkQueue                                     queue,
    uint32_t                                    submitCount,
    const VkSubmitInfo2*                        pSubmits,
    VkFence                                     fence);

// Provided by VK_KHR_synchronization2
// Equivalent to vkQueueSubmit2
VkResult vkQueueSubmit2KHR(
    VkQueue                                     queue,
    uint32_t                                    submitCount,
    const VkSubmitInfo2*                        pSubmits,
    VkFence                                     fence);

* 
`queue` is the queue that the command buffers will be submitted to.

* 
`submitCount` is the number of elements in the `pSubmits` array.

* 
`pSubmits` is a pointer to an array of [VkSubmitInfo2](#VkSubmitInfo2)
structures, each specifying a command buffer submission batch.
Command buffers and semaphores specified in this array **may** be accessed
at any point until the [queue operations](devsandqueues.html#devsandqueues-submission)
they define complete execution on the device.

* 
`fence` is an **optional** handle to a fence to be signaled once all
submitted command buffers have completed execution.
If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it defines a
[fence signal operation](synchronization.html#synchronization-fences-signaling).
If it is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **may** be accessed at any
point until this command completes on the device.

`vkQueueSubmit2` is a [queue submission command](devsandqueues.html#devsandqueues-submission), with each batch defined by an element of `pSubmits`.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore signal operation](synchronization.html#synchronization-semaphores-signaling)
defined by this command includes every command in the same batch that the
signal operation is defined in, and all commands that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).
The scope is limited by the `stageMask` member of the
[VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) used to define each such operation.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](synchronization.html#synchronization-semaphores-waiting) defined
by this command includes every command in the same batch that the wait
operation is defined in, and all commands that occur later in
[submission order](synchronization.html#synchronization-submission-order).
The scope is limited by the `stageMask` member of the
[VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) used to define each such operation.

If any command buffer submitted to this queue is in the
[executable state](#commandbuffers-lifecycle), it is moved to the
[pending state](#commandbuffers-lifecycle).
Once execution of all submissions of a command buffer complete, it moves
from the [pending state](#commandbuffers-lifecycle), back to the
[executable state](#commandbuffers-lifecycle).
If a command buffer was recorded with the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) flag, it instead moves
back to the [invalid state](#commandbuffers-lifecycle).

If `vkQueueSubmit2` fails, it **may** return
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult) or [VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult).
If it does, the implementation **must** ensure that the state and contents of
any resources or synchronization primitives referenced by the submitted
command buffers and any semaphores referenced by `pSubmits` is
unaffected by the call or its failure.
If `vkQueueSubmit2` fails in such a way that the implementation is
unable to make that guarantee, the implementation **must** return
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).
See [Lost Device](devsandqueues.html#devsandqueues-lost-device).

Valid Usage

* 
[](#VUID-vkQueueSubmit2-fence-04894) VUID-vkQueueSubmit2-fence-04894

If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be
unsignaled

* 
[](#VUID-vkQueueSubmit2-fence-04895) VUID-vkQueueSubmit2-fence-04895

If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkQueueSubmit2-synchronization2-03866) VUID-vkQueueSubmit2-synchronization2-03866

The [`synchronization2`](features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03867) VUID-vkQueueSubmit2-commandBuffer-03867

If a command recorded into the `commandBuffer` member of any element
of the `pCommandBufferInfos` member of any element of `pSubmits`
referenced a [VkEvent](synchronization.html#VkEvent), that event **must** not be referenced by a
command that has been submitted to another queue and is still in the
*pending state*

* 
[](#VUID-vkQueueSubmit2-semaphore-03868) VUID-vkQueueSubmit2-semaphore-03868

The `semaphore` member of any binary semaphore element of the
`pSignalSemaphoreInfos` member of any element of `pSubmits`
**must** be unsignaled when the semaphore signal operation it defines is
executed on the device

* 
[](#VUID-vkQueueSubmit2-stageMask-03869) VUID-vkQueueSubmit2-stageMask-03869

The `stageMask` member of any element of the
`pSignalSemaphoreInfos` member of any element of `pSubmits`
**must** only include pipeline stages that are supported by the queue
family which `queue` belongs to

* 
[](#VUID-vkQueueSubmit2-stageMask-03870) VUID-vkQueueSubmit2-stageMask-03870

The `stageMask` member of any element of the
`pWaitSemaphoreInfos` member of any element of `pSubmits` **must**
only include pipeline stages that are supported by the queue family
which `queue` belongs to

* 
[](#VUID-vkQueueSubmit2-semaphore-03871) VUID-vkQueueSubmit2-semaphore-03871

When a semaphore wait operation for a binary semaphore is executed, as
defined by the `semaphore` member of any element of the
`pWaitSemaphoreInfos` member of any element of `pSubmits`, there
**must** be no other queues waiting on the same semaphore

* 
[](#VUID-vkQueueSubmit2-semaphore-03873) VUID-vkQueueSubmit2-semaphore-03873

The `semaphore` member of any element of the
`pWaitSemaphoreInfos` member of any element of `pSubmits`
that was created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_BINARY](synchronization.html#VkSemaphoreTypeKHR)
**must** reference a semaphore signal operation that has been submitted for
execution and any [semaphore    signal operations](synchronization.html#synchronization-semaphores-signaling) on which it depends **must** have also been submitted
for execution

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03874) VUID-vkQueueSubmit2-commandBuffer-03874

The `commandBuffer` member of any element of the
`pCommandBufferInfos` member of any element of `pSubmits` **must**
be in the [pending or executable state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03875) VUID-vkQueueSubmit2-commandBuffer-03875

If a command recorded into the `commandBuffer` member of any element
of the `pCommandBufferInfos` member of any element of `pSubmits`
was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits), it **must** not be in
the [pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03876) VUID-vkQueueSubmit2-commandBuffer-03876

Any [secondary command buffers recorded](#commandbuffers-secondary)
into the `commandBuffer` member of any element of the
`pCommandBufferInfos` member of any element of `pSubmits` **must**
be in the [pending or executable state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03877) VUID-vkQueueSubmit2-commandBuffer-03877

If any [secondary command buffers recorded](#commandbuffers-secondary)
into the `commandBuffer` member of any element of the
`pCommandBufferInfos` member of any element of `pSubmits` was
not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits), it **must** not be in
the [pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03878) VUID-vkQueueSubmit2-commandBuffer-03878

The `commandBuffer` member of any element of the
`pCommandBufferInfos` member of any element of `pSubmits` **must**
have been allocated from a `VkCommandPool` that was created for the
same queue family `queue` belongs to

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03879) VUID-vkQueueSubmit2-commandBuffer-03879

If a command recorded into the `commandBuffer` member of any element
of the `pCommandBufferInfos` member of any element of `pSubmits`
includes a [Queue Family    Ownership Transfer Acquire Operation](synchronization.html#synchronization-queue-transfers-acquire), there **must** exist a previously
submitted [Queue Family    Ownership Transfer Release Operation](synchronization.html#synchronization-queue-transfers-release) on a queue in the queue family
identified by the acquire operation, with parameters matching the
acquire operation as defined in the definition of such
[acquire operations](synchronization.html#synchronization-queue-transfers-acquire), and
which happens before the acquire operation

* 
[](#VUID-vkQueueSubmit2-commandBuffer-10910) VUID-vkQueueSubmit2-commandBuffer-10910

If a command recorded into the `commandBuffer` member of any element
of the `pCommandBufferInfos` member of any element of `pSubmits`
includes a [Queue Family    Ownership Transfer Acquire Operation](synchronization.html#synchronization-queue-transfers-acquire), the affected resource **must** not
be modified in any way between the last matching release operation and
the acquire operation

* 
[](#VUID-vkQueueSubmit2-commandBuffer-03880) VUID-vkQueueSubmit2-commandBuffer-03880

If a command recorded into the `commandBuffer` member of any element
of the `pCommandBufferInfos` member of any element of `pSubmits`
was a [vkCmdBeginQuery](queries.html#vkCmdBeginQuery) whose `queryPool` was created with a
`queryType` of [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](queries.html#VkQueryType), the
[profiling lock](queries.html#profiling-lock) **must** have been held continuously on
the `VkDevice` that `queue` was retrieved from, throughout
recording of those command buffers

* 
[](#VUID-vkQueueSubmit2-queue-06447) VUID-vkQueueSubmit2-queue-06447

If `queue` was not created with
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](devsandqueues.html#VkDeviceQueueCreateFlagBits), the `flags` member of
any element of `pSubmits` **must** not include
[VK_SUBMIT_PROTECTED_BIT_KHR](#VkSubmitFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkQueueSubmit2-queue-parameter) VUID-vkQueueSubmit2-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueSubmit2-pSubmits-parameter) VUID-vkQueueSubmit2-pSubmits-parameter

 If `submitCount` is not `0`, `pSubmits` **must** be a valid pointer to an array of `submitCount` valid [VkSubmitInfo2](#VkSubmitInfo2) structures

* 
[](#VUID-vkQueueSubmit2-fence-parameter) VUID-vkQueueSubmit2-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be a valid [VkFence](synchronization.html#VkFence) handle

* 
[](#VUID-vkQueueSubmit2-commonparent) VUID-vkQueueSubmit2-commonparent

 Both of `fence`, and `queue` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
Host access to `fence` **must** be externally synchronized

Command Properties
| [Command Buffer Levels](#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkSubmitInfo2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkSubmitInfo2 {
    VkStructureType                     sType;
    const void*                         pNext;
    VkSubmitFlags                       flags;
    uint32_t                            waitSemaphoreInfoCount;
    const VkSemaphoreSubmitInfo*        pWaitSemaphoreInfos;
    uint32_t                            commandBufferInfoCount;
    const VkCommandBufferSubmitInfo*    pCommandBufferInfos;
    uint32_t                            signalSemaphoreInfoCount;
    const VkSemaphoreSubmitInfo*        pSignalSemaphoreInfos;
} VkSubmitInfo2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkSubmitInfo2
typedef VkSubmitInfo2 VkSubmitInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSubmitFlagBits](#VkSubmitFlagBits).

* 
`waitSemaphoreInfoCount` is the number of elements in
`pWaitSemaphoreInfos`.

* 
`pWaitSemaphoreInfos` is a pointer to an array of
[VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) structures defining
[semaphore wait operations](synchronization.html#synchronization-semaphores-waiting).

* 
`commandBufferInfoCount` is the number of elements in
`pCommandBufferInfos` and the number of command buffers to execute
in the batch.

* 
`pCommandBufferInfos` is a pointer to an array of
[VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo) structures describing command buffers to
execute in the batch.

* 
`signalSemaphoreInfoCount` is the number of elements in
`pSignalSemaphoreInfos`.

* 
`pSignalSemaphoreInfos` is a pointer to an array of
[VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) describing
[semaphore signal operations](synchronization.html#synchronization-semaphores-signaling).

Valid Usage

* 
[](#VUID-VkSubmitInfo2-semaphore-03881) VUID-VkSubmitInfo2-semaphore-03881

If the same semaphore is used as the `semaphore` member of both an
element of `pSignalSemaphoreInfos` and `pWaitSemaphoreInfos`,
and that semaphore is a timeline semaphore, the `value` member of
the `pSignalSemaphoreInfos` element **must** be greater than the
`value` member of the `pWaitSemaphoreInfos` element

* 
[](#VUID-VkSubmitInfo2-semaphore-03882) VUID-VkSubmitInfo2-semaphore-03882

If the `semaphore` member of any element of
`pSignalSemaphoreInfos` is a timeline semaphore, the `value`
member of that element **must** have a value greater than the current value
of the semaphore when the [    semaphore signal operation](synchronization.html#synchronization-semaphores-signaling) is executed

* 
[](#VUID-VkSubmitInfo2-semaphore-03883) VUID-VkSubmitInfo2-semaphore-03883

If the `semaphore` member of any element of
`pSignalSemaphoreInfos` is a timeline semaphore, the `value`
member of that element **must** have a value which does not differ from the
current value of the semaphore or the value of any outstanding semaphore
wait or signal operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkSubmitInfo2-semaphore-03884) VUID-VkSubmitInfo2-semaphore-03884

If the `semaphore` member of any element of
`pWaitSemaphoreInfos` is a timeline semaphore, the `value`
member of that element **must** have a value which does not differ from the
current value of the semaphore or the value of any outstanding semaphore
wait or signal operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkSubmitInfo2-flags-03886) VUID-VkSubmitInfo2-flags-03886

If `flags` includes [VK_SUBMIT_PROTECTED_BIT](#VkSubmitFlagBitsKHR), all elements of
`pCommandBuffers` **must** be protected command buffers

* 
[](#VUID-VkSubmitInfo2-flags-03887) VUID-VkSubmitInfo2-flags-03887

If `flags` does not include [VK_SUBMIT_PROTECTED_BIT](#VkSubmitFlagBitsKHR), each
element of `pCommandBuffers` **must** not be a protected command buffer

* 
[](#VUID-VkSubmitInfo2-commandBuffer-06192) VUID-VkSubmitInfo2-commandBuffer-06192

If any `commandBuffer` member of an element of
`pCommandBufferInfos` contains any [resumed    render pass instances](renderpass.html#renderpass-suspension), they **must** be suspended by a render pass
instance earlier in submission order within `pCommandBufferInfos`

* 
[](#VUID-VkSubmitInfo2-commandBuffer-06010) VUID-VkSubmitInfo2-commandBuffer-06010

If any `commandBuffer` member of an element of
`pCommandBufferInfos` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), they **must** be resumed by a render pass instance
later in submission order within `pCommandBufferInfos`

* 
[](#VUID-VkSubmitInfo2-commandBuffer-06011) VUID-VkSubmitInfo2-commandBuffer-06011

If any `commandBuffer` member of an element of
`pCommandBufferInfos` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), there **must** be no action or synchronization
commands between that render pass instance and the render pass instance
that resumes it

* 
[](#VUID-VkSubmitInfo2-commandBuffer-06012) VUID-VkSubmitInfo2-commandBuffer-06012

If any `commandBuffer` member of an element of
`pCommandBufferInfos` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), there **must** be no render pass instances between
that render pass instance and the render pass instance that resumes it

* 
[](#VUID-VkSubmitInfo2-variableSampleLocations-06013) VUID-VkSubmitInfo2-variableSampleLocations-06013

If the [`variableSampleLocations`](limits.html#limits-variableSampleLocations)
limit is not supported, and any `commandBuffer` member of an element
of `pCommandBufferInfos` contains any [    suspended render pass instances](renderpass.html#renderpass-suspension), where a graphics pipeline has been
bound, any pipelines bound in the render pass instance that resumes it,
or any subsequent render pass instances that resume from that one and so
on, **must** use the same sample locations

* 
[](#VUID-VkSubmitInfo2-pNext-09682) VUID-VkSubmitInfo2-pNext-09682

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](debugging.html#VkFrameBoundaryTensorsARM) structure then it **must** also include a
[VkFrameBoundaryEXT](debugging.html#VkFrameBoundaryEXT) structure

* 
[](#VUID-VkSubmitInfo2-pCommandBufferInfos-09933) VUID-VkSubmitInfo2-pCommandBufferInfos-09933

If at least one [VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo) structure in
`pCommandBufferInfos` references a `commandBuffer` allocated
from a pool that was created with a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in the
`pNext` chain of [VkCommandPoolCreateInfo](#VkCommandPoolCreateInfo) that included a
foreign data graph processing engine in its `pProcessingEngines`
member, then `pWaitSemaphoreInfos` and `pSignalSemaphoreInfos`
**must** only reference `semaphore` objects that were created from
external handle types reported as supported in a
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphProcessingEnginePropertiesARM)::`foreignSemaphoreHandleTypes`
structure via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM)
with a `queueFamilyIndex` matching the one the command pool was
created for, for all the foreign data graph processing engines that were
part of the [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) used to
create the command pool

Valid Usage (Implicit)

* 
[](#VUID-VkSubmitInfo2-sType-sType) VUID-VkSubmitInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBMIT_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubmitInfo2-pNext-pNext) VUID-VkSubmitInfo2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkFrameBoundaryEXT](debugging.html#VkFrameBoundaryEXT), [VkFrameBoundaryTensorsARM](debugging.html#VkFrameBoundaryTensorsARM), [VkLatencySubmissionPresentIdNV](VK_KHR_surface/wsi.html#VkLatencySubmissionPresentIdNV), [VkPerformanceQuerySubmitInfoKHR](#VkPerformanceQuerySubmitInfoKHR), [VkWin32KeyedMutexAcquireReleaseInfoKHR](#VkWin32KeyedMutexAcquireReleaseInfoKHR), or [VkWin32KeyedMutexAcquireReleaseInfoNV](#VkWin32KeyedMutexAcquireReleaseInfoNV)

* 
[](#VUID-VkSubmitInfo2-sType-unique) VUID-VkSubmitInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubmitInfo2-flags-parameter) VUID-VkSubmitInfo2-flags-parameter

 `flags` **must** be a valid combination of [VkSubmitFlagBits](#VkSubmitFlagBits) values

* 
[](#VUID-VkSubmitInfo2-pWaitSemaphoreInfos-parameter) VUID-VkSubmitInfo2-pWaitSemaphoreInfos-parameter

 If `waitSemaphoreInfoCount` is not `0`, `pWaitSemaphoreInfos` **must** be a valid pointer to an array of `waitSemaphoreInfoCount` valid [VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) structures

* 
[](#VUID-VkSubmitInfo2-pCommandBufferInfos-parameter) VUID-VkSubmitInfo2-pCommandBufferInfos-parameter

 If `commandBufferInfoCount` is not `0`, `pCommandBufferInfos` **must** be a valid pointer to an array of `commandBufferInfoCount` valid [VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo) structures

* 
[](#VUID-VkSubmitInfo2-pSignalSemaphoreInfos-parameter) VUID-VkSubmitInfo2-pSignalSemaphoreInfos-parameter

 If `signalSemaphoreInfoCount` is not `0`, `pSignalSemaphoreInfos` **must** be a valid pointer to an array of `signalSemaphoreInfoCount` valid [VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) structures

Bits which **can** be set in [VkSubmitInfo2](#VkSubmitInfo2)::`flags`, specifying
submission behavior, are:

// Provided by VK_VERSION_1_3
typedef enum VkSubmitFlagBits {
    VK_SUBMIT_PROTECTED_BIT = 0x00000001,
  // Provided by VK_KHR_synchronization2
    VK_SUBMIT_PROTECTED_BIT_KHR = VK_SUBMIT_PROTECTED_BIT,
} VkSubmitFlagBits;

// Provided by VK_KHR_synchronization2
// Equivalent to VkSubmitFlagBits
typedef VkSubmitFlagBits VkSubmitFlagBitsKHR;

* 
[VK_SUBMIT_PROTECTED_BIT](#VkSubmitFlagBitsKHR) specifies that this batch is a protected
submission.

// Provided by VK_VERSION_1_3
typedef VkFlags VkSubmitFlags;

// Provided by VK_KHR_synchronization2
// Equivalent to VkSubmitFlags
typedef VkSubmitFlags VkSubmitFlagsKHR;

`VkSubmitFlags` is a bitmask type for setting a mask of zero or more
[VkSubmitFlagBits](#VkSubmitFlagBits).

The `VkSemaphoreSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkSemaphoreSubmitInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkSemaphore              semaphore;
    uint64_t                 value;
    VkPipelineStageFlags2    stageMask;
    uint32_t                 deviceIndex;
} VkSemaphoreSubmitInfo;

// Provided by VK_KHR_synchronization2
// Equivalent to VkSemaphoreSubmitInfo
typedef VkSemaphoreSubmitInfo VkSemaphoreSubmitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is a [VkSemaphore](synchronization.html#VkSemaphore) affected by this operation.

* 
`value` is
either the value used to signal `semaphore` or the value waited on
by `semaphore`, if `semaphore` is a timeline semaphore.
Otherwise it is
ignored.

* 
`stageMask` is a [VkPipelineStageFlags2](synchronization.html#VkPipelineStageFlags2) mask of pipeline stages
which limit the first synchronization scope of a semaphore signal
operation, or second synchronization scope of a semaphore wait operation
as described in the [semaphore wait    operation](synchronization.html#synchronization-semaphores-waiting) and [semaphore signal    operation](synchronization.html#synchronization-semaphores-signaling) sections of [the synchronization    chapter](synchronization.html#synchronization).

* 
`deviceIndex` is the index of the device within a device group that
executes the semaphore wait or signal operation.

Whether this structure defines a semaphore wait or signal operation is
defined by how it is used.
The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
a [semaphore signal operation](synchronization.html#synchronization-semaphores-signaling) or the
second synchronization scope of a [semaphore wait operation](synchronization.html#synchronization-semaphores-waiting) defined by this structure are limited to
operations in stages indicated by `stageMask`.

Valid Usage

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03929) VUID-VkSemaphoreSubmitInfo-stageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03930) VUID-VkSemaphoreSubmitInfo-stageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03931) VUID-VkSemaphoreSubmitInfo-stageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03932) VUID-VkSemaphoreSubmitInfo-stageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03933) VUID-VkSemaphoreSubmitInfo-stageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03934) VUID-VkSemaphoreSubmitInfo-stageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03935) VUID-VkSemaphoreSubmitInfo-stageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-07316) VUID-VkSemaphoreSubmitInfo-stageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-04957) VUID-VkSemaphoreSubmitInfo-stageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-04995) VUID-VkSemaphoreSubmitInfo-stageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-07946) VUID-VkSemaphoreSubmitInfo-stageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-10751) VUID-VkSemaphoreSubmitInfo-stageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-10752) VUID-VkSemaphoreSubmitInfo-stageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-10753) VUID-VkSemaphoreSubmitInfo-stageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkSemaphoreSubmitInfo-device-03888) VUID-VkSemaphoreSubmitInfo-device-03888

If the `device` that `semaphore` was created on is not a device
group, `deviceIndex` **must** be `0`

* 
[](#VUID-VkSemaphoreSubmitInfo-device-03889) VUID-VkSemaphoreSubmitInfo-device-03889

If the `device` that `semaphore` was created on is a device
group, `deviceIndex` **must** be a valid device index

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreSubmitInfo-sType-sType) VUID-VkSemaphoreSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreSubmitInfo-pNext-pNext) VUID-VkSemaphoreSubmitInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreSubmitInfo-semaphore-parameter) VUID-VkSemaphoreSubmitInfo-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](synchronization.html#VkSemaphore) handle

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-parameter) VUID-VkSemaphoreSubmitInfo-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](synchronization.html#VkPipelineStageFlagBits2) values

The `VkCommandBufferSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkCommandBufferSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkCommandBuffer    commandBuffer;
    uint32_t           deviceMask;
} VkCommandBufferSubmitInfo;

// Provided by VK_KHR_synchronization2
// Equivalent to VkCommandBufferSubmitInfo
typedef VkCommandBufferSubmitInfo VkCommandBufferSubmitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`commandBuffer` is a [VkCommandBuffer](#VkCommandBuffer) to be submitted for
execution.

* 
`deviceMask` is a bitmask indicating which devices in a device group
execute the command buffer.
A `deviceMask` of `0` is equivalent to setting all bits
corresponding to valid devices in the group to `1`.

Valid Usage

* 
[](#VUID-VkCommandBufferSubmitInfo-commandBuffer-03890) VUID-VkCommandBufferSubmitInfo-commandBuffer-03890

`commandBuffer` **must** not have been allocated with
[VK_COMMAND_BUFFER_LEVEL_SECONDARY](#VkCommandBufferLevel)

* 
[](#VUID-VkCommandBufferSubmitInfo-deviceMask-03891) VUID-VkCommandBufferSubmitInfo-deviceMask-03891

If `deviceMask` is not `0`, it **must** be a valid device mask

* 
[](#VUID-VkCommandBufferSubmitInfo-commandBuffer-09445) VUID-VkCommandBufferSubmitInfo-commandBuffer-09445

If any render pass instance in `commandBuffer` was recorded with a
[VkRenderPassStripeBeginInfoARM](renderpass.html#VkRenderPassStripeBeginInfoARM) structure in its pNext chain and
did not specify the [VK_RENDERING_RESUMING_BIT](renderpass.html#VkRenderingFlagBitsKHR) flag, a
[VkRenderPassStripeSubmitInfoARM](#VkRenderPassStripeSubmitInfoARM) **must** be included in the
`pNext` chain

* 
[](#VUID-VkCommandBufferSubmitInfo-pNext-09446) VUID-VkCommandBufferSubmitInfo-pNext-09446

If a [VkRenderPassStripeSubmitInfoARM](#VkRenderPassStripeSubmitInfoARM) is included in the
`pNext` chain, the value of
[VkRenderPassStripeSubmitInfoARM](#VkRenderPassStripeSubmitInfoARM)::`stripeSemaphoreInfoCount`
**must** be equal to the sum of the
[VkRenderPassStripeBeginInfoARM](renderpass.html#VkRenderPassStripeBeginInfoARM)::`stripeInfoCount` parameters
provided to render pass instances recorded in `commandBuffer` that
did not specify the [VK_RENDERING_RESUMING_BIT](renderpass.html#VkRenderingFlagBitsKHR) flag

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferSubmitInfo-sType-sType) VUID-VkCommandBufferSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCommandBufferSubmitInfo-pNext-pNext) VUID-VkCommandBufferSubmitInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkRenderPassStripeSubmitInfoARM](#VkRenderPassStripeSubmitInfoARM)

* 
[](#VUID-VkCommandBufferSubmitInfo-sType-unique) VUID-VkCommandBufferSubmitInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandBufferSubmitInfo-commandBuffer-parameter) VUID-VkCommandBufferSubmitInfo-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](#VkCommandBuffer) handle

The `VkRenderPassStripeSubmitInfoARM` structure is defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkRenderPassStripeSubmitInfoARM {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        stripeSemaphoreInfoCount;
    const VkSemaphoreSubmitInfo*    pStripeSemaphoreInfos;
} VkRenderPassStripeSubmitInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stripeSemaphoreInfoCount` is the number of semaphores used to
signal stripe completion in the render pass instances in the submitted
command buffer.

* 
`pStripeSemaphoreInfos` is a pointer to an array of
`stripeSemaphoreInfoCount` [VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) structures
describing the semaphores used to signal stripe completion.

This structure can be included in the `pNext` chain of
[VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo) to provide a set of semaphores to be
signaled for each striped render pass instance.

The elements of `pStripeSemaphoreInfos` are mapped to render pass
instances in [VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo)::`commandBuffer` in
submission order and in stripe order within each render pass instance.
Each semaphore in `pStripeSemaphoreInfos` is signaled when the
implementation has completed execution of the associated stripe.
In a render pass instance that has multiview enabled, the stripe includes
all views in the view mask.
In a render pass instance with `layerCount` greater than 1, the stripe
includes all layers.

Render pass instances that specify the [VK_RENDERING_RESUMING_BIT](renderpass.html#VkRenderingFlagBitsKHR) will
not have any elements of `pStripeSemaphoreInfos` mapped to them.
Instead, for suspending and resuming render pass instances, this mapping is
done for the first suspending render pass instance, and the per-stripe
semaphores are only signaled for the last resuming render pass instance.

Valid Usage

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-semaphore-09447) VUID-VkRenderPassStripeSubmitInfoARM-semaphore-09447

The `semaphore` member of each element of
`pStripeSemaphoreInfos` **must** have been created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](synchronization.html#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-sType-sType) VUID-VkRenderPassStripeSubmitInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_SUBMIT_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-pStripeSemaphoreInfos-parameter) VUID-VkRenderPassStripeSubmitInfoARM-pStripeSemaphoreInfos-parameter

 `pStripeSemaphoreInfos` **must** be a valid pointer to an array of `stripeSemaphoreInfoCount` valid [VkSemaphoreSubmitInfo](#VkSemaphoreSubmitInfo) structures

* 
[](#VUID-VkRenderPassStripeSubmitInfoARM-stripeSemaphoreInfoCount-arraylength) VUID-VkRenderPassStripeSubmitInfoARM-stripeSemaphoreInfoCount-arraylength

 `stripeSemaphoreInfoCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo)

To submit command buffers to a queue, call:

|  | This functionality is superseded by [vkQueueSubmit2](#vkQueueSubmit2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkQueueSubmit(
    VkQueue                                     queue,
    uint32_t                                    submitCount,
    const VkSubmitInfo*                         pSubmits,
    VkFence                                     fence);

* 
`queue` is the queue that the command buffers will be submitted to.

* 
`submitCount` is the number of elements in the `pSubmits` array.

* 
`pSubmits` is a pointer to an array of [VkSubmitInfo](#VkSubmitInfo)
structures, each specifying a command buffer submission batch.
Command buffers and semaphores specified in this array **may** be accessed
at any point until the [queue operations](devsandqueues.html#devsandqueues-submission)
they define complete execution on the device.

* 
`fence` is an **optional** handle to a fence to be signaled once all
submitted command buffers have completed execution.
If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it defines a
[fence signal operation](synchronization.html#synchronization-fences-signaling).
If it is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **may** be accessed at any
point until this command completes on the device.

`vkQueueSubmit` is a [queue submission command](devsandqueues.html#devsandqueues-submission), with each batch defined by an element of `pSubmits`.
Batches begin execution in the order they appear in `pSubmits`, but **may**
complete out of order.

The order that batches appear in `pSubmits` is used to determine
[submission order](synchronization.html#synchronization-submission-order), and thus all the
[implicit ordering guarantees](synchronization.html#synchronization-implicit) that respect it.
Other than these implicit ordering guarantees and any [explicit synchronization primitives](synchronization.html#synchronization), these batches **may** overlap or
otherwise execute out of order.

Fence operations submitted with [vkQueueSubmit](#vkQueueSubmit) have additional ordering
constraints compared to other submission commands, with dependencies
involving previous and subsequent queue operations.
Information about these additional constraints can be found in the
[fence](synchronization.html#synchronization-fences) sections of [the synchronization chapter](synchronization.html#synchronization).

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore signal operation](synchronization.html#synchronization-semaphores-signaling)
defined by this command includes every command in the same batch that the
signal operation is defined in, and all commands that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](synchronization.html#synchronization-semaphores-waiting) defined
by this command includes every command in the same batch that the wait
operation is defined in, and all commands that occur later in
[submission order](synchronization.html#synchronization-submission-order).
The scope is limited by the `pWaitDstStageMask` for each batch, as
described in [VkSubmitInfo](#VkSubmitInfo).

If any command buffer submitted to this queue is in the
[executable state](#commandbuffers-lifecycle), it is moved to the
[pending state](#commandbuffers-lifecycle).
Once execution of all submissions of a command buffer complete, it moves
from the [pending state](#commandbuffers-lifecycle), back to the
[executable state](#commandbuffers-lifecycle).
If a command buffer was recorded with the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](#VkCommandBufferUsageFlagBits) flag, it instead moves to
the [invalid state](#commandbuffers-lifecycle).

If `vkQueueSubmit` fails, it **may** return
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult) or [VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult).
If it does, the implementation **must** ensure that the state and contents of
any resources or synchronization primitives referenced by the submitted
command buffers and any semaphores referenced by `pSubmits` is
unaffected by the call or its failure.
If `vkQueueSubmit` fails in such a way that the implementation is unable
to make that guarantee, the implementation **must** return
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).
See [Lost Device](devsandqueues.html#devsandqueues-lost-device).

Valid Usage

* 
[](#VUID-vkQueueSubmit-fence-00063) VUID-vkQueueSubmit-fence-00063

If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be
unsignaled

* 
[](#VUID-vkQueueSubmit-fence-00064) VUID-vkQueueSubmit-fence-00064

If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00065) VUID-vkQueueSubmit-pCommandBuffers-00065

Any calls to [vkCmdSetEvent](synchronization.html#vkCmdSetEvent), [vkCmdResetEvent](synchronization.html#vkCmdResetEvent) or
[vkCmdWaitEvents](synchronization.html#vkCmdWaitEvents) that have been recorded into any of the command
buffer elements of the `pCommandBuffers` member of any element of
`pSubmits`, **must** not reference any [VkEvent](synchronization.html#VkEvent) that is referenced
by any of those commands in a command buffer that has been submitted to
another queue and is still in the *pending state*

* 
[](#VUID-vkQueueSubmit-pWaitDstStageMask-00066) VUID-vkQueueSubmit-pWaitDstStageMask-00066

Any stage flag included in any element of the `pWaitDstStageMask`
member of any element of `pSubmits` **must** be a pipeline stage
supported by one of the capabilities of `queue`, as specified in the
[table of supported pipeline    stages](synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkQueueSubmit-pSignalSemaphores-00067) VUID-vkQueueSubmit-pSignalSemaphores-00067

Each binary semaphore element of the `pSignalSemaphores` member of
any element of `pSubmits` **must** be unsignaled when the semaphore
signal operation it defines is executed on the device

* 
[](#VUID-vkQueueSubmit-pWaitSemaphores-00068) VUID-vkQueueSubmit-pWaitSemaphores-00068

When a semaphore wait operation referring to a binary semaphore defined
by any element of the `pWaitSemaphores` member of any element of
`pSubmits` executes on `queue`, there **must** be no other queues
waiting on the same semaphore

* 
[](#VUID-vkQueueSubmit-pWaitSemaphores-03238) VUID-vkQueueSubmit-pWaitSemaphores-03238

All elements of the `pWaitSemaphores` member of all elements of
`pSubmits`
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](synchronization.html#VkSemaphoreTypeKHR)
**must** reference a semaphore signal operation that has been submitted for
execution and any [semaphore    signal operations](synchronization.html#synchronization-semaphores-signaling) on which it depends **must** have also been submitted
for execution

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00070) VUID-vkQueueSubmit-pCommandBuffers-00070

Each element of the `pCommandBuffers` member of each element of
`pSubmits` **must** be in the [pending or    executable state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00071) VUID-vkQueueSubmit-pCommandBuffers-00071

If any element of the `pCommandBuffers` member of any element of
`pSubmits` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits), it **must** not be in
the [pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00072) VUID-vkQueueSubmit-pCommandBuffers-00072

Any [secondary command buffers recorded](#commandbuffers-secondary)
into any element of the `pCommandBuffers` member of any element of
`pSubmits` **must** be in the [pending or    executable state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00073) VUID-vkQueueSubmit-pCommandBuffers-00073

If any [secondary command buffers recorded](#commandbuffers-secondary)
into any element of the `pCommandBuffers` member of any element of
`pSubmits` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits), it **must** not be in
the [pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00074) VUID-vkQueueSubmit-pCommandBuffers-00074

Each element of the `pCommandBuffers` member of each element of
`pSubmits` **must** have been allocated from a `VkCommandPool` that
was created for the same queue family `queue` belongs to

* 
[](#VUID-vkQueueSubmit-pSubmits-02207) VUID-vkQueueSubmit-pSubmits-02207

If any element of `pSubmits->pCommandBuffers` includes a
[Queue Family Ownership    Transfer Acquire Operation](synchronization.html#synchronization-queue-transfers-acquire), there **must** exist a previously submitted
[Queue Family Ownership    Transfer Release Operation](synchronization.html#synchronization-queue-transfers-release) on a queue in the queue family identified
by the acquire operation, with parameters matching the acquire operation
as defined in the definition of such
[acquire operations](synchronization.html#synchronization-queue-transfers-acquire), and
which happens-before the acquire operation

* 
[](#VUID-vkQueueSubmit-pSubmits-10911) VUID-vkQueueSubmit-pSubmits-10911

If any element of `pSubmits->pCommandBuffers` includes a
[Queue Family Ownership    Transfer Acquire Operation](synchronization.html#synchronization-queue-transfers-acquire), the affected resource **must** not be
modified in any way between the last matching release operation and the
acquire operation

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-03220) VUID-vkQueueSubmit-pCommandBuffers-03220

If a command recorded into any element of `pCommandBuffers` was a
[vkCmdBeginQuery](queries.html#vkCmdBeginQuery) whose `queryPool` was created with a
`queryType` of [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](queries.html#VkQueryType), the
[profiling lock](queries.html#profiling-lock) **must** have been held continuously on
the `VkDevice` that `queue` was retrieved from, throughout
recording of those command buffers

* 
[](#VUID-vkQueueSubmit-pSubmits-02808) VUID-vkQueueSubmit-pSubmits-02808

Any resource created with [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode) that is read
by an operation specified by `pSubmits` **must** not be owned by any
queue family other than the one which `queue` belongs to, at the
time it is executed

* 
[](#VUID-vkQueueSubmit-pSubmits-04626) VUID-vkQueueSubmit-pSubmits-04626

Any resource created with [VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode) that is
accessed by an operation specified by `pSubmits` **must** have included
the queue family of `queue` at resource creation time

* 
[](#VUID-vkQueueSubmit-queue-06448) VUID-vkQueueSubmit-queue-06448

If `queue` was not created with
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](devsandqueues.html#VkDeviceQueueCreateFlagBits), there **must** be no element of
`pSubmits` that includes a [VkProtectedSubmitInfo](#VkProtectedSubmitInfo) structure in
its `pNext` chain with `protectedSubmit` equal to [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-vkQueueSubmit-queue-parameter) VUID-vkQueueSubmit-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueSubmit-pSubmits-parameter) VUID-vkQueueSubmit-pSubmits-parameter

 If `submitCount` is not `0`, `pSubmits` **must** be a valid pointer to an array of `submitCount` valid [VkSubmitInfo](#VkSubmitInfo) structures

* 
[](#VUID-vkQueueSubmit-fence-parameter) VUID-vkQueueSubmit-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be a valid [VkFence](synchronization.html#VkFence) handle

* 
[](#VUID-vkQueueSubmit-commonparent) VUID-vkQueueSubmit-commonparent

 Both of `fence`, and `queue` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
Host access to `fence` **must** be externally synchronized

Command Properties
| [Command Buffer Levels](#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkSubmitInfo` structure is defined as:

|  | This functionality is superseded by [VkSubmitInfo2](#VkSubmitInfo2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkSubmitInfo {
    VkStructureType                sType;
    const void*                    pNext;
    uint32_t                       waitSemaphoreCount;
    const VkSemaphore*             pWaitSemaphores;
    const VkPipelineStageFlags*    pWaitDstStageMask;
    uint32_t                       commandBufferCount;
    const VkCommandBuffer*         pCommandBuffers;
    uint32_t                       signalSemaphoreCount;
    const VkSemaphore*             pSignalSemaphores;
} VkSubmitInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of semaphores upon which to wait
before executing the command buffers for the batch.

* 
`pWaitSemaphores` is a pointer to an array of [VkSemaphore](synchronization.html#VkSemaphore)
handles upon which to wait before the command buffers for this batch
begin execution.
If semaphores to wait on are provided, they define a
[semaphore wait operation](synchronization.html#synchronization-semaphores-waiting).

* 
`pWaitDstStageMask` is a pointer to an array of pipeline stages at
which each corresponding semaphore wait will occur.

* 
`commandBufferCount` is the number of command buffers to execute in
the batch.

* 
`pCommandBuffers` is a pointer to an array of [VkCommandBuffer](#VkCommandBuffer)
handles to execute in the batch.

* 
`signalSemaphoreCount` is the number of semaphores to be signaled
once the commands specified in `pCommandBuffers` have completed
execution.

* 
`pSignalSemaphores` is a pointer to an array of [VkSemaphore](synchronization.html#VkSemaphore)
handles which will be signaled when the command buffers for this batch
have completed execution.
If semaphores to be signaled are provided, they define a
[semaphore signal operation](synchronization.html#synchronization-semaphores-signaling).

The order that command buffers appear in `pCommandBuffers` is used to
determine [submission order](synchronization.html#synchronization-submission-order), and thus
all the [implicit ordering guarantees](synchronization.html#synchronization-implicit) that
respect it.
Other than these implicit ordering guarantees and any [explicit synchronization primitives](synchronization.html#synchronization), these command buffers **may** overlap or
otherwise execute out of order.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](synchronization.html#synchronization-semaphores-waiting) defined
by this structure is limited to operations in stages indicated by the
corresponding element of `pWaitDstStageMask`.

|  | A common scenario for using `pWaitDstStageMask` with values other than
| --- | --- |
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits) is when synchronizing a window
system presentation operation against subsequent command buffers which
render the next frame.
In this case, a presentation image **must** not be overwritten until the
presentation operation completes, but other pipeline stages **can** execute
without waiting.
A mask of [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) prevents
subsequent color attachment writes from executing until the semaphore
signals.
Some implementations **may** be able to execute transfer operations and/or
pre-rasterization work before the semaphore is signaled.

If an image layout transition needs to be performed on a presentable image
before it is used in a framebuffer, that **can** be performed as the first
operation submitted to the queue after acquiring the image, and **should** not
prevent other work from overlapping with the presentation operation.
For example, a `VkImageMemoryBarrier` could use:

* 
`srcStageMask` = [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
`srcAccessMask` = 0

* 
`dstStageMask` = [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
`dstAccessMask` = [VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits) \|
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).

* 
`oldLayout` = [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](resources.html#VkImageLayout)

* 
`newLayout` = [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

Alternatively, `oldLayout` **can** be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), if
the image’s contents need not be preserved.

This barrier accomplishes a dependency chain between previous presentation
operations and subsequent color attachment output operations, with the
layout transition performed in between, and does not introduce a dependency
between previous work and any
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization)s.
More precisely, the semaphore signals after the presentation operation
completes, the semaphore wait stalls the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) stage, and there is a
dependency from that same stage to itself with the layout transition
performed in between. |

Valid Usage

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04090) VUID-VkSubmitInfo-pWaitDstStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04091) VUID-VkSubmitInfo-pWaitDstStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04092) VUID-VkSubmitInfo-pWaitDstStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04093) VUID-VkSubmitInfo-pWaitDstStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04094) VUID-VkSubmitInfo-pWaitDstStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04095) VUID-VkSubmitInfo-pWaitDstStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04096) VUID-VkSubmitInfo-pWaitDstStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-07318) VUID-VkSubmitInfo-pWaitDstStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-03937) VUID-VkSubmitInfo-pWaitDstStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `pWaitDstStageMask` **must** not be `0`

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-07949) VUID-VkSubmitInfo-pWaitDstStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-10754) VUID-VkSubmitInfo-pWaitDstStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-00075) VUID-VkSubmitInfo-pCommandBuffers-00075

Each element of `pCommandBuffers` **must** not have been allocated with
[VK_COMMAND_BUFFER_LEVEL_SECONDARY](#VkCommandBufferLevel)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-00078) VUID-VkSubmitInfo-pWaitDstStageMask-00078

Each element of `pWaitDstStageMask` **must** not include
[VK_PIPELINE_STAGE_HOST_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubmitInfo-pWaitSemaphores-03239) VUID-VkSubmitInfo-pWaitSemaphores-03239

If any element of `pWaitSemaphores` or `pSignalSemaphores` was
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR), then the `pNext` chain **must**
include a [VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo) structure

* 
[](#VUID-VkSubmitInfo-pNext-03240) VUID-VkSubmitInfo-pNext-03240

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo) structure and any element of
`pWaitSemaphores` was created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR), then its `waitSemaphoreValueCount`
member **must** equal `waitSemaphoreCount`

* 
[](#VUID-VkSubmitInfo-pNext-03241) VUID-VkSubmitInfo-pNext-03241

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo) structure and any element of
`pSignalSemaphores` was created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR), then its
`signalSemaphoreValueCount` member **must** equal
`signalSemaphoreCount`

* 
[](#VUID-VkSubmitInfo-pSignalSemaphores-03242) VUID-VkSubmitInfo-pSignalSemaphores-03242

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo)::`pSignalSemaphoreValues` **must**
have a value greater than the current value of the semaphore when the
[semaphore signal operation](synchronization.html#synchronization-semaphores-signaling) is
executed

* 
[](#VUID-VkSubmitInfo-pWaitSemaphores-03243) VUID-VkSubmitInfo-pWaitSemaphores-03243

For each element of `pWaitSemaphores` created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo)::`pWaitSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkSubmitInfo-pSignalSemaphores-03244) VUID-VkSubmitInfo-pSignalSemaphores-03244

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo)::`pSignalSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkSubmitInfo-pNext-04120) VUID-VkSubmitInfo-pNext-04120

If the `pNext` chain of this structure does not include a
`VkProtectedSubmitInfo` structure with `protectedSubmit` set to
[VK_TRUE](fundamentals.html#VK_TRUE), then each element of the `pCommandBuffers` array
**must** be an unprotected command buffer

* 
[](#VUID-VkSubmitInfo-pNext-04148) VUID-VkSubmitInfo-pNext-04148

If the `pNext` chain of this structure includes a
`VkProtectedSubmitInfo` structure with `protectedSubmit` set to
[VK_TRUE](fundamentals.html#VK_TRUE), then each element of the `pCommandBuffers` array
**must** be a protected command buffer

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06193) VUID-VkSubmitInfo-pCommandBuffers-06193

If `pCommandBuffers` contains any [resumed    render pass instances](renderpass.html#renderpass-suspension), they **must** be suspended by a render pass
instance earlier in submission order within `pCommandBuffers`

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06014) VUID-VkSubmitInfo-pCommandBuffers-06014

If `pCommandBuffers` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), they **must** be resumed by a render pass instance
later in submission order within `pCommandBuffers`

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06015) VUID-VkSubmitInfo-pCommandBuffers-06015

If `pCommandBuffers` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), there **must** be no action or synchronization
commands executed in a primary or [    secondary](#commandbuffers-secondary) command buffer between that render pass instance and the
render pass instance that resumes it

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06016) VUID-VkSubmitInfo-pCommandBuffers-06016

If `pCommandBuffers` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), there **must** be no render pass instances between
that render pass instance and the render pass instance that resumes it

* 
[](#VUID-VkSubmitInfo-variableSampleLocations-06017) VUID-VkSubmitInfo-variableSampleLocations-06017

If the [`variableSampleLocations`](limits.html#limits-variableSampleLocations)
limit is not supported, and any element of `pCommandBuffers`
contains any [suspended render pass instances](renderpass.html#renderpass-suspension),
where a graphics pipeline has been bound, any pipelines bound in the
render pass instance that resumes it, or any subsequent render pass
instances that resume from that one and so on, **must** use the same sample
locations

* 
[](#VUID-VkSubmitInfo-pNext-09683) VUID-VkSubmitInfo-pNext-09683

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](debugging.html#VkFrameBoundaryTensorsARM) structure then it **must** also include a
[VkFrameBoundaryEXT](debugging.html#VkFrameBoundaryEXT) structure

* 
[](#VUID-VkSubmitInfo-pCommandBufferInfos-09942) VUID-VkSubmitInfo-pCommandBufferInfos-09942

If at least one [VkCommandBufferSubmitInfo](#VkCommandBufferSubmitInfo) structure in
`pCommandBufferInfos` references a `commandBuffer` allocated
from a pool that was created with a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in the
`pNext` chain of [VkCommandPoolCreateInfo](#VkCommandPoolCreateInfo) that included a
foreign data graph processing engine in its `pProcessingEngines`
member, then `pWaitSemaphoreInfos` and `pSignalSemaphoreInfos`
**must** only reference `semaphore` objects that were created from
external handle types reported as supported in a
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphProcessingEnginePropertiesARM)::`foreignSemaphoreHandleTypes`
structure via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM)
with a `queueFamilyIndex` matching the one the command pool was
created for, for all the foreign data graph processing engines that were
part of the [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) used to
create the command pool

Valid Usage (Implicit)

* 
[](#VUID-VkSubmitInfo-sType-sType) VUID-VkSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBMIT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubmitInfo-pNext-pNext) VUID-VkSubmitInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAmigoProfilingSubmitInfoSEC](../appendices/extensions.html#VkAmigoProfilingSubmitInfoSEC), [VkD3D12FenceSubmitInfoKHR](#VkD3D12FenceSubmitInfoKHR), [VkDeviceGroupSubmitInfo](#VkDeviceGroupSubmitInfo), [VkFrameBoundaryEXT](debugging.html#VkFrameBoundaryEXT), [VkFrameBoundaryTensorsARM](debugging.html#VkFrameBoundaryTensorsARM), [VkLatencySubmissionPresentIdNV](VK_KHR_surface/wsi.html#VkLatencySubmissionPresentIdNV), [VkPerformanceQuerySubmitInfoKHR](#VkPerformanceQuerySubmitInfoKHR), [VkProtectedSubmitInfo](#VkProtectedSubmitInfo), [VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo), [VkWin32KeyedMutexAcquireReleaseInfoKHR](#VkWin32KeyedMutexAcquireReleaseInfoKHR), or [VkWin32KeyedMutexAcquireReleaseInfoNV](#VkWin32KeyedMutexAcquireReleaseInfoNV)

* 
[](#VUID-VkSubmitInfo-sType-unique) VUID-VkSubmitInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubmitInfo-pWaitSemaphores-parameter) VUID-VkSubmitInfo-pWaitSemaphores-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphores` **must** be a valid pointer to an array of `waitSemaphoreCount` valid [VkSemaphore](synchronization.html#VkSemaphore) handles

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-parameter) VUID-VkSubmitInfo-pWaitDstStageMask-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitDstStageMask` **must** be a valid pointer to an array of `waitSemaphoreCount` valid combinations of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-parameter) VUID-VkSubmitInfo-pCommandBuffers-parameter

 If `commandBufferCount` is not `0`, `pCommandBuffers` **must** be a valid pointer to an array of `commandBufferCount` valid [VkCommandBuffer](#VkCommandBuffer) handles

* 
[](#VUID-VkSubmitInfo-pSignalSemaphores-parameter) VUID-VkSubmitInfo-pSignalSemaphores-parameter

 If `signalSemaphoreCount` is not `0`, `pSignalSemaphores` **must** be a valid pointer to an array of `signalSemaphoreCount` valid [VkSemaphore](synchronization.html#VkSemaphore) handles

* 
[](#VUID-VkSubmitInfo-commonparent) VUID-VkSubmitInfo-commonparent

 Each of the elements of `pCommandBuffers`, the elements of `pSignalSemaphores`, and the elements of `pWaitSemaphores` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

To specify the values to use when waiting for and signaling semaphores
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR),
add a [VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo) structure to the `pNext` chain
of the [VkSubmitInfo](#VkSubmitInfo) structure when using [vkQueueSubmit](#vkQueueSubmit)
or the [VkBindSparseInfo](sparsemem.html#VkBindSparseInfo) structure when using [vkQueueBindSparse](sparsemem.html#vkQueueBindSparse)
.
The `VkTimelineSemaphoreSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkTimelineSemaphoreSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           waitSemaphoreValueCount;
    const uint64_t*    pWaitSemaphoreValues;
    uint32_t           signalSemaphoreValueCount;
    const uint64_t*    pSignalSemaphoreValues;
} VkTimelineSemaphoreSubmitInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkTimelineSemaphoreSubmitInfo
typedef VkTimelineSemaphoreSubmitInfo VkTimelineSemaphoreSubmitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreValueCount` is the number of semaphore wait values
specified in `pWaitSemaphoreValues`.

* 
`pWaitSemaphoreValues` is a pointer to an array of
`waitSemaphoreValueCount` values for the corresponding semaphores in
[VkSubmitInfo](#VkSubmitInfo)::`pWaitSemaphores` to wait for.

* 
`signalSemaphoreValueCount` is the number of semaphore signal values
specified in `pSignalSemaphoreValues`.

* 
`pSignalSemaphoreValues` is a pointer to an array
`signalSemaphoreValueCount` values for the corresponding semaphores
in [VkSubmitInfo](#VkSubmitInfo)::`pSignalSemaphores` to set when signaled.

If the semaphore in [VkSubmitInfo](#VkSubmitInfo)::`pWaitSemaphores` or
[VkSubmitInfo](#VkSubmitInfo)::`pSignalSemaphores` corresponding to an entry in
`pWaitSemaphoreValues` or `pSignalSemaphoreValues` respectively was
not created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR), the implementation **must** ignore the value
in the `pWaitSemaphoreValues` or `pSignalSemaphoreValues` entry.

Valid Usage (Implicit)

* 
[](#VUID-VkTimelineSemaphoreSubmitInfo-sType-sType) VUID-VkTimelineSemaphoreSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTimelineSemaphoreSubmitInfo-pWaitSemaphoreValues-parameter) VUID-VkTimelineSemaphoreSubmitInfo-pWaitSemaphoreValues-parameter

 If `waitSemaphoreValueCount` is not `0`, and `pWaitSemaphoreValues` is not `NULL`, `pWaitSemaphoreValues` **must** be a valid pointer to an array of `waitSemaphoreValueCount` `uint64_t` values

* 
[](#VUID-VkTimelineSemaphoreSubmitInfo-pSignalSemaphoreValues-parameter) VUID-VkTimelineSemaphoreSubmitInfo-pSignalSemaphoreValues-parameter

 If `signalSemaphoreValueCount` is not `0`, and `pSignalSemaphoreValues` is not `NULL`, `pSignalSemaphoreValues` **must** be a valid pointer to an array of `signalSemaphoreValueCount` `uint64_t` values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](sparsemem.html#VkBindSparseInfo)

* 
[VkSubmitInfo](#VkSubmitInfo)

To specify the values to use when waiting for and signaling semaphores whose
[current payload](synchronization.html#synchronization-semaphores-importing) refers to a
Direct3D 12 fence, add a [VkD3D12FenceSubmitInfoKHR](#VkD3D12FenceSubmitInfoKHR) structure to the
`pNext` chain of the [VkSubmitInfo](#VkSubmitInfo) structure.
The `VkD3D12FenceSubmitInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkD3D12FenceSubmitInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           waitSemaphoreValuesCount;
    const uint64_t*    pWaitSemaphoreValues;
    uint32_t           signalSemaphoreValuesCount;
    const uint64_t*    pSignalSemaphoreValues;
} VkD3D12FenceSubmitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreValuesCount` is the number of semaphore wait values
specified in `pWaitSemaphoreValues`.

* 
`pWaitSemaphoreValues` is a pointer to an array of
`waitSemaphoreValuesCount` values for the corresponding semaphores
in [VkSubmitInfo](#VkSubmitInfo)::`pWaitSemaphores` to wait for.

* 
`signalSemaphoreValuesCount` is the number of semaphore signal
values specified in `pSignalSemaphoreValues`.

* 
`pSignalSemaphoreValues` is a pointer to an array of
`signalSemaphoreValuesCount` values for the corresponding semaphores
in [VkSubmitInfo](#VkSubmitInfo)::`pSignalSemaphores` to set when signaled.

If the semaphore in [VkSubmitInfo](#VkSubmitInfo)::`pWaitSemaphores` or
[VkSubmitInfo](#VkSubmitInfo)::`pSignalSemaphores` corresponding to an entry in
`pWaitSemaphoreValues` or `pSignalSemaphoreValues` respectively does
not currently have a [payload](synchronization.html#synchronization-semaphores-payloads)
referring to a Direct3D 12 fence, the implementation **must** ignore the value
in the `pWaitSemaphoreValues` or `pSignalSemaphoreValues` entry.

|  | As the introduction of the external semaphore handle type
| --- | --- |
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) predates that of
timeline semaphores, support for importing semaphore payloads from external
handles of that type into semaphores created (implicitly or explicitly) with
a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](synchronization.html#VkSemaphoreTypeKHR) is preserved for
backwards compatibility.
However, applications **should** prefer importing such handle types into
semaphores created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR), and use the
[VkTimelineSemaphoreSubmitInfo](#VkTimelineSemaphoreSubmitInfo) structure instead of the
`VkD3D12FenceSubmitInfoKHR` structure to specify the values to use when
waiting for and signaling such semaphores. |

Valid Usage

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-waitSemaphoreValuesCount-00079) VUID-VkD3D12FenceSubmitInfoKHR-waitSemaphoreValuesCount-00079

`waitSemaphoreValuesCount` **must** be the same value as
`VkSubmitInfo`::`waitSemaphoreCount`, where this structure is in
the `pNext` chain of a `VkSubmitInfo` structure

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-signalSemaphoreValuesCount-00080) VUID-VkD3D12FenceSubmitInfoKHR-signalSemaphoreValuesCount-00080

`signalSemaphoreValuesCount` **must** be the same value as
`VkSubmitInfo`::`signalSemaphoreCount`, where this structure is
in the `pNext` chain of a `VkSubmitInfo` structure

Valid Usage (Implicit)

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-sType-sType) VUID-VkD3D12FenceSubmitInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_D3D12_FENCE_SUBMIT_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-pWaitSemaphoreValues-parameter) VUID-VkD3D12FenceSubmitInfoKHR-pWaitSemaphoreValues-parameter

 If `waitSemaphoreValuesCount` is not `0`, and `pWaitSemaphoreValues` is not `NULL`, `pWaitSemaphoreValues` **must** be a valid pointer to an array of `waitSemaphoreValuesCount` `uint64_t` values

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-pSignalSemaphoreValues-parameter) VUID-VkD3D12FenceSubmitInfoKHR-pSignalSemaphoreValues-parameter

 If `signalSemaphoreValuesCount` is not `0`, and `pSignalSemaphoreValues` is not `NULL`, `pSignalSemaphoreValues` **must** be a valid pointer to an array of `signalSemaphoreValuesCount` `uint64_t` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](#VkSubmitInfo)

When submitting work that operates on memory imported from a Direct3D 11
resource to a queue, the keyed mutex mechanism **may** be used in addition to
Vulkan semaphores to synchronize the work.
Keyed mutexes are a property of a properly created shareable Direct3D 11
resource.
They **can** only be used if the imported resource was created with the
`D3D11_RESOURCE_MISC_SHARED_KEYEDMUTEX` flag.

To acquire keyed mutexes before submitted work and/or release them after,
add a [VkWin32KeyedMutexAcquireReleaseInfoKHR](#VkWin32KeyedMutexAcquireReleaseInfoKHR) structure to the
`pNext` chain of the [VkSubmitInfo](#VkSubmitInfo) structure.

The `VkWin32KeyedMutexAcquireReleaseInfoKHR` structure is defined as:

// Provided by VK_KHR_win32_keyed_mutex
typedef struct VkWin32KeyedMutexAcquireReleaseInfoKHR {
    VkStructureType          sType;
    const void*              pNext;
    uint32_t                 acquireCount;
    const VkDeviceMemory*    pAcquireSyncs;
    const uint64_t*          pAcquireKeys;
    const uint32_t*          pAcquireTimeouts;
    uint32_t                 releaseCount;
    const VkDeviceMemory*    pReleaseSyncs;
    const uint64_t*          pReleaseKeys;
} VkWin32KeyedMutexAcquireReleaseInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`acquireCount` is the number of entries in the `pAcquireSyncs`,
`pAcquireKeys`, and `pAcquireTimeouts` arrays.

* 
`pAcquireSyncs` is a pointer to an array of [VkDeviceMemory](memory.html#VkDeviceMemory)
objects which were imported from Direct3D 11 resources.

* 
`pAcquireKeys` is a pointer to an array of mutex key values to wait
for prior to beginning the submitted work.
Entries refer to the keyed mutex associated with the corresponding
entries in `pAcquireSyncs`.

* 
`pAcquireTimeouts` is a pointer to an array of timeout values, in
millisecond units, for each acquire specified in `pAcquireKeys`.

* 
`releaseCount` is the number of entries in the `pReleaseSyncs`
and `pReleaseKeys` arrays.

* 
`pReleaseSyncs` is a pointer to an array of [VkDeviceMemory](memory.html#VkDeviceMemory)
objects which were imported from Direct3D 11 resources.

* 
`pReleaseKeys` is a pointer to an array of mutex key values to set
when the submitted work has completed.
Entries refer to the keyed mutex associated with the corresponding
entries in `pReleaseSyncs`.

Valid Usage

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireSyncs-00081) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireSyncs-00081

Each member of `pAcquireSyncs` and `pReleaseSyncs` **must** be a
device memory object imported by setting
[VkImportMemoryWin32HandleInfoKHR](memory.html#VkImportMemoryWin32HandleInfoKHR)::`handleType` to
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-sType-sType) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireSyncs-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireSyncs-parameter

 If `acquireCount` is not `0`, `pAcquireSyncs` **must** be a valid pointer to an array of `acquireCount` valid [VkDeviceMemory](memory.html#VkDeviceMemory) handles

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireKeys-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireKeys-parameter

 If `acquireCount` is not `0`, `pAcquireKeys` **must** be a valid pointer to an array of `acquireCount` `uint64_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireTimeouts-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pAcquireTimeouts-parameter

 If `acquireCount` is not `0`, `pAcquireTimeouts` **must** be a valid pointer to an array of `acquireCount` `uint32_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pReleaseSyncs-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pReleaseSyncs-parameter

 If `releaseCount` is not `0`, `pReleaseSyncs` **must** be a valid pointer to an array of `releaseCount` valid [VkDeviceMemory](memory.html#VkDeviceMemory) handles

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pReleaseKeys-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-pReleaseKeys-parameter

 If `releaseCount` is not `0`, `pReleaseKeys` **must** be a valid pointer to an array of `releaseCount` `uint64_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-commonparent) VUID-VkWin32KeyedMutexAcquireReleaseInfoKHR-commonparent

 Both of the elements of `pAcquireSyncs`, and the elements of `pReleaseSyncs` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](#VkSubmitInfo)

* 
[VkSubmitInfo2](#VkSubmitInfo2)

When submitting work that operates on memory imported from a Direct3D 11
resource to a queue, the keyed mutex mechanism **may** be used in addition to
Vulkan semaphores to synchronize the work.
Keyed mutexes are a property of a properly created shareable Direct3D 11
resource.
They **can** only be used if the imported resource was created with the
`D3D11_RESOURCE_MISC_SHARED_KEYEDMUTEX` flag.

To acquire keyed mutexes before submitted work and/or release them after,
add a [VkWin32KeyedMutexAcquireReleaseInfoNV](#VkWin32KeyedMutexAcquireReleaseInfoNV) structure to the
`pNext` chain of the [VkSubmitInfo](#VkSubmitInfo) structure.

The `VkWin32KeyedMutexAcquireReleaseInfoNV` structure is defined as:

// Provided by VK_NV_win32_keyed_mutex
typedef struct VkWin32KeyedMutexAcquireReleaseInfoNV {
    VkStructureType          sType;
    const void*              pNext;
    uint32_t                 acquireCount;
    const VkDeviceMemory*    pAcquireSyncs;
    const uint64_t*          pAcquireKeys;
    const uint32_t*          pAcquireTimeoutMilliseconds;
    uint32_t                 releaseCount;
    const VkDeviceMemory*    pReleaseSyncs;
    const uint64_t*          pReleaseKeys;
} VkWin32KeyedMutexAcquireReleaseInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`acquireCount` is the number of entries in the `pAcquireSyncs`,
`pAcquireKeys`, and `pAcquireTimeoutMilliseconds` arrays.

* 
`pAcquireSyncs` is a pointer to an array of [VkDeviceMemory](memory.html#VkDeviceMemory)
objects which were imported from Direct3D 11 resources.

* 
`pAcquireKeys` is a pointer to an array of mutex key values to wait
for prior to beginning the submitted work.
Entries refer to the keyed mutex associated with the corresponding
entries in `pAcquireSyncs`.

* 
`pAcquireTimeoutMilliseconds` is a pointer to an array of timeout
values, in millisecond units, for each acquire specified in
`pAcquireKeys`.

* 
`releaseCount` is the number of entries in the `pReleaseSyncs`
and `pReleaseKeys` arrays.

* 
`pReleaseSyncs` is a pointer to an array of [VkDeviceMemory](memory.html#VkDeviceMemory)
objects which were imported from Direct3D 11 resources.

* 
`pReleaseKeys` is a pointer to an array of mutex key values to set
when the submitted work has completed.
Entries refer to the keyed mutex associated with the corresponding
entries in `pReleaseSyncs`.

Valid Usage (Implicit)

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-sType-sType) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireSyncs-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireSyncs-parameter

 If `acquireCount` is not `0`, `pAcquireSyncs` **must** be a valid pointer to an array of `acquireCount` valid [VkDeviceMemory](memory.html#VkDeviceMemory) handles

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireKeys-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireKeys-parameter

 If `acquireCount` is not `0`, `pAcquireKeys` **must** be a valid pointer to an array of `acquireCount` `uint64_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireTimeoutMilliseconds-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireTimeoutMilliseconds-parameter

 If `acquireCount` is not `0`, `pAcquireTimeoutMilliseconds` **must** be a valid pointer to an array of `acquireCount` `uint32_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseSyncs-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseSyncs-parameter

 If `releaseCount` is not `0`, `pReleaseSyncs` **must** be a valid pointer to an array of `releaseCount` valid [VkDeviceMemory](memory.html#VkDeviceMemory) handles

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseKeys-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseKeys-parameter

 If `releaseCount` is not `0`, `pReleaseKeys` **must** be a valid pointer to an array of `releaseCount` `uint64_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-commonparent) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-commonparent

 Both of the elements of `pAcquireSyncs`, and the elements of `pReleaseSyncs` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](#VkSubmitInfo)

* 
[VkSubmitInfo2](#VkSubmitInfo2)

If the `pNext` chain of [VkSubmitInfo](#VkSubmitInfo) includes a
`VkProtectedSubmitInfo` structure, then the structure indicates whether
the batch is protected.
The `VkProtectedSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkProtectedSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           protectedSubmit;
} VkProtectedSubmitInfo;

* 
`protectedSubmit` specifies whether the batch is protected.
If `protectedSubmit` is [VK_TRUE](fundamentals.html#VK_TRUE), the batch is protected.
If `protectedSubmit` is [VK_FALSE](fundamentals.html#VK_FALSE), the batch is unprotected.
If the `VkSubmitInfo`::`pNext` chain does not include this
structure, the batch is unprotected.

Valid Usage (Implicit)

* 
[](#VUID-VkProtectedSubmitInfo-sType-sType) VUID-VkProtectedSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PROTECTED_SUBMIT_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](#VkSubmitInfo)

If the `pNext` chain of [VkSubmitInfo](#VkSubmitInfo) includes a
`VkDeviceGroupSubmitInfo` structure, then that structure includes device
indices and masks specifying which physical devices execute semaphore
operations and command buffers.

The `VkDeviceGroupSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           waitSemaphoreCount;
    const uint32_t*    pWaitSemaphoreDeviceIndices;
    uint32_t           commandBufferCount;
    const uint32_t*    pCommandBufferDeviceMasks;
    uint32_t           signalSemaphoreCount;
    const uint32_t*    pSignalSemaphoreDeviceIndices;
} VkDeviceGroupSubmitInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkDeviceGroupSubmitInfo
typedef VkDeviceGroupSubmitInfo VkDeviceGroupSubmitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of elements in the
`pWaitSemaphoreDeviceIndices` array.

* 
`pWaitSemaphoreDeviceIndices` is a pointer to an array of
`waitSemaphoreCount` device indices indicating which physical device
executes the semaphore wait operation in the corresponding element of
[VkSubmitInfo](#VkSubmitInfo)::`pWaitSemaphores`.

* 
`commandBufferCount` is the number of elements in the
`pCommandBufferDeviceMasks` array.

* 
`pCommandBufferDeviceMasks` is a pointer to an array of
`commandBufferCount` device masks indicating which physical devices
execute the command buffer in the corresponding element of
[VkSubmitInfo](#VkSubmitInfo)::`pCommandBuffers`.
A physical device executes the command buffer if the corresponding bit
is set in the mask.

* 
`signalSemaphoreCount` is the number of elements in the
`pSignalSemaphoreDeviceIndices` array.

* 
`pSignalSemaphoreDeviceIndices` is a pointer to an array of
`signalSemaphoreCount` device indices indicating which physical
device executes the semaphore signal operation in the corresponding
element of [VkSubmitInfo](#VkSubmitInfo)::`pSignalSemaphores`.

If this structure is not present, semaphore operations and command buffers
execute on device index zero.

Valid Usage

* 
[](#VUID-VkDeviceGroupSubmitInfo-waitSemaphoreCount-00082) VUID-VkDeviceGroupSubmitInfo-waitSemaphoreCount-00082

`waitSemaphoreCount` **must** equal
[VkSubmitInfo](#VkSubmitInfo)::`waitSemaphoreCount`

* 
[](#VUID-VkDeviceGroupSubmitInfo-commandBufferCount-00083) VUID-VkDeviceGroupSubmitInfo-commandBufferCount-00083

`commandBufferCount` **must** equal
[VkSubmitInfo](#VkSubmitInfo)::`commandBufferCount`

* 
[](#VUID-VkDeviceGroupSubmitInfo-signalSemaphoreCount-00084) VUID-VkDeviceGroupSubmitInfo-signalSemaphoreCount-00084

`signalSemaphoreCount` **must** equal
[VkSubmitInfo](#VkSubmitInfo)::`signalSemaphoreCount`

* 
[](#VUID-VkDeviceGroupSubmitInfo-pWaitSemaphoreDeviceIndices-00085) VUID-VkDeviceGroupSubmitInfo-pWaitSemaphoreDeviceIndices-00085

All elements of `pWaitSemaphoreDeviceIndices` and
`pSignalSemaphoreDeviceIndices` **must** be valid device indices

* 
[](#VUID-VkDeviceGroupSubmitInfo-pCommandBufferDeviceMasks-00086) VUID-VkDeviceGroupSubmitInfo-pCommandBufferDeviceMasks-00086

All elements of `pCommandBufferDeviceMasks` **must** be valid device
masks

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupSubmitInfo-sType-sType) VUID-VkDeviceGroupSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceGroupSubmitInfo-pWaitSemaphoreDeviceIndices-parameter) VUID-VkDeviceGroupSubmitInfo-pWaitSemaphoreDeviceIndices-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphoreDeviceIndices` **must** be a valid pointer to an array of `waitSemaphoreCount` `uint32_t` values

* 
[](#VUID-VkDeviceGroupSubmitInfo-pCommandBufferDeviceMasks-parameter) VUID-VkDeviceGroupSubmitInfo-pCommandBufferDeviceMasks-parameter

 If `commandBufferCount` is not `0`, `pCommandBufferDeviceMasks` **must** be a valid pointer to an array of `commandBufferCount` `uint32_t` values

* 
[](#VUID-VkDeviceGroupSubmitInfo-pSignalSemaphoreDeviceIndices-parameter) VUID-VkDeviceGroupSubmitInfo-pSignalSemaphoreDeviceIndices-parameter

 If `signalSemaphoreCount` is not `0`, `pSignalSemaphoreDeviceIndices` **must** be a valid pointer to an array of `signalSemaphoreCount` `uint32_t` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](#VkSubmitInfo)

If the `pNext` chain of [VkSubmitInfo](#VkSubmitInfo) includes a
[VkPerformanceQuerySubmitInfoKHR](#VkPerformanceQuerySubmitInfoKHR) structure, then the structure
indicates which counter pass is active for the batch in that submit.

The `VkPerformanceQuerySubmitInfoKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkPerformanceQuerySubmitInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           counterPassIndex;
} VkPerformanceQuerySubmitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`counterPassIndex` specifies which counter pass index is active.

If the `VkSubmitInfo`::`pNext` chain does not include this
structure, the batch defaults to use counter pass index 0.

Valid Usage

* 
[](#VUID-VkPerformanceQuerySubmitInfoKHR-counterPassIndex-03221) VUID-VkPerformanceQuerySubmitInfoKHR-counterPassIndex-03221

`counterPassIndex` **must** be less than the number of counter passes
required by any queries within the batch.
The required number of counter passes for a performance query is
obtained by calling
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](queries.html#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceQuerySubmitInfoKHR-sType-sType) VUID-VkPerformanceQuerySubmitInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_QUERY_SUBMIT_INFO_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](#VkSubmitInfo)

* 
[VkSubmitInfo2](#VkSubmitInfo2)

When using binary semaphores, the application **must** ensure that command
buffer submissions will be able to complete without any subsequent
operations by the application on any queue.
After any call to `vkQueueSubmit` (or other queue operation), for every
queued wait on a semaphore
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](synchronization.html#VkSemaphoreTypeKHR)
there **must** be a prior signal of that semaphore that will not be consumed by
a different wait on the semaphore.

When using timeline semaphores, wait-before-signal behavior is well-defined
and applications **can** submit work via `vkQueueSubmit` defining a
[timeline semaphore wait operation](synchronization.html#synchronization-semaphores-waiting)
before submitting a corresponding [semaphore signal operation](synchronization.html#synchronization-semaphores-signaling).
For each [timeline semaphore wait operation](synchronization.html#synchronization-semaphores-waiting) defined by a call to `vkQueueSubmit`, the application **must**
ensure that a corresponding [semaphore signal operation](synchronization.html#synchronization-semaphores-signaling) is executed before forward progress can be
made.

If a command buffer submission waits for any events to be signaled, the
application **must** ensure that command buffer submissions will be able to
complete without any subsequent operations by the application.
Events signaled by the host **must** be signaled before the command buffer
waits on those events.

|  | The ability for commands to wait on the host to set an events was originally
| --- | --- |
added to allow low-latency updates to resources between host and device.
However, to ensure quality of service, implementations would necessarily
detect extended stalls in execution and timeout after a short period.
As this period is not defined in the Vulkan specification, it is impossible
to correctly validate any application with any wait period.
Since the original users of this functionality were highly limited and
platform-specific, this functionality is now considered defunct and should
not be used. |

Secondary command buffers **must** not be directly submitted to a queue.
To record a secondary command buffer to execute as part of a primary command
buffer, call:

// Provided by VK_VERSION_1_0
void vkCmdExecuteCommands(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    commandBufferCount,
    const VkCommandBuffer*                      pCommandBuffers);

* 
`commandBuffer` is a handle to a primary command buffer that the
secondary command buffers are executed in.

* 
`commandBufferCount` is the length of the `pCommandBuffers`
array.

* 
`pCommandBuffers` is a pointer to an array of
`commandBufferCount` secondary command buffer handles, which are
recorded to execute in the primary command buffer in the order they are
listed in the array.

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) flag, and it was recorded
into any other primary command buffer which is currently in the
[executable or recording state](#commandbuffers-lifecycle), that primary
command buffer becomes [invalid](#commandbuffers-lifecycle).

If the [`nestedCommandBuffer`](features.html#features-nestedCommandBuffer) feature
is enabled it is valid usage for `vkCmdExecuteCommands` to also be
recorded to a [secondary command buffer](../appendices/glossary.html#glossary).

Valid Usage

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00088) VUID-vkCmdExecuteCommands-pCommandBuffers-00088

Each element of `pCommandBuffers` **must** have been allocated with a
`level` of [VK_COMMAND_BUFFER_LEVEL_SECONDARY](#VkCommandBufferLevel)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00089) VUID-vkCmdExecuteCommands-pCommandBuffers-00089

Each element of `pCommandBuffers` **must** be in the
[pending or executable state](#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00091) VUID-vkCmdExecuteCommands-pCommandBuffers-00091

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) flag, it **must** not be
in the [pending state](#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00092) VUID-vkCmdExecuteCommands-pCommandBuffers-00092

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) flag, it **must** not
have already been recorded to `commandBuffer`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00093) VUID-vkCmdExecuteCommands-pCommandBuffers-00093

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits) flag, it **must** not
appear more than once in `pCommandBuffers`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00094) VUID-vkCmdExecuteCommands-pCommandBuffers-00094

Each element of `pCommandBuffers` **must** have been allocated from a
`VkCommandPool` that was created for the same queue family as the
`VkCommandPool` from which `commandBuffer` was allocated

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00096) VUID-vkCmdExecuteCommands-pCommandBuffers-00096

If this command is called within a render pass instance, each element of
`pCommandBuffers` **must** have been recorded with the
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00099) VUID-vkCmdExecuteCommands-pCommandBuffers-00099

If this command is called within a render pass instance, and any element
of `pCommandBuffers` was recorded with
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)::`framebuffer` not equal to
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), that `VkFramebuffer` **must** match the
`VkFramebuffer` used in the current render pass instance

* 
[](#VUID-vkCmdExecuteCommands-contents-09680) VUID-vkCmdExecuteCommands-contents-09680

    If this command is called within a render pass instance begun with
    [vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass), and [vkCmdNextSubpass](renderpass.html#vkCmdNextSubpass) has not been
    called in the current render pass instance, the `contents` parameter
    of [vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass) **must** have been
    [VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS](renderpass.html#VkSubpassContents)
, or [VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_EXT](renderpass.html#VkSubpassContents)

* 
[](#VUID-vkCmdExecuteCommands-None-09681) VUID-vkCmdExecuteCommands-None-09681

    If this command is called within a render pass instance begun with
    [vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass), and [vkCmdNextSubpass](renderpass.html#vkCmdNextSubpass) has been called
    in the current render pass instance, the `contents` parameter of the
    last call to [vkCmdNextSubpass](renderpass.html#vkCmdNextSubpass) **must** have been
    [VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS](renderpass.html#VkSubpassContents)
, or [VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](renderpass.html#VkSubpassContents)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06019) VUID-vkCmdExecuteCommands-pCommandBuffers-06019

If this command is called within a render pass instance begun with
[vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass), each element of `pCommandBuffers` **must**
have been recorded with
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)::`subpass` set to the index of
the subpass which the given command buffer will be executed in

* 
[](#VUID-vkCmdExecuteCommands-pBeginInfo-06020) VUID-vkCmdExecuteCommands-pBeginInfo-06020

If this command is called within a render pass instance begun with
[vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass), the render passes specified in the
`pBeginInfo->pInheritanceInfo→renderPass` members of the
[vkBeginCommandBuffer](#vkBeginCommandBuffer) commands used to begin recording each element
of `pCommandBuffers` **must** be
[compatible](renderpass.html#renderpass-compatibility) with the current render pass

* 
[](#VUID-vkCmdExecuteCommands-pNext-02865) VUID-vkCmdExecuteCommands-pNext-02865

If this command is called within a render pass instance that included
[VkRenderPassTransformBeginInfoQCOM](renderpass.html#VkRenderPassTransformBeginInfoQCOM) in the `pNext` chain of
[VkRenderPassBeginInfo](renderpass.html#VkRenderPassBeginInfo), then each element of `pCommandBuffers`
**must** have been recorded with
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](#VkCommandBufferInheritanceRenderPassTransformInfoQCOM) in the
`pNext` chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)

* 
[](#VUID-vkCmdExecuteCommands-pNext-02866) VUID-vkCmdExecuteCommands-pNext-02866

If this command is called within a render pass instance that included
[VkRenderPassTransformBeginInfoQCOM](renderpass.html#VkRenderPassTransformBeginInfoQCOM) in the `pNext` chain of
[VkRenderPassBeginInfo](renderpass.html#VkRenderPassBeginInfo), then each element of `pCommandBuffers`
**must** have been recorded with
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](#VkCommandBufferInheritanceRenderPassTransformInfoQCOM)::`transform`
identical to [VkRenderPassTransformBeginInfoQCOM](renderpass.html#VkRenderPassTransformBeginInfoQCOM)::`transform`

* 
[](#VUID-vkCmdExecuteCommands-pNext-02867) VUID-vkCmdExecuteCommands-pNext-02867

If this command is called within a render pass instance that included
[VkRenderPassTransformBeginInfoQCOM](renderpass.html#VkRenderPassTransformBeginInfoQCOM) in the `pNext` chain of
[VkRenderPassBeginInfo](renderpass.html#VkRenderPassBeginInfo), then each element of `pCommandBuffers`
**must** have been recorded with
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](#VkCommandBufferInheritanceRenderPassTransformInfoQCOM)::`renderArea`
identical to [VkRenderPassBeginInfo](renderpass.html#VkRenderPassBeginInfo)::`renderArea`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00100) VUID-vkCmdExecuteCommands-pCommandBuffers-00100

If `vkCmdExecuteCommands` is not being called within a render pass
instance, each element of `pCommandBuffers` **must** not have been
recorded with the [VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00101) VUID-vkCmdExecuteCommands-commandBuffer-00101

If the [`inheritedQueries`](features.html#features-inheritedQueries) feature is
not enabled, `commandBuffer` **must** not have any queries
[active](queries.html#queries-operation-active)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00102) VUID-vkCmdExecuteCommands-commandBuffer-00102

If `commandBuffer` has a [VK_QUERY_TYPE_OCCLUSION](queries.html#VkQueryType) query
[active](queries.html#queries-operation-active), then each element of
`pCommandBuffers` **must** have been recorded with
`VkCommandBufferInheritanceInfo`::`occlusionQueryEnable` set to
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00103) VUID-vkCmdExecuteCommands-commandBuffer-00103

If `commandBuffer` has a [VK_QUERY_TYPE_OCCLUSION](queries.html#VkQueryType) query
[active](queries.html#queries-operation-active), then each element of
`pCommandBuffers` **must** have been recorded with
`VkCommandBufferInheritanceInfo`::`queryFlags` having all bits
set that are set for the query

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00104) VUID-vkCmdExecuteCommands-commandBuffer-00104

If `commandBuffer` has a [VK_QUERY_TYPE_PIPELINE_STATISTICS](queries.html#VkQueryType)
query [active](queries.html#queries-operation-active), then each element of
`pCommandBuffers` **must** have been recorded with
`VkCommandBufferInheritanceInfo`::`pipelineStatistics` having
all bits set that are set in the `VkQueryPool` the query uses

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00105) VUID-vkCmdExecuteCommands-pCommandBuffers-00105

Each element of `pCommandBuffers` **must** not begin any query types
that are [active](queries.html#queries-operation-active) in `commandBuffer`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-07594) VUID-vkCmdExecuteCommands-commandBuffer-07594

`commandBuffer` **must** not have any queries other than
[VK_QUERY_TYPE_OCCLUSION](queries.html#VkQueryType) and
[VK_QUERY_TYPE_PIPELINE_STATISTICS](queries.html#VkQueryType)
[active](queries.html#queries-operation-active)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-01820) VUID-vkCmdExecuteCommands-commandBuffer-01820

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
each element of `pCommandBuffers` **must** be a protected command
buffer

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-01821) VUID-vkCmdExecuteCommands-commandBuffer-01821

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
each element of `pCommandBuffers` **must** be an unprotected command
buffer

* 
[](#VUID-vkCmdExecuteCommands-None-02286) VUID-vkCmdExecuteCommands-None-02286

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-06533) VUID-vkCmdExecuteCommands-commandBuffer-06533

If this command is called within a render pass instance and any recorded
command in `commandBuffer` in the current subpass will write to an
image subresource as an attachment, commands recorded in elements of
`pCommandBuffers` **must** not read from the memory backing that image
subresource in any other way

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-06534) VUID-vkCmdExecuteCommands-commandBuffer-06534

If this command is called within a render pass instance and any recorded
command in `commandBuffer` in the current subpass will read from an
image subresource used as an attachment in any way other than as an
attachment, commands recorded in elements of `pCommandBuffers` **must**
not write to that image subresource as an attachment

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06535) VUID-vkCmdExecuteCommands-pCommandBuffers-06535

If this command is called within a render pass instance and any recorded
command in a given element of `pCommandBuffers` will write to an
image subresource as an attachment, commands recorded in elements of
`pCommandBuffers` at a higher index **must** not read from the memory
backing that image subresource in any other way

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06536) VUID-vkCmdExecuteCommands-pCommandBuffers-06536

If this command is called within a render pass instance and any recorded
command in a given element of `pCommandBuffers` will read from an
image subresource used as an attachment in any way other than as an
attachment, commands recorded in elements of `pCommandBuffers` at a
higher index **must** not write to that image subresource as an attachment

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06021) VUID-vkCmdExecuteCommands-pCommandBuffers-06021

If `pCommandBuffers` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), there **must** be no action or synchronization
commands between that render pass instance and any render pass instance
that resumes it

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06022) VUID-vkCmdExecuteCommands-pCommandBuffers-06022

If `pCommandBuffers` contains any [suspended    render pass instances](renderpass.html#renderpass-suspension), there **must** be no render pass instances between
that render pass instance and any render pass instance that resumes it

* 
[](#VUID-vkCmdExecuteCommands-variableSampleLocations-06023) VUID-vkCmdExecuteCommands-variableSampleLocations-06023

If the [`variableSampleLocations`](limits.html#limits-variableSampleLocations)
limit is not supported, and any element of `pCommandBuffers`
contains any [suspended render pass instances](renderpass.html#renderpass-suspension),
where a graphics pipeline has been bound, any pipelines bound in the
render pass instance that resumes it, or any subsequent render pass
instances that resume from that one and so on, **must** use the same sample
locations

* 
[](#VUID-vkCmdExecuteCommands-flags-06024) VUID-vkCmdExecuteCommands-flags-06024

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), its [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`flags`
parameter **must** have included
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](renderpass.html#VkRenderingFlagBitsKHR)

* 
[](#VUID-vkCmdExecuteCommands-pBeginInfo-06025) VUID-vkCmdExecuteCommands-pBeginInfo-06025

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the render passes specified in the
`pBeginInfo->pInheritanceInfo→renderPass` members of the
[vkBeginCommandBuffer](#vkBeginCommandBuffer) commands used to begin recording each element
of `pCommandBuffers` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdExecuteCommands-flags-06026) VUID-vkCmdExecuteCommands-flags-06026

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the `flags` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`flags` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), excluding
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](renderpass.html#VkRenderingFlagBitsKHR)

* 
[](#VUID-vkCmdExecuteCommands-colorAttachmentCount-06027) VUID-vkCmdExecuteCommands-colorAttachmentCount-06027

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the `colorAttachmentCount` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
[](#VUID-vkCmdExecuteCommands-imageView-06028) VUID-vkCmdExecuteCommands-imageView-06028

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), if the `imageView` member of an element
of the [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-imageView-07606) VUID-vkCmdExecuteCommands-imageView-07606

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), if the `imageView` member of an element
of the [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-06029) VUID-vkCmdExecuteCommands-pDepthAttachment-06029

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), if the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-06030) VUID-vkCmdExecuteCommands-pStencilAttachment-06030

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), if the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`stencilAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-06774) VUID-vkCmdExecuteCommands-pDepthAttachment-06774

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-06775) VUID-vkCmdExecuteCommands-pStencilAttachment-06775

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`stencilAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11500) VUID-vkCmdExecuteCommands-pCommandBuffers-11500

If the current render pass instance was begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and contains a custom resolve, then each
element of `pCommandBuffers` **must** have been recorded with a
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) struct chained to its
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11501) VUID-vkCmdExecuteCommands-pCommandBuffers-11501

If the current render pass instance was begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and does not contain a custom resolve, then
each element of `pCommandBuffers` **must** not have been recorded with
a [VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) struct chained to its
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11502) VUID-vkCmdExecuteCommands-pCommandBuffers-11502

If the current render pass instance was begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and [vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, then each element of
`pCommandBuffers` **must** have been recorded with
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11503) VUID-vkCmdExecuteCommands-pCommandBuffers-11503

If the current render pass instance was begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and contains a custom resolve, and
[vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has not been recorded in the render
pass instance, then each element of `pCommandBuffers` **must** have
been recorded with
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT)::`customResolve` as
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-vkCmdExecuteCommands-colorAttachmentCount-11532) VUID-vkCmdExecuteCommands-colorAttachmentCount-11532

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) that contains a custom resolve, the
`colorAttachmentCount` member of the
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be equal to
the [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`colorAttachmentCount` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
[](#VUID-vkCmdExecuteCommands-resolveImageView-11533) VUID-vkCmdExecuteCommands-resolveImageView-11533

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) that contains a custom resolve, if the
`resolveImageView` member of an element of the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be equal to
the format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-resolveImageView-11534) VUID-vkCmdExecuteCommands-resolveImageView-11534

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) that contains a custom resolve, if the
`resolveImageView` member of an element of the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-11535) VUID-vkCmdExecuteCommands-pDepthAttachment-11535

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), if the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-11536) VUID-vkCmdExecuteCommands-pStencilAttachment-11536

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) that contains a custom resolve, if the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
value of the `stencilAttachmentFormat` member of the
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be equal to
the format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-11537) VUID-vkCmdExecuteCommands-pDepthAttachment-11537

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) that contains a custom resolve and the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
value of the `depthAttachmentFormat` member of the
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-11538) VUID-vkCmdExecuteCommands-pStencilAttachment-11538

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) that contains a custom resolve and the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
value of the `stencilAttachmentFormat` member of the
[VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-vkCmdExecuteCommands-resolveImageView-11526) VUID-vkCmdExecuteCommands-resolveImageView-11526

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, and the `resolveImageView`
member of an element of the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
**must** be equal to the sample count used to create that
`resolveImageView`

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-11527) VUID-vkCmdExecuteCommands-pDepthAttachment-11527

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, and the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
value of
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
**must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-11528) VUID-vkCmdExecuteCommands-pStencilAttachment-11528

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), [vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has been
recorded in the render pass instance, and the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
value of
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
**must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-viewMask-06031) VUID-vkCmdExecuteCommands-viewMask-06031

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the `viewMask` member of the
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`viewMask` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
[](#VUID-vkCmdExecuteCommands-pNext-06032) VUID-vkCmdExecuteCommands-pNext-06032

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the `pNext` chain of
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
[VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure, if the `imageView`
member of an element of the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
element of the `pColorAttachmentSamples` member of the
[VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06033) VUID-vkCmdExecuteCommands-pNext-06033

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the `pNext` chain of
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
[VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure, if the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthStencilAttachmentSamples` member of the
[VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06034) VUID-vkCmdExecuteCommands-pNext-06034

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the `pNext` chain of
[VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) includes a
[VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure, if the
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView` parameter to
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of the
`depthStencilAttachmentSamples` member of the
[VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06035) VUID-vkCmdExecuteCommands-pNext-06035

    If this command is called within a render pass instance begun with
    [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), and the `pNext` chain of
    [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) does not include a
    [VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
    [VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure,
[vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    if the `imageView` member of an element of the
    [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` parameter to
    [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
    [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
    **must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06036) VUID-vkCmdExecuteCommands-pNext-06036

    If this command is called within a render pass instance begun with
    [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the `pNext` chain of
    [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) does not include a
    [VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
    [VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure,
[vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    if the [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment->imageView`
    parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
    value of
    [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
    **must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06037) VUID-vkCmdExecuteCommands-pNext-06037

    If this command is called within a render pass instance begun with
    [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) and the `pNext` chain of
    [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) does not include a
    [VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
    [VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure,
[vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT) has not yet been recorded in the render pass instance, and
    if the [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment->imageView`
    parameter to [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
    value of
    [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
    **must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-09299) VUID-vkCmdExecuteCommands-pNext-09299

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), with any color attachment using a resolve
mode of [VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](renderpass.html#VkResolveModeFlagBitsKHR),
the `pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) used to
create each element of `pCommandBuffers` **must** include a
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID) structure with an `externalFormat`
matching that used to create the resolve attachment in the render pass

* 
[](#VUID-vkCmdExecuteCommands-pNext-09300) VUID-vkCmdExecuteCommands-pNext-09300

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) with any color attachment using a resolve mode
of [VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](renderpass.html#VkResolveModeFlagBitsKHR), and the
`pNext` chain of [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) does not
include a [VkAttachmentSampleCountInfoAMD](#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](#VkAttachmentSampleCountInfoNV) structure, the value of
[VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)::`rasterizationSamples`
**must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-09375) VUID-vkCmdExecuteCommands-commandBuffer-09375

`commandBuffer` **must** not be a [secondary command    buffer](../appendices/glossary.html#glossary)
unless the [`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)
feature is enabled

* 
[](#VUID-vkCmdExecuteCommands-nestedCommandBuffer-09376) VUID-vkCmdExecuteCommands-nestedCommandBuffer-09376

If the [`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)
feature is enabled, and `commandBuffer` is a [secondary    command buffer](../appendices/glossary.html#glossary), the [command buffer nesting level](../appendices/glossary.html#glossary) of each
element of `pCommandBuffers` **must** be less than
[    `maxCommandBufferNestingLevel`](limits.html#limits-maxCommandBufferNestingLevel)

* 
[](#VUID-vkCmdExecuteCommands-nestedCommandBufferRendering-09377) VUID-vkCmdExecuteCommands-nestedCommandBufferRendering-09377

If the [    `nestedCommandBufferRendering`](features.html#features-nestedCommandBufferRendering) feature is not enabled, and
`commandBuffer` is a [secondary command buffer](../appendices/glossary.html#glossary),
`commandBuffer` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits)

* 
[](#VUID-vkCmdExecuteCommands-nestedCommandBufferSimultaneousUse-09378) VUID-vkCmdExecuteCommands-nestedCommandBufferSimultaneousUse-09378

If the [    `nestedCommandBufferSimultaneousUse`](features.html#features-nestedCommandBufferSimultaneousUse) feature is not enabled, and
`commandBuffer` is a [secondary command buffer](../appendices/glossary.html#glossary), each
element of `pCommandBuffers` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-09504) VUID-vkCmdExecuteCommands-pCommandBuffers-09504

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the color attachment mapping state specified
by [VkRenderingAttachmentLocationInfo](interfaces.html#VkRenderingAttachmentLocationInfo) in the inheritance info of
each element of `pCommandBuffers` and in the current state of
`commandBuffer` **must** match

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-09505) VUID-vkCmdExecuteCommands-pCommandBuffers-09505

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the input attachment mapping state specified
by [VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo) in the inheritance info of
each element of `pCommandBuffers` and in the current state of
`commandBuffer` **must** match

* 
[](#VUID-vkCmdExecuteCommands-memory-10724) VUID-vkCmdExecuteCommands-memory-10724

If this command is called within a render pass instance, the size of
`memory` member of the [VkTileMemoryBindInfoQCOM](memory.html#VkTileMemoryBindInfoQCOM) structure
included in the `pNext` chain of
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
active bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10620) VUID-vkCmdExecuteCommands-pCommandBuffers-10620

If this command is being recorded within a render pass instance with
[tile shading](renderpass.html#renderpass-tile-shading) enabled, all elements of
`pCommandBuffers` **must** have been recorded with
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM) included in
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10621) VUID-vkCmdExecuteCommands-pCommandBuffers-10621

If the [per-tile execution model](renderpass.html#renderpass-per-tile-execution-model)
is enabled, all elements of `pCommandBuffers` **must** have been
recorded with
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM) included
in [VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-vkCmdExecuteCommands-tileApronSize-10622) VUID-vkCmdExecuteCommands-tileApronSize-10622

If this command is being recorded within a render pass instance, the
`tileApronSize` used to create the render pass instance **must** equal
the [VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`tileApronSize`
used to record all elements of `pCommandBuffers`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10623) VUID-vkCmdExecuteCommands-pCommandBuffers-10623

If any element of `pCommandBuffers` was recorded with
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM) included in
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`, this command
**must** be recorded in a render pass that has tile shading enabled

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10624) VUID-vkCmdExecuteCommands-pCommandBuffers-10624

If any element of `pCommandBuffers` was recorded with
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](renderpass.html#VkTileShadingRenderPassFlagBitsQCOM) included
in [VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`flags`,
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) **must**
be enabled

* 
[](#VUID-vkCmdExecuteCommands-tileApronSize-10625) VUID-vkCmdExecuteCommands-tileApronSize-10625

If this command is not being recorded into a render pass instance, the
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`tileApronSize` that
was recorded into all elements of `pCommandBuffers` **must** equal
`(0,0)`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11351) VUID-vkCmdExecuteCommands-commandBuffer-11351

If there is a sampler descriptor heap bound to `commandBuffer`, each
element of `pCommandBuffers` **must** have been recorded with a value
of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
that is either `NULL` or a pointer to a bind info that is identical to
that set via the last call to [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11352) VUID-vkCmdExecuteCommands-commandBuffer-11352

If there is a resource descriptor heap bound to `commandBuffer`,
each element of `pCommandBuffers` **must** have been recorded with a
value of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
that is either `NULL` or a pointer to a bind info that is identical to
that set via the last call to [vkCmdBindResourceHeapEXT](descriptorheaps.html#vkCmdBindResourceHeapEXT)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11473) VUID-vkCmdExecuteCommands-commandBuffer-11473

If there is no sampler descriptor heap bound to `commandBuffer`,
each element of `pCommandBuffers` **must** have been recorded with a
value of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
set to `NULL`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11474) VUID-vkCmdExecuteCommands-commandBuffer-11474

If there is no resource descriptor heap bound to `commandBuffer`,
each element of `pCommandBuffers` **must** have been recorded with a
value of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
set to `NULL`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-12373) VUID-vkCmdExecuteCommands-commandBuffer-12373

`commandBuffer` **must** not have any shader instrumentation
[active](shaders.html#shaders-instrumentation-active)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-parameter) VUID-vkCmdExecuteCommands-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](#VkCommandBuffer) handle

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-parameter) VUID-vkCmdExecuteCommands-pCommandBuffers-parameter

 `pCommandBuffers` **must** be a valid pointer to an array of `commandBufferCount` valid [VkCommandBuffer](#VkCommandBuffer) handles

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-recording) VUID-vkCmdExecuteCommands-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-cmdpool) VUID-vkCmdExecuteCommands-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdExecuteCommands-videocoding) VUID-vkCmdExecuteCommands-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdExecuteCommands-commandBufferCount-arraylength) VUID-vkCmdExecuteCommands-commandBufferCount-arraylength

 `commandBufferCount` **must** be greater than `0`

* 
[](#VUID-vkCmdExecuteCommands-commonparent) VUID-vkCmdExecuteCommands-commonparent

 Both of `commandBuffer`, and the elements of `pCommandBuffers` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Indirection |

Conditional Rendering

vkCmdExecuteCommands is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

In addition to secondary command buffer execution from primary command
buffers, an implementation **may** support [nested command buffers](../appendices/glossary.html#glossary), which enable secondary command buffers to be executed from other
secondary command buffers.
If the [`nestedCommandBuffer`](features.html#features-nestedCommandBuffer) feature
is enabled, the implementation supports [nested command buffers](../appendices/glossary.html#glossary).

Nested command buffer execution works the same as primary-to-secondary
execution, except that it is subject to some additional
implementation-defined limits.

Each secondary command buffer has a [command buffer nesting level](../appendices/glossary.html#glossary), which is determined at [vkEndCommandBuffer](#vkEndCommandBuffer) time and evaluated
at [vkCmdExecuteCommands](#vkCmdExecuteCommands) time.
A secondary command buffer that executes no other secondary command buffers
has a [command buffer nesting level](../appendices/glossary.html#glossary) of zero.
Otherwise, the [command buffer nesting level](../appendices/glossary.html#glossary) of a secondary
command buffer is equal to the maximum nesting level of all secondary
command buffers executed by that command buffer plus one.
Some implementations **may** have a limit on the maximum nesting level of
secondary command buffers that **can** be recorded.
This limit is advertised in [`maxCommandBufferNestingLevel`](limits.html#limits-maxCommandBufferNestingLevel).

If the [`nestedCommandBufferRendering`](features.html#features-nestedCommandBufferRendering) feature is enabled, the implementation
supports calling [vkCmdExecuteCommands](#vkCmdExecuteCommands) inside secondary command buffers
recorded with [VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits).
If the [`nestedCommandBufferSimultaneousUse`](features.html#features-nestedCommandBufferSimultaneousUse) feature is enabled, the
implementation supports calling [vkCmdExecuteCommands](#vkCmdExecuteCommands) with secondary
command buffers recorded with
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](#VkCommandBufferUsageFlagBits).

Whenever [vkCmdExecuteCommands](#vkCmdExecuteCommands) is recorded inside a secondary command
buffer recorded with [VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](#VkCommandBufferUsageFlagBits),
each member of `pCommandBuffers` **must** have been recorded with a
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo) with [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo)
compatible with the [VkCommandBufferInheritanceInfo](#VkCommandBufferInheritanceInfo) of the command
buffer into which the [vkCmdExecuteCommands](#vkCmdExecuteCommands) call is being recorded.
The [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo) structures are compatible
when the `VkCommandBufferInheritanceRenderingInfo`::`renderpass` are
[compatible](renderpass.html#renderpass-compatibility), or if they are
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then the [VkCommandBufferInheritanceRenderingInfo](#VkCommandBufferInheritanceRenderingInfo)
members match, and all other members of
`VkCommandBufferInheritanceRenderingInfo` match.
This requirement applies recursively, down to the most nested command buffer
and up to the command buffer where the render pass was originally begun.

Each command buffer has a piece of state storing the current device mask of
the command buffer.
This mask controls which physical devices within the logical device all
subsequent commands will execute on, including state-setting commands,
action commands, and synchronization commands.

Scissor, exclusive scissor,
and viewport state
(excluding the count of each)
**can** be different values on each physical device (only when set as dynamic
state), and each physical device will render using its local copy of the
state.
Other state is shared between physical devices, such that all physical
devices use the most recently set values for the state.
However, when recording an action command that uses a piece of state, the
most recent command that set that state **must** have included all physical
devices that execute the action command in its current device mask.

The command buffer’s device mask is orthogonal to the
`pCommandBufferDeviceMasks` member of [VkDeviceGroupSubmitInfo](#VkDeviceGroupSubmitInfo).
Commands only execute on a physical device if the device index is set in
both device masks.

If the `pNext` chain of [VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo) includes a
`VkDeviceGroupCommandBufferBeginInfo` structure, then that structure
includes an initial device mask for the command buffer.

The `VkDeviceGroupCommandBufferBeginInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupCommandBufferBeginInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceMask;
} VkDeviceGroupCommandBufferBeginInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkDeviceGroupCommandBufferBeginInfo
typedef VkDeviceGroupCommandBufferBeginInfo VkDeviceGroupCommandBufferBeginInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceMask` is the initial value of the command buffer’s device
mask.

The initial device mask also acts as an upper bound on the set of devices
that **can** ever be in the device mask in the command buffer.

If this structure is not present, the initial value of a command buffer’s
device mask includes all physical devices in the logical device when the
command buffer begins recording.

Valid Usage

* 
[](#VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00106) VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00106

`deviceMask` **must** be a valid device mask value

* 
[](#VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00107) VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00107

`deviceMask` **must** not be zero

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupCommandBufferBeginInfo-sType-sType) VUID-VkDeviceGroupCommandBufferBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferBeginInfo](#VkCommandBufferBeginInfo)

To update the current device mask of a command buffer, call:

// Provided by VK_VERSION_1_1
void vkCmdSetDeviceMask(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    deviceMask);

// Provided by VK_KHR_device_group
// Equivalent to vkCmdSetDeviceMask
void vkCmdSetDeviceMaskKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    deviceMask);

* 
`commandBuffer` is command buffer whose current device mask is
modified.

* 
`deviceMask` is the new value of the current device mask.

`deviceMask` is used to filter out subsequent commands from executing on
all physical devices whose bit indices are not set in the mask, except
commands beginning a render pass instance, commands transitioning to the
next subpass in the render pass instance, and commands ending a render pass
instance, which always execute on the set of physical devices whose bit
indices are included in the `deviceMask` member of the
[VkDeviceGroupRenderPassBeginInfo](renderpass.html#VkDeviceGroupRenderPassBeginInfo) structure passed to the command
beginning the corresponding render pass instance.

Valid Usage

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00108) VUID-vkCmdSetDeviceMask-deviceMask-00108

`deviceMask` **must** be a valid device mask value

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00109) VUID-vkCmdSetDeviceMask-deviceMask-00109

`deviceMask` **must** not be zero

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00110) VUID-vkCmdSetDeviceMask-deviceMask-00110

`deviceMask` **must** not include any set bits that were not in the
[VkDeviceGroupCommandBufferBeginInfo](#VkDeviceGroupCommandBufferBeginInfo)::`deviceMask` value when
the command buffer began recording

* 
[](#VUID-vkCmdSetDeviceMask-deviceMask-00111) VUID-vkCmdSetDeviceMask-deviceMask-00111

If `vkCmdSetDeviceMask` is called inside a render pass instance,
`deviceMask` **must** not include any set bits that were not in the
[VkDeviceGroupRenderPassBeginInfo](renderpass.html#VkDeviceGroupRenderPassBeginInfo)::`deviceMask` value when the
render pass instance began recording

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDeviceMask-commandBuffer-parameter) VUID-vkCmdSetDeviceMask-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDeviceMask-commandBuffer-recording) VUID-vkCmdSetDeviceMask-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDeviceMask-commandBuffer-cmdpool) VUID-vkCmdSetDeviceMask-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | State |

Conditional Rendering

vkCmdSetDeviceMask is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)
