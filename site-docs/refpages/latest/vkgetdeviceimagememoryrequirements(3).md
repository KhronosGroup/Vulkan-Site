# vkGetDeviceImageMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceImageMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceImageMemoryRequirements - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for an image resource without creating
an object, call:

// Provided by VK_VERSION_1_3
void vkGetDeviceImageMemoryRequirements(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_maintenance4
// Equivalent to vkGetDeviceImageMemoryRequirements
void vkGetDeviceImageMemoryRequirementsKHR(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device intended to own the image.

* 
`pInfo` is a pointer to a [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the image object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceImageMemoryRequirements-device-parameter) VUID-vkGetDeviceImageMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceImageMemoryRequirements-pInfo-parameter) VUID-vkGetDeviceImageMemoryRequirements-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html) structure

* 
[](#VUID-vkGetDeviceImageMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetDeviceImageMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_KHR_maintenance4](VK_KHR_maintenance4.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDevice](VkDevice.html), [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetDeviceImageMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
