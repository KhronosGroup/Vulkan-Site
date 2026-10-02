# VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV - Structure describing features supported by VK_NV_shader_atomic_float16_vector

The [VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV](#) structure is
defined as:

// Provided by VK_NV_shader_atomic_float16_vector
typedef struct VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloat16VectorAtomics;
} VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFloat16VectorAtomics`
indicates whether shaders **can** perform 16-bit floating-point, 2- and
4-component vector atomic operations.

If the `VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT16_VECTOR_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_shader_atomic_float16_vector](VK_NV_shader_atomic_float16_vector.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
