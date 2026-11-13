# VkPhysicalDeviceMaintenance12PropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance12PropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance12PropertiesKHR - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance12

The `VkPhysicalDeviceMaintenance12PropertiesKHR` structure is defined
as:

// Provided by VK_KHR_maintenance12
typedef struct VkPhysicalDeviceMaintenance12PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxInputAttachmentIndex;
} VkPhysicalDeviceMaintenance12PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxInputAttachmentIndex` is the
maximum input attachment index when the
[`maintenance12`](../../../../spec/latest/chapters/features.html#features-maintenance12) feature is enabled.

If the `VkPhysicalDeviceMaintenance12PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance12PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance12PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_12_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance12](VK_KHR_maintenance12.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance12PropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
