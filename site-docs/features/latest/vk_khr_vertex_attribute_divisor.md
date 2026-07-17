# VK_KHR_vertex_attribute_divisor

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_vertex_attribute_divisor.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [3. Examples](#_examples)
- [4. Issues](#_issues)
- [4.1. What is the effect of a non-zero value for firstInstance?](#_what_is_the_effect_of_a_non_zero_value_for_firstinstance)
- [4.1._What_is_the_effect_of_a_non-zero_value_for_firstInstance?](#_what_is_the_effect_of_a_non_zero_value_for_firstinstance)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)
[3. Examples](#_examples)
[4. Issues](#_issues)

[4.1. What is the effect of a non-zero value for `firstInstance`?](#_what_is_the_effect_of_a_non_zero_value_for_firstinstance)

Promoted from `VK_EXT_vertex_attribute_divisor`, this extension allows
instance-rate vertex attributes to be repeated for certain number of instances
instead of advancing for every instance when instanced rendering is enabled.

In other APIs such as OpenGL, it is possible to use the same values of vertex
attributes for a number of successive instances when instanced rendering is
enabled.
This is commonly referred to as "vertex attribute divisor".
For example, if the divisor is `N`, the same vertex attribute will be applied
to `N` successive instances before moving on to the next vertex attribute.
A value of `0` allows the same vertex attribute to be applied to all instances.

This functionality was originally introduced in Vulkan with the
`VK_EXT_vertex_attribute_divisor` extension.

The API in `VK_EXT_vertex_attribute_divisor` is promoted to KHR with the
following exception:

The `VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR` struct contains
an additional property `supportsNonZeroFirstInstance`, compared to
`VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT`.

The vertex attribute divisor can be specified with:

typedef struct VkVertexInputBindingDivisorDescriptionKHR {
    uint32_t    binding;
    uint32_t    divisor;
} VkVertexInputBindingDivisorDescriptionKHR;

which specifies a divisor value for the given vertex binding.
`divisor` is the number of successive instances that will use the same value of
the vertex attribute when instanced rendering is enabled.
For example, if the divisor is `N`, the same vertex attribute will be applied
to `N` successive instances before moving on to the next vertex attribute.

The above is specified once per vertex binding in:

typedef struct VkPipelineVertexInputDivisorStateCreateInfoKHR {
    VkStructureType                                     sType;
    const void*                                         pNext;
    uint32_t                                            vertexBindingDivisorCount;
    const VkVertexInputBindingDivisorDescriptionKHR*    pVertexBindingDivisors;
} VkPipelineVertexInputDivisorStateCreateInfoKHR;

The maximum allowed divisor value can be queried with the following struct when
chained to `VkPhysicalDeviceProperties2`:

typedef struct VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVertexAttribDivisor;
    VkBool32           supportsNonZeroFirstInstance;
} VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR;

In the above, `supportsNonZeroFirstInstance` specifies whether a non-zero value
for the `firstInstance` parameter of drawing commands is supported when
`VkVertexInputBindingDivisorDescriptionKHR::divisor` (or the equivalent
dynamically set state) is not `1`.  Note that this property is new compared to
`VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT`.

The `VK_EXT_vertex_input_dynamic_state` and `VK_EXT_shader_object` extensions
provide the `vkCmdSetVertexInputEXT` function, allowing the vertex attribute
divisor state to be dynamically set.

The functionality of this extension is controlled by the following features:

typedef struct VkPhysicalDeviceVertexAttributeDivisorFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexAttributeInstanceRateDivisor;
    VkBool32           vertexAttributeInstanceRateZeroDivisor;
} VkPhysicalDeviceVertexAttributeDivisorFeaturesKHR;

* 
`vertexAttributeInstanceRateDivisor` specifies whether the functionality in
the extension is supported.

* 
`vertexAttributeInstanceRateZeroDivisor` specifies whether a zero
value for `VkVertexInputBindingDivisorDescriptionKHR::divisor` is
supported.

The vertex attribute divisor can be specified when creating a graphics pipeline as such:

const VkVertexInputBindingDivisorDescriptionKHR divisorDesc =
{
    .binding = 0,
    .divisor = 4,
};

const VkPipelineVertexInputDivisorStateCreateInfoKHR divisorInfo =
{
    .sType = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO_KHR,
    .vertexBindingDivisorCount = 1,
    .pVertexBindingDivisors = &divisorDesc,
}

const VkVertexInputBindingDescription binding =
{
    .binding = 0,
    .stride = sizeof(Vertex),
    .inputRate = VK_VERTEX_INPUT_RATE_INSTANCE,
};

const VkPipelineVertexInputStateCreateInfo viInfo =
{
    .sType = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_CREATE_INFO,
    .pNext = &divisorInfo,
    ...
};

The Vulkan API should follow the OpenGL convention and offset
attribute fetching by `firstInstance` while computing vertex attribute offsets.
