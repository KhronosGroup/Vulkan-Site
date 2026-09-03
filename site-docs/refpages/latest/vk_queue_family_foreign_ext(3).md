# VK_QUEUE_FAMILY_FOREIGN_EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QUEUE_FAMILY_FOREIGN_EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QUEUE_FAMILY_FOREIGN_EXT - Foreign queue family index sentinel

The special queue family index [VK_QUEUE_FAMILY_FOREIGN_EXT](#) represents
any queue external to the resource’s current Vulkan instance, regardless of
the queue’s underlying physical device or driver version.
This includes, for example, queues for fixed-function image processing
devices, media codec devices, and display devices, as well as all queues
that use the same underlying
device group or
physical device, and the same driver version as the resource’s
[VkDevice](VkDevice.html).

#define VK_QUEUE_FAMILY_FOREIGN_EXT       (~2U)

[VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VK_QUEUE_FAMILY_FOREIGN_EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
