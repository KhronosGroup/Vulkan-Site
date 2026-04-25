# VK_EXT_shader_module_identifier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_module_identifier.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_module_identifier](#VK_EXT_shader_module_identifier)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_module_identifier - device extension

**Name String**

`VK_EXT_shader_module_identifier`

**Extension Type**

Device extension

**Registered Extension Number**

463

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_EXT_pipeline_creation_cache_control](VK_EXT_pipeline_creation_cache_control.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Hans-Kristian Arntzen [HansKristian-Work](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_module_identifier] @HansKristian-Work%0A*Here describe the issue or question you have about the VK_EXT_shader_module_identifier extension*)

**Extension Proposal**

[VK_EXT_shader_module_identifier](../../../../features/latest/features/proposals/VK_EXT_shader_module_identifier.html)

**Last Modified Date**

2022-05-16

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, Valve

* 
Ricardo Garcia, Igalia

* 
Piers Daniell, NVIDIA

* 
Jan-Harald Fredriksen, Arm

* 
Tom Olson, Arm

* 
Faith Ekstrand, Collabora

Some applications generate SPIR-V code at runtime.
When pipeline caches are primed, either explicitly through e.g.
[VkPipelineCache](VkPipelineCache.html) mechanisms, or implicitly through driver managed
caches, having to re-generate SPIR-V modules is redundant.
SPIR-V modules could be cached on disk by an application, but the extra disk
size requirement might be prohibitive in some use cases.

This extension adds the ability for an application to query a small
identifier associated with a [VkShaderModule](VkShaderModule.html).
On subsequent runs of the application, the same identifier **can** be provided
in lieu of a [VkShaderModule](VkShaderModule.html) object.
A pipeline creation call with such a module **may** succeed if a pipeline could
be created without invoking compilation, and information inside the SPIR-V
module is not required by the implementation.

[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) **must** be used
if only the identifier is provided, and this use case is intended to work
like a non-blocking, speculative compile.
Applications **can** fallback as necessary.

The main motivation for identifying the module itself and not the entire
pipeline is that pipeline identifiers change when a driver is updated, but
module identifiers are expected to be stable for any particular driver
implementation.
This approach is helpful for shader pre-compilation systems which can prime
pipeline caches ahead of time.
When on-disk pipeline caches are updated, the same shader identifiers could
lead to a pipeline cache hit.

* 
[vkGetShaderModuleCreateInfoIdentifierEXT](vkGetShaderModuleCreateInfoIdentifierEXT.html)

* 
[vkGetShaderModuleIdentifierEXT](vkGetShaderModuleIdentifierEXT.html)

* 
[VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT](VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT](VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html):

* 
[VkPipelineShaderStageModuleIdentifierCreateInfoEXT](VkPipelineShaderStageModuleIdentifierCreateInfoEXT.html)

* 
`VK_EXT_SHADER_MODULE_IDENTIFIER_EXTENSION_NAME`

* 
`VK_EXT_SHADER_MODULE_IDENTIFIER_SPEC_VERSION`

* 
[VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT](VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_MODULE_IDENTIFIER_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SHADER_MODULE_IDENTIFIER_EXT](VkStructureType.html)

* 
Revision 1, 2022-03-16 (Hans-Kristian Arntzen)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_module_identifier).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
