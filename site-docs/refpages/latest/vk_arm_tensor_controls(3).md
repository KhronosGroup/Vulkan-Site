# VK_ARM_tensor_controls(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_tensor_controls.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_tensor_controls](#VK_ARM_tensor_controls)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_tensor_controls - device extension

**Name String**

`VK_ARM_tensor_controls`

**Extension Type**

Device extension

**Registered Extension Number**

566

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_ARM_tensors](VK_ARM_tensors.html)

**Contact**

* 
Kevin Petit [kevinpetit](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_tensor_controls] @kevinpetit%0A*Here describe the issue or question you have about the VK_ARM_tensor_controls extension*)

**Last Modified Date**

2026-06-17

**Interactions and External Dependencies**

None

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Emma Lynn Mulier (Ben Yossef), Arm Ltd.

* 
Oualid Khelifi, Arm Ltd.

* 
Matteo Martincigh, Arm Ltd.

* 
Matt Wash, Arm Ltd.

* 
Einar Hov, Arm Ltd.

This extension adds support for a few tensor features supported on Arm
hardware.

* 
Extending [VkFormatProperties2](VkFormatProperties2.html):

[VkTensorExplicitTilingFormatPropertiesARM](VkTensorExplicitTilingFormatPropertiesARM.html)

Extending [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html):

* 
[VkTensorRollingBackingCreateInfoARM](VkTensorRollingBackingCreateInfoARM.html)

* 
`VK_ARM_TENSOR_CONTROLS_EXTENSION_NAME`

* 
`VK_ARM_TENSOR_CONTROLS_SPEC_VERSION`

* 
[VK_MAX_TENSOR_CREATE_INFO_ROLLING_BACKING_WRAP_COUNT_ARM](VK_MAX_TENSOR_CREATE_INFO_ROLLING_BACKING_WRAP_COUNT_ARM.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_TENSOR_EXPLICIT_TILING_FORMAT_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TENSOR_ROLLING_BACKING_CREATE_INFO_ARM](VkStructureType.html)

Extending [VkTensorTilingARM](VkTensorTilingARM.html):

* 
[VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_64K_ARM](VkTensorTilingARM.html)

* 
[VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_ARM](VkTensorTilingARM.html)

* 
[VK_TENSOR_TILING_BRICK_16_WIDE_ARM](VkTensorTilingARM.html)

* 
[VK_TENSOR_TILING_BRICK_4_WIDE_ARM](VkTensorTilingARM.html)

* 
[VK_TENSOR_TILING_BRICK_8_WIDE_ARM](VkTensorTilingARM.html)

None.

None.

* 
Revision 1, 2026-06-17 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_tensor_controls).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
