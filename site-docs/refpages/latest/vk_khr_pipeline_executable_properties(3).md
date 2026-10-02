# VK_KHR_pipeline_executable_properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_pipeline_executable_properties.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_pipeline_executable_properties](#VK_KHR_pipeline_executable_properties)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_pipeline_executable_properties - device extension

**Name String**

`VK_KHR_pipeline_executable_properties`

**Extension Type**

Device extension

**Registered Extension Number**

270

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_pipeline_executable_properties] @gfxstrand%0A*Here describe the issue or question you have about the VK_KHR_pipeline_executable_properties extension*)

**Last Modified Date**

2019-05-28

**IP Status**

No known IP claims.

**Interactions and External Dependencies**
**Contributors**

* 
Faith Ekstrand, Intel

* 
Ian Romanick, Intel

* 
Kenneth Graunke, Intel

* 
Baldur Karlsson, Valve

* 
Jesse Hall, Google

* 
Jeff Bolz, Nvidia

* 
Piers Daniel, Nvidia

* 
Tobias Hector, AMD

* 
Jan-Harald Fredriksen, ARM

* 
Tom Olson, ARM

* 
Daniel Koch, Nvidia

* 
Spencer Fricke, Samsung

When a pipeline is created, its state and shaders are compiled into zero or
more device-specific executables, which are used when executing commands
against that pipeline.
This extension adds a mechanism to query properties and statistics about the
different executables produced by the pipeline compilation process.
This is intended to be used by debugging and performance tools to allow them
to provide more detailed information to the user.
Certain compile time shader statistics provided through this extension may
be useful to developers for debugging or performance analysis.

* 
[vkGetPipelineExecutableInternalRepresentationsKHR](vkGetPipelineExecutableInternalRepresentationsKHR.html)

* 
[vkGetPipelineExecutablePropertiesKHR](vkGetPipelineExecutablePropertiesKHR.html)

* 
[vkGetPipelineExecutableStatisticsKHR](vkGetPipelineExecutableStatisticsKHR.html)

* 
[VkPipelineExecutableInfoKHR](VkPipelineExecutableInfoKHR.html)

* 
[VkPipelineExecutableInternalRepresentationKHR](VkPipelineExecutableInternalRepresentationKHR.html)

* 
[VkPipelineExecutablePropertiesKHR](VkPipelineExecutablePropertiesKHR.html)

* 
[VkPipelineExecutableStatisticKHR](VkPipelineExecutableStatisticKHR.html)

* 
[VkPipelineInfoKHR](VkPipelineInfoKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR](VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR.html)

* 
[VkPipelineExecutableStatisticValueKHR](VkPipelineExecutableStatisticValueKHR.html)

* 
[VkPipelineExecutableStatisticFormatKHR](VkPipelineExecutableStatisticFormatKHR.html)

* 
`VK_KHR_PIPELINE_EXECUTABLE_PROPERTIES_EXTENSION_NAME`

* 
`VK_KHR_PIPELINE_EXECUTABLE_PROPERTIES_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_CAPTURE_STATISTICS_BIT_KHR](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_EXECUTABLE_PROPERTIES_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INTERNAL_REPRESENTATION_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_STATISTIC_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_INFO_KHR](VkStructureType.html)

1) What should we call the pieces of the pipeline which are produced by the
compilation process and about which you can query properties and statistics?

**RESOLVED**: Call them “executables”.
The name “binary” was used in early drafts of the extension but it was
determined that “pipeline binary” could have a fairly broad meaning (such
as a binary serialized form of an entire pipeline) and was too big of a
namespace for the very specific needs of this extension.

* 
Revision 1, 2019-05-28 (Faith Ekstrand)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_pipeline_executable_properties).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
