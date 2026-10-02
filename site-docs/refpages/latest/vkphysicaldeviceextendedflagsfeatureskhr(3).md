# VkPhysicalDeviceExtendedFlagsFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExtendedFlagsFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExtendedFlagsFeaturesKHR - Structure describing whether the implementation supports extended flags functionality

The `VkPhysicalDeviceExtendedFlagsFeaturesKHR` structure is defined as:

// Provided by VK_KHR_extended_flags
typedef struct VkPhysicalDeviceExtendedFlagsFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedFlags;
} VkPhysicalDeviceExtendedFlagsFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedFlags` indicates that the
implementation supports the following:

* 
[VkFormatProperties4KHR](VkFormatProperties4KHR.html), extending [VkFormatProperties2](VkFormatProperties2.html), and
corresponding [VkFormatFeatureFlagBits4KHR](VkFormatFeatureFlagBits4KHR.html) and
[VkFormatFeatureFlags4KHR](VkFormatFeatureFlags4KHR.html) types providing up to 64 new format
feature flags.

* 
[VkImageCreateFlags2CreateInfoKHR](VkImageCreateFlags2CreateInfoKHR.html), extending structures passed to
image create and query functions, and corresponding
[VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html) and [VkImageCreateFlags2KHR](VkImageCreateFlags2KHR.html) types
providing up to 32 new image create flags.

* 
[VkImageUsageFlags2CreateInfoKHR](VkImageUsageFlags2CreateInfoKHR.html), extending structures passed to
image create and query functions, and corresponding
[VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) and [VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html) types
providing up to 32 new image usage flags.

* 
The [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html),
[VkPipelineCreateFlags2KHR](VkPipelineCreateFlags2.html), [VkPipelineCreateFlagBits2KHR](VkPipelineCreateFlagBits2.html),
[VkBufferUsageFlags2CreateInfoKHR](VkBufferUsageFlags2CreateInfo.html), [VkBufferUsageFlags2KHR](VkBufferUsageFlags2.html),
and [VkBufferUsageFlagBits2KHR](VkBufferUsageFlagBits2.html) types originally introduced by
[VK_KHR_maintenance5](VK_KHR_maintenance5.html).

If the `VkPhysicalDeviceExtendedFlagsFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceExtendedFlagsFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedFlagsFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceExtendedFlagsFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_FLAGS_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceExtendedFlagsFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
