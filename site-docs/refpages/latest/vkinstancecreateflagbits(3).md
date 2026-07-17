# VkInstanceCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInstanceCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInstanceCreateFlagBits - Bitmask specifying behavior of the instance

// Provided by VK_VERSION_1_0
typedef enum VkInstanceCreateFlagBits {
  // Provided by VK_KHR_portability_enumeration
    VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR = 0x00000001,
} VkInstanceCreateFlagBits;

* 
[VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR](#) specifies that
the instance will enumerate available Vulkan Portability-compliant
physical devices and groups in addition to the Vulkan physical devices
and groups that are enumerated by default.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkInstanceCreateFlags](VkInstanceCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkInstanceCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
