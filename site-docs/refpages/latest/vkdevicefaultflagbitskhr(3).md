# VkDeviceFaultFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultFlagBitsKHR - Bits which may be set in a VkDeviceFaultFlagsKHR bitmask

Bits which **can** be set in [VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html)::`flags` providing
information of the status of the fault reported and which additional fields
have been populated by the driver, are:

// Provided by VK_KHR_device_fault
typedef enum VkDeviceFaultFlagBitsKHR {
    VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR = 0x00000001,
    VK_DEVICE_FAULT_FLAG_MEMORY_ADDRESS_KHR = 0x00000002,
    VK_DEVICE_FAULT_FLAG_INSTRUCTION_ADDRESS_KHR = 0x00000004,
    VK_DEVICE_FAULT_FLAG_VENDOR_KHR = 0x00000008,
    VK_DEVICE_FAULT_FLAG_WATCHDOG_TIMEOUT_KHR = 0x00000010,
    VK_DEVICE_FAULT_FLAG_OVERFLOW_KHR = 0x00000020,
} VkDeviceFaultFlagBitsKHR;

* 
[VK_DEVICE_FAULT_FLAG_DEVICE_LOST_KHR](#) specifies that the fault has
resulted in a device lost condition.
No subsequent entries will be returned for this device.

* 
[VK_DEVICE_FAULT_FLAG_MEMORY_ADDRESS_KHR](#) specifies that the fault
has associated memory access address information which is stored in the
faultAddressInfo field (see [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html)).

* 
[VK_DEVICE_FAULT_FLAG_INSTRUCTION_ADDRESS_KHR](#) specifies that the
fault has an associated instruction address which is stored in the
instructionAddressInfo field (see [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html)).

* 
[VK_DEVICE_FAULT_FLAG_VENDOR_KHR](#) specifies that the fault has
associated vendor information stored in the vendorInfo field (see
[VkDeviceFaultVendorInfoKHR](VkDeviceFaultVendorInfoKHR.html)).

* 
[VK_DEVICE_FAULT_FLAG_WATCHDOG_TIMEOUT_KHR](#) specifies that the fault
was the result of a GPU timeout.
Further information **may** be made available using other platform specific
extensions via the pNext chain of the [VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html)
structure.

* 
[VK_DEVICE_FAULT_FLAG_OVERFLOW_KHR](#) specifies that prior faults have
occurred, but information about them is no longer available.
This typically indicates that faults are occurring more rapidly than the
calling application is able to read them back.

[VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDeviceFaultFlagsKHR](VkDeviceFaultFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
