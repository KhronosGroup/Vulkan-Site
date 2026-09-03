# VkShaderStatisticsInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderStatisticsInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderStatisticsInfoAMD - Statistical information about a particular shader within a pipeline

The `VkShaderStatisticsInfoAMD` structure is defined as:

// Provided by VK_AMD_shader_info
typedef struct VkShaderStatisticsInfoAMD {
    VkShaderStageFlags          shaderStageMask;
    VkShaderResourceUsageAMD    resourceUsage;
    uint32_t                    numPhysicalVgprs;
    uint32_t                    numPhysicalSgprs;
    uint32_t                    numAvailableVgprs;
    uint32_t                    numAvailableSgprs;
    uint32_t                    computeWorkGroupSize[3];
} VkShaderStatisticsInfoAMD;

* 
`shaderStageMask` are the combination of logical shader stages
contained within this shader.

* 
`resourceUsage` is a [VkShaderResourceUsageAMD](VkShaderResourceUsageAMD.html) structure
describing internal physical device resources used by this shader.

* 
`numPhysicalVgprs` is the maximum number of vector instruction
general-purpose registers (VGPRs) available to the physical device.

* 
`numPhysicalSgprs` is the maximum number of scalar instruction
general-purpose registers (SGPRs) available to the physical device.

* 
`numAvailableVgprs` is the maximum limit of VGPRs made available to
the shader compiler.

* 
`numAvailableSgprs` is the maximum limit of SGPRs made available to
the shader compiler.

* 
`computeWorkGroupSize` is the local workgroup size of this shader in
{ X, Y, Z } dimensions.

Some implementations may merge multiple logical shader stages together in a
single shader.
In such cases, `shaderStageMask` will contain a bitmask of all of the
stages that are active within that shader.
Consequently, if specifying those stages as input to
[vkGetShaderInfoAMD](vkGetShaderInfoAMD.html), the same output information **may** be returned for
all such shader stage queries.

The number of available VGPRs and SGPRs (`numAvailableVgprs` and
`numAvailableSgprs` respectively) are the shader-addressable subset of
physical registers that is given as a limit to the compiler for register
assignment.
These values **may** further be limited by implementations due to performance
optimizations where register pressure is a bottleneck.

[VK_AMD_shader_info](VK_AMD_shader_info.html), [VkShaderResourceUsageAMD](VkShaderResourceUsageAMD.html), [VkShaderStageFlags](VkShaderStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkShaderStatisticsInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
