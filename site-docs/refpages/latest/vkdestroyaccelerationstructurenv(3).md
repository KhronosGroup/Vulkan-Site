# vkDestroyAccelerationStructureNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyAccelerationStructureNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyAccelerationStructureNV - Destroy an acceleration structure object

To destroy an acceleration structure, call:

// Provided by VK_NV_ray_tracing
void vkDestroyAccelerationStructureNV(
    VkDevice                                    device,
    VkAccelerationStructureNV                   accelerationStructure,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the buffer.

* 
`accelerationStructure` is the acceleration structure to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03752) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03752

All submitted commands that refer to `accelerationStructure` **must**
have completed execution

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03753) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03753

If `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03754) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03754

If no `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyAccelerationStructureNV-device-parameter) VUID-vkDestroyAccelerationStructureNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parameter) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkDestroyAccelerationStructureNV-pAllocator-parameter) VUID-vkDestroyAccelerationStructureNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parent) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parent

 If `accelerationStructure` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `accelerationStructure` **must** be externally synchronized

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyAccelerationStructureNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
