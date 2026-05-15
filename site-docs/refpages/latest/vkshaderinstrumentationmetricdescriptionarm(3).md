# VkShaderInstrumentationMetricDescriptionARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderInstrumentationMetricDescriptionARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderInstrumentationMetricDescriptionARM - Structure specifying shader instrumentation metric properties

The `VkShaderInstrumentationMetricDescriptionARM` structure is defined
as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkShaderInstrumentationMetricDescriptionARM {
    VkStructureType    sType;
    void*              pNext;
    char               name[VK_MAX_DESCRIPTION_SIZE];
    char               description[VK_MAX_DESCRIPTION_SIZE];
} VkShaderInstrumentationMetricDescriptionARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this shader instrumentation metric.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this shader instrumentation metric.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-sType-sType) VUID-VkShaderInstrumentationMetricDescriptionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_METRIC_DESCRIPTION_ARM](VkStructureType.html)

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-pNext-pNext) VUID-VkShaderInstrumentationMetricDescriptionARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-name-parameter) VUID-VkShaderInstrumentationMetricDescriptionARM-name-parameter

 `name` **must** be a null-terminated UTF-8 string whose length is less than or equal to [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html)

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-description-parameter) VUID-VkShaderInstrumentationMetricDescriptionARM-description-parameter

 `description` **must** be a null-terminated UTF-8 string whose length is less than or equal to [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkStructureType](VkStructureType.html), [vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM](vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderInstrumentationMetricDescriptionARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
