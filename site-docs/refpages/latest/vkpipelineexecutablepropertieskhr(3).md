# VkPipelineExecutablePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineExecutablePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineExecutablePropertiesKHR - Structure describing a pipeline executable

The `VkPipelineExecutablePropertiesKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutablePropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    stages;
    char                  name[VK_MAX_DESCRIPTION_SIZE];
    char                  description[VK_MAX_DESCRIPTION_SIZE];
    uint32_t              subgroupSize;
} VkPipelineExecutablePropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stages` is a bitmask of zero or more [VkShaderStageFlagBits](VkShaderStageFlagBits.html)
indicating which shader stages (if any) were principally used as inputs
to compile this pipeline executable.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this pipeline executable.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this pipeline executable.

* 
`subgroupSize` is the subgroup size with which this pipeline
executable is dispatched.

Not all implementations have a 1:1 mapping between shader stages and
pipeline executables and some implementations **may** reduce a given shader
stage to fixed function hardware programming such that no pipeline
executable is available.
No guarantees are provided about the mapping between shader stages and
pipeline executables and `stages` **should** be considered a best effort
hint.
Because the application **cannot** rely on the `stages` field to provide an
exact description, `name` and `description` provide a human readable
name and description which more accurately describes the given pipeline
executable.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutablePropertiesKHR-sType-sType) VUID-VkPipelineExecutablePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineExecutablePropertiesKHR-pNext-pNext) VUID-VkPipelineExecutablePropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [vkGetPipelineExecutablePropertiesKHR](vkGetPipelineExecutablePropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineExecutablePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
