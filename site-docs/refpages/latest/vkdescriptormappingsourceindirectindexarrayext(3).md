# VkDescriptorMappingSourceIndirectIndexArrayEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceIndirectIndexArrayEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceIndirectIndexArrayEXT - Structure specifying mapping resources to a heap index array in indirect data

The `VkDescriptorMappingSourceIndirectIndexArrayEXT` structure is
defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceIndirectIndexArrayEXT {
    uint32_t                      heapOffset;
    uint32_t                      pushOffset;
    uint32_t                      addressOffset;
    uint32_t                      heapIndexStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerPushOffset;
    uint32_t                      samplerAddressOffset;
    uint32_t                      samplerHeapIndexStride;
} VkDescriptorMappingSourceIndirectIndexArrayEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`pushOffset` is an offset into push data where an the indirect
address will be.

* 
`addressOffset` is an index into the address in push data where an
index into the heap for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in indirect data.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](VkSamplerCreateInfo.html)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`useCombinedImageSamplerIndex` specifies whether the generated index
value will be decoded as two packed indices if the mapped resource is an
`OpTypeSampledImage`.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerPushOffset` is used only when mapping a combined image
sampler, used in place of `pushOffset` to retrieve the sampler.

* 
`samplerAddressOffset` is used only when mapping a combined image
sampler, used in place of `addressOffset` to retrieve the sampler.

* 
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

uint32_t *indirectAddress =
((VkDeviceAddress*)pPushData)[pushOffset/8]

shaderIndex = (Binding - firstBinding) +  arrayIndex

indirectIndex = indirectAddress[(addressOffset / 4) + 
shaderIndex]

offset = heapOffset +  (indirectIndex ×
heapIndexStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pPushData is the total set of push data specified by
[vkCmdPushDataEXT](vkCmdPushDataEXT.html).
The value of the address in push data **must** be a multiple of 4.
Index reads through indirectAddress are performed as non-volatile
uniform buffer reads, and can be synchronized using
[VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html).
The value in memory **must** remain static while any shader invocation using
this mapping is in flight to avoid a data race.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

uint32_t *samplerIndirectAddress =
((VkDeviceAddress*)pPushData)[samplerPushOffset/8]

samplerIndirectIndex = samplerAddr[(samplerAddressOffset /
4) +  shaderIndex]

offset = samplerHeapOffset +  (samplerIndirectIndex
× samplerHeapIndexStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](VK_TRUE.html), and the mapped
resource is a `OpTypeSampledImage`, indirectIndex and
samplerIndirectIndex in the above equations are instead calculated as

indirectIndex = indirectAddress[addressOffset/4 + 
shaderIndex] & 0xFFFFF

samplerIndirectIndex = indirectAddress[addressOffset/4
+  shaderIndex] >> 20) & 0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11359) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11359

`pushOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11360) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11360

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-addressOffset-11361) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-addressOffset-11361

`addressOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11448) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11448

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11404) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11404

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), and there is a
[VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkBool32`, [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceIndirectIndexArrayEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
