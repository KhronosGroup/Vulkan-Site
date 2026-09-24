# vkLatencySleepLegacyNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkLatencySleepLegacyNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkLatencySleepLegacyNV - Stub description of vkLatencySleepLegacyNV

This is an undocumented legacy function and is superseded by the
[VK_NV_low_latency2](VK_NV_low_latency2.html) extension.

// Provided by VK_NV_low_latency
void vkLatencySleepLegacyNV(
    VkDevice                                    device,
    VkSemaphore                                 signalSemaphore,
    uint64_t                                    value);

Valid Usage (Implicit)

* 
[](#VUID-vkLatencySleepLegacyNV-device-parameter) VUID-vkLatencySleepLegacyNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkLatencySleepLegacyNV-signalSemaphore-parameter) VUID-vkLatencySleepLegacyNV-signalSemaphore-parameter

 `signalSemaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-vkLatencySleepLegacyNV-signalSemaphore-parent) VUID-vkLatencySleepLegacyNV-signalSemaphore-parent

 `signalSemaphore` **must** have been created, allocated, or retrieved from `device`

[VK_NV_low_latency](VK_NV_low_latency.html), [VkDevice](VkDevice.html), [VkSemaphore](VkSemaphore.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkLatencySleepLegacyNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
