# vkGetPhysicalDeviceVideoFormatPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceVideoFormatPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceVideoFormatPropertiesKHR - Query supported video decode and encode image formats and capabilities

To enumerate the supported video formats and corresponding capabilities for
a specific video profile, call:

// Provided by VK_KHR_video_queue
VkResult vkGetPhysicalDeviceVideoFormatPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceVideoFormatInfoKHR*   pVideoFormatInfo,
    uint32_t*                                   pVideoFormatPropertyCount,
    VkVideoFormatPropertiesKHR*                 pVideoFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
video format properties.

* 
`pVideoFormatInfo` is a pointer to a
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html) structure specifying the usage
and video profiles for which supported image formats and capabilities
are returned.

* 
`pVideoFormatPropertyCount` is a pointer to an integer related to
the number of video format properties available or queried, as described
below.

* 
`pVideoFormatProperties` is a pointer to an array of
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html) structures in which supported image
formats and capabilities are returned.

If `pVideoFormatProperties` is `NULL`, then the number of video format
properties supported for the given `physicalDevice` is returned in
`pVideoFormatPropertyCount`.
Otherwise, `pVideoFormatPropertyCount` **must** point to a variable set by
the application to the number of elements in the
`pVideoFormatProperties` array, and on return the variable is
overwritten with the number of values actually written to
`pVideoFormatProperties`.
If the value of `pVideoFormatPropertyCount` is less than the number of
video format properties supported, at most `pVideoFormatPropertyCount`
values will be written to `pVideoFormatProperties`, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available values were returned.

Video format properties are always queried with respect to a specific set of
video profiles.
These are specified by chaining the [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure to `pVideoFormatInfo`.

For most use cases, the images are used by a single video session and a
single video profile is provided.
For a use case such as video transcoding, where a decode session output
image **can** be used as encode input in one or more encode sessions, multiple
video profiles corresponding to the video sessions that will share the image
**must** be provided.

If any of the [video profiles](../../../../spec/latest/chapters/videocoding.html#video-profiles) specified via
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)::`pProfiles` are not supported, then
this command returns one of the [video-profile-specific error codes](../../../../spec/latest/chapters/videocoding.html#video-profile-error-codes).
Furthermore, if [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)::`imageUsage`
includes any image usage flags not supported by the specified video
profiles, then this command returns
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](VkResult.html).

If the decode capability flags include
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_COINCIDE_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html), then
querying video format properties that support both decode DPB and output
usage **can** be done by including both
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html) and
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) in
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)::`imageUsage`.
However, even in this case, querying video format properties with
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)::`imageUsage` including only
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) will also return formats
supporting both.

|  | This enables application to be able to query all formats supporting
| --- | --- |
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html) and/or
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) by just including one of the
flags, respectively, regardless of whether the implementation supports
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_COINCIDE_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html),
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_DISTINCT_BIT_KHR](VkVideoDecodeCapabilityFlagBitsKHR.html), or both.
This makes enumerating decode DPB and output formats simpler and unified. |

The `imageUsage` member of the [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)
structure specifies the expected video usage flags that the returned video
formats **must** support.
Correspondingly, the `imageUsageFlags` member of each
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html) structure returned will contain at least
the same set of image usage flags.

If the implementation supports using images of a particular format in
operations other than video decode/encode then the `imageUsageFlags`
member of the corresponding [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html) structure
returned will include additional image usage flags indicating that.

|  | For most use cases, only decode or encode related usage flags are going to
| --- | --- |
be specified.
For a use case such as transcode, if the image were to be shared between
decode and encode session(s), then both decode and encode related usage
flags **can** be set. |

Multiple `VkVideoFormatPropertiesKHR` entries **may** be returned with the
same `format` member with different `componentMapping`,
`imageType`, or `imageTiling` values, as described later.

