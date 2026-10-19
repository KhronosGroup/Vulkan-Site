# VkDeviceFaultVendorBinaryHeaderVersionOneKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultVendorBinaryHeaderVersionOneKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultVendorBinaryHeaderVersionOneKHR - Structure describing the layout of the vendor binary crash dump header

Version one of the crash dump header is defined as:

// Provided by VK_KHR_device_fault
typedef struct VkDeviceFaultVendorBinaryHeaderVersionOneKHR {
    uint32_t                                     headerSize;
    VkDeviceFaultVendorBinaryHeaderVersionKHR    headerVersion;
    uint32_t                                     vendorID;
    uint32_t                                     deviceID;
    uint32_t                                     driverVersion;
    uint8_t                                      pipelineCacheUUID[VK_UUID_SIZE];
    uint32_t                                     applicationNameOffset;
    uint32_t                                     applicationVersion;
    uint32_t                                     engineNameOffset;
    uint32_t                                     engineVersion;
    uint32_t                                     apiVersion;
} VkDeviceFaultVendorBinaryHeaderVersionOneKHR;

// Provided by VK_EXT_device_fault
// Equivalent to VkDeviceFaultVendorBinaryHeaderVersionOneKHR
typedef VkDeviceFaultVendorBinaryHeaderVersionOneKHR VkDeviceFaultVendorBinaryHeaderVersionOneEXT;

* 
`headerSize` is the length in bytes of the crash dump header.

* 
`headerVersion` is a [VkDeviceFaultVendorBinaryHeaderVersionKHR](VkDeviceFaultVendorBinaryHeaderVersionKHR.html)
enum value specifying the version of the header.
A consumer of the crash dump **should** use the header version to interpret
the remainder of the header.
`headerVersion` **must** be written as exactly 4 bytes.

* 
`vendorID` is the `VkPhysicalDeviceProperties`::`vendorID`
of the implementation.

* 
`deviceID` is the `VkPhysicalDeviceProperties`::`deviceID`
of the implementation.

* 
`driverVersion` is the
`VkPhysicalDeviceProperties`::`driverVersion` of the
implementation.

* 
`pipelineCacheUUID` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t`
values matching the
`VkPhysicalDeviceProperties`::`pipelineCacheUUID` property of
the implementation.

* 
`applicationNameOffset` is zero, or an offset from the base address
of the crash dump header to a null-terminated UTF-8 string containing
the name of the application.
If `applicationNameOffset` is non-zero, this string **must** match the
application name specified via
[VkApplicationInfo](VkApplicationInfo.html)::`pApplicationName` during instance
creation.

* 
`applicationVersion` **must** be zero or the value specified by
[VkApplicationInfo](VkApplicationInfo.html)::`applicationVersion` during instance
creation.

* 
`engineNameOffset` is zero, or an offset from the base address of
the crash dump header to a null-terminated UTF-8 string containing the
name of the engine (if any) used to create the application.
If `engineNameOffset` is non-zero, this string **must** match the
engine name specified via [VkApplicationInfo](VkApplicationInfo.html)::`pEngineName`
during instance creation.

* 
`engineVersion` **must** be zero or the value specified by
[VkApplicationInfo](VkApplicationInfo.html)::`engineVersion` during instance creation.

* 
`apiVersion` **must** be zero or the value specified by
[VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` during instance creation.

Unlike most structures declared by the Vulkan API, all fields of this
structure are written with the least significant byte first, regardless of
host byte-order.

The C language specification does not define the packing of structure
members.
This layout assumes tight structure member packing, with members laid out in
the order listed in the structure, and the intended size of the structure is
56 bytes.
If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values at the correct offsets.

Valid Usage

* 
[](#VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerSize-07340) VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerSize-07340

`headerSize` **must** be 56

* 
[](#VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerVersion-07341) VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerVersion-07341

`headerVersion` **must** be
[VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_KHR](VkDeviceFaultVendorBinaryHeaderVersionKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultVendorBinaryHeaderVersionOneKHR-headerVersion-parameter) VUID-VkDeviceFaultVendorBinaryHeaderVersionOneKHR-headerVersion-parameter

 `headerVersion` **must** be a valid [VkDeviceFaultVendorBinaryHeaderVersionKHR](VkDeviceFaultVendorBinaryHeaderVersionKHR.html) value

[VK_EXT_device_fault](VK_EXT_device_fault.html), [VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDeviceFaultVendorBinaryHeaderVersionKHR](VkDeviceFaultVendorBinaryHeaderVersionKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultVendorBinaryHeaderVersionOneKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
