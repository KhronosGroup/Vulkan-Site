# VkShaderInstrumentationMetricDataHeaderARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderInstrumentationMetricDataHeaderARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderInstrumentationMetricDataHeaderARM - Structure describing the header of a metric block

The shader instrumentation metrics block header is defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkShaderInstrumentationMetricDataHeaderARM {
    uint32_t              resultIndex;
    uint32_t              resultSubIndex;
    VkShaderStageFlags    stages;
    uint32_t              basicBlockIndex;
} VkShaderInstrumentationMetricDataHeaderARM;

* 
`resultIndex` is the result index of the metric block, as captured
when the command was recorded.

* 
`resultSubIndex` is a secondary index with the result index,
explained further below.

* 
`stages` is a bitfield of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) describing the
shader stages that the metric block is for.

* 
`basicBlockIndex` is the index of the basic block within the shader
that the metric block is for.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-parameter) VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-parameter

 `stages` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-requiredbitmask) VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-requiredbitmask

 `stages` **must** not be `0`

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkShaderStageFlags](VkShaderStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderInstrumentationMetricDataHeaderARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
