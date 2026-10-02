# vkSetGpaDeviceClockModeAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetGpaDeviceClockModeAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetGpaDeviceClockModeAMD - Setting a device clock

To set or query GPU clocks, call:

// Provided by VK_AMD_gpa_interface
VkResult vkSetGpaDeviceClockModeAMD(
    VkDevice                                    device,
    VkGpaDeviceClockModeInfoAMD*                pInfo);

* 
`device` is the logical device that sets the clocks.

* 
`pInfo` is a pointer to a [VkGpaDeviceClockModeInfoAMD](VkGpaDeviceClockModeInfoAMD.html)
structure specifying the clock mode to set or query.

Valid Usage

* 
[](#VUID-vkSetGpaDeviceClockModeAMD-clockModes-12415) VUID-vkSetGpaDeviceClockModeAMD-clockModes-12415

The [    `VkPhysicalDeviceGpaFeaturesAMD`::`clockModes`](../../../../spec/latest/chapters/features.html#features-clockModes) feature **must**
be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkSetGpaDeviceClockModeAMD-device-parameter) VUID-vkSetGpaDeviceClockModeAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetGpaDeviceClockModeAMD-pInfo-parameter) VUID-vkSetGpaDeviceClockModeAMD-pInfo-parameter

 `pInfo` **must** be a valid pointer to a [VkGpaDeviceClockModeInfoAMD](VkGpaDeviceClockModeInfoAMD.html) structure

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

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkDevice](VkDevice.html), [VkGpaDeviceClockModeInfoAMD](VkGpaDeviceClockModeInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkSetGpaDeviceClockModeAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
