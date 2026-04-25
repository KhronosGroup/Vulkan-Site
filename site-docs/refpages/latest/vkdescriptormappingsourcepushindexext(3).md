# VkDescriptorMappingSourcePushIndexEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourcePushIndexEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourcePushIndexEXT - Structure specifying mapping resources to a heap index in push data

The `VkDescriptorMappingSourcePushIndexEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourcePushIndexEXT {
    uint32_t                      heapOffset;
    uint32_t                      pushOffset;
    uint32_t                      heapIndexStride;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerPushOffset;
    uint32_t                      samplerHeapIndexStride;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourcePushIndexEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`pushOffset` is an index into push data where an index into the heap
for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in push data.

* 
`heapArrayStride` is a constant byte stride that multiplies the
shader binding and array index.

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
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

pushIndex = ((uint32_t*)pPushData)[pushOffset/4]

shaderIndex = (Binding - firstBinding) +  arrayIndex

offset = heapOffset +  (pushIndex ×
heapIndexStride) +  (shaderIndex × heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pPushData is the total set of push data specified by
[vkCmdPushDataEXT](vkCmdPushDataEXT.html).

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

samplerPushIndex =
((uint32_t*)pPushData)[samplerPushOffset/4]

offset = samplerHeapOffset +  (samplerPushIndex ×
samplerHeapIndexStride) +  (shaderIndex ×
samplerHeapArrayStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](VK_TRUE.html), and the mapped
resource is a `OpTypeSampledImage`, pushIndex and
samplerPushIndex in the above equations are instead calculated as

pushIndex = ((uint32_t*)pPushData)[pushOffset/4] & 0xFFFFF

samplerPushIndex = (((uint32_t*)pPushData)[pushOffset/4] >>
20) & 0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11258) VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11258

`pushOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11259) VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11259

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 4

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11446) VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11446

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11402) VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11402

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), and there is a
[VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkBool32`, [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourcePushIndexEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
