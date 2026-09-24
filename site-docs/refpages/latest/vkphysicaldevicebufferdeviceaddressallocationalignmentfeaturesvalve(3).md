# VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE - Structure describing support for alignment request on buffer device addresses

The
`VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE`
structure is defined as:

// Provided by VK_VALVE_buffer_device_address_allocation_alignment
typedef struct VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           bufferDeviceAddressAllocationAlignment;
} VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`bufferDeviceAddressAllocationAlignment` indicates whether the
implementation supports requesting a minimum alignment for buffer device
addresses when allocating memory or creating sparse buffers.

If the `VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_ALLOCATION_ALIGNMENT_FEATURES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VALVE_buffer_device_address_allocation_alignment](VK_VALVE_buffer_device_address_allocation_alignment.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceBufferDeviceAddressAllocationAlignmentFeaturesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
