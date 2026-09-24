# vkReleaseSwapchainImagesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkReleaseSwapchainImagesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkReleaseSwapchainImagesKHR - Release previously acquired but unused images

To release images previously acquired through
[vkAcquireNextImage2KHR](vkAcquireNextImage2KHR.html) or
[vkAcquireNextImageKHR](vkAcquireNextImageKHR.html), call:

// Provided by VK_KHR_swapchain_maintenance1
VkResult vkReleaseSwapchainImagesKHR(
    VkDevice                                    device,
    const VkReleaseSwapchainImagesInfoKHR*      pReleaseInfo);

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to vkReleaseSwapchainImagesKHR
VkResult vkReleaseSwapchainImagesEXT(
    VkDevice                                    device,
    const VkReleaseSwapchainImagesInfoKHR*      pReleaseInfo);

* 
`device` is the device associated with
[VkReleaseSwapchainImagesInfoKHR](VkReleaseSwapchainImagesInfoKHR.html)::`swapchain`.

* 
`pReleaseInfo` is a pointer to a
[VkReleaseSwapchainImagesInfoKHR](VkReleaseSwapchainImagesInfoKHR.html) structure containing parameters of
the release.

Only images that are not in use by the device **can** be released.

Releasing images is a read-only operation that will not affect the content
of the released images.
Upon reacquiring the image, the image contents and its layout will be the
same as they were prior to releasing it.
However, if a mechanism other than Vulkan is used to modify the platform
window associated with the swapchain, the content of all presentable images
in the swapchain becomes **undefined**.

|  | This functionality is useful during swapchain recreation, where acquired
| --- | --- |
images from the old swapchain can be released instead of presented. |

Valid Usage

* 
[](#VUID-vkReleaseSwapchainImagesKHR-swapchainMaintenance1-10159) VUID-vkReleaseSwapchainImagesKHR-swapchainMaintenance1-10159

Feature [`swapchainMaintenance1`](../../../../spec/latest/chapters/features.html#features-swapchainMaintenance1)
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseSwapchainImagesKHR-device-parameter) VUID-vkReleaseSwapchainImagesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkReleaseSwapchainImagesKHR-pReleaseInfo-parameter) VUID-vkReleaseSwapchainImagesKHR-pReleaseInfo-parameter

 `pReleaseInfo` **must** be a valid pointer to a valid [VkReleaseSwapchainImagesInfoKHR](VkReleaseSwapchainImagesInfoKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_swapchain_maintenance1](VK_EXT_swapchain_maintenance1.html), [VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html), [VkDevice](VkDevice.html), [VkReleaseSwapchainImagesInfoKHR](VkReleaseSwapchainImagesInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkReleaseSwapchainImagesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
