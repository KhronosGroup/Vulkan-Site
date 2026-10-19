# VK_QCOM_cooperative_matrix_conversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_cooperative_matrix_conversion.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_cooperative_matrix_conversion](#VK_QCOM_cooperative_matrix_conversion)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_cooperative_matrix_conversion - device extension

**Name String**

`VK_QCOM_cooperative_matrix_conversion`

**Extension Type**

Device extension

**Registered Extension Number**

173

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html)

**SPIR-V Dependencies**

* 
[SPV_QCOM_cooperative_matrix_conversion](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_cooperative_matrix_conversion.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_cooperative_matrix_conversion] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_cooperative_matrix_conversion extension*)

**Extension Proposal**

[VK_QCOM_cooperative_matrix_conversion](../../../../features/latest/features/proposals/VK_QCOM_cooperative_matrix_conversion.html)

**Last Modified Date**

2026-01-28

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_QCOM_cooperative_matrix_conversion`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/qcom/GLSL_QCOM_cooperative_matrix_conversion.txt)

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Elina Kamenetskaya, Qualcomm Technologies, Inc

* 
Alex Bourd, Qualcomm Technologies, Inc

* 
Ruihao Zhang, Qualcomm Technologies, Inc

* 
Wooyoung Kim, Qualcomm Technologies, Inc

This extension adds support for new SPIR-V shader instructions that allow
loading and storing a cooperative matrix without needing to stage through
shared memory and to allow bit casting arrays.

These instructions are defined by the
[`SPV_QCOM_cooperative_matrix_conversion`](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_cooperative_matrix_conversion.html)
SPIR-V extension and can be used with the
[`GLSL_QCOM_cooperative_matrix_conversion`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/qcom/GLSL_QCOM_cooperative_matrix_conversion.txt)
GLSL extension.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM](VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM.html)

* 
`VK_QCOM_COOPERATIVE_MATRIX_CONVERSION_EXTENSION_NAME`

* 
`VK_QCOM_COOPERATIVE_MATRIX_CONVERSION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_CONVERSION_FEATURES_QCOM](VkStructureType.html)

* 
[CooperativeMatrixConversionQCOM](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixConversionQCOM)

* 
Revision 1, 2026-01-28 (Matthew Netsch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_cooperative_matrix_conversion).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
