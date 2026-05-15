# VkSwapchainCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainCreateInfoKHR - Structure specifying parameters of a newly created swapchain object

The `VkSwapchainCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain
typedef struct VkSwapchainCreateInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSwapchainCreateFlagsKHR        flags;
    VkSurfaceKHR                     surface;
    uint32_t                         minImageCount;
    VkFormat                         imageFormat;
    VkColorSpaceKHR                  imageColorSpace;
    VkExtent2D                       imageExtent;
    uint32_t                         imageArrayLayers;
    VkImageUsageFlags                imageUsage;
    VkSharingMode                    imageSharingMode;
    uint32_t                         queueFamilyIndexCount;
    const uint32_t*                  pQueueFamilyIndices;
    VkSurfaceTransformFlagBitsKHR    preTransform;
    VkCompositeAlphaFlagBitsKHR      compositeAlpha;
    VkPresentModeKHR                 presentMode;
    VkBool32                         clipped;
    VkSwapchainKHR                   oldSwapchain;
} VkSwapchainCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html)
indicating parameters of the swapchain creation.

* 
`surface` is the surface onto which the swapchain will present
images.
If the creation succeeds, the swapchain becomes associated with
`surface`.

* 
`minImageCount` is the minimum number of presentable images that the
application needs.
The implementation will either create the swapchain with at least that
many images, or it will fail to create the swapchain.

* 
`imageFormat` is a [VkFormat](VkFormat.html) value specifying the format the
swapchain image(s) will be created with.

* 
`imageColorSpace` is a [VkColorSpaceKHR](VkColorSpaceKHR.html) value specifying the
way the swapchain interprets image data.

* 
`imageExtent` is the size (in pixels) of the swapchain image(s).
The behavior is platform-dependent if the image extent does not match
the surface’s `currentExtent` as returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR`.

|  | On some platforms, it is normal that `maxImageExtent` **may** become `(0,
| --- | --- |
0)`, for example when the window is minimized.
In such a case, it is not possible to create a swapchain due to the Valid
Usage requirements
, unless scaling is selected through
[VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html), if supported
. |

* 
`imageArrayLayers` is the number of views in a multiview/stereo
surface.
For non-stereoscopic-3D applications, this value is 1.

* 
`imageUsage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) describing
the intended usage of the (acquired) swapchain images.

* 
`imageSharingMode` is the sharing mode used for the image(s) of the
swapchain.

* 
`queueFamilyIndexCount` is the number of queue families having
access to the image(s) of the swapchain when `imageSharingMode` is
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html).

* 
`pQueueFamilyIndices` is a pointer to an array of queue family
indices having access to the images(s) of the swapchain when
`imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html).

