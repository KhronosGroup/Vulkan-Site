# VkPhysicalDeviceShaderBfloat16FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderBfloat16FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderBfloat16FeaturesKHR - Structure describing bfloat16 features that can be supported by the implementation

The `VkPhysicalDeviceShaderBfloat16FeaturesKHR` structure is defined as:

// Provided by VK_KHR_shader_bfloat16
typedef struct VkPhysicalDeviceShaderBfloat16FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBFloat16Type;
    VkBool32           shaderBFloat16DotProduct;
    VkBool32           shaderBFloat16CooperativeMatrix;
} VkPhysicalDeviceShaderBfloat16FeaturesKHR;

This structure describes the following features:

* 
 `shaderBFloat16Type` indicates
whether the implementation supports shaders with the
`BFloat16TypeKHR` capability.

* 
 `shaderBFloat16DotProduct`
indicates whether the implementation supports shaders with the
`BFloat16DotProductKHR` capability.

* 

`shaderBFloat16CooperativeMatrix` indicates whether the
implementation supports shaders with the
`BFloat16CooperativeMatrixKHR` capability.

If the `VkPhysicalDeviceShaderBfloat16FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderBfloat16FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderBfloat16FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderBfloat16FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_BFLOAT16_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_bfloat16](VK_KHR_shader_bfloat16.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderBfloat16FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
