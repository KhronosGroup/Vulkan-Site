# VkLatencySleepModeInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLatencySleepModeInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLatencySleepModeInfoNV - Structure to set low latency mode

The `VkLatencySleepModeInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySleepModeInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           lowLatencyMode;
    VkBool32           lowLatencyBoost;
    uint32_t           minimumIntervalUs;
} VkLatencySleepModeInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`lowLatencyMode` is the toggle to enable or disable low latency
mode.

* 
`lowLatencyBoost` allows an application to hint to the GPU to
increase performance to provide additional latency savings at a cost of
increased power consumption.

* 
`minimumIntervalUs` is the microseconds between
[vkQueuePresentKHR](vkQueuePresentKHR.html) calls for a given swapchain that
[vkLatencySleepNV](vkLatencySleepNV.html) will enforce.

If `lowLatencyMode` is [VK_FALSE](VK_FALSE.html), `lowLatencyBoost` will still
hint to the GPU to increase its power state and `vkLatencySleepNV` will
still enforce `minimumIntervalUs` between `vkQueuePresentKHR` calls.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySleepModeInfoNV-sType-sType) VUID-VkLatencySleepModeInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SLEEP_MODE_INFO_NV](VkStructureType.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), `VkBool32`, [VkStructureType](VkStructureType.html), [vkSetLatencySleepModeNV](vkSetLatencySleepModeNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkLatencySleepModeInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
