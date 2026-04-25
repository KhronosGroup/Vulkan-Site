# VkVideoSessionCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoSessionCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoSessionCreateInfoKHR - Structure specifying parameters of a newly created video session

The [VkVideoSessionCreateInfoKHR](#) structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoSessionCreateInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        queueFamilyIndex;
    VkVideoSessionCreateFlagsKHR    flags;
    const VkVideoProfileInfoKHR*    pVideoProfile;
    VkFormat                        pictureFormat;
    VkExtent2D                      maxCodedExtent;
    VkFormat                        referencePictureFormat;
    uint32_t                        maxDpbSlots;
    uint32_t                        maxActiveReferencePictures;
    const VkExtensionProperties*    pStdHeaderVersion;
} VkVideoSessionCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyIndex` is the index of the queue family the created
video session will be used with.

* 
`flags` is a bitmask of [VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html)
specifying creation flags.

* 
`pVideoProfile` is a pointer to a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure specifying the video profile the created video session will be
used with.

* 
`pictureFormat` is the image format the created video session will
be used with.
If `pVideoProfile->videoCodecOperation` specifies a decode
operation, then `pictureFormat` is the image format of
[decode output pictures](../../../../spec/latest/chapters/videocoding.html#decode-output-picture) usable with the
created video session.
If `pVideoProfile->videoCodecOperation` specifies an encode
operation, then `pictureFormat` is the image format of
[encode input pictures](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) usable with the created
video session.

* 
`maxCodedExtent` is the maximum width and height of the coded frames
the created video session will be used with.

* 
`referencePictureFormat` is the image format of
[reference pictures](../../../../spec/latest/chapters/videocoding.html#reference-picture) stored in the [DPB](../../../../spec/latest/chapters/videocoding.html#dpb) the
created video session will be used with.

* 
`maxDpbSlots` is the maximum number of [DPB Slots](../../../../spec/latest/chapters/videocoding.html#dpb-slot) that
**can** be used with the created video session.

* 
`maxActiveReferencePictures` is the maximum number of
[active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures) that **can** be
used in a single video coding operation using the created video session.

* 
`pStdHeaderVersion` is a pointer to a [VkExtensionProperties](VkExtensionProperties.html)
structure requesting the Video Std header version to use for the
`videoCodecOperation` specified in `pVideoProfile`.

Valid Usage

* 
[](#VUID-VkVideoSessionCreateInfoKHR-protectedMemory-07189) VUID-VkVideoSessionCreateInfoKHR-protectedMemory-07189

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
not enabled or if [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`flags` does not
include [VK_VIDEO_CAPABILITY_PROTECTED_CONTENT_BIT_KHR](VkVideoCapabilityFlagBitsKHR.html), as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified by `pVideoProfile`, then `flags` **must** not include
[VK_VIDEO_SESSION_CREATE_PROTECTED_CONTENT_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-08371) VUID-VkVideoSessionCreateInfoKHR-flags-08371

If `flags` includes
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then
[`videoMaintenance1`](../../../../spec/latest/chapters/features.html#features-videoMaintenance1) **must** be enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10398) VUID-VkVideoSessionCreateInfoKHR-flags-10398

If `flags` includes
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then
[`videoMaintenance2`](../../../../spec/latest/chapters/features.html#features-videoMaintenance2) **must** be enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10399) VUID-VkVideoSessionCreateInfoKHR-flags-10399

If `flags` includes
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then
`pVideoProfile->videoCodecOperation` **must** specify a decode
operation

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10264) VUID-VkVideoSessionCreateInfoKHR-flags-10264

If `flags` includes
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)
or [VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then
the [    `videoEncodeQuantizationMap`](../../../../spec/latest/chapters/features.html#features-videoEncodeQuantizationMap) feature **must** be enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10265) VUID-VkVideoSessionCreateInfoKHR-flags-10265

If `flags` includes
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)
or [VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html), then
`pVideoProfile->videoCodecOperation` **must** specify an encode
operation

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10266) VUID-VkVideoSessionCreateInfoKHR-flags-10266

If `flags` includes
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html),
then it **must** not also include
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10267) VUID-VkVideoSessionCreateInfoKHR-flags-10267

If [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_CAPABILITY_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeCapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile specified by `pVideoProfile`, then `flags` **must** not
include
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-10268) VUID-VkVideoSessionCreateInfoKHR-flags-10268

If [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`flags` does not include
[VK_VIDEO_ENCODE_CAPABILITY_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeCapabilityFlagBitsKHR.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified by `pVideoProfile`, then `flags` **must** not include
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-11759) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-11759

`pVideoProfile->videoCodecOperation` **must** be supported by the queue
family index specified in `queueFamilyIndex`, as reported in
[VkQueueFamilyVideoPropertiesKHR](VkQueueFamilyVideoPropertiesKHR.html)::`videoCodecOperations`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-04845) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-04845

`pVideoProfile` **must** be a [supported video    profile](../../../../spec/latest/chapters/videocoding.html#video-profile-support)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-maxDpbSlots-04847) VUID-VkVideoSessionCreateInfoKHR-maxDpbSlots-04847

`maxDpbSlots` **must** be less than or equal to
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`maxDpbSlots`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified by `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-maxActiveReferencePictures-04849) VUID-VkVideoSessionCreateInfoKHR-maxActiveReferencePictures-04849

