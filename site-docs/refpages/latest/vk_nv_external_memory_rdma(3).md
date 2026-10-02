# VK_NV_external_memory_rdma(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_external_memory_rdma.html

## Table of Contents

- [Name](#_name)
- [VK_NV_external_memory_rdma](#VK_NV_external_memory_rdma)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_external_memory_rdma - device extension

**Name String**

`VK_NV_external_memory_rdma`

**Extension Type**

Device extension

**Registered Extension Number**

372

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_external_memory](VK_KHR_external_memory.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Carsten Rohde [crohde](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_external_memory_rdma] @crohde%0A*Here describe the issue or question you have about the VK_NV_external_memory_rdma extension*)

**Last Modified Date**

2021-04-19

**IP Status**

No known IP claims.

**Contributors**

* 
Carsten Rohde, NVIDIA

This extension adds support for allocating memory which can be used for
remote direct memory access (RDMA) from other devices.

* 
`VkRemoteAddressNV`

* 
[vkGetMemoryRemoteAddressNV](vkGetMemoryRemoteAddressNV.html)

* 
[VkMemoryGetRemoteAddressInfoNV](VkMemoryGetRemoteAddressInfoNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceExternalMemoryRDMAFeaturesNV](VkPhysicalDeviceExternalMemoryRDMAFeaturesNV.html)

* 
`VK_NV_EXTERNAL_MEMORY_RDMA_EXTENSION_NAME`

* 
`VK_NV_EXTERNAL_MEMORY_RDMA_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkMemoryPropertyFlagBits](VkMemoryPropertyFlagBits.html):

* 
[VK_MEMORY_PROPERTY_RDMA_CAPABLE_BIT_NV](VkMemoryPropertyFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_REMOTE_ADDRESS_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_RDMA_FEATURES_NV](VkStructureType.html)

VkPhysicalDeviceMemoryBudgetPropertiesEXT memoryBudgetProperties = { VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_BUDGET_PROPERTIES_EXT };
VkPhysicalDeviceMemoryProperties2 memoryProperties2 = { VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2, &memoryBudgetProperties };
vkGetPhysicalDeviceMemoryProperties2(physicalDevice, &memoryProperties2);
uint32_t heapIndex = (uint32_t)-1;
for (uint32_t memoryType = 0; memoryType 

* 
Revision 1, 2020-12-15 (Carsten Rohde)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_external_memory_rdma).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
