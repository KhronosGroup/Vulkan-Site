# VkRayTracingInvocationReorderModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingInvocationReorderModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingInvocationReorderModeEXT - Enum providing a hint on how the application **may** reorder

Values which **may** be returned in the
`rayTracingInvocationReorderReorderingHint` field of
`VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT`
or
`VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV`
are:

// Provided by VK_EXT_ray_tracing_invocation_reorder
typedef enum VkRayTracingInvocationReorderModeEXT {
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_EXT = 0,
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT = 1,
  // Provided by VK_NV_ray_tracing_invocation_reorder
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_NV = VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_EXT,
  // Provided by VK_NV_ray_tracing_invocation_reorder
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_NV = VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT,
} VkRayTracingInvocationReorderModeEXT;

// Provided by VK_NV_ray_tracing_invocation_reorder
// Equivalent to VkRayTracingInvocationReorderModeEXT
typedef VkRayTracingInvocationReorderModeEXT VkRayTracingInvocationReorderModeNV;

* 
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_EXT](#) specifies that the
implementation does not reorder at reorder calls.

* 
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT](#) specifies that
the implementation **may** reorder at reorder calls.

[VK_EXT_ray_tracing_invocation_reorder](VK_EXT_ray_tracing_invocation_reorder.html), [VK_NV_ray_tracing_invocation_reorder](VK_NV_ray_tracing_invocation_reorder.html), [VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT](VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT.html), [VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV](VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkRayTracingInvocationReorderModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
