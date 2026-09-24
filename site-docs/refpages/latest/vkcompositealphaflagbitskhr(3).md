# VkCompositeAlphaFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCompositeAlphaFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCompositeAlphaFlagBitsKHR - Alpha compositing modes supported on a device

The `supportedCompositeAlpha` member is of type
[VkCompositeAlphaFlagBitsKHR](#), containing the following values:

// Provided by VK_KHR_surface
typedef enum VkCompositeAlphaFlagBitsKHR {
    VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR = 0x00000001,
    VK_COMPOSITE_ALPHA_PRE_MULTIPLIED_BIT_KHR = 0x00000002,
    VK_COMPOSITE_ALPHA_POST_MULTIPLIED_BIT_KHR = 0x00000004,
    VK_COMPOSITE_ALPHA_INHERIT_BIT_KHR = 0x00000008,
} VkCompositeAlphaFlagBitsKHR;

These values are described as follows:

* 
[VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR](#): The alpha component, if it
exists, of the images is ignored in the compositing process.
Instead, the image is treated as if it has a constant alpha of 1.0.

* 
[VK_COMPOSITE_ALPHA_PRE_MULTIPLIED_BIT_KHR](#): The alpha component, if
it exists, of the images is respected in the compositing process.
The non-alpha components of the image are expected to already be
multiplied by the alpha component by the application.

* 
[VK_COMPOSITE_ALPHA_POST_MULTIPLIED_BIT_KHR](#): The alpha component,
if it exists, of the images is respected in the compositing process.
The non-alpha components of the image are not expected to already be
multiplied by the alpha component by the application; instead, the
compositor will multiply the non-alpha components of the image by the
alpha component during compositing.

* 
[VK_COMPOSITE_ALPHA_INHERIT_BIT_KHR](#): The way in which the
presentation engine treats the alpha component in the images is unknown
to the Vulkan API.
Instead, the application is responsible for setting the composite alpha
blending mode using native window system commands.
If the application does not set the blending mode using native window
system commands, then a platform-specific default will be used.

[VK_KHR_surface](VK_KHR_surface.html), [VkCompositeAlphaFlagsKHR](VkCompositeAlphaFlagsKHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkCompositeAlphaFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
