# VkResolveModeFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResolveModeFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResolveModeFlags - Bitmask of VkResolveModeFlagBits

// Provided by VK_VERSION_1_2
typedef VkFlags VkResolveModeFlags;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkResolveModeFlags
typedef VkResolveModeFlags VkResolveModeFlagsKHR;

`VkResolveModeFlags` is a bitmask type for setting a mask of zero or
more [VkResolveModeFlagBits](VkResolveModeFlagBits.html).

[VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkFlags`, [VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html), [VkPhysicalDeviceVulkan12Properties](VkPhysicalDeviceVulkan12Properties.html), [VkResolveModeFlagBits](VkResolveModeFlagBits.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkResolveModeFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
