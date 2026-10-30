# VK_NV_fragment_shader_barycentric(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_fragment_shader_barycentric.html

## Table of Contents

- [Name](#_name)
- [VK_NV_fragment_shader_barycentric](#VK_NV_fragment_shader_barycentric)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_fragment_shader_barycentric](#_promotion_to_vk_khr_fragment_shader_barycentric)
- [Promotion_to_VK_KHR_fragment_shader_barycentric](#_promotion_to_vk_khr_fragment_shader_barycentric)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Decorations](#_new_spir_v_decorations)
- [New_SPIR-V_Decorations](#_new_spir_v_decorations)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_fragment_shader_barycentric - device extension

**Name String**

`VK_NV_fragment_shader_barycentric`

**Extension Type**

Device extension

**Registered Extension Number**

204

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_NV_fragment_shader_barycentric](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_fragment_shader_barycentric.html)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_fragment_shader_barycentric](VK_KHR_fragment_shader_barycentric.html)
extension

**Contact**

* 
Pat Brown [nvpbrown](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_fragment_shader_barycentric] @nvpbrown%0A*Here describe the issue or question you have about the VK_NV_fragment_shader_barycentric extension*)

**Last Modified Date**

2018-08-03

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_fragment_shader_barycentric`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_fragment_shader_barycentric.txt)

**Contributors**

* 
Pat Brown, NVIDIA

* 
Daniel Koch, NVIDIA

This extension adds support for the following SPIR-V extension in Vulkan:

* 
[`SPV_NV_fragment_shader_barycentric`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_fragment_shader_barycentric.html)

The extension provides access to three additional fragment shader variable
decorations in SPIR-V:

* 
`PerVertexNV`, which indicates that a fragment shader input will not
have interpolated values, but instead must be accessed with an extra
array index that identifies one of the vertices of the primitive
producing the fragment

* 
`BaryCoordNV`, which indicates that the variable is a three-component
floating-point vector holding barycentric weights for the fragment
produced using perspective interpolation

* 
`BaryCoordNoPerspNV`, which indicates that the variable is a
three-component floating-point vector holding barycentric weights for
the fragment produced using linear interpolation

When using GLSL source-based shader languages, the following variables from
`GL_NV_fragment_shader_barycentric` maps to these SPIR-V built-in
decorations:

* 
`in vec3 gl_BaryCoordNV;` → `BaryCoordNV`

* 
`in vec3 gl_BaryCoordNoPerspNV;` → `BaryCoordNoPerspNV`

GLSL variables declared using the `__pervertexNV` GLSL qualifier are
expected to be decorated with `PerVertexNV` in SPIR-V.

All functionality in this extension is included in
`[VK_KHR_fragment_shader_barycentric](VK_KHR_fragment_shader_barycentric.html)`, with the suffix changed to KHR.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentShaderBarycentricFeaturesNV](VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR.html)

* 
`VK_NV_FRAGMENT_SHADER_BARYCENTRIC_EXTENSION_NAME`

* 
`VK_NV_FRAGMENT_SHADER_BARYCENTRIC_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_NV](VkStructureType.html)

* 
[`BaryCoordNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-barycoordkhr)

* 
[`BaryCoordNoPerspNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-barycoordnoperspkhr)

* 
[`PerVertexNV`](../../../../spec/latest/chapters/shaders.html#shaders-interpolation-decorations-pervertexkhr)

* 
[    `FragmentBarycentricNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentBarycentricKHR)

(1) The AMD_shader_explicit_vertex_parameter extension provides similar
    functionality.
    Why write a new extension, and how is this extension different?

**RESOLVED**: For the purposes of Vulkan/SPIR-V, we chose to implement a
separate extension due to several functional differences.

First, the hardware supporting this extension can provide a three-component
barycentric weight vector for variables decorated with `BaryCoordNV`,
while variables decorated with `BaryCoordSmoothAMD` provide only two
components.
In some cases, it may be more efficient to explicitly interpolate an
attribute via:

float value = (baryCoordNV.x * v[0].attrib +
               baryCoordNV.y * v[1].attrib +
               baryCoordNV.z * v[2].attrib);

instead of

float value = (baryCoordSmoothAMD.x * (v[0].attrib - v[2].attrib) +
               baryCoordSmoothAMD.y * (v[1].attrib - v[2].attrib) +
               v[2].attrib);

Additionally, the semantics of the decoration `BaryCoordPullModelAMD` do
not appear to map to anything supported by the initial hardware
implementation of this extension.

This extension provides a smaller number of decorations than the AMD
extension, as we expect that shaders could derive variables decorated with
things like `BaryCoordNoPerspCentroidAMD` with explicit attribute
interpolation instructions.
One other relevant difference is that explicit per-vertex attribute access
using this extension does not require a constant vertex number.

(2) Why do the built-in SPIR-V decorations for this extension include two
separate built-ins `BaryCoordNV` and `BaryCoordNoPerspNV` when a “no
perspective” variable could be decorated with `BaryCoordNV` and
`NoPerspective`?

**RESOLVED**: The SPIR-V extension for this feature chose to mirror the
behavior of the GLSL extension, which provides two built-in variables.
Additionally, it is not clear that its a good idea (or even legal) to have
two variables using the “same attribute”, but with different interpolation
modifiers.

* 
Revision 1, 2018-08-03 (Pat Brown)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_fragment_shader_barycentric).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
