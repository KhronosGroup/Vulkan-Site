# VK_EXT_post_depth_coverage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_post_depth_coverage.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_post_depth_coverage](#VK_EXT_post_depth_coverage)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_post_depth_coverage - device extension

**Name String**

`VK_EXT_post_depth_coverage`

**Extension Type**

Device extension

**Registered Extension Number**

156

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_KHR_post_depth_coverage](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_post_depth_coverage.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_post_depth_coverage] @dgkoch%0A*Here describe the issue or question you have about the VK_EXT_post_depth_coverage extension*)

**Last Modified Date**

2017-07-17

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_post_depth_coverage`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_post_depth_coverage.txt)
and
[`GL_EXT_post_depth_coverage`](https://registry.khronos.org/OpenGL/extensions/EXT/EXT_post_depth_coverage.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_post_depth_coverage`

which allows the fragment shader to control whether values in the
`SampleMask` built-in input variable reflect the coverage after early
[depth](../../../../spec/latest/chapters/fragops.html#fragops-depth) and [stencil](../../../../spec/latest/chapters/fragops.html#fragops-stencil) tests are applied.

This extension adds a new `PostDepthCoverage` execution mode under the
`SampleMaskPostDepthCoverage` capability.
When this mode is specified along with `EarlyFragmentTests`, the value of
an input variable decorated with the
[`SampleMask`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-samplemask) built-in
reflects the coverage after the early fragment tests are applied.
Otherwise, it reflects the coverage before the depth and stencil tests.

When using GLSL source-based shading languages, the `post_depth_coverage`
layout qualifier from GL_ARB_post_depth_coverage or
GL_EXT_post_depth_coverage maps to the `PostDepthCoverage` execution
mode.

* 
`VK_EXT_POST_DEPTH_COVERAGE_EXTENSION_NAME`

* 
`VK_EXT_POST_DEPTH_COVERAGE_SPEC_VERSION`

* 
[    `SampleMaskPostDepthCoverage`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-SampleMaskPostDepthCoverage)

* 
Revision 1, 2017-07-17 (Daniel Koch)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_post_depth_coverage).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
