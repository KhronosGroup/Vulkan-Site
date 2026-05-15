# VkSurfaceCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilitiesKHR - Structure describing capabilities of a surface

The `VkSurfaceCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_surface
typedef struct VkSurfaceCapabilitiesKHR {
    uint32_t                         minImageCount;
    uint32_t                         maxImageCount;
    VkExtent2D                       currentExtent;
    VkExtent2D                       minImageExtent;
    VkExtent2D                       maxImageExtent;
    uint32_t                         maxImageArrayLayers;
    VkSurfaceTransformFlagsKHR       supportedTransforms;
    VkSurfaceTransformFlagBitsKHR    currentTransform;
    VkCompositeAlphaFlagsKHR         supportedCompositeAlpha;
    VkImageUsageFlags                supportedUsageFlags;
} VkSurfaceCapabilitiesKHR;

* 
`minImageCount` is the minimum number of images the specified device
supports for a swapchain created for the surface, and will be at least
one.

* 
`maxImageCount` is the maximum number of images the specified device
supports for a swapchain created for the surface, and will be either 0,
or greater than or equal to `minImageCount`.
A value of 0 means that there is no limit on the number of images,
though there **may** be limits related to the total amount of memory used
by presentable images.

* 
`currentExtent` is the current width and height of the surface, or
the special value (0xFFFFFFFF, 0xFFFFFFFF) indicating that the
surface size will be determined by the extent of a swapchain targeting
the surface.

* 
`minImageExtent` contains the smallest valid swapchain extent for
the surface on the specified device.
The `width` and `height` of the extent will each be less than or
equal to the corresponding `width` and `height` of
`currentExtent`, unless `currentExtent` has the special value
described above.

* 
`maxImageExtent` contains the largest valid swapchain extent for the
surface on the specified device.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
`minImageExtent`.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
`currentExtent`, unless `currentExtent` has the special value
described above.

* 
`maxImageArrayLayers` is the maximum number of layers presentable
images **can** have for a swapchain created for this device and surface,
and will be at least one.

* 
`supportedTransforms` is a bitmask of
[VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) indicating the presentation
transforms supported for the surface on the specified device.
At least one bit will be set.

* 
`currentTransform` is [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value
indicating the surface’s current transform relative to the presentation
engine’s natural orientation.

* 
`supportedCompositeAlpha` is a bitmask of
[VkCompositeAlphaFlagBitsKHR](VkCompositeAlphaFlagBitsKHR.html), representing the alpha compositing
modes supported by the presentation engine for the surface on the
specified device, and at least one bit will be set.
Opaque composition **can** be achieved in any alpha compositing mode by
either using an image format that has no alpha component, or by ensuring
that all pixels in the presentable images have an alpha value of 1.0.

* 
`supportedUsageFlags` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html)
representing the ways the application **can** use the presentable images of
a swapchain created
with [VkPresentModeKHR](VkPresentModeKHR.html) set to
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html),
[VK_PRESENT_MODE_IMMEDIATE_KHR](VkPresentModeKHR.html), [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html),
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html)
for the surface on the specified device.
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) **must** be included in the set.
Implementations **may** support additional usages.

|  | Supported usage flags of a presentable image when using
| --- | --- |
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html) presentation mode are
provided by
[VkSharedPresentSurfaceCapabilitiesKHR](VkSharedPresentSurfaceCapabilitiesKHR.html)::`sharedPresentSupportedUsageFlags`. |

|  | Formulas such as min(N, `maxImageCount`) are not correct, since
| --- | --- |
`maxImageCount` **may** be zero. |

[VK_KHR_surface](VK_KHR_surface.html), [VkCompositeAlphaFlagsKHR](VkCompositeAlphaFlagsKHR.html), [VkExtent2D](VkExtent2D.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html), [VkSurfaceTransformFlagsKHR](VkSurfaceTransformFlagsKHR.html), [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
