# vkCopyMemoryToImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyMemoryToImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyMemoryToImage - Copy data from host memory into an image

To copy data from host memory to an image object, call:

// Provided by VK_VERSION_1_4
VkResult vkCopyMemoryToImage(
    VkDevice                                    device,
    const VkCopyMemoryToImageInfo*              pCopyMemoryToImageInfo);

// Provided by VK_EXT_host_image_copy
// Equivalent to vkCopyMemoryToImage
VkResult vkCopyMemoryToImageEXT(
    VkDevice                                    device,
    const VkCopyMemoryToImageInfo*              pCopyMemoryToImageInfo);

* 
`device` is the device which owns
`pCopyMemoryToImageInfo->dstImage`.

* 
`pCopyMemoryToImageInfo` is a pointer to a
[VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html) structure describing the copy parameters.

This command is functionally similar to [vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html),
except it is executed on the host and reads from host memory instead of a
buffer.
The memory of `pCopyMemoryToImageInfo->dstImage` is accessed by the host
as if [coherent](../../../../spec/latest/chapters/memory.html#memory-coherent).

|  | Because queue submissions [automatically make host memory visible to the device](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-host-writes), there would not be a
| --- | --- |
need for a memory barrier before using the results of this copy operation on
the device. |

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMemoryToImage-device-parameter) VUID-vkCopyMemoryToImage-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyMemoryToImage-pCopyMemoryToImageInfo-parameter) VUID-vkCopyMemoryToImage-pCopyMemoryToImageInfo-parameter

 `pCopyMemoryToImageInfo` **must** be a valid pointer to a valid [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html) structure

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

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCopyMemoryToImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
