# Tooling: Debugging with VK_KHR_debug_utils and RenderDoc

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Tooling/03_debugging_and_renderdoc.html

## Table of Contents

- [Debugging Vulkan Applications](#_debugging_vulkan_applications)
- [Debugging_Vulkan_Applications](#_debugging_vulkan_applications)
- [Using VK_KHR_debug_utils](#_using_vk_khr_debug_utils)
- [Using_VK_KHR_debug_utils](#_using_vk_khr_debug_utils)
- [Setting Up Debug Messaging](#_setting_up_debug_messaging)
- [Setting_Up_Debug_Messaging](#_setting_up_debug_messaging)
- [Object Naming](#_object_naming)
- [Command Buffer Labeling](#_command_buffer_labeling)
- [Command_Buffer_Labeling](#_command_buffer_labeling)
- [Queue Labeling](#_queue_labeling)
- [Using RenderDoc](#_using_renderdoc)
- [Integrating RenderDoc with Your Application](#_integrating_renderdoc_with_your_application)
- [Integrating_RenderDoc_with_Your_Application](#_integrating_renderdoc_with_your_application)
- [Analyzing Captures](#_analyzing_captures)
- [Best Practices for RenderDoc](#_best_practices_for_renderdoc)
- [Best_Practices_for_RenderDoc](#_best_practices_for_renderdoc)
- [Combining VK_KHR_debug_utils and RenderDoc](#_combining_vk_khr_debug_utils_and_renderdoc)
- [Combining_VK_KHR_debug_utils_and_RenderDoc](#_combining_vk_khr_debug_utils_and_renderdoc)
- [Conclusion](#_conclusion)

## Content

Debugging graphics applications can be challenging due to their complex, parallel nature and the fact that much of the processing happens on the GPU. Vulkan, with its explicit design, provides powerful debugging tools that can help identify and fix issues in your application. In this section, we’ll explore two key approaches to debugging Vulkan applications:

Using the VK_KHR_debug_utils extension for in-application debugging

Using external tools like RenderDoc for frame capture and analysis

The VK_KHR_debug_utils extension provides a comprehensive set of tools for debugging Vulkan applications. It allows you to:

* 
Label objects with meaningful names

* 
Mark the beginning and end of command buffer regions

* 
Insert debug markers

* 
Set up debug messengers to receive validation layer messages

Let’s explore how to use these features with C++20 modules and vk::raii.

First, let’s set up a debug messenger to receive validation layer messages:

import std;
import vulkan_raii;

// Debug callback function
VKAPI_ATTR VkBool32 VKAPI_CALL debug_callback(
    VkDebugUtilsMessageSeverityFlagBitsEXT message_severity,
    VkDebugUtilsMessageTypeFlagsEXT message_type,
    const VkDebugUtilsMessengerCallbackDataEXT* callback_data,
    void* user_data) {

    // Convert severity to string
    std::string severity;
    if (message_severity & VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT) {
        severity = "VERBOSE";
    } else if (message_severity & VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT) {
        severity = "INFO";
    } else if (message_severity & VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT) {
        severity = "WARNING";
    } else if (message_severity & VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT) {
        severity = "ERROR";
    }

    // Convert type to string
    std::string type;
    if (message_type & VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT) {
        type = "GENERAL";
    } else if (message_type & VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT) {
        type = "VALIDATION";
    } else if (message_type & VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT) {
        type = "PERFORMANCE";
    }

    // Log the message
    std::cerr pMessage 

One of the most useful features of VK_KHR_debug_utils is the ability to give meaningful names to Vulkan objects. This makes debugging much easier, as you can identify objects in validation layer messages and tools like RenderDoc:

// Helper function to set a name on any Vulkan handle
template
void set_object_name(vk::raii::Device& device, T handle, const std::string& name) {
    vk::DebugUtilsObjectNameInfoEXT name_info{};
    name_info.setObjectType(get_object_type());
    name_info.setObjectHandle(reinterpret_cast(static_cast(handle)));
    name_info.setPObjectName(name.c_str());

    device.setDebugUtilsObjectNameEXT(name_info);
}

// Example usage
void name_vulkan_objects(vk::raii::Device& device) {
    // Name the device itself
    set_object_name(device, *device, "Main Device");

    // Name a buffer
    vk::BufferCreateInfo buffer_info{};
    // ... set buffer creation parameters
    vk::raii::Buffer buffer(device, buffer_info);
    set_object_name(device, *buffer, "Vertex Buffer");

    // Name a pipeline
    vk::raii::Pipeline pipeline = create_graphics_pipeline(device);
    set_object_name(device, *pipeline, "Main Render Pipeline");
}

You can also label regions of command buffer execution, which helps identify where issues occur during rendering:

void record_command_buffer(vk::raii::CommandBuffer& cmd_buffer) {
    cmd_buffer.begin({vk::CommandBufferUsageFlagBits::eOneTimeSubmit});

    // Begin a labeled region
    vk::DebugUtilsLabelEXT label_info{};
    label_info.setPLabelName("Shadow Pass");
    label_info.setColor(std::array{0.0f, 0.0f, 0.0f, 1.0f}); // Black for shadow pass
    cmd_buffer.beginDebugUtilsLabelEXT(label_info);

    // Record shadow pass commands
    // ...

    // End the labeled region
    cmd_buffer.endDebugUtilsLabelEXT();

    // Begin another labeled region
    label_info.setPLabelName("Main Render Pass");
    label_info.setColor(std::array{0.0f, 1.0f, 0.0f, 1.0f}); // Green for main pass
    cmd_buffer.beginDebugUtilsLabelEXT(label_info);

    // Record main render pass commands
    // ...

    // Insert a marker within this region
    cmd_buffer.insertDebugUtilsLabelEXT({
        "Drawing Opaque Objects",
        std::array{1.0f, 1.0f, 1.0f, 1.0f}
    });

    // More rendering commands
    // ...

    // End the labeled region
    cmd_buffer.endDebugUtilsLabelEXT();

    cmd_buffer.end();
}

Similarly, you can label operations submitted to a queue:

void submit_work(vk::raii::Queue& queue, vk::raii::CommandBuffer& cmd_buffer) {
    // Begin a labeled region for the queue submission
    vk::DebugUtilsLabelEXT label_info{};
    label_info.setPLabelName("Frame Rendering");
    label_info.setColor(std::array{0.0f, 0.5f, 1.0f, 1.0f}); // Blue for frame
    queue.beginDebugUtilsLabelEXT(label_info);

    // Submit the command buffer
    vk::SubmitInfo submit_info{};
    submit_info.setCommandBufferCount(1);
    submit_info.setPCommandBuffers(&(*cmd_buffer));
    queue.submit(submit_info, nullptr);

    // End the labeled region
    queue.endDebugUtilsLabelEXT();
}

RenderDoc is a graphics frame debugger and capture/analysis tool (not a compiler). It allows you to capture frames from your application and analyze them in detail. It’s particularly useful for Vulkan applications due to its comprehensive support for the API.

You can integrate RenderDoc directly into your application using its in-application API:

import std;
import vulkan_raii;

#include 

// Load the RenderDoc API
RENDERDOC_API_1_4_1* renderdoc_api = nullptr;

bool load_renderdoc_api() {
    #if defined(_WIN32)
    HMODULE renderdoc_module = LoadLibraryA("renderdoc.dll");
    #else
    void* renderdoc_module = dlopen("librenderdoc.so", RTLD_NOW | RTLD_NOLOAD);
    #endif

    if (!renderdoc_module) {
        std::cerr TriggerCapture();
    }
}

Once you’ve captured a frame, you can analyze it in the RenderDoc application. Here are some key features to look for:

**Pipeline State**: Examine the full graphics pipeline state for each draw call

**Resource Inspection**: View the contents of buffers, textures, and other resources

**Shader Debugging**: Step through shader execution for specific pixels

**Timing Information**: Analyze performance of different parts of your frame

To get the most out of RenderDoc:

**Use Object Names**: As discussed earlier, naming your Vulkan objects makes them much easier to identify in RenderDoc (you’ll see them in the Resource Inspector and Pipeline State views).

**Use Command Buffer Labels**: These appear in RenderDoc’s Event Browser and help you navigate to the relevant draw/dispatch quickly.

**Capture the Problem Frame**: Trigger a capture exactly when the issue occurs (via hotkey or the in-application API) to minimize unrelated events and noise.

**Minimize to a Repro**: Create a minimal reproducible scene or toggle features off to isolate the problem. If you reduce resolution, make sure it doesn’t alter ordering/timing in a way that hides the bug.

The real power comes from combining these approaches:

Use VK_KHR_debug_utils to add rich debugging information to your application

Use RenderDoc to capture and analyze frames with this information

Use validation layers to catch API usage errors

Here’s an example of setting up a debugging environment that combines these approaches:

import std;
import vulkan_raii;

class DebugManager {
public:
    DebugManager() {
        // Try to load RenderDoc API
        load_renderdoc_api();
    }

    void setup_instance_debugging(vk::raii::Context& context, vk::InstanceCreateInfo& create_info) {
        // Add validation layers
        std::vector validation_layers = {"VK_LAYER_KHRONOS_validation"};
        create_info.setPEnabledLayerNames(validation_layers);

        // Add debug utils extension
        std::vector extensions = {VK_EXT_DEBUG_UTILS_EXTENSION_NAME};
        // Add any existing extensions
        if (create_info.enabledExtensionCount > 0) {
            for (uint32_t i = 0; i 
    void set_name(vk::raii::Device& device, T handle, const std::string& name) {
        try {
            vk::DebugUtilsObjectNameInfoEXT name_info{};
            name_info.setObjectType(get_object_type());
            name_info.setObjectHandle(reinterpret_cast(static_cast(handle)));
            name_info.setPObjectName(name.c_str());

            device.setDebugUtilsObjectNameEXT(name_info);
        } catch (vk::SystemError& err) {
            std::cerr TriggerCapture();
        }
    }

private:
    vk::DebugUtilsMessengerCreateInfoEXT debug_create_info{};
    vk::raii::DebugUtilsMessengerEXT debug_messenger{nullptr};
    RENDERDOC_API_1_4_1* renderdoc_api = nullptr;
};

Effective debugging is essential for developing complex Vulkan applications. By combining the power of VK_KHR_debug_utils for in-application debugging and RenderDoc for frame capture and analysis, you can quickly identify and fix issues in your rendering pipeline.

In the next section, we’ll explore crash handling and minidumps, which are crucial for diagnosing issues that occur in production environments.

[Previous: CI/CD for Vulkan Projects](02_cicd.html) | [Next: Crash Handling and Minidumps](04_crash_minidump.html)
