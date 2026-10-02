# Mobile Development: Conclusion

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Mobile_Development/06_conclusion.html

## Table of Contents

- [Conclusion](#_conclusion)
- [Putting It All Together](#_putting_it_all_together)
- [Putting_It_All_Together](#_putting_it_all_together)
- [Ship-Ready Checklist](#_ship_ready_checklist)
- [Validation and Profiling Playbook](#_validation_and_profiling_playbook)
- [Validation_and_Profiling_Playbook](#_validation_and_profiling_playbook)
- [Next Steps](#_next_steps)
- [Explore Advanced Topics (Simple Engine Tutorials)](#_explore_advanced_topics_simple_engine_tutorials)
- [Explore_Advanced_Topics_(Simple_Engine_Tutorials)](#_explore_advanced_topics_simple_engine_tutorials)
- [Code Examples](#_code_examples)

## Content

Let’s see how all these components can work together in a complete mobile-optimized Vulkan application:

class MobileOptimizedEngine {
public:
    MobileOptimizedEngine() {
        // Initialize platform-specific components
        #ifdef __ANDROID__
            initialize_android();
        #elif defined(__APPLE__)
            initialize_ios();
        #else
            initialize_desktop();
        #endif

        // Initialize Vulkan with mobile optimizations
        initialize_vulkan();
    }

    void run() {
        // Main application loop
        while (!should_close()) {
            handle_platform_events();
            update();
            render();
        }

        cleanup();
    }

private:
    void initialize_vulkan() {
        // Create instance
        vk::InstanceCreateInfo instance_info;
        // ... set instance parameters
        instance = vk::createInstance(instance_info);

        // Select physical device
        physical_device = select_physical_device(instance);

        // Detect if we're on a TBR GPU
        is_tbr_gpu = is_likely_tbr_gpu(physical_device);

        // Check for extension support
        auto available_extensions = physical_device.enumerateDeviceExtensionProperties();
        std::vector supported_extensions = { VK_KHR_SWAPCHAIN_EXTENSION_NAME };

        // Add mobile-specific extensions if supported
        if (check_extension_support(available_extensions, VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME)) {
            supported_extensions.push_back(VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME);
            use_dynamic_rendering = true;
        }

        if (check_extension_support(available_extensions, VK_KHR_DYNAMIC_RENDERING_LOCAL_READ_EXTENSION_NAME)) {
            supported_extensions.push_back(VK_KHR_DYNAMIC_RENDERING_LOCAL_READ_EXTENSION_NAME);
            use_dynamic_rendering_local_read = true;
        }

        if (check_extension_support(available_extensions, VK_EXT_SHADER_TILE_IMAGE_EXTENSION_NAME)) {
            supported_extensions.push_back(VK_EXT_SHADER_TILE_IMAGE_EXTENSION_NAME);
            use_shader_tile_image = true;
        }

        // Create logical device with supported extensions
        vk::DeviceCreateInfo device_info;
        device_info.setPEnabledExtensionNames(supported_extensions);
        // ... set other device parameters
        device = physical_device.createDevice(device_info);

        // Initialize other Vulkan resources
        // ...
    }

    void render() {
        // Begin frame
        auto cmd_buffer = begin_frame();

        if (use_dynamic_rendering) {
            // Use dynamic rendering
            vk::RenderingAttachmentInfoKHR color_attachment;
            // ... set attachment parameters

            vk::RenderingInfoKHR rendering_info;
            // ... set rendering parameters

            cmd_buffer.beginRenderingKHR(rendering_info);

            // Record drawing commands
            // ...

            cmd_buffer.endRenderingKHR();
        } else {
            // Use traditional render passes
            // ...
        }

        // End frame
        end_frame(cmd_buffer);
    }

    // Platform-specific initialization
    void initialize_android() {
        // Android-specific setup
        // ...
    }

    void initialize_ios() {
        // iOS-specific setup with MoltenVK
        // ...
    }

    void initialize_desktop() {
        // Desktop-specific setup
        // ...
    }

    // Helper functions
    bool check_extension_support(const std::vector& available, const char* extension_name) {
        for (const auto& ext : available) {
            if (strcmp(extension_name, ext.extensionName) == 0) {
                return true;
            }
        }
        return false;
    }

    bool is_likely_tbr_gpu(vk::PhysicalDevice device) {
        vk::PhysicalDeviceProperties props = device.getProperties();

        // Most mobile GPUs from these vendors use TBR
        if (props.vendorID == 0x5143 ||  // Qualcomm
            props.vendorID == 0x1010 ||  // PowerVR
            props.vendorID == 0x13B5 ||  // ARM Mali
            props.vendorID == 0x19E5 ||  // Huawei
            props.vendorID == 0x106B) {  // Apple
            return true;
        }

        return false;
    }

    // Vulkan objects
    vk::Instance instance;
    vk::PhysicalDevice physical_device;
    vk::Device device;

    // Flags
    bool is_tbr_gpu = false;
    bool use_dynamic_rendering = false;
    bool use_dynamic_rendering_local_read = false;
    bool use_shader_tile_image = false;
};

Feature detection and fallbacks: Probe EXT/KHR support at startup, enable conditionally, and maintain tested fallback paths.

Render path selection: Switch between TBR-friendly and IMR-neutral paths at runtime based on a simple vendor/heuristic check.

Framebuffer read policy: Prefer tile-local, per-pixel reads (input attachments or dynamic rendering local read). Avoid patterns that force external memory round-trips.

Textures and assets: Use KTX2 as the container; prefer ASTC when available with ETC2/PVRTC fallbacks as needed. Generate mipmaps offline.

Memory/attachments: Use transient attachments where results aren’t needed after the pass; suballocate to minimize fragmentation.

Thermal/perf governor: Implement dynamic resolution or quality tiers and sensible FPS caps to keep thermals in check.

Instrumentation: Add GPU markers/timestamps, frame-time histograms, and bandwidth proxies to track regressions.

Device matrix: Maintain a small, representative device lab (different vendors/tiers) and run sanity scenes regularly.

* 
Validate correctness:

Swapchain details (present mode, min image count) per device.

* 
Layout transitions and access masks, especially when using local read.

* 
Synchronization between rendering scopes and compute/transfer work.

Profile efficiently:

* 
Use platform tools (e.g., Android GPU Inspector, RenderDoc, Xcode GPU Capture) to identify tile flushes, overdraw, and bandwidth hot spots.

* 
A/B test: classic render pass vs dynamic rendering, local read on/off, tile-image on/off.

* 
Track power and thermals over multi‑minute runs, not just single frames.

* 
Integrate a capability layer that exposes feature bits (dynamic rendering, local read, tile image) to higher-level systems.

* 
Add automated startup probes that dump device/feature info to logs for field telemetry.

* 
Expand the regression scene suite to cover TBR‑sensitive and bandwidth‑heavy paths.

The following short, focused tutorials build directly on the Simple Engine and are great next steps:

* 
[Tutorials Index — browse all topics](../Advanced_Topics/01_introduction.html)

* 
[Mipmaps and LOD](../Advanced_Topics/Mipmaps_and_LOD.html) — practical guidance on stable texture sampling and anisotropy.

* 
[Dynamic Rendering Local Read](../Advanced_Topics/Dynamic_Rendering_Local_Read.html) — optimize same‑pass reads via tile/local memory when supported.

The complete code for this chapter can be found in the following files:

[Mobile Platform Integration C++ code](../../_attachments/simple_engine/36_mobile_platform_integration.cpp)
[Mobile Optimizations C++ code](../../_attachments/simple_engine/37_mobile_optimizations.cpp)
[TBR Optimizations C++ code](../../_attachments/simple_engine/38_tbr_optimizations.cpp)
[Mobile Extensions C++ code](../../_attachments/simple_engine/39_mobile_extensions.cpp)

[Previous: Vulkan Extensions for Mobile](05_vulkan_extensions.html) | [Back to Building a Simple Engine](../../00_Introduction.html)
