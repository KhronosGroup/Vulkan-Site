# VkDescriptorMappingSourceEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceEXT - Specifies the mapping source for a shader binding

The possible mapping sources for a shader binding are:

// Provided by VK_EXT_descriptor_heap
typedef enum VkDescriptorMappingSourceEXT {
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT = 0,
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT = 1,
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT = 2,
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT = 3,
    VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT = 4,
    VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT = 5,
    VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT = 6,
    VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT = 7,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT = 8,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT = 9,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT = 10,
} VkDescriptorMappingSourceEXT;

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#)
specifies that the resource will be backed by a descriptor from the heap
at a constant index.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#) specifies
that the resource will be backed by a descriptor from the heap at an
index sourced from push data, added to a constant index.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#)
specifies that the resource will be backed by a descriptor from the heap
at an index sourced from an address in push data, added to a constant
index.
If the mapping is an array, the array will be mapped to a base offset in
indirect memory, and subsequent elements are mapped as offsets to that
base.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#)
specifies that the resource will be backed by a descriptor from the heap
at an index sourced from an address in push data, added to a constant
index.
If the mapping is an array, each array element will be mapped to a
separate index in indirect memory.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](#) specifies that
the resource will be backed by heap data directly.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](#) specifies that the
resource will be backed by push data directly.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](#) specifies that the
resource will be backed by an address in push data.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](#) specifies that
the resource will be backed by an address sourced via another address in
push data.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#)
specifies that the resource will be backed by a descriptor from the heap
at an index sourced from shader record data, added to a constant index.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](#) specifies that
the resource will be backed by shader record data directly.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#) specifies
that the resource will be backed by an address in shader record data.

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
