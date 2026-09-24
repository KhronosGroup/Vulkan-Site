# VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR - Length of an array of supported queue priorities

[VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR](#) is the length of the array
of DPB slot or AV1 reference names passed in
[VkVideoDecodeAV1PictureInfoKHR](VkVideoDecodeAV1PictureInfoKHR.html)::`referenceNameSlotIndices`.

#define VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR 7U

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), [VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VK_MAX_VIDEO_AV1_REFERENCES_PER_FRAME_KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
