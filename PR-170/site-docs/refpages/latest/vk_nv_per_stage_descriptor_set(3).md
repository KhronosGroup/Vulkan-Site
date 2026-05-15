# VK_NV_per_stage_descriptor_set(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_per_stage_descriptor_set.html

## Table of Contents

- [Name](#_name)
- [VK_NV_per_stage_descriptor_set](#VK_NV_per_stage_descriptor_set)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_per_stage_descriptor_set - device extension

**Name String**

`VK_NV_per_stage_descriptor_set`

**Extension Type**

Device extension

**Registered Extension Number**

517

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_maintenance6](VK_KHR_maintenance6.html)

or

[Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_per_stage_descriptor_set] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_NV_per_stage_descriptor_set extension*)

**Last Modified Date**

2023-10-16

**IP Status**

No known IP claims.

**Contributors**

* 
Daniel Story, Nintendo

This extension introduces a new descriptor set layout creation flag that
allows bindings in a descriptor set to be scoped to each shader stage.
This means that shaders bound at the same time **may** use completely different
descriptor set layouts without any restrictions on compatibility, and that
the descriptor limits that would otherwise apply to the union of all stages
together instead apply to each stage individually.
It also means that descriptors shared by multiple stages **must** be bound to
each stage or set of stages that use a unique descriptor set layout using
their specific per stage descriptor set layout(s).

This extension also allows each of the new descriptor binding functions from
VK_KHR_maintenance6 to have their [VkPipelineLayout](VkPipelineLayout.html) member be
optionally set to [VK_NULL_HANDLE](VK_NULL_HANDLE.html), in which case the pipeline layout
information is taken from a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure in
the `pNext` chain.
This enables descriptors to be directly bound using descriptor set layouts
without applications needing to create and manage [VkPipelineLayout](VkPipelineLayout.html)
objects at command recording time.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePerStageDescriptorSetFeaturesNV](VkPhysicalDevicePerStageDescriptorSetFeaturesNV.html)

* 
`VK_NV_PER_STAGE_DESCRIPTOR_SET_EXTENSION_NAME`

* 
`VK_NV_PER_STAGE_DESCRIPTOR_SET_SPEC_VERSION`

* 
Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PER_STAGE_DESCRIPTOR_SET_FEATURES_NV](VkStructureType.html)

None

* 
Revision 1, 2023-10-16 (Piers Daniell)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_per_stage_descriptor_set).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
