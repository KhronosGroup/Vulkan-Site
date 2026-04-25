# VkPipelineShaderStageRequiredSubgroupSizeCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineShaderStageRequiredSubgroupSizeCreateInfo - Structure specifying the required subgroup size of a newly created pipeline shader stage

The `VkPipelineShaderStageRequiredSubgroupSizeCreateInfo` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineShaderStageRequiredSubgroupSizeCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           requiredSubgroupSize;
} VkPipelineShaderStageRequiredSubgroupSizeCreateInfo;

// Provided by VK_EXT_subgroup_size_control
// Equivalent to VkPipelineShaderStageRequiredSubgroupSizeCreateInfo
typedef VkPipelineShaderStageRequiredSubgroupSizeCreateInfo VkPipelineShaderStageRequiredSubgroupSizeCreateInfoEXT;

or the equiavlent

// Provided by VK_EXT_shader_object
// Equivalent to VkPipelineShaderStageRequiredSubgroupSizeCreateInfo
typedef VkPipelineShaderStageRequiredSubgroupSizeCreateInfo VkShaderRequiredSubgroupSizeCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `requiredSubgroupSize` is an
unsigned integer value specifying the required subgroup size for the
newly created pipeline shader stage.

If a `VkPipelineShaderStageRequiredSubgroupSizeCreateInfo` structure is
included in the `pNext` chain of [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html),
it specifies that the pipeline shader stage being compiled has a required
subgroup size.

If a `VkShaderRequiredSubgroupSizeCreateInfoEXT` structure is included
in the `pNext` chain of [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html), it specifies that
the shader being compiled has a required subgroup size.

Valid Usage

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02760) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02760

`requiredSubgroupSize` **must** be a power-of-two integer

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02761) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02761

`requiredSubgroupSize` **must** be greater or equal to
[`minSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-minSubgroupSize)

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02762) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02762

`requiredSubgroupSize` **must** be less than or equal to
[`maxSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-sType-sType) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_EXT_subgroup_size_control](VK_EXT_subgroup_size_control.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
