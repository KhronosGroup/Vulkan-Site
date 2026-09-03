# VkPhysicalDeviceGpaFeaturesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceGpaFeaturesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceGpaFeaturesAMD - Structure describing support for GPU performance API

The `VkPhysicalDeviceGpaFeaturesAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkPhysicalDeviceGpaFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           perfCounters;
    VkBool32           streamingPerfCounters;
    VkBool32           sqThreadTracing;
    VkBool32           clockModes;
} VkPhysicalDeviceGpaFeaturesAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `perfCounters` specifies whether
performance counters are supported.

* 
 `streamingPerfCounters` specifies
whether streaming performance counters are supported.

* 
 `sqThreadTracing` specifies whether
thread tracing is supported.

* 
 `clockModes` specifies whether setting clock
modes is supported.

If the `VkPhysicalDeviceGpaFeaturesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceGpaFeaturesAMD`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGpaFeaturesAMD-sType-sType) VUID-VkPhysicalDeviceGpaFeaturesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GPA_FEATURES_AMD](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceGpaFeaturesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
