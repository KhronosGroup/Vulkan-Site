# Slang Architecture for N-View Shaders

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/08_Slang_Spatial_Shaders/03_slang_architecture.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The N-View Mindset: Agnostic Shaders](#_the_n_view_mindset_agnostic_shaders)
- [The_N-View_Mindset:_Agnostic_Shaders](#_the_n_view_mindset_agnostic_shaders)
- [Propagation to the Fragment Shader](#_propagation_to_the_fragment_shader)
- [Propagation_to_the_Fragment_Shader](#_propagation_to_the_fragment_shader)
- [Advanced: Cooperative Shading and Dynamic Projection](#_advanced_cooperative_shading_and_dynamic_projection)
- [Advanced:_Cooperative_Shading_and_Dynamic_Projection](#_advanced_cooperative_shading_and_dynamic_projection)
- [Modular Spatial Shaders](#_modular_spatial_shaders)
- [Modular_Spatial_Shaders](#_modular_spatial_shaders)

## Content

Authoring multiview-aware shaders is a unique challenge. While the GPU’s hardware handles the duplication of draw commands, it’s our job to ensure we’re accessing our eye-specific data—like view and projection matrices—efficiently.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Using modern shader languages like Slang to manage the multiple views required by OpenXR is a standard practice for high-performance engines. This architecture allows you to handle an arbitrary number of views (mono, stereo, or quad) with a single, unified shader codebase.

In a traditional shader, you might pass a single `viewMatrix`. In an XR-aware engine, we adopt an **N-View Mindset**, writing our shaders to handle mono, stereo, or even "Quad-Views" (4 eyes) dynamically.

Slang’s powerful type system and **StructuredBuffers** allow us to pass an array of view data that the shader can index into based on the `SV_ViewID`.

// 1. Defining a View Structure in Slang
struct SpatialView {
    float4x4 viewProjection;
    float4x4 inverseView;
    float4 eyePosition;
};

// 2. Accessing N-Views in a Structured Buffer
StructuredBuffer eyeViews;

struct VertexOutput {
    float4 position : SV_Position;
    uint viewID : SV_ViewID;
};

VertexOutput main(VertexInput input, uint viewID : SV_ViewID) {
    VertexOutput output;

    // Index into our views using the hardware-provided viewID
    SpatialView currentView = eyeViews[viewID];

    output.position = mul(currentView.viewProjection, float4(input.position, 1.0));
    output.viewID = viewID;
    return output;
}

On the C++ side, we use designated initializers to bind these buffers to our descriptors:

vk::DescriptorBufferInfo bufferInfo{
    .buffer = *eyeViewsBuffer,
    .offset = 0,
    .range = sizeof(SpatialView) * maxViews
};

vk::WriteDescriptorSet descriptorWrite{
    .dstSet = *descriptorSet,
    .dstBinding = 0,
    .descriptorCount = 1,
    .descriptorType = vk::DescriptorType::eStructuredBuffer,
    .pBufferInfo = &bufferInfo
};

The `SV_ViewID` isn’t just for the vertex shader. You can propagate it to the **Fragment Shader** to perform eye-specific logic, such as calculating specular highlights based on each eye’s physical location.

The runtime handles the view mask routing and viewport array management, ensuring each fragment shader invocation targets the correct layer of your multiview broadcast. Many runtimes will also optimize small buffers by keeping them in the GPU’s "Constant Cache," making per-view indexing extremely efficient.

Vulkan allows us to push the "N-View" mindset further than the standard:

* 
**Cooperative View Shading**: While you can branch on `viewID`, doing so can lead to GPU divergence. You can use Vulkan’s **Subgroup Operations** to share information between views, maintaining high GPU occupancy.

* 
**Dynamic Projection Models**: By using **Shader Objects** (`VK_EXT_shader_object`), you can dynamically swap view-projection logic without re-creating the entire pipeline, allowing for real-time adjustments to lens-specific projection models.

Slang’s support for **Generics** and **Interfaces** means we can write shaders that are completely agnostic of the number of views. We define our spatial logic once and let the compiler handle the underlying multiview integration.

This significantly reduces the chances of errors. If you add a third view for a "Spectator Camera," you don’t need to change your shader code—just update your view mask and the size of your `eyeViews` buffer.

|  | For more information on Slang and Vulkan integration, check out the official [Slang User Guide](https://shader-slang.com/slang/user-guide/index.html), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_native_multiview.html) | [Next](04_incorporating_into_the_engine.html)
