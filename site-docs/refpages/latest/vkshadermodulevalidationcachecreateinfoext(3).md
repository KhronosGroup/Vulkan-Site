# VkShaderModuleValidationCacheCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderModuleValidationCacheCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderModuleValidationCacheCreateInfoEXT - Specify validation cache to use during shader module creation

To use a [VkValidationCacheEXT](VkValidationCacheEXT.html) to cache shader validation results, add
a [VkShaderModuleValidationCacheCreateInfoEXT](#) structure to the
`pNext` chain of the [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structure,
specifying the cache object to use.

The `VkShaderModuleValidationCacheCreateInfoEXT` structure is defined
as:

// Provided by VK_EXT_validation_cache
typedef struct VkShaderModuleValidationCacheCreateInfoEXT {
    VkStructureType         sType;
    const void*             pNext;
    VkValidationCacheEXT    validationCache;
} VkShaderModuleValidationCacheCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`validationCache` is the validation cache object from which the
results of prior validation attempts will be written, and to which new
validation results for this [VkShaderModule](VkShaderModule.html) will be written (if not
already present).
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderModuleValidationCacheCreateInfoEXT-sType-sType) VUID-VkShaderModuleValidationCacheCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_MODULE_VALIDATION_CACHE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkShaderModuleValidationCacheCreateInfoEXT-validationCache-parameter) VUID-VkShaderModuleValidationCacheCreateInfoEXT-validationCache-parameter

 `validationCache` **must** be a valid [VkValidationCacheEXT](VkValidationCacheEXT.html) handle

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)

[VK_EXT_validation_cache](VK_EXT_validation_cache.html), [VkStructureType](VkStructureType.html), [VkValidationCacheEXT](VkValidationCacheEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderModuleValidationCacheCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
