# VK_KHR_shader_bfloat16

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_bfloat16.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. SPIR-V Changes](#_spir_v_changes)
- [3.1._SPIR-V_Changes](#_spir_v_changes)
- [3.2. API Changes](#_api_changes)
- [3.2._API_Changes](#_api_changes)
- [3.2.1. Features](#_features)
- [3.2.2. Interactions with VK_KHR_cooperative_matrix](#_interactions_with_vk_khr_cooperative_matrix)
- [3.2.2._Interactions_with_VK_KHR_cooperative_matrix](#_interactions_with_vk_khr_cooperative_matrix)
- [4. Issues](#_issues)
- [4.1. What is the origin of the naming for bfloat16?](#_what_is_the_origin_of_the_naming_for_bfloat16)
- [4.1._What_is_the_origin_of_the_naming_for_bfloat16?](#_what_is_the_origin_of_the_naming_for_bfloat16)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V Changes](#_spir_v_changes)
[3.2. API Changes](#_api_changes)

[4. Issues](#_issues)

[4.1. What is the origin of the naming for bfloat16?](#_what_is_the_origin_of_the_naming_for_bfloat16)

This extension enables support for bfloat16 operations in shaders.

With machine learning algorithms commonly being run on GPUs, it has become desirable to support smaller types in GPUs to allow increased throughput for large networks.
This extension enables bfloat16 as one of those types.
bfloat16 is a floating point type devised to provide similar dynamic range as IEEE754 binary 32-bit floating-point, with less precision at half the size, particularly for use with machine learning algorithms.

Two existing features widely used for machine learning algorithms include [SPV_KHR_cooperative_matrix](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_cooperative_matrix.html), and the [OpDot](https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#OpDot) instruction.
Any proposal here has to support that functionality, as well as basic manipulation of data for these types, and some way to perform standard arithmetic.

This extension adds a new *Floating Point Encoding* value, enabling the operand to be specified when creating a floating point type:

| FP Encoding | Width(s) | Enabling Capabilities |
| --- | --- | --- |
| 0 | **BFloat16KHR**

The floating point type is encoded as the bfloat16 type, which is equivalent to the IEEE754 binary32 floating point encoding but with 16 fewer bits in its significand.
This is encoded per chapter 3 of the IEEE 754-2008 standard with the following encoding parameters:
 - *bias* is 127

 - *sign bit* is 1

 - *w* (exponent) is 8

 - *t* (significand) is 7

 - *k* (width) is 16
The additional precision parameters *p* and *emax* are calculated as *p = t+1* and *emax = bias*.
The radix (or base) *b* is 2.

The accuracy of floating-point operations on **BFloat16KHR** values is the same as operations on IEEE754 binary32 floating-point values, with the result rounded using round-to-nearest-even or round-to-zero rounding.
It is implementation-defined whether intermediate values are rounded. | 16 | **BFloat16TypeKHR** |

New capabilities enable both the declaration of the type and its use with dot product and cooperative matrix features:

| Capability | Implicitly Declares |
| --- | --- |
| 5116 | **BFloat16TypeKHR**

Uses **OpTypeFloat** to specify types with the **BFloat16KHR** [floating point encoding](https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#FP_Encoding) and the use of conversion functions for those types. |  |
| 5117 | **BFloat16DotProductKHR**

Uses vectors with a **Component Type** of **OpTypeFloat** with the **BFloat16KHR** encoding with **OpDot**. | **BFloat16TypeKHR** |
| 5118 | **BFloat16CooperativeMatrixKHR**

Uses cooperative matrices with a **Component Type** of **OpTypeFloat** with the **BFloat16KHR** encoding. | **BFloat16TypeKHR**, **CooperativeMatrixKHR** |

The `BFloat16DotProductKHR` capability is required to use bfloat16 types with the `OpDot` instruction, and `BFloat16CooperativeMatrixKHR` is required to use cooperative matrix operations with a bfloat16 component type.

This extension adds three features that map 1:1 to the capabilities exposed in that extension:

typedef struct VkPhysicalDeviceShaderBfloat16FeaturesKHR {
    VkStructureType                 sType;
    void*                           pNext;
    VkBool32                        shaderBFloat16Type;
    VkBool32                        shaderBFloat16DotProduct;
    VkBool32                        shaderBFloat16CooperativeMatrix;
} VkPhysicalDeviceShaderBfloat16FeaturesKHR;

* 
`shaderBFloat16Type` indicates support for the `BFloat16TypeKHR` capability.

* 
`shaderBFloat16DotProduct` indicates support for the `BFloat16DotProductKHR` capability.

* 
`shaderBFloat16CooperativeMatrix` indicates support for the `BFloat16CooperativeMatrixKHR` capability.

`shaderBFloat16Type` must be supported for this extension.
`shaderBFloat16CooperativeMatrix` must be `VK_FALSE` if [VK_KHR_cooperative_matrix](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_cooperative_matrix) is not supported.
At least one of `shaderBFloat16DotProduct` and `shaderBFloat16CooperativeMatrix` must be supported.

A new [VkComponentTypeKHR](https://docs.vulkan.org/spec/latest/chapters/shaders.html#VkComponentTypeKHR) is added that can be reported as supported by [vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR](https://docs.vulkan.org/spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR):

typedef enum VkComponentTypeKHR {
    ...
    VK_COMPONENT_TYPE_BFLOAT16_KHR = 1000141000,
} VkComponentTypeKHR;

If `shaderBFloat16CooperativeMatrix` is supported, at least one entry in [vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR::pProperties](https://docs.vulkan.org/spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR) must include this type in all of its `AType`, `BType`, and `CType` members.

The type was originally named "brain float" as it was developed by Google Brain, an artificial intelligence group at Google, and it is a 16-bit type.
The name is generally shortened to bfloat16.
