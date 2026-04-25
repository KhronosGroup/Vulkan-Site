# VkDescriptorMappingSourceConstantOffsetEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceConstantOffsetEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceConstantOffsetEXT - Structure specifying mapping resources to a constant heap index

The `VkDescriptorMappingSourceConstantOffsetEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceConstantOffsetEXT {
    uint32_t                      heapOffset;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourceConstantOffsetEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`heapArrayStride` is a constant byte stride that multiplies the
shader binding and array index.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](VkSamplerCreateInfo.html)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

shaderIndex = (Binding - `firstBinding`) + 
arrayIndex

offset = heapOffset +  (shaderIndex * heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

offset = samplerHeapOffset +  (shaderIndex *
samplerHeapArrayStride)

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11445) VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11445

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

* 
[](#VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11415) VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11415

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), and there is a
[VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceConstantOffsetEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
