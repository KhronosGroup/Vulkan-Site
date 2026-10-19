# VkPipelineVertexInputStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineVertexInputStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineVertexInputStateCreateInfo - Structure specifying parameters of a newly created pipeline vertex input state

The `VkPipelineVertexInputStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineVertexInputStateCreateInfo {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkPipelineVertexInputStateCreateFlags       flags;
    uint32_t                                    vertexBindingDescriptionCount;
    const VkVertexInputBindingDescription*      pVertexBindingDescriptions;
    uint32_t                                    vertexAttributeDescriptionCount;
    const VkVertexInputAttributeDescription*    pVertexAttributeDescriptions;
} VkPipelineVertexInputStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`vertexBindingDescriptionCount` is the number of vertex binding
descriptions provided in `pVertexBindingDescriptions`.

* 
`pVertexBindingDescriptions` is a pointer to an array of
[VkVertexInputBindingDescription](VkVertexInputBindingDescription.html) structures.

* 
`vertexAttributeDescriptionCount` is the number of vertex attribute
descriptions provided in `pVertexAttributeDescriptions`.

* 
`pVertexAttributeDescriptions` is a pointer to an array of
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html) structures.

Valid Usage

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-vertexBindingDescriptionCount-00613) VUID-VkPipelineVertexInputStateCreateInfo-vertexBindingDescriptionCount-00613

`vertexBindingDescriptionCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-vertexAttributeDescriptionCount-00614) VUID-VkPipelineVertexInputStateCreateInfo-vertexAttributeDescriptionCount-00614

`vertexAttributeDescriptionCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-binding-00615) VUID-VkPipelineVertexInputStateCreateInfo-binding-00615

For every `binding` specified by each element of
`pVertexAttributeDescriptions`, a
[VkVertexInputBindingDescription](VkVertexInputBindingDescription.html) **must** exist in
`pVertexBindingDescriptions` with the same value of `binding`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-00616) VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-00616

All elements of `pVertexBindingDescriptions` **must** describe distinct
binding numbers

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-00617) VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-00617

All elements of `pVertexAttributeDescriptions` **must** describe
distinct attribute locations

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-sType-sType) VUID-VkPipelineVertexInputStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pNext-pNext) VUID-VkPipelineVertexInputStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html)

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-sType-unique) VUID-VkPipelineVertexInputStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-flags-zerobitmask) VUID-VkPipelineVertexInputStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-parameter) VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-parameter

 If `vertexBindingDescriptionCount` is not `0`, `pVertexBindingDescriptions` **must** be a valid pointer to an array of `vertexBindingDescriptionCount` valid [VkVertexInputBindingDescription](VkVertexInputBindingDescription.html) structures

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-parameter) VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-parameter

 If `vertexAttributeDescriptionCount` is not `0`, `pVertexAttributeDescriptions` **must** be a valid pointer to an array of `vertexAttributeDescriptionCount` valid [VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html) structures

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html), [VkPipelineVertexInputStateCreateFlags](VkPipelineVertexInputStateCreateFlags.html), [VkStructureType](VkStructureType.html), [VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html), [VkVertexInputBindingDescription](VkVertexInputBindingDescription.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkPipelineVertexInputStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
