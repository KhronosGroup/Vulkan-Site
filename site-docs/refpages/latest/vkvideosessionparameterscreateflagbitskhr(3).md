# VkVideoSessionParametersCreateFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoSessionParametersCreateFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoSessionParametersCreateFlagBitsKHR - Video session parameters creation flags

Bits which **can** be set in
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)::`flags` are:

// Provided by VK_KHR_video_encode_quantization_map
typedef enum VkVideoSessionParametersCreateFlagBitsKHR {
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR = 0x00000001,
} VkVideoSessionParametersCreateFlagBitsKHR;

* 
[VK_VIDEO_SESSION_PARAMETERS_CREATE_QUANTIZATION_MAP_COMPATIBLE_BIT_KHR](#)
specifies that the created video session parameters object **can** be used
with [quantization maps](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map).

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkVideoSessionParametersCreateFlagsKHR](VkVideoSessionParametersCreateFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoSessionParametersCreateFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
