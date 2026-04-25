# VkPeerMemoryFeatureFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPeerMemoryFeatureFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPeerMemoryFeatureFlagBits - Bitmask specifying supported peer memory features

Bits which **may** be set in
[vkGetDeviceGroupPeerMemoryFeatures](vkGetDeviceGroupPeerMemoryFeatures.html)::`pPeerMemoryFeatures`,
indicating supported peer memory features, are:

// Provided by VK_VERSION_1_1
typedef enum VkPeerMemoryFeatureFlagBits {
    VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT = 0x00000001,
    VK_PEER_MEMORY_FEATURE_COPY_DST_BIT = 0x00000002,
    VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT = 0x00000004,
    VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT = 0x00000008,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT_KHR = VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_COPY_DST_BIT_KHR = VK_PEER_MEMORY_FEATURE_COPY_DST_BIT,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT_KHR = VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT_KHR = VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT,
} VkPeerMemoryFeatureFlagBits;

// Provided by VK_KHR_device_group
// Equivalent to VkPeerMemoryFeatureFlagBits
typedef VkPeerMemoryFeatureFlagBits VkPeerMemoryFeatureFlagBitsKHR;

* 
[VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT](#) specifies that the memory **can**
be accessed as the source of any `vkCmdCopy*` command.

* 
[VK_PEER_MEMORY_FEATURE_COPY_DST_BIT](#) specifies that the memory **can**
be accessed as the destination of any `vkCmdCopy*` command.

* 
[VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT](#) specifies that the memory
**can** be read as any memory access type.

* 
[VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT](#) specifies that the memory
**can** be written as any memory access type.
Shader atomics are considered to be writes.

|  | The peer memory features of a memory heap also apply to any accesses that
| --- | --- |
**may** be performed during [image layout transitions](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions). |

[VK_PEER_MEMORY_FEATURE_COPY_DST_BIT](#) **must** be supported for all host
local heaps and for at least one device-local memory heap.

If a device does not support a peer memory feature, it is still valid to use
a resource that includes both local and peer memory bindings with the
corresponding access type as long as only the local bindings are actually
accessed.
For example, an application doing split-frame rendering would use
framebuffer attachments that include both local and peer memory bindings,
but would scissor the rendering to only update local memory.

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPeerMemoryFeatureFlags](VkPeerMemoryFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkPeerMemoryFeatureFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
