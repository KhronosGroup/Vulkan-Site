# VK_NV_compute_shader_derivatives(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_compute_shader_derivatives.html

## Table of Contents

- [Name](#_name)
- [VK_NV_compute_shader_derivatives](#VK_NV_compute_shader_derivatives)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capability](#_new_spir_v_capability)
- [New_SPIR-V_Capability](#_new_spir_v_capability)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_compute_shader_derivatives - device extension

**Name String**

`VK_NV_compute_shader_derivatives`

**Extension Type**

Device extension

**Registered Extension Number**

202

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
[SPV_NV_compute_shader_derivatives](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_compute_shader_derivatives.html)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_compute_shader_derivatives](VK_KHR_compute_shader_derivatives.html)
extension

**Contact**

* 
Pat Brown [nvpbrown](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_compute_shader_derivatives] @nvpbrown%0A*Here describe the issue or question you have about the VK_NV_compute_shader_derivatives extension*)

**Last Modified Date**

2018-07-19

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_compute_shader_derivatives`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_compute_shader_derivatives.txt)

**Contributors**

* 
Pat Brown, NVIDIA

This extension adds Vulkan support for the
[`SPV_NV_compute_shader_derivatives`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_compute_shader_derivatives.html)
SPIR-V extension.

The SPIR-V extension provides two new execution modes, both of which allow
compute shaders to use built-ins that evaluate compute derivatives
explicitly or implicitly.
Derivatives will be computed via differencing over a 2x2 group of shader
invocations.
The `DerivativeGroupQuadsNV` execution mode assembles shader invocations
into 2x2 groups, where each group has x and y coordinates of the local
invocation ID of the form (2m+{0,1}, 2n+{0,1}).
The `DerivativeGroupLinearNV` execution mode assembles shader invocations
into 2x2 groups, where each group has local invocation index values of the
form 4m+{0,1,2,3}.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceComputeShaderDerivativesFeaturesNV](VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR.html)

* 
`VK_NV_COMPUTE_SHADER_DERIVATIVES_EXTENSION_NAME`

* 
`VK_NV_COMPUTE_SHADER_DERIVATIVES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_NV](VkStructureType.html)

* 
[    `ComputeDerivativeGroupQuadsNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ComputeDerivativeGroupQuadsKHR)

* 
[    `ComputeDerivativeGroupLinearNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ComputeDerivativeGroupLinearKHR)

(1) Should we specify that the groups of four shader invocations used for
derivatives in a compute shader are the same groups of four invocations that
form a “quad” in shader subgroups?

**RESOLVED**: Yes.

None.

* 
Revision 1, 2018-07-19 (Pat Brown)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_compute_shader_derivatives).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
