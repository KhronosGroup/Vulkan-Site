# VkDeviceMemoryOverallocationCreateInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemoryOverallocationCreateInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemoryOverallocationCreateInfoAMD - Specify memory overallocation behavior for a Vulkan device

To specify whether device memory allocation is allowed beyond the size
reported by [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html), add a
[VkDeviceMemoryOverallocationCreateInfoAMD](#) structure to the `pNext`
chain of the [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure.
If this structure is not specified, it is as if the
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_DEFAULT_AMD](VkMemoryOverallocationBehaviorAMD.html) value is used.

// Provided by VK_AMD_memory_overallocation_behavior
typedef struct VkDeviceMemoryOverallocationCreateInfoAMD {
    VkStructureType                      sType;
    const void*                          pNext;
    VkMemoryOverallocationBehaviorAMD    overallocationBehavior;
} VkDeviceMemoryOverallocationCreateInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`overallocationBehavior` is the desired overallocation behavior.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryOverallocationCreateInfoAMD-sType-sType) VUID-VkDeviceMemoryOverallocationCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_OVERALLOCATION_CREATE_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkDeviceMemoryOverallocationCreateInfoAMD-overallocationBehavior-parameter) VUID-VkDeviceMemoryOverallocationCreateInfoAMD-overallocationBehavior-parameter

 `overallocationBehavior` **must** be a valid [VkMemoryOverallocationBehaviorAMD](VkMemoryOverallocationBehaviorAMD.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_AMD_memory_overallocation_behavior](VK_AMD_memory_overallocation_behavior.html), [VkMemoryOverallocationBehaviorAMD](VkMemoryOverallocationBehaviorAMD.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceMemoryOverallocationCreateInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
