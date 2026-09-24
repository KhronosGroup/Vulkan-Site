# VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE - Structure describing support for mixed float dot products

The `VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE` structure
is defined as:

// Provided by VK_VALVE_shader_mixed_float_dot_product
typedef struct VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderMixedFloatDotProductFloat16AccFloat32;
    VkBool32           shaderMixedFloatDotProductFloat16AccFloat16;
    VkBool32           shaderMixedFloatDotProductBFloat16Acc;
    VkBool32           shaderMixedFloatDotProductFloat8AccFloat32;
} VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderMixedFloatDotProductFloat16AccFloat32` indicates whether the
implementation supports shaders with the
`DotProductFloat16AccFloat32VALVE` capability.

* 

`shaderMixedFloatDotProductFloat16AccFloat16` indicates whether the
implementation supports shaders with the
`DotProductFloat16AccFloat16VALVE` capability.

* 

`shaderMixedFloatDotProductBFloat16Acc` indicates whether the
implementation supports shaders with the `DotProductBFloat16AccVALVE`
capability.

* 

`shaderMixedFloatDotProductFloat8AccFloat32` indicates whether the
implementation supports shaders with the
`DotProductFloat8AccFloat32VALVE` capability.

If the `VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MIXED_FLOAT_DOT_PRODUCT_FEATURES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VALVE_shader_mixed_float_dot_product](VK_VALVE_shader_mixed_float_dot_product.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
