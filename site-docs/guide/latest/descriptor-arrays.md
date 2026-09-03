# Descriptor Arrays

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/descriptor_arrays.html

## Table of Contents

- [Bindings vs Arrays](#_bindings_vs_arrays)
- [Bindings_vs_Arrays](#_bindings_vs_arrays)
- [Setting up a Descriptor Array](#_setting_up_a_descriptor_array)
- [Setting_up_a_Descriptor_Array](#_setting_up_a_descriptor_array)
- [Consecutive Binding Updates](#_consecutive_binding_updates)
- [Consecutive_Binding_Updates](#_consecutive_binding_updates)

## Content

This chapter is to help explain about how you can create an array of descriptors.

Inside a single descriptor set there can be multiple bindings. The main advantage of bindings is if you have different types of descriptors in the descriptor set (samplers, uniform buffers, etc).

When you have multiple of the same descriptor type, you might want to use an array of descriptors instead.

As a simple example, if we have 4 `VkBuffer` that we want to turn into 4 different Uniform Buffers, we could represent this as 4 different bindings in the descriptor set:

layout(set = 0, binding = 0) uniform UBO0 {
    uint data_0;
};
layout(set = 0, binding = 1) uniform UBO1 {
    uint data_1;
};
layout(set = 0, binding = 2) uniform UBO2 {
    uint data_2;
};
layout(set = 0, binding = 3) uniform UBO3 {
    uint data_3;
};

We could also represent this as an array of 4 descriptors:

layout(set = 0, binding = 0) uniform UBO0 {
    uint data;
} buffers[4];

If you have the `runtimeDescriptorArray` feature found in [VK_EXT_descriptor_indexing](extensions/VK_EXT_descriptor_indexing.html) you can also tell the shader the array size will be known at runtime

layout(set = 0, binding = 0) uniform UBO0 {
    uint data;
} buffers[];

Using the example of

layout(set = 0, binding = 0) uniform UBO0 {
    uint data;
} buffers[4];

it is pretty easy to set up. You just need to set your `VkDescriptorSetLayoutBinding::descriptorCount` to `4`.

When you update you have 2 options

* 
Use an array of 4 `VkDescriptorBufferInfo` (likely easier way)

VkDescriptorBufferInfo buffer_infos[4];
buffer_infos[0] = {buffer_0, 0, VK_WHOLE_SIZE};
buffer_infos[1] = {buffer_1, 0, VK_WHOLE_SIZE};
buffer_infos[2] = {buffer_2, 0, VK_WHOLE_SIZE};
buffer_infos[3] = {buffer_3, 0, VK_WHOLE_SIZE};

VkWriteDescriptorSet writes;
writes.dstBinding = 0;
writes.dstArrayElement = 0;
writes.descriptorCount = 4; // will consume 4 items in pBufferInfo
writes.descriptorType = VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER;
writes.pBufferInfo = buffer_infos;

* 
Use an array of 4 `VkWriteDescriptorSet`

VkWriteDescriptorSet writes[4];
writes[0].dstArrayElement = 0; // points which descriptor in the array
writes[0].descriptorCount = 1;
writes[0].pBufferInfo = buffer_info_0;

writes[1].dstArrayElement = 1;
writes[1].descriptorCount = 1;
writes[1].pBufferInfo = buffer_info_1;

writes[2].dstArrayElement = 2;
writes[2].descriptorCount = 1;
writes[2].pBufferInfo = buffer_info_2;

writes[3].dstArrayElement = 3;
writes[3].descriptorCount = 1;
writes[3].pBufferInfo = buffer_info_3;

When updating multiple bindings at once there is a concept of [Consecutive Binding Updates in the Vulkan Spec](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#descriptorsets-updates-consecutive).

The follow is an example to help illustrate how it works. We will have 5 descriptors spread across for 3 different bindings. The shader code is expressed as:

layout(set = 0, binding = 1) uniform sampler Samplers_A[2];

layout(set = 0, binding = 2) uniform sampler Samplers_B;

layout(set = 0, binding = 6) uniform sampler Samplers_C[2];

The API is expressed as:

VkDescriptorSetLayoutBinding sampler_a;
sampler_a.binding = 1;
sampler_a.descriptorCount = 2;

VkDescriptorSetLayoutBinding sampler_b;
sampler_b.binding = 2;
sampler_b.descriptorCount = 1;

VkDescriptorSetLayoutBinding sampler_c;
sampler_c.binding = 6;
sampler_c.descriptorCount = 2;

If we try to update the descriptors together, the `VkWriteDescriptorSet` will look like:

VkDescriptorImageInfo image_infos[5];

VkWriteDescriptorSet writes;
writes.dstBinding = 1;
writes.dstArrayElement = 0;
writes.descriptorCount = 5;
writes.descriptorType = VK_DESCRIPTOR_TYPE_SAMPLER;
writes.pImageInfo = image_infos;

Here the `VkWriteDescriptorSet::descriptorCount` is `5`. It will set the following:

* 
`image_infos[0]` to binding 1, index 0

* 
`image_infos[1]` to binding 1, index 1

* 
`image_infos[2]` to binding 2, index 0

* 
`image_infos[3]` to binding 6, index 0

* 
`image_infos[4]` to binding 6, index 1
