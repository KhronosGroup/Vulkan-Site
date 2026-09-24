# VK_EXT_graphics_pipeline_library(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_graphics_pipeline_library.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_graphics_pipeline_library](#VK_EXT_graphics_pipeline_library)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_graphics_pipeline_library - device extension

**Name String**

`VK_EXT_graphics_pipeline_library`

**Extension Type**

Device extension

**Registered Extension Number**

321

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_graphics_pipeline_library] @tobski%0A*Here describe the issue or question you have about the VK_EXT_graphics_pipeline_library extension*)

**Extension Proposal**

[VK_EXT_graphics_pipeline_library](../../../../features/latest/features/proposals/VK_EXT_graphics_pipeline_library.html)

**Last Modified Date**

2021-08-17

**Contributors**

* 
Tobias Hector, AMD

* 
Chris Glover, Google

* 
Jeff Leger, Qualcomm

* 
Jan-Harald Fredriksen, Arm

* 
Piers Daniell, NVidia

* 
Boris Zanin, Mobica

* 
Krzysztof Niski, NVidia

* 
Dan Ginsburg, Valve

* 
Sebastian Aaltonen, Unity

* 
Arseny Kapoulkine, Roblox

* 
Calle Lejdfors, Ubisoft

* 
Tiago Rodrigues, Ubisoft

* 
Francois Duranleau, Gameloft

This extension allows the separate compilation of four distinct parts of
graphics pipelines, with the intent of allowing faster pipeline loading for
applications reusing the same shaders or state in multiple pipelines.
Each part can be independently compiled into a graphics pipeline library,
with a final link step required to create an executable pipeline that can be
bound to a command buffer.

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT](VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT](VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT.html)

* 
[VkGraphicsPipelineLibraryFlagBitsEXT](VkGraphicsPipelineLibraryFlagBitsEXT.html)

* 
[VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html)

* 
[VkGraphicsPipelineLibraryFlagsEXT](VkGraphicsPipelineLibraryFlagsEXT.html)

* 
`VK_EXT_GRAPHICS_PIPELINE_LIBRARY_EXTENSION_NAME`

* 
`VK_EXT_GRAPHICS_PIPELINE_LIBRARY_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits.html)

Extending [VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html):

* 
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_LIBRARY_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2021-08-17 (Tobias Hector)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_graphics_pipeline_library).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
