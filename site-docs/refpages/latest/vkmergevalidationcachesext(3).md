# vkMergeValidationCachesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkMergeValidationCachesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkMergeValidationCachesEXT - Combine the data stores of validation caches

Validation cache objects **can** be merged using the command:

// Provided by VK_EXT_validation_cache
VkResult vkMergeValidationCachesEXT(
    VkDevice                                    device,
    VkValidationCacheEXT                        dstCache,
    uint32_t                                    srcCacheCount,
    const VkValidationCacheEXT*                 pSrcCaches);

* 
`device` is the logical device that owns the validation cache
objects.

* 
`dstCache` is the handle of the validation cache to merge results
into.

* 
`srcCacheCount` is the length of the `pSrcCaches` array.

* 
`pSrcCaches` is a pointer to an array of validation cache handles,
which will be merged into `dstCache`.
The previous contents of `dstCache` are included after the merge.

|  | The details of the merge operation are implementation-dependent, but
| --- | --- |
implementations **should** merge the contents of the specified validation
caches and prune duplicate entries. |

Valid Usage

* 
[](#VUID-vkMergeValidationCachesEXT-dstCache-01536) VUID-vkMergeValidationCachesEXT-dstCache-01536

`dstCache` **must** not appear in the list of source caches

Valid Usage (Implicit)

* 
[](#VUID-vkMergeValidationCachesEXT-device-parameter) VUID-vkMergeValidationCachesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkMergeValidationCachesEXT-dstCache-parameter) VUID-vkMergeValidationCachesEXT-dstCache-parameter

 `dstCache` **must** be a valid [VkValidationCacheEXT](VkValidationCacheEXT.html) handle

* 
[](#VUID-vkMergeValidationCachesEXT-pSrcCaches-parameter) VUID-vkMergeValidationCachesEXT-pSrcCaches-parameter

 `pSrcCaches` **must** be a valid pointer to an array of `srcCacheCount` valid [VkValidationCacheEXT](VkValidationCacheEXT.html) handles

* 
[](#VUID-vkMergeValidationCachesEXT-srcCacheCount-arraylength) VUID-vkMergeValidationCachesEXT-srcCacheCount-arraylength

 `srcCacheCount` **must** be greater than `0`

* 
[](#VUID-vkMergeValidationCachesEXT-dstCache-parent) VUID-vkMergeValidationCachesEXT-dstCache-parent

 `dstCache` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkMergeValidationCachesEXT-pSrcCaches-parent) VUID-vkMergeValidationCachesEXT-pSrcCaches-parent

 Each element of `pSrcCaches` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `dstCache` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_validation_cache](VK_EXT_validation_cache.html), [VkDevice](VkDevice.html), [VkValidationCacheEXT](VkValidationCacheEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkMergeValidationCachesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
