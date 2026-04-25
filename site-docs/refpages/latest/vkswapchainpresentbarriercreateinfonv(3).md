# VkSwapchainPresentBarrierCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainPresentBarrierCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainPresentBarrierCreateInfoNV - specify the present barrier membership of this swapchain

The [VkSwapchainPresentBarrierCreateInfoNV](#) structure is defined as:

// Provided by VK_NV_present_barrier
typedef struct VkSwapchainPresentBarrierCreateInfoNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentBarrierEnable;
} VkSwapchainPresentBarrierCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentBarrierEnable` is a boolean value indicating a request for
using the *present barrier*.

If the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) does not include
this structure, the default value for `presentBarrierEnable` is
[VK_FALSE](VK_FALSE.html), meaning the swapchain does not request to use the present
barrier.
Additionally, when recreating a swapchain that was using the present
barrier, and the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) does
not include this structure, it means the swapchain will stop using the
present barrier.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentBarrierCreateInfoNV-sType-sType) VUID-VkSwapchainPresentBarrierCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_BARRIER_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_NV_present_barrier](VK_NV_present_barrier.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainPresentBarrierCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
