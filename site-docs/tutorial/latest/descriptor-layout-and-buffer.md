# Descriptor layout and buffer

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/05_Uniform_buffers/00_Descriptor_set_layout_and_buffer.html

## Table of Contents

- [Introduction](#_introduction)
- [Vertex shader](#_vertex_shader)
- [Descriptor set layout](#_descriptor_set_layout)
- [Descriptor_set_layout](#_descriptor_set_layout)
- [Uniform buffer](#_uniform_buffer)
- [Updating uniform data](#_updating_uniform_data)
- [Updating_uniform_data](#_updating_uniform_data)

## Content

We’re now able to pass arbitrary attributes to the vertex shader for each vertex, but what about global variables?
We’re going to move on to 3D graphics from this chapter on, and that requires a model-view-projection matrix.
We could include it as vertex data, but that’s a waste of memory, and it would require us to update the vertex buffer whenever the transformation changes.
The transformation could easily change every single frame.

The right way to tackle this in Vulkan is to use *resource descriptors*.
A descriptor is a way for shaders to freely access resources like buffers and images.
We’re going to set up a buffer that contains the transformation matrices and have the vertex shader access them through a descriptor.
Usage of descriptors consists of three parts:

* 
Specify a descriptor set layout during pipeline creation

* 
Allocate a descriptor set from a descriptor pool

* 
Bind the descriptor set during rendering

The *descriptor set layout* specifies the types of resources that are going to be accessed by the pipeline, just like a render pass specifies the types of attachments that will be accessed.
A *descriptor set* specifies the actual buffer or image resources that will be bound to the descriptors, just like a framebuffer specifies the actual image views to bind to render pass attachments.
The descriptor set is then bound for the drawing commands just like the vertex buffers and framebuffer.

There are many types of descriptors, but in this chapter we’ll work with uniform buffer objects (UBO).
We’ll look at other types of descriptors in future chapters, but the basic process is the same.
Let’s say we have the data we want the vertex shader to have in a C struct like this:

struct UniformBufferObject {
    glm::mat4 model;
    glm::mat4 view;
    glm::mat4 proj;
};

Then we can copy the data to a `VkBuffer` and access it through a uniform buffer object descriptor from the vertex shader like this:

struct VSInput {
    float2 inPosition;
    float3 inColor;
};

struct UniformBuffer {
    float4x4 model;
    float4x4 view;
    float4x4 proj;
};
ConstantBuffer ubo;

struct VSOutput
{
    float4 pos : SV_Position;
    float3 color;
};

[shader("vertex")]
VSOutput vertMain(VSInput input) {
    VSOutput output;
    output.pos = mul(ubo.proj, mul(ubo.view, mul(ubo.model, float4(input.inPosition, 0.0, 1.0))));
    output.color = input.inColor;
    return output;
}

We’re going to update the model, view and projection matrices every frame to make the rectangle from the previous chapter spin around in 3D.

Modify the vertex shader to include the uniform buffer object like it was specified above.
I will assume that you are familiar with MVP transformations.
If you’re not, see [the resource](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/) mentioned in the first chapter.

struct VSInput {
    float2 inPosition;
    float3 inColor;
};

struct UniformBuffer {
    float4x4 model;
    float4x4 view;
    float4x4 proj;
};
ConstantBuffer ubo;

struct VSOutput
{
    float4 pos : SV_Position;
    float3 color;
};

[shader("vertex")]
VSOutput vertMain(VSInput input) {
    VSOutput output;
    output.pos = mul(ubo.proj, mul(ubo.view, mul(ubo.model, float4(input.inPosition, 0.0, 1.0))));
    output.color = input.inColor;
    return output;
}

[shader("fragment")]
float4 fragMain(VSOutput vertIn) : SV_TARGET {
    return float4(vertIn.color, 1.0);
}

The line with `SV_Position` is changed to use the transformations to compute
the final position in clip coordinates.
Unlike the 2D triangles, the last component of the clip coordinates may not be `1`, which will result in a division when converted to the final normalized device coordinates on the screen.
This is used in perspective projection as the *perspective division* and is essential for making closer objects look larger than objects that are further away.

The next step is to define the UBO on the C++ side and to tell Vulkan about this descriptor in the vertex shader.

struct UniformBufferObject {
    glm::mat4 model;
    glm::mat4 view;
    glm::mat4 proj;
};

We can exactly match the definition in the shader using data types in GLM.
The data in the matrices is binary compatible with the way the shader expects it, so we can later just `memcpy` a `UniformBufferObject` to a `VkBuffer`.

We need to provide details about every descriptor binding used in the shaders for pipeline creation, just like we had to do for every vertex attribute and its `location` index.
We’ll set up a new function to define all of this information called `createDescriptorSetLayout`.
It should be called right before pipeline creation, because we’re going to need it there.

void initVulkan() {
    ...
    createDescriptorSetLayout();
    createGraphicsPipeline();
    ...
}

...

void createDescriptorSetLayout() {

}

Every binding needs to be described through a `VkDescriptorSetLayoutBinding` struct.

void createDescriptorSetLayout() {
    vk::DescriptorSetLayoutBinding uboLayoutBinding(0, vk::DescriptorType::eUniformBuffer, 1, vk::ShaderStageFlagBits::eVertex, nullptr);
}

The first two fields specify the `binding` used in the shader and the type of descriptor, which is a uniform buffer object.
It is possible for the shader variable to represent an array of uniform buffer objects, and `descriptorCount` specifies the number of values in the array.
This could be used to specify a transformation for each of the bones in a skeleton for skeletal animation, for example.
Our MVP transformation is in a single uniform buffer object, so we’re using a `descriptorCount` of `1`.

We also need to specify in which shader stages the descriptor is going to be referenced.
The `stageFlags` field can be a combination of `VkShaderStageFlagBits` values or the value `VK_SHADER_STAGE_ALL_GRAPHICS`.
In our case, we’re only referencing the descriptor from the vertex shader.

The `pImmutableSamplers` field is only relevant for image sampling related descriptors, which we’ll look at later.
You can leave this to its default value.

All the descriptor bindings are combined into a single `VkDescriptorSetLayout` object.
Define a new class member above `pipelineLayout`:

vk::raii::DescriptorSetLayout descriptorSetLayout = nullptr;
vk::raii::PipelineLayout pipelineLayout = nullptr;

We can then create it using `vkCreateDescriptorSetLayout`.
This function accepts a simple `VkDescriptorSetLayoutCreateInfo` with the array of bindings:

vk::DescriptorSetLayoutBinding uboLayoutBinding(0, vk::DescriptorType::eUniformBuffer, 1, vk::ShaderStageFlagBits::eVertex, nullptr);
vk::DescriptorSetLayoutCreateInfo layoutInfo{.bindingCount = 1, .pBindings = &uboLayoutBinding};
descriptorSetLayout = vk::raii::DescriptorSetLayout(device, layoutInfo);

We need to specify the descriptor set layout during pipeline creation to tell Vulkan which descriptors the shaders will be using.
Descriptor set layouts are specified in the pipeline layout object.
Modify the `VkPipelineLayoutCreateInfo` to reference the layout object:

vk::PipelineLayoutCreateInfo pipelineLayoutInfo{ .setLayoutCount = 1, .pSetLayouts = &*descriptorSetLayout, .pushConstantRangeCount = 0 };

You may be wondering why it’s possible to specify multiple descriptor set layouts here, because a single one already includes all of the bindings.
We’ll get back to that in the next chapter, where we’ll look into descriptor pools and descriptor sets.

In the next chapter we’ll specify the buffer that contains the UBO data for the shader, but we need to create this buffer first.
We’re going to copy new data to the uniform buffer every frame, so it doesn’t really make any sense to have a staging buffer.
It would just add extra overhead in this case and likely degrade performance instead of improving it.

We should have multiple buffers, because multiple frames may be in flight at the same time and we don’t want to update the buffer in preparation of the next frame while a previous one is still reading from it!
Thus, we need to have as many uniform buffers as we have frames in flight, and write to a uniform buffer that is not currently being read by the GPU.

To that end, add new class members for `uniformBuffers`, and `uniformBuffersMemory`:

vk::raii::Buffer indexBuffer = nullptr;
vk::raii::DeviceMemory indexBufferMemory = nullptr;

std::vector uniformBuffers;
std::vector uniformBuffersMemory;
std::vector uniformBuffersMapped;

Similarly, create a new function `createUniformBuffers` that is called after `createIndexBuffer` and allocates the buffers:

void initVulkan() {
    ...
    createVertexBuffer();
    createIndexBuffer();
    createUniformBuffers();
    ...
}

...

void createUniformBuffers() {
    uniformBuffers.clear();
    uniformBuffersMemory.clear();
    uniformBuffersMapped.clear();

    for (size_t i = 0; i 

We map the buffer right after creation using `vkMapMemory` to get a pointer to which we can write the data later on.
The buffer stays mapped to this pointer for the application’s whole lifetime.
This technique is called **"persistent mapping"** and works on all Vulkan implementations.
Not having to map the buffer every time we need to update it increases performances, as mapping is not free.

Create a new function `updateUniformBuffer` and add a call to it from the `drawFrame` function before submitting the next frame:

void drawFrame() {
    ...

    updateUniformBuffer(frameIndex);

    ...

		const vk::SubmitInfo   submitInfo{.waitSemaphoreCount   = 1,
		                                  .pWaitSemaphores      = &*presentCompleteSemaphores[frameIndex],
		                                  .pWaitDstStageMask    = &waitDestinationStageMask,
		                                  .commandBufferCount   = 1,
		                                  .pCommandBuffers      = &*commandBuffers[frameIndex],
		                                  .signalSemaphoreCount = 1,
		                                  .pSignalSemaphores    = &*renderFinishedSemaphores[imageIndex]};

    ...
}

...

void updateUniformBuffer(uint32_t currentImage) {

}

This function will generate a new transformation every frame to make the geometry spin around.
We need to include two new headers to implement this functionality:

#include 
#include 

#include 

The `glm/gtc/matrix_transform.hpp` header exposes functions that can be used to generate model transformations like `glm::rotate`, view transformations like `glm::lookAt` and projection transformations like `glm::perspective`.

The `chrono` standard library header exposes functions to do precise timekeeping.
We’ll use this to make sure that the geometry rotates 90 degrees per second regardless of frame rate.

void updateUniformBuffer(uint32_t currentImage) {
    static auto startTime = std::chrono::high_resolution_clock::now();

    auto currentTime = std::chrono::high_resolution_clock::now();
    float time = std::chrono::duration(currentTime - startTime).count();
}

The `updateUniformBuffer` function will start out with some logic to calculate the time in seconds since rendering has started with floating point accuracy.

We will now define the model, view and projection transformations in the uniform buffer object.
The model rotation will be a simple rotation around the Z-axis using the `time` variable:

UniformBufferObject ubo{};
ubo.model = rotate(glm::mat4(1.0f), time * glm::radians(90.0f), glm::vec3(0.0f, 0.0f, 1.0f));

The `glm::rotate` function takes an existing transformation, rotation angle and rotation axis as parameters.
The `glm::mat4(1.0f)` constructor returns an identity matrix.
Using a rotation angle of `time * glm::radians(90.0f)` accomplishes the purpose of rotation 90 degrees per second.

ubo.view = lookAt(glm::vec3(2.0f, 2.0f, 2.0f), glm::vec3(0.0f, 0.0f, 0.0f), glm::vec3(0.0f, 0.0f, 1.0f));

For the view transformation I’ve decided to look at the geometry from above at a 45 degree angle.
The `glm::lookAt` function takes the eye position, center position and up axis as parameters.

ubo.proj = glm::perspective(glm::radians(45.0f), static_cast(swapChainExtent.width) / static_cast(swapChainExtent.height), 0.1f, 10.0f);

I’ve chosen to use a perspective projection with a 45 degree vertical field-of-view.
The other parameters are the aspect ratio, near and far view planes.
It is important to use the current swap chain extent to calculate the aspect ratio to take into account the new width and height of the window after a resize.

ubo.proj[1][1] *= -1;

GLM was originally designed for OpenGL, where the Y coordinate of the clip coordinates is inverted.
The easiest way to compensate for that is to flip the sign on the scaling factor of the Y axis in the projection matrix.
If you don’t do this, then the image will be rendered upside down.

All of the transformations are defined now, so we can copy the data in the uniform buffer object to the current uniform buffer.
This happens in exactly the same way as we did for vertex buffers, except without a staging buffer.
As noted earlier, we only map the uniform buffer once, so we can directly write to it without having to map again:

memcpy(uniformBuffersMapped[currentImage], &ubo, sizeof(ubo));

Using a UBO this way is not the most efficient way to pass frequently changing values to the shader.
A more efficient way to pass a small buffer of data to shaders is *push constants*.
We may look at these in a future chapter.

In the [next chapter](01_Descriptor_pool_and_sets.html) we’ll look at descriptor sets, which will actually bind the `VkBuffer`s to the uniform buffer descriptors so that the shader can access this transformation data.

[C++ code](../_attachments/22_descriptor_layout.cpp) /
[slang shader](../_attachments/22_shader_ubo.slang) /
[GLSL Vertex shader](../_attachments/22_shader_ubo.vert) /
[GLSL Fragment shader](../_attachments/22_shader_ubo.frag)
