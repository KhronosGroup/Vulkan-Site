# VK_EXT_pipeline_properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pipeline_properties.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pipeline_properties](#VK_EXT_pipeline_properties)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pipeline_properties - device extension

**Name String**

`VK_EXT_pipeline_properties`

**Extension Type**

Device extension

**Registered Extension Number**

373

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Mukund Keshava [mkeshavanv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pipeline_properties] @mkeshavanv%0A*Here describe the issue or question you have about the VK_EXT_pipeline_properties extension*)

**Last Modified Date**

2022-04-19

**IP Status**

No known IP claims.

**Contributors**

* 
Mukund Keshava, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Mark Bellamy, Arm

Vulkan SC requires offline compilation of pipelines.
In order to support this, the pipeline state is represented in a
[JSON schema](https://github.com/KhronosGroup/VulkanSC-Docs/wiki/JSON-schema)
that is read by an offline tool for compilation.

One method of developing a Vulkan SC application is to author a Vulkan
application and use a layer to record and serialize the pipeline state and
shaders for offline compilation.
Each pipeline is represented by a separate JSON file, and can be identified
with a `pipelineIdentifier`.

Once the pipelines have been compiled by the offline pipeline cache
compiler, the Vulkan SC application can then use this
`pipelineIdentifier` for identifying the pipeline via Vulkan SC’s
`VkPipelineIdentifierInfo` structure.

This extension allows the Vulkan application to query the
`pipelineIdentifier` associated with each pipeline so that the
application can store this with its pipeline metadata and the Vulkan SC
application will then use to map the same state to an entry in the Vulkan SC
pipeline cache.

It is expected that this extension will initially be implemented in the json
generation layer, although we can envision that there might be future uses
for it in native Vulkan drivers as well.

* 
[vkGetPipelinePropertiesEXT](vkGetPipelinePropertiesEXT.html)

* 
[VkPipelineInfoEXT](VkPipelineInfoKHR.html)

* 
[VkPipelinePropertiesIdentifierEXT](VkPipelinePropertiesIdentifierEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePipelinePropertiesFeaturesEXT](VkPhysicalDevicePipelinePropertiesFeaturesEXT.html)

* 
`VK_EXT_PIPELINE_PROPERTIES_EXTENSION_NAME`

* 
`VK_EXT_PIPELINE_PROPERTIES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROPERTIES_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_PROPERTIES_IDENTIFIER_EXT](VkStructureType.html)

(1) This extension does not make sense on a strict Vulkan SC implementation.
It may however be of potential use in a non-strict Vulkan SC implementation.
Should this extension be enabled as part of Vulkan SC as well?

**RESOLVED**: No.
This extension will not be enabled for Vulkan SC.

(2) This is intended to be a general pipeline properties query, but is
currently only retrieving the pipeline identifier.
Should the pipeline identifier query be mandatory for this extension and for
all queries using this command?

**RESOLVED**: Use [VkBaseOutStructure](VkBaseOutStructure.html) for the return parameter.
Currently this is required to actually be a
[VkPipelinePropertiesIdentifierEXT](VkPipelinePropertiesIdentifierEXT.html) structure, but that could be relaxed
in the future to allow other structure types or to allow other structures to
be chained in along with this one.

(3) Should there be a feature structure? Should it be required?

**RESOLVED**: Add a feature structure, and a feature for querying pipeline
identifier, but allow it to be optional so that this extension can be used
as the basis for other pipeline property queries without requiring the
pipeline identifier to be supported.

* 
Revision 1, 2022-04-19 (Mukund Keshava, Daniel Koch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pipeline_properties).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
