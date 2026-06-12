# Descriptor buffers

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/descriptor_buffer_basic/README.html

## Table of Contents

- [Overview](#_overview)
- [Deprecated descriptor bindings](#_deprecated_descriptor_bindings)
- [Deprecated_descriptor_bindings](#_deprecated_descriptor_bindings)
- [The new way](#_the_new_way)
- [The_new_way](#_the_new_way)
- [Creating the descriptor buffers](#_creating_the_descriptor_buffers)
- [Creating_the_descriptor_buffers](#_creating_the_descriptor_buffers)
- [Putting the descriptors into the buffers](#_putting_the_descriptors_into_the_buffers)
- [Putting_the_descriptors_into_the_buffers](#_putting_the_descriptors_into_the_buffers)
- [Binding the buffers](#_binding_the_buffers)
- [Binding_the_buffers](#_binding_the_buffers)
- [What about the shaders?](#_what_about_the_shaders)
- [What_about_the_shaders?](#_what_about_the_shaders)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/descriptor_buffer_basic). |
| --- | --- |

Binding and managing descriptors in Vulkan can become pretty complex, both for the application and the driver.
With the [`VK_EXT_descriptor_buffer`](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#VK_ext_descriptor_buffer) extension, this interface is simplified and maps more directly to how hardware sees descriptors.
It also simplifies the programming model, as you no longer have to create descriptor pool upfront.

This sample shows how to use that extension by rendering multiple objects with different uniform buffers and images using the new interface of creating and binding descriptors.

Creating and binding descriptors in Vulkan requires different steps and function calls.

After all, descriptors are just memory, and something like a `VkDescriptorPool` was an abstract concept that didn’t actually map to hardware.
On most implementations `vkCreateDescriptorPool` did nothing more than just a memory allocation.
Same for `vkAllocateDescriptorSets`, which in the end is also just some sort of memory allocation, while `vkUpdateDescriptorSets` did some memory copies for the descriptors to that buffer.

With the streamlined descriptor setup from `VK_EXT_descriptor_buffer`, the api now maps more closely to this and removes the need for the following functions:

* 
vkCreateDescriptorPool

* 
vkAllocateDescriptorSets

* 
vkUpdateDescriptorSets

* 
vkCmdBindDescriptorSets

Other concepts of Vulkan’s descriptor logic like descriptor set layouts and pipeline layouts are still used and not deprecated.

The `VK_EXT_descriptor_buffer` replaces all of this with **resource descriptor buffer**.
These store descriptors in a way that the GPU can directly read them from such a buffer.
The application simply puts them into those buffers.
That buffer is then bound at command buffer recording time similar to other buffer types.

To make the following code easier to understand, let’s take a look at the interfaces of our shaders:

// Vertex shader
layout (set = 0, binding = 0) uniform UBOScene {
    mat4 projection;
    mat4 view;
} uboCamera;

layout (set = 1, binding = 0) uniform UBOModel {
    mat4 local;
} uboModel;

// Fragment shader
layout (set = 2, binding = 0) uniform sampler2D samplerColorMap;

We use three descriptor sets, each with one binding.

Descriptors are now stored in and accessed from memory, so instead of having to use the old approach of creating dedicated Vulkan objects, we create buffers that will store descriptors instead.

The extension introduces two different types of descriptors: Resource descriptors for buffers (uniform buffers, shader storage buffers) and sampler/combined image sampler descriptors.
In this sample we’ll be using both types, so we create two different buffers.

As is usual in Vulkan, implementations have different size and alignment requirements. Alignment requirements for setting offsets in the descriptor buffer with `vkCmdSetDescriptorBufferOffsetsEXT` are defined by `VkPhysicalDeviceDescriptorBufferPropertiesEXT::descriptorBufferOffsetAlignment`. At the start of the example we fetch that information into `descriptor_buffer_properties`.

VkPhysicalDeviceProperties2KHR device_properties{};
descriptor_buffer_properties.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_PROPERTIES_EXT;
device_properties.sType            = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2_KHR;
device_properties.pNext            = &descriptor_buffer_properties;
vkGetPhysicalDeviceProperties2KHR(get_device().get_gpu().get_handle(), &device_properties);

So to calculate the actual buffer sizes required to store the descriptors, we need to get the sizes of set layouts and also align them to `VkPhysicalDeviceDescriptorBufferPropertiesEXT::descriptorBufferOffsetAlignment`. We also need to fetch offsets of the descriptor bindings of a set layout as by the Vulkan specs size of the set layout is at least a sum of sizes of descriptor bindings of this layout but it can be higher than that and there are no guarantees about the layout of descriptor bindings in a descriptor set layout, meaning that first descriptor binding of a set can start exactly at the beginning of a set layout memory or it can start with non 0 offset if driver implementation puts some metadata there.

// Get set layout descriptor sizes.
vkGetDescriptorSetLayoutSizeEXT(get_device().get_handle(), uniform_binding_descriptor.layout, &uniform_binding_descriptor.size);
vkGetDescriptorSetLayoutSizeEXT(get_device().get_handle(), image_binding_descriptor.layout, &image_binding_descriptor.size);

// Adjust set layout sizes to satisfy alignment requirements.
uniform_binding_descriptor.size = aligned_size(uniform_binding_descriptor.size, descriptor_buffer_properties.descriptorBufferOffsetAlignment);
image_binding_descriptor.size = aligned_size(image_binding_descriptor.size, descriptor_buffer_properties.descriptorBufferOffsetAlignment);

// Get descriptor bindings offsets as descriptors are placed inside set layout by those offsets.
vkGetDescriptorSetLayoutBindingOffsetEXT(get_device().get_handle(), uniform_binding_descriptor.layout, 0u, &uniform_binding_descriptor.offset);
vkGetDescriptorSetLayoutBindingOffsetEXT(get_device().get_handle(), image_binding_descriptor.layout, 0u, &image_binding_descriptor.offset);

Creating the resource descriptors for the uniform buffers using the `VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT` usage flag:

uniform_binding_descriptor.buffer = std::make_unique(get_device(),
	                                                                    (static_cast(cubes.size()) + 1) * uniform_binding_descriptor.size,
	                                                                    VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT | VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT,
	                                                                    VMA_MEMORY_USAGE_CPU_TO_GPU);

Creating the combined image sampler descriptors by additionally adding the `VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT` usage flag:

image_binding_descriptor.buffer = std::make_unique(get_device(),
	                                                                  static_cast(cubes.size()) * image_binding_descriptor.size,
	                                                                  VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT | VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT | VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT,
	                                                                  VMA_MEMORY_USAGE_CPU_TO_GPU);

After creating the appropriate buffers we now put the actual descriptors into those buffers, making them accessible to the GPU.
This is done with the `vkGetDescriptorEXT` function.

The sample uses one global uniform buffer that stores the scene matrices, one uniform buffer per object displayed and one combined image sampler per object.

For resource descriptor buffers, we can simply put buffer device addresses into it.
No need for descriptors, as the GPU only needs to know the address of the buffers to access them:

char *uniform_descriptor_buf_ptr = (char *) resource_descriptor_buffer->get_data();

// Global matrices uniform buffer
VkDescriptorAddressInfoEXT addr_info = {VK_STRUCTURE_TYPE_DESCRIPTOR_ADDRESS_INFO_EXT};
addr_info.address                    = uniform_buffers.scene->get_device_address();
addr_info.range                      = uniform_buffers.scene->get_size();
addr_info.format                     = VK_FORMAT_UNDEFINED;

VkDescriptorGetInfoEXT buffer_descriptor_info{VK_STRUCTURE_TYPE_DESCRIPTOR_GET_INFO_EXT};
buffer_descriptor_info.type                = VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER;
buffer_descriptor_info.data.pUniformBuffer = &addr_info;
vkGetDescriptorEXT(get_device().get_handle(), &buffer_descriptor_info, descriptor_buffer_properties.uniformBufferDescriptorSize, uniform_descriptor_buf_ptr);

// Per-cube uniform buffers
// We use pointers to offset and align the data we put into the descriptor buffers
for (size_t i = 0; i get_device_address();
	cube_addr_info.range                      = cubes[i].uniform_buffer->get_size();
	cube_addr_info.format                     = VK_FORMAT_UNDEFINED;

	buffer_descriptor_info.data.pUniformBuffer = &cube_addr_info;
	vkGetDescriptorEXT(get_device().get_handle(), &buffer_descriptor_info, descriptor_buffer_properties.uniformBufferDescriptorSize, uniform_descriptor_buf_ptr + (i + 1) * uniform_binding_descriptor.size + uniform_binding_descriptor.offset);
}

For combined image samplers (or samplers alone) we can’t use buffer device addresses as the implementation needs more information, so we have to put actual descriptors into the buffer instead:

// For combined images we need to put descriptors into the descriptor buffers
// We use pointers to offset and align the data we put into the descriptor buffers
char *image_descriptor_buf_ptr = (char *) image_binding_descriptor.buffer->get_data();
for (size_t i = 0; i 

As noted earlier, we no longer bind descriptor sets using `vkCmdBindDescriptorSets` but instead use `vkCmdBindDescriptorBuffersEXT` to bind the (resource) descriptor buffers and then use `vkCmdSetDescriptorBufferOffsetsEXT` to index into that buffer for the next draw:

// Descriptor buffer bindings
// Binding 0 = uniform buffer
VkDescriptorBufferBindingInfoEXT descriptor_buffer_binding_info[2]{};
descriptor_buffer_binding_info[0].sType   = VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT;
descriptor_buffer_binding_info[0].address = resource_descriptor_buffer->get_device_address();
descriptor_buffer_binding_info[0].usage   = VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT;
// Binding 1 = Image
descriptor_buffer_binding_info[1].sType   = VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT;
descriptor_buffer_binding_info[1].address = image_descriptor_buffer->get_device_address();
descriptor_buffer_binding_info[1].usage   = VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT | VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT;
vkCmdBindDescriptorBuffersEXT(draw_cmd_buffers[i], 2, descriptor_buffer_binding_info);

uint32_t     buffer_index_ubo   = 0;
uint32_t     buffer_index_image = 1;

// Global Matrices (set 0)
vkCmdSetDescriptorBufferOffsetsEXT(draw_cmd_buffers[i], VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline_layout, 0, 1, &buffer_index_ubo, &buffer_offset);

// Set and offset into descriptor for each model
for (size_t j = 0; j 

In detail and in reference to our shader interface:

Earlier on, we did put the device address for the global matrices uniform buffer at the beginning to the resource descriptor buffer.
So we set it to point at `buffer_offset = 0` for set 0:

vkCmdSetDescriptorBufferOffsetsEXT(draw_cmd_buffers[i], VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline_layout, 0, 1, &buffer_index_ubo, &buffer_offset);

We then loop through all cubes displayed in the example and let the descriptor buffer point at the next device address using the alignment of the implementation for set 1:

vkCmdSetDescriptorBufferOffsetsEXT(draw_cmd_buffers[i], VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline_layout, 1, 1, &buffer_index_ubo, &buffer_offset);

With an alignment of 16 (see `VkPhysicalDeviceDescriptorBufferPropertiesEXT`) the device address for the uniform buffer for the first cube would start at byte 16 in the resource descriptor buffer, the device address for the second cube’s uniform buffer would start at byte 32.

The descriptor buffer containing the descriptors for our combined image samples is bound to set 2:

vkCmdSetDescriptorBufferOffsetsEXT(draw_cmd_buffers[i], VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline_layout, 2, 1, &buffer_index_image, &buffer_offset);

With descriptor set and pipeline layouts, Vulkan decouples the shader interfaces from the application.
And since we don’t change these but only the way how we provide descriptors to the GPU, **no changes to the shaders are required**.
