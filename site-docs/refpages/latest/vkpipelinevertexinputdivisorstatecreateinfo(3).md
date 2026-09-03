# VkPipelineVertexInputDivisorStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineVertexInputDivisorStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineVertexInputDivisorStateCreateInfo - Structure specifying vertex attributes assignment during instanced rendering

If the [`vertexAttributeInstanceRateDivisor`](../../../../spec/latest/chapters/features.html#features-vertexAttributeInstanceRateDivisor) feature is enabled and the
`pNext` chain of [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html) includes a
`VkPipelineVertexInputDivisorStateCreateInfo` structure, then that
structure controls how vertex attributes are assigned to an instance when
instanced rendering is enabled.

The `VkPipelineVertexInputDivisorStateCreateInfo` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineVertexInputDivisorStateCreateInfo {
    VkStructureType                                  sType;
    const void*                                      pNext;
    uint32_t                                         vertexBindingDivisorCount;
    const VkVertexInputBindingDivisorDescription*    pVertexBindingDivisors;
} VkPipelineVertexInputDivisorStateCreateInfo;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkPipelineVertexInputDivisorStateCreateInfo
typedef VkPipelineVertexInputDivisorStateCreateInfo VkPipelineVertexInputDivisorStateCreateInfoKHR;

// Provided by VK_EXT_vertex_attribute_divisor
// Equivalent to VkPipelineVertexInputDivisorStateCreateInfo
typedef VkPipelineVertexInputDivisorStateCreateInfo VkPipelineVertexInputDivisorStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexBindingDivisorCount` is the number of elements in the
`pVertexBindingDivisors` array.

* 
`pVertexBindingDivisors` is a pointer to an array of
[VkVertexInputBindingDivisorDescription](VkVertexInputBindingDivisorDescription.html) structures specifying the
divisor value for each binding.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineVertexInputDivisorStateCreateInfo-sType-sType) VUID-VkPipelineVertexInputDivisorStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineVertexInputDivisorStateCreateInfo-pVertexBindingDivisors-parameter) VUID-VkPipelineVertexInputDivisorStateCreateInfo-pVertexBindingDivisors-parameter

 `pVertexBindingDivisors` **must** be a valid pointer to an array of `vertexBindingDivisorCount` [VkVertexInputBindingDivisorDescription](VkVertexInputBindingDivisorDescription.html) structures

* 
[](#VUID-VkPipelineVertexInputDivisorStateCreateInfo-vertexBindingDivisorCount-arraylength) VUID-VkPipelineVertexInputDivisorStateCreateInfo-vertexBindingDivisorCount-arraylength

 `vertexBindingDivisorCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html)

[VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html), [VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkStructureType](VkStructureType.html), [VkVertexInputBindingDivisorDescription](VkVertexInputBindingDivisorDescription.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#VkPipelineVertexInputDivisorStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
