# vkCreateSwapchainKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateSwapchainKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateSwapchainKHR - Create a swapchain

To create a swapchain, call:

// Provided by VK_KHR_swapchain
VkResult vkCreateSwapchainKHR(
    VkDevice                                    device,
    const VkSwapchainCreateInfoKHR*             pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSwapchainKHR*                             pSwapchain);

* 
`device` is the device to create the swapchain for.

* 
`pCreateInfo` is a pointer to a [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)
structure specifying the parameters of the created swapchain.

* 
`pAllocator` is the allocator used for host memory allocated for the
swapchain object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSwapchain` is a pointer to a [VkSwapchainKHR](VkSwapchainKHR.html) handle in which
the created swapchain object will be returned.

As mentioned above, if `vkCreateSwapchainKHR` succeeds, it will return a
handle to a swapchain containing an array of at least
`pCreateInfo->minImageCount` presentable images.

While acquired by the application, presentable images **can** be used in any
way that equivalent non-presentable images **can** be used.
A presentable image is equivalent to a non-presentable image created with
the following [VkImageCreateInfo](VkImageCreateInfo.html) parameters:

| `VkImageCreateInfo` Field | Value |
| --- | --- |
| `flags` | [VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](VkImageCreateFlagBits.html) is set if
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) is set
[VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html) is set if
[VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) is set
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) and
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT_KHR](VkImageCreateFlagBits.html) are both set if
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) is set
all other bits are unset |
| `imageType` | [VK_IMAGE_TYPE_2D](VkImageType.html) |
| `format` | `pCreateInfo->imageFormat` |
| `extent` | {`pCreateInfo->imageExtent.width`, `pCreateInfo->imageExtent.height`, `1`} |
| `mipLevels` | 1 |
| `arrayLayers` | `pCreateInfo->imageArrayLayers` |
| `samples` | [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) |
| `tiling` | [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html) |
| `usage` | `pCreateInfo->imageUsage` |
| `sharingMode` | `pCreateInfo->imageSharingMode` |
| `queueFamilyIndexCount` | `pCreateInfo->queueFamilyIndexCount` |
| `pQueueFamilyIndices` | `pCreateInfo->pQueueFamilyIndices` |
| `initialLayout` | [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) |

The `pCreateInfo->surface` **must** not be destroyed until after the
swapchain is destroyed.

If `oldSwapchain` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
the native window referred to by `pCreateInfo->surface` is already
associated with a Vulkan swapchain, [VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](VkResult.html)
**must** be returned.

If `oldSwapchain` is a valid swapchain and there are outstanding calls
to `vkWaitForPresent2KHR`, then `vkCreateSwapchainKHR` **may** block
until those calls complete.

If the native window referred to by `pCreateInfo->surface` is already
associated with a non-Vulkan graphics API surface,
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](VkResult.html) **must** be returned.

The native window referred to by `pCreateInfo->surface` **must** not become
associated with a non-Vulkan graphics API surface before all associated
Vulkan swapchains have been destroyed.

`vkCreateSwapchainKHR` will return [VK_ERROR_DEVICE_LOST](VkResult.html) if the
logical device was lost.
The `VkSwapchainKHR` is a child of the `device`, and **must** be
destroyed before the `device`.
However, `VkSurfaceKHR` is not a child of any `VkDevice` and is not
affected by the lost device.
After successfully recreating a `VkDevice`, the same `VkSurfaceKHR`
**can** be used to create a new `VkSwapchainKHR`, provided the previous one
was destroyed.

If the `oldSwapchain` parameter of `pCreateInfo` is a valid
swapchain, which has exclusive full-screen access, that access is released
from `pCreateInfo->oldSwapchain`.
If the command succeeds in this case, the newly created swapchain will
automatically acquire exclusive full-screen access from
`pCreateInfo->oldSwapchain`.

|  | This implicit transfer is intended to avoid exiting and entering full-screen
| --- | --- |
exclusive mode, which may otherwise cause unwanted visual updates to the
display. |

In some cases, swapchain creation **may** fail if exclusive full-screen mode is
requested for application control, but for some implementation-specific
reason exclusive full-screen access is unavailable for the particular
combination of parameters provided.
If this occurs, [VK_ERROR_INITIALIZATION_FAILED](VkResult.html) will be returned.

|  | In particular, it will fail if the `imageExtent` member of
| --- | --- |
`pCreateInfo` does not match the extents of the monitor.
Other reasons for failure may include the application not being set as
high-dpi aware, or if the physical device and monitor are not compatible in
this mode. |

If the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) includes a
[VkSwapchainPresentBarrierCreateInfoNV](VkSwapchainPresentBarrierCreateInfoNV.html) structure, then that structure
includes additional swapchain creation parameters specific to the present
barrier.
Swapchain creation **may** fail if the state of the current system restricts
the usage of the present barrier feature
[VkSurfaceCapabilitiesPresentBarrierNV](VkSurfaceCapabilitiesPresentBarrierNV.html), or a swapchain itself does not
satisfy all the required conditions.
In this scenario [VK_ERROR_INITIALIZATION_FAILED](VkResult.html) is returned.

When the [VkSurfaceKHR](VkSurfaceKHR.html) in [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) is a display
surface, then the [VkDisplayModeKHR](VkDisplayModeKHR.html) in display surface’s
[VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html) is associated with a particular
[VkDisplayKHR](VkDisplayKHR.html).
Swapchain creation **may** fail if that [VkDisplayKHR](VkDisplayKHR.html) is not acquired by
the application.
In this scenario [VK_ERROR_INITIALIZATION_FAILED](VkResult.html) is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSwapchainKHR-device-parameter) VUID-vkCreateSwapchainKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateSwapchainKHR-pCreateInfo-parameter) VUID-vkCreateSwapchainKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateSwapchainKHR-pAllocator-parameter) VUID-vkCreateSwapchainKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateSwapchainKHR-pSwapchain-parameter) VUID-vkCreateSwapchainKHR-pSwapchain-parameter

 `pSwapchain` **must** be a valid pointer to a [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkCreateSwapchainKHR-device-queuecount) VUID-vkCreateSwapchainKHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](VkResult.html)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](VkResult.html)

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

[VK_KHR_swapchain](VK_KHR_swapchain.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateSwapchainKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
