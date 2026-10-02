# VkPhysicalDeviceRayTracingPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingPropertiesNV - Properties of the physical device for ray tracing

The `VkPhysicalDeviceRayTracingPropertiesNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkPhysicalDeviceRayTracingPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderGroupHandleSize;
    uint32_t           maxRecursionDepth;
    uint32_t           maxShaderGroupStride;
    uint32_t           shaderGroupBaseAlignment;
    uint64_t           maxGeometryCount;
    uint64_t           maxInstanceCount;
    uint64_t           maxTriangleCount;
    uint32_t           maxDescriptorSetAccelerationStructures;
} VkPhysicalDeviceRayTracingPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderGroupHandleSize` is the size in bytes of the shader header.

* 
 `maxRecursionDepth` is the maximum
number of levels of recursion allowed in a trace command.

* 
`maxShaderGroupStride` is the maximum stride in bytes allowed
between shader groups in the shader binding table.

* 
`shaderGroupBaseAlignment` is the **required** alignment in bytes for
the base of the shader binding table.

* 
`maxGeometryCount` is the maximum number of geometries in the bottom
level acceleration structure.

* 
`maxInstanceCount` is the maximum number of instances in the top
level acceleration structure.

* 
`maxTriangleCount` is the maximum number of triangles in all
geometries in the bottom level acceleration structure.

* 
`maxDescriptorSetAccelerationStructures` is the maximum number of
acceleration structure descriptors that are allowed in a descriptor set.

Due to the fact that the geometry, instance, and triangle counts are
specified at acceleration structure creation as 32-bit values,
`maxGeometryCount`, `maxInstanceCount`, and `maxTriangleCount`
**must** not exceed 232-1.

If the `VkPhysicalDeviceRayTracingPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Limits specified by this structure **must** match those specified with the same
name in [VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html) and
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPropertiesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceRayTracingPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
