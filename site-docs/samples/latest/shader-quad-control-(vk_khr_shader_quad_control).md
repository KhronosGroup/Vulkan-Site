# Shader quad control (VK_KHR_shader_quad_control)

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/shader_quad_control/README.html

## Table of Contents

- [What is shader quad control?](#_what_is_shader_quad_control)
- [What_is_shader_quad_control?](#_what_is_shader_quad_control)
- [What this sample does](#_what_this_sample_does)
- [What_this_sample_does](#_what_this_sample_does)
- [Required extensions and features](#_required_extensions_and_features)
- [Required_extensions_and_features](#_required_extensions_and_features)
- [Fragment shader](#_fragment_shader)
- [Specification](#_specification)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/shader_quad_control). |
| --- | --- |

This sample demonstrates VK_KHR_shader_quad_control in a minimal graphics pipeline.
It renders a full‑screen triangle and uses quad‑scope operations in the fragment shader to
broadcast values within a 2x2 pixel quad. This produces a characteristic “blocky” 2x2 pattern,
clearly showing how quad operations affect shading.

VK_KHR_shader_quad_control exposes SPIR‑V and shading language capabilities that operate at the
scope of a fragment “quad” – the 2x2 group of fragment shader invocations that participate in
coherent derivative calculation. The extension adds:

* 
A shader execution mode to control quad formation: `layout(full_quads)` or `layout(quad_derivatives)`.

* 
Built‑ins and functions to communicate within a quad, like `subgroupQuadBroadcast(…​)`, and vote
operations `subgroupQuadAll(…​)` / `subgroupQuadAny(…​)`.

Typical uses include:

* 
Stabilizing derivatives, LOD selection, and gradient‑sensitive operations across the 2x2 quad.

* 
Sharing values between lanes in a quad without using shared memory.

* 
Creates a simple graphics pipeline (full‑screen triangle, no descriptors).

* 
The fragment shader enables `GL_EXT_shader_quad_control` and declares `layout(full_quads) in;`.

* 
It calls `subgroupQuadBroadcast(vUV, 0)` to broadcast the top‑left lane’s interpolant to the
whole quad, so each 2x2 block shows one color based on the leader lane.

This minimal approach keeps focus on the quad control feature rather than complex rendering.

To run this sample, the device must support `VK_KHR_shader_quad_control`.

No descriptors or additional states are required for this minimal demo. The sample uses the
framework’s default render pass and a basic pipeline configuration.

The fragment shader uses quad control to broadcast a varying from the quad leader:

#version 450
#extension GL_EXT_shader_quad_control : require

layout(full_quads) in;                    // Control quad scope
layout(location = 0) in vec2 vUV;         // Interpolated UV from VS
layout(location = 0) out vec4 outColor;

void main()
{
    vec2 uv_leader = subgroupQuadBroadcast(vUV, 0); // From top-left of the 2x2 quad
    outColor = vec4(uv_leader, 0.5, 1.0);
}

Switching to `layout(quad_derivatives) in;` would instead ensure that implicit derivatives are
computed in a quad‑coherent way (useful if you perform gradient operations like texture LODs).
This sample focuses on the broadcasting operation for clarity.

* 
Vulkan: [VK_KHR_shader_quad_control](https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VK_KHR_shader_quad_control.html)

* 
GLSL: [GLSL_EXT_shader_quad_control](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_shader_quad_control.txt)
