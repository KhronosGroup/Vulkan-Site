# ShaderIndexAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ShaderIndexAMDX.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ShaderIndexAMDX - Index assigned to the shader within the workgraph

`ShaderIndexAMDX`

Decorating a variable with the `ShaderIndexAMDX` built-in decoration will
make that variable contain the index of the shader specified when it was
compiled, either via
[VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html)::`index` or by the
`ShaderIndexAMDX` execution mode.

Valid Usage

* 
[](#VUID-ShaderIndexAMDX-ShaderIndexAMDX-09175) VUID-ShaderIndexAMDX-ShaderIndexAMDX-09175

The variable decorated with `ShaderIndexAMDX` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-ShaderIndexAMDX-ShaderIndexAMDX-09176) VUID-ShaderIndexAMDX-ShaderIndexAMDX-09176

The variable decorated with `ShaderIndexAMDX` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
