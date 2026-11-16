# NV Internal Handles

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html

## Table of Contents


## Content

This extension provides a mechanism for applications to obtain opaque
internal driver handles for certain Vulkan objects.

Layers **may** intercept the commands defined by this extension.
An interceptor **must** not return a wrapped handle to the application.
The returned `VkInternalHandleNV` value refers directly to the
implementation’s internal object representation.

No special flags or creation requirements are needed to obtain internal
handles.
Any object of a supported type **can** be queried.
Obtaining an internal handle does not affect the object’s state or usability
through the Vulkan API.

An object’s internal handle **can** be obtained multiple times.
Each call returns the same handle.

If an object’s state changes after its internal handle is obtained, the
handle continues to refer to the same underlying driver object, subject to
the same synchronization requirements.

`VkInternalHandleNV` represents an opaque internal driver handle for
a Vulkan object, as returned by [vkGetPhysicalDeviceInternalHandleNV](#vkGetPhysicalDeviceInternalHandleNV),
[vkGetDeviceInternalHandleNV](#vkGetDeviceInternalHandleNV), [vkGetQueueInternalHandleNV](#vkGetQueueInternalHandleNV), or
[vkGetCommandBufferInternalHandleNV](#vkGetCommandBufferInternalHandleNV):

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
[vkFreeCommandBuffers](../cmdbuffers.html#vkFreeCommandBuffers) and freeing it implicitly when its command
pool is destroyed.

All synchronization requirements that apply to the original Vulkan handles
also apply when accessing objects through the corresponding internal
handles.
Specifically, the application **must** externally synchronize access to an
object between the Vulkan API and any external API using its internal
handle.

To obtain an internal handle for a physical device, call:

// Provided by VK_NV_internal_handle
void vkGetPhysicalDeviceInternalHandleNV(
    VkPhysicalDevice                            physicalDevice,
    VkInternalHandleNV*                         pHandle);

* 
`physicalDevice` is the physical device to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceInternalHandleNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceInternalHandleNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceInternalHandleNV-pHandle-parameter) VUID-vkGetPhysicalDeviceInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

To obtain an internal handle for a logical device, call:

// Provided by VK_NV_internal_handle
void vkGetDeviceInternalHandleNV(
    VkDevice                                    device,
    VkInternalHandleNV*                         pHandle);

* 
`device` is the logical device to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceInternalHandleNV-device-parameter) VUID-vkGetDeviceInternalHandleNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceInternalHandleNV-pHandle-parameter) VUID-vkGetDeviceInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

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

 `queue` **must** be a valid [VkQueue](../devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkGetQueueInternalHandleNV-pHandle-parameter) VUID-vkGetQueueInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value

To obtain an internal handle for a command buffer, call:

// Provided by VK_NV_internal_handle
void vkGetCommandBufferInternalHandleNV(
    VkCommandBuffer                             commandBuffer,
    VkInternalHandleNV*                         pHandle);

* 
`commandBuffer` is the command buffer to query.

* 
`pHandle` is a pointer to a `VkInternalHandleNV` value in
which the internal handle is returned.

Both primary and secondary command buffers **can** be queried.
A command buffer **can** be queried in any state, including:

* 
The [initial state](../cmdbuffers.html#commandbuffers-lifecycle) (after allocation or
reset)

* 
The [recording state](../cmdbuffers.html#commandbuffers-lifecycle) (between
[vkBeginCommandBuffer](../cmdbuffers.html#vkBeginCommandBuffer) and [vkEndCommandBuffer](../cmdbuffers.html#vkEndCommandBuffer))

* 
The [executable state](../cmdbuffers.html#commandbuffers-lifecycle) (after recording has
completed)

* 
The [pending state](../cmdbuffers.html#commandbuffers-lifecycle) (after submission)

Valid Usage (Implicit)

* 
[](#VUID-vkGetCommandBufferInternalHandleNV-commandBuffer-parameter) VUID-vkGetCommandBufferInternalHandleNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkGetCommandBufferInternalHandleNV-pHandle-parameter) VUID-vkGetCommandBufferInternalHandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `VkInternalHandleNV` value
