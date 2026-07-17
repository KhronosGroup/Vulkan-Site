# VkExternalFenceFeatureFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalFenceFeatureFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalFenceFeatureFlagBits - Bitfield describing features of an external fence handle type

Bits which **may** be set in
[VkExternalFenceProperties](VkExternalFenceProperties.html)::`externalFenceFeatures`, indicating
features of a fence external handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalFenceFeatureFlagBits {
    VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT = 0x00000001,
    VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT = 0x00000002,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT_KHR = VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT_KHR = VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT,
} VkExternalFenceFeatureFlagBits;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceFeatureFlagBits
typedef VkExternalFenceFeatureFlagBits VkExternalFenceFeatureFlagBitsKHR;

* 
[VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT](#) specifies handles of this
type **can** be exported from Vulkan fence objects.

* 
[VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT](#) specifies handles of this
type **can** be imported to Vulkan fence objects.

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalFenceFeatureFlags](VkExternalFenceFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalFenceFeatureFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
