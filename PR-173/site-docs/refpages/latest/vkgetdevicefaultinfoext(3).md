# vkGetDeviceFaultInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceFaultInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceFaultInfoEXT - Reports diagnostic fault information on the specified logical device

To retrieve diagnostic information about faults that **may** have caused device
loss, call:

// Provided by VK_EXT_device_fault
VkResult vkGetDeviceFaultInfoEXT(
    VkDevice                                    device,
    VkDeviceFaultCountsEXT*                     pFaultCounts,
    VkDeviceFaultInfoEXT*                       pFaultInfo);

* 
`device` is the logical device from which to query the diagnostic
fault information.

* 
`pFaultCounts` is a pointer to a [VkDeviceFaultCountsEXT](VkDeviceFaultCountsEXT.html)
structure in which counts for structures describing additional fault
information are returned.

* 
`pFaultInfo` is `NULL` or a pointer to a [VkDeviceFaultInfoEXT](VkDeviceFaultInfoEXT.html)
structure in which fault information is returned.

If `pFaultInfo` is `NULL`, then the counts of corresponding additional
fault information structures available are returned in the
`addressInfoCount` and `vendorInfoCount` members of
`pFaultCounts`.
Additionally, the size of any vendor-specific binary crash dump is returned
in the `vendorBinarySize` member of `pFaultCounts`.

If `pFaultInfo` is not `NULL`, `pFaultCounts` **must** point to a
[VkDeviceFaultCountsEXT](VkDeviceFaultCountsEXT.html) structure with each structure count or size
member (`addressInfoCount`, `vendorInfoCount`,
`vendorBinarySize`) set by the application to the number of elements in
the corresponding output array member of `pFaultInfo`
(`pAddressInfos` and `pVendorInfos`), or to the size of the output
buffer in bytes (`pVendorBinaryData`).
On return, each structure count member is overwritten with the number of
structures actually written to the corresponding output array member of
`pFaultInfo`.
Similarly, `vendorBinarySize` is overwritten with the number of bytes
actually written to the `pVendorBinaryData` member of `pFaultInfo`.

If the [vendor-specific crash dumps](../../../../spec/latest/chapters/features.html#features-deviceFaultVendorBinary)
feature is not enabled, then implementations **must** set
`pFaultCounts`->vendorBinarySize to zero and **must** not modify
`pFaultInfo`->pVendorBinaryData.

If any `pFaultCounts` structure count member is less than the number of
corresponding fault properties available, at most structure count
(`addressInfoCount`, `vendorInfoCount`) elements will be written to
the associated `pFaultInfo` output array.
Similarly, if `vendorBinarySize` is less than the size in bytes of the
available crash dump data, at most `vendorBinarySize` elements will be
written to `pVendorBinaryData`.

If `pFaultInfo` is `NULL`, then subsequent calls to
[vkGetDeviceFaultInfoEXT](#) for the same `device` **must** return
identical values in the `addressInfoCount`, `vendorInfoCount` and
`vendorBinarySize` members of `pFaultCounts`.

If `pFaultInfo` is not `NULL`, then subsequent calls to
[vkGetDeviceFaultInfoEXT](#) for the same `device` **must** return
identical values in the output members of `pFaultInfo`
(`pAddressInfos`, `pVendorInfos`, `pVendorBinaryData`), up to
the limits described by the structure count and buffer size members of
`pFaultCounts` (`addressInfoCount`, `vendorInfoCount`,
`vendorBinarySize`).
If the sizes of the output members of `pFaultInfo` increase for a
subsequent call to [vkGetDeviceFaultInfoEXT](#), then supplementary
information **may** be returned in the additional available space.

If any `pFaultCounts` structure count member is smaller than the number
of corresponding fault properties available, or if
`pFaultCounts`->vendorBinarySize is smaller than the size in bytes of
the generated binary crash dump data, [VK_INCOMPLETE](VkResult.html) will be returned
instead of [VK_SUCCESS](VkResult.html), to indicate that not all the available
properties were returned.

If `pFaultCounts`->vendorBinarySize is less than what is necessary to
store the [binary crash dump header](../../../../spec/latest/chapters/debugging.html#vendor-binary-crash-dumps), nothing
will be written to `pFaultInfo`->pVendorBinaryData and zero will be
written to `pFaultCounts`->vendorBinarySize.

Valid Usage

* 
[](#VUID-vkGetDeviceFaultInfoEXT-device-07336) VUID-vkGetDeviceFaultInfoEXT-device-07336

`device` **must** be in the *lost* state

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07337) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07337

If the value referenced by `pFaultCounts->addressInfoCount` is not
`0`, and `pFaultInfo->pAddressInfos` is not `NULL`,
`pFaultInfo->pAddressInfos` **must** be a valid pointer to an array of
`pFaultCounts->addressInfoCount` [VkDeviceFaultAddressInfoEXT](VkDeviceFaultAddressInfoEXT.html)
structures

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07338) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07338

If the value referenced by `pFaultCounts->vendorInfoCount` is not
`0`, and `pFaultInfo->pVendorInfos` is not `NULL`,
`pFaultInfo->pVendorInfos` **must** be a valid pointer to an array of
`pFaultCounts->vendorInfoCount` [VkDeviceFaultVendorInfoEXT](VkDeviceFaultVendorInfoEXT.html)
structures

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07339) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07339

If the value referenced by `pFaultCounts->vendorBinarySize` is not
`0`, and `pFaultInfo->pVendorBinaryData` is not `NULL`,
`pFaultInfo->pVendorBinaryData` **must** be a valid pointer to an array
of `pFaultCounts->vendorBinarySize` bytes

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceFaultInfoEXT-device-parameter) VUID-vkGetDeviceFaultInfoEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-parameter) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-parameter

 `pFaultCounts` **must** be a valid pointer to a [VkDeviceFaultCountsEXT](VkDeviceFaultCountsEXT.html) structure

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultInfo-parameter) VUID-vkGetDeviceFaultInfoEXT-pFaultInfo-parameter

 If `pFaultInfo` is not `NULL`, `pFaultInfo` **must** be a valid pointer to a [VkDeviceFaultInfoEXT](VkDeviceFaultInfoEXT.html) structure

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

[VK_EXT_device_fault](VK_EXT_device_fault.html), [VkDevice](VkDevice.html), [VkDeviceFaultCountsEXT](VkDeviceFaultCountsEXT.html), [VkDeviceFaultInfoEXT](VkDeviceFaultInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkGetDeviceFaultInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
