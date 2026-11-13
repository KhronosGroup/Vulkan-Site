# vkGetPhysicalDeviceExternalBufferProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceExternalBufferProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceExternalBufferProperties - Query external handle types supported by buffers

To query the external handle types supported by buffers, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceExternalBufferProperties(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalBufferInfo*   pExternalBufferInfo,
    VkExternalBufferProperties*                 pExternalBufferProperties);

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to vkGetPhysicalDeviceExternalBufferProperties
void vkGetPhysicalDeviceExternalBufferPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalBufferInfo*   pExternalBufferInfo,
    VkExternalBufferProperties*                 pExternalBufferProperties);

* 
`physicalDevice` is the physical device from which to query the
buffer capabilities.

* 
`pExternalBufferInfo` is a pointer to a
[VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html) structure describing the
parameters that would be consumed by [vkCreateBuffer](vkCreateBuffer.html).

* 
`pExternalBufferProperties` is a pointer to a
[VkExternalBufferProperties](VkExternalBufferProperties.html) structure in which capabilities are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalBufferProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalBufferProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferInfo-parameter) VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferInfo-parameter

 `pExternalBufferInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferProperties-parameter) VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferProperties-parameter

 `pExternalBufferProperties` **must** be a valid pointer to a [VkExternalBufferProperties](VkExternalBufferProperties.html) structure

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalBufferProperties](VkExternalBufferProperties.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceExternalBufferProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
