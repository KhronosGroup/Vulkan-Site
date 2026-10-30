# VkDeviceFaultDebugInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultDebugInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultDebugInfoKHR - Structure allowing retrieval of the vendor binary crash dump

The `VkDeviceFaultDebugInfoKHR` structure is defined as:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vendorBinarySize` is the size in bytes of a vendor-specific binary
crash dump, which **may** provide additional information when imported into
external tools.

* 
`pVendorBinaryData` is `NULL` or a pointer to `vendorBinarySize`
number of bytes of data, which will be populated with a vendor-specific
binary crash dump, as described in [Vendor    Binary Crash Dumps](../../../../spec/latest/chapters/debugging.html#vendor-binary-crash-dumps).

// Provided by VK_KHR_device_fault
typedef struct VkDeviceFaultDebugInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           vendorBinarySize;
    void*              pVendorBinaryData;
} VkDeviceFaultDebugInfoKHR;

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultDebugInfoKHR-sType-sType) VUID-VkDeviceFaultDebugInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_DEBUG_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceFaultDebugInfoKHR-pNext-pNext) VUID-VkDeviceFaultDebugInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDeviceFaultShaderAbortMessageInfoKHR](VkDeviceFaultShaderAbortMessageInfoKHR.html)

* 
[](#VUID-VkDeviceFaultDebugInfoKHR-sType-unique) VUID-VkDeviceFaultDebugInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_device_fault](VK_KHR_device_fault.html), [VkStructureType](VkStructureType.html), [vkGetDeviceFaultDebugInfoKHR](vkGetDeviceFaultDebugInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultDebugInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
