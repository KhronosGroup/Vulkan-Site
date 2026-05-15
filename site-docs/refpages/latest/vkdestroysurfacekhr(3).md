# vkDestroySurfaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroySurfaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroySurfaceKHR - Destroy a VkSurfaceKHR object

To destroy a `VkSurfaceKHR` object, call:

// Provided by VK_KHR_surface
void vkDestroySurfaceKHR(
    VkInstance                                  instance,
    VkSurfaceKHR                                surface,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the instance used to create the surface.

* 
`surface` is the surface to destroy.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

Destroying a `VkSurfaceKHR` merely severs the connection between Vulkan
and the native surface, and does not imply destroying the native surface,
closing a window, or similar behavior.

Valid Usage

* 
[](#VUID-vkDestroySurfaceKHR-surface-01266) VUID-vkDestroySurfaceKHR-surface-01266

All `VkSwapchainKHR` objects created for `surface` **must** have
been destroyed prior to destroying `surface`

* 
[](#VUID-vkDestroySurfaceKHR-surface-01267) VUID-vkDestroySurfaceKHR-surface-01267

If `VkAllocationCallbacks` were provided when `surface` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySurfaceKHR-surface-01268) VUID-vkDestroySurfaceKHR-surface-01268

If no `VkAllocationCallbacks` were provided when `surface` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySurfaceKHR-instance-parameter) VUID-vkDestroySurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkDestroySurfaceKHR-surface-parameter) VUID-vkDestroySurfaceKHR-surface-parameter

 If `surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkDestroySurfaceKHR-pAllocator-parameter) VUID-vkDestroySurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroySurfaceKHR-surface-parent) VUID-vkDestroySurfaceKHR-surface-parent

 If `surface` is a valid handle, it **must** have been created, allocated, or retrieved from `instance`

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

[VK_KHR_surface](VK_KHR_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkDestroySurfaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
