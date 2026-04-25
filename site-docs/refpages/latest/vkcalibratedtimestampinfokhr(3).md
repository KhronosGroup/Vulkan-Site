# VkCalibratedTimestampInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCalibratedTimestampInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCalibratedTimestampInfoKHR - Structure specifying the input parameters of a calibrated timestamp query

The `VkCalibratedTimestampInfoKHR` structure is defined as:

// Provided by VK_KHR_calibrated_timestamps
typedef struct VkCalibratedTimestampInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkTimeDomainKHR    timeDomain;
} VkCalibratedTimestampInfoKHR;

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to VkCalibratedTimestampInfoKHR
typedef VkCalibratedTimestampInfoKHR VkCalibratedTimestampInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`timeDomain` is a [VkTimeDomainKHR](VkTimeDomainKHR.html) value specifying the time
domain from which the calibrated timestamp value should be returned.

Valid Usage

* 
[](#VUID-VkCalibratedTimestampInfoKHR-timeDomain-02354) VUID-VkCalibratedTimestampInfoKHR-timeDomain-02354

`timeDomain` **must** be one of the [VkTimeDomainKHR](VkTimeDomainKHR.html) values
returned by [vkGetPhysicalDeviceCalibrateableTimeDomainsKHR](vkGetPhysicalDeviceCalibrateableTimeDomainsKHR.html)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-timeDomain-12227) VUID-VkCalibratedTimestampInfoKHR-timeDomain-12227

If `timeDomain` is [VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT](VkTimeDomainKHR.html) or
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html), the `pNext` chain
**must** include a [VkSwapchainCalibratedTimestampInfoEXT](VkSwapchainCalibratedTimestampInfoEXT.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-sType-sType) VUID-VkCalibratedTimestampInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-pNext-pNext) VUID-VkCalibratedTimestampInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkSwapchainCalibratedTimestampInfoEXT](VkSwapchainCalibratedTimestampInfoEXT.html)

* 
[](#VUID-VkCalibratedTimestampInfoKHR-sType-unique) VUID-VkCalibratedTimestampInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCalibratedTimestampInfoKHR-timeDomain-parameter) VUID-VkCalibratedTimestampInfoKHR-timeDomain-parameter

 `timeDomain` **must** be a valid [VkTimeDomainKHR](VkTimeDomainKHR.html) value

[VK_EXT_calibrated_timestamps](VK_EXT_calibrated_timestamps.html), [VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html), [VkStructureType](VkStructureType.html), [VkTimeDomainKHR](VkTimeDomainKHR.html), [vkGetCalibratedTimestampsKHR](vkGetCalibratedTimestampsKHR.html), [vkGetCalibratedTimestampsKHR](vkGetCalibratedTimestampsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkCalibratedTimestampInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
