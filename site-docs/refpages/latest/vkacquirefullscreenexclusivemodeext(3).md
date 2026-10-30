# vkAcquireFullScreenExclusiveModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireFullScreenExclusiveModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireFullScreenExclusiveModeEXT - Acquire full-screen exclusive mode for a swapchain

To acquire exclusive full-screen access for a swapchain, call:

// Provided by VK_EXT_full_screen_exclusive
VkResult vkAcquireFullScreenExclusiveModeEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to acquire exclusive full-screen access
for.

Valid Usage

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02674) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02674

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02675) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02675

`swapchain` **must** be a swapchain created with a
[VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html) structure, with
`fullScreenExclusive` set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VkFullScreenExclusiveEXT.html)

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02676) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02676

`swapchain` **must** not currently have exclusive full-screen access

A return value of [VK_SUCCESS](VkResult.html) indicates that the `swapchain`
successfully acquired exclusive full-screen access.
The swapchain will retain this exclusivity until either the application
releases exclusive full-screen access with
[vkReleaseFullScreenExclusiveModeEXT](vkReleaseFullScreenExclusiveModeEXT.html), destroys the swapchain, or if any
of the swapchain commands return
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](VkResult.html) indicating that the mode
was lost because of platform-specific changes.

If the swapchain was unable to acquire exclusive full-screen access to the
display then [VK_ERROR_INITIALIZATION_FAILED](VkResult.html) is returned.
An application **can** attempt to acquire exclusive full-screen access again
for the same swapchain even if this command fails, or if
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](VkResult.html) has been returned by a
swapchain command.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-device-parameter) VUID-vkAcquireFullScreenExclusiveModeEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parameter) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parent) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

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

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireFullScreenExclusiveModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
