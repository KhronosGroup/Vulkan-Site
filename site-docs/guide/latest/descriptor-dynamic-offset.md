# Descriptor Dynamic Offset

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/descriptor_dynamic_offset.html

## Table of Contents

- [Example](#_example)
- [Example with VK_WHOLE_SIZE](#_example_with_vk_whole_size)
- [Example_with_VK_WHOLE_SIZE](#_example_with_vk_whole_size)
- [Limits](#_limits)

## Content

Vulkan offers two types of descriptors that allow adjusting the offset at bind time as [defined in the spec](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#descriptorsets-binding-dynamicoffsets).

* 
dynamic uniform buffer (`VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC`)

* 
dynamic storage buffer (`VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC`)

This example will have buffer of 32 bytes and 16 of the bytes will be set at `vkUpdateDescriptorSets` time. In this first example, we will not add any dynamic offset.

VkDescriptorSet descriptorSet; // allocated
VkBuffer buffer; // size of 32 bytes

VkDescriptorBufferInfo bufferInfo = {
    buffer,
    4,      // offset
    16      // range
};

VkWriteDescriptorSet writeInfo = {
    .dstSet = descriptorSet,
    .descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC,
    .pBufferInfo = bufferInfo
};

vkUpdateDescriptorSets(
    1,         // descriptorWriteCount,
    &writeInfo // pDescriptorWrites,
);

// No dynamic offset
vkCmdBindDescriptorSets(
    1,              // descriptorSetCount,
    &descriptorSet, // pDescriptorSets,
    0,              // dynamicOffsetCount
    NULL            // pDynamicOffsets
);

Our buffer now currently looks like the following:

![descriptor_dynamic_offset_example_a.png](_images/descriptor_dynamic_offset_example_a.png)

Next, a 8 byte dynamic offset will applied at bind time.

uint32_t offsets[1] = { 8 };
vkCmdBindDescriptorSets(
    1,              // descriptorSetCount,
    &descriptorSet, // pDescriptorSets,
    1,              // dynamicOffsetCount
    offsets         // pDynamicOffsets
);

Our buffer currently looks like the following:

![descriptor_dynamic_offset_example_b.png](_images/descriptor_dynamic_offset_example_b.png)

This time the `VK_WHOLE_SIZE` value will be used for the range. Everything looks the same as the above example except the `VkDescriptorBufferInfo::range`

VkDescriptorSet descriptorSet; // allocated
VkBuffer buffer; // size of 32 bytes

VkDescriptorBufferInfo info = {
    buffer,
    4,             // offset
    VK_WHOLE_SIZE  // range
};

VkWriteDescriptorSet writeInfo = {
    .dstSet = descriptorSet,
    .descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC,
    .pBufferInfo = bufferInfo
};

vkUpdateDescriptorSets(
    1,         // descriptorWriteCount,
    &writeInfo // pDescriptorWrites,
);

// No dynamic offset
vkCmdBindDescriptorSets(
    1,              // descriptorSetCount,
    &descriptorSet, // pDescriptorSets,
    0,              // dynamicOffsetCount
    NULL            // pDynamicOffsets
);

Our buffer currently looks like the following:

![descriptor_dynamic_offset_example_c.png](_images/descriptor_dynamic_offset_example_c.png)

This time, if we attempt to apply a dynamic offset it will be met with undefined behavior and the [validation layers will give an error](https://github.com/KhronosGroup/Vulkan-ValidationLayers/issues/2846)

// Invalid
uint32_t offsets[1] = { 8 };
vkCmdBindDescriptorSets(
    1,              // descriptorSetCount,
    &descriptorSet, // pDescriptorSets,
    1,              // dynamicOffsetCount
    offsets         // pDynamicOffsets
);

This is what it looks like with the invalid dynamic offset

![descriptor_dynamic_offset_example_d.png](_images/descriptor_dynamic_offset_example_d.png)

It is important to also check the `minUniformBufferOffsetAlignment` and `minStorageBufferOffsetAlignment` as both the base offset and dynamic offset must be multiples of these limits.
