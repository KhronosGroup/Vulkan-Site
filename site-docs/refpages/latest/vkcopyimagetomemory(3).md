# vkCopyImageToMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyImageToMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyImageToMemory - Copy image data into host memory

To copy data from an image object to host memory, call:

// Provided by VK_VERSION_1_4
VkResult vkCopyImageToMemory(
    VkDevice                                    device,
    const VkCopyImageToMemoryInfo*              pCopyImageToMemoryInfo);

// Provided by VK_EXT_host_image_copy
// Equivalent to vkCopyImageToMemory
VkResult vkCopyImageToMemoryEXT(
    VkDevice                                    device,
    const VkCopyImageToMemoryInfo*              pCopyImageToMemoryInfo);

* 
`device` is the device which owns
`pCopyImageToMemoryInfo->srcImage`.

* 
`pCopyImageToMemoryInfo` is a pointer to a
[VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html) structure describing the copy parameters.

This command is functionally similar to [vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html),
except it is executed on the host and writes to host memory instead of a
buffer.
The memory of `pCopyImageToMemoryInfo->srcImage` is accessed by the host
as if [coherent](../../../../spec/latest/chapters/memory.html#memory-coherent).

|  | If the device has written to the image memory, it is not automatically made
| --- | --- |
available to the host.
Before this copy command can be called, a memory barrier for this image
**must** have been issued on the device with the second
[synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) including
[VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html) and [VK_ACCESS_HOST_READ_BIT](VkAccessFlagBits.html). |

Valid Usage (Implicit)

* 
[](#VUID-vkCopyImageToMemory-device-parameter) VUID-vkCopyImageToMemory-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyImageToMemory-pCopyImageToMemoryInfo-parameter) VUID-vkCopyImageToMemory-pCopyImageToMemoryInfo-parameter

 `pCopyImageToMemoryInfo` **must** be a valid pointer to a valid [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html) structure

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

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCopyImageToMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
