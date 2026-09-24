# VkDescriptorBufferBindingInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorBufferBindingInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorBufferBindingInfoEXT - Structure specifying descriptor buffer binding information

Data describing a descriptor buffer binding is passed in a
`VkDescriptorBufferBindingInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorBufferBindingInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkDeviceAddress       address;
    VkBufferUsageFlags    usage;
} VkDescriptorBufferBindingInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`address` is a `VkDeviceAddress` specifying the device
address defining the descriptor buffer to be bound.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html) specifying the
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`usage` for the buffer from which
`address` was queried.
Usage flags other than
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), and
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) are
ignored.

If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)
structure, [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)::`usage` from that
structure is used instead of `usage` from this structure.

Valid Usage

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-None-09499) VUID-VkDescriptorBufferBindingInfoEXT-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html)
values

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-None-09500) VUID-VkDescriptorBufferBindingInfoEXT-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) structure,
`usage` **must** not be 0

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-10998) VUID-VkDescriptorBufferBindingInfoEXT-usage-10998

The `usage` must include at least one of
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), or
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-bufferlessPushDescriptors-08056) VUID-VkDescriptorBufferBindingInfoEXT-bufferlessPushDescriptors-08056

If [    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](../../../../spec/latest/chapters/limits.html#limits-bufferlessPushDescriptors)
is [VK_FALSE](VK_FALSE.html), and `usage` contains
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), then
the `pNext` chain **must** include a
[VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](VkDescriptorBufferBindingPushDescriptorBufferHandleEXT.html) structure

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-address-08057) VUID-VkDescriptorBufferBindingInfoEXT-address-08057

`address` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08122) VUID-VkDescriptorBufferBindingInfoEXT-usage-08122

If `usage` includes
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), `address`
**must** be a device address allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08123) VUID-VkDescriptorBufferBindingInfoEXT-usage-08123

If `usage` includes
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), `address`
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08124) VUID-VkDescriptorBufferBindingInfoEXT-usage-08124

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`address` **must** be a device address allocated to the application
from a buffer created with the
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-sType-sType) VUID-VkDescriptorBufferBindingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-pNext-pNext) VUID-VkDescriptorBufferBindingInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) or [VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](VkDescriptorBufferBindingPushDescriptorBufferHandleEXT.html)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-sType-unique) VUID-VkDescriptorBufferBindingInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-address-parameter) VUID-VkDescriptorBufferBindingInfoEXT-address-parameter

 `address` **must** be a valid `VkDeviceAddress` value

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkBufferUsageFlags](VkBufferUsageFlags.html), `VkDeviceAddress`, [VkStructureType](VkStructureType.html), [vkCmdBindDescriptorBuffersEXT](vkCmdBindDescriptorBuffersEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkDescriptorBufferBindingInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
