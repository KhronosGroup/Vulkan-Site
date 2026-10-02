# VkSwapchainLatencyCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainLatencyCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainLatencyCreateInfoNV - Specify that a swapchain will use low latency mode

To allow low latency mode to be used by a swapchain, add a
`VkSwapchainLatencyCreateInfoNV` structure to the `pNext` chain of
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html).

The `VkSwapchainLatencyCreateInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkSwapchainLatencyCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           latencyModeEnable;
} VkSwapchainLatencyCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`latencyModeEnable` is [VK_TRUE](VK_TRUE.html) if the created swapchain will
utilize low latency mode, [VK_FALSE](VK_FALSE.html) otherwise.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainLatencyCreateInfoNV-sType-sType) VUID-VkSwapchainLatencyCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_LATENCY_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainLatencyCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
