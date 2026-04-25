# VkDeviceFaultInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultInfoKHR - Structure specifying device fault information

The `VkDeviceFaultInfoKHR` structure is defined as:

// Provided by VK_KHR_device_fault
typedef struct VkDeviceFaultInfoKHR {
    VkStructureType                sType;
    void*                          pNext;
    VkDeviceFaultFlagsKHR          flags;
    uint64_t                       groupId;
    char                           description[VK_MAX_DESCRIPTION_SIZE];
    VkDeviceFaultAddressInfoKHR    faultAddressInfo;
    VkDeviceFaultAddressInfoKHR    instructionAddressInfo;
    VkDeviceFaultVendorInfoKHR     vendorInfo;
} VkDeviceFaultInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDeviceFaultFlagBitsKHR](VkDeviceFaultFlagBitsKHR.html) values giving
information as to the type of fault and which additional fields have
been populated by the driver provide further information.

* 
`groupID` is a monotonically increasing value for associating
multiple entries with a single fault.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a human readable
description of the fault.

* 
`faultAddressInfo` a [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html) structure
providing details of the memory access which caused a fault.

* 
`instructionAddressInfo` a [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html)
structure providing details of the GPU instruction which cause a fault.

* 
`vendorInfo` a [VkDeviceFaultVendorInfoKHR](VkDeviceFaultVendorInfoKHR.html) structure providing
vendor specific fault information.

An implementation **should** populate as many members of
[VkDeviceFaultInfoKHR](#) as possible, given the information available at
the time of the fault and the constraints of the implementation itself.

A single error **may** generate multiple instances of
`VkDeviceFaultInfoKHR`.
For example, multiple page faults **may** be generated, with the
`faultAddress` member of each instance identifying a different memory
address.
In this case, all instances of `VkDeviceFaultInfoKHR` **should** share the
same `groupID` where the implementation can reasonably ascertain this
association.

Due to hardware limitations, `faultAddressInfo` and
`instructionAddressInfo` describe ranges of GPU virtual address space,
rather than precise addresses.
The precise memory address accessed or the precise value of the instruction
pointer **must** lie within the region described.

|  | Each `VkDeviceFaultInfoKHR` reported may (depending on the `flags`
| --- | --- |
set) provide:

* 
A memory access which may have triggered a page fault and may have
contributed to device loss

* 
The value of an active instruction pointer at the time a fault occurred.
This value may be indicative of the active pipeline or shader at the
time of device loss

Comparison of the GPU virtual addresses described by `faultAddressInfo`
or `instructionAddressInfo` to GPU virtual address ranges reported by
the `[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html)` extension may allow
applications to correlate between these addresses and Vulkan objects.
Applications should be aware that these addresses may also correspond to
resources internal to an implementation, which will not be reported via the
`[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html)` extension. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultInfoKHR-sType-sType) VUID-VkDeviceFaultInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceFaultInfoKHR-pNext-pNext) VUID-VkDeviceFaultInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_device_fault](VK_KHR_device_fault.html), [VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html), [VkDeviceFaultFlagsKHR](VkDeviceFaultFlagsKHR.html), [VkDeviceFaultVendorInfoKHR](VkDeviceFaultVendorInfoKHR.html), [VkStructureType](VkStructureType.html), [vkGetDeviceFaultReportsKHR](vkGetDeviceFaultReportsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
