# VK_NV_geometry_shader_passthrough(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_geometry_shader_passthrough.html

## Table of Contents

- [Name](#_name)
- [VK_NV_geometry_shader_passthrough](#VK_NV_geometry_shader_passthrough)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Variable Decoration](#_new_variable_decoration)
- [New_Variable_Decoration](#_new_variable_decoration)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Sample Code](#_sample_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_geometry_shader_passthrough - device extension

**Name String**

`VK_NV_geometry_shader_passthrough`

**Extension Type**

Device extension

**Registered Extension Number**

96

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_NV_geometry_shader_passthrough](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_geometry_shader_passthrough.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_geometry_shader_passthrough] @dgkoch%0A*Here describe the issue or question you have about the VK_NV_geometry_shader_passthrough extension*)

**Last Modified Date**

2017-02-15

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_geometry_shader_passthrough`](https://registry.khronos.org/OpenGL/extensions/NV/NV_geometry_shader_passthrough.txt)

* 
This extension requires the [    `geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature.

**Contributors**

* 
Piers Daniell, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_NV_geometry_shader_passthrough`

Geometry shaders provide the ability for applications to process each
primitive sent through the graphics pipeline using a programmable shader.
However, one common use case treats them largely as a “passthrough”.
In this use case, the bulk of the geometry shader code simply copies inputs
from each vertex of the input primitive to corresponding outputs in the
vertices of the output primitive.
Such shaders might also compute values for additional built-in or
user-defined per-primitive attributes (e.g., `Layer`) to be assigned to
all the vertices of the output primitive.

This extension provides access to the `PassthroughNV` decoration under
the `GeometryShaderPassthroughNV` capability.
Adding this to a geometry shader input variable specifies that the values of
this input are copied to the corresponding vertex of the output primitive.

When using GLSL source-based shading languages, the `passthrough` layout
qualifier from `GL_NV_geometry_shader_passthrough` maps to the
`PassthroughNV` decoration.
To use the `passthrough` layout, in GLSL the
`GL_NV_geometry_shader_passthrough` extension must be enabled.
Behavior is described in the `GL_NV_geometry_shader_passthrough` extension
specification.

* 
`VK_NV_GEOMETRY_SHADER_PASSTHROUGH_EXTENSION_NAME`

* 
`VK_NV_GEOMETRY_SHADER_PASSTHROUGH_SPEC_VERSION`

* 
[`PassthroughNV`](../../../../spec/latest/chapters/geometry.html#geometry-passthrough-passthrough) in
[Geometry Shader Passthrough](../../../../spec/latest/chapters/geometry.html#geometry-passthrough)

* 
[    `GeometryShaderPassthroughNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-GeometryShaderPassthroughNV)

1) Should we require or allow a passthrough geometry shader to specify the
output layout qualifiers for the output primitive type and maximum vertex
count in the SPIR-V?

**RESOLVED**: Yes they should be required in the SPIR-V.
Per GL_NV_geometry_shader_passthrough they are not permitted in the GLSL
source shader, but SPIR-V is lower-level.
It is straightforward for the GLSL compiler to infer them from the input
primitive type and to explicitly emit them in the SPIR-V according to the
following table.

| Input Layout | Implied Output Layout |
| --- | --- |
| points | `layout(points, max_vertices=1)` |
| lines | `layout(line_strip, max_vertices=2)` |
| triangles | `layout(triangle_strip, max_vertices=3)` |

2) How does interface matching work with passthrough geometry shaders?

**RESOLVED**: This is described in [Passthrough Interface Matching](../../../../spec/latest/chapters/geometry.html#geometry-passthrough-interface).
In GL when using passthrough geometry shaders in separable mode, all inputs
must also be explicitly assigned location layout qualifiers.
In Vulkan all SPIR-V shader inputs (except built-ins) must also have
location decorations specified.
Redeclarations of built-in variables that add the passthrough layout
qualifier are exempted from the rule requiring location assignment because
built-in variables do not have locations and are matched by `BuiltIn`
decoration.

Consider the following simple geometry shader in unextended GLSL:

layout(triangles) in;
layout(triangle_strip) out;
layout(max_vertices=3) out;

in Inputs {
    vec2 texcoord;
    vec4 baseColor;
} v_in[];
out Outputs {
    vec2 texcoord;
    vec4 baseColor;
};

void main()
{
    int layer = compute_layer();
    for (int i = 0; i 

In this shader, the inputs `gl_Position`, `Inputs.texcoord`, and
`Inputs.baseColor` are simply copied from the input vertex to the
corresponding output vertex.
The only “interesting” work done by the geometry shader is computing and
emitting a `gl_Layer` value for the primitive.

The following geometry shader, using this extension, is equivalent:

#extension GL_NV_geometry_shader_passthrough : require

layout(triangles) in;
// No output primitive layout qualifiers required.

// Redeclare gl_PerVertex to pass through "gl_Position".
layout(passthrough) in gl_PerVertex {
    vec4 gl_Position;
} gl_in[];

// Declare "Inputs" with "passthrough" to automatically copy members.
layout(passthrough) in Inputs {
    vec2 texcoord;
    vec4 baseColor;
} v_in[];

// No output block declaration required.

void main()
{
    // The shader simply computes and writes gl_Layer.  We do not
    // loop over three vertices or call EmitVertex().
    gl_Layer = compute_layer();
}

* 
Revision 1, 2017-02-15 (Daniel Koch)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_geometry_shader_passthrough).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
