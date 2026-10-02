# VK_ARM_pipeline_opacity_micromap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_pipeline_opacity_micromap.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_pipeline_opacity_micromap](#VK_ARM_pipeline_opacity_micromap)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_pipeline_opacity_micromap - device extension

**Name String**

`VK_ARM_pipeline_opacity_micromap`

**Extension Type**

Device extension

**Registered Extension Number**

597

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)

**Contact**

* 
Mathieu Robart [mathieurobart-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_pipeline_opacity_micromap] @mathieurobart-arm%0A*Here describe the issue or question you have about the VK_ARM_pipeline_opacity_micromap extension*)

**Extension Proposal**

[VK_ARM_pipeline_opacity_micromap](../../../../features/latest/features/proposals/VK_ARM_pipeline_opacity_micromap.html)

**Last Modified Date**

2025-01-07

**IP Status**

No known IP claims.

**Contributors**

* 
Mathieu Robart, Arm

* 
Marius Bjorge, Arm

* 
Yaozhong Zhang, Arm

* 
Jan-Harald Fredriksen, Arm

The Opacity Micromap extension `VK_EXT_opacity_micromap` supports the new
pipeline creation flag
`VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT`, indicating that
the ray tracing pipeline may be used with acceleration structures
referencing micromaps.
This allows for possible optimizations, knowing beforehand that opacity
micromaps may be used with the pipeline.

An equivalent flag does not exist for pipelines supporting Ray Query with
opacity micromaps, such as graphics and compute.
Consequently, it is currently not possible to optimize such pipelines for
no-opacity, e.g. when opacity micromaps are supported by an application but
not used by the pipeline.
This may lead to performance degradation.

This extension adds a new flag,
`VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM`, indicating that a
pipeline will NOT be used with an acceleration structure referencing an
opacity micromap, therefore allowing possible pipeline optimizations.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePipelineOpacityMicromapFeaturesARM](VkPhysicalDevicePipelineOpacityMicromapFeaturesARM.html)

* 
`VK_ARM_PIPELINE_OPACITY_MICROMAP_EXTENSION_NAME`

* 
`VK_ARM_PIPELINE_OPACITY_MICROMAP_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM](VkPipelineCreateFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_OPACITY_MICROMAP_FEATURES_ARM](VkStructureType.html)

None.

None.

* 
Revision 1, 2025-01-07 (Mathieu Robart)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_pipeline_opacity_micromap).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
