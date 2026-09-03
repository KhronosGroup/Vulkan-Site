# VK_EXT_shader_stencil_export(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_stencil_export.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_stencil_export](#VK_EXT_shader_stencil_export)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_stencil_export - device extension

**Name String**

`VK_EXT_shader_stencil_export`

**Extension Type**

Device extension

**Registered Extension Number**

141

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_stencil_export](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_stencil_export.html)

**Contact**

* 
Dominik Witczak [dominikwitczakamd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_stencil_export] @dominikwitczakamd%0A*Here describe the issue or question you have about the VK_EXT_shader_stencil_export extension*)

**Last Modified Date**

2017-07-19

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_shader_stencil_export`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_shader_stencil_export.txt)

**Contributors**

* 
Dominik Witczak, AMD

* 
Daniel Rakos, AMD

* 
Rex Xu, AMD

This extension adds support for the SPIR-V extension
`SPV_EXT_shader_stencil_export`, providing a mechanism whereby a shader may
generate the stencil reference value per invocation.
When stencil testing is enabled, this allows the test to be performed
against the value generated in the shader.

* 
`VK_EXT_SHADER_STENCIL_EXPORT_EXTENSION_NAME`

* 
`VK_EXT_SHADER_STENCIL_EXPORT_SPEC_VERSION`

* 
Revision 1, 2017-07-19 (Dominik Witczak)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_stencil_export).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
