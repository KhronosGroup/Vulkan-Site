# vkGetPhysicalDeviceFragmentShadingRatesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceFragmentShadingRatesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceFragmentShadingRatesKHR - Get available shading rates for a physical device

To query available shading rates, call:

// Provided by VK_KHR_fragment_shading_rate
VkResult vkGetPhysicalDeviceFragmentShadingRatesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pFragmentShadingRateCount,
    VkPhysicalDeviceFragmentShadingRateKHR*     pFragmentShadingRates);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pFragmentShadingRateCount` is a pointer to an integer related to
the number of fragment shading rates available or queried, as described
below.

* 
`pFragmentShadingRates` is either `NULL` or a pointer to an array of
[VkPhysicalDeviceFragmentShadingRateKHR](VkPhysicalDeviceFragmentShadingRateKHR.html) structures.

If `pFragmentShadingRates` is `NULL`, then the number of fragment
shading rates available is returned in `pFragmentShadingRateCount`.
Otherwise, `pFragmentShadingRateCount` **must** point to a variable set by
the application to the number of elements in the `pFragmentShadingRates`
array, and on return the variable is overwritten with the number of
structures actually written to `pFragmentShadingRates`.
If `pFragmentShadingRateCount` is less than the number of fragment
shading rates available, at most `pFragmentShadingRateCount` structures
will be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available fragment shading
rates were returned.

The returned array of fragment shading rates **must** be ordered from largest
`fragmentSize.width` value to smallest, and each set of fragment shading
rates with the same `fragmentSize.width` value **must** be ordered from
largest `fragmentSize.height` to smallest.
Any two entries in the array **must** not have the same `fragmentSize`
values.

For any entry in the array, the following rules also apply:

* 
The value of `fragmentSize.width` **must** be less than or equal to
[`maxFragmentSize.width`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentSize).

* 
The value of `fragmentSize.width` **must** be greater than or equal to
`1`.

* 
The value of `fragmentSize.width` **must** be a power-of-two.

* 
The value of `fragmentSize.height` **must** be less than or equal to
[`maxFragmentSize.height`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentSize).

* 
The value of `fragmentSize.height` **must** be greater than or equal to
`1`.

* 
The value of `fragmentSize.height` **must** be a power-of-two.

* 
The highest sample count in `sampleCounts` **must** be less than or
equal to [    `maxFragmentShadingRateRasterizationSamples`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateRasterizationSamples).

* 
The product of `fragmentSize.width`, `fragmentSize.height`, and
the highest sample count in `sampleCounts` **must** be less than or
equal to [    `maxFragmentShadingRateCoverageSamples`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateCoverageSamples).

Implementations **must** support at least the following shading rates:

| `sampleCounts` | `fragmentSize` |
| --- | --- |
| [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html) | {2,2} |
| [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html) | {2,1} |
| ~0 | {1,1} |

If [`framebufferColorSampleCounts`](../../../../spec/latest/chapters/limits.html#limits-framebufferColorSampleCounts), includes [VK_SAMPLE_COUNT_2_BIT](VkSampleCountFlagBits.html),
the required rates **must** also include [VK_SAMPLE_COUNT_2_BIT](VkSampleCountFlagBits.html).

|  | Including the {1,1} fragment size is done for completeness; it has no actual
| --- | --- |
effect on the support of rendering without setting the fragment size.
All sample counts
and render pass transforms
are supported for this rate. |

The returned set of fragment shading rates **must** be returned in the native
(rotated) coordinate system.
For rasterization using render pass `transform` not equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), the application **must** transform
the returned fragment shading rates into the current (unrotated) coordinate
system to get the supported rates for that transform.

|  | For example, consider an implementation returning support for 4x2, but not
| --- | --- |
2x4 in the set of supported fragment shading rates.
This means that for transforms [VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html)
and [VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), 2x4 is a supported rate,
but 4x2 is an unsupported rate. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRateCount-parameter) VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRateCount-parameter

 `pFragmentShadingRateCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRates-parameter) VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRates-parameter

 If the value referenced by `pFragmentShadingRateCount` is not `0`, and `pFragmentShadingRates` is not `NULL`, `pFragmentShadingRates` **must** be a valid pointer to an array of `pFragmentShadingRateCount` [VkPhysicalDeviceFragmentShadingRateKHR](VkPhysicalDeviceFragmentShadingRateKHR.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceFragmentShadingRateKHR](VkPhysicalDeviceFragmentShadingRateKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkGetPhysicalDeviceFragmentShadingRatesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
