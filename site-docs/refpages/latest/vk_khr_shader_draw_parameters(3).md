# VK_KHR_shader_draw_parameters(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_draw_parameters.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_draw_parameters](#VK_KHR_shader_draw_parameters)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_draw_parameters - device extension

**Name String**

`VK_KHR_shader_draw_parameters`

**Extension Type**

Device extension

**Registered Extension Number**

64

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_KHR_shader_draw_parameters](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_shader_draw_parameters.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_draw_parameters] @dgkoch%0A*Here describe the issue or question you have about the VK_KHR_shader_draw_parameters extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_shader_draw_parameters`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_shader_draw_parameters.txt)

**Contributors**

* 
Daniel Koch, NVIDIA Corporation

* 
Jeff Bolz, NVIDIA

* 
Daniel Rakos, AMD

* 
Jan-Harald Fredriksen, ARM

* 
John Kessenich, Google

* 
Stuart Smith, IMG

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_shader_draw_parameters`

The extension provides access to three additional built-in shader variables
in Vulkan:

* 
`BaseInstance`, containing the `firstInstance` parameter passed
to drawing commands,

* 
`BaseVertex`, containing the `firstVertex` or `vertexOffset`
parameter passed to drawing commands, and

* 
`DrawIndex`, containing the index of the draw call currently being
processed from an indirect drawing call.

When using GLSL source-based shader languages, the following variables from
`GL_ARB_shader_draw_parameters` can map to these SPIR-V built-in
decorations:

* 
`in int gl_BaseInstanceARB;` → `BaseInstance`,

* 
`in int gl_BaseVertexARB;` → `BaseVertex`, and

* 
`in int gl_DrawIDARB;` → `DrawIndex`.

All functionality in this extension is included in core Vulkan 1.1.
However, the [`shaderDrawParameters`](../../../../spec/latest/chapters/features.html#features-shaderDrawParameters)
feature bit was added to distinguish whether it is actually available or
not.

* 
`VK_KHR_SHADER_DRAW_PARAMETERS_EXTENSION_NAME`

* 
`VK_KHR_SHADER_DRAW_PARAMETERS_SPEC_VERSION`

* 
[`BaseInstance`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-baseinstance)

* 
[`BaseVertex`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-basevertex)

* 
[`DrawIndex`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-drawindex)

* 
[`DrawParameters`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DrawParameters)

1) Is this the same functionality as `GL_ARB_shader_draw_parameters`?

**RESOLVED**: It is actually a superset, as it also adds in support for
arrayed drawing commands.

In GL for `GL_ARB_shader_draw_parameters`, `gl_BaseVertexARB` holds the
integer value passed to the parameter to the command that resulted in the
current shader invocation.
In the case where the command has no `baseVertex` parameter, the value of
`gl_BaseVertexARB` is zero.
This means that `gl_BaseVertexARB` = `baseVertex` (for
`glDrawElements` commands with `baseVertex`) or 0.
In particular there are no `glDrawArrays` commands that take a
`baseVertex` parameter.

Now in Vulkan, we have `BaseVertex` = `vertexOffset` (for indexed
drawing commands) or `firstVertex` (for arrayed drawing commands), and
so Vulkan’s version is really a superset of GL functionality.

* 
Revision 1, 2016-10-05 (Daniel Koch)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_draw_parameters).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
