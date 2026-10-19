# VkDebugUtilsMessageTypeFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsMessageTypeFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsMessageTypeFlagBitsEXT - Bitmask specifying which types of events cause a debug messenger callback

Bits which **can** be set in
[VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html)::`messageType`, specifying
event types which cause a debug messenger to call the callback, are:

// Provided by VK_EXT_debug_utils
typedef enum VkDebugUtilsMessageTypeFlagBitsEXT {
    VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT = 0x00000001,
    VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT = 0x00000002,
    VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_device_address_binding_report
    VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT = 0x00000008,
} VkDebugUtilsMessageTypeFlagBitsEXT;

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT](#) specifies that some
general event has occurred.
This is typically a non-specification, non-performance event.

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT](#) specifies that
something has occurred during validation against the Vulkan
specification that may indicate invalid behavior.

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT](#) specifies a
potentially non-optimal use of Vulkan, e.g. using
[vkCmdClearColorImage](vkCmdClearColorImage.html) when setting
[VkAttachmentDescription](VkAttachmentDescription.html)::`loadOp` to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html) would have worked.

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT](#)
specifies that the implementation has modified the set of GPU-visible
virtual addresses associated with a Vulkan object.

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsMessageTypeFlagsEXT](VkDebugUtilsMessageTypeFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsMessageTypeFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
