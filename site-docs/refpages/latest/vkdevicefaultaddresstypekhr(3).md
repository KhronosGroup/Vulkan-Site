# VkDeviceFaultAddressTypeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultAddressTypeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultAddressTypeKHR - Page fault access types

Possible values of [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html)::`addressType` are:

// Provided by VK_KHR_device_fault
typedef enum VkDeviceFaultAddressTypeKHR {
    VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_KHR = 0,
    VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_KHR = 1,
    VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_KHR = 2,
    VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_KHR = 3,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_KHR = 4,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_KHR = 5,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_KHR = 6,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_KHR,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_KHR,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_KHR,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_KHR,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_KHR,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_KHR,
  // Provided by VK_EXT_device_fault
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_EXT = VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_KHR,
} VkDeviceFaultAddressTypeKHR;

// Provided by VK_EXT_device_fault
// Equivalent to VkDeviceFaultAddressTypeKHR
typedef VkDeviceFaultAddressTypeKHR VkDeviceFaultAddressTypeEXT;

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_KHR](#) specifies that
[VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html) does not describe a page fault, or an
instruction address.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_KHR](#) specifies that
[VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html) describes a page fault triggered by an
invalid read operation.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_KHR](#) specifies that
[VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html) describes a page fault triggered by an
invalid write operation.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_KHR](#) specifies that
[VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html) describes a page fault triggered by an
attempt to execute non-executable memory.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_KHR](#)
specifies an instruction pointer value at the time the fault occurred.
This may or may not be related to a fault.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_KHR](#)
specifies an instruction pointer value associated with an invalid
instruction fault.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_KHR](#)
specifies an instruction pointer value associated with a fault.

|  | The instruction pointer values recorded may not identify the specific
| --- | --- |
instruction(s) that triggered the fault.
The relationship between the instruction pointer reported and triggering
instruction will be vendor-specific. |

[VK_EXT_device_fault](VK_EXT_device_fault.html), [VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultAddressTypeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
