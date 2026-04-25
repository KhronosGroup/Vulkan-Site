# VkDescriptorSetAndBindingMappingEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetAndBindingMappingEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetAndBindingMappingEXT - Structure specifying mappings from a set of shader resources to a descriptor heap

The `VkDescriptorSetAndBindingMappingEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorSetAndBindingMappingEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            descriptorSet;
    uint32_t                            firstBinding;
    uint32_t                            bindingCount;
    VkSpirvResourceTypeFlagsEXT         resourceMask;
    VkDescriptorMappingSourceEXT        source;
    VkDescriptorMappingSourceDataEXT    sourceData;
} VkDescriptorSetAndBindingMappingEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorSet` is the value of `DescriptorSet` for resources
that this mapping affects.

* 
`firstBinding` is the first value of `Binding` of resources that
this mapping affects.

* 
`bindingCount` is the number of consecutive `Binding` values of
resources that this mapping affects.

* 
`resourceMask` is a mask of [VkSpirvResourceTypeFlagBitsEXT](VkSpirvResourceTypeFlagBitsEXT.html)
values indicating which resource types are specified by this mapping.

* 
`source` is a [VkDescriptorMappingSourceEXT](VkDescriptorMappingSourceEXT.html) value specifying
the method of mapping specified for the affected resources.

* 
`sourceData` is a [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html) that
provides the details of how each mapping is specified according to
`source`.

Resources specified in a shader with a `DescriptorSet` decoration set to
`descriptorSet`, a `Binding` decoration greater than or equal to
`firstBinding` and less than the sum of `firstBinding` and
`bindingCount`, and a resource type matching one of the bits in
`resourceMask` will be mapped according to `source` and
`sourceData`.

|  | Applications are free to overspecify bindings that are not present; allowing
| --- | --- |
reuse of the same mapping structures with multiple shaders, even when those
shaders only partially reuse those mappings.
This includes things like setting binding counts higher than the number used
in the shader, specifying bindings that are not present in the shader, and
setting `resourceMask` to all possible resources that may be
encountered. |

If `source` selects an element of `sourceData` defined by a
structure, the description of that structure defines how resources are
mapped.
Source mappings using a single base type are defined here.

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html), the
resource will be backed by heap data as specified by
[`constantOffset`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceConstantOffsetEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html), the resource
will be backed by heap data as specified by
[`pushIndex`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourcePushIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), the
resource will be backed by heap data as specified by
[`indirectIndex`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceIndirectIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html), the
resource will be backed by heap data as specified by
[`indirectIndexArray`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceIndirectIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html), the resource will
be backed by heap data as specified by
[`heapData`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceHeapDataEXT).

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html), the
resource will be backed by push data at a range from `pushDataOffset` to
the size of the resource, allowing a uniform buffer to be backed by push
data access push data.
Accessing data in the uniform buffer at an offset of shaderOffset in
the shader will access push data at an offset equal to

offset = shaderOffset +  pushDataOffset.

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), the
resource will be backed by data pointed to by a device address in push data
at an offset of `pushAddressOffset`.
Accessing data via the mapped resource in the shader will access data
backing the address specified in push data:

address =
((VkDeviceAddress*)pPushData)[pushAddressOffset/8]

where pPushData is the total set of push data specified by
[vkCmdPushDataEXT](vkCmdPushDataEXT.html).
If the shader resource is an acceleration structure, the address **must** be a
valid acceleration structure address.

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
the resource will be backed by heap data as specified by
[`indirectAddress`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceIndirectAddressEXT).

|  | Accesses to resources using mappings to anything that is not a descriptor in
| --- | --- |
a heap are not subject to robustness guarantees; resources for such mappings
must not be accessed out of bounds. |

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html), the
resource will be backed by heap data as specified by
[`shaderRecordIndex`](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceShaderRecordIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html), the resource will
be backed by shader record data at a range from `shaderRecordDataOffset`
to the size of the resource, allowing a uniform buffer to be used as a way
to access shader record data.
Accessing data in the uniform buffer at an offset shaderOffset in the
shader will access shader record data at an offset equal to

offset = shaderOffset +  shaderRecordDataOffset.

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), the resource
will be backed by data pointed to by a device address in the shader record
at `shaderRecordAddressOffset`.
Accessing data via the mapped resource in the shader will access data
backing the address specified in shader record data:

address =
((VkDeviceAddress*)pShaderRecordData)[shaderRecordAddressOffset/8]

where pShaderRecord is the memory associated with a given shader as
its shader record.
If the shader resource is an acceleration structure, the address **must** be a
valid acceleration structure address.

|  | Accesses to resources using
| --- | --- |
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html) mappings are
not subject to robustness guarantees; data must not be accessed outside of
the allocated memory range. |

