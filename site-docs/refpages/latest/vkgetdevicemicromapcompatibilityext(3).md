# vkGetDeviceMicromapCompatibilityEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceMicromapCompatibilityEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceMicromapCompatibilityEXT - Check if a serialized micromap is compatible with the current device

To check if a serialized micromap is compatible with the current device
call:

// Provided by VK_EXT_opacity_micromap
void vkGetDeviceMicromapCompatibilityEXT(
    VkDevice                                    device,
    const VkMicromapVersionInfoEXT*             pVersionInfo,
    VkAccelerationStructureCompatibilityKHR*    pCompatibility);

* 
`device` is the device to check the version against.

* 
`pVersionInfo` is a pointer to a [VkMicromapVersionInfoEXT](VkMicromapVersionInfoEXT.html)
structure specifying version information to check against the device.

* 
`pCompatibility` is a pointer to a
[VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html) value in which
compatibility information is returned.

Valid Usage

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-micromap-07551) VUID-vkGetDeviceMicromapCompatibilityEXT-micromap-07551

The [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-device-parameter) VUID-vkGetDeviceMicromapCompatibilityEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-pVersionInfo-parameter) VUID-vkGetDeviceMicromapCompatibilityEXT-pVersionInfo-parameter

 `pVersionInfo` **must** be a valid pointer to a valid [VkMicromapVersionInfoEXT](VkMicromapVersionInfoEXT.html) structure

* 
[](#VUID-vkGetDeviceMicromapCompatibilityEXT-pCompatibility-parameter) VUID-vkGetDeviceMicromapCompatibilityEXT-pCompatibility-parameter

 `pCompatibility` **must** be a valid pointer to a [VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html) value

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html), [VkDevice](VkDevice.html), [VkMicromapVersionInfoEXT](VkMicromapVersionInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkGetDeviceMicromapCompatibilityEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
