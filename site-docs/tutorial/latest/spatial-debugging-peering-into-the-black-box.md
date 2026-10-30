# Spatial Debugging: Peering into the Black Box

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/20_Spatial_Diagnostics_CI_CD/02_spatial_debugging.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: Object Tagging](#_the_concept_object_tagging)
- [The_Concept:_Object_Tagging](#_the_concept_object_tagging)
- [RenderDoc for Spatial Engines](#_renderdoc_for_spatial_engines)
- [RenderDoc_for_Spatial_Engines](#_renderdoc_for_spatial_engines)
- [Advanced: Inside-the-Shader Debugging and Sync Validation](#_advanced_inside_the_shader_debugging_and_sync_validation)
- [Advanced:_Inside-the-Shader_Debugging_and_Sync_Validation](#_advanced_inside_the_shader_debugging_and_sync_validation)
- [Frame Analysis: Finding the Stutter](#_frame_analysis_finding_the_stutter)
- [Frame_Analysis:_Finding_the_Stutter](#_frame_analysis_finding_the_stutter)

## Content

Debugging a spatial engine is fundamentally different from a standard 2D application. Because the XR runtime and its internal compositor are often black boxes, it can be hard to determine if a rendering error is in your engine, the OpenXR handshake, or the compositor’s own reprojection logic.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Instrumenting your spatial engine with debug labels and utilizing OpenXR’s diagnostic extensions is a standard requirement for professional development. You must use these tools to create a unified view of your application’s behavior within the runtime’s ecosystem.

The **XR_EXT_debug_utils** extension allows you to "label" your OpenXR resources, functionally identical to Vulkan’s `VK_EXT_debug_utils`. By assigning names to your **Action Sets**, **Spaces**, and **Swapchains**, you can see these names in external tools like RenderDoc.

// Tagging an OpenXR swapchain using designated initializers
XrDebugUtilsObjectNameInfoEXT nameInfo{
    .type = XR_TYPE_DEBUG_UTILS_OBJECT_NAME_INFO_EXT,
    .objectType = XR_OBJECT_TYPE_SWAPCHAIN,
    .objectHandle = reinterpret_cast(xrSwapchain),
    .objectName = "Main World Spatial Swapchain"
};

// Now, tools like RenderDoc will display this name for the resource
xrSetDebugUtilsObjectNameEXT(instance, &nameInfo);

The runtime often activates internal validation layers when debugging is enabled, ensuring parameters like `predictedDisplayTime` are within valid ranges.

**RenderDoc** is the gold standard for Vulkan debugging, providing excellent support for spatial pipelines:

**Multi-View Inspection**: You can inspect each layer of your multiview swapchain individually to find why one eye might be rendering incorrectly.

**Resource State Inspection**: You can verify that your `vk::RenderingInfo` has the correct `viewMask` and that your **Synchronization 2** barriers are waiting for the correct stages.

**Compositor Insights**: Some advanced headsets allow RenderDoc to capture the final warped and blended frame, letting you see exactly how your layers are being manipulated.

Vulkan allows for a level of diagnostic depth beyond standard validation:

* 
**Inside-the-Shader Debugging**: Using Vulkan’s **Debug Printf**, you can output real-time data directly from your shaders—such as calculated FOV tangents—providing visibility into the spatial pipeline that OpenXR layers do not offer.

* 
**Tracking Cross-API Race Conditions**: You can use Vulkan’s **Synchronization Validation** to detect precisely when a swapchain image is being accessed by both engine and compositor simultaneously, helping debug flickering or judder.

A single dropped frame can cause a "stutter" that breaks immersion. Use profiling tools to see if your **Late Latching** wait is taking too long. Most runtimes provide tracing tools that show **Compositor Pacing**, helping you identify if your GPU time is low but frame misses are high due to synchronization race conditions.

|  | For more information on debugging and validation, consult the official [XR_EXT_debug_utils Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#XR_EXT_debug_utils), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_automated_qa.html)
