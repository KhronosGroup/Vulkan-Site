# VkDescriptorSetBindingReferenceVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetBindingReferenceVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetBindingReferenceVALVE - Stub description of VkDescriptorSetBindingReferenceVALVE

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_VALVE_descriptor_set_host_mapping
typedef struct VkDescriptorSetBindingReferenceVALVE {
    VkStructureType          sType;
    const void*              pNext;
    VkDescriptorSetLayout    descriptorSetLayout;
    uint32_t                 binding;
} VkDescriptorSetBindingReferenceVALVE;

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetBindingReferenceVALVE-sType-sType) VUID-VkDescriptorSetBindingReferenceVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_BINDING_REFERENCE_VALVE](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetBindingReferenceVALVE-pNext-pNext) VUID-VkDescriptorSetBindingReferenceVALVE-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDescriptorSetBindingReferenceVALVE-descriptorSetLayout-parameter) VUID-VkDescriptorSetBindingReferenceVALVE-descriptorSetLayout-parameter

 `descriptorSetLayout` **must** be a valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle

[VK_VALVE_descriptor_set_host_mapping](VK_VALVE_descriptor_set_host_mapping.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkStructureType](VkStructureType.html), [vkGetDescriptorSetLayoutHostMappingInfoVALVE](vkGetDescriptorSetLayoutHostMappingInfoVALVE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkDescriptorSetBindingReferenceVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
