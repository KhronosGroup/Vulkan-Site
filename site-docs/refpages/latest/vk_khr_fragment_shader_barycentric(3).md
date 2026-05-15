# VK_KHR_fragment_shader_barycentric(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_fragment_shader_barycentric.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_fragment_shader_barycentric](#VK_KHR_fragment_shader_barycentric)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
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

VK_KHR_fragment_shader_barycentric - device extension

**Name String**

`VK_KHR_fragment_shader_barycentric`

**Extension Type**

Device extension

**Registered Extension Number**

323

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_fragment_shader_barycentric](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_fragment_shader_barycentric.html)

**Contact**

* 
Stu Smith

**Extension Proposal**

[VK_KHR_fragment_shader_barycentric](../../../../features/latest/features/proposals/VK_KHR_fragment_shader_barycentric.html)

**Last Modified Date**

2022-03-10

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_fragment_shader_barycentric`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_fragment_shader_barycentric.txt)

**Contributors**

* 
Stu Smith, AMD

* 
Tobias Hector, AMD

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, Arm

* 
Slawek Grajewski, Intel

* 
Pat Brown, NVIDIA

* 
Hans-Kristian Arntzen, Valve

* 
Contributors to the VK_NV_fragment_shader_barycentric specification

This extension is based on the `[VK_NV_fragment_shader_barycentric](VK_NV_fragment_shader_barycentric.html)`
extension, and adds support for the following SPIR-V extension in Vulkan:

* 
[`SPV_KHR_fragment_shader_barycentric`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_fragment_shader_barycentric.html)

The extension provides access to three additional fragment shader variable
decorations in SPIR-V:

* 
`PerVertexKHR`, which indicates that a fragment shader input will not
have interpolated values, but instead must be accessed with an extra
array index that identifies one of the vertices of the primitive
producing the fragment

* 
`BaryCoordKHR`, which indicates that the variable is a
three-component floating-point vector holding barycentric weights for
the fragment produced using perspective interpolation

* 
`BaryCoordNoPerspKHR`, which indicates that the variable is a
three-component floating-point vector holding barycentric weights for
the fragment produced using linear interpolation

When using GLSL source-based shader languages, the following variables from
`GL_EXT_fragment_shader_barycentric` map to these SPIR-V built-in
decorations:

* 
`in vec3 gl_BaryCoordEXT;` → `BaryCoordKHR`

* 
`in vec3 gl_BaryCoordNoPerspEXT;` → `BaryCoordNoPerspKHR`

GLSL variables declared using the `pervertexEXT` GLSL qualifier are
expected to be decorated with `PerVertexKHR` in SPIR-V.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR](VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR](VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR.html)

* 
`VK_KHR_FRAGMENT_SHADER_BARYCENTRIC_EXTENSION_NAME`

* 
`VK_KHR_FRAGMENT_SHADER_BARYCENTRIC_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_PROPERTIES_KHR](VkStructureType.html)

* 
[`BaryCoordKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-barycoordkhr)

* 
[`BaryCoordNoPerspKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-barycoordnoperspkhr)

* 
[`PerVertexKHR`](../../../../spec/latest/chapters/shaders.html#shaders-interpolation-decorations-pervertexkhr)

* 
[    `FragmentBarycentricKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentBarycentricKHR)

1) What are the interactions with MSAA and how are `BaryCoordKHR` and
`BaryCoordNoPerspKHR` interpolated?

**RESOLVED**: The inputs decorated with `BaryCoordKHR` or
`BaryCoordNoPerspKHR` **may** also be decorated with the `Centroid` or
`Sample` qualifiers to specify interpolation, like any other fragment
shader input.
If the [`shaderSampleRateInterpolationFunctions`](../../../../spec/latest/chapters/features.html#features-shaderSampleRateInterpolationFunctions) feature is enabled, the
extended instructions InterpolateAtCentroid, InterpolateAtOffset, and
InterpolateAtSample from the GLSL.std.450 **may** also be used with inputs
decorated with `BaryCoordKHR` or `BaryCoordNoPerspKHR`.

* 
Revision 1, 2022-03-10 (Stu Smith)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_fragment_shader_barycentric).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
