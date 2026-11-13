# VK_MAX_DRIVER_INFO_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAX_DRIVER_INFO_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAX_DRIVER_INFO_SIZE - Length of a physical device driver information string

[VK_MAX_DRIVER_INFO_SIZE](#) is the length in `char` values of an array
containing a driver information string, as returned in
[VkPhysicalDeviceDriverProperties](VkPhysicalDeviceDriverProperties.html)::`driverInfo`.

#define VK_MAX_DRIVER_INFO_SIZE           256U

#define VK_MAX_DRIVER_INFO_SIZE_KHR       VK_MAX_DRIVER_INFO_SIZE

[VK_KHR_driver_properties](VK_KHR_driver_properties.html), [VK_VERSION_1_2](VK_VERSION_1_2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VK_MAX_DRIVER_INFO_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
