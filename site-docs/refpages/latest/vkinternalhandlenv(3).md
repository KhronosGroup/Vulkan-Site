# VkInternalHandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInternalHandleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInternalHandleNV - Opaque internal driver handle type

`VkInternalHandleNV` represents an opaque internal driver handle for
a Vulkan object, as returned by [vkGetPhysicalDeviceInternalHandleNV](vkGetPhysicalDeviceInternalHandleNV.html),
[vkGetDeviceInternalHandleNV](vkGetDeviceInternalHandleNV.html), [vkGetQueueInternalHandleNV](vkGetQueueInternalHandleNV.html), or
[vkGetCommandBufferInternalHandleNV](vkGetCommandBufferInternalHandleNV.html):

// Provided by VK_NV_internal_handle
typedef struct VkInternalObjectNV* VkInternalHandleNV;

`VkInternalHandleNV` is defined as a pointer to an incomplete
`VkInternalObjectNV` structure.
The contents and layout of the memory referenced by these handles are
implementation-defined.
Applications **must** not interpret or dereference these handles.
This extension defines no Vulkan interface that consumes them.
An application **must** only pass them to external APIs that accept them.
The operations performed by those external APIs are outside the scope of
this Specification.

The internal handle returned for a valid object is never `NULL`.

Each returned internal handle remains valid for the lifetime of its
corresponding Vulkan object:

* 
Internal handles for a `VkPhysicalDevice` remain valid until the
`VkInstance` used to enumerate that physical device is destroyed.

* 
Internal handles for a `VkDevice` remain valid until that device is
destroyed.

* 
Internal handles for a `VkQueue` remain valid until the
`VkDevice` that owns the queue is destroyed.

* 
Internal handles for a `VkCommandBuffer` remain valid until that
command buffer is freed.
This includes freeing the command buffer explicitly with
[vkFreeCommandBuffers](vkFreeCommandBuffers.html) and freeing it implicitly when its command
pool is destroyed.

All synchronization requirements that apply to the original Vulkan handles
also apply when accessing objects through the corresponding internal
handles.
Specifically, the application **must** externally synchronize access to an
object between the Vulkan API and any external API using its internal
handle.

[VK_NV_internal_handle](VK_NV_internal_handle.html), [vkGetCommandBufferInternalHandleNV](vkGetCommandBufferInternalHandleNV.html), [vkGetDeviceInternalHandleNV](vkGetDeviceInternalHandleNV.html), [vkGetPhysicalDeviceInternalHandleNV](vkGetPhysicalDeviceInternalHandleNV.html), [vkGetQueueInternalHandleNV](vkGetQueueInternalHandleNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html#VkInternalHandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
