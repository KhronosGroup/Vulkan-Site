# VK_NV_ray_tracing_motion_blur(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_ray_tracing_motion_blur.html

## Table of Contents

- [Name](#_name)
- [VK_NV_ray_tracing_motion_blur](#VK_NV_ray_tracing_motion_blur)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_ray_tracing_motion_blur - device extension

**Name String**

`VK_NV_ray_tracing_motion_blur`

**Extension Type**

Device extension

**Registered Extension Number**

328

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

**SPIR-V Dependencies**

* 
[SPV_NV_ray_tracing_motion_blur](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_ray_tracing_motion_blur.html)

**Contact**

* 
Eric Werness

**Last Modified Date**

2021-06-16

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_ray_tracing_motion_blur`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_ray_tracing_motion_blur.txt)

**Contributors**

* 
Eric Werness, NVIDIA

* 
Ashwin Lele, NVIDIA

Ray tracing support in the API provides an efficient mechanism to intersect
rays against static geometry, but rendering algorithms often want to support
motion, which is more efficiently supported with motion-specific algorithms.
This extension adds a set of mechanisms to support fast tracing of moving
geometry:

* 
A ray pipeline trace call which takes a time parameter

* 
Flags to enable motion support in an acceleration structure

* 
Support for time-varying vertex positions in a geometry

* 
Motion instances to move existing instances over time

The motion represented here is parameterized across a normalized timestep
between 0.0 and 1.0.
A motion trace using `OpTraceRayMotionNV` provides a time within that
normalized range to be used when intersecting that ray with geometry.
The geometry can be provided with motion by a combination of adding a second
vertex position for time of 1.0 using
`VkAccelerationStructureGeometryMotionTrianglesDataNV` and providing
multiple transforms in the instance using
`VkAccelerationStructureMotionInstanceNV`.

* 
[VkAccelerationStructureMatrixMotionInstanceNV](VkAccelerationStructureMatrixMotionInstanceNV.html)

* 
[VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html)

* 
[VkAccelerationStructureSRTMotionInstanceNV](VkAccelerationStructureSRTMotionInstanceNV.html)

* 
[VkSRTDataNV](VkSRTDataNV.html)

* 
Extending [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html):

[VkAccelerationStructureMotionInfoNV](VkAccelerationStructureMotionInfoNV.html)

Extending [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html):

* 
[VkAccelerationStructureGeometryMotionTrianglesDataNV](VkAccelerationStructureGeometryMotionTrianglesDataNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceRayTracingMotionBlurFeaturesNV](VkPhysicalDeviceRayTracingMotionBlurFeaturesNV.html)

* 
[VkAccelerationStructureMotionInstanceDataNV](VkAccelerationStructureMotionInstanceDataNV.html)

* 
[VkAccelerationStructureMotionInstanceTypeNV](VkAccelerationStructureMotionInstanceTypeNV.html)

* 
[VkAccelerationStructureMotionInfoFlagsNV](VkAccelerationStructureMotionInfoFlagsNV.html)

* 
[VkAccelerationStructureMotionInstanceFlagsNV](VkAccelerationStructureMotionInstanceFlagsNV.html)

* 
`VK_NV_RAY_TRACING_MOTION_BLUR_EXTENSION_NAME`

* 
`VK_NV_RAY_TRACING_MOTION_BLUR_SPEC_VERSION`

* 
Extending [VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html):

[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html)

Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

* 
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MOTION_TRIANGLES_DATA_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MOTION_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_MOTION_BLUR_FEATURES_NV](VkStructureType.html)

(1) What size is VkAccelerationStructureMotionInstanceNV?

* 
Added a note on the structure size and made the stride explicit in the
language.

(2) Allow arrayOfPointers for motion TLAS?

* 
Yes, with a packed encoding to minimize the amount of data sent for
metadata.

* 
Revision 1, 2020-06-16 (Eric Werness, Ashwin Lele)

Initial external release

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_ray_tracing_motion_blur).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
