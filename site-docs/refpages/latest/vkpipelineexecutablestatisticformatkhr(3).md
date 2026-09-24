# VkPipelineExecutableStatisticFormatKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineExecutableStatisticFormatKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineExecutableStatisticFormatKHR - Enum describing a pipeline executable statistic

The [VkPipelineExecutableStatisticFormatKHR](#) enum is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef enum VkPipelineExecutableStatisticFormatKHR {
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_BOOL32_KHR = 0,
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_INT64_KHR = 1,
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_UINT64_KHR = 2,
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_FLOAT64_KHR = 3,
} VkPipelineExecutableStatisticFormatKHR;

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_BOOL32_KHR](#) specifies that
the statistic is returned as a 32-bit boolean value which **must** be
either [VK_TRUE](VK_TRUE.html) or [VK_FALSE](VK_FALSE.html) and **should** be read from the
`b32` field of `VkPipelineExecutableStatisticValueKHR`.

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_INT64_KHR](#) specifies that
the statistic is returned as a signed 64-bit integer and **should** be read
from the `i64` field of `VkPipelineExecutableStatisticValueKHR`.

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_UINT64_KHR](#) specifies that
the statistic is returned as an unsigned 64-bit integer and **should** be
read from the `u64` field of
`VkPipelineExecutableStatisticValueKHR`.

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_FLOAT64_KHR](#) specifies that
the statistic is returned as a 64-bit floating-point value and **should**
be read from the `f64` field of
`VkPipelineExecutableStatisticValueKHR`.

[VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), [VkPipelineExecutableStatisticKHR](VkPipelineExecutableStatisticKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineExecutableStatisticFormatKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
