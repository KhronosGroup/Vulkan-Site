# VkDescriptorMappingSourceShaderRecordIndexEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceShaderRecordIndexEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceShaderRecordIndexEXT - Structure specifying mapping resources to a heap index in shader record data

The `VkDescriptorMappingSourceShaderRecordIndexEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceShaderRecordIndexEXT {
    uint32_t                      heapOffset;
    uint32_t                      shaderRecordOffset;
    uint32_t                      heapIndexStride;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerShaderRecordOffset;
    uint32_t                      samplerHeapIndexStride;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourceShaderRecordIndexEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`shaderRecordOffset` is an index into shader record data where an
index into the heap for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in shader record data.

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
`samplerShaderRecordOffset` is used only when mapping a combined
image sampler, used in place of `shaderRecordOffset` to retrieve the
sampler.

* 
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

shaderRecordIndex =
((uint32_t*)pShaderRecordData)[shaderRecordOffset/4]

shaderIndex = (Binding - firstBinding) +  arrayIndex

offset = heapOffset +  (shaderRecordIndex ×
heapIndexStride) +  (shaderIndex × heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pShaderRecordData is the set of shader record data accessible to the
shader.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

samplerShaderRecordIndex =
((uint32_t*)pShaderRecordData)[samplerShaderRecordOffset/4]

offset = samplerHeapOffset +  (samplerShaderRecordIndex
× samplerHeapIndexStride) +  (shaderIndex ×
samplerHeapArrayStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](VK_TRUE.html), and the mapped
resource is a `OpTypeSampledImage`, shaderRecordIndex and
samplerShaderRecordIndex in the above equations are instead calculated
as

shaderRecordIndex =
((uint32_t*)pShaderRecordData)[shaderRecordOffset/4] & 0xFFFFF

samplerShaderRecordIndex =
(((uint32_t*)pShaderRecordData)[shaderRecordOffset/4] >> 20) &
0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11269) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11269

`shaderRecordOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11270) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11270

`shaderRecordOffset` **must** be less than or equal to
[`maxShaderGroupStride`](../../../../spec/latest/chapters/limits.html#limits-maxShaderGroupStride) - 4

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11449) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11449

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11405) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11405

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), and there is a
[VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkBool32`, [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceShaderRecordIndexEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
