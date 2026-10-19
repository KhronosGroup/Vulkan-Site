# Android & iOS Deployment

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/08_deployment/02_android_ios_mobile.html

## Table of Contents

- [Introduction](#_introduction)
- [The glue code problem](#_the_glue_code_problem)
- [The_glue_code_problem](#_the_glue_code_problem)
- [Tutorial: Building the Mobile Entry Point](#_tutorial_building_the_mobile_entry_point)
- [Tutorial:_Building_the_Mobile_Entry_Point](#_tutorial_building_the_mobile_entry_point)
- [Step 1: The JNI Bridge (Android)](#_step_1_the_jni_bridge_android)
- [Step_1:_The_JNI_Bridge_(Android)](#_step_1_the_jni_bridge_android)
- [Step 2: The iOS SwiftUI Bridge](#_step_2_the_ios_swiftui_bridge)
- [Step_2:_The_iOS_SwiftUI_Bridge](#_step_2_the_ios_swiftui_bridge)
- [Tutorial: Optimizing for Tile Memory (TBDR)](#_tutorial_optimizing_for_tile_memory_tbdr)
- [Tutorial:_Optimizing_for_Tile_Memory_(TBDR)](#_tutorial_optimizing_for_tile_memory_tbdr)
- [Step 1: The Subpass Refactor](#_step_1_the_subpass_refactor)
- [Step_1:_The_Subpass_Refactor](#_step_1_the_subpass_refactor)
- [Step 2: The Dependency Logic](#_step_2_the_dependency_logic)
- [Step_2:_The_Dependency_Logic](#_step_2_the_dependency_logic)
- [Summary](#_summary)

## Content

Mobile Vulkan development means balancing high-performance rendering against battery limits, thermally throttled GPUs, and a fair amount of platform glue code. This chapter covers using AI to draft that glue code and to help optimize your rendering pipeline for Tile-Based Deferred Renderers (TBDR).

Before you reach your first `vkCreateInstance` call on mobile, you need platform-specific setup: lifecycle handling and the bridge code between the platform’s native language and your C++ core. It’s mechanical, well-documented, and exactly the kind of code an AI assistant can draft quickly — you still need to read through what it generates, since a wrong assumption about surface lifetime or threading here can be hard to debug later.

Create a new file `VulkanEntry.cpp` and ask your assistant (Goose or your IDE’s chat) to generate the JNI boilerplate.

// Example JNI bridge for surface management
#include 
#include 
#include "VulkanRenderer.hpp"

extern "C" JNIEXPORT void JNICALL
Java_com_example_vulkan_MainActivity_onSurfaceCreated(JNIEnv* env, jobject thiz, jobject surface) {
    ANativeWindow* window = ANativeWindow_fromSurface(env, surface);
    VulkanRenderer::getInstance().initSurface(window);
}

**Example prompt:** **"Generate the full `VulkanEntry.cpp` JNI bridge. We need to handle `onSurfaceCreated`, `onSurfaceChanged`, and `onSurfaceDestroyed`. Use `ANativeWindow_fromSurface` and pass it to our renderer’s `initSurface` method."**

On iOS, you need to wrap your Vulkan surface in a SwiftUI-compatible view. Ask the assistant to generate the `UIViewRepresentable` bridge.

// Example SwiftUI wrapper for a Vulkan-ready CAMetalLayer
import SwiftUI
import MetalKit

struct VulkanView: UIViewRepresentable {
    func makeUIView(context: Context) -> UIView {
        let view = UIView()
        let metalLayer = CAMetalLayer()
        view.layer.addSublayer(metalLayer)
        // Logic to pass this layer to C++ goes here
        return view
    }

    func updateUIView(_ uiView: UIView, context: Context) {}
}

**Example prompt:** **"Generate a SwiftUI `UIViewRepresentable` that provides a `CAMetalLayer` for our Vulkan engine. We need to support both MoltenVK and KosmicKrisp, so the bridge should handle different native handle types."**

Unlike desktop GPUs, mobile GPUs (Adreno, Mali, Apple) are tile-based. To get good performance, you generally want to use subpasses to keep G-Buffer data on-chip rather than round-tripping it through VRAM.

If your engine currently uses separate render passes for G-Buffer and lighting, ask the assistant to combine them into a single pass with subpasses.

Refactor our 'DeferredRenderer::createRenderPass' method.
Combine the G-Buffer and Lighting passes into a single
'VkRenderPass' with two subpasses. Use 'subpassLoad'
in the fragment shader to read the G-Buffer data directly
from tile memory.

Have it generate the `VkSubpassDependency` structures needed so the GPU doesn’t write tile data out to VRAM prematurely.

// Subpass dependency for on-chip data flow
VkSubpassDependency dependency = {};
dependency.srcSubpass = 0; // G-Buffer
dependency.dstSubpass = 1; // Lighting
dependency.srcStageMask = VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT;
dependency.dstStageMask = VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT;
dependency.srcAccessMask = VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT;
dependency.dstAccessMask = VK_ACCESS_INPUT_ATTACHMENT_READ_BIT;
dependency.dependencyFlags = VK_DEPENDENCY_BY_REGION_BIT;

Keeping this data on-chip instead of round-tripping through VRAM can meaningfully cut memory bandwidth, which matters for both frame rate and battery life on mobile.

Mobile Vulkan work is largely about managing bandwidth and platform glue. Using AI to draft the JNI/Objective-C++ bridge code and to help restructure render passes around tile memory can save real time — but the review step matters more here than in most other parts of the engine, since platform-specific bugs are often invisible until you’re running on the actual device.

Next: [Embedded & Safety Critical Systems](03_embedded_safety_critical.html)
