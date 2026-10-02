# TessLevelOuter(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/TessLevelOuter.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

TessLevelOuter - Outer tessellation levels

`TessLevelOuter`

Decorating a variable with the `TessLevelOuter` built-in decoration will
make that variable contain the outer tessellation levels for the current
patch.

In tessellation control shaders, the variable decorated with
`TessLevelOuter` **can** be written to, controlling the tessellation factors
for the resulting patch.
These values are used by the tessellator to control primitive tessellation
and **can** be read by tessellation evaluation shaders.

In tessellation evaluation shaders, the variable decorated with
`TessLevelOuter` **can** read the values written by the tessellation control
shader.

Valid Usage

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04390) VUID-TessLevelOuter-TessLevelOuter-04390

The `TessLevelOuter` decoration **must** be used only within the
`TessellationControl` or `TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04391) VUID-TessLevelOuter-TessLevelOuter-04391

The variable decorated with `TessLevelOuter` within the
`TessellationControl` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04392) VUID-TessLevelOuter-TessLevelOuter-04392

The variable decorated with `TessLevelOuter` within the
`TessellationEvaluation` `Execution` `Model` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04393) VUID-TessLevelOuter-TessLevelOuter-04393

The variable decorated with `TessLevelOuter` **must** be declared as an
array of size four, containing 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
