# VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV - Structure describing sparse address space limits of an implementation

The `VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV` structure
is defined as:

// Provided by VK_NV_extended_sparse_address_space
typedef struct VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkDeviceSize          extendedSparseAddressSpaceSize;
    VkImageUsageFlags     extendedSparseImageUsageFlags;
    VkBufferUsageFlags    extendedSparseBufferUsageFlags;
} VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`extendedSparseAddressSpaceSize` is the total amount of address
space available, in bytes, for sparse memory resources of all usages if
the [    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is enabled.
This **must** be greater than or equal to
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`, and the
difference in space **must** only be used with usages allowed below.
This is an upper bound on the sum of the sizes of all sparse resources,
regardless of whether any memory is bound to them.

* 

`extendedSparseImageUsageFlags` is a bitmask of
[VkImageUsageFlagBits](VkImageUsageFlagBits.html) of usages which **may** allow an implementation
to use the full `extendedSparseAddressSpaceSize` space.

* 

`extendedSparseBufferUsageFlags` is a bitmask of
[VkBufferUsageFlagBits](VkBufferUsageFlagBits.html) of usages which **may** allow an implementation
to use the full `extendedSparseAddressSpaceSize` space.

If the `VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV-sType-sType) VUID-VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_extended_sparse_address_space](VK_NV_extended_sparse_address_space.html), [VkBufferUsageFlags](VkBufferUsageFlags.html), `VkDeviceSize`, [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
