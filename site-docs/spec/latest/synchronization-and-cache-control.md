# Synchronization and Cache Control

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/synchronization.html

## Table of Contents

- [Execution and Memory Dependencies](#synchronization-dependencies)
- [Execution_and_Memory_Dependencies](#synchronization-dependencies)
- [Image Layout Transitions](#synchronization-image-layout-transitions)
- [Image_Layout_Transitions](#synchronization-image-layout-transitions)
- [Pipeline Stages](#synchronization-pipeline-stages)
- [Access Types](#synchronization-access-types)
- [Framebuffer Region Dependencies](#synchronization-framebuffer-regions)
- [Framebuffer_Region_Dependencies](#synchronization-framebuffer-regions)
- [Device-Local Dependencies](#synchronization-device-local-dependencies)
- [Implicit Synchronization Guarantees](#synchronization-implicit)
- [Implicit_Synchronization_Guarantees](#synchronization-implicit)
- [Fences](#synchronization-fences)
- [Alternate Methods to Signal Fences](#_alternate_methods_to_signal_fences)
- [Alternate_Methods_to_Signal_Fences](#_alternate_methods_to_signal_fences)
- [Importing Fence Payloads](#synchronization-fences-importing)
- [Importing_Fence_Payloads](#synchronization-fences-importing)
- [Semaphores](#synchronization-semaphores)
- [Semaphore Signaling](#synchronization-semaphores-signaling)
- [Semaphore Waiting](#synchronization-semaphores-waiting)
- [Semaphore State Requirements for Wait Operations](#synchronization-semaphores-waiting-state)
- [Semaphore_State_Requirements_for_Wait_Operations](#synchronization-semaphores-waiting-state)
- [Host Operations on Semaphores](#synchronization-semaphores-hostops)
- [Host_Operations_on_Semaphores](#synchronization-semaphores-hostops)
- [Importing Semaphore Payloads](#synchronization-semaphores-importing)
- [Importing_Semaphore_Payloads](#synchronization-semaphores-importing)
- [Events](#synchronization-events)
- [Pipeline Barriers](#synchronization-pipeline-barriers)
- [Memory Barriers](#synchronization-memory-barriers)
- [Global Memory Barriers](#synchronization-global-memory-barriers)
- [Global_Memory_Barriers](#synchronization-global-memory-barriers)
- [Memory Range Barriers](#synchronization-memory-range-barriers)
- [Memory_Range_Barriers](#synchronization-memory-range-barriers)
- [Buffer Memory Barriers](#synchronization-buffer-memory-barriers)
- [Buffer_Memory_Barriers](#synchronization-buffer-memory-barriers)
- [Image Memory Barriers](#synchronization-image-memory-barriers)
- [Image_Memory_Barriers](#synchronization-image-memory-barriers)
- [Tensor Memory Barriers](#synchronization-tensor-memory-barriers)
- [Tensor_Memory_Barriers](#synchronization-tensor-memory-barriers)
- [Queue Family Ownership Transfer](#synchronization-queue-transfers)
- [Queue_Family_Ownership_Transfer](#synchronization-queue-transfers)
- [Wait Idle Operations](#synchronization-wait-idle)
- [Wait_Idle_Operations](#synchronization-wait-idle)
- [Host Write Ordering Guarantees](#synchronization-submission-host-writes)
- [Host_Write_Ordering_Guarantees](#synchronization-submission-host-writes)
- [Synchronization and Multiple Physical Devices](#synchronization-device-group)
- [Synchronization_and_Multiple_Physical_Devices](#synchronization-device-group)
- [Calibrated Timestamps](#calibrated-timestamps)

## Content

Synchronization of access to resources is primarily the responsibility of
the application in Vulkan.
The order of execution of commands with respect to the host and other
commands on the device has few implicit guarantees, and needs to be
explicitly specified.
Memory caches and other optimizations are also explicitly managed, requiring
that the flow of data through the system is largely under application
control.

Whilst some implicit guarantees exist between commands, five explicit
synchronization mechanisms are exposed by Vulkan:

[Fences](#synchronization-fences)

Fences **can** be used to communicate to the host that execution of some
task on the device has completed, controlling resource access between
host and device.

[Semaphores](#synchronization-semaphores)

Semaphores **can** be used to control resource access across multiple
queues.

[Events](#synchronization-events)

Events provide a fine-grained synchronization primitive which **can** be
signaled either within a command buffer or by the host, and **can** be
waited upon within a command buffer or queried on the host.
Events **can** be used to control resource access within a single queue.

[Pipeline Barriers](#synchronization-pipeline-barriers)

Pipeline barriers also provide synchronization control within a command
buffer, but at a single point, rather than with separate signal and wait
operations.
Pipeline barriers **can** be used to control resource access within a
single queue.

[Render Pass Objects](renderpass.html#renderpass-objects)

Render pass objects provide a synchronization framework for rendering
tasks, built upon the concepts in this chapter.
Many cases that would otherwise need an application to use other
synchronization primitives **can** be expressed more efficiently as part of
a render pass.
Render pass objects **can** be used to control resource access within a
single queue.

An *operation* is an arbitrary amount of work to be executed on the host, a
device, or an external entity such as a presentation engine.
Synchronization commands introduce explicit *execution dependencies*, and
*memory dependencies* between two sets of operations defined by the
command’s two *synchronization scopes*.

The synchronization scopes define which other operations a synchronization
command is able to create execution dependencies with.
Any type of operation that is not in a synchronization command’s
synchronization scopes will not be included in the resulting dependency.
For example, for many synchronization commands, the synchronization scopes
**can** be limited to just operations executing in specific
[pipeline stages](#synchronization-pipeline-stages), which allows other
pipeline stages to be excluded from a dependency.
Other scoping options are possible, depending on the particular command.

An *execution dependency* is a guarantee that for two sets of operations,
the first set **must** *happen-before* the second set.
If an operation happens-before another operation, then the first operation
**must** complete before the second operation is initiated.
More precisely:

* 
Let **Ops1** and **Ops2** be separate sets of operations.

* 
Let **Sync** be a synchronization command.

* 
Let **Scope1st** and **Scope2nd** be the synchronization scopes of
**Sync**.

* 
Let **ScopedOps1** be the intersection of sets **Ops1** and
**Scope1st**.

* 
Let **ScopedOps2** be the intersection of sets **Ops2** and
**Scope2nd**.

* 
Submitting **Ops1**, **Sync** and **Ops2** for execution, in that order,
will result in execution dependency **ExeDep** between **ScopedOps1** and
**ScopedOps2**.

* 
Execution dependency **ExeDep** guarantees that **ScopedOps1**
happen-before **ScopedOps2**.

An *execution dependency chain* is a sequence of execution dependencies that
form a happens-before relation between the first dependency’s **ScopedOps1**
and the final dependency’s **ScopedOps2**.
For each consecutive pair of execution dependencies, a chain exists if the
intersection of **Scope2nd** in the first dependency and **Scope1st** in the
second dependency is not an empty set.
The formation of a single execution dependency from an execution dependency
chain can be described by substituting the following in the description of
execution dependencies:

* 
Let **Sync** be a set of synchronization commands that generate an
execution dependency chain.

* 
Let **Scope1st** be the first synchronization scope of the first command
in **Sync**.

* 
Let **Scope2nd** be the second synchronization scope of the last command
in **Sync**.

Execution dependencies alone are not sufficient to guarantee that values
resulting from writes in one set of operations **can** be read from another set
of operations.

Three additional types of operations are used to control memory access.
*Availability operations* cause the values generated by specified memory
write accesses to become *available* to a memory domain for future access.
Any available value remains available until a subsequent write to the same
memory location occurs (whether it is made available or not) or the memory
is freed.
*Memory domain operations* cause writes that are available to a source
memory domain to become available to a destination memory domain (an example
of this is making writes available to the host domain available to the
device domain).
*Visibility operations* cause values available to a memory domain to become
*visible* to specified memory accesses.

Availability, visibility, memory domains, and memory domain operations are
formally defined in the [Availability and Visibility](../appendices/memorymodel.html#memory-model-availability-visibility) section of the [Memory Model](../appendices/memorymodel.html#memory-model) chapter.
Which API operations perform each of these operations is defined in
[Availability, Visibility, and Domain Operations](../appendices/memorymodel.html#memory-model-vulkan-availability-visibility).

A *memory dependency* is an execution dependency which includes availability
and visibility operations such that:

* 
The first set of operations happens-before the availability operation.

* 
The availability operation happens-before the visibility operation.

* 
The visibility operation happens-before the second set of operations.

Once written values are made visible to a particular type of memory access,
they **can** be read or written by that type of memory access.
Most synchronization commands in Vulkan define a memory dependency.

The specific memory accesses that are made available and visible are defined
by the *access scopes* of a memory dependency.
Any type of access that is in a memory dependency’s first access scope and
occurs in **ScopedOps1** is made available.
Any type of access that is in a memory dependency’s second access scope and
occurs in **ScopedOps2** has any available writes made visible to it.
Any type of operation that is not in a synchronization command’s access
scopes will not be included in the resulting dependency.

A memory dependency enforces availability and visibility of memory accesses
and execution order between two sets of operations.
Adding to the description of [execution dependency chains](#synchronization-dependencies-chains):

* 
Let **MemOps1** be the set of memory accesses performed by
**ScopedOps1**.

* 
Let **MemOps2** be the set of memory accesses performed by
**ScopedOps2**.

* 
Let **AccessScope1st** be the first access scope of the first command in
the **Sync** chain.

* 
Let **AccessScope2nd** be the second access scope of the last command in
the **Sync** chain.

* 
Let **ScopedMemOps1** be the intersection of sets **MemOps1** and
**AccessScope1st**.

* 
Let **ScopedMemOps2** be the intersection of sets **MemOps2** and
**AccessScope2nd**.

* 
Submitting **Ops1**, **Sync**, and **Ops2** for execution, in that order,
will result in a memory dependency **MemDep** between **ScopedOps1** and
**ScopedOps2**.

* 
Memory dependency **MemDep** guarantees that:

Memory writes in **ScopedMemOps1** are made available.

* 
Available memory writes, including those from **ScopedMemOps1**, are
made visible to **ScopedMemOps2**.

|  | Execution and memory dependencies are used to solve data hazards, i.e. to
| --- | --- |
ensure that read and write operations occur in a well-defined order.
Write-after-read hazards can be solved with just an execution dependency,
but read-after-write and write-after-write hazards need appropriate memory
dependencies to be included between them.
If an application does not include dependencies to solve these hazards, it
results in a [data race](../appendices/memorymodel.html#memory-model-access-data-race). |

Image subresources **can** be transitioned from one [layout](resources.html#resources-image-layouts) to another as part of a [memory dependency](#synchronization-dependencies-memory) (e.g. by using an
[image memory barrier](#synchronization-image-memory-barriers)).
When a layout transition is specified in a memory dependency, it
happens-after the availability operations in the memory dependency, and
happens-before the visibility operations.
Image layout transitions **may** perform read and write accesses on all memory
bound to the image subresource range, so applications **must** ensure that all
memory writes have been made
[available](#synchronization-dependencies-available-and-visible) before a
layout transition is executed.
Available memory is automatically made visible to a layout transition, and
writes performed by a layout transition are automatically made available.

Layout transitions always apply to a particular image subresource range, and
specify both an old layout and new layout.
The old layout **must** either be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), or match the
current layout of the image subresource range.
If the old layout matches the current layout of the image subresource range,
the transition preserves the contents of that range.
If the old layout is [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), the contents of that
range **may** be discarded.

|  | Image layout transitions with [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) allow the
| --- | --- |
implementation to discard the image subresource range, which can provide
performance or power benefits.
Tile-based architectures may be able to avoid flushing tile data to memory,
and immediate style renderers may be able to achieve fast metadata clears to
reinitialize frame buffer compression state, or similar.

If the contents of an attachment are not needed after a render pass
completes, then applications **should** use
[VK_ATTACHMENT_STORE_OP_DONT_CARE](renderpass.html#VkAttachmentStoreOp). |

As image layout transitions **may** perform read and write accesses on the
memory bound to the image, if the image subresource affected by the layout
transition is bound to peer memory for any device in the current device mask
then the memory heap the bound memory comes from **must** support the
[VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT](memory.html#VkPeerMemoryFeatureFlagBitsKHR) and
[VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT](memory.html#VkPeerMemoryFeatureFlagBitsKHR) capabilities as returned by
[vkGetDeviceGroupPeerMemoryFeatures](memory.html#vkGetDeviceGroupPeerMemoryFeatures).

|  | Applications **must** ensure that layout transitions happen-after all
| --- | --- |
operations accessing the image with the old layout, and happen-before any
operations that will access the image with the new layout.
Layout transitions are potentially read/write operations, so not defining
appropriate memory dependencies to guarantee this will result in a data
race. |

Image layout transitions interact with [memory aliasing](resources.html#resources-memory-aliasing).

Layout transitions that are performed via image memory barriers execute in
their entirety in [submission order](#synchronization-submission-order),
relative to other image layout transitions submitted to the same queue,
including those performed by [render passes](renderpass.html#renderpass).
This ordering of image layout transitions only applies if the implementation
performs actual read/write operations during the transition.
An application **must** not rely on ordering of image layout transitions to
influence ordering of other commands.

The image layout of each image subresource of a depth/stencil image created
with [VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits) is
dependent on the last sample locations used to render to the image
subresource as a depth/stencil attachment, thus when the `image` member
of an [image memory barrier](#synchronization-image-memory-barriers) is an
image created with this flag the application **can** chain a
[VkSampleLocationsInfoEXT](primsrast.html#VkSampleLocationsInfoEXT) structure to the `pNext` chain of
[VkImageMemoryBarrier2](#VkImageMemoryBarrier2) or
[VkImageMemoryBarrier](#VkImageMemoryBarrier) to specify the sample locations to use during any
image layout transition.

If the `VkSampleLocationsInfoEXT` structure does not match the sample
location state last used to render to the image subresource range specified
by `subresourceRange`, or if no `VkSampleLocationsInfoEXT` structure
is present, then the contents of the given image subresource range becomes
**undefined** as if `oldLayout` would equal
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout).

The work performed by an [action command](fundamentals.html#fundamentals-queueoperation-command-types) consists of multiple operations, which are performed as a sequence
of logically independent steps known as *pipeline stages*.
The exact pipeline stages executed depend on the particular command that is
used, and current command buffer state when the command was recorded.

|  | Operations performed by synchronization commands (e.g.
| --- | --- |
[availability and visibility operations](#synchronization-dependencies-available-and-visible)) are not executed by a defined pipeline stage.
However other commands can still synchronize with them by using the
[synchronization scopes](#synchronization-dependencies-scopes) to create a
[dependency chain](#synchronization-dependencies-chains). |

Execution of operations across pipeline stages **must** adhere to
[implicit ordering guarantees](#synchronization-implicit), particularly
including [pipeline stage order](#synchronization-pipeline-stages-order).
Otherwise, execution across pipeline stages **may** overlap or execute out of
order with regards to other stages, unless otherwise enforced by an
execution dependency.

Several of the synchronization commands include pipeline stage parameters,
restricting the [synchronization scopes](#synchronization-dependencies-scopes) for that command to just those stages.
This allows fine grained control over the exact execution dependencies and
accesses performed by action commands.
Implementations **should** use these pipeline stages to avoid unnecessary
stalls or cache flushing.

Bits which **can** be set in a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask, specifying
stages of execution, are:

// Provided by VK_VERSION_1_3
// Flag bits for VkPipelineStageFlagBits2
typedef VkFlags64 VkPipelineStageFlagBits2;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_NONE = 0ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT = 0x00000001ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT = 0x00000002ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT = 0x00000004ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT = 0x00000008ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT = 0x00000010ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT = 0x00000020ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT = 0x00000040ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT = 0x00000080ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT = 0x00000100ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT = 0x00000200ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT = 0x00000400ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT = 0x00000800ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT = 0x00001000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TRANSFER_BIT = 0x00001000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT = 0x00002000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_HOST_BIT = 0x00004000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT = 0x00008000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT = 0x00010000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COPY_BIT = 0x100000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RESOLVE_BIT = 0x200000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BLIT_BIT = 0x400000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CLEAR_BIT = 0x800000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT = 0x1000000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT = 0x2000000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT = 0x4000000000ULL;
// Provided by VK_KHR_video_decode_queue
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR = 0x04000000ULL;
// Provided by VK_KHR_video_encode_queue
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR = 0x08000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_NONE_KHR = 0ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT_KHR = 0x00000020ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT_KHR = 0x00000200ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT_KHR = 0x00000800ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TRANSFER_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_HOST_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COPY_BIT_KHR = 0x100000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RESOLVE_BIT_KHR = 0x200000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BLIT_BIT_KHR = 0x400000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CLEAR_BIT_KHR = 0x800000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT_KHR = 0x1000000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT_KHR = 0x2000000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT_KHR = 0x4000000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_transform_feedback
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT = 0x01000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_conditional_rendering
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT = 0x00040000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_device_generated_commands
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV = 0x00020000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_device_generated_commands
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT = 0x00020000ULL;
// Provided by VK_KHR_fragment_shading_rate with VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00400000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_shading_rate_image
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV = 0x00400000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR = 0x02000000ULL;
// Provided by VK_KHR_ray_tracing_pipeline with VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR = 0x00200000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_ray_tracing
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_NV = 0x00200000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_ray_tracing
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_NV = 0x02000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_fragment_density_map
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT = 0x00800000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_NV = 0x00080000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_NV = 0x00100000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT = 0x00080000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT = 0x00100000ULL;
// Provided by VK_HUAWEI_subpass_shading
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI = 0x8000000000ULL;
// Provided by VK_HUAWEI_subpass_shading
// VK_PIPELINE_STAGE_2_SUBPASS_SHADING_BIT_HUAWEI is a legacy alias
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_SUBPASS_SHADING_BIT_HUAWEI = 0x8000000000ULL;
// Provided by VK_HUAWEI_invocation_mask
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI = 0x10000000000ULL;
// Provided by VK_KHR_ray_tracing_maintenance1 with VK_KHR_synchronization2 or VK_VERSION_1_3
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR = 0x10000000ULL;
// Provided by VK_EXT_opacity_micromap
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT = 0x40000000ULL;
// Provided by VK_HUAWEI_cluster_culling_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI = 0x20000000000ULL;
// Provided by VK_NV_optical_flow
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV = 0x20000000ULL;
// Provided by VK_NV_cooperative_vector
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV = 0x100000000000ULL;
// Provided by VK_ARM_data_graph
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM = 0x40000000000ULL;
// Provided by VK_KHR_copy_memory_indirect
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR = 0x400000000000ULL;
// Provided by VK_EXT_memory_decompression
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT = 0x200000000000ULL;

// Provided by VK_KHR_synchronization2
// Equivalent to VkPipelineStageFlagBits2
typedef VkPipelineStageFlagBits2 VkPipelineStageFlagBits2KHR;

* 
[VK_PIPELINE_STAGE_2_NONE](#VkPipelineStageFlagBits2KHR) specifies no stages of execution.

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR) specifies the stage of the
pipeline where indirect command parameters are consumed.
This stage also includes reading commands written by
[vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV).
This stage also includes reading commands written by
[vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT).

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the task shader
stage.

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the mesh shader
stage.

* 
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR) specifies the stage of the
pipeline where index buffers are consumed.

* 
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR) specifies the stage
of the pipeline where vertex buffers are consumed.

* 
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR) is equivalent to the logical
OR of:

[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR)

[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR) specifies the vertex shader
stage.

[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) specifies the
tessellation control shader stage.

[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR) specifies
the tessellation evaluation shader stage.

[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR) specifies the geometry
shader stage.

[VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT](#VkPipelineStageFlagBits2KHR) is equivalent to
specifying all supported
[pre-rasterization shader    stages](pipelines.html#pipelines-graphics-subsets-pre-rasterization):

* 
[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) specifies the fragment
shader stage.

[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) specifies the stage
of the pipeline where early fragment tests (depth and stencil tests
before fragment shading) are performed.
This stage also includes [render pass load    operations](renderpass.html#renderpass-load-operations) for framebuffer attachments with a depth/stencil format.

[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) specifies the stage of
the pipeline where late fragment tests (depth and stencil tests after
fragment shading) are performed.
This stage also includes [render pass    store operations](renderpass.html#renderpass-store-operations) for framebuffer attachments with a depth/stencil
format.

[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) specifies the
stage of the pipeline where final color values are output from the
pipeline.
This stage includes [blending](framebuffer.html#framebuffer-blending),
[logic operations](framebuffer.html#framebuffer-logicop), render pass
[load](renderpass.html#renderpass-load-operations) and [    store](renderpass.html#renderpass-store-operations) operations for color attachments,
[render pass multisample resolve    operations](renderpass.html#renderpass-resolve-operations), and [vkCmdClearAttachments](clears.html#vkCmdClearAttachments).

[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR) specifies the compute
shader stage.

[VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR) specifies a pseudo-stage indicating
execution on the host of reads/writes of device memory.
This stage is not invoked by any commands recorded in a command buffer.

[VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR) specifies the execution of all
[copy commands](copies.html#copies), including [vkCmdCopyQueryPoolResults](queries.html#vkCmdCopyQueryPoolResults).

[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR) specifies the execution of
[vkCmdBlitImage](copies.html#vkCmdBlitImage).

[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR) specifies the execution of
[vkCmdResolveImage](copies.html#vkCmdResolveImage).

[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR) specifies the execution of
[clear commands](clears.html#clears), with the exception of
[vkCmdClearAttachments](clears.html#vkCmdClearAttachments).

[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR) is equivalent to specifying
all of:

* 
[VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR) specifies the
execution of the ray tracing shader stages.

[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) specifies
the execution of [acceleration structure    commands](accelstructures.html#acceleration-structure) or [acceleration structure    copy commands](accelstructures.html#acceleration-structure-copying).

[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR) specifies
the execution of [acceleration    structure copy commands](accelstructures.html#acceleration-structure-copying).

[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR) specifies the execution of
all graphics pipeline stages, and is equivalent to the logical OR of:

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) specifies all operations
performed by all commands supported on the queue it is used with.

[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the
stage of the pipeline where the predicate of conditional rendering is
consumed.

[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the stage
of the pipeline where vertex attribute output values are written to the
transform feedback buffers.

[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) specifies the stage
of the pipeline where device-side generation of commands via
[vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV) is handled.

[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the stage
of the pipeline where device-side generation of commands via
[vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT) is handled.

[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)
    specifies the stage of the pipeline where the
    [fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](primsrast.html#primsrast-shading-rate-image)
    is read to determine the fragment shading rate for portions of a
    rasterized primitive.

[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the
stage of the pipeline where the fragment density map is read to
[generate the fragment areas](fragmentdensitymapops.html#fragmentdensitymapops).

[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) specifies the stage
of the pipeline where the invocation mask image is read by the
implementation to optimize the ray dispatch.

[VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) specifies the execution
of [video decode operations](videocoding.html#video-decode-operations).

[VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) specifies the execution
of [video encode operations](videocoding.html#video-encode-operations).

[VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR) specifies the stage of the
pipeline where [optical flow operation](VK_NV_optical_flow/optical_flow.html#opticalflow-operations) are
performed.

[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) specifies the
subpass shading shader stage.

[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the execution
of [micromap commands](VK_EXT_opacity_micromap/micromaps.html#micromap).

[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) specifies
the cluster culling shader stage.

[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR)
specifies the execution of [vkCmdConvertCooperativeVectorMatrixNV](shaders.html#vkCmdConvertCooperativeVectorMatrixNV).

[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR) specifies the stage of
the pipeline where indirect copy commands (vkCmdCopyMemoryIndirect* and
vkCmdCopyMemoryToImageIndirect*) parameters are consumed.

[VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT](#VkPipelineStageFlagBits2KHR) is equivalent to
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) with [VkAccessFlags2](#VkAccessFlags2) set
to `0` when specified in the second synchronization scope, but
equivalent to [VK_PIPELINE_STAGE_2_NONE](#VkPipelineStageFlagBits2KHR) in the first scope.

[VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT](#VkPipelineStageFlagBits2KHR) is equivalent to
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) with [VkAccessFlags2](#VkAccessFlags2) set
to `0` when specified in the first synchronization scope, but equivalent
to [VK_PIPELINE_STAGE_2_NONE](#VkPipelineStageFlagBits2KHR) in the second scope.

|  | The `TOP` and `BOTTOM` pipeline stages are legacy, and applications
| --- | --- |
should prefer [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) and
[VK_PIPELINE_STAGE_2_NONE](#VkPipelineStageFlagBits2KHR). |

|  | The `VkPipelineStageFlags2` bitmask goes beyond the 31 individual bit
| --- | --- |
flags allowable within a C99 enum, which is how
[VkPipelineStageFlagBits](#VkPipelineStageFlagBits) is defined.
The first 31 values are common to both, and are interchangeable. |

`VkPipelineStageFlags2` is a bitmask type for setting a mask of zero or
more [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) flags:

// Provided by VK_VERSION_1_3
typedef VkFlags64 VkPipelineStageFlags2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkPipelineStageFlags2
typedef VkPipelineStageFlags2 VkPipelineStageFlags2KHR;

Bits which **can** be set in a [VkPipelineStageFlags](#VkPipelineStageFlags) mask, specifying
stages of execution, are:

|  | This functionality is superseded by [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkPipelineStageFlagBits {
    VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT = 0x00000001,
    VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT = 0x00000002,
    VK_PIPELINE_STAGE_VERTEX_INPUT_BIT = 0x00000004,
    VK_PIPELINE_STAGE_VERTEX_SHADER_BIT = 0x00000008,
    VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT = 0x00000010,
    VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT = 0x00000020,
    VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT = 0x00000040,
    VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT = 0x00000080,
    VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT = 0x00000100,
    VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT = 0x00000200,
    VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT = 0x00000400,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT = 0x00000800,
    VK_PIPELINE_STAGE_TRANSFER_BIT = 0x00001000,
    VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT = 0x00002000,
    VK_PIPELINE_STAGE_HOST_BIT = 0x00004000,
    VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT = 0x00008000,
    VK_PIPELINE_STAGE_ALL_COMMANDS_BIT = 0x00010000,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_STAGE_NONE = 0,
  // Provided by VK_EXT_transform_feedback
    VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT = 0x01000000,
  // Provided by VK_EXT_conditional_rendering
    VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT = 0x00040000,
  // Provided by VK_KHR_acceleration_structure
    VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR = 0x02000000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR = 0x00200000,
  // Provided by VK_EXT_fragment_density_map
    VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT = 0x00800000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00400000,
  // Provided by VK_EXT_mesh_shader
    VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT = 0x00080000,
  // Provided by VK_EXT_mesh_shader
    VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT = 0x00100000,
  // Provided by VK_EXT_device_generated_commands
    VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT = 0x00020000,
  // Provided by VK_NV_shading_rate_image
    VK_PIPELINE_STAGE_SHADING_RATE_IMAGE_BIT_NV = VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_NV = VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_NV = VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR,
  // Provided by VK_NV_mesh_shader
    VK_PIPELINE_STAGE_TASK_SHADER_BIT_NV = VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT,
  // Provided by VK_NV_mesh_shader
    VK_PIPELINE_STAGE_MESH_SHADER_BIT_NV = VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT,
  // Provided by VK_NV_device_generated_commands
    VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV = VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT,
  // Provided by VK_KHR_synchronization2
    VK_PIPELINE_STAGE_NONE_KHR = VK_PIPELINE_STAGE_NONE,
} VkPipelineStageFlagBits;

These values all have the same meaning as the equivalently named values for
[VkPipelineStageFlags2](#VkPipelineStageFlags2).

* 
[VK_PIPELINE_STAGE_NONE](#VkPipelineStageFlagBits) specifies no stages of execution.

* 
[VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits) specifies the stage of the
pipeline where `VkDrawIndirect*` / `VkDispatchIndirect*` /
`VkTraceRaysIndirect*` data structures are consumed.
This stage also includes reading commands written by
[vkCmdExecuteGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsNV).
This stage also includes reading commands written by
[vkCmdExecuteGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsEXT).

* 
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits) specifies the task shader
stage.

* 
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits) specifies the mesh shader
stage.

* 
[VK_PIPELINE_STAGE_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits) specifies the stage of the
pipeline where vertex and index buffers are consumed.

* 
[VK_PIPELINE_STAGE_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits) specifies the vertex shader
stage.

* 
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) specifies the
tessellation control shader stage.

* 
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits) specifies the
tessellation evaluation shader stage.

* 
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits) specifies the geometry
shader stage.

* 
[VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits) specifies the fragment
shader stage.

* 
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits) specifies the stage of
the pipeline where early fragment tests (depth and stencil tests before
fragment shading) are performed.
This stage also includes [render pass load    operations](renderpass.html#renderpass-load-operations) for framebuffer attachments with a depth/stencil format.

* 
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits) specifies the stage of
the pipeline where late fragment tests (depth and stencil tests after
fragment shading) are performed.
This stage also includes [render pass    store operations](renderpass.html#renderpass-store-operations) for framebuffer attachments with a depth/stencil
format.

* 
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits) specifies the stage
of the pipeline after blending where the final color values are output
from the pipeline.
This stage includes [blending](framebuffer.html#framebuffer-blending),
[logic operations](framebuffer.html#framebuffer-logicop), render pass
[load](renderpass.html#renderpass-load-operations) and [    store](renderpass.html#renderpass-store-operations) operations for color attachments,
[render pass multisample resolve    operations](renderpass.html#renderpass-resolve-operations), and [vkCmdClearAttachments](clears.html#vkCmdClearAttachments).

* 
[VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits) specifies the execution of a
compute shader.

* 

[VK_PIPELINE_STAGE_TRANSFER_BIT](#VkPipelineStageFlagBits) specifies the following commands:

All [copy commands](copies.html#copies), including [vkCmdCopyQueryPoolResults](queries.html#vkCmdCopyQueryPoolResults)

* 
[vkCmdBlitImage2](copies.html#vkCmdBlitImage2) and [vkCmdBlitImage](copies.html#vkCmdBlitImage)

* 
[vkCmdResolveImage2](copies.html#vkCmdResolveImage2) and [vkCmdResolveImage](copies.html#vkCmdResolveImage)

* 
All [clear commands](clears.html#clears), with the exception of
[vkCmdClearAttachments](clears.html#vkCmdClearAttachments)

[VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits) specifies a pseudo-stage indicating
execution on the host of reads/writes of device memory.
This stage is not invoked by any commands recorded in a command buffer.

[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits) specifies
    the execution of
    [vkCmdBuildAccelerationStructureNV](accelstructures.html#vkCmdBuildAccelerationStructureNV),
    [vkCmdCopyAccelerationStructureNV](accelstructures.html#vkCmdCopyAccelerationStructureNV),
    [vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV)
,
    [vkCmdBuildAccelerationStructuresKHR](accelstructures.html#vkCmdBuildAccelerationStructuresKHR),
    [vkCmdBuildAccelerationStructuresIndirectKHR](accelstructures.html#vkCmdBuildAccelerationStructuresIndirectKHR),
    [vkCmdCopyAccelerationStructureKHR](accelstructures.html#vkCmdCopyAccelerationStructureKHR),
    [vkCmdCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCmdCopyAccelerationStructureToMemoryKHR),
    [vkCmdCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCmdCopyMemoryToAccelerationStructureKHR), and
    [vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR).

[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits) specifies the
    execution of the ray tracing shader stages, via
[vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV)
,
[vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR), or [vkCmdTraceRaysIndirectKHR](raytracing.html#vkCmdTraceRaysIndirectKHR)

[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR) specifies the
execution of decompression commands with [vkCmdDecompressMemoryEXT](memory_decompression.html#vkCmdDecompressMemoryEXT)
and [vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT).

[VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits) specifies the execution of all
graphics pipeline stages, and is equivalent to the logical OR of:

* 
[VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits) specifies all operations
performed by all commands supported on the queue it is used with.

[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits) specifies the
stage of the pipeline where the predicate of conditional rendering is
consumed.

[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits) specifies the stage
of the pipeline where vertex attribute output values are written to the
transform feedback buffers.

[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits) specifies the stage of
the pipeline where device-side preprocessing for generated commands via
[vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV) is handled.

[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits) specifies the stage
of the pipeline where device-side preprocessing for generated commands
via [vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT) is handled.

[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)
    specifies the stage of the pipeline where the
    [fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](primsrast.html#primsrast-shading-rate-image)
    is read to determine the fragment shading rate for portions of a
    rasterized primitive.

[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits) specifies the
stage of the pipeline where the fragment density map is read to
[generate the fragment areas](fragmentdensitymapops.html#fragmentdensitymapops).

[VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT](#VkPipelineStageFlagBits) is equivalent to
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits) with [VkAccessFlags](#VkAccessFlags) set to
`0` when specified in the second synchronization scope, but specifies no
stage of execution when specified in the first scope.

[VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT](#VkPipelineStageFlagBits) is equivalent to
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits) with [VkAccessFlags](#VkAccessFlags) set to
`0` when specified in the first synchronization scope, but specifies no
stage of execution when specified in the second scope.

|  | This functionality is superseded by [VkPipelineStageFlags2](#VkPipelineStageFlags2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineStageFlags;

`VkPipelineStageFlags` is a bitmask type for setting a mask of zero or
more [VkPipelineStageFlagBits](#VkPipelineStageFlagBits).

If a synchronization command includes a source stage mask, its first
[synchronization scope](#synchronization-dependencies-scopes) only includes
execution of the pipeline stages specified in that mask and any
[logically earlier](#synchronization-pipeline-stages-order) stages.
Its first [access scope](#synchronization-dependencies-access-scopes) only
includes memory accesses performed by pipeline stages explicitly specified
in the source stage mask.

If a synchronization command includes a destination stage mask, its second
[synchronization scope](#synchronization-dependencies-scopes) only includes
execution of the pipeline stages specified in that mask and any
[logically later](#synchronization-pipeline-stages-order) stages.
Its second [access scope](#synchronization-dependencies-access-scopes) only
includes memory accesses performed by pipeline stages explicitly specified
in the destination stage mask.

|  | Note that [access scopes](#synchronization-dependencies-access-scopes) do
| --- | --- |
not interact with the logically earlier or later stages for either scope -
only the stages the application specifies are considered part of each access
scope. |

Certain pipeline stages are only available on queues that support a
particular set of operations.
The following table lists, for each pipeline stage flag, which queue
capability flag **must** be supported by the queue.
When multiple flags are enumerated in the second column of the table, it
means that the pipeline stage is supported on the queue if it supports any
of the listed capability flags.
For further details on queue capabilities see
[Physical Device Enumeration](devsandqueues.html#devsandqueues-physical-device-enumeration)
and [Queues](devsandqueues.html#devsandqueues-queues).

| Pipeline stage flag | Required queue capability flag |
| --- | --- |
| [VK_PIPELINE_STAGE_2_NONE](#VkPipelineStageFlagBits2KHR) | None required |
| [VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT](#VkPipelineStageFlagBits2KHR) | None required |
| [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT](#VkPipelineStageFlagBits2KHR) | None required |
| [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR) | None required |
| [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) | None required |
| [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) |
| [VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](#VkPipelineStageFlagBits2KHR) | [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits) |

Pipeline stages that execute as a result of a command logically complete
execution in a specific order, such that completion of a logically later
pipeline stage **must** not happen-before completion of a logically earlier
stage.
This means that including any stage in the source stage mask for a
particular synchronization command also implies that any logically earlier
stages are included in **Scope1st** for that command.

Similarly, initiation of a logically earlier pipeline stage **must** not
happen-after initiation of a logically later pipeline stage.
Including any given stage in the destination stage mask for a particular
synchronization command also implies that any logically later stages are
included in **Scope2nd** for that command.

|  | Implementations **may** not support synchronization at every pipeline stage for
| --- | --- |
every synchronization operation.
If a pipeline stage that an implementation does not support synchronization
for appears in a source stage mask, it **may** substitute any logically later
stage in its place for the first synchronization scope.
If a pipeline stage that an implementation does not support synchronization
for appears in a destination stage mask, it **may** substitute any logically
earlier stage in its place for the second synchronization scope.

For example, if an implementation is unable to signal an event immediately
after vertex shader execution is complete, it **may** instead signal the event
after color attachment output has completed.

If an implementation makes such a substitution, it **must** not affect the
semantics of execution or memory dependencies or image and buffer memory
barriers. |

[Graphics pipelines](pipelines.html#pipelines-graphics) are executable on queues
supporting [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits).
Stages executed by graphics pipelines **can** only be specified in commands
recorded for queues supporting [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits).

The graphics
primitive
pipeline executes the following stages, with the logical ordering of the
stages matching the order specified here:

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)

The graphics mesh pipeline executes the following stages, with the logical
ordering of the stages matching the order specified here:

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)

For the compute pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

For the subpass shading pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

For graphics pipeline commands executing in a render pass with a fragment
density map attachment, the following pipeline stage where the fragment
density map read happens has no particular order relative to the other
stages, except that it is logically earlier than
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits):

* 
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits)

The conditional rendering stage is formally part of both the graphics, and
the compute pipeline.
The pipeline stage where the predicate read happens has unspecified order
relative to other stages of these pipelines:

* 
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

For the transfer pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR)

For host operations, only one pipeline stage occurs, so no order is
guaranteed:

* 
[VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

For the command preprocessing pipeline, the following stages occur in this
order:

* 
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

For the decompression pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

For acceleration structure build operations, only one pipeline stage occurs,
so no order is guaranteed:

* 
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

For acceleration structure copy operations, only one pipeline stage occurs,
so no order is guaranteed:

* 
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

For opacity micromap build operations, only one pipeline stage occurs, so no
order is guaranteed:

* 
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

For the ray tracing pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR)

* 
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

For the video decode pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

For the video encode pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

For the data graph pipeline, the following stages occur in this order:

* 
[VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](#VkPipelineStageFlagBits2KHR)

Memory in Vulkan **can** be accessed from within shader invocations and via
some fixed-function stages of the pipeline.
The *access type* is a function of the [descriptor type](descriptors.html#descriptors)
used, or how a fixed-function stage accesses memory.

Some synchronization commands take sets of access types as parameters to
define the [access scopes](#synchronization-dependencies-access-scopes) of
a memory dependency.
If a synchronization command includes a *source access mask*, its first
[access scope](#synchronization-dependencies-access-scopes) only includes
accesses via the access types specified in that mask.
Similarly, if a synchronization command includes a *destination access
mask*, its second [access scope](#synchronization-dependencies-access-scopes) only includes accesses via the access types specified in that mask.

Bits which **can** be set in the `srcAccessMask` and `dstAccessMask`
members of [VkMemoryBarrier2KHR](#VkMemoryBarrier2KHR), [VkImageMemoryBarrier2KHR](#VkImageMemoryBarrier2KHR), and
[VkBufferMemoryBarrier2KHR](#VkBufferMemoryBarrier2KHR), specifying access behavior, are:

// Provided by VK_VERSION_1_3
// Flag bits for VkAccessFlagBits2
typedef VkFlags64 VkAccessFlagBits2;
static const VkAccessFlagBits2 VK_ACCESS_2_NONE = 0ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT = 0x00000001ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_INDEX_READ_BIT = 0x00000002ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT = 0x00000004ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_UNIFORM_READ_BIT = 0x00000008ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT = 0x00000010ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_READ_BIT = 0x00000020ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_WRITE_BIT = 0x00000040ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT = 0x00000080ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT = 0x00000100ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT = 0x00000200ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT = 0x00000400ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFER_READ_BIT = 0x00000800ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFER_WRITE_BIT = 0x00001000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_HOST_READ_BIT = 0x00002000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_HOST_WRITE_BIT = 0x00004000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_MEMORY_READ_BIT = 0x00008000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_MEMORY_WRITE_BIT = 0x00010000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_SAMPLED_READ_BIT = 0x100000000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_STORAGE_READ_BIT = 0x200000000ULL;
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT = 0x400000000ULL;
// Provided by VK_KHR_video_decode_queue
static const VkAccessFlagBits2 VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR = 0x800000000ULL;
// Provided by VK_KHR_video_decode_queue
static const VkAccessFlagBits2 VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR = 0x1000000000ULL;
// Provided by VK_EXT_descriptor_heap
static const VkAccessFlagBits2 VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT = 0x200000000000000ULL;
// Provided by VK_EXT_descriptor_heap
static const VkAccessFlagBits2 VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT = 0x400000000000000ULL;
// Provided by VK_KHR_video_encode_queue
static const VkAccessFlagBits2 VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR = 0x2000000000ULL;
// Provided by VK_KHR_video_encode_queue
static const VkAccessFlagBits2 VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR = 0x4000000000ULL;
// Provided by VK_QCOM_tile_shading
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM = 0x8000000000000ULL;
// Provided by VK_QCOM_tile_shading
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM = 0x10000000000000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_NONE_KHR = 0ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_INDEX_READ_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_UNIFORM_READ_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_READ_BIT_KHR = 0x00000020ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_WRITE_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT_KHR = 0x00000200ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFER_READ_BIT_KHR = 0x00000800ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFER_WRITE_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_HOST_READ_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_HOST_WRITE_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_MEMORY_READ_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_MEMORY_WRITE_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_SAMPLED_READ_BIT_KHR = 0x100000000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_STORAGE_READ_BIT_KHR = 0x200000000ULL;
// Provided by VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT_KHR = 0x400000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_transform_feedback
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT = 0x02000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_transform_feedback
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT = 0x04000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_transform_feedback
static const VkAccessFlagBits2 VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT = 0x08000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_conditional_rendering
static const VkAccessFlagBits2 VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT = 0x00100000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_device_generated_commands
static const VkAccessFlagBits2 VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV = 0x00020000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_device_generated_commands
static const VkAccessFlagBits2 VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV = 0x00040000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_device_generated_commands
static const VkAccessFlagBits2 VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_EXT = 0x00020000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_device_generated_commands
static const VkAccessFlagBits2 VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_EXT = 0x00040000ULL;
// Provided by VK_KHR_fragment_shading_rate with VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR = 0x00800000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_shading_rate_image
static const VkAccessFlagBits2 VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV = 0x00800000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR = 0x00200000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_synchronization2
static const VkAccessFlagBits2 VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR = 0x00400000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_ray_tracing
static const VkAccessFlagBits2 VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_NV = 0x00200000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_ray_tracing
static const VkAccessFlagBits2 VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_NV = 0x00400000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_fragment_density_map
static const VkAccessFlagBits2 VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT = 0x01000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_blend_operation_advanced
static const VkAccessFlagBits2 VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT = 0x00080000ULL;
// Provided by VK_EXT_descriptor_buffer
static const VkAccessFlagBits2 VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT = 0x20000000000ULL;
// Provided by VK_HUAWEI_invocation_mask
static const VkAccessFlagBits2 VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI = 0x8000000000ULL;
// Provided by VK_KHR_ray_tracing_maintenance1 with (VK_KHR_synchronization2 or VK_VERSION_1_3) and VK_KHR_ray_tracing_pipeline
static const VkAccessFlagBits2 VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR = 0x10000000000ULL;
// Provided by VK_EXT_opacity_micromap
static const VkAccessFlagBits2 VK_ACCESS_2_MICROMAP_READ_BIT_EXT = 0x100000000000ULL;
// Provided by VK_EXT_opacity_micromap
static const VkAccessFlagBits2 VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT = 0x200000000000ULL;
// Provided by VK_NV_optical_flow
static const VkAccessFlagBits2 VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV = 0x40000000000ULL;
// Provided by VK_NV_optical_flow
static const VkAccessFlagBits2 VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV = 0x80000000000ULL;
// Provided by VK_ARM_data_graph
static const VkAccessFlagBits2 VK_ACCESS_2_DATA_GRAPH_READ_BIT_ARM = 0x800000000000ULL;
// Provided by VK_ARM_data_graph
static const VkAccessFlagBits2 VK_ACCESS_2_DATA_GRAPH_WRITE_BIT_ARM = 0x1000000000000ULL;
// Provided by VK_EXT_memory_decompression
static const VkAccessFlagBits2 VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT = 0x80000000000000ULL;
// Provided by VK_EXT_memory_decompression
static const VkAccessFlagBits2 VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT = 0x100000000000000ULL;

// Provided by VK_KHR_synchronization2
// Equivalent to VkAccessFlagBits2
typedef VkAccessFlagBits2 VkAccessFlagBits2KHR;

* 
[VK_ACCESS_2_NONE](#VkAccessFlagBits2KHR) specifies no accesses.

* 
[VK_ACCESS_2_MEMORY_READ_BIT](#VkAccessFlagBits2KHR) specifies all read accesses.
It is always valid in any access mask, and is treated as equivalent to
setting all `READ` access flags that are valid where it is used.

* 
[VK_ACCESS_2_MEMORY_WRITE_BIT](#VkAccessFlagBits2KHR) specifies all write accesses.
It is always valid in any access mask, and is treated as equivalent to
setting all `WRITE` access flags that are valid where it is used.

* 
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to
    command data read from indirect buffers as part of an indirect
build,
trace,
    drawing or dispatch command.
    Such access occurs in the [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR)
    pipeline stage.
    It also specifies read access to command data read from indirect buffers
    as part of a copy command with access occurring in the
    [VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR) pipeline stage.

* 
[VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to an index
    buffer as part of an indexed drawing command, bound by
[vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2) and
    [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer).
    Such access occurs in the [VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR)
    pipeline stage.

* 
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to a
vertex buffer as part of a drawing command, bound by
[vkCmdBindVertexBuffers](fxvertex.html#vkCmdBindVertexBuffers).
Such access occurs in the
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage.

* 
[VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to a
[uniform buffer](descriptors.html#descriptors-uniformbuffer) in any shader pipeline
stage.

* 
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to an
[input attachment](renderpass.html#renderpass) within a render pass during
subpass shading or
fragment shading.
Such access occurs in the
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage.

* 
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to a
[uniform texel buffer](descriptors.html#descriptors-uniformtexelbuffer) or
[sampled image](descriptors.html#descriptors-sampledimage) in any shader pipeline
stage.

* 
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to a
[storage buffer](descriptors.html#descriptors-storagebuffer),
[physical storage buffer](descriptors.html#descriptors-physical-storage-buffer),
[storage texel buffer](descriptors.html#descriptors-storagetexelbuffer), or
[storage image](descriptors.html#descriptors-storageimage) in any shader pipeline
stage.

* 
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR) specifies read
access to a [shader binding table](raytracing.html#shader-binding-table) in any shader
pipeline stage.

* 
[VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR)
is equivalent to the logical OR of:

[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR)

* 
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR)

* 
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR)

* 
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR)

[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR) specifies write access to a
[storage buffer](descriptors.html#descriptors-storagebuffer),
[physical storage buffer](descriptors.html#descriptors-physical-storage-buffer),
[storage texel buffer](descriptors.html#descriptors-storagetexelbuffer), or
[storage image](descriptors.html#descriptors-storageimage) in any shader pipeline
stage.

[VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR) is equivalent to
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR).

[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to a
[color attachment](renderpass.html#renderpass), such as via
[blending](framebuffer.html#framebuffer-blending) (other than
[advanced blend operations](framebuffer.html#framebuffer-blend-advanced)),
[logic operations](framebuffer.html#framebuffer-logicop) or certain
[render pass load operations](renderpass.html#renderpass-load-operations) in the
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage or
via [fragment shader tile image reads](fragops.html#fragops-shader-tileimage-reads)
in the [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR) specifies write access to a
[color attachment](renderpass.html#renderpass) during a [render pass](renderpass.html#renderpass) or
via certain render pass [load](renderpass.html#renderpass-load-operations),
[store](renderpass.html#renderpass-store-operations), and
[multisample resolve](renderpass.html#renderpass-resolve-operations) operations.
This includes [multisample resolve](renderpass.html#renderpass-resolve-operations)
operations for depth/stencil resolve attachments.
Such access occurs in the
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR) specifies read
access to a [depth/stencil attachment](renderpass.html#renderpass), via
[depth or stencil operations](fragops.html#fragops-ds-state) or certain
[render pass load operations](renderpass.html#renderpass-load-operations) in the
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) pipeline stages or via
[fragment shader tile image reads](fragops.html#fragops-shader-tileimage-reads) in
the [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR) specifies write
access to a [depth/stencil attachment](renderpass.html#renderpass), via
[depth or stencil operations](fragops.html#fragops-ds-state) or certain render pass
[load](renderpass.html#renderpass-load-operations) and [    store](renderpass.html#renderpass-store-operations) operations.
Such access occurs in the
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) pipeline stages.

[VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR) specifies read access to an image or
buffer in a [copy](copies.html#copies) operation.
Such access occurs in the [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR) pipeline stages.

[VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR) specifies write access to an image
or buffer in a [clear](clears.html#clears) or [copy](copies.html#copies) operation.
Such access occurs in the [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR), [VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR) pipeline stages.

[VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR) specifies read access by a host
operation.
Accesses of this type are not performed through a resource, but directly
on memory.
Such access occurs in the [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR) specifies write access by a host
operation.
Accesses of this type are not performed through a resource, but directly
on memory.
Such access occurs in the [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read
access to a predicate as part of conditional rendering.
Such access occurs in the
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) specifies write
access to a transform feedback buffer made when transform feedback is
active.
Such access occurs in the
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read
access to a transform feedback counter buffer which is read when
[vkCmdBeginTransformFeedbackEXT](vertexpostproc.html#vkCmdBeginTransformFeedbackEXT) executes.
Such access occurs in the
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) specifies
write access to a transform feedback counter buffer which is written
when [vkCmdEndTransformFeedbackEXT](vertexpostproc.html#vkCmdEndTransformFeedbackEXT) executes.
Such access occurs in the
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR) specifies reads from
buffer inputs to [vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV).
Such access occurs in the
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR) specifies writes to
the target command buffer preprocess outputs.
Such access occurs in the
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies reads from
buffer inputs to [vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT).
Such access occurs in the
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) specifies writes to
the target command buffer preprocess outputs.
Such access occurs in the
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read
access to memory in decompression commands
[vkCmdDecompressMemoryEXT](memory_decompression.html#vkCmdDecompressMemoryEXT) and
[vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT).
Such access occurs in
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) specifies write
access to memory in decompression commands
[vkCmdDecompressMemoryEXT](memory_decompression.html#vkCmdDecompressMemoryEXT) and
[vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT).
Such access occurs in
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR) specifies
read access to [color attachments](renderpass.html#renderpass), including
[advanced blend operations](framebuffer.html#framebuffer-blend-advanced).
Such access occurs in the
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR) specifies read access
to an invocation mask image in the
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR) specifies read
access to an acceleration structure as part of a trace, build, or copy
command, or to an [acceleration    structure scratch buffer](accelstructures.html#acceleration-structure-scratch) as part of a build command.
Such access occurs in the
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR) pipeline stage or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR) specifies write
access to an acceleration structure or [    acceleration structure scratch buffer](accelstructures.html#acceleration-structure-scratch) as part of a build or copy
command.
Such access occurs in the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read
access to a [fragment density    map attachment](renderpass.html#renderpass-fragmentdensitymapattachment) during dynamic [fragment    density map operations](fragmentdensitymapops.html#fragmentdensitymapops).
Such access occurs in the
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](#VkAccessFlagBits2KHR)
specifies read access to a fragment shading rate attachment during
rasterization.
Such access occurs in the
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR) specifies read access
to a shading rate image during rasterization.
Such access occurs in the
[VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR) pipeline stage.
It is equivalent to
[VK_ACCESS_2_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](#VkAccessFlagBits2KHR).

[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR) specifies read access to an
image or buffer resource in a [video decode    operation](videocoding.html#video-decode-operations).
Such access occurs in the [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR) specifies write access to
an image or buffer resource in a [video decode    operation](videocoding.html#video-decode-operations).
Such access occurs in the [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR) specifies read access to an
image or buffer resource in a [video encode    operation](videocoding.html#video-encode-operations).
Such access occurs in the [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR) specifies write access to
an image or buffer resource in a [video encode    operation](videocoding.html#video-encode-operations).
Such access occurs in the [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read access
to a [descriptor buffer](descriptorbuffers.html#descriptorbuffers) in any shader pipeline
stage.

[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR) specifies read access to an
image or buffer resource as part of a [optical    flow operation](VK_NV_optical_flow/optical_flow.html#opticalflow-operations).
Such access occurs in the [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR) specifies write access to an
image or buffer resource as part of a [optical    flow operation](VK_NV_optical_flow/optical_flow.html#opticalflow-operations).
Such access occurs in the [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)
pipeline stage.

[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) specifies write access to a
micromap object.
Such access occurs in the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) pipeline stage.

[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read access to a
micromap object.
Such access occurs in the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) and
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) pipeline
stages.

[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR) specifies read
access to a [tile    attachment](renderpass.html#renderpass-tile-shading-attachment-access).
Such access occurs in the [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR)
or [VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR) pipeline stages.

[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR) specifies write
access to a [tile    attachment](renderpass.html#renderpass-tile-shading-attachment-access).
Such access occurs in the [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR)
or [VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR) pipeline stages.

[VK_ACCESS_2_DATA_GRAPH_READ_BIT_ARM](#VkAccessFlagBits2KHR) specifies read access to
resources in the [VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_DATA_GRAPH_WRITE_BIT_ARM](#VkAccessFlagBits2KHR) specifies write access to
resources in the [VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](#VkPipelineStageFlagBits2KHR) pipeline
stage.

[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read access to a
sampler heap in any shader pipeline stage.

[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) specifies read access to a
resource heap in any shader pipeline stage.

Certain access types are only performed by a subset of pipeline stages, as
described in more detail for [VkAccessFlagBits](#VkAccessFlagBits).
The [Supported Access Types](#synchronization-access-types-supported) table
lists, for each access flag, which pipeline stages **can** perform that type of
access.

|  | In situations where an application wishes to select all access types for a
| --- | --- |
given set of pipeline stages, [VK_ACCESS_2_MEMORY_READ_BIT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_MEMORY_WRITE_BIT](#VkAccessFlagBits2KHR) can be used.
This is particularly useful when specifying stages that only have a single
access type. |

|  | The `VkAccessFlags2` bitmask goes beyond the 31 individual bit flags
| --- | --- |
allowable within a C99 enum, which is how [VkAccessFlagBits](#VkAccessFlagBits) is defined.
The first 31 values are common to both, and are interchangeable. |

`VkAccessFlags2` is a bitmask type for setting a mask of zero or more
[VkAccessFlagBits2](#VkAccessFlagBits2):

// Provided by VK_VERSION_1_3
typedef VkFlags64 VkAccessFlags2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkAccessFlags2
typedef VkAccessFlags2 VkAccessFlags2KHR;

An application **can** link a [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR) structure in
the `pNext` chain of [VkMemoryBarrier2](#VkMemoryBarrier2),
[VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2), or [VkImageMemoryBarrier2](#VkImageMemoryBarrier2) to provide
additional access flags beyond those available in [VkAccessFlagBits2](#VkAccessFlagBits2).

The `VkMemoryBarrierAccessFlags3KHR` structure is defined as:

// Provided by VK_KHR_maintenance8
typedef struct VkMemoryBarrierAccessFlags3KHR {
    VkStructureType      sType;
    const void*          pNext;
    VkAccessFlags3KHR    srcAccessMask3;
    VkAccessFlags3KHR    dstAccessMask3;
} VkMemoryBarrierAccessFlags3KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask3` is a [VkAccessFlags3KHR](#VkAccessFlags3KHR) mask of access flags
to be included in the [    first access scope](#synchronization-dependencies-access-scopes).

* 
`dstAccessMask3` is a [VkAccessFlags3KHR](#VkAccessFlags3KHR) mask of access flags
to be included in the [    second access scope](#synchronization-dependencies-access-scopes).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryBarrierAccessFlags3KHR-sType-sType) VUID-VkMemoryBarrierAccessFlags3KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_BARRIER_ACCESS_FLAGS_3_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryBarrierAccessFlags3KHR-srcAccessMask3-parameter) VUID-VkMemoryBarrierAccessFlags3KHR-srcAccessMask3-parameter

 `srcAccessMask3` **must** be a valid combination of [VkAccessFlagBits3KHR](#VkAccessFlagBits3KHR) values

* 
[](#VUID-VkMemoryBarrierAccessFlags3KHR-dstAccessMask3-parameter) VUID-VkMemoryBarrierAccessFlags3KHR-dstAccessMask3-parameter

 `dstAccessMask3` **must** be a valid combination of [VkAccessFlagBits3KHR](#VkAccessFlagBits3KHR) values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2)

* 
[VkImageMemoryBarrier2](#VkImageMemoryBarrier2)

* 
[VkMemoryRangeBarriersInfoKHR](#VkMemoryRangeBarriersInfoKHR)

* 
[VkSubpassDependency2](renderpass.html#VkSubpassDependency2)

Bits which **can** be set in the `srcAccessMask3` and `dstAccessMask3`
members of [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR), specifying access behavior,
are:

// Provided by VK_KHR_maintenance8
// Flag bits for VkAccessFlagBits3KHR
typedef VkFlags64 VkAccessFlagBits3KHR;
static const VkAccessFlagBits3KHR VK_ACCESS_3_NONE_KHR = 0ULL;

* 
[VK_ACCESS_3_NONE_KHR](#VkAccessFlagBits3KHR) specifies no additional accesses.

`VkAccessFlags3KHR` is a bitmask type for setting a mask of zero or more
[VkAccessFlagBits3KHR](#VkAccessFlagBits3KHR):

// Provided by VK_KHR_maintenance8
typedef VkFlags64 VkAccessFlags3KHR;

When a [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR) structure is linked in the
`pNext` field of [VkMemoryBarrier2](#VkMemoryBarrier2), [VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2),
or [VkImageMemoryBarrier2](#VkImageMemoryBarrier2), the flags specified in the
`srcAccessMask3` and `dstAccessMask3` fields are considered in
addition to the flags in the `srcAccessMask` and `dstAccessMask`
fields, respectively, to allow up to 128 total access types to be specified
for the first or second [access scope](#synchronization-dependencies-access-scopes).

|  | When [VkAccessFlagBits3KHR](#VkAccessFlagBits3KHR) and [VkAccessFlagBits2](#VkAccessFlagBits2) are used
| --- | --- |
together, the two sets of 64 flags bits are combined together into 128 flag
bits (effectively OR’ing them together).
This is different from [VkAccessFlagBits2](#VkAccessFlagBits2) and [VkAccessFlagBits](#VkAccessFlagBits),
where the 64 bit [VkAccessFlagBits2](#VkAccessFlagBits2) extends and *replaces* the 32 bit
[VkAccessFlagBits](#VkAccessFlagBits). |

Bits which **can** be set in the `srcAccessMask` and `dstAccessMask`
members of [VkSubpassDependency](renderpass.html#VkSubpassDependency),
[VkSubpassDependency2](renderpass.html#VkSubpassDependency2),
[VkMemoryBarrier](#VkMemoryBarrier), [VkBufferMemoryBarrier](#VkBufferMemoryBarrier), and
[VkImageMemoryBarrier](#VkImageMemoryBarrier), specifying access behavior, are:

|  | This functionality is superseded by [VkAccessFlagBits2](#VkAccessFlagBits2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkAccessFlagBits {
    VK_ACCESS_INDIRECT_COMMAND_READ_BIT = 0x00000001,
    VK_ACCESS_INDEX_READ_BIT = 0x00000002,
    VK_ACCESS_VERTEX_ATTRIBUTE_READ_BIT = 0x00000004,
    VK_ACCESS_UNIFORM_READ_BIT = 0x00000008,
    VK_ACCESS_INPUT_ATTACHMENT_READ_BIT = 0x00000010,
    VK_ACCESS_SHADER_READ_BIT = 0x00000020,
    VK_ACCESS_SHADER_WRITE_BIT = 0x00000040,
    VK_ACCESS_COLOR_ATTACHMENT_READ_BIT = 0x00000080,
    VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT = 0x00000100,
    VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT = 0x00000200,
    VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT = 0x00000400,
    VK_ACCESS_TRANSFER_READ_BIT = 0x00000800,
    VK_ACCESS_TRANSFER_WRITE_BIT = 0x00001000,
    VK_ACCESS_HOST_READ_BIT = 0x00002000,
    VK_ACCESS_HOST_WRITE_BIT = 0x00004000,
    VK_ACCESS_MEMORY_READ_BIT = 0x00008000,
    VK_ACCESS_MEMORY_WRITE_BIT = 0x00010000,
  // Provided by VK_VERSION_1_3
    VK_ACCESS_NONE = 0,
  // Provided by VK_EXT_transform_feedback
    VK_ACCESS_TRANSFORM_FEEDBACK_WRITE_BIT_EXT = 0x02000000,
  // Provided by VK_EXT_transform_feedback
    VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT = 0x04000000,
  // Provided by VK_EXT_transform_feedback
    VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT = 0x08000000,
  // Provided by VK_EXT_conditional_rendering
    VK_ACCESS_CONDITIONAL_RENDERING_READ_BIT_EXT = 0x00100000,
  // Provided by VK_EXT_blend_operation_advanced
    VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT = 0x00080000,
  // Provided by VK_KHR_acceleration_structure
    VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR = 0x00200000,
  // Provided by VK_KHR_acceleration_structure
    VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR = 0x00400000,
  // Provided by VK_EXT_fragment_density_map
    VK_ACCESS_FRAGMENT_DENSITY_MAP_READ_BIT_EXT = 0x01000000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR = 0x00800000,
  // Provided by VK_EXT_device_generated_commands
    VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT = 0x00020000,
  // Provided by VK_EXT_device_generated_commands
    VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT = 0x00040000,
  // Provided by VK_NV_shading_rate_image
    VK_ACCESS_SHADING_RATE_IMAGE_READ_BIT_NV = VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_NV = VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_NV = VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR,
  // Provided by VK_NV_device_generated_commands
    VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV = VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT,
  // Provided by VK_NV_device_generated_commands
    VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_NV = VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT,
  // Provided by VK_KHR_synchronization2
    VK_ACCESS_NONE_KHR = VK_ACCESS_NONE,
} VkAccessFlagBits;

These values all have the same meaning as the equivalently named values for
[VkAccessFlags2](#VkAccessFlags2).

* 
[VK_ACCESS_NONE](#VkAccessFlagBits) specifies no accesses.

* 
[VK_ACCESS_MEMORY_READ_BIT](#VkAccessFlagBits) specifies all read accesses.
It is always valid in any access mask, and is treated as equivalent to
setting all `READ` access flags that are valid where it is used.

* 
[VK_ACCESS_MEMORY_WRITE_BIT](#VkAccessFlagBits) specifies all write accesses.
It is always valid in any access mask, and is treated as equivalent to
setting all `WRITE` access flags that are valid where it is used.

* 
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits) specifies read access to
    indirect command data read as part of an indirect
build,
trace,
    drawing or dispatching command.
    Such access occurs in the [VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits)
    pipeline stage.

* 
[VK_ACCESS_INDEX_READ_BIT](#VkAccessFlagBits) specifies read access to an index buffer
    as part of an indexed drawing command, bound by
[vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2) and
    [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer).
    Such access occurs in the [VK_PIPELINE_STAGE_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits)
    pipeline stage.

* 
[VK_ACCESS_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits) specifies read access to a
vertex buffer as part of a drawing command, bound by
[vkCmdBindVertexBuffers](fxvertex.html#vkCmdBindVertexBuffers).
Such access occurs in the [VK_PIPELINE_STAGE_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits)
pipeline stage.

* 
[VK_ACCESS_UNIFORM_READ_BIT](#VkAccessFlagBits) specifies read access to a
[uniform buffer](descriptors.html#descriptors-uniformbuffer) in any shader pipeline
stage.

* 
[VK_ACCESS_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits) specifies read access to an
[input attachment](renderpass.html#renderpass) within a render pass during
subpass shading or
fragment shading.
Such access occurs in the
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_SHADER_READ_BIT](#VkAccessFlagBits) specifies read access to a
[uniform texel buffer](descriptors.html#descriptors-uniformtexelbuffer),
[sampled image](descriptors.html#descriptors-sampledimage),
[storage buffer](descriptors.html#descriptors-storagebuffer),
[physical storage buffer](descriptors.html#descriptors-physical-storage-buffer),
[shader binding table](raytracing.html#shader-binding-table),
[storage tensor](descriptors.html#descriptors-storagetensor),
[storage texel buffer](descriptors.html#descriptors-storagetexelbuffer), or
[storage image](descriptors.html#descriptors-storageimage) in any shader pipeline
stage.

* 
[VK_ACCESS_SHADER_WRITE_BIT](#VkAccessFlagBits) specifies write access to a
[storage buffer](descriptors.html#descriptors-storagebuffer),
[physical storage buffer](descriptors.html#descriptors-physical-storage-buffer),
[storage tensor](descriptors.html#descriptors-storagetensor),
[storage texel buffer](descriptors.html#descriptors-storagetexelbuffer), or
[storage image](descriptors.html#descriptors-storageimage) in any shader pipeline
stage.

* 
[VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits) specifies read access to a
[color attachment](renderpass.html#renderpass), such as via
[blending](framebuffer.html#framebuffer-blending) (other than
[advanced blend operations](framebuffer.html#framebuffer-blend-advanced)),
[logic operations](framebuffer.html#framebuffer-logicop) or certain
[render pass load operations](renderpass.html#renderpass-load-operations) in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits) pipeline stage or
via [fragment shader tile image reads](fragops.html#fragops-shader-tileimage-reads)
in the [VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits) specifies write access to a
[color attachment](renderpass.html#renderpass) during a [render pass](renderpass.html#renderpass) or
via certain render pass [load](renderpass.html#renderpass-load-operations),
[store](renderpass.html#renderpass-store-operations), and
[multisample resolve](renderpass.html#renderpass-resolve-operations) operations.
This includes [multisample resolve](renderpass.html#renderpass-resolve-operations)
operations for depth/stencil resolve attachments.
Such access occurs in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits) specifies read access
to a [depth/stencil attachment](renderpass.html#renderpass), via [    depth or stencil operations](fragops.html#fragops-ds-state) or certain
[render pass load operations](renderpass.html#renderpass-load-operations) in the
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits) pipeline stages or via
[fragment shader tile image reads](fragops.html#fragops-shader-tileimage-reads) in
the [VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits) specifies write
access to a [depth/stencil attachment](renderpass.html#renderpass), via
[depth or stencil operations](fragops.html#fragops-ds-state) or certain render pass
[load](renderpass.html#renderpass-load-operations) and [    store](renderpass.html#renderpass-store-operations) operations.
Such access occurs in the
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits) pipeline stages.

* 
[VK_ACCESS_TRANSFER_READ_BIT](#VkAccessFlagBits) specifies read access to an
image, tensor,
or buffer in a [copy](copies.html#copies) operation.
Such access occurs in the [VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR)
pipeline stage.

* 
[VK_ACCESS_TRANSFER_WRITE_BIT](#VkAccessFlagBits) specifies write access to an
image, tensor,
or buffer in a [clear](clears.html#clears) or [copy](copies.html#copies) operation.
Such access occurs in the [VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR)
pipeline stage.

* 
[VK_ACCESS_HOST_READ_BIT](#VkAccessFlagBits) specifies read access by a host operation.
Accesses of this type are not performed through a resource, but directly
on memory.
Such access occurs in the [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits) pipeline
stage.

* 
[VK_ACCESS_HOST_WRITE_BIT](#VkAccessFlagBits) specifies write access by a host
operation.
Accesses of this type are not performed through a resource, but directly
on memory.
Such access occurs in the [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits) pipeline
stage.

* 
[VK_ACCESS_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits) specifies read access
to a predicate as part of conditional rendering.
Such access occurs in the
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits) specifies write access
to a transform feedback buffer made when transform feedback is active.
Such access occurs in the
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits) specifies read
access to a transform feedback counter buffer which is read when
`vkCmdBeginTransformFeedbackEXT` executes.
Such access occurs in the
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits) specifies write
access to a transform feedback counter buffer which is written when
`vkCmdEndTransformFeedbackEXT` executes.
Such access occurs in the
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits) specifies reads from
buffer inputs to [vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV).
Such access occurs in the
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits) specifies writes to the
target command buffer preprocess outputs in
[vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV).
Such access occurs in the
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT](#VkAccessFlagBits) specifies reads from
buffer inputs to [vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT).
Such access occurs in the
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT](#VkAccessFlagBits) specifies writes to the
target command buffer preprocess outputs in
[vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT).
Such access occurs in the
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits) specifies read
access to [color attachments](renderpass.html#renderpass), including
[advanced blend operations](framebuffer.html#framebuffer-blend-advanced).
Such access occurs in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR) specifies read access
to an invocation mask image in the
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) pipeline stage.

* 
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits) specifies read
access to an acceleration structure as part of a trace, build, or copy
command, or to an [acceleration    structure scratch buffer](accelstructures.html#acceleration-structure-scratch) as part of a build command.
Such access occurs in the
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits) pipeline stage or
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits) pipeline
stage.

* 
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits) specifies write
access to an acceleration structure or [    acceleration structure scratch buffer](accelstructures.html#acceleration-structure-scratch) as part of a build or copy
command.
Such access occurs in the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits) pipeline
stage.

* 
[VK_ACCESS_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits) specifies read access
to a [fragment density map    attachment](renderpass.html#renderpass-fragmentdensitymapattachment) during dynamic [fragment density    map operations](fragmentdensitymapops.html#fragmentdensitymapops) Such access occurs in the
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits) pipeline stage.

* 
[VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](#VkAccessFlagBits) specifies
read access to a fragment shading rate attachment during rasterization.
Such access occurs in the
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)
pipeline stage.

* 
[VK_ACCESS_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits) specifies read access to
a shading rate image during rasterization.
Such access occurs in the
[VK_PIPELINE_STAGE_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits) pipeline stage.
It is equivalent to
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits).

Certain access types are only performed by a subset of pipeline stages.
Any synchronization command that takes both stage masks and access masks
uses both to define the [access scopes](#synchronization-dependencies-access-scopes) - only the specified access types performed by the specified stages
are included in the access scope.
An application **must** not specify an access flag in a synchronization command
if it does not include a pipeline stage in the corresponding stage mask that
is able to perform accesses of that type.
The following table lists, for each access flag, which pipeline stages **can**
perform that type of access.

| Access flag | Supported pipeline stages |
| --- | --- |
| [VK_ACCESS_2_NONE](#VkAccessFlagBits2KHR),

 [VK_ACCESS_NONE](#VkAccessFlagBits) | Any |
| [VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_INDEX_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_UNIFORM_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_SHADER_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_SHADER_WRITE_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_TRANSFER_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_TRANSFER_WRITE_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_HOST_READ_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_HOST_WRITE_BIT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_MEMORY_READ_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_MEMORY_READ_BIT](#VkAccessFlagBits) | Any |
| [VK_ACCESS_2_MEMORY_WRITE_BIT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_MEMORY_WRITE_BIT](#VkAccessFlagBits) | Any |
| [VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_COMMAND_PREPROCESS_WRITE_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](#VkAccessFlagBits2KHR),

 [VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),

 [VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),

 [VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),

 [VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits) | [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_DATA_GRAPH_READ_BIT_ARM](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_DATA_GRAPH_WRITE_BIT_ARM](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |
| [VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) | [VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
	[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR) |

|  | This functionality is superseded by [VkAccessFlags2](#VkAccessFlags2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkAccessFlags;

`VkAccessFlags` is a bitmask type for setting a mask of zero or more
[VkAccessFlagBits](#VkAccessFlagBits).

If a memory object does not have the
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](memory.html#VkMemoryPropertyFlagBits) property, then
[vkFlushMappedMemoryRanges](memory.html#vkFlushMappedMemoryRanges) **must** be called in order to guarantee that
writes to the memory object from the host are made available to the host
domain, where they **can** be further made available to the device domain via a
domain operation.
Similarly, [vkInvalidateMappedMemoryRanges](memory.html#vkInvalidateMappedMemoryRanges) **must** be called to guarantee
that writes which are available to the host domain are made visible to host
operations.

If the memory object does have the
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](memory.html#VkMemoryPropertyFlagBits) property flag, writes to the
memory object from the host are automatically made available to the host
domain.
Similarly, writes made available to the host domain are automatically made
visible to the host.

|  | [Queue submission commands](devsandqueues.html#devsandqueues-submission) automatically
| --- | --- |
perform a [domain operation from host to device](#synchronization-submission-host-writes) for all writes performed before the command executes, so in
most cases an explicit memory barrier is not needed for this case.
In the few circumstances where a submit does not occur between the host
write and the device read access, writes **can** be made available by using an
explicit memory barrier. |

[Pipeline stages](#synchronization-pipeline-stages) that operate on, or
with respect to, the framebuffer are collectively the *framebuffer-space*
pipeline stages.
These stages are:

* 
[VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits)

* 
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits)

For commands recorded where the
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is enabled,
the [VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits) and
[VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits) are included as framebuffer-space
pipeline stages.

For these pipeline stages, an execution or memory dependency from the first
set of operations to the second set **can** either be a single
*framebuffer-global* dependency, or split into multiple *framebuffer-local*
dependencies.
A dependency with non-framebuffer-space pipeline stages is neither
framebuffer-global nor framebuffer-local.

Framebuffer-global dependencies require synchronization from all framebuffer
operations in the first [synchronization scope](#synchronization-dependencies-scopes) to all framebuffer operations in the second
synchronization scope.

Framebuffer-local dependencies instead partition the framebuffer operations
into *framebuffer regions*, and dependencies are only formed between
framebuffer regions with overlapping (x, y, layer,
view,
sample) coordinates.
How a framebuffer-local dependency is partitioned depends on the nature of
the dependency and what is being synchronized, as outlined below.

* 
If the [VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits) flag is specified in a
synchronization command, each region in that dependency covers a single
(x,y,layer) position.

If the dependency is between two operations where the sample counts
match,
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](renderpass.html#VkRenderingFlagBitsKHR) is not also specified,
and the operations are not both in subpasses specified with
[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits),
the regions are further split to only cover a single sample.

* 
If the dependency is between commands that enable
[tile shading](renderpass.html#renderpass-tile-shading), instead of a single
(x,y) position, each region covers multiple (x,y) positions
according to the tile size and the specified apron.

If the [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits) flag is specified in a
synchronization command, each region covers a single (view).

Each region in an automatic framebuffer-local dependency inserted
between framebuffer-space operations performed by pipelines created with
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](framebuffer.html#VkPipelineColorBlendStateCreateFlagBits),
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits),
or
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits),
covers a single (x,y,layer,sample) position.

If none of the above conditions partitions the regions across one of the
x, y, layer,
view,
or sample dimensions, all coordinates for that dimension are included
in each region.
If this is true for all of those dimensions, the dependency is
framebuffer-global.

|  | Framebuffer-local dependencies are more efficient for most architectures;
| --- | --- |
particularly tile-based architectures - which can keep framebuffer-regions
entirely in on-chip registers and thus avoid external bandwidth across such
a dependency.
Including a framebuffer-global dependency in your rendering will usually
force all implementations to flush data to memory, or to a higher level
cache, breaking any potential locality optimizations. |

|  | It does not matter whether a framebuffer local dependency is within a single
| --- | --- |
render pass or between two different render passes - the dependencies are
always between regions with overlapping framebuffer coordinates. |

Dependencies **can** be either device-local or non-device-local.
A device-local dependency acts as multiple separate dependencies, one for
each physical device that executes the synchronization command, where each
dependency only includes operations from that physical device in both
synchronization scopes.
A non-device-local dependency is a single dependency where both
synchronization scopes include operations from all physical devices that
participate in the synchronization command.
For subpass dependencies, all physical devices in the
[VkDeviceGroupRenderPassBeginInfo](renderpass.html#VkDeviceGroupRenderPassBeginInfo)::`deviceMask` participate in the
dependency, and for pipeline barriers all physical devices that are set in
the command buffer’s current device mask participate in the dependency.

If a synchronization command includes a `dependencyFlags` parameter and
specifies the [VK_DEPENDENCY_DEVICE_GROUP_BIT](#VkDependencyFlagBits) flag, then it defines a
non-device-local dependency for that synchronization command.
If no `dependencyFlags` parameter is included or the
[VK_DEPENDENCY_DEVICE_GROUP_BIT](#VkDependencyFlagBits) flag is not specified, then it defines
device-local dependencies for that synchronization command, for all
participating physical devices.

Semaphore and event dependencies are device-local and only execute on the
one physical device that performs the dependency.

A small number of implicit ordering guarantees are provided by Vulkan,
ensuring that the order in which commands are submitted is meaningful, and
avoiding unnecessary complexity in common operations.

*Submission order* is a fundamental ordering in Vulkan, giving meaning to
the order in which [action and synchronization commands](fundamentals.html#fundamentals-queueoperation-command-types) are recorded and submitted to a single queue.
Explicit and implicit ordering guarantees between commands in Vulkan all
work on the premise that this ordering is meaningful.
This order does not itself define any execution or memory dependencies;
synchronization commands and other orderings within the API use this
ordering to define their scopes.

Submission order for any given set of commands is based on the order in
which they were recorded to command buffers and then submitted.
This order is determined as follows:

The initial order is determined by the order in which
[vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)
and [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2)
commands are executed on the host, for a single queue, from first to
last.

The order in which [VkSubmitInfo](cmdbuffers.html#VkSubmitInfo) structures are specified in the
`pSubmits` parameter of [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit),
or in which [VkSubmitInfo2](cmdbuffers.html#VkSubmitInfo2) structures are specified in the
`pSubmits` parameter of [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2),
from lowest index to highest.

The order in which command buffers are specified in the
`pCommandBuffers` member of [VkSubmitInfo](cmdbuffers.html#VkSubmitInfo)
or [VkSubmitInfo2](cmdbuffers.html#VkSubmitInfo2)
from lowest index to highest.

The order in which commands outside of a render pass were recorded to a
command buffer on the host, from first to last.

The order in which commands inside a single subpass were recorded to a
command buffer on the host, from first to last.

|  | When using a [render pass object](renderpass.html#renderpass-objects) with multiple
| --- | --- |
subpasses, commands in different subpasses have no defined submission order
relative to each other, regardless of the order in which the subpasses were
recorded.
Commands within a subpass are still ordered relative to other commands in
the same subpass, and those outside of the render pass. |

[State commands](fundamentals.html#fundamentals-queueoperation-command-types) do not execute
any operations on the device, instead they set the state of the command
buffer when they execute on the host, in the order that they are recorded.
[Action commands](fundamentals.html#fundamentals-queueoperation-command-types) consume the
current state of the command buffer when they are recorded, and will execute
state changes on the device as required to match the recorded state.

[The order of primitives passing through the graphics pipeline](drawing.html#drawing-primitive-order) and
[image layout transitions as part of an image memory barrier](#synchronization-image-barrier-layout-transition-order) provide additional
guarantees based on submission order.

Execution of [pipeline stages](#synchronization-pipeline-stages-order)
within a given command also has a loose ordering, dependent only on a single
command.

*Signal operation order* is a fundamental ordering in Vulkan, giving meaning
to the order in which semaphore and fence signal operations occur when
submitted to a single queue.
The signal operation order for queue operations is determined as follows:

The initial order is determined by the order in which
[vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)
and [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2)
commands are executed on the host, for a single queue, from first to
last.

The order in which [VkSubmitInfo](cmdbuffers.html#VkSubmitInfo) structures are specified in the
`pSubmits` parameter of [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit),
or in which [VkSubmitInfo2](cmdbuffers.html#VkSubmitInfo2) structures are specified in the
`pSubmits` parameter of [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2),
from lowest index to highest.

The fence signal operation defined by the `fence` parameter of the
following commands
and the [VkAcquireNextImageInfoKHR](VK_KHR_surface/wsi.html#VkAcquireNextImageInfoKHR)::`fence` member of the
variable referred to by the `pAcquireInfo` parameter of
[vkAcquireNextImage2KHR](VK_KHR_surface/wsi.html#vkAcquireNextImage2KHR)
is ordered after all semaphore signal operations defined by that
command:

* 
[vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)

* 
[vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2)

* 
[vkQueueBindSparse](sparsemem.html#vkQueueBindSparse)

* 
[vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR)

Semaphore signal operations defined by a single [VkSubmitInfo](cmdbuffers.html#VkSubmitInfo)
or [VkSubmitInfo2](cmdbuffers.html#VkSubmitInfo2)
or [VkBindSparseInfo](sparsemem.html#VkBindSparseInfo)
structure are unordered with respect to other semaphore signal operations
defined within the same structure.

The [vkSignalSemaphore](#vkSignalSemaphore) command does not execute on a queue but instead
performs the signal operation from the host.
The semaphore signal operation defined by executing a
[vkSignalSemaphore](#vkSignalSemaphore) command happens-after the [vkSignalSemaphore](#vkSignalSemaphore)
command is invoked and happens-before the command returns.

|  | When signaling timeline semaphores, it is the responsibility of the
| --- | --- |
application to ensure that they are ordered such that the semaphore value is
strictly increasing.
Because the first synchronization scope for a semaphore signal operation
contains all semaphore signal operations which occur earlier in submission
order, all semaphore signal operations contained in any given batch are
guaranteed to happen-after all semaphore signal operations contained in any
previous batches.
However, no ordering guarantee is provided between the semaphore signal
operations defined within a single batch.
This, combined with the requirement that timeline semaphore values strictly
increase, means that it is invalid to signal the same timeline semaphore
twice within a single batch.

If an application wishes to ensure that some semaphore signal operation
happens-after some other semaphore signal operation, it can submit a
separate batch containing only semaphore signal operations, which will
happen-after the semaphore signal operations in any earlier batches.

When signaling a semaphore from the host, the only ordering guarantee is
that the signal operation happens-after when [vkSignalSemaphore](#vkSignalSemaphore) is
called and happens-before it returns.
Therefore, it is invalid to call `vkSignalSemaphore` while there are any
outstanding signal operations on that semaphore from any queue submissions
unless those queue submissions have some dependency which ensures that they
happen-after the host signal operation.
One example of this would be if the pending signal operation is, itself,
waiting on the same semaphore at a lower value and the call to
`vkSignalSemaphore` signals that lower value.
Furthermore, if there are two or more processes or threads signaling the
same timeline semaphore from the host, the application must ensure that the
`vkSignalSemaphore` with the lower semaphore value returns before
`vkSignalSemaphore` is called with the higher value. |

Fences are a synchronization primitive that **can** be used to insert a
dependency from a queue to the host.
Fences have two states - signaled and unsignaled.
A fence **can** be signaled as part of the execution of a
[queue submission](devsandqueues.html#devsandqueues-submission) command.
Fences **can** be unsignaled on the host with [vkResetFences](#vkResetFences).
Fences **can** be waited on by the host with the [vkWaitForFences](#vkWaitForFences) command,
and the current state **can** be queried with [vkGetFenceStatus](#vkGetFenceStatus).

The internal data of a fence **may** include a reference to any resources and
pending work associated with signal or unsignal operations performed on that
fence object, collectively referred to as the fence’s *payload*.
Mechanisms to import and export that internal data to and from fences are
provided [below](#VkExportFenceCreateInfo).
These mechanisms indirectly enable applications to share fence state between
two or more fences and other synchronization primitives across process and
API boundaries.

Fences are represented by `VkFence` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkFence)

To create a fence, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateFence(
    VkDevice                                    device,
    const VkFenceCreateInfo*                    pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFence*                                    pFence);

* 
`device` is the logical device that creates the fence.

* 
`pCreateInfo` is a pointer to a [VkFenceCreateInfo](#VkFenceCreateInfo) structure
containing information about how the fence is to be created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pFence` is a pointer to a handle in which the resulting fence
object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateFence-device-parameter) VUID-vkCreateFence-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateFence-pCreateInfo-parameter) VUID-vkCreateFence-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkFenceCreateInfo](#VkFenceCreateInfo) structure

* 
[](#VUID-vkCreateFence-pAllocator-parameter) VUID-vkCreateFence-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateFence-pFence-parameter) VUID-vkCreateFence-pFence-parameter

 `pFence` **must** be a valid pointer to a [VkFence](#VkFence) handle

* 
[](#VUID-vkCreateFence-device-queuecount) VUID-vkCreateFence-device-queuecount

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

The `VkFenceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkFenceCreateInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkFenceCreateFlags    flags;
} VkFenceCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkFenceCreateFlagBits](#VkFenceCreateFlagBits) specifying the
initial state and behavior of the fence.

Valid Usage (Implicit)

* 
[](#VUID-VkFenceCreateInfo-sType-sType) VUID-VkFenceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FENCE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFenceCreateInfo-pNext-pNext) VUID-VkFenceCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportFenceCreateInfo](#VkExportFenceCreateInfo) or [VkExportFenceWin32HandleInfoKHR](#VkExportFenceWin32HandleInfoKHR)

* 
[](#VUID-VkFenceCreateInfo-sType-unique) VUID-VkFenceCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkFenceCreateInfo-flags-parameter) VUID-VkFenceCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkFenceCreateFlagBits](#VkFenceCreateFlagBits) values

// Provided by VK_VERSION_1_0
typedef enum VkFenceCreateFlagBits {
    VK_FENCE_CREATE_SIGNALED_BIT = 0x00000001,
} VkFenceCreateFlagBits;

* 
[VK_FENCE_CREATE_SIGNALED_BIT](#VkFenceCreateFlagBits) specifies that the fence object is
created in the signaled state.
Otherwise, it is created in the unsignaled state.

// Provided by VK_VERSION_1_0
typedef VkFlags VkFenceCreateFlags;

`VkFenceCreateFlags` is a bitmask type for setting a mask of zero or
more [VkFenceCreateFlagBits](#VkFenceCreateFlagBits).

To create a fence whose payload **can** be exported to external handles, add a
[VkExportFenceCreateInfo](#VkExportFenceCreateInfo) structure to the `pNext` chain of the
[VkFenceCreateInfo](#VkFenceCreateInfo) structure.
The `VkExportFenceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExportFenceCreateInfo {
    VkStructureType                   sType;
    const void*                       pNext;
    VkExternalFenceHandleTypeFlags    handleTypes;
} VkExportFenceCreateInfo;

// Provided by VK_KHR_external_fence
// Equivalent to VkExportFenceCreateInfo
typedef VkExportFenceCreateInfo VkExportFenceCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is a bitmask of
[VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) specifying one or more fence
handle types the application **can** export from the resulting fence.
The application **can** request multiple handle types for the same fence.

Valid Usage

* 
[](#VUID-VkExportFenceCreateInfo-handleTypes-01446) VUID-VkExportFenceCreateInfo-handleTypes-01446

The bits in `handleTypes` **must** be supported and compatible, as
reported by [VkExternalFenceProperties](capabilities.html#VkExternalFenceProperties)

Valid Usage (Implicit)

* 
[](#VUID-VkExportFenceCreateInfo-sType-sType) VUID-VkExportFenceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportFenceCreateInfo-handleTypes-parameter) VUID-VkExportFenceCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFenceCreateInfo](#VkFenceCreateInfo)

To specify additional attributes of NT handles exported from a fence, add a
[VkExportFenceWin32HandleInfoKHR](#VkExportFenceWin32HandleInfoKHR) structure to the `pNext` chain of
the [VkFenceCreateInfo](#VkFenceCreateInfo) structure.
The `VkExportFenceWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_win32
typedef struct VkExportFenceWin32HandleInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
    LPCWSTR                       name;
} VkExportFenceWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pAttributes` is a pointer to a Windows `SECURITY_ATTRIBUTES`
structure specifying security attributes of the handle.

* 
`dwAccess` is a `DWORD` specifying access rights of the handle.

* 
`name` is a null-terminated UTF-16 string to associate with the
underlying synchronization primitive referenced by NT handles exported
from the created fence.

If [VkExportFenceCreateInfo](#VkExportFenceCreateInfo) is not included in the same `pNext`
chain, this structure is ignored.

If [VkExportFenceCreateInfo](#VkExportFenceCreateInfo) is included in the `pNext` chain of
[VkFenceCreateInfo](#VkFenceCreateInfo) with a Windows `handleType`, but either
`VkExportFenceWin32HandleInfoKHR` is not included in the `pNext`
chain, or it is included but `pAttributes` is `NULL`, default security
descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights will be

`DXGI_SHARED_RESOURCE_READ` | `DXGI_SHARED_RESOURCE_WRITE`

for handles of the following types:

[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR)

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage

* 
[](#VUID-VkExportFenceWin32HandleInfoKHR-handleTypes-01447) VUID-VkExportFenceWin32HandleInfoKHR-handleTypes-01447

If [VkExportFenceCreateInfo](#VkExportFenceCreateInfo)::`handleTypes` does not include
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR), a
`VkExportFenceWin32HandleInfoKHR` structure **must** not be included in
the `pNext` chain of [VkFenceCreateInfo](#VkFenceCreateInfo)

Valid Usage (Implicit)

* 
[](#VUID-VkExportFenceWin32HandleInfoKHR-sType-sType) VUID-VkExportFenceWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_FENCE_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportFenceWin32HandleInfoKHR-pAttributes-parameter) VUID-VkExportFenceWin32HandleInfoKHR-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFenceCreateInfo](#VkFenceCreateInfo)

To export a Windows handle representing the state of a fence, call:

// Provided by VK_KHR_external_fence_win32
VkResult vkGetFenceWin32HandleKHR(
    VkDevice                                    device,
    const VkFenceGetWin32HandleInfoKHR*         pGetWin32HandleInfo,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that created the fence being
exported.

* 
`pGetWin32HandleInfo` is a pointer to a
[VkFenceGetWin32HandleInfoKHR](#VkFenceGetWin32HandleInfoKHR) structure containing parameters of
the export operation.

* 
`pHandle` will return the Windows handle representing the fence
state.

For handle types defined as NT handles, the handles returned by
`vkGetFenceWin32HandleKHR` are owned by the application.
To avoid leaking resources, the application **must** release ownership of them
using the `CloseHandle` system call when they are no longer needed.

Exporting a Windows handle from a fence **may** have side effects depending on
the transference of the specified handle type, as described in
[Importing Fence Payloads](#synchronization-fences-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFenceWin32HandleKHR-device-parameter) VUID-vkGetFenceWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetFenceWin32HandleKHR-pGetWin32HandleInfo-parameter) VUID-vkGetFenceWin32HandleKHR-pGetWin32HandleInfo-parameter

 `pGetWin32HandleInfo` **must** be a valid pointer to a valid [VkFenceGetWin32HandleInfoKHR](#VkFenceGetWin32HandleInfoKHR) structure

* 
[](#VUID-vkGetFenceWin32HandleKHR-pHandle-parameter) VUID-vkGetFenceWin32HandleKHR-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `HANDLE` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkFenceGetWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_win32
typedef struct VkFenceGetWin32HandleInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkExternalFenceHandleTypeFlagBits    handleType;
} VkFenceGetWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fence` is the fence from which state will be exported.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) for a description of the
properties of the defined external fence handle types.

Valid Usage

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01448) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01448

`handleType` **must** have been included in
[VkExportFenceCreateInfo](#VkExportFenceCreateInfo)::`handleTypes` when the `fence`’s
current payload was created

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01449) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01449

If `handleType` is defined as an NT handle,
[vkGetFenceWin32HandleKHR](#vkGetFenceWin32HandleKHR) **must** be called no more than once for
each valid unique combination of `fence` and `handleType`

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-fence-01450) VUID-VkFenceGetWin32HandleInfoKHR-fence-01450

`fence` **must** not currently have its payload replaced by an imported
payload as described below in
[Importing Fence Payloads](#synchronization-fences-importing) unless
that imported payload’s handle type was included in
[VkExternalFenceProperties](capabilities.html#VkExternalFenceProperties)::`exportFromImportedHandleTypes` for
`handleType`

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01451) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01451

If `handleType` refers to a handle type with copy payload
transference semantics, `fence` **must** be signaled, or have an
associated [fence signal operation](#synchronization-fences-signaling)
pending execution

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01452) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01452

`handleType` **must** be defined as an NT handle or a global share
handle

Valid Usage (Implicit)

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-sType-sType) VUID-VkFenceGetWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FENCE_GET_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-pNext-pNext) VUID-VkFenceGetWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-fence-parameter) VUID-VkFenceGetWin32HandleInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](#VkFence) handle

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-parameter) VUID-VkFenceGetWin32HandleInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value

To export a POSIX file descriptor representing the payload of a fence, call:

// Provided by VK_KHR_external_fence_fd
VkResult vkGetFenceFdKHR(
    VkDevice                                    device,
    const VkFenceGetFdInfoKHR*                  pGetFdInfo,
    int*                                        pFd);

* 
`device` is the logical device that created the fence being
exported.

* 
`pGetFdInfo` is a pointer to a [VkFenceGetFdInfoKHR](#VkFenceGetFdInfoKHR) structure
containing parameters of the export operation.

* 
`pFd` will return the file descriptor representing the fence
payload.

Each call to `vkGetFenceFdKHR` **must** create a new file descriptor and
transfer ownership of it to the application.
To avoid leaking resources, the application **must** release ownership of the
file descriptor when it is no longer needed.

|  | Ownership can be released in many ways.
| --- | --- |
For example, the application can call `close`() on the file descriptor,
or transfer ownership back to Vulkan by using the file descriptor to import
a fence payload. |

If `pGetFdInfo->handleType` is
[VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR) and the fence is signaled at
the time `vkGetFenceFdKHR` is called, `pFd` **may** return the value
`-1` instead of a valid file descriptor.

Where supported by the operating system, the implementation **must** set the
file descriptor to be closed automatically when an `execve` system call
is made.

Exporting a file descriptor from a fence **may** have side effects depending on
the transference of the specified handle type, as described in
[Importing Fence State](#synchronization-fences-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFenceFdKHR-device-parameter) VUID-vkGetFenceFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetFenceFdKHR-pGetFdInfo-parameter) VUID-vkGetFenceFdKHR-pGetFdInfo-parameter

 `pGetFdInfo` **must** be a valid pointer to a valid [VkFenceGetFdInfoKHR](#VkFenceGetFdInfoKHR) structure

* 
[](#VUID-vkGetFenceFdKHR-pFd-parameter) VUID-vkGetFenceFdKHR-pFd-parameter

 `pFd` **must** be a valid pointer to an `int` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkFenceGetFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_fd
typedef struct VkFenceGetFdInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkExternalFenceHandleTypeFlagBits    handleType;
} VkFenceGetFdInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fence` is the fence from which state will be exported.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the file descriptor returned depend on the value of
`handleType`.
See [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) for a description of the
properties of the defined external fence handle types.

Valid Usage

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-01453) VUID-VkFenceGetFdInfoKHR-handleType-01453

`handleType` **must** have been included in
[VkExportFenceCreateInfo](#VkExportFenceCreateInfo)::`handleTypes` when `fence`’s
current payload was created

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-01454) VUID-VkFenceGetFdInfoKHR-handleType-01454

If `handleType` refers to a handle type with copy payload
transference semantics, `fence` **must** be signaled, or have an
associated [fence signal operation](#synchronization-fences-signaling)
pending execution

* 
[](#VUID-VkFenceGetFdInfoKHR-fence-01455) VUID-VkFenceGetFdInfoKHR-fence-01455

`fence` **must** not currently have its payload replaced by an imported
payload as described below in
[Importing Fence Payloads](#synchronization-fences-importing) unless
that imported payload’s handle type was included in
[VkExternalFenceProperties](capabilities.html#VkExternalFenceProperties)::`exportFromImportedHandleTypes` for
`handleType`

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-01456) VUID-VkFenceGetFdInfoKHR-handleType-01456

`handleType` **must** be defined as a POSIX file descriptor handle

Valid Usage (Implicit)

* 
[](#VUID-VkFenceGetFdInfoKHR-sType-sType) VUID-VkFenceGetFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FENCE_GET_FD_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFenceGetFdInfoKHR-pNext-pNext) VUID-VkFenceGetFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkFenceGetFdInfoKHR-fence-parameter) VUID-VkFenceGetFdInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](#VkFence) handle

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-parameter) VUID-VkFenceGetFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value

To destroy a fence, call:

// Provided by VK_VERSION_1_0
void vkDestroyFence(
    VkDevice                                    device,
    VkFence                                     fence,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the fence.

* 
`fence` is the handle of the fence to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyFence-fence-01120) VUID-vkDestroyFence-fence-01120

All [queue submission](devsandqueues.html#devsandqueues-submission) commands that refer
to `fence` **must** have completed execution

* 
[](#VUID-vkDestroyFence-fence-01121) VUID-vkDestroyFence-fence-01121

If `VkAllocationCallbacks` were provided when `fence` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyFence-fence-01122) VUID-vkDestroyFence-fence-01122

If no `VkAllocationCallbacks` were provided when `fence` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyFence-device-parameter) VUID-vkDestroyFence-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyFence-fence-parameter) VUID-vkDestroyFence-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be a valid [VkFence](#VkFence) handle

* 
[](#VUID-vkDestroyFence-pAllocator-parameter) VUID-vkDestroyFence-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyFence-fence-parent) VUID-vkDestroyFence-fence-parent

 If `fence` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `fence` **must** be externally synchronized

To query the status of a fence from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkGetFenceStatus(
    VkDevice                                    device,
    VkFence                                     fence);

* 
`device` is the logical device that owns the fence.

* 
`fence` is the handle of the fence to query.

Upon success, `vkGetFenceStatus` returns the status of the fence object,
with the following return codes:

| Status | Meaning |
| --- | --- |
| [VK_SUCCESS](fundamentals.html#VkResult) | The fence specified by `fence` is signaled. |
| [VK_NOT_READY](fundamentals.html#VkResult) | The fence specified by `fence` is unsignaled. |
| [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) | The device has been lost.  See [Lost Device](devsandqueues.html#devsandqueues-lost-device). |

If a [queue submission](devsandqueues.html#devsandqueues-submission) command is pending
execution, then the value returned by this command **may** immediately be out
of date.

If the device has been lost (see [Lost Device](devsandqueues.html#devsandqueues-lost-device)),
`vkGetFenceStatus` **may** return any of the above status codes.
If the device has been lost and `vkGetFenceStatus` is called repeatedly,
it will eventually return either [VK_SUCCESS](fundamentals.html#VkResult) or
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFenceStatus-device-parameter) VUID-vkGetFenceStatus-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetFenceStatus-fence-parameter) VUID-vkGetFenceStatus-fence-parameter

 `fence` **must** be a valid [VkFence](#VkFence) handle

* 
[](#VUID-vkGetFenceStatus-fence-parent) VUID-vkGetFenceStatus-fence-parent

 `fence` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](fundamentals.html#VkResult)

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

To set the state of fences to unsignaled from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkResetFences(
    VkDevice                                    device,
    uint32_t                                    fenceCount,
    const VkFence*                              pFences);

* 
`device` is the logical device that owns the fences.

* 
`fenceCount` is the number of fences to reset.

* 
`pFences` is a pointer to an array of fence handles to reset.

If any member of `pFences` currently has its
[payload imported](#synchronization-fences-importing) with temporary
permanence, that fence’s prior permanent payload is first restored.
The remaining operations described therefore operate on the restored
payload.

When [vkResetFences](#vkResetFences) is executed on the host, it defines a *fence
unsignal operation* for each fence, which resets the fence to the unsignaled
state.

If any member of `pFences` is already in the unsignaled state when
[vkResetFences](#vkResetFences) is executed, then [vkResetFences](#vkResetFences) has no effect on
that fence.

Valid Usage

* 
[](#VUID-vkResetFences-pFences-01123) VUID-vkResetFences-pFences-01123

Each element of `pFences` **must** not be currently associated with any
queue command that has not yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkResetFences-device-parameter) VUID-vkResetFences-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkResetFences-pFences-parameter) VUID-vkResetFences-pFences-parameter

 `pFences` **must** be a valid pointer to an array of `fenceCount` valid [VkFence](#VkFence) handles

* 
[](#VUID-vkResetFences-fenceCount-arraylength) VUID-vkResetFences-fenceCount-arraylength

 `fenceCount` **must** be greater than `0`

* 
[](#VUID-vkResetFences-pFences-parent) VUID-vkResetFences-pFences-parent

 Each element of `pFences` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to each member of `pFences` **must** be externally synchronized

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

When a fence is submitted to a queue as part of a
[queue submission](devsandqueues.html#devsandqueues-submission) command, it defines a memory
dependency on the batches that were submitted as part of that command, and
defines a *fence signal operation* which sets the fence to the signaled
state.

The first [synchronization scope](#synchronization-dependencies-scopes)
includes every batch submitted in the same [queue submission](devsandqueues.html#devsandqueues-submission) command.
Fence signal operations that are defined by [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)
or [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2)
additionally include in the first synchronization scope all commands that
occur earlier in [submission order](#synchronization-submission-order).
Fence signal operations that are defined by [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)
or [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2)
or [vkQueueBindSparse](sparsemem.html#vkQueueBindSparse)
additionally include in the first synchronization scope any semaphore and
fence signal operations that occur earlier in
[signal operation order](#synchronization-signal-operation-order).

The second [synchronization scope](#synchronization-dependencies-scopes)
only includes the fence signal operation.

The first [access scope](#synchronization-dependencies-access-scopes)
includes all memory access performed by the device.

The second [access scope](#synchronization-dependencies-access-scopes) is
empty.

To wait for one or more fences to enter the signaled state on the host,
call:

// Provided by VK_VERSION_1_0
VkResult vkWaitForFences(
    VkDevice                                    device,
    uint32_t                                    fenceCount,
    const VkFence*                              pFences,
    VkBool32                                    waitAll,
    uint64_t                                    timeout);

* 
`device` is the logical device that owns the fences.

* 
`fenceCount` is the number of fences to wait on.

* 
`pFences` is a pointer to an array of `fenceCount` fence
handles.

* 
`waitAll` is the condition that **must** be satisfied to successfully
unblock the wait.
If `waitAll` is [VK_TRUE](fundamentals.html#VK_TRUE), then the condition is that all fences
in `pFences` are signaled.
Otherwise, the condition is that at least one fence in `pFences` is
signaled.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

If the condition is satisfied when `vkWaitForFences` is called, then
`vkWaitForFences` returns immediately.
If the condition is not satisfied at the time `vkWaitForFences` is
called, then `vkWaitForFences` will block and wait until the condition
is satisfied or the `timeout` has expired, whichever is sooner.

If `timeout` is zero, then `vkWaitForFences` does not wait, but
simply returns the current state of the fences.
[VK_TIMEOUT](fundamentals.html#VkResult) will be returned in this case if the condition is not
satisfied, even though no actual wait was performed.

If the condition is satisfied before the `timeout` has expired,
`vkWaitForFences` returns [VK_SUCCESS](fundamentals.html#VkResult).
Otherwise, `vkWaitForFences` returns [VK_TIMEOUT](fundamentals.html#VkResult) after the
`timeout` has expired.

If device loss occurs (see [Lost Device](devsandqueues.html#devsandqueues-lost-device)) before
the timeout has expired, `vkWaitForFences` **must** return in finite time
with either [VK_SUCCESS](fundamentals.html#VkResult) or [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).

|  | While we guarantee that `vkWaitForFences` **must** return in finite time,
| --- | --- |
no guarantees are made that it returns immediately upon device loss.
However, the application can reasonably expect that the delay will be on the
order of seconds and that calling `vkWaitForFences` will not result in a
permanently (or seemingly permanently) dead process. |

Valid Usage (Implicit)

* 
[](#VUID-vkWaitForFences-device-parameter) VUID-vkWaitForFences-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWaitForFences-pFences-parameter) VUID-vkWaitForFences-pFences-parameter

 `pFences` **must** be a valid pointer to an array of `fenceCount` valid [VkFence](#VkFence) handles

* 
[](#VUID-vkWaitForFences-fenceCount-arraylength) VUID-vkWaitForFences-fenceCount-arraylength

 `fenceCount` **must** be greater than `0`

* 
[](#VUID-vkWaitForFences-pFences-parent) VUID-vkWaitForFences-pFences-parent

 Each element of `pFences` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

* 
[VK_TIMEOUT](fundamentals.html#VkResult)

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

An execution dependency is defined by waiting for a fence to become
signaled, either via [vkWaitForFences](#vkWaitForFences) or by polling on
[vkGetFenceStatus](#vkGetFenceStatus).

The first [synchronization scope](#synchronization-dependencies-scopes)
includes only the fence signal operation.

The second [synchronization scope](#synchronization-dependencies-scopes)
includes the host operations of [vkWaitForFences](#vkWaitForFences) or
[vkGetFenceStatus](#vkGetFenceStatus) indicating that the fence has become signaled.

|  | Signaling a fence and waiting on the host does not guarantee that the
| --- | --- |
results of memory accesses will be visible to the host, as the access scope
of a memory dependency defined by a fence only includes device access.
A [memory barrier](#synchronization-memory-barriers) or other memory
dependency **must** be used to guarantee this.
See the description of [host access types](#synchronization-host-access-types) for more information. |

Besides submitting a fence to a queue as part of a
[queue submission](devsandqueues.html#devsandqueues-submission) command, a fence **may** also be
signaled when a particular event occurs on a device or display.

To create a fence that will be signaled when an event occurs on a device,
call:

// Provided by VK_EXT_display_control
VkResult vkRegisterDeviceEventEXT(
    VkDevice                                    device,
    const VkDeviceEventInfoEXT*                 pDeviceEventInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFence*                                    pFence);

* 
`device` is a logical device on which the event **may** occur.

* 
`pDeviceEventInfo` is a pointer to a [VkDeviceEventInfoEXT](#VkDeviceEventInfoEXT)
structure describing the event of interest to the application.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pFence` is a pointer to a handle in which the resulting fence
object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkRegisterDeviceEventEXT-device-parameter) VUID-vkRegisterDeviceEventEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkRegisterDeviceEventEXT-pDeviceEventInfo-parameter) VUID-vkRegisterDeviceEventEXT-pDeviceEventInfo-parameter

 `pDeviceEventInfo` **must** be a valid pointer to a valid [VkDeviceEventInfoEXT](#VkDeviceEventInfoEXT) structure

* 
[](#VUID-vkRegisterDeviceEventEXT-pAllocator-parameter) VUID-vkRegisterDeviceEventEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkRegisterDeviceEventEXT-pFence-parameter) VUID-vkRegisterDeviceEventEXT-pFence-parameter

 `pFence` **must** be a valid pointer to a [VkFence](#VkFence) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDeviceEventInfoEXT` structure is defined as:

// Provided by VK_EXT_display_control
typedef struct VkDeviceEventInfoEXT {
    VkStructureType         sType;
    const void*             pNext;
    VkDeviceEventTypeEXT    deviceEvent;
} VkDeviceEventInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceEvent` is a [VkDeviceEventTypeEXT](#VkDeviceEventTypeEXT) value specifying when
the fence will be signaled.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceEventInfoEXT-sType-sType) VUID-VkDeviceEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_EVENT_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceEventInfoEXT-pNext-pNext) VUID-VkDeviceEventInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceEventInfoEXT-deviceEvent-parameter) VUID-VkDeviceEventInfoEXT-deviceEvent-parameter

 `deviceEvent` **must** be a valid [VkDeviceEventTypeEXT](#VkDeviceEventTypeEXT) value

Possible values of [VkDeviceEventInfoEXT](#VkDeviceEventInfoEXT)::`deviceEvent`, specifying
when a fence will be signaled, are:

// Provided by VK_EXT_display_control
typedef enum VkDeviceEventTypeEXT {
    VK_DEVICE_EVENT_TYPE_DISPLAY_HOTPLUG_EXT = 0,
} VkDeviceEventTypeEXT;

* 
[VK_DEVICE_EVENT_TYPE_DISPLAY_HOTPLUG_EXT](#VkDeviceEventTypeEXT) specifies that the fence
is signaled when a display is plugged into or unplugged from the
specified device.
Applications **can** use this notification to determine when they need to
re-enumerate the available displays on a device.

To create a fence that will be signaled when an event occurs on a
[VkDisplayKHR](VK_KHR_surface/wsi.html#VkDisplayKHR) object, call:

// Provided by VK_EXT_display_control
VkResult vkRegisterDisplayEventEXT(
    VkDevice                                    device,
    VkDisplayKHR                                display,
    const VkDisplayEventInfoEXT*                pDisplayEventInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFence*                                    pFence);

* 
`device` is a logical device associated with `display`

* 
`display` is the display on which the event **may** occur.

* 
`pDisplayEventInfo` is a pointer to a [VkDisplayEventInfoEXT](#VkDisplayEventInfoEXT)
structure describing the event of interest to the application.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pFence` is a pointer to a handle in which the resulting fence
object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkRegisterDisplayEventEXT-device-parameter) VUID-vkRegisterDisplayEventEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkRegisterDisplayEventEXT-display-parameter) VUID-vkRegisterDisplayEventEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VK_KHR_surface/wsi.html#VkDisplayKHR) handle

* 
[](#VUID-vkRegisterDisplayEventEXT-pDisplayEventInfo-parameter) VUID-vkRegisterDisplayEventEXT-pDisplayEventInfo-parameter

 `pDisplayEventInfo` **must** be a valid pointer to a valid [VkDisplayEventInfoEXT](#VkDisplayEventInfoEXT) structure

* 
[](#VUID-vkRegisterDisplayEventEXT-pAllocator-parameter) VUID-vkRegisterDisplayEventEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkRegisterDisplayEventEXT-pFence-parameter) VUID-vkRegisterDisplayEventEXT-pFence-parameter

 `pFence` **must** be a valid pointer to a [VkFence](#VkFence) handle

* 
[](#VUID-vkRegisterDisplayEventEXT-commonparent) VUID-vkRegisterDisplayEventEXT-commonparent

 Both of `device`, and `display` **must** have been created, allocated, or retrieved from the same [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDisplayEventInfoEXT` structure is defined as:

// Provided by VK_EXT_display_control
typedef struct VkDisplayEventInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkDisplayEventTypeEXT    displayEvent;
} VkDisplayEventInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayEvent` is a [VkDisplayEventTypeEXT](#VkDisplayEventTypeEXT) specifying when the
fence will be signaled.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayEventInfoEXT-sType-sType) VUID-VkDisplayEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_EVENT_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayEventInfoEXT-pNext-pNext) VUID-VkDisplayEventInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayEventInfoEXT-displayEvent-parameter) VUID-VkDisplayEventInfoEXT-displayEvent-parameter

 `displayEvent` **must** be a valid [VkDisplayEventTypeEXT](#VkDisplayEventTypeEXT) value

Possible values of [VkDisplayEventInfoEXT](#VkDisplayEventInfoEXT)::`displayEvent`,
specifying when a fence will be signaled, are:

// Provided by VK_EXT_display_control
typedef enum VkDisplayEventTypeEXT {
    VK_DISPLAY_EVENT_TYPE_FIRST_PIXEL_OUT_EXT = 0,
} VkDisplayEventTypeEXT;

* 
[VK_DISPLAY_EVENT_TYPE_FIRST_PIXEL_OUT_EXT](#VkDisplayEventTypeEXT) specifies that the fence
is signaled when the first pixel of the next display refresh cycle
leaves the display engine for the display.

Applications **can** import a fence payload into an existing fence using an
external fence handle.
The effects of the import operation will be either temporary or permanent,
as specified by the application.
If the import is temporary, the fence will be *restored* to its permanent
state the next time that fence is passed to [vkResetFences](#vkResetFences).

|  | Restoring a fence to its prior permanent payload is a distinct operation
| --- | --- |
from resetting a fence payload.
See [vkResetFences](#vkResetFences) for more detail. |

Performing a subsequent temporary import on a fence before resetting it has
no effect on this requirement; the next unsignal of the fence **must** still
restore its last permanent state.
A permanent payload import behaves as if the target fence was destroyed, and
a new fence was created with the same handle but the imported payload.
Because importing a fence payload temporarily or permanently detaches the
existing payload from a fence, similar usage restrictions to those applied
to `vkDestroyFence` are applied to any command that imports a fence
payload.
Which of these import types is used is referred to as the import operation’s
*permanence*.
Each handle type supports either one or both types of permanence.

The implementation **must** perform the import operation by either referencing
or copying the payload referred to by the specified external fence handle,
depending on the handle’s type.
The import method used is referred to as the handle type’s *transference*.
When using handle types with reference transference, importing a payload to
a fence adds the fence to the set of all fences sharing that payload.
This set includes the fence from which the payload was exported.
Fence signaling, waiting, and resetting operations performed on any fence in
the set **must** behave as if the set were a single fence.
Importing a payload using handle types with copy transference creates a
duplicate copy of the payload at the time of import, but makes no further
reference to it.
Fence signaling, waiting, and resetting operations performed on the target
of copy imports **must** not affect any other fence or payload.

Export operations have the same transference as the specified handle type’s
import operations.
Additionally, exporting a fence payload to a handle with copy transference
has the same side effects on the source fence’s payload as executing a fence
reset operation.
If the fence was using a temporarily imported payload, the fence’s prior
permanent payload will be restored.

|  | The
| --- | --- |
tables
[Handle Types Supported by `VkImportFenceWin32HandleInfoKHR`](#synchronization-fence-handletypes-win32)
and
[Handle Types Supported by `VkImportFenceFdInfoKHR`](#synchronization-fence-handletypes-fd)
define
the permanence and transference of each handle type. |

[External synchronization](fundamentals.html#fundamentals-threadingbehavior) allows
implementations to modify an object’s internal state, i.e. payload, without
internal synchronization.
However, for fences sharing a payload across processes, satisfying the
external synchronization requirements of `VkFence` parameters as if all
fences in the set were the same object is sometimes infeasible.
Satisfying valid usage constraints on the state of a fence would similarly
require impractical coordination or levels of trust between processes.
Therefore, these constraints only apply to a specific fence handle, not to
its payload.
For distinct fence objects which share a payload:

* 
If multiple commands which queue a signal operation, or which unsignal a
fence, are called concurrently, behavior will be as if the commands were
called in an arbitrary sequential order.

* 
If a queue submission command is called with a fence that is sharing a
payload, and the payload is already associated with another queue
command that has not yet completed execution, either one or both of the
commands will cause the fence to become signaled when they complete
execution.

* 
If a fence payload is reset while it is associated with a queue command
that has not yet completed execution, the payload will become
unsignaled, but **may** become signaled again when the command completes
execution.

* 
In the preceding cases, any of the devices associated with the fences
sharing the payload **may** be lost, or any of the queue submission or
fence reset commands **may** return [VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult).

Other than these non-deterministic results, behavior is well defined.
In particular:

* 
The implementation **must** not crash or enter an internally inconsistent
state where future valid Vulkan commands might cause **undefined** results,

* 
Timeouts on future wait commands on fences sharing the payload **must** be
effective.

|  | These rules allow processes to synchronize access to shared memory without
| --- | --- |
trusting each other.
However, such processes must still be cautious not to use the shared fence
for more than synchronizing access to the shared memory.
For example, a process should not use a fence with shared payload to tell
when commands it submitted to a queue have completed and objects used by
those commands may be destroyed, since the other process can accidentally or
maliciously cause the fence to signal before the commands actually complete. |

When a fence is using an imported payload, its
[VkExportFenceCreateInfo](#VkExportFenceCreateInfo)::`handleTypes` value is specified when
creating the fence from which the payload was exported, rather than
specified when creating the fence.
Additionally,
[VkExternalFenceProperties](capabilities.html#VkExternalFenceProperties)::`exportFromImportedHandleTypes`
restricts which handle types **can** be exported from such a fence based on the
specific handle type used to import the current payload.
Passing a fence to [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR) is equivalent to temporarily
importing a fence payload to that fence.

|  | Because the exportable handle types of an imported fence correspond to its
| --- | --- |
current imported payload, and [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR) behaves the same
as a temporary import operation for which the source fence is opaque to the
application, applications have no way of determining whether any external
handle types **can** be exported from a fence in this state.
Therefore, applications **must** not attempt to export handles from fences
using a temporarily imported payload from [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR). |

When importing a fence payload, it is the responsibility of the application
to ensure the external handles meet all valid usage requirements.
However, implementations **must** perform sufficient validation of external
handles to ensure that the operation results in a valid fence which will not
cause program termination, device loss, queue stalls, host thread stalls, or
corruption of other resources when used as allowed according to its import
parameters.
If the external handle provided does not meet these requirements, the
implementation **must** fail the fence payload import operation with the error
code [VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult).

To import a fence payload from a Windows handle, call:

// Provided by VK_KHR_external_fence_win32
VkResult vkImportFenceWin32HandleKHR(
    VkDevice                                    device,
    const VkImportFenceWin32HandleInfoKHR*      pImportFenceWin32HandleInfo);

* 
`device` is the logical device that created the fence.

* 
`pImportFenceWin32HandleInfo` is a pointer to a
[VkImportFenceWin32HandleInfoKHR](#VkImportFenceWin32HandleInfoKHR) structure specifying the fence and
import parameters.

Importing a fence payload from Windows handles does not transfer ownership
of the handle to the Vulkan implementation.
For handle types defined as NT handles, the application **must** release
ownership using the `CloseHandle` system call when the handle is no
longer needed.

Applications **can** import the same fence payload into multiple instances of
Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportFenceWin32HandleKHR-fence-04448) VUID-vkImportFenceWin32HandleKHR-fence-04448

`fence` **must** not be associated with any queue command that has not
yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportFenceWin32HandleKHR-device-parameter) VUID-vkImportFenceWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkImportFenceWin32HandleKHR-pImportFenceWin32HandleInfo-parameter) VUID-vkImportFenceWin32HandleKHR-pImportFenceWin32HandleInfo-parameter

 `pImportFenceWin32HandleInfo` **must** be a valid pointer to a valid [VkImportFenceWin32HandleInfoKHR](#VkImportFenceWin32HandleInfoKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImportFenceWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_win32
typedef struct VkImportFenceWin32HandleInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkFenceImportFlags                   flags;
    VkExternalFenceHandleTypeFlagBits    handleType;
    HANDLE                               handle;
    LPCWSTR                              name;
} VkImportFenceWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fence` is the fence into which the state will be imported.

* 
`flags` is a bitmask of [VkFenceImportFlagBits](#VkFenceImportFlagBits) specifying
additional parameters for the fence payload import operation.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value
specifying the type of `handle`.

* 
`handle` is `NULL` or the external handle to import.

* 
`name` is `NULL` or a null-terminated UTF-16 string naming the
underlying synchronization primitive to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |

Valid Usage

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-handleType-01457) VUID-VkImportFenceWin32HandleInfoKHR-handleType-01457

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportFenceWin32HandleInfoKHR`](#synchronization-fence-handletypes-win32) table

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-handleType-01459) VUID-VkImportFenceWin32HandleInfoKHR-handleType-01459

If `handleType` is not
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR), `name` **must**
be `NULL`

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-handleType-01460) VUID-VkImportFenceWin32HandleInfoKHR-handleType-01460

If `handle` is `NULL`, `name` **must** name a valid synchronization
primitive of the type specified by `handleType`

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-handleType-01461) VUID-VkImportFenceWin32HandleInfoKHR-handleType-01461

If `name` is `NULL`, `handle` **must** be a valid handle of the
type specified by `handleType`

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-handle-01462) VUID-VkImportFenceWin32HandleInfoKHR-handle-01462

If `handle` is not `NULL`, `name` **must** be `NULL`

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-handle-01539) VUID-VkImportFenceWin32HandleInfoKHR-handle-01539

If `handle` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external fence handle types compatibility](capabilities.html#external-fence-handle-types-compatibility)

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-name-01540) VUID-VkImportFenceWin32HandleInfoKHR-name-01540

If `name` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external fence handle types compatibility](capabilities.html#external-fence-handle-types-compatibility)

Valid Usage (Implicit)

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-sType-sType) VUID-VkImportFenceWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_FENCE_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-pNext-pNext) VUID-VkImportFenceWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-fence-parameter) VUID-VkImportFenceWin32HandleInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](#VkFence) handle

* 
[](#VUID-VkImportFenceWin32HandleInfoKHR-flags-parameter) VUID-VkImportFenceWin32HandleInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkFenceImportFlagBits](#VkFenceImportFlagBits) values

Host Synchronization

* 
Host access to `fence` **must** be externally synchronized

To import a fence payload from a POSIX file descriptor, call:

// Provided by VK_KHR_external_fence_fd
VkResult vkImportFenceFdKHR(
    VkDevice                                    device,
    const VkImportFenceFdInfoKHR*               pImportFenceFdInfo);

* 
`device` is the logical device that created the fence.

* 
`pImportFenceFdInfo` is a pointer to a [VkImportFenceFdInfoKHR](#VkImportFenceFdInfoKHR)
structure specifying the fence and import parameters.

Importing a fence payload from a file descriptor transfers ownership of the
file descriptor from the application to the Vulkan implementation.
The application **must** not perform any operations on the file descriptor
after a successful import.

Applications **can** import the same fence payload into multiple instances of
Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportFenceFdKHR-fence-01463) VUID-vkImportFenceFdKHR-fence-01463

`fence` **must** not be associated with any queue command that has not
yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportFenceFdKHR-device-parameter) VUID-vkImportFenceFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkImportFenceFdKHR-pImportFenceFdInfo-parameter) VUID-vkImportFenceFdKHR-pImportFenceFdInfo-parameter

 `pImportFenceFdInfo` **must** be a valid pointer to a valid [VkImportFenceFdInfoKHR](#VkImportFenceFdInfoKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImportFenceFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_fd
typedef struct VkImportFenceFdInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkFenceImportFlags                   flags;
    VkExternalFenceHandleTypeFlagBits    handleType;
    int                                  fd;
} VkImportFenceFdInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fence` is the fence into which the payload will be imported.

* 
`flags` is a bitmask of [VkFenceImportFlagBits](#VkFenceImportFlagBits) specifying
additional parameters for the fence payload import operation.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value
specifying the type of `fd`.

* 
`fd` is the external handle to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR) | Copy | Temporary |

Valid Usage

* 
[](#VUID-VkImportFenceFdInfoKHR-handleType-01464) VUID-VkImportFenceFdInfoKHR-handleType-01464

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportFenceFdInfoKHR`](#synchronization-fence-handletypes-fd) table

* 
[](#VUID-VkImportFenceFdInfoKHR-fd-01541) VUID-VkImportFenceFdInfoKHR-fd-01541

`fd` **must** obey any requirements listed for `handleType` in
[external fence handle types    compatibility](capabilities.html#external-fence-handle-types-compatibility)

* 
[](#VUID-VkImportFenceFdInfoKHR-handleType-07306) VUID-VkImportFenceFdInfoKHR-handleType-07306

If `handleType` refers to a handle type with copy payload
transference semantics, `flags` **must** contain
[VK_FENCE_IMPORT_TEMPORARY_BIT](#VkFenceImportFlagBitsKHR)

If `handleType` is [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR), the
special value `-1` for `fd` is treated like a valid sync file descriptor
referring to an object that has already signaled.
The import operation will succeed and the `VkFence` will have a
temporarily imported payload as if a valid file descriptor had been
provided.

|  | This special behavior for importing an invalid sync file descriptor allows
| --- | --- |
easier interoperability with other system APIs which use the convention that
an invalid sync file descriptor represents work that has already completed
and does not need to be waited for.
It is consistent with the option for implementations to return a `-1` file
descriptor when exporting a [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalFenceHandleTypeFlagBitsKHR)
from a `VkFence` which is signaled. |

Valid Usage (Implicit)

* 
[](#VUID-VkImportFenceFdInfoKHR-sType-sType) VUID-VkImportFenceFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_FENCE_FD_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportFenceFdInfoKHR-pNext-pNext) VUID-VkImportFenceFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportFenceFdInfoKHR-fence-parameter) VUID-VkImportFenceFdInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](#VkFence) handle

* 
[](#VUID-VkImportFenceFdInfoKHR-flags-parameter) VUID-VkImportFenceFdInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkFenceImportFlagBits](#VkFenceImportFlagBits) values

* 
[](#VUID-VkImportFenceFdInfoKHR-handleType-parameter) VUID-VkImportFenceFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](capabilities.html#VkExternalFenceHandleTypeFlagBits) value

Host Synchronization

* 
Host access to `fence` **must** be externally synchronized

Bits which **can** be set in

* 
[VkImportFenceWin32HandleInfoKHR](#VkImportFenceWin32HandleInfoKHR)::`flags`

* 
[VkImportFenceFdInfoKHR](#VkImportFenceFdInfoKHR)::`flags`

specifying additional parameters of a fence import operation are:

// Provided by VK_VERSION_1_1
typedef enum VkFenceImportFlagBits {
    VK_FENCE_IMPORT_TEMPORARY_BIT = 0x00000001,
  // Provided by VK_KHR_external_fence
    VK_FENCE_IMPORT_TEMPORARY_BIT_KHR = VK_FENCE_IMPORT_TEMPORARY_BIT,
} VkFenceImportFlagBits;

// Provided by VK_KHR_external_fence
// Equivalent to VkFenceImportFlagBits
typedef VkFenceImportFlagBits VkFenceImportFlagBitsKHR;

* 
[VK_FENCE_IMPORT_TEMPORARY_BIT](#VkFenceImportFlagBitsKHR) specifies that the fence payload
will be imported only temporarily, as described in
[Importing Fence Payloads](#synchronization-fences-importing),
regardless of the permanence of `handleType`.

// Provided by VK_VERSION_1_1
typedef VkFlags VkFenceImportFlags;

// Provided by VK_KHR_external_fence
// Equivalent to VkFenceImportFlags
typedef VkFenceImportFlags VkFenceImportFlagsKHR;

`VkFenceImportFlags` is a bitmask type for setting a mask of zero or
more [VkFenceImportFlagBits](#VkFenceImportFlagBits).

Semaphores are a synchronization primitive that **can** be used to insert a
dependency
between queue operations or between a queue operation and the host.
[Binary semaphores](../appendices/glossary.html#glossary) have two states - signaled and unsignaled.
[Timeline semaphores](../appendices/glossary.html#glossary) have a strictly increasing 64-bit unsigned
integer payload and are signaled with respect to a particular reference
value.
A semaphore **can** be signaled after execution of a queue operation is
completed, and a queue operation **can** wait for a semaphore to become
signaled before it begins execution.
A timeline semaphore **can** additionally be signaled from the host with the
[vkSignalSemaphore](#vkSignalSemaphore) command and waited on from the host with the
[vkWaitSemaphores](#vkWaitSemaphores) command.

The internal data of a semaphore **may** include a reference to any resources
and pending work associated with signal or unsignal operations performed on
that semaphore object, collectively referred to as the semaphore’s
*payload*.
Mechanisms to import and export that internal data to and from semaphores
are provided [below](#VkExportSemaphoreCreateInfo).
These mechanisms indirectly enable applications to share semaphore state
between two or more semaphores and other synchronization primitives across
process and API boundaries.

Semaphores are represented by `VkSemaphore` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSemaphore)

To create a semaphore, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateSemaphore(
    VkDevice                                    device,
    const VkSemaphoreCreateInfo*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSemaphore*                                pSemaphore);

* 
`device` is the logical device that creates the semaphore.

* 
`pCreateInfo` is a pointer to a [VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)
structure containing information about how the semaphore is to be
created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pSemaphore` is a pointer to a handle in which the resulting
semaphore object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSemaphore-device-parameter) VUID-vkCreateSemaphore-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateSemaphore-pCreateInfo-parameter) VUID-vkCreateSemaphore-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo) structure

* 
[](#VUID-vkCreateSemaphore-pAllocator-parameter) VUID-vkCreateSemaphore-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateSemaphore-pSemaphore-parameter) VUID-vkCreateSemaphore-pSemaphore-parameter

 `pSemaphore` **must** be a valid pointer to a [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-vkCreateSemaphore-device-queuecount) VUID-vkCreateSemaphore-device-queuecount

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

The `VkSemaphoreCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSemaphoreCreateInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkSemaphoreCreateFlags    flags;
} VkSemaphoreCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

Valid Usage

* 
[](#VUID-VkSemaphoreCreateInfo-pNext-06789) VUID-VkSemaphoreCreateInfo-pNext-06789

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreCreateInfo-sType-sType) VUID-VkSemaphoreCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreCreateInfo-pNext-pNext) VUID-VkSemaphoreCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT), [VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo), [VkExportSemaphoreWin32HandleInfoKHR](#VkExportSemaphoreWin32HandleInfoKHR), [VkImportMetalSharedEventInfoEXT](memory.html#VkImportMetalSharedEventInfoEXT), [VkQueryLowLatencySupportNV](#VkQueryLowLatencySupportNV), or [VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)

* 
[](#VUID-VkSemaphoreCreateInfo-sType-unique) VUID-VkSemaphoreCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT)

* 
[](#VUID-VkSemaphoreCreateInfo-flags-zerobitmask) VUID-VkSemaphoreCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_VERSION_1_0
typedef VkFlags VkSemaphoreCreateFlags;

`VkSemaphoreCreateFlags` is a bitmask type for setting a mask, but is
currently reserved for future use.

The `VkSemaphoreTypeCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSemaphoreTypeCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkSemaphoreType    semaphoreType;
    uint64_t           initialValue;
} VkSemaphoreTypeCreateInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreTypeCreateInfo
typedef VkSemaphoreTypeCreateInfo VkSemaphoreTypeCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphoreType` is a [VkSemaphoreType](#VkSemaphoreType) value specifying the type
of the semaphore.

* 
`initialValue` is the initial payload value if `semaphoreType`
is [VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR).

To create a semaphore of a specific type, add a
`VkSemaphoreTypeCreateInfo` structure to the
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)::`pNext` chain.

If no `VkSemaphoreTypeCreateInfo` structure is included in the
`pNext` chain of [VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo), then the created semaphore
will have a default [VkSemaphoreType](#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR).

Valid Usage

* 
[](#VUID-VkSemaphoreTypeCreateInfo-timelineSemaphore-03252) VUID-VkSemaphoreTypeCreateInfo-timelineSemaphore-03252

If the [`timelineSemaphore`](features.html#features-timelineSemaphore) feature
is not enabled, `semaphoreType` **must** not equal
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

* 
[](#VUID-VkSemaphoreTypeCreateInfo-semaphoreType-03279) VUID-VkSemaphoreTypeCreateInfo-semaphoreType-03279

If `semaphoreType` is [VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR),
`initialValue` **must** be zero

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreTypeCreateInfo-sType-sType) VUID-VkSemaphoreTypeCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreTypeCreateInfo-semaphoreType-parameter) VUID-VkSemaphoreTypeCreateInfo-semaphoreType-parameter

 `semaphoreType` **must** be a valid [VkSemaphoreType](#VkSemaphoreType) value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceExternalSemaphoreInfo](capabilities.html#VkPhysicalDeviceExternalSemaphoreInfo)

* 
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)

Possible values of [VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)::`semaphoreType`,
specifying the type of a semaphore, are:

// Provided by VK_VERSION_1_2
typedef enum VkSemaphoreType {
    VK_SEMAPHORE_TYPE_BINARY = 0,
    VK_SEMAPHORE_TYPE_TIMELINE = 1,
  // Provided by VK_KHR_timeline_semaphore
    VK_SEMAPHORE_TYPE_BINARY_KHR = VK_SEMAPHORE_TYPE_BINARY,
  // Provided by VK_KHR_timeline_semaphore
    VK_SEMAPHORE_TYPE_TIMELINE_KHR = VK_SEMAPHORE_TYPE_TIMELINE,
} VkSemaphoreType;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreType
typedef VkSemaphoreType VkSemaphoreTypeKHR;

* 
[VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR) specifies a *binary semaphore* type that
has a boolean payload indicating whether the semaphore is currently
signaled or unsignaled.
When created, the semaphore is in the unsignaled state.

* 
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR) specifies a *timeline semaphore* type
that has a strictly increasing 64-bit unsigned integer payload
indicating whether the semaphore is signaled with respect to a
particular reference value.
When created, the semaphore payload has the value given by the
`initialValue` field of [VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo).

To create a semaphore whose payload **can** be exported to external handles,
add a [VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo) structure to the `pNext` chain
of the [VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo) structure.
The `VkExportSemaphoreCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExportSemaphoreCreateInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalSemaphoreHandleTypeFlags    handleTypes;
} VkExportSemaphoreCreateInfo;

// Provided by VK_KHR_external_semaphore
// Equivalent to VkExportSemaphoreCreateInfo
typedef VkExportSemaphoreCreateInfo VkExportSemaphoreCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is a bitmask of
[VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) specifying one or more
semaphore handle types the application **can** export from the resulting
semaphore.
The application **can** request multiple handle types for the same
semaphore.

Valid Usage

* 
[](#VUID-VkExportSemaphoreCreateInfo-handleTypes-01124) VUID-VkExportSemaphoreCreateInfo-handleTypes-01124

The bits in `handleTypes` **must** be supported and compatible, as
reported by [VkExternalSemaphoreProperties](capabilities.html#VkExternalSemaphoreProperties)

Valid Usage (Implicit)

* 
[](#VUID-VkExportSemaphoreCreateInfo-sType-sType) VUID-VkExportSemaphoreCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportSemaphoreCreateInfo-handleTypes-parameter) VUID-VkExportSemaphoreCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)

To specify additional attributes of NT handles exported from a semaphore,
add a `VkExportSemaphoreWin32HandleInfoKHR` structure to the `pNext`
chain of the [VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo) structure.
The `VkExportSemaphoreWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkExportSemaphoreWin32HandleInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
    LPCWSTR                       name;
} VkExportSemaphoreWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pAttributes` is a pointer to a Windows `SECURITY_ATTRIBUTES`
structure specifying security attributes of the handle.

* 
`dwAccess` is a `DWORD` specifying access rights of the handle.

* 
`name` is a null-terminated UTF-16 string to associate with the
underlying synchronization primitive referenced by NT handles exported
from the created semaphore.

If [VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo) is not included in the same `pNext`
chain, this structure is ignored.

If [VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo) is included in the `pNext` chain of
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo) with a Windows `handleType`, but either
`VkExportSemaphoreWin32HandleInfoKHR` is not included in the `pNext`
chain, or it is included but `pAttributes` is `NULL`, default security
descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights used depend on
the handle type.

For handles of the following types:

[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR)

The implementation **must** ensure the access rights allow both signal and wait
operations on the semaphore.

For handles of the following types:

[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR)

The access rights **must** be:

`GENERIC_ALL`

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage

* 
[](#VUID-VkExportSemaphoreWin32HandleInfoKHR-handleTypes-01125) VUID-VkExportSemaphoreWin32HandleInfoKHR-handleTypes-01125

If [VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo)::`handleTypes` does not include
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR),
`VkExportSemaphoreWin32HandleInfoKHR` **must** not be included in the
`pNext` chain of [VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)

Valid Usage (Implicit)

* 
[](#VUID-VkExportSemaphoreWin32HandleInfoKHR-sType-sType) VUID-VkExportSemaphoreWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportSemaphoreWin32HandleInfoKHR-pAttributes-parameter) VUID-VkExportSemaphoreWin32HandleInfoKHR-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)

To export a Windows handle representing the payload of a semaphore, call:

// Provided by VK_KHR_external_semaphore_win32
VkResult vkGetSemaphoreWin32HandleKHR(
    VkDevice                                    device,
    const VkSemaphoreGetWin32HandleInfoKHR*     pGetWin32HandleInfo,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that created the semaphore being
exported.

* 
`pGetWin32HandleInfo` is a pointer to a
[VkSemaphoreGetWin32HandleInfoKHR](#VkSemaphoreGetWin32HandleInfoKHR) structure containing parameters
of the export operation.

* 
`pHandle` will return the Windows handle representing the semaphore
state.

For handle types defined as NT handles, the handles returned by
`vkGetSemaphoreWin32HandleKHR` are owned by the application.
To avoid leaking resources, the application **must** release ownership of them
using the `CloseHandle` system call when they are no longer needed.

Exporting a Windows handle from a semaphore **may** have side effects depending
on the transference of the specified handle type, as described in
[Importing Semaphore Payloads](#synchronization-semaphores-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreWin32HandleKHR-device-parameter) VUID-vkGetSemaphoreWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSemaphoreWin32HandleKHR-pGetWin32HandleInfo-parameter) VUID-vkGetSemaphoreWin32HandleKHR-pGetWin32HandleInfo-parameter

 `pGetWin32HandleInfo` **must** be a valid pointer to a valid [VkSemaphoreGetWin32HandleInfoKHR](#VkSemaphoreGetWin32HandleInfoKHR) structure

* 
[](#VUID-vkGetSemaphoreWin32HandleKHR-pHandle-parameter) VUID-vkGetSemaphoreWin32HandleKHR-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `HANDLE` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkSemaphoreGetWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkSemaphoreGetWin32HandleInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkSemaphoreGetWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore from which state will be exported.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) for a description of the
properties of the defined external semaphore handle types.

Valid Usage

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01126) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01126

`handleType` **must** have been included in
[VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo)::`handleTypes` when the
`semaphore`’s current payload was created

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01127) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01127

If `handleType` is defined as an NT handle,
[vkGetSemaphoreWin32HandleKHR](#vkGetSemaphoreWin32HandleKHR) **must** be called no more than once for
each valid unique combination of `semaphore` and `handleType`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-01128) VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-01128

`semaphore` **must** not currently have its payload replaced by an
imported payload as described below in
[Importing Semaphore Payloads](#synchronization-semaphores-importing)
unless that imported payload’s handle type was included in
[VkExternalSemaphoreProperties](capabilities.html#VkExternalSemaphoreProperties)::`exportFromImportedHandleTypes`
for `handleType`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01129) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01129

If `handleType` refers to a handle type with copy payload
transference semantics, as defined below in
[Importing Semaphore Payloads](#synchronization-semaphores-importing),
there **must** be no queue waiting on `semaphore`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01130) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01130

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** be signaled, or have an
associated [semaphore signal    operation](#synchronization-semaphores-signaling) pending execution

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01131) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01131

`handleType` **must** be defined as an NT handle or a global share
handle

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-sType-sType) VUID-VkSemaphoreGetWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_GET_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-pNext-pNext) VUID-VkSemaphoreGetWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-parameter) VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-parameter) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value

The `VkQueryLowLatencySupportNV` structure is defined as:

// Provided by VK_NV_low_latency
typedef struct VkQueryLowLatencySupportNV {
    VkStructureType    sType;
    const void*        pNext;
    void*              pQueriedLowLatencyData;
} VkQueryLowLatencySupportNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pQueriedLowLatencyData` is used for NVIDIA Reflex Support.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryLowLatencySupportNV-sType-sType) VUID-VkQueryLowLatencySupportNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_LOW_LATENCY_SUPPORT_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueryLowLatencySupportNV-pQueriedLowLatencyData-parameter) VUID-VkQueryLowLatencySupportNV-pQueriedLowLatencyData-parameter

 `pQueriedLowLatencyData` **must** be a pointer value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)

To export a POSIX file descriptor representing the payload of a semaphore,
call:

// Provided by VK_KHR_external_semaphore_fd
VkResult vkGetSemaphoreFdKHR(
    VkDevice                                    device,
    const VkSemaphoreGetFdInfoKHR*              pGetFdInfo,
    int*                                        pFd);

* 
`device` is the logical device that created the semaphore being
exported.

* 
`pGetFdInfo` is a pointer to a [VkSemaphoreGetFdInfoKHR](#VkSemaphoreGetFdInfoKHR)
structure containing parameters of the export operation.

* 
`pFd` will return the file descriptor representing the semaphore
payload.

Each call to `vkGetSemaphoreFdKHR` **must** create a new file descriptor
and transfer ownership of it to the application.
To avoid leaking resources, the application **must** release ownership of the
file descriptor when it is no longer needed.

|  | Ownership can be released in many ways.
| --- | --- |
For example, the application can call `close`() on the file descriptor,
or transfer ownership back to Vulkan by using the file descriptor to import
a semaphore payload. |

Where supported by the operating system, the implementation **must** set the
file descriptor to be closed automatically when an `execve` system call
is made.

Exporting a file descriptor from a semaphore **may** have side effects
depending on the transference of the specified handle type, as described in
[Importing Semaphore State](#synchronization-semaphores-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreFdKHR-device-parameter) VUID-vkGetSemaphoreFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSemaphoreFdKHR-pGetFdInfo-parameter) VUID-vkGetSemaphoreFdKHR-pGetFdInfo-parameter

 `pGetFdInfo` **must** be a valid pointer to a valid [VkSemaphoreGetFdInfoKHR](#VkSemaphoreGetFdInfoKHR) structure

* 
[](#VUID-vkGetSemaphoreFdKHR-pFd-parameter) VUID-vkGetSemaphoreFdKHR-pFd-parameter

 `pFd` **must** be a valid pointer to an `int` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkSemaphoreGetFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_fd
typedef struct VkSemaphoreGetFdInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkSemaphoreGetFdInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore from which state will be exported.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the file descriptor returned depend on the value of
`handleType`.
See [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) for a description of the
properties of the defined external semaphore handle types.

Valid Usage

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01132) VUID-VkSemaphoreGetFdInfoKHR-handleType-01132

`handleType` **must** have been included in
[VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo)::`handleTypes` when
`semaphore`’s current payload was created

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-semaphore-01133) VUID-VkSemaphoreGetFdInfoKHR-semaphore-01133

`semaphore` **must** not currently have its payload replaced by an
imported payload as described below in
[Importing Semaphore Payloads](#synchronization-semaphores-importing)
unless that imported payload’s handle type was included in
[VkExternalSemaphoreProperties](capabilities.html#VkExternalSemaphoreProperties)::`exportFromImportedHandleTypes`
for `handleType`

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01134) VUID-VkSemaphoreGetFdInfoKHR-handleType-01134

If `handleType` refers to a handle type with copy payload
transference semantics, as defined below in
[Importing Semaphore Payloads](#synchronization-semaphores-importing),
there **must** be no queue waiting on `semaphore`

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01135) VUID-VkSemaphoreGetFdInfoKHR-handleType-01135

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** be signaled, or have an
associated [semaphore signal    operation](#synchronization-semaphores-signaling) pending execution

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01136) VUID-VkSemaphoreGetFdInfoKHR-handleType-01136

`handleType` **must** be defined as a POSIX file descriptor handle

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-03253) VUID-VkSemaphoreGetFdInfoKHR-handleType-03253

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** have been created with a
[VkSemaphoreType](#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR)

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-03254) VUID-VkSemaphoreGetFdInfoKHR-handleType-03254

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** have an associated
semaphore signal operation that has been submitted for execution and any
semaphore signal operations on which it depends **must** have also been
submitted for execution

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-sType-sType) VUID-VkSemaphoreGetFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_GET_FD_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-pNext-pNext) VUID-VkSemaphoreGetFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-semaphore-parameter) VUID-VkSemaphoreGetFdInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-parameter) VUID-VkSemaphoreGetFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value

To export a Zircon event handle representing the payload of a semaphore,
call:

// Provided by VK_FUCHSIA_external_semaphore
VkResult vkGetSemaphoreZirconHandleFUCHSIA(
    VkDevice                                    device,
    const VkSemaphoreGetZirconHandleInfoFUCHSIA* pGetZirconHandleInfo,
    zx_handle_t*                                pZirconHandle);

* 
`device` is the logical device that created the semaphore being
exported.

* 
`pGetZirconHandleInfo` is a pointer to a
[VkSemaphoreGetZirconHandleInfoFUCHSIA](#VkSemaphoreGetZirconHandleInfoFUCHSIA) structure containing
parameters of the export operation.

* 
`pZirconHandle` will return the Zircon event handle representing the
semaphore payload.

Each call to `vkGetSemaphoreZirconHandleFUCHSIA` **must** create a Zircon
event handle and transfer ownership of it to the application.
To avoid leaking resources, the application **must** release ownership of the
Zircon event handle when it is no longer needed.

|  | Ownership can be released in many ways.
| --- | --- |
For example, the application can call zx_handle_close() on the file
descriptor, or transfer ownership back to Vulkan by using the file
descriptor to import a semaphore payload. |

Exporting a Zircon event handle from a semaphore **may** have side effects
depending on the transference of the specified handle type, as described in
[Importing Semaphore State](#synchronization-semaphores-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreZirconHandleFUCHSIA-device-parameter) VUID-vkGetSemaphoreZirconHandleFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSemaphoreZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter) VUID-vkGetSemaphoreZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter

 `pGetZirconHandleInfo` **must** be a valid pointer to a valid [VkSemaphoreGetZirconHandleInfoFUCHSIA](#VkSemaphoreGetZirconHandleInfoFUCHSIA) structure

* 
[](#VUID-vkGetSemaphoreZirconHandleFUCHSIA-pZirconHandle-parameter) VUID-vkGetSemaphoreZirconHandleFUCHSIA-pZirconHandle-parameter

 `pZirconHandle` **must** be a valid pointer to a `zx_handle_t` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkSemaphoreGetZirconHandleInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_semaphore
typedef struct VkSemaphoreGetZirconHandleInfoFUCHSIA {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkSemaphoreGetZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore from which state will be exported.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the Zircon event handle returned depend on the value of
`handleType`.
See [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) for a description of the
properties of the defined external semaphore handle types.

Valid Usage

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04758) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04758

`handleType` **must** have been included in
[VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo)::`handleTypes` when
`semaphore`’s current payload was created

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04759) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04759

`semaphore` **must** not currently have its payload replaced by an
imported payload as described below in
[Importing Semaphore Payloads](#synchronization-semaphores-importing)
unless that imported payload’s handle type was included in
[VkExternalSemaphoreProperties](capabilities.html#VkExternalSemaphoreProperties)::`exportFromImportedHandleTypes`
for `handleType`

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04760) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04760

If `handleType` refers to a handle type with copy payload
transference semantics, as defined below in
[Importing Semaphore Payloads](#synchronization-semaphores-importing),
there **must** be no queue waiting on `semaphore`

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04761) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04761

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** be signaled, or have an
associated [semaphore signal    operation](#synchronization-semaphores-signaling) pending execution

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04762) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04762

`handleType` **must** be defined as a Zircon event handle

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04763) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04763

`semaphore` **must** have been created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-sType-sType) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_GET_ZIRCON_HANDLE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-pNext-pNext) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-parameter) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value

To destroy a semaphore, call:

// Provided by VK_VERSION_1_0
void vkDestroySemaphore(
    VkDevice                                    device,
    VkSemaphore                                 semaphore,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the semaphore.

* 
`semaphore` is the handle of the semaphore to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroySemaphore-semaphore-05149) VUID-vkDestroySemaphore-semaphore-05149

All
    submitted batches that refer to `semaphore` **must** have completed
    execution

* 
[](#VUID-vkDestroySemaphore-semaphore-01138) VUID-vkDestroySemaphore-semaphore-01138

If `VkAllocationCallbacks` were provided when `semaphore` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySemaphore-semaphore-01139) VUID-vkDestroySemaphore-semaphore-01139

If no `VkAllocationCallbacks` were provided when `semaphore` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySemaphore-device-parameter) VUID-vkDestroySemaphore-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroySemaphore-semaphore-parameter) VUID-vkDestroySemaphore-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-vkDestroySemaphore-pAllocator-parameter) VUID-vkDestroySemaphore-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroySemaphore-semaphore-parent) VUID-vkDestroySemaphore-semaphore-parent

 If `semaphore` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

When a batch is submitted to a queue via a [queue submission](devsandqueues.html#devsandqueues-submission), and it includes semaphores to be signaled, it defines a memory
dependency on the batch, and defines *semaphore signal operations* which set
the semaphores to the signaled state.

In case of semaphores created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR) the semaphore is considered signaled with
respect to the counter value set to be signaled as specified in
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo) or [VkSemaphoreSignalInfo](#VkSemaphoreSignalInfo).

The first [synchronization scope](#synchronization-dependencies-scopes) of
a semaphore signal operation is defined by the command which defines it.

The second [synchronization scope](#synchronization-dependencies-scopes)
includes only the semaphore signal operation.

The first [access scope](#synchronization-dependencies-access-scopes)
includes all memory access performed by the device.

The second [access scope](#synchronization-dependencies-access-scopes) is
empty.

When a batch is submitted to a queue via a [queue submission](devsandqueues.html#devsandqueues-submission), and it includes semaphores to be waited on, it defines a
memory dependency between prior semaphore signal operations and the batch,
and defines *semaphore wait operations*.

Such semaphore wait operations set the semaphores
created with a [VkSemaphoreType](#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR)
to the unsignaled state.
In case of semaphores created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR) a prior semaphore signal operation defines
a memory dependency with a semaphore wait operation if the value the
semaphore is signaled with is greater than or equal to the value the
semaphore is waited with, thus the semaphore will continue to be considered
signaled with respect to the counter value waited on as specified in
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo).

The first [synchronization scope](#synchronization-dependencies-scopes) of
any wait semaphore operation includes one
[semaphore signal operation](#synchronization-semaphores-signaling) for each
semaphore waited on by this batch.
The specific signal operation waited on for each semaphore **must** meet the
following criteria:

* 

for binary semaphores,
the signal operation is either earlier in
[submission order](#synchronization-submission-order) on the same queue,
or is submitted by a command whose host operation happens-before this
batch is submitted on the host

* 

for binary semaphores,
no wait operation exists that happens-after the signal operation and
happens-before this wait operation

* 
the signal operation is not guaranteed to happen-after the semaphore
wait operation in this batch

* 
for timeline semaphores, the signal value is greater than or equal to
the wait value

If multiple semaphore signal operations meet these criteria, any of those
operations **may** be included in the first
[synchronization scope](#synchronization-dependencies-scopes).
When waiting on a binary semaphore, applications **must** ensure that exactly
one semaphore signal operation meets these criteria.

The second [synchronization scope](#synchronization-dependencies-scopes) of
a wait operation is defined by each command.

The first [access scope](#synchronization-dependencies-access-scopes) is
empty.

The second [access scope](#synchronization-dependencies-access-scopes)
includes all memory access performed by the device.

The semaphore wait operation happens-after the first set of operations in
the execution dependency, and happens-before the second set of operations in
the execution dependency.

|  | Unlike
| --- | --- |
timeline semaphores,
fences or events, waiting for a binary semaphore also unsignals that
semaphore when the wait completes.
Applications **must** ensure that between two such wait operations, the
semaphore is signaled again, with execution dependencies used to ensure
these occur in order.
Binary semaphore waits and signals should thus occur in discrete 1:1 pairs. |

Before waiting on a semaphore, the application **must** ensure the semaphore is
in a valid state for a wait operation.
Specifically, when a [semaphore wait operation](#synchronization-semaphores-waiting) is submitted to a queue:

* 
A binary semaphore **must** be signaled, or have an associated
[semaphore signal operation](#synchronization-semaphores-signaling) that
is pending execution.

* 
Any [semaphore signal operations](#synchronization-semaphores-signaling)
on which the pending binary semaphore signal operation depends **must**
also be completed or pending execution.

* 
There **must** be no other queue waiting on the same binary semaphore when
the operation executes.

In addition to [semaphore signal operations](#synchronization-semaphores-signaling) and [semaphore wait operations](#synchronization-semaphores-waiting) submitted to device queues, timeline semaphores support the
following host operations:

* 
Query the current counter value of the semaphore using the
[vkGetSemaphoreCounterValue](#vkGetSemaphoreCounterValue) command.

* 
Wait for a set of semaphores to reach particular counter values using
the [vkWaitSemaphores](#vkWaitSemaphores) command.

* 
Signal the semaphore with a particular counter value from the host using
the [vkSignalSemaphore](#vkSignalSemaphore) command.

To query the current counter value of a semaphore created with a
[VkSemaphoreType](#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR) from the host,
call:

// Provided by VK_VERSION_1_2
VkResult vkGetSemaphoreCounterValue(
    VkDevice                                    device,
    VkSemaphore                                 semaphore,
    uint64_t*                                   pValue);

// Provided by VK_KHR_timeline_semaphore
// Equivalent to vkGetSemaphoreCounterValue
VkResult vkGetSemaphoreCounterValueKHR(
    VkDevice                                    device,
    VkSemaphore                                 semaphore,
    uint64_t*                                   pValue);

* 
`device` is the logical device that owns the semaphore.

* 
`semaphore` is the handle of the semaphore to query.

* 
`pValue` is a pointer to a 64-bit integer value in which the current
counter value of the semaphore is returned.

|  | If a [queue submission](devsandqueues.html#devsandqueues-submission) command is pending
| --- | --- |
execution, then the value returned by this command **may** immediately be out
of date. |

Valid Usage

* 
[](#VUID-vkGetSemaphoreCounterValue-semaphore-03255) VUID-vkGetSemaphoreCounterValue-semaphore-03255

`semaphore` **must** have been created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreCounterValue-device-parameter) VUID-vkGetSemaphoreCounterValue-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSemaphoreCounterValue-semaphore-parameter) VUID-vkGetSemaphoreCounterValue-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-vkGetSemaphoreCounterValue-pValue-parameter) VUID-vkGetSemaphoreCounterValue-pValue-parameter

 `pValue` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSemaphoreCounterValue-semaphore-parent) VUID-vkGetSemaphoreCounterValue-semaphore-parent

 `semaphore` **must** have been created, allocated, or retrieved from `device`

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

To wait for a set of semaphores created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR) to reach particular counter values on the
host, call:

// Provided by VK_VERSION_1_2
VkResult vkWaitSemaphores(
    VkDevice                                    device,
    const VkSemaphoreWaitInfo*                  pWaitInfo,
    uint64_t                                    timeout);

// Provided by VK_KHR_timeline_semaphore
// Equivalent to vkWaitSemaphores
VkResult vkWaitSemaphoresKHR(
    VkDevice                                    device,
    const VkSemaphoreWaitInfo*                  pWaitInfo,
    uint64_t                                    timeout);

* 
`device` is the logical device that owns the semaphores.

* 
`pWaitInfo` is a pointer to a [VkSemaphoreWaitInfo](#VkSemaphoreWaitInfo) structure
containing information about the wait condition.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

If the condition is satisfied when `vkWaitSemaphores` is called, then
`vkWaitSemaphores` returns immediately.
If the condition is not satisfied at the time `vkWaitSemaphores` is
called, then `vkWaitSemaphores` will block and wait until the condition
is satisfied or the `timeout` has expired, whichever is sooner.

If `timeout` is zero, then `vkWaitSemaphores` does not wait, but
simply returns information about the current state of the semaphores.
[VK_TIMEOUT](fundamentals.html#VkResult) will be returned in this case if the condition is not
satisfied, even though no actual wait was performed.

If the condition is satisfied before the `timeout` has expired,
`vkWaitSemaphores` returns [VK_SUCCESS](fundamentals.html#VkResult).
Otherwise, `vkWaitSemaphores` returns [VK_TIMEOUT](fundamentals.html#VkResult) after the
`timeout` has expired.

If device loss occurs (see [Lost Device](devsandqueues.html#devsandqueues-lost-device)) before
the timeout has expired, `vkWaitSemaphores` **must** return in finite time
with either [VK_SUCCESS](fundamentals.html#VkResult) or [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).

Valid Usage (Implicit)

* 
[](#VUID-vkWaitSemaphores-device-parameter) VUID-vkWaitSemaphores-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWaitSemaphores-pWaitInfo-parameter) VUID-vkWaitSemaphores-pWaitInfo-parameter

 `pWaitInfo` **must** be a valid pointer to a valid [VkSemaphoreWaitInfo](#VkSemaphoreWaitInfo) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

* 
[VK_TIMEOUT](fundamentals.html#VkResult)

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

The `VkSemaphoreWaitInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSemaphoreWaitInfo {
    VkStructureType         sType;
    const void*             pNext;
    VkSemaphoreWaitFlags    flags;
    uint32_t                semaphoreCount;
    const VkSemaphore*      pSemaphores;
    const uint64_t*         pValues;
} VkSemaphoreWaitInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreWaitInfo
typedef VkSemaphoreWaitInfo VkSemaphoreWaitInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSemaphoreWaitFlagBits](#VkSemaphoreWaitFlagBits) specifying
additional parameters for the semaphore wait operation.

* 
`semaphoreCount` is the number of semaphores to wait on.

* 
`pSemaphores` is a pointer to an array of `semaphoreCount`
semaphore handles to wait on.

* 
`pValues` is a pointer to an array of `semaphoreCount` timeline
semaphore values.

Valid Usage

* 
[](#VUID-VkSemaphoreWaitInfo-pSemaphores-03256) VUID-VkSemaphoreWaitInfo-pSemaphores-03256

All of the elements of `pSemaphores` **must** reference a semaphore
that was created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreWaitInfo-sType-sType) VUID-VkSemaphoreWaitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreWaitInfo-pNext-pNext) VUID-VkSemaphoreWaitInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreWaitInfo-flags-parameter) VUID-VkSemaphoreWaitInfo-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreWaitFlagBits](#VkSemaphoreWaitFlagBits) values

* 
[](#VUID-VkSemaphoreWaitInfo-pSemaphores-parameter) VUID-VkSemaphoreWaitInfo-pSemaphores-parameter

 `pSemaphores` **must** be a valid pointer to an array of `semaphoreCount` valid [VkSemaphore](#VkSemaphore) handles

* 
[](#VUID-VkSemaphoreWaitInfo-pValues-parameter) VUID-VkSemaphoreWaitInfo-pValues-parameter

 `pValues` **must** be a valid pointer to an array of `semaphoreCount` `uint64_t` values

* 
[](#VUID-VkSemaphoreWaitInfo-semaphoreCount-arraylength) VUID-VkSemaphoreWaitInfo-semaphoreCount-arraylength

 `semaphoreCount` **must** be greater than `0`

Bits which **can** be set in [VkSemaphoreWaitInfo](#VkSemaphoreWaitInfo)::`flags`, specifying
additional parameters of a semaphore wait operation, are:

// Provided by VK_VERSION_1_2
typedef enum VkSemaphoreWaitFlagBits {
    VK_SEMAPHORE_WAIT_ANY_BIT = 0x00000001,
  // Provided by VK_KHR_timeline_semaphore
    VK_SEMAPHORE_WAIT_ANY_BIT_KHR = VK_SEMAPHORE_WAIT_ANY_BIT,
} VkSemaphoreWaitFlagBits;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreWaitFlagBits
typedef VkSemaphoreWaitFlagBits VkSemaphoreWaitFlagBitsKHR;

* 
[VK_SEMAPHORE_WAIT_ANY_BIT](#VkSemaphoreWaitFlagBitsKHR) specifies that the semaphore wait
condition is that at least one of the semaphores in
`VkSemaphoreWaitInfo`::`pSemaphores` has reached the value
specified by the corresponding element of
`VkSemaphoreWaitInfo`::`pValues`.
If [VK_SEMAPHORE_WAIT_ANY_BIT](#VkSemaphoreWaitFlagBitsKHR) is not set, the semaphore wait
condition is that all of the semaphores in
`VkSemaphoreWaitInfo`::`pSemaphores` have reached the value
specified by the corresponding element of
`VkSemaphoreWaitInfo`::`pValues`.

// Provided by VK_VERSION_1_2
typedef VkFlags VkSemaphoreWaitFlags;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreWaitFlags
typedef VkSemaphoreWaitFlags VkSemaphoreWaitFlagsKHR;

`VkSemaphoreWaitFlags` is a bitmask type for setting a mask of zero or
more [VkSemaphoreWaitFlagBits](#VkSemaphoreWaitFlagBits).

To signal a semaphore created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR) with a particular counter value, on the
host, call:

// Provided by VK_VERSION_1_2
VkResult vkSignalSemaphore(
    VkDevice                                    device,
    const VkSemaphoreSignalInfo*                pSignalInfo);

// Provided by VK_KHR_timeline_semaphore
// Equivalent to vkSignalSemaphore
VkResult vkSignalSemaphoreKHR(
    VkDevice                                    device,
    const VkSemaphoreSignalInfo*                pSignalInfo);

* 
`device` is the logical device that owns the semaphore.

* 
`pSignalInfo` is a pointer to a [VkSemaphoreSignalInfo](#VkSemaphoreSignalInfo)
structure containing information about the signal operation.

When `vkSignalSemaphore` is executed on the host, it defines and
immediately executes a [*semaphore signal operation*](#synchronization-semaphores-signaling) which sets the timeline semaphore to the given value.

The first synchronization scope is defined by the host execution model, but
includes execution of `vkSignalSemaphore` on the host and anything that
happened-before it.

The second synchronization scope is empty.

Valid Usage (Implicit)

* 
[](#VUID-vkSignalSemaphore-device-parameter) VUID-vkSignalSemaphore-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSignalSemaphore-pSignalInfo-parameter) VUID-vkSignalSemaphore-pSignalInfo-parameter

 `pSignalInfo` **must** be a valid pointer to a valid [VkSemaphoreSignalInfo](#VkSemaphoreSignalInfo) structure

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

The `VkSemaphoreSignalInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSemaphoreSignalInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkSemaphore        semaphore;
    uint64_t           value;
} VkSemaphoreSignalInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreSignalInfo
typedef VkSemaphoreSignalInfo VkSemaphoreSignalInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the handle of the semaphore to signal.

* 
`value` is the value to signal.

Valid Usage

* 
[](#VUID-VkSemaphoreSignalInfo-semaphore-03257) VUID-VkSemaphoreSignalInfo-semaphore-03257

`semaphore` **must** have been created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

* 
[](#VUID-VkSemaphoreSignalInfo-value-03258) VUID-VkSemaphoreSignalInfo-value-03258

`value` **must** have a value greater than the current value of the
semaphore

* 
[](#VUID-VkSemaphoreSignalInfo-value-03259) VUID-VkSemaphoreSignalInfo-value-03259

`value` **must** be less than the value of any pending semaphore signal
operations

* 
[](#VUID-VkSemaphoreSignalInfo-value-03260) VUID-VkSemaphoreSignalInfo-value-03260

`value` **must** have a value which does not differ from the current
value of the semaphore or the value of any outstanding semaphore wait or
signal operation on `semaphore` by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreSignalInfo-sType-sType) VUID-VkSemaphoreSignalInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSemaphoreSignalInfo-pNext-pNext) VUID-VkSemaphoreSignalInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreSignalInfo-semaphore-parameter) VUID-VkSemaphoreSignalInfo-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

Applications **can** import a semaphore payload into an existing semaphore
using an external semaphore handle.
The effects of the import operation will be either temporary or permanent,
as specified by the application.
If the import is temporary, the implementation **must** restore the semaphore
to its prior permanent state after submitting the next semaphore wait
operation.
Performing a subsequent temporary import on a semaphore before performing a
semaphore wait has no effect on this requirement; the next wait submitted on
the semaphore **must** still restore its last permanent state.
A permanent payload import behaves as if the target semaphore was destroyed,
and a new semaphore was created with the same handle but the imported
payload.
Because importing a semaphore payload temporarily or permanently detaches
the existing payload from a semaphore, similar usage restrictions to those
applied to `vkDestroySemaphore` are applied to any command that imports
a semaphore payload.
Which of these import types is used is referred to as the import operation’s
*permanence*.
Each handle type supports either one or both types of permanence.

The implementation **must** perform the import operation by either referencing
or copying the payload referred to by the specified external semaphore
handle, depending on the handle’s type.
The import method used is referred to as the handle type’s *transference*.
When using handle types with reference transference, importing a payload to
a semaphore adds the semaphore to the set of all semaphores sharing that
payload.
This set includes the semaphore from which the payload was exported.
Semaphore signaling and waiting operations performed on any semaphore in the
set **must** behave as if the set were a single semaphore.
Importing a payload using handle types with copy transference creates a
duplicate copy of the payload at the time of import, but makes no further
reference to it.
Semaphore signaling and waiting operations performed on the target of copy
imports **must** not affect any other semaphore or payload.

Export operations have the same transference as the specified handle type’s
import operations.
Additionally, exporting a semaphore payload to a handle with copy
transference has the same side effects on the source semaphore’s payload as
executing a semaphore wait operation.
If the semaphore was using a temporarily imported payload, the semaphore’s
prior permanent payload will be restored.

|  | The permanence and transference of handle types can be found in:
| --- | --- |

* 
[Handle Types Supported by    `VkImportSemaphoreWin32HandleInfoKHR`](#synchronization-semaphore-handletypes-win32)

* 
[Handle Types Supported by    `VkImportSemaphoreFdInfoKHR`](#synchronization-semaphore-handletypes-fd)

* 
[Handle Types Supported    by `VkImportSemaphoreZirconHandleInfoFUCHSIA`](#synchronization-semaphore-handletypes-fuchsia) |

[External synchronization](fundamentals.html#fundamentals-threadingbehavior) allows
implementations to modify an object’s internal state, i.e. payload, without
internal synchronization.
However, for semaphores sharing a payload across processes, satisfying the
external synchronization requirements of `VkSemaphore` parameters as if
all semaphores in the set were the same object is sometimes infeasible.
Satisfying the [wait operation state requirements](#synchronization-semaphores-waiting-state) would similarly require impractical coordination or
levels of trust between processes.
Therefore, these constraints only apply to a specific semaphore handle, not
to its payload.
For distinct semaphore objects which share a payload, if the semaphores are
passed to separate queue submission commands concurrently, behavior will be
as if the commands were called in an arbitrary sequential order.
If the [wait operation state requirements](#synchronization-semaphores-waiting-state) are violated for the shared payload by a queue submission
command, or if a signal operation is queued for a shared payload that is
already signaled or has a pending signal operation, effects **must** be limited
to one or more of the following:

* 
Returning [VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult) from the command which
resulted in the violation.

* 
Losing the logical device on which the violation occurred immediately or
at a future time, resulting in a [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) error from
subsequent commands, including the one causing the violation.

* 
Continuing execution of the violating command or operation as if the
semaphore wait completed successfully after an implementation-dependent
timeout.
In this case, the state of the payload becomes **undefined**, and future
operations on semaphores sharing the payload will be subject to these
same rules.
The semaphore **must** be destroyed or have its payload replaced by an
import operation to again have a well-defined state.

|  | These rules allow processes to synchronize access to shared memory without
| --- | --- |
trusting each other.
However, such processes must still be cautious not to use the shared
semaphore for more than synchronizing access to the shared memory.
For example, a process should not use a shared semaphore as part of an
execution dependency chain that, when complete, leads to objects being
destroyed, if it does not trust other processes sharing the semaphore
payload. |

When a semaphore is using an imported payload, its
[VkExportSemaphoreCreateInfo](#VkExportSemaphoreCreateInfo)::`handleTypes` value is specified when
creating the semaphore from which the payload was exported, rather than
specified when creating the semaphore.
Additionally,
[VkExternalSemaphoreProperties](capabilities.html#VkExternalSemaphoreProperties)::`exportFromImportedHandleTypes`
restricts which handle types **can** be exported from such a semaphore based on
the specific handle type used to import the current payload.
Passing a semaphore to [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR) is equivalent to
temporarily importing a semaphore payload to that semaphore.

|  | Because the exportable handle types of an imported semaphore correspond to
| --- | --- |
its current imported payload, and [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR) behaves the
same as a temporary import operation for which the source semaphore is
opaque to the application, applications have no way of determining whether
any external handle types **can** be exported from a semaphore in this state.
Therefore, applications **must** not attempt to export external handles from
semaphores using a temporarily imported payload from
[vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR). |

When importing a semaphore payload, it is the responsibility of the
application to ensure the external handles meet all valid usage
requirements.
However, implementations **must** perform sufficient validation of external
handles to ensure that the operation results in a valid semaphore which will
not cause program termination, device loss, queue stalls, or corruption of
other resources when used as allowed according to its import parameters, and
excepting those side effects allowed for violations of the
[valid semaphore state for wait operations](#synchronization-semaphores-waiting-state) rules.
If the external handle provided does not meet these requirements, the
implementation **must** fail the semaphore payload import operation with the
error code [VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult).

In addition, when importing a semaphore payload that is not compatible with
the payload type corresponding to the [VkSemaphoreType](#VkSemaphoreType) the semaphore
was created with, the implementation **may** fail the semaphore payload import
operation with the error code [VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult).

|  | As the introduction of the external semaphore handle type
| --- | --- |
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) predates that of
timeline semaphores, support for importing semaphore payloads from external
handles of that type into semaphores created (implicitly or explicitly) with
a [VkSemaphoreType](#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](#VkSemaphoreTypeKHR) is preserved for
backwards compatibility.
However, applications **should** prefer importing such handle types into
semaphores created with a [VkSemaphoreType](#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR). |

To import a semaphore payload from a Windows handle, call:

// Provided by VK_KHR_external_semaphore_win32
VkResult vkImportSemaphoreWin32HandleKHR(
    VkDevice                                    device,
    const VkImportSemaphoreWin32HandleInfoKHR*  pImportSemaphoreWin32HandleInfo);

* 
`device` is the logical device that created the semaphore.

* 
`pImportSemaphoreWin32HandleInfo` is a pointer to a
[VkImportSemaphoreWin32HandleInfoKHR](#VkImportSemaphoreWin32HandleInfoKHR) structure specifying the
semaphore and import parameters.

Importing a semaphore payload from Windows handles does not transfer
ownership of the handle to the Vulkan implementation.
For handle types defined as NT handles, the application **must** release
ownership using the `CloseHandle` system call when the handle is no
longer needed.

Applications **can** import the same semaphore payload into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage (Implicit)

* 
[](#VUID-vkImportSemaphoreWin32HandleKHR-device-parameter) VUID-vkImportSemaphoreWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkImportSemaphoreWin32HandleKHR-pImportSemaphoreWin32HandleInfo-parameter) VUID-vkImportSemaphoreWin32HandleKHR-pImportSemaphoreWin32HandleInfo-parameter

 `pImportSemaphoreWin32HandleInfo` **must** be a valid pointer to a valid [VkImportSemaphoreWin32HandleInfoKHR](#VkImportSemaphoreWin32HandleInfoKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImportSemaphoreWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkImportSemaphoreWin32HandleInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkSemaphoreImportFlags                   flags;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
    HANDLE                                   handle;
    LPCWSTR                                  name;
} VkImportSemaphoreWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore into which the payload will be
imported.

* 
`flags` is a bitmask of [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits) specifying
additional parameters for the semaphore payload import operation.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the type of `handle`.

* 
`handle` is `NULL` or the external handle to import.

* 
`name` is `NULL` or a null-terminated UTF-16 string naming the
underlying synchronization primitive to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |

Valid Usage

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01140) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01140

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportSemaphoreWin32HandleInfoKHR`](#synchronization-semaphore-handletypes-win32) table

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01466) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01466

If `handleType` is not
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR), `name`
**must** be `NULL`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01467) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01467

If `handle` is `NULL`, `name` **must** name a valid synchronization
primitive of the type specified by `handleType`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01468) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01468

If `name` is `NULL`, `handle` **must** be a valid handle of the
type specified by `handleType`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01469) VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01469

If `handle` is not `NULL`, `name` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01542) VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01542

If `handle` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external semaphore handle types compatibility](capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-name-01543) VUID-VkImportSemaphoreWin32HandleInfoKHR-name-01543

If `name` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external semaphore handle types compatibility](capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03261) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03261

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR), the
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)::`flags` field **must** match that of the
semaphore from which `handle` or `name` was exported

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03262) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03262

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR), the
[VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)::`semaphoreType` field **must** match
that of the semaphore from which `handle` or `name` was exported

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-03322) VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-03322

If `flags` contains [VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](#VkSemaphoreImportFlagBitsKHR), the
[VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)::`semaphoreType` field of the
semaphore from which `handle` or `name` was exported **must** not
be [VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-sType-sType) VUID-VkImportSemaphoreWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-pNext-pNext) VUID-VkImportSemaphoreWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-semaphore-parameter) VUID-VkImportSemaphoreWin32HandleInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-parameter) VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits) values

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

To import a semaphore payload from a POSIX file descriptor, call:

// Provided by VK_KHR_external_semaphore_fd
VkResult vkImportSemaphoreFdKHR(
    VkDevice                                    device,
    const VkImportSemaphoreFdInfoKHR*           pImportSemaphoreFdInfo);

* 
`device` is the logical device that created the semaphore.

* 
`pImportSemaphoreFdInfo` is a pointer to a
[VkImportSemaphoreFdInfoKHR](#VkImportSemaphoreFdInfoKHR) structure specifying the semaphore and
import parameters.

Importing a semaphore payload from a file descriptor transfers ownership of
the file descriptor from the application to the Vulkan implementation.
The application **must** not perform any operations on the file descriptor
after a successful import.

Applications **can** import the same semaphore payload into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportSemaphoreFdKHR-semaphore-01142) VUID-vkImportSemaphoreFdKHR-semaphore-01142

`semaphore` **must** not be associated with any queue command that has
not yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportSemaphoreFdKHR-device-parameter) VUID-vkImportSemaphoreFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkImportSemaphoreFdKHR-pImportSemaphoreFdInfo-parameter) VUID-vkImportSemaphoreFdKHR-pImportSemaphoreFdInfo-parameter

 `pImportSemaphoreFdInfo` **must** be a valid pointer to a valid [VkImportSemaphoreFdInfoKHR](#VkImportSemaphoreFdInfoKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImportSemaphoreFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_fd
typedef struct VkImportSemaphoreFdInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkSemaphoreImportFlags                   flags;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
    int                                      fd;
} VkImportSemaphoreFdInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore into which the payload will be
imported.

* 
`flags` is a bitmask of [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits) specifying
additional parameters for the semaphore payload import operation.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the type of `fd`.

* 
`fd` is the external handle to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Copy | Temporary |

Valid Usage

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-01143) VUID-VkImportSemaphoreFdInfoKHR-handleType-01143

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportSemaphoreFdInfoKHR`](#synchronization-semaphore-handletypes-fd) table

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-fd-01544) VUID-VkImportSemaphoreFdInfoKHR-fd-01544

`fd` **must** obey any requirements listed for `handleType` in
[external semaphore    handle types compatibility](capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-03263) VUID-VkImportSemaphoreFdInfoKHR-handleType-03263

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR), the
[VkSemaphoreCreateInfo](#VkSemaphoreCreateInfo)::`flags` field **must** match that of the
semaphore from which `fd` was exported

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-07307) VUID-VkImportSemaphoreFdInfoKHR-handleType-07307

If `handleType` refers to a handle type with copy payload
transference semantics, `flags` **must** contain
[VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](#VkSemaphoreImportFlagBitsKHR)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-03264) VUID-VkImportSemaphoreFdInfoKHR-handleType-03264

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR), the
[VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)::`semaphoreType` field **must** match
that of the semaphore from which `fd` was exported

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-flags-03323) VUID-VkImportSemaphoreFdInfoKHR-flags-03323

If `flags` contains [VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](#VkSemaphoreImportFlagBitsKHR), the
[VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)::`semaphoreType` field of the
semaphore from which `fd` was exported **must** not be
[VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

If `handleType` is [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR),
the special value `-1` for `fd` is treated like a valid sync file
descriptor referring to an object that has already signaled.
The import operation will succeed and the `VkSemaphore` will have a
temporarily imported payload as if a valid file descriptor had been
provided.

|  | This special behavior for importing an invalid sync file descriptor allows
| --- | --- |
easier interoperability with other system APIs which use the convention that
an invalid sync file descriptor represents work that has already completed
and does not need to be waited for.
It is consistent with the option for implementations to return a `-1` file
descriptor when exporting a
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) from a `VkSemaphore`
which is signaled. |

Valid Usage (Implicit)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-sType-sType) VUID-VkImportSemaphoreFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_FD_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-pNext-pNext) VUID-VkImportSemaphoreFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-semaphore-parameter) VUID-VkImportSemaphoreFdInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-flags-parameter) VUID-VkImportSemaphoreFdInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits) values

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-parameter) VUID-VkImportSemaphoreFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

To import a semaphore payload from a Zircon event handle, call:

// Provided by VK_FUCHSIA_external_semaphore
VkResult vkImportSemaphoreZirconHandleFUCHSIA(
    VkDevice                                    device,
    const VkImportSemaphoreZirconHandleInfoFUCHSIA* pImportSemaphoreZirconHandleInfo);

* 
`device` is the logical device that created the semaphore.

* 
`pImportSemaphoreZirconHandleInfo` is a pointer to a
[VkImportSemaphoreZirconHandleInfoFUCHSIA](#VkImportSemaphoreZirconHandleInfoFUCHSIA) structure specifying the
semaphore and import parameters.

Importing a semaphore payload from a Zircon event handle transfers ownership
of the handle from the application to the Vulkan implementation.
The application **must** not perform any operations on the handle after a
successful import.

Applications **can** import the same semaphore payload into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportSemaphoreZirconHandleFUCHSIA-semaphore-04764) VUID-vkImportSemaphoreZirconHandleFUCHSIA-semaphore-04764

`semaphore` **must** not be associated with any queue command that has
not yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportSemaphoreZirconHandleFUCHSIA-device-parameter) VUID-vkImportSemaphoreZirconHandleFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkImportSemaphoreZirconHandleFUCHSIA-pImportSemaphoreZirconHandleInfo-parameter) VUID-vkImportSemaphoreZirconHandleFUCHSIA-pImportSemaphoreZirconHandleInfo-parameter

 `pImportSemaphoreZirconHandleInfo` **must** be a valid pointer to a valid [VkImportSemaphoreZirconHandleInfoFUCHSIA](#VkImportSemaphoreZirconHandleInfoFUCHSIA) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImportSemaphoreZirconHandleInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_semaphore
typedef struct VkImportSemaphoreZirconHandleInfoFUCHSIA {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkSemaphoreImportFlags                   flags;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
    zx_handle_t                              zirconHandle;
} VkImportSemaphoreZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore into which the payload will be
imported.

* 
`flags` is a bitmask of [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits) specifying
additional parameters for the semaphore payload import operation.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the type of `zirconHandle`.

* 
`zirconHandle` is the external handle to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](capabilities.html#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Reference | Temporary,Permanent |

Valid Usage

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-04765) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-04765

`handleType` **must** be a value included in the
[Handle Types Supported    by `VkImportSemaphoreZirconHandleInfoFUCHSIA`](#synchronization-semaphore-handletypes-fuchsia) table

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04766) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04766

`zirconHandle` **must** obey any requirements listed for
`handleType` in [    external semaphore handle types compatibility](capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04767) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04767

`zirconHandle` **must** have `ZX_RIGHTS_BASIC` and
`ZX_RIGHTS_SIGNAL` rights

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphoreType-04768) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphoreType-04768

The [VkSemaphoreTypeCreateInfo](#VkSemaphoreTypeCreateInfo)::`semaphoreType` field **must** not
be [VK_SEMAPHORE_TYPE_TIMELINE](#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-sType-sType) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_ZIRCON_HANDLE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-pNext-pNext) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphore-parameter) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](#VkSemaphore) handle

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-flags-parameter) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits) values

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](capabilities.html#VkExternalSemaphoreHandleTypeFlagBits) value

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

Bits which **can** be set in

* 
[VkImportSemaphoreWin32HandleInfoKHR](#VkImportSemaphoreWin32HandleInfoKHR)::`flags`

* 
[VkImportSemaphoreFdInfoKHR](#VkImportSemaphoreFdInfoKHR)::`flags`

* 
[VkImportSemaphoreZirconHandleInfoFUCHSIA](#VkImportSemaphoreZirconHandleInfoFUCHSIA)::`flags`

specifying additional parameters of a semaphore import operation are:

// Provided by VK_VERSION_1_1
typedef enum VkSemaphoreImportFlagBits {
    VK_SEMAPHORE_IMPORT_TEMPORARY_BIT = 0x00000001,
  // Provided by VK_KHR_external_semaphore
    VK_SEMAPHORE_IMPORT_TEMPORARY_BIT_KHR = VK_SEMAPHORE_IMPORT_TEMPORARY_BIT,
} VkSemaphoreImportFlagBits;

// Provided by VK_KHR_external_semaphore
// Equivalent to VkSemaphoreImportFlagBits
typedef VkSemaphoreImportFlagBits VkSemaphoreImportFlagBitsKHR;

These bits have the following meanings:

* 
[VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](#VkSemaphoreImportFlagBitsKHR) specifies that the semaphore
payload will be imported only temporarily, as described in
[Importing Semaphore Payloads](#synchronization-semaphores-importing),
regardless of the permanence of `handleType`.

// Provided by VK_VERSION_1_1
typedef VkFlags VkSemaphoreImportFlags;

// Provided by VK_KHR_external_semaphore
// Equivalent to VkSemaphoreImportFlags
typedef VkSemaphoreImportFlags VkSemaphoreImportFlagsKHR;

`VkSemaphoreImportFlags` is a bitmask type for setting a mask of zero or
more [VkSemaphoreImportFlagBits](#VkSemaphoreImportFlagBits).

Events are a synchronization primitive that **can** be used to insert a
fine-grained dependency between commands submitted to the same queue, or
between the host and a queue.
Events **must** not be used to insert a dependency between commands submitted
to different queues.
Events have two states - signaled and unsignaled.
An application **can** signal or unsignal an event either on the host or on the
device.
A device **can** be made to wait for an event to become signaled before
executing further operations.
No command exists to wait for an event to become signaled on the host, but
the current state of an event **can** be queried.

Events are represented by `VkEvent` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkEvent)

To create an event, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateEvent(
    VkDevice                                    device,
    const VkEventCreateInfo*                    pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkEvent*                                    pEvent);

* 
`device` is the logical device that creates the event.

* 
`pCreateInfo` is a pointer to a [VkEventCreateInfo](#VkEventCreateInfo) structure
containing information about how the event is to be created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pEvent` is a pointer to a handle in which the resulting event
object is returned.

When created, the event object is in the unsignaled state.

Valid Usage

* 
[](#VUID-vkCreateEvent-device-09672) VUID-vkCreateEvent-device-09672

`device` **must** support at least one queue family with one of the
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

* 
[](#VUID-vkCreateEvent-events-04468) VUID-vkCreateEvent-events-04468

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`events` is
[VK_FALSE](fundamentals.html#VK_FALSE), then the implementation does not support
[events](#synchronization-events), and [vkCreateEvent](#vkCreateEvent) **must** not be
used

Valid Usage (Implicit)

* 
[](#VUID-vkCreateEvent-device-parameter) VUID-vkCreateEvent-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateEvent-pCreateInfo-parameter) VUID-vkCreateEvent-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkEventCreateInfo](#VkEventCreateInfo) structure

* 
[](#VUID-vkCreateEvent-pAllocator-parameter) VUID-vkCreateEvent-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateEvent-pEvent-parameter) VUID-vkCreateEvent-pEvent-parameter

 `pEvent` **must** be a valid pointer to a [VkEvent](#VkEvent) handle

* 
[](#VUID-vkCreateEvent-device-queuecount) VUID-vkCreateEvent-device-queuecount

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

The `VkEventCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkEventCreateInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkEventCreateFlags    flags;
} VkEventCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkEventCreateFlagBits](#VkEventCreateFlagBits) defining
additional creation parameters.

Valid Usage

* 
[](#VUID-VkEventCreateInfo-pNext-06790) VUID-VkEventCreateInfo-pNext-06790

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkEventCreateInfo-sType-sType) VUID-VkEventCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EVENT_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkEventCreateInfo-pNext-pNext) VUID-VkEventCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) or [VkImportMetalSharedEventInfoEXT](memory.html#VkImportMetalSharedEventInfoEXT)

* 
[](#VUID-VkEventCreateInfo-sType-unique) VUID-VkEventCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT)

* 
[](#VUID-VkEventCreateInfo-flags-parameter) VUID-VkEventCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkEventCreateFlagBits](#VkEventCreateFlagBits) values

// Provided by VK_VERSION_1_0
typedef enum VkEventCreateFlagBits {
  // Provided by VK_VERSION_1_3
    VK_EVENT_CREATE_DEVICE_ONLY_BIT = 0x00000001,
  // Provided by VK_KHR_synchronization2
    VK_EVENT_CREATE_DEVICE_ONLY_BIT_KHR = VK_EVENT_CREATE_DEVICE_ONLY_BIT,
} VkEventCreateFlagBits;

* 
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](#VkEventCreateFlagBits) specifies that host event commands
will not be used with this event.

// Provided by VK_VERSION_1_0
typedef VkFlags VkEventCreateFlags;

`VkEventCreateFlags` is a bitmask type for setting a mask of
[VkEventCreateFlagBits](#VkEventCreateFlagBits).

To destroy an event, call:

// Provided by VK_VERSION_1_0
void vkDestroyEvent(
    VkDevice                                    device,
    VkEvent                                     event,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the event.

* 
`event` is the handle of the event to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyEvent-event-01145) VUID-vkDestroyEvent-event-01145

All submitted commands that refer to `event` **must** have completed
execution

* 
[](#VUID-vkDestroyEvent-event-01146) VUID-vkDestroyEvent-event-01146

If `VkAllocationCallbacks` were provided when `event` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyEvent-event-01147) VUID-vkDestroyEvent-event-01147

If no `VkAllocationCallbacks` were provided when `event` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyEvent-device-parameter) VUID-vkDestroyEvent-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyEvent-event-parameter) VUID-vkDestroyEvent-event-parameter

 If `event` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkDestroyEvent-pAllocator-parameter) VUID-vkDestroyEvent-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyEvent-event-parent) VUID-vkDestroyEvent-event-parent

 If `event` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `event` **must** be externally synchronized

To query the state of an event from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkGetEventStatus(
    VkDevice                                    device,
    VkEvent                                     event);

* 
`device` is the logical device that owns the event.

* 
`event` is the handle of the event to query.

Upon success, `vkGetEventStatus` returns the state of the event object
with the following return codes:

| Status | Meaning |
| --- | --- |
| [VK_EVENT_SET](fundamentals.html#VkResult) | The event specified by `event` is signaled. |
| [VK_EVENT_RESET](fundamentals.html#VkResult) | The event specified by `event` is unsignaled. |

If a `vkCmdSetEvent` or `vkCmdResetEvent` command is in a command
buffer that is in the [pending state](cmdbuffers.html#commandbuffers-lifecycle), then the
value returned by this command **may** immediately be out of date.

The state of an event **can** be updated by the host.
The state of the event is immediately changed, and subsequent calls to
`vkGetEventStatus` will return the new state.
If an event is already in the requested state, then updating it to the same
state has no effect.

Valid Usage

* 
[](#VUID-vkGetEventStatus-event-03940) VUID-vkGetEventStatus-event-03940

`event` **must** not have been created with
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](#VkEventCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetEventStatus-device-parameter) VUID-vkGetEventStatus-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetEventStatus-event-parameter) VUID-vkGetEventStatus-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkGetEventStatus-event-parent) VUID-vkGetEventStatus-event-parent

 `event` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_EVENT_RESET](fundamentals.html#VkResult)

* 
[VK_EVENT_SET](fundamentals.html#VkResult)

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

To set the state of an event to signaled from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkSetEvent(
    VkDevice                                    device,
    VkEvent                                     event);

* 
`device` is the logical device that owns the event.

* 
`event` is the event to set.

When [vkSetEvent](#vkSetEvent) is executed on the host, it defines an *event signal
operation* which sets the event to the signaled state.

If `event` is already in the signaled state when [vkSetEvent](#vkSetEvent) is
executed, then [vkSetEvent](#vkSetEvent) has no effect, and no event signal operation
occurs.

|  | If a command buffer is waiting for an event to be signaled from the host,
| --- | --- |
the application must signal the event before submitting the command buffer,
as described in the [queue forward progress](cmdbuffers.html#commandbuffers-submission-progress) section. |

Valid Usage

* 
[](#VUID-vkSetEvent-event-03941) VUID-vkSetEvent-event-03941

`event` **must** not have been created with
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](#VkEventCreateFlagBits)

* 
[](#VUID-vkSetEvent-event-09543) VUID-vkSetEvent-event-09543

`event` **must** not be waited on by a command buffer in the
[pending state](cmdbuffers.html#commandbuffers-lifecycle)

Valid Usage (Implicit)

* 
[](#VUID-vkSetEvent-device-parameter) VUID-vkSetEvent-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetEvent-event-parameter) VUID-vkSetEvent-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkSetEvent-event-parent) VUID-vkSetEvent-event-parent

 `event` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `event` **must** be externally synchronized

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

To set the state of an event to unsignaled from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkResetEvent(
    VkDevice                                    device,
    VkEvent                                     event);

* 
`device` is the logical device that owns the event.

* 
`event` is the event to reset.

When [vkResetEvent](#vkResetEvent) is executed on the host, it defines an *event
unsignal operation* which resets the event to the unsignaled state.

If `event` is already in the unsignaled state when [vkResetEvent](#vkResetEvent) is
executed, then [vkResetEvent](#vkResetEvent) has no effect, and no event unsignal
operation occurs.

Valid Usage

* 
[](#VUID-vkResetEvent-event-03821) VUID-vkResetEvent-event-03821

There **must** be an execution dependency between `vkResetEvent` and
the execution of any [vkCmdWaitEvents](#vkCmdWaitEvents) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkResetEvent-event-03822) VUID-vkResetEvent-event-03822

There **must** be an execution dependency between `vkResetEvent` and
the execution of any [vkCmdWaitEvents2](#vkCmdWaitEvents2) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkResetEvent-event-03823) VUID-vkResetEvent-event-03823

`event` **must** not have been created with
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](#VkEventCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkResetEvent-device-parameter) VUID-vkResetEvent-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkResetEvent-event-parameter) VUID-vkResetEvent-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkResetEvent-event-parent) VUID-vkResetEvent-event-parent

 `event` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `event` **must** be externally synchronized

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

The state of an event **can** also be updated on the device by commands
inserted in command buffers.

To signal an event from a device, call:

// Provided by VK_VERSION_1_3
void vkCmdSetEvent2(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    const VkDependencyInfo*                     pDependencyInfo);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdSetEvent2
void vkCmdSetEvent2KHR(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    const VkDependencyInfo*                     pDependencyInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be signaled.

* 
`pDependencyInfo` is a pointer to a [VkDependencyInfo](#VkDependencyInfo) structure
defining the first scopes of this operation.

When [vkCmdSetEvent2](#vkCmdSetEvent2) is submitted to a queue, it defines the first half
of memory dependencies defined by `pDependencyInfo`, as well as an event
signal operation which sets the event to the signaled state.
A memory dependency is defined between the event signal operation and
commands that occur earlier in submission order.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) are defined by
the union of all the memory dependencies defined by `pDependencyInfo`,
and are applied to all operations that occur earlier in
[submission order](#synchronization-submission-order).
[Queue family ownership transfers](#synchronization-queue-transfers) and
[image layout transitions](#synchronization-image-layout-transitions)
defined by `pDependencyInfo` are also included in the first scopes.

The second [synchronization scope](#synchronization-dependencies-scopes)
includes only the event signal operation, and any
[queue family ownership transfers](#synchronization-queue-transfers) and
[image layout transitions](#synchronization-image-layout-transitions)
defined by `pDependencyInfo`.

The second [access scope](#synchronization-dependencies-access-scopes)
includes only [queue family ownership transfers](#synchronization-queue-transfers) and [image layout transitions](#synchronization-image-layout-transitions).

If [VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits) is not set in
`pDependencyInfo->dependencyFlags`, future
[vkCmdWaitEvents2](#vkCmdWaitEvents2) commands rely on all values of each element in
`pDependencyInfo` matching exactly with those used to signal the
corresponding event.
If [VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits) is set, `vkCmdSetEvent2`
**must** only include the [source stage mask](#synchronization-pipeline-stages-masks) of the first synchronization scope in
`pDependencyInfo->pMemoryBarriers`[0].`srcStageMask`.
[vkCmdWaitEvents](#vkCmdWaitEvents) **must** not be used to wait on the result of a signal
operation defined by `vkCmdSetEvent2`.

|  | The extra information provided by [vkCmdSetEvent2](#vkCmdSetEvent2) compared to
| --- | --- |
[vkCmdSetEvent](#vkCmdSetEvent) allows implementations to more efficiently schedule the
operations required to satisfy the requested dependencies.
With [vkCmdSetEvent](#vkCmdSetEvent), the full dependency information is not known until
[vkCmdWaitEvents](#vkCmdWaitEvents) is recorded, forcing implementations to insert the
required operations at that point and not before. |

If `event` is already in the signaled state when [vkCmdSetEvent2](#vkCmdSetEvent2) is
executed on the device, then [vkCmdSetEvent2](#vkCmdSetEvent2) has no effect, no event
signal operation occurs, and no dependency is generated.

Valid Usage

* 
[](#VUID-vkCmdSetEvent2-synchronization2-03824) VUID-vkCmdSetEvent2-synchronization2-03824

The [`synchronization2`](features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-03825) VUID-vkCmdSetEvent2-dependencyFlags-03825

    The `dependencyFlags` member of `pDependencyInfo` **must** be `0`
or [VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdSetEvent2-srcStageMask-09391) VUID-vkCmdSetEvent2-srcStageMask-09391

The `srcStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** not
include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdSetEvent2-dstStageMask-09392) VUID-vkCmdSetEvent2-dstStageMask-09392

The `dstStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** not
include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-03826) VUID-vkCmdSetEvent2-commandBuffer-03826

The current device mask of `commandBuffer` **must** include exactly one
physical device

* 
[](#VUID-vkCmdSetEvent2-srcStageMask-03827) VUID-vkCmdSetEvent2-srcStageMask-03827

The `srcStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdSetEvent2-dstStageMask-03828) VUID-vkCmdSetEvent2-dstStageMask-03828

The `dstStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-10785) VUID-vkCmdSetEvent2-dependencyFlags-10785

If the `dependencyFlags` member of `pDependencyInfo` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits), the
`bufferMemoryBarrierCount` and `imageMemoryBarrierCount` members
of `pDependencyInfo` **must** be `0`

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-10786) VUID-vkCmdSetEvent2-dependencyFlags-10786

If the `dependencyFlags` member of `pDependencyInfo` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits), the
`memoryBarrierCount` member of `pDependencyInfo` **must** be `1`

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-10787) VUID-vkCmdSetEvent2-dependencyFlags-10787

If the `dependencyFlags` member of `pDependencyInfo` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits), the `srcAccessMask`,
`dstStageMask`, and `dstAccessMask` members of
`pDependencyInfo->pMemoryBarriers`[0] **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-parameter) VUID-vkCmdSetEvent2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetEvent2-event-parameter) VUID-vkCmdSetEvent2-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkCmdSetEvent2-pDependencyInfo-parameter) VUID-vkCmdSetEvent2-pDependencyInfo-parameter

 `pDependencyInfo` **must** be a valid pointer to a valid [VkDependencyInfo](#VkDependencyInfo) structure

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-recording) VUID-vkCmdSetEvent2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-cmdpool) VUID-vkCmdSetEvent2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetEvent2-renderpass) VUID-vkCmdSetEvent2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetEvent2-suspended) VUID-vkCmdSetEvent2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetEvent2-commonparent) VUID-vkCmdSetEvent2-commonparent

 Both of `commandBuffer`, and `event` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdSetEvent2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDependencyInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkDependencyInfo {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDependencyFlags                dependencyFlags;
    uint32_t                         memoryBarrierCount;
    const VkMemoryBarrier2*          pMemoryBarriers;
    uint32_t                         bufferMemoryBarrierCount;
    const VkBufferMemoryBarrier2*    pBufferMemoryBarriers;
    uint32_t                         imageMemoryBarrierCount;
    const VkImageMemoryBarrier2*     pImageMemoryBarriers;
} VkDependencyInfo;

// Provided by VK_KHR_synchronization2
// Equivalent to VkDependencyInfo
typedef VkDependencyInfo VkDependencyInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](#VkDependencyFlagBits)
specifying how execution and memory dependencies are formed.

* 
`memoryBarrierCount` is the length of the `pMemoryBarriers`
array.

* 
`pMemoryBarriers` is a pointer to an array of [VkMemoryBarrier2](#VkMemoryBarrier2)
structures defining memory dependencies between any memory accesses.

* 
`bufferMemoryBarrierCount` is the length of the
`pBufferMemoryBarriers` array.

* 
`pBufferMemoryBarriers` is a pointer to an array of
[VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2) structures defining memory dependencies
between buffer ranges.

* 
`imageMemoryBarrierCount` is the length of the
`pImageMemoryBarriers` array.

* 
`pImageMemoryBarriers` is a pointer to an array of
[VkImageMemoryBarrier2](#VkImageMemoryBarrier2) structures defining memory dependencies
between image subresources.

This structure defines a set of [memory dependencies](#synchronization-dependencies-memory), as well as [queue family ownership transfer operations](#synchronization-queue-transfers) and
[image layout transitions](#synchronization-image-layout-transitions).

Each member of `pMemoryBarriers`, `pBufferMemoryBarriers`, and
`pImageMemoryBarriers` defines a separate
[memory dependency](#synchronization-dependencies-memory).

Valid Usage

* 
[](#VUID-VkDependencyInfo-pMemoryBarriers-10605) VUID-VkDependencyInfo-pMemoryBarriers-10605

For each element of `pMemoryBarriers`, the `sType` value of each
structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDependencyInfo-pMemoryBarriers-10606) VUID-VkDependencyInfo-pMemoryBarriers-10606

    For each element of `pMemoryBarriers`, `pNext` **must** be
either
    `NULL`
    or a pointer to a valid instance of [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR)

* 
[](#VUID-VkDependencyInfo-pNext-09754) VUID-VkDependencyInfo-pNext-09754

If a [VkTensorDependencyInfoARM](#VkTensorDependencyInfoARM) structure is included in the
`pNext` chain, a [VkTensorMemoryBarrierARM](#VkTensorMemoryBarrierARM) structure **must** not
be included in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkDependencyInfo-sType-sType) VUID-VkDependencyInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEPENDENCY_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDependencyInfo-pNext-pNext) VUID-VkDependencyInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkMemoryRangeBarriersInfoKHR](#VkMemoryRangeBarriersInfoKHR), [VkTensorDependencyInfoARM](#VkTensorDependencyInfoARM), or [VkTensorMemoryBarrierARM](#VkTensorMemoryBarrierARM)

* 
[](#VUID-VkDependencyInfo-sType-unique) VUID-VkDependencyInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDependencyInfo-dependencyFlags-parameter) VUID-VkDependencyInfo-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](#VkDependencyFlagBits) values

* 
[](#VUID-VkDependencyInfo-pMemoryBarriers-parameter) VUID-VkDependencyInfo-pMemoryBarriers-parameter

 If `memoryBarrierCount` is not `0`, `pMemoryBarriers` **must** be a valid pointer to an array of `memoryBarrierCount` valid [VkMemoryBarrier2](#VkMemoryBarrier2) structures

* 
[](#VUID-VkDependencyInfo-pBufferMemoryBarriers-parameter) VUID-VkDependencyInfo-pBufferMemoryBarriers-parameter

 If `bufferMemoryBarrierCount` is not `0`, `pBufferMemoryBarriers` **must** be a valid pointer to an array of `bufferMemoryBarrierCount` valid [VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2) structures

* 
[](#VUID-VkDependencyInfo-pImageMemoryBarriers-parameter) VUID-VkDependencyInfo-pImageMemoryBarriers-parameter

 If `imageMemoryBarrierCount` is not `0`, `pImageMemoryBarriers` **must** be a valid pointer to an array of `imageMemoryBarrierCount` valid [VkImageMemoryBarrier2](#VkImageMemoryBarrier2) structures

To set the state of an event to signaled from a device, call:

|  | This functionality is superseded by [vkCmdSetEvent2](#vkCmdSetEvent2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdSetEvent(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags                        stageMask);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be signaled.

* 
`stageMask` specifies the [source    stage mask](#synchronization-pipeline-stages) used to determine the first
[synchronization scope](#synchronization-dependencies-scopes).

`vkCmdSetEvent` behaves identically to [vkCmdSetEvent2](#vkCmdSetEvent2), except that
it does not define an access scope, and **must** only be used with
[vkCmdWaitEvents](#vkCmdWaitEvents), not [vkCmdWaitEvents2](#vkCmdWaitEvents2).

Valid Usage

* 
[](#VUID-vkCmdSetEvent-stageMask-04090) VUID-vkCmdSetEvent-stageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-04091) VUID-vkCmdSetEvent-stageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-04092) VUID-vkCmdSetEvent-stageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-04093) VUID-vkCmdSetEvent-stageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-04094) VUID-vkCmdSetEvent-stageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-04095) VUID-vkCmdSetEvent-stageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-04096) VUID-vkCmdSetEvent-stageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-07318) VUID-vkCmdSetEvent-stageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-03937) VUID-vkCmdSetEvent-stageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `stageMask` **must** not be `0`

* 
[](#VUID-vkCmdSetEvent-stageMask-07949) VUID-vkCmdSetEvent-stageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-10754) VUID-vkCmdSetEvent-stageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-stageMask-06457) VUID-vkCmdSetEvent-stageMask-06457

Any pipeline stage included in `stageMask` **must** be supported by the
capabilities of the queue family specified by the `queueFamilyIndex`
member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that was used to
create the `VkCommandPool` that `commandBuffer` was allocated
from, as specified in the [    table of supported pipeline stages](#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdSetEvent-stageMask-01149) VUID-vkCmdSetEvent-stageMask-01149

`stageMask` **must** not include [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdSetEvent-commandBuffer-01152) VUID-vkCmdSetEvent-commandBuffer-01152

The current device mask of `commandBuffer` **must** include exactly one
physical device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetEvent-commandBuffer-parameter) VUID-vkCmdSetEvent-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetEvent-event-parameter) VUID-vkCmdSetEvent-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkCmdSetEvent-stageMask-parameter) VUID-vkCmdSetEvent-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) values

* 
[](#VUID-vkCmdSetEvent-commandBuffer-recording) VUID-vkCmdSetEvent-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetEvent-commandBuffer-cmdpool) VUID-vkCmdSetEvent-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetEvent-renderpass) VUID-vkCmdSetEvent-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetEvent-suspended) VUID-vkCmdSetEvent-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetEvent-commonparent) VUID-vkCmdSetEvent-commonparent

 Both of `commandBuffer`, and `event` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdSetEvent is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To unsignal the event from a device, call:

// Provided by VK_VERSION_1_3
void vkCmdResetEvent2(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags2                       stageMask);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdResetEvent2
void vkCmdResetEvent2KHR(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags2                       stageMask);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be unsignaled.

* 
`stageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline stages
used to determine the first [    synchronization scope](#synchronization-dependencies-scopes).

When [vkCmdResetEvent2](#vkCmdResetEvent2) is submitted to a queue, it defines an execution
dependency on commands that were submitted before it, and defines an event
unsignal operation which resets the event to the unsignaled state.

The first [synchronization scope](#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](#synchronization-submission-order).
The synchronization scope is limited to operations by `stageMask` or
stages that are [logically earlier](#synchronization-pipeline-stages-order)
than `stageMask`.

The second [synchronization scope](#synchronization-dependencies-scopes)
includes only the event unsignal operation.

If `event` is already in the unsignaled state when
[vkCmdResetEvent2](#vkCmdResetEvent2) is executed on the device, then this command has no
effect, no event unsignal operation occurs, and no execution dependency is
generated.

Valid Usage

* 
[](#VUID-vkCmdResetEvent2-stageMask-03929) VUID-vkCmdResetEvent2-stageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03930) VUID-vkCmdResetEvent2-stageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03931) VUID-vkCmdResetEvent2-stageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03932) VUID-vkCmdResetEvent2-stageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03933) VUID-vkCmdResetEvent2-stageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03934) VUID-vkCmdResetEvent2-stageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03935) VUID-vkCmdResetEvent2-stageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-07316) VUID-vkCmdResetEvent2-stageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-04957) VUID-vkCmdResetEvent2-stageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-04995) VUID-vkCmdResetEvent2-stageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-07946) VUID-vkCmdResetEvent2-stageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-10751) VUID-vkCmdResetEvent2-stageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-10752) VUID-vkCmdResetEvent2-stageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-stageMask-10753) VUID-vkCmdResetEvent2-stageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-synchronization2-03829) VUID-vkCmdResetEvent2-synchronization2-03829

The [`synchronization2`](features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdResetEvent2-stageMask-03830) VUID-vkCmdResetEvent2-stageMask-03830

`stageMask` **must** not include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdResetEvent2-event-03831) VUID-vkCmdResetEvent2-event-03831

There **must** be an execution dependency between `vkCmdResetEvent2`
and the execution of any [vkCmdWaitEvents](#vkCmdWaitEvents) that includes `event`
in its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent2-event-03832) VUID-vkCmdResetEvent2-event-03832

There **must** be an execution dependency between `vkCmdResetEvent2`
and the execution of any [vkCmdWaitEvents2](#vkCmdWaitEvents2) that includes
`event` in its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-03833) VUID-vkCmdResetEvent2-commandBuffer-03833

`commandBuffer`’s current device mask **must** include exactly one
physical device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-parameter) VUID-vkCmdResetEvent2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdResetEvent2-event-parameter) VUID-vkCmdResetEvent2-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkCmdResetEvent2-stageMask-parameter) VUID-vkCmdResetEvent2-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-recording) VUID-vkCmdResetEvent2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-cmdpool) VUID-vkCmdResetEvent2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdResetEvent2-renderpass) VUID-vkCmdResetEvent2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResetEvent2-suspended) VUID-vkCmdResetEvent2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResetEvent2-commonparent) VUID-vkCmdResetEvent2-commonparent

 Both of `commandBuffer`, and `event` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdResetEvent2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To set the state of an event to unsignaled from a device, call:

|  | This functionality is superseded by [vkCmdResetEvent2](#vkCmdResetEvent2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdResetEvent(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags                        stageMask);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be unsignaled.

* 
`stageMask` is a bitmask of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) specifying
the [source stage mask](#synchronization-pipeline-stages) used to
determine when the `event` is unsignaled.

`vkCmdResetEvent` behaves identically to [vkCmdResetEvent2](#vkCmdResetEvent2).

Valid Usage

* 
[](#VUID-vkCmdResetEvent-stageMask-04090) VUID-vkCmdResetEvent-stageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-04091) VUID-vkCmdResetEvent-stageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-04092) VUID-vkCmdResetEvent-stageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-04093) VUID-vkCmdResetEvent-stageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-04094) VUID-vkCmdResetEvent-stageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-04095) VUID-vkCmdResetEvent-stageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-04096) VUID-vkCmdResetEvent-stageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-07318) VUID-vkCmdResetEvent-stageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-03937) VUID-vkCmdResetEvent-stageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `stageMask` **must** not be `0`

* 
[](#VUID-vkCmdResetEvent-stageMask-07949) VUID-vkCmdResetEvent-stageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-10754) VUID-vkCmdResetEvent-stageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-stageMask-06458) VUID-vkCmdResetEvent-stageMask-06458

Any pipeline stage included in `stageMask` **must** be supported by the
capabilities of the queue family specified by the `queueFamilyIndex`
member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that was used to
create the `VkCommandPool` that `commandBuffer` was allocated
from, as specified in the [    table of supported pipeline stages](#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdResetEvent-stageMask-01153) VUID-vkCmdResetEvent-stageMask-01153

`stageMask` **must** not include [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdResetEvent-event-03834) VUID-vkCmdResetEvent-event-03834

There **must** be an execution dependency between `vkCmdResetEvent` and
the execution of any [vkCmdWaitEvents](#vkCmdWaitEvents) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent-event-03835) VUID-vkCmdResetEvent-event-03835

There **must** be an execution dependency between `vkCmdResetEvent` and
the execution of any [vkCmdWaitEvents2](#vkCmdWaitEvents2) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent-commandBuffer-01157) VUID-vkCmdResetEvent-commandBuffer-01157

`commandBuffer`’s current device mask **must** include exactly one
physical device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResetEvent-commandBuffer-parameter) VUID-vkCmdResetEvent-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdResetEvent-event-parameter) VUID-vkCmdResetEvent-event-parameter

 `event` **must** be a valid [VkEvent](#VkEvent) handle

* 
[](#VUID-vkCmdResetEvent-stageMask-parameter) VUID-vkCmdResetEvent-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) values

* 
[](#VUID-vkCmdResetEvent-commandBuffer-recording) VUID-vkCmdResetEvent-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResetEvent-commandBuffer-cmdpool) VUID-vkCmdResetEvent-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdResetEvent-renderpass) VUID-vkCmdResetEvent-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResetEvent-suspended) VUID-vkCmdResetEvent-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResetEvent-commonparent) VUID-vkCmdResetEvent-commonparent

 Both of `commandBuffer`, and `event` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdResetEvent is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To wait for one or more events to enter the signaled state on a device,
call:

// Provided by VK_VERSION_1_3
void vkCmdWaitEvents2(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    eventCount,
    const VkEvent*                              pEvents,
    const VkDependencyInfo*                     pDependencyInfos);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdWaitEvents2
void vkCmdWaitEvents2KHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    eventCount,
    const VkEvent*                              pEvents,
    const VkDependencyInfo*                     pDependencyInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`eventCount` is the length of the `pEvents` array.

* 
`pEvents` is a pointer to an array of `eventCount` events to
wait on.

* 
`pDependencyInfos` is a pointer to an array of `eventCount`
[VkDependencyInfo](#VkDependencyInfo) structures, defining the second
[synchronization scope](#synchronization-dependencies-scopes).

When `vkCmdWaitEvents2` is submitted to a queue, it inserts memory
dependencies according to the elements of `pDependencyInfos` and each
corresponding element of `pEvents`.
`vkCmdWaitEvents2` **must** not be used to wait on event signal operations
occurring on other queues, or signal operations executed by
[vkCmdSetEvent](#vkCmdSetEvent).

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) of each memory
dependency defined by any element i of `pDependencyInfos` are
applied to operations that occurred earlier in
[submission order](#synchronization-submission-order) than the last event
signal operation on element i of `pEvents`.

Signal operations for an event at index i are only included if:

* 
The event was signaled by a [vkCmdSetEvent2](#vkCmdSetEvent2) command that occurred
earlier in [submission order](#synchronization-submission-order) with a
`dependencyInfo` parameter exactly equal to the element of
`pDependencyInfos` at index i ; or

* 
The event was created without [VK_EVENT_CREATE_DEVICE_ONLY_BIT](#VkEventCreateFlagBits), and
the first [synchronization scope](#synchronization-dependencies-scopes)
defined by the element of `pDependencyInfos` at index i only
includes host operations ([VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)).

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) of each
memory dependency defined by any element i of `pDependencyInfos`
are applied to operations that occurred later in
[submission order](#synchronization-submission-order) than
`vkCmdWaitEvents2`.

|  | [vkCmdWaitEvents2](#vkCmdWaitEvents2) is used with [vkCmdSetEvent2](#vkCmdSetEvent2) to define a memory
| --- | --- |
dependency between two sets of action commands, roughly in the same way as
pipeline barriers, but split into two commands such that work between the
two **may** execute unhindered. |

|  | Applications should be careful to avoid race conditions when using events.
| --- | --- |
There is no direct ordering guarantee between `vkCmdSetEvent2` and
[vkCmdResetEvent2](#vkCmdResetEvent2), [vkCmdResetEvent](#vkCmdResetEvent), or [vkCmdSetEvent](#vkCmdSetEvent).
Another execution dependency (e.g. a pipeline barrier or semaphore with
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)) is needed to prevent such a race
condition. |

Valid Usage

* 
[](#VUID-vkCmdWaitEvents2-image-09373) VUID-vkCmdWaitEvents2-image-09373

If `vkCmdWaitEvents2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-vkCmdWaitEvents2-image-09374) VUID-vkCmdWaitEvents2-image-09374

If `vkCmdWaitEvents2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat`
value

* 
[](#VUID-vkCmdWaitEvents2-oldLayout-01181) VUID-vkCmdWaitEvents2-oldLayout-01181

If `vkCmdWaitEvents2` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents2-srcQueueFamilyIndex-01182) VUID-vkCmdWaitEvents2-srcQueueFamilyIndex-01182

If `vkCmdWaitEvents2` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents2-synchronization2-03836) VUID-vkCmdWaitEvents2-synchronization2-03836

The [`synchronization2`](features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03837) VUID-vkCmdWaitEvents2-pEvents-03837

Members of `pEvents` **must** not have been signaled by
[vkCmdSetEvent](#vkCmdSetEvent)

* 
[](#VUID-vkCmdWaitEvents2-pEvents-10788) VUID-vkCmdWaitEvents2-pEvents-10788

For each element i of `pEvents`,
if the `dependencyFlags` member of the ith element of
`pDependencyInfos` does not include
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits), and
if that event is signaled by [vkCmdSetEvent2](#vkCmdSetEvent2), that command’s
`dependencyInfo` parameter **must** be exactly equal to the ith
element of `pDependencyInfos`

* 
[](#VUID-vkCmdWaitEvents2-pEvents-10789) VUID-vkCmdWaitEvents2-pEvents-10789

For each element i of `pEvents`, if the `dependencyFlags`
member of the ith element of `pDependencyInfos` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits), that event **must** be
signaled by [vkCmdSetEvent2](#vkCmdSetEvent2) with
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdWaitEvents2-pEvents-10790) VUID-vkCmdWaitEvents2-pEvents-10790

For each element i of `pEvents`, if the `dependencyFlags`
member of the ith element of `pDependencyInfos` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits), the union of
`srcStageMask` members of all elements of `pMemoryBarriers`,
`pBufferMemoryBarriers`, and `pImageMemoryBarriers` of the
ith element of `pDependencyInfos` **must** equal
`pDependencyInfos->pMemoryBarriers`[0].`srcStageMask` in the
[vkCmdSetEvent2](#vkCmdSetEvent2) command

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03839) VUID-vkCmdWaitEvents2-pEvents-03839

For each element i of `pEvents`, if that event is signaled by
[vkSetEvent](#vkSetEvent), barriers in the ith element of
`pDependencyInfos` **must** include only host operations in their first
[synchronization scope](#synchronization-dependencies-scopes)

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03840) VUID-vkCmdWaitEvents2-pEvents-03840

For each element i of `pEvents`, if barriers in the
ith element of `pDependencyInfos` include only host
operations, the ith element of `pEvents` **must** be signaled
before [vkCmdWaitEvents2](#vkCmdWaitEvents2) is executed

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03841) VUID-vkCmdWaitEvents2-pEvents-03841

For each element i of `pEvents`, if barriers in the
ith element of `pDependencyInfos` do not include host
operations, the ith element of `pEvents` **must** be signaled
by a corresponding [vkCmdSetEvent2](#vkCmdSetEvent2) that occurred earlier in
[submission order](#synchronization-submission-order)

* 
[](#VUID-vkCmdWaitEvents2-srcStageMask-03842) VUID-vkCmdWaitEvents2-srcStageMask-03842

The `srcStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfos` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdWaitEvents2-dstStageMask-03843) VUID-vkCmdWaitEvents2-dstStageMask-03843

The `dstStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfos` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdWaitEvents2-dependencyFlags-10394) VUID-vkCmdWaitEvents2-dependencyFlags-10394

The `dependencyFlags` member of any element of `pDependencyInfo`
**must** not include any of the following bits:

[VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits)

* 
[VK_DEPENDENCY_DEVICE_GROUP_BIT](#VkDependencyFlagBits)

* 
[VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits)

* 
[VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT](#VkDependencyFlagBits)

[](#VUID-vkCmdWaitEvents2-maintenance8-10205) VUID-vkCmdWaitEvents2-maintenance8-10205

If the [`maintenance8`](features.html#features-maintenance8) feature is not
enabled, the `dependencyFlags` members of any element of
`pDependencyInfos` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits)

[](#VUID-vkCmdWaitEvents2-dependencyFlags-03844) VUID-vkCmdWaitEvents2-dependencyFlags-03844

If this command is called inside a render pass instance, the
`srcStageMask` member of any element of the `pMemoryBarriers`,
`pBufferMemoryBarriers`, or `pImageMemoryBarriers` members of
`pDependencyInfos` **must** not include
[VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

[](#VUID-vkCmdWaitEvents2-commandBuffer-03846) VUID-vkCmdWaitEvents2-commandBuffer-03846

`commandBuffer`’s current device mask **must** include exactly one
physical device

[](#VUID-vkCmdWaitEvents2-None-10654) VUID-vkCmdWaitEvents2-None-10654

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWaitEvents2-commandBuffer-parameter) VUID-vkCmdWaitEvents2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWaitEvents2-pEvents-parameter) VUID-vkCmdWaitEvents2-pEvents-parameter

 `pEvents` **must** be a valid pointer to an array of `eventCount` valid [VkEvent](#VkEvent) handles

* 
[](#VUID-vkCmdWaitEvents2-pDependencyInfos-parameter) VUID-vkCmdWaitEvents2-pDependencyInfos-parameter

 `pDependencyInfos` **must** be a valid pointer to an array of `eventCount` valid [VkDependencyInfo](#VkDependencyInfo) structures

* 
[](#VUID-vkCmdWaitEvents2-commandBuffer-recording) VUID-vkCmdWaitEvents2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWaitEvents2-commandBuffer-cmdpool) VUID-vkCmdWaitEvents2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWaitEvents2-suspended) VUID-vkCmdWaitEvents2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWaitEvents2-eventCount-arraylength) VUID-vkCmdWaitEvents2-eventCount-arraylength

 `eventCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWaitEvents2-commonparent) VUID-vkCmdWaitEvents2-commonparent

 Both of `commandBuffer`, and the elements of `pEvents` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdWaitEvents2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To wait for one or more events to enter the signaled state on a device,
call:

|  | This functionality is superseded by [vkCmdWaitEvents2](#vkCmdWaitEvents2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdWaitEvents(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    eventCount,
    const VkEvent*                              pEvents,
    VkPipelineStageFlags                        srcStageMask,
    VkPipelineStageFlags                        dstStageMask,
    uint32_t                                    memoryBarrierCount,
    const VkMemoryBarrier*                      pMemoryBarriers,
    uint32_t                                    bufferMemoryBarrierCount,
    const VkBufferMemoryBarrier*                pBufferMemoryBarriers,
    uint32_t                                    imageMemoryBarrierCount,
    const VkImageMemoryBarrier*                 pImageMemoryBarriers);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`eventCount` is the length of the `pEvents` array.

* 
`pEvents` is a pointer to an array of event object handles to wait
on.

* 
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits)
specifying the [source stage mask](#synchronization-pipeline-stages).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits)
specifying the [destination stage    mask](#synchronization-pipeline-stages).

* 
`memoryBarrierCount` is the length of the `pMemoryBarriers`
array.

* 
`pMemoryBarriers` is a pointer to an array of [VkMemoryBarrier](#VkMemoryBarrier)
structures.

* 
`bufferMemoryBarrierCount` is the length of the
`pBufferMemoryBarriers` array.

* 
`pBufferMemoryBarriers` is a pointer to an array of
[VkBufferMemoryBarrier](#VkBufferMemoryBarrier) structures.

* 
`imageMemoryBarrierCount` is the length of the
`pImageMemoryBarriers` array.

* 
`pImageMemoryBarriers` is a pointer to an array of
[VkImageMemoryBarrier](#VkImageMemoryBarrier) structures.

`vkCmdWaitEvents` is largely similar to [vkCmdWaitEvents2](#vkCmdWaitEvents2), but **can**
only wait on signal operations defined by [vkCmdSetEvent](#vkCmdSetEvent).
As [vkCmdSetEvent](#vkCmdSetEvent) does not define any access scopes,
`vkCmdWaitEvents` defines the first access scope for each event signal
operation in addition to its own access scopes.

|  | Since [vkCmdSetEvent](#vkCmdSetEvent) does not have any dependency information beyond a
| --- | --- |
stage mask, implementations do not have the same opportunity to perform
[availability and visibility operations](#synchronization-dependencies-available-and-visible) or [image layout transitions](#synchronization-image-layout-transitions) in advance as they do with [vkCmdSetEvent2](#vkCmdSetEvent2) and
[vkCmdWaitEvents2](#vkCmdWaitEvents2). |

When `vkCmdWaitEvents` is submitted to a queue, it defines a memory
dependency between prior event signal operations on the same queue or the
host, and subsequent commands.
`vkCmdWaitEvents` **must** not be used to wait on event signal operations
occurring on other queues.

The first synchronization scope only includes event signal operations that
operate on members of `pEvents`, and the operations that happened-before
the event signal operations.
Event signal operations performed by [vkCmdSetEvent](#vkCmdSetEvent) that occur earlier
in [submission order](#synchronization-submission-order) are included in the
first synchronization scope, if the [logically latest](#synchronization-pipeline-stages-order) pipeline stage in their `stageMask` parameter is
[logically earlier](#synchronization-pipeline-stages-order) than or equal
to the [logically latest](#synchronization-pipeline-stages-order) pipeline
stage in `srcStageMask`.
Event signal operations performed by [vkSetEvent](#vkSetEvent) are only included in
the first synchronization scope if [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits) is
included in `srcStageMask`.

The second [synchronization scope](#synchronization-dependencies-scopes)
includes all commands that occur later in
[submission order](#synchronization-submission-order).
The second synchronization scope is limited to operations on the pipeline
stages determined by the [destination stage mask](#synchronization-pipeline-stages-masks) specified by `dstStageMask`.

The first [access scope](#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[source stage mask](#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.
Within that, the first access scope only includes the first access scopes
defined by elements of the `pMemoryBarriers`,
`pBufferMemoryBarriers` and `pImageMemoryBarriers` arrays, which
each define a set of [memory barriers](#synchronization-memory-barriers).
If no memory barriers are specified, then the first access scope includes no
accesses.

The second [access scope](#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[destination stage mask](#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.
Within that, the second access scope only includes the second access scopes
defined by elements of the `pMemoryBarriers`,
`pBufferMemoryBarriers` and `pImageMemoryBarriers` arrays, which
each define a set of [memory barriers](#synchronization-memory-barriers).
If no memory barriers are specified, then the second access scope includes
no accesses.

Valid Usage

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04090) VUID-vkCmdWaitEvents-srcStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04091) VUID-vkCmdWaitEvents-srcStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04092) VUID-vkCmdWaitEvents-srcStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04093) VUID-vkCmdWaitEvents-srcStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04094) VUID-vkCmdWaitEvents-srcStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04095) VUID-vkCmdWaitEvents-srcStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04096) VUID-vkCmdWaitEvents-srcStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-07318) VUID-vkCmdWaitEvents-srcStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-03937) VUID-vkCmdWaitEvents-srcStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-07949) VUID-vkCmdWaitEvents-srcStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-10754) VUID-vkCmdWaitEvents-srcStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcAccessMask-06257) VUID-vkCmdWaitEvents-srcAccessMask-06257

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
a memory barrier `srcAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04090) VUID-vkCmdWaitEvents-dstStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04091) VUID-vkCmdWaitEvents-dstStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04092) VUID-vkCmdWaitEvents-dstStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04093) VUID-vkCmdWaitEvents-dstStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04094) VUID-vkCmdWaitEvents-dstStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04095) VUID-vkCmdWaitEvents-dstStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04096) VUID-vkCmdWaitEvents-dstStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-07318) VUID-vkCmdWaitEvents-dstStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-03937) VUID-vkCmdWaitEvents-dstStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-07949) VUID-vkCmdWaitEvents-dstStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-10754) VUID-vkCmdWaitEvents-dstStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-dstAccessMask-06257) VUID-vkCmdWaitEvents-dstAccessMask-06257

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
a memory barrier `dstAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcAccessMask-02815) VUID-vkCmdWaitEvents-srcAccessMask-02815

The `srcAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-dstAccessMask-02816) VUID-vkCmdWaitEvents-dstAccessMask-02816

The `dstAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02817) VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02817

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02818) VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02818

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pImageMemoryBarriers-02819) VUID-vkCmdWaitEvents-pImageMemoryBarriers-02819

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pImageMemoryBarriers-02820) VUID-vkCmdWaitEvents-pImageMemoryBarriers-02820

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-image-09373) VUID-vkCmdWaitEvents-image-09373

If `vkCmdWaitEvents` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-vkCmdWaitEvents-image-09374) VUID-vkCmdWaitEvents-image-09374

If `vkCmdWaitEvents` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat`
value

* 
[](#VUID-vkCmdWaitEvents-oldLayout-01181) VUID-vkCmdWaitEvents-oldLayout-01181

If `vkCmdWaitEvents` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents-srcQueueFamilyIndex-01182) VUID-vkCmdWaitEvents-srcQueueFamilyIndex-01182

If `vkCmdWaitEvents` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-06459) VUID-vkCmdWaitEvents-srcStageMask-06459

Any pipeline stage included in `srcStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-06460) VUID-vkCmdWaitEvents-dstStageMask-06460

Any pipeline stage included in `dstStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-01158) VUID-vkCmdWaitEvents-srcStageMask-01158

`srcStageMask` **must** be the bitwise OR of the `stageMask`
parameter used in previous calls to `vkCmdSetEvent` with any of the
elements of `pEvents` and [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits) if any of
the elements of `pEvents` was set using `vkSetEvent`

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-07308) VUID-vkCmdWaitEvents-srcStageMask-07308

If this command is called inside a render pass instance,
`srcStageMask` **must** not include [VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWaitEvents-srcQueueFamilyIndex-02803) VUID-vkCmdWaitEvents-srcQueueFamilyIndex-02803

The `srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of
any element of `pBufferMemoryBarriers` or `pImageMemoryBarriers`
**must** be equal

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-01167) VUID-vkCmdWaitEvents-commandBuffer-01167

`commandBuffer`’s current device mask **must** include exactly one
physical device

* 
[](#VUID-vkCmdWaitEvents-pEvents-03847) VUID-vkCmdWaitEvents-pEvents-03847

Elements of `pEvents` **must** not have been signaled by
[vkCmdSetEvent2](#vkCmdSetEvent2)

* 
[](#VUID-vkCmdWaitEvents-None-10655) VUID-vkCmdWaitEvents-None-10655

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-parameter) VUID-vkCmdWaitEvents-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWaitEvents-pEvents-parameter) VUID-vkCmdWaitEvents-pEvents-parameter

 `pEvents` **must** be a valid pointer to an array of `eventCount` valid [VkEvent](#VkEvent) handles

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-parameter) VUID-vkCmdWaitEvents-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) values

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-parameter) VUID-vkCmdWaitEvents-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) values

* 
[](#VUID-vkCmdWaitEvents-pMemoryBarriers-parameter) VUID-vkCmdWaitEvents-pMemoryBarriers-parameter

 If `memoryBarrierCount` is not `0`, `pMemoryBarriers` **must** be a valid pointer to an array of `memoryBarrierCount` valid [VkMemoryBarrier](#VkMemoryBarrier) structures

* 
[](#VUID-vkCmdWaitEvents-pBufferMemoryBarriers-parameter) VUID-vkCmdWaitEvents-pBufferMemoryBarriers-parameter

 If `bufferMemoryBarrierCount` is not `0`, `pBufferMemoryBarriers` **must** be a valid pointer to an array of `bufferMemoryBarrierCount` valid [VkBufferMemoryBarrier](#VkBufferMemoryBarrier) structures

* 
[](#VUID-vkCmdWaitEvents-pImageMemoryBarriers-parameter) VUID-vkCmdWaitEvents-pImageMemoryBarriers-parameter

 If `imageMemoryBarrierCount` is not `0`, `pImageMemoryBarriers` **must** be a valid pointer to an array of `imageMemoryBarrierCount` valid [VkImageMemoryBarrier](#VkImageMemoryBarrier) structures

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-recording) VUID-vkCmdWaitEvents-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-cmdpool) VUID-vkCmdWaitEvents-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWaitEvents-suspended) VUID-vkCmdWaitEvents-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWaitEvents-eventCount-arraylength) VUID-vkCmdWaitEvents-eventCount-arraylength

 `eventCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWaitEvents-commonparent) VUID-vkCmdWaitEvents-commonparent

 Both of `commandBuffer`, and the elements of `pEvents` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdWaitEvents is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record a pipeline barrier, call:

// Provided by VK_VERSION_1_3
void vkCmdPipelineBarrier2(
    VkCommandBuffer                             commandBuffer,
    const VkDependencyInfo*                     pDependencyInfo);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdPipelineBarrier2
void vkCmdPipelineBarrier2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDependencyInfo*                     pDependencyInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pDependencyInfo` is a pointer to a [VkDependencyInfo](#VkDependencyInfo) structure
defining the scopes of this operation.

When [vkCmdPipelineBarrier2](#vkCmdPipelineBarrier2) is submitted to a queue, it defines memory
dependencies between commands that were submitted to the same queue before
it, and those submitted to the same queue after it.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) of each memory
dependency defined by `pDependencyInfo` are applied to operations that
occurred earlier in [submission order](#synchronization-submission-order).

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) of each
memory dependency defined by `pDependencyInfo` are applied to operations
that occurred later in [submission order](#synchronization-submission-order).

If `vkCmdPipelineBarrier2` is recorded within a render pass instance,
the synchronization scopes are limited to a subset of operations within the
same subpass or render pass instance.

Valid Usage

* 
[](#VUID-vkCmdPipelineBarrier2-None-07889) VUID-vkCmdPipelineBarrier2-None-07889

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, the render pass **must** have been created with
at least one subpass dependency that expresses a dependency from the
current subpass to itself, does not include
[VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits) if this command does not,
does not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits) if this command does
not,
and has [synchronization scopes](#synchronization-dependencies-scopes)
and [access scopes](#synchronization-dependencies-access-scopes) that
are all supersets of the scopes defined in this command

* 
[](#VUID-vkCmdPipelineBarrier2-bufferMemoryBarrierCount-01178) VUID-vkCmdPipelineBarrier2-bufferMemoryBarrierCount-01178

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, it **must** not include any buffer memory
barriers

* 
[](#VUID-vkCmdPipelineBarrier2-image-04073) VUID-vkCmdPipelineBarrier2-image-04073

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, the `image` member of any image memory
barrier included in this command **must** be an attachment used in the
current subpass both as an input attachment, and as either a color,
color resolve,
or depth/stencil attachment

* 
[](#VUID-vkCmdPipelineBarrier2-None-07890) VUID-vkCmdPipelineBarrier2-None-07890

If `vkCmdPipelineBarrier2` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](#synchronization-framebuffer-regions),
destination stage masks of all memory barriers **must** only include
[framebuffer-space stages](#synchronization-framebuffer-regions)

* 
[](#VUID-vkCmdPipelineBarrier2-dependencyFlags-07891) VUID-vkCmdPipelineBarrier2-dependencyFlags-07891

If `vkCmdPipelineBarrier2` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier2-None-07892) VUID-vkCmdPipelineBarrier2-None-07892

If `vkCmdPipelineBarrier2` is called within a render pass instance, the source
and destination stage masks of any memory barriers **must** only include
graphics pipeline stages

* 
[](#VUID-vkCmdPipelineBarrier2-dependencyFlags-01186) VUID-vkCmdPipelineBarrier2-dependencyFlags-01186

If `vkCmdPipelineBarrier2` is called outside of a render pass instance, the
dependency flags **must** not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier2-None-07893) VUID-vkCmdPipelineBarrier2-None-07893

If `vkCmdPipelineBarrier2` is called inside a render pass instance, and there is
more than one view in the current subpass, dependency flags **must**
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier2-None-09553) VUID-vkCmdPipelineBarrier2-None-09553

    
    If
    none of the [    `shaderTileImageColorReadAccess`](features.html#features-shaderTileImageColorReadAccess),
    [    `shaderTileImageStencilReadAccess`](features.html#features-shaderTileImageStencilReadAccess), or
    [    `shaderTileImageDepthReadAccess`](features.html#features-shaderTileImageDepthReadAccess) features are enabled,
and
    the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
    `vkCmdPipelineBarrier2` **must** not be called within a render pass instance
    started with [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
[](#VUID-vkCmdPipelineBarrier2-None-09554) VUID-vkCmdPipelineBarrier2-None-09554

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), there **must** be no buffer or image memory
barriers specified by this command

* 
[](#VUID-vkCmdPipelineBarrier2-None-09586) VUID-vkCmdPipelineBarrier2-None-09586

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), memory barriers specified by this command
**must** only include [VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), or
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR) in their access
masks

* 
[](#VUID-vkCmdPipelineBarrier2-image-09555) VUID-vkCmdPipelineBarrier2-image-09555

If `vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), and the `image` member of any image
memory barrier is used as an attachment in the current render pass
instance, it **must** be in the [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)
or [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdPipelineBarrier2-srcStageMask-09556) VUID-vkCmdPipelineBarrier2-srcStageMask-09556

If `vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), this command **must** only specify
[framebuffer-space stages](#synchronization-framebuffer-regions) in
`srcStageMask` and `dstStageMask`

* 
[](#VUID-vkCmdPipelineBarrier2-image-09373) VUID-vkCmdPipelineBarrier2-image-09373

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-vkCmdPipelineBarrier2-image-09374) VUID-vkCmdPipelineBarrier2-image-09374

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat`
value

* 
[](#VUID-vkCmdPipelineBarrier2-oldLayout-01181) VUID-vkCmdPipelineBarrier2-oldLayout-01181

If `vkCmdPipelineBarrier2` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-01182) VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-01182

If `vkCmdPipelineBarrier2` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier2-synchronization2-03848) VUID-vkCmdPipelineBarrier2-synchronization2-03848

The [`synchronization2`](features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdPipelineBarrier2-srcStageMask-09673) VUID-vkCmdPipelineBarrier2-srcStageMask-09673

The `srcStageMask` member of any element of the
`pMemoryBarriers` member of `pDependencyInfo` **must** only include
pipeline stages valid for the queue family that was used to create the
command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-dstStageMask-09674) VUID-vkCmdPipelineBarrier2-dstStageMask-09674

The `dstStageMask` member of any element of the
`pMemoryBarriers` member of `pDependencyInfo` **must** only include
pipeline stages valid for the queue family that was used to create the
command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-srcStageMask-09675) VUID-vkCmdPipelineBarrier2-srcStageMask-09675

If a buffer or image memory barrier does not specify an
[acquire operation](#synchronization-queue-transfers-acquire),
or if it does but `pDependencyInfo->dependencyFlags` includes
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the respective `srcStageMask` member of the element of the
`pBufferMemoryBarriers` or `pImageMemoryBarriers` members of
`pDependencyInfo` **must** only include pipeline stages valid for the
queue family that was used to create the command pool that
`commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-dstStageMask-09676) VUID-vkCmdPipelineBarrier2-dstStageMask-09676

If a buffer or image memory barrier does not specify an
[release operation](#synchronization-queue-transfers-release),
or if it does but `pDependencyInfo->dependencyFlags` includes
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the respective `dstStageMask` member of the element of the
`pBufferMemoryBarriers` or `pImageMemoryBarriers` members of
`pDependencyInfo` **must** only include pipeline stages valid for the
queue family that was used to create the command pool that
`commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-10387) VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-10387

If a buffer or image memory barrier specifies a
[queue family ownership transfer    operation](#synchronization-queue-transfers), either the `srcQueueFamilyIndex` or
`dstQueueFamilyIndex` member of the element of the
`pBufferMemoryBarriers` or `pImageMemoryBarriers` members of
`pDependencyInfo` and the queue family index that was used to create
the command pool that `commandBuffer` was allocated from **must** be
equal

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPipelineBarrier2-commandBuffer-parameter) VUID-vkCmdPipelineBarrier2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPipelineBarrier2-pDependencyInfo-parameter) VUID-vkCmdPipelineBarrier2-pDependencyInfo-parameter

 `pDependencyInfo` **must** be a valid pointer to a valid [VkDependencyInfo](#VkDependencyInfo) structure

* 
[](#VUID-vkCmdPipelineBarrier2-commandBuffer-recording) VUID-vkCmdPipelineBarrier2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPipelineBarrier2-commandBuffer-cmdpool) VUID-vkCmdPipelineBarrier2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPipelineBarrier2-suspended) VUID-vkCmdPipelineBarrier2-suspended

 This command **must** not be called between suspended render pass instances

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdPipelineBarrier2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record a pipeline barrier, call:

|  | This functionality is superseded by [vkCmdPipelineBarrier2](#vkCmdPipelineBarrier2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdPipelineBarrier(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlags                        srcStageMask,
    VkPipelineStageFlags                        dstStageMask,
    VkDependencyFlags                           dependencyFlags,
    uint32_t                                    memoryBarrierCount,
    const VkMemoryBarrier*                      pMemoryBarriers,
    uint32_t                                    bufferMemoryBarrierCount,
    const VkBufferMemoryBarrier*                pBufferMemoryBarriers,
    uint32_t                                    imageMemoryBarrierCount,
    const VkImageMemoryBarrier*                 pImageMemoryBarriers);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits)
specifying the [source stages](#synchronization-pipeline-stages-masks).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits)
specifying the [destination    stages](#synchronization-pipeline-stages-masks).

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](#VkDependencyFlagBits)
specifying how execution and memory dependencies are formed.

* 
`memoryBarrierCount` is the length of the `pMemoryBarriers`
array.

* 
`pMemoryBarriers` is a pointer to an array of [VkMemoryBarrier](#VkMemoryBarrier)
structures.

* 
`bufferMemoryBarrierCount` is the length of the
`pBufferMemoryBarriers` array.

* 
`pBufferMemoryBarriers` is a pointer to an array of
[VkBufferMemoryBarrier](#VkBufferMemoryBarrier) structures.

* 
`imageMemoryBarrierCount` is the length of the
`pImageMemoryBarriers` array.

* 
`pImageMemoryBarriers` is a pointer to an array of
[VkImageMemoryBarrier](#VkImageMemoryBarrier) structures.

`vkCmdPipelineBarrier` operates almost identically to
[vkCmdPipelineBarrier2](#vkCmdPipelineBarrier2), except that the scopes and barriers are defined
as direct parameters rather than being defined by a [VkDependencyInfo](#VkDependencyInfo).

When [vkCmdPipelineBarrier](#vkCmdPipelineBarrier) is submitted to a queue, it defines a memory
dependency between commands that were submitted to the same queue before it,
and those submitted to the same queue after it.

If [vkCmdPipelineBarrier](#vkCmdPipelineBarrier) was recorded outside a render pass instance,
the first [synchronization scope](#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](#synchronization-submission-order).
If [vkCmdPipelineBarrier](#vkCmdPipelineBarrier) was recorded inside a render pass instance,
the first synchronization scope includes only commands that occur earlier in
[submission order](#synchronization-submission-order) within the same
subpass.
In either case, the first synchronization scope is limited to operations on
the pipeline stages determined by the
[source stage mask](#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.

If [vkCmdPipelineBarrier](#vkCmdPipelineBarrier) was recorded outside a render pass instance,
the second [synchronization scope](#synchronization-dependencies-scopes)
includes all commands that occur later in
[submission order](#synchronization-submission-order).
If [vkCmdPipelineBarrier](#vkCmdPipelineBarrier) was recorded inside a render pass instance,
the second synchronization scope includes only commands that occur later in
[submission order](#synchronization-submission-order) within the same
subpass.
In either case, the second synchronization scope is limited to operations on
the pipeline stages determined by the
[destination stage mask](#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.

The first [access scope](#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[source stage mask](#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.
Within that, the first access scope only includes the first access scopes
defined by elements of the `pMemoryBarriers`,
`pBufferMemoryBarriers` and `pImageMemoryBarriers` arrays, which
each define a set of [memory barriers](#synchronization-memory-barriers).
If no memory barriers are specified, then the first access scope includes no
accesses.

The second [access scope](#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[destination stage mask](#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.
Within that, the second access scope only includes the second access scopes
defined by elements of the `pMemoryBarriers`,
`pBufferMemoryBarriers` and `pImageMemoryBarriers` arrays, which
each define a set of [memory barriers](#synchronization-memory-barriers).
If no memory barriers are specified, then the second access scope includes
no accesses.

If `dependencyFlags` includes [VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits), then
any dependency between [framebuffer-space](#synchronization-framebuffer-regions) pipeline stages is
[framebuffer-local](#synchronization-framebuffer-regions) - otherwise it is
[framebuffer-global](#synchronization-framebuffer-regions).

Valid Usage

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04090) VUID-vkCmdPipelineBarrier-srcStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04091) VUID-vkCmdPipelineBarrier-srcStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04092) VUID-vkCmdPipelineBarrier-srcStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04093) VUID-vkCmdPipelineBarrier-srcStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04094) VUID-vkCmdPipelineBarrier-srcStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04095) VUID-vkCmdPipelineBarrier-srcStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04096) VUID-vkCmdPipelineBarrier-srcStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-07318) VUID-vkCmdPipelineBarrier-srcStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-03937) VUID-vkCmdPipelineBarrier-srcStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-07949) VUID-vkCmdPipelineBarrier-srcStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-10754) VUID-vkCmdPipelineBarrier-srcStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcAccessMask-06257) VUID-vkCmdPipelineBarrier-srcAccessMask-06257

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
a memory barrier `srcAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04090) VUID-vkCmdPipelineBarrier-dstStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04091) VUID-vkCmdPipelineBarrier-dstStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04092) VUID-vkCmdPipelineBarrier-dstStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04093) VUID-vkCmdPipelineBarrier-dstStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04094) VUID-vkCmdPipelineBarrier-dstStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04095) VUID-vkCmdPipelineBarrier-dstStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04096) VUID-vkCmdPipelineBarrier-dstStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-07318) VUID-vkCmdPipelineBarrier-dstStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-03937) VUID-vkCmdPipelineBarrier-dstStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-07949) VUID-vkCmdPipelineBarrier-dstStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-10754) VUID-vkCmdPipelineBarrier-dstStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-dstAccessMask-06257) VUID-vkCmdPipelineBarrier-dstAccessMask-06257

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
a memory barrier `dstAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-srcAccessMask-02815) VUID-vkCmdPipelineBarrier-srcAccessMask-02815

The `srcAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-dstAccessMask-02816) VUID-vkCmdPipelineBarrier-dstAccessMask-02816

The `dstAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02817) VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02817

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02818) VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02818

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02819) VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02819

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02820) VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02820

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-image-09373) VUID-vkCmdPipelineBarrier-image-09373

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-vkCmdPipelineBarrier-image-09374) VUID-vkCmdPipelineBarrier-image-09374

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat`
value

* 
[](#VUID-vkCmdPipelineBarrier-oldLayout-01181) VUID-vkCmdPipelineBarrier-oldLayout-01181

If `vkCmdPipelineBarrier` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-01182) VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-01182

If `vkCmdPipelineBarrier` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-None-07889) VUID-vkCmdPipelineBarrier-None-07889

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, the render pass **must** have been created with
at least one subpass dependency that expresses a dependency from the
current subpass to itself, does not include
[VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits) if this command does not,
does not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits) if this command does
not,
and has [synchronization scopes](#synchronization-dependencies-scopes)
and [access scopes](#synchronization-dependencies-access-scopes) that
are all supersets of the scopes defined in this command

* 
[](#VUID-vkCmdPipelineBarrier-bufferMemoryBarrierCount-01178) VUID-vkCmdPipelineBarrier-bufferMemoryBarrierCount-01178

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, it **must** not include any buffer memory
barriers

* 
[](#VUID-vkCmdPipelineBarrier-image-04073) VUID-vkCmdPipelineBarrier-image-04073

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](renderpass.html#VkRenderPass) object, the `image` member of any image memory
barrier included in this command **must** be an attachment used in the
current subpass both as an input attachment, and as either a color,
color resolve,
or depth/stencil attachment

* 
[](#VUID-vkCmdPipelineBarrier-None-07890) VUID-vkCmdPipelineBarrier-None-07890

If `vkCmdPipelineBarrier` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](#synchronization-framebuffer-regions),
destination stage masks of all memory barriers **must** only include
[framebuffer-space stages](#synchronization-framebuffer-regions)

* 
[](#VUID-vkCmdPipelineBarrier-dependencyFlags-07891) VUID-vkCmdPipelineBarrier-dependencyFlags-07891

If `vkCmdPipelineBarrier` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-None-07892) VUID-vkCmdPipelineBarrier-None-07892

If `vkCmdPipelineBarrier` is called within a render pass instance, the source
and destination stage masks of any memory barriers **must** only include
graphics pipeline stages

* 
[](#VUID-vkCmdPipelineBarrier-dependencyFlags-01186) VUID-vkCmdPipelineBarrier-dependencyFlags-01186

If `vkCmdPipelineBarrier` is called outside of a render pass instance, the
dependency flags **must** not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-None-07893) VUID-vkCmdPipelineBarrier-None-07893

If `vkCmdPipelineBarrier` is called inside a render pass instance, and there is
more than one view in the current subpass, dependency flags **must**
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits)

* 
[](#VUID-vkCmdPipelineBarrier-None-09553) VUID-vkCmdPipelineBarrier-None-09553

    
    If
    none of the [    `shaderTileImageColorReadAccess`](features.html#features-shaderTileImageColorReadAccess),
    [    `shaderTileImageStencilReadAccess`](features.html#features-shaderTileImageStencilReadAccess), or
    [    `shaderTileImageDepthReadAccess`](features.html#features-shaderTileImageDepthReadAccess) features are enabled,
and
    the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
    `vkCmdPipelineBarrier` **must** not be called within a render pass instance
    started with [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
[](#VUID-vkCmdPipelineBarrier-None-09554) VUID-vkCmdPipelineBarrier-None-09554

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), there **must** be no buffer or image memory
barriers specified by this command

* 
[](#VUID-vkCmdPipelineBarrier-None-09586) VUID-vkCmdPipelineBarrier-None-09586

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), memory barriers specified by this command
**must** only include [VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), or
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR) in their access
masks

* 
[](#VUID-vkCmdPipelineBarrier-image-09555) VUID-vkCmdPipelineBarrier-image-09555

If `vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), and the `image` member of any image
memory barrier is used as an attachment in the current render pass
instance, it **must** be in the [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)
or [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-09556) VUID-vkCmdPipelineBarrier-srcStageMask-09556

If `vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), this command **must** only specify
[framebuffer-space stages](#synchronization-framebuffer-regions) in
`srcStageMask` and `dstStageMask`

* 
[](#VUID-vkCmdPipelineBarrier-oldLayout-10758) VUID-vkCmdPipelineBarrier-oldLayout-10758

If called within a render pass instance using a [VkRenderPass](renderpass.html#VkRenderPass)
object, the `oldLayout` member of any image memory barrier included
in this command **must** be equal to the layout that the corresponding
attachment uses during the subpass

* 
[](#VUID-vkCmdPipelineBarrier-oldLayout-10759) VUID-vkCmdPipelineBarrier-oldLayout-10759

If called within a render pass instance started with
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), the `oldLayout` member of any image
memory barrier included in this command **must** be equal to the layout
that the corresponding attachment uses during the render pass instance

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-06461) VUID-vkCmdPipelineBarrier-srcStageMask-06461

Any pipeline stage included in `srcStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-06462) VUID-vkCmdPipelineBarrier-dstStageMask-06462

Any pipeline stage included in `dstStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-09633) VUID-vkCmdPipelineBarrier-srcStageMask-09633

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits), for each element of
`pImageMemoryBarriers`, `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-09634) VUID-vkCmdPipelineBarrier-srcStageMask-09634

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits), for each element of
`pBufferMemoryBarriers`, `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-10388) VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-10388

If a buffer or image memory barrier specifies a
[queue family ownership transfer    operation](#synchronization-queue-transfers), either the `srcQueueFamilyIndex` or
`dstQueueFamilyIndex` member and the queue family index that was
used to create the command pool that `commandBuffer` was allocated
from **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-maintenance8-10206) VUID-vkCmdPipelineBarrier-maintenance8-10206

If the [`maintenance8`](features.html#features-maintenance8) feature is not
enabled, `dependencyFlags` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPipelineBarrier-commandBuffer-parameter) VUID-vkCmdPipelineBarrier-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-parameter) VUID-vkCmdPipelineBarrier-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) values

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-parameter) VUID-vkCmdPipelineBarrier-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](#VkPipelineStageFlagBits) values

* 
[](#VUID-vkCmdPipelineBarrier-dependencyFlags-parameter) VUID-vkCmdPipelineBarrier-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](#VkDependencyFlagBits) values

* 
[](#VUID-vkCmdPipelineBarrier-pMemoryBarriers-parameter) VUID-vkCmdPipelineBarrier-pMemoryBarriers-parameter

 If `memoryBarrierCount` is not `0`, `pMemoryBarriers` **must** be a valid pointer to an array of `memoryBarrierCount` valid [VkMemoryBarrier](#VkMemoryBarrier) structures

* 
[](#VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-parameter) VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-parameter

 If `bufferMemoryBarrierCount` is not `0`, `pBufferMemoryBarriers` **must** be a valid pointer to an array of `bufferMemoryBarrierCount` valid [VkBufferMemoryBarrier](#VkBufferMemoryBarrier) structures

* 
[](#VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-parameter) VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-parameter

 If `imageMemoryBarrierCount` is not `0`, `pImageMemoryBarriers` **must** be a valid pointer to an array of `imageMemoryBarrierCount` valid [VkImageMemoryBarrier](#VkImageMemoryBarrier) structures

* 
[](#VUID-vkCmdPipelineBarrier-commandBuffer-recording) VUID-vkCmdPipelineBarrier-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPipelineBarrier-commandBuffer-cmdpool) VUID-vkCmdPipelineBarrier-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPipelineBarrier-suspended) VUID-vkCmdPipelineBarrier-suspended

 This command **must** not be called between suspended render pass instances

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdPipelineBarrier is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Bits which **can** be set in `vkCmdPipelineBarrier`::`dependencyFlags`,
specifying how execution and memory dependencies are formed, are:

// Provided by VK_VERSION_1_0
typedef enum VkDependencyFlagBits {
    VK_DEPENDENCY_BY_REGION_BIT = 0x00000001,
  // Provided by VK_VERSION_1_1
    VK_DEPENDENCY_DEVICE_GROUP_BIT = 0x00000004,
  // Provided by VK_VERSION_1_1
    VK_DEPENDENCY_VIEW_LOCAL_BIT = 0x00000002,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT = 0x00000008,
  // Provided by VK_KHR_maintenance8
    VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR = 0x00000020,
  // Provided by VK_KHR_maintenance9
    VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR = 0x00000040,
  // Provided by VK_KHR_multiview
    VK_DEPENDENCY_VIEW_LOCAL_BIT_KHR = VK_DEPENDENCY_VIEW_LOCAL_BIT,
  // Provided by VK_KHR_device_group
    VK_DEPENDENCY_DEVICE_GROUP_BIT_KHR = VK_DEPENDENCY_DEVICE_GROUP_BIT,
} VkDependencyFlagBits;

* 
[VK_DEPENDENCY_BY_REGION_BIT](#VkDependencyFlagBits) specifies that dependencies will be
split into multiple [    framebuffer-local regions](#synchronization-framebuffer-regions) according to the (x,y,layer,sample)
coordinates.

* 
[VK_DEPENDENCY_VIEW_LOCAL_BIT](#VkDependencyFlagBits) specifies that dependencies will be
split into multiple [    framebuffer-local regions](#synchronization-framebuffer-regions) according to the view.

* 
[VK_DEPENDENCY_DEVICE_GROUP_BIT](#VkDependencyFlagBits) specifies that dependencies are
[non-device-local](#synchronization-device-local-dependencies).

* 
[VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT](#VkDependencyFlagBits) specifies that the render pass
will write to and read from the same image with
[feedback loop enabled](renderpass.html#renderpass-feedbackloop).

* 
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits)
specifies that source and destination stages are not ignored when
performing a [queue family ownership    transfer](#synchronization-queue-transfers).

* 
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](#VkDependencyFlagBits) specifies that the access
scopes of [vkCmdSetEvent2](#vkCmdSetEvent2) and [vkCmdWaitEvents2](#vkCmdWaitEvents2) do not need to
match for a given event when it is specified in both commands, and the
access scope of [vkCmdSetEvent2](#vkCmdSetEvent2) is empty.

// Provided by VK_VERSION_1_0
typedef VkFlags VkDependencyFlags;

`VkDependencyFlags` is a bitmask type for setting a mask of zero or more
[VkDependencyFlagBits](#VkDependencyFlagBits).

*Memory barriers* are used to explicitly control access to buffer and image
subresource ranges.
Memory barriers are used to [transfer ownership between queue families](#synchronization-queue-transfers),
[change image layouts](#synchronization-image-layout-transitions), and
define [availability and visibility operations](#synchronization-dependencies-available-and-visible).
They explicitly define the [access types](#synchronization-access-types)
and buffer and image subresource ranges that are included in the
[access scopes](#synchronization-dependencies-access-scopes) of a memory
dependency that is created by a synchronization command that includes them.

Global memory barriers apply to memory accesses involving all memory objects
that exist at the time of its execution.

The `VkMemoryBarrier2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkMemoryBarrier2 {
    VkStructureType          sType;
    const void*              pNext;
    VkPipelineStageFlags2    srcStageMask;
    VkAccessFlags2           srcAccessMask;
    VkPipelineStageFlags2    dstStageMask;
    VkAccessFlags2           dstAccessMask;
} VkMemoryBarrier2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkMemoryBarrier2
typedef VkMemoryBarrier2 VkMemoryBarrier2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    first synchronization scope](#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [first    access scope](#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    second synchronization scope](#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [second    access scope](#synchronization-dependencies-access-scopes).

This structure defines a [memory dependency](#synchronization-dependencies-memory) affecting all device memory.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by the
source stage mask and source access mask.

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
destination stage mask and destination access mask.

Valid Usage

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03929) VUID-VkMemoryBarrier2-srcStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03930) VUID-VkMemoryBarrier2-srcStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03931) VUID-VkMemoryBarrier2-srcStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03932) VUID-VkMemoryBarrier2-srcStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03933) VUID-VkMemoryBarrier2-srcStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03934) VUID-VkMemoryBarrier2-srcStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03935) VUID-VkMemoryBarrier2-srcStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-07316) VUID-VkMemoryBarrier2-srcStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-04957) VUID-VkMemoryBarrier2-srcStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-04995) VUID-VkMemoryBarrier2-srcStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-07946) VUID-VkMemoryBarrier2-srcStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-10751) VUID-VkMemoryBarrier2-srcStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-10752) VUID-VkMemoryBarrier2-srcStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-10753) VUID-VkMemoryBarrier2-srcStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03900) VUID-VkMemoryBarrier2-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03901) VUID-VkMemoryBarrier2-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03902) VUID-VkMemoryBarrier2-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03903) VUID-VkMemoryBarrier2-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03904) VUID-VkMemoryBarrier2-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03905) VUID-VkMemoryBarrier2-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03906) VUID-VkMemoryBarrier2-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03907) VUID-VkMemoryBarrier2-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07454) VUID-VkMemoryBarrier2-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03909) VUID-VkMemoryBarrier2-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03910) VUID-VkMemoryBarrier2-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03911) VUID-VkMemoryBarrier2-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03912) VUID-VkMemoryBarrier2-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03913) VUID-VkMemoryBarrier2-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03914) VUID-VkMemoryBarrier2-srcAccessMask-03914

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03915) VUID-VkMemoryBarrier2-srcAccessMask-03915

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03916) VUID-VkMemoryBarrier2-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03917) VUID-VkMemoryBarrier2-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03918) VUID-VkMemoryBarrier2-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03919) VUID-VkMemoryBarrier2-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03920) VUID-VkMemoryBarrier2-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04747) VUID-VkMemoryBarrier2-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03922) VUID-VkMemoryBarrier2-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03923) VUID-VkMemoryBarrier2-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04994) VUID-VkMemoryBarrier2-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03924) VUID-VkMemoryBarrier2-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03925) VUID-VkMemoryBarrier2-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03926) VUID-VkMemoryBarrier2-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03927) VUID-VkMemoryBarrier2-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03928) VUID-VkMemoryBarrier2-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-06256) VUID-VkMemoryBarrier2-srcAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07272) VUID-VkMemoryBarrier2-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04858) VUID-VkMemoryBarrier2-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04859) VUID-VkMemoryBarrier2-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04860) VUID-VkMemoryBarrier2-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04861) VUID-VkMemoryBarrier2-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07455) VUID-VkMemoryBarrier2-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07456) VUID-VkMemoryBarrier2-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07457) VUID-VkMemoryBarrier2-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07458) VUID-VkMemoryBarrier2-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-08118) VUID-VkMemoryBarrier2-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-10670) VUID-VkMemoryBarrier2-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-10671) VUID-VkMemoryBarrier2-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-11771) VUID-VkMemoryBarrier2-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-11772) VUID-VkMemoryBarrier2-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-11294) VUID-VkMemoryBarrier2-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03929) VUID-VkMemoryBarrier2-dstStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03930) VUID-VkMemoryBarrier2-dstStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03931) VUID-VkMemoryBarrier2-dstStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03932) VUID-VkMemoryBarrier2-dstStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03933) VUID-VkMemoryBarrier2-dstStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03934) VUID-VkMemoryBarrier2-dstStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03935) VUID-VkMemoryBarrier2-dstStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-07316) VUID-VkMemoryBarrier2-dstStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-04957) VUID-VkMemoryBarrier2-dstStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-04995) VUID-VkMemoryBarrier2-dstStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-07946) VUID-VkMemoryBarrier2-dstStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-10751) VUID-VkMemoryBarrier2-dstStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-10752) VUID-VkMemoryBarrier2-dstStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-10753) VUID-VkMemoryBarrier2-dstStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03900) VUID-VkMemoryBarrier2-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03901) VUID-VkMemoryBarrier2-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03902) VUID-VkMemoryBarrier2-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03903) VUID-VkMemoryBarrier2-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03904) VUID-VkMemoryBarrier2-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03905) VUID-VkMemoryBarrier2-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03906) VUID-VkMemoryBarrier2-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03907) VUID-VkMemoryBarrier2-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07454) VUID-VkMemoryBarrier2-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03909) VUID-VkMemoryBarrier2-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03910) VUID-VkMemoryBarrier2-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03911) VUID-VkMemoryBarrier2-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03912) VUID-VkMemoryBarrier2-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03913) VUID-VkMemoryBarrier2-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03914) VUID-VkMemoryBarrier2-dstAccessMask-03914

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03915) VUID-VkMemoryBarrier2-dstAccessMask-03915

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03916) VUID-VkMemoryBarrier2-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03917) VUID-VkMemoryBarrier2-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03918) VUID-VkMemoryBarrier2-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03919) VUID-VkMemoryBarrier2-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03920) VUID-VkMemoryBarrier2-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04747) VUID-VkMemoryBarrier2-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03922) VUID-VkMemoryBarrier2-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03923) VUID-VkMemoryBarrier2-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04994) VUID-VkMemoryBarrier2-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03924) VUID-VkMemoryBarrier2-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03925) VUID-VkMemoryBarrier2-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03926) VUID-VkMemoryBarrier2-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03927) VUID-VkMemoryBarrier2-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03928) VUID-VkMemoryBarrier2-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-06256) VUID-VkMemoryBarrier2-dstAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07272) VUID-VkMemoryBarrier2-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04858) VUID-VkMemoryBarrier2-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04859) VUID-VkMemoryBarrier2-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04860) VUID-VkMemoryBarrier2-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04861) VUID-VkMemoryBarrier2-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07455) VUID-VkMemoryBarrier2-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07456) VUID-VkMemoryBarrier2-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07457) VUID-VkMemoryBarrier2-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07458) VUID-VkMemoryBarrier2-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-08118) VUID-VkMemoryBarrier2-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-10670) VUID-VkMemoryBarrier2-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-10671) VUID-VkMemoryBarrier2-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-11771) VUID-VkMemoryBarrier2-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-11772) VUID-VkMemoryBarrier2-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-11294) VUID-VkMemoryBarrier2-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryBarrier2-sType-sType) VUID-VkMemoryBarrier2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_BARRIER_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-parameter) VUID-VkMemoryBarrier2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-parameter) VUID-VkMemoryBarrier2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-parameter) VUID-VkMemoryBarrier2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-parameter) VUID-VkMemoryBarrier2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDependency2](renderpass.html#VkSubpassDependency2)

The `VkMemoryBarrier` structure is defined as:

|  | This functionality is superseded by [VkMemoryBarrier2](#VkMemoryBarrier2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkMemoryBarrier {
    VkStructureType    sType;
    const void*        pNext;
    VkAccessFlags      srcAccessMask;
    VkAccessFlags      dstAccessMask;
} VkMemoryBarrier;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](#VkAccessFlagBits) specifying a
[source access mask](#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](#VkAccessFlagBits) specifying a
[destination access mask](#synchronization-access-masks).

The first [access scope](#synchronization-dependencies-access-scopes) is
limited to access types in the [source access mask](#synchronization-access-masks) specified by
`srcAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR) is passed
in `pNext`, `srcAccessMask3`.

The second [access scope](#synchronization-dependencies-access-scopes) is
limited to access types in the [destination access mask](#synchronization-access-masks) specified by
`dstAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR) is passed
in `pNext`, `dstAccessMask3`.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryBarrier-sType-sType) VUID-VkMemoryBarrier-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_BARRIER](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryBarrier-pNext-pNext) VUID-VkMemoryBarrier-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryBarrier-srcAccessMask-parameter) VUID-VkMemoryBarrier-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits](#VkAccessFlagBits) values

* 
[](#VUID-VkMemoryBarrier-dstAccessMask-parameter) VUID-VkMemoryBarrier-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits](#VkAccessFlagBits) values

Memory range barriers only apply to memory accesses involving a specific
device address range.
That is, a memory dependency formed from a memory range barrier is
[scoped](#synchronization-dependencies-access-scopes) to access via the
specified device address range.
Memory range barriers **can** also be used to define a
[queue family ownership transfer](#synchronization-queue-transfers) for the
specified device address range.

The `VkMemoryRangeBarriersInfoKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkMemoryRangeBarriersInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    uint32_t                          memoryRangeBarrierCount;
    const VkMemoryRangeBarrierKHR*    pMemoryRangeBarriers;
} VkMemoryRangeBarriersInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryRangeBarrierCount` is the length of the
`pMemoryRangeBarriers` array

* 
`pMemoryRangeBarriers` is a pointer to an array of
[VkMemoryRangeBarrierKHR](#VkMemoryRangeBarrierKHR) structures defining memory dependencies
between accesses to specified memory ranges.

When this structure is included in the `pNext` chain of
[VkDependencyInfo](#VkDependencyInfo), it defines a set of
[memory dependencies](#synchronization-dependencies-memory), as well as
[queue family ownership transfer operations](#synchronization-queue-transfers), for a specified set of memory ranges.

If this structure is not included in the `pNext` chain of
[VkDependencyInfo](#VkDependencyInfo), it is equivalent to specifying it with a
`memoryRangeBarrierCount` of 0.

Each member of `pMemoryRangeBarriers` defines a separate
[memory dependency](#synchronization-dependencies-memory).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryRangeBarriersInfoKHR-sType-sType) VUID-VkMemoryRangeBarriersInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIERS_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryRangeBarriersInfoKHR-pMemoryRangeBarriers-parameter) VUID-VkMemoryRangeBarriersInfoKHR-pMemoryRangeBarriers-parameter

 If `memoryRangeBarrierCount` is not `0`, `pMemoryRangeBarriers` **must** be a valid pointer to an array of `memoryRangeBarrierCount` valid [VkMemoryRangeBarrierKHR](#VkMemoryRangeBarrierKHR) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDependencyInfo](#VkDependencyInfo)

The `VkMemoryRangeBarrierKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkMemoryRangeBarrierKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkPipelineStageFlags2       srcStageMask;
    VkAccessFlags2              srcAccessMask;
    VkPipelineStageFlags2       dstStageMask;
    VkAccessFlags2              dstAccessMask;
    uint32_t                    srcQueueFamilyIndex;
    uint32_t                    dstQueueFamilyIndex;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
} VkMemoryRangeBarrierKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    first synchronization scope](#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [first    access scope](#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    second synchronization scope](#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [second    access scope](#synchronization-dependencies-access-scopes).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`addressRange` is a [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) structure
specifying the address range affected by the barrier.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining
the flags for the address range.

This structure defines a [memory dependency](#synchronization-dependencies-memory) limited to an address range, and **can** define a
[queue family ownership transfer operation](#synchronization-queue-transfers) for that range.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by
`srcStageMask` and `srcAccessMask`.

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
`dstStageMask` and `dstAccessMask`.

Both [access scopes](#synchronization-dependencies-access-scopes) are
limited to only memory accesses to memory in `addressRange`.

If the buffer from which `address` was queried was created with a
sharing mode of [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory range barrier defines a [queue family ownership transfer operation](#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](#synchronization-queue-transfers-release)
for the specified address range, and the second synchronization scope does
not apply to this operation.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](#synchronization-queue-transfers-acquire)
for the specified address range, and the first synchronization scope does
not apply to this operation.

A [queue family ownership transfer operation](#synchronization-queue-transfers) is also defined if the values are not equal, and either is one
of the special queue family values reserved for external memory ownership
transfers, as described in [Queue Family Ownership Transfer](#synchronization-queue-transfers).
A [queue family release operation](#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

Valid Usage

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13097) VUID-VkMemoryRangeBarrierKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13098) VUID-VkMemoryRangeBarrierKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13099) VUID-VkMemoryRangeBarrierKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressFlags-13100) VUID-VkMemoryRangeBarrierKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13122) VUID-VkMemoryRangeBarrierKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13123) VUID-VkMemoryRangeBarrierKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressFlags-13101) VUID-VkMemoryRangeBarrierKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13124) VUID-VkMemoryRangeBarrierKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13125) VUID-VkMemoryRangeBarrierKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03929) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03930) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03931) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03932) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03933) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03934) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03935) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-07316) VUID-VkMemoryRangeBarrierKHR-srcStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-04957) VUID-VkMemoryRangeBarrierKHR-srcStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-04995) VUID-VkMemoryRangeBarrierKHR-srcStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-07946) VUID-VkMemoryRangeBarrierKHR-srcStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-10751) VUID-VkMemoryRangeBarrierKHR-srcStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-10752) VUID-VkMemoryRangeBarrierKHR-srcStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-10753) VUID-VkMemoryRangeBarrierKHR-srcStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03900) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03901) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03902) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03903) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03904) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03905) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03906) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03907) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07454) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03909) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03910) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03911) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03912) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03913) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03914) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03914

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03915) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03915

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03916) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03917) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03918) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03919) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03920) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04747) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03922) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03923) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04994) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03924) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03925) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03926) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03927) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03928) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-06256) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07272) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04858) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04859) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04860) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04861) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07455) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07456) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07457) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07458) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-08118) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10670) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10671) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11771) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11772) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11294) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03929) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03930) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03931) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03932) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03933) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03934) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03935) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-07316) VUID-VkMemoryRangeBarrierKHR-dstStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-04957) VUID-VkMemoryRangeBarrierKHR-dstStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-04995) VUID-VkMemoryRangeBarrierKHR-dstStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-07946) VUID-VkMemoryRangeBarrierKHR-dstStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-10751) VUID-VkMemoryRangeBarrierKHR-dstStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-10752) VUID-VkMemoryRangeBarrierKHR-dstStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-10753) VUID-VkMemoryRangeBarrierKHR-dstStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03900) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03901) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03902) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03903) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03904) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03905) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03906) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03907) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07454) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03909) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03910) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03911) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03912) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03913) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03914) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03914

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03915) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03915

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03916) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03917) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03918) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03919) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03920) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04747) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03922) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03923) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04994) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03924) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03925) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03926) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03927) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03928) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-06256) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07272) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04858) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04859) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04860) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04861) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07455) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07456) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07457) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07458) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-08118) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10670) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10671) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11771) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11772) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11294) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-None-09097) VUID-VkMemoryRangeBarrierKHR-None-09097

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkMemoryRangeBarrierKHR-None-09098) VUID-VkMemoryRangeBarrierKHR-None-09098

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcQueueFamilyIndex-09099) VUID-VkMemoryRangeBarrierKHR-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstQueueFamilyIndex-09100) VUID-VkMemoryRangeBarrierKHR-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkMemoryRangeBarrierKHR-address-13087) VUID-VkMemoryRangeBarrierKHR-address-13087

If the buffer from which `address` was queried was created with a
sharing mode of [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` are not equal,
`srcQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkMemoryRangeBarrierKHR-address-13088) VUID-VkMemoryRangeBarrierKHR-address-13088

If the buffer from which `address` was queried was created with a
sharing mode of [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` are not equal,
`dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-13089) VUID-VkMemoryRangeBarrierKHR-srcStageMask-13089

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryRangeBarrierKHR-sType-sType) VUID-VkMemoryRangeBarrierKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIER_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryRangeBarrierKHR-pNext-pNext) VUID-VkMemoryRangeBarrierKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-parameter) VUID-VkMemoryRangeBarrierKHR-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-parameter) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-parameter) VUID-VkMemoryRangeBarrierKHR-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-parameter) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressFlags-parameter) VUID-VkMemoryRangeBarrierKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

Buffer memory barriers only apply to memory accesses involving a specific
buffer range.
That is, a memory dependency formed from a buffer memory barrier is
[scoped](#synchronization-dependencies-access-scopes) to access via the
specified buffer range.
Buffer memory barriers **can** also be used to define a
[queue family ownership transfer](#synchronization-queue-transfers) for the
specified buffer range.

The `VkBufferMemoryBarrier2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkBufferMemoryBarrier2 {
    VkStructureType          sType;
    const void*              pNext;
    VkPipelineStageFlags2    srcStageMask;
    VkAccessFlags2           srcAccessMask;
    VkPipelineStageFlags2    dstStageMask;
    VkAccessFlags2           dstAccessMask;
    uint32_t                 srcQueueFamilyIndex;
    uint32_t                 dstQueueFamilyIndex;
    VkBuffer                 buffer;
    VkDeviceSize             offset;
    VkDeviceSize             size;
} VkBufferMemoryBarrier2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkBufferMemoryBarrier2
typedef VkBufferMemoryBarrier2 VkBufferMemoryBarrier2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    first synchronization scope](#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [first    access scope](#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    second synchronization scope](#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [second    access scope](#synchronization-dependencies-access-scopes).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`buffer` is a handle to the buffer whose backing memory is affected
by the barrier.

* 
`offset` is an offset in bytes into the backing memory for
`buffer`; this is relative to the base offset as bound to the buffer
(see [vkBindBufferMemory](resources.html#vkBindBufferMemory)).

* 
`size` is a size in bytes of the affected area of backing memory for
`buffer`, or [VK_WHOLE_SIZE](#VK_WHOLE_SIZE) to use the range from `offset`
to the end of the buffer.

This structure defines a [memory dependency](#synchronization-dependencies-memory) limited to a range of a buffer, and **can** define a
[queue family ownership transfer operation](#synchronization-queue-transfers) for that range.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by the
source stage mask and the source access mask.

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
the destination stage mask and the destination access mask.

Both [access scopes](#synchronization-dependencies-access-scopes) are
limited to only memory accesses to `buffer` in the range defined by
`offset` and `size`.

If `buffer` was created with [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory barrier defines a [queue family ownership transfer operation](#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](#synchronization-queue-transfers-release)
for the specified buffer range, and
if [VkDependencyInfoKHR](#VkDependencyInfoKHR)::`dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the second synchronization scope does not apply to this operation.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](#synchronization-queue-transfers-acquire)
for the specified buffer range, and
if [VkDependencyInfoKHR](#VkDependencyInfoKHR)::`dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the first synchronization scope does not apply to this operation.

A [queue family ownership transfer operation](#synchronization-queue-transfers) is also defined if the values are not equal, and either is one
of the special queue family values reserved for external memory ownership
transfers, as described in [Queue Family Ownership Transfer](#synchronization-queue-transfers).
A [queue family release operation](#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

Valid Usage

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03929) VUID-VkBufferMemoryBarrier2-srcStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03930) VUID-VkBufferMemoryBarrier2-srcStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03931) VUID-VkBufferMemoryBarrier2-srcStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03932) VUID-VkBufferMemoryBarrier2-srcStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03933) VUID-VkBufferMemoryBarrier2-srcStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03934) VUID-VkBufferMemoryBarrier2-srcStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03935) VUID-VkBufferMemoryBarrier2-srcStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-07316) VUID-VkBufferMemoryBarrier2-srcStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-04957) VUID-VkBufferMemoryBarrier2-srcStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-04995) VUID-VkBufferMemoryBarrier2-srcStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-07946) VUID-VkBufferMemoryBarrier2-srcStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-10751) VUID-VkBufferMemoryBarrier2-srcStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-10752) VUID-VkBufferMemoryBarrier2-srcStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-10753) VUID-VkBufferMemoryBarrier2-srcStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03900) VUID-VkBufferMemoryBarrier2-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03901) VUID-VkBufferMemoryBarrier2-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03902) VUID-VkBufferMemoryBarrier2-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03903) VUID-VkBufferMemoryBarrier2-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03904) VUID-VkBufferMemoryBarrier2-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03905) VUID-VkBufferMemoryBarrier2-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03906) VUID-VkBufferMemoryBarrier2-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03907) VUID-VkBufferMemoryBarrier2-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07454) VUID-VkBufferMemoryBarrier2-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03909) VUID-VkBufferMemoryBarrier2-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03910) VUID-VkBufferMemoryBarrier2-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03911) VUID-VkBufferMemoryBarrier2-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03912) VUID-VkBufferMemoryBarrier2-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03913) VUID-VkBufferMemoryBarrier2-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03914) VUID-VkBufferMemoryBarrier2-srcAccessMask-03914

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03915) VUID-VkBufferMemoryBarrier2-srcAccessMask-03915

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03916) VUID-VkBufferMemoryBarrier2-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03917) VUID-VkBufferMemoryBarrier2-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03918) VUID-VkBufferMemoryBarrier2-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03919) VUID-VkBufferMemoryBarrier2-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03920) VUID-VkBufferMemoryBarrier2-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04747) VUID-VkBufferMemoryBarrier2-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03922) VUID-VkBufferMemoryBarrier2-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03923) VUID-VkBufferMemoryBarrier2-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04994) VUID-VkBufferMemoryBarrier2-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03924) VUID-VkBufferMemoryBarrier2-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03925) VUID-VkBufferMemoryBarrier2-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03926) VUID-VkBufferMemoryBarrier2-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03927) VUID-VkBufferMemoryBarrier2-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03928) VUID-VkBufferMemoryBarrier2-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-06256) VUID-VkBufferMemoryBarrier2-srcAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07272) VUID-VkBufferMemoryBarrier2-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04858) VUID-VkBufferMemoryBarrier2-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04859) VUID-VkBufferMemoryBarrier2-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04860) VUID-VkBufferMemoryBarrier2-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04861) VUID-VkBufferMemoryBarrier2-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07455) VUID-VkBufferMemoryBarrier2-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07456) VUID-VkBufferMemoryBarrier2-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07457) VUID-VkBufferMemoryBarrier2-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07458) VUID-VkBufferMemoryBarrier2-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-08118) VUID-VkBufferMemoryBarrier2-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-10670) VUID-VkBufferMemoryBarrier2-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-10671) VUID-VkBufferMemoryBarrier2-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-11771) VUID-VkBufferMemoryBarrier2-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-11772) VUID-VkBufferMemoryBarrier2-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-11294) VUID-VkBufferMemoryBarrier2-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03929) VUID-VkBufferMemoryBarrier2-dstStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03930) VUID-VkBufferMemoryBarrier2-dstStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03931) VUID-VkBufferMemoryBarrier2-dstStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03932) VUID-VkBufferMemoryBarrier2-dstStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03933) VUID-VkBufferMemoryBarrier2-dstStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03934) VUID-VkBufferMemoryBarrier2-dstStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03935) VUID-VkBufferMemoryBarrier2-dstStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-07316) VUID-VkBufferMemoryBarrier2-dstStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-04957) VUID-VkBufferMemoryBarrier2-dstStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-04995) VUID-VkBufferMemoryBarrier2-dstStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-07946) VUID-VkBufferMemoryBarrier2-dstStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-10751) VUID-VkBufferMemoryBarrier2-dstStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-10752) VUID-VkBufferMemoryBarrier2-dstStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-10753) VUID-VkBufferMemoryBarrier2-dstStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03900) VUID-VkBufferMemoryBarrier2-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03901) VUID-VkBufferMemoryBarrier2-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03902) VUID-VkBufferMemoryBarrier2-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03903) VUID-VkBufferMemoryBarrier2-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03904) VUID-VkBufferMemoryBarrier2-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03905) VUID-VkBufferMemoryBarrier2-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03906) VUID-VkBufferMemoryBarrier2-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03907) VUID-VkBufferMemoryBarrier2-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07454) VUID-VkBufferMemoryBarrier2-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03909) VUID-VkBufferMemoryBarrier2-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03910) VUID-VkBufferMemoryBarrier2-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03911) VUID-VkBufferMemoryBarrier2-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03912) VUID-VkBufferMemoryBarrier2-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03913) VUID-VkBufferMemoryBarrier2-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03914) VUID-VkBufferMemoryBarrier2-dstAccessMask-03914

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03915) VUID-VkBufferMemoryBarrier2-dstAccessMask-03915

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03916) VUID-VkBufferMemoryBarrier2-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03917) VUID-VkBufferMemoryBarrier2-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03918) VUID-VkBufferMemoryBarrier2-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03919) VUID-VkBufferMemoryBarrier2-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03920) VUID-VkBufferMemoryBarrier2-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04747) VUID-VkBufferMemoryBarrier2-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03922) VUID-VkBufferMemoryBarrier2-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03923) VUID-VkBufferMemoryBarrier2-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04994) VUID-VkBufferMemoryBarrier2-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03924) VUID-VkBufferMemoryBarrier2-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03925) VUID-VkBufferMemoryBarrier2-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03926) VUID-VkBufferMemoryBarrier2-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03927) VUID-VkBufferMemoryBarrier2-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03928) VUID-VkBufferMemoryBarrier2-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-06256) VUID-VkBufferMemoryBarrier2-dstAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07272) VUID-VkBufferMemoryBarrier2-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04858) VUID-VkBufferMemoryBarrier2-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04859) VUID-VkBufferMemoryBarrier2-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04860) VUID-VkBufferMemoryBarrier2-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04861) VUID-VkBufferMemoryBarrier2-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07455) VUID-VkBufferMemoryBarrier2-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07456) VUID-VkBufferMemoryBarrier2-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07457) VUID-VkBufferMemoryBarrier2-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07458) VUID-VkBufferMemoryBarrier2-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-08118) VUID-VkBufferMemoryBarrier2-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-10670) VUID-VkBufferMemoryBarrier2-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-10671) VUID-VkBufferMemoryBarrier2-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-11771) VUID-VkBufferMemoryBarrier2-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-11772) VUID-VkBufferMemoryBarrier2-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-11294) VUID-VkBufferMemoryBarrier2-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-offset-01187) VUID-VkBufferMemoryBarrier2-offset-01187

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkBufferMemoryBarrier2-size-01188) VUID-VkBufferMemoryBarrier2-size-01188

If `size` is not equal to [VK_WHOLE_SIZE](#VK_WHOLE_SIZE), `size` **must** be
greater than `0`

* 
[](#VUID-VkBufferMemoryBarrier2-size-01189) VUID-VkBufferMemoryBarrier2-size-01189

If `size` is not equal to [VK_WHOLE_SIZE](#VK_WHOLE_SIZE), `size` **must** be
less than or equal to than the size of `buffer` minus `offset`

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-01931) VUID-VkBufferMemoryBarrier2-buffer-01931

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-09095) VUID-VkBufferMemoryBarrier2-buffer-09095

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-09096) VUID-VkBufferMemoryBarrier2-buffer-09096

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier2-None-09097) VUID-VkBufferMemoryBarrier2-None-09097

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkBufferMemoryBarrier2-None-09098) VUID-VkBufferMemoryBarrier2-None-09098

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkBufferMemoryBarrier2-srcQueueFamilyIndex-09099) VUID-VkBufferMemoryBarrier2-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkBufferMemoryBarrier2-dstQueueFamilyIndex-09100) VUID-VkBufferMemoryBarrier2-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03851) VUID-VkBufferMemoryBarrier2-srcStageMask-03851

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

Valid Usage (Implicit)

* 
[](#VUID-VkBufferMemoryBarrier2-sType-sType) VUID-VkBufferMemoryBarrier2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferMemoryBarrier2-pNext-pNext) VUID-VkBufferMemoryBarrier2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT) or [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR)

* 
[](#VUID-VkBufferMemoryBarrier2-sType-unique) VUID-VkBufferMemoryBarrier2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-parameter) VUID-VkBufferMemoryBarrier2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-parameter) VUID-VkBufferMemoryBarrier2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-parameter) VUID-VkBufferMemoryBarrier2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-parameter) VUID-VkBufferMemoryBarrier2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-parameter) VUID-VkBufferMemoryBarrier2-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

The `VkBufferMemoryBarrier` structure is defined as:

|  | This functionality is superseded by [VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkBufferMemoryBarrier {
    VkStructureType    sType;
    const void*        pNext;
    VkAccessFlags      srcAccessMask;
    VkAccessFlags      dstAccessMask;
    uint32_t           srcQueueFamilyIndex;
    uint32_t           dstQueueFamilyIndex;
    VkBuffer           buffer;
    VkDeviceSize       offset;
    VkDeviceSize       size;
} VkBufferMemoryBarrier;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](#VkAccessFlagBits) specifying a
[source access mask](#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](#VkAccessFlagBits) specifying a
[destination access mask](#synchronization-access-masks).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`buffer` is a handle to the buffer whose backing memory is affected
by the barrier.

* 
`offset` is an offset in bytes into the backing memory for
`buffer`; this is relative to the base offset as bound to the buffer
(see [vkBindBufferMemory](resources.html#vkBindBufferMemory)).

* 
`size` is a size in bytes of the affected area of backing memory for
`buffer`, or [VK_WHOLE_SIZE](#VK_WHOLE_SIZE) to use the range from `offset`
to the end of the buffer.

The first [access scope](#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified buffer range, via access
types in the [source access mask](#synchronization-access-masks) specified
by
`srcAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR) is passed
in `pNext`, `srcAccessMask3`.
If the source access mask includes [VK_ACCESS_HOST_WRITE_BIT](#VkAccessFlagBits), a
[memory domain operation](#synchronization-dependencies-available-and-visible) is performed where available memory in the host domain is also
made available to the device domain.

The second [access scope](#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified buffer range, via access
types in the [destination access mask](#synchronization-access-masks)
specified by
`dstAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR) is passed
in `pNext`, `dstAccessMask3`.
If the destination access mask includes [VK_ACCESS_HOST_WRITE_BIT](#VkAccessFlagBits) or
[VK_ACCESS_HOST_READ_BIT](#VkAccessFlagBits), a
[memory domain operation](#synchronization-dependencies-available-and-visible) is performed where available memory in the device domain is also
made available to the host domain.

|  | Host writes to device memory that was allocated without
| --- | --- |
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](memory.html#VkMemoryPropertyFlagBits) have to be flushed with
[vkFlushMappedMemoryRanges](memory.html#vkFlushMappedMemoryRanges) before they can be accessed safely on the
device.
Similarly, device writes to such memory have to be invalidated with
[vkInvalidateMappedMemoryRanges](memory.html#vkInvalidateMappedMemoryRanges) before they can be accessed safely on
the host.

Memory allocated with [VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](memory.html#VkMemoryPropertyFlagBits) does not
need to have these additional operations performed. |

If `srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, and
`srcQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family release operation](#synchronization-queue-transfers-release) for the specified buffer range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the second synchronization scope of the calling command does not apply to
this operation.

If `dstQueueFamilyIndex` is not equal to `srcQueueFamilyIndex`, and
`dstQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family acquire operation](#synchronization-queue-transfers-acquire) for the specified buffer range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the first synchronization scope of the calling command does not apply to
this operation.

Valid Usage

* 
[](#VUID-VkBufferMemoryBarrier-offset-01187) VUID-VkBufferMemoryBarrier-offset-01187

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkBufferMemoryBarrier-size-01188) VUID-VkBufferMemoryBarrier-size-01188

If `size` is not equal to [VK_WHOLE_SIZE](#VK_WHOLE_SIZE), `size` **must** be
greater than `0`

* 
[](#VUID-VkBufferMemoryBarrier-size-01189) VUID-VkBufferMemoryBarrier-size-01189

If `size` is not equal to [VK_WHOLE_SIZE](#VK_WHOLE_SIZE), `size` **must** be
less than or equal to than the size of `buffer` minus `offset`

* 
[](#VUID-VkBufferMemoryBarrier-buffer-01931) VUID-VkBufferMemoryBarrier-buffer-01931

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkBufferMemoryBarrier-buffer-09095) VUID-VkBufferMemoryBarrier-buffer-09095

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier-buffer-09096) VUID-VkBufferMemoryBarrier-buffer-09096

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier-None-09097) VUID-VkBufferMemoryBarrier-None-09097

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkBufferMemoryBarrier-None-09098) VUID-VkBufferMemoryBarrier-None-09098

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkBufferMemoryBarrier-srcQueueFamilyIndex-09099) VUID-VkBufferMemoryBarrier-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkBufferMemoryBarrier-dstQueueFamilyIndex-09100) VUID-VkBufferMemoryBarrier-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkBufferMemoryBarrier-None-09049) VUID-VkBufferMemoryBarrier-None-09049

If
the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled, and
`buffer` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), at least one of
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)

* 
[](#VUID-VkBufferMemoryBarrier-None-09050) VUID-VkBufferMemoryBarrier-None-09050

If
the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled, and
`buffer` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), `srcQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)
or [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkBufferMemoryBarrier-None-09051) VUID-VkBufferMemoryBarrier-None-09051

If
the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled, and
`buffer` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)
or [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

Valid Usage (Implicit)

* 
[](#VUID-VkBufferMemoryBarrier-sType-sType) VUID-VkBufferMemoryBarrier-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferMemoryBarrier-pNext-pNext) VUID-VkBufferMemoryBarrier-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT)

* 
[](#VUID-VkBufferMemoryBarrier-sType-unique) VUID-VkBufferMemoryBarrier-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferMemoryBarrier-buffer-parameter) VUID-VkBufferMemoryBarrier-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

[VK_WHOLE_SIZE](#VK_WHOLE_SIZE) is a special value indicating that the entire remaining
length of a buffer or allocation following a given `offset` should be
used.
It **can** be specified for [VkBufferMemoryBarrier](#VkBufferMemoryBarrier)::`size`,
[vkMapMemory](memory.html#vkMapMemory)::`size`, and other similar structures.

#define VK_WHOLE_SIZE                     (~0ULL)

Image memory barriers only apply to memory accesses involving a specific
image subresource range.
That is, a memory dependency formed from an image memory barrier is
[scoped](#synchronization-dependencies-access-scopes) to access via the
specified image subresource range.
Image memory barriers **can** also be used to define
[image layout transitions](#synchronization-image-layout-transitions) or a
[queue family ownership transfer](#synchronization-queue-transfers) for the
specified image subresource range.

The `VkImageMemoryBarrier2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkImageMemoryBarrier2 {
    VkStructureType            sType;
    const void*                pNext;
    VkPipelineStageFlags2      srcStageMask;
    VkAccessFlags2             srcAccessMask;
    VkPipelineStageFlags2      dstStageMask;
    VkAccessFlags2             dstAccessMask;
    VkImageLayout              oldLayout;
    VkImageLayout              newLayout;
    uint32_t                   srcQueueFamilyIndex;
    uint32_t                   dstQueueFamilyIndex;
    VkImage                    image;
    VkImageSubresourceRange    subresourceRange;
} VkImageMemoryBarrier2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkImageMemoryBarrier2
typedef VkImageMemoryBarrier2 VkImageMemoryBarrier2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    first synchronization scope](#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [first    access scope](#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    second synchronization scope](#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [second    access scope](#synchronization-dependencies-access-scopes).

* 
`oldLayout` is the old layout in an
[image layout transition](#synchronization-image-layout-transitions).

* 
`newLayout` is the new layout in an
[image layout transition](#synchronization-image-layout-transitions).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`image` is a handle to the image affected by this barrier.

* 
`subresourceRange` describes the [image    subresource range](resources.html#resources-image-views) within `image` that is affected by this barrier.

This structure defines a [memory dependency](#synchronization-dependencies-memory) limited to an image subresource range, and **can** define a
[queue family ownership transfer operation](#synchronization-queue-transfers) and [image layout transition](#synchronization-image-layout-transitions) for that subresource range.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by the
source stage mask and the source access mask.

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
the destination stage mask and the destination access mask.

Both [access scopes](#synchronization-dependencies-access-scopes) are
limited to only memory accesses to `image` in the subresource range
defined by `subresourceRange`.

If `image` was created with [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory barrier defines a [queue family ownership transfer operation](#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](#synchronization-queue-transfers-release)
for the specified image subresource range, and
if [VkDependencyInfoKHR](#VkDependencyInfoKHR)::`dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the second synchronization scope does not apply to this operation.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](#synchronization-queue-transfers-acquire)
for the specified image subresource range, and
if [VkDependencyInfoKHR](#VkDependencyInfoKHR)::`dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the first synchronization scope does not apply to this operation.

A [queue family ownership transfer operation](#synchronization-queue-transfers) is also defined if the values are not equal, and either is one
of the special queue family values reserved for external memory ownership
transfers, as described in [Queue Family Ownership Transfer](#synchronization-queue-transfers).
A [queue family release operation](#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

If `oldLayout` is not equal to `newLayout`, then the memory barrier
defines an [image layout transition](#synchronization-image-layout-transitions) for the specified image subresource range.
If this memory barrier defines a [queue family ownership transfer operation](#synchronization-queue-transfers), the layout transition is only
executed once between the queues.

If `srcQueueFamilyIndex` and `dstQueueFamilyIndex` are equal and
`oldLayout` and `newLayout` are also equal, the layout values are
ignored and the image contents are preserved regardless of the values of
`oldLayout`, `newLayout`, and the current layout of the image.

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) and the
[`maintenance9`](features.html#features-maintenance9) feature is enabled, the
`baseArrayLayer` and `layerCount` members of `subresourceRange`
specify the subset of slices of the 3D image affected by the memory barrier,
including the layout transition.
Any slices of a 3D image not included in `subresourceRange` are not
affected by the memory barrier and remain in their existing layout.

|  | Enabling the [`maintenance9`](features.html#features-maintenance9) feature modifies
| --- | --- |
the behavior of image barriers targeting 3D images created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits).
Previously, a `layerCount` equal to 1 would cover the entire 3D image,
but this has a different meaning when the `maintenance9` feature is
enabled.
Linking this behavioral change solely to the `maintenance9` feature
caused an unintended break in forward-compatibility.
Validation layers are expected to flag a warning for the scenario where the
`maintenance9` feature is not enabled, and the application uses
`layerCount` equal to 1 on this kind of 3D image.
`layerCount` can be set to [VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS) instead,
which has the same semantics with or without the extension.
This validation check should make it feasible for software to avoid any
breaking changes should the `maintenance9` feature be enabled in the
future, either explicitly by application or by a layer outside the control
of the application. |

If `image` has a [multi-planar format](formats.html#formats-multiplanar) and the
image is *disjoint*, then including [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) in the
`aspectMask` member of `subresourceRange` is equivalent to including
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits), and
(for three-plane formats only) [VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits).

Valid Usage

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03929) VUID-VkImageMemoryBarrier2-srcStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03930) VUID-VkImageMemoryBarrier2-srcStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03931) VUID-VkImageMemoryBarrier2-srcStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03932) VUID-VkImageMemoryBarrier2-srcStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03933) VUID-VkImageMemoryBarrier2-srcStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03934) VUID-VkImageMemoryBarrier2-srcStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03935) VUID-VkImageMemoryBarrier2-srcStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-07316) VUID-VkImageMemoryBarrier2-srcStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-04957) VUID-VkImageMemoryBarrier2-srcStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-04995) VUID-VkImageMemoryBarrier2-srcStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-07946) VUID-VkImageMemoryBarrier2-srcStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-10751) VUID-VkImageMemoryBarrier2-srcStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-10752) VUID-VkImageMemoryBarrier2-srcStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-10753) VUID-VkImageMemoryBarrier2-srcStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03900) VUID-VkImageMemoryBarrier2-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03901) VUID-VkImageMemoryBarrier2-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03902) VUID-VkImageMemoryBarrier2-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03903) VUID-VkImageMemoryBarrier2-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03904) VUID-VkImageMemoryBarrier2-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03905) VUID-VkImageMemoryBarrier2-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03906) VUID-VkImageMemoryBarrier2-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03907) VUID-VkImageMemoryBarrier2-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-07454) VUID-VkImageMemoryBarrier2-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03909) VUID-VkImageMemoryBarrier2-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03910) VUID-VkImageMemoryBarrier2-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03911) VUID-VkImageMemoryBarrier2-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03912) VUID-VkImageMemoryBarrier2-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03913) VUID-VkImageMemoryBarrier2-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03914) VUID-VkImageMemoryBarrier2-srcAccessMask-03914

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03915) VUID-VkImageMemoryBarrier2-srcAccessMask-03915

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03916) VUID-VkImageMemoryBarrier2-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03917) VUID-VkImageMemoryBarrier2-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03918) VUID-VkImageMemoryBarrier2-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03919) VUID-VkImageMemoryBarrier2-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03920) VUID-VkImageMemoryBarrier2-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-04747) VUID-VkImageMemoryBarrier2-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03922) VUID-VkImageMemoryBarrier2-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03923) VUID-VkImageMemoryBarrier2-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-04994) VUID-VkImageMemoryBarrier2-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03924) VUID-VkImageMemoryBarrier2-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03925) VUID-VkImageMemoryBarrier2-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03926) VUID-VkImageMemoryBarrier2-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03927) VUID-VkImageMemoryBarrier2-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-03928) VUID-VkImageMemoryBarrier2-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-06256) VUID-VkImageMemoryBarrier2-srcAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-07272) VUID-VkImageMemoryBarrier2-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-04858) VUID-VkImageMemoryBarrier2-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-04859) VUID-VkImageMemoryBarrier2-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-04860) VUID-VkImageMemoryBarrier2-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-04861) VUID-VkImageMemoryBarrier2-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-07455) VUID-VkImageMemoryBarrier2-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-07456) VUID-VkImageMemoryBarrier2-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-07457) VUID-VkImageMemoryBarrier2-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-07458) VUID-VkImageMemoryBarrier2-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-08118) VUID-VkImageMemoryBarrier2-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-10670) VUID-VkImageMemoryBarrier2-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-10671) VUID-VkImageMemoryBarrier2-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-11771) VUID-VkImageMemoryBarrier2-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-11772) VUID-VkImageMemoryBarrier2-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-11294) VUID-VkImageMemoryBarrier2-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03929) VUID-VkImageMemoryBarrier2-dstStageMask-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03930) VUID-VkImageMemoryBarrier2-dstStageMask-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03931) VUID-VkImageMemoryBarrier2-dstStageMask-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03932) VUID-VkImageMemoryBarrier2-dstStageMask-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03933) VUID-VkImageMemoryBarrier2-dstStageMask-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03934) VUID-VkImageMemoryBarrier2-dstStageMask-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-03935) VUID-VkImageMemoryBarrier2-dstStageMask-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-07316) VUID-VkImageMemoryBarrier2-dstStageMask-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-04957) VUID-VkImageMemoryBarrier2-dstStageMask-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-04995) VUID-VkImageMemoryBarrier2-dstStageMask-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-07946) VUID-VkImageMemoryBarrier2-dstStageMask-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-10751) VUID-VkImageMemoryBarrier2-dstStageMask-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-10752) VUID-VkImageMemoryBarrier2-dstStageMask-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-10753) VUID-VkImageMemoryBarrier2-dstStageMask-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03900) VUID-VkImageMemoryBarrier2-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03901) VUID-VkImageMemoryBarrier2-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03902) VUID-VkImageMemoryBarrier2-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03903) VUID-VkImageMemoryBarrier2-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03904) VUID-VkImageMemoryBarrier2-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03905) VUID-VkImageMemoryBarrier2-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03906) VUID-VkImageMemoryBarrier2-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03907) VUID-VkImageMemoryBarrier2-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-07454) VUID-VkImageMemoryBarrier2-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03909) VUID-VkImageMemoryBarrier2-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03910) VUID-VkImageMemoryBarrier2-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03911) VUID-VkImageMemoryBarrier2-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03912) VUID-VkImageMemoryBarrier2-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03913) VUID-VkImageMemoryBarrier2-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03914) VUID-VkImageMemoryBarrier2-dstAccessMask-03914

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03915) VUID-VkImageMemoryBarrier2-dstAccessMask-03915

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_BLIT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#VkPipelineStageFlagBits2KHR),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03916) VUID-VkImageMemoryBarrier2-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03917) VUID-VkImageMemoryBarrier2-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03918) VUID-VkImageMemoryBarrier2-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03919) VUID-VkImageMemoryBarrier2-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03920) VUID-VkImageMemoryBarrier2-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-04747) VUID-VkImageMemoryBarrier2-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03922) VUID-VkImageMemoryBarrier2-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03923) VUID-VkImageMemoryBarrier2-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-04994) VUID-VkImageMemoryBarrier2-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03924) VUID-VkImageMemoryBarrier2-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03925) VUID-VkImageMemoryBarrier2-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03926) VUID-VkImageMemoryBarrier2-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#VkPipelineStageFlagBits2KHR)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03927) VUID-VkImageMemoryBarrier2-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-03928) VUID-VkImageMemoryBarrier2-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-06256) VUID-VkImageMemoryBarrier2-dstAccessMask-06256

If
the [`rayQuery`](features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-07272) VUID-VkImageMemoryBarrier2-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-04858) VUID-VkImageMemoryBarrier2-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-04859) VUID-VkImageMemoryBarrier2-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-04860) VUID-VkImageMemoryBarrier2-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-04861) VUID-VkImageMemoryBarrier2-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-07455) VUID-VkImageMemoryBarrier2-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-07456) VUID-VkImageMemoryBarrier2-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-07457) VUID-VkImageMemoryBarrier2-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-07458) VUID-VkImageMemoryBarrier2-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-08118) VUID-VkImageMemoryBarrier2-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-10670) VUID-VkImageMemoryBarrier2-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-10671) VUID-VkImageMemoryBarrier2-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-11771) VUID-VkImageMemoryBarrier2-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-11772) VUID-VkImageMemoryBarrier2-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](#VkAccessFlagBits2KHR),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-11294) VUID-VkImageMemoryBarrier2-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](#VkAccessFlagBits2KHR), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#VkPipelineStageFlagBits2KHR),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits2KHR), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01197) VUID-VkImageMemoryBarrier2-oldLayout-01197

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` **must** be
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or the current layout of the image
subresources affected by the barrier

* 
[](#VUID-VkImageMemoryBarrier2-newLayout-01198) VUID-VkImageMemoryBarrier2-newLayout-01198

    If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `newLayout` **must** not be
    [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-image-09117) VUID-VkImageMemoryBarrier2-image-09117

If `image` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkImageMemoryBarrier2-image-09118) VUID-VkImageMemoryBarrier2-image-09118

If `image` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkImageMemoryBarrier2-None-09097) VUID-VkImageMemoryBarrier2-None-09097

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkImageMemoryBarrier2-None-09098) VUID-VkImageMemoryBarrier2-None-09098

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-09099) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkImageMemoryBarrier2-dstQueueFamilyIndex-09100) VUID-VkImageMemoryBarrier2-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkImageMemoryBarrier2-subresourceRange-01486) VUID-VkImageMemoryBarrier2-subresourceRange-01486

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier2-subresourceRange-01724) VUID-VkImageMemoryBarrier2-subresourceRange-01724

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](resources.html#VK_REMAINING_MIP_LEVELS), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-VkImageMemoryBarrier2-subresourceRange-01488) VUID-VkImageMemoryBarrier2-subresourceRange-01488

If `image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set, or the
[`maintenance9`](features.html#features-maintenance9) feature is not enabled,
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier2-maintenance9-10798) VUID-VkImageMemoryBarrier2-maintenance9-10798

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set,
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageMemoryBarrier2-maintenance9-10799) VUID-VkImageMemoryBarrier2-maintenance9-10799

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set and either
`subresourceRange.baseArrayLayer` is not equal to 0 or
`subresourceRange.layerCount` is not equal to
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), `subresourceRange.levelCount` **must**
be 1

* 
[](#VUID-VkImageMemoryBarrier2-subresourceRange-01725) VUID-VkImageMemoryBarrier2-subresourceRange-01725

If
`image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set, or the
[`maintenance9`](features.html#features-maintenance9) feature is not enabled,
and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS),
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier2-maintenance9-10800) VUID-VkImageMemoryBarrier2-maintenance9-10800

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled,
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), and `image` is a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set,
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageMemoryBarrier2-image-01932) VUID-VkImageMemoryBarrier2-image-01932

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkImageMemoryBarrier2-image-09241) VUID-VkImageMemoryBarrier2-image-09241

If `image` has a color format
that is single-plane,
then the `aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-image-09242) VUID-VkImageMemoryBarrier2-image-09242

If `image` has a color format and is not *disjoint*, then the
`aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-image-01672) VUID-VkImageMemoryBarrier2-image-01672

If `image` has a [multi-planar format](formats.html#formats-multiplanar) and
the image is *disjoint*, then the `aspectMask` member of
`subresourceRange` **must** include at least one
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit or
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-image-03320) VUID-VkImageMemoryBarrier2-image-03320

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
then the `aspectMask` member of `subresourceRange` **must** include
both [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-image-03319) VUID-VkImageMemoryBarrier2-image-03319

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is enabled, then the
`aspectMask` member of `subresourceRange` **must** include either
or both [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-image-10749) VUID-VkImageMemoryBarrier2-image-10749

If `image` has a depth-only format then the `aspectMask` member
of `subresourceRange` **must** be [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-image-10750) VUID-VkImageMemoryBarrier2-image-10750

If `image` has a stencil-only format then the `aspectMask`
member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier2-aspectMask-08702) VUID-VkImageMemoryBarrier2-aspectMask-08702

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-aspectMask-08703) VUID-VkImageMemoryBarrier2-aspectMask-08703

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-subresourceRange-09601) VUID-VkImageMemoryBarrier2-subresourceRange-09601

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01208) VUID-VkImageMemoryBarrier2-oldLayout-01208

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01209) VUID-VkImageMemoryBarrier2-oldLayout-01209

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01210) VUID-VkImageMemoryBarrier2-oldLayout-01210

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01211) VUID-VkImageMemoryBarrier2-oldLayout-01211

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01212) VUID-VkImageMemoryBarrier2-oldLayout-01212

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01213) VUID-VkImageMemoryBarrier2-oldLayout-01213

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-10767) VUID-VkImageMemoryBarrier2-oldLayout-10767

If the [    zeroInitializeDeviceMemory](features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `oldLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-10768) VUID-VkImageMemoryBarrier2-oldLayout-10768

If `oldLayout` is [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout), then
all subresources **must** be included in the barrier

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01658) VUID-VkImageMemoryBarrier2-oldLayout-01658

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-01659) VUID-VkImageMemoryBarrier2-oldLayout-01659

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04065) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04065

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04066) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04066

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04067) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04067

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04068) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-04068

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-synchronization2-07793) VUID-VkImageMemoryBarrier2-synchronization2-07793

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `oldLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-synchronization2-07794) VUID-VkImageMemoryBarrier2-synchronization2-07794

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-03938) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-03938

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), `image` **must** have been
created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-03939) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-03939

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), `image` **must** have been
created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-02088) VUID-VkImageMemoryBarrier2-oldLayout-02088

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07120) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07120

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07121) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07121

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07122) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07122

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07123) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07123

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07124) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07124

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07125) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07125

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-10287) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-10287

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07006) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-07006

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then
`image` **must** have been created with either the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and
the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and the
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier2-attachmentFeedbackLoopLayout-07313) VUID-VkImageMemoryBarrier2-attachmentFeedbackLoopLayout-07313

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-09550) VUID-VkImageMemoryBarrier2-srcQueueFamilyIndex-09550

If [layouts are not ignored](#synchronization-image-barrier2-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout) then `image` **must** have
been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag
set, or with both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier2-dynamicRenderingLocalRead-09551) VUID-VkImageMemoryBarrier2-dynamicRenderingLocalRead-09551

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`oldLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-dynamicRenderingLocalRead-09552) VUID-VkImageMemoryBarrier2-dynamicRenderingLocalRead-09552

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`newLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03854) VUID-VkImageMemoryBarrier2-srcStageMask-03854

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-03855) VUID-VkImageMemoryBarrier2-srcStageMask-03855

    If `srcStageMask` includes [VK_PIPELINE_STAGE_2_HOST_BIT](#VkPipelineStageFlagBits2KHR), and
    `srcQueueFamilyIndex` and `dstQueueFamilyIndex` define a
    [queue family ownership transfer](#synchronization-queue-transfers) or
    `oldLayout` and `newLayout` define an
    [image layout transition](#synchronization-image-layout-transitions),
    `oldLayout` **must** be one of [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), or [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkImageMemoryBarrier2-sType-sType) VUID-VkImageMemoryBarrier2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageMemoryBarrier2-pNext-pNext) VUID-VkImageMemoryBarrier2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT), [VkMemoryBarrierAccessFlags3KHR](#VkMemoryBarrierAccessFlags3KHR), or [VkSampleLocationsInfoEXT](primsrast.html#VkSampleLocationsInfoEXT)

* 
[](#VUID-VkImageMemoryBarrier2-sType-unique) VUID-VkImageMemoryBarrier2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkImageMemoryBarrier2-srcStageMask-parameter) VUID-VkImageMemoryBarrier2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkImageMemoryBarrier2-srcAccessMask-parameter) VUID-VkImageMemoryBarrier2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkImageMemoryBarrier2-dstStageMask-parameter) VUID-VkImageMemoryBarrier2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkImageMemoryBarrier2-dstAccessMask-parameter) VUID-VkImageMemoryBarrier2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkImageMemoryBarrier2-oldLayout-parameter) VUID-VkImageMemoryBarrier2-oldLayout-parameter

 `oldLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkImageMemoryBarrier2-newLayout-parameter) VUID-VkImageMemoryBarrier2-newLayout-parameter

 `newLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkImageMemoryBarrier2-image-parameter) VUID-VkImageMemoryBarrier2-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkImageMemoryBarrier2-subresourceRange-parameter) VUID-VkImageMemoryBarrier2-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) structure

The `VkImageMemoryBarrier` structure is defined as:

|  | This functionality is superseded by [VkImageMemoryBarrier2](#VkImageMemoryBarrier2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkImageMemoryBarrier {
    VkStructureType            sType;
    const void*                pNext;
    VkAccessFlags              srcAccessMask;
    VkAccessFlags              dstAccessMask;
    VkImageLayout              oldLayout;
    VkImageLayout              newLayout;
    uint32_t                   srcQueueFamilyIndex;
    uint32_t                   dstQueueFamilyIndex;
    VkImage                    image;
    VkImageSubresourceRange    subresourceRange;
} VkImageMemoryBarrier;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](#VkAccessFlagBits) specifying a
[source access mask](#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](#VkAccessFlagBits) specifying a
[destination access mask](#synchronization-access-masks).

* 
`oldLayout` is the old layout in an
[image layout transition](#synchronization-image-layout-transitions).

* 
`newLayout` is the new layout in an
[image layout transition](#synchronization-image-layout-transitions).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`image` is a handle to the image affected by this barrier.

* 
`subresourceRange` describes the [image    subresource range](resources.html#resources-image-views) within `image` that is affected by this barrier.

The first [access scope](#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified image subresource range,
via access types in the [source access mask](#synchronization-access-masks)
specified by `srcAccessMask`.
If `srcAccessMask` includes [VK_ACCESS_HOST_WRITE_BIT](#VkAccessFlagBits), memory
writes performed by that access type are also made visible, as that access
type is not performed through a resource.

The second [access scope](#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified image subresource range,
via access types in the [destination access mask](#synchronization-access-masks) specified by `dstAccessMask`.
If `dstAccessMask` includes [VK_ACCESS_HOST_WRITE_BIT](#VkAccessFlagBits) or
[VK_ACCESS_HOST_READ_BIT](#VkAccessFlagBits), available memory writes are also made visible
to accesses of those types, as those access types are not performed through
a resource.

If `srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, and
`srcQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family release operation](#synchronization-queue-transfers-release) for the specified image subresource range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the second synchronization scope of the calling command does not apply to
this operation.

If `dstQueueFamilyIndex` is not equal to `srcQueueFamilyIndex`, and
`dstQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family acquire operation](#synchronization-queue-transfers-acquire) for the specified image subresource range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
the first synchronization scope of the calling command does not apply to
this operation.

If the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled or `oldLayout` is not equal to `newLayout`,
`oldLayout` and `newLayout` define an
[image layout transition](#synchronization-image-layout-transitions) for
the specified image subresource range.

If the [`synchronization2`](features.html#features-synchronization2) feature is
enabled, `srcQueueFamilyIndex` and `dstQueueFamilyIndex` are equal,
and `oldLayout` and `newLayout` are also equal, the layout values
are ignored and the image contents are preserved regardless of the values of
`oldLayout`, `newLayout`, and the current layout of the image.

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) and the
[`maintenance9`](features.html#features-maintenance9) feature is enabled, the
`baseArrayLayer` and `layerCount` members of `subresourceRange`
specify the subset of slices of the 3D image affected by the memory barrier,
including the layout transition.
Any slices of a 3D image not included in `subresourceRange` are not
affected by the memory barrier and remain in their existing layout.

If `image` has a [multi-planar format](formats.html#formats-multiplanar) and the
image is *disjoint*, then including [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) in the
`aspectMask` member of `subresourceRange` is equivalent to including
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits), and
(for three-plane formats only) [VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits).

Valid Usage

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01197) VUID-VkImageMemoryBarrier-oldLayout-01197

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` **must** be
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or the current layout of the image
subresources affected by the barrier

* 
[](#VUID-VkImageMemoryBarrier-newLayout-01198) VUID-VkImageMemoryBarrier-newLayout-01198

    If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `newLayout` **must** not be
    [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-image-09117) VUID-VkImageMemoryBarrier-image-09117

If `image` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkImageMemoryBarrier-image-09118) VUID-VkImageMemoryBarrier-image-09118

If `image` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL),
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT),
or
a valid queue family

* 
[](#VUID-VkImageMemoryBarrier-None-09097) VUID-VkImageMemoryBarrier-None-09097

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkImageMemoryBarrier-None-09098) VUID-VkImageMemoryBarrier-None-09098

    
If
    the [VK_KHR_external_memory](../appendices/extensions.html#VK_KHR_external_memory) extension is not enabled,
and
    the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
    the [VkInstance](initialization.html#VkInstance) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09099) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-09100) VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](../appendices/extensions.html#VK_EXT_queue_family_foreign) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT)

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01486) VUID-VkImageMemoryBarrier-subresourceRange-01486

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01724) VUID-VkImageMemoryBarrier-subresourceRange-01724

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](resources.html#VK_REMAINING_MIP_LEVELS), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01488) VUID-VkImageMemoryBarrier-subresourceRange-01488

If `image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set, or the
[`maintenance9`](features.html#features-maintenance9) feature is not enabled,
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier-maintenance9-10798) VUID-VkImageMemoryBarrier-maintenance9-10798

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set,
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageMemoryBarrier-maintenance9-10799) VUID-VkImageMemoryBarrier-maintenance9-10799

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set and either
`subresourceRange.baseArrayLayer` is not equal to 0 or
`subresourceRange.layerCount` is not equal to
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), `subresourceRange.levelCount` **must**
be 1

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01725) VUID-VkImageMemoryBarrier-subresourceRange-01725

If
`image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set, or the
[`maintenance9`](features.html#features-maintenance9) feature is not enabled,
and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS),
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier-maintenance9-10800) VUID-VkImageMemoryBarrier-maintenance9-10800

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled,
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), and `image` is a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set,
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageMemoryBarrier-image-01932) VUID-VkImageMemoryBarrier-image-01932

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkImageMemoryBarrier-image-09241) VUID-VkImageMemoryBarrier-image-09241

If `image` has a color format
that is single-plane,
then the `aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-image-09242) VUID-VkImageMemoryBarrier-image-09242

If `image` has a color format and is not *disjoint*, then the
`aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-image-01672) VUID-VkImageMemoryBarrier-image-01672

If `image` has a [multi-planar format](formats.html#formats-multiplanar) and
the image is *disjoint*, then the `aspectMask` member of
`subresourceRange` **must** include at least one
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit or
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-image-03320) VUID-VkImageMemoryBarrier-image-03320

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
then the `aspectMask` member of `subresourceRange` **must** include
both [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-image-03319) VUID-VkImageMemoryBarrier-image-03319

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is enabled, then the
`aspectMask` member of `subresourceRange` **must** include either
or both [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-image-10749) VUID-VkImageMemoryBarrier-image-10749

If `image` has a depth-only format then the `aspectMask` member
of `subresourceRange` **must** be [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-image-10750) VUID-VkImageMemoryBarrier-image-10750

If `image` has a stencil-only format then the `aspectMask`
member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageMemoryBarrier-aspectMask-08702) VUID-VkImageMemoryBarrier-aspectMask-08702

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-aspectMask-08703) VUID-VkImageMemoryBarrier-aspectMask-08703

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-09601) VUID-VkImageMemoryBarrier-subresourceRange-09601

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01208) VUID-VkImageMemoryBarrier-oldLayout-01208

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01209) VUID-VkImageMemoryBarrier-oldLayout-01209

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01210) VUID-VkImageMemoryBarrier-oldLayout-01210

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01211) VUID-VkImageMemoryBarrier-oldLayout-01211

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01212) VUID-VkImageMemoryBarrier-oldLayout-01212

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01213) VUID-VkImageMemoryBarrier-oldLayout-01213

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-10767) VUID-VkImageMemoryBarrier-oldLayout-10767

If the [    zeroInitializeDeviceMemory](features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `oldLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-10768) VUID-VkImageMemoryBarrier-oldLayout-10768

If `oldLayout` is [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout), then
all subresources **must** be included in the barrier

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01658) VUID-VkImageMemoryBarrier-oldLayout-01658

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01659) VUID-VkImageMemoryBarrier-oldLayout-01659

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04065) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04065

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04066) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04066

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04067) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04067

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04068) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04068

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-synchronization2-07793) VUID-VkImageMemoryBarrier-synchronization2-07793

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `oldLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-synchronization2-07794) VUID-VkImageMemoryBarrier-synchronization2-07794

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03938) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03938

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), `image` **must** have been
created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03939) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03939

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), `image` **must** have been
created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-02088) VUID-VkImageMemoryBarrier-oldLayout-02088

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07120) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07120

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07121) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07121

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07122) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07122

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07123) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07123

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07124) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07124

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07125) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07125

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-10287) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-10287

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07006) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07006

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then
`image` **must** have been created with either the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and
the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and the
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-attachmentFeedbackLoopLayout-07313) VUID-VkImageMemoryBarrier-attachmentFeedbackLoopLayout-07313

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09550) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09550

If [layouts are not ignored](#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout) then `image` **must** have
been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag
set, or with both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09551) VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09551

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`oldLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09552) VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09552

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`newLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-None-09052) VUID-VkImageMemoryBarrier-None-09052

If
the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled, and
`image` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), at least one of
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)

* 
[](#VUID-VkImageMemoryBarrier-None-09053) VUID-VkImageMemoryBarrier-None-09053

If
the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled, and
`image` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), `srcQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)
or [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkImageMemoryBarrier-None-09054) VUID-VkImageMemoryBarrier-None-09054

If
the [`synchronization2`](features.html#features-synchronization2) feature is not
enabled, and
`image` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)
or [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL)

* 
[](#VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-12331) VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-12331

If `dstQueueFamilyIndex` is [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL) and
`image` was created with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) in
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes`,
`newLayout` **must** be [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-12332) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-12332

If `srcQueueFamilyIndex` is [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL) and
`image` was created with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) in
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes`,
`oldLayout` **must** be [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkImageMemoryBarrier-sType-sType) VUID-VkImageMemoryBarrier-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageMemoryBarrier-pNext-pNext) VUID-VkImageMemoryBarrier-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT) or [VkSampleLocationsInfoEXT](primsrast.html#VkSampleLocationsInfoEXT)

* 
[](#VUID-VkImageMemoryBarrier-sType-unique) VUID-VkImageMemoryBarrier-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-parameter) VUID-VkImageMemoryBarrier-oldLayout-parameter

 `oldLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkImageMemoryBarrier-newLayout-parameter) VUID-VkImageMemoryBarrier-newLayout-parameter

 `newLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkImageMemoryBarrier-image-parameter) VUID-VkImageMemoryBarrier-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-parameter) VUID-VkImageMemoryBarrier-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) structure

To facilitate usage of images whose memory is initialized on the host,
Vulkan allows image layout transitions to be performed by the host as well,
albeit supporting limited layouts.

To perform an image layout transition on the host, call:

// Provided by VK_VERSION_1_4
VkResult vkTransitionImageLayout(
    VkDevice                                    device,
    uint32_t                                    transitionCount,
    const VkHostImageLayoutTransitionInfo*      pTransitions);

// Provided by VK_EXT_host_image_copy
// Equivalent to vkTransitionImageLayout
VkResult vkTransitionImageLayoutEXT(
    VkDevice                                    device,
    uint32_t                                    transitionCount,
    const VkHostImageLayoutTransitionInfo*      pTransitions);

* 
`device` is the device which owns `pTransitions`[i].`image`.

* 
`transitionCount` is the number of image layout transitions to
perform.

* 
`pTransitions` is a pointer to an array of
[VkHostImageLayoutTransitionInfo](#VkHostImageLayoutTransitionInfo) structures specifying the image
and [subresource ranges](resources.html#resources-image-views) within them to
transition.

Valid Usage (Implicit)

* 
[](#VUID-vkTransitionImageLayout-device-parameter) VUID-vkTransitionImageLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkTransitionImageLayout-pTransitions-parameter) VUID-vkTransitionImageLayout-pTransitions-parameter

 `pTransitions` **must** be a valid pointer to an array of `transitionCount` valid [VkHostImageLayoutTransitionInfo](#VkHostImageLayoutTransitionInfo) structures

* 
[](#VUID-vkTransitionImageLayout-transitionCount-arraylength) VUID-vkTransitionImageLayout-transitionCount-arraylength

 `transitionCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkHostImageLayoutTransitionInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkHostImageLayoutTransitionInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkImage                    image;
    VkImageLayout              oldLayout;
    VkImageLayout              newLayout;
    VkImageSubresourceRange    subresourceRange;
} VkHostImageLayoutTransitionInfo;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkHostImageLayoutTransitionInfo
typedef VkHostImageLayoutTransitionInfo VkHostImageLayoutTransitionInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is a handle to the image affected by this layout transition.

* 
`oldLayout` is the old layout in an
[image layout transition](#synchronization-image-layout-transitions).

* 
`newLayout` is the new layout in an
[image layout transition](#synchronization-image-layout-transitions).

* 
`subresourceRange` describes the [image    subresource range](resources.html#resources-image-views) within `image` that is affected by this layout
transition.

`vkTransitionImageLayout` does not check whether the device memory
associated with an image is currently in use before performing the layout
transition.
The application **must** guarantee that any previously submitted command that
reads from or writes to this subresource has completed before the host
performs the layout transition.
The memory of `image` is accessed by the host as if [coherent](memory.html#memory-coherent).

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) and the
[`maintenance9`](features.html#features-maintenance9) feature is enabled, the
`baseArrayLayer` and `layerCount` members of `subresourceRange`
specify the subset of slices of the 3D image affected by the memory barrier,
including the layout transition.
Any slices of a 3D image not included in `subresourceRange` are not
affected by the memory barrier and remain in their existing layout.

|  | Image layout transitions performed on the host do not require queue family
| --- | --- |
ownership transfers as the physical layout of the image will not vary
between queue families for the layouts supported by this function. |

|  | If the device has written to the image memory, it is not automatically made
| --- | --- |
available to the host.
Before this command can be called, a memory barrier for this image **must**
have been issued on the device with the second
[synchronization scope](#synchronization-dependencies-scopes) including
[VK_PIPELINE_STAGE_HOST_BIT](#VkPipelineStageFlagBits) and [VK_ACCESS_HOST_READ_BIT](#VkAccessFlagBits).

Because queue submissions [automatically make host memory visible to the device](#synchronization-submission-host-writes), there would not be a
need for a memory barrier before using the results of this layout transition
on the device. |

Valid Usage

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-09055) VUID-VkHostImageLayoutTransitionInfo-image-09055

`image` **must** have been created with the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01486) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01486

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01724) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01724

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](resources.html#VK_REMAINING_MIP_LEVELS), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01488) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01488

If `image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set, or the
[`maintenance9`](features.html#features-maintenance9) feature is not enabled,
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-maintenance9-10798) VUID-VkHostImageLayoutTransitionInfo-maintenance9-10798

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set,
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-maintenance9-10799) VUID-VkHostImageLayoutTransitionInfo-maintenance9-10799

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set and either
`subresourceRange.baseArrayLayer` is not equal to 0 or
`subresourceRange.layerCount` is not equal to
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), `subresourceRange.levelCount` **must**
be 1

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01725) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-01725

If
`image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set, or the
[`maintenance9`](features.html#features-maintenance9) feature is not enabled,
and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS),
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-VkHostImageLayoutTransitionInfo-maintenance9-10800) VUID-VkHostImageLayoutTransitionInfo-maintenance9-10800

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled,
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), and `image` is a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set,
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-01932) VUID-VkHostImageLayoutTransitionInfo-image-01932

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-09241) VUID-VkHostImageLayoutTransitionInfo-image-09241

If `image` has a color format
that is single-plane,
then the `aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-09242) VUID-VkHostImageLayoutTransitionInfo-image-09242

If `image` has a color format and is not *disjoint*, then the
`aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-01672) VUID-VkHostImageLayoutTransitionInfo-image-01672

If `image` has a [multi-planar format](formats.html#formats-multiplanar) and
the image is *disjoint*, then the `aspectMask` member of
`subresourceRange` **must** include at least one
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit or
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-03320) VUID-VkHostImageLayoutTransitionInfo-image-03320

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
then the `aspectMask` member of `subresourceRange` **must** include
both [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-03319) VUID-VkHostImageLayoutTransitionInfo-image-03319

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is enabled, then the
`aspectMask` member of `subresourceRange` **must** include either
or both [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-10749) VUID-VkHostImageLayoutTransitionInfo-image-10749

If `image` has a depth-only format then the `aspectMask` member
of `subresourceRange` **must** be [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-10750) VUID-VkHostImageLayoutTransitionInfo-image-10750

If `image` has a stencil-only format then the `aspectMask`
member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-aspectMask-08702) VUID-VkHostImageLayoutTransitionInfo-aspectMask-08702

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-aspectMask-08703) VUID-VkHostImageLayoutTransitionInfo-aspectMask-08703

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-09601) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-09601

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01208) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01208

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01209) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01209

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01210) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01210

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01211) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01211

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01212) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01212

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01213) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01213

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-10767) VUID-VkHostImageLayoutTransitionInfo-oldLayout-10767

If the [    zeroInitializeDeviceMemory](features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `oldLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-10768) VUID-VkHostImageLayoutTransitionInfo-oldLayout-10768

If `oldLayout` is [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout), then
all subresources **must** be included in the barrier

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01658) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01658

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-01659) VUID-VkHostImageLayoutTransitionInfo-oldLayout-01659

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04065) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04065

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04066) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04066

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04067) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04067

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04068) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-04068

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-synchronization2-07793) VUID-VkHostImageLayoutTransitionInfo-synchronization2-07793

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `oldLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-synchronization2-07794) VUID-VkHostImageLayoutTransitionInfo-synchronization2-07794

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03938) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03938

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), `image` **must** have been
created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03939) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-03939

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), `image` **must** have been
created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-02088) VUID-VkHostImageLayoutTransitionInfo-oldLayout-02088

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07120) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07120

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07121) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07121

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07122) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07122

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07123) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07123

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07124) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07124

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07125) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07125

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](resources.html#VkImageLayout) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-10287) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-10287

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](resources.html#VkImageLayout) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07006) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-07006

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then
`image` **must** have been created with either the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and
the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and the
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-attachmentFeedbackLoopLayout-07313) VUID-VkHostImageLayoutTransitionInfo-attachmentFeedbackLoopLayout-07313

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-09550) VUID-VkHostImageLayoutTransitionInfo-srcQueueFamilyIndex-09550

If  `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout) then `image` **must** have
been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag
set, or with both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09551) VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09551

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`oldLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09552) VUID-VkHostImageLayoutTransitionInfo-dynamicRenderingLocalRead-09552

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`newLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-09229) VUID-VkHostImageLayoutTransitionInfo-oldLayout-09229

`oldLayout` **must** be either [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or the
current layout of the image subresources as specified in
`subresourceRange`

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-09230) VUID-VkHostImageLayoutTransitionInfo-oldLayout-09230

    If `oldLayout` is not [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout),
    or [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout), it **must** be one of the layouts
    in [VkPhysicalDeviceHostImageCopyProperties](limits.html#VkPhysicalDeviceHostImageCopyProperties)::`pCopySrcLayouts`

* 
[](#VUID-VkHostImageLayoutTransitionInfo-newLayout-09057) VUID-VkHostImageLayoutTransitionInfo-newLayout-09057

`newLayout` **must** be one of the layouts in
[VkPhysicalDeviceHostImageCopyProperties](limits.html#VkPhysicalDeviceHostImageCopyProperties)::`pCopyDstLayouts`

Valid Usage (Implicit)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-sType-sType) VUID-VkHostImageLayoutTransitionInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkHostImageLayoutTransitionInfo-pNext-pNext) VUID-VkHostImageLayoutTransitionInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkHostImageLayoutTransitionInfo-image-parameter) VUID-VkHostImageLayoutTransitionInfo-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkHostImageLayoutTransitionInfo-oldLayout-parameter) VUID-VkHostImageLayoutTransitionInfo-oldLayout-parameter

 `oldLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkHostImageLayoutTransitionInfo-newLayout-parameter) VUID-VkHostImageLayoutTransitionInfo-newLayout-parameter

 `newLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkHostImageLayoutTransitionInfo-subresourceRange-parameter) VUID-VkHostImageLayoutTransitionInfo-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) structure

Tensor memory barriers only apply to memory accesses involving a specific
tensor.
That is, a memory dependency formed from a tensor memory barrier is
[scoped](#synchronization-dependencies-access-scopes) to access via the
specified tensor.
Tensor memory barriers **can** also be used to define a
[queue family ownership transfer](#synchronization-queue-transfers) for the
specified tensor.

The `VkTensorMemoryBarrierARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorMemoryBarrierARM {
    VkStructureType          sType;
    const void*              pNext;
    VkPipelineStageFlags2    srcStageMask;
    VkAccessFlags2           srcAccessMask;
    VkPipelineStageFlags2    dstStageMask;
    VkAccessFlags2           dstAccessMask;
    uint32_t                 srcQueueFamilyIndex;
    uint32_t                 dstQueueFamilyIndex;
    VkTensorARM              tensor;
} VkTensorMemoryBarrierARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    first synchronization scope](#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [first    access scope](#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](#VkPipelineStageFlags2) mask of pipeline
stages to be included in the [    second synchronization scope](#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](#VkAccessFlags2) mask of access flags to be
included in the [second    access scope](#synchronization-dependencies-access-scopes).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](#synchronization-queue-transfers).

* 
`tensor` is a handle to the tensor whose backing memory is affected
by the barrier.

The first [synchronization scope](#synchronization-dependencies-scopes) and
[access scope](#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by
`srcStageMask` and `srcAccessMask`.

The second [synchronization scope](#synchronization-dependencies-scopes)
and [access scope](#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
`dstStageMask` and `dstAccessMask`.

Both [access scopes](#synchronization-dependencies-access-scopes) are
limited to only memory accesses to `tensor`.

If `tensor` was created with [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory barrier defines a [queue family transfer operation](#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](#synchronization-queue-transfers-release)
for the specified tensor, and the second synchronization and access scopes
do not synchronize operations on that queue.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](#synchronization-queue-transfers-acquire)
for the specified tensor, and the first synchronization and access scopes do
not synchronize operations on that queue.

A [queue family transfer operation](#synchronization-queue-transfers) is
also defined if the values are not equal, and either is one of the special
queue family values reserved for external memory ownership transfers, as
described in [Queue Family Ownership Transfer](#synchronization-queue-transfers).
A [queue family release operation](#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

Valid Usage

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09755) VUID-VkTensorMemoryBarrierARM-tensor-09755

If `tensor` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** both be [VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED)

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09756) VUID-VkTensorMemoryBarrierARM-tensor-09756

If `tensor` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** both be either
[VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED), or a valid queue family (see
[Queue Family Properties](devsandqueues.html#devsandqueues-queueprops))

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09757) VUID-VkTensorMemoryBarrierARM-tensor-09757

If `tensor` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not [VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED), at
least one of them **must** be the same as the family of the queue that will
execute this barrier

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09758) VUID-VkTensorMemoryBarrierARM-tensor-09758

If `tensor` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](memory.html#VkDeviceMemory) object

Valid Usage (Implicit)

* 
[](#VUID-VkTensorMemoryBarrierARM-sType-sType) VUID-VkTensorMemoryBarrierARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_MEMORY_BARRIER_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorMemoryBarrierARM-srcStageMask-parameter) VUID-VkTensorMemoryBarrierARM-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkTensorMemoryBarrierARM-srcAccessMask-parameter) VUID-VkTensorMemoryBarrierARM-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkTensorMemoryBarrierARM-dstStageMask-parameter) VUID-VkTensorMemoryBarrierARM-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](#VkPipelineStageFlagBits2) values

* 
[](#VUID-VkTensorMemoryBarrierARM-dstAccessMask-parameter) VUID-VkTensorMemoryBarrierARM-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](#VkAccessFlagBits2) values

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-parameter) VUID-VkTensorMemoryBarrierARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](resources.html#VkTensorARM) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDependencyInfo](#VkDependencyInfo)

The `VkTensorDependencyInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorDependencyInfoARM {
    VkStructureType                    sType;
    const void*                        pNext;
    uint32_t                           tensorMemoryBarrierCount;
    const VkTensorMemoryBarrierARM*    pTensorMemoryBarriers;
} VkTensorDependencyInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorMemoryBarrierCount` is the length of the
`pTensorMemoryBarriers` array.

* 
`pTensorMemoryBarriers` is a pointer to an array of
[VkTensorMemoryBarrierARM](#VkTensorMemoryBarrierARM) structures defining memory dependencies
between tensors.

Valid Usage (Implicit)

* 
[](#VUID-VkTensorDependencyInfoARM-sType-sType) VUID-VkTensorDependencyInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_DEPENDENCY_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorDependencyInfoARM-pTensorMemoryBarriers-parameter) VUID-VkTensorDependencyInfoARM-pTensorMemoryBarriers-parameter

 `pTensorMemoryBarriers` **must** be a valid pointer to an array of `tensorMemoryBarrierCount` valid [VkTensorMemoryBarrierARM](#VkTensorMemoryBarrierARM) structures

* 
[](#VUID-VkTensorDependencyInfoARM-tensorMemoryBarrierCount-arraylength) VUID-VkTensorDependencyInfoARM-tensorMemoryBarrierCount-arraylength

 `tensorMemoryBarrierCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDependencyInfo](#VkDependencyInfo)

Resources created with a [VkSharingMode](resources.html#VkSharingMode) of
[VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode) **must** have their ownership explicitly
transferred from one queue family to another in order to access their
content in a well-defined manner on a queue in a different queue family.

The special queue family index [VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED) indicates that
a queue family parameter or member is ignored.

#define VK_QUEUE_FAMILY_IGNORED           (~0U)

Resources shared with external APIs or instances using external memory **must**
also explicitly manage ownership transfers between local and external queues
(or equivalent constructs in external APIs) regardless of the
[VkSharingMode](resources.html#VkSharingMode) specified when creating them.

The special queue family index [VK_QUEUE_FAMILY_EXTERNAL](#VK_QUEUE_FAMILY_EXTERNAL) represents any
queue external to the resource’s current Vulkan instance, as long as the
queue uses the same underlying
device group or
physical device, and the same driver version as the resource’s
[VkDevice](devsandqueues.html#VkDevice), as indicated by
[VkPhysicalDeviceIDProperties](devsandqueues.html#VkPhysicalDeviceIDProperties)::`deviceUUID` and
[VkPhysicalDeviceIDProperties](devsandqueues.html#VkPhysicalDeviceIDProperties)::`driverUUID`.

#define VK_QUEUE_FAMILY_EXTERNAL          (~1U)

#define VK_QUEUE_FAMILY_EXTERNAL_KHR      VK_QUEUE_FAMILY_EXTERNAL

The special queue family index [VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT) represents
any queue external to the resource’s current Vulkan instance, regardless of
the queue’s underlying physical device or driver version.
This includes, for example, queues for fixed-function image processing
devices, media codec devices, and display devices, as well as all queues
that use the same underlying
device group or
physical device, and the same driver version as the resource’s
[VkDevice](devsandqueues.html#VkDevice).

#define VK_QUEUE_FAMILY_FOREIGN_EXT       (~2U)

If memory dependencies are correctly expressed between uses of such a
resource between two queues in different families, but no ownership transfer
is defined, the contents of that resource are **undefined** for any read
accesses performed by the second queue family.

|  | If an application does not need the contents of a resource to remain valid
| --- | --- |
when transferring from one queue family to another, then the ownership
transfer **should** be skipped. |

|  | Applications should expect transfers to/from
| --- | --- |
[VK_QUEUE_FAMILY_FOREIGN_EXT](#VK_QUEUE_FAMILY_FOREIGN_EXT) to be more expensive than transfers
to/from [VK_QUEUE_FAMILY_EXTERNAL_KHR](#VK_QUEUE_FAMILY_EXTERNAL_KHR). |

A queue family ownership transfer consists of two distinct parts:

Release exclusive ownership from the source queue family

Acquire exclusive ownership for the destination queue family

An application **must** ensure that these operations occur in the correct order
by defining an execution dependency between them, e.g. using a semaphore.

 A *release operation* is used to
release exclusive ownership of a range of a buffer or image subresource
range.
A release operation is defined by executing a
[buffer memory barrier](#synchronization-buffer-memory-barriers) (for a
buffer range) or an [image memory barrier](#synchronization-image-memory-barriers) (for an image subresource range) using a pipeline barrier command,
on a queue from the source queue family.
The `srcQueueFamilyIndex` parameter of the barrier **must** be the source
queue family index, and the `dstQueueFamilyIndex` parameter to the
destination queue family index.
The destination access mask is ignored for such a barrier, such that no
visibility operation is executed - the value of this mask does not affect
the validity of the barrier.
The release operation happens-after the availability operation.
If `dependencyFlags` does not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
`dstStageMask` is also ignored for such a barrier as defined by
[buffer memory ownership transfer](#buffer-memory-barrier-ownership-transfer) and [image memory ownership transfer](#image-memory-barrier-ownership-transfer).
After a release operation is performed, the contents and image layout (if
applicable) of the released resource are **undefined** until a matching acquire
operation is performed.

|  | It is valid to never call the acquire operation after a release, and instead
| --- | --- |
simply start using the resource on any queue (even the releasing queue), but
the contents should be reinitialized before being read.
In the case of images, an image layout transition away from
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) is also required.
Executing an acquire operation after this without another release is
invalid. |

 An *acquire operation* is used
to acquire exclusive ownership of a range of a buffer or image subresource
range.
An acquire operation is defined by executing a
[buffer memory barrier](#synchronization-buffer-memory-barriers) (for a
buffer range) or an [image memory barrier](#synchronization-image-memory-barriers) (for an image subresource range) using a pipeline barrier command,
on a queue from the destination queue family.
The buffer range or image subresource range specified in an acquire
operation **must** match exactly that of a previous release operation.
The `srcQueueFamilyIndex` parameter of the barrier **must** be the source
queue family index, and the `dstQueueFamilyIndex` parameter to the
destination queue family index.
The source access mask is ignored for such a barrier, such that no
availability operation is executed - the value of this mask does not affect
the validity of the barrier.
The acquire operation happens-before the visibility operation.
If `dependencyFlags` does not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
`srcStageMask` is also ignored for such a barrier as defined by
[buffer memory ownership transfer](#buffer-memory-barrier-ownership-transfer) and [image memory ownership transfer](#image-memory-barrier-ownership-transfer).
Applications **must** not execute an acquire operation on any resource where it
has been modified in any way other than a matching release operation.

|  | Whilst it is not invalid to provide destination or source access masks for
| --- | --- |
memory barriers used for release or acquire operations, respectively, they
have no practical effect.
Access after a release operation has **undefined** results, and so visibility
for those accesses has no practical effect.
Similarly, write access before an acquire operation will produce **undefined**
results for future access, so availability of those writes has no practical
use.
In an earlier version of the specification, these were required to match on
both sides - but this was subsequently relaxed.
These masks **should** be set to 0. |

|  | To ensure that an acquire and release operation are valid, the release
| --- | --- |
operation must happen-before the acquire operation.
Often, semaphores are used for this directly, with the semaphore signaling
after a release and then waiting before an acquire.
Prior to the introduction of
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits),
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](#VkPipelineStageFlagBits) is the only valid stage to wait on
or wait for these operations, as the acquire and release operations do not
occur in a defined stage.
When
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](#VkDependencyFlagBits)
is specified however, these can be synchronized with the stages which would
otherwise be ignored, as these stages now synchronize the acquire and
release operations, providing a way to avoid full pipeline stalls. |

If the transfer is via an image memory barrier, and an
[image layout transition](#synchronization-image-layout-transitions) is
desired, then the values of `oldLayout` and `newLayout` in the
*release operation*'s memory barrier **must** be equal to values of
`oldLayout` and `newLayout` in the *acquire operation*'s memory
barrier.
Although the image layout transition is submitted twice, it will only be
executed once.
A layout transition specified in this way happens-after the *release
operation* and happens-before the *acquire operation*.

If the values of `srcQueueFamilyIndex` and `dstQueueFamilyIndex` are
equal, no ownership transfer is performed, and the barrier operates as if
they were both set to [VK_QUEUE_FAMILY_IGNORED](#VK_QUEUE_FAMILY_IGNORED).

Queue family ownership transfers **may** perform read and write accesses on all
memory bound to the image subresource or buffer range, so applications **must**
ensure that all memory writes have been made
[available](#synchronization-dependencies-available-and-visible) before a
queue family ownership transfer is executed.
Available memory is automatically made visible to queue family release and
acquire operations, and writes performed by those operations are
automatically made available.

Once a queue family has acquired ownership of a buffer range or image
subresource range of a [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode) resource, its
contents are **undefined** to other queue families unless ownership is
transferred.
The contents of any portion of another resource which aliases memory that is
bound to the transferred buffer or image subresource range are **undefined**
after a release or acquire operation.

|  | Because [events](#synchronization-events) **cannot** be used directly for
| --- | --- |
inter-queue synchronization, and because [vkCmdSetEvent](#vkCmdSetEvent) does not have
the queue family index or memory barrier parameters needed by a *release
operation*, the release and acquire operations of a queue family ownership
transfer **can** only be performed using [vkCmdPipelineBarrier](#vkCmdPipelineBarrier). |

An *acquire operation* **may** have a performance penalty when acquiring
ownership of a subresource range from one of the special queue families
reserved for external memory ownership transfers described above.
The application **can** reduce the performance penalty in some cases by adding
a [VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT) structure to the `pNext`
chain of the *acquire operation*'s memory barrier structure.

The `VkExternalMemoryAcquireUnmodifiedEXT` structure is defined as:

// Provided by VK_EXT_external_memory_acquire_unmodified
typedef struct VkExternalMemoryAcquireUnmodifiedEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           acquireUnmodifiedMemory;
} VkExternalMemoryAcquireUnmodifiedEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`acquireUnmodifiedMemory` specifies, if [VK_TRUE](fundamentals.html#VK_TRUE), that no range
of [VkDeviceMemory](memory.html#VkDeviceMemory) bound to the resource of the memory barrier’s
subresource range was modified at any time since the resource’s most
recent release of ownership to the queue family specified by the memory
barrier’s `srcQueueFamilyIndex`.
If [VK_FALSE](fundamentals.html#VK_FALSE), it specifies nothing.

If the application releases ownership of the subresource range to one of the
special queue families reserved for external memory ownership transfers with
a memory barrier structure, and later re-acquires ownership from the same
queue family with a memory barrier structure, and if no range of
[VkDeviceMemory](memory.html#VkDeviceMemory) bound to the resource was modified at any time between
the *release operation* and the *acquire operation*, then the application
**should** add a [VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT) structure to the
`pNext` chain of the *acquire operation*'s memory barrier structure
because this **may** reduce the performance penalty.

This structure is ignored if `acquireUnmodifiedMemory` is
[VK_FALSE](fundamentals.html#VK_FALSE).
In particular, [VK_FALSE](fundamentals.html#VK_FALSE) does *not* specify that memory was modified.

This structure is ignored if the memory barrier’s `srcQueueFamilyIndex`
is not a special queue family reserved for external memory ownership
transfers.

|  | The method by which the application determines whether memory was modified
| --- | --- |
between the *release operation* and *acquire operation* is outside the scope
of Vulkan.

For any Vulkan operation that accesses a resource, the application **must** not
assume the implementation accesses the resource’s memory as read-only, even
for *apparently* read-only operations such as transfer commands and shader
reads.

The validity of
[VkExternalMemoryAcquireUnmodifiedEXT](#VkExternalMemoryAcquireUnmodifiedEXT)::`acquireUnmodifiedMemory` is
independent of memory ranges outside the ranges of [VkDeviceMemory](memory.html#VkDeviceMemory)
bound to the resource.
In particular, it is independent of any implementation-private memory
associated with the resource. |

Valid Usage

* 
[](#VUID-VkExternalMemoryAcquireUnmodifiedEXT-acquireUnmodifiedMemory-08922) VUID-VkExternalMemoryAcquireUnmodifiedEXT-acquireUnmodifiedMemory-08922

If `acquireUnmodifiedMemory` is [VK_TRUE](fundamentals.html#VK_TRUE), and the memory
barrier’s `srcQueueFamilyIndex` is a special queue family reserved
for external memory ownership transfers (as described in
[Queue Family Ownership Transfer](#synchronization-queue-transfers)), then each range of
[VkDeviceMemory](memory.html#VkDeviceMemory) bound to the resource **must** have remained
unmodified during all time since the resource’s most recent release of
ownership to the queue family

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryAcquireUnmodifiedEXT-sType-sType) VUID-VkExternalMemoryAcquireUnmodifiedEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_ACQUIRE_UNMODIFIED_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferMemoryBarrier](#VkBufferMemoryBarrier)

* 
[VkBufferMemoryBarrier2](#VkBufferMemoryBarrier2)

* 
[VkImageMemoryBarrier](#VkImageMemoryBarrier)

* 
[VkImageMemoryBarrier2](#VkImageMemoryBarrier2)

To wait on the host for the completion of outstanding queue operations for a
given queue, call:

// Provided by VK_VERSION_1_0
VkResult vkQueueWaitIdle(
    VkQueue                                     queue);

* 
`queue` is the queue on which to wait.

`vkQueueWaitIdle` is equivalent to having submitted a valid fence to
every previously executed [queue submission command](devsandqueues.html#devsandqueues-submission) that accepts a fence, then waiting for all of those fences to
signal using [vkWaitForFences](#vkWaitForFences) with an infinite timeout and
`waitAll` set to [VK_TRUE](fundamentals.html#VK_TRUE).

|  | Even though [vkQueuePresentKHR](VK_KHR_surface/wsi.html#vkQueuePresentKHR) does not have a fence parameter, it does
| --- | --- |
accept a fence through [VkSwapchainPresentFenceInfoEXT](VK_KHR_surface/wsi.html#VkSwapchainPresentFenceInfoEXT). |

Valid Usage (Implicit)

* 
[](#VUID-vkQueueWaitIdle-queue-parameter) VUID-vkQueueWaitIdle-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
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

To wait on the host for the completion of outstanding queue operations for
all queues on a given logical device, call:

// Provided by VK_VERSION_1_0
VkResult vkDeviceWaitIdle(
    VkDevice                                    device);

* 
`device` is the logical device to idle.

`vkDeviceWaitIdle` is equivalent to calling `vkQueueWaitIdle` for
all queues owned by `device`.

Valid Usage (Implicit)

* 
[](#VUID-vkDeviceWaitIdle-device-parameter) VUID-vkDeviceWaitIdle-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

Host Synchronization

* 
Host access to all `VkQueue` objects created from `device`
that are not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)
             **must** be externally synchronized

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

When batches of command buffers are submitted to a queue via a
[queue submission command](devsandqueues.html#devsandqueues-submission), it defines a memory
dependency with prior host operations, and execution of command buffers
submitted to the queue.

The first [synchronization scope](#synchronization-dependencies-scopes)
includes execution of [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit) on the host and anything that
happened-before it, as defined by the host memory model.

|  | Some systems allow writes that do not directly integrate with the host
| --- | --- |
memory model; these have to be synchronized by the application manually.
One example of this is non-temporal store instructions on x86; to ensure
these happen-before submission, applications should call `_mm_sfence()`. |

The second [synchronization scope](#synchronization-dependencies-scopes)
includes all commands submitted in the same [queue submission](devsandqueues.html#devsandqueues-submission), and all commands that occur later in
[submission order](#synchronization-submission-order).

The first [access scope](#synchronization-dependencies-access-scopes)
includes all host writes to mappable device memory that are available to the
host memory domain.

The second [access scope](#synchronization-dependencies-access-scopes)
includes all memory access performed by the device.

If a logical device includes more than one physical device, then fences,
semaphores, and events all still have a single instance of the signaled
state.

A fence becomes signaled when all physical devices complete the necessary
queue operations.

Semaphore wait and signal operations all include a device index that is the
sole physical device that performs the operation.
These indices are provided in the [VkDeviceGroupSubmitInfo](cmdbuffers.html#VkDeviceGroupSubmitInfo)
and [VkDeviceGroupBindSparseInfo](sparsemem.html#VkDeviceGroupBindSparseInfo)
structures.
Semaphores are not exclusively owned by any physical device.
For example, a semaphore can be signaled by one physical device and then
waited on by a different physical device.

An event **can** only be waited on by the same physical device that signaled it
(or the host).

In order to be able to correlate the time a particular operation took place
at on timelines of different time domains (e.g. a device operation vs. a
host operation), Vulkan allows querying calibrated timestamps from multiple
time domains.

To query calibrated timestamps from a set of time domains, call:

// Provided by VK_KHR_calibrated_timestamps
VkResult vkGetCalibratedTimestampsKHR(
    VkDevice                                    device,
    uint32_t                                    timestampCount,
    const VkCalibratedTimestampInfoKHR*         pTimestampInfos,
    uint64_t*                                   pTimestamps,
    uint64_t*                                   pMaxDeviation);

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to vkGetCalibratedTimestampsKHR
VkResult vkGetCalibratedTimestampsEXT(
    VkDevice                                    device,
    uint32_t                                    timestampCount,
    const VkCalibratedTimestampInfoKHR*         pTimestampInfos,
    uint64_t*                                   pTimestamps,
    uint64_t*                                   pMaxDeviation);

* 
`device` is the logical device used to perform the query.

* 
`timestampCount` is the number of timestamps to query.

* 
`pTimestampInfos` is a pointer to an array of `timestampCount`
[VkCalibratedTimestampInfoKHR](#VkCalibratedTimestampInfoKHR) structures, describing the time
domains the calibrated timestamps should be captured from.

* 
`pTimestamps` is a pointer to an array of `timestampCount`
64-bit unsigned integer values in which the requested calibrated
timestamp values are returned.

* 
`pMaxDeviation` is a pointer to a 64-bit unsigned integer value in
which the strictly positive maximum deviation, in nanoseconds, of the
calibrated timestamp values is returned.

|  | The maximum deviation **may** vary between calls to
| --- | --- |
`vkGetCalibratedTimestampsKHR` even for the same set of time domains due
to implementation and platform specific reasons.
It is the application’s responsibility to assess whether the returned
maximum deviation makes the timestamp values suitable for any particular
purpose and **can** choose to re-issue the timestamp calibration call pursuing
a lower deviation value. |

Calibrated timestamp values **can** be extrapolated to estimate future
coinciding timestamp values, however, depending on the nature of the time
domains and other properties of the platform extrapolating values over a
sufficiently long period of time **may** no longer be accurate enough to fit
any particular purpose, so applications are expected to re-calibrate the
timestamps on a regular basis.

Valid Usage

* 
[](#VUID-vkGetCalibratedTimestampsKHR-timeDomain-09246) VUID-vkGetCalibratedTimestampsKHR-timeDomain-09246

The `timeDomain` value of each [VkCalibratedTimestampInfoKHR](#VkCalibratedTimestampInfoKHR) in
`pTimestampInfos` **must** be unique
except for those with a value of
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](#VkTimeDomainEXT)

Valid Usage (Implicit)

* 
[](#VUID-vkGetCalibratedTimestampsKHR-device-parameter) VUID-vkGetCalibratedTimestampsKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetCalibratedTimestampsKHR-pTimestampInfos-parameter) VUID-vkGetCalibratedTimestampsKHR-pTimestampInfos-parameter

 `pTimestampInfos` **must** be a valid pointer to an array of `timestampCount` valid [VkCalibratedTimestampInfoKHR](#VkCalibratedTimestampInfoKHR) structures

* 
[](#VUID-vkGetCalibratedTimestampsKHR-pTimestamps-parameter) VUID-vkGetCalibratedTimestampsKHR-pTimestamps-parameter

 `pTimestamps` **must** be a valid pointer to an array of `timestampCount` `uint64_t` values

* 
[](#VUID-vkGetCalibratedTimestampsKHR-pMaxDeviation-parameter) VUID-vkGetCalibratedTimestampsKHR-pMaxDeviation-parameter

 `pMaxDeviation` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetCalibratedTimestampsKHR-timestampCount-arraylength) VUID-vkGetCalibratedTimestampsKHR-timestampCount-arraylength

 `timestampCount` **must** be greater than `0`

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

The `VkCalibratedTimestampInfoKHR` structure is defined as:

// Provided by VK_KHR_calibrated_timestamps
typedef struct VkCalibratedTimestampInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkTimeDomainKHR    timeDomain;
} VkCalibratedTimestampInfoKHR;

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to VkCalibratedTimestampInfoKHR
typedef VkCalibratedTimestampInfoKHR VkCalibratedTimestampInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`timeDomain` is a [VkTimeDomainKHR](#VkTimeDomainKHR) value specifying the time
domain from which the calibrated timestamp value should be returned.

Valid Usage

* 
[](#VUID-VkCalibratedTimestampInfoKHR-timeDomain-02354) VUID-VkCalibratedTimestampInfoKHR-timeDomain-02354

`timeDomain` **must** be one of the [VkTimeDomainKHR](#VkTimeDomainKHR) values
returned by [vkGetPhysicalDeviceCalibrateableTimeDomainsKHR](capabilities.html#vkGetPhysicalDeviceCalibrateableTimeDomainsKHR)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-timeDomain-12227) VUID-VkCalibratedTimestampInfoKHR-timeDomain-12227

If `timeDomain` is [VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT](#VkTimeDomainEXT) or
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](#VkTimeDomainEXT), the `pNext` chain
**must** include a [VkSwapchainCalibratedTimestampInfoEXT](#VkSwapchainCalibratedTimestampInfoEXT) structure

Valid Usage (Implicit)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-sType-sType) VUID-VkCalibratedTimestampInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-pNext-pNext) VUID-VkCalibratedTimestampInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkSwapchainCalibratedTimestampInfoEXT](#VkSwapchainCalibratedTimestampInfoEXT)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-sType-unique) VUID-VkCalibratedTimestampInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCalibratedTimestampInfoKHR-timeDomain-parameter) VUID-VkCalibratedTimestampInfoKHR-timeDomain-parameter

 `timeDomain` **must** be a valid [VkTimeDomainKHR](#VkTimeDomainKHR) value

The set of supported time domains consists of:

// Provided by VK_KHR_calibrated_timestamps
typedef enum VkTimeDomainKHR {
    VK_TIME_DOMAIN_DEVICE_KHR = 0,
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_KHR = 1,
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_KHR = 2,
    VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_KHR = 3,
  // Provided by VK_EXT_present_timing
    VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT = 1000208000,
  // Provided by VK_EXT_present_timing
    VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT = 1000208001,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_DEVICE_EXT = VK_TIME_DOMAIN_DEVICE_KHR,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_EXT = VK_TIME_DOMAIN_CLOCK_MONOTONIC_KHR,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_EXT = VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_KHR,
  // Provided by VK_EXT_calibrated_timestamps
    VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_EXT = VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_KHR,
} VkTimeDomainKHR;

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to VkTimeDomainKHR
typedef VkTimeDomainKHR VkTimeDomainEXT;

* 
[VK_TIME_DOMAIN_DEVICE_KHR](#VkTimeDomainEXT) specifies the device time domain.
Timestamp values in this time domain use the same units and are
comparable with device timestamp values captured using
[vkCmdWriteTimestamp](queries.html#vkCmdWriteTimestamp)
or [vkCmdWriteTimestamp2](queries.html#vkCmdWriteTimestamp2)
and are defined to be incrementing according to the
[`timestampPeriod`](limits.html#limits-timestampPeriod) of the device.

* 
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](#VkTimeDomainEXT) specifies a time domain
unique to a particular swapchain and a specific present stage.
Timestamp values in this time domain are in units of nanosecond and are
comparable only with other values from the same swapchain and present
stage.

* 
[VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT](#VkTimeDomainEXT) specifies a time domain unique
to a particular swapchain.
Timestamp values in this time domain are in units of nanosecond and are
comparable only with other values from the same swapchain.

* 
[VK_TIME_DOMAIN_CLOCK_MONOTONIC_KHR](#VkTimeDomainEXT) specifies the CLOCK_MONOTONIC
time domain available on POSIX platforms.
Timestamp values in this time domain are in units of nanoseconds and are
comparable with platform timestamp values captured using the POSIX
clock_gettime API as computed by this example:

|  | An implementation supporting
| --- | --- |
`[VK_KHR_calibrated_timestamps](../appendices/extensions.html#VK_KHR_calibrated_timestamps)`
or
`[VK_EXT_calibrated_timestamps](../appendices/extensions.html#VK_EXT_calibrated_timestamps)`
will use the same time domain for all its [VkQueue](devsandqueues.html#VkQueue) so that timestamp
values reported for [VK_TIME_DOMAIN_DEVICE_KHR](#VkTimeDomainEXT) can be matched to any
timestamp captured through [vkCmdWriteTimestamp](queries.html#vkCmdWriteTimestamp)
or [vkCmdWriteTimestamp2](queries.html#vkCmdWriteTimestamp2)
. |

struct timespec tv;
clock_gettime(CLOCK_MONOTONIC, &tv);
return tv.tv_nsec + tv.tv_sec*1000000000ull;

* 
[VK_TIME_DOMAIN_CLOCK_MONOTONIC_RAW_KHR](#VkTimeDomainEXT) specifies the
CLOCK_MONOTONIC_RAW time domain available on POSIX platforms.
Timestamp values in this time domain are in units of nanoseconds and are
comparable with platform timestamp values captured using the POSIX
clock_gettime API as computed by this example:

struct timespec tv;
clock_gettime(CLOCK_MONOTONIC_RAW, &tv);
return tv.tv_nsec + tv.tv_sec*1000000000ull;

* 
[VK_TIME_DOMAIN_QUERY_PERFORMANCE_COUNTER_KHR](#VkTimeDomainEXT) specifies the
performance counter (QPC) time domain available on Windows.
Timestamp values in this time domain are in the same units as those
provided by the Windows QueryPerformanceCounter API and are comparable
with platform timestamp values captured using that API as computed by
this example:

LARGE_INTEGER counter;
QueryPerformanceCounter(&counter);
return counter.QuadPart;

The `VkSwapchainCalibratedTimestampInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkSwapchainCalibratedTimestampInfoEXT {
    VkStructureType           sType;
    const void*               pNext;
    VkSwapchainKHR            swapchain;
    VkPresentStageFlagsEXT    presentStage;
    uint64_t                  timeDomainId;
} VkSwapchainCalibratedTimestampInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is the swapchain to retrieve the swapchain-local
timestamp from.

* 
`presentStage` is zero or a [VkPresentStageFlagsEXT](VK_KHR_surface/wsi.html#VkPresentStageFlagsEXT) value used
to identify a single present stage when calibrating a timestamp in the
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](#VkTimeDomainEXT) time domain.

* 
`timeDomainId` is the id for the opaque time domain being
calibrated.

`timeDomainId` **must** be an id previously reported by
[vkGetSwapchainTimeDomainPropertiesEXT](VK_KHR_surface/wsi.html#vkGetSwapchainTimeDomainPropertiesEXT) for `swapchain`.
If the `timeDomainId` is no longer supported by the `swapchain`,
implementations **may** report zero as the calibrated timestamp value.

Valid Usage

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-timeDomain-12228) VUID-VkSwapchainCalibratedTimestampInfoEXT-timeDomain-12228

If the `timeDomain` member of the [VkCalibratedTimestampInfoKHR](#VkCalibratedTimestampInfoKHR)
structure in this structure’s `pNext` chain is
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](#VkTimeDomainEXT), `presentStage` **must**
specify one and only one present stage

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-sType-sType) VUID-VkSwapchainCalibratedTimestampInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_CALIBRATED_TIMESTAMP_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-swapchain-parameter) VUID-VkSwapchainCalibratedTimestampInfoEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR) handle

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-presentStage-parameter) VUID-VkSwapchainCalibratedTimestampInfoEXT-presentStage-parameter

 `presentStage` **must** be a valid combination of [VkPresentStageFlagBitsEXT](VK_KHR_surface/wsi.html#VkPresentStageFlagBitsEXT) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCalibratedTimestampInfoKHR](#VkCalibratedTimestampInfoKHR)
