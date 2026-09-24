# VK_LUID_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_LUID_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_LUID_SIZE - Length of a locally unique device identifier

[VK_LUID_SIZE](#) is the length in `uint8_t` values of an array
containing a locally unique device identifier, as returned in
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html)::`deviceLUID`.

#define VK_LUID_SIZE                      8U

#define VK_LUID_SIZE_KHR                  VK_LUID_SIZE

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html), [VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VK_LUID_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
