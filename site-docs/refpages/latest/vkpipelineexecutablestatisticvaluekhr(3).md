# VkPipelineExecutableStatisticValueKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineExecutableStatisticValueKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineExecutableStatisticValueKHR - A union describing a pipeline executable statistic

The `VkPipelineExecutableStatisticValueKHR` union is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef union VkPipelineExecutableStatisticValueKHR {
    VkBool32    b32;
    int64_t     i64;
    uint64_t    u64;
    double      f64;
} VkPipelineExecutableStatisticValueKHR;

* 
`b32` is the 32-bit boolean value if the
[VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_BOOL32_KHR](VkPipelineExecutableStatisticFormatKHR.html).

* 
`i64` is the signed 64-bit integer value if the
[VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_INT64_KHR](VkPipelineExecutableStatisticFormatKHR.html).

* 
`u64` is the unsigned 64-bit integer value if the
[VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_UINT64_KHR](VkPipelineExecutableStatisticFormatKHR.html).

* 
`f64` is the 64-bit floating-point value if the
[VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_FLOAT64_KHR](VkPipelineExecutableStatisticFormatKHR.html).

[VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), `VkBool32`, [VkPipelineExecutableStatisticKHR](VkPipelineExecutableStatisticKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineExecutableStatisticValueKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
