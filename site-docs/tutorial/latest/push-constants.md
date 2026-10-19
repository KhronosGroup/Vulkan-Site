# Push Constants

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Lighting_Materials/03_push_constants.html

## Table of Contents

- [What Are Push Constants?](#_what_are_push_constants)
- [What_Are_Push_Constants?](#_what_are_push_constants)
- [When to Use Push Constants](#_when_to_use_push_constants)
- [When_to_Use_Push_Constants](#_when_to_use_push_constants)
- [Defining Push Constants in Shaders](#_defining_push_constants_in_shaders)
- [Defining_Push_Constants_in_Shaders](#_defining_push_constants_in_shaders)
- [Setting Up Push Constants in Vulkan](#_setting_up_push_constants_in_vulkan)
- [Setting_Up_Push_Constants_in_Vulkan](#_setting_up_push_constants_in_vulkan)
- [Push Constants vs. Uniform Buffers](#_push_constants_vs_uniform_buffers)
- [Push_Constants_vs._Uniform_Buffers](#_push_constants_vs_uniform_buffers)

## Content

In this section, we’ll explore push constants, a powerful feature in Vulkan that allows us to efficiently pass small amounts of data to shaders without the overhead of descriptor sets.

Push constants are a way to send a small amount of data directly to shaders. Unlike uniform buffers, which require descriptor sets and memory allocation, push constants are part of the command buffer itself. This makes them ideal for small, frequently changing data.

Some key characteristics of push constants: they are tiny (typically up to 128 bytes, device dependent), fast to update per draw, and require no descriptor sets or allocations because they live on the command buffer. They can be read by any shader stage you enable in the pipeline.

Use push constants for tiny, per‑draw parameters that change frequently—exactly the kind of material knobs (base color, metallic, roughness) we tweak per object. If the data is larger than the device’s push‑constant limit or doesn’t change often, prefer a uniform buffer instead.

In GLSL (or SPIR-V), push constants are defined using a uniform block with the `push_constant` layout qualifier:

layout(push_constant) uniform PushConstants {
    vec4 baseColorFactor;
    float metallicFactor;
    float roughnessFactor;
    int baseColorTextureSet;
    int physicalDescriptorTextureSet;
    int normalTextureSet;
    int occlusionTextureSet;
    int emissiveTextureSet;
    float alphaMask;
    float alphaMaskCutoff;
} material;

In Slang, which we’re using for our engine, the syntax is slightly different:

struct PushConstants {
    float4 baseColorFactor;
    float metallicFactor;
    float roughnessFactor;
    int baseColorTextureSet;
    int physicalDescriptorTextureSet;
    int normalTextureSet;
    int occlusionTextureSet;
    int emissiveTextureSet;
    float alphaMask;
    float alphaMaskCutoff;
};

[[vk::push_constant]] PushConstants material;

To use push constants in Vulkan with vk::raii, we need to:

Define a push constant range when creating the pipeline layout.

Use `commandBuffer.pushConstants` to send data to the shader.

Here’s how we define a push constant range:

// Set up push constant range for material properties
vk::PushConstantRange pushConstantRange;
pushConstantRange.setStageFlags(vk::ShaderStageFlagBits::eFragment) // Which shader stages can access the push constants
               .setOffset(0)
               .setSize(sizeof(PushConstantBlock)); // Size of our push constant data

// Create pipeline layout with push constants
vk::PipelineLayoutCreateInfo pipelineLayoutInfo;
pipelineLayoutInfo.setSetLayoutCount(1)
                 .setPSetLayouts(&*descriptorSetLayout)
                 .setPushConstantRangeCount(1)
                 .setPPushConstantRanges(&pushConstantRange);

// Create pipeline layout with vk::raii
vk::raii::PipelineLayout pipelineLayout = device.createPipelineLayout(pipelineLayoutInfo);

And here’s how we send data to the shader:

// Define material properties
PushConstantBlock pushConstants{};
pushConstants.baseColorFactor = {1.0f, 1.0f, 1.0f, 1.0f};
pushConstants.metallicFactor = 1.0f;
pushConstants.roughnessFactor = 0.5f;
pushConstants.baseColorTextureSet = 0;
pushConstants.physicalDescriptorTextureSet = 1;
pushConstants.normalTextureSet = 2;
pushConstants.occlusionTextureSet = 3;
pushConstants.emissiveTextureSet = 4;
pushConstants.alphaMask = 0.0f;
pushConstants.alphaMaskCutoff = 0.5f;

// Push constants to shader using vk::raii
commandBuffer.pushConstants(
    *pipelineLayout,
    vk::ShaderStageFlagBits::eFragment, // Which shader stages will receive the data
    0, // Offset
    sizeof(PushConstantBlock), // Size
    &pushConstants // Data
);

While push constants are efficient for small, frequently changing data, they have limitations. For larger data sets or data that doesn’t change frequently, uniform buffers are often a better choice.

Here’s a comparison:

| Feature | Push Constants | Uniform Buffers |
| --- | --- | --- |
| Size | Limited (typically 128 bytes) | Much larger |
| Update Mechanism | Direct command in command buffer | Memory mapping or staging buffer |
| Descriptor Sets | Not required | Required |
| Memory Allocation | Not required | Required |
| Update Frequency | Ideal for frequent updates | Better for infrequent updates |
| Access Speed | Fast | Slightly slower |

For our PBR implementation, we’ll use push constants for material properties and uniform buffers for light information and transformation matrices.

In the next section, we’ll implement a basic lighting shader that uses push constants for material properties.

[Previous: Lighting Models](02_lighting_models.html) | [Next: Lighting Implementation](04_lighting_implementation.html)
