# VkPhysicalDeviceMemoryProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMemoryProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMemoryProperties2 - Structure specifying physical device memory properties

The `VkPhysicalDeviceMemoryProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMemoryProperties2 {
    VkStructureType                     sType;
    void*                               pNext;
    VkPhysicalDeviceMemoryProperties    memoryProperties;
} VkPhysicalDeviceMemoryProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceMemoryProperties2
typedef VkPhysicalDeviceMemoryProperties2 VkPhysicalDeviceMemoryProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryProperties` is a [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)
structure which is populated with the same values as in
[vkGetPhysicalDeviceMemoryProperties](vkGetPhysicalDeviceMemoryProperties.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryProperties2-sType-sType) VUID-VkPhysicalDeviceMemoryProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceMemoryProperties2-pNext-pNext) VUID-VkPhysicalDeviceMemoryProperties2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPhysicalDeviceMemoryBudgetPropertiesEXT](VkPhysicalDeviceMemoryBudgetPropertiesEXT.html)

* 
[](#VUID-VkPhysicalDeviceMemoryProperties2-sType-unique) VUID-VkPhysicalDeviceMemoryProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceMemoryProperties2](vkGetPhysicalDeviceMemoryProperties2.html), [vkGetPhysicalDeviceMemoryProperties2](vkGetPhysicalDeviceMemoryProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkPhysicalDeviceMemoryProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
