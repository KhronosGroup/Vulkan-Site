# vkCreateSharedSwapchainsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateSharedSwapchainsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateSharedSwapchainsKHR - Create multiple swapchains that share presentable images

When the `[VK_KHR_display_swapchain](VK_KHR_display_swapchain.html)` extension is enabled, multiple
swapchains that share presentable images are created by calling:

// Provided by VK_KHR_display_swapchain
VkResult vkCreateSharedSwapchainsKHR(
    VkDevice                                    device,
    uint32_t                                    swapchainCount,
    const VkSwapchainCreateInfoKHR*             pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkSwapchainKHR*                             pSwapchains);

* 
`device` is the device to create the swapchains for.

* 
`swapchainCount` is the number of swapchains to create.

* 
`pCreateInfos` is a pointer to an array of
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structures specifying the parameters of
the created swapchains.

* 
`pAllocator` is the allocator used for host memory allocated for the
swapchain objects when there is no more specific allocator available
(see [Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSwapchains` is a pointer to an array of [VkSwapchainKHR](VkSwapchainKHR.html)
handles in which the created swapchain objects will be returned.

`vkCreateSharedSwapchainsKHR` is similar to [vkCreateSwapchainKHR](vkCreateSwapchainKHR.html),
except that it takes an array of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structures,
and returns an array of swapchain objects.

The swapchain creation parameters that affect the properties and number of
presentable images **must** match between all the swapchains.
If the displays used by any of the swapchains do not use the same
presentable image layout or are incompatible in a way that prevents sharing
images, swapchain creation will fail with the result code
[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](VkResult.html).
If any error occurs, no swapchains will be created.
Images presented to multiple swapchains **must** be re-acquired from all of
them before being modified.
After destroying one or more of the swapchains, the remaining swapchains and
the presentable images **can** continue to be used.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSharedSwapchainsKHR-device-parameter) VUID-vkCreateSharedSwapchainsKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateSharedSwapchainsKHR-pCreateInfos-parameter) VUID-vkCreateSharedSwapchainsKHR-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `swapchainCount` valid [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structures

* 
[](#VUID-vkCreateSharedSwapchainsKHR-pAllocator-parameter) VUID-vkCreateSharedSwapchainsKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateSharedSwapchainsKHR-pSwapchains-parameter) VUID-vkCreateSharedSwapchainsKHR-pSwapchains-parameter

 `pSwapchains` **must** be a valid pointer to an array of `swapchainCount` [VkSwapchainKHR](VkSwapchainKHR.html) handles

* 
[](#VUID-vkCreateSharedSwapchainsKHR-device-queuecount) VUID-vkCreateSharedSwapchainsKHR-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkCreateSharedSwapchainsKHR-swapchainCount-arraylength) VUID-vkCreateSharedSwapchainsKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_display_swapchain](VK_KHR_display_swapchain.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateSharedSwapchainsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
