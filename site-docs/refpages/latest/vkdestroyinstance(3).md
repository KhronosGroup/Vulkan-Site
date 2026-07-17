# vkDestroyInstance(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyInstance.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyInstance - Destroy an instance of Vulkan

To destroy an instance, call:

// Provided by VK_VERSION_1_0
void vkDestroyInstance(
    VkInstance                                  instance,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the handle of the instance to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Prior to destroying an instance, an application is responsible for
destroying/freeing any Vulkan objects with explicit `vkDestroy*` or
`vkFree*` commands that were created using that instance, or any
[VkPhysicalDevice](VkPhysicalDevice.html) object retrieved from it, as the first parameter of
the corresponding `vkCreate*` or `vkAllocate*` command.

Valid Usage

* 
[](#VUID-vkDestroyInstance-instance-00629) VUID-vkDestroyInstance-instance-00629

All child objects that were created with `instance` or with a
[VkPhysicalDevice](VkPhysicalDevice.html) retrieved from it, and that **can** be destroyed or
freed, **must** have been destroyed or freed prior to destroying
`instance`

* 
[](#VUID-vkDestroyInstance-instance-00630) VUID-vkDestroyInstance-instance-00630

If `VkAllocationCallbacks` were provided when `instance` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyInstance-instance-00631) VUID-vkDestroyInstance-instance-00631

If no `VkAllocationCallbacks` were provided when `instance` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyInstance-instance-parameter) VUID-vkDestroyInstance-instance-parameter

 If `instance` is not `NULL`, `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkDestroyInstance-pAllocator-parameter) VUID-vkDestroyInstance-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

Host Synchronization

* 
Host access to `instance` **must** be externally synchronized

* 
Host access to all `VkPhysicalDevice` objects enumerated from `instance` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#vkDestroyInstance).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
