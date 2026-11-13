# VK_VERSION_MINOR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VERSION_MINOR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VERSION_MINOR - Extract API minor version number

`VK_VERSION_MINOR` extracts the API minor version number from a packed
version number:

|  | This functionality is superseded by [Vulkan Version 1.0](../../../../spec/latest/appendices/versions.html#versions-1.0). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
#define VK_VERSION_MINOR(version) (((uint32_t)(version) >> 12U) & 0x3FFU)

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VK_VERSION_MINOR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
