# VkDescriptorMappingSourceHeapDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceHeapDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceHeapDataEXT - Structure specifying mapping a uniform buffer to heap data

The `VkDescriptorMappingSourceHeapDataEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceHeapDataEXT {
    uint32_t    heapOffset;
    uint32_t    pushOffset;
} VkDescriptorMappingSourceHeapDataEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped buffer.

* 
`pushOffset` is an index into push data where an additional offset
into the heap for the mapped resource will be retrieved.

Uniform buffers using this mapping will be backed directly by data in the
heap.
Accessing data in the uniform buffer at an offset of shaderOffset in
the shader will access heap data at an offset equal to

offset = shaderOffset +  heapOffset + 
((uint32_t*)pPushData)[pushOffset/4]

where pPushData is the total set of push data specified by
[vkCmdPushDataEXT](vkCmdPushDataEXT.html).
Shader reads through the heap mapped in this way are performed according to
the mapped resource.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceHeapDataEXT-heapOffset-11263) VUID-VkDescriptorMappingSourceHeapDataEXT-heapOffset-11263

`heapOffset` **must** be a multiple of
[    `minUniformBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11264) VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11264

`pushOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11265) VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11265

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 4

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceHeapDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
