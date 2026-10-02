# VkDeviceFaultVendorBinaryHeaderVersionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultVendorBinaryHeaderVersionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultVendorBinaryHeaderVersionKHR - Encode vendor binary crash dump version

Possible values of the `headerVersion` value of the crash dump header
are:

// Provided by VK_KHR_device_fault
typedef enum VkDeviceFaultVendorBinaryHeaderVersionKHR {
    VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_KHR = 1,
    VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_EXT = VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_KHR,
} VkDeviceFaultVendorBinaryHeaderVersionKHR;

// Provided by VK_EXT_device_fault
// Equivalent to VkDeviceFaultVendorBinaryHeaderVersionKHR
typedef VkDeviceFaultVendorBinaryHeaderVersionKHR VkDeviceFaultVendorBinaryHeaderVersionEXT;

* 
[VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_KHR](#) specifies
version one of the binary crash dump header.

[VK_EXT_device_fault](VK_EXT_device_fault.html), [VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDeviceFaultVendorBinaryHeaderVersionOneKHR](VkDeviceFaultVendorBinaryHeaderVersionOneKHR.html), [vkGetDeviceFaultInfoEXT](vkGetDeviceFaultInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultVendorBinaryHeaderVersionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