* 
`preTransform` is a [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value
describing the transform, relative to the presentation engine’s natural
orientation, applied to the image content prior to presentation.
If it does not match the `currentTransform` value returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR`, the presentation engine
will transform the image content as part of the presentation operation.

* 
`compositeAlpha` is a [VkCompositeAlphaFlagBitsKHR](VkCompositeAlphaFlagBitsKHR.html) value
indicating the alpha compositing mode to use when this surface is
composited together with other surfaces on certain window systems.

* 
`presentMode` is the presentation mode the swapchain will use.
A swapchain’s present mode determines how incoming present requests will
be processed and queued internally.

* 
`clipped` specifies whether the Vulkan implementation is allowed to
discard rendering operations that affect regions of the surface that are
not visible.

If `clipped` is [VK_TRUE](VK_TRUE.html), the presentable images associated
with the swapchain **may** not own all of their pixels.
Pixels in the presentable images that correspond to regions of the
target surface obscured by another window on the desktop, or subject to
some other clipping mechanism will have **undefined** content when read
back.
Fragment shaders **may** not execute for these pixels, and thus any side
effects they would have had will not occur.
Setting [VK_TRUE](VK_TRUE.html) does not guarantee any clipping will occur, but
allows more efficient presentation methods to be used on some
platforms.

* 
If `clipped` is [VK_FALSE](VK_FALSE.html), presentable images associated with
the swapchain will own all of the pixels they contain.

|  | Applications **should** set this value to [VK_TRUE](VK_TRUE.html) if they do not expect
| --- | --- |
to read back the content of presentable images before presenting them or
after reacquiring them, and if their fragment shaders do not have any side
effects that require them to run for all pixels in the presentable image. |

`oldSwapchain` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), or the existing non-retired
swapchain currently associated with `surface`.
Providing a valid `oldSwapchain` **may** aid in the resource reuse, and
also allows the application to still present any images that are already
acquired from it.

Upon calling `vkCreateSwapchainKHR` with an `oldSwapchain` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `oldSwapchain` is retired — even if creation
of the new swapchain fails.
The new swapchain is created in the non-retired state whether or not
`oldSwapchain` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html).

Upon calling `vkCreateSwapchainKHR` with an `oldSwapchain` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), any images from `oldSwapchain` that are not
acquired by the application **may** be freed by the implementation, which **may**
occur even if creation of the new swapchain fails.
The application **can** destroy `oldSwapchain` to free all memory
associated with `oldSwapchain`.

|  | Multiple retired swapchains **can** be associated with the same
| --- | --- |
`VkSurfaceKHR` through multiple uses of `oldSwapchain` that
outnumber calls to [vkDestroySwapchainKHR](vkDestroySwapchainKHR.html).

After `oldSwapchain` is retired, the application **can** pass to
[vkQueuePresentKHR](vkQueuePresentKHR.html) any images it had already acquired from
`oldSwapchain`.
E.g., an application may present an image from the old swapchain before an
image from the new swapchain is ready to be presented.
As usual, [vkQueuePresentKHR](vkQueuePresentKHR.html) **may** fail if `oldSwapchain` has
entered a state that causes [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) to be returned.

The application **can** continue to use a shared presentable image obtained
from `oldSwapchain` until a presentable image is acquired from the new
swapchain, as long as it has not entered a state that causes it to return
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html). |

Valid Usage

* 
[](#VUID-VkSwapchainCreateInfoKHR-surface-01270) VUID-VkSwapchainCreateInfoKHR-surface-01270

`surface` **must** be a surface that is supported by the device as
determined using [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-minImageCount-01272) VUID-VkSwapchainCreateInfoKHR-minImageCount-01272

`minImageCount` **must** be less than or equal to the value returned in
the `maxImageCount` member of the `VkSurfaceCapabilitiesKHR`
structure returned by `vkGetPhysicalDeviceSurfaceCapabilitiesKHR`
for the surface if the returned `maxImageCount` is not zero

* 
[](#VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10155) VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10155

If the [`swapchainMaintenance1`](../../../../spec/latest/chapters/features.html#features-swapchainMaintenance1)
feature is not enabled, then the `pNext` chain **must** not include a
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html) structure

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-02839) VUID-VkSwapchainCreateInfoKHR-presentMode-02839

If `presentMode` is not
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) nor
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html), then
`minImageCount` **must** be greater than or equal to the value returned
in the `minImageCount` member of the `VkSurfaceCapabilitiesKHR`
structure returned by [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html)
for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-minImageCount-01383) VUID-VkSwapchainCreateInfoKHR-minImageCount-01383

`minImageCount` **must** be `1` if `presentMode` is either
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageFormat-01273) VUID-VkSwapchainCreateInfoKHR-imageFormat-01273

`imageFormat` and `imageColorSpace` **must** match the `format`
and `colorSpace` members, respectively, of one of the
`VkSurfaceFormatKHR` structures returned by
`vkGetPhysicalDeviceSurfaceFormatsKHR` for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-07781) VUID-VkSwapchainCreateInfoKHR-pNext-07781

If a [VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html) structure was not
included in the `pNext` chain, or it is included and
[VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html)::`scalingBehavior` is
zero then
`imageExtent` **must** be between `minImageExtent` and
`maxImageExtent`, inclusive, where `minImageExtent` and
`maxImageExtent` are members of the `VkSurfaceCapabilitiesKHR`
structure returned by `vkGetPhysicalDeviceSurfaceCapabilitiesKHR`
for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-07782) VUID-VkSwapchainCreateInfoKHR-pNext-07782

If a [VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html) structure was included
in the `pNext` chain and
[VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html)::`scalingBehavior` is
not zero then `imageExtent` **must** be between
`minScaledImageExtent` and `maxScaledImageExtent`, inclusive,
where `minScaledImageExtent` and `maxScaledImageExtent` are
members of the `VkSurfacePresentScalingCapabilitiesKHR` structure
returned by `vkGetPhysicalDeviceSurfaceCapabilities2KHR` for the
surface and `presentMode`

* 
[](#VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10157) VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10157

If the [`swapchainMaintenance1`](../../../../spec/latest/chapters/features.html#features-swapchainMaintenance1)
feature is not enabled, then `flags` **must** not include
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageExtent-01689) VUID-VkSwapchainCreateInfoKHR-imageExtent-01689

`imageExtent` members `width` and `height` **must** both be
non-zero

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageArrayLayers-01275) VUID-VkSwapchainCreateInfoKHR-imageArrayLayers-01275

`imageArrayLayers` **must** be greater than `0` and less than or equal
to the `maxImageArrayLayers` member of the
`VkSurfaceCapabilitiesKHR` structure returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR` for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-01427) VUID-VkSwapchainCreateInfoKHR-presentMode-01427

