# Descriptor Buffer

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/descriptor_buffer.html

## Table of Contents

- [Terminology Overload](#_terminology_overload)
- [The Example Shader](#_the_example_shader)
- [The_Example_Shader](#_the_example_shader)
- [Query Descriptor Set Layout Sizes](#_query_descriptor_set_layout_sizes)
- [Query_Descriptor_Set_Layout_Sizes](#_query_descriptor_set_layout_sizes)
- [Creating Descriptor Buffers](#_creating_descriptor_buffers)
- [Creating_Descriptor_Buffers](#_creating_descriptor_buffers)
- [Creating Resources](#_creating_resources)
- [Mapping Resources to the Descriptor Buffer](#_mapping_resources_to_the_descriptor_buffer)
- [Mapping_Resources_to_the_Descriptor_Buffer](#_mapping_resources_to_the_descriptor_buffer)
- [Binding Descriptor Buffers to the Command Buffer](#_binding_descriptor_buffers_to_the_command_buffer)
- [Binding_Descriptor_Buffers_to_the_Command_Buffer](#_binding_descriptor_buffers_to_the_command_buffer)
- [Binding Offsets](#_binding_offsets)
- [Draw away](#_draw_away)
- [Descriptor is actually just memory](#_descriptor_is_actually_just_memory)
- [Descriptor_is_actually_just_memory](#_descriptor_is_actually_just_memory)
- [Copying the descriptor yourself](#_copying_the_descriptor_yourself)
- [Copying_the_descriptor_yourself](#_copying_the_descriptor_yourself)
- [Copying the descriptor on the GPU](#_copying_the_descriptor_on_the_gpu)
- [Copying_the_descriptor_on_the_GPU](#_copying_the_descriptor_on_the_gpu)
- [Don’t forget to add synchronization](#_dont_forget_to_add_synchronization)
- [Don’t_forget_to_add_synchronization](#_dont_forget_to_add_synchronization)

## Content

This chapter aims to illustrate better how [VK_EXT_descriptor_buffer](https://github.com/KhronosGroup/Vulkan-Docs/blob/main/proposals/VK_EXT_descriptor_buffer.adoc) mapping of memory works.

The goal here is **not** to show a real example or recommended usage, but instead help understand how the API is mapping data to the shader, so that afterwards you can use this API in any way you want.

|  | This will only use Storage Buffers because it’s simpler to demonstrate the mappings. Samplers and images work in the same general way, but with caveats better explained in the extension proposal. |
| --- | --- |

To try and clear some terms up first:

* 
"descriptor buffers" are just `VkBuffer` created with the `VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT` flags

* 
"samplers" are `VkSampler` (`VK_DESCRIPTOR_TYPE_SAMPLER`)

* 
"resources" are all other VkDescriptorType

This could be a `VkBuffer`, which can be called a "resource buffer"

We will take a basic shader that has 3 sets, each with 3 descriptors inside of them. Each descriptor gets written a unique value.

layout (set = 0, binding = 0) buffer A { uint a; };
layout (set = 0, binding = 1) buffer B { uint b; };
layout (set = 0, binding = 2) buffer C { uint c; };

layout (set = 1, binding = 0) buffer D { uint d; };
layout (set = 1, binding = 1) buffer E { uint e; };
layout (set = 1, binding = 2) buffer F { uint f; };

layout (set = 2, binding = 0) buffer G { uint g; } array[3];

void main() {
    a = 10;
    b = 20;
    c = 30;
    d = 40;
    e = 50;
    f = 60;
    array[0].g = 70;
    array[1].g = 80;
    array[2].g = 90;
}

With this shader, we will then have 3 `VkDescriptorSetLayout` in a single pipeline that exactly matches the shader interface.

// Set 0 and 1
VkDescriptorSetLayoutBinding bindings_a[3] {
    { binding = 0, descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER, descriptorCount = 1 },
    { binding = 1, descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER, descriptorCount = 1 },
    { binding = 2, descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER, descriptorCount = 1 }
}

// Set 2
VkDescriptorSetLayoutBinding bindings_b[1] {
    { binding = 0, descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER, descriptorCount = 3 }
}

VkDescriptorSetLayout ds_layout_0(bindings_a); // Set 0
VkDescriptorSetLayout ds_layout_1(bindings_a); // Set 1
VkDescriptorSetLayout ds_layout_2(bindings_b); // Set 2
VkPipelineLayout pipeline_layout([ds_layout_0, ds_layout_1, ds_layout_2]);

Now using the `vkGetDescriptorSetLayoutSizeEXT` and `vkGetDescriptorSetLayoutBindingOffsetEXT` commands, we can get info from the driver what size it needs to properly use these `VkDescriptorSetLayout`.

|  | Don’t make the assumption that `binding 0` will be the lowest offset! The driver might sort bindings in a more optimal way such that the offsets might not be incremental as the binding numbers. |
| --- | --- |

// This could be done in an array where the set/binding are indexes used to get the size/offsets
VkDeviceSize set_0_size, set_1_size, set_2_size;
vkGetDescriptorSetLayoutSizeEXT(device, ds_layout_0, &set_0_size);
vkGetDescriptorSetLayoutSizeEXT(device, ds_layout_1, &set_1_size);
vkGetDescriptorSetLayoutSizeEXT(device, ds_layout_2, &set_2_size);

VkDeviceSize binding_0_offset, binding_1_offset, binding_2_offset;
vkGetDescriptorSetLayoutBindingOffsetEXT(device, ds_layout_0, 0, &binding_0_offset);
vkGetDescriptorSetLayoutBindingOffsetEXT(device, ds_layout_0, 1, &binding_1_offset);
vkGetDescriptorSetLayoutBindingOffsetEXT(device, ds_layout_0, 2, &binding_2_offset);

// ...

|  | While it seems we could just go `VkPhysicalDeviceDescriptorBufferPropertiesEXT::storageBufferDescriptorSize * 3` to get the size, this is wrong as the driver might have to reserve extra memory for the descriptors for the VkDescriptorSetLayout. The storageBufferDescriptorSize value is used for mapping (see below) with `vkGetDescriptorEXT`. |
| --- | --- |

We will create a "special" `VkBuffer` with `VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT` that now makes it a "descriptor buffer" `VkBuffer`.

These buffers can be large and they hold a "look up table" to your resources and samplers.

|  | The minimum required limit for `VkPhysicalDeviceDescriptorBufferPropertiesEXT::descriptorBufferAddressSpaceSize` is 128MB, but many devices can support 4GB |
| --- | --- |

For this demo, we will create two of them.

![descriptor_buffer_1.svg](_images/descriptor_buffer_1.svg)

For this demo, we will create a couple of "normal" `VkBuffer` that we will use as our resources. These are small since all the descriptors in our shader as declared as `uint`.

![descriptor_buffer_2.svg](_images/descriptor_buffer_2.svg)

Using `vkGetDescriptorEXT` we find a spot in the "descriptor buffer" and map it you our resources.

|  | You can actually use any host memory for this, but for simplicity, we will map it directly to the descriptor buffer for now. |
| --- | --- |

The following code will map the 3 of the descriptors using a single resource buffer.

// vkMapMemory()
uint8_t* descriptor_ptr = descriptor_buffer_a.GetMappedMemory();

// 64 in this example
size_t descriptor_size = VkPhysicalDeviceDescriptorBufferPropertiesEXT::storageBufferDescriptorSize;

VkDeviceAddress buffer_x_address = vkGetBufferDeviceAddress(buffer_x);

// Example results from vkGetDescriptorSetLayoutBindingOffsetEXT
VkDeviceSize binding_0_offset = 0;
VkDeviceSize binding_1_offset = 64;
VkDeviceSize binding_2_offset = 128;

VkDescriptorGetInfoEXT get_info;
get_info.type = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER;

get_info.data.pStorageBuffer->range = 4;
get_info.data.pStorageBuffer->address = buffer_x_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + binding_0_offset);

get_info.data.pStorageBuffer->address = buffer_x_address + 4;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + binding_1_offset);

get_info.data.pStorageBuffer->address = buffer_x_address + 12;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + binding_2_offset);

![descriptor_buffer_3.svg](_images/descriptor_buffer_3.svg)

We can also have each descriptor map to its own resource buffer.

// Switching descriptor buffers
descriptor_ptr = descriptor_buffer_b.GetMappedMemory();

get_info.data.pStorageBuffer->address = buffer_y1_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + binding_0_offset);

get_info.data.pStorageBuffer->address = buffer_y2_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + binding_1_offset);

get_info.data.pStorageBuffer->address = buffer_y3_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + binding_2_offset);

![descriptor_buffer_4.svg](_images/descriptor_buffer_4.svg)

And finally we can bind our last set.

size_t set_offset = 256;
assert(set_offset > set_1_size);
assert(set_offset.IsAligned(VkPhysicalDeviceDescriptorBufferPropertiesEXT::descriptorBufferOffsetAlignment));

get_info.data.pStorageBuffer->address = buffer_z0_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + set_offset + binding_0_offset);

get_info.data.pStorageBuffer->address = buffer_z1_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + set_offset + binding_1_offset);

get_info.data.pStorageBuffer->address = buffer_z2_address;
vkGetDescriptorEXT(get_info, descriptor_size, descriptor_ptr + set_offset + binding_2_offset);

![descriptor_buffer_5.svg](_images/descriptor_buffer_5.svg)

With `vkCmdBindDescriptorBuffersEXT` we will now bind the "descriptor buffer" to the command buffer.

|  | While you can create multiple descriptor buffers, there is a stricter limit how many are bound.
| --- | --- |
The validation layers will warn you if you go over limits such as `maxDescriptorBufferBindings` or `maxResourceDescriptorBufferBindings`. |

VkDescriptorBufferBindingInfoEXT binding_info[2];
binding_info[0].address = descriptor_buffer_a.Address();
binding_info[0].usage = VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT;
binding_info[1].address = descriptor_buffer_b.Address();
binding_info[1].usage = VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT;
vkCmdBindDescriptorBuffersEXT(commandbuffer, 2, binding_info);

![descriptor_buffer_6.svg](_images/descriptor_buffer_6.svg)

Next we will call `vkCmdSetDescriptorBufferOffsetsEXT` and line up the `VkDescriptorSetLayout` (from the `VkPipelineLayout`) to our descriptor buffer.

|  | Most commands recorded in a command buffer can be in any order as long as it’s in/out of a render pass, and before a draw.
| --- | --- |
`vkCmdSetDescriptorBufferOffsetsEXT` needs to be called **after** `vkCmdBindDescriptorBuffersEXT`. |

size_t set_offset = 256; // from above

uint32_t first_set = 0;
uint32_t set_count = 3;
uint32_t buffer_index[3] = {0, 1, 1};
VkDeviceSize buffer_offset[3] = {0, 0, set_offset};
vkCmdSetDescriptorBufferOffsetsEXT(commandbuffer, pipeline_bind_point, pipeline_layout, first_set, set_count, buffer_index, buffer_offset);

![descriptor_buffer_7.svg](_images/descriptor_buffer_7.svg)

That is it, from here you can just call `vkCmdDraw` (or other action commands such as `vkCmdDispatch`) and everything should be working!

![descriptor_buffer_8.svg](_images/descriptor_buffer_8.svg)

When you call `vkGetDescriptorEXT` what is really happening? The driver is actually just taking the `VkDescriptorGetInfoEXT` information and turning it into a binary blob, which even the application can read now!

// Can be used to print on your machine as well
void print_bytes(const void* memory, size_t size) {
    const uint8_t* bytes = (uint8_t*)memory;
    printf("--- (at %p) ---\n", memory);
    for (size_t i = 0; i 

So with this knowledge, we should now realize we can actually just `memcpy` the descriptor ourselves.

void* host_memory = malloc(descriptor_size);

VkDescriptorGetInfoEXT get_info;
get_info.type = VK_DESCRIPTOR_TYPE_STORAGE_BUFFER;
get_info.data.pStorageBuffer->range = 4;
get_info.data.pStorageBuffer->address = buffer_x_address;
vkGetDescriptorEXT(get_info, descriptor_size, host_memory);

void* descriptor_ptr = descriptor_buffer_a.GetMappedMemory();

memcpy(descriptor_ptr, host_memory, descriptor_size)

![descriptor_buffer_9.svg](_images/descriptor_buffer_9.svg)

So we can go another step and make our descriptor buffer not even host visible.

We can write the descriptor into a "staging" `VkBuffer` and then copy it on the GPU.

void* staging_buffer_ptr = staging_buffer.GetMappedMemory();

vkGetDescriptorEXT(get_info, descriptor_size, staging_buffer_ptr);

vkCmdCopyBuffer(srcBuffer = staging_buffer, dstBuffer = descriptor_buffer_a);

![descriptor_buffer_10.svg](_images/descriptor_buffer_10.svg)

When copying memory into your descriptor buffer, make sure to add a barrier with `VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT` to ensure that any writes will be visible by the GPU when it needs to access it!
