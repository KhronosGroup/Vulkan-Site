# vkGetBufferMemoryRequirements2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetBufferMemoryRequirements2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetBufferMemoryRequirements2 - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for a buffer resource, call:

// Provided by VK_VERSION_1_1
void vkGetBufferMemoryRequirements2(
    VkDevice                                    device,
    const VkBufferMemoryRequirementsInfo2*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to vkGetBufferMemoryRequirements2
void vkGetBufferMemoryRequirements2KHR(
    VkDevice                                    device,
    const VkBufferMemoryRequirementsInfo2*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pInfo` is a pointer to a [VkBufferMemoryRequirementsInfo2](VkBufferMemoryRequirementsInfo2.html)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferMemoryRequirements2-device-parameter) VUID-vkGetBufferMemoryRequirements2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetBufferMemoryRequirements2-pInfo-parameter) VUID-vkGetBufferMemoryRequirements2-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferMemoryRequirementsInfo2](VkBufferMemoryRequirementsInfo2.html) structure

* 
[](#VUID-vkGetBufferMemoryRequirements2-pMemoryRequirements-parameter) VUID-vkGetBufferMemoryRequirements2-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkBufferMemoryRequirementsInfo2](VkBufferMemoryRequirementsInfo2.html), [VkDevice](VkDevice.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetBufferMemoryRequirements2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
