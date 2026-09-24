# VkDeviceAddressBindingTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceAddressBindingTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceAddressBindingTypeEXT - Enum describing a change in device address bindings

The [VkDeviceAddressBindingTypeEXT](#) enum is defined as:

// Provided by VK_EXT_device_address_binding_report
typedef enum VkDeviceAddressBindingTypeEXT {
    VK_DEVICE_ADDRESS_BINDING_TYPE_BIND_EXT = 0,
    VK_DEVICE_ADDRESS_BINDING_TYPE_UNBIND_EXT = 1,
} VkDeviceAddressBindingTypeEXT;

* 
[VK_DEVICE_ADDRESS_BINDING_TYPE_BIND_EXT](#) specifies that a new
GPU-accessible virtual address range has been bound.

* 
[VK_DEVICE_ADDRESS_BINDING_TYPE_UNBIND_EXT](#) specifies that a
GPU-accessible virtual address range has been unbound.

[VK_EXT_device_address_binding_report](VK_EXT_device_address_binding_report.html), [VkDeviceAddressBindingCallbackDataEXT](VkDeviceAddressBindingCallbackDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceAddressBindingTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
