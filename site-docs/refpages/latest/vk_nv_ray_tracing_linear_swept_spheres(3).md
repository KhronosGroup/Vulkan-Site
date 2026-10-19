# VK_NV_ray_tracing_linear_swept_spheres(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_ray_tracing_linear_swept_spheres.html

## Table of Contents

- [Name](#_name)
- [VK_NV_ray_tracing_linear_swept_spheres](#VK_NV_ray_tracing_linear_swept_spheres)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
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

VK_NV_ray_tracing_linear_swept_spheres - device extension

**Name String**

`VK_NV_ray_tracing_linear_swept_spheres`

**Extension Type**

Device extension

**Registered Extension Number**

430

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

**SPIR-V Dependencies**

* 
[SPV_NV_linear_swept_spheres](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_linear_swept_spheres.html)

**Contact**

* 
Vikram Kushwaha [vkushwaha](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_ray_tracing_linear_swept_spheres] @vkushwaha%0A*Here describe the issue or question you have about the VK_NV_ray_tracing_linear_swept_spheres extension*)

**Extension Proposal**

[VK_NV_ray_tracing_linear_swept_spheres](../../../../features/latest/features/proposals/VK_NV_ray_tracing_linear_swept_spheres.html)

**Last Modified Date**

2025-01-03

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_NV_linear_swept_spheres`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_linear_swept_spheres.html)

* 
This extension provides API support for
[`GL_NV_linear_swept_spheres`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_linear_swept_spheres.txt)

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Eric Werness, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Ashwin Lele, NVIDIA

* 
Nathan Morrical, NVIDIA

This extension adds two new primitives for ray tracing: a sphere primitive
and a linear swept sphere (LSS) primitive.
The purpose of the LSS primitive is to enable rendering of high quality hair
and fur using a compact primitive representation encoded in the acceleration
structure.
Sphere primitives are defined by a position and a radius and are a subset of
LSS, but are useful in their own right, for example for particle systems.

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_NV_linear_swept_spheres`

* 
Extending [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html):

[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)

* 
[VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV](VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV.html)

* 
[VkRayTracingLssIndexingModeNV](VkRayTracingLssIndexingModeNV.html)

* 
[VkRayTracingLssPrimitiveEndCapsModeNV](VkRayTracingLssPrimitiveEndCapsModeNV.html)

* 
`VK_NV_RAY_TRACING_LINEAR_SWEPT_SPHERES_EXTENSION_NAME`

* 
`VK_NV_RAY_TRACING_LINEAR_SWEPT_SPHERES_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](VkFormatFeatureFlagBits2.html)

Extending [VkGeometryTypeKHR](VkGeometryTypeKHR.html):

* 
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](VkGeometryTypeKHR.html)

* 
[VK_GEOMETRY_TYPE_SPHERES_NV](VkGeometryTypeKHR.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_SPHERES_AND_LINEAR_SWEPT_SPHERES_BIT_NV](VkPipelineCreateFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_LINEAR_SWEPT_SPHERES_DATA_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_SPHERES_DATA_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_LINEAR_SWEPT_SPHERES_FEATURES_NV](VkStructureType.html)

* 
[`HitIsSphereNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitissphere)

* 
[`HitIsLSSNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitislss)

* 
[`HitSpherePositionNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitsphereposition)

* 
[`HitSphereRadiusNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitsphereradius)

* 
[`HitLSSPositionsNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitlsspositions)

* 
[`HitLSSRadiiNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-hitlssradii)

* 
[    `RayTracingSpheresGeometryNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTracingSpheresGeometryNV)

* 
[    `RayTracingLinearSweptSpheresGeometryNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTracingLinearSweptSpheresGeometryNV)

* 
Revision 1, 2025-01-03 (Vikram Kushwaha)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_ray_tracing_linear_swept_spheres).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
