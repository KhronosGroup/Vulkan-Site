# VkPipelineCompilerControlCreateInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCompilerControlCreateInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCompilerControlCreateInfoAMD - Structure used to pass compilation control flags to a pipeline

The compilation of a pipeline **can** be tuned by adding a
`VkPipelineCompilerControlCreateInfoAMD` structure to the `pNext`
chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) or
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html).

// Provided by VK_AMD_pipeline_compiler_control
typedef struct VkPipelineCompilerControlCreateInfoAMD {
    VkStructureType                      sType;
    const void*                          pNext;
    VkPipelineCompilerControlFlagsAMD    compilerControlFlags;
} VkPipelineCompilerControlCreateInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compilerControlFlags` is a bitmask of
[VkPipelineCompilerControlFlagBitsAMD](VkPipelineCompilerControlFlagBitsAMD.html) affecting how the pipeline
will be compiled.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCompilerControlCreateInfoAMD-sType-sType) VUID-VkPipelineCompilerControlCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COMPILER_CONTROL_CREATE_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkPipelineCompilerControlCreateInfoAMD-compilerControlFlags-zerobitmask) VUID-VkPipelineCompilerControlCreateInfoAMD-compilerControlFlags-zerobitmask

 `compilerControlFlags` **must** be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

* 
[VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_AMD_pipeline_compiler_control](VK_AMD_pipeline_compiler_control.html), [VkPipelineCompilerControlFlagsAMD](VkPipelineCompilerControlFlagsAMD.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCompilerControlCreateInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
