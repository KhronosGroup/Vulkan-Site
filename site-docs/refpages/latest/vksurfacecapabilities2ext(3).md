# VkSurfaceCapabilities2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilities2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilities2EXT - Structure describing capabilities of a surface

The `VkSurfaceCapabilities2EXT` structure is defined as:

// Provided by VK_EXT_display_surface_counter
typedef struct VkSurfaceCapabilities2EXT {
    VkStructureType                  sType;
    void*                            pNext;
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
    VkSurfaceCounterFlagsEXT         supportedSurfaceCounters;
} VkSurfaceCapabilities2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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

* 
`supportedSurfaceCounters` is a bitmask of
[VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html) indicating the supported surface
counter types.

Valid Usage

* 
[](#VUID-VkSurfaceCapabilities2EXT-supportedSurfaceCounters-01246) VUID-VkSurfaceCapabilities2EXT-supportedSurfaceCounters-01246

`supportedSurfaceCounters` **must** not include
[VK_SURFACE_COUNTER_VBLANK_BIT_EXT](VkSurfaceCounterFlagBitsEXT.html) unless the surface queried is a
[display surface](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#wsi-display-surfaces)

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilities2EXT-sType-sType) VUID-VkSurfaceCapabilities2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_EXT](VkStructureType.html)

* 
[](#VUID-VkSurfaceCapabilities2EXT-pNext-pNext) VUID-VkSurfaceCapabilities2EXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_display_surface_counter](VK_EXT_display_surface_counter.html), [VkCompositeAlphaFlagsKHR](VkCompositeAlphaFlagsKHR.html), [VkExtent2D](VkExtent2D.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html), [VkSurfaceCounterFlagsEXT](VkSurfaceCounterFlagsEXT.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html), [VkSurfaceTransformFlagsKHR](VkSurfaceTransformFlagsKHR.html), [vkGetPhysicalDeviceSurfaceCapabilities2EXT](vkGetPhysicalDeviceSurfaceCapabilities2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilities2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