If `presentMode` is
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html),
[VK_PRESENT_MODE_IMMEDIATE_KHR](VkPresentModeKHR.html), [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html),
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html), `imageUsage` **must** be a
subset of the supported usage flags present in the
`supportedUsageFlags` member of the [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)
structure returned by [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html)
for `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageUsage-01384) VUID-VkSwapchainCreateInfoKHR-imageUsage-01384

If `presentMode` is [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html)
or [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html), `imageUsage`
**must** be a subset of the supported usage flags present in the
`sharedPresentSupportedUsageFlags` member of the
[VkSharedPresentSurfaceCapabilitiesKHR](VkSharedPresentSurfaceCapabilitiesKHR.html) structure returned by
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html) for `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01277) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01277

If `imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01278) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01278

If `imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01428) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01428

If `imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), each
element of `pQueueFamilyIndices` **must** be unique and **must** be less
than `pQueueFamilyPropertyCount` returned by either
[vkGetPhysicalDeviceQueueFamilyProperties](vkGetPhysicalDeviceQueueFamilyProperties.html)
or [vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html)
for the `physicalDevice` that was used to create `device`

* 
[](#VUID-VkSwapchainCreateInfoKHR-preTransform-01279) VUID-VkSwapchainCreateInfoKHR-preTransform-01279

`preTransform` **must** be one of the bits present in the
`supportedTransforms` member of the `VkSurfaceCapabilitiesKHR`
structure returned by `vkGetPhysicalDeviceSurfaceCapabilitiesKHR`
for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-compositeAlpha-01280) VUID-VkSwapchainCreateInfoKHR-compositeAlpha-01280

`compositeAlpha` **must** be one of the bits present in the
`supportedCompositeAlpha` member of the
`VkSurfaceCapabilitiesKHR` structure returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR` for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-01281) VUID-VkSwapchainCreateInfoKHR-presentMode-01281

`presentMode` **must** be one of the [VkPresentModeKHR](VkPresentModeKHR.html) values
returned by `vkGetPhysicalDeviceSurfacePresentModesKHR` for the
surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentModeFifoLatestReady-10161) VUID-VkSwapchainCreateInfoKHR-presentModeFifoLatestReady-10161

If the [    `presentModeFifoLatestReady`](../../../../spec/latest/chapters/features.html#features-presentModeFifoLatestReady) feature is not enabled,
`presentMode` **must** not be
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-physicalDeviceCount-01429) VUID-VkSwapchainCreateInfoKHR-physicalDeviceCount-01429

If the logical device was created with
[VkDeviceGroupDeviceCreateInfo](VkDeviceGroupDeviceCreateInfo.html)::`physicalDeviceCount` equal to
1,
`flags` **must** not contain
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-oldSwapchain-01933) VUID-VkSwapchainCreateInfoKHR-oldSwapchain-01933

If `oldSwapchain` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `oldSwapchain`
**must** be a non-retired swapchain associated with native window referred
to by `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageFormat-01778) VUID-VkSwapchainCreateInfoKHR-imageFormat-01778

The [implied image creation    parameters](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#swapchain-wsi-image-create-info) of the swapchain **must** be supported as reported by
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-03168) VUID-VkSwapchainCreateInfoKHR-flags-03168

If `flags` contains [VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)
then the `pNext` chain **must** include a
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure with a `viewFormatCount`
greater than zero and `pViewFormats` **must** have an element equal to
`imageFormat`

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-04099) VUID-VkSwapchainCreateInfoKHR-pNext-04099

If a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure was included in the
`pNext` chain and
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` is not zero
then all of the formats in
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`pViewFormats` **must** be
compatible with the `format` as described in the
[compatibility table](../../../../spec/latest/chapters/formats.html#formats-compatibility)

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-04100) VUID-VkSwapchainCreateInfoKHR-flags-04100

If `flags` does not contain
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) and the `pNext`
chain include a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure then
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` **must** be `0` or
`1`

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-03187) VUID-VkSwapchainCreateInfoKHR-flags-03187

If `flags` contains [VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html),
then `VkSurfaceProtectedCapabilitiesKHR`::`supportsProtected`
**must** be [VK_TRUE](VK_TRUE.html) in the [VkSurfaceProtectedCapabilitiesKHR](VkSurfaceProtectedCapabilitiesKHR.html)
structure returned by [vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html)
for `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-02679) VUID-VkSwapchainCreateInfoKHR-pNext-02679

