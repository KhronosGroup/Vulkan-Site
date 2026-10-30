# vkRegisterDeviceEventEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkRegisterDeviceEventEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkRegisterDeviceEventEXT - Signal a fence when a device event occurs

To create a fence that will be signaled when an event occurs on a device,
call:

// Provided by VK_EXT_display_control
VkResult vkRegisterDeviceEventEXT(
    VkDevice                                    device,
    const VkDeviceEventInfoEXT*                 pDeviceEventInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFence*                                    pFence);

* 
`device` is a logical device on which the event **may** occur.

* 
`pDeviceEventInfo` is a pointer to a [VkDeviceEventInfoEXT](VkDeviceEventInfoEXT.html)
structure describing the event of interest to the application.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pFence` is a pointer to a handle in which the resulting fence
object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkRegisterDeviceEventEXT-device-parameter) VUID-vkRegisterDeviceEventEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkRegisterDeviceEventEXT-pDeviceEventInfo-parameter) VUID-vkRegisterDeviceEventEXT-pDeviceEventInfo-parameter

 `pDeviceEventInfo` **must** be a valid pointer to a valid [VkDeviceEventInfoEXT](VkDeviceEventInfoEXT.html) structure

* 
[](#VUID-vkRegisterDeviceEventEXT-pAllocator-parameter) VUID-vkRegisterDeviceEventEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkRegisterDeviceEventEXT-pFence-parameter) VUID-vkRegisterDeviceEventEXT-pFence-parameter

 `pFence` **must** be a valid pointer to a [VkFence](VkFence.html) handle

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

[VK_EXT_display_control](VK_EXT_display_control.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkDeviceEventInfoEXT](VkDeviceEventInfoEXT.html), [VkFence](VkFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkRegisterDeviceEventEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
