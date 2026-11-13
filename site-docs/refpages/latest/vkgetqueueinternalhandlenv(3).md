# vkGetQueueInternalHandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetQueueInternalHandleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetQueueInternalHandleNV - Get an internal handle for a queue

To obtain an internal handle for a queue, call:

// Provided by VK_NV_internal_handle
void vkGetQueueInternalHandleNV(
    VkQueue                                     queue,
    VkInternalHandleNV*                         pHandle);

* 
`queue` is the queue to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetQueueInternalHandleNV-queue-parameter) VUID-vkGetQueueInternalHandleNV-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkGetQueueInternalHandleNV-pHandle-parameter) VUID-vkGetQueueInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

[VK_NV_internal_handle](VK_NV_internal_handle.html), `VkInternalHandleNV`, [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html#vkGetQueueInternalHandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
