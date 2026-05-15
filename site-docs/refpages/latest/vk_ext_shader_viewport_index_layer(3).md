# VK_EXT_shader_viewport_index_layer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_viewport_index_layer.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_viewport_index_layer](#VK_EXT_shader_viewport_index_layer)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_viewport_index_layer - device extension

**Name String**

`VK_EXT_shader_viewport_index_layer`

**Extension Type**

Device extension

**Registered Extension Number**

163

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_viewport_index_layer](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_viewport_index_layer.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_viewport_index_layer] @dgkoch%0A*Here describe the issue or question you have about the VK_EXT_shader_viewport_index_layer extension*)

**Last Modified Date**

2017-08-08

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_shader_viewport_layer_array`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_shader_viewport_layer_array.txt),
[`GL_AMD_vertex_shader_layer`](https://registry.khronos.org/OpenGL/extensions/AMD/AMD_vertex_shader_layer.txt),
[`GL_AMD_vertex_shader_viewport_index`](https://registry.khronos.org/OpenGL/extensions/AMD/AMD_vertex_shader_viewport_index.txt),
and [`GL_NV_viewport_array2`](https://registry.khronos.org/OpenGL/extensions/NV/NV_viewport_array2.txt)

* 
This extension requires the [    `multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature.

* 
This extension interacts with the [    `tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature.

**Contributors**

* 
Piers Daniell, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Jan-Harald Fredriksen, ARM

* 
Daniel Rakos, AMD

* 
Slawomir Grajeswki, Intel

This extension adds support for the `ShaderViewportIndexLayerEXT`
capability from the `SPV_EXT_shader_viewport_index_layer` extension in
Vulkan.

This extension allows variables decorated with the `Layer` and
`ViewportIndex` built-ins to be exported from vertex or tessellation
shaders, using the `ShaderViewportIndexLayerEXT` capability.

When using GLSL source-based shading languages, the `gl_ViewportIndex`
and `gl_Layer` built-in variables map to the SPIR-V `ViewportIndex`
and `Layer` built-in decorations, respectively.
Behavior of these variables is extended as described in the
`GL_ARB_shader_viewport_layer_array` (or the precursor
`GL_AMD_vertex_shader_layer`, `GL_AMD_vertex_shader_viewport_index`, and
`GL_NV_viewport_array2` extensions).

|  | The `ShaderViewportIndexLayerEXT` capability is equivalent to the
| --- | --- |
`ShaderViewportIndexLayerNV` capability added by
`[VK_NV_viewport_array2](VK_NV_viewport_array2.html)`. |

All functionality in this extension is included in core Vulkan 1.2.

The single `ShaderViewportIndexLayerEXT` capability from the
`SPV_EXT_shader_viewport_index_layer` extension is replaced by the
[`ShaderViewportIndex`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderViewportIndex) and [`ShaderLayer`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderLayer) capabilities from SPIR-V 1.5 which are enabled by the
[`shaderOutputViewportIndex`](../../../../spec/latest/chapters/features.html#features-shaderOutputViewportIndex) and
[`shaderOutputLayer`](../../../../spec/latest/chapters/features.html#features-shaderOutputLayer) features,
respectively.
Additionally, if Vulkan 1.2 is supported but this extension is not, these
capabilities are optional.

Enabling both features is equivalent to enabling the
`VK_EXT_shader_viewport_index_layer` extension.

* 
`VK_EXT_SHADER_VIEWPORT_INDEX_LAYER_EXTENSION_NAME`

* 
`VK_EXT_SHADER_VIEWPORT_INDEX_LAYER_SPEC_VERSION`

* 
(modified) [`Layer`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-layer)

* 
(modified)
[`ViewportIndex`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-viewportindex)

* 
[    `ShaderViewportIndexLayerEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderViewportIndexLayerEXT)

* 
Revision 1, 2017-08-08 (Daniel Koch)

Internal drafts

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_viewport_index_layer).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
