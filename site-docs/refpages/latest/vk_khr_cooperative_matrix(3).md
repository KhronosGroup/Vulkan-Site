# VK_KHR_cooperative_matrix(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_cooperative_matrix.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_cooperative_matrix](#VK_KHR_cooperative_matrix)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_cooperative_matrix - device extension

**Name String**

`VK_KHR_cooperative_matrix`

**Extension Type**

Device extension

**Registered Extension Number**

507

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_cooperative_matrix](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_cooperative_matrix.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_cooperative_matrix] @kpet%0A*Here describe the issue or question you have about the VK_KHR_cooperative_matrix extension*)

**Extension Proposal**

[VK_KHR_cooperative_matrix](../../../../features/latest/features/proposals/VK_KHR_cooperative_matrix.html)

**Last Modified Date**

2023-05-03

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_KHR_cooperative_matrix`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/khr/GLSL_KHR_cooperative_matrix.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Markus Tavenrath, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Kevin Petit, Arm Ltd.

* 
Boris Zanin, AMD

This extension adds support for using cooperative matrix types in SPIR-V.
Cooperative matrix types are medium-sized matrices that are primarily
supported in compute shaders, where the storage for the matrix is spread
across all invocations in some scope (usually a subgroup) and those
invocations cooperate to efficiently perform matrix multiplies.

Cooperative matrix types are defined by the
[`SPV_KHR_cooperative_matrix`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_cooperative_matrix.html)
SPIR-V extension and can be used with the
[`GLSL_KHR_cooperative_matrix`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/khr/GLSL_KHR_cooperative_matrix.txt)
GLSL extension.

This extension includes support for enumerating the matrix types and
dimensions that are supported by the implementation.

* 
[vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR](vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR.html)

* 
[VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrixFeaturesKHR](VkPhysicalDeviceCooperativeMatrixFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCooperativeMatrixPropertiesKHR](VkPhysicalDeviceCooperativeMatrixPropertiesKHR.html)

* 
[VkComponentTypeKHR](VkComponentTypeKHR.html)

* 
[VkScopeKHR](VkScopeKHR.html)

* 
`VK_KHR_COOPERATIVE_MATRIX_EXTENSION_NAME`

* 
`VK_KHR_COOPERATIVE_MATRIX_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_KHR](VkStructureType.html)

* 
[CooperativeMatrixKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixKHR)

1.) How does cooperativeMatrixRobustBufferAccess interact with
nullDescriptor?

**RESOLVED**: nullDescriptor is not allowed here While drivers can handle
going OOB into a buffer, if there is not buffer, via nullDescriptor, it is
invalid to load/store from the cooperative matrix.

* 
Revision 2, 2023-05-03 (Kevin Petit)

First KHR revision

Revision 1, 2019-02-05 (Jeff Bolz)

* 
NVIDIA vendor extension

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_cooperative_matrix).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
