# VkPipelineExecutableStatisticKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineExecutableStatisticKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineExecutableStatisticKHR - Structure describing a compile time pipeline executable statistic

The `VkPipelineExecutableStatisticKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutableStatisticKHR {
    VkStructureType                           sType;
    void*                                     pNext;
    char                                      name[VK_MAX_DESCRIPTION_SIZE];
    char                                      description[VK_MAX_DESCRIPTION_SIZE];
    VkPipelineExecutableStatisticFormatKHR    format;
    VkPipelineExecutableStatisticValueKHR     value;
} VkPipelineExecutableStatisticKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this statistic.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this statistic.

* 
`format` is a [VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html) value
specifying the format of the data found in `value`.

* 
`value` is the value of this statistic.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutableStatisticKHR-sType-sType) VUID-VkPipelineExecutableStatisticKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_STATISTIC_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineExecutableStatisticKHR-pNext-pNext) VUID-VkPipelineExecutableStatisticKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), [VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html), [VkPipelineExecutableStatisticValueKHR](VkPipelineExecutableStatisticValueKHR.html), [VkStructureType](VkStructureType.html), [vkGetPipelineExecutableStatisticsKHR](vkGetPipelineExecutableStatisticsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineExecutableStatisticKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
