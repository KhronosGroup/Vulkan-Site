# vkGetBufferMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetBufferMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetBufferMemoryRequirements - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for a buffer resource, call:

// Provided by VK_VERSION_1_0
void vkGetBufferMemoryRequirements(
    VkDevice                                    device,
    VkBuffer                                    buffer,
    VkMemoryRequirements*                       pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`buffer` is the buffer to query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements](VkMemoryRequirements.html)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferMemoryRequirements-device-parameter) VUID-vkGetBufferMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetBufferMemoryRequirements-buffer-parameter) VUID-vkGetBufferMemoryRequirements-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkGetBufferMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetBufferMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements](VkMemoryRequirements.html) structure

* 
[](#VUID-vkGetBufferMemoryRequirements-buffer-parent) VUID-vkGetBufferMemoryRequirements-buffer-parent

 `buffer` **must** have been created, allocated, or retrieved from `device`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkDevice](VkDevice.html), [VkMemoryRequirements](VkMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetBufferMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
