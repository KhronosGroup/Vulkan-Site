# VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE - Stub description of VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE

There is currently no specification language written for this type.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_VALVE_descriptor_set_host_mapping
typedef struct VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorSetHostMapping;
} VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE;

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_SET_HOST_MAPPING_FEATURES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VALVE_descriptor_set_host_mapping](VK_VALVE_descriptor_set_host_mapping.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
