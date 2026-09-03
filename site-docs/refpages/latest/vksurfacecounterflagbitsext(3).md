# VkSurfaceCounterFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCounterFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCounterFlagBitsEXT - Surface-relative counter types

Bits which **can** be set in
[VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html)::`supportedSurfaceCounters`, indicating
supported surface counter types, are:

// Provided by VK_EXT_display_surface_counter
typedef enum VkSurfaceCounterFlagBitsEXT {
    VK_SURFACE_COUNTER_VBLANK_BIT_EXT = 0x00000001,
  // VK_SURFACE_COUNTER_VBLANK_EXT is a legacy alias
    VK_SURFACE_COUNTER_VBLANK_EXT = VK_SURFACE_COUNTER_VBLANK_BIT_EXT,
} VkSurfaceCounterFlagBitsEXT;

* 
[VK_SURFACE_COUNTER_VBLANK_BIT_EXT](#) specifies a counter incrementing
once every time a vertical blanking period occurs on the display
associated with the surface.

[VK_EXT_display_surface_counter](VK_EXT_display_surface_counter.html), [VkSurfaceCounterFlagsEXT](VkSurfaceCounterFlagsEXT.html), [vkGetSwapchainCounterEXT](vkGetSwapchainCounterEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCounterFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
