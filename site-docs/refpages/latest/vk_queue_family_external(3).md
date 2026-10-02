# VK_QUEUE_FAMILY_EXTERNAL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QUEUE_FAMILY_EXTERNAL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QUEUE_FAMILY_EXTERNAL - External queue family index sentinel

The special queue family index [VK_QUEUE_FAMILY_EXTERNAL](#) represents any
queue external to the resource’s current Vulkan instance, as long as the
queue uses the same underlying
device group or
physical device, and the same driver version as the resource’s
[VkDevice](VkDevice.html), as indicated by
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html)::`deviceUUID` and
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html)::`driverUUID`.

#define VK_QUEUE_FAMILY_EXTERNAL          (~1U)

#define VK_QUEUE_FAMILY_EXTERNAL_KHR      VK_QUEUE_FAMILY_EXTERNAL

[VK_KHR_external_memory](VK_KHR_external_memory.html), [VK_VERSION_1_1](VK_VERSION_1_1.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VK_QUEUE_FAMILY_EXTERNAL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
