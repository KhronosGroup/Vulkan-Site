# vkGetSleepStatusLegacyNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSleepStatusLegacyNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSleepStatusLegacyNV - Stub description of vkGetSleepStatusLegacyNV

This is an undocumented legacy function and is superseded by the
[VK_NV_low_latency2](VK_NV_low_latency2.html) extension.

// Provided by VK_NV_low_latency
void vkGetSleepStatusLegacyNV(
    VkDevice                                    device,
    VkBool32*                                   pLowLatencyMode);

Valid Usage (Implicit)

* 
[](#VUID-vkGetSleepStatusLegacyNV-device-parameter) VUID-vkGetSleepStatusLegacyNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSleepStatusLegacyNV-pLowLatencyMode-parameter) VUID-vkGetSleepStatusLegacyNV-pLowLatencyMode-parameter

 `pLowLatencyMode` **must** be a valid pointer to a `VkBool32` value

[VK_NV_low_latency](VK_NV_low_latency.html), `VkBool32`, [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkGetSleepStatusLegacyNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
