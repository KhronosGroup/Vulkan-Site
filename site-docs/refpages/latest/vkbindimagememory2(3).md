# vkBindImageMemory2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindImageMemory2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindImageMemory2 - Bind device memory to image objects

To attach memory to image objects for one or more images at a time, call:

// Provided by VK_VERSION_1_1
VkResult vkBindImageMemory2(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindImageMemoryInfo*                pBindInfos);

// Provided by VK_KHR_bind_memory2
// Equivalent to vkBindImageMemory2
VkResult vkBindImageMemory2KHR(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindImageMemoryInfo*                pBindInfos);

* 
`device` is the logical device that owns the images and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)
structures, describing images and memory to bind.

On some implementations, it **may** be more efficient to batch memory bindings
into a single command.

If the [`maintenance6`](../../../../spec/latest/chapters/features.html#features-maintenance6) feature is enabled,
this command **must** attempt to perform all of the memory binding operations
described by `pBindInfos`, and **must** not early exit on the first
failure.

If any of the memory binding operations described by `pBindInfos` fail,
the [VkResult](VkResult.html) returned by this command **must** be the return value of any
one of the memory binding operations which did not return [VK_SUCCESS](VkResult.html).

|  | If the `vkBindImageMemory2` command failed,
| --- | --- |
[VkBindMemoryStatus](VkBindMemoryStatus.html) structures were not included in the `pNext`
chains of each element of `pBindInfos`,
and `bindInfoCount` was greater than one, then the images referenced by
`pBindInfos` will be in an indeterminate state, and must not be used.

Applications should destroy these images. |

Valid Usage

* 
[](#VUID-vkBindImageMemory2-pBindInfos-02858) VUID-vkBindImageMemory2-pBindInfos-02858

If any [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)::`image` was created with
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) then all planes of
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)::`image` **must** be bound individually in
separate `pBindInfos`

* 
[](#VUID-vkBindImageMemory2-pBindInfos-04006) VUID-vkBindImageMemory2-pBindInfos-04006

`pBindInfos` **must** not refer to the same image subresource more than
once

Valid Usage (Implicit)

* 
[](#VUID-vkBindImageMemory2-device-parameter) VUID-vkBindImageMemory2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindImageMemory2-pBindInfos-parameter) VUID-vkBindImageMemory2-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html) structures

* 
[](#VUID-vkBindImageMemory2-bindInfoCount-arraylength) VUID-vkBindImageMemory2-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

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

[VK_KHR_bind_memory2](VK_KHR_bind_memory2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkBindImageMemory2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
