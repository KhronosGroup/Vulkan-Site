# vkGetImageMemoryRequirements2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageMemoryRequirements2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageMemoryRequirements2 - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for an image resource, call:

// Provided by VK_VERSION_1_1
void vkGetImageMemoryRequirements2(
    VkDevice                                    device,
    const VkImageMemoryRequirementsInfo2*       pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to vkGetImageMemoryRequirements2
void vkGetImageMemoryRequirements2KHR(
    VkDevice                                    device,
    const VkImageMemoryRequirementsInfo2*       pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`pInfo` is a pointer to a [VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the image object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageMemoryRequirements2-device-parameter) VUID-vkGetImageMemoryRequirements2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageMemoryRequirements2-pInfo-parameter) VUID-vkGetImageMemoryRequirements2-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html) structure

* 
[](#VUID-vkGetImageMemoryRequirements2-pMemoryRequirements-parameter) VUID-vkGetImageMemoryRequirements2-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageMemoryRequirements2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
