# VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT - Structure describing shader module identifier properties of an implementation

The `VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT` structure
is defined as:

// Provided by VK_EXT_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT {
    VkStructureType                         sType;
    void*                                   pNext;
    VkRayTracingInvocationReorderModeEXT    rayTracingInvocationReorderReorderingHint;
    uint32_t                                maxShaderBindingTableRecordIndex;
} VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rayTracingInvocationReorderReorderingHint` is a hint indicating if
the implementation **may** reorder at the reorder calls.

* 
`maxShaderBindingTableRecordIndex` is the maximum shader binding
table record index allowed to be passed in to
`OpHitObjectSetShaderBindingTableRecordIndexEXT`

If `rayTracingInvocationReorderReorderingHint` is
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT](VkRayTracingInvocationReorderModeEXT.html) there **must** exist
conditions under which the ordered set of invocations before a reorder
instruction is different than the ordered set of invocations after the
reorder instruction.
The ordering of a set of invocations is determined by the `SubgroupId` of
an invocation’s subgroup and the `SubGroupInvocationId` of an invocation
within that subgroup.

The reorder instructions are:

* 
`OpReorderThreadWithHintEXT`

* 
`OpReorderThreadWithHitObjectEXT`

* 
`OpHitObjectReorderExecuteShaderEXT`

* 
`OpHitObjectTraceReorderExecuteEXT`

* 
`OpHitObjectTraceMotionReorderExecuteEXT`

|  | Because the extension changes how hits are managed there is a compatibility
| --- | --- |
reason to expose the extension even when an implementation does not have
sorting active. |

If the `VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_ray_tracing_invocation_reorder](VK_EXT_ray_tracing_invocation_reorder.html), [VkRayTracingInvocationReorderModeEXT](VkRayTracingInvocationReorderModeEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