If the `pNext` chain includes a
[VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html) structure with its
`fullScreenExclusive` member set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VkFullScreenExclusiveEXT.html), and
`surface` was created using [vkCreateWin32SurfaceKHR](vkCreateWin32SurfaceKHR.html), a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html) structure **must** be
included in the `pNext` chain

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-06752) VUID-VkSwapchainCreateInfoKHR-pNext-06752

If the [    `imageCompressionControlSwapchain`](../../../../spec/latest/chapters/features.html#features-imageCompressionControlSwapchain) feature is not enabled, the
`pNext` chain **must** not include an
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html) structure

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentTiming-12232) VUID-VkSwapchainCreateInfoKHR-presentTiming-12232

If none of the [`presentTiming`](../../../../spec/latest/chapters/features.html#features-presentTiming),
[`presentAtAbsoluteTime`](../../../../spec/latest/chapters/features.html#features-presentAtAbsoluteTime), or
[`presentAtRelativeTime`](../../../../spec/latest/chapters/features.html#features-presentAtRelativeTime) features
are enabled, `flags` **must** not contain
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainCreateInfoKHR-sType-sType) VUID-VkSwapchainCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-pNext) VUID-VkSwapchainCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupSwapchainCreateInfoKHR](VkDeviceGroupSwapchainCreateInfoKHR.html), [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html), [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html), [VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html), [VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html), [VkSwapchainCounterCreateInfoEXT](VkSwapchainCounterCreateInfoEXT.html), [VkSwapchainDisplayNativeHdrCreateInfoAMD](VkSwapchainDisplayNativeHdrCreateInfoAMD.html), [VkSwapchainLatencyCreateInfoNV](VkSwapchainLatencyCreateInfoNV.html), [VkSwapchainPresentBarrierCreateInfoNV](VkSwapchainPresentBarrierCreateInfoNV.html), [VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html), or [VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html)

* 
[](#VUID-VkSwapchainCreateInfoKHR-sType-unique) VUID-VkSwapchainCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-parameter) VUID-VkSwapchainCreateInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html) values

* 
[](#VUID-VkSwapchainCreateInfoKHR-surface-parameter) VUID-VkSwapchainCreateInfoKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageFormat-parameter) VUID-VkSwapchainCreateInfoKHR-imageFormat-parameter

 `imageFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageColorSpace-parameter) VUID-VkSwapchainCreateInfoKHR-imageColorSpace-parameter

 `imageColorSpace` **must** be a valid [VkColorSpaceKHR](VkColorSpaceKHR.html) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageUsage-parameter) VUID-VkSwapchainCreateInfoKHR-imageUsage-parameter

 `imageUsage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageUsage-requiredbitmask) VUID-VkSwapchainCreateInfoKHR-imageUsage-requiredbitmask

 `imageUsage` **must** not be `0`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-parameter) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-parameter

 `imageSharingMode` **must** be a valid [VkSharingMode](VkSharingMode.html) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-preTransform-parameter) VUID-VkSwapchainCreateInfoKHR-preTransform-parameter

 `preTransform` **must** be a valid [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-compositeAlpha-parameter) VUID-VkSwapchainCreateInfoKHR-compositeAlpha-parameter

 `compositeAlpha` **must** be a valid [VkCompositeAlphaFlagBitsKHR](VkCompositeAlphaFlagBitsKHR.html) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-parameter) VUID-VkSwapchainCreateInfoKHR-presentMode-parameter

 `presentMode` **must** be a valid [VkPresentModeKHR](VkPresentModeKHR.html) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-oldSwapchain-parameter) VUID-VkSwapchainCreateInfoKHR-oldSwapchain-parameter

 If `oldSwapchain` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `oldSwapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-VkSwapchainCreateInfoKHR-commonparent) VUID-VkSwapchainCreateInfoKHR-commonparent

 Both of `oldSwapchain`, and `surface` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkInstance](VkInstance.html)

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

* 
Host access to `oldSwapchain` **must** be externally synchronized

[VK_KHR_swapchain](VK_KHR_swapchain.html), `VkBool32`, [VkColorSpaceKHR](VkColorSpaceKHR.html), [VkCompositeAlphaFlagBitsKHR](VkCompositeAlphaFlagBitsKHR.html), [VkExtent2D](VkExtent2D.html), [VkFormat](VkFormat.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkSharingMode](VkSharingMode.html), [VkStructureType](VkStructureType.html), [VkSurfaceKHR](VkSurfaceKHR.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html), [VkSwapchainCreateFlagsKHR](VkSwapchainCreateFlagsKHR.html), [VkSwapchainKHR](VkSwapchainKHR.html), [vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html), [vkCreateSwapchainKHR](vkCreateSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
