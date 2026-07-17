# VK_MAKE_VERSION(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAKE_VERSION.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAKE_VERSION - Construct an API version number

`VK_MAKE_VERSION` constructs an API version number.

|  | This functionality is superseded by [Vulkan Version 1.0](../../../../spec/latest/appendices/versions.html#versions-1.0). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
#define VK_MAKE_VERSION(major, minor, patch) \
    ((((uint32_t)(major)) 

* 
`major` is the major version number.

* 
`minor` is the minor version number.

* 
`patch` is the patch version number.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkApplicationInfo](VkApplicationInfo.html), [vkCreateInstance](vkCreateInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VK_MAKE_VERSION).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
