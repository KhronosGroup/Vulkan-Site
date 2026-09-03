# Subgroups

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/subgroups.html

## Table of Contents

- [Resources](#_resources)
- [Subgroup size](#_subgroup_size)
- [VK_EXT_subgroup_size_control](#VK_EXT_subgroup_size_control)
- [Checking for support](#_checking_for_support)
- [Checking_for_support](#_checking_for_support)
- [Guaranteed support](#_guaranteed_support)
- [VK_KHR_shader_subgroup_extended_types](#VK_KHR_shader_subgroup_extended_types)
- [VK_EXT_shader_subgroup_ballot and VK_EXT_shader_subgroup_vote](#VK_EXT_shader_subgroup_ballot-and-VK_EXT_shader_subgroup_vote)
- [VK_EXT_shader_subgroup_ballot_and_VK_EXT_shader_subgroup_vote](#VK_EXT_shader_subgroup_ballot-and-VK_EXT_shader_subgroup_vote)

## Content

The Vulkan Spec defines subgroups as:

|  | A set of shader invocations that can synchronize and share data with each other efficiently. In compute shaders, the local workgroup is a superset of the subgroup. |
| --- | --- |

For many implementations, a subgroup is the groups of invocations that run the same instruction at once. Subgroups allow for a shader writer to work at a finer granularity than a single workgroup.

For more detailed information about subgroups there is a great [Khronos blog post](https://www.khronos.org/blog/vulkan-subgroup-tutorial) as well as a presentation from Vulkan Developer Day 2018 ([slides](https://www.khronos.org/assets/uploads/developers/library/2018-vulkan-devday/06-subgroups.pdf) and [video](https://www.youtube.com/watch?v=8MyqQLu_tW0)). GLSL support can be found in the [GL_KHR_shader_subgroup](https://github.com/KhronosGroup/GLSL/blob/master/extensions/khr/GL_KHR_shader_subgroup.txt) extension.

It is important to also realize the size of a subgroup can be dynamic for an implementation. Some implementations may dispatch shaders with a varying subgroup size for different subgroups. As a result, they could implicitly split a large subgroup into smaller subgroups or represent a small subgroup as a larger subgroup, some of whose invocations were inactive on launch.

|  | Promoted to core in Vulkan 1.3 |
| --- | --- |

This extension was created due to some implementation having more than one subgroup size and Vulkan originally only exposing a single subgroup size.

For example, if an implementation has both support for subgroups of size `4` and `16` before they would have had to expose only one size, but now can expose both. This allows applications to potentially control the hardware at a finer granularity for implementations that expose multiple subgroup sizes. If an device does not support this extension, it most likely means there is only one supported subgroup size to expose.

With Vulkan 1.1, all the information for subgroups is found in `VkPhysicalDeviceSubgroupProperties`

VkPhysicalDeviceSubgroupProperties subgroupProperties;

VkPhysicalDeviceProperties2KHR deviceProperties2;
deviceProperties2.sType      = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2;
deviceProperties2.pNext      = &subgroupProperties;
vkGetPhysicalDeviceProperties2(physicalDevice, &deviceProperties2);

// Example of checking if supported in fragment shader
if ((subgroupProperties.supportedStages & VK_SHADER_STAGE_FRAGMENT_BIT) != 0) {
    // fragment shaders supported
}

// Example of checking if ballot is supported
if ((subgroupProperties.supportedOperations & VK_SUBGROUP_FEATURE_BALLOT_BIT) != 0) {
    // ballot subgroup operations supported
}

For supported stages, the Vulkan Spec guarantees the following support:

|  | **supportedStages** will have the **VK_SHADER_STAGE_COMPUTE_BIT** bit set if any of the physical device’s queues support **VK_QUEUE_COMPUTE_BIT**. |
| --- | --- |

For supported operations, the Vulkan Spec guarantees the following support:

|  | **supportedOperations** will have the **VK_SUBGROUP_FEATURE_BASIC_BIT** bit set if any of the physical device’s queues support **VK_QUEUE_GRAPHICS_BIT** or **VK_QUEUE_COMPUTE_BIT**. |
| --- | --- |

|  | Promoted to core in Vulkan 1.2
| --- | --- |

[GLSL_EXT_shader_subgroup_extended_types](https://github.com/KhronosGroup/GLSL/blob/master/extensions/ext/GLSL_EXT_shader_subgroup_extended_types.txt) |

This extension allows subgroup operations to use 8-bit integer, 16-bit integer, 64-bit integer, 16-bit floating-point, and vectors of these types in group operations with subgroup scope if the implementation supports the types already.

For example, if an implementation supports 8-bit integers an application can now use the GLSL `genI8Type subgroupAdd(genI8Type value);` call which will get mapped to `OpGroupNonUniformFAdd` in SPIR-V.

`VK_EXT_shader_subgroup_ballot` and `VK_EXT_shader_subgroup_vote` were the original efforts to expose subgroups in Vulkan. If an application is using Vulkan 1.1 or greater, there is no need to use these extensions and should instead use the core API to query for subgroup support.
