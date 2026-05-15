# vkSetDeviceMemoryPriorityEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetDeviceMemoryPriorityEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetDeviceMemoryPriorityEXT - Change a memory allocation priority

To modify the priority of an existing memory allocation, call:

// Provided by VK_EXT_pageable_device_local_memory
void vkSetDeviceMemoryPriorityEXT(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    float                                       priority);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object to which the new
priority will be applied.

* 
`priority` is a floating-point value between `0` and `1`, indicating
the priority of the allocation relative to other memory allocations.
Larger values are higher priority.
The granularity of the priorities is implementation-dependent.

Memory allocations with higher priority **may** be more likely to stay in
device-local memory when the system is under memory pressure.

Valid Usage

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-priority-06258) VUID-vkSetDeviceMemoryPriorityEXT-priority-06258

`priority` **must** be between `0` and `1`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-device-parameter) VUID-vkSetDeviceMemoryPriorityEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-memory-parameter) VUID-vkSetDeviceMemoryPriorityEXT-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-memory-parent) VUID-vkSetDeviceMemoryPriorityEXT-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_pageable_device_local_memory](VK_EXT_pageable_device_local_memory.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkSetDeviceMemoryPriorityEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
