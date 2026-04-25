# VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM - Structure containing scheduling control dispatch parameters properties of a physical device

The `VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM`
structure is defined as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           schedulingControlsMaxWarpsCount;
    uint32_t           schedulingControlsMaxQueuedBatchesCount;
    uint32_t           schedulingControlsMaxWorkGroupBatchSize;
} VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM;

* 
`schedulingControlsMaxWarpsCount`
specifies the maximum number of warps that a shader core **can** run
concurrently.

* 
`schedulingControlsMaxQueuedWorkgroupBatchesCount`
specifies the maximum number of workgroup batches that a shader core
**can** queue.

* 
`schedulingControlsMaxWorkGroupBatchSize`
specifies the maximum size of workgroup batches that **can** be requested
using [VkDispatchParametersARM](VkDispatchParametersARM.html)::`workGroupBatchSize`.

If the `VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

If
[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)::`schedulingControlsFlags`
does not contain
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_ARM](VkPhysicalDeviceSchedulingControlsFlagBitsARM.html) then
`schedulingControlsMaxWarpCount` and
`schedulingControlsMaxQueuedBatchesCount` are **undefined**.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM-sType-sType) VUID-VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
