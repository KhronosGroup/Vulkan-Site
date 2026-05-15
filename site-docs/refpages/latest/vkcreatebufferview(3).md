# vkCreateBufferView(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateBufferView.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateBufferView - Create a new buffer view object

To create a buffer view, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateBufferView(
    VkDevice                                    device,
    const VkBufferViewCreateInfo*               pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkBufferView*                               pView);

* 
`device` is the logical device that creates the buffer view.

* 
`pCreateInfo` is a pointer to a [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html)
structure containing parameters to be used to create the buffer view.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pView` is a pointer to a [VkBufferView](VkBufferView.html) handle in which the
resulting buffer view object is returned.

Valid Usage

* 
[](#VUID-vkCreateBufferView-device-09665) VUID-vkCreateBufferView-device-09665

`device` **must** support at least one queue family with one of the
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

Valid Usage (Implicit)

* 
[](#VUID-vkCreateBufferView-device-parameter) VUID-vkCreateBufferView-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateBufferView-pCreateInfo-parameter) VUID-vkCreateBufferView-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html) structure

* 
[](#VUID-vkCreateBufferView-pAllocator-parameter) VUID-vkCreateBufferView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateBufferView-pView-parameter) VUID-vkCreateBufferView-pView-parameter

 `pView` **must** be a valid pointer to a [VkBufferView](VkBufferView.html) handle

* 
[](#VUID-vkCreateBufferView-device-queuecount) VUID-vkCreateBufferView-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkBufferView](VkBufferView.html), [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateBufferView).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
