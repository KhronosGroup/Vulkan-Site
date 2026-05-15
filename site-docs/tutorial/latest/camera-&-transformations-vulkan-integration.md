# Camera & Transformations: Vulkan Integration

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Camera_Transformations/05_vulkan_integration.html

## Table of Contents

- [Integrating Camera with Vulkan](#_integrating_camera_with_vulkan)
- [Integrating_Camera_with_Vulkan](#_integrating_camera_with_vulkan)
- [Libraries Used in This Tutorial](#_libraries_used_in_this_tutorial)
- [Libraries_Used_in_This_Tutorial](#_libraries_used_in_this_tutorial)
- [Uniform Buffer Setup](#_uniform_buffer_setup)
- [Uniform_Buffer_Setup](#_uniform_buffer_setup)
- [Descriptor Set Layout](#_descriptor_set_layout)
- [Descriptor_Set_Layout](#_descriptor_set_layout)
- [Descriptor Sets](#_descriptor_sets)
- [Updating Uniform Buffers](#_updating_uniform_buffers)
- [Updating_Uniform_Buffers](#_updating_uniform_buffers)
- [Handling Input for Camera Movement](#_handling_input_for_camera_movement)
- [Handling_Input_for_Camera_Movement](#_handling_input_for_camera_movement)
- [Mouse Callback for Camera Rotation](#_mouse_callback_for_camera_rotation)
- [Mouse_Callback_for_Camera_Rotation](#_mouse_callback_for_camera_rotation)
- [Setting Up Input Callbacks](#_setting_up_input_callbacks)
- [Setting_Up_Input_Callbacks](#_setting_up_input_callbacks)
- [Main Loop Integration](#_main_loop_integration)
- [Main_Loop_Integration](#_main_loop_integration)

## Content

Before we dive into the integration, let’s briefly introduce the key libraries we’ll be using:

* 
**GLFW** (Graphics Library Framework): A lightweight, multi-platform library for creating windows, contexts, and surfaces, handling input, and events. We use it for window management and input handling. [[https://www.glfw.org/](https://www.glfw.org/)]

* 
**GLM** (OpenGL Mathematics): A mathematics library for graphics programming that provides vector and matrix operations similar to GLSL. We use it for all our 3D math operations. [[https://github.com/g-truc/glm](https://github.com/g-truc/glm)]

Now that we have a camera system and understand transformation matrices, let’s integrate them with our Vulkan application. We’ll focus on how to set up uniform buffers for our matrices and update them each frame based on camera movement.

To keep the integration digestible, think of it in five small steps:

* 
Define the UBO layout (model/view/proj) and create per-frame buffers

* 
Create a descriptor set layout and allocate descriptor sets for the UBO

* 
Write descriptor sets and persistently map the buffers for fast updates

* 
Update the UBO each frame from the camera (view/proj) and model transform

* 
Bind the descriptor set and draw using the updated matrices

|  | See [Transformation matrices](03_transformation_matrices.html) and [Camera implementation](04_camera_implementation.html) for a refresher on matrix math. |
| --- | --- |

First, we need to define our uniform buffer structure:

struct UniformBufferObject {
    glm::mat4 model;
    glm::mat4 view;
    glm::mat4 proj;
};

Next, we’ll create the uniform buffer and its descriptor set:

|  | Uniform buffers should be allocated per frame-in-flight (maxConcurrentFrames), not per swapchain image. This matches how you submit work and synchronize frames, avoids unnecessary allocations, and simplifies your logic. |
| --- | --- |

// Use a fixed number of frames-in-flight, not the number of swapchain images
constexpr uint32_t maxConcurrentFrames = 2; // Adjust to your renderer

struct UniformBufferObject {
    glm::mat4 model;
    glm::mat4 view;
    glm::mat4 proj;
};

// Keep the mapped pointer alongside the buffer for clarity and safety
struct UboBuffer {
    vk::raii::Buffer buffer{nullptr};
    vk::raii::DeviceMemory memory{nullptr};
    void* mapped = nullptr;
};

std::array uniformBuffers;

void createUniformBuffers() {
    vk::DeviceSize bufferSize = sizeof(UniformBufferObject);
    // Create the buffer
    vk::BufferCreateInfo bufferInfo{
        .size = bufferSize,
        .usage = vk::BufferUsageFlagBits::eUniformBuffer,
        .sharingMode = vk::SharingMode::eExclusive
    };
    for (size_t i = 0; i 

We need to create a descriptor set layout that describes our uniform buffer:

void createDescriptorSetLayout() {
    vk::DescriptorSetLayoutBinding uboLayoutBinding{
        .binding = 0,
        .descriptorType = vk::DescriptorType::eUniformBuffer,
        .descriptorCount = 1,
        .stageFlags = vk::ShaderStageFlagBits::eVertex,
        .pImmutableSamplers = nullptr
    };

    vk::DescriptorSetLayoutCreateInfo layoutInfo{
        .bindingCount = 1,
        .pBindings = &uboLayoutBinding
    };

    descriptorSetLayout = device.createDescriptorSetLayout(layoutInfo);
}

Now we’ll create descriptor sets that point to our uniform buffers:

void createDescriptorSets() {
    std::array layouts{};
    layouts.fill(*descriptorSetLayout);

    vk::DescriptorSetAllocateInfo allocInfo{
        .descriptorPool = *descriptorPool,
        .descriptorSetCount = maxConcurrentFrames,
        .pSetLayouts = layouts.data()
    };

    descriptorSets = device.allocateDescriptorSets(allocInfo);

    vk::DescriptorBufferInfo bufferInfo{
        .offset = 0,
        .range = sizeof(UniformBufferObject)
    };

    for (size_t i = 0; i 

In our main loop, we’ll update the uniform buffer with the latest camera data:

void updateUniformBuffer(uint32_t currentFrame) {
    static auto startTime = std::chrono::high_resolution_clock::now();
    auto currentTime = std::chrono::high_resolution_clock::now();
    float time = std::chrono::duration(currentTime - startTime).count();

    UniformBufferObject ubo{};

    // Model matrix: rotate the model around the Y axis
    ubo.model = glm::rotate(glm::mat4(1.0f), time * glm::radians(45.0f), glm::vec3(0.0f, 1.0f, 0.0f));

    // View matrix: get from our camera
    ubo.view = camera.getViewMatrix();

    // Projection matrix: get from our camera
    ubo.proj = camera.getProjectionMatrix(swapChainExtent.width / (float)swapChainExtent.height);

    // Vulkan's Y coordinate is inverted compared to OpenGL
    ubo.proj[1][1] *= -1;

    // Copy the data to the uniform buffer for the current frame-in-flight
    memcpy(uniformBuffers[currentFrame].mapped, &ubo, sizeof(ubo));
}

We need to handle user input to control the camera:

void processInput() {
    // Calculate delta time
    static float lastFrame = 0.0f;
    float currentFrame = glfwGetTime();
    float deltaTime = currentFrame - lastFrame;
    lastFrame = currentFrame;

    // Process keyboard input for camera movement
    if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS)
        camera.processKeyboard(CameraMovement::FORWARD, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS)
        camera.processKeyboard(CameraMovement::BACKWARD, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_A) == GLFW_PRESS)
        camera.processKeyboard(CameraMovement::LEFT, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_D) == GLFW_PRESS)
        camera.processKeyboard(CameraMovement::RIGHT, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_SPACE) == GLFW_PRESS)
        camera.processKeyboard(CameraMovement::UP, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_LEFT_CONTROL) == GLFW_PRESS)
        camera.processKeyboard(CameraMovement::DOWN, deltaTime);
}

We’ll also need to handle mouse movement for camera rotation:

// Global variables for mouse handling
float lastX = 0.0f, lastY = 0.0f;
bool firstMouse = true;

void mouseCallback(GLFWwindow* window, double xpos, double ypos) {
    if (firstMouse) {
        lastX = xpos;
        lastY = ypos;
        firstMouse = false;
    }

    float xoffset = xpos - lastX;
    float yoffset = lastY - ypos; // Reversed: y ranges bottom to top

    lastX = xpos;
    lastY = ypos;

    camera.processMouseMovement(xoffset, yoffset);
}

void scrollCallback(GLFWwindow* window, double xoffset, double yoffset) {
    camera.processMouseScroll(yoffset);
}

In our initialization code, we need to set up the input callbacks:

void initWindow() {
    // ... existing GLFW initialization code ...

    // Set up input callbacks
    glfwSetCursorPosCallback(window, mouseCallback);
    glfwSetScrollCallback(window, scrollCallback);

    // Capture the cursor for camera control
    glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
}

Finally, we integrate everything in our main loop:

void mainLoop() {
    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
        processInput();

        // Update uniform buffer with latest camera data
        updateUniformBuffer(currentFrame);

        // Draw frame
        drawFrame();
    }
}

With these components in place, we now have a fully functional camera system integrated with our Vulkan application. Users can navigate the 3D scene using keyboard and mouse controls, and the view will update accordingly.

In the next section, we’ll wrap up with a conclusion and discuss potential improvements to our camera system.

[Previous: Camera Implementation](04_camera_implementation.html) | [Next: Conclusion](06_conclusion.html)
