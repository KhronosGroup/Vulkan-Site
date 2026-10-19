# VK_KHR_compute_shader_derivatives(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_compute_shader_derivatives.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_compute_shader_derivatives](#VK_KHR_compute_shader_derivatives)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capability](#_new_spir_v_capability)
- [New_SPIR-V_Capability](#_new_spir_v_capability)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_compute_shader_derivatives - device extension

**Name String**

`VK_KHR_compute_shader_derivatives`

**Extension Type**

Device extension

**Registered Extension Number**

512

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
[SPV_KHR_compute_shader_derivatives](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_compute_shader_derivatives.html)

**Contact**

* 
Jean-Noe Morissette [MagicPoncho](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_compute_shader_derivatives] @MagicPoncho%0A*Here describe the issue or question you have about the VK_KHR_compute_shader_derivatives extension*)

**Extension Proposal**

[VK_KHR_compute_shader_derivatives](../../../../features/latest/features/proposals/VK_KHR_compute_shader_derivatives.html)

**Last Modified Date**

2024-06-26

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_KHR_compute_shader_derivatives`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_compute_shader_derivatives.html)

* 
This extension provides API support for
[`GL_KHR_compute_shader_derivatives`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/khr/GLSL_KHR_compute_shader_derivatives.txt)

**Contributors**

* 
Jean-Noe Morissette, Epic Games

* 
Daniel Koch, NVIDIA

* 
Pat Brown, NVIDIA

* 
Stu Smith, AMD

* 
Jan-Harald Fredriksen, Arm

* 
Tobias Hector, AMD

* 
Ralph Potter, Samsung

* 
Pan Gao, Huawei

* 
Samuel (Sheng-Wen) Huang, MediaTek

* 
Graeme Leese, Broadcom

* 
Hans-Kristian Arntzen, Valve

* 
Matthew Netsch, Qualcomm

This extension adds Vulkan support for the
[`SPV_KHR_compute_shader_derivatives`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_compute_shader_derivatives.html)
SPIR-V extension.

The SPIR-V extension provides two new execution modes, both of which allow
execution models with defined workgroups to use built-ins that evaluate
derivatives explicitly or implicitly.
Derivatives will be computed via differencing over a 2x2 group of shader
invocations.
The `DerivativeGroupQuadsKHR` execution mode assembles shader invocations
into 2x2 groups, where each group has x and y coordinates of the local
invocation ID of the form (2m+{0,1}, 2n+{0,1}).
The `DerivativeGroupLinearKHR` execution mode assembles shader
invocations into 2x2 groups, where each group has local invocation index
values of the form 4m+{0,1,2,3}.

The new execution modes are supported in compute shaders and optionally (see
[meshAndTaskShaderDerivatives](../../../../spec/latest/chapters/limits.html#limits-meshAndTaskShaderDerivatives)) in
mesh and task shaders.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR](VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR](VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR.html)

* 
`VK_KHR_COMPUTE_SHADER_DERIVATIVES_EXTENSION_NAME`

* 
`VK_KHR_COMPUTE_SHADER_DERIVATIVES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_PROPERTIES_KHR](VkStructureType.html)

* 
[    `ComputeDerivativeGroupQuadsKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ComputeDerivativeGroupQuadsKHR)

* 
[    `ComputeDerivativeGroupLinearKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ComputeDerivativeGroupLinearKHR)

None.

* 
Revision 1, 2023-02-27 (Jean-Noe Morissette)

Initial draft

* 
Add properties and clarify mesh and task support (Daniel Koch)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_compute_shader_derivatives).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
