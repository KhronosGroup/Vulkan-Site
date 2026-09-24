# VkSparseImageFormatProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageFormatProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageFormatProperties2 - Structure specifying sparse image format properties

The `VkSparseImageFormatProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSparseImageFormatProperties2 {
    VkStructureType                  sType;
    void*                            pNext;
    VkSparseImageFormatProperties    properties;
} VkSparseImageFormatProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkSparseImageFormatProperties2
typedef VkSparseImageFormatProperties2 VkSparseImageFormatProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`properties` is a [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html) structure
which is populated with the same values as in
[vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageFormatProperties2-sType-sType) VUID-VkSparseImageFormatProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2](VkStructureType.html)

* 
[](#VUID-VkSparseImageFormatProperties2-pNext-pNext) VUID-VkSparseImageFormatProperties2-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceSparseImageFormatProperties2](vkGetPhysicalDeviceSparseImageFormatProperties2.html), [vkGetPhysicalDeviceSparseImageFormatProperties2](vkGetPhysicalDeviceSparseImageFormatProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageFormatProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
