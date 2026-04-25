# vkGetCudaModuleCacheNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetCudaModuleCacheNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetCudaModuleCacheNV - Get CUDA module cache

To get the CUDA module cache call:

// Provided by VK_NV_cuda_kernel_launch
VkResult vkGetCudaModuleCacheNV(
    VkDevice                                    device,
    VkCudaModuleNV                              module,
    size_t*                                     pCacheSize,
    void*                                       pCacheData);

* 
`device` is the logical device that destroys the Function.

* 
`module` is the CUDA module.

* 
`pCacheSize` is a pointer containing the amount of bytes to be
copied in `pCacheData`

* 
`pCacheData` is a pointer to a buffer in which to copy the binary
cache

If `pCacheData` is `NULL`, then the size of the binary cache, in bytes,
is returned in `pCacheSize`.
Otherwise, `pCacheSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pCacheData`, and on
return the variable is overwritten with the amount of data actually written
to `pCacheData`.
If `pCacheSize` is less than the size of the binary shader code, nothing
is written to `pCacheData`, and [VK_INCOMPLETE](VkResult.html) will be returned
instead of [VK_SUCCESS](VkResult.html).

The returned cache **may** then be used later for further initialization of the
CUDA module, by sending this cache *instead* of the PTX code when using
[vkCreateCudaModuleNV](vkCreateCudaModuleNV.html).

|  | Using the binary cache instead of the original PTX code **should**
| --- | --- |
significantly speed up initialization of the CUDA module, given that the
whole compilation and validation will not be necessary.

As with [VkPipelineCache](VkPipelineCache.html), the binary cache depends on the specific
implementation.
The application **must** assume the cache upload might fail in many
circumstances and thus **may** have to get ready for falling back to the
original PTX code if necessary.
Most often, the cache **may** succeed if the same device driver and
architecture is used between the cache generation from PTX and the use of
this cache.
In the event of a new driver version or if using a different device
architecture, this cache **may** become invalid. |

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](../../../../spec/latest/chapters/fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns a [VK_INCOMPLETE](VkResult.html) success status instead of a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html) error status. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetCudaModuleCacheNV-device-parameter) VUID-vkGetCudaModuleCacheNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetCudaModuleCacheNV-module-parameter) VUID-vkGetCudaModuleCacheNV-module-parameter

 `module` **must** be a valid [VkCudaModuleNV](VkCudaModuleNV.html) handle

* 
[](#VUID-vkGetCudaModuleCacheNV-pCacheSize-parameter) VUID-vkGetCudaModuleCacheNV-pCacheSize-parameter

 `pCacheSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetCudaModuleCacheNV-pCacheData-parameter) VUID-vkGetCudaModuleCacheNV-pCacheData-parameter

 If the value referenced by `pCacheSize` is not `0`, and `pCacheData` is not `NULL`, `pCacheData` **must** be a valid pointer to an array of `pCacheSize` bytes

* 
[](#VUID-vkGetCudaModuleCacheNV-module-parent) VUID-vkGetCudaModuleCacheNV-module-parent

 `module` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkCudaModuleNV](VkCudaModuleNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetCudaModuleCacheNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
