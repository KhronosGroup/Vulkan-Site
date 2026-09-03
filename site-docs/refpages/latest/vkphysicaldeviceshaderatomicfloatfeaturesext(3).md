# VkPhysicalDeviceShaderAtomicFloatFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderAtomicFloatFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderAtomicFloatFeaturesEXT - Structure describing features supported by VK_EXT_shader_atomic_float

The [VkPhysicalDeviceShaderAtomicFloatFeaturesEXT](#) structure is defined
as:

// Provided by VK_EXT_shader_atomic_float
typedef struct VkPhysicalDeviceShaderAtomicFloatFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBufferFloat32Atomics;
    VkBool32           shaderBufferFloat32AtomicAdd;
    VkBool32           shaderBufferFloat64Atomics;
    VkBool32           shaderBufferFloat64AtomicAdd;
    VkBool32           shaderSharedFloat32Atomics;
    VkBool32           shaderSharedFloat32AtomicAdd;
    VkBool32           shaderSharedFloat64Atomics;
    VkBool32           shaderSharedFloat64AtomicAdd;
    VkBool32           shaderImageFloat32Atomics;
    VkBool32           shaderImageFloat32AtomicAdd;
    VkBool32           sparseImageFloat32Atomics;
    VkBool32           sparseImageFloat32AtomicAdd;
} VkPhysicalDeviceShaderAtomicFloatFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderBufferFloat32Atomics`
indicates whether shaders **can** perform 32-bit floating-point load,
store, and exchange atomic operations on storage buffers.

* 

`shaderBufferFloat32AtomicAdd` indicates whether shaders **can**
perform 32-bit floating-point add atomic operations on storage buffers.

* 
 `shaderBufferFloat64Atomics`
indicates whether shaders **can** perform 64-bit floating-point load,
store, and exchange atomic operations on storage buffers.

* 

`shaderBufferFloat64AtomicAdd` indicates whether shaders **can**
perform 64-bit floating-point add atomic operations on storage buffers.

* 
 `shaderSharedFloat32Atomics`
indicates whether shaders **can** perform 32-bit floating-point load,
store, and exchange atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat32AtomicAdd` indicates whether shaders **can**
perform 32-bit floating-point add atomic operations on shared
and payload
memory.

* 
 `shaderSharedFloat64Atomics`
indicates whether shaders **can** perform 64-bit floating-point load,
store, and exchange atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat64AtomicAdd` indicates whether shaders **can**
perform 64-bit floating-point add atomic operations on shared
and payload
memory.

* 
 `shaderImageFloat32Atomics`
indicates whether shaders **can** perform 32-bit floating-point load,
store, and exchange atomic image operations.

* 

`shaderImageFloat32AtomicAdd` indicates whether shaders **can** perform
32-bit floating-point add atomic image operations.

* 
 `sparseImageFloat32Atomics`
indicates whether 32-bit floating-point load, store, and exchange atomic
operations **can** be used on sparse images.

* 

`sparseImageFloat32AtomicAdd` indicates whether 32-bit
floating-point add atomic operations **can** be used on sparse images.

If the `VkPhysicalDeviceShaderAtomicFloatFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicFloatFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderAtomicFloatFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_shader_atomic_float](VK_EXT_shader_atomic_float.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderAtomicFloatFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
