# VkPeerMemoryFeatureFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPeerMemoryFeatureFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPeerMemoryFeatureFlags - Bitmask of VkPeerMemoryFeatureFlagBits

// Provided by VK_VERSION_1_1
typedef VkFlags VkPeerMemoryFeatureFlags;

// Provided by VK_KHR_device_group
// Equivalent to VkPeerMemoryFeatureFlags
typedef VkPeerMemoryFeatureFlags VkPeerMemoryFeatureFlagsKHR;

`VkPeerMemoryFeatureFlags` is a bitmask type for setting a mask of zero
or more [VkPeerMemoryFeatureFlagBits](VkPeerMemoryFeatureFlagBits.html).

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkFlags`, [VkPeerMemoryFeatureFlagBits](VkPeerMemoryFeatureFlagBits.html), [vkGetDeviceGroupPeerMemoryFeatures](vkGetDeviceGroupPeerMemoryFeatures.html), [vkGetDeviceGroupPeerMemoryFeatures](vkGetDeviceGroupPeerMemoryFeatures.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkPeerMemoryFeatureFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
