# VkToolPurposeFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkToolPurposeFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkToolPurposeFlagBits - Bitmask specifying the purposes of an active tool

Bits which **can** be set in
[VkPhysicalDeviceToolProperties](VkPhysicalDeviceToolProperties.html)::`purposes`, specifying the
purposes of an active tool, are:

// Provided by VK_VERSION_1_3
typedef enum VkToolPurposeFlagBits {
    VK_TOOL_PURPOSE_VALIDATION_BIT = 0x00000001,
    VK_TOOL_PURPOSE_PROFILING_BIT = 0x00000002,
    VK_TOOL_PURPOSE_TRACING_BIT = 0x00000004,
    VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT = 0x00000008,
    VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT = 0x00000010,
  // Provided by VK_EXT_debug_report with VK_EXT_tooling_info, VK_EXT_debug_utils with VK_EXT_tooling_info
    VK_TOOL_PURPOSE_DEBUG_REPORTING_BIT_EXT = 0x00000020,
  // Provided by VK_EXT_debug_marker with VK_EXT_tooling_info, VK_EXT_debug_utils with VK_EXT_tooling_info
    VK_TOOL_PURPOSE_DEBUG_MARKERS_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_VALIDATION_BIT_EXT = VK_TOOL_PURPOSE_VALIDATION_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_PROFILING_BIT_EXT = VK_TOOL_PURPOSE_PROFILING_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_TRACING_BIT_EXT = VK_TOOL_PURPOSE_TRACING_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT_EXT = VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT_EXT = VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT,
} VkToolPurposeFlagBits;

// Provided by VK_EXT_tooling_info
// Equivalent to VkToolPurposeFlagBits
typedef VkToolPurposeFlagBits VkToolPurposeFlagBitsEXT;

* 
[VK_TOOL_PURPOSE_VALIDATION_BIT](#) specifies that the tool provides
validation of API usage.

* 
[VK_TOOL_PURPOSE_PROFILING_BIT](#) specifies that the tool provides
profiling of API usage.

* 
[VK_TOOL_PURPOSE_TRACING_BIT](#) specifies that the tool is capturing
data about the application’s API usage, including anything from simple
logging to capturing data for later replay.

* 
[VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT](#) specifies that the tool
provides additional API features/extensions on top of the underlying
implementation.

* 
[VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT](#) specifies that the tool
modifies the API features/limits/extensions presented to the
application.

* 
[VK_TOOL_PURPOSE_DEBUG_REPORTING_BIT_EXT](#) specifies that the tool
reports additional information to the application via callbacks
specified by
[vkCreateDebugReportCallbackEXT](vkCreateDebugReportCallbackEXT.html)
or
[vkCreateDebugUtilsMessengerEXT](vkCreateDebugUtilsMessengerEXT.html)

* 
[VK_TOOL_PURPOSE_DEBUG_MARKERS_BIT_EXT](#) specifies that the tool
consumes
[debug markers](../../../../spec/latest/chapters/debugging.html#debugging-debug-markers)
or
[object debug annotation](../../../../spec/latest/chapters/debugging.html#debugging-object-debug-annotation),
[queue labels](../../../../spec/latest/chapters/debugging.html#debugging-queue-labels), or
[command buffer labels](../../../../spec/latest/chapters/debugging.html#debugging-command-buffer-labels)

[VK_EXT_tooling_info](VK_EXT_tooling_info.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkToolPurposeFlags](VkToolPurposeFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkToolPurposeFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
