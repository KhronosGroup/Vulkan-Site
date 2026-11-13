# VK_KHR_shader_relaxed_extended_instruction(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_relaxed_extended_instruction.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_relaxed_extended_instruction](#VK_KHR_shader_relaxed_extended_instruction)
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

VK_KHR_shader_relaxed_extended_instruction - device extension

**Name String**

`VK_KHR_shader_relaxed_extended_instruction`

**Extension Type**

Device extension

**Registered Extension Number**

559

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
[SPV_KHR_relaxed_extended_instruction](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_relaxed_extended_instruction.html)

**Contact**

* 
Nathan Gauër [Keenuts](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_relaxed_extended_instruction] @Keenuts%0A*Here describe the issue or question you have about the VK_KHR_shader_relaxed_extended_instruction extension*)

**Extension Proposal**

[VK_KHR_shader_relaxed_extended_instruction](../../../../features/latest/features/proposals/VK_KHR_shader_relaxed_extended_instruction.html)

**Last Modified Date**

2024-01-24

**IP Status**

No known IP claims.

**Contributors**

* 
Alan Baker, Google LLC

* 
Nathan Gauër, Google LLC

This extension allows the use of the `SPV_KHR_relaxed_extended_instruction`
extension in SPIR-V shader modules.

It adds a new SPIR-V instruction, which allows some usage of forward
references in non-semantic instruction sets.
This extensions interacts with the `SPV_KHR_non_semantic_info` extension,
hence with `VK_KHR_shader_non_semantic_info`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR](VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR.html)

* 
`VK_KHR_SHADER_RELAXED_EXTENDED_INSTRUCTION_EXTENSION_NAME`

* 
`VK_KHR_SHADER_RELAXED_EXTENDED_INSTRUCTION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_RELAXED_EXTENDED_INSTRUCTION_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2024-01-24 (Nathan Gauër)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_relaxed_extended_instruction).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
