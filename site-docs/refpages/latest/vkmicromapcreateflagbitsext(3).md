# VkMicromapCreateFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapCreateFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapCreateFlagBitsEXT - Bitmask specifying additional creation parameters for micromap

Bits which **can** be set in [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`createFlags`,
specifying additional creation parameters for micromaps, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkMicromapCreateFlagBitsEXT {
    VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT = 0x00000001,
} VkMicromapCreateFlagBitsEXT;

* 
[VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](#) specifies
that the micromap’s address **can** be saved and reused on a subsequent
run.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkMicromapCreateFlagsEXT](VkMicromapCreateFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMicromapCreateFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
