# VK_MAKE_API_VERSION(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAKE_API_VERSION.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAKE_API_VERSION - Construct an API version number

`VK_MAKE_API_VERSION` constructs an API version number.

// Provided by VK_VERSION_1_0
#define VK_MAKE_API_VERSION(variant, major, minor, patch) \
    ((((uint32_t)(variant)) 

* 
`variant` is the variant number.

* 
`major` is the major version number.

* 
`minor` is the minor version number.

* 
`patch` is the patch version number.

[VK_API_VERSION](VK_API_VERSION.html), [VK_API_VERSION_1_0](VK_API_VERSION_1_0.html), [VK_API_VERSION_1_1](VK_API_VERSION_1_1.html), [VK_API_VERSION_1_2](VK_API_VERSION_1_2.html), [VK_API_VERSION_1_3](VK_API_VERSION_1_3.html), [VK_API_VERSION_1_4](VK_API_VERSION_1_4.html), [VK_HEADER_VERSION_COMPLETE](VK_HEADER_VERSION_COMPLETE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkApplicationInfo](VkApplicationInfo.html), [vkCreateInstance](vkCreateInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VK_MAKE_API_VERSION).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
