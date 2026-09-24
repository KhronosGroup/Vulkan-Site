# vkRegisterDisplayEventEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkRegisterDisplayEventEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkRegisterDisplayEventEXT - Signal a fence when a display event occurs

To create a fence that will be signaled when an event occurs on a
[VkDisplayKHR](VkDisplayKHR.html) object, call:

// Provided by VK_EXT_display_control
VkResult vkRegisterDisplayEventEXT(
    VkDevice                                    device,
    VkDisplayKHR                                display,
    const VkDisplayEventInfoEXT*                pDisplayEventInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFence*                                    pFence);

* 
`device` is a logical device associated with `display`

* 
`display` is the display on which the event **may** occur.

* 
`pDisplayEventInfo` is a pointer to a [VkDisplayEventInfoEXT](VkDisplayEventInfoEXT.html)
structure describing the event of interest to the application.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pFence` is a pointer to a handle in which the resulting fence
object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkRegisterDisplayEventEXT-device-parameter) VUID-vkRegisterDisplayEventEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkRegisterDisplayEventEXT-display-parameter) VUID-vkRegisterDisplayEventEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkRegisterDisplayEventEXT-pDisplayEventInfo-parameter) VUID-vkRegisterDisplayEventEXT-pDisplayEventInfo-parameter

 `pDisplayEventInfo` **must** be a valid pointer to a valid [VkDisplayEventInfoEXT](VkDisplayEventInfoEXT.html) structure

* 
[](#VUID-vkRegisterDisplayEventEXT-pAllocator-parameter) VUID-vkRegisterDisplayEventEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkRegisterDisplayEventEXT-pFence-parameter) VUID-vkRegisterDisplayEventEXT-pFence-parameter

 `pFence` **must** be a valid pointer to a [VkFence](VkFence.html) handle

* 
[](#VUID-vkRegisterDisplayEventEXT-commonparent) VUID-vkRegisterDisplayEventEXT-commonparent

 Both of `device`, and `display` **must** have been created, allocated, or retrieved from the same [VkPhysicalDevice](VkPhysicalDevice.html)

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_display_control](VK_EXT_display_control.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkDisplayEventInfoEXT](VkDisplayEventInfoEXT.html), [VkDisplayKHR](VkDisplayKHR.html), [VkFence](VkFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkRegisterDisplayEventEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
