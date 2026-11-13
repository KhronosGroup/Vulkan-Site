# vkDestroyValidationCacheEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyValidationCacheEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyValidationCacheEXT - Destroy a validation cache object

To destroy a validation cache, call:

// Provided by VK_EXT_validation_cache
void vkDestroyValidationCacheEXT(
    VkDevice                                    device,
    VkValidationCacheEXT                        validationCache,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the validation cache
object.

* 
`validationCache` is the handle of the validation cache to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-01537) VUID-vkDestroyValidationCacheEXT-validationCache-01537

If `VkAllocationCallbacks` were provided when `validationCache`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-01538) VUID-vkDestroyValidationCacheEXT-validationCache-01538

If no `VkAllocationCallbacks` were provided when
`validationCache` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyValidationCacheEXT-device-parameter) VUID-vkDestroyValidationCacheEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-parameter) VUID-vkDestroyValidationCacheEXT-validationCache-parameter

 If `validationCache` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `validationCache` **must** be a valid [VkValidationCacheEXT](VkValidationCacheEXT.html) handle

* 
[](#VUID-vkDestroyValidationCacheEXT-pAllocator-parameter) VUID-vkDestroyValidationCacheEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-parent) VUID-vkDestroyValidationCacheEXT-validationCache-parent

 If `validationCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `validationCache` **must** be externally synchronized

[VK_EXT_validation_cache](VK_EXT_validation_cache.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkValidationCacheEXT](VkValidationCacheEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkDestroyValidationCacheEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
