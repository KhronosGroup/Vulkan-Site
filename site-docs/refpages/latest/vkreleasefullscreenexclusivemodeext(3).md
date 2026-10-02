# vkReleaseFullScreenExclusiveModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkReleaseFullScreenExclusiveModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkReleaseFullScreenExclusiveModeEXT - Release full-screen exclusive mode from a swapchain

To release exclusive full-screen access from a swapchain, call:

// Provided by VK_EXT_full_screen_exclusive
VkResult vkReleaseFullScreenExclusiveModeEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to release exclusive full-screen access
from.

|  | Applications will not be able to present to `swapchain` after this call
| --- | --- |
until exclusive full-screen access is reacquired.
This is usually useful to handle when an application is minimized or
otherwise intends to stop presenting for a time. |

Valid Usage

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02677) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02677

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02678) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02678

`swapchain` **must** be a swapchain created with a
[VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html) structure, with
`fullScreenExclusive` set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VkFullScreenExclusiveEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-device-parameter) VUID-vkReleaseFullScreenExclusiveModeEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parameter) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parent) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

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

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkReleaseFullScreenExclusiveModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
