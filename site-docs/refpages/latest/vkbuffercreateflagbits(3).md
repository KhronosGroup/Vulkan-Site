# VkBufferCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCreateFlagBits - Bitmask specifying additional parameters of a buffer

Bits which **can** be set in [VkBufferCreateInfo](VkBufferCreateInfo.html)::`flags`, specifying
additional parameters of a buffer, are:

// Provided by VK_VERSION_1_0
typedef enum VkBufferCreateFlagBits {
    VK_BUFFER_CREATE_SPARSE_BINDING_BIT = 0x00000001,
    VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT = 0x00000002,
    VK_BUFFER_CREATE_SPARSE_ALIASED_BIT = 0x00000004,
  // Provided by VK_VERSION_1_1
    VK_BUFFER_CREATE_PROTECTED_BIT = 0x00000008,
  // Provided by VK_VERSION_1_2
    VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT = 0x00000010,
  // Provided by VK_EXT_descriptor_buffer
    VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000020,
  // Provided by VK_KHR_video_maintenance1
    VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR = 0x00000040,
  // Provided by VK_EXT_buffer_device_address
    VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT = VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR = VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT,
} VkBufferCreateFlagBits;

* 
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#) specifies that the buffer will
be backed using sparse memory binding.

* 
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#) specifies that the buffer
**can** be partially backed using sparse memory binding.
Buffers created with this flag **must** also be created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#) flag.

* 
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#) specifies that the buffer will
be backed using sparse memory binding with memory ranges that might also
simultaneously be backing another buffer (or another portion of the same
buffer).
Buffers created with this flag **must** also be created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#) flag.

* 
[VK_BUFFER_CREATE_PROTECTED_BIT](#) specifies that the buffer is a
protected buffer.

* 
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#) specifies that
the buffer’s address **can** be saved and reused on a subsequent run (e.g.
for trace capture and replay), see
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html) for more detail.

* 
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#)
specifies that the buffer **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) for more detail.

* 
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#) specifies that
the buffer **can** be used in [video coding operations](../../../../spec/latest/chapters/videocoding.html#video-coding)
without having to specify at buffer creation time the set of video
profiles the buffer will be used with.

See [Sparse Resource Features](../../../../spec/latest/chapters/sparsemem.html#sparsememory-sparseresourcefeatures) and
[Physical Device Features](../../../../spec/latest/chapters/features.html#features) for details of the sparse memory
features supported on a device.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBufferCreateFlags](VkBufferCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
