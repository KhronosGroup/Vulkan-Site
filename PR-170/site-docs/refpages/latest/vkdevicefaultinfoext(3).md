# VkDeviceFaultInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultInfoEXT - Structure specifying device fault information

The `VkDeviceFaultInfoEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultInfoEXT {
    VkStructureType                 sType;
    void*                           pNext;
    char                            description[VK_MAX_DESCRIPTION_SIZE];
    VkDeviceFaultAddressInfoEXT*    pAddressInfos;
    VkDeviceFaultVendorInfoEXT*     pVendorInfos;
    void*                           pVendorBinaryData;
} VkDeviceFaultInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which is a human readable
description of the fault.

* 
`pAddressInfos` is `NULL` or a pointer to an array of
[VkDeviceFaultAddressInfoEXT](VkDeviceFaultAddressInfoEXT.html) structures describing either memory
accesses which **may** have caused a page fault, or describing active
instruction pointers at the time of the fault.
If not `NULL`, each element of `pAddressInfos` describes the a
bounded region of GPU virtual address space containing either the GPU
virtual address accessed, or the value of an active instruction pointer.

* 
`pVendorInfos` is `NULL` or a pointer to an array of
[VkDeviceFaultVendorInfoEXT](VkDeviceFaultVendorInfoEXT.html) structures describing vendor-specific
fault information.

* 
`pVendorBinaryData` is `NULL` or a pointer to `vendorBinarySize`
number of bytes of data, which will be populated with a vendor-specific
binary crash dump, as described in [Vendor    Binary Crash Dumps](../../../../spec/latest/chapters/debugging.html#vendor-binary-crash-dumps).

An implementation **should** populate as many members of
[VkDeviceFaultInfoEXT](#) as possible, given the information available at
the time of the fault and the constraints of the implementation itself.

Due to hardware limitations, `pAddressInfos` describes ranges of GPU
virtual address space, rather than precise addresses.
The precise memory address accessed or the precise value of the instruction
pointer **must** lie within the region described.

|  | Each element of `pAddressInfos` describes either:
| --- | --- |

* 
A memory access which may have triggered a page fault and may have
contributed to device loss

* 
The value of an active instruction pointer at the time a fault occurred.
This value may be indicative of the active pipeline or shader at the
time of device loss

Comparison of the GPU virtual addresses described by `pAddressInfos` to
GPU virtual address ranges reported by the
`[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html)` extension may allow
applications to correlate between these addresses and Vulkan objects.
Applications should be aware that these addresses may also correspond to
resources internal to an implementation, which will not be reported via the
`[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html)` extension. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultInfoEXT-sType-sType) VUID-VkDeviceFaultInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDeviceFaultInfoEXT-pNext-pNext) VUID-VkDeviceFaultInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_device_fault](VK_EXT_device_fault.html), [VkDeviceFaultAddressInfoEXT](VkDeviceFaultAddressInfoEXT.html), [VkDeviceFaultVendorInfoEXT](VkDeviceFaultVendorInfoEXT.html), [VkStructureType](VkStructureType.html), [vkGetDeviceFaultInfoEXT](vkGetDeviceFaultInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
