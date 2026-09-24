# VkQueueFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFlagBits - Bitmask specifying capabilities of queues in a queue family

Bits which **may** be set in [VkQueueFamilyProperties](VkQueueFamilyProperties.html)::`queueFlags`,
indicating capabilities of queues in a queue family are:

// Provided by VK_VERSION_1_0
typedef enum VkQueueFlagBits {
    VK_QUEUE_GRAPHICS_BIT = 0x00000001,
    VK_QUEUE_COMPUTE_BIT = 0x00000002,
    VK_QUEUE_TRANSFER_BIT = 0x00000004,
    VK_QUEUE_SPARSE_BINDING_BIT = 0x00000008,
  // Provided by VK_VERSION_1_1
    VK_QUEUE_PROTECTED_BIT = 0x00000010,
  // Provided by VK_KHR_video_decode_queue
    VK_QUEUE_VIDEO_DECODE_BIT_KHR = 0x00000020,
  // Provided by VK_KHR_video_encode_queue
    VK_QUEUE_VIDEO_ENCODE_BIT_KHR = 0x00000040,
  // Provided by VK_NV_optical_flow
    VK_QUEUE_OPTICAL_FLOW_BIT_NV = 0x00000100,
  // Provided by VK_ARM_data_graph
    VK_QUEUE_DATA_GRAPH_BIT_ARM = 0x00000400,
} VkQueueFlagBits;

* 
[VK_QUEUE_GRAPHICS_BIT](#) specifies that queues in this queue family
support graphics operations.

* 
[VK_QUEUE_COMPUTE_BIT](#) specifies that queues in this queue family
support compute operations.

* 
[VK_QUEUE_TRANSFER_BIT](#) specifies that queues in this queue family
support transfer operations.

* 
[VK_QUEUE_SPARSE_BINDING_BIT](#) specifies that queues in this queue
family support sparse memory management operations (see
[Sparse Resources](../../../../spec/latest/chapters/sparsemem.html#sparsememory)).
If any of the sparse resource features are supported, then at least one
queue family **must** support this bit.

* 
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](#) specifies that queues in this queue
family support [video decode operations](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

* 
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](#) specifies that queues in this queue
family support [video encode operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_QUEUE_OPTICAL_FLOW_BIT_NV](#) specifies that queues in this queue
family support optical flow operations.

* 
[VK_QUEUE_DATA_GRAPH_BIT_ARM](#) specifies that queues in this queue
family support [data graph operations](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-operations).

* 
[VK_QUEUE_PROTECTED_BIT](#) specifies that queues in this queue family
support the [VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](VkDeviceQueueCreateFlagBits.html) bit.
(see [Protected Memory](../../../../spec/latest/chapters/memory.html#memory-protected-memory)).
If the physical device supports the [    `protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature, at least one of its queue families
**must** support this bit.

At least one queue family of at least one physical device exposed by the
implementation **must** support at least one of the following sets of
operations:

* 
graphics operations

* 
compute operations

* 
video encode operations

* 
video decode operations

If an implementation exposes any queue family that supports graphics
operations, at least one queue family of at least one physical device
exposed by the implementation **must** support both graphics and compute
operations.

Furthermore, if the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory)
physical device feature is supported, then at least one queue family of at
least one physical device exposed by the implementation **must** support
graphics operations, compute operations, and protected memory operations.

|  | All commands that are allowed on a queue that supports transfer operations
| --- | --- |
are also allowed on a queue that supports either graphics or compute
operations.
Thus, if the capabilities of a queue family include
[VK_QUEUE_GRAPHICS_BIT](#) or [VK_QUEUE_COMPUTE_BIT](#), then reporting
the [VK_QUEUE_TRANSFER_BIT](#) capability separately for that queue family
is **optional**. |

For further details see [Queues](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-queues).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkQueueFlags](VkQueueFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
