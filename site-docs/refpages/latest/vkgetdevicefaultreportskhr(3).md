# vkGetDeviceFaultReportsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceFaultReportsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceFaultReportsKHR - Reports fault information for the specified device

To retrieve diagnostic information about faults call:

// Provided by VK_KHR_device_fault
VkResult vkGetDeviceFaultReportsKHR(
    VkDevice                                    device,
    uint64_t                                    timeout,
    uint32_t*                                   pFaultCounts,
    VkDeviceFaultInfoKHR*                       pFaultInfo);

* 
`device` is the logical device from which to query the diagnostic
fault information.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

* 
`pFaultCount` is a pointer to an integer related to the number of
fault reports available or queried, as described below.

* 
`pFaultInfo` is `NULL` or a pointer to an array of
[VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html) structures in which fault information is
returned.

If at least one fault report is available when
`vkGetDeviceFaultReportsKHR` is called, then
`vkGetDeviceFaultReportsKHR` returns immediately.
If no faults have occurred at the time `vkGetDeviceFaultReportsKHR` is
called, then `vkGetDeviceFaultReportsKHR` will block and wait until a
fault occurs and a report becomes available or until the `timeout` has
expired, whichever is sooner.

If `timeout` is zero, then `vkGetDeviceFaultReportsKHR` does not
wait, but simply returns the current fault count and reports.
[VK_TIMEOUT](VkResult.html) will be returned in this case if no faults have occurred,
even though no actual wait was performed.

If a fault has occurred before the `timeout` has expired,
`vkGetDeviceFaultReportsKHR` returns [VK_SUCCESS](VkResult.html).
Otherwise, `vkGetDeviceFaultReportsKHR` returns [VK_TIMEOUT](VkResult.html) after
the `timeout` has expired.

If `pFaultInfo` is `NULL`, then the number of fault reports available is
returned in `pFaultCount`.
Otherwise, `pFaultCount` **must** point to a variable set by the
application to the number of elements in the `pFaultInfo` array, and on
return the variable is overwritten with the number of handles actually
written to `pFaultInfo`.
If `pFaultCount` is less than the number of fault reports available, at
most `pFaultCount` structures will be written, and [VK_INCOMPLETE](VkResult.html)
will be returned instead of [VK_SUCCESS](VkResult.html), to indicate that not all the
available fault reports were returned.

If more than one fault report is available, they will be returned in order
of occurrence via `pFaultInfo`.

Each individual fault report is returned exactly once.

`vkGetDeviceFaultReportsKHR`() **may** be invoked in parallel on different
threads, in which case each invocation for a given `device` will return
a unique set of reports.
No fault report being returned to more than one invocation.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceFaultReportsKHR-device-parameter) VUID-vkGetDeviceFaultReportsKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceFaultReportsKHR-pFaultCounts-parameter) VUID-vkGetDeviceFaultReportsKHR-pFaultCounts-parameter

 `pFaultCounts` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDeviceFaultReportsKHR-pFaultInfo-parameter) VUID-vkGetDeviceFaultReportsKHR-pFaultInfo-parameter

 If `pFaultInfo` is not `NULL`, `pFaultInfo` **must** be a valid pointer to an array of `pFaultCounts` [VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html) structures

* 
[](#VUID-vkGetDeviceFaultReportsKHR-pFaultCounts-arraylength) VUID-vkGetDeviceFaultReportsKHR-pFaultCounts-arraylength

 If `pFaultInfo` is not `NULL`, the value referenced by `pFaultCounts` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

* 
[VK_TIMEOUT](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDevice](VkDevice.html), [VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkGetDeviceFaultReportsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
