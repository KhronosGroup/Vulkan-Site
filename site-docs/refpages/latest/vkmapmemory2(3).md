# vkMapMemory2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkMapMemory2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkMapMemory2 - Map a memory object into application address space

To retrieve a host virtual address pointer to a region of a mappable memory
object, call:

// Provided by VK_VERSION_1_4
VkResult vkMapMemory2(
    VkDevice                                    device,
    const VkMemoryMapInfo*                      pMemoryMapInfo,
    void**                                      ppData);

// Provided by VK_KHR_map_memory2
// Equivalent to vkMapMemory2
VkResult vkMapMemory2KHR(
    VkDevice                                    device,
    const VkMemoryMapInfo*                      pMemoryMapInfo,
    void**                                      ppData);

* 
`device` is the logical device that owns the memory.

* 
`pMemoryMapInfo` is a pointer to a [VkMemoryMapInfo](VkMemoryMapInfo.html) structure
describing parameters of the map.

* 
`ppData` is a pointer to a `void *` variable in which is returned a
host-accessible pointer to the beginning of the mapped range.
This pointer minus [VkMemoryMapInfo](VkMemoryMapInfo.html)::`offset` **must** be aligned
to at least [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`minMemoryMapAlignment`.

This function behaves identically to [vkMapMemory](vkMapMemory.html) except that it gets
its parameters via an extensible structure pointer rather than directly as
function arguments.

Valid Usage (Implicit)

* 
[](#VUID-vkMapMemory2-device-parameter) VUID-vkMapMemory2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkMapMemory2-pMemoryMapInfo-parameter) VUID-vkMapMemory2-pMemoryMapInfo-parameter

 `pMemoryMapInfo` **must** be a valid pointer to a valid [VkMemoryMapInfo](VkMemoryMapInfo.html) structure

* 
[](#VUID-vkMapMemory2-ppData-parameter) VUID-vkMapMemory2-ppData-parameter

 `ppData` **must** be a valid pointer to a pointer value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_map_memory2](VK_KHR_map_memory2.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDevice](VkDevice.html), [VkMemoryMapInfo](VkMemoryMapInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkMapMemory2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
