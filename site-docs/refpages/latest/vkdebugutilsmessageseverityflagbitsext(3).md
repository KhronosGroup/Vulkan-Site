# VkDebugUtilsMessageSeverityFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsMessageSeverityFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsMessageSeverityFlagBitsEXT - Bitmask specifying which severities of events cause a debug messenger callback

Bits which **can** be set in
[VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html)::`messageSeverity`, specifying
event severities which cause a debug messenger to call the callback, are:

// Provided by VK_EXT_debug_utils
typedef enum VkDebugUtilsMessageSeverityFlagBitsEXT {
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT = 0x00000001,
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT = 0x00000010,
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT = 0x00000100,
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT = 0x00001000,
} VkDebugUtilsMessageSeverityFlagBitsEXT;

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT](#) specifies the most
verbose output indicating all diagnostic messages from the Vulkan
loader, layers, and drivers should be captured.

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT](#) specifies an
informational message such as resource details that may be handy when
debugging an application.

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT](#) specifies use of
Vulkan that **may** expose an application bug.
Such cases may not be immediately harmful, such as a fragment shader
outputting to a location with no attachment.
Other cases **may** point to behavior that is almost certainly bad when
unintended such as using an image whose memory has not been filled.
In general if you see a warning but you know that the behavior is
intended/desired, then simply ignore the warning.

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT](#) specifies that the
application has violated a valid usage condition of the specification.

|  | The values of [VkDebugUtilsMessageSeverityFlagBitsEXT](#) are sorted based
| --- | --- |
on severity.
The higher the flag value, the more severe the message.
This allows for simple boolean operation comparisons when looking at
[VkDebugUtilsMessageSeverityFlagBitsEXT](#) values.

For example:

    if (messageSeverity >= VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT) {
        // Do something for warnings and errors
    }

In addition, space has been left between the enums to allow for later
addition of new severities in between the existing values. |

[PFN_vkDebugUtilsMessengerCallbackEXT](PFN_vkDebugUtilsMessengerCallbackEXT.html), [VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsMessageSeverityFlagsEXT](VkDebugUtilsMessageSeverityFlagsEXT.html), [vkSubmitDebugUtilsMessageEXT](vkSubmitDebugUtilsMessageEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsMessageSeverityFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
