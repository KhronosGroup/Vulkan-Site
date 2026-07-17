# VK_NV_extended_sparse_address_space(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_extended_sparse_address_space.html

## Table of Contents

- [Name](#_name)
- [VK_NV_extended_sparse_address_space](#VK_NV_extended_sparse_address_space)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_extended_sparse_address_space - device extension

**Name String**

`VK_NV_extended_sparse_address_space`

**Extension Type**

Device extension

**Registered Extension Number**

493

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Russell Chou [russellcnv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_extended_sparse_address_space] @russellcnv%0A*Here describe the issue or question you have about the VK_NV_extended_sparse_address_space extension*)

**Last Modified Date**

2023-10-03

**Contributors**

* 
Russell Chou, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Eric Werness, NVIDIA

* 
Jeff Bolz, NVIDIA

Implementations may be able to support an extended address space for sparse
memory resources, but only for a certain set of usages.

This extension adds a query for the extended limit, and the supported usages
that are allowed for that limit.
This limit is an increase to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`sparseAddressSpaceSize` when the
[VkImage](VkImage.html) or [VkBuffer](VkBuffer.html) uses only usages that are supported.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV](VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV.html)

* 
`VK_NV_EXTENDED_SPARSE_ADDRESS_SPACE_EXTENSION_NAME`

* 
`VK_NV_EXTENDED_SPARSE_ADDRESS_SPACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_PROPERTIES_NV](VkStructureType.html)

* 
Revision 1, 2023-10-03 (Russell Chou)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_extended_sparse_address_space).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