Mappings must be declared for all variables with a `DescriptorSet` and
`Binding` in the [shader resource interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources).

Valid Usage

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11245) VUID-VkDescriptorSetAndBindingMappingEXT-source-11245

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html),
`bindingCount` **must** be 1

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11246) VUID-VkDescriptorSetAndBindingMappingEXT-source-11246

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html),
`sourceData.pushDataOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11247) VUID-VkDescriptorSetAndBindingMappingEXT-source-11247

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
`sourceData.pushAddressOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11248) VUID-VkDescriptorSetAndBindingMappingEXT-source-11248

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
`bindingCount` **must** be 1

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11249) VUID-VkDescriptorSetAndBindingMappingEXT-source-11249

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html),
`sourceData.shaderRecordDataOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11250) VUID-VkDescriptorSetAndBindingMappingEXT-source-11250

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
`sourceData.shaderRecordAddressOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11251) VUID-VkDescriptorSetAndBindingMappingEXT-source-11251

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeImage` variables, any `heapOffset`, and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`imageDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11252) VUID-VkDescriptorSetAndBindingMappingEXT-source-11252

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeStruct` variables, any `heapOffset`, and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11253) VUID-VkDescriptorSetAndBindingMappingEXT-source-11253

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeSampler` variables, any `heapOffset` and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`samplerDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11254) VUID-VkDescriptorSetAndBindingMappingEXT-source-11254

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeSampledImage` variables, any
`samplerHeapOffset` and `samplerHeapArrayStride` members of the
corresponding member of `sourceData` **must** be 0 or a multiple of
[`samplerDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11356) VUID-VkDescriptorSetAndBindingMappingEXT-source-11356

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html), `resourceMask`
**must** include [VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11357) VUID-VkDescriptorSetAndBindingMappingEXT-source-11357

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), `resourceMask`
**must** include at least one of
[VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html),
[VK_SPIRV_RESOURCE_TYPE_READ_ONLY_STORAGE_BUFFER_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html),
[VK_SPIRV_RESOURCE_TYPE_READ_WRITE_STORAGE_BUFFER_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html), or
[VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11358) VUID-VkDescriptorSetAndBindingMappingEXT-source-11358

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
and the mapping sets `useCombinedImageSamplerIndex` to
[VK_TRUE](VK_TRUE.html), `resourceMask` **must** include at least one of
[VK_SPIRV_RESOURCE_TYPE_COMBINED_SAMPLED_IMAGE_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html),
[VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html), or
[VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11389) VUID-VkDescriptorSetAndBindingMappingEXT-source-11389

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
and `bindingCount` is not `1`, the `pEmbeddedSampler` member of
the corresponding mapping structure **must** be `NULL`

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11390) VUID-VkDescriptorSetAndBindingMappingEXT-source-11390

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeTensorARM` variables, the `heapOffset`, and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`tensorDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-tensorDescriptorAlignment)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-sType-sType) VUID-VkDescriptorSetAndBindingMappingEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-pNext-pNext) VUID-VkDescriptorSetAndBindingMappingEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPushConstantBankInfoNV](VkPushConstantBankInfoNV.html)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-sType-unique) VUID-VkDescriptorSetAndBindingMappingEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-parameter

 `resourceMask` **must** be a valid combination of [VkSpirvResourceTypeFlagBitsEXT](VkSpirvResourceTypeFlagBitsEXT.html) values

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-requiredbitmask) VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-requiredbitmask

 `resourceMask` **must** not be `0`

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-source-parameter

 `source` **must** be a valid [VkDescriptorMappingSourceEXT](VkDescriptorMappingSourceEXT.html) value

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-constantOffset-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-constantOffset-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html), the `constantOffset` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceConstantOffsetEXT](VkDescriptorMappingSourceConstantOffsetEXT.html) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-pushIndex-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-pushIndex-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html), the `pushIndex` member of `sourceData` **must** be a valid [VkDescriptorMappingSourcePushIndexEXT](VkDescriptorMappingSourcePushIndexEXT.html) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndex-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndex-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), the `indirectIndex` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceIndirectIndexEXT](VkDescriptorMappingSourceIndirectIndexEXT.html) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndexArray-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndexArray-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html), the `indirectIndexArray` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceIndirectIndexArrayEXT](VkDescriptorMappingSourceIndirectIndexArrayEXT.html) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-shaderRecordIndex-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-shaderRecordIndex-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html), the `shaderRecordIndex` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceShaderRecordIndexEXT](VkDescriptorMappingSourceShaderRecordIndexEXT.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html), [VkDescriptorMappingSourceEXT](VkDescriptorMappingSourceEXT.html), [VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html), [VkSpirvResourceTypeFlagsEXT](VkSpirvResourceTypeFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
