# VkBuildMicromapFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBuildMicromapFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBuildMicromapFlagBitsEXT - Bitmask specifying additional parameters for micromap builds

Bits which **can** be set in [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)::`flags`
specifying additional parameters for micromap builds, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkBuildMicromapFlagBitsEXT {
    VK_BUILD_MICROMAP_PREFER_FAST_TRACE_BIT_EXT = 0x00000001,
    VK_BUILD_MICROMAP_PREFER_FAST_BUILD_BIT_EXT = 0x00000002,
    VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT = 0x00000004,
} VkBuildMicromapFlagBitsEXT;

* 
[VK_BUILD_MICROMAP_PREFER_FAST_TRACE_BIT_EXT](#) specifies that the
given micromap build **should** prioritize trace performance over build
time.

* 
[VK_BUILD_MICROMAP_PREFER_FAST_BUILD_BIT_EXT](#) specifies that the
given micromap build **should** prioritize build time over trace
performance.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkBuildMicromapFlagsEXT](VkBuildMicromapFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBuildMicromapFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
