# vkGetDeviceFaultDebugInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceFaultDebugInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceFaultDebugInfoKHR - Retrieve vendor-specific crash dump data for the specified logical device

To retrieve a vendor-specific binary crash dump call:

// Provided by VK_KHR_device_fault
VkResult vkGetDeviceFaultDebugInfoKHR(
    VkDevice                                    device,
    VkDeviceFaultDebugInfoKHR*                  pDebugInfo);

* 
`device` is the logical device from which to query the crash dump.

* 
`pDebugInfo` is a pointer to a `VkDeviceFaultDebugInfoKHR`
structure which will be populated with the vendor binary data crash dump
binary, as described below.

If `pDebugInfo->pVendorBinaryData` is `NULL`, then the size of any
vendor-specific binary crash dump is returned in
`pDebugInfo->vendorBinarySize`.

If the `pDebugInfo->pVendorBinaryData` is not `NULL` then it **must** point
to a buffer of size `pDebugInfo->vendorBinarySize` bytes.

On return, `pDebugInfo->vendorBinarySize` will be overwritten with the
number of bytes actually written to the `pDebugInfo->pVendorBinaryData`.

If `pDebugInfo->vendorBinaryData` is not `NULL`, then subsequent calls
to [vkGetDeviceFaultDebugInfoKHR](#) for the same `device` **must** return
identical binary values in the `pDebugInfo->pVendorBinaryData` buffer up
to the limit defined by `pDebugInfo->vendorBinarySize`.

If the [vendor-specific crash dumps](../../../../spec/latest/chapters/features.html#features-deviceFaultVendorBinary)
feature is not enabled, then implementations **must** set
`pDebugInfo`->vendorBinarySize to zero and **must** not modify
`pDebugInfo`->pVendorBinaryData.

Valid Usage

* 
[](#VUID-vkGetDeviceFaultDebugInfoKHR-device-12383) VUID-vkGetDeviceFaultDebugInfoKHR-device-12383

`device` **must** be [lost](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device)

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceFaultDebugInfoKHR-device-parameter) VUID-vkGetDeviceFaultDebugInfoKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceFaultDebugInfoKHR-pDebugInfo-parameter) VUID-vkGetDeviceFaultDebugInfoKHR-pDebugInfo-parameter

 `pDebugInfo` **must** be a valid pointer to a [VkDeviceFaultDebugInfoKHR](VkDeviceFaultDebugInfoKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDevice](VkDevice.html), [VkDeviceFaultDebugInfoKHR](VkDeviceFaultDebugInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkGetDeviceFaultDebugInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
