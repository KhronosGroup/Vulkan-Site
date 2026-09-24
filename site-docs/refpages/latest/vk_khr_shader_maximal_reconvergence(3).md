# VK_KHR_shader_maximal_reconvergence(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_maximal_reconvergence.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_maximal_reconvergence](#VK_KHR_shader_maximal_reconvergence)
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

VK_KHR_shader_maximal_reconvergence - device extension

**Name String**

`VK_KHR_shader_maximal_reconvergence`

**Extension Type**

Device extension

**Registered Extension Number**

435

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_maximal_reconvergence](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_maximal_reconvergence.html)

**Contact**

* 
Alan Baker [alan-baker](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_maximal_reconvergence] @alan-baker%0A*Here describe the issue or question you have about the VK_KHR_shader_maximal_reconvergence extension*)

**Extension Proposal**

[VK_KHR_shader_maximal_reconvergence](../../../../features/latest/features/proposals/VK_KHR_shader_maximal_reconvergence.html)

**Last Modified Date**

2021-11-12

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Requires SPIR-V 1.3.

* 
This extension requires
[`SPV_KHR_maximal_reconvergence`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_maximal_reconvergence.html)

**Contributors**

* 
Alan Baker, Google

This extension allows the use of the `SPV_KHR_maximal_reconvergence` SPIR-V
extension in shader modules.
`SPV_KHR_maximal_reconvergence` provides stronger guarantees that diverged
subgroups will reconverge.
These guarantees should match shader author intuition about divergence and
reconvergence of invocations based on the structure of the code in the HLL.

Developers should utilize this extension if they require stronger guarantees
about reconvergence than either the core spec or
SPV_KHR_subgroup_uniform_control_flow.
This extension will define the rules that govern how invocations diverge and
reconverge in a way that should match developer intuition.
It allows robust programs to be written relying on subgroup operations and
other tangled instructions.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR](VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR.html)

* 
`VK_KHR_SHADER_MAXIMAL_RECONVERGENCE_EXTENSION_NAME`

* 
`VK_KHR_SHADER_MAXIMAL_RECONVERGENCE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MAXIMAL_RECONVERGENCE_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2021-11-12 (Alan Baker)

Internal draft version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_maximal_reconvergence).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
