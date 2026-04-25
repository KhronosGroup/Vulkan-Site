# VkSwapchainCounterCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainCounterCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainCounterCreateInfoEXT - Specify the surface counters desired

To enable surface counters when creating a swapchain, add a
`VkSwapchainCounterCreateInfoEXT` structure to the `pNext` chain of
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html).
`VkSwapchainCounterCreateInfoEXT` is defined as:

// Provided by VK_EXT_display_control
typedef struct VkSwapchainCounterCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkSurfaceCounterFlagsEXT    surfaceCounters;
} VkSwapchainCounterCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surfaceCounters` is a bitmask of [VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html)
specifying surface counters to enable for the swapchain.

Valid Usage

* 
[](#VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-01244) VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-01244

The bits in `surfaceCounters` **must** be supported by
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`surface`, as reported by
[vkGetPhysicalDeviceSurfaceCapabilities2EXT](vkGetPhysicalDeviceSurfaceCapabilities2EXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainCounterCreateInfoEXT-sType-sType) VUID-VkSwapchainCounterCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_COUNTER_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-parameter) VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-parameter

 `surfaceCounters` **must** be a valid combination of [VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_EXT_display_control](VK_EXT_display_control.html), [VkStructureType](VkStructureType.html), [VkSurfaceCounterFlagsEXT](VkSurfaceCounterFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainCounterCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
