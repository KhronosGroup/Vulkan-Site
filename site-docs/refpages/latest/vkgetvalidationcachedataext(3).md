# vkGetValidationCacheDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetValidationCacheDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetValidationCacheDataEXT - Get the data store from a validation cache

Data **can** be retrieved from a validation cache object using the command:

// Provided by VK_EXT_validation_cache
VkResult vkGetValidationCacheDataEXT(
    VkDevice                                    device,
    VkValidationCacheEXT                        validationCache,
    size_t*                                     pDataSize,
    void*                                       pData);

* 
`device` is the logical device that owns the validation cache.

* 
`validationCache` is the validation cache to retrieve data from.

* 
`pDataSize` is a pointer to a value related to the amount of data in
the validation cache, as described below.

* 
`pData` is either `NULL` or a pointer to a buffer.

If `pData` is `NULL`, then the maximum size of the data that **can** be
retrieved from the validation cache, in bytes, is returned in
`pDataSize`.
Otherwise, `pDataSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pData`, and on
return the variable is overwritten with the amount of data actually written
to `pData`.
If `pDataSize` is less than the maximum size that **can** be retrieved by
the validation cache, at most `pDataSize` bytes will be written to
`pData`, and `vkGetValidationCacheDataEXT` will return
[VK_INCOMPLETE](VkResult.html) instead of [VK_SUCCESS](VkResult.html), to indicate that not all of
the validation cache was returned.

Any data written to `pData` is valid and **can** be provided as the
`pInitialData` member of the [VkValidationCacheCreateInfoEXT](VkValidationCacheCreateInfoEXT.html)
structure passed to `vkCreateValidationCacheEXT`.

Two calls to `vkGetValidationCacheDataEXT` with the same parameters
**must** retrieve the same data unless a command that modifies the contents of
the cache is called between them.

Applications **can** store the data retrieved from the validation cache, and
use these data, possibly in a future run of the application, to populate new
validation cache objects.
The results of validation, however, **may** depend on the vendor ID, device ID,
driver version, and other details of the device.
To enable applications to detect when previously retrieved data is
incompatible with the device, the initial bytes written to `pData` **must**
be a header consisting of the following members:

| Offset | Size | Meaning |
| --- | --- | --- |
| 0 | 4 | length in bytes of the entire validation cache header
                             written as a stream of bytes, with the least
                             significant byte first |
| 4 | 4 | a [VkValidationCacheHeaderVersionEXT](VkValidationCacheHeaderVersionEXT.html) value
                             written as a stream of bytes, with the least
                             significant byte first |
| 8 | [VK_UUID_SIZE](VK_UUID_SIZE.html) | a layer commit ID expressed as a UUID, which uniquely
                             identifies the version of the validation layers used
                             to generate these validation results |

The first four bytes encode the length of the entire validation cache
header, in bytes.
This value includes all fields in the header including the validation cache
version field and the size of the length field.

The next four bytes encode the validation cache version, as described for
[VkValidationCacheHeaderVersionEXT](VkValidationCacheHeaderVersionEXT.html).
A consumer of the validation cache **should** use the cache version to
interpret the remainder of the cache header.

If `pDataSize` is less than what is necessary to store this header,
nothing will be written to `pData` and zero will be written to
`pDataSize`.

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](../../../../spec/latest/chapters/fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns up to the size of the passed buffer, and signals overflow
with a [VK_INCOMPLETE](VkResult.html) success status instead of returning a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html) error status. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetValidationCacheDataEXT-device-parameter) VUID-vkGetValidationCacheDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetValidationCacheDataEXT-validationCache-parameter) VUID-vkGetValidationCacheDataEXT-validationCache-parameter

 `validationCache` **must** be a valid [VkValidationCacheEXT](VkValidationCacheEXT.html) handle

* 
[](#VUID-vkGetValidationCacheDataEXT-pDataSize-parameter) VUID-vkGetValidationCacheDataEXT-pDataSize-parameter

 `pDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetValidationCacheDataEXT-pData-parameter) VUID-vkGetValidationCacheDataEXT-pData-parameter

 If the value referenced by `pDataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pDataSize` bytes

* 
[](#VUID-vkGetValidationCacheDataEXT-validationCache-parent) VUID-vkGetValidationCacheDataEXT-validationCache-parent

 `validationCache` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

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

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetValidationCacheDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
