# Buffer Array Length (OpArrayLength)

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/buffer_array_length.html

## Table of Contents

- [When is OpArrayLength allowed](#_when_is_oparraylength_allowed)
- [When_is_OpArrayLength_allowed](#_when_is_oparraylength_allowed)
- [How is the length calculated](#_how_is_the_length_calculated)
- [How_is_the_length_calculated](#_how_is_the_length_calculated)
- [Using with Descriptor Buffers](#_using_with_descriptor_buffers)
- [Using_with_Descriptor_Buffers](#_using_with_descriptor_buffers)
- [Using with Descriptor Heaps](#_using_with_descriptor_heaps)
- [Using_with_Descriptor_Heaps](#_using_with_descriptor_heaps)

## Content

Sometimes when writing your shader you might not know the length of the array in your buffer. To solve this there is a `OpArrayLength` operation in SPIR-V that can be used to query the size at runtime.

The following [GLSL](https://godbolt.org/z/jbqq65cK5),
[HLSL](https://godbolt.org/z/7jKr5Pdqz), and
[Slang](https://godbolt.org/z/x7YW4rbsq) all demonstrate how you can get the length of a `VK_DESCRIPTOR_TYPE_STORAGE_BUFFER`.

layout(set = 0, binding = 0) buffer StorageBuffer {
    uint header;
    uint payload[]; // Run-time sized array
};

uint count = payload.length();

There are few restrictions to `OpArrayLength`.

First, it must be used with a runtime array (`OpTypeRuntimeArray`). Shading languages can detect length of a static array already.

Second, it must be in a struct, this [prevents you](https://godbolt.org/z/4h4bn6oW3) from getting the length of a runtime descriptor array.

**The short answer** is `OpArrayLength` is only allowed for a **Storage Buffer**, and it must be the **last element** of the struct.

|  | While `VK_EXT_shader_uniform_buffer_unsized_array` allows runtime arrays in a Uniform Buffer, `OpArrayLength` is banned on it. |
| --- | --- |

The answer is really simple, whatever you bound!

So imagine we have a single `VkBuffer` that is 1024 bytes and we use it for all 3 SSBO in your shader like

layout(binding = 0) buffer StorageBuffer_A {
    uint a[];
};
layout(binding = 1) buffer StorageBuffer_B {
    uint b[];
};
layout(binding = 2) buffer StorageBuffer_C {
    uint c[];
};

and when we update our descriptors we go

VkWriteDescriptorSet writes[3];
writes[0].binding = 0;
writes[0].pBufferInfo->buffer = my_buffer;
writes[0].pBufferInfo->range = 64; // bytes bound

writes[1].binding = 1;
writes[1].pBufferInfo->buffer = my_buffer;
writes[1].pBufferInfo->range = 257; // not a full uint

writes[2].binding = 2;
writes[2].pBufferInfo->buffer = my_buffer;
writes[2].pBufferInfo->range = VK_WHOLE_SIZE;

vkUpdateDescriptorSets(3, writes);

The shader code can now at runtime detect the length of the array.

a.length() == 64 / sizeof(uint);
b.length() == 256 / sizeof(uint); // The driver will round down as it is invalid to access a partially bound item
c.length() == 1024 / sizeof(uint);

For those using [VK_EXT_descriptor_buffer](descriptor_buffer.html) the size bound is not decided with `vkUpdateDescriptorSets`, but instead with `vkGetDescriptorEXT`.

VkDescriptorGetInfoEXT info;
info.type = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER;
info.data.pStorageBuffer->range = 256; // bytes bound
vkGetDescriptorEXT(info)

For those using [VK_EXT_descriptor_heap](descriptor_heap.html) the size bound is not decided with `vkUpdateDescriptorSets`, but instead with `vkWriteResourceDescriptorsEXT`.

VkResourceDescriptorInfoEXT resources;
resources.type = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER;
resources.data.pAddressRange->size = 256; // bytes bound
vkWriteResourceDescriptorsEXT(&resources)

When using `VK_EXT_descriptor_heap` it is also important to realize you are not allowed to use `OpArrayLength` with `VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT`, `VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT`, or `VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT` mappings.

Something like `VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT` allows you to basically use an inlined Storage Buffer. In these scenarios, because the range is now just a raw GPU address, the driver cannot reliably calculate the length of the resource.
