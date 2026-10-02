# VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR - Structure describing compute shader derivative operations supported by an implementation

The `VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR` structure is
defined as:

// Provided by VK_KHR_compute_shader_derivatives
typedef struct VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           meshAndTaskShaderDerivatives;
} VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR;

The members of the
`VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR` structure
describe the following:

* 

`meshAndTaskShaderDerivatives` indicates whether the mesh and task
shader stages support the `ComputeDerivativeGroupQuadsKHR` and
`ComputeDerivativeGroupLinearKHR` SPIR-V capabilities.

If the `VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_compute_shader_derivatives](VK_KHR_compute_shader_derivatives.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
