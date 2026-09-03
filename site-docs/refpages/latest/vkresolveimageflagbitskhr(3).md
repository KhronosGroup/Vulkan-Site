# VkResolveImageFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResolveImageFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResolveImageFlagBitsKHR - Bitmask specifying additional properties of a resolve image operation

Bits which **can** be set in [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`flags`,
describing additional properties of a resolve operation, are:

// Provided by VK_KHR_maintenance10
typedef enum VkResolveImageFlagBitsKHR {
  // Provided by VK_KHR_maintenance10 with VK_VERSION_1_3 or VK_KHR_copy_commands2
    VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR = 0x00000001,
  // Provided by VK_KHR_maintenance10 with VK_VERSION_1_3 or VK_KHR_copy_commands2
    VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR = 0x00000002,
} VkResolveImageFlagBitsKHR;

* 
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#) specifies that
resolve operations happening to an sRGB encoded image **must** not convert
samples from nonlinear to linear before averaging.

* 
[VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#) specifies that
resolve operations happening to an sRGB encoded image **must** convert
samples from nonlinear to linear before averaging.

[VK_KHR_maintenance10](VK_KHR_maintenance10.html), [VkResolveImageFlagsKHR](VkResolveImageFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkResolveImageFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
