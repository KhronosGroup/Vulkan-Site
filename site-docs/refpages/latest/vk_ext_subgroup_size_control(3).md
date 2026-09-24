# VK_EXT_subgroup_size_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_subgroup_size_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_subgroup_size_control](#VK_EXT_subgroup_size_control)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_subgroup_size_control - device extension

**Name String**

`VK_EXT_subgroup_size_control`

**Extension Type**

Device extension

**Registered Extension Number**

226

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Neil Henning [sheredom](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_subgroup_size_control] @sheredom%0A*Here describe the issue or question you have about the VK_EXT_subgroup_size_control extension*)

**Last Modified Date**

2019-03-05

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Faith Ekstrand, Intel

* 
Sławek Grajewski, Intel

* 
Jesse Hall, Google

* 
Neil Henning, AMD

* 
Daniel Koch, NVIDIA

* 
Jeff Leger, Qualcomm

* 
Graeme Leese, Broadcom

* 
Allan MacKinnon, Google

* 
Mariusz Merecki, Intel

* 
Graham Wihlidal, Electronic Arts

This extension enables an implementation to control the subgroup size by
allowing a varying subgroup size and also specifying a required subgroup
size.

It extends the subgroup support in Vulkan 1.1 to allow an implementation to
expose a varying subgroup size.
Previously Vulkan exposed a single subgroup size per physical device, with
the expectation that implementations will behave as if all subgroups have
the same size.
Some implementations **may** dispatch shaders with a varying subgroup size for
different subgroups.
As a result they could implicitly split a large subgroup into smaller
subgroups or represent a small subgroup as a larger subgroup, some of whose
invocations were inactive on launch.

To aid developers in understanding the performance characteristics of their
programs, this extension exposes a minimum and maximum subgroup size that a
physical device supports and a pipeline create flag to enable that pipeline
to vary its subgroup size.
If enabled, any `SubgroupSize` decorated variables in the SPIR-V shader
modules provided to pipeline creation **may** vary between the
[minimum](../../../../spec/latest/chapters/devsandqueues.html#limits-minSubgroupSize) and [maximum](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize)
subgroup sizes.

An implementation is also optionally allowed to support specifying a
required subgroup size for a given pipeline stage.
Implementations advertise which [stages support a required subgroup size](../../../../spec/latest/chapters/devsandqueues.html#limits-requiredSubgroupSizeStages), and any pipeline of a supported stage
can be passed a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfoEXT](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)
structure to set the subgroup size for that shader stage of the pipeline.
For compute shaders, this requires the developer to query the
[`maxComputeWorkgroupSubgroups`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxComputeWorkgroupSubgroups)
and ensure that:

  

  

Developers can also specify a new pipeline shader stage create flag that
requires the implementation to have fully populated subgroups within local
workgroups.
This requires the workgroup size in the X dimension to be a multiple of the
subgroup size.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceSubgroupSizeControlFeaturesEXT](VkPhysicalDeviceSubgroupSizeControlFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceSubgroupSizeControlPropertiesEXT](VkPhysicalDeviceSubgroupSizeControlProperties.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html):

* 
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfoEXT](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)

* 
`VK_EXT_SUBGROUP_SIZE_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_SUBGROUP_SIZE_CONTROL_SPEC_VERSION`

* 
Extending [VkPipelineShaderStageCreateFlagBits](VkPipelineShaderStageCreateFlagBits.html):

[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](VkPipelineShaderStageCreateFlagBits.html)

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](VkPipelineShaderStageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2019-03-05 (Neil Henning)

Initial draft

Revision 2, 2019-07-26 (Faith Ekstrand)

* 
Add the missing [VkPhysicalDeviceSubgroupSizeControlFeaturesEXT](VkPhysicalDeviceSubgroupSizeControlFeatures.html)
for querying subgroup size control features.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_subgroup_size_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
