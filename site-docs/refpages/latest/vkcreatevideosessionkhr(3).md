# vkCreateVideoSessionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateVideoSessionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateVideoSessionKHR - Creates a video session object

To create a video session object, call:

// Provided by VK_KHR_video_queue
VkResult vkCreateVideoSessionKHR(
    VkDevice                                    device,
    const VkVideoSessionCreateInfoKHR*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkVideoSessionKHR*                          pVideoSession);

* 
`device` is the logical device that creates the video session.

* 
`pCreateInfo` is a pointer to a [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)
structure containing parameters to be used to create the video session.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pVideoSession` is a pointer to a [VkVideoSessionKHR](VkVideoSessionKHR.html) handle in
which the resulting video session object is returned.

The resulting video session object is said to be created with the video
codec operation specified in
`pCreateInfo->pVideoProfile→videoCodecOperation`.

The name and version of the codec-specific Video Std header to be used with
the video session is specified by the [VkExtensionProperties](VkExtensionProperties.html) structure
pointed to by `pCreateInfo->pStdHeaderVersion`.
If a non-existent or unsupported Video Std header version is specified in
`pCreateInfo->pStdHeaderVersion→specVersion`, then this command returns
[VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR](VkResult.html).

Video session objects are created in *uninitialized* state.
In order to transition the video session into *initial* state, the
application **must** issue a [vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html) command with
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags` including
[VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html).

Video session objects also maintain the
[state](../../../../spec/latest/chapters/videocoding.html#dpb-state-and-backing-store) of the DPB.
The number of DPB slots usable with the created video session is specified
in `pCreateInfo->maxDpbSlots`, and each slot is initially in the
[inactive state](../../../../spec/latest/chapters/videocoding.html#dpb-slot-states).

Each [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) maintained by the created video session **can**
refer to a [reference picture](../../../../spec/latest/chapters/videocoding.html#reference-picture) representing a video
frame.

In addition, if the `videoCodecOperation` member of the
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure pointed to by
`pCreateInfo->pVideoProfile` is
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the
`pictureLayout` member of the [VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html)
structure provided in the [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`pNext` chain is
not [VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_PROGRESSIVE_KHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html), then the
created video session supports *interlaced* frames and each [DPB slot](../../../../spec/latest/chapters/videocoding.html#dpb-slot) maintained by the created video session **can** instead refer to
separate top field and bottom field [reference pictures](../../../../spec/latest/chapters/videocoding.html#reference-picture)
that together **can** represent a full video frame.
In this case, it is up to the application, driven by the video content,
whether it associates any individual DPB slot with separate top and/or
bottom field pictures or a single picture representing a full frame.

The created video session **can** be used to perform video coding operations
using video frames up to the maximum size specified in
`pCreateInfo->maxCodedExtent`.
The minimum frame size allowed is implicitly derived from
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`minCodedExtent`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified by `pCreateInfo->pVideoProfile`.
Accordingly, the created video session is said to be created with a
`minCodedExtent` equal to that.

In case of video session objects created with a video encode operation,
implementations **may** return the
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html) error if any of the
specified Video Std parameters do not adhere to the syntactic or semantic
requirements of the used video compression standard, or if values derived
from parameters according to the rules defined by the used video compression
standard do not adhere to the capabilities of the video compression standard
or the implementation.

|  | Applications **should** not rely on the
| --- | --- |
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html) error being returned by any
command as a means to verify Video Std parameters, as implementations are
not required to report the error in any specific set of cases. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateVideoSessionKHR-device-parameter) VUID-vkCreateVideoSessionKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateVideoSessionKHR-pCreateInfo-parameter) VUID-vkCreateVideoSessionKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateVideoSessionKHR-pAllocator-parameter) VUID-vkCreateVideoSessionKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateVideoSessionKHR-pVideoSession-parameter) VUID-vkCreateVideoSessionKHR-pVideoSession-parameter

 `pVideoSession` **must** be a valid pointer to a [VkVideoSessionKHR](VkVideoSessionKHR.html) handle

* 
[](#VUID-vkCreateVideoSessionKHR-device-queuecount) VUID-vkCreateVideoSessionKHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

* 
[VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR](VkResult.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html), [VkVideoSessionKHR](VkVideoSessionKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkCreateVideoSessionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
