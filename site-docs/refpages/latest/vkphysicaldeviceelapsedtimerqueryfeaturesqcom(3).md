# VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM - Structure describing elapsed timer query features that can be supported by an implementation

The `VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_elapsed_timer_query
typedef struct VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           elapsedTimerQuery;
} VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `elapsedTimerQuery` indicates that
the implementation supports [VK_QUERY_TYPE_TIME_ELAPSED_QCOM](VkQueryType.html)
queries.

If the `VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ELAPSED_TIMER_QUERY_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_elapsed_timer_query](VK_QCOM_elapsed_timer_query.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceElapsedTimerQueryFeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
