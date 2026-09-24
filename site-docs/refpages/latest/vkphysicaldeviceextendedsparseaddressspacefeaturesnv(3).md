# VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV - Structure describing feature to use extended sparse address space

The `VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV` structure is
defined as:

// Provided by VK_NV_extended_sparse_address_space
typedef struct VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedSparseAddressSpace;
} VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedSparseAddressSpace`
indicates that the implementation supports allowing certain usages of
sparse memory resources to exceed
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`.
See [VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV.html).

If the `VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV-sType-sType) VUID-VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_extended_sparse_address_space](VK_NV_extended_sparse_address_space.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
