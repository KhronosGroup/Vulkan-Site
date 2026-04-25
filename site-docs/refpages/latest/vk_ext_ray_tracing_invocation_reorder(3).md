# VK_EXT_ray_tracing_invocation_reorder(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_ray_tracing_invocation_reorder.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_ray_tracing_invocation_reorder](#VK_EXT_ray_tracing_invocation_reorder)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_ray_tracing_invocation_reorder - device extension

**Name String**

`VK_EXT_ray_tracing_invocation_reorder`

**Extension Type**

Device extension

**Registered Extension Number**

582

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_invocation_reorder](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_invocation_reorder.html)

**Contact**

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_ray_tracing_invocation_reorder] @ewerness-nv%0A*Here describe the issue or question you have about the VK_EXT_ray_tracing_invocation_reorder extension*)

**Extension Proposal**

[VK_EXT_ray_tracing_invocation_reorder](../../../../features/latest/features/proposals/VK_EXT_ray_tracing_invocation_reorder.html)

**Last Modified Date**

2025-11-12

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shader_invocation_reorder`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_shader_invocation_reorder.txt)

**Contributors**

* 
Eric Werness, NVIDIA

* 
Ashwin Lele, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Vikram Kushwaha, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Stu Smith, AMD

* 
Aaron Hagan, AMD

* 
Tyler Nowicki, AMD

* 
Sebastian Neubauer, AMD

* 
Radoslaw Drabinski, Intel

* 
Sven Woop, Intel

* 
Aleksandra Krstic, QUALCOMM

* 
Andrew Garrard, Imagination Technologies

* 
Mathieu Robart, Arm Limited

* 
Tom Olson, Khronos

* 
Ralph Potter, Samsung Electronics

* 
Antonio Caggiano, LunarG

The ray tracing pipeline API provides some ability to reorder for locality,
but it is useful to have more control over how the reordering happens and
what information is included in the reordering.
The shader API provides a hit object to contain result information from the
hit which can be used as part of the explicit sorting plus options that
contain an integer for hint bits to use to add more coherency.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT](VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT](VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT.html)

* 
[VkRayTracingInvocationReorderModeEXT](VkRayTracingInvocationReorderModeEXT.html)

* 
`VK_EXT_RAY_TRACING_INVOCATION_REORDER_EXTENSION_NAME`

* 
`VK_EXT_RAY_TRACING_INVOCATION_REORDER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2025-11-12 (Eric Werness)

Internal development - forked from NV

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_ray_tracing_invocation_reorder).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
