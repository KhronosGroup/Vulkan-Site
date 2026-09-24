# vkDestroyDebugUtilsMessengerEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDebugUtilsMessengerEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDebugUtilsMessengerEXT - Destroy a debug messenger object

To destroy a `VkDebugUtilsMessengerEXT` object, call:

// Provided by VK_EXT_debug_utils
void vkDestroyDebugUtilsMessengerEXT(
    VkInstance                                  instance,
    VkDebugUtilsMessengerEXT                    messenger,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the instance where the callback was created.

* 
`messenger` is the [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) object to destroy.
`messenger` is an externally synchronized object and **must** not be
used on more than one thread at a time.
This means that `vkDestroyDebugUtilsMessengerEXT` **must** not be
called when a callback is active.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01915) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01915

If `VkAllocationCallbacks` were provided when `messenger` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01916) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01916

If no `VkAllocationCallbacks` were provided when `messenger` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-instance-parameter) VUID-vkDestroyDebugUtilsMessengerEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parameter) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parameter

 If `messenger` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `messenger` **must** be a valid [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) handle

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-pAllocator-parameter) VUID-vkDestroyDebugUtilsMessengerEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parent) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parent

 If `messenger` is a valid handle, it **must** have been created, allocated, or retrieved from `instance`

Host Synchronization

* 
Host access to `messenger` **must** be externally synchronized

The application **must** ensure that [vkDestroyDebugUtilsMessengerEXT](#) is
not executed in parallel with any Vulkan command that is also called with
`instance` or child of `instance` as the dispatchable argument.

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkDestroyDebugUtilsMessengerEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
