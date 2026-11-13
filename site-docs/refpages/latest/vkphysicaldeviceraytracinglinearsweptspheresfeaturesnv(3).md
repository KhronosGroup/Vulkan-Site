# VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV - Structure describing the ray tracing linear swept spheres features that can be supported by an implementation

The `VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV` structure
is defined as:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef struct VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           spheres;
    VkBool32           linearSweptSpheres;
} VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `spheres` indicates whether the implementation
supports sphere primitives in ray tracing.

* 
 `linearSweptSpheres` indicates
whether the implementation supports linear swept sphere primitives in
ray tracing.

If the `VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_LINEAR_SWEPT_SPHERES_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_ray_tracing_linear_swept_spheres](VK_NV_ray_tracing_linear_swept_spheres.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
