# VkDescriptorSetLayoutHostMappingInfoVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetLayoutHostMappingInfoVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetLayoutHostMappingInfoVALVE - Stub description of VkDescriptorSetLayoutHostMappingInfoVALVE

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_VALVE_descriptor_set_host_mapping
typedef struct VkDescriptorSetLayoutHostMappingInfoVALVE {
    VkStructureType    sType;
    void*              pNext;
    size_t             descriptorOffset;
    uint32_t           descriptorSize;
} VkDescriptorSetLayoutHostMappingInfoVALVE;

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutHostMappingInfoVALVE-sType-sType) VUID-VkDescriptorSetLayoutHostMappingInfoVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_HOST_MAPPING_INFO_VALVE](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetLayoutHostMappingInfoVALVE-pNext-pNext) VUID-VkDescriptorSetLayoutHostMappingInfoVALVE-pNext-pNext

 `pNext` **must** be `NULL`

[VK_VALVE_descriptor_set_host_mapping](VK_VALVE_descriptor_set_host_mapping.html), [VkStructureType](VkStructureType.html), [vkGetDescriptorSetLayoutHostMappingInfoVALVE](vkGetDescriptorSetLayoutHostMappingInfoVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkDescriptorSetLayoutHostMappingInfoVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
