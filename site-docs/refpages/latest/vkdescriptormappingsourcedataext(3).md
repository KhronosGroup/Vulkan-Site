# VkDescriptorMappingSourceDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceDataEXT - Union descriptor mapping source information

The `VkDescriptorMappingSourceDataEXT` union is defined as:

// Provided by VK_EXT_descriptor_heap
typedef union VkDescriptorMappingSourceDataEXT {
    VkDescriptorMappingSourceConstantOffsetEXT        constantOffset;
    VkDescriptorMappingSourcePushIndexEXT             pushIndex;
    VkDescriptorMappingSourceIndirectIndexEXT         indirectIndex;
    VkDescriptorMappingSourceIndirectIndexArrayEXT    indirectIndexArray;
    VkDescriptorMappingSourceHeapDataEXT              heapData;
    uint32_t                                          pushDataOffset;
    uint32_t                                          pushAddressOffset;
    VkDescriptorMappingSourceIndirectAddressEXT       indirectAddress;
    VkDescriptorMappingSourceShaderRecordIndexEXT     shaderRecordIndex;
    uint32_t                                          shaderRecordDataOffset;
    uint32_t                                          shaderRecordAddressOffset;
} VkDescriptorMappingSourceDataEXT;

* 
`constantOffset` is a
[VkDescriptorMappingSourceConstantOffsetEXT](VkDescriptorMappingSourceConstantOffsetEXT.html) structure specifying
the mapping for resources at a constant byte offset into a heap.

* 
`pushIndex` is a [VkDescriptorMappingSourcePushIndexEXT](VkDescriptorMappingSourcePushIndexEXT.html)
structure specifying the mapping for resources at an index into a heap
source from push data.

* 
`indirectIndex` is a [VkDescriptorMappingSourceIndirectIndexEXT](VkDescriptorMappingSourceIndirectIndexEXT.html)
structure specifying the mapping for resources at an index into a heap
source from an address in push data.

* 
`indirectIndexArray` is a
[VkDescriptorMappingSourceIndirectIndexArrayEXT](VkDescriptorMappingSourceIndirectIndexArrayEXT.html) structure
specifying the mapping for resources to an array of indices into a heap
source from an address in push data.

* 
`heapData` is a [VkDescriptorMappingSourceHeapDataEXT](VkDescriptorMappingSourceHeapDataEXT.html) structure
specifying an offset into heap data for a uniform buffer to map to.

* 
`pushDataOffset` an offset into push data for a uniform buffer to
map to.

* 
`pushAddressOffset` an offset into push data storing an address for
a resource to map to.

* 
`indirectAddress` is a
[VkDescriptorMappingSourceIndirectAddressEXT](VkDescriptorMappingSourceIndirectAddressEXT.html) structure specifying
an address in push data containing another address for a resource to map
to.

* 
`shaderRecordIndex` is a
[VkDescriptorMappingSourceShaderRecordIndexEXT](VkDescriptorMappingSourceShaderRecordIndexEXT.html) structure specifying
the mapping for resources at an index into a heap source from shader
record data.

* 
`shaderRecordDataOffset` an offset into shader record data for a
uniform buffer to map to.

* 
`shaderRecordAddressOffset` an offset into shader record data
storing an address for a resource to map to.

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorMappingSourceConstantOffsetEXT](VkDescriptorMappingSourceConstantOffsetEXT.html), [VkDescriptorMappingSourceHeapDataEXT](VkDescriptorMappingSourceHeapDataEXT.html), [VkDescriptorMappingSourceIndirectAddressEXT](VkDescriptorMappingSourceIndirectAddressEXT.html), [VkDescriptorMappingSourceIndirectIndexArrayEXT](VkDescriptorMappingSourceIndirectIndexArrayEXT.html), [VkDescriptorMappingSourceIndirectIndexEXT](VkDescriptorMappingSourceIndirectIndexEXT.html), [VkDescriptorMappingSourcePushIndexEXT](VkDescriptorMappingSourcePushIndexEXT.html), [VkDescriptorMappingSourceShaderRecordIndexEXT](VkDescriptorMappingSourceShaderRecordIndexEXT.html), [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
