# VK_NV_descriptor_pool_overallocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_descriptor_pool_overallocation.html

## Table of Contents

- [Name](#_name)
- [VK_NV_descriptor_pool_overallocation](#VK_NV_descriptor_pool_overallocation)
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

VK_NV_descriptor_pool_overallocation - device extension

**Name String**

`VK_NV_descriptor_pool_overallocation`

**Extension Type**

Device extension

**Registered Extension Number**

547

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_descriptor_pool_overallocation] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_NV_descriptor_pool_overallocation extension*)

**Last Modified Date**

2023-08-30

**Contributors**

* 
Jeff Bolz, NVIDIA

There are scenarios where the application does not know ahead of time how
many descriptor sets it may need to allocate from a descriptor pool, or how
many descriptors of any of the descriptor types it may need to allocate from
the descriptor pool.

This extension gives applications the ability to request the implementation
allow more sets or descriptors to be allocated than initially specified at
descriptor pool creation time, subject to available resources.

The [VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](VkDescriptorPoolCreateFlagBits.html) flag
lets the application allocate more than
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)::`maxSets` descriptor sets, and the
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](VkDescriptorPoolCreateFlagBits.html) lets the
application allocate more descriptors than initially specified by
[VkDescriptorPoolSize](VkDescriptorPoolSize.html)::`descriptorCount` for any descriptor types.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV](VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV.html)

* 
`VK_NV_DESCRIPTOR_POOL_OVERALLOCATION_EXTENSION_NAME`

* 
`VK_NV_DESCRIPTOR_POOL_OVERALLOCATION_SPEC_VERSION`

* 
Extending [VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html):

[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](VkDescriptorPoolCreateFlagBits.html)

* 
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](VkDescriptorPoolCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_POOL_OVERALLOCATION_FEATURES_NV](VkStructureType.html)

* 
Revision 1, 2023-08-30 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_descriptor_pool_overallocation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
