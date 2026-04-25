# VkSwapchainKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainKHR - Opaque handle to a swapchain object

A swapchain object (a.k.a.
swapchain) provides the ability to present rendering results to a surface.
Swapchain objects are represented by `VkSwapchainKHR` handles:

// Provided by VK_KHR_swapchain
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSwapchainKHR)

A swapchain is an abstraction for an array of presentable images that are
associated with a surface.
The presentable images are represented by `VkImage` objects created by
the platform.
One image (which **can** be an array image for multiview/stereoscopic-3D
surfaces) is displayed at a time, but multiple images **can** be queued for
presentation.
An application renders to the image, and then queues the image for
presentation to the surface.

A native window **cannot** be associated with more than one non-retired
swapchain at a time.
Further, swapchains **cannot** be created for native windows that have a
non-Vulkan graphics API surface associated with them.

|  | The presentation engine is an abstraction for the platform’s compositor or
| --- | --- |
display engine.

The presentation engine **may** be synchronous or asynchronous with respect to
the application and/or logical device.

Some implementations **may** use the device’s graphics queue or dedicated
presentation hardware to perform presentation. |

The presentable images of a swapchain are owned by the presentation engine.
An application **can** acquire use of a presentable image from the presentation
engine.
Use of a presentable image **must** occur only after the image is returned by
[vkAcquireNextImageKHR](vkAcquireNextImageKHR.html), and before it is released by
[vkQueuePresentKHR](vkQueuePresentKHR.html).
This includes transitioning the image layout and rendering commands.

An application **can** acquire use of a presentable image with
[vkAcquireNextImageKHR](vkAcquireNextImageKHR.html).
After acquiring a presentable image and before modifying it, the application
**must** use a synchronization primitive to ensure that the presentation engine
has finished reading from the image.
The application **can** then transition the image’s layout, queue rendering
commands to it, etc.
Finally, the application presents the image with [vkQueuePresentKHR](vkQueuePresentKHR.html),
which releases the acquisition of the image.
The application **can** also release the acquisition of the image through
[vkReleaseSwapchainImagesKHR](vkReleaseSwapchainImagesKHR.html), if the image is not in use by the device,
and skip the present operation.

The presentation engine controls the order in which presentable images are
acquired for use by the application.

|  | This allows the platform to handle situations which require out-of-order
| --- | --- |
return of images after presentation.
At the same time, it allows the application to generate command buffers
referencing all of the images in the swapchain at initialization time,
rather than in its main loop. |

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html), [VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html), [VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html), [VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html), [VkPresentInfoKHR](VkPresentInfoKHR.html), [VkReleaseSwapchainImagesInfoKHR](VkReleaseSwapchainImagesInfoKHR.html), [VkSwapchainCalibratedTimestampInfoEXT](VkSwapchainCalibratedTimestampInfoEXT.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [vkAcquireFullScreenExclusiveModeEXT](vkAcquireFullScreenExclusiveModeEXT.html), [vkAcquireNextImageKHR](vkAcquireNextImageKHR.html), [vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html), [vkCreateSwapchainKHR](vkCreateSwapchainKHR.html), [vkDestroySwapchainKHR](vkDestroySwapchainKHR.html), [vkGetLatencyTimingsNV](vkGetLatencyTimingsNV.html), [vkGetPastPresentationTimingGOOGLE](vkGetPastPresentationTimingGOOGLE.html), [vkGetRefreshCycleDurationGOOGLE](vkGetRefreshCycleDurationGOOGLE.html), [vkGetSwapchainCounterEXT](vkGetSwapchainCounterEXT.html), [vkGetSwapchainImagesKHR](vkGetSwapchainImagesKHR.html), [vkGetSwapchainStatusKHR](vkGetSwapchainStatusKHR.html), [vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html), [vkGetSwapchainTimingPropertiesEXT](vkGetSwapchainTimingPropertiesEXT.html), [vkLatencySleepNV](vkLatencySleepNV.html), [vkQueuePresentKHR](vkQueuePresentKHR.html), [vkReleaseFullScreenExclusiveModeEXT](vkReleaseFullScreenExclusiveModeEXT.html), [vkSetHdrMetadataEXT](vkSetHdrMetadataEXT.html), [vkSetLatencyMarkerNV](vkSetLatencyMarkerNV.html), [vkSetLatencySleepModeNV](vkSetLatencySleepModeNV.html), [vkSetLocalDimmingAMD](vkSetLocalDimmingAMD.html), [vkSetSwapchainPresentTimingQueueSizeEXT](vkSetSwapchainPresentTimingQueueSizeEXT.html), [vkWaitForPresent2KHR](vkWaitForPresent2KHR.html), [vkWaitForPresentKHR](vkWaitForPresentKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
