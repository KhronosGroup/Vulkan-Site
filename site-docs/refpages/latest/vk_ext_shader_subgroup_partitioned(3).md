# VK_EXT_shader_subgroup_partitioned(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_subgroup_partitioned.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_subgroup_partitioned](#VK_EXT_shader_subgroup_partitioned)
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

VK_EXT_shader_subgroup_partitioned - device extension

**Name String**

`VK_EXT_shader_subgroup_partitioned`

**Extension Type**

Device extension

**Registered Extension Number**

663

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_subgroup_partitioned](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_subgroup_partitioned.html)

* 
[SPV_NV_shader_subgroup_partitioned](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_subgroup_partitioned.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_subgroup_partitioned] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_shader_subgroup_partitioned extension*)

**Last Modified Date**

2025-11-12

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_shader_subgroup_partitioned`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GL_NV_shader_subgroup_partitioned.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension enables support for a new class of
[group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) on [subgroups](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup) via the
[`GL_NV_shader_subgroup_partitioned`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GL_NV_shader_subgroup_partitioned.txt)
GLSL extension and
[`SPV_EXT_shader_subgroup_partitioned`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_subgroup_partitioned.html)
SPIR-V extension.
Support for these new operations is advertised via the
[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](VkSubgroupFeatureFlagBits.html) bit.
Note that there is not a new GLSL extension since
`SPV_EXT_shader_subgroup_partitioned` is compatible with
`SPV_NV_shader_subgroup_partitioned`, so the
`GL_NV_shader_subgroup_partitioned` GLSL extension can still be used.

This extension requires Vulkan 1.1, for general subgroup support.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT](VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT.html)

* 
`VK_EXT_SHADER_SUBGROUP_PARTITIONED_EXTENSION_NAME`

* 
`VK_EXT_SHADER_SUBGROUP_PARTITIONED_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_PARTITIONED_FEATURES_EXT](VkStructureType.html)

Extending [VkSubgroupFeatureFlagBits](VkSubgroupFeatureFlagBits.html):

* 
[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](VkSubgroupFeatureFlagBits.html)

* 
Revision 1, 2025-11-12 (Jeff Bolz)

Promoted from `[VK_NV_shader_subgroup_partitioned](VK_NV_shader_subgroup_partitioned.html)`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_subgroup_partitioned).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
