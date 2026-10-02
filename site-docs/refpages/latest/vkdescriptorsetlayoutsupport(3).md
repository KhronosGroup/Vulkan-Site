# VkDescriptorSetLayoutSupport(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetLayoutSupport.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetLayoutSupport - Structure returning information about whether a descriptor set layout can be supported

Information about support for the descriptor set layout is returned in a
`VkDescriptorSetLayoutSupport` structure:

// Provided by VK_VERSION_1_1
typedef struct VkDescriptorSetLayoutSupport {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           supported;
} VkDescriptorSetLayoutSupport;

// Provided by VK_KHR_maintenance3
// Equivalent to VkDescriptorSetLayoutSupport
typedef VkDescriptorSetLayoutSupport VkDescriptorSetLayoutSupportKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supported` specifies whether the descriptor set layout **can** be
created.

`supported` will be [VK_TRUE](VK_TRUE.html) if the descriptor set **can** be created,
or else [VK_FALSE](VK_FALSE.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutSupport-sType-sType) VUID-VkDescriptorSetLayoutSupport-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetLayoutSupport-pNext-pNext) VUID-VkDescriptorSetLayoutSupport-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorSetVariableDescriptorCountLayoutSupport](VkDescriptorSetVariableDescriptorCountLayoutSupport.html)

* 
[](#VUID-VkDescriptorSetLayoutSupport-sType-unique) VUID-VkDescriptorSetLayoutSupport-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_maintenance3](VK_KHR_maintenance3.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html), [vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html), [vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetLayoutSupport).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
