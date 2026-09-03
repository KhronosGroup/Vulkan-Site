# VkPhysicalDeviceExternalSemaphoreInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalSemaphoreInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalSemaphoreInfo - Structure specifying semaphore creation parameters.

The `VkPhysicalDeviceExternalSemaphoreInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalSemaphoreInfo {
    VkStructureType                          sType;
    const void*                              pNext;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalSemaphoreInfo;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkPhysicalDeviceExternalSemaphoreInfo
typedef VkPhysicalDeviceExternalSemaphoreInfo VkPhysicalDeviceExternalSemaphoreInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value
specifying the external semaphore handle type for which capabilities
will be returned.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-sType) VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-pNext-pNext) VUID-VkPhysicalDeviceExternalSemaphoreInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-unique) VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalSemaphoreInfo-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html), [vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceExternalSemaphoreInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
