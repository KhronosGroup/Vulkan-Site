# VK_NV_sample_mask_override_coverage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_sample_mask_override_coverage.html

## Table of Contents

- [Name](#_name)
- [VK_NV_sample_mask_override_coverage](#VK_NV_sample_mask_override_coverage)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Variable Decoration](#_new_variable_decoration)
- [New_Variable_Decoration](#_new_variable_decoration)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_sample_mask_override_coverage - device extension

**Name String**

`VK_NV_sample_mask_override_coverage`

**Extension Type**

Device extension

**Registered Extension Number**

95

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_NV_sample_mask_override_coverage](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_sample_mask_override_coverage.html)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_sample_mask_override_coverage] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_NV_sample_mask_override_coverage extension*)

**Last Modified Date**

2016-12-08

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_sample_mask_override_coverage`](https://registry.khronos.org/OpenGL/extensions/NV/NV_sample_mask_override_coverage.txt)

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_NV_sample_mask_override_coverage`

The extension provides access to the `OverrideCoverageNV` decoration
under the `SampleMaskOverrideCoverageNV` capability.
Adding this decoration to a variable with the `SampleMask` builtin
decoration allows the shader to modify the coverage mask and affect which
samples are used to process the fragment.

When using GLSL source-based shader languages, the `override_coverage`
layout qualifier from `GL_NV_sample_mask_override_coverage` maps to the
`OverrideCoverageNV` decoration.
To use the `override_coverage` layout qualifier in GLSL the
`GL_NV_sample_mask_override_coverage` extension must be enabled.
Behavior is described in the `GL_NV_sample_mask_override_coverage` extension
spec.

* 
`VK_NV_SAMPLE_MASK_OVERRIDE_COVERAGE_EXTENSION_NAME`

* 
`VK_NV_SAMPLE_MASK_OVERRIDE_COVERAGE_SPEC_VERSION`

* 
[OverrideCoverageNV in    SampleMask](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-samplemask)

* 
[    `SampleMaskOverrideCoverageNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-SampleMaskOverrideCoverageNV)

* 
Revision 1, 2016-12-08 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_sample_mask_override_coverage).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
