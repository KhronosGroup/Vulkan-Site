# vkGetPhysicalDeviceExternalTensorPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceExternalTensorPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceExternalTensorPropertiesARM - Function for querying external tensor handle capabilities.

To query the external handle types supported by tensors, call:

// Provided by VK_ARM_tensors
void vkGetPhysicalDeviceExternalTensorPropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalTensorInfoARM* pExternalTensorInfo,
    VkExternalTensorPropertiesARM*              pExternalTensorProperties);

* 
`physicalDevice` is the physical device from which to query the
tensor capabilities.

* 
`pExternalTensorInfo` is a pointer to a
[VkPhysicalDeviceExternalTensorInfoARM](VkPhysicalDeviceExternalTensorInfoARM.html) structure describing the
parameters that would be consumed by [vkCreateTensorARM](vkCreateTensorARM.html).

* 
`pExternalTensorProperties` is a pointer to a
[VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html) structure in which the capabilities
are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorInfo-parameter) VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorInfo-parameter

 `pExternalTensorInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalTensorInfoARM](VkPhysicalDeviceExternalTensorInfoARM.html) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorProperties-parameter) VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorProperties-parameter

 `pExternalTensorProperties` **must** be a valid pointer to a [VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html) structure

[VK_ARM_tensors](VK_ARM_tensors.html), [VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceExternalTensorInfoARM](VkPhysicalDeviceExternalTensorInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceExternalTensorPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
