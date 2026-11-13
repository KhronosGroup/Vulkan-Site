# VK_NV_fragment_coverage_to_color(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_fragment_coverage_to_color.html

## Table of Contents

- [Name](#_name)
- [VK_NV_fragment_coverage_to_color](#VK_NV_fragment_coverage_to_color)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_fragment_coverage_to_color - device extension

**Name String**

`VK_NV_fragment_coverage_to_color`

**Extension Type**

Device extension

**Registered Extension Number**

150

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_fragment_coverage_to_color] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_fragment_coverage_to_color extension*)

**Last Modified Date**

2017-05-21

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension allows the fragment coverage value, represented as an integer
bitmask, to be substituted for a color output being written to a
single-component color attachment with integer components (e.g.
[VK_FORMAT_R8_UINT](VkFormat.html)).
The functionality provided by this extension is different from simply
writing the `SampleMask` fragment shader output, in that the coverage
value written to the framebuffer is taken after stencil test and depth test,
as well as after fragment operations such as alpha-to-coverage.

This functionality may be useful for deferred rendering algorithms, where
the second pass needs to know which samples belong to which original
fragments.

* 
Extending [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html):

[VkPipelineCoverageToColorStateCreateInfoNV](VkPipelineCoverageToColorStateCreateInfoNV.html)

* 
[VkPipelineCoverageToColorStateCreateFlagsNV](VkPipelineCoverageToColorStateCreateFlagsNV.html)

* 
`VK_NV_FRAGMENT_COVERAGE_TO_COLOR_EXTENSION_NAME`

* 
`VK_NV_FRAGMENT_COVERAGE_TO_COLOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_TO_COLOR_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
Revision 1, 2017-05-21 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_fragment_coverage_to_color).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
