# vkUnmapMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUnmapMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUnmapMemory - Unmap a previously mapped memory object

To unmap a memory object once host access to it is no longer needed by the
application, call:

// Provided by VK_VERSION_1_0
void vkUnmapMemory(
    VkDevice                                    device,
    VkDeviceMemory                              memory);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the memory object to be unmapped.

Calling `vkUnmapMemory` is equivalent to calling [vkUnmapMemory2](vkUnmapMemory2.html)
with an empty `pNext` chain and `flags` set to zero.

Valid Usage

* 
[](#VUID-vkUnmapMemory-memory-00689) VUID-vkUnmapMemory-memory-00689

`memory` **must** be currently host mapped

Valid Usage (Implicit)

* 
[](#VUID-vkUnmapMemory-device-parameter) VUID-vkUnmapMemory-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkUnmapMemory-memory-parameter) VUID-vkUnmapMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkUnmapMemory-memory-parent) VUID-vkUnmapMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkUnmapMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
