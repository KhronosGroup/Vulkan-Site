# VkPhysicalDeviceFragmentShadingRateKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentShadingRateKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentShadingRateKHR - Structure returning information about sample count specific additional multisampling capabilities

The `VkPhysicalDeviceFragmentShadingRateKHR` structure is defined as

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkPhysicalDeviceFragmentShadingRateKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkSampleCountFlags    sampleCounts;
    VkExtent2D            fragmentSize;
} VkPhysicalDeviceFragmentShadingRateKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleCounts` is a bitmask of sample counts for which the shading
rate described by `fragmentSize` is supported.

* 
`fragmentSize` is a [VkExtent2D](VkExtent2D.html) describing the width and height
of a supported shading rate.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRateKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_KHR](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateKHR-pNext-pNext) VUID-VkPhysicalDeviceFragmentShadingRateKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html), [VkExtent2D](VkExtent2D.html), [VkSampleCountFlags](VkSampleCountFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceFragmentShadingRatesKHR](vkGetPhysicalDeviceFragmentShadingRatesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPhysicalDeviceFragmentShadingRateKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
