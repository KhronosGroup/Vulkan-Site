# vkAcquireNextImage2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireNextImage2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireNextImage2KHR - Retrieve the index of the next available presentable image

To acquire an available presentable image to use, and retrieve the index of
that image, call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
VkResult vkAcquireNextImage2KHR(
    VkDevice                                    device,
    const VkAcquireNextImageInfoKHR*            pAcquireInfo,
    uint32_t*                                   pImageIndex);

* 
`device` is the device associated with `swapchain`.

* 
`pAcquireInfo` is a pointer to a [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html)
structure containing parameters of the acquire.

* 
`pImageIndex` is a pointer to a `uint32_t` value specifying the
index of the next image to use.

If the `swapchain` has been created with the
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) flag, the image
whose index is returned in `pImageIndex` will be fully backed by memory
before this call returns to the application.

Valid Usage

* 
[](#VUID-vkAcquireNextImage2KHR-surface-07784) VUID-vkAcquireNextImage2KHR-surface-07784

If [forward progress](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#swapchain-acquire-forward-progress) cannot be
guaranteed for the `surface` used to create `swapchain`, the
`timeout` member of `pAcquireInfo` **must** not be `UINT64_MAX`

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireNextImage2KHR-device-parameter) VUID-vkAcquireNextImage2KHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAcquireNextImage2KHR-pAcquireInfo-parameter) VUID-vkAcquireNextImage2KHR-pAcquireInfo-parameter

 `pAcquireInfo` **must** be a valid pointer to a valid [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html) structure

* 
[](#VUID-vkAcquireNextImage2KHR-pImageIndex-parameter) VUID-vkAcquireNextImage2KHR-pImageIndex-parameter

 `pImageIndex` **must** be a valid pointer to a `uint32_t` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](VkResult.html)

* 
[VK_SUBOPTIMAL_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

* 
[VK_TIMEOUT](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](VkResult.html)

* 
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html)

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

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireNextImage2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
