# VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV - Structure describing shader module identifier properties of an implementation

The `VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV` structure
is defined as:

// Provided by VK_NV_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV {
    VkStructureType                         sType;
    void*                                   pNext;
    VkRayTracingInvocationReorderModeEXT    rayTracingInvocationReorderReorderingHint;
} VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rayTracingInvocationReorderReorderingHint` is a hint indicating if
the implementation will actually reorder at the reorder calls.

|  | Because the extension changes how hits are managed there is a compatibility
| --- | --- |
reason to expose the extension even when an implementation does not have
sorting active. |

If the `VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_ray_tracing_invocation_reorder](VK_NV_ray_tracing_invocation_reorder.html), [VkRayTracingInvocationReorderModeEXT](VkRayTracingInvocationReorderModeEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
