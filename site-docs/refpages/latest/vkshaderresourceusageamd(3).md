# VkShaderResourceUsageAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderResourceUsageAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderResourceUsageAMD - Resource usage information about a particular shader within a pipeline

The `VkShaderResourceUsageAMD` structure is defined as:

// Provided by VK_AMD_shader_info
typedef struct VkShaderResourceUsageAMD {
    uint32_t    numUsedVgprs;
    uint32_t    numUsedSgprs;
    uint32_t    ldsSizePerLocalWorkGroup;
    size_t      ldsUsageSizeInBytes;
    size_t      scratchMemUsageInBytes;
} VkShaderResourceUsageAMD;

* 
`numUsedVgprs` is the number of vector instruction general-purpose
registers used by this shader.

* 
`numUsedSgprs` is the number of scalar instruction general-purpose
registers used by this shader.

* 
`ldsSizePerLocalWorkGroup` is the maximum local data store size per
work group in bytes.

* 
`ldsUsageSizeInBytes` is the LDS usage size in bytes per work group
by this shader.

* 
`scratchMemUsageInBytes` is the scratch memory usage in bytes by
this shader.

[VK_AMD_shader_info](VK_AMD_shader_info.html), [VkShaderStatisticsInfoAMD](VkShaderStatisticsInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkShaderResourceUsageAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
