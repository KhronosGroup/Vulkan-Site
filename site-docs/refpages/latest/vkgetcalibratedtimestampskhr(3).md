# vkGetCalibratedTimestampsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetCalibratedTimestampsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetCalibratedTimestampsKHR - Query calibrated timestamps

In order to be able to correlate the time a particular operation took place
at on timelines of different time domains (e.g. a device operation vs. a
host operation), Vulkan allows querying calibrated timestamps from multiple
time domains.

To query calibrated timestamps from a set of time domains, call:

// Provided by VK_KHR_calibrated_timestamps
VkResult vkGetCalibratedTimestampsKHR(
    VkDevice                                    device,
    uint32_t                                    timestampCount,
    const VkCalibratedTimestampInfoKHR*         pTimestampInfos,
    uint64_t*                                   pTimestamps,
    uint64_t*                                   pMaxDeviation);

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to vkGetCalibratedTimestampsKHR
VkResult vkGetCalibratedTimestampsEXT(
    VkDevice                                    device,
    uint32_t                                    timestampCount,
    const VkCalibratedTimestampInfoKHR*         pTimestampInfos,
    uint64_t*                                   pTimestamps,
    uint64_t*                                   pMaxDeviation);

* 
`device` is the logical device used to perform the query.

* 
`timestampCount` is the number of timestamps to query.

* 
`pTimestampInfos` is a pointer to an array of `timestampCount`
[VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html) structures, describing the time
domains the calibrated timestamps should be captured from.

* 
`pTimestamps` is a pointer to an array of `timestampCount`
64-bit unsigned integer values in which the requested calibrated
timestamp values are returned.

* 
`pMaxDeviation` is a pointer to a 64-bit unsigned integer value in
which the strictly positive maximum deviation, in nanoseconds, of the
calibrated timestamp values is returned.

|  | The maximum deviation **may** vary between calls to
| --- | --- |
`vkGetCalibratedTimestampsKHR` even for the same set of time domains due
to implementation and platform specific reasons.
It is the application’s responsibility to assess whether the returned
maximum deviation makes the timestamp values suitable for any particular
purpose and **can** choose to re-issue the timestamp calibration call pursuing
a lower deviation value. |

Calibrated timestamp values **can** be extrapolated to estimate future
coinciding timestamp values, however, depending on the nature of the time
domains and other properties of the platform extrapolating values over a
sufficiently long period of time **may** no longer be accurate enough to fit
any particular purpose, so applications are expected to re-calibrate the
timestamps on a regular basis.

Valid Usage

* 
[](#VUID-vkGetCalibratedTimestampsKHR-timeDomain-09246) VUID-vkGetCalibratedTimestampsKHR-timeDomain-09246

The `timeDomain` value of each [VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html) in
`pTimestampInfos` **must** be unique
except for those with a value of
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetCalibratedTimestampsKHR-device-parameter) VUID-vkGetCalibratedTimestampsKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetCalibratedTimestampsKHR-pTimestampInfos-parameter) VUID-vkGetCalibratedTimestampsKHR-pTimestampInfos-parameter

 `pTimestampInfos` **must** be a valid pointer to an array of `timestampCount` valid [VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html) structures

* 
[](#VUID-vkGetCalibratedTimestampsKHR-pTimestamps-parameter) VUID-vkGetCalibratedTimestampsKHR-pTimestamps-parameter

 `pTimestamps` **must** be a valid pointer to an array of `timestampCount` `uint64_t` values

* 
[](#VUID-vkGetCalibratedTimestampsKHR-pMaxDeviation-parameter) VUID-vkGetCalibratedTimestampsKHR-pMaxDeviation-parameter

 `pMaxDeviation` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetCalibratedTimestampsKHR-timestampCount-arraylength) VUID-vkGetCalibratedTimestampsKHR-timestampCount-arraylength

 `timestampCount` **must** be greater than `0`

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

[VK_EXT_calibrated_timestamps](VK_EXT_calibrated_timestamps.html), [VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html), [VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetCalibratedTimestampsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
