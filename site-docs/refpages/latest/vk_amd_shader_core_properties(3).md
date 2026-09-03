# VK_AMD_shader_core_properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_shader_core_properties.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_shader_core_properties](#VK_AMD_shader_core_properties)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_shader_core_properties - device extension

**Name String**

`VK_AMD_shader_core_properties`

**Extension Type**

Device extension

**Registered Extension Number**

186

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Martin Dinkov [mdinkov](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_shader_core_properties] @mdinkov%0A*Here describe the issue or question you have about the VK_AMD_shader_core_properties extension*)

**Last Modified Date**

2019-06-25

**IP Status**

No known IP claims.

**Contributors**

* 
Martin Dinkov, AMD

* 
Matthaeus G. Chajdas, AMD

This extension exposes shader core properties for a target physical device
through the `[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)` extension.
Please refer to the example below for proper usage.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceShaderCorePropertiesAMD](VkPhysicalDeviceShaderCorePropertiesAMD.html)

* 
`VK_AMD_SHADER_CORE_PROPERTIES_EXTENSION_NAME`

* 
`VK_AMD_SHADER_CORE_PROPERTIES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_AMD](VkStructureType.html)

This example retrieves the shader core properties for a physical device.

extern VkInstance       instance;

PFN_vkGetPhysicalDeviceProperties2 pfnVkGetPhysicalDeviceProperties2 =
    reinterpret_cast
    (vkGetInstanceProcAddr(instance, "vkGetPhysicalDeviceProperties2") );

VkPhysicalDeviceProperties2             general_props;
VkPhysicalDeviceShaderCorePropertiesAMD shader_core_properties;

shader_core_properties.pNext = nullptr;
shader_core_properties.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_AMD;

general_props.pNext = &shader_core_properties;
general_props.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2;

// After this call, shader_core_properties has been populated
pfnVkGetPhysicalDeviceProperties2(device, &general_props);

printf("Number of shader engines: %d\n",
    m_shader_core_properties.shader_engine_count =
    shader_core_properties.shaderEngineCount;
printf("Number of shader arrays: %d\n",
    m_shader_core_properties.shader_arrays_per_engine_count =
    shader_core_properties.shaderArraysPerEngineCount;
printf("Number of CUs per shader array: %d\n",
    m_shader_core_properties.compute_units_per_shader_array =
    shader_core_properties.computeUnitsPerShaderArray;
printf("Number of SIMDs per compute unit: %d\n",
    m_shader_core_properties.simd_per_compute_unit =
    shader_core_properties.simdPerComputeUnit;
printf("Number of wavefront slots in each SIMD: %d\n",
    m_shader_core_properties.wavefronts_per_simd =
    shader_core_properties.wavefrontsPerSimd;
printf("Number of threads per wavefront: %d\n",
    m_shader_core_properties.wavefront_size =
    shader_core_properties.wavefrontSize;
printf("Number of physical SGPRs per SIMD: %d\n",
    m_shader_core_properties.sgprs_per_simd =
    shader_core_properties.sgprsPerSimd;
printf("Minimum number of SGPRs that can be allocated by a wave: %d\n",
    m_shader_core_properties.min_sgpr_allocation =
    shader_core_properties.minSgprAllocation;
printf("Number of available SGPRs: %d\n",
    m_shader_core_properties.max_sgpr_allocation =
    shader_core_properties.maxSgprAllocation;
printf("SGPRs are allocated in groups of this size: %d\n",
    m_shader_core_properties.sgpr_allocation_granularity =
    shader_core_properties.sgprAllocationGranularity;
printf("Number of physical VGPRs per SIMD: %d\n",
    m_shader_core_properties.vgprs_per_simd =
    shader_core_properties.vgprsPerSimd;
printf("Minimum number of VGPRs that can be allocated by a wave: %d\n",
    m_shader_core_properties.min_vgpr_allocation =
    shader_core_properties.minVgprAllocation;
printf("Number of available VGPRs: %d\n",
    m_shader_core_properties.max_vgpr_allocation =
    shader_core_properties.maxVgprAllocation;
printf("VGPRs are allocated in groups of this size: %d\n",
    m_shader_core_properties.vgpr_allocation_granularity =
    shader_core_properties.vgprAllocationGranularity;

* 
Revision 2, 2019-06-25 (Matthaeus G. Chajdas)

Clarified the meaning of a few fields.

Revision 1, 2018-02-15 (Martin Dinkov)

* 
Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_shader_core_properties).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
