# vkGetDeviceAccelerationStructureCompatibilityKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceAccelerationStructureCompatibilityKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceAccelerationStructureCompatibilityKHR - Check if a serialized acceleration structure is compatible with the current device

To check if a serialized acceleration structure is compatible with the
current device call:

// Provided by VK_KHR_acceleration_structure
void vkGetDeviceAccelerationStructureCompatibilityKHR(
    VkDevice                                    device,
    const VkAccelerationStructureVersionInfoKHR* pVersionInfo,
    VkAccelerationStructureCompatibilityKHR*    pCompatibility);

* 
`device` is the device to check the version against.

* 
`pVersionInfo` is a pointer to a
[VkAccelerationStructureVersionInfoKHR](VkAccelerationStructureVersionInfoKHR.html) structure specifying version
information to check against the device.

* 
`pCompatibility` is a pointer to a
[VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html) value in which
compatibility information is returned.

Valid Usage

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-accelerationStructure-08928) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-accelerationStructure-08928

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-device-parameter) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pVersionInfo-parameter) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pVersionInfo-parameter

 `pVersionInfo` **must** be a valid pointer to a valid [VkAccelerationStructureVersionInfoKHR](VkAccelerationStructureVersionInfoKHR.html) structure

* 
[](#VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pCompatibility-parameter) VUID-vkGetDeviceAccelerationStructureCompatibilityKHR-pCompatibility-parameter

 `pCompatibility` **must** be a valid pointer to a [VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html) value

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html), [VkAccelerationStructureVersionInfoKHR](VkAccelerationStructureVersionInfoKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkGetDeviceAccelerationStructureCompatibilityKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
