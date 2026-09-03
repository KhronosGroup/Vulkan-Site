# VK_MAX_DESCRIPTION_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAX_DESCRIPTION_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAX_DESCRIPTION_SIZE - Length of a driver name string

[VK_MAX_DESCRIPTION_SIZE](#) is the length in `char` values of an array
containing a string with additional descriptive information about a query,
as returned in [VkLayerProperties](VkLayerProperties.html)::`description` and other queries.

#define VK_MAX_DESCRIPTION_SIZE           256U

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VK_MAX_DESCRIPTION_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
