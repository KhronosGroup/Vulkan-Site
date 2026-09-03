# VkPhysicalDeviceShaderFloat16Int8Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderFloat16Int8Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderFloat16Int8Features - Structure describing features supported by VK_KHR_shader_float16_int8

The `VkPhysicalDeviceShaderFloat16Int8Features` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceShaderFloat16Int8Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloat16;
    VkBool32           shaderInt8;
} VkPhysicalDeviceShaderFloat16Int8Features;

// Provided by VK_KHR_shader_float16_int8
// Equivalent to VkPhysicalDeviceShaderFloat16Int8Features
typedef VkPhysicalDeviceShaderFloat16Int8Features VkPhysicalDeviceShaderFloat16Int8FeaturesKHR;

// Provided by VK_KHR_shader_float16_int8
// Equivalent to VkPhysicalDeviceShaderFloat16Int8Features
typedef VkPhysicalDeviceShaderFloat16Int8Features VkPhysicalDeviceFloat16Int8FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFloat16` indicates
whether 16-bit floats (halfs) are supported in shader code.
This also indicates whether shader modules **can** declare the `Float16`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Float16` SPIR-V capability: Declaring and using
16-bit floats in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

* 
 `shaderInt8` indicates
whether 8-bit integers (signed and unsigned) are supported in shader
code.
This also indicates whether shader modules **can** declare the `Int8`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Int8` SPIR-V capability: Declaring and using 8-bit
integers in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

If the `VkPhysicalDeviceShaderFloat16Int8Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderFloat16Int8Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderFloat16Int8Features-sType-sType) VUID-VkPhysicalDeviceShaderFloat16Int8Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderFloat16Int8Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
