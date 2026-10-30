# vkCreateValidationCacheEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateValidationCacheEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateValidationCacheEXT - Creates a new validation cache

To create validation cache objects, call:

// Provided by VK_EXT_validation_cache
VkResult vkCreateValidationCacheEXT(
    VkDevice                                    device,
    const VkValidationCacheCreateInfoEXT*       pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkValidationCacheEXT*                       pValidationCache);

* 
`device` is the logical device that creates the validation cache
object.

* 
`pCreateInfo` is a pointer to a [VkValidationCacheCreateInfoEXT](VkValidationCacheCreateInfoEXT.html)
structure containing the initial parameters for the validation cache
object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pValidationCache` is a pointer to a [VkValidationCacheEXT](VkValidationCacheEXT.html)
handle in which the resulting validation cache object is returned.

|  | Applications **can** track and manage the total host memory size of a
| --- | --- |
validation cache object using the `pAllocator`.
Applications **can** limit the amount of data retrieved from a validation cache
object in `vkGetValidationCacheDataEXT`.
Implementations **should** not internally limit the total number of entries
added to a validation cache object or the total host memory consumed. |

Once created, a validation cache **can** be passed to the
`vkCreateShaderModule` command by adding this object to the
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structure’s `pNext` chain.
If a [VkShaderModuleValidationCacheCreateInfoEXT](VkShaderModuleValidationCacheCreateInfoEXT.html) object is included in
the [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)::`pNext` chain, and its
`validationCache` field is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the implementation
will query it for possible reuse opportunities and update it with new
content.
The use of the validation cache object in these commands is internally
synchronized, and the same validation cache object **can** be used in multiple
threads simultaneously.

|  | Implementations **should** make every effort to limit any critical sections to
| --- | --- |
the actual accesses to the cache, which is expected to be significantly
shorter than the duration of the `vkCreateShaderModule` command. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateValidationCacheEXT-device-parameter) VUID-vkCreateValidationCacheEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateValidationCacheEXT-pCreateInfo-parameter) VUID-vkCreateValidationCacheEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkValidationCacheCreateInfoEXT](VkValidationCacheCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateValidationCacheEXT-pAllocator-parameter) VUID-vkCreateValidationCacheEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateValidationCacheEXT-pValidationCache-parameter) VUID-vkCreateValidationCacheEXT-pValidationCache-parameter

 `pValidationCache` **must** be a valid pointer to a [VkValidationCacheEXT](VkValidationCacheEXT.html) handle

* 
[](#VUID-vkCreateValidationCacheEXT-device-queuecount) VUID-vkCreateValidationCacheEXT-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_validation_cache](VK_EXT_validation_cache.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkValidationCacheCreateInfoEXT](VkValidationCacheCreateInfoEXT.html), [VkValidationCacheEXT](VkValidationCacheEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCreateValidationCacheEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
