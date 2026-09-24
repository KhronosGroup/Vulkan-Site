# vkDestroyAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyAccelerationStructureKHR - Destroy an acceleration structure object

To destroy an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
void vkDestroyAccelerationStructureKHR(
    VkDevice                                    device,
    VkAccelerationStructureKHR                  accelerationStructure,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the acceleration
structure.

* 
`accelerationStructure` is the acceleration structure to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-08934) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-08934

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02442) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02442

All submitted commands that refer to `accelerationStructure` **must**
have completed execution

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02443) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02443

If `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02444) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02444

If no `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyAccelerationStructureKHR-device-parameter) VUID-vkDestroyAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parameter) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkDestroyAccelerationStructureKHR-pAllocator-parameter) VUID-vkDestroyAccelerationStructureKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parent) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parent

 If `accelerationStructure` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `accelerationStructure` **must** be externally synchronized

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
