# VkPhysicalDeviceLayeredDriverPropertiesMSFT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLayeredDriverPropertiesMSFT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLayeredDriverPropertiesMSFT - Structure containing information about driver layering for a physical device

The `VkPhysicalDeviceLayeredDriverPropertiesMSFT` structure is defined
as:

// Provided by VK_MSFT_layered_driver
typedef struct VkPhysicalDeviceLayeredDriverPropertiesMSFT {
    VkStructureType                     sType;
    void*                               pNext;
    VkLayeredDriverUnderlyingApiMSFT    underlyingAPI;
} VkPhysicalDeviceLayeredDriverPropertiesMSFT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`underlyingAPI` is a [VkLayeredDriverUnderlyingApiMSFT](VkLayeredDriverUnderlyingApiMSFT.html) value
indicating which underlying API is used to implement the layered driver,
or [VK_LAYERED_DRIVER_UNDERLYING_API_NONE_MSFT](VkLayeredDriverUnderlyingApiMSFT.html) if the driver is not
layered.

These are properties of the driver layering information of a physical
device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredDriverPropertiesMSFT-sType-sType) VUID-VkPhysicalDeviceLayeredDriverPropertiesMSFT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_DRIVER_PROPERTIES_MSFT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_MSFT_layered_driver](VK_MSFT_layered_driver.html), [VkLayeredDriverUnderlyingApiMSFT](VkLayeredDriverUnderlyingApiMSFT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceLayeredDriverPropertiesMSFT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
