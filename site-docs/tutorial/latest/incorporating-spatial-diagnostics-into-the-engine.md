# Incorporating Spatial Diagnostics into the Engine

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/20_Spatial_Diagnostics_CI_CD/04_incorporating_into_the_engine.html

## Table of Contents

- [Adding Diagnostic Labels](#_adding_diagnostic_labels)
- [Adding_Diagnostic_Labels](#_adding_diagnostic_labels)
- [Enabling Automated CI/CD Headless Mode](#_enabling_automated_cicd_headless_mode)
- [Enabling_Automated_CI/CD_Headless_Mode](#_enabling_automated_cicd_headless_mode)
- [Why These Changes?](#_why_these_changes)
- [Why_These_Changes?](#_why_these_changes)

## Content

Integrating **Spatial Diagnostics & CI/CD** allows our `simple_game_engine` to maintain absolute stability through automated testing and deep-dive resource inspection. We achieve this by adding telemetry hooks to our `Renderer` and configuring a "Headless" mode in `engine.cpp`. **This is currently left as an exercise for the reader to implement.**

In `renderer_core.cpp`, we extend our resource creation logic to include OpenXR and Vulkan debug labels. This ensures that when we capture a frame in RenderDoc, we can see exactly what each resource represents.

// renderer_core.cpp
void Renderer::setupSpatialResourceLabels(const XrInstance& xrInstance) {
    if (!xrMode || !hasDebugUtilsSupport) return;

    // 1. Tag the spatial swapchain for RenderDoc identification
    XrDebugUtilsObjectNameInfoEXT nameInfo{
        .type = XR_TYPE_DEBUG_UTILS_OBJECT_NAME_INFO_EXT,
        .objectType = XR_OBJECT_TYPE_SWAPCHAIN,
        .objectHandle = reinterpret_cast(spatialSwapchain),
        .objectName = "Spatial Swapchain"
    };

    xrSetDebugUtilsObjectNameEXT(xrInstance, &nameInfo);

    // 2. Add a diagnostic hook to our main command buffer
    // This allows us to track the frame's progress in a GPU capture
    vk::DebugUtilsLabelEXT frameLabel{ .pLabelName = "Spatial Frame Rendering" };
    commandBuffer.beginDebugUtilsLabelEXT(frameLabel);
}

For automated testing, we configure our engine to run in a "Headless" mode within `engine.cpp`. In this state, we swap the real OpenXR runtime for a simulator and save screenshots for AI vision analysis.

// engine.cpp
void Engine::runSpatialCITest(uint32_t totalFrames) {
    // 1. Configure the XR Context for the Headless Simulator
    xrContext.enableSimulatorMode("Baseline_Tests.json");

    for (uint32_t i = 0; i captureFrameToDisk("CI_Spatial_Capture_" + std::to_string(i) + ".png");
        }
    }
}

By building diagnostic hooks and automated testing directly into the engine, we ensure that new spatial features (like **LightField** synthesis or **Late Latching**) don’t introduce visual regressions or performance regressions. The `simple_game_engine` utilizes these telemetry points in its internal **Watchdog** system, alerting developers if the **Motion-to-Photon** gap exceeds the target threshold.

This "Spatial-First" CI/CD approach is what allows professional teams to maintain high-fidelity experiences across varied hardware targets while keeping the codebase stable and reliable.

[Previous](03_automated_qa.html) | [Next](../conclusion.html)
