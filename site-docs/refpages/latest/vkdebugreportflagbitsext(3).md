# VkDebugReportFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugReportFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugReportFlagBitsEXT - Bitmask specifying events which cause a debug report callback

Bits which **can** be set in
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html)::`flags`, specifying events
which cause a debug report, are:

// Provided by VK_EXT_debug_report
typedef enum VkDebugReportFlagBitsEXT {
    VK_DEBUG_REPORT_INFORMATION_BIT_EXT = 0x00000001,
    VK_DEBUG_REPORT_WARNING_BIT_EXT = 0x00000002,
    VK_DEBUG_REPORT_PERFORMANCE_WARNING_BIT_EXT = 0x00000004,
    VK_DEBUG_REPORT_ERROR_BIT_EXT = 0x00000008,
    VK_DEBUG_REPORT_DEBUG_BIT_EXT = 0x00000010,
} VkDebugReportFlagBitsEXT;

* 
[VK_DEBUG_REPORT_ERROR_BIT_EXT](#) specifies that the application has
violated a valid usage condition of the specification.

* 
[VK_DEBUG_REPORT_WARNING_BIT_EXT](#) specifies use of Vulkan that **may**
expose an application bug.
Such cases may not be immediately harmful, such as a fragment shader
outputting to a location with no attachment.
Other cases **may** point to behavior that is almost certainly bad when
unintended such as using an image whose memory has not been filled.
In general if you see a warning but you know that the behavior is
intended/desired, then simply ignore the warning.

* 
[VK_DEBUG_REPORT_PERFORMANCE_WARNING_BIT_EXT](#) specifies a
potentially non-optimal use of Vulkan, e.g. using
[vkCmdClearColorImage](vkCmdClearColorImage.html) when setting
[VkAttachmentDescription](VkAttachmentDescription.html)::`loadOp` to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html) would have worked.

* 
[VK_DEBUG_REPORT_INFORMATION_BIT_EXT](#) specifies an informational
message such as resource details that may be handy when debugging an
application.

* 
[VK_DEBUG_REPORT_DEBUG_BIT_EXT](#) specifies diagnostic information
from the implementation and layers.

[VK_EXT_debug_report](VK_EXT_debug_report.html), [VkDebugReportFlagsEXT](VkDebugReportFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugReportFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