`maxActiveReferencePictures` **must** be less than or equal to
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`maxActiveReferencePictures`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile specified by `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-maxDpbSlots-04850) VUID-VkVideoSessionCreateInfoKHR-maxDpbSlots-04850

If either `maxDpbSlots` or `maxActiveReferencePictures` is `0`,
then both **must** be `0`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-maxCodedExtent-04851) VUID-VkVideoSessionCreateInfoKHR-maxCodedExtent-04851

`maxCodedExtent` **must** be between
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`minCodedExtent` and
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`maxCodedExtent`, inclusive, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile specified by `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-referencePictureFormat-04852) VUID-VkVideoSessionCreateInfoKHR-referencePictureFormat-04852

If `pVideoProfile->videoCodecOperation` specifies a decode operation
and `maxActiveReferencePictures` is greater than `0`, then
`referencePictureFormat` **must** be one of the supported decode DPB
formats, as returned by
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`format` when called with the
`imageUsage` member of its `pVideoFormatInfo` parameter
containing [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html), and with a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure specified in the `pNext`
chain of its `pVideoFormatInfo` parameter whose `pProfiles`
member contains an element matching `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-referencePictureFormat-06814) VUID-VkVideoSessionCreateInfoKHR-referencePictureFormat-06814

If `pVideoProfile->videoCodecOperation` specifies an encode
operation and `maxActiveReferencePictures` is greater than `0`, then
`referencePictureFormat` **must** be one of the supported decode DPB
formats, as returned by then `referencePictureFormat` **must** be one
of the supported encode DPB formats, as returned by
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`format` when called with the
`imageUsage` member of its `pVideoFormatInfo` parameter
containing [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html), and with a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure specified in the `pNext`
chain of its `pVideoFormatInfo` parameter whose `pProfiles`
member contains an element matching `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pictureFormat-04853) VUID-VkVideoSessionCreateInfoKHR-pictureFormat-04853

If `pVideoProfile->videoCodecOperation` specifies a decode
operation, then `pictureFormat` **must** be one of the supported decode
output formats, as returned by
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`format` when called with the
`imageUsage` member of its `pVideoFormatInfo` parameter
containing [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html), and with a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure specified in the `pNext`
chain of its `pVideoFormatInfo` parameter whose `pProfiles`
member contains an element matching `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pictureFormat-04854) VUID-VkVideoSessionCreateInfoKHR-pictureFormat-04854

If `pVideoProfile->videoCodecOperation` specifies an encode
operation, then `pictureFormat` **must** be one of the supported encode
input formats, as returned by
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`format` when called with the
`imageUsage` member of its `pVideoFormatInfo` parameter
containing [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html), and with a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure specified in the `pNext`
chain of its `pVideoFormatInfo` parameter whose `pProfiles`
member contains an element matching `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10835) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10835

If `pVideoProfile->videoCodecOperation` specifies an encode
operation, the `pNext` chain of this structure includes a
[VkVideoEncodeSessionIntraRefreshCreateInfoKHR](VkVideoEncodeSessionIntraRefreshCreateInfoKHR.html) structure, and its
`intraRefreshMode` member is not
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_NONE_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html), then the
[`videoEncodeIntraRefresh`](../../../../spec/latest/chapters/features.html#features-videoEncodeIntraRefresh)
feature **must** be enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10836) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10836

