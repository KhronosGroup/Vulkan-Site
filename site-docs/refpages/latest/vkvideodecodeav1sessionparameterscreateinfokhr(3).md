# VkVideoDecodeAV1SessionParametersCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeAV1SessionParametersCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeAV1SessionParametersCreateInfoKHR - Structure specifies AV1 decoder parameter set information

When a [video session parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) object is
created with the codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)::`pNext` chain **must** include
a `VkVideoDecodeAV1SessionParametersCreateInfoKHR` structure specifying
the contents of the object.

The `VkVideoDecodeAV1SessionParametersCreateInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_decode_av1
typedef struct VkVideoDecodeAV1SessionParametersCreateInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    const StdVideoAV1SequenceHeader*    pStdSequenceHeader;
} VkVideoDecodeAV1SessionParametersCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdSequenceHeader` is a pointer to a
`StdVideoAV1SequenceHeader` structure describing the
[AV1 sequence header](../../../../spec/latest/chapters/videocoding.html#decode-av1-sequence-header) entry to store in the
created object.

|  | As AV1 video session parameters objects will only ever contain a single AV1
| --- | --- |
sequence header, this has to be specified at object creation time and such
video session parameters objects cannot be updated using the
[vkUpdateVideoSessionParametersKHR](vkUpdateVideoSessionParametersKHR.html) command.
When a new AV1 sequence header is decoded from the input video bitstream the
application needs to create a new video session parameters object to store
it. |

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeAV1SessionParametersCreateInfoKHR-sType-sType) VUID-VkVideoDecodeAV1SessionParametersCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeAV1SessionParametersCreateInfoKHR-pStdSequenceHeader-parameter) VUID-VkVideoDecodeAV1SessionParametersCreateInfoKHR-pStdSequenceHeader-parameter

 `pStdSequenceHeader` **must** be a valid pointer to a valid `StdVideoAV1SequenceHeader` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeAV1SessionParametersCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
