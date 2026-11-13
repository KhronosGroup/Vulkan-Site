# vkGetDescriptorSetHostMappingVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDescriptorSetHostMappingVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDescriptorSetHostMappingVALVE - Stub description of vkGetDescriptorSetHostMappingVALVE

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_VALVE_descriptor_set_host_mapping
void vkGetDescriptorSetHostMappingVALVE(
    VkDevice                                    device,
    VkDescriptorSet                             descriptorSet,
    void**                                      ppData);

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetHostMappingVALVE-device-parameter) VUID-vkGetDescriptorSetHostMappingVALVE-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDescriptorSetHostMappingVALVE-descriptorSet-parameter) VUID-vkGetDescriptorSetHostMappingVALVE-descriptorSet-parameter

 `descriptorSet` **must** be a valid [VkDescriptorSet](VkDescriptorSet.html) handle

* 
[](#VUID-vkGetDescriptorSetHostMappingVALVE-ppData-parameter) VUID-vkGetDescriptorSetHostMappingVALVE-ppData-parameter

 `ppData` **must** be a valid pointer to a pointer value

* 
[](#VUID-vkGetDescriptorSetHostMappingVALVE-descriptorSet-parent) VUID-vkGetDescriptorSetHostMappingVALVE-descriptorSet-parent

 `descriptorSet` **must** have been created, allocated, or retrieved from `device`

[VK_VALVE_descriptor_set_host_mapping](VK_VALVE_descriptor_set_host_mapping.html), [VkDescriptorSet](VkDescriptorSet.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkGetDescriptorSetHostMappingVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
