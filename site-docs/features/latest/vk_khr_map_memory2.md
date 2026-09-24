# VK_KHR_map_memory2

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_map_memory2.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [2.1. API Features](#_api_features)
- [2.1._API_Features](#_api_features)
- [3. Issues](#_issues)
- [3.1. Should we do further reworks of the memory mapping API?](#_should_we_do_further_reworks_of_the_memory_mapping_api)
- [3.1._Should_we_do_further_reworks_of_the_memory_mapping_API?](#_should_we_do_further_reworks_of_the_memory_mapping_api)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)

[2.1. API Features](#_api_features)

[3. Issues](#_issues)

[3.1. Should we do further reworks of the memory mapping API?](#_should_we_do_further_reworks_of_the_memory_mapping_api)

This document proposes adding extensible version of `vkMapMemory()` and
`vkUnmapMemory()`.

The current Vulkan memory mapping entry points are not extensible in the
usual sense.
`vkMapMemory()` does have a flags argument which is currently unused, but
neither `vkMapMemory()` nor `vkUnmapMemory()` take an input struct with a
`pNext` which can be extended.

Add new `vkMapMemory2KHR()` and `vkUnmapMemory2KHR()` entry points which
take input structs which are extensible via the usual `pNext` mechanism:

typedef struct VkMemoryMapInfoKHR {
    VkStructureType     sType;
    const void*         pNext;
    VkMemoryMapFlags    flags;
    VkDeviceMemory      memory;
    VkDeviceSize        offset;
    VkDeviceSize        size;
} VkMemoryMapInfoKHR;

VKAPI_ATTR VkResult VKAPI_CALL vkMapMemory2KHR(
    VkDevice                                    device,
    const VkMemoryMapInfoKHR*                   pMemoryMapInfo,
    void**                                      ppData);

typedef struct VkMemoryUnmapInfoKHR {
    VkStructureType          sType;
    const void*              pNext;
    VkMemoryUnmapFlagsKHR    flags;
    VkDeviceMemory           memory;
} VkMemoryUnmapInfoKHR;

VKAPI_ATTR VkResult VKAPI_CALL vkUnmapMemory2KHR(
    VkDevice                                    device,
    const VkMemoryUnmapInfoKHR*                 pMemoryUnmapInfo);

While we are at it, two additional changes are made to `vkUnmapMemory()`
which may be used by upcoming extensions:

It is given a new `VkMemoryUnmapFlagsKHR flags` parameter.  As with
`VkMemoryMapFlags`, it is currently unused.

It gets a `VkResult` return value.  Currently, it is required to always
return `VK_SUCCESS`.  However, VK_KHR_map_memory_placed will add cases
in which unmap can fail.  As long as that extension is not used,
applications are free to ignore the return value as it will always be
required to be `VK_SUCCESS`.

This extension has no independent features

No, further reworks are out-of-scope for this extension.  It is
intended to solve the extensibility problem to enable new functionality,
not add functionality itself.  In that sense, it is similar to
VK_KHR_get_physical_device_properties2 or VK_KHR_copy_commands2.
