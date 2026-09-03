# VK_UUID_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_UUID_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_UUID_SIZE - Length of a universally unique device or driver build identifier

[VK_UUID_SIZE](#) is the length in `uint8_t` values of an array
containing a universally unique device or driver build identifier, as
returned in [VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html)::`deviceUUID` and
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html)::`driverUUID`.

#define VK_UUID_SIZE                      16U

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VK_UUID_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
