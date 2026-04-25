# Ecosystem Utilities and GPU Compatibility

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/12_Ecosystem_Utilities_and_Compatibility.html

## Table of Contents

- [Introduction](#_introduction)
- [Vulkan Hardware Database (GPUInfo.org)](#_vulkan_hardware_database_gpuinfo_org)
- [Vulkan_Hardware_Database_(GPUInfo.org)](#_vulkan_hardware_database_gpuinfo_org)
- [Introduction to GPUInfo.org](#_introduction_to_gpuinfo_org)
- [Introduction_to_GPUInfo.org](#_introduction_to_gpuinfo_org)
- [Using GPUInfo.org for Development](#_using_gpuinfo_org_for_development)
- [Using_GPUInfo.org_for_Development](#_using_gpuinfo_org_for_development)
- [Example: Checking Vulkan Version Support](#_example_checking_vulkan_version_support)
- [Example:_Checking_Vulkan_Version_Support](#_example_checking_vulkan_version_support)
- [Example: Checking Extension Support](#_example_checking_extension_support)
- [Example:_Checking_Extension_Support](#_example_checking_extension_support)
- [Example: Using the Vulkan Configurator Tool](#_example_using_the_vulkan_configurator_tool)
- [Example:_Using_the_Vulkan_Configurator_Tool](#_example_using_the_vulkan_configurator_tool)
- [Using Vulkan Configurator for Validation Layers Instead of Code](#_using_vulkan_configurator_for_validation_layers_instead_of_code)
- [Using_Vulkan_Configurator_for_Validation_Layers_Instead_of_Code](#_using_vulkan_configurator_for_validation_layers_instead_of_code)
- [Other Useful Ecosystem Tools](#_other_useful_ecosystem_tools)
- [Other_Useful_Ecosystem_Tools](#_other_useful_ecosystem_tools)
- [Supporting Older GPUs](#_supporting_older_gpus)
- [Supporting_Older_GPUs](#_supporting_older_gpus)
- [Detecting Available Features](#_detecting_available_features)
- [Detecting_Available_Features](#_detecting_available_features)
- [Alternative to Dynamic Rendering: Traditional Render Passes](#_alternative_to_dynamic_rendering_traditional_render_passes)
- [Alternative_to_Dynamic_Rendering:_Traditional_Render_Passes](#_alternative_to_dynamic_rendering_traditional_render_passes)
- [Creating a Render Pass](#_creating_a_render_pass)
- [Creating_a_Render_Pass](#_creating_a_render_pass)
- [Creating Framebuffers](#_creating_framebuffers)
- [Modifying Pipeline Creation](#_modifying_pipeline_creation)
- [Modifying_Pipeline_Creation](#_modifying_pipeline_creation)
- [Adapting Command Buffer Recording](#_adapting_command_buffer_recording)
- [Adapting_Command_Buffer_Recording](#_adapting_command_buffer_recording)
- [Handling Other Vulkan 1.3/1.4 Features](#_handling_other_vulkan_1_31_4_features)
- [Handling_Other_Vulkan_1.3/1.4_Features](#_handling_other_vulkan_1_31_4_features)
- [Timeline Semaphores](#_timeline_semaphores)
- [Synchronization2](#_synchronization2)
- [Best Practices for Cross-GPU Compatibility](#_best_practices_for_cross_gpu_compatibility)
- [Best_Practices_for_Cross-GPU_Compatibility](#_best_practices_for_cross_gpu_compatibility)
- [Conclusion](#_conclusion)

## Content

In this chapter, we’ll explore important ecosystem utilities for Vulkan development and learn how to adapt our code to support a wider range of GPUs. As Vulkan continues to evolve with new versions and features, it’s important to understand how to:

Discover what features are supported by different GPUs

Modify your code to maintain compatibility with older hardware

Conditionally use advanced features when available

This knowledge is essential for developing Vulkan applications that can run on a diverse range of hardware, from the latest high-end GPUs to older or more limited devices.

The [Vulkan Hardware Database](https://vulkan.gpuinfo.org/) (GPUInfo.org) is an invaluable resource for Vulkan developers. This community-driven database collects and presents information about Vulkan support across a wide range of GPUs and devices.

GPUInfo.org provides detailed information about:

* 
Supported Vulkan versions

* 
Available extensions

* 
Feature support

* 
Implementation limits

* 
Format properties

* 
Queue family properties

This information is crowdsourced from users who run the Vulkan Hardware Capability Viewer tool, which reports their GPU’s capabilities to the database.

When developing a Vulkan application, GPUInfo.org can help you:

**Determine minimum requirements**: Understand what Vulkan version and extensions you need to target to support your desired range of hardware.

**Check feature availability**: Verify if specific features like dynamic rendering, timeline semaphores, or ray tracing are widely supported.

**Identify implementation limits**: Discover the practical limits of various Vulkan features across different hardware.

**Compare vendors and devices**: Understand the differences in Vulkan support between NVIDIA, AMD, Intel, and mobile GPU vendors.

Let’s look at some practical examples of using GPUInfo.org:

To determine how widely supported Vulkan 1.3 (which introduced dynamic rendering) is:

Visit [GPUInfo.org](https://vulkan.gpuinfo.org/)

Navigate to "Core Version Support"

Check the percentage of devices supporting Vulkan 1.3

You’ll find that while newer GPUs support Vulkan 1.3+, there are still many devices limited to Vulkan 1.0, 1.1, or 1.2.

If you’re considering using a specific extension:

Visit the "Extensions" section

Search for your extension of interest

Check its support percentage across different vendors

This helps you decide whether to require the extension or provide a fallback path.

The Vulkan Configurator tool (executable name `vkconfig` on all platforms) is included in the Vulkan SDK and provides a convenient way to configure Vulkan settings on your system. Here’s how to use it:

**Launch the Vulkan Configurator**:

* 
On Windows: It’s recommended to start "Vulkan Configurator" from the Start menu, as running `vkconfig.exe` from the command line only shows limited options

* 
On other platforms: Open a terminal and run `vkconfig`

Note that the executable is called `vkconfig` on all platforms.

**Configure Validation Layers**:

* 
Navigate to the "Layers" tab

* 
Enable or disable specific validation layers based on your debugging needs

* 
For example, enable `VK_LAYER_KHRONOS_validation` during development to catch API usage errors

**Manage Environment Variables**:

* 
Go to the "Settings" tab

* 
Set environment variables like `VK_LAYER_PATH` or `VK_ICD_FILENAMES`

* 
These settings can be applied system-wide or for the current session

**Configure Driver-specific Options**:

* 
Some GPU vendors provide additional configuration options

* 
These can be accessed through the vendor-specific tabs

**Export Configuration**:

* 
Save your configuration for later use or to share with team members

* 
This ensures consistent Vulkan environments across development machines

Using the Vulkan Configurator is particularly helpful when:
- Debugging Vulkan applications with different validation layer configurations
- Testing your application with different Vulkan settings without modifying code
- Setting up a development environment with specific Vulkan requirements

In many Vulkan applications, validation layers are enabled programmatically during instance creation, typically only in debug builds. Here’s how this is commonly done:

// Define validation layers
const std::vector validationLayers = {
    "VK_LAYER_KHRONOS_validation"
};

// Enable only in debug builds
#ifdef NDEBUG
constexpr bool enableValidationLayers = false;
#else
constexpr bool enableValidationLayers = true;
#endif

void createInstance() {
    // Check if validation layers are available
    if (enableValidationLayers && !checkValidationLayerSupport()) {
        throw std::runtime_error("validation layers requested, but not available!");
    }

    // Application info...

    // Enable validation layers if in debug mode
    std::vector enabledLayers;
    if (enableValidationLayers) {
        enabledLayers.assign(validationLayers.begin(), validationLayers.end());
    }

    // Create instance with validation layers
    vk::InstanceCreateInfo createInfo{
        .pApplicationInfo        = &appInfo,
        .enabledLayerCount       = static_cast(enabledLayers.size()),
        .ppEnabledLayerNames     = enabledLayers.data(),
        // ... other parameters
    };

    instance = vk::raii::Instance(context, createInfo);
}

While this approach works, it has several drawbacks:

It requires modifying and recompiling code to enable/disable validation

It’s harder to experiment with different validation layer configurations

It adds complexity to your codebase

A better approach is to use the Vulkan Configurator to manage validation layers externally. Here’s how to modify your code to take advantage of this:

void createInstance() {
    // Application info...

    // Create instance without explicitly enabling validation layers
    vk::InstanceCreateInfo createInfo{
        .pApplicationInfo        = &appInfo,
        // ... other parameters
    };

    instance = vk::raii::Instance(context, createInfo);
}

With this approach:

You remove all validation layer-specific code from your application

You use the Vulkan Configurator to enable validation layers when needed

You can switch validation configurations without recompiling

To enable validation layers with the Vulkan Configurator:

Launch the Vulkan Configurator (from the Start menu on Windows, or run `vkconfig` from the terminal - the executable is called `vkconfig` on all platforms)

Go to the "Layers" tab

Enable the `VK_LAYER_KHRONOS_validation` layer

Apply the settings

This configuration will apply to all Vulkan applications run in that environment, making it easy to toggle validation on and off without code changes.

The benefits of this approach include:

* 
**Cleaner code**: Your application code doesn’t need to handle validation layers

* 
**Flexibility**: Change validation settings without recompiling

* 
**Consistency**: Apply the same validation settings across multiple applications

* 
**Experimentation**: Easily try different validation configurations

Besides GPUInfo.org, several other tools can help you develop and debug Vulkan applications:

* 
**Vulkan SDK Tools**:

`vulkaninfo`: Displays Vulkan capabilities of your local system

* 
`vkconfig` (Vulkan Configurator): A configuration tool for managing Vulkan settings (see [Example: Using the Vulkan Configurator Tool](#_example_using_the_vulkan_configurator_tool) for details)

* 
Validation layers: Help identify API usage errors

* 
RenderDoc: Graphics debugging tool

**Vendor-specific Tools**:

* 
NVIDIA Nsight Graphics

* 
AMD Radeon GPU Profiler

Now that we understand how to discover GPU capabilities, let’s explore how to modify our code to support older GPUs that don’t have Vulkan 1.3/1.4 features like dynamic rendering.

The first step is to detect what features are available on the user’s GPU. This is done during device creation:

// Check if dynamic rendering is supported
bool dynamicRenderingSupported = false;

// Check for Vulkan 1.3 support
if (deviceProperties.apiVersion >= VK_VERSION_1_3) {
    dynamicRenderingSupported = true;
} else {
    // Check for the extension on older Vulkan versions
    for (const auto& extension : availableExtensions) {
        if (strcmp(extension.extensionName, VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME) == 0) {
            dynamicRenderingSupported = true;
            break;
        }
    }
}

// Store this information for later use
appInfo.dynamicRenderingSupported = dynamicRenderingSupported;

If dynamic rendering isn’t available, we need to use traditional render passes and framebuffers. Here’s how to implement this alternative approach:

void createRenderPass() {
    if (appInfo.dynamicRenderingSupported) {
        // No render pass needed with dynamic rendering
        return;
    }

    // Color attachment description
    vk::AttachmentDescription colorAttachment{
        .format = swapChainImageFormat,
        .samples = vk::SampleCountFlagBits::e1,
        .loadOp = vk::AttachmentLoadOp::eClear,
        .storeOp = vk::AttachmentStoreOp::eStore,
        .stencilLoadOp = vk::AttachmentLoadOp::eDontCare,
        .stencilStoreOp = vk::AttachmentStoreOp::eDontCare,
        .initialLayout = vk::ImageLayout::eUndefined,
        .finalLayout = vk::ImageLayout::ePresentSrcKHR
    };

    // Subpass reference to the color attachment
    vk::AttachmentReference colorAttachmentRef{
        .attachment = 0,
        .layout = vk::ImageLayout::eColorAttachmentOptimal
    };

    // Subpass description
    vk::SubpassDescription subpass{
        .pipelineBindPoint = vk::PipelineBindPoint::eGraphics,
        .colorAttachmentCount = 1,
        .pColorAttachments = &colorAttachmentRef
    };

    // Dependency to ensure proper image layout transitions
    vk::SubpassDependency dependency{
        .srcSubpass = VK_SUBPASS_EXTERNAL,
        .dstSubpass = 0,
        .srcStageMask = vk::PipelineStageFlagBits::eColorAttachmentOutput,
        .dstStageMask = vk::PipelineStageFlagBits::eColorAttachmentOutput,
        .srcAccessMask = vk::AccessFlagBits::eNone,
        .dstAccessMask = vk::AccessFlagBits::eColorAttachmentWrite
    };

    // Create the render pass
    vk::RenderPassCreateInfo renderPassInfo{
        .attachmentCount = 1,
        .pAttachments = &colorAttachment,
        .subpassCount = 1,
        .pSubpasses = &subpass,
        .dependencyCount = 1,
        .pDependencies = &dependency
    };

    renderPass = device.createRenderPass(renderPassInfo);
}

void createFramebuffers() {
    if (appInfo.dynamicRenderingSupported) {
        // No framebuffers needed with dynamic rendering
        return;
    }

    swapChainFramebuffers.resize(swapChainImageViews.size());

    for (size_t i = 0; i 

When creating the graphics pipeline, we need to specify the render pass if dynamic rendering isn’t available:

void createGraphicsPipeline() {
    // ... existing shader stage and fixed function setup ...

    vk::GraphicsPipelineCreateInfo pipelineInfo{};

    if (appInfo.dynamicRenderingSupported) {
        // Use dynamic rendering
        vk::PipelineRenderingCreateInfo pipelineRenderingCreateInfo{
            .colorAttachmentCount = 1,
            .pColorAttachmentFormats = &swapChainImageFormat
        };

        pipelineInfo.pNext = &pipelineRenderingCreateInfo;
        pipelineInfo.renderPass = nullptr;
    } else {
        // Use traditional render pass
        pipelineInfo.pNext = nullptr;
        pipelineInfo.renderPass = renderPass;
        pipelineInfo.subpass = 0;
    }

    // ... rest of pipeline creation ...
}

Finally, we need to modify how we record command buffers:

void recordCommandBuffer(vk::CommandBuffer commandBuffer, uint32_t imageIndex) {
    // ... begin command buffer ...

    if (appInfo.dynamicRenderingSupported) {
        // Begin dynamic rendering
        vk::RenderingAttachmentInfo colorAttachment{
            .imageView = swapChainImageViews[imageIndex],
            .imageLayout = vk::ImageLayout::eAttachmentOptimal,
            .loadOp = vk::AttachmentLoadOp::eClear,
            .storeOp = vk::AttachmentStoreOp::eStore,
            .clearValue = clearColor
        };

        vk::RenderingInfo renderingInfo{
            .renderArea = {{0, 0}, swapChainExtent},
            .layerCount = 1,
            .colorAttachmentCount = 1,
            .pColorAttachments = &colorAttachment
        };

        commandBuffer.beginRendering(renderingInfo);
    } else {
        // Begin traditional render pass
        vk::RenderPassBeginInfo renderPassInfo{
            .renderPass = renderPass,
            .framebuffer = swapChainFramebuffers[imageIndex],
            .renderArea = {{0, 0}, swapChainExtent},
            .clearValueCount = 1,
            .pClearValues = &clearColor
        };

        commandBuffer.beginRenderPass(renderPassInfo, vk::SubpassContents::eInline);
    }

    // ... bind pipeline and draw ...

    if (appInfo.dynamicRenderingSupported) {
        commandBuffer.endRendering();
    } else {
        commandBuffer.endRenderPass();
    }

    // ... end command buffer ...
}

Dynamic rendering is just one example of a feature that might not be available on older GPUs. Here are some other Vulkan 1.3/1.4 features you might need to provide alternatives for:

Timeline semaphores (introduced in Vulkan 1.2) provide a more flexible synchronization mechanism than binary semaphores. If they’re not available, you’ll need to use binary semaphores and fences:

bool timelineSemaphoresSupported = false;

// Check for Vulkan 1.2 support or extension
if (deviceProperties.apiVersion >= VK_VERSION_1_2) {
    timelineSemaphoresSupported = true;
} else {
    // Check for extension
    for (const auto& extension : availableExtensions) {
        if (strcmp(extension.extensionName, VK_KHR_TIMELINE_SEMAPHORE_EXTENSION_NAME) == 0) {
            timelineSemaphoresSupported = true;
            break;
        }
    }
}

// Create appropriate synchronization primitives
if (timelineSemaphoresSupported) {
    // Create timeline semaphore
    vk::SemaphoreTypeCreateInfo timelineCreateInfo{
        .semaphoreType = vk::SemaphoreType::eTimeline,
        .initialValue = 0
    };

    vk::SemaphoreCreateInfo semaphoreInfo{
        .pNext = &timelineCreateInfo
    };

    timelineSemaphore = device.createSemaphore(semaphoreInfo);
} else {
    // Create binary semaphores and fences
    vk::SemaphoreCreateInfo semaphoreInfo{};
    vk::FenceCreateInfo fenceInfo{.flags = vk::FenceCreateFlagBits::eSignaled};

    for (size_t i = 0; i 

The Synchronization2 feature (Vulkan 1.3) simplifies pipeline barriers and memory dependencies. If it’s not available, use the original synchronization commands:

bool synchronization2Supported = false;

// Check for Vulkan 1.3 support or extension
if (deviceProperties.apiVersion >= VK_VERSION_1_3) {
    synchronization2Supported = true;
} else {
    // Check for extension
    for (const auto& extension : availableExtensions) {
        if (strcmp(extension.extensionName, VK_KHR_SYNCHRONIZATION_2_EXTENSION_NAME) == 0) {
            synchronization2Supported = true;
            break;
        }
    }
}

// Use appropriate barrier commands
if (synchronization2Supported) {
    // Use Synchronization2 API
    vk::ImageMemoryBarrier2 barrier{
        .srcStageMask = vk::PipelineStageFlagBits2::eTopOfPipe,
        .srcAccessMask = vk::AccessFlagBits2::eNone,
        .dstStageMask = vk::PipelineStageFlagBits2::eColorAttachmentOutput,
        .dstAccessMask = vk::AccessFlagBits2::eColorAttachmentWrite,
        .oldLayout = vk::ImageLayout::eUndefined,
        .newLayout = vk::ImageLayout::eAttachmentOptimal,
        .image = swapChainImages[i],
        .subresourceRange = {vk::ImageAspectFlagBits::eColor, 0, 1, 0, 1}
    };

    vk::DependencyInfo dependencyInfo{
        .imageMemoryBarrierCount = 1,
        .pImageMemoryBarriers = &barrier
    };

    commandBuffer.pipelineBarrier2(dependencyInfo);
} else {
    // Use original synchronization API
    vk::ImageMemoryBarrier barrier{
        .srcAccessMask = vk::AccessFlagBits::eNone,
        .dstAccessMask = vk::AccessFlagBits::eColorAttachmentWrite,
        .oldLayout = vk::ImageLayout::eUndefined,
        .newLayout = vk::ImageLayout::eColorAttachmentOptimal,
        .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
        .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
        .image = swapChainImages[i],
        .subresourceRange = {vk::ImageAspectFlagBits::eColor, 0, 1, 0, 1}
    };

    commandBuffer.pipelineBarrier(
        vk::PipelineStageFlagBits::eTopOfPipe,
        vk::PipelineStageFlagBits::eColorAttachmentOutput,
        vk::DependencyFlagBits::eByRegion,
        {},
        {},
        { barrier }
    );
}

Based on what we’ve learned, here are some best practices for developing Vulkan applications that work across a wide range of GPUs:

**Check feature availability at runtime**: Don’t assume features are available based on the Vulkan version alone. Always check for specific features and extensions.

**Provide fallback paths**: Implement alternative code paths for when modern features aren’t available.

**Use feature structures**: When creating a logical device, use the appropriate feature structures to enable only the features you need and that are available.

**Test on various hardware**: Use GPUInfo.org to identify common hardware configurations and test your application on a representative sample.

**Graceful degradation**: Design your application to gracefully reduce visual quality or functionality when running on less capable hardware.

**Document requirements**: Clearly document the minimum and recommended Vulkan version and extension requirements for your application.

Understanding Vulkan ecosystem utilities and knowing how to adapt your code for different GPU capabilities are essential skills for Vulkan developers. By following the approaches outlined in this chapter, you can create applications that run on a wide range of hardware while still taking advantage of the latest features when available.

[C++ code](_attachments/32_ecosystem_utilities.cpp)
