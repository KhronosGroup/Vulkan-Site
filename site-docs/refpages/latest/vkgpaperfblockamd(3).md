# VkGpaPerfBlockAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaPerfBlockAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaPerfBlockAMD - Enum providing performance counter types

Values which **can** be set in [VkGpaPerfCounterAMD](VkGpaPerfCounterAMD.html)::`blockType` are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaPerfBlockAMD {
    VK_GPA_PERF_BLOCK_CPF_AMD = 0,
    VK_GPA_PERF_BLOCK_IA_AMD = 1,
    VK_GPA_PERF_BLOCK_VGT_AMD = 2,
    VK_GPA_PERF_BLOCK_PA_AMD = 3,
    VK_GPA_PERF_BLOCK_SC_AMD = 4,
    VK_GPA_PERF_BLOCK_SPI_AMD = 5,
    VK_GPA_PERF_BLOCK_SQ_AMD = 6,
    VK_GPA_PERF_BLOCK_SX_AMD = 7,
    VK_GPA_PERF_BLOCK_TA_AMD = 8,
    VK_GPA_PERF_BLOCK_TD_AMD = 9,
    VK_GPA_PERF_BLOCK_TCP_AMD = 10,
    VK_GPA_PERF_BLOCK_TCC_AMD = 11,
    VK_GPA_PERF_BLOCK_TCA_AMD = 12,
    VK_GPA_PERF_BLOCK_DB_AMD = 13,
    VK_GPA_PERF_BLOCK_CB_AMD = 14,
    VK_GPA_PERF_BLOCK_GDS_AMD = 15,
    VK_GPA_PERF_BLOCK_SRBM_AMD = 16,
    VK_GPA_PERF_BLOCK_GRBM_AMD = 17,
    VK_GPA_PERF_BLOCK_GRBM_SE_AMD = 18,
    VK_GPA_PERF_BLOCK_RLC_AMD = 19,
    VK_GPA_PERF_BLOCK_DMA_AMD = 20,
    VK_GPA_PERF_BLOCK_MC_AMD = 21,
    VK_GPA_PERF_BLOCK_CPG_AMD = 22,
    VK_GPA_PERF_BLOCK_CPC_AMD = 23,
    VK_GPA_PERF_BLOCK_WD_AMD = 24,
    VK_GPA_PERF_BLOCK_TCS_AMD = 25,
    VK_GPA_PERF_BLOCK_ATC_AMD = 26,
    VK_GPA_PERF_BLOCK_ATC_L2_AMD = 27,
    VK_GPA_PERF_BLOCK_MC_VM_L2_AMD = 28,
    VK_GPA_PERF_BLOCK_EA_AMD = 29,
    VK_GPA_PERF_BLOCK_RPB_AMD = 30,
    VK_GPA_PERF_BLOCK_RMI_AMD = 31,
    VK_GPA_PERF_BLOCK_UMCCH_AMD = 32,
    VK_GPA_PERF_BLOCK_GE_AMD = 33,
    VK_GPA_PERF_BLOCK_GL1A_AMD = 34,
    VK_GPA_PERF_BLOCK_GL1C_AMD = 35,
    VK_GPA_PERF_BLOCK_GL1CG_AMD = 36,
    VK_GPA_PERF_BLOCK_GL2A_AMD = 37,
    VK_GPA_PERF_BLOCK_GL2C_AMD = 38,
    VK_GPA_PERF_BLOCK_CHA_AMD = 39,
    VK_GPA_PERF_BLOCK_CHC_AMD = 40,
    VK_GPA_PERF_BLOCK_CHCG_AMD = 41,
    VK_GPA_PERF_BLOCK_GUS_AMD = 42,
    VK_GPA_PERF_BLOCK_GCR_AMD = 43,
    VK_GPA_PERF_BLOCK_PH_AMD = 44,
    VK_GPA_PERF_BLOCK_UTCL1_AMD = 45,
    VK_GPA_PERF_BLOCK_GE_DIST_AMD = 46,
    VK_GPA_PERF_BLOCK_GE_SE_AMD = 47,
    VK_GPA_PERF_BLOCK_DF_MALL_AMD = 48,
    VK_GPA_PERF_BLOCK_SQ_WGP_AMD = 49,
    VK_GPA_PERF_BLOCK_PC_AMD = 50,
    VK_GPA_PERF_BLOCK_GL1XA_AMD = 51,
    VK_GPA_PERF_BLOCK_GL1XC_AMD = 52,
    VK_GPA_PERF_BLOCK_WGS_AMD = 53,
    VK_GPA_PERF_BLOCK_EACPWD_AMD = 54,
    VK_GPA_PERF_BLOCK_EASE_AMD = 55,
    VK_GPA_PERF_BLOCK_RLCUSER_AMD = 56,
    VK_GPA_PERF_BLOCK_GE1_AMD = VK_GPA_PERF_BLOCK_GE_AMD,
    VK_GPA_PERF_BLOCK_RLCLOCAL_AMD = VK_GPA_PERF_BLOCK_RLCUSER_AMD,
} VkGpaPerfBlockAMD;

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaPerfBlockPropertiesAMD](VkGpaPerfBlockPropertiesAMD.html), [VkGpaPerfCounterAMD](VkGpaPerfCounterAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaPerfBlockAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
