# VK_KHR_shader_subgroup_uniform_control_flow(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_subgroup_uniform_control_flow.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_subgroup_uniform_control_flow](#VK_KHR_shader_subgroup_uniform_control_flow)
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

VK_KHR_shader_subgroup_uniform_control_flow - device extension

**Name String**

`VK_KHR_shader_subgroup_uniform_control_flow`

**Extension Type**

Device extension

**Registered Extension Number**

324

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_subgroup_uniform_control_flow](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_subgroup_uniform_control_flow.html)

**Contact**

* 
Alan Baker [alan-baker](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_subgroup_uniform_control_flow] @alan-baker%0A*Here describe the issue or question you have about the VK_KHR_shader_subgroup_uniform_control_flow extension*)

**Last Modified Date**

2020-08-27

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Requires SPIR-V 1.3.

* 
This extension provides API support for
[`GL_EXT_subgroupuniform_qualifier`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_subgroupuniform_qualifier.txt)

**Contributors**

* 
Alan Baker, Google

* 
Jeff Bolz, NVIDIA

This extension allows the use of the `SPV_KHR_subgroup_uniform_control_flow`
SPIR-V extension in shader modules.
`SPV_KHR_subgroup_uniform_control_flow` provides stronger guarantees that
diverged subgroups will reconverge.

Developers should utilize this extension if they use subgroup operations to
reduce the work performed by a uniform subgroup.
This extension will guarantee that uniform subgroup will reconverge in the
same manner as invocation groups (see “Uniform Control Flow” in the
[Khronos SPIR-V Specification](../../../../spec/latest/chapters/introduction.html#spirv-spec)).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR](VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR.html)

* 
`VK_KHR_SHADER_SUBGROUP_UNIFORM_CONTROL_FLOW_EXTENSION_NAME`

* 
`VK_KHR_SHADER_SUBGROUP_UNIFORM_CONTROL_FLOW_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_UNIFORM_CONTROL_FLOW_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2020-08-27 (Alan Baker)

Internal draft version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_subgroup_uniform_control_flow).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
