# VK_NV_viewport_array2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_viewport_array2.html

## Table of Contents

- [Name](#_name)
- [VK_NV_viewport_array2](#VK_NV_viewport_array2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New Variable Decoration](#_new_variable_decoration)
- [New_Variable_Decoration](#_new_variable_decoration)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_viewport_array2 - device extension

**Name String**

`VK_NV_viewport_array2`

**Extension Type**

Device extension

**Registered Extension Number**

97

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_NV_viewport_array2](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_viewport_array2.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_viewport_array2] @dgkoch%0A*Here describe the issue or question you have about the VK_NV_viewport_array2 extension*)

**Last Modified Date**

2017-02-15

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_viewport_array2`](https://registry.khronos.org/OpenGL/extensions/NV/NV_viewport_array2.txt)

* 
This extension requires the [    `geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) and [    `multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) features.

* 
This extension interacts with the [    `tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature.

**Contributors**

* 
Piers Daniell, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_NV_viewport_array2`

which allows a single primitive to be broadcast to multiple viewports and/or
multiple layers.
A new shader built-in output `ViewportMaskNV` is provided, which allows a
single primitive to be output to multiple viewports simultaneously.
Also, a new SPIR-V decoration is added to control whether the effective
viewport index is added into the variable decorated with the `Layer`
built-in decoration.
These capabilities allow a single primitive to be output to multiple layers
simultaneously.

This extension allows variables decorated with the `Layer` and
`ViewportIndex` built-ins to be exported from vertex or tessellation
shaders, using the `ShaderViewportIndexLayerNV` capability.

This extension adds a new `ViewportMaskNV` built-in decoration that is
available for output variables in vertex, tessellation evaluation, and
geometry shaders, and a new `ViewportRelativeNV` decoration that can be
added on variables decorated with `Layer` when using the
`ShaderViewportMaskNV` capability.

When using GLSL source-based shading languages, the `gl_ViewportMask`[]
built-in output variable and `viewport_relative` layout qualifier from
`GL_NV_viewport_array2` map to the `ViewportMaskNV` and
`ViewportRelativeNV` decorations, respectively.
Behavior is described in the `GL_NV_viewport_array2` extension
specification.

|  | The `ShaderViewportIndexLayerNV` capability is equivalent to the
| --- | --- |
`ShaderViewportIndexLayerEXT` capability added by
`[VK_EXT_shader_viewport_index_layer](VK_EXT_shader_viewport_index_layer.html)`. |

* 
`VK_NV_VIEWPORT_ARRAY2_EXTENSION_NAME`

* 
`VK_NV_VIEWPORT_ARRAY2_SPEC_VERSION`

* 
`VK_NV_VIEWPORT_ARRAY_2_EXTENSION_NAME`

* 
`VK_NV_VIEWPORT_ARRAY_2_SPEC_VERSION`

* 
(modified) [`Layer`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-layer)

* 
(modified)
[`ViewportIndex`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-viewportindex)

* 
[`ViewportMaskNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-viewportmask)

* 
[`ViewportRelativeNV` in    `Layer`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-layer)

* 
[    `ShaderViewportIndexLayerNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderViewportIndexLayerEXT)

* 
[    `ShaderViewportMaskNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderViewportMaskNV)

* 
Revision 1, 2017-02-15 (Daniel Koch)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_viewport_array2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
