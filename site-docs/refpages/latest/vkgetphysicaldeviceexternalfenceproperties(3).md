# vkGetPhysicalDeviceExternalFenceProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceExternalFenceProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceExternalFenceProperties - Function for querying external fence handle capabilities.

Fences **may** support import and export of their
[payload](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-payloads) to external handles.
To query the external handle types supported by fences, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceExternalFenceProperties(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalFenceInfo*    pExternalFenceInfo,
    VkExternalFenceProperties*                  pExternalFenceProperties);

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to vkGetPhysicalDeviceExternalFenceProperties
void vkGetPhysicalDeviceExternalFencePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalFenceInfo*    pExternalFenceInfo,
    VkExternalFenceProperties*                  pExternalFenceProperties);

* 
`physicalDevice` is the physical device from which to query the
fence capabilities.

* 
`pExternalFenceInfo` is a pointer to a
[VkPhysicalDeviceExternalFenceInfo](VkPhysicalDeviceExternalFenceInfo.html) structure describing the
parameters that would be consumed by [vkCreateFence](vkCreateFence.html).

* 
`pExternalFenceProperties` is a pointer to a
[VkExternalFenceProperties](VkExternalFenceProperties.html) structure in which capabilities are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalFenceProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalFenceProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceInfo-parameter) VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceInfo-parameter

 `pExternalFenceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalFenceInfo](VkPhysicalDeviceExternalFenceInfo.html) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceProperties-parameter) VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceProperties-parameter

 `pExternalFenceProperties` **must** be a valid pointer to a [VkExternalFenceProperties](VkExternalFenceProperties.html) structure

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalFenceProperties](VkExternalFenceProperties.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceExternalFenceInfo](VkPhysicalDeviceExternalFenceInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceExternalFenceProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
