# VkSwapchainTimeDomainPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainTimeDomainPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainTimeDomainPropertiesEXT - List of available time domains for a swapchain

The `VkSwapchainTimeDomainPropertiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkSwapchainTimeDomainPropertiesEXT {
    VkStructureType     sType;
    void*               pNext;
    uint32_t            timeDomainCount;
    VkTimeDomainKHR*    pTimeDomains;
    uint64_t*           pTimeDomainIds;
} VkSwapchainTimeDomainPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`timeDomainCount` is an integer related to the number of time
domains available or queried, as described below.

* 
`pTimeDomains` is a pointer to an array of [VkTimeDomainKHR](VkTimeDomainKHR.html)
values representing time domains that are available for the swapchain.

* 
`pTimeDomainIds` is a pointer to an array of unique identifiers for
each time domain.

When calling [vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html), if
`pTimeDomains` is `NULL` and `pTimeDomainIds` is `NULL`, then the
number of time domains supported for the given `swapchain` is returned
in `timeDomainCount`.
Otherwise, `timeDomainCount` **must** specify the number of elements in
`pTimeDomains` and `pTimeDomainIds`, and on return is overwritten
with the number of values actually written to each array.

Implementations **must** advertise support for at least one time domain of
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html).

|  | Due to the dynamic nature of their underlying `VkSurfaceKHR` properties,
| --- | --- |
swapchains may need to expose multiple swapchain-local opaque time domains
using the same [VkTimeDomainKHR](VkTimeDomainKHR.html) value over time, for example when a
surface is moved from one display hardware to another.
Arbitrary identifiers, provided in `timeDomainIds`, are used by the
implementation to differentiate opaque time domains of identical scopes. |

Valid Usage

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12370) VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12370

`pTimeDomains` and `pTimeDomainIds` **must** both be `NULL` or both
not be `NULL`

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12371) VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12371

If `pTimeDomains` and `pTimeDomainIds` are not `NULL`, then
`timeDomainCount` **must** not be zero

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-sType-sType) VUID-VkSwapchainTimeDomainPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_TIME_DOMAIN_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-pNext-pNext) VUID-VkSwapchainTimeDomainPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkStructureType](VkStructureType.html), [VkTimeDomainKHR](VkTimeDomainKHR.html), [vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainTimeDomainPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
