# VkSubmitInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubmitInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubmitInfo - Structure specifying a queue submit operation

The `VkSubmitInfo` structure is defined as:

|  | This functionality is superseded by [VkSubmitInfo2](../../../../spec/latest/chapters/cmdbuffers.html#VkSubmitInfo2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of semaphores upon which to wait
before executing the command buffers for the batch.

* 
`pWaitSemaphores` is a pointer to an array of [VkSemaphore](VkSemaphore.html)
handles upon which to wait before the command buffers for this batch
begin execution.
If semaphores to wait on are provided, they define a
[semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting).

* 
`pWaitDstStageMask` is a pointer to an array of pipeline stages at
which each corresponding semaphore wait will occur.

* 
`commandBufferCount` is the number of command buffers to execute in
the batch.

* 
`pCommandBuffers` is a pointer to an array of [VkCommandBuffer](VkCommandBuffer.html)
handles to execute in the batch.

* 
`signalSemaphoreCount` is the number of semaphores to be signaled
once the commands specified in `pCommandBuffers` have completed
execution.

* 
`pSignalSemaphores` is a pointer to an array of [VkSemaphore](VkSemaphore.html)
handles which will be signaled when the command buffers for this batch
have completed execution.
If semaphores to be signaled are provided, they define a
[semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling).

The order that command buffers appear in `pCommandBuffers` is used to
determine [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order), and thus
all the [implicit ordering guarantees](../../../../spec/latest/chapters/synchronization.html#synchronization-implicit) that
respect it.
Other than these implicit ordering guarantees and any [explicit synchronization primitives](../../../../spec/latest/chapters/synchronization.html#synchronization), these command buffers **may** overlap or
otherwise execute out of order.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting) defined
by this structure is limited to operations in stages indicated by the
corresponding element of `pWaitDstStageMask`.

|  | A common scenario for using `pWaitDstStageMask` with values other than
| --- | --- |
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html) is when synchronizing a window
system presentation operation against subsequent command buffers which
render the next frame.
In this case, a presentation image **must** not be overwritten until the
presentation operation completes, but other pipeline stages **can** execute
without waiting.
A mask of [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits.html) prevents
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
`srcStageMask` = [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits.html)

* 
`srcAccessMask` = 0

* 
`dstStageMask` = [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits.html)

* 
`dstAccessMask` = [VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits.html) \|
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).

* 
`oldLayout` = [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)

* 
`newLayout` = [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

Alternatively, `oldLayout` **can** be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html), if
the image’s contents need not be preserved.

This barrier accomplishes a dependency chain between previous presentation
operations and subsequent color attachment output operations, with the
layout transition performed in between, and does not introduce a dependency
between previous work and any
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)s.
More precisely, the semaphore signals after the presentation operation
completes, the semaphore wait stalls the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits.html) stage, and there is a
dependency from that same stage to itself with the layout transition
performed in between. |

