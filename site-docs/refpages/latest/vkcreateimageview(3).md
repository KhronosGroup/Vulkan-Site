# vkCreateImageView(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateImageView.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateImageView - Create an image view from an existing image

To create an image view, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateImageView(
    VkDevice                                    device,
    const VkImageViewCreateInfo*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkImageView*                                pView);

* 
`device` is the logical device that creates the image view.

* 
`pCreateInfo` is a pointer to a [VkImageViewCreateInfo](VkImageViewCreateInfo.html)
structure containing parameters to be used to create the image view.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pView` is a pointer to a [VkImageView](VkImageView.html) handle in which the
resulting image view object is returned.

Valid Usage

* 
[](#VUID-vkCreateImageView-device-09667) VUID-vkCreateImageView-device-09667

`device` **must** support at least one queue family with one of the
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

* 
[](#VUID-vkCreateImageView-image-09179) VUID-vkCreateImageView-image-09179

[VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`image` **must** have been created from
`device`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateImageView-device-parameter) VUID-vkCreateImageView-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateImageView-pCreateInfo-parameter) VUID-vkCreateImageView-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageViewCreateInfo](VkImageViewCreateInfo.html) structure

* 
[](#VUID-vkCreateImageView-pAllocator-parameter) VUID-vkCreateImageView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateImageView-pView-parameter) VUID-vkCreateImageView-pView-parameter

 `pView` **must** be a valid pointer to a [VkImageView](VkImageView.html) handle

* 
[](#VUID-vkCreateImageView-device-queuecount) VUID-vkCreateImageView-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkImageView](VkImageView.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateImageView).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