If [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)::`imageUsage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), multiple
`VkVideoFormatPropertiesKHR` entries **may** be returned with the same
`format`, `componentMapping`, `imageType`, and `imageTiling`
member values, but different `quantizationMapTexelSize` returned in the
[VkVideoFormatQuantizationMapPropertiesKHR](VkVideoFormatQuantizationMapPropertiesKHR.html) structure, if one is
included in the [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`pNext` chain, when
the queried [quantization map type](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map) supports
multiple distinct [quantization map texel sizes](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map-texel-size).

In addition, a different set of `VkVideoFormatPropertiesKHR` entries
**may** be returned depending on the `imageUsage` member of the
`VkPhysicalDeviceVideoFormatInfoKHR` structure, even for the same set of
video profiles, for example, based on whether encode input, encode DPB,
decode output, and/or decode DPB usage is requested.

The application **can** select the parameters returned in the
`VkVideoFormatPropertiesKHR` entries and use compatible parameters when
creating the input, output, and DPB images.
The implementation will report all image creation and usage flags that are
valid for images used with the requested video profiles but applications
**should** create images only with those that are necessary for the particular
use case.

Before creating an image, the application **can** obtain the complete set of
supported image format features by calling
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) using parameters derived
from the members of one of the reported `VkVideoFormatPropertiesKHR`
entries and adding the same [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure to the
`pNext` chain of [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html).

The following applies to all `VkVideoFormatPropertiesKHR` entries
returned by `vkGetPhysicalDeviceVideoFormatPropertiesKHR`:

* 
[vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) **must** succeed when called
with `VkVideoFormatPropertiesKHR`::`format`

* 
If `VkVideoFormatPropertiesKHR`::`imageTiling` is
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), then the `optimalTilingFeatures`
returned by [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) **must** include all
format features required by the image usage flags reported in
`VkVideoFormatPropertiesKHR`::`imageUsageFlags` for the format,
as indicated in the [Format    Feature Dependent Usage Flags](../../../../spec/latest/chapters/formats.html#format-feature-dependent-usage-flags) section.

* 
If `VkVideoFormatPropertiesKHR`::`imageTiling` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html), then the `linearTilingFeatures`
returned by [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) **must** include all
format features required by the image usage flags reported in
`VkVideoFormatPropertiesKHR`::`imageUsageFlags` for the format,
as indicated in the [Format    Feature Dependent Usage Flags](../../../../spec/latest/chapters/formats.html#format-feature-dependent-usage-flags) section.

* 
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) **must** succeed when
called with a [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) structure
containing the following information:

The `pNext` chain including the same
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure used to call
`vkGetPhysicalDeviceVideoFormatPropertiesKHR`.

* 
`format` set to the value of
`VkVideoFormatPropertiesKHR`::`format`.

* 
`type` set to the value of
`VkVideoFormatPropertiesKHR`::`imageType`.

* 
`tiling` set to the value of
`VkVideoFormatPropertiesKHR`::`imageTiling`.

* 
`usage` set to the value of
`VkVideoFormatPropertiesKHR`::`imageUsageFlags`.

* 
`flags` set to the value of
`VkVideoFormatPropertiesKHR`::`imageCreateFlags`.

The `componentMapping` member of `VkVideoFormatPropertiesKHR`
defines the ordering of the Y′CBCR color channels from the perspective of
the video codec operations specified in [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html).
For example, if the implementation produces video decode output with the
format [VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](VkFormat.html) where the blue and red
chrominance channels are swapped then the `componentMapping` member of
the corresponding `VkVideoFormatPropertiesKHR` structure will have the
following member values:

components.r = VK_COMPONENT_SWIZZLE_B;        // Cb component
components.g = VK_COMPONENT_SWIZZLE_IDENTITY; // Y component
components.b = VK_COMPONENT_SWIZZLE_R;        // Cr component
components.a = VK_COMPONENT_SWIZZLE_IDENTITY; // unused, defaults to 1.0

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pNext-06812) VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pNext-06812

The `pNext` chain of `pVideoFormatInfo` **must** include a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure with `profileCount`
greater than `0`

* 
[](#VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pNext-10922) VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pNext-10922

If the `pNext` chain of `pVideoFormatInfo` includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure, then the
[`videoEncodeRgbConversion`](../../../../spec/latest/chapters/features.html#features-videoEncodeRgbConversion)
feature **must** be supported

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pVideoFormatInfo-parameter) VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pVideoFormatInfo-parameter

 `pVideoFormatInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pVideoFormatPropertyCount-parameter) VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pVideoFormatPropertyCount-parameter

 `pVideoFormatPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pVideoFormatProperties-parameter) VUID-vkGetPhysicalDeviceVideoFormatPropertiesKHR-pVideoFormatProperties-parameter

 If the value referenced by `pVideoFormatPropertyCount` is not `0`, and `pVideoFormatProperties` is not `NULL`, `pVideoFormatProperties` **must** be a valid pointer to an array of `pVideoFormatPropertyCount` [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](VkResult.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkGetPhysicalDeviceVideoFormatPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
