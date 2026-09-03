# VkPhysicalDeviceMaintenance4Properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance4Properties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance4Properties - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance4

The `VkPhysicalDeviceMaintenance4Properties` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceMaintenance4Properties {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       maxBufferSize;
} VkPhysicalDeviceMaintenance4Properties;

// Provided by VK_KHR_maintenance4
// Equivalent to VkPhysicalDeviceMaintenance4Properties
typedef VkPhysicalDeviceMaintenance4Properties VkPhysicalDeviceMaintenance4PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxBufferSize` is the
maximum size `VkBuffer` that **can** be created.

If the `VkPhysicalDeviceMaintenance4Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance4Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance4Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance4](VK_KHR_maintenance4.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance4Properties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
