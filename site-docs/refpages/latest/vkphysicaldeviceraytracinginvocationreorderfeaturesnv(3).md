# VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV - Structure describing feature to control ray tracing invocation reordering

The `VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV` structure is
defined as:

// Provided by VK_NV_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingInvocationReorder;
} VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`rayTracingInvocationReorder` indicates that the implementation
supports `SPV_NV_shader_invocation_reorder`.

If the `VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_ray_tracing_invocation_reorder](VK_NV_ray_tracing_invocation_reorder.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
