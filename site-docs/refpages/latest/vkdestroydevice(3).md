# vkDestroyDevice(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDevice.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDevice - Destroy a logical device

To destroy a device, call:

// Provided by VK_VERSION_1_0
void vkDestroyDevice(
    VkDevice                                    device,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

To ensure that no work is active on the device, [vkDeviceWaitIdle](vkDeviceWaitIdle.html) **can**
be used to gate the destruction of the device.
Prior to destroying a device, an application is responsible for
destroying/freeing any Vulkan objects with explicit `vkDestroy*` or
`vkFree*` commands that were created using that device as the first
parameter of the corresponding `vkCreate*` or `vkAllocate*` command.

|  | The lifetime of each of these objects is bound by the lifetime of the
| --- | --- |
`VkDevice` object.
Therefore, to avoid resource leaks, it is critical that an application
explicitly free all of these resources prior to calling
`vkDestroyDevice`. |

Valid Usage

* 
[](#VUID-vkDestroyDevice-device-05137) VUID-vkDestroyDevice-device-05137

All child objects created on `device` that can be destroyed or freed
**must** have been destroyed or freed prior to destroying `device`

* 
[](#VUID-vkDestroyDevice-device-00379) VUID-vkDestroyDevice-device-00379

If `VkAllocationCallbacks` were provided when `device` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDevice-device-00380) VUID-vkDestroyDevice-device-00380

If no `VkAllocationCallbacks` were provided when `device` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDevice-device-parameter) VUID-vkDestroyDevice-device-parameter

 If `device` is not `NULL`, `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyDevice-pAllocator-parameter) VUID-vkDestroyDevice-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

Host Synchronization

* 
Host access to `device` **must** be externally synchronized

* 
Host access to all `VkQueue` objects created from `device` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkDestroyDevice).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
