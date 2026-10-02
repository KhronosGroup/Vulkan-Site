# vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV - Query supported sample count combinations

To query the set of mixed sample combinations of coverage reduction mode,
rasterization samples and color, depth, stencil attachment sample counts
that are supported by a physical device, call:

// Provided by VK_NV_coverage_reduction_mode
VkResult vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pCombinationCount,
    VkFramebufferMixedSamplesCombinationNV*     pCombinations);

* 
`physicalDevice` is the physical device from which to query the set
of combinations.

* 
`pCombinationCount` is a pointer to an integer related to the number
of combinations available or queried, as described below.

* 
`pCombinations` is either `NULL` or a pointer to an array of
[VkFramebufferMixedSamplesCombinationNV](VkFramebufferMixedSamplesCombinationNV.html) values, indicating the
supported combinations of coverage reduction mode, rasterization
samples, and color, depth, stencil attachment sample counts.

If `pCombinations` is `NULL`, then the number of supported combinations
for the given `physicalDevice` is returned in `pCombinationCount`.
Otherwise, `pCombinationCount` **must** point to a variable set by the
application to the number of elements in the `pCombinations` array, and
on return the variable is overwritten with the number of values actually
written to `pCombinations`.
If the value of `pCombinationCount` is less than the number of
combinations supported for the given `physicalDevice`, at most
`pCombinationCount` values will be written to `pCombinations`, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the supported values were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV-pCombinationCount-parameter) VUID-vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV-pCombinationCount-parameter

 `pCombinationCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV-pCombinations-parameter) VUID-vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV-pCombinations-parameter

 If the value referenced by `pCombinationCount` is not `0`, and `pCombinations` is not `NULL`, `pCombinations` **must** be a valid pointer to an array of `pCombinationCount` [VkFramebufferMixedSamplesCombinationNV](VkFramebufferMixedSamplesCombinationNV.html) structures

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

[VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html), [VkFramebufferMixedSamplesCombinationNV](VkFramebufferMixedSamplesCombinationNV.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
