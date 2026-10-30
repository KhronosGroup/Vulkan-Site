# VkPipelineCoverageToColorStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCoverageToColorStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCoverageToColorStateCreateInfoNV - Structure specifying whether fragment coverage replaces a color

The `VkPipelineCoverageToColorStateCreateInfoNV` structure is defined
as:

// Provided by VK_NV_fragment_coverage_to_color
typedef struct VkPipelineCoverageToColorStateCreateInfoNV {
    VkStructureType                                sType;
    const void*                                    pNext;
    VkPipelineCoverageToColorStateCreateFlagsNV    flags;
    VkBool32                                       coverageToColorEnable;
    uint32_t                                       coverageToColorLocation;
} VkPipelineCoverageToColorStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`coverageToColorEnable` controls whether the fragment coverage value
replaces a fragment color output.

* 
`coverageToColorLocation` controls which fragment shader color
output value is replaced.

If the `pNext` chain of [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)
includes a `VkPipelineCoverageToColorStateCreateInfoNV` structure, then
that structure controls whether the fragment coverage is substituted for a
fragment color output and, if so, which output is replaced.

If `coverageToColorEnable` is [VK_TRUE](VK_TRUE.html), the
[coverage mask](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) replaces the first
component of the color value corresponding to the fragment shader output
location with `Location` equal to `coverageToColorLocation` and
`Index` equal to zero.
If the color attachment format has fewer bits than the coverage mask, the
low bits of the sample coverage mask are taken without any clamping.
If the color attachment format has more bits than the coverage mask, the
high bits of the sample coverage mask are filled with zeros.

If `coverageToColorEnable` is [VK_FALSE](VK_FALSE.html), these operations are
skipped.
If this structure is not included in the `pNext` chain, it is as if
`coverageToColorEnable` is [VK_FALSE](VK_FALSE.html).

Valid Usage

* 
[](#VUID-VkPipelineCoverageToColorStateCreateInfoNV-coverageToColorEnable-01404) VUID-VkPipelineCoverageToColorStateCreateInfoNV-coverageToColorEnable-01404

If `coverageToColorEnable` is [VK_TRUE](VK_TRUE.html), then the render pass
subpass indicated by
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`renderPass` and
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`subpass` **must** have a color
attachment at the location selected by `coverageToColorLocation`,
with a [VkFormat](VkFormat.html) of [VK_FORMAT_R8_UINT](VkFormat.html),
[VK_FORMAT_R8_SINT](VkFormat.html), [VK_FORMAT_R16_UINT](VkFormat.html),
[VK_FORMAT_R16_SINT](VkFormat.html), [VK_FORMAT_R32_UINT](VkFormat.html), or
[VK_FORMAT_R32_SINT](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCoverageToColorStateCreateInfoNV-sType-sType) VUID-VkPipelineCoverageToColorStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_TO_COLOR_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineCoverageToColorStateCreateInfoNV-flags-zerobitmask) VUID-VkPipelineCoverageToColorStateCreateInfoNV-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)

[VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html), `VkBool32`, [VkPipelineCoverageToColorStateCreateFlagsNV](VkPipelineCoverageToColorStateCreateFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineCoverageToColorStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
