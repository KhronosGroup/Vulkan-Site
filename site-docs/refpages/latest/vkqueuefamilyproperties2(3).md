# VkQueueFamilyProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyProperties2 - Structure providing information about a queue family

The `VkQueueFamilyProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkQueueFamilyProperties2 {
    VkStructureType            sType;
    void*                      pNext;
    VkQueueFamilyProperties    queueFamilyProperties;
} VkQueueFamilyProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkQueueFamilyProperties2
typedef VkQueueFamilyProperties2 VkQueueFamilyProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyProperties` is a [VkQueueFamilyProperties](VkQueueFamilyProperties.html) structure
which is populated with the same values as in
[vkGetPhysicalDeviceQueueFamilyProperties](vkGetPhysicalDeviceQueueFamilyProperties.html).

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyProperties2-sType-sType) VUID-VkQueueFamilyProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2](VkStructureType.html)

* 
[](#VUID-VkQueueFamilyProperties2-pNext-pNext) VUID-VkQueueFamilyProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkQueueFamilyCheckpointProperties2NV](VkQueueFamilyCheckpointProperties2NV.html), [VkQueueFamilyCheckpointPropertiesNV](VkQueueFamilyCheckpointPropertiesNV.html), [VkQueueFamilyGlobalPriorityProperties](VkQueueFamilyGlobalPriorityProperties.html), [VkQueueFamilyOwnershipTransferPropertiesKHR](VkQueueFamilyOwnershipTransferPropertiesKHR.html), [VkQueueFamilyQueryResultStatusPropertiesKHR](VkQueueFamilyQueryResultStatusPropertiesKHR.html), or [VkQueueFamilyVideoPropertiesKHR](VkQueueFamilyVideoPropertiesKHR.html)

* 
[](#VUID-VkQueueFamilyProperties2-sType-unique) VUID-VkQueueFamilyProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkQueueFamilyProperties](VkQueueFamilyProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html), [vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
