# vkDestroyDebugReportCallbackEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDebugReportCallbackEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDebugReportCallbackEXT - Destroy a debug report callback object

To destroy a `VkDebugReportCallbackEXT` object, call:

// Provided by VK_EXT_debug_report
void vkDestroyDebugReportCallbackEXT(
    VkInstance                                  instance,
    VkDebugReportCallbackEXT                    callback,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the instance where the callback was created.

* 
`callback` is the [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) object to destroy.
`callback` is an externally synchronized object and **must** not be
used on more than one thread at a time.
This means that `vkDestroyDebugReportCallbackEXT` **must** not be
called when a callback is active.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-instance-01242) VUID-vkDestroyDebugReportCallbackEXT-instance-01242

If `VkAllocationCallbacks` were provided when `callback` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-instance-01243) VUID-vkDestroyDebugReportCallbackEXT-instance-01243

If no `VkAllocationCallbacks` were provided when `callback` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-instance-parameter) VUID-vkDestroyDebugReportCallbackEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-callback-parameter) VUID-vkDestroyDebugReportCallbackEXT-callback-parameter

 If `callback` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `callback` **must** be a valid [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) handle

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-pAllocator-parameter) VUID-vkDestroyDebugReportCallbackEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-callback-parent) VUID-vkDestroyDebugReportCallbackEXT-callback-parent

 If `callback` is a valid handle, it **must** have been created, allocated, or retrieved from `instance`

Host Synchronization

* 
Host access to `callback` **must** be externally synchronized

[VK_EXT_debug_report](VK_EXT_debug_report.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkDestroyDebugReportCallbackEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
