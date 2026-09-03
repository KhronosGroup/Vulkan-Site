# VK_EXT_shader_replicated_composites(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_replicated_composites.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_replicated_composites](#VK_EXT_shader_replicated_composites)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_replicated_composites - device extension

**Name String**

`VK_EXT_shader_replicated_composites`

**Extension Type**

Device extension

**Registered Extension Number**

565

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
[SPV_EXT_replicated_composites](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_replicated_composites.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_replicated_composites] @kpet%0A*Here describe the issue or question you have about the VK_EXT_shader_replicated_composites extension*)

**Extension Proposal**

[VK_EXT_shader_replicated_composites](../../../../features/latest/features/proposals/VK_EXT_shader_replicated_composites.html)

**Last Modified Date**

2024-02-08

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

This extension adds support for creating composites from a single value in
SPIR-V modules, as defined by SPV_EXT_replicated_composites.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT](VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT.html)

* 
`VK_EXT_SHADER_REPLICATED_COMPOSITES_EXTENSION_NAME`

* 
`VK_EXT_SHADER_REPLICATED_COMPOSITES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_REPLICATED_COMPOSITES_FEATURES_EXT](VkStructureType.html)

* 
[ReplicatedCompositesEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ReplicatedCompositesEXT)

* 
Revision 1, 2024-02-08 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_replicated_composites).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
