# VkDeviceFaultCountsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultCountsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultCountsEXT - Structure specifying device fault information

The `VkDeviceFaultCountsEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultCountsEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           addressInfoCount;
    uint32_t           vendorInfoCount;
    VkDeviceSize       vendorBinarySize;
} VkDeviceFaultCountsEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressInfoCount` is the number of
[VkDeviceFaultAddressInfoEXT](VkDeviceFaultAddressInfoEXT.html) structures describing either memory
accesses which **may** have caused a page fault, or the addresses of active
instructions at the time of the fault.

* 
`vendorInfoCount` is the number of [VkDeviceFaultVendorInfoEXT](VkDeviceFaultVendorInfoEXT.html)
structures describing vendor-specific fault information.

* 
`vendorBinarySize` is the size in bytes of a vendor-specific binary
crash dump, which may provide additional information when imported into
external tools.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultCountsEXT-sType-sType) VUID-VkDeviceFaultCountsEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_COUNTS_EXT](VkStructureType.html)

* 
[](#VUID-VkDeviceFaultCountsEXT-pNext-pNext) VUID-VkDeviceFaultCountsEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_device_fault](VK_EXT_device_fault.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetDeviceFaultInfoEXT](vkGetDeviceFaultInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultCountsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
