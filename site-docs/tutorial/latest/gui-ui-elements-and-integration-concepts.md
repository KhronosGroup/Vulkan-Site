# GUI: UI Elements and Integration Concepts

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/GUI/04_ui_elements.html

## Table of Contents

- [UI Elements and Integration Concepts](#_ui_elements_and_integration_concepts)
- [UI_Elements_and_Integration_Concepts](#_ui_elements_and_integration_concepts)
- [GUI Integration Concepts](#_gui_integration_concepts)
- [GUI_Integration_Concepts](#_gui_integration_concepts)
- [Basic ImGui Usage](#_basic_imgui_usage)
- [Basic_ImGui_Usage](#_basic_imgui_usage)
- [GUI Design Considerations for Vulkan Applications](#_gui_design_considerations_for_vulkan_applications)
- [GUI_Design_Considerations_for_Vulkan_Applications](#_gui_design_considerations_for_vulkan_applications)
- [Memory Management](#_memory_management)
- [Command Buffer Integration](#_command_buffer_integration)
- [Command_Buffer_Integration](#_command_buffer_integration)
- [Descriptor Resources](#_descriptor_resources)
- [Performance Considerations](#_performance_considerations)
- [Frames-in-Flight: Duplicate Dynamic Buffers Per Frame](#_frames_in_flight_duplicate_dynamic_buffers_per_frame)
- [Frames-in-Flight:_Duplicate_Dynamic_Buffers_Per_Frame](#_frames_in_flight_duplicate_dynamic_buffers_per_frame)
- [Organizing Your GUI Code](#_organizing_your_gui_code)
- [Organizing_Your_GUI_Code](#_organizing_your_gui_code)
- [Displaying Textures in ImGui](#_displaying_textures_in_imgui)
- [Displaying_Textures_in_ImGui](#_displaying_textures_in_imgui)
- [Setting Up Texture Descriptors](#_setting_up_texture_descriptors)
- [Setting_Up_Texture_Descriptors](#_setting_up_texture_descriptors)
- [Create the descriptor set layout](#_create_the_descriptor_set_layout)
- [Create_the_descriptor_set_layout](#_create_the_descriptor_set_layout)
- [Allocate a descriptor set](#_allocate_a_descriptor_set)
- [Allocate_a_descriptor_set](#_allocate_a_descriptor_set)
- [Update the descriptor set](#_update_the_descriptor_set)
- [Update_the_descriptor_set](#_update_the_descriptor_set)
- [Use it in ImGui](#_use_it_in_imgui)
- [Use_it_in_ImGui](#_use_it_in_imgui)
- [Complete Example: Texture Manager for ImGui](#_complete_example_texture_manager_for_imgui)
- [Complete_Example:_Texture_Manager_for_ImGui](#_complete_example_texture_manager_for_imgui)
- [Usage Example](#_usage_example)
- [Performance Considerations](#_performance_considerations_2)
- [Object Picking: Interacting with the 3D Scene](#_object_picking_interacting_with_the_3d_scene)
- [Object_Picking:_Interacting_with_the_3D_Scene](#_object_picking_interacting_with_the_3d_scene)
- [Implementing Ray-Object Intersection](#_implementing_ray_object_intersection)
- [Implementing_Ray-Object_Intersection](#_implementing_ray_object_intersection)
- [Visualizing Selected Objects](#_visualizing_selected_objects)
- [Visualizing_Selected_Objects](#_visualizing_selected_objects)
- [Integrating Picking with ImGui](#_integrating_picking_with_imgui)
- [Integrating_Picking_with_ImGui](#_integrating_picking_with_imgui)
- [Balancing GUI and 3D Interaction](#_balancing_gui_and_3d_interaction)
- [Balancing_GUI_and_3D_Interaction](#_balancing_gui_and_3d_interaction)

## Content

Now that we have set up ImGui and implemented input handling, let’s explore the key concepts of integrating a GUI with your Vulkan application. We’ll focus on the integration aspects rather than exhaustive ImGui widget examples, as those are well-documented in the ImGui documentation.

When integrating a GUI into a 3D application, there are several important concepts to consider:

**Separation of Concerns**: Keep your GUI code separate from your rendering code to maintain clean architecture.

**Performance Impact**: GUIs can impact performance, especially with complex layouts or frequent updates.

**Input Management**: Properly handle input to ensure it’s routed to either the GUI or the 3D scene.

**Rendering Order**: The GUI is typically rendered after the 3D scene, as an overlay.

**State Management**: Use the GUI to modify application state in a controlled manner.

ImGui follows an immediate-mode paradigm, where the UI is recreated every frame. Here’s a simple example:

void drawGUI() {
    // Start a new ImGui frame
    ImGui::NewFrame();

    // Create a window
    ImGui::Begin("Settings");

    // Add UI elements here
    static bool enableFeature = false;
    if (ImGui::Checkbox("Enable Feature", &enableFeature)) {
        // This code runs when the checkbox value changes
        updateFeatureState(enableFeature);
    }

    static float value = 0.5f;
    if (ImGui::SliderFloat("Parameter", &value, 0.0f, 1.0f)) {
        // This code runs when the slider value changes
        updateParameter(value);
    }

    ImGui::End();

    // Render ImGui
    ImGui::Render();
}

For a comprehensive guide to all available ImGui widgets and their options, please refer to the official ImGui documentation and demo:
[https://github.com/ocornut/imgui/blob/master/imgui_demo.cpp](https://github.com/ocornut/imgui/blob/master/imgui_demo.cpp)

When designing a GUI for your Vulkan application, consider these aspects:

ImGui generates vertex and index buffers that need to be uploaded to the GPU. Ensure these resources are properly managed:

**Buffer Sizing**: Allocate buffers with sufficient size or implement resizing logic

**Memory Types**: Use host-visible memory for frequent updates

**Synchronization**: Ensure buffer updates are synchronized with rendering

Integrate ImGui rendering commands with your Vulkan command buffers:

// Record commands for scene rendering
// ...

// Record ImGui rendering commands
imGuiUtil.drawFrame(commandBuffer);

// Submit command buffer
// ...

ImGui requires descriptors for its font texture. Ensure your descriptor pool has sufficient capacity:

// Create descriptor pool with enough capacity for ImGui
vk::DescriptorPoolSize poolSizes[] = {
    { vk::DescriptorType::eCombinedImageSampler, 50 },
    // Other descriptor types...
};

vk::DescriptorPoolCreateInfo poolInfo{};
poolInfo.flags = vk::DescriptorPoolCreateFlagBits::eFreeDescriptorSet;
poolInfo.maxSets = 50;
poolInfo.poolSizeCount = static_cast(std::size(poolSizes));
poolInfo.pPoolSizes = poolSizes;

descriptorPool = device.createDescriptorPool(poolInfo);

When integrating ImGui with Vulkan, consider these performance aspects:

**Command Buffer Recording**: Record ImGui commands efficiently, ideally once per frame

**Descriptor Management**: Minimize descriptor set allocations and updates

**Buffer Updates**: Optimize vertex and index buffer updates

**Pipeline State**: Use a dedicated pipeline for ImGui to minimize state changes

**Render Pass Integration**: Consider whether to use a separate render pass or subpass for the GUI

If your renderer uses multiple frames in flight (e.g., double/triple buffering) without a device wait-idle between frames, ImGui’s dynamic vertex and index buffers must not be shared across frames. Otherwise, the CPU can overwrite data that the GPU from a previous frame is still reading.

* 
Allocate one vertex buffer and one index buffer per frame-in-flight.

* 
Update/bind the buffers for the current frame index only.

* 
Size each buffer to the frame’s ImDrawData TotalVtxCount/TotalIdxCount, growing as needed.

Example sketch:

class ImGuiSystem {
  // ...
  std::vector vertexBuffers;
  std::vector vertexMemories;
  std::vector indexBuffers;
  std::vector indexMemories;
  std::vector vertexCounts;
  std::vector indexCounts;

  bool Initialize(Renderer* renderer, uint32_t w, uint32_t h) {
    // ... create pipelines, font, descriptors ...
    const uint32_t frames = renderer->GetMaxFramesInFlight();
    vertexBuffers.resize(frames);
    vertexMemories.resize(frames);
    indexBuffers.resize(frames);
    indexMemories.resize(frames);
    vertexCounts.assign(frames, 0);
    indexCounts.assign(frames, 0);
    return true;
  }

  void Render(vk::raii::CommandBuffer& cmd, uint32_t frameIndex) {
    ImGui::Render();
    updateBuffers(frameIndex);
    // bind per-frame buffers
    std::array vb = {*vertexBuffers[frameIndex]};
    std::array offs{};
    cmd.bindVertexBuffers(0, vb, offs);
    cmd.bindIndexBuffer(*indexBuffers[frameIndex], 0, vk::IndexType::eUint16);
    // draw lists...
  }

  void updateBuffers(uint32_t frameIndex) {
    ImDrawData* dd = ImGui::GetDrawData();
    if (!dd || dd->CmdListsCount == 0) return;
    vk::DeviceSize vbytes = dd->TotalVtxCount * sizeof(ImDrawVert);
    vk::DeviceSize ibytes = dd->TotalIdxCount * sizeof(ImDrawIdx);
    // grow-per-frame if needed, then map/copy for this frame only
    // ...
  }
};

When integrating with your main renderer, pass the current frame index to the ImGui render call:

// inside your frame loop after scene rendering
imguiSystem->Render(commandBuffers[currentFrame], currentFrame);

For maintainable GUI code, consider these organizational patterns:

**Component-Based Approach**: Split your GUI into logical components

**State Management**: Use a centralized state store that the GUI can modify

**Event System**: Implement an event system for GUI-triggered actions

**Lazy Updates**: Only update Vulkan resources when GUI settings actually change

// Component-based approach example
class VulkanGUI {
private:
    // GUI state
    struct {
        bool showRenderSettings = true;
        bool showPerformance = true;
        bool showSceneControls = true;
    } state;

    // Components
    void drawRenderSettingsPanel();
    void drawPerformancePanel();
    void drawSceneControlsPanel();

public:
    void draw() {
        // Start a new ImGui frame
        ImGui::NewFrame();

        // Draw components based on state
        if (state.showRenderSettings) drawRenderSettingsPanel();
        if (state.showPerformance) drawPerformancePanel();
        if (state.showSceneControls) drawSceneControlsPanel();

        // Main menu for toggling panels
        if (ImGui::BeginMainMenuBar()) {
            if (ImGui::BeginMenu("View")) {
                ImGui::MenuItem("Render Settings", nullptr, &state.showRenderSettings);
                ImGui::MenuItem("Performance", nullptr, &state.showPerformance);
                ImGui::MenuItem("Scene Controls", nullptr, &state.showSceneControls);
                ImGui::EndMenu();
            }
            ImGui::EndMainMenuBar();
        }

        // Render ImGui
        ImGui::Render();
    }
};

A common requirement in GUI systems is displaying textures, such as rendered scenes, material previews, or icons. ImGui provides the ability to display textures through its `ImGui::Image` and `ImGui::ImageButton` functions. To use these with Vulkan, you need to properly set up descriptor sets for your textures.

To display a Vulkan texture in ImGui, you need to:

Create a descriptor set layout for the texture

Allocate a descriptor set

Update the descriptor set with your texture’s image view and sampler

Pass the descriptor set handle to ImGui

This layout declares a single combined image sampler the shader can sample from when ImGui draws the quad.

// Create a descriptor set layout for textures
vk::DescriptorSetLayoutBinding binding{};
binding.descriptorType = vk::DescriptorType::eCombinedImageSampler;
binding.descriptorCount = 1;
binding.stageFlags = vk::ShaderStageFlagBits::eFragment;
binding.binding = 0;

vk::DescriptorSetLayoutCreateInfo layoutInfo{};
layoutInfo.bindingCount = 1;
layoutInfo.pBindings = &binding;

vk::raii::DescriptorSetLayout textureSetLayout = device.createDescriptorSetLayout(layoutInfo);

Allocate one set per texture you want to show in ImGui.

// Allocate a descriptor set for each texture
vk::DescriptorSetAllocateInfo allocInfo{};
allocInfo.descriptorPool = *descriptorPool;
allocInfo.descriptorSetCount = 1;
vk::DescriptorSetLayout layouts[] = {*textureSetLayout};
allocInfo.pSetLayouts = layouts;

vk::raii::DescriptorSet textureDescriptorSet = std::move(device.allocateDescriptorSets(allocInfo).front());

Point the descriptor at your image view and sampler in shader‑read layout.

// Update the descriptor set with your texture
vk::DescriptorImageInfo imageInfo{};
imageInfo.imageLayout = vk::ImageLayout::eShaderReadOnlyOptimal;
imageInfo.imageView = textureImageView.getHandle();
imageInfo.sampler = *textureSampler;

vk::WriteDescriptorSet writeSet{};
writeSet.dstSet = *textureDescriptorSet;
writeSet.descriptorCount = 1;
writeSet.descriptorType = vk::DescriptorType::eCombinedImageSampler;
writeSet.pImageInfo = &imageInfo;
writeSet.dstBinding = 0;

device.updateDescriptorSets(1, &writeSet, 0, nullptr);

Once you have set up the descriptor set, you can use it with ImGui’s image functions:

// Store the descriptor set as ImTextureID (which is just a void*)
ImTextureID textureId = (ImTextureID)(VkDescriptorSet)*textureDescriptorSet;

// Display the texture in ImGui
ImGui::Begin("Texture Viewer");

// Display as a simple image
ImGui::Image(textureId, ImVec2(width, height));

// Or as an image button
if (ImGui::ImageButton(textureId, ImVec2(width, height))) {
    // Handle button click
}

// You can also apply tinting and modify UV coordinates
ImGui::Image(textureId, ImVec2(width, height),
             ImVec2(0, 0), ImVec2(1, 1),  // UV coordinates (0,0) to (1,1) for the full texture
             ImVec4(1, 1, 1, 1),          // Tint color (white = no tint)
             ImVec4(1, 1, 1, 0.5));       // Border color

ImGui::End();

Here’s a more complete example of a texture manager class that handles multiple textures for ImGui:

class ImGuiTextureManager {
private:
    vk::raii::Device* device = nullptr;
    vk::raii::DescriptorPool* descriptorPool = nullptr;
    vk::raii::DescriptorSetLayout descriptorSetLayout{nullptr};

    struct TextureInfo {
        vk::raii::DescriptorSet descriptorSet{nullptr};
        uint32_t width;
        uint32_t height;
    };

    std::unordered_map textures;

public:
    ImGuiTextureManager(vk::raii::Device& device, vk::raii::DescriptorPool& descriptorPool)
        : device(&device), descriptorPool(&descriptorPool) {

        // Create descriptor set layout for textures
        vk::DescriptorSetLayoutBinding binding{};
        binding.descriptorType = vk::DescriptorType::eCombinedImageSampler;
        binding.descriptorCount = 1;
        binding.stageFlags = vk::ShaderStageFlagBits::eFragment;
        binding.binding = 0;

        vk::DescriptorSetLayoutCreateInfo layoutInfo{};
        layoutInfo.bindingCount = 1;
        layoutInfo.pBindings = &binding;

        descriptorSetLayout = device.createDescriptorSetLayout(layoutInfo);
    }

    // Register a texture for use with ImGui
    ImTextureID registerTexture(const std::string& name, vk::ImageView imageView,
                               vk::Sampler sampler, uint32_t width, uint32_t height) {

        // Allocate descriptor set
        vk::DescriptorSetAllocateInfo allocInfo{};
        allocInfo.descriptorPool = **descriptorPool;
        allocInfo.descriptorSetCount = 1;
        vk::DescriptorSetLayout layouts[] = {*descriptorSetLayout};
        allocInfo.pSetLayouts = layouts;

        vk::raii::DescriptorSet descriptorSet = std::move(device->allocateDescriptorSets(allocInfo).front());

        // Update descriptor set
        vk::DescriptorImageInfo imageInfo{};
        imageInfo.imageLayout = vk::ImageLayout::eShaderReadOnlyOptimal;
        imageInfo.imageView = imageView;
        imageInfo.sampler = sampler;

        vk::WriteDescriptorSet writeSet{};
        writeSet.dstSet = *descriptorSet;
        writeSet.descriptorCount = 1;
        writeSet.descriptorType = vk::DescriptorType::eCombinedImageSampler;
        writeSet.pImageInfo = &imageInfo;
        writeSet.dstBinding = 0;

        device->updateDescriptorSets(1, &writeSet, 0, nullptr);

        // Store texture info
        textures[name] = {std::move(descriptorSet), width, height};

        // Return the descriptor set as ImTextureID
        return (ImTextureID)(VkDescriptorSet)*textures[name].descriptorSet;
    }

    // Get a previously registered texture
    ImTextureID getTexture(const std::string& name) {
        if (textures.find(name) == textures.end()) {
            throw std::runtime_error("Texture not found: " + name);
        }

        return (ImTextureID)(VkDescriptorSet)*textures[name].descriptorSet;
    }

    // Get texture dimensions
    ImVec2 getTextureDimensions(const std::string& name) {
        if (textures.find(name) == textures.end()) {
            throw std::runtime_error("Texture not found: " + name);
        }

        return ImVec2(static_cast(textures[name].width),
                     static_cast(textures[name].height));
    }
};

Here’s how you might use the texture manager in your application:

// During initialization
ImGuiTextureManager textureManager(device, descriptorPool);

// Register textures (e.g., after loading a model or rendering to a texture)
ImTextureID albedoTexId = textureManager.registerTexture(
    "albedo",
    albedoImageView,
    textureSampler,
    albedoWidth,
    albedoHeight
);

ImTextureID normalMapId = textureManager.registerTexture(
    "normalMap",
    normalMapImageView,
    textureSampler,
    normalMapWidth,
    normalMapHeight
);

// In your GUI rendering code
void drawMaterialEditor() {
    ImGui::Begin("Material Editor");

    // Display textures
    ImGui::Text("Albedo Texture:");
    ImGui::Image(textureManager.getTexture("albedo"),
                ImVec2(200, 200));

    ImGui::Text("Normal Map:");
    ImGui::Image(textureManager.getTexture("normalMap"),
                ImVec2(200, 200));

    // Material properties
    static float roughness = 0.5f;
    if (ImGui::SliderFloat("Roughness", &roughness, 0.0f, 1.0f)) {
        updateMaterialProperty("roughness", roughness);
    }

    static float metallic = 0.0f;
    if (ImGui::SliderFloat("Metallic", &metallic, 0.0f, 1.0f)) {
        updateMaterialProperty("metallic", metallic);
    }

    ImGui::End();
}

When working with textures in ImGui, keep these performance considerations in mind:

**Descriptor Management**: Create descriptor sets for textures only when needed and reuse them

**Texture Size**: Consider using smaller preview versions of textures for the UI

**Mipmap Selection**: For large textures, ensure proper mipmap selection to avoid aliasing

**Texture Updates**: If a texture changes frequently, use a staging buffer for updates

**Texture Atlas**: For many small textures (like icons), consider using a texture atlas

By properly managing textures in your ImGui integration, you can create rich interfaces that display rendered content, material previews, and other visual elements directly in your GUI.

An important aspect of GUI integration is handling object picking - selecting 3D objects with the mouse. This requires coordination between ImGui and your 3D scene:

void handleMouseInput(float mouseX, float mouseY) {
    // First, check if ImGui is using this input
    ImGuiIO& io = ImGui::GetIO();
    if (io.WantCaptureMouse) {
        // ImGui is using the mouse, don't use it for 3D picking
        return;
    }

    // ImGui isn't using the mouse, so we can use it for 3D picking
    pickObject(mouseX, mouseY);
}

void pickObject(float mouseX, float mouseY) {
    // Convert screen coordinates to normalized device coordinates
    float ndcX = (2.0f * mouseX) / windowWidth - 1.0f;
    float ndcY = 1.0f - (2.0f * mouseY) / windowHeight;

    // Create a ray from the camera through the mouse position
    glm::vec4 clipCoords(ndcX, ndcY, -1.0f, 1.0f);
    glm::vec4 eyeCoords = glm::inverse(projectionMatrix) * clipCoords;
    eyeCoords = glm::vec4(eyeCoords.x, eyeCoords.y, -1.0f, 0.0f);

    glm::vec3 rayDirection = glm::normalize(glm::vec3(
        glm::inverse(viewMatrix) * eyeCoords
    ));

    glm::vec3 rayOrigin = camera.getPosition();

    // Test for intersections with scene objects
    float closestHit = std::numeric_limits::max();
    int hitObjectId = -1;

    for (size_t i = 0; i (i);
            }
        }
    }

    // If we hit an object, select it
    if (hitObjectId >= 0) {
        selectObject(hitObjectId);
    }
}

For object picking to work, you need to implement ray-object intersection tests. Here’s a simple example for sphere intersection:

bool rayIntersectsSphere(
    const glm::vec3& rayOrigin,
    const glm::vec3& rayDirection,
    const glm::vec3& sphereCenter,
    float sphereRadius,
    float& outDistance
) {
    glm::vec3 oc = rayOrigin - sphereCenter;
    float a = glm::dot(rayDirection, rayDirection);
    float b = 2.0f * glm::dot(oc, rayDirection);
    float c = glm::dot(oc, oc) - sphereRadius * sphereRadius;
    float discriminant = b * b - 4 * a * c;

    if (discriminant 

Once an object is selected, you can visualize the selection:

void drawScene(vk::raii::CommandBuffer& commandBuffer) {
    // Draw all objects
    for (size_t i = 0; i (i) == selectedObjectId) {
            commandBuffer.bindPipeline(vk::PipelineBindPoint::eGraphics, *highlightPipeline);
        } else {
            commandBuffer.bindPipeline(vk::PipelineBindPoint::eGraphics, *standardPipeline);
        }

        // Draw the object
        drawObject(commandBuffer, sceneObjects[i]);
    }
}

You can also display information about the selected object in the GUI:

void drawObjectPropertiesPanel() {
    if (selectedObjectId 

Object picking creates a powerful interaction model where users can select and manipulate 3D objects directly, while using the GUI to fine-tune properties. This combination of direct manipulation and precise control provides an intuitive user experience.

When designing your application, consider how to balance GUI-based controls with direct 3D interaction:

**Use GUI for**:

* 
Precise numerical inputs

* 
Complex settings with many options

* 
Hierarchical data visualization

* 
Application-wide controls

**Use 3D Interaction for**:

* 
Object placement and movement

* 
Camera navigation

* 
Direct manipulation of scene elements

* 
Intuitive spatial operations

**Hybrid Approaches**:

* 
Gizmos for 3D transformation with precise control

* 
Context menus that appear near selected objects

* 
Property panels that update based on selection

By thoughtfully integrating ImGui with your Vulkan application and implementing object picking, you can create a powerful and intuitive user interface that combines the strengths of both 2D GUI controls and direct 3D interaction.

In the next section, we’ll explore more details about integrating the GUI rendering with the Vulkan rendering pipeline.

[Previous: Input Handling](03_input_handling.html) | [Next: Vulkan Integration](05_vulkan_integration.html)
