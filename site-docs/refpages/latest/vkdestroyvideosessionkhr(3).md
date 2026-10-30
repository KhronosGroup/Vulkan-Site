# vkDestroyVideoSessionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyVideoSessionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyVideoSessionKHR - Destroy video session object

To destroy a video session, call:

// Provided by VK_KHR_video_queue
void vkDestroyVideoSessionKHR(
    VkDevice                                    device,
    VkVideoSessionKHR                           videoSession,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the video session.

* 
`videoSession` is the video session to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyVideoSessionKHR-videoSession-07192) VUID-vkDestroyVideoSessionKHR-videoSession-07192

All submitted commands that refer to `videoSession` **must** have
completed execution

* 
[](#VUID-vkDestroyVideoSessionKHR-videoSession-07193) VUID-vkDestroyVideoSessionKHR-videoSession-07193

If `VkAllocationCallbacks` were provided when `videoSession` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyVideoSessionKHR-videoSession-07194) VUID-vkDestroyVideoSessionKHR-videoSession-07194

If no `VkAllocationCallbacks` were provided when `videoSession`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyVideoSessionKHR-device-parameter) VUID-vkDestroyVideoSessionKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyVideoSessionKHR-videoSession-parameter) VUID-vkDestroyVideoSessionKHR-videoSession-parameter

 If `videoSession` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `videoSession` **must** be a valid [VkVideoSessionKHR](VkVideoSessionKHR.html) handle

* 
[](#VUID-vkDestroyVideoSessionKHR-pAllocator-parameter) VUID-vkDestroyVideoSessionKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyVideoSessionKHR-videoSession-parent) VUID-vkDestroyVideoSessionKHR-videoSession-parent

 If `videoSession` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `videoSession` **must** be externally synchronized

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkVideoSessionKHR](VkVideoSessionKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkDestroyVideoSessionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
