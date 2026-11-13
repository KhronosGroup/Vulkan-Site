# VK_EXT_validation_cache(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_validation_cache.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_validation_cache](#VK_EXT_validation_cache)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_validation_cache - device extension

**Name String**

`VK_EXT_validation_cache`

**Extension Type**

Device extension

**Registered Extension Number**

161

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Cort Stratton [cdwfs](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_validation_cache] @cdwfs%0A*Here describe the issue or question you have about the VK_EXT_validation_cache extension*)

**Last Modified Date**

2017-08-29

**IP Status**

No known IP claims.

**Contributors**

* 
Cort Stratton, Google

* 
Chris Forbes, Google

This extension provides a mechanism for caching the results of potentially
expensive internal validation operations across multiple runs of a Vulkan
application.
At the core is the [VkValidationCacheEXT](VkValidationCacheEXT.html) object type, which is managed
similarly to the existing [VkPipelineCache](VkPipelineCache.html).

The new structure [VkShaderModuleValidationCacheCreateInfoEXT](VkShaderModuleValidationCacheCreateInfoEXT.html) can be
included in the `pNext` chain at [vkCreateShaderModule](vkCreateShaderModule.html) time.
It contains a [VkValidationCacheEXT](VkValidationCacheEXT.html) to use when validating the
[VkShaderModule](VkShaderModule.html).

* 
[VkValidationCacheEXT](VkValidationCacheEXT.html)

* 
[vkCreateValidationCacheEXT](vkCreateValidationCacheEXT.html)

* 
[vkDestroyValidationCacheEXT](vkDestroyValidationCacheEXT.html)

* 
[vkGetValidationCacheDataEXT](vkGetValidationCacheDataEXT.html)

* 
[vkMergeValidationCachesEXT](vkMergeValidationCachesEXT.html)

* 
[VkValidationCacheCreateInfoEXT](VkValidationCacheCreateInfoEXT.html)

* 
Extending [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html):

[VkShaderModuleValidationCacheCreateInfoEXT](VkShaderModuleValidationCacheCreateInfoEXT.html)

* 
[VkValidationCacheHeaderVersionEXT](VkValidationCacheHeaderVersionEXT.html)

* 
[VkValidationCacheCreateFlagsEXT](VkValidationCacheCreateFlagsEXT.html)

* 
`VK_EXT_VALIDATION_CACHE_EXTENSION_NAME`

* 
`VK_EXT_VALIDATION_CACHE_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_VALIDATION_CACHE_EXT](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_SHADER_MODULE_VALIDATION_CACHE_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VALIDATION_CACHE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2017-08-29 (Cort Stratton)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_validation_cache).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
