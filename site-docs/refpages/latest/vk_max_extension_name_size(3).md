# VK_MAX_EXTENSION_NAME_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAX_EXTENSION_NAME_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAX_EXTENSION_NAME_SIZE - Maximum length of a layer of extension name string

[VK_MAX_EXTENSION_NAME_SIZE](#) is the length in `char` values of an
array containing a layer or extension name string, as returned in
[VkLayerProperties](VkLayerProperties.html)::`layerName`,
[VkExtensionProperties](VkExtensionProperties.html)::`extensionName`, and other queries.

#define VK_MAX_EXTENSION_NAME_SIZE        256U

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VK_MAX_EXTENSION_NAME_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
