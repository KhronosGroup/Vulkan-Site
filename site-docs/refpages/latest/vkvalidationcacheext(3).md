# VkValidationCacheEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationCacheEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationCacheEXT - Opaque handle to a validation cache object

Validation cache objects allow the result of internal validation to be
reused, both within a single application run and between multiple runs.
Reuse within a single run is achieved by passing the same validation cache
object when creating supported Vulkan objects.
Reuse across runs of an application is achieved by retrieving validation
cache contents in one run of an application, saving the contents, and using
them to preinitialize a validation cache on a subsequent run.
The contents of the validation cache objects are managed by the validation
layers.
Applications **can** manage the host memory consumed by a validation cache
object and control the amount of data retrieved from a validation cache
object.

Validation cache objects are represented by `VkValidationCacheEXT`
handles:

// Provided by VK_EXT_validation_cache
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkValidationCacheEXT)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_EXT_validation_cache](VK_EXT_validation_cache.html), [VkShaderModuleValidationCacheCreateInfoEXT](VkShaderModuleValidationCacheCreateInfoEXT.html), [vkCreateValidationCacheEXT](vkCreateValidationCacheEXT.html), [vkDestroyValidationCacheEXT](vkDestroyValidationCacheEXT.html), [vkGetValidationCacheDataEXT](vkGetValidationCacheDataEXT.html), [vkMergeValidationCachesEXT](vkMergeValidationCachesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkValidationCacheEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
