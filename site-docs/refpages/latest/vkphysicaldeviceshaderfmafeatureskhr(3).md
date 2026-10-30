# VkPhysicalDeviceShaderFmaFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderFmaFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderFmaFeaturesKHR - Structure indicating support for SPV_KHR_fma OpFmaKHR

The `VkPhysicalDeviceShaderFmaFeaturesKHR` structure is defined as:

// Provided by VK_KHR_shader_fma
typedef struct VkPhysicalDeviceShaderFmaFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFmaFloat16;
    VkBool32           shaderFmaFloat32;
    VkBool32           shaderFmaFloat64;
} VkPhysicalDeviceShaderFmaFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFmaFloat16` indicates whether
the implementation supports `OpFmaKHR` for Float16 types in shaders.

* 
 `shaderFmaFloat32` indicates whether
the implementation supports `OpFmaKHR` for Float32 types in shaders.

* 
 `shaderFmaFloat64` indicates whether
the implementation supports `OpFmaKHR` for Float64 types in shaders.

If the `VkPhysicalDeviceShaderFmaFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderFmaFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderFmaFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderFmaFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FMA_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_fma](VK_KHR_shader_fma.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderFmaFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
