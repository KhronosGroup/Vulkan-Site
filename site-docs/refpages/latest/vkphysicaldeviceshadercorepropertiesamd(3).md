# VkPhysicalDeviceShaderCorePropertiesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderCorePropertiesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderCorePropertiesAMD - Structure describing shader core properties that can be supported by an implementation

The `VkPhysicalDeviceShaderCorePropertiesAMD` structure is defined as:

// Provided by VK_AMD_shader_core_properties
typedef struct VkPhysicalDeviceShaderCorePropertiesAMD {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderEngineCount;
    uint32_t           shaderArraysPerEngineCount;
    uint32_t           computeUnitsPerShaderArray;
    uint32_t           simdPerComputeUnit;
    uint32_t           wavefrontsPerSimd;
    uint32_t           wavefrontSize;
    uint32_t           sgprsPerSimd;
    uint32_t           minSgprAllocation;
    uint32_t           maxSgprAllocation;
    uint32_t           sgprAllocationGranularity;
    uint32_t           vgprsPerSimd;
    uint32_t           minVgprAllocation;
    uint32_t           maxVgprAllocation;
    uint32_t           vgprAllocationGranularity;
} VkPhysicalDeviceShaderCorePropertiesAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderEngineCount` is an unsigned
integer value indicating the number of shader engines found inside the
shader core of the physical device.

* 
 `shaderArraysPerEngineCount`
is an unsigned integer value indicating the number of shader arrays
inside a shader engine.
Each shader array has its own scan converter, set of compute units, and
a render back end (color and depth attachments).
Shader arrays within a shader engine share shader processor input (wave
launcher) and shader export (export buffer) units.
Currently, a shader engine can have one or two shader arrays.

* 
 `computeUnitsPerShaderArray`
is an unsigned integer value indicating the physical number of compute
units within a shader array.
The active number of compute units in a shader array **may** be lower.
A compute unit houses a set of SIMDs along with a sequencer module and a
local data store.

* 
 `simdPerComputeUnit` is an unsigned
integer value indicating the number of SIMDs inside a compute unit.
Each SIMD processes a single instruction at a time.

* 
 `wavefrontSize` is an unsigned integer
value indicating the maximum size of a subgroup.

* 
 `sgprsPerSimd` is an unsigned integer value
indicating the number of physical Scalar General-Purpose Registers
(SGPRs) per SIMD.

* 
 `minSgprAllocation` is an unsigned
integer value indicating the minimum number of SGPRs allocated for a
wave.

* 
 `maxSgprAllocation` is an unsigned
integer value indicating the maximum number of SGPRs allocated for a
wave.

* 
 `sgprAllocationGranularity` is
an unsigned integer value indicating the granularity of SGPR allocation
for a wave.

* 
 `vgprsPerSimd` is an unsigned integer value
indicating the number of physical Vector General-Purpose Registers
(VGPRs) per SIMD.

* 
 `minVgprAllocation` is an unsigned
integer value indicating the minimum number of VGPRs allocated for a
wave.

* 
 `maxVgprAllocation` is an unsigned
integer value indicating the maximum number of VGPRs allocated for a
wave.

* 
 `vgprAllocationGranularity` is
an unsigned integer value indicating the granularity of VGPR allocation
for a wave.

If the `VkPhysicalDeviceShaderCorePropertiesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCorePropertiesAMD-sType-sType) VUID-VkPhysicalDeviceShaderCorePropertiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_AMD_shader_core_properties](VK_AMD_shader_core_properties.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderCorePropertiesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
