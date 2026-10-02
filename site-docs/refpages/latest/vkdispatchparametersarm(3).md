# VkDispatchParametersARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDispatchParametersARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDispatchParametersARM - Structure specifying parameters that affect dispatch commands

The `VkDispatchParametersARM` structure is defined as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkDispatchParametersARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           workGroupBatchSize;
    uint32_t           maxQueuedWorkGroupBatches;
    uint32_t           maxWarpsPerShaderCore;
} VkDispatchParametersARM;

* 
`workGroupBatchSize`, if it is not 0, is the number of workgroups in
each batch distributed to shader cores.
Otherwise, the implementation selects the number of workgroups in each
batch.

* 
`maxQueuedWorkGroupBatches`, if it is not 0, is the maximum number
of workgroup batches that shader cores **may** queue.
Otherwise, the implementation selects the maximum number of workgroup
batches that shader cores **may** queue.

* 
`maxWarpsPerShaderCore`, if it is not 0, is the maximum number of
warps that **may** run concurrently on individual shader cores.
Otherwise, the implementation selects the maximum number of warps that
**may** run concurrently on individual shader cores.

Valid Usage

* 
[](#VUID-VkDispatchParametersARM-maxWarpsPerShaderCore-12392) VUID-VkDispatchParametersARM-maxWarpsPerShaderCore-12392

`maxWarpsPerShaderCore` **must** be less than or equal to
[VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM](VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM.html)::`schedulingControlsMaxWarpCount`

* 
[](#VUID-VkDispatchParametersARM-maxQueuedWorkGroupBatches-12393) VUID-VkDispatchParametersARM-maxQueuedWorkGroupBatches-12393

`maxQueuedWorkGroupBatches` **must** be less than or equal to
[VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM](VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM.html)::`schedulingControlsMaxQueuedBatchesCount`

* 
[](#VUID-VkDispatchParametersARM-workGroupBatchSize-12394) VUID-VkDispatchParametersARM-workGroupBatchSize-12394

`workGroupBatchSize` **must** be less than or equal to
[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)::`schedulingControlsMaxWorkGroupBatchSize`

Valid Usage (Implicit)

* 
[](#VUID-VkDispatchParametersARM-sType-sType) VUID-VkDispatchParametersARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPATCH_PARAMETERS_ARM](VkStructureType.html)

* 
[](#VUID-VkDispatchParametersARM-pNext-pNext) VUID-VkDispatchParametersARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), [VkStructureType](VkStructureType.html), [vkCmdSetDispatchParametersARM](vkCmdSetDispatchParametersARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#VkDispatchParametersARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
