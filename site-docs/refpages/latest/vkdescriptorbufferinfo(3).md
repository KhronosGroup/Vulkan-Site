# VkDescriptorBufferInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorBufferInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorBufferInfo - Structure specifying descriptor buffer information

The `VkDescriptorBufferInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorBufferInfo {
    VkBuffer        buffer;
    VkDeviceSize    offset;
    VkDeviceSize    range;
} VkDescriptorBufferInfo;

* 
`buffer` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) or
the buffer resource.

* 
`offset` is the offset in bytes from the start of `buffer`.
Access to buffer memory via this descriptor uses addressing that is
relative to this starting offset.

* 
`range` is the size in bytes that is used for this descriptor
update, or [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to use the range from `offset` to the
end of the buffer.

|  | When setting `range` to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), the
| --- | --- |
[effective range](../../../../spec/latest/chapters/descriptorsets.html#buffer-info-effective-range) **must** not be larger than
the maximum range for the descriptor type ([`maxUniformBufferRange`](../../../../spec/latest/chapters/limits.html#limits-maxUniformBufferRange) or [`maxStorageBufferRange`](../../../../spec/latest/chapters/limits.html#limits-maxStorageBufferRange)).
This means that [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) is not typically useful in the common
case where uniform buffer descriptors are suballocated from a buffer that is
much larger than `maxUniformBufferRange`. |

For [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) descriptor types,
`offset` is the base offset from which the dynamic offset is applied and
`range` is the static size used for all dynamic offsets.

When `range` is [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) the effective range is calculated at
[vkUpdateDescriptorSets](vkUpdateDescriptorSets.html) is by taking the size of `buffer` minus the
`offset`.

Valid Usage

* 
[](#VUID-VkDescriptorBufferInfo-offset-00340) VUID-VkDescriptorBufferInfo-offset-00340

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkDescriptorBufferInfo-range-00341) VUID-VkDescriptorBufferInfo-range-00341

If `range` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `range` **must** be
greater than `0`

* 
[](#VUID-VkDescriptorBufferInfo-range-00342) VUID-VkDescriptorBufferInfo-range-00342

If `range` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `range` **must** be
less than or equal to the size of `buffer` minus `offset`

* 
[](#VUID-VkDescriptorBufferInfo-buffer-02998) VUID-VkDescriptorBufferInfo-buffer-02998

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `buffer` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorBufferInfo-buffer-02999) VUID-VkDescriptorBufferInfo-buffer-02999

If `buffer` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `offset` **must** be zero and
`range` **must** be [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferInfo-buffer-parameter) VUID-VkDescriptorBufferInfo-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkWriteDescriptorSet](VkWriteDescriptorSet.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorBufferInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
