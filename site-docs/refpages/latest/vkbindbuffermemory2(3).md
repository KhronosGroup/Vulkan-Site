# vkBindBufferMemory2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindBufferMemory2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindBufferMemory2 - Bind device memory to buffer objects

To attach memory to buffer objects for one or more buffers at a time, call:

// Provided by VK_VERSION_1_1
VkResult vkBindBufferMemory2(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindBufferMemoryInfo*               pBindInfos);

// Provided by VK_KHR_bind_memory2
// Equivalent to vkBindBufferMemory2
VkResult vkBindBufferMemory2KHR(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindBufferMemoryInfo*               pBindInfos);

* 
`device` is the logical device that owns the buffers and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of `bindInfoCount`
[VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) structures describing buffers and memory to
bind.

On some implementations, it **may** be more efficient to batch memory bindings
into a single command.

If the [`maintenance6`](../../../../spec/latest/chapters/features.html#features-maintenance6) feature is enabled,
this command **must** attempt to perform all of the memory binding operations
described by `pBindInfos`, and **must** not early exit on the first
failure.

If any of the memory binding operations described by `pBindInfos` fail,
the [VkResult](VkResult.html) returned by this command **must** be the return value of any
one of the memory binding operations which did not return [VK_SUCCESS](VkResult.html).

|  | If the `vkBindBufferMemory2` command failed,
| --- | --- |
[VkBindMemoryStatus](VkBindMemoryStatus.html) structures were not included in the `pNext`
chains of each element of `pBindInfos`,
and `bindInfoCount` was greater than one, then the buffers referenced by
`pBindInfos` will be in an indeterminate state, and must not be used.

Applications should destroy these buffers. |

Valid Usage (Implicit)

* 
[](#VUID-vkBindBufferMemory2-device-parameter) VUID-vkBindBufferMemory2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindBufferMemory2-pBindInfos-parameter) VUID-vkBindBufferMemory2-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) structures

* 
[](#VUID-vkBindBufferMemory2-bindInfoCount-arraylength) VUID-vkBindBufferMemory2-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

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

[VK_KHR_bind_memory2](VK_KHR_bind_memory2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkBindBufferMemory2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
