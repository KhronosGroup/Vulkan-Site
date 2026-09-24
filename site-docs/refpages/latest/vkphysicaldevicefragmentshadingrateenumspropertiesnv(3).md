# VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV - Structure describing fragment shading rate limits that can be supported by an implementation

The `VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV` structure is
defined as:

// Provided by VK_NV_fragment_shading_rate_enums
typedef struct VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV {
    VkStructureType          sType;
    void*                    pNext;
    VkSampleCountFlagBits    maxFragmentShadingRateInvocationCount;
} VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxFragmentShadingRateInvocationCount` is a
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) value indicating the maximum number of
fragment shader invocations per fragment supported in pipeline,
primitive, and attachment fragment shading rates.

If the `VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These properties are related to [fragment shading rates](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_ENUMS_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_fragment_shading_rate_enums](VK_NV_fragment_shading_rate_enums.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
