# Rendering Multiple Objects

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/16_Multiple_Objects.html

## Table of Contents

- [Introduction](#_introduction)
- [Overview](#_overview)
- [Implementation](#_implementation)
- [Define a GameObject Structure](#_define_a_gameobject_structure)
- [Define_a_GameObject_Structure](#_define_a_gameobject_structure)
- [Create an Array of GameObjects](#_create_an_array_of_gameobjects)
- [Create_an_Array_of_GameObjects](#_create_an_array_of_gameobjects)
- [Initialize the GameObjects](#_initialize_the_gameobjects)
- [Initialize_the_GameObjects](#_initialize_the_gameobjects)
- [Create Uniform Buffers for Each Object](#_create_uniform_buffers_for_each_object)
- [Create_Uniform_Buffers_for_Each_Object](#_create_uniform_buffers_for_each_object)
- [Update the Descriptor Pool Size](#_update_the_descriptor_pool_size)
- [Update_the_Descriptor_Pool_Size](#_update_the_descriptor_pool_size)
- [Create Descriptor Sets for Each Object](#_create_descriptor_sets_for_each_object)
- [Create_Descriptor_Sets_for_Each_Object](#_create_descriptor_sets_for_each_object)
- [Update Uniform Buffers for All Objects](#_update_uniform_buffers_for_all_objects)
- [Update_Uniform_Buffers_for_All_Objects](#_update_uniform_buffers_for_all_objects)
- [Modify the Command Buffer Recording](#_modify_the_command_buffer_recording)
- [Modify_the_Command_Buffer_Recording](#_modify_the_command_buffer_recording)
- [Performance Considerations](#_performance_considerations)
- [Conclusion](#_conclusion)

## Content

In this chapter, we’ll extend our Vulkan application to render multiple objects in the scene. So far, we’ve been rendering a single model, but real-world applications typically need to display many objects. This tutorial will show you how to efficiently manage and render multiple objects while reusing as many resources as possible.

When rendering multiple objects, we need to consider which resources should be:
1. **Shared across all objects** - to minimize memory usage and state changes
2. **Duplicated for each object** - to allow for independent positioning and appearance

Here’s a quick reference for what typically falls into each category:

**Shared resources:**

* 
Vertex and index buffers (when objects use the same mesh)

* 
Textures and samplers (when objects use the same textures)

* 
Pipeline objects and pipeline layouts

* 
Render passes

* 
Command pools

**Per-object resources:**

* 
Transformation matrices (position, rotation, scale)

* 
Uniform buffers containing those matrices

* 
Descriptor sets that reference those uniform buffers

* 
Push constants (for small, frequently changing data)

Let’s walk through the key changes needed to render multiple objects:

First, we’ll create a structure to hold per-object data:

// Define a structure to hold per-object data
struct GameObject {
    // Transform properties
    glm::vec3 position = {0.0f, 0.0f, 0.0f};
    glm::vec3 rotation = {0.0f, 0.0f, 0.0f};
    glm::vec3 scale = {1.0f, 1.0f, 1.0f};

    // Uniform buffer for this object (one per frame in flight)
    std::vector uniformBuffers;
    std::vector uniformBuffersMemory;
    std::vector uniformBuffersMapped;

    // Descriptor sets for this object (one per frame in flight)
    std::vector descriptorSets;

    // Calculate model matrix based on position, rotation, and scale
    glm::mat4 getModelMatrix() const {
        glm::mat4 model = glm::mat4(1.0f);
        model = glm::translate(model, position);
        model = glm::rotate(model, rotation.x, glm::vec3(1.0f, 0.0f, 0.0f));
        model = glm::rotate(model, rotation.y, glm::vec3(0.0f, 1.0f, 0.0f));
        model = glm::rotate(model, rotation.z, glm::vec3(0.0f, 0.0f, 1.0f));
        model = glm::scale(model, scale);
        return model;
    }
};

This structure encapsulates:

* 
The object’s transform (position, rotation, scale)

* 
Per-object uniform buffers (one for each frame in flight)

* 
Per-object descriptor sets (one for each frame in flight)

* 
A helper method to calculate the model matrix

In our application class, we’ll replace the single set of uniform buffers and descriptor sets with an array of GameObjects:

// Define the number of objects to render
constexpr int MAX_OBJECTS = 3;

// In the VulkanApplication class:
// Array of game objects to render
std::array gameObjects;

We’ll add a new method to set up our game objects with different positions, rotations, and scales:

// Initialize the game objects with different positions, rotations, and scales
void setupGameObjects() {
    // Object 1 - Center
    gameObjects[0].position = {0.0f, 0.0f, 0.0f};
    gameObjects[0].rotation = {0.0f, 0.0f, 0.0f};
    gameObjects[0].scale = {1.0f, 1.0f, 1.0f};

    // Object 2 - Left
    gameObjects[1].position = {-2.0f, 0.0f, -1.0f};
    gameObjects[1].rotation = {0.0f, glm::radians(45.0f), 0.0f};
    gameObjects[1].scale = {0.75f, 0.75f, 0.75f};

    // Object 3 - Right
    gameObjects[2].position = {2.0f, 0.0f, -1.0f};
    gameObjects[2].rotation = {0.0f, glm::radians(-45.0f), 0.0f};
    gameObjects[2].scale = {0.75f, 0.75f, 0.75f};
}

This method is called from `initVulkan()` after loading the model but before creating uniform buffers.

Instead of creating a single set of uniform buffers, we’ll create them for each object:

// Create uniform buffers for each object
void createUniformBuffers() {
    // For each game object
    for (auto& gameObject : gameObjects) {
        gameObject.uniformBuffers.clear();
        gameObject.uniformBuffersMemory.clear();
        gameObject.uniformBuffersMapped.clear();

        // Create uniform buffers for each frame in flight
        for (size_t i = 0; i 

We need to increase the descriptor pool size to accommodate all objects:

void createDescriptorPool() {
    // We need MAX_OBJECTS * MAX_FRAMES_IN_FLIGHT descriptor sets
    std::array poolSize {
        vk::DescriptorPoolSize(vk::DescriptorType::eUniformBuffer, MAX_OBJECTS * MAX_FRAMES_IN_FLIGHT),
        vk::DescriptorPoolSize(vk::DescriptorType::eCombinedImageSampler, MAX_OBJECTS * MAX_FRAMES_IN_FLIGHT)
    };
    vk::DescriptorPoolCreateInfo poolInfo{
        .flags = vk::DescriptorPoolCreateFlagBits::eFreeDescriptorSet,
        .maxSets = MAX_OBJECTS * MAX_FRAMES_IN_FLIGHT,
        .poolSizeCount = static_cast(poolSize.size()),
        .pPoolSizes = poolSize.data()
    };
    descriptorPool = vk::raii::DescriptorPool(device, poolInfo);
}

Similarly, we’ll create descriptor sets for each object:

void createDescriptorSets() {
    // For each game object
    for (auto& gameObject : gameObjects) {
        // Create descriptor sets for each frame in flight
        std::vector layouts(MAX_FRAMES_IN_FLIGHT, *descriptorSetLayout);
        vk::DescriptorSetAllocateInfo allocInfo{
            .descriptorPool = *descriptorPool,
            .descriptorSetCount = static_cast(layouts.size()),
            .pSetLayouts = layouts.data()
        };

        gameObject.descriptorSets.clear();
        gameObject.descriptorSets = device.allocateDescriptorSets(allocInfo);

        for (size_t i = 0; i 

We’ll modify the uniform buffer update to handle all objects:

void updateUniformBuffers() {
    static auto startTime = std::chrono::high_resolution_clock::now();
    auto currentTime = std::chrono::high_resolution_clock::now();
    float time = std::chrono::duration(currentTime - startTime).count();

    // Camera and projection matrices (shared by all objects)
    glm::mat4 view = glm::lookAt(glm::vec3(2.0f, 2.0f, 6.0f), glm::vec3(0.0f, 0.0f, 0.0f), glm::vec3(0.0f, 1.0f, 0.0f));
    glm::mat4 proj = glm::perspective(glm::radians(45.0f),
                                     static_cast(swapChainExtent.width) / static_cast(swapChainExtent.height),
                                     0.1f, 20.0f);
    proj[1][1] *= -1; // Flip Y for Vulkan

    // Update uniform buffers for each object
    for (auto& gameObject : gameObjects) {
        // Apply continuous rotation to the object
        gameObject.rotation.y += 0.001f; // Slow rotation around Y axis

        // Get the model matrix for this object
        glm::mat4 initialRotation = glm::rotate(glm::mat4(1.0f), glm::radians(-90.0f), glm::vec3(1.0f, 0.0f, 0.0f));
        glm::mat4 model = gameObject.getModelMatrix() * initialRotation;

        // Create and update the UBO
        UniformBufferObject ubo{
            .model = model,
            .view = view,
            .proj = proj
        };

        // Copy the UBO data to the mapped memory
        memcpy(gameObject.uniformBuffersMapped[frameIndex], &ubo, sizeof(ubo));
    }
}

Note that we’re sharing the view and projection matrices across all objects, but each object has its own model matrix.

Finally, we’ll update the command buffer recording to draw each object:

void recordCommandBuffer(uint32_t imageIndex) {
    // ... (beginning of the method remains the same)

    // Bind vertex and index buffers (shared by all objects)
    commandBuffers[frameIndex].bindVertexBuffers(0, *vertexBuffer, {0});
    commandBuffers[frameIndex].bindIndexBuffer(*indexBuffer, 0, vk::IndexType::eUint32);

    // Draw each object with its own descriptor set
    for (const auto& gameObject : gameObjects) {
        // Bind the descriptor set for this object
        commandBuffers[frameIndex].bindDescriptorSets(
            vk::PipelineBindPoint::eGraphics,
            *pipelineLayout,
            0,
            *gameObject.descriptorSets[frameIndex],
            nullptr
        );

        // Draw the object
        commandBuffers[frameIndex].drawIndexed(indices.size(), 1, 0, 0, 0);
    }

    // ... (end of the method remains the same)
}

When rendering multiple objects, keep these performance considerations in mind:

**Minimize state changes**: Group objects by material/texture to reduce binding changes.

**Use instancing** for many identical objects (not covered in this tutorial).

**Consider push constants** for small, frequently changing data instead of uniform buffers.

**Batch draw calls** where possible to reduce CPU overhead.

**Use indirect drawing** for large numbers of objects (not covered here).

You’ve now learned how to render multiple objects in Vulkan by:

Creating a structure to hold per-object data

Duplicating the necessary resources with (uniform buffers, descriptor sets) for each object

Sharing resources that can be reused (vertex/index buffers, pipeline, textures)

Updating the rendering loop to draw each object with its own transformation

This approach gives you the flexibility to position, rotate, and scale objects independently while maintaining good performance by sharing resources where appropriate.

In a real-world application, you might extend this system with:

* 
Object hierarchies (parent-child relationships)

* 
Different meshes and materials for different objects

* 
Frustum culling to avoid rendering objects outside the camera view

* 
Level-of-detail systems for objects at different distances

The foundation you’ve built here will serve as a solid starting point for these more advanced techniques.

[C++ code](_attachments/36_multiple_objects.cpp)
