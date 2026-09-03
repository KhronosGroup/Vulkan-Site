# VkPipelineTessellationStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineTessellationStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineTessellationStateCreateInfo - Structure specifying parameters of a newly created pipeline tessellation state

The `VkPipelineTessellationStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineTessellationStateCreateInfo {
    VkStructureType                           sType;
    const void*                               pNext;
    VkPipelineTessellationStateCreateFlags    flags;
    uint32_t                                  patchControlPoints;
} VkPipelineTessellationStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`patchControlPoints` is the number of control points per patch.

Valid Usage

* 
[](#VUID-VkPipelineTessellationStateCreateInfo-patchControlPoints-01214) VUID-VkPipelineTessellationStateCreateInfo-patchControlPoints-01214

`patchControlPoints` **must** be greater than zero and less than or
equal to `VkPhysicalDeviceLimits`::`maxTessellationPatchSize`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineTessellationStateCreateInfo-sType-sType) VUID-VkPipelineTessellationStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineTessellationStateCreateInfo-pNext-pNext) VUID-VkPipelineTessellationStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineTessellationDomainOriginStateCreateInfo](VkPipelineTessellationDomainOriginStateCreateInfo.html)

* 
[](#VUID-VkPipelineTessellationStateCreateInfo-sType-unique) VUID-VkPipelineTessellationStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineTessellationStateCreateInfo-flags-zerobitmask) VUID-VkPipelineTessellationStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html), [VkPipelineTessellationStateCreateFlags](VkPipelineTessellationStateCreateFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/tessellation.html#VkPipelineTessellationStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
