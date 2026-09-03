# VkPhysicalDeviceFaultPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFaultPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFaultPropertiesKHR - Structure describing fault reporting properties for the physical device

The `VkPhysicalDeviceFaultPropertiesKHR` structure is defined as:

// Provided by VK_KHR_device_fault
typedef struct VkPhysicalDeviceFaultPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxDeviceFaultCount;
} VkPhysicalDeviceFaultPropertiesKHR;

The members of the `VkPhysicalDeviceFaultPropertiesKHR` structure
describe the following:

* 
 `maxDeviceFaultCount` is the maximum
number of instances of [VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html) that will be retained
by the implementation.
This **must** be greater than or equal to 1.
If the application does not retrieve fault reports and overflow occurs,
the oldest fault reports will be overwritten by the most recent record.

If the `VkPhysicalDeviceFaultPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFaultPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceFaultPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_device_fault](VK_KHR_device_fault.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFaultPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
