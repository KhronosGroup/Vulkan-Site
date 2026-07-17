# VkSurfaceTransformFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceTransformFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceTransformFlagBitsKHR - Presentation transforms supported on a device

Bits which **may** be set in
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`supportedTransforms` indicating the
presentation transforms supported for the surface on the specified device,
and possible values of
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`currentTransform` indicating the
surface’s current transform relative to the presentation engine’s natural
orientation, are:

// Provided by VK_KHR_surface
typedef enum VkSurfaceTransformFlagBitsKHR {
    VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR = 0x00000001,
    VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR = 0x00000002,
    VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR = 0x00000004,
    VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR = 0x00000008,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_BIT_KHR = 0x00000010,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_90_BIT_KHR = 0x00000020,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_180_BIT_KHR = 0x00000040,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_270_BIT_KHR = 0x00000080,
    VK_SURFACE_TRANSFORM_INHERIT_BIT_KHR = 0x00000100,
} VkSurfaceTransformFlagBitsKHR;

* 
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](#) specifies that image content
is presented without being transformed.

* 
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](#) specifies that image
content is rotated 90 degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](#) specifies that image
content is rotated 180 degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](#) specifies that image
content is rotated 270 degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_BIT_KHR](#) specifies that
image content is mirrored horizontally.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_90_BIT_KHR](#) specifies
that image content is mirrored horizontally, then rotated 90 degrees
clockwise.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_180_BIT_KHR](#)
specifies that image content is mirrored horizontally, then rotated 180
degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_270_BIT_KHR](#)
specifies that image content is mirrored horizontally, then rotated 270
degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_INHERIT_BIT_KHR](#) specifies that the
presentation transform is not specified, and is instead determined by
platform-specific considerations and mechanisms outside Vulkan.

[VK_KHR_surface](VK_KHR_surface.html), [VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html), [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html), [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html), [VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html), [VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html), [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html), [VkSurfaceTransformFlagsKHR](VkSurfaceTransformFlagsKHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
