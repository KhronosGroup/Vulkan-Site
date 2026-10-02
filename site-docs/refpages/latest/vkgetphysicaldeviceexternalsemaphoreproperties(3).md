# vkGetPhysicalDeviceExternalSemaphoreProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceExternalSemaphoreProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceExternalSemaphoreProperties - Function for querying external semaphore handle capabilities.

Semaphores **may** support import and export of their
[payload](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-payloads) to external handles.
To query the external handle types supported by semaphores, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceExternalSemaphoreProperties(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalSemaphoreInfo* pExternalSemaphoreInfo,
    VkExternalSemaphoreProperties*              pExternalSemaphoreProperties);

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to vkGetPhysicalDeviceExternalSemaphoreProperties
void vkGetPhysicalDeviceExternalSemaphorePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalSemaphoreInfo* pExternalSemaphoreInfo,
    VkExternalSemaphoreProperties*              pExternalSemaphoreProperties);

* 
`physicalDevice` is the physical device from which to query the
semaphore capabilities.

* 
`pExternalSemaphoreInfo` is a pointer to a
[VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html) structure describing the
parameters that would be consumed by [vkCreateSemaphore](vkCreateSemaphore.html).

* 
`pExternalSemaphoreProperties` is a pointer to a
[VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html) structure in which capabilities are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreInfo-parameter) VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreInfo-parameter

 `pExternalSemaphoreInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreProperties-parameter) VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreProperties-parameter

 `pExternalSemaphoreProperties` **must** be a valid pointer to a [VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html) structure

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceExternalSemaphoreProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
