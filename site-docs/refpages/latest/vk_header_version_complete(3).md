# VK_HEADER_VERSION_COMPLETE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_HEADER_VERSION_COMPLETE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_HEADER_VERSION_COMPLETE - Vulkan header file complete version number

`VK_HEADER_VERSION_COMPLETE` is the complete version number of the
`vulkan_core.h` header, comprising the major, minor, and patch versions.
The major/minor values are kept synchronized with the complete version of
the released Specification.
This value is intended for use by automated tools to identify exactly which
version of the header was used during their generation.

Applications should not use this value as their
[VkApplicationInfo](VkApplicationInfo.html)::`apiVersion`.
Instead applications should explicitly select a specific fixed major/minor
API version using, for example, one of the `VK_API_VERSION_`*_* values.

// Provided by VK_VERSION_1_0
// Complete version of this file
#define VK_HEADER_VERSION_COMPLETE VK_MAKE_API_VERSION(0, 1, 4, VK_HEADER_VERSION)

[VK_HEADER_VERSION](VK_HEADER_VERSION.html), [VK_MAKE_API_VERSION](VK_MAKE_API_VERSION.html), [VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#VK_HEADER_VERSION_COMPLETE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
