# VkMemoryOverallocationBehaviorAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryOverallocationBehaviorAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryOverallocationBehaviorAMD - Specify memory overallocation behavior

Possible values for
[VkDeviceMemoryOverallocationCreateInfoAMD](VkDeviceMemoryOverallocationCreateInfoAMD.html)::`overallocationBehavior`
include:

// Provided by VK_AMD_memory_overallocation_behavior
typedef enum VkMemoryOverallocationBehaviorAMD {
    VK_MEMORY_OVERALLOCATION_BEHAVIOR_DEFAULT_AMD = 0,
    VK_MEMORY_OVERALLOCATION_BEHAVIOR_ALLOWED_AMD = 1,
    VK_MEMORY_OVERALLOCATION_BEHAVIOR_DISALLOWED_AMD = 2,
} VkMemoryOverallocationBehaviorAMD;

* 
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_DEFAULT_AMD](#) lets the
implementation decide if overallocation is allowed.

* 
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_ALLOWED_AMD](#) specifies
overallocation is allowed if platform permits.

* 
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_DISALLOWED_AMD](#) specifies the
application is not allowed to allocate device memory beyond the heap
sizes reported by [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html).
Allocations that are not explicitly made by the application within the
scope of the Vulkan instance are not accounted for.

[VK_AMD_memory_overallocation_behavior](VK_AMD_memory_overallocation_behavior.html), [VkDeviceMemoryOverallocationCreateInfoAMD](VkDeviceMemoryOverallocationCreateInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkMemoryOverallocationBehaviorAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
