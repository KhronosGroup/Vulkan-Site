# GUI: Vulkan Integration

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/GUI/05_vulkan_integration.html

## Table of Contents

- [Vulkan Integration](#_vulkan_integration)
- [Understanding the Rendering Flow](#_understanding_the_rendering_flow)
- [Understanding_the_Rendering_Flow](#_understanding_the_rendering_flow)
- [Dynamic Rendering Configuration](#_dynamic_rendering_configuration)
- [Dynamic_Rendering_Configuration](#_dynamic_rendering_configuration)
- [Command Buffer Integration](#_command_buffer_integration)
- [Command_Buffer_Integration](#_command_buffer_integration)
- [Single Command Buffer Approach](#_single_command_buffer_approach)
- [Single_Command_Buffer_Approach](#_single_command_buffer_approach)
- [Command Buffer Initialization](#_command_buffer_initialization)
- [Command_Buffer_Initialization](#_command_buffer_initialization)
- [Dynamic Rendering Attachment Setup](#_dynamic_rendering_attachment_setup)
- [Dynamic_Rendering_Attachment_Setup](#_dynamic_rendering_attachment_setup)
- [Dynamic Rendering Pass Setup](#_dynamic_rendering_pass_setup)
- [Dynamic_Rendering_Pass_Setup](#_dynamic_rendering_pass_setup)
- [3D Scene Rendering](#_3d_scene_rendering)
- [3D_Scene_Rendering](#_3d_scene_rendering)
- [UI Overlay Integration](#_ui_overlay_integration)
- [UI_Overlay_Integration](#_ui_overlay_integration)
- [Multiple Command Buffers Approach](#_multiple_command_buffers_approach)
- [Multiple_Command_Buffers_Approach](#_multiple_command_buffers_approach)
- [Multi-Buffer: Scene Command Buffer Recording](#_multi_buffer_scene_command_buffer_recording)
- [Multi-Buffer:_Scene_Command_Buffer_Recording](#_multi_buffer_scene_command_buffer_recording)
- [Multi-Buffer: Scene Attachment Configuration](#_multi_buffer_scene_attachment_configuration)
- [Multi-Buffer:_Scene_Attachment_Configuration](#_multi_buffer_scene_attachment_configuration)
- [Multi-Buffer: Scene Rendering Execution](#_multi_buffer_scene_rendering_execution)
- [Multi-Buffer:_Scene_Rendering_Execution](#_multi_buffer_scene_rendering_execution)
- [Multi-Buffer: UI Command Buffer Setup](#_multi_buffer_ui_command_buffer_setup)
- [Multi-Buffer:_UI_Command_Buffer_Setup](#_multi_buffer_ui_command_buffer_setup)
- [Multi-Buffer: UI Rendering and Submission Coordination](#_multi_buffer_ui_rendering_and_submission_coordination)
- [Multi-Buffer:_UI_Rendering_and_Submission_Coordination](#_multi_buffer_ui_rendering_and_submission_coordination)
- [Handling Multiple Viewports](#_handling_multiple_viewports)
- [Handling_Multiple_Viewports](#_handling_multiple_viewports)
- [Handling Window Resize](#_handling_window_resize)
- [Handling_Window_Resize](#_handling_window_resize)
- [Performance Considerations](#_performance_considerations)
- [Complete Integration Example](#_complete_integration_example)
- [Complete_Integration_Example](#_complete_integration_example)
- [Advanced Topics](#_advanced_topics)
- [Custom Shaders for ImGui](#_custom_shaders_for_imgui)
- [Custom_Shaders_for_ImGui](#_custom_shaders_for_imgui)
- [Rendering ImGui to a Texture](#_rendering_imgui_to_a_texture)
- [Rendering_ImGui_to_a_Texture](#_rendering_imgui_to_a_texture)
- [Handling High DPI Displays](#_handling_high_dpi_displays)
- [Handling_High_DPI_Displays](#_handling_high_dpi_displays)
- [ImGui Utility Class](#_imgui_utility_class)
- [ImGui_Utility_Class](#_imgui_utility_class)
- [Conclusion](#_conclusion)

## Content

In this section, we’ll explore how to properly integrate ImGui rendering with the Vulkan rendering pipeline. While we’ve already covered the basic setup in the "Setting Up Dear ImGui" section, here we’ll dive deeper into the technical details of how ImGui works with Vulkan and how to optimize the integration.

Before we dive into the implementation details, let’s understand how ImGui rendering fits into the Vulkan rendering pipeline:

**Prepare Frame**: Begin a new frame in ImGui and create UI elements

**Generate Draw Data**: ImGui generates vertex and index buffers for the UI

**Record Commands**: Record Vulkan commands to render the ImGui draw data

**Submit Commands**: Submit the commands to the Vulkan queue

**Present**: Present the rendered frame to the screen

This flow needs to be integrated with your existing Vulkan rendering pipeline, which typically involves:

Acquiring the next swap chain image

Recording command buffers for scene rendering

Submitting command buffers

Presenting the rendered image

ImGui can be integrated with Vulkan’s dynamic rendering feature, which simplifies the rendering process by eliminating the need for explicit render passes and framebuffers:

// When initializing ImGui, we set up our custom Vulkan renderer with dynamic rendering
ImGuiVulkanRenderer renderer;
// ... configure the renderer ...
renderer.initialize(*device, *physicalDevice);

// Set up dynamic rendering info
vk::PipelineRenderingCreateInfo renderingInfo{};
renderingInfo.colorAttachmentCount = 1;
vk::Format formats[] = { vk::Format::eB8G8R8A8Unorm };
renderingInfo.pColorAttachmentFormats = formats;
renderer.setDynamicRenderingInfo(renderingInfo);

Dynamic rendering simplifies the integration by removing the dependency on render passes and framebuffers, making the code more flexible and easier to maintain.

There are two main approaches to integrating ImGui commands with your Vulkan command buffers:

**Single Command Buffer**: Record both scene and ImGui rendering commands in the same command buffer

**Multiple Command Buffers**: Use separate command buffers for scene and ImGui rendering

Let’s look at both approaches:

This is the simplest approach and works well for most applications. With dynamic rendering, the code becomes even cleaner:

The frame rendering process begins with command buffer preparation, where we set up the recording state and prepare for GPU command submission.

void drawFrame() {
    // ... existing frame preparation code ...

    // Initialize command buffer recording
    // This tells Vulkan we're about to record a sequence of GPU commands
    vk::CommandBufferBeginInfo beginInfo{};
    commandBuffer.begin(beginInfo);

Command buffer recording represents the heart of Vulkan’s explicit GPU control model. Unlike older APIs where rendering commands are immediately submitted to the GPU, Vulkan allows us to build up a complete sequence of operations before submission. This approach enables powerful optimizations like command reordering, parallel command buffer construction, and efficient GPU scheduling.

The 'begin' operation transitions the command buffer from an initial state into a recording state, where subsequent API calls will be captured as GPU instructions rather than executed immediately. This explicit state management gives us precise control over when and how GPU work is submitted, enabling the fine-grained performance control that makes Vulkan so powerful for demanding applications.

Dynamic rendering requires us to explicitly describe our render targets and their properties, replacing the traditional render pass system with a more flexible approach.

    // Configure color attachment for the main render target
    // This describes how the GPU should handle the color output
    vk::RenderingAttachmentInfo colorAttachment{};
    colorAttachment.imageView = *swapChainImageViews[imageIndex];       // Target swapchain image
    colorAttachment.imageLayout = vk::ImageLayout::eColorAttachmentOptimal;  // Optimal layout for color output
    colorAttachment.loadOp = vk::AttachmentLoadOp::eClear;              // Clear the image before rendering
    colorAttachment.storeOp = vk::AttachmentStoreOp::eStore;            // Preserve results after rendering
    colorAttachment.clearValue.color = std::array{0.0f, 0.0f, 0.0f, 1.0f};  // Clear to black

    // Configure depth attachment for 3D depth testing
    // This enables proper occlusion and depth sorting for 3D objects
    vk::RenderingAttachmentInfo depthAttachment{};
    depthAttachment.imageView = *depthImageView;                        // Depth buffer image
    depthAttachment.imageLayout = vk::ImageLayout::eDepthStencilAttachmentOptimal;  // Optimal for depth operations
    depthAttachment.loadOp = vk::AttachmentLoadOp::eClear;              // Clear depth buffer to far plane
    depthAttachment.storeOp = vk::AttachmentStoreOp::eDontCare;         // Don't preserve depth after rendering
    depthAttachment.clearValue.depthStencil = vk::ClearDepthStencilValue{1.0f, 0};  // Clear to maximum depth

The attachment configuration system provides explicit control over how the GPU handles our render targets throughout the rendering process. By specifying load and store operations, we can optimize memory bandwidth by only preserving data that needs to carry forward to subsequent passes. The clear operations ensure we start with a known state, preventing visual artifacts from previous frame data.

Image layout transitions happen automatically based on our specifications, with the GPU driver handling the necessary memory barriers and cache flushes to ensure data coherency. The optimal layouts we specify here tell the driver to arrange the image data in whatever format provides the best performance for the intended usage, rather than forcing a specific memory organization.

With our attachments configured, we now assemble them into a complete rendering pass that describes the full rendering operation to the GPU.

    // Assemble the complete rendering operation description
    // This ties together all our attachments and rendering parameters
    vk::RenderingInfo renderingInfo{};
    renderingInfo.renderArea = vk::Rect2D{{0, 0}, swapChainExtent};     // Render to entire swapchain area
    renderingInfo.layerCount = 1;                                       // Single layer (not array rendering)
    renderingInfo.colorAttachmentCount = 1;                             // One color output
    renderingInfo.pColorAttachments = &colorAttachment;                 // Our configured color attachment
    renderingInfo.pDepthAttachment = &depthAttachment;                  // Our configured depth attachment

    // Begin the dynamic rendering pass
    // This establishes the rendering context for subsequent draw commands
    commandBuffer.beginRendering(renderingInfo);

Dynamic rendering represents a significant evolution from traditional Vulkan render passes, providing greater flexibility while maintaining the performance benefits of explicit GPU control. Instead of pre-defining render pass objects at initialization time, we can specify render targets and their properties at command recording time, enabling more dynamic and flexible rendering architectures.

The render area specification allows for partial-screen rendering, which can provide significant performance benefits when only portions of the screen need updating. For full-screen rendering like our case, we specify the entire swapchain extent to ensure complete coverage.

The main scene rendering phase handles all 3D geometry, lighting, and material rendering within the established rendering context.

    // Execute 3D scene rendering
    // All your existing 3D geometry, lighting, and material rendering happens here
    // ... your existing scene rendering code ...

    // Complete the 3D rendering pass
    // This finalizes all 3D rendering operations and prepares for UI overlay
    commandBuffer.endRendering();

The scene rendering phase operates within the rendering context we established, with the GPU automatically handling depth testing, color blending, and other rasterization operations according to our pipeline configurations. All draw commands issued between beginRendering and endRendering will target our configured attachments with the specified clear and store behaviors.

The explicit endRendering call ensures that all scene rendering operations are properly completed and that render targets are transitioned to appropriate states for subsequent operations. This explicit control allows the GPU driver to perform optimal scheduling and memory management for the rendering workload.

The final rendering phase integrates ImGui UI elements as an overlay on top of the 3D scene, requiring careful coordination between the two rendering systems.

    // Render ImGui UI overlay on top of the 3D scene
    // The custom renderer handles ImGui's own dynamic rendering setup internally
    // This includes vertex buffer uploads, pipeline binding, and draw command generation
    renderer.render(ImGui::GetDrawData(), commandBuffer);

    // Finalize command buffer recording
    // This transitions the command buffer to executable state for GPU submission
    commandBuffer.end();

    // Submit command buffer
    // ... your existing submission code ...
}

This approach gives you more flexibility and can be useful for more complex rendering pipelines. With dynamic rendering, it becomes even more straightforward:

The multiple command buffer approach begins by isolating 3D scene rendering into its own dedicated command buffer, providing greater flexibility for complex rendering pipelines.

void drawFrame() {
    // ... existing frame preparation code ...

    // Initialize scene-specific command buffer recording
    // This dedicated buffer will contain only 3D geometry and lighting operations
    vk::CommandBufferBeginInfo beginInfo{};
    sceneCommandBuffer.begin(beginInfo);

Separating scene rendering into its own command buffer provides several architectural advantages. First, it enables parallel command buffer recording where different threads can simultaneously build scene and UI command sequences, improving CPU utilization on multi-core systems. Second, it allows for independent optimization of each rendering phase, where scene rendering can use different GPU queues or submission timing than UI rendering.

This separation also facilitates advanced rendering techniques like multi-frame latency optimization, where scene rendering can be decoupled from UI updates to maintain consistent frame timing even when one system experiences performance variations.

The scene rendering setup mirrors the single-buffer approach but with explicit ownership of the attachment configuration within the scene command buffer.

    // Configure scene rendering attachments with explicit ownership
    // These configurations belong specifically to the scene rendering pass
    vk::RenderingAttachmentInfo colorAttachment{};
    colorAttachment.imageView = *swapChainImageViews[imageIndex];        // Target swapchain image
    colorAttachment.imageLayout = vk::ImageLayout::eColorAttachmentOptimal;  // Optimal for color rendering
    colorAttachment.loadOp = vk::AttachmentLoadOp::eClear;               // Clear for fresh scene start
    colorAttachment.storeOp = vk::AttachmentStoreOp::eStore;             // Preserve for UI overlay
    colorAttachment.clearValue.color = std::array{0.0f, 0.0f, 0.0f, 1.0f};  // Clear to black

    // Configure depth attachment for 3D scene depth testing
    // UI rendering won't need depth testing, so this is scene-specific
    vk::RenderingAttachmentInfo depthAttachment{};
    depthAttachment.imageView = *depthImageView;                         // Scene depth buffer
    depthAttachment.imageLayout = vk::ImageLayout::eDepthStencilAttachmentOptimal;  // Optimal for depth ops
    depthAttachment.loadOp = vk::AttachmentLoadOp::eClear;               // Clear depth for new frame
    depthAttachment.storeOp = vk::AttachmentStoreOp::eDontCare;          // UI doesn't need depth data
    depthAttachment.clearValue.depthStencil = vk::ClearDepthStencilValue{1.0f, 0};  // Clear to far plane

The attachment configuration for scene rendering emphasizes the separation of concerns between 3D and UI rendering. The store operation for the color attachment ensures that scene rendering results are preserved for the subsequent UI overlay, while the depth attachment uses "don’t care" storage since UI elements typically render without depth testing.

This explicit configuration makes the rendering dependencies clear and helps optimize memory bandwidth by only preserving the data that subsequent passes actually need.

The scene rendering execution occurs within its dedicated command buffer, providing isolated control over 3D rendering operations.

    // Assemble scene rendering configuration
    // This defines the complete 3D rendering context
    vk::RenderingInfo renderingInfo{};
    renderingInfo.renderArea = vk::Rect2D{{0, 0}, swapChainExtent};      // Full screen rendering
    renderingInfo.layerCount = 1;                                        // Single rendering layer
    renderingInfo.colorAttachmentCount = 1;                              // One color output
    renderingInfo.pColorAttachments = &colorAttachment;                  // Scene color configuration
    renderingInfo.pDepthAttachment = &depthAttachment;                   // Scene depth configuration

    // Execute complete 3D scene rendering pass
    sceneCommandBuffer.beginRendering(renderingInfo);
    // All 3D geometry, lighting, materials, and effects render here
    // ... your existing scene rendering code ...
    sceneCommandBuffer.endRendering();

    // Finalize scene command buffer for submission
    sceneCommandBuffer.end();

The scene rendering execution benefits from having its own isolated command buffer context, where all GPU state changes and draw calls are contained within a clearly defined scope. This isolation makes debugging easier, as scene-specific rendering issues can be analyzed independently of UI rendering complexity.

Command buffer finalization with `end()` transitions the buffer to an executable state, ready for GPU submission, while maintaining clear boundaries between different rendering responsibilities.

The UI rendering phase begins with its own command buffer recording, configured specifically for overlay rendering requirements.

    // Initialize UI-specific command buffer recording
    // This dedicated buffer handles only UI overlay operations
    imguiCommandBuffer.begin(beginInfo);

    // Configure UI attachment to preserve scene rendering results
    // This is the key difference from scene rendering - we load existing content
    colorAttachment.loadOp = vk::AttachmentLoadOp::eLoad;                // Preserve scene rendering

    // Ensure proper ordering/visibility between scene and UI when using multiple command buffers.
    // If you submit scene and UI command buffers separately, synchronize them either by:
    // - Submitting both on the same queue with a semaphore (scene signals, UI waits with stage = COLOR_ATTACHMENT_OUTPUT), or
    // - Recording a pipeline barrier in the UI command buffer before beginRendering() to make scene color writes visible.
    // Example barrier inserted in the UI command buffer:
    {
        vk::ImageMemoryBarrier2 barrier{
            .srcStageMask = vk::PipelineStageFlagBits2::eColorAttachmentOutput,
            .srcAccessMask = vk::AccessFlagBits2::eColorAttachmentWrite,
            .dstStageMask = vk::PipelineStageFlagBits2::eColorAttachmentOutput,
            .dstAccessMask = vk::AccessFlagBits2::eColorAttachmentRead | vk::AccessFlagBits2::eColorAttachmentWrite,
            .oldLayout = vk::ImageLayout::eColorAttachmentOptimal,
            .newLayout = vk::ImageLayout::eColorAttachmentOptimal,
            .image = *swapChainImages[imageIndex],
            .subresourceRange = { vk::ImageAspectFlagBits::eColor, 0, 1, 0, 1 }
        };
        vk::DependencyInfo depInfo{ .imageMemoryBarrierCount = 1, .pImageMemoryBarriers = &barrier };
        imguiCommandBuffer.pipelineBarrier2(depInfo);
    }

    // UI rendering typically doesn't need depth testing
    // Remove depth attachment to optimize UI rendering performance
    renderingInfo.pDepthAttachment = nullptr;

The UI command buffer setup demonstrates the power of the multi-buffer approach through its different attachment configuration. By changing the load operation to `eLoad`, we preserve the scene rendering results as the foundation for UI overlay rendering. This approach is more explicit and controllable than relying on automatic render pass dependencies.

Removing the depth attachment for UI rendering eliminates unnecessary depth testing overhead, since UI elements typically render in screen space without complex occlusion relationships. This optimization can provide measurable performance improvements, especially on mobile GPUs where bandwidth is at a premium.

The final phase handles UI rendering execution and coordinates the submission of both command buffers in the correct order.

    // Execute UI overlay rendering
    // The custom renderer handles ImGui's dynamic rendering internally
    renderer.render(ImGui::GetDrawData(), imguiCommandBuffer);

    // Finalize UI command buffer
    imguiCommandBuffer.end();

    // Coordinate submission of both command buffers in dependency order
    // Scene must complete before UI to ensure proper overlay rendering
    std::array submitCommandBuffers = {
        *sceneCommandBuffer,     // Execute scene rendering first
        *imguiCommandBuffer      // Then execute UI overlay
    };

    // Configure batch submission for optimal GPU utilization
    vk::SubmitInfo submitInfo{};
    submitInfo.commandBufferCount = static_cast(submitCommandBuffers.size());
    submitInfo.pCommandBuffers = submitCommandBuffers.data();

    // Submit both command buffers as a cohesive frame
    // ... rest of your submission code ...
}

ImGui supports multiple viewports, which allows UI windows to be detached from the main window. To support this feature, we need to handle additional steps:

// In your main loop, after rendering ImGui
if (ImGui::GetIO().ConfigFlags & ImGuiConfigFlags_ViewportsEnable) {
    ImGui::UpdatePlatformWindows();
    ImGui::RenderPlatformWindowsDefault();
}

This will render any detached ImGui windows. Note that this feature requires additional platform-specific code and may not be necessary for all applications.

When the window is resized, you need to recreate the swap chain and update ImGui:

void recreateSwapChain() {
    // ... existing swap chain recreation code ...

    // Update ImGui display size
    ImGuiIO& io = ImGui::GetIO();
    io.DisplaySize = ImVec2(static_cast(swapChainExtent.width),
                           static_cast(swapChainExtent.height));
}

Here are some tips to optimize ImGui rendering performance in Vulkan:

**Minimize State Changes**: Try to render all ImGui elements in a single pass to minimize state changes.

**Use Appropriate Descriptor Pool Sizes**: Allocate enough descriptors for ImGui to avoid running out of descriptors.

**Consider Secondary Command Buffers**: For complex UIs, consider using secondary command buffers to record ImGui commands in parallel.

**Optimize UI Updates**: Only update UI elements that change, and consider using ImGui’s `Begin()` function with the `ImGuiWindowFlags_NoDecoration` flag for static UI elements.

**Use ImGui’s Memory Allocators**: ImGui allows you to provide custom memory allocators, which can be useful for controlling memory usage.

Let’s put everything together in a complete example that integrates ImGui with a Vulkan application:

class VulkanApplication {
private:
    // ... existing Vulkan members ...

    // ImGui-specific members
    vk::raii::DescriptorPool imguiPool = nullptr;
    bool showDemoWindow = true;
    bool showMetricsWindow = false;

public:
    void initVulkan() {
        // ... existing Vulkan initialization ...

        // Initialize ImGui
        createImGuiDescriptorPool();
        initImGui();
    }

    void createImGuiDescriptorPool() {
        // ImGui typically needs a handful of descriptors (font texture + user UI textures).
        // Adjust these values to your app's needs (e.g., expected number of UI textures, buffers).
        // As a starting point:
        vk::DescriptorPoolSize poolSizes[] =
        {
            { vk::DescriptorType::eSampler, 8 },
            { vk::DescriptorType::eCombinedImageSampler, 128 },   // font + user-provided textures
            { vk::DescriptorType::eSampledImage, 128 },
            { vk::DescriptorType::eStorageImage, 8 },
            { vk::DescriptorType::eUniformTexelBuffer, 8 },
            { vk::DescriptorType::eStorageTexelBuffer, 8 },
            { vk::DescriptorType::eUniformBuffer, 32 },
            { vk::DescriptorType::eStorageBuffer, 32 },
            { vk::DescriptorType::eUniformBufferDynamic, 16 },
            { vk::DescriptorType::eStorageBufferDynamic, 16 },
            { vk::DescriptorType::eInputAttachment, 8 }
        };

        // A conservative maxSets equals the sum of descriptor counts.
        uint32_t maxSets = 0;
        for (const auto& ps : poolSizes) maxSets += ps.descriptorCount;

        vk::DescriptorPoolCreateInfo poolInfo{
            .flags = vk::DescriptorPoolCreateFlagBits::eFreeDescriptorSet,
            .maxSets = maxSets,
            .poolSizeCount = static_cast(std::size(poolSizes)),
            .pPoolSizes = poolSizes
        };

        imguiPool = vk::raii::DescriptorPool(device, poolInfo);
    }

    void initImGui() {
        // Initialize ImGui context
        IMGUI_CHECKVERSION();
        ImGui::CreateContext();
        ImGuiIO& io = ImGui::GetIO();
        io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;
        io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;

        // Set up ImGui style
        ImGui::StyleColorsDark();

        // Initialize our custom backend
        int width = static_cast(swapChainExtent.width);
        int height = static_cast(swapChainExtent.height);
        ImGuiPlatform::Init(width, height);

        // Initialize our custom ImGui Vulkan renderer with dynamic rendering
        ImGuiVulkanRenderer renderer;
        renderer.initialize(
            *instance,
            *physicalDevice,
            *device,
            graphicsFamily,
            *graphicsQueue,
            *imguiPool,
            static_cast(swapChainImages.size()),
            vk::SampleCountFlagBits::e1
        );

        // Set up dynamic rendering info
        vk::PipelineRenderingCreateInfo renderingInfo{};
        renderingInfo.colorAttachmentCount = 1;
        vk::Format formats[] = { swapChainImageFormat };
        renderingInfo.pColorAttachmentFormats = formats;
        renderer.setDynamicRenderingInfo(renderingInfo);

        // Upload ImGui fonts
        vk::raii::CommandBuffer commandBuffer = beginSingleTimeCommands();
        renderer.uploadFonts(commandBuffer);
        endSingleTimeCommands(commandBuffer);
    }

    void drawFrame() {
        // ... existing frame preparation code ...

        // Start the ImGui frame
        ImGui::NewFrame();

        // Create ImGui UI
        createImGuiUI();

        // Render ImGui
        ImGui::Render();

        // ... existing command buffer recording code ...

        // Begin dynamic rendering for scene
        vk::RenderingAttachmentInfo colorAttachment{};
        colorAttachment.imageView = *swapChainImageViews[imageIndex];
        colorAttachment.imageLayout = vk::ImageLayout::eColorAttachmentOptimal;
        colorAttachment.loadOp = vk::AttachmentLoadOp::eClear;
        colorAttachment.storeOp = vk::AttachmentStoreOp::eStore;
        colorAttachment.clearValue.color = std::array{0.0f, 0.0f, 0.0f, 1.0f};

        vk::RenderingAttachmentInfo depthAttachment{};
        depthAttachment.imageView = *depthImageView;
        depthAttachment.imageLayout = vk::ImageLayout::eDepthStencilAttachmentOptimal;
        depthAttachment.loadOp = vk::AttachmentLoadOp::eClear;
        depthAttachment.storeOp = vk::AttachmentStoreOp::eDontCare;
        depthAttachment.clearValue.depthStencil = vk::ClearDepthStencilValue{1.0f, 0};

        vk::RenderingInfo renderingInfo{};
        renderingInfo.renderArea = vk::Rect2D{{0, 0}, swapChainExtent};
        renderingInfo.layerCount = 1;
        renderingInfo.colorAttachmentCount = 1;
        renderingInfo.pColorAttachments = &colorAttachment;
        renderingInfo.pDepthAttachment = &depthAttachment;

        commandBuffer.beginRendering(renderingInfo);

        // Render 3D scene
        // ... your existing scene rendering code ...

        commandBuffer.endRendering();

        // Render ImGui using our custom renderer
        // ImGui will handle its own dynamic rendering internally
        renderer.render(ImGui::GetDrawData(), commandBuffer);

        // ... existing command buffer submission code ...
    }

    void createImGuiUI() {
        // Menu bar
        if (ImGui::BeginMainMenuBar()) {
            if (ImGui::BeginMenu("File")) {
                if (ImGui::MenuItem("Exit", "Alt+F4")) {
                    // Generic way to request application exit
                    requestApplicationExit();
                }
                ImGui::EndMenu();
            }

            if (ImGui::BeginMenu("View")) {
                ImGui::MenuItem("Demo Window", nullptr, &showDemoWindow);
                ImGui::MenuItem("Metrics", nullptr, &showMetricsWindow);
                ImGui::EndMenu();
            }

            ImGui::EndMainMenuBar();
        }

        // Demo window
        if (showDemoWindow) {
            ImGui::ShowDemoWindow(&showDemoWindow);
        }

        // Metrics window
        if (showMetricsWindow) {
            ImGui::ShowMetricsWindow(&showMetricsWindow);
        }

        // Custom windows
        ImGui::Begin("Settings");

        static float color[3] = { 0.5f, 0.5f, 0.5f };
        if (ImGui::ColorEdit3("Clear Color", color)) {
            // Update clear color
            clearColor = { color[0], color[1], color[2], 1.0f };
        }

        static int selectedModel = 0;
        const char* models[] = { "Cube", "Sphere", "Teapot", "Custom Model" };
        if (ImGui::Combo("Model", &selectedModel, models, IM_ARRAYSIZE(models))) {
            // Change model
            loadModel(models[selectedModel]);
        }

        ImGui::End();
    }

    void cleanup() {
        // ... existing cleanup code ...

        // Cleanup ImGui
        renderer.cleanup();
        ImGuiPlatform::Shutdown();  // Our custom platform backend
        ImGui::DestroyContext();
    }
};

ImGui uses its own shaders for rendering, but you can customize them if needed:

// Create custom shader modules
vk::raii::ShaderModule customVertShaderModule = createShaderModule("custom_imgui_vert.spv");
vk::raii::ShaderModule customFragShaderModule = createShaderModule("custom_imgui_frag.spv");

// Initialize our custom renderer with custom shaders and dynamic rendering
ImGuiVulkanRenderer renderer;
renderer.initialize(
    *instance,
    *physicalDevice,
    *device,
    queueFamily,
    *queue,
    *descriptorPool,
    minImageCount,
    imageCount,
    vk::SampleCountFlagBits::e1
);

// Set up dynamic rendering info
vk::PipelineRenderingCreateInfo renderingInfo{};
renderingInfo.colorAttachmentCount = 1;
vk::Format formats[] = { swapChainImageFormat };
renderingInfo.pColorAttachmentFormats = formats;
renderer.setDynamicRenderingInfo(renderingInfo);

// Set custom shaders
renderer.setCustomShaders(
    customVertShaderModule,
    customFragShaderModule
);

You can render ImGui to a texture instead of directly to the screen, which can be useful for creating in-game UI elements:

// Create a texture to render ImGui to
vk::raii::Image imguiTargetImage = createImage(
    width, height,
    vk::Format::eR8G8B8A8Unorm,
    vk::ImageTiling::eOptimal,
    vk::ImageUsageFlagBits::eColorAttachment | vk::ImageUsageFlagBits::eSampled
);

// Create image view
vk::raii::ImageView imguiTargetImageView = createImageView(
    imguiTargetImage,
    vk::Format::eR8G8B8A8Unorm,
    vk::ImageAspectFlagBits::eColor
);

// Render ImGui to the texture using dynamic rendering
vk::RenderingAttachmentInfo colorAttachment{};
colorAttachment.imageView = *imguiTargetImageView;
colorAttachment.imageLayout = vk::ImageLayout::eColorAttachmentOptimal;
colorAttachment.loadOp = vk::AttachmentLoadOp::eClear;
colorAttachment.storeOp = vk::AttachmentStoreOp::eStore;
colorAttachment.clearValue.color = std::array{0.0f, 0.0f, 0.0f, 0.0f};

vk::RenderingInfo renderingInfo{};
renderingInfo.renderArea = vk::Rect2D{{0, 0}, {width, height}};
renderingInfo.layerCount = 1;
renderingInfo.colorAttachmentCount = 1;
renderingInfo.pColorAttachments = &colorAttachment;

commandBuffer.beginRendering(renderingInfo);
renderer.render(ImGui::GetDrawData(), commandBuffer);
commandBuffer.endRendering();

// Later, use the texture in your 3D scene
// ...

For high DPI displays, you need to handle scaling correctly across different platforms:

// Cross-platform display scaling
void updateDisplayScale(int width, int height, float scaleX, float scaleY) {
    ImGuiIO& io = ImGui::GetIO();
    io.DisplaySize = ImVec2(static_cast(width), static_cast(height));
    io.DisplayFramebufferScale = ImVec2(scaleX, scaleY);

    // Update our platform backend
    ImGuiPlatform::SetDisplaySize(width, height);
}

// Platform-specific implementations
// Here's an example using GLFW, but you can implement similar functions
// for any windowing library you choose to use

void updateDisplayScaleWithGLFW(GLFWwindow* window) {
    // Get the framebuffer size (which may differ from window size on high DPI displays)
    int width, height;
    glfwGetFramebufferSize(window, &width, &height);

    // Get the content scale (DPI scaling factor)
    float xscale, yscale;
    glfwGetWindowContentScale(window, &xscale, &yscale);

    // Update ImGui with the correct display size and scale
    updateDisplayScale(width, height, xscale, yscale);
}

// With other windowing libraries, you would use their equivalent APIs
// to get the framebuffer size and DPI scaling factor

To encapsulate all the ImGui functionality in a way that works across different platforms, let’s create a utility class similar to the one mentioned in the Vulkan-Samples repository:

// ImGuiUtil.h
#pragma once

import vulkan_hpp;
#include 
#include 
#include 

class ImGuiUtil {
public:
    // Initialize ImGui with Vulkan using dynamic rendering
    static void Init(
        vk::raii::Instance& instance,
        vk::raii::PhysicalDevice& physicalDevice,
        vk::raii::Device& device,
        uint32_t queueFamily,
        vk::raii::Queue& queue,
        uint32_t minImageCount,
        uint32_t imageCount,
        vk::Format swapChainImageFormat,
        vk::SampleCountFlagBits msaaSamples = vk::SampleCountFlagBits::e1
    );

    // Shutdown ImGui
    static void Shutdown();

    // Start a new frame
    static void NewFrame();

    // Render ImGui draw data to a command buffer
    static void Render(vk::raii::CommandBuffer& commandBuffer);

    // Update display size
    static void UpdateDisplaySize(int width, int height, float scaleX = 1.0f, float scaleY = 1.0f);

    // Process platform-specific input event
    static bool ProcessInputEvent(void* event);

    // Set input callback
    static void SetInputCallback(std::function callback);

private:
    // Create descriptor pool for ImGui
    static void createDescriptorPool();

    // Upload fonts
    static void uploadFonts();

    // Begin single-time commands
    static vk::raii::CommandBuffer beginSingleTimeCommands();

    // End single-time commands
    static void endSingleTimeCommands(vk::raii::CommandBuffer& commandBuffer);

    // Vulkan objects - using inline static initialization (C++17)
    inline static vk::raii::Instance* instance = nullptr;
    inline static vk::raii::PhysicalDevice* physicalDevice = nullptr;
    inline static vk::raii::Device* device = nullptr;
    inline static uint32_t queueFamily = 0;
    inline static vk::raii::Queue* queue = nullptr;
    inline static vk::raii::DescriptorPool descriptorPool = nullptr;
    inline static vk::raii::CommandPool commandPool = nullptr;
    inline static vk::PipelineRenderingCreateInfo renderingInfo{};

    // Input callback
    inline static std::function inputCallback = nullptr;

    // Initialization state
    inline static bool initialized = false;
};

// ImGuiUtil.cpp
#include "ImGuiUtil.h"

void ImGuiUtil::Init(
    vk::raii::Instance& instance,
    vk::raii::PhysicalDevice& physicalDevice,
    vk::raii::Device& device,
    uint32_t queueFamily,
    vk::raii::Queue& queue,
    uint32_t minImageCount,
    uint32_t imageCount,
    vk::Format swapChainImageFormat,
    vk::SampleCountFlagBits msaaSamples
) {
    ImGuiUtil::instance = &instance;
    ImGuiUtil::physicalDevice = &physicalDevice;
    ImGuiUtil::device = &device;
    ImGuiUtil::queueFamily = queueFamily;
    ImGuiUtil::queue = &queue;

    // Set up dynamic rendering info
    renderingInfo.colorAttachmentCount = 1;
    vk::Format formats[] = { swapChainImageFormat };
    renderingInfo.pColorAttachmentFormats = formats;

    // Create command pool for font upload
    vk::CommandPoolCreateInfo poolInfo{
        .flags = vk::CommandPoolCreateFlagBits::eTransient,
        .queueFamilyIndex = queueFamily
    };
    commandPool = vk::raii::CommandPool(device, poolInfo);

    // Create descriptor pool
    createDescriptorPool();

    // Initialize ImGui context
    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO& io = ImGui::GetIO();
    io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;
    io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;

    // Set up ImGui style
    ImGui::StyleColorsDark();

    // Initialize our custom Vulkan renderer with dynamic rendering
    renderer = ImGuiVulkanRenderer();
    renderer.initialize(
        *instance,
        *physicalDevice,
        *device,
        queueFamily,
        *queue,
        *descriptorPool,
        minImageCount,
        imageCount,
        msaaSamples
    );

    // Set dynamic rendering info
    renderer.setDynamicRenderingInfo(renderingInfo);

    // Upload fonts
    uploadFonts();

    initialized = true;
}

void ImGuiUtil::Shutdown() {
    if (!initialized) return;

    // Wait for device to finish operations
    device->waitIdle();

    // Cleanup ImGui
    renderer.cleanup();
    ImGui::DestroyContext();

    // Cleanup Vulkan resources
    commandPool = nullptr;
    descriptorPool = nullptr;

    // Reset pointers
    instance = nullptr;
    physicalDevice = nullptr;
    device = nullptr;
    queue = nullptr;

    initialized = false;
}

void ImGuiUtil::NewFrame() {
    if (!initialized) return;

    // Update ImGui IO with platform-specific input
    ImGuiIO& io = ImGui::GetIO();

    // Call input callback if registered
    if (inputCallback) {
        inputCallback(io);
    }

    ImGui::NewFrame();
}

void ImGuiUtil::Render(vk::raii::CommandBuffer& commandBuffer) {
    if (!initialized) return;

    ImGui::Render();
    renderer.render(ImGui::GetDrawData(), commandBuffer);
}

void ImGuiUtil::UpdateDisplaySize(int width, int height, float scaleX, float scaleY) {
    if (!initialized) return;

    ImGuiIO& io = ImGui::GetIO();
    io.DisplaySize = ImVec2(static_cast(width), static_cast(height));
    io.DisplayFramebufferScale = ImVec2(scaleX, scaleY);
}

bool ImGuiUtil::ProcessInputEvent(void* event) {
    // Platform-specific event processing would go here
    // This is a placeholder for the actual implementation
    return false;
}

void ImGuiUtil::SetInputCallback(std::function callback) {
    inputCallback = callback;
}

void ImGuiUtil::createDescriptorPool() {
    // Tune these to match your expected number of UI textures and buffers.
    vk::DescriptorPoolSize poolSizes[] =
    {
        { vk::DescriptorType::eSampler, 8 },
        { vk::DescriptorType::eCombinedImageSampler, 128 },
        { vk::DescriptorType::eSampledImage, 128 },
        { vk::DescriptorType::eStorageImage, 8 },
        { vk::DescriptorType::eUniformTexelBuffer, 8 },
        { vk::DescriptorType::eStorageTexelBuffer, 8 },
        { vk::DescriptorType::eUniformBuffer, 32 },
        { vk::DescriptorType::eStorageBuffer, 32 },
        { vk::DescriptorType::eUniformBufferDynamic, 16 },
        { vk::DescriptorType::eStorageBufferDynamic, 16 },
        { vk::DescriptorType::eInputAttachment, 8 }
    };

    uint32_t maxSets = 0;
    for (const auto& ps : poolSizes) maxSets += ps.descriptorCount;

    vk::DescriptorPoolCreateInfo poolInfo{
        .flags = vk::DescriptorPoolCreateFlagBits::eFreeDescriptorSet,
        .maxSets = maxSets,
        .poolSizeCount = static_cast(std::size(poolSizes)),
        .pPoolSizes = poolSizes
    };

    descriptorPool = vk::raii::DescriptorPool(*device, poolInfo);
}

void ImGuiUtil::uploadFonts() {
    vk::raii::CommandBuffer commandBuffer = beginSingleTimeCommands();
    renderer.uploadFonts(commandBuffer);
    endSingleTimeCommands(commandBuffer);
}

vk::raii::CommandBuffer ImGuiUtil::beginSingleTimeCommands() {
    vk::CommandBufferAllocateInfo allocInfo{
        .commandPool = *commandPool,
        .level = vk::CommandBufferLevel::ePrimary,
        .commandBufferCount = 1
    };

    vk::raii::CommandBuffer commandBuffer = vk::raii::CommandBuffers(*device, allocInfo).front();

    vk::CommandBufferBeginInfo beginInfo{
        .flags = vk::CommandBufferUsageFlagBits::eOneTimeSubmit
    };

    commandBuffer.begin(beginInfo);

    return commandBuffer;
}

void ImGuiUtil::endSingleTimeCommands(vk::raii::CommandBuffer& commandBuffer) {
    commandBuffer.end();

    vk::SubmitInfo submitInfo{
        .commandBufferCount = 1,
        .pCommandBuffers = &*commandBuffer
    };

    queue->submit(submitInfo);
    queue->waitIdle();
}

In this section, we’ve explored how to integrate ImGui with Vulkan, including command buffer integration, render pass configuration, and performance considerations. By creating a flexible implementation, we’ve ensured that our GUI system works well with any windowing system you choose.

The key improvements we’ve made include:

Creating a platform-agnostic integration approach

Implementing a flexible input system that works with various windowing libraries

Developing a versatile ImGui utility class

Designing a window-system-independent integration

With this knowledge, you can create a robust GUI system for your Vulkan application that provides a smooth user experience regardless of which windowing system you use.

In the next section, we’ll wrap up with a conclusion and discuss potential improvements to our GUI system.

[Previous: UI Elements](04_ui_elements.html) | [Next: Conclusion](06_conclusion.html)
