# VK_KHR_video_encode_quantization_map(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_encode_quantization_map.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_encode_quantization_map](#VK_KHR_video_encode_quantization_map)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_video_encode_quantization_map - device extension

**Name String**

`VK_KHR_video_encode_quantization_map`

**Extension Type**

Device extension

**Registered Extension Number**

554

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)

and

     [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)

     or

     [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_KHR_video_encode_av1

* 
Interacts with VK_KHR_video_encode_h264

* 
Interacts with VK_KHR_video_encode_h265

**Contact**

* 
Ahmed Abdelkhalek [aabdelkh](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_encode_quantization_map] @aabdelkh%0A*Here describe the issue or question you have about the VK_KHR_video_encode_quantization_map extension*)

**Extension Proposal**

[VK_KHR_video_encode_quantization_map](../../../../features/latest/features/proposals/VK_KHR_video_encode_quantization_map.html)

**Last Modified Date**

2024-09-23

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Benjamin Cheng, AMD

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Ping Liu, Intel

* 
Daniel Rakos, RasterGrid

* 
Lynne Iribarren, Independent

This extension builds upon the `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)` extension
by enabling fine grained control of codec-specific quantization parameters
in video encode operations.

More specifically, it adds support for quantization maps:

* 
Quantization delta maps to directly control the relative value of
quantization parameter values on a per-block basis for all rate control
modes (including when rate control is disabled).

* 
Emphasis maps to indirectly control the relative quantization parameter
values on a per-block basis when rate control is not disabled and the
rate control mode is not configured to the implementation-defined
default mode.

This extension is to be used in conjunction with other codec specific video
encode extensions that specify the codec specific quantization parameters
these maps control.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR](VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeQuantizationMapCapabilitiesKHR](VkVideoEncodeQuantizationMapCapabilitiesKHR.html)

Extending [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html):

* 
[VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html)

Extending [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html):

* 
[VkVideoFormatQuantizationMapPropertiesKHR](VkVideoFormatQuantizationMapPropertiesKHR.html)

Extending [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html):

* 
[VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR](VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR.html)

If [VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html) is supported:

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoEncodeAV1QuantizationMapCapabilitiesKHR](VkVideoEncodeAV1QuantizationMapCapabilitiesKHR.html)

Extending [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html):

* 
[VkVideoFormatAV1QuantizationMapPropertiesKHR](VkVideoFormatAV1QuantizationMapPropertiesKHR.html)

If [VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html) is supported:

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoEncodeH264QuantizationMapCapabilitiesKHR](VkVideoEncodeH264QuantizationMapCapabilitiesKHR.html)

If [VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html) is supported:

* 
Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

[VkVideoEncodeH265QuantizationMapCapabilitiesKHR](VkVideoEncodeH265QuantizationMapCapabilitiesKHR.html)

Extending [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html):

* 
[VkVideoFormatH265QuantizationMapPropertiesKHR](VkVideoFormatH265QuantizationMapPropertiesKHR.html)

* 
[VkVideoEncodeFlagBitsKHR](VkVideoEncodeFlagBitsKHR.html)

* 
[VkVideoSessionParametersCreateFlagBitsKHR](VkVideoSessionParametersCreateFlagBitsKHR.html)

* 
`VK_KHR_VIDEO_ENCODE_QUANTIZATION_MAP_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_ENCODE_QUANTIZATION_MAP_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkFormatFeatureFlagBits2.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUANTIZATION_MAP_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_FORMAT_QUANTIZATION_MAP_PROPERTIES_KHR](VkStructureType.html)

Extending [VkVideoEncodeCapabilityFlagBitsKHR](VkVideoEncodeCapabilityFlagBitsKHR.html):

* 
[VK_VIDEO_ENCODE_CAPABILITY_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeCapabilityFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_CAPABILITY_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeCapabilityFlagBitsKHR.html)

Extending [VkVideoEncodeFlagBitsKHR](VkVideoEncodeFlagBitsKHR.html):

* 
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

* 
[VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeFlagBitsKHR.html)

Extending [VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html):

* 
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

Extending [VkVideoSessionParametersCreateFlagBitsKHR](VkVideoSessionParametersCreateFlagBitsKHR.html):

* 
[VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR](VkVideoSessionParametersCreateFlagBitsKHR.html)

If [VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_FORMAT_AV1_QUANTIZATION_MAP_PROPERTIES_KHR](VkStructureType.html)

If [VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

Extending [VkVideoEncodeH264CapabilityFlagBitsKHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html):

* 
[VK_VIDEO_ENCODE_H264_CAPABILITY_MB_QP_DIFF_WRAPAROUND_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html)

If [VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_QUANTIZATION_MAP_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_FORMAT_H265_QUANTIZATION_MAP_PROPERTIES_KHR](VkStructureType.html)

Extending [VkVideoEncodeH265CapabilityFlagBitsKHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html):

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html)

* 
Revision 1, 2024-08-21 (Daniel Rakos)

Internal revisions

Revision 2, 2024-09-23 (Daniel Rakos)

* 
Added interactions with VK_KHR_video_encode_av1

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_encode_quantization_map).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
