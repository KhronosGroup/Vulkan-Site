# VkPhysicalDeviceLayeredApiPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLayeredApiPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLayeredApiPropertiesKHR - Structure describing a single layered implementation underneath the Vulkan physical device

The `VkPhysicalDeviceLayeredApiPropertiesKHR` structure is defined as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceLayeredApiPropertiesKHR {
    VkStructureType                  sType;
    void*                            pNext;
    uint32_t                         vendorID;
    uint32_t                         deviceID;
    VkPhysicalDeviceLayeredApiKHR    layeredAPI;
    char                             deviceName[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE];
} VkPhysicalDeviceLayeredApiPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vendorID` is a unique identifier for the vendor of the layered
implementation.

* 
`deviceID` is a unique identifier for the layered implementation
among devices available from the vendor.

* 
`layeredAPI` is a [VkPhysicalDeviceLayeredApiKHR](VkPhysicalDeviceLayeredApiKHR.html) specifying the
API implemented by the layered implementation.

* 
`deviceName` is an array of [VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](VK_MAX_PHYSICAL_DEVICE_NAME_SIZE.html)
`char` containing a null-terminated UTF-8 string which is the name of
the device.

If `layeredAPI` is [VK_PHYSICAL_DEVICE_LAYERED_API_VULKAN_KHR](VkPhysicalDeviceLayeredApiKHR.html),
additional Vulkan-specific information can be queried by including the
[VkPhysicalDeviceLayeredApiVulkanPropertiesKHR](VkPhysicalDeviceLayeredApiVulkanPropertiesKHR.html) structure in the
`pNext` chain.
Otherwise if such a structure is included in the `pNext` chain, it is
ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-pNext-pNext) VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPhysicalDeviceLayeredApiVulkanPropertiesKHR](VkPhysicalDeviceLayeredApiVulkanPropertiesKHR.html)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-unique) VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_maintenance7](VK_KHR_maintenance7.html), [VkPhysicalDeviceLayeredApiKHR](VkPhysicalDeviceLayeredApiKHR.html), [VkPhysicalDeviceLayeredApiPropertiesListKHR](VkPhysicalDeviceLayeredApiPropertiesListKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceLayeredApiPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
