# VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT - Structure describing features supported by VK_EXT_shader_atomic_float2

The [VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT](#) structure is defined
as:

// Provided by VK_EXT_shader_atomic_float2
typedef struct VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBufferFloat16Atomics;
    VkBool32           shaderBufferFloat16AtomicAdd;
    VkBool32           shaderBufferFloat16AtomicMinMax;
    VkBool32           shaderBufferFloat32AtomicMinMax;
    VkBool32           shaderBufferFloat64AtomicMinMax;
    VkBool32           shaderSharedFloat16Atomics;
    VkBool32           shaderSharedFloat16AtomicAdd;
    VkBool32           shaderSharedFloat16AtomicMinMax;
    VkBool32           shaderSharedFloat32AtomicMinMax;
    VkBool32           shaderSharedFloat64AtomicMinMax;
    VkBool32           shaderImageFloat32AtomicMinMax;
    VkBool32           sparseImageFloat32AtomicMinMax;
} VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderBufferFloat16Atomics`
indicates whether shaders **can** perform 16-bit floating-point load,
store, and exchange atomic operations on storage buffers.

* 

`shaderBufferFloat16AtomicAdd` indicates whether shaders **can**
perform 16-bit floating-point add atomic operations on storage buffers.

* 

`shaderBufferFloat16AtomicMinMax` indicates whether shaders **can**
perform 16-bit floating-point min and max atomic operations on storage
buffers.

* 

`shaderBufferFloat32AtomicMinMax` indicates whether shaders **can**
perform 32-bit floating-point min and max atomic operations on storage
buffers.

* 

`shaderBufferFloat64AtomicMinMax` indicates whether shaders **can**
perform 64-bit floating-point min and max atomic operations on storage
buffers.

* 
 `shaderSharedFloat16Atomics`
indicates whether shaders **can** perform 16-bit floating-point load,
store, and exchange atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat16AtomicAdd` indicates whether shaders **can**
perform 16-bit floating-point add atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat16AtomicMinMax` indicates whether shaders **can**
perform 16-bit floating-point min and max atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat32AtomicMinMax` indicates whether shaders **can**
perform 32-bit floating-point min and max atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat64AtomicMinMax` indicates whether shaders **can**
perform 64-bit floating-point min and max atomic operations on shared
and payload
memory.

* 

`shaderImageFloat32AtomicMinMax` indicates whether shaders **can**
perform 32-bit floating-point min and max atomic image operations.

* 

`sparseImageFloat32AtomicMinMax` indicates whether 32-bit
floating-point min and max atomic operations **can** be used on sparse
images.

If the `VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_2_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_shader_atomic_float2](VK_EXT_shader_atomic_float2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
