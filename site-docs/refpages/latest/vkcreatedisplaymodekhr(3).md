# vkCreateDisplayModeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDisplayModeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDisplayModeKHR - Create a display mode

Additional modes **may** also be created by calling:

// Provided by VK_KHR_display
VkResult vkCreateDisplayModeKHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display,
    const VkDisplayModeCreateInfoKHR*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDisplayModeKHR*                           pMode);

* 
`physicalDevice` is the physical device associated with
`display`.

* 
`display` is the display to create an additional mode for.

* 
`pCreateInfo` is a pointer to a [VkDisplayModeCreateInfoKHR](VkDisplayModeCreateInfoKHR.html)
structure describing the new mode to create.

* 
`pAllocator` is the allocator used for host memory allocated for the
display mode object when there is no more specific allocator available
(see [Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pMode` is a pointer to a [VkDisplayModeKHR](VkDisplayModeKHR.html) handle in which the
mode created is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDisplayModeKHR-physicalDevice-parameter) VUID-vkCreateDisplayModeKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkCreateDisplayModeKHR-display-parameter) VUID-vkCreateDisplayModeKHR-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkCreateDisplayModeKHR-pCreateInfo-parameter) VUID-vkCreateDisplayModeKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDisplayModeCreateInfoKHR](VkDisplayModeCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateDisplayModeKHR-pAllocator-parameter) VUID-vkCreateDisplayModeKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDisplayModeKHR-pMode-parameter) VUID-vkCreateDisplayModeKHR-pMode-parameter

 `pMode` **must** be a valid pointer to a [VkDisplayModeKHR](VkDisplayModeKHR.html) handle

* 
[](#VUID-vkCreateDisplayModeKHR-display-parent) VUID-vkCreateDisplayModeKHR-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Host Synchronization

* 
Host access to `display` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_display](VK_KHR_display.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayModeCreateInfoKHR](VkDisplayModeCreateInfoKHR.html), [VkDisplayModeKHR](VkDisplayModeKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateDisplayModeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
