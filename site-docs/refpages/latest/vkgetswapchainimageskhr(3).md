# vkGetSwapchainImagesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSwapchainImagesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSwapchainImagesKHR - Obtain the array of presentable images associated with a swapchain

To obtain the array of presentable images associated with a swapchain, call:

// Provided by VK_KHR_swapchain
VkResult vkGetSwapchainImagesKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint32_t*                                   pSwapchainImageCount,
    VkImage*                                    pSwapchainImages);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to query.

* 
`pSwapchainImageCount` is a pointer to an integer related to the
number of presentable images available or queried, as described below.

* 
`pSwapchainImages` is either `NULL` or a pointer to an array of
`VkImage` handles.

If `pSwapchainImages` is `NULL`, then the number of presentable images
for `swapchain` is returned in `pSwapchainImageCount`.
Otherwise, `pSwapchainImageCount` **must** point to a variable set by the
application to the number of elements in the `pSwapchainImages` array,
and on return the variable is overwritten with the number of structures
actually written to `pSwapchainImages`.
If the value of `pSwapchainImageCount` is less than the number of
presentable images for `swapchain`, at most `pSwapchainImageCount`
structures will be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead
of [VK_SUCCESS](VkResult.html), to indicate that not all the available presentable
images were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainImagesKHR-device-parameter) VUID-vkGetSwapchainImagesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSwapchainImagesKHR-swapchain-parameter) VUID-vkGetSwapchainImagesKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetSwapchainImagesKHR-pSwapchainImageCount-parameter) VUID-vkGetSwapchainImagesKHR-pSwapchainImageCount-parameter

 `pSwapchainImageCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetSwapchainImagesKHR-pSwapchainImages-parameter) VUID-vkGetSwapchainImagesKHR-pSwapchainImages-parameter

 If the value referenced by `pSwapchainImageCount` is not `0`, and `pSwapchainImages` is not `NULL`, `pSwapchainImages` **must** be a valid pointer to an array of `pSwapchainImageCount` [VkImage](VkImage.html) handles

* 
[](#VUID-vkGetSwapchainImagesKHR-swapchain-parent) VUID-vkGetSwapchainImagesKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_swapchain](VK_KHR_swapchain.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetSwapchainImagesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
