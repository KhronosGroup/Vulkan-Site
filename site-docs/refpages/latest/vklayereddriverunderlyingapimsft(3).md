# VkLayeredDriverUnderlyingApiMSFT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLayeredDriverUnderlyingApiMSFT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLayeredDriverUnderlyingApiMSFT - Layered driver underlying APIs

Underlying APIs which **may** be returned in
[VkPhysicalDeviceLayeredDriverPropertiesMSFT](VkPhysicalDeviceLayeredDriverPropertiesMSFT.html)::`underlyingAPI` are:

// Provided by VK_MSFT_layered_driver
typedef enum VkLayeredDriverUnderlyingApiMSFT {
    VK_LAYERED_DRIVER_UNDERLYING_API_NONE_MSFT = 0,
    VK_LAYERED_DRIVER_UNDERLYING_API_D3D12_MSFT = 1,
} VkLayeredDriverUnderlyingApiMSFT;

[VK_MSFT_layered_driver](VK_MSFT_layered_driver.html), [VkPhysicalDeviceLayeredDriverPropertiesMSFT](VkPhysicalDeviceLayeredDriverPropertiesMSFT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkLayeredDriverUnderlyingApiMSFT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
