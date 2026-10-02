# VkPresentModeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentModeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentModeKHR - Presentation mode supported for a surface

Possible values of elements of the
[vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html)::`pPresentModes` array,
indicating the supported presentation modes for a surface, are:

// Provided by VK_KHR_surface
typedef enum VkPresentModeKHR {
    VK_PRESENT_MODE_IMMEDIATE_KHR = 0,
    VK_PRESENT_MODE_MAILBOX_KHR = 1,
    VK_PRESENT_MODE_FIFO_KHR = 2,
    VK_PRESENT_MODE_FIFO_RELAXED_KHR = 3,
  // Provided by VK_KHR_shared_presentable_image
    VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR = 1000111000,
  // Provided by VK_KHR_shared_presentable_image
    VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR = 1000111001,
  // Provided by VK_KHR_present_mode_fifo_latest_ready
    VK_PRESENT_MODE_FIFO_LATEST_READY_KHR = 1000361000,
  // Provided by VK_EXT_present_mode_fifo_latest_ready
    VK_PRESENT_MODE_FIFO_LATEST_READY_EXT = VK_PRESENT_MODE_FIFO_LATEST_READY_KHR,
} VkPresentModeKHR;

* 
[VK_PRESENT_MODE_IMMEDIATE_KHR](#) specifies that the presentation
engine does not wait for a vertical blanking period to update the
current image, meaning this mode **may** result in visible tearing.
No internal queuing of presentation requests is needed, as the requests
are applied immediately.

* 
[VK_PRESENT_MODE_MAILBOX_KHR](#) specifies that the presentation engine
waits for the next vertical blanking period to update the current image.
Tearing **cannot** be observed.
An internal single-entry queue is used to hold pending presentation
requests.
If the queue is full when a new presentation request is received, the
new request replaces the existing entry, and any images associated with
the prior entry become available for reuse by the application.
One request is removed from the queue and processed during each vertical
blanking period in which the queue is non-empty.

* 
[VK_PRESENT_MODE_FIFO_KHR](#) specifies that the presentation engine
waits for the next vertical blanking period to update the current image.
Tearing **cannot** be observed.
An internal queue is used to hold pending presentation requests.
New requests are appended to the end of the queue, and one request is
removed from the beginning of the queue and processed during each
vertical blanking period in which the queue is non-empty.
This is the only value of `presentMode` that is **required** to be
supported.

* 
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#) specifies that the presentation
engine generally waits for the next vertical blanking period to update
the current image.
If a vertical blanking period has already passed since the last update
of the current image then the presentation engine does not wait for
another vertical blanking period for the update, meaning this mode **may**
result in visible tearing in this case.
This mode is useful for reducing visual stutter with an application that
will mostly present a new image before the next vertical blanking
period, but may occasionally be late, and present a new image just after
the next vertical blanking period.
An internal queue is used to hold pending presentation requests.
New requests are appended to the end of the queue, and one request is
removed from the beginning of the queue and processed during or after
each vertical blanking period in which the queue is non-empty.

* 
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#) specifies that the
    presentation engine waits for the next vertical blanking period to
    update the current image.
    Tearing **cannot** be observed.
    An internal queue is used to hold pending presentation requests.
    New requests are appended to the end of the queue.
    At each vertical blanking period, the presentation engine dequeues all
    successive requests that are ready to be presented from the beginning of
    the queue.
    If using
    the `[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html)` extension
or
    the [`presentAtAbsoluteTime`](../../../../spec/latest/chapters/features.html#features-presentAtAbsoluteTime)
    feature
    to provide a target present time, the presentation engine checks the
    specified time for each image.
    If the target present time is less-than or equal-to the current time,
    the presentation engine dequeues the image and checks the next one.
    The image of the last dequeued request is presented.
    The other dequeued requests are dropped.

* 
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#) specifies that the
presentation engine and application have concurrent access to a single
image, which is referred to as a *shared presentable image*.
The presentation engine is only required to update the current image
after a new presentation request is received.
Therefore the application **must** make a presentation request whenever an
update is required.
However, the presentation engine **may** update the current image at any
point, meaning this mode **may** result in visible tearing.

* 
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#) specifies that the
presentation engine and application have concurrent access to a single
image, which is referred to as a *shared presentable image*.
The presentation engine periodically updates the current image on its
regular refresh cycle.
The application is only required to make one initial presentation
request, after which the presentation engine **must** update the current
image without any need for further presentation requests.
The application **can** indicate the image contents have been updated by
making a presentation request, but this does not guarantee the timing of
when it will be updated.
This mode **may** result in visible tearing if rendering to the image is
not timed correctly.

The supported [VkImageUsageFlagBits](VkImageUsageFlagBits.html) of the presentable images of a
swapchain created for a surface **may** differ depending on the presentation
mode, and can be determined as per the table below:

| Presentation mode | Image usage flags |
| --- | --- |
| [VK_PRESENT_MODE_IMMEDIATE_KHR](#) | [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_MAILBOX_KHR](#) | [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_FIFO_KHR](#) | [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#) | [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#) | [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#) | [VkSharedPresentSurfaceCapabilitiesKHR](VkSharedPresentSurfaceCapabilitiesKHR.html)::`sharedPresentSupportedUsageFlags` |
| [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#) | [VkSharedPresentSurfaceCapabilitiesKHR](VkSharedPresentSurfaceCapabilitiesKHR.html)::`sharedPresentSupportedUsageFlags` |

|  | For reference, the mode indicated by [VK_PRESENT_MODE_FIFO_KHR](#) is
| --- | --- |
equivalent to the behavior of {wgl\|glX\|egl}SwapBuffers with a swap interval
of 1, while the mode indicated by [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#) is
equivalent to the behavior of {wgl\|glX}SwapBuffers with a swap interval of
-1 (from the {WGL\|GLX}_EXT_swap_control_tear extensions). |

[VK_KHR_surface](VK_KHR_surface.html), [VkLatencySurfaceCapabilitiesNV](VkLatencySurfaceCapabilitiesNV.html), [VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html), [VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkSwapchainPresentModeInfoKHR](VkSwapchainPresentModeInfoKHR.html), [VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html), [vkGetPhysicalDeviceSurfacePresentModes2EXT](vkGetPhysicalDeviceSurfacePresentModes2EXT.html), [vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentModeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
