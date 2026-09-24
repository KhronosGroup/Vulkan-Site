# VkValidationCacheHeaderVersionEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationCacheHeaderVersionEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationCacheHeaderVersionEXT - Encode validation cache version

Possible values of the second group of four bytes in the header returned by
[vkGetValidationCacheDataEXT](vkGetValidationCacheDataEXT.html), encoding the validation cache version,
are:

// Provided by VK_EXT_validation_cache
typedef enum VkValidationCacheHeaderVersionEXT {
    VK_VALIDATION_CACHE_HEADER_VERSION_ONE_EXT = 1,
} VkValidationCacheHeaderVersionEXT;

* 
[VK_VALIDATION_CACHE_HEADER_VERSION_ONE_EXT](#) specifies version one
of the validation cache.

[VK_EXT_validation_cache](VK_EXT_validation_cache.html), [vkCreateValidationCacheEXT](vkCreateValidationCacheEXT.html), [vkGetValidationCacheDataEXT](vkGetValidationCacheDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkValidationCacheHeaderVersionEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
