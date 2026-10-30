# VkGpaSqShaderStageFlagBitsAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaSqShaderStageFlagBitsAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaSqShaderStageFlagBitsAMD - Bitmask specifying GPU shader stage to sample

Bits which **can** be set to control which GPU shader stages are sampled, are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaSqShaderStageFlagBitsAMD {
    VK_GPA_SQ_SHADER_STAGE_PS_BIT_AMD = 0x00000001,
    VK_GPA_SQ_SHADER_STAGE_VS_BIT_AMD = 0x00000002,
    VK_GPA_SQ_SHADER_STAGE_GS_BIT_AMD = 0x00000004,
    VK_GPA_SQ_SHADER_STAGE_ES_BIT_AMD = 0x00000008,
    VK_GPA_SQ_SHADER_STAGE_HS_BIT_AMD = 0x00000010,
    VK_GPA_SQ_SHADER_STAGE_LS_BIT_AMD = 0x00000020,
    VK_GPA_SQ_SHADER_STAGE_CS_BIT_AMD = 0x00000040,
} VkGpaSqShaderStageFlagBitsAMD;

* 
[VK_GPA_SQ_SHADER_STAGE_PS_BIT_AMD](#) specifies the pixel shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_VS_BIT_AMD](#) specifies the vertex shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_GS_BIT_AMD](#) specifies the geometry shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_ES_BIT_AMD](#) specifies the export shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_HS_BIT_AMD](#) specifies the hull shader stage.

* 
[VK_GPA_SQ_SHADER_STAGE_LS_BIT_AMD](#) specifies the local shader
stage.

* 
[VK_GPA_SQ_SHADER_STAGE_CS_BIT_AMD](#) specifies the compute shader
stage.

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaSqShaderStageFlagsAMD](VkGpaSqShaderStageFlagsAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaSqShaderStageFlagBitsAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