Valid Usage

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04090) VUID-VkSubmitInfo-pWaitDstStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04091) VUID-VkSubmitInfo-pWaitDstStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04092) VUID-VkSubmitInfo-pWaitDstStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04093) VUID-VkSubmitInfo-pWaitDstStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04094) VUID-VkSubmitInfo-pWaitDstStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04095) VUID-VkSubmitInfo-pWaitDstStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-04096) VUID-VkSubmitInfo-pWaitDstStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-07318) VUID-VkSubmitInfo-pWaitDstStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-03937) VUID-VkSubmitInfo-pWaitDstStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `pWaitDstStageMask` **must** not be `0`

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-07949) VUID-VkSubmitInfo-pWaitDstStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-10754) VUID-VkSubmitInfo-pWaitDstStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `pWaitDstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-00075) VUID-VkSubmitInfo-pCommandBuffers-00075

Each element of `pCommandBuffers` **must** not have been allocated with
[VK_COMMAND_BUFFER_LEVEL_SECONDARY](VkCommandBufferLevel.html)

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-00078) VUID-VkSubmitInfo-pWaitDstStageMask-00078

Each element of `pWaitDstStageMask` **must** not include
[VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubmitInfo-pWaitSemaphores-03239) VUID-VkSubmitInfo-pWaitSemaphores-03239

If any element of `pWaitSemaphores` or `pSignalSemaphores` was
created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html), then the `pNext` chain **must**
include a [VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure

* 
[](#VUID-VkSubmitInfo-pNext-03240) VUID-VkSubmitInfo-pNext-03240

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure and any element of
`pWaitSemaphores` was created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html), then its `waitSemaphoreValueCount`
member **must** equal `waitSemaphoreCount`

* 
[](#VUID-VkSubmitInfo-pNext-03241) VUID-VkSubmitInfo-pNext-03241

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure and any element of
`pSignalSemaphores` was created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html), then its
`signalSemaphoreValueCount` member **must** equal
`signalSemaphoreCount`

* 
[](#VUID-VkSubmitInfo-pSignalSemaphores-03242) VUID-VkSubmitInfo-pSignalSemaphores-03242

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)::`pSignalSemaphoreValues` **must**
have a value greater than the current value of the semaphore when the
[semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) is
executed

* 
[](#VUID-VkSubmitInfo-pWaitSemaphores-03243) VUID-VkSubmitInfo-pWaitSemaphores-03243

For each element of `pWaitSemaphores` created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)::`pWaitSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkSubmitInfo-pSignalSemaphores-03244) VUID-VkSubmitInfo-pSignalSemaphores-03244

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)::`pSignalSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkSubmitInfo-pNext-04120) VUID-VkSubmitInfo-pNext-04120

If the `pNext` chain of this structure does not include a
`VkProtectedSubmitInfo` structure with `protectedSubmit` set to
[VK_TRUE](VK_TRUE.html), then each element of the `pCommandBuffers` array
**must** be an unprotected command buffer

* 
[](#VUID-VkSubmitInfo-pNext-04148) VUID-VkSubmitInfo-pNext-04148

If the `pNext` chain of this structure includes a
`VkProtectedSubmitInfo` structure with `protectedSubmit` set to
[VK_TRUE](VK_TRUE.html), then each element of the `pCommandBuffers` array
**must** be a protected command buffer

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06193) VUID-VkSubmitInfo-pCommandBuffers-06193

If `pCommandBuffers` contains any [resumed    render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension), they **must** be suspended by a render pass
instance earlier in submission order within `pCommandBuffers`

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06014) VUID-VkSubmitInfo-pCommandBuffers-06014

If `pCommandBuffers` contains any [suspended    render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension), they **must** be resumed by a render pass instance
later in submission order within `pCommandBuffers`

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06015) VUID-VkSubmitInfo-pCommandBuffers-06015

If `pCommandBuffers` contains any [suspended    render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension), there **must** be no action or synchronization
commands executed in a primary or [    secondary](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-secondary) command buffer between that render pass instance and the
render pass instance that resumes it

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-06016) VUID-VkSubmitInfo-pCommandBuffers-06016

If `pCommandBuffers` contains any [suspended    render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension), there **must** be no render pass instances between
that render pass instance and the render pass instance that resumes it

* 
[](#VUID-VkSubmitInfo-variableSampleLocations-06017) VUID-VkSubmitInfo-variableSampleLocations-06017

If the [`variableSampleLocations`](../../../../spec/latest/chapters/limits.html#limits-variableSampleLocations)
limit is not supported, and any element of `pCommandBuffers`
contains any [suspended render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension),
where a graphics pipeline has been bound, any pipelines bound in the
render pass instance that resumes it, or any subsequent render pass
instances that resume from that one and so on, **must** use the same sample
locations

* 
[](#VUID-VkSubmitInfo-pNext-09683) VUID-VkSubmitInfo-pNext-09683

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html) structure then it **must** also include a
[VkFrameBoundaryEXT](VkFrameBoundaryEXT.html) structure

* 
[](#VUID-VkSubmitInfo-pCommandBufferInfos-09942) VUID-VkSubmitInfo-pCommandBufferInfos-09942

If at least one [VkCommandBufferSubmitInfo](VkCommandBufferSubmitInfo.html) structure in
`pCommandBufferInfos` references a `commandBuffer` allocated
from a pool that was created with a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure in the
`pNext` chain of [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html) that included a
foreign data graph processing engine in its `pProcessingEngines`
member, then `pWaitSemaphoreInfos` and `pSignalSemaphoreInfos`
**must** only reference `semaphore` objects that were created from
external handle types reported as supported in a
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html)::`foreignSemaphoreHandleTypes`
structure via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html)
with a `queueFamilyIndex` matching the one the command pool was
created for, for all the foreign data graph processing engines that were
part of the [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) used to
create the command pool

Valid Usage (Implicit)

* 
[](#VUID-VkSubmitInfo-sType-sType) VUID-VkSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBMIT_INFO](VkStructureType.html)

* 
[](#VUID-VkSubmitInfo-pNext-pNext) VUID-VkSubmitInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAmigoProfilingSubmitInfoSEC](VkAmigoProfilingSubmitInfoSEC.html), [VkD3D12FenceSubmitInfoKHR](VkD3D12FenceSubmitInfoKHR.html), [VkDeviceGroupSubmitInfo](VkDeviceGroupSubmitInfo.html), [VkFrameBoundaryEXT](VkFrameBoundaryEXT.html), [VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html), [VkLatencySubmissionPresentIdNV](VkLatencySubmissionPresentIdNV.html), [VkPerformanceQuerySubmitInfoKHR](VkPerformanceQuerySubmitInfoKHR.html), [VkProtectedSubmitInfo](VkProtectedSubmitInfo.html), [VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html), [VkWin32KeyedMutexAcquireReleaseInfoKHR](VkWin32KeyedMutexAcquireReleaseInfoKHR.html), or [VkWin32KeyedMutexAcquireReleaseInfoNV](VkWin32KeyedMutexAcquireReleaseInfoNV.html)

* 
[](#VUID-VkSubmitInfo-sType-unique) VUID-VkSubmitInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubmitInfo-pWaitSemaphores-parameter) VUID-VkSubmitInfo-pWaitSemaphores-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphores` **must** be a valid pointer to an array of `waitSemaphoreCount` valid [VkSemaphore](VkSemaphore.html) handles

