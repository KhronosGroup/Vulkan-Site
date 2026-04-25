# VkAccelerationStructureInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureInfoNV - Structure specifying the parameters of acceleration structure object

The `VkAccelerationStructureInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkAccelerationStructureInfoNV {
    VkStructureType                        sType;
    const void*                            pNext;
    VkAccelerationStructureTypeNV          type;
    VkBuildAccelerationStructureFlagsNV    flags;
    uint32_t                               instanceCount;
    uint32_t                               geometryCount;
    const VkGeometryNV*                    pGeometries;
} VkAccelerationStructureInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkAccelerationStructureTypeNV](VkAccelerationStructureTypeKHR.html) value specifying the
type of acceleration structure that will be created.

* 
`flags` is a bitmask of [VkBuildAccelerationStructureFlagBitsNV](VkBuildAccelerationStructureFlagBitsKHR.html)
specifying additional parameters of the acceleration structure.

* 
`instanceCount` specifies the number of instances that will be in
the new acceleration structure.

* 
`geometryCount` specifies the number of geometries that will be in
the new acceleration structure.

* 
`pGeometries` is a pointer to an array of `geometryCount`
[VkGeometryNV](VkGeometryNV.html) structures containing the scene data being passed
into the acceleration structure.

`VkAccelerationStructureInfoNV` contains information that is used both
for acceleration structure creation with
[vkCreateAccelerationStructureNV](vkCreateAccelerationStructureNV.html) and in combination with the actual
geometric data to build the acceleration structure with
[vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html).

Valid Usage

* 
[](#VUID-VkAccelerationStructureInfoNV-geometryCount-02422) VUID-VkAccelerationStructureInfoNV-geometryCount-02422

`geometryCount` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxGeometryCount`

* 
[](#VUID-VkAccelerationStructureInfoNV-instanceCount-02423) VUID-VkAccelerationStructureInfoNV-instanceCount-02423

`instanceCount` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxInstanceCount`

* 
[](#VUID-VkAccelerationStructureInfoNV-maxTriangleCount-02424) VUID-VkAccelerationStructureInfoNV-maxTriangleCount-02424

The total number of triangles in all geometries **must** be less than or
equal to
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxTriangleCount`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-02425) VUID-VkAccelerationStructureInfoNV-type-02425

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_NV](VkAccelerationStructureTypeKHR.html) then
`geometryCount` **must** be `0`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-02426) VUID-VkAccelerationStructureInfoNV-type-02426

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV](VkAccelerationStructureTypeKHR.html)
then `instanceCount` **must** be `0`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-02786) VUID-VkAccelerationStructureInfoNV-type-02786

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV](VkAccelerationStructureTypeKHR.html)
then the `geometryType` member of each geometry in `pGeometries`
**must** be the same

* 
[](#VUID-VkAccelerationStructureInfoNV-type-04623) VUID-VkAccelerationStructureInfoNV-type-04623

`type` **must** not be [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-VkAccelerationStructureInfoNV-flags-02592) VUID-VkAccelerationStructureInfoNV-flags-02592

If `flags` has the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) bit set,
then it **must** not have the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) bit set

* 
[](#VUID-VkAccelerationStructureInfoNV-scratch-02781) VUID-VkAccelerationStructureInfoNV-scratch-02781

`scratch` **must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkAccelerationStructureInfoNV-instanceData-02782) VUID-VkAccelerationStructureInfoNV-instanceData-02782

If `instanceData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `instanceData`
**must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureInfoNV-sType-sType) VUID-VkAccelerationStructureInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureInfoNV-pNext-pNext) VUID-VkAccelerationStructureInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-parameter) VUID-VkAccelerationStructureInfoNV-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeNV](VkAccelerationStructureTypeKHR.html) value

* 
[](#VUID-VkAccelerationStructureInfoNV-flags-parameter) VUID-VkAccelerationStructureInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsNV](VkBuildAccelerationStructureFlagBitsKHR.html) values

* 
[](#VUID-VkAccelerationStructureInfoNV-pGeometries-parameter) VUID-VkAccelerationStructureInfoNV-pGeometries-parameter

 If `geometryCount` is not `0`, `pGeometries` **must** be a valid pointer to an array of `geometryCount` valid [VkGeometryNV](VkGeometryNV.html) structures

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html), [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html), [VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html), [VkGeometryNV](VkGeometryNV.html), [VkStructureType](VkStructureType.html), [vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
