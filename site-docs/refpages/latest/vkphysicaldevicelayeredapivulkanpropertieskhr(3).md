# VkPhysicalDeviceLayeredApiVulkanPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLayeredApiVulkanPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLayeredApiVulkanPropertiesKHR - Structure describing physical device properties of a layered Vulkan implementation underneath the Vulkan physical device

The `VkPhysicalDeviceLayeredApiVulkanPropertiesKHR` structure is defined
as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceLayeredApiVulkanPropertiesKHR {
    VkStructureType                sType;
    void*                          pNext;
    VkPhysicalDeviceProperties2    properties;
} VkPhysicalDeviceLayeredApiVulkanPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`properties` is a [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) in which
properties of the underlying layered Vulkan implementation are returned.

The implementation **must** zero-fill the contents of
`properties.properties.limits` and
`properties.properties.sparseProperties`.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-pNext-10011) VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-pNext-10011

Only [VkPhysicalDeviceDriverProperties](VkPhysicalDeviceDriverProperties.html) and
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html) are allowed in the `pNext` chain
of `properties`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_VULKAN_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html)

[VK_KHR_maintenance7](VK_KHR_maintenance7.html), [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceLayeredApiVulkanPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