* 
[](#VUID-VkSubmitInfo-pWaitDstStageMask-parameter) VUID-VkSubmitInfo-pWaitDstStageMask-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitDstStageMask` **must** be a valid pointer to an array of `waitSemaphoreCount` valid combinations of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-VkSubmitInfo-pCommandBuffers-parameter) VUID-VkSubmitInfo-pCommandBuffers-parameter

 If `commandBufferCount` is not `0`, `pCommandBuffers` **must** be a valid pointer to an array of `commandBufferCount` valid [VkCommandBuffer](VkCommandBuffer.html) handles

* 
[](#VUID-VkSubmitInfo-pSignalSemaphores-parameter) VUID-VkSubmitInfo-pSignalSemaphores-parameter

 If `signalSemaphoreCount` is not `0`, `pSignalSemaphores` **must** be a valid pointer to an array of `signalSemaphoreCount` valid [VkSemaphore](VkSemaphore.html) handles

* 
[](#VUID-VkSubmitInfo-commonparent) VUID-VkSubmitInfo-commonparent

 Each of the elements of `pCommandBuffers`, the elements of `pSignalSemaphores`, and the elements of `pWaitSemaphores` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipelineStageFlags](VkPipelineStageFlags.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [vkQueueSubmit](vkQueueSubmit.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkSubmitInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
