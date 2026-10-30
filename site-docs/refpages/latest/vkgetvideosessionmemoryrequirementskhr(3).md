# vkGetVideoSessionMemoryRequirementsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetVideoSessionMemoryRequirementsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetVideoSessionMemoryRequirementsKHR - Get the memory requirements for a video session

To determine the memory requirements for a video session object, call:

// Provided by VK_KHR_video_queue
VkResult vkGetVideoSessionMemoryRequirementsKHR(
    VkDevice                                    device,
    VkVideoSessionKHR                           videoSession,
    uint32_t*                                   pMemoryRequirementsCount,
    VkVideoSessionMemoryRequirementsKHR*        pMemoryRequirements);

* 
`device` is the logical device that owns the video session.

* 
`videoSession` is the video session to query.

* 
`pMemoryRequirementsCount` is a pointer to an integer related to the
number of memory binding requirements available or queried, as described
below.

* 
`pMemoryRequirements` is `NULL` or a pointer to an array of
[VkVideoSessionMemoryRequirementsKHR](VkVideoSessionMemoryRequirementsKHR.html) structures in which the memory
binding requirements of the video session are returned.

If `pMemoryRequirements` is `NULL`, then the number of memory bindings
required for the video session is returned in
`pMemoryRequirementsCount`.
Otherwise, `pMemoryRequirementsCount` **must** point to a variable set by
the application to the number of elements in the `pMemoryRequirements`
array, and on return the variable is overwritten with the number of memory
binding requirements actually written to `pMemoryRequirements`.
If `pMemoryRequirementsCount` is less than the number of memory bindings
required for the video session, then at most `pMemoryRequirementsCount`
elements will be written to `pMemoryRequirements`, and
[VK_INCOMPLETE](VkResult.html) will be returned, instead of [VK_SUCCESS](VkResult.html), to
indicate that not all required memory binding requirements were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetVideoSessionMemoryRequirementsKHR-device-parameter) VUID-vkGetVideoSessionMemoryRequirementsKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetVideoSessionMemoryRequirementsKHR-videoSession-parameter) VUID-vkGetVideoSessionMemoryRequirementsKHR-videoSession-parameter

 `videoSession` **must** be a valid [VkVideoSessionKHR](VkVideoSessionKHR.html) handle

* 
[](#VUID-vkGetVideoSessionMemoryRequirementsKHR-pMemoryRequirementsCount-parameter) VUID-vkGetVideoSessionMemoryRequirementsKHR-pMemoryRequirementsCount-parameter

 `pMemoryRequirementsCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetVideoSessionMemoryRequirementsKHR-pMemoryRequirements-parameter) VUID-vkGetVideoSessionMemoryRequirementsKHR-pMemoryRequirements-parameter

 If the value referenced by `pMemoryRequirementsCount` is not `0`, and `pMemoryRequirements` is not `NULL`, `pMemoryRequirements` **must** be a valid pointer to an array of `pMemoryRequirementsCount` [VkVideoSessionMemoryRequirementsKHR](VkVideoSessionMemoryRequirementsKHR.html) structures

* 
[](#VUID-vkGetVideoSessionMemoryRequirementsKHR-videoSession-parent) VUID-vkGetVideoSessionMemoryRequirementsKHR-videoSession-parent

 `videoSession` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkDevice](VkDevice.html), [VkVideoSessionKHR](VkVideoSessionKHR.html), [VkVideoSessionMemoryRequirementsKHR](VkVideoSessionMemoryRequirementsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkGetVideoSessionMemoryRequirementsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
