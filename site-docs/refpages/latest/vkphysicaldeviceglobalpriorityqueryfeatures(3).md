# VkPhysicalDeviceGlobalPriorityQueryFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceGlobalPriorityQueryFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceGlobalPriorityQueryFeatures - Structure describing whether global priority query can be supported by an implementation

The `VkPhysicalDeviceGlobalPriorityQueryFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceGlobalPriorityQueryFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           globalPriorityQuery;
} VkPhysicalDeviceGlobalPriorityQueryFeatures;

// Provided by VK_KHR_global_priority
// Equivalent to VkPhysicalDeviceGlobalPriorityQueryFeatures
typedef VkPhysicalDeviceGlobalPriorityQueryFeatures VkPhysicalDeviceGlobalPriorityQueryFeaturesKHR;

// Provided by VK_EXT_global_priority_query
// Equivalent to VkPhysicalDeviceGlobalPriorityQueryFeatures
typedef VkPhysicalDeviceGlobalPriorityQueryFeatures VkPhysicalDeviceGlobalPriorityQueryFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`globalPriorityQuery` indicates whether the implementation supports
the ability to query global queue priorities.

If the `VkPhysicalDeviceGlobalPriorityQueryFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceGlobalPriorityQueryFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGlobalPriorityQueryFeatures-sType-sType) VUID-VkPhysicalDeviceGlobalPriorityQueryFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_global_priority_query](VK_EXT_global_priority_query.html), [VK_KHR_global_priority](VK_KHR_global_priority.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceGlobalPriorityQueryFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
