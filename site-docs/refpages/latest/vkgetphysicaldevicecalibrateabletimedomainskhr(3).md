# vkGetPhysicalDeviceCalibrateableTimeDomainsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceCalibrateableTimeDomainsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceCalibrateableTimeDomainsKHR - Query calibrateable time domains

To query the set of time domains for which a physical device supports
timestamp calibration, call:

// Provided by VK_KHR_calibrated_timestamps
VkResult vkGetPhysicalDeviceCalibrateableTimeDomainsKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pTimeDomainCount,
    VkTimeDomainKHR*                            pTimeDomains);

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to vkGetPhysicalDeviceCalibrateableTimeDomainsKHR
VkResult vkGetPhysicalDeviceCalibrateableTimeDomainsEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pTimeDomainCount,
    VkTimeDomainKHR*                            pTimeDomains);

* 
`physicalDevice` is the physical device from which to query the set
of calibrateable time domains.

* 
`pTimeDomainCount` is a pointer to an integer related to the number
of calibrateable time domains available or queried, as described below.

* 
`pTimeDomains` is either `NULL` or a pointer to an array of
[VkTimeDomainKHR](VkTimeDomainKHR.html) values, indicating the supported calibrateable
time domains.

If `pTimeDomains` is `NULL`, then the number of calibrateable time
domains supported for the given `physicalDevice` is returned in
`pTimeDomainCount`.
Otherwise, `pTimeDomainCount` **must** point to a variable set by the
application to the number of elements in the `pTimeDomains` array, and
on return the variable is overwritten with the number of values actually
written to `pTimeDomains`.
If the value of `pTimeDomainCount` is less than the number of
calibrateable time domains supported, at most `pTimeDomainCount` values
will be written to `pTimeDomains`, and [VK_INCOMPLETE](VkResult.html) will be
returned instead of [VK_SUCCESS](VkResult.html), to indicate that not all the available
time domains were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomainCount-parameter) VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomainCount-parameter

 `pTimeDomainCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomains-parameter) VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomains-parameter

 If the value referenced by `pTimeDomainCount` is not `0`, and `pTimeDomains` is not `NULL`, `pTimeDomains` **must** be a valid pointer to an array of `pTimeDomainCount` [VkTimeDomainKHR](VkTimeDomainKHR.html) values

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

[VK_EXT_calibrated_timestamps](VK_EXT_calibrated_timestamps.html), [VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkTimeDomainKHR](VkTimeDomainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceCalibrateableTimeDomainsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
