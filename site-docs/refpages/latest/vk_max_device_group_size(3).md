# VK_MAX_DEVICE_GROUP_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAX_DEVICE_GROUP_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAX_DEVICE_GROUP_SIZE - Length of a physical device handle array

[VK_MAX_DEVICE_GROUP_SIZE](#) is the length of an array containing
[VkPhysicalDevice](VkPhysicalDevice.html) handle values representing all physical devices in a
group, as returned in
[VkPhysicalDeviceGroupProperties](VkPhysicalDeviceGroupProperties.html)::`physicalDevices`.

#define VK_MAX_DEVICE_GROUP_SIZE          32U

#define VK_MAX_DEVICE_GROUP_SIZE_KHR      VK_MAX_DEVICE_GROUP_SIZE

[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html), [VK_VERSION_1_1](VK_VERSION_1_1.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VK_MAX_DEVICE_GROUP_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
