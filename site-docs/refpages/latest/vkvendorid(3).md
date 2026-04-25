# VkVendorId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVendorId.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVendorId - Khronos vendor IDs

Khronos vendor IDs which **may** be returned in
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`vendorID` are:

// Provided by VK_VERSION_1_0
typedef enum VkVendorId {
    VK_VENDOR_ID_KHRONOS = 0x10000,
    VK_VENDOR_ID_VIV = 0x10001,
    VK_VENDOR_ID_VSI = 0x10002,
    VK_VENDOR_ID_KAZAN = 0x10003,
    VK_VENDOR_ID_CODEPLAY = 0x10004,
    VK_VENDOR_ID_MESA = 0x10005,
    VK_VENDOR_ID_POCL = 0x10006,
    VK_VENDOR_ID_MOBILEYE = 0x10007,
} VkVendorId;

|  | Khronos vendor IDs may be allocated by vendors at any time.
| --- | --- |
Only the latest canonical versions of this Specification, of the
corresponding `vk.xml` API Registry, and of the corresponding
`vulkan_core.h` header file **must** contain all reserved Khronos vendor IDs.

Only Khronos vendor IDs are given symbolic names at present.
PCI vendor IDs returned by the implementation can be looked up in the
PCI-SIG database. |

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkVendorId).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
