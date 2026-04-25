# VkPipelineCreateFlags2CreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreateFlags2CreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreateFlags2CreateInfo - Extended pipeline create flags

The `VkPipelineCreateFlags2CreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineCreateFlags2CreateInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkPipelineCreateFlags2    flags;
} VkPipelineCreateFlags2CreateInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPipelineCreateFlags2CreateInfo
typedef VkPipelineCreateFlags2CreateInfo VkPipelineCreateFlags2CreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html) specifying
how a pipeline will be generated.

If this structure is included in the `pNext` chain of a pipeline
creation structure, `flags` is used instead of the corresponding
`flags` value passed in that creation structure, allowing additional
creation flags to be specified.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCreateFlags2CreateInfo-sType-sType) VUID-VkPipelineCreateFlags2CreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineCreateFlags2CreateInfo-flags-parameter) VUID-VkPipelineCreateFlags2CreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

* 
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineCreateFlags2](VkPipelineCreateFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreateFlags2CreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
