# vkCopyImageToImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyImageToImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyImageToImage - Copy image data using the host

To copy data from an image object to another image object using the host,
call:

// Provided by VK_VERSION_1_4
VkResult vkCopyImageToImage(
    VkDevice                                    device,
    const VkCopyImageToImageInfo*               pCopyImageToImageInfo);

// Provided by VK_EXT_host_image_copy
// Equivalent to vkCopyImageToImage
VkResult vkCopyImageToImageEXT(
    VkDevice                                    device,
    const VkCopyImageToImageInfo*               pCopyImageToImageInfo);

* 
`device` is the device which owns
`pCopyImageToImageInfo->srcImage` and
`pCopyImageToImageInfo->dstImage`.

* 
`pCopyImageToImageInfo` is a pointer to a
[VkCopyImageToImageInfo](VkCopyImageToImageInfo.html) structure describing the copy parameters.

This command is functionally similar to [vkCmdCopyImage2](vkCmdCopyImage2.html), except it is
executed on the host.
The memory of `pCopyImageToImageInfo->srcImage` and
`pCopyImageToImageInfo->dstImage` is accessed by the host as if
[coherent](../../../../spec/latest/chapters/memory.html#memory-coherent).

|  | If the device has written to the memory of
| --- | --- |
`pCopyImageToImageInfo->srcImage`, it is not automatically made
available to the host.
Before this copy command can be called, a memory barrier for this image
**must** have been issued on the device with the second
[synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) including
[VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html) and [VK_ACCESS_HOST_READ_BIT](VkAccessFlagBits.html).

Because queue submissions [automatically make host memory visible to the device](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-host-writes), there would not be a
need for a memory barrier before using the results of this copy operation in
`pCopyMemoryToImageInfo->dstImage` on the device. |

Valid Usage (Implicit)

* 
[](#VUID-vkCopyImageToImage-device-parameter) VUID-vkCopyImageToImage-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyImageToImage-pCopyImageToImageInfo-parameter) VUID-vkCopyImageToImage-pCopyImageToImageInfo-parameter

 `pCopyImageToImageInfo` **must** be a valid pointer to a valid [VkCopyImageToImageInfo](VkCopyImageToImageInfo.html) structure

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

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCopyImageToImageInfo](VkCopyImageToImageInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCopyImageToImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
