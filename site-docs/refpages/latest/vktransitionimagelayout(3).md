# vkTransitionImageLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkTransitionImageLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkTransitionImageLayout - Perform an image layout transition on the host

To perform an image layout transition on the host, call:

// Provided by VK_VERSION_1_4
VkResult vkTransitionImageLayout(
    VkDevice                                    device,
    uint32_t                                    transitionCount,
    const VkHostImageLayoutTransitionInfo*      pTransitions);

// Provided by VK_EXT_host_image_copy
// Equivalent to vkTransitionImageLayout
VkResult vkTransitionImageLayoutEXT(
    VkDevice                                    device,
    uint32_t                                    transitionCount,
    const VkHostImageLayoutTransitionInfo*      pTransitions);

* 
`device` is the device which owns `pTransitions`[i].`image`.

* 
`transitionCount` is the number of image layout transitions to
perform.

* 
`pTransitions` is a pointer to an array of
[VkHostImageLayoutTransitionInfo](VkHostImageLayoutTransitionInfo.html) structures specifying the image
and [subresource ranges](../../../../spec/latest/chapters/resources.html#resources-image-views) within them to
transition.

Valid Usage (Implicit)

* 
[](#VUID-vkTransitionImageLayout-device-parameter) VUID-vkTransitionImageLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkTransitionImageLayout-pTransitions-parameter) VUID-vkTransitionImageLayout-pTransitions-parameter

 `pTransitions` **must** be a valid pointer to an array of `transitionCount` valid [VkHostImageLayoutTransitionInfo](VkHostImageLayoutTransitionInfo.html) structures

* 
[](#VUID-vkTransitionImageLayout-transitionCount-arraylength) VUID-vkTransitionImageLayout-transitionCount-arraylength

 `transitionCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDevice](VkDevice.html), [VkHostImageLayoutTransitionInfo](VkHostImageLayoutTransitionInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkTransitionImageLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
