# VkDescriptorPoolCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorPoolCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorPoolCreateFlagBits - Bitmask specifying certain supported operations on a descriptor pool

Bits which **can** be set in [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`flags`,
enabling operations on a descriptor pool, are:

// Provided by VK_VERSION_1_0
typedef enum VkDescriptorPoolCreateFlagBits {
    VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT = 0x00000001,
  // Provided by VK_VERSION_1_2
    VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT = 0x00000002,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT = 0x00000004,
  // Provided by VK_NV_descriptor_pool_overallocation
    VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV = 0x00000008,
  // Provided by VK_NV_descriptor_pool_overallocation
    VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV = 0x00000010,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT_EXT = VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_VALVE = VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT,
} VkDescriptorPoolCreateFlagBits;

* 
[VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT](#) specifies that
descriptor sets **can** return their individual allocations to the pool,
i.e. all of [vkAllocateDescriptorSets](vkAllocateDescriptorSets.html), [vkFreeDescriptorSets](vkFreeDescriptorSets.html),
and [vkResetDescriptorPool](vkResetDescriptorPool.html) are allowed.
Otherwise, descriptor sets allocated from the pool **must** not be
individually freed back to the pool, i.e. only
[vkAllocateDescriptorSets](vkAllocateDescriptorSets.html) and [vkResetDescriptorPool](vkResetDescriptorPool.html) are
allowed.

* 
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#) specifies that
descriptor sets allocated from this pool **can** include bindings with the
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) bit set.
It is valid to allocate descriptor sets that have bindings that do not
set the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) bit from a
pool that has [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#) set.

* 
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#) specifies that this
descriptor pool and the descriptor sets allocated from it reside
entirely in host memory and cannot be bound.
Similar to descriptor sets allocated without this flag, applications
**can** copy-from and copy-to descriptors sets allocated from this
descriptor pool.
Descriptor sets allocated from this pool are partially exempt from the
external synchronization requirement in
[vkUpdateDescriptorSetWithTemplateKHR](vkUpdateDescriptorSetWithTemplate.html) and
[vkUpdateDescriptorSets](vkUpdateDescriptorSets.html).
Descriptor sets and their descriptors can be updated concurrently in
different threads, though the same descriptor **must** not be updated
concurrently by two threads.

* 
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](#)
specifies that the implementation should allow the application to
allocate more than [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`maxSets`
descriptor set objects from the descriptor pool as available resources
allow.
The implementation **may** use the `maxSets` value to allocate the
initial available sets, but using zero is permitted.

* 
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](#)
specifies that the implementation should allow the application to
allocate more descriptors from the pool than was specified by the
[VkDescriptorPoolSize](VkDescriptorPoolSize.html)::`descriptorCount` for any descriptor
type as specified by
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`poolSizeCount` and
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`pPoolSizes`, as available
resources allow.
The implementation **may** use the `descriptorCount` for each
descriptor type to allocate the initial pool, but the application is
allowed to set the `poolSizeCount` to zero, or any of the
`descriptorCount` values in the `pPoolSizes` array to zero.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorPoolCreateFlags](VkDescriptorPoolCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorPoolCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
