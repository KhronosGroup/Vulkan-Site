# VkSemaphoreSubmitInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreSubmitInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreSubmitInfo - Structure specifying a semaphore signal or wait operation

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is a [VkSemaphore](VkSemaphore.html) affected by this operation.

* 
`value` is
either the value used to signal `semaphore` or the value waited on
by `semaphore`, if `semaphore` is a timeline semaphore.
Otherwise it is
ignored.

* 
`stageMask` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline stages
which limit the first synchronization scope of a semaphore signal
operation, or second synchronization scope of a semaphore wait operation
as described in the [semaphore wait    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting) and [semaphore signal    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) sections of [the synchronization    chapter](../../../../spec/latest/chapters/synchronization.html#synchronization).

* 
`deviceIndex` is the index of the device within a device group that
executes the semaphore wait or signal operation.

Whether this structure defines a semaphore wait or signal operation is
defined by how it is used.
The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
a [semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) or the
second synchronization scope of a [semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting) defined by this structure are limited to
operations in stages indicated by `stageMask`.

Valid Usage

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03929) VUID-VkSemaphoreSubmitInfo-stageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03930) VUID-VkSemaphoreSubmitInfo-stageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03931) VUID-VkSemaphoreSubmitInfo-stageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03932) VUID-VkSemaphoreSubmitInfo-stageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03933) VUID-VkSemaphoreSubmitInfo-stageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03934) VUID-VkSemaphoreSubmitInfo-stageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-03935) VUID-VkSemaphoreSubmitInfo-stageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-07316) VUID-VkSemaphoreSubmitInfo-stageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-04957) VUID-VkSemaphoreSubmitInfo-stageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-04995) VUID-VkSemaphoreSubmitInfo-stageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-07946) VUID-VkSemaphoreSubmitInfo-stageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-10751) VUID-VkSemaphoreSubmitInfo-stageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-10752) VUID-VkSemaphoreSubmitInfo-stageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-10753) VUID-VkSemaphoreSubmitInfo-stageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

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

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO](VkStructureType.html)

* 
[](#VUID-VkSemaphoreSubmitInfo-pNext-pNext) VUID-VkSemaphoreSubmitInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreSubmitInfo-semaphore-parameter) VUID-VkSemaphoreSubmitInfo-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkSemaphoreSubmitInfo-stageMask-parameter) VUID-VkSemaphoreSubmitInfo-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkRenderPassStripeSubmitInfoARM](VkRenderPassStripeSubmitInfoARM.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [VkSubmitInfo2](VkSubmitInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkSemaphoreSubmitInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
