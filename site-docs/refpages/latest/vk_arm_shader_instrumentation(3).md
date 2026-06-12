# VK_ARM_shader_instrumentation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_shader_instrumentation.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_shader_instrumentation](#VK_ARM_shader_instrumentation)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_shader_instrumentation - device extension

**Name String**

`VK_ARM_shader_instrumentation`

**Extension Type**

Device extension

**Registered Extension Number**

608

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_EXT_shader_object

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_shader_instrumentation] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_ARM_shader_instrumentation extension*)

**Extension Proposal**

[VK_ARM_shader_instrumentation](../../../../features/latest/features/proposals/VK_ARM_shader_instrumentation.html)

**Last Modified Date**

2026-02-26

**IP Status**

No known IP claims.

**Contributors**

* 
Embla Flatlandsmo, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Mikel Garai, Arm Ltd.

* 
Peter Harris, Arm Ltd.

* 
Ting Wei, Arm Ltd.

* 
Torbjörn Nilsson, Arm Ltd.

This extension provides the ability to instrument shaders and capture
performance metrics per shader type from commands executed by a queue.

* 
[VkShaderInstrumentationARM](VkShaderInstrumentationARM.html)

* 
[vkClearShaderInstrumentationMetricsARM](vkClearShaderInstrumentationMetricsARM.html)

* 
[vkCmdBeginShaderInstrumentationARM](vkCmdBeginShaderInstrumentationARM.html)

* 
[vkCmdEndShaderInstrumentationARM](vkCmdEndShaderInstrumentationARM.html)

* 
[vkCreateShaderInstrumentationARM](vkCreateShaderInstrumentationARM.html)

* 
[vkDestroyShaderInstrumentationARM](vkDestroyShaderInstrumentationARM.html)

* 
[vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM](vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM.html)

* 
[vkGetShaderInstrumentationValuesARM](vkGetShaderInstrumentationValuesARM.html)

* 
[VkShaderInstrumentationCreateInfoARM](VkShaderInstrumentationCreateInfoARM.html)

* 
[VkShaderInstrumentationMetricDataHeaderARM](VkShaderInstrumentationMetricDataHeaderARM.html)

* 
[VkShaderInstrumentationMetricDescriptionARM](VkShaderInstrumentationMetricDescriptionARM.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderInstrumentationFeaturesARM](VkPhysicalDeviceShaderInstrumentationFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderInstrumentationPropertiesARM](VkPhysicalDeviceShaderInstrumentationPropertiesARM.html)

* 
[VkShaderInstrumentationValuesFlagsARM](VkShaderInstrumentationValuesFlagsARM.html)

* 
`VK_ARM_SHADER_INSTRUMENTATION_EXTENSION_NAME`

* 
`VK_ARM_SHADER_INSTRUMENTATION_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_SHADER_INSTRUMENTATION_ARM](VkObjectType.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_INSTRUMENT_SHADERS_BIT_ARM](VkPipelineCreateFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_METRIC_DESCRIPTION_ARM](VkStructureType.html)

If [VK_EXT_shader_object](VK_EXT_shader_object.html) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_INSTRUMENT_SHADER_BIT_ARM](VkShaderCreateFlagBitsEXT.html)

* 
Revision 1, 2026-02-26 (Embla Flatlandsmo, Jan-Harald Fredriksen)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_shader_instrumentation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
