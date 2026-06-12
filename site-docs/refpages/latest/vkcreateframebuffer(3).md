# vkCreateFramebuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateFramebuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateFramebuffer - Create a new framebuffer object

To create a framebuffer, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkCreateFramebuffer(
    VkDevice                                    device,
    const VkFramebufferCreateInfo*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFramebuffer*                              pFramebuffer);

* 
`device` is the logical device that creates the framebuffer.

* 
`pCreateInfo` is a pointer to a [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)
structure describing additional information about framebuffer creation.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pFramebuffer` is a pointer to a [VkFramebuffer](VkFramebuffer.html) handle in which
the resulting framebuffer object is returned.

Valid Usage

* 
[](#VUID-vkCreateFramebuffer-device-10002) VUID-vkCreateFramebuffer-device-10002

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capability

* 
[](#VUID-vkCreateFramebuffer-pCreateInfo-02777) VUID-vkCreateFramebuffer-pCreateInfo-02777

If `pCreateInfo->flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), and `attachmentCount` is
not `0`, each element of `pCreateInfo->pAttachments` **must** have been
created on `device`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateFramebuffer-device-parameter) VUID-vkCreateFramebuffer-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateFramebuffer-pCreateInfo-parameter) VUID-vkCreateFramebuffer-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html) structure

* 
[](#VUID-vkCreateFramebuffer-pAllocator-parameter) VUID-vkCreateFramebuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateFramebuffer-pFramebuffer-parameter) VUID-vkCreateFramebuffer-pFramebuffer-parameter

 `pFramebuffer` **must** be a valid pointer to a [VkFramebuffer](VkFramebuffer.html) handle

* 
[](#VUID-vkCreateFramebuffer-device-queuecount) VUID-vkCreateFramebuffer-device-queuecount

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkFramebuffer](VkFramebuffer.html), [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCreateFramebuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
