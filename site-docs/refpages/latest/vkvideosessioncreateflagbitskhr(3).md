# VkVideoSessionCreateFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoSessionCreateFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoSessionCreateFlagBitsKHR - Video session creation flags

Bits which **can** be set in [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`flags`
are:

// Provided by VK_KHR_video_queue
typedef enum VkVideoSessionCreateFlagBitsKHR {
    VK_VIDEO_SESSION_CREATE_PROTECTED_CONTENT_BIT_KHR = 0x00000001,
  // Provided by VK_KHR_video_encode_queue
    VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_video_maintenance1
    VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR = 0x00000004,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR = 0x00000008,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR = 0x00000010,
  // Provided by VK_KHR_video_decode_queue with VK_KHR_video_maintenance2
    VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR = 0x00000020,
} VkVideoSessionCreateFlagBitsKHR;

* 
[VK_VIDEO_SESSION_CREATE_PROTECTED_CONTENT_BIT_KHR](#) specifies that
the video session uses protected video content.

* 

[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR](#)
specifies that the implementation is allowed to
[override](../../../../spec/latest/chapters/videocoding.html#encode-overrides) video session parameters and other
codec-specific encoding parameters to optimize video encode operations
based on the use case information specified in the
[video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) and the used
[video encode quality level](../../../../spec/latest/chapters/videocoding.html#encode-quality-level).

|  | Not specifying
| --- | --- |
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_PARAMETER_OPTIMIZATIONS_BIT_KHR](#)
does not guarantee that the implementation will not do any codec-specific
parameter overrides, as certain overrides are necessary for the correct
operation of the video encoder implementation due to limitations to the
available encoding tools on that implementation.
This flag, however, enables the implementation to apply further optimizing
overrides. |

* 
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](#) specifies that
queries within video coding scopes using the created video session are
[executed inline](../../../../spec/latest/chapters/videocoding.html#video-inline-queries) with video coding operations.

* 
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#)
specifies that the video session **can** be used to encode pictures with
[quantization delta maps](../../../../spec/latest/chapters/videocoding.html#encode-quantization-delta-map).

* 
[VK_VIDEO_SESSION_CREATE_ALLOW_ENCODE_EMPHASIS_MAP_BIT_KHR](#)
specifies that the video session **can** be used to encode pictures with
[emphasis maps](../../../../spec/latest/chapters/videocoding.html#encode-emphasis-map).

* 
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](#)
specifies that the application **can** specify video session parameters
inline with video decode operations instead of sourcing them from the
bound [video session parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) object.

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoSessionCreateFlagsKHR](VkVideoSessionCreateFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoSessionCreateFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
