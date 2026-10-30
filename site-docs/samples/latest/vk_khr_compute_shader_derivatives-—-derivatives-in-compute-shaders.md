# VK_KHR_compute_shader_derivatives — Derivatives in compute shaders

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/compute_shader_derivatives/README.html

## Table of Contents

- [What is it?](#_what_is_it)
- [What_is_it?](#_what_is_it)
- [Why/when to use it](#_whywhen_to_use_it)
- [Why/when_to_use_it](#_whywhen_to_use_it)
- [What this sample does](#_what_this_sample_does)
- [What_this_sample_does](#_what_this_sample_does)
- [Rendering architecture](#_rendering_architecture)
- [Stage 1: Compute shader (derivative calculation)](#_stage_1_compute_shader_derivative_calculation)
- [Stage_1:_Compute_shader_(derivative_calculation)](#_stage_1_compute_shader_derivative_calculation)
- [Stage 2: Graphics pipeline (fullscreen display)](#_stage_2_graphics_pipeline_fullscreen_display)
- [Stage_2:_Graphics_pipeline_(fullscreen_display)](#_stage_2_graphics_pipeline_fullscreen_display)
- [Why use a fullscreen triangle instead of a quad?](#_why_use_a_fullscreen_triangle_instead_of_a_quad)
- [Why_use_a_fullscreen_triangle_instead_of_a_quad?](#_why_use_a_fullscreen_triangle_instead_of_a_quad)
- [Required Vulkan extensions and features](#_required_vulkan_extensions_and_features)
- [Required_Vulkan_extensions_and_features](#_required_vulkan_extensions_and_features)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/compute_shader_derivatives). |
| --- | --- |

This sample demonstrates VK_KHR_compute_shader_derivatives, which enables the use of derivative instructions (like dFdx/dFdy) inside compute shaders. Traditionally, derivatives are only available in fragment shaders, but this extension defines derivative groups in compute and how invocations are paired for derivative computations.

![Compute shader derivatives output](shader_derivatives.png)

Figure 1. Compute shader derivatives output

* 
SPIR-V: The companion SPIR-V extension allows derivative instructions in the Compute execution model.

* 
Vulkan: The device feature is exposed via `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR` with two booleans:

`computeDerivativeGroupQuads` — enables quad-based derivative groups.

* 
`computeDerivativeGroupLinear` — enables linearly mapped derivative groups.

GLSL: Use `#extension GL_KHR_compute_shader_derivatives : enable` and a layout qualifier to choose the grouping:

* 
`layout(derivative_group_quadsNV) in;`

* 
`layout(derivative_group_linearNV) in;`
(The `NV` suffix is retained in the GLSL tokens for compatibility.)

* 
Port algorithms that rely on derivatives (e.g., LOD selection, filtering, gradients) to compute for flexibility or performance.

* 
Keep consistent behavior with fragment-stage derivatives by choosing an appropriate grouping mode (quads vs. linear).

* 
Requests and requires the feature `computeDerivativeGroupQuads`.

* 
Builds a compute pipeline with a shader that calls `ddx`/`ddy` (derivative instructions) in compute.

* 
Computes a procedural 2D radial function and uses derivatives to calculate gradient magnitude, demonstrating a practical use case for spatial analysis and edge detection.

* 
Renders a fullscreen visualization showing:

Blue: The base procedural radial pattern

* 
Red/Yellow: Edges detected via high gradient magnitude

* 
The compute shader writes the visualization to a storage image, which is then displayed via a graphics pipeline

Displays a GUI overlay explaining the visualization and the practical applications of compute shader derivatives.

The sample demonstrates how compute shader derivatives enable algorithms that traditionally required fragment shaders (like gradient-based filtering or LOD selection) to run in compute shaders for greater flexibility.

This sample uses a two-stage rendering pipeline to demonstrate compute shader derivatives and display the results:

The compute shader (`derivatives.comp.slang`) executes with an 8×8 local workgroup size and the `[DerivativeGroupQuad]` attribute, which enables quad-based derivative computation. For each pixel in a 512×512 output image:

Computes a procedural radial function based on distance from center

Calls `ddx()` and `ddy()` to calculate spatial derivatives of the function

Computes gradient magnitude: `sqrt(dx² + dy²)` to detect edges

Writes a color visualization to a storage image (VK_FORMAT_R8G8B8A8_UNORM)

The storage image serves as the output buffer for the compute shader and the input texture for the graphics pipeline.

After a pipeline barrier synchronizes the compute write with the fragment shader read, the graphics pipeline displays the computed image:

**Vertex shader** (`fullscreen.vert.slang`): Generates a fullscreen triangle using only vertex IDs (no vertex buffer required)

* 
Vertex 0: `(-1, -1)` with UV `(0, 0)` — bottom-left corner

* 
Vertex 1: `(3, -1)` with UV `(2, 0)` — extends far right (off-screen)

* 
Vertex 2: `(-1, 3)` with UV `(0, 2)` — extends far up (off-screen)

* 
The oversized triangle covers the entire viewport; hardware automatically clips the parts outside the screen

**Fragment shader** (`fullscreen.frag.slang`): Samples the storage image using interpolated UV coordinates and outputs the color

**GUI overlay**: Drawn on top using ImGui to explain the visualization

The fullscreen triangle is a common optimization technique for post-processing and fullscreen effects:

* 
**Fewer vertices**: Only 3 vertices instead of 4 (quad) or 6 (two triangles)

* 
**No vertex buffer**: Positions and UVs are generated procedurally from `SV_VertexID`

* 
**Simpler setup**: Single draw call with `vkCmdDraw(cmd, 3, 1, 0, 0)`

* 
**Automatic clipping**: The GPU clips the oversized triangle to the viewport bounds

* 
**Better cache behavior**: Single triangle primitive instead of two

This technique is widely used in modern rendering engines for fullscreen passes like tone mapping, bloom, and other post-processing effects.

* 
Instance extension: `VK_KHR_get_physical_device_properties2` (for feature chaining).

* 
Device extension: `VK_KHR_compute_shader_derivatives` (required).

* 
Device feature: `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR::computeDerivativeGroupQuads = VK_TRUE`.
