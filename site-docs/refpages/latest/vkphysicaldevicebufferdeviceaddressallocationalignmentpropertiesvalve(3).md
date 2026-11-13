# VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE - Structure describing maximum alignment request on buffer device addresses

The
`VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE`
structure is defined as:

// Provided by VK_VALVE_buffer_device_address_allocation_alignment
typedef struct VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxBufferDeviceAddressAllocationAlignment;
} VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxBufferDeviceAddressAllocationAlignment` indicates the maximum
alignment which **can** be requested when allocating buffer device
addresses.

If the implementation already requires device memory allocation alignments
greater-or-equal to the minimum limit of 64 KiB, implementations **should** not
advertise a larger limit than what the implementation already uses
internally, effectively making this extension a no-op, while letting the
application have some guarantees for returned device addresses.

If the `VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE-sType-sType) VUID-VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_ALLOCATION_ALIGNMENT_PROPERTIES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_VALVE_buffer_device_address_allocation_alignment](VK_VALVE_buffer_device_address_allocation_alignment.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentPropertiesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
