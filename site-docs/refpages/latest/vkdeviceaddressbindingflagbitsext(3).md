# VkDeviceAddressBindingFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceAddressBindingFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceAddressBindingFlagBitsEXT - Bitmask specifying the additional information about a binding event

Bits which **can** be set in
[VkDeviceAddressBindingCallbackDataEXT](VkDeviceAddressBindingCallbackDataEXT.html)::`flags` specifying
additional information about a binding event are:

// Provided by VK_EXT_device_address_binding_report
typedef enum VkDeviceAddressBindingFlagBitsEXT {
    VK_DEVICE_ADDRESS_BINDING_INTERNAL_OBJECT_BIT_EXT = 0x00000001,
} VkDeviceAddressBindingFlagBitsEXT;

* 
[VK_DEVICE_ADDRESS_BINDING_INTERNAL_OBJECT_BIT_EXT](#) specifies that
[VkDeviceAddressBindingCallbackDataEXT](VkDeviceAddressBindingCallbackDataEXT.html) describes a Vulkan object
that has not been made visible to the application via a Vulkan command.

[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html), [VkDeviceAddressBindingFlagsEXT](VkDeviceAddressBindingFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceAddressBindingFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
