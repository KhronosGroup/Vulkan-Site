# vkGetPhysicalDeviceDescriptorSizeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceDescriptorSizeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceDescriptorSizeEXT - Report specific descriptor sizes for each descriptor type

To query the size of heap descriptor for a specific [VkDescriptorType](VkDescriptorType.html),
call:

// Provided by VK_EXT_descriptor_heap
VkDeviceSize vkGetPhysicalDeviceDescriptorSizeEXT(
    VkPhysicalDevice                            physicalDevice,
    VkDescriptorType                            descriptorType);

* 
`physicalDevice` is the physical device from which to query the
descriptor sizes.

* 
`descriptorType` is a [VkDescriptorType](VkDescriptorType.html) specifying the type of
heap descriptor to query the size for.

The return value of this function will be a `VkDeviceSize` indicating
the size in bytes (N) of a heap descriptor with a type equal to
`descriptorType`.
When a descriptor of this type is written by
[vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html) or [vkWriteSamplerDescriptorsEXT](vkWriteSamplerDescriptorsEXT.html),
only the first N bytes are written; the rest will not be accessed and
**can** be safely discarded when copying descriptors around.
Additionally, those first N bytes are the only bytes that will be
accessed when the descriptor is accessed in the shader.
N will never be larger than the applicable limits in
[VkPhysicalDeviceDescriptorHeapTensorPropertiesARM](VkPhysicalDeviceDescriptorHeapTensorPropertiesARM.html) or
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](VkPhysicalDeviceDescriptorHeapPropertiesEXT.html).

|  | Values returned by this function have other requirements, so for example may
| --- | --- |
not be power-of-two values. |

|  | This command is not intended for general use, and is for tools that already
| --- | --- |
take advantage of tighter packing with other similar features
(e.g. `[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html)`)
to optimize accesses in some cases.
Applications can safely ignore this function and are advised to do so, to
avoid depending on non-portable packing. |

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceDescriptorSizeEXT-type-11362) VUID-vkGetPhysicalDeviceDescriptorSizeEXT-type-11362

`type` **must** be one of [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html),
or [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDescriptorSizeEXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDescriptorSizeEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceDescriptorSizeEXT-descriptorType-parameter) VUID-vkGetPhysicalDeviceDescriptorSizeEXT-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](VkDescriptorType.html) value

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorType](VkDescriptorType.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#vkGetPhysicalDeviceDescriptorSizeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