If `pVideoProfile->videoCodecOperation` specifies an encode
operation, the `pNext` chain of this structure includes a
[VkVideoEncodeSessionIntraRefreshCreateInfoKHR](VkVideoEncodeSessionIntraRefreshCreateInfoKHR.html) structure, and its
`intraRefreshMode` member is not
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_NONE_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html), then
`intraRefreshMode` **must** specify one of the bits included in
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`intraRefreshModes`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile specified by `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pStdHeaderVersion-07190) VUID-VkVideoSessionCreateInfoKHR-pStdHeaderVersion-07190

`pStdHeaderVersion->extensionName` **must** match
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`stdHeaderVersion.extensionName`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile specified by `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pStdHeaderVersion-07191) VUID-VkVideoSessionCreateInfoKHR-pStdHeaderVersion-07191

`pStdHeaderVersion->specVersion` **must** be less than or equal to
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`stdHeaderVersion.specVersion`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile specified by `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10793) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10793

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoDecodeVP9`](../../../../spec/latest/chapters/features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-08251) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-08251

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the `pNext`
chain of this structure includes a
[VkVideoEncodeH264SessionCreateInfoKHR](VkVideoEncodeH264SessionCreateInfoKHR.html) structure, then its
`maxLevelIdc` member **must** be less than or equal to
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxLevelIdc`, as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified in `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-08252) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-08252

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the `pNext`
chain of this structure includes a
[VkVideoEncodeH265SessionCreateInfoKHR](VkVideoEncodeH265SessionCreateInfoKHR.html) structure, then its
`maxLevelIdc` member **must** be less than or equal to
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`maxLevelIdc`, as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified in `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10269) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10269

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoEncodeAV1`](../../../../spec/latest/chapters/features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10270) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10270

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and the `pNext`
chain of this structure includes a
[VkVideoEncodeAV1SessionCreateInfoKHR](VkVideoEncodeAV1SessionCreateInfoKHR.html) structure, then its
`maxLevel` member **must** be less than or equal to
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxLevel`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified in `pVideoProfile`

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10923) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-10923

If the `pVideoProfile->pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure, then the
[`videoEncodeRgbConversion`](../../../../spec/latest/chapters/features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pNext-10924) VUID-VkVideoSessionCreateInfoKHR-pNext-10924

If a [VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure is
included in the `pNext` chain of `pVideoProfile` and
`VkVideoEncodeProfileRgbConversionInfoVALVE`::`performEncodeRgbConversion`
is enabled, a [VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html)
structure **must** be included in the `pNext` chain of
[VkVideoSessionCreateInfoKHR](#)

Valid Usage (Implicit)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-sType-sType) VUID-VkVideoSessionCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_SESSION_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pNext-pNext) VUID-VkVideoSessionCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeAV1SessionCreateInfoKHR](VkVideoEncodeAV1SessionCreateInfoKHR.html), [VkVideoEncodeH264SessionCreateInfoKHR](VkVideoEncodeH264SessionCreateInfoKHR.html), [VkVideoEncodeH265SessionCreateInfoKHR](VkVideoEncodeH265SessionCreateInfoKHR.html), [VkVideoEncodeSessionIntraRefreshCreateInfoKHR](VkVideoEncodeSessionIntraRefreshCreateInfoKHR.html), or [VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html)

* 
[](#VUID-VkVideoSessionCreateInfoKHR-sType-unique) VUID-VkVideoSessionCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoSessionCreateInfoKHR-flags-parameter) VUID-VkVideoSessionCreateInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html) values

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-parameter) VUID-VkVideoSessionCreateInfoKHR-pVideoProfile-parameter

 `pVideoProfile` **must** be a valid pointer to a valid [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pictureFormat-parameter) VUID-VkVideoSessionCreateInfoKHR-pictureFormat-parameter

 `pictureFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkVideoSessionCreateInfoKHR-referencePictureFormat-parameter) VUID-VkVideoSessionCreateInfoKHR-referencePictureFormat-parameter

 `referencePictureFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkVideoSessionCreateInfoKHR-pStdHeaderVersion-parameter) VUID-VkVideoSessionCreateInfoKHR-pStdHeaderVersion-parameter

 `pStdHeaderVersion` **must** be a valid pointer to a valid [VkExtensionProperties](VkExtensionProperties.html) structure

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkExtensionProperties](VkExtensionProperties.html), [VkExtent2D](VkExtent2D.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html), [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [VkVideoSessionCreateFlagsKHR](VkVideoSessionCreateFlagsKHR.html), [vkCreateVideoSessionKHR](vkCreateVideoSessionKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoSessionCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
