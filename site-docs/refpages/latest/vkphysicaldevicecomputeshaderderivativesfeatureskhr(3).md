# VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR - Structure describing compute shader derivative features that can be supported by an implementation

The `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_compute_shader_derivatives
typedef struct VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           computeDerivativeGroupQuads;
    VkBool32           computeDerivativeGroupLinear;
} VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR;

// Provided by VK_NV_compute_shader_derivatives
// Equivalent to VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR
typedef VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR VkPhysicalDeviceComputeShaderDerivativesFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`computeDerivativeGroupQuads` indicates that the implementation
supports the `ComputeDerivativeGroupQuadsKHR` SPIR-V capability.

* 

`computeDerivativeGroupLinear` indicates that the implementation
supports the `ComputeDerivativeGroupLinearKHR` SPIR-V capability.

See [Quad shader scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-quad) for more information.

If the `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR`. structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR`., it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_compute_shader_derivatives](VK_KHR_compute_shader_derivatives.html), [VK_NV_compute_shader_derivatives](VK_NV_compute_shader_derivatives.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
