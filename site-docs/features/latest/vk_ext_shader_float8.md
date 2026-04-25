# VK_EXT_shader_float8

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_float8.html

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

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V Changes](#_spir_v_changes)
[3.2. API Changes](#_api_changes)

[4. Issues](#_issues)

This extension enables support for 8-bit floating point operations in shaders.

With machine learning algorithms commonly being run on GPUs, it has become
desirable to support smaller types in GPUs to allow increased throughput for
large networks.
This extension enables two 8-bit floating point types: E4M3 and E5M2 as
defined by the "FP8 Formats For Deep Learning" whitepaper ([https://arxiv.org/abs/2209.05433](https://arxiv.org/abs/2209.05433)).

Machine learning algorithms frequently use [SPV_KHR_cooperative_matrix](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_cooperative_matrix.html).

Any proposal here has to support that functionality, as well as basic manipulation of data for these types.

This extension adds two new *Floating Point Encoding* values, enabling the operand to be specified when creating a floating point type:

| FP Encoding | Width(s) | Enabling Capabilities |
| --- | --- | --- |
| 4214 | **Float8E4M3EXT**

The floating point type is encoded as an FP8 E4M3 type, as specified in the
"FP8 Formats For Deep Learning" whitepaper ([https://arxiv.org/abs/2209.05433](https://arxiv.org/abs/2209.05433)). | 8 | **Float8EXT** |
| 4215 | **Float8E5M2EXT**

The floating point type is encoded as an FP8 E5M2 type, as specified in the
"FP8 Formats For Deep Learning" whitepaper ([https://arxiv.org/abs/2209.05433](https://arxiv.org/abs/2209.05433)). | 8 | **Float8EXT** |

New capabilities enable both the declaration of the type and its use with cooperative matrix features:

| Capability | Implicitly Declares |
| --- | --- |
| 4212 | **Float8EXT**

Uses **OpTypeFloat** to specify types with the **Float8E4M3EXT** or **Float8E5M2EXT** FP Encoding and values of this type with a few instructions. |  |
| 4213 | **Float8CooperativeMatrixEXT**

Uses cooperative matrix with a **Component Type** of **OpTypeFloat** with the **Float8E4M3EXT** or **Float8E5M2EXT** encoding. | **Float8EXT**, **CooperativeMatrixKHR** |

The `Float8EXT` capability is required to use 8-bit floating point types, and
`Float8CooperativeMatrixEXT` is required to use cooperative matrix operations
with an 8-bit floating point component type.

This extension adds two features that map 1:1 to the capabilities exposed in that extension:

typedef struct VkPhysicalDeviceShaderFloat8FeaturesEXT {
    VkStructureType                 sType;
    void*                           pNext;
    VkBool32                        shaderFloat8;
    VkBool32                        shaderFloat8CooperativeMatrix;
} VkPhysicalDeviceShaderFloat16FeaturesEXT;

* 
`shaderFloat8Type` indicates support for the `Float8EXT` capability.

* 
`shaderFloat8CooperativeMatrix` indicates support for the `Float8CooperativeMatrixEXT` capability.

`shaderFloat8` must be supported for this extension.

Two new [VkComponentTypeKHR](https://docs.vulkan.org/spec/latest/chapters/shaders.html#VkComponentTypeKHR) are added that can be reported as supported by [vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR](https://docs.vulkan.org/spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR):

typedef enum VkComponentTypeKHR {
    ...
    VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT = ...,
    VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT = ...,
} VkComponentTypeKHR;

If `shaderFloat8CooperativeMatrix` is supported, at least one entry in [vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR::pProperties](https://docs.vulkan.org/spec/latest/chapters/shaders.html#vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR) must include this type in all of its `AType`, `BType`, and `CType` members.

None.
