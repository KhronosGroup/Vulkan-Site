# vkGetGpaDeviceClockInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetGpaDeviceClockInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetGpaDeviceClockInfoAMD - Getting device clocks and ratios

To query the GPU clock current values and their ratios to their maximums,
call:

// Provided by VK_AMD_gpa_interface
VkResult vkGetGpaDeviceClockInfoAMD(
    VkDevice                                    device,
    VkGpaDeviceGetClockInfoAMD*                 pInfo);

* 
`device` is the logical device to get clock information from.

* 
`pInfo` is a pointer to a [VkGpaDeviceGetClockInfoAMD](VkGpaDeviceGetClockInfoAMD.html) structure
in which the clock values are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGpaDeviceClockInfoAMD-device-parameter) VUID-vkGetGpaDeviceClockInfoAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetGpaDeviceClockInfoAMD-pInfo-parameter) VUID-vkGetGpaDeviceClockInfoAMD-pInfo-parameter

 `pInfo` **must** be a valid pointer to a [VkGpaDeviceGetClockInfoAMD](VkGpaDeviceGetClockInfoAMD.html) structure

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

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkDevice](VkDevice.html), [VkGpaDeviceGetClockInfoAMD](VkGpaDeviceGetClockInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkGetGpaDeviceClockInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
