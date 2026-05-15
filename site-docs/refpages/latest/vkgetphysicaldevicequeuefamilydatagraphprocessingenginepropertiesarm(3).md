# vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM - Query the properties of a data graph processing engine for a specific queue family of a physical device

To query the properties of a data graph processing engine for a specific
queue family of a physical device, call:

// Provided by VK_ARM_data_graph
void vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM* pQueueFamilyDataGraphProcessingEngineInfo,
    VkQueueFamilyDataGraphProcessingEnginePropertiesARM* pQueueFamilyDataGraphProcessingEngineProperties);

* 
`physicalDevice` is the physical device to query.

* 
`pQueueFamilyDataGraphProcessingEngineInfo` is a pointer to a
[VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM.html)
structure that specifies the data graph processing engine and queue
family to query.

* 
`pQueueFamilyDataGraphProcessingEngineProperties` is a pointer to a
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html) structure in
which the queries properties are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineInfo-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineInfo-parameter

 `pQueueFamilyDataGraphProcessingEngineInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM.html) structure

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM-pQueueFamilyDataGraphProcessingEngineProperties-parameter

 `pQueueFamilyDataGraphProcessingEngineProperties` **must** be a valid pointer to a [VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html) structure

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM.html), [VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
