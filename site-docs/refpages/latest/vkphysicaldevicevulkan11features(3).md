# VkPhysicalDeviceVulkan11Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVulkan11Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVulkan11Features - Structure describing the Vulkan 1.1 features that can be supported by an implementation

The `VkPhysicalDeviceVulkan11Features` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkan11Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           storageBuffer16BitAccess;
    VkBool32           uniformAndStorageBuffer16BitAccess;
    VkBool32           storagePushConstant16;
    VkBool32           storageInputOutput16;
    VkBool32           multiview;
    VkBool32           multiviewGeometryShader;
    VkBool32           multiviewTessellationShader;
    VkBool32           variablePointersStorageBuffer;
    VkBool32           variablePointers;
    VkBool32           protectedMemory;
    VkBool32           samplerYcbcrConversion;
    VkBool32           shaderDrawParameters;
} VkPhysicalDeviceVulkan11Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

    `storageBuffer16BitAccess` specifies whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 16-bit integer
    and 16-bit floating-point members.
    If this feature is not enabled, 16-bit integer or 16-bit floating-point
    members **must** not be used in such
    objects unless [    `storageBuffer8BitAccess`](#features-storageBuffer8BitAccess) or
    [    `uniformAndStorageBuffer8BitAccess`](#features-uniformAndStorageBuffer8BitAccess) are enabled or they are
    accessed in 32-bit multiples if [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled.
    This also specifies whether shader modules **can** declare the
    `StorageBuffer16BitAccess` capability.

* 

`uniformAndStorageBuffer16BitAccess` specifies whether objects in
the `Uniform` storage class with the `Block` decoration **can** have
16-bit integer and 16-bit floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such
objects unless
[    `uniformAndStorageBuffer8BitAccess`](#features-uniformAndStorageBuffer8BitAccess) are enabled or they are
accessed in 32-bit multiples if [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`UniformAndStorageBuffer16BitAccess` capability.

* 

`storagePushConstant16` specifies whether objects in the
`PushConstant` storage class **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or floating-point members
**must** not be used in such
objects unless [    `storagePushConstant8`](#features-storagePushConstant8) are enabled or they are accessed in 32-bit
multiples if [    `shaderUntypedPointers`](../../../../spec/latest/chapters/features.html#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`StoragePushConstant16` capability.

* 

`storageInputOutput16` specifies whether objects in the `Input`
and `Output` storage classes **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such objects.
This also specifies whether shader modules **can** declare the
`StorageInputOutput16` capability.

* 
 `multiview` specifies whether
the implementation supports multiview rendering within a render pass.
If this feature is not enabled, the view mask of each subpass **must**
always be zero.

* 
 `multiviewGeometryShader`
specifies whether the implementation supports multiview rendering within
a render pass, with [geometry shaders](../../../../spec/latest/chapters/geometry.html#geometry).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include a geometry shader.

* 

`multiviewTessellationShader` specifies whether the implementation
supports multiview rendering within a render pass, with
[tessellation shaders](../../../../spec/latest/chapters/tessellation.html#tessellation).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include any tessellation
shaders.

* 

`variablePointersStorageBuffer` specifies whether the implementation
supports the SPIR-V `VariablePointersStorageBuffer` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_variable_pointers` extension or the
`VariablePointersStorageBuffer` capability.

* 
 `variablePointers`
specifies whether the implementation supports the SPIR-V
`VariablePointers` capability.
When this feature is not enabled, shader modules **must** not declare the
`VariablePointers` capability.

* 
 `protectedMemory`
specifies whether [protected memory](../../../../spec/latest/chapters/memory.html#memory-protected-memory) is
supported.

* 

`samplerYcbcrConversion` specifies whether the implementation
supports [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion).
If `samplerYcbcrConversion` is [VK_FALSE](VK_FALSE.html), sampler Y′CBCR
conversion is not supported, and samplers using sampler Y′CBCR
conversion **must** not be used.

* 

`shaderDrawParameters` specifies whether the implementation supports
the SPIR-V `DrawParameters` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_shader_draw_parameters` extension or the `DrawParameters`
capability.

If the `VkPhysicalDeviceVulkan11Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVulkan11Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan11Features-sType-sType) VUID-VkPhysicalDeviceVulkan11Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVulkan11Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
