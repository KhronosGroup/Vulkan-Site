# VkDisplayPlaneAlphaFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPlaneAlphaFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPlaneAlphaFlagBitsKHR - Alpha blending type

Bits which **can** be set in
[VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html)::`alphaMode`, specifying the type of
alpha blending to use on a display, are:

// Provided by VK_KHR_display
typedef enum VkDisplayPlaneAlphaFlagBitsKHR {
    VK_DISPLAY_PLANE_ALPHA_OPAQUE_BIT_KHR = 0x00000001,
    VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR = 0x00000002,
    VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_BIT_KHR = 0x00000004,
    VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_PREMULTIPLIED_BIT_KHR = 0x00000008,
} VkDisplayPlaneAlphaFlagBitsKHR;

* 
[VK_DISPLAY_PLANE_ALPHA_OPAQUE_BIT_KHR](#) specifies that the source
image will be treated as opaque.

* 
[VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR](#) specifies that a global
alpha value **must** be specified that will be applied to all pixels in the
source image.

* 
[VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_BIT_KHR](#) specifies that the alpha
value will be determined by the alpha component of the source image’s
pixels.
If the source format contains no alpha values, no blending will be
applied.
The source alpha values are not premultiplied into the source image’s
other color components.

* 
[VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_PREMULTIPLIED_BIT_KHR](#) is
equivalent to [VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_BIT_KHR](#), except the
source alpha values are assumed to be premultiplied into the source
image’s other color components.

[VK_KHR_display](VK_KHR_display.html), [VkDisplayPlaneAlphaFlagsKHR](VkDisplayPlaneAlphaFlagsKHR.html), [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPlaneAlphaFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
