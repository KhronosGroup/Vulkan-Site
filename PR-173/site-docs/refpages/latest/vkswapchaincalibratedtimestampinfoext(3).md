# VkSwapchainCalibratedTimestampInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainCalibratedTimestampInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainCalibratedTimestampInfoEXT - Structure specifying the swapchain to calibrate a swapchain-local timestamp query

The `VkSwapchainCalibratedTimestampInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkSwapchainCalibratedTimestampInfoEXT {
    VkStructureType           sType;
    const void*               pNext;
    VkSwapchainKHR            swapchain;
    VkPresentStageFlagsEXT    presentStage;
    uint64_t                  timeDomainId;
} VkSwapchainCalibratedTimestampInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is the swapchain to retrieve the swapchain-local
timestamp from.

* 
`presentStage` is zero or a [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html) value used
to identify a single present stage when calibrating a timestamp in the
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html) time domain.

* 
`timeDomainId` is the id for the opaque time domain being
calibrated.

`timeDomainId` **must** be an id previously reported by
[vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html) for `swapchain`.
If the `timeDomainId` is no longer supported by the `swapchain`,
implementations **may** report zero as the calibrated timestamp value.

Valid Usage

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-timeDomain-12228) VUID-VkSwapchainCalibratedTimestampInfoEXT-timeDomain-12228

If the `timeDomain` member of the [VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html)
structure in this structure’s `pNext` chain is
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html), `presentStage` **must**
specify one and only one present stage

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-sType-sType) VUID-VkSwapchainCalibratedTimestampInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_CALIBRATED_TIMESTAMP_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-swapchain-parameter) VUID-VkSwapchainCalibratedTimestampInfoEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-presentStage-parameter) VUID-VkSwapchainCalibratedTimestampInfoEXT-presentStage-parameter

 `presentStage` **must** be a valid combination of [VkPresentStageFlagBitsEXT](VkPresentStageFlagBitsEXT.html) values

* 
[](#VUID-VkSwapchainCalibratedTimestampInfoEXT-presentStage-requiredbitmask) VUID-VkSwapchainCalibratedTimestampInfoEXT-presentStage-requiredbitmask

 `presentStage` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html), [VkStructureType](VkStructureType.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSwapchainCalibratedTimestampInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
