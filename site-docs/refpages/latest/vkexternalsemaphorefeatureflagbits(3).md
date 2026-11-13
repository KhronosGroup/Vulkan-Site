# VkExternalSemaphoreFeatureFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalSemaphoreFeatureFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalSemaphoreFeatureFlagBits - Bitfield describing features of an external semaphore handle type

Bits which **may** be set in
[VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html)::`externalSemaphoreFeatures`,
specifying the features of an external semaphore handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalSemaphoreFeatureFlagBits {
    VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT = 0x00000001,
    VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT = 0x00000002,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT_KHR = VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT_KHR = VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT,
} VkExternalSemaphoreFeatureFlagBits;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreFeatureFlagBits
typedef VkExternalSemaphoreFeatureFlagBits VkExternalSemaphoreFeatureFlagBitsKHR;

* 
[VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT](#) specifies that
handles of this type **can** be exported from Vulkan semaphore objects.

* 
[VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT](#) specifies that
handles of this type **can** be imported as Vulkan semaphore objects.

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalSemaphoreFeatureFlags](VkExternalSemaphoreFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalSemaphoreFeatureFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
