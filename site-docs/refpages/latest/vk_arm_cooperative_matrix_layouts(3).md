# VK_ARM_cooperative_matrix_layouts(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_cooperative_matrix_layouts.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_cooperative_matrix_layouts](#VK_ARM_cooperative_matrix_layouts)
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

VK_ARM_cooperative_matrix_layouts - device extension

**Name String**

`VK_ARM_cooperative_matrix_layouts`

**Extension Type**

Device extension

**Registered Extension Number**

671

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_ARM_cooperative_matrix_layouts](https://github.khronos.org/SPIRV-Registry/extensions/ARM/SPV_ARM_cooperative_matrix_layouts.html)

**Contact**

* 
Kevin Petit [kevinpetit](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_cooperative_matrix_layouts] @kevinpetit%0A*Here describe the issue or question you have about the VK_ARM_cooperative_matrix_layouts extension*)

**Last Modified Date**

2026-07-29

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_ARM_cooperative_matrix_layouts`](https://github.khronos.org/SPIRV-Registry/extensions/ARM/SPV_ARM_cooperative_matrix_layouts.html)

* 
This extension provides API support for
[`GL_ARM_cooperative_matrix_layouts`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_ARM_cooperative_matrix_layouts.txt)

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

This extension allows the use of Arm-specific cooperative matrix memory
layouts introduced by `SPV_ARM_cooperative_matrix_layouts`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrixLayoutsFeaturesARM](VkPhysicalDeviceCooperativeMatrixLayoutsFeaturesARM.html)

* 
`VK_ARM_COOPERATIVE_MATRIX_LAYOUTS_EXTENSION_NAME`

* 
`VK_ARM_COOPERATIVE_MATRIX_LAYOUTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_LAYOUTS_FEATURES_ARM](VkStructureType.html)

* 
[    `CooperativeMatrixLayoutsARM`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixLayoutsARM)

None.

* 
Revision 1, 2026-07-29 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_cooperative_matrix_layouts).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
