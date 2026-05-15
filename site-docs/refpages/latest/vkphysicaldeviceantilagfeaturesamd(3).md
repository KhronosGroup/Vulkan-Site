# VkPhysicalDeviceAntiLagFeaturesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceAntiLagFeaturesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceAntiLagFeaturesAMD - Structure describing whether VK_AMD_anti_lag can be supported by an implementation.

The `VkPhysicalDeviceAntiLagFeaturesAMD` structure is defined as:

// Provided by VK_AMD_anti_lag
typedef struct VkPhysicalDeviceAntiLagFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           antiLag;
} VkPhysicalDeviceAntiLagFeaturesAMD;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `antiLag` indicates whether the implementation
supports AMD Radeon™ Anti-Lag functionality.
The `antiLag` feature only supports a single GPU and **must** not be
enabled if
[VkDeviceGroupDeviceCreateInfo](VkDeviceGroupDeviceCreateInfo.html)::`physicalDeviceCount` is
greater than 1.

If the `VkPhysicalDeviceAntiLagFeaturesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceAntiLagFeaturesAMD`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAntiLagFeaturesAMD-sType-sType) VUID-VkPhysicalDeviceAntiLagFeaturesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ANTI_LAG_FEATURES_AMD](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_AMD_anti_lag](VK_AMD_anti_lag.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceAntiLagFeaturesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
