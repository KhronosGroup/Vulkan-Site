# VkMemoryAllocateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryAllocateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryAllocateFlagBits - Bitmask specifying flags for a device memory allocation

Bits which **can** be set in [VkMemoryAllocateFlagsInfo](VkMemoryAllocateFlagsInfo.html)::`flags`,
controlling device memory allocation, are:

// Provided by VK_VERSION_1_1
typedef enum VkMemoryAllocateFlagBits {
    VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT = 0x00000001,
  // Provided by VK_VERSION_1_2
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT = 0x00000002,
  // Provided by VK_VERSION_1_2
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT = 0x00000004,
  // Provided by VK_EXT_zero_initialize_device_memory
    VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT = 0x00000008,
  // Provided by VK_KHR_device_group
    VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT_KHR = VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT_KHR = VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR = VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT,
} VkMemoryAllocateFlagBits;

// Provided by VK_KHR_device_group
// Equivalent to VkMemoryAllocateFlagBits
typedef VkMemoryAllocateFlagBits VkMemoryAllocateFlagBitsKHR;

* 
[VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](#) specifies that memory will be
allocated for the devices in
[VkMemoryAllocateFlagsInfo](VkMemoryAllocateFlagsInfo.html)::`deviceMask`.

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](#) specifies that the memory
**can** be attached to a buffer object created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) usage flag set.

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#) specifies
that the memory’s address **can** be saved and reused on a subsequent run
(e.g. for trace capture and replay), see
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html) for more detail.
If this bit is set, [VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](#) **must**
also be set.

* 
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](#) specifies that the
memory will be zeroed automatically by the implementation before
application is able to access it.

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkMemoryAllocateFlags](VkMemoryAllocateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryAllocateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
