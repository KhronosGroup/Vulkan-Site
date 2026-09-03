# VkShaderDescriptorSetAndBindingMappingInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderDescriptorSetAndBindingMappingInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderDescriptorSetAndBindingMappingInfoEXT - Structure specifying mappings from shader resources to descriptor heaps

The `VkShaderDescriptorSetAndBindingMappingInfoEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkShaderDescriptorSetAndBindingMappingInfoEXT {
    VkStructureType                               sType;
    const void*                                   pNext;
    uint32_t                                      mappingCount;
    const VkDescriptorSetAndBindingMappingEXT*    pMappings;
} VkShaderDescriptorSetAndBindingMappingInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mappingCount` is the number of elements in `pMappings`.

* 
`pMappings` is a pointer to an array of
[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html) structures specifying mappings
for a set of descriptors

Including this structure in the `pNext` chain of
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) will set mappings for the shader
defined by that structure.
Similarly, including this structure in the `pNext` chain of a
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html) with a `codeType` of
[VK_SHADER_CODE_TYPE_SPIRV_EXT](VkShaderCodeTypeEXT.html), will set mappings for that shader.

If this structure is not present, it is equivalent to setting
`mappingCount` to 0.

Valid Usage

* 
[](#VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-11244) VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-11244

Any two elements of `pMappings` **must** not have the same value of
`descriptorSet`, an overlapping range specified by
`firstBinding` and `bindingCount`, and any overlapping bits in
`resourceMask`

Valid Usage (Implicit)

* 
[](#VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-sType-sType) VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_DESCRIPTOR_SET_AND_BINDING_MAPPING_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-parameter) VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-parameter

 If `mappingCount` is not `0`, `pMappings` **must** be a valid pointer to an array of `mappingCount` valid [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
