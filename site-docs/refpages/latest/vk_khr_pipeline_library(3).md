# VK_KHR_pipeline_library(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_pipeline_library.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_pipeline_library](#VK_KHR_pipeline_library)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_pipeline_library - device extension

**Name String**

`VK_KHR_pipeline_library`

**Extension Type**

Device extension

**Registered Extension Number**

291

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Christoph Kubisch [pixeljetstream](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_pipeline_library] @pixeljetstream%0A*Here describe the issue or question you have about the VK_KHR_pipeline_library extension*)

**Last Modified Date**

2020-01-08

**IP Status**

No known IP claims.

**Contributors**

* 
See contributors to `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)`

A pipeline library is a special pipeline that cannot be bound, instead it
defines a set of shaders and shader groups which can be linked into other
pipelines.
This extension defines the infrastructure for pipeline libraries, but does
not specify the creation or usage of pipeline libraries.
This is left to additional dependent extensions.

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)

* 
`VK_KHR_PIPELINE_LIBRARY_EXTENSION_NAME`

* 
`VK_KHR_PIPELINE_LIBRARY_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PIPELINE_LIBRARY_CREATE_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2020-01-08 (Christoph Kubisch)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_pipeline_library).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
