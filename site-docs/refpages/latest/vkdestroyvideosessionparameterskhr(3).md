# vkDestroyVideoSessionParametersKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyVideoSessionParametersKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyVideoSessionParametersKHR - Destroy video session parameters object

To destroy a video session parameters object, call:

// Provided by VK_KHR_video_queue
void vkDestroyVideoSessionParametersKHR(
    VkDevice                                    device,
    VkVideoSessionParametersKHR                 videoSessionParameters,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the video session
parameters object.

* 
`videoSessionParameters` is the video session parameters object to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-07212) VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-07212

All submitted commands that refer to `videoSessionParameters` **must**
have completed execution

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-07213) VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-07213

If `VkAllocationCallbacks` were provided when
`videoSessionParameters` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-07214) VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-07214

If no `VkAllocationCallbacks` were provided when
`videoSessionParameters` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-device-parameter) VUID-vkDestroyVideoSessionParametersKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-parameter) VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-parameter

 If `videoSessionParameters` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `videoSessionParameters` **must** be a valid [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html) handle

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-pAllocator-parameter) VUID-vkDestroyVideoSessionParametersKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-parent) VUID-vkDestroyVideoSessionParametersKHR-videoSessionParameters-parent

 If `videoSessionParameters` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `videoSessionParameters` **must** be externally synchronized

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkDestroyVideoSessionParametersKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
