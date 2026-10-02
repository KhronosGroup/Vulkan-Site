# VkSubpassShadingPipelineCreateInfoHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassShadingPipelineCreateInfoHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassShadingPipelineCreateInfoHUAWEI - Structure specifying parameters of a newly created subpass shading pipeline

A subpass shading pipeline is a compute pipeline which **must** be called only
in a subpass of a render pass with work dimensions specified by render area
size.
The subpass shading pipeline shader is a compute shader allowed to access
input attachments specified in the calling subpass.
To create a subpass shading pipeline, call [vkCreateComputePipelines](vkCreateComputePipelines.html)
with [VkSubpassShadingPipelineCreateInfoHUAWEI](#) in the `pNext` chain
of [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html).

The `VkSubpassShadingPipelineCreateInfoHUAWEI` structure is defined as:

// Provided by VK_HUAWEI_subpass_shading
typedef struct VkSubpassShadingPipelineCreateInfoHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkRenderPass       renderPass;
    uint32_t           subpass;
} VkSubpassShadingPipelineCreateInfoHUAWEI;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`renderPass` is a handle to a render pass object describing the
environment in which the pipeline will be used.
The pipeline **must** only be used with a render pass instance compatible
with the one provided.
See [Render Pass Compatibility](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility) for more
information.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`subpass` is the index of the subpass in the render pass where this
pipeline will be used.

Valid Usage

* 
[](#VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-subpass-04946) VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-subpass-04946

`subpass` **must** be created with
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](VkPipelineBindPoint.html) bind point

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-sType-sType) VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_SHADING_PIPELINE_CREATE_INFO_HUAWEI](VkStructureType.html)

* 
[](#VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-renderPass-parameter) VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](VkRenderPass.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

[VK_HUAWEI_subpass_shading](VK_HUAWEI_subpass_shading.html), [VkRenderPass](VkRenderPass.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkSubpassShadingPipelineCreateInfoHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
