# vkUnmapMemory2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUnmapMemory2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUnmapMemory2 - Unmap a previously mapped memory object

To unmap a memory object once host access to it is no longer needed by the
application, call:

// Provided by VK_VERSION_1_4
VkResult vkUnmapMemory2(
    VkDevice                                    device,
    const VkMemoryUnmapInfo*                    pMemoryUnmapInfo);

// Provided by VK_KHR_map_memory2
// Equivalent to vkUnmapMemory2
VkResult vkUnmapMemory2KHR(
    VkDevice                                    device,
    const VkMemoryUnmapInfo*                    pMemoryUnmapInfo);

* 
`device` is the logical device that owns the memory.

* 
`pMemoryUnmapInfo` is a pointer to a [VkMemoryUnmapInfo](VkMemoryUnmapInfo.html)
structure describing parameters of the unmap.

This function behaves identically to [vkUnmapMemory](vkUnmapMemory.html) except that it gets
its parameters via an extensible structure pointer rather than directly as
function arguments.

Valid Usage (Implicit)

* 
[](#VUID-vkUnmapMemory2-device-parameter) VUID-vkUnmapMemory2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkUnmapMemory2-pMemoryUnmapInfo-parameter) VUID-vkUnmapMemory2-pMemoryUnmapInfo-parameter

 `pMemoryUnmapInfo` **must** be a valid pointer to a valid [VkMemoryUnmapInfo](VkMemoryUnmapInfo.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_map_memory2](VK_KHR_map_memory2.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDevice](VkDevice.html), [VkMemoryUnmapInfo](VkMemoryUnmapInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkUnmapMemory2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
