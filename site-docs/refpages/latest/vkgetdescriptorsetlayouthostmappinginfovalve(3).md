# vkGetDescriptorSetLayoutHostMappingInfoVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDescriptorSetLayoutHostMappingInfoVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDescriptorSetLayoutHostMappingInfoVALVE - Stub description of vkGetDescriptorSetLayoutHostMappingInfoVALVE

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_VALVE_descriptor_set_host_mapping
void vkGetDescriptorSetLayoutHostMappingInfoVALVE(
    VkDevice                                    device,
    const VkDescriptorSetBindingReferenceVALVE* pBindingReference,
    VkDescriptorSetLayoutHostMappingInfoVALVE*  pHostMapping);

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutHostMappingInfoVALVE-device-parameter) VUID-vkGetDescriptorSetLayoutHostMappingInfoVALVE-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDescriptorSetLayoutHostMappingInfoVALVE-pBindingReference-parameter) VUID-vkGetDescriptorSetLayoutHostMappingInfoVALVE-pBindingReference-parameter

 `pBindingReference` **must** be a valid pointer to a valid [VkDescriptorSetBindingReferenceVALVE](VkDescriptorSetBindingReferenceVALVE.html) structure

* 
[](#VUID-vkGetDescriptorSetLayoutHostMappingInfoVALVE-pHostMapping-parameter) VUID-vkGetDescriptorSetLayoutHostMappingInfoVALVE-pHostMapping-parameter

 `pHostMapping` **must** be a valid pointer to a [VkDescriptorSetLayoutHostMappingInfoVALVE](VkDescriptorSetLayoutHostMappingInfoVALVE.html) structure

[VK_VALVE_descriptor_set_host_mapping](VK_VALVE_descriptor_set_host_mapping.html), [VkDescriptorSetBindingReferenceVALVE](VkDescriptorSetBindingReferenceVALVE.html), [VkDescriptorSetLayoutHostMappingInfoVALVE](VkDescriptorSetLayoutHostMappingInfoVALVE.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkGetDescriptorSetLayoutHostMappingInfoVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
