# vkSetLatencySleepModeLegacyNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetLatencySleepModeLegacyNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetLatencySleepModeLegacyNV - Stub description of vkSetLatencySleepModeLegacyNV

This is an undocumented legacy function and is superseded by the
[VK_NV_low_latency2](VK_NV_low_latency2.html) extension.

// Provided by VK_NV_low_latency
void vkSetLatencySleepModeLegacyNV(
    VkDevice                                    device,
    VkBool32                                    lowLatencyMode,
    VkBool32                                    lowLatencyBoost,
    uint32_t                                    minimumIntervalUs);

Valid Usage (Implicit)

* 
[](#VUID-vkSetLatencySleepModeLegacyNV-device-parameter) VUID-vkSetLatencySleepModeLegacyNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

[VK_NV_low_latency](VK_NV_low_latency.html), `VkBool32`, [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkSetLatencySleepModeLegacyNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
