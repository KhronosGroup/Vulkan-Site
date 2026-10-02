# Gaussian Splats Rendering in Vulkan: A Comprehensive Guide

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/complex/render_octomap/Tutorials/gaussian-splats-rendering.html

## Table of Contents

- [1. Introduction](#_introduction)
- [2. What are Gaussian Splats?](#_what_are_gaussian_splats)
- [2._What_are_Gaussian_Splats?](#_what_are_gaussian_splats)
- [2.1. The Math Behind the Blobs](#_the_math_behind_the_blobs)
- [2.1._The_Math_Behind_the_Blobs](#_the_math_behind_the_blobs)
- [2.2. What Goes Into Each Splat?](#_what_goes_into_each_splat)
- [2.2._What_Goes_Into_Each_Splat?](#_what_goes_into_each_splat)
- [2.3. Why Gaussians Work So Well](#_why_gaussians_work_so_well)
- [2.3._Why_Gaussians_Work_So_Well](#_why_gaussians_work_so_well)
- [2.4. How Do They Compare to Other Techniques?](#_how_do_they_compare_to_other_techniques)
- [2.4._How_Do_They_Compare_to_Other_Techniques?](#_how_do_they_compare_to_other_techniques)
- [3. Storing Splats in GLTF Files](#_storing_splats_in_gltf_files)
- [3._Storing_Splats_in_GLTF_Files](#_storing_splats_in_gltf_files)
- [3.1. The Practical Impact](#_the_practical_impact)
- [3.1._The_Practical_Impact](#_the_practical_impact)
- [3.2. Extension Structure](#_extension_structure)
- [3.2._Extension_Structure](#_extension_structure)
- [3.3. Attribute Accessors](#_attribute_accessors)
- [3.3._Attribute_Accessors](#_attribute_accessors)
- [3.4. Extension Properties](#_extension_properties)
- [3.4._Extension_Properties](#_extension_properties)
- [4. The Compression Problem (And Solution)](#_the_compression_problem_and_solution)
- [4._The_Compression_Problem_(And_Solution)](#_the_compression_problem_and_solution)
- [4.1. Storage Requirements Without Compression](#_storage_requirements_without_compression)
- [4.1._Storage_Requirements_Without_Compression](#_storage_requirements_without_compression)
- [4.2. How Quantization Saves the Day](#_how_quantization_saves_the_day)
- [4.2._How_Quantization_Saves_the_Day](#_how_quantization_saves_the_day)
- [4.2.1. Compressing Positions](#_compressing_positions)
- [4.2.1._Compressing_Positions](#_compressing_positions)
- [4.2.2. Compressing Rotations](#_compressing_rotations)
- [4.2.2._Compressing_Rotations](#_compressing_rotations)
- [4.2.3. Compressing Scales](#_compressing_scales)
- [4.2.3._Compressing_Scales](#_compressing_scales)
- [4.2.4. Compressing Opacity and Color](#_compressing_opacity_and_color)
- [4.2.4._Compressing_Opacity_and_Color](#_compressing_opacity_and_color)
- [4.3. Compression Ratios in Practice](#_compression_ratios_in_practice)
- [4.3._Compression_Ratios_in_Practice](#_compression_ratios_in_practice)
- [4.4. SPZ Compression: The Official Standard](#_spz_compression_the_official_standard)
- [4.4._SPZ_Compression:_The_Official_Standard](#_spz_compression_the_official_standard)
- [4.4.1. How SPZ Works](#_how_spz_works)
- [4.4.1._How_SPZ_Works](#_how_spz_works)
- [4.4.2. The Practical Impact](#_the_practical_impact_2)
- [4.4.2._The_Practical_Impact](#_the_practical_impact_2)
- [4.4.3. Graceful Degradation](#_graceful_degradation)
- [4.4.3._Graceful_Degradation](#_graceful_degradation)
- [4.4.4. Base Extension vs Compression Extension](#_base_extension_vs_compression_extension)
- [4.4.4._Base_Extension_vs_Compression_Extension](#_base_extension_vs_compression_extension)
- [4.5. Additional Compression Techniques](#_additional_compression_techniques)
- [4.5._Additional_Compression_Techniques](#_additional_compression_techniques)
- [4.5.1. 1. Mesh Compression Standards](#_1_mesh_compression_standards)
- [4.5.1._1._Mesh_Compression_Standards](#_1_mesh_compression_standards)
- [4.5.2. 2. Container-Level Compression](#_2_container_level_compression)
- [4.5.2._2._Container-Level_Compression](#_2_container_level_compression)
- [4.6. GLTF Structure with SPZ Compression](#_gltf_structure_with_spz_compression)
- [4.6._GLTF_Structure_with_SPZ_Compression](#_gltf_structure_with_spz_compression)
- [5. Framework Integration](#_framework_integration)
- [5._Framework_Integration](#_framework_integration)
- [5.1. SplatInstance Layout](#_splatinstance_layout)
- [5.1._SplatInstance_Layout](#_splatinstance_layout)
- [5.2. GLTF Loader Extension](#_gltf_loader_extension)
- [5.2._GLTF_Loader_Extension](#_gltf_loader_extension)
- [6. Reading Gaussian Splats from GLTF](#_reading_gaussian_splats_from_gltf)
- [6._Reading_Gaussian_Splats_from_GLTF](#_reading_gaussian_splats_from_gltf)
- [6.1. Step 1: Detecting Gaussian Splat Data](#_step_1_detecting_gaussian_splat_data)
- [6.1._Step_1:_Detecting_Gaussian_Splat_Data](#_step_1_detecting_gaussian_splat_data)
- [6.2. Step 2: Extracting Extension Data](#_step_2_extracting_extension_data)
- [6.2._Step_2:_Extracting_Extension_Data](#_step_2_extracting_extension_data)
- [6.3. Step 3: Reading Buffer Data](#_step_3_reading_buffer_data)
- [6.3._Step_3:_Reading_Buffer_Data](#_step_3_reading_buffer_data)
- [6.4. Step 4: Creating GPU Buffers](#_step_4_creating_gpu_buffers)
- [6.4._Step_4:_Creating_GPU_Buffers](#_step_4_creating_gpu_buffers)
- [6.5. Step 5: Handling Quantized Data](#_step_5_handling_quantized_data)
- [6.5._Step_5:_Handling_Quantized_Data](#_step_5_handling_quantized_data)
- [6.6. Complete Loading Example](#_complete_loading_example)
- [6.6._Complete_Loading_Example](#_complete_loading_example)
- [6.7. Error Handling and Validation](#_error_handling_and_validation)
- [6.7._Error_Handling_and_Validation](#_error_handling_and_validation)
- [7. Rendering Gaussian Splats](#_rendering_gaussian_splats)
- [7._Rendering_Gaussian_Splats](#_rendering_gaussian_splats)
- [7.1. The Big Picture](#_the_big_picture)
- [7.1._The_Big_Picture](#_the_big_picture)
- [7.2. The Projection Math (Don’t Worry, I’ll Explain)](#_the_projection_math_dont_worry_ill_explain)
- [7.2._The_Projection_Math_(Don’t_Worry,_I’ll_Explain)](#_the_projection_math_dont_worry_ill_explain)
- [7.3. The Vertex Shader: Where the Magic Happens](#_the_vertex_shader_where_the_magic_happens)
- [7.3._The_Vertex_Shader:_Where_the_Magic_Happens](#_the_vertex_shader_where_the_magic_happens)
- [7.4. The Fragment Shader: Evaluating the Gaussian](#_the_fragment_shader_evaluating_the_gaussian)
- [7.4._The_Fragment_Shader:_Evaluating_the_Gaussian](#_the_fragment_shader_evaluating_the_gaussian)
- [7.5. Premultiplied Alpha](#_premultiplied_alpha)
- [7.5._Premultiplied_Alpha](#_premultiplied_alpha)
- [7.6. Vulkan Pipeline Configuration](#_vulkan_pipeline_configuration)
- [7.6._Vulkan_Pipeline_Configuration](#_vulkan_pipeline_configuration)
- [7.7. Drawing Gaussian Splats](#_drawing_gaussian_splats)
- [7.7._Drawing_Gaussian_Splats](#_drawing_gaussian_splats)
- [8. Depth Sorting](#_depth_sorting)
- [8._Depth_Sorting](#_depth_sorting)
- [8.1. CPU Sorting](#_cpu_sorting)
- [8.1._CPU_Sorting](#_cpu_sorting)
- [8.2. GPU Radix Sort](#_gpu_radix_sort)
- [8.2._GPU_Radix_Sort](#_gpu_radix_sort)
- [8.3. Tile-Based Sorting](#_tile_based_sorting)
- [8.3._Tile-Based_Sorting](#_tile_based_sorting)
- [9. Performance Considerations](#_performance_considerations)
- [9._Performance_Considerations](#_performance_considerations)
- [9.1. Culling](#_culling)
- [9.2. Level of Detail](#_level_of_detail)
- [9.2._Level_of_Detail](#_level_of_detail)
- [9.3. Memory Layout](#_memory_layout)
- [9.3._Memory_Layout](#_memory_layout)
- [10. Sample Usage](#_sample_usage)
- [10._Sample_Usage](#_sample_usage)
- [11. Future Enhancements](#_future_enhancements)
- [11._Future_Enhancements](#_future_enhancements)
- [11.1. Spherical Harmonics](#_spherical_harmonics)
- [11.1._Spherical_Harmonics](#_spherical_harmonics)
- [11.2. Anti-Aliasing](#_anti_aliasing)
- [11.3. Streaming](#_streaming)
- [12. References](#_references)
- [12.1. What This Sample Demonstrates](#_what_this_sample_demonstrates)
- [12.1._What_This_Sample_Demonstrates](#_what_this_sample_demonstrates)

## Content

Table of Contents

[1. Introduction](#_introduction)
[2. What are Gaussian Splats?](#_what_are_gaussian_splats)

[2.1. The Math Behind the Blobs](#_the_math_behind_the_blobs)
[2.2. What Goes Into Each Splat?](#_what_goes_into_each_splat)
[2.3. Why Gaussians Work So Well](#_why_gaussians_work_so_well)
[2.4. How Do They Compare to Other Techniques?](#_how_do_they_compare_to_other_techniques)

[3. Storing Splats in GLTF Files](#_storing_splats_in_gltf_files)

[3.1. The Practical Impact](#_the_practical_impact)
[3.2. Extension Structure](#_extension_structure)
[3.3. Attribute Accessors](#_attribute_accessors)
[3.4. Extension Properties](#_extension_properties)

[4. The Compression Problem (And Solution)](#_the_compression_problem_and_solution)

[4.1. Storage Requirements Without Compression](#_storage_requirements_without_compression)
[4.2. How Quantization Saves the Day](#_how_quantization_saves_the_day)

[4.2.1. Compressing Positions](#_compressing_positions)
[4.2.2. Compressing Rotations](#_compressing_rotations)
[4.2.3. Compressing Scales](#_compressing_scales)
[4.2.4. Compressing Opacity and Color](#_compressing_opacity_and_color)

[4.3. Compression Ratios in Practice](#_compression_ratios_in_practice)
[4.4. SPZ Compression: The Official Standard](#_spz_compression_the_official_standard)

[4.4.1. How SPZ Works](#_how_spz_works)
[4.4.2. The Practical Impact](#_the_practical_impact_2)
[4.4.3. Graceful Degradation](#_graceful_degradation)
[4.4.4. Base Extension vs Compression Extension](#_base_extension_vs_compression_extension)

[4.5. Additional Compression Techniques](#_additional_compression_techniques)

[4.5.1. 1. Mesh Compression Standards](#_1_mesh_compression_standards)
[4.5.2. 2. Container-Level Compression](#_2_container_level_compression)

[4.6. GLTF Structure with SPZ Compression](#_gltf_structure_with_spz_compression)

[5. Framework Integration](#_framework_integration)

[5.1. SplatInstance Layout](#_splatinstance_layout)
[5.2. GLTF Loader Extension](#_gltf_loader_extension)

[6. Reading Gaussian Splats from GLTF](#_reading_gaussian_splats_from_gltf)

[6.1. Step 1: Detecting Gaussian Splat Data](#_step_1_detecting_gaussian_splat_data)
[6.2. Step 2: Extracting Extension Data](#_step_2_extracting_extension_data)
[6.3. Step 3: Reading Buffer Data](#_step_3_reading_buffer_data)
[6.4. Step 4: Creating GPU Buffers](#_step_4_creating_gpu_buffers)
[6.5. Step 5: Handling Quantized Data](#_step_5_handling_quantized_data)
[6.6. Complete Loading Example](#_complete_loading_example)
[6.7. Error Handling and Validation](#_error_handling_and_validation)

[7. Rendering Gaussian Splats](#_rendering_gaussian_splats)

[7.1. The Big Picture](#_the_big_picture)
[7.2. The Projection Math (Don’t Worry, I’ll Explain)](#_the_projection_math_dont_worry_ill_explain)
[7.3. The Vertex Shader: Where the Magic Happens](#_the_vertex_shader_where_the_magic_happens)
[7.4. The Fragment Shader: Evaluating the Gaussian](#_the_fragment_shader_evaluating_the_gaussian)
[7.5. Premultiplied Alpha](#_premultiplied_alpha)
[7.6. Vulkan Pipeline Configuration](#_vulkan_pipeline_configuration)
[7.7. Drawing Gaussian Splats](#_drawing_gaussian_splats)

[8. Depth Sorting](#_depth_sorting)

[8.1. CPU Sorting](#_cpu_sorting)
[8.2. GPU Radix Sort](#_gpu_radix_sort)
[8.3. Tile-Based Sorting](#_tile_based_sorting)

[9. Performance Considerations](#_performance_considerations)

[9.1. Culling](#_culling)
[9.2. Level of Detail](#_level_of_detail)
[9.3. Memory Layout](#_memory_layout)

[10. Sample Usage](#_sample_usage)
[11. Future Enhancements](#_future_enhancements)

[11.1. Spherical Harmonics](#_spherical_harmonics)
[11.2. Anti-Aliasing](#_anti_aliasing)
[11.3. Streaming](#_streaming)

[12. References](#_references)

[12.1. What This Sample Demonstrates](#_what_this_sample_demonstrates)

This tutorial demonstrates how to render 3D Gaussian Splats using Vulkan. Gaussian splatting is a novel approach to real-time radiance field rendering that represents scenes as collections of 3D Gaussians, enabling high-quality novel view synthesis at interactive frame rates.

For background on the render_octomap sample and its SLAM context, see the [README](../README.adoc).

Imagine you’re trying to capture a real-world scene - maybe a room in your house or an outdoor environment - and you want to render it back in 3D. Traditionally, you might create a mesh with triangles and textures. But what if the scene has complex geometry like plants, fur, or intricate details? Meshes become unwieldy, and you need thousands of triangles plus UV mapping.

Enter Gaussian splats. Instead of triangles, think of the scene as being made up of thousands (or millions) of soft, fuzzy blobs floating in 3D space. Each blob is a 3D Gaussian - mathematically speaking, it’s that familiar bell curve from statistics, but extended into three dimensions. These Gaussians can be squashed, stretched, and rotated to match the shape of whatever they’re representing.

Don’t worry - the math isn’t as scary as it looks. Each Gaussian is essentially defined by "where it is" and "what shape it has." The classic 3D Gaussian formula is:

  

  

This basically says: the further you get from the center (`μ`), the more the value falls off, and the rate of falloff depends on the covariance matrix (`Σ`). The covariance matrix encodes both the size and orientation of the Gaussian.

Now here’s the clever part: instead of storing that covariance matrix directly (which would be 9 numbers), we split it into rotation and scale. Think of it like describing an ellipsoid by saying "take a sphere, stretch it by these amounts along each axis, then rotate it." Mathematically:

  

  

The rotation `R` orients the Gaussian in space (stored as a quaternion - 4 numbers), and the scale `S` determines how stretched it is along each axis (3 numbers). This decomposition makes Gaussians easy to manipulate: you can rotate them, scale them, and move them around independently.

So what data do we actually need to store for each of these fuzzy blobs? Let’s break it down:

First, obviously, we need to know **where** it is in 3D space - that’s the position (x, y, z), which takes 12 bytes if we use 32-bit floats. Then we need to know **how it’s oriented** - that’s the rotation stored as a quaternion (4 values = 16 bytes). The **size** comes from the scale factors (3 values = 12 bytes). We also need to know how **see-through** it is, which is the opacity (1 value = 4 bytes).

Finally, there’s color. The simplest approach is just RGB (3 values = 12 bytes), but here’s where things get interesting: you can instead store spherical harmonics coefficients. These are like a compact way of encoding how the color changes depending on which angle you’re viewing from - think of how real objects look different colors from different angles due to lighting. Full degree-3 spherical harmonics takes 48 float values (192 bytes), which is substantial but gives you view-dependent appearance for free.

Add it all up: a simple RGB splat is 56 bytes, while one with full spherical harmonics is 236 bytes. Now multiply that by a million splats…​ yeah, we’ll need to talk about compression later.

You might be wondering, "Why Gaussians specifically? Why not some other shape?" Great question. Gaussians have some special mathematical properties that make them perfect for this:

They’re **smooth and continuous** - no hard edges means everything blends together naturally to create high-quality images. They’re **differentiable everywhere**, which means you can use gradient descent to optimize them (critical for training). They have a **closed-form projection** from 3D to 2D - we can mathematically project a 3D Gaussian onto the screen as a 2D Gaussian without approximation. They’re **fast to evaluate** - just an exponential function. And they naturally support **alpha blending** through the opacity value, so transparent objects just work.

If you’ve worked with 3D rendering, you’re probably comparing Gaussian splats to techniques you already know. Let’s talk about how they stack up.

**Versus NeRF (Neural Radiance Fields):** NeRF was groundbreaking - it showed you could represent scenes as neural networks and get photorealistic results. But rendering a NeRF means ray marching through a neural network, which is slow. We’re talking seconds per frame. Gaussian splats flip this around: instead of a neural network, you have an explicit collection of Gaussians that you can rasterize directly on the GPU. This gets you from "seconds per frame" to "60+ frames per second." The downside? You’re storing more data (millions of splats vs. network weights), but with compression (coming up later), this becomes manageable. Plus, explicit splats are way easier to edit, manipulate, and stream than a neural network.

**Versus Traditional Meshes:** Meshes are great for engineered objects - cars, buildings, game characters. But try capturing a real-world scene with tons of fine detail like tree leaves, grass, or fuzzy surfaces. You’ll need millions of triangles, and you still won’t capture the subtle transparency and view-dependent effects naturally. Gaussian splats excel here: each splat can be transparent, and with spherical harmonics, the color automatically changes with viewing angle. No UV mapping, no texture atlases - the appearance is baked into the splats themselves.

**Versus Point Clouds:** Point clouds are simple - just a bunch of points in space with colors. But they have problems: zoom in and you see gaps between points; zoom out and you get aliasing. Gaussian splats solve both issues. Each "point" is actually a fuzzy blob that blends with its neighbors, so no gaps. The Gaussian falloff provides natural anti-aliasing. And because splats are oriented ellipsoids (not just spheres), they can represent surfaces more efficiently - one elongated splat can cover the area that would need many spherical points.

Here’s the thing: having a cool rendering technique is great, but if nobody can share their work, it stays isolated. This is where the `KHR_gaussian_splatting` GLTF extension comes in, and it’s more important than you might think.

Think about your workflow: you capture a scene, process it, and want to share it. With GLTF:

You can upload it to a Vulkan application that streams the splats to the GPU progressively - load a low-detail version first, then stream in more detail as needed. You can import it into game engines for XR applications - imagine walking through a captured real-world environment in VR. Museums can archive cultural heritage scans in a format that won’t become obsolete. Film productions can use captured environments as background plates or reference geometry. All using standard tools and pipelines.

And here’s a bonus: GLTF already has extensions for compression (`KHR_mesh_quantization`, `KHR_draco_mesh_compression`). These work with Gaussian splats too, which brings us to our next topic.

{
  "extensionsUsed": ["KHR_gaussian_splatting"],
  "meshes": [{
    "name": "GaussianSplats",
    "primitives": [{
      "attributes": {
        "POSITION": 0,
        "KHR_gaussian_splatting:ROTATION": 1,
        "KHR_gaussian_splatting:SCALE": 2,
        "KHR_gaussian_splatting:OPACITY": 3,
        "KHR_gaussian_splatting:SH_DEGREE_0_COEF_0": 4
      },
      "extensions": {
        "KHR_gaussian_splatting": {
          "kernel": "ellipse",
          "colorSpace": "sRGB",
          "antialiased": false,
          "shDegree": 0
        }
      },
      "mode": 0
    }]
  }]
}

| Attribute | Type | Description |
| --- | --- | --- |
| POSITION | VEC3 | Splat center positions |
| ROTATION | VEC4 | Quaternion orientations |
| SCALE | VEC3 | 3D scale factors |
| OPACITY | SCALAR | Alpha values (0-1) |
| COLOR_0 | VEC3 | RGB colors |
| SH_DEGREE_0_COEF_0 | MAT3 | Spherical harmonics coefficients |

* 
`antialiased`: Enable anti-aliasing filter

* 
`colorSpace`: Color space ("BT.709-sRGB" or "linear")

* 
`kernel`: Splat kernel type ("ellipse" or "sphere")

* 
`shDegree`: Spherical harmonics degree (0-3)

Okay, let’s talk about the scary limiting factor: file size. Remember when we said a splat with spherical harmonics takes 236 bytes? And a typical scene has a million splats? Let’s do the math:

1 million splats × 236 bytes = 236 megabytes. For a single room.

5 million splats × 236 bytes = 1.18 gigabytes. For a larger scene.

Now imagine trying to load that on a mobile device. Or stream it over a network. Or store thousands of these captures. The raw data sizes are simply not practical for real-world use. Compression isn’t a nice-to-have feature - it’s absolutely essential.

| Scene Size | Splat Count | Uncompressed Size (RGB) | Uncompressed Size (SH Degree 3) |
| --- | --- | --- | --- |
| Small room | 500,000 | 28 MB | 118 MB |
| Large room | 2,000,000 | 112 MB | 472 MB |
| Building floor | 5,000,000 | 280 MB | 1.18 GB |
| Outdoor scene | 10,000,000 | 560 MB | 2.36 GB |

The good news? Gaussian splat data compresses really well, and the secret is quantization. Here’s the insight: do we **really** need 32-bit float precision for everything?

Think about it: if a splat’s position is off by 0.0001 units, will anyone notice? If a rotation quaternion has a tiny error, will the visual result be different? Spoiler: usually not. Gaussian splat data has some properties that make it perfect for compression:

**Spatial coherence** - nearby splats tend to look similar. If you have 100 splats representing a wall, they probably have similar colors, scales, and orientations.

**Perceptual tolerance** - our eyes are forgiving. Small errors in rotation, position, or color get lost in the final blended image.

**Redundancy** - many splats share similar properties. Lots of splats might have the same opacity, or similar scales.

So instead of using 32 bits per number, let’s see what happens when we use fewer bits…​

Let’s start with positions. Here’s a clever trick: instead of storing absolute world coordinates, we normalize them relative to the scene bounds. Say your scene extends from (0, 0, 0) to (10, 10, 10). We can express any position as a fraction from 0 to 1 along each axis:

// Normalize position to [0, 1] range
vec3 normalized = (position - scene_min) / (scene_max - scene_min);

// Now instead of using floats, use 16-bit integers
uint16_t x = (uint16_t)(normalized.x * 65535.0f);
uint16_t y = (uint16_t)(normalized.y * 65535.0f);
uint16_t z = (uint16_t)(normalized.z * 65535.0f);

// We just went from 12 bytes to 6 bytes - that's 50% savings!

How much precision did we lose? A 16-bit integer gives you 65,536 steps. For a 10-meter room, that’s 0.15mm precision. Can your eye see a 0.15mm position error after everything is blended? Nope.

Rotations are trickier. A quaternion has 4 components, but here’s a mathematical fact: if you know 3 of them, you can calculate the 4th (since quaternions are normalized: x² + y² + z² + w² = 1). This gives us the "smallest-three" encoding:

// Find the largest component (so we can reconstruct it accurately)
int largest_idx = find_largest_component(quat);

// Store only the other three
vec3 smallest_three = extract_other_components(quat, largest_idx);

// Quantize these to 16-bit integers (or 10-bit for more aggressive compression)
int16_t q1 = (int16_t)(smallest_three.x * 32767.0f);
int16_t q2 = (int16_t)(smallest_three.y * 32767.0f);
int16_t q3 = (int16_t)(smallest_three.z * 32767.0f);

// 16 bytes → 6 bytes (plus 2 bits to store which component we dropped)

That’s a 62.5% reduction! The SPZ format in the official GLTF extension takes this further, using **10-bit signed integers** for each of the three components plus 2 bits for the index, fitting everything into just 32 bits total. This gives excellent precision while cutting storage to just 4 bytes per rotation.

Scale factors tend to cluster around certain ranges - most splats aren’t huge or tiny. But here’s the thing: scale values can vary by orders of magnitude (a splat might be 0.01 units or 10 units). If we quantize them linearly, we waste precision on large values and don’t have enough for small values.

Solution? Logarithmic encoding. We store log₂(scale) instead of scale directly:

// Take the log first (now our range is more uniform)
vec3 log_scale = log2(scale);

// Quantize to 16-bit (now we have good precision across the range)
uint16_t sx = quantize_to_range(log_scale.x, -8.0f, 8.0f, 65535);
uint16_t sy = quantize_to_range(log_scale.y, -8.0f, 8.0f, 65535);
uint16_t sz = quantize_to_range(log_scale.z, -8.0f, 8.0f, 65535);

// 12 bytes → 6 bytes, with better precision distribution

These are the easiest wins. Opacity is just a number from 0 to 1. Do we need float precision? Nope - 8 bits gives you 256 levels of transparency, which is way more than anyone can distinguish:

uint8_t opacity = (uint8_t)(opacity_float * 255.0f);
// 4 bytes → 1 byte (75% reduction!)

Colors are similar. RGB with 32-bit floats? Overkill. Standard 8-bit per channel (like every image format uses) works great:

uint8_t r = (uint8_t)(color.r * 255.0f);
uint8_t g = (uint8_t)(color.g * 255.0f);
uint8_t b = (uint8_t)(color.b * 255.0f);
// 12 bytes → 3 bytes (75% reduction)

Even spherical harmonics coefficients can be quantized down to 8 or 16 bits per value. Sure, you lose some of the subtle view-dependent effects, but 192 bytes → 48 bytes (75% savings) is worth the imperceptible quality loss in most cases.

| Attribute | Original Size | Quantized Size | Reduction |
| --- | --- | --- | --- |
| Position | 12 bytes | 6 bytes (uint16×3) | 50% |
| Rotation | 16 bytes | 6 bytes (smallest-3) | 62.5% |
| Scale | 12 bytes | 6 bytes (uint16×3) | 50% |
| Opacity | 4 bytes | 1 byte (uint8) | 75% |
| Color (RGB) | 12 bytes | 3 bytes (uint8×3) | 75% |
| SH Degree 3 | 192 bytes | 48 bytes (uint8×48) | 75% |
| **Total (RGB)** | **56 bytes** | **22 bytes** | **61% reduction** |
| **Total (SH)** | **236 bytes** | **70 bytes** | **70% reduction** |

Here’s the real story about compression in the GLTF standard: the `KHR_gaussian_splatting` extension works alongside a companion extension called `KHR_gaussian_splatting_compression_spz` that handles compression using the SPZ format.

SPZ (Splat compression format) was specifically designed for Gaussian splats and achieves up to **90% compression compared to uncompressed PLY** while preserving visual fidelity and performance. PLY (Polygon File Format) is the original file format used to store raw Gaussian splat data before standardization in GLTF - it’s essentially a flat binary dump of all splat attributes without any compression. This isn’t a repurposed mesh compression format - it’s purpose-built for splat data.

SPZ is clever about how it stores Gaussian splat attributes. The format can be used in two ways:

**Option 1 - Decompressed to attributes:** The SPZ blob gets decompressed into standard GLTF accessors (position, rotation, scale, etc.) that your renderer reads normally.

**Option 2 - Direct to rendering pipeline:** Advanced implementations can pass the compressed SPZ data directly to the GPU and decompress in shaders, saving memory bandwidth.

The compression itself uses aggressive quantization optimized for splat data:

**Positions** are stored relative to scene bounds and quantized.

**Rotations** use an improved encoding: the smallest three components of the normalized quaternion are stored as **10-bit signed integers** (not 16-bit like earlier approaches), and the largest component is derived. The index of which component was dropped is stored in just 2 bits. This gives excellent precision in only 32 bits total.

**Scales and opacity** are quantized to appropriate bit depths.

**Spherical harmonics** (if present) support flexible encoding from degree 0 (no SH, just diffuse) up to degree 3 (full view-dependent appearance), letting you trade file size for visual quality.

Let’s revisit our 1 million splat scene with the actual SPZ numbers:

* 
**Uncompressed PLY**: 236 MB (with degree-3 spherical harmonics)

* 
**SPZ compressed**: ~24 MB (90% reduction)

That’s right - the standard claims 90% compression while maintaining visual fidelity. A 24 MB file downloads in under 3 seconds on most mobile connections. That’s the difference between "impractical" and "production-ready."

Here’s something smart: the `KHR_gaussian_splatting` extension includes graceful fallback to sparse point cloud rendering. If a viewer doesn’t support Gaussian splat rendering, it can fall back to rendering the splats as simple points. You won’t get the smooth, blended appearance, but you’ll see **something** rather than nothing.

It’s important to understand there are two related extensions:

**KHR_gaussian_splatting** - The base extension that defines how Gaussian splats are represented in GLTF. Splats are treated as point primitives with attributes for position, rotation, scale, transparency, and spherical harmonics.

**KHR_gaussian_splatting_compression_spz** - The companion extension that defines SPZ compression. This is optional but highly recommended for any practical use case.

You can technically use the base extension without compression (storing uncompressed splat data in GLTF buffers) however, this is only useful in the small scenes due to large file sizes.

Beyond SPZ compression, you can stack additional optimizations:

GLTF supports the `KHR_mesh_quantization` extension, which can work alongside Gaussian splats:

* 
Normalized integers for positions and other attributes

* 
Automatic dequantization in vertex shaders

* 
Interoperability with existing GLTF tooling

The quantization parameters are stored in the GLTF JSON, working in harmony with SPZ compression.

On top of SPZ, you **can**

* 
**GZIP the entire GLTF package**: Compress the .gltf and binary buffers together (modest additional savings)

* 
**GLB format with compression**: Use the binary GLTF format with built-in compression

When you use the `KHR_gaussian_splatting_compression_spz` extension, the GLTF structure looks like this:

{
  "extensionsUsed": [
    "KHR_gaussian_splatting",
    "KHR_gaussian_splatting_compression_spz"
  ],
  "meshes": [{
    "name": "GaussianSplats",
    "primitives": [{
      "mode": 0,  // POINTS
      "attributes": {
        "POSITION": 0,
        "KHR_gaussian_splatting:ROTATION": 1,
        "KHR_gaussian_splatting:SCALE": 2,
        "KHR_gaussian_splatting:OPACITY": 3,
        "KHR_gaussian_splatting:SH_DEGREE_0_COEF_0": 4
      },
      "extensions": {
        "KHR_gaussian_splatting": {
          "kernel": "ellipse",
          "colorSpace": "sRGB",
          "antialiased": false,
          "shDegree": 0
        },
        "KHR_gaussian_splatting_compression_spz": {
          "buffer": 5,  // Points to SPZ blob
          "byteOffset": 0,
          "byteLength": 25000000
        }
      }
    }]
  }],
  "buffers": [{
    "uri": "splats.spz",
    "byteLength": 25000000
  }]
}

The SPZ blob is stored as a buffer that the loader can either:

Decompress into the standard accessors (POSITION, ROTATION, etc.)

Pass directly to GPU shaders for decompression

This flexibility means renderers can choose the approach that works best for their architecture, while the data format remains standard and portable.

The Vulkan-Samples framework has been extended to support gaussian splats:

Rather than using a separate scene-graph component, the sample stores splat data directly as a packed array of `SplatInstance` structs (Array of Structures layout):

// From render_octomap.h
struct SplatInstance
{
    float pos[3];
    float rot[4];
    float scale[3];
    float opacity;
    float color[3];
    float _pad;  // padding to 16-byte alignment
};

std::vector          splat_instances_cpu;
std::unique_ptr splat_instance_buffer;
uint32_t                            splat_count{0};

All splat attributes are interleaved in a single buffer, which the GPU reads using a single instanced vertex binding. The UBO contains the matrices and focal lengths for the projection math:

struct
{
    glm::mat4 projection;
    glm::mat4 view;
    glm::vec2 viewport;
    float     focalX;
    float     focalY;
} splat_ubo;

The `GLTFLoader` class recognizes the `KHR_gaussian_splatting` extension:

// In gltf_loader.h
#define KHR_GAUSSIAN_SPLATTING_EXTENSION "KHR_gaussian_splatting"

// In gltf_loader.cpp
std::unordered_map GLTFLoader::supported_extensions = {
    {KHR_LIGHTS_PUNCTUAL_EXTENSION, false},
    {KHR_GAUSSIAN_SPLATTING_EXTENSION, false}
};

Loading Gaussian splats from GLTF involves several steps: parsing the JSON structure, reading binary buffers, and creating GPU resources.

|  | The code snippets in this section illustrate the general loading pattern. The actual sample (`render_octomap.cpp`, function `load_gaussian_splats_data`) uses a simpler, more direct approach: it reads all accessor data in a single pass into `SplatInstance` structs without a generic template, and only handles float-component accessors since that is what our GLTF files contain. The conceptual pattern below is useful when writing a more general-purpose loader. |
| --- | --- |

First, check if a GLTF file contains Gaussian splats:

bool has_gaussian_splats(const tinygltf::Model& model)
{
    // Check if the extension is used
    auto it = std::find(model.extensionsUsed.begin(),
                        model.extensionsUsed.end(),
                        "KHR_gaussian_splatting");
    if (it == model.extensionsUsed.end())
        return false;

    // Check if any mesh primitive uses the extension
    for (const auto& mesh : model.meshes)
    {
        for (const auto& primitive : mesh.primitives)
        {
            if (primitive.extensions.find("KHR_gaussian_splatting") !=
                primitive.extensions.end())
            {
                return true;
            }
        }
    }
    return false;
}

Parse the extension JSON to get accessor indices:

struct GaussianSplatExtension
{
    int position_accessor = -1;
    int rotation_accessor = -1;
    int scale_accessor = -1;
    int opacity_accessor = -1;
    int color_accessor = -1;
    std::vector sh_accessors;

    int sh_degree = 0;
    bool antialiased = false;
    std::string color_space = "BT.709-sRGB";
    std::string kernel = "ellipse";
};

GaussianSplatExtension parse_extension(const tinygltf::Model& model, const tinygltf::Primitive& primitive)
{
    GaussianSplatExtension ext;

    // Helper to get attribute accessor index
    auto get_attrib = [&](const std::string& name) {
        auto it = primitive.attributes.find(name);
        return (it != primitive.attributes.end()) ? it->second : -1;
    };

    // Get accessor indices from attributes (KHR spec)
    ext.position_accessor = get_attrib("POSITION");
    ext.rotation_accessor = get_attrib("KHR_gaussian_splatting:ROTATION");
    ext.scale_accessor    = get_attrib("KHR_gaussian_splatting:SCALE");
    ext.opacity_accessor  = get_attrib("KHR_gaussian_splatting:OPACITY");
    ext.color_accessor    = get_attrib("KHR_gaussian_splatting:SH_DEGREE_0_COEF_0");

    // Fallback to old draft names or COLOR_0 if needed
    if (ext.color_accessor second.IsObject())
    {
        const auto& ext_value = it->second;
        if (ext_value.Has("kernel"))
            ext.kernel = ext_value.Get("kernel").Get();
        if (ext_value.Has("colorSpace"))
            ext.color_space = ext_value.Get("colorSpace").Get();
        if (ext_value.Has("shDegree"))
            ext.sh_degree = ext_value.Get("shDegree").Get();
        if (ext_value.Has("antialiased"))
            ext.antialiased = ext_value.Get("antialiased").Get();
    }

    return ext;
}

GLTF stores data in buffers accessed through accessors:

// Number of float components per accessor.type ("SCALAR", "VEC3", ...).
size_t componentCount(const std::string& type)
{
    if (type == "SCALAR") return 1;
    if (type == "VEC2")   return 2;
    if (type == "VEC3")   return 3;
    if (type == "VEC4")   return 4;
    if (type == "MAT3")   return 9;
    if (type == "MAT4")   return 16;
    return 0;
}

// Returns accessor.count * componentCount(accessor.type) floats.
// Assumes a float component type; integer or normalized integer
// accessors require their own dequantization path.
std::vector read_accessor_data(const tinygltf::Model& model, int accessor_idx)
{
    if (accessor_idx = model.accessors.size())
        return {};

    const auto& accessor = model.accessors[accessor_idx];
    const auto& buffer_view = model.bufferViews[accessor.bufferView];
    const auto& buffer = model.buffers[buffer_view.buffer];

    size_t num_components = componentCount(accessor.type);
    std::vector data(accessor.count * num_components);

    // Calculate byte stride
    size_t byte_stride = buffer_view.byteStride;
    if (byte_stride == 0)
        byte_stride = accessor.ByteStride(buffer_view);

    // Read data
    const unsigned char* src = buffer.data.data() +
                               buffer_view.byteOffset +
                               accessor.byteOffset;

    for (size_t i = 0; i (src + i * byte_stride);
            if (accessor.normalized)
            {
                // Convert [0, 65535] to [0.0, 1.0]
                for (size_t j = 0; j 

Transfer the loaded data to GPU buffers:

std::unique_ptr create_gaussian_splat_from_gltf(
    const tinygltf::Model& model,
    const tinygltf::Primitive& primitive,
    vkb::Device& device)
{
    auto splat = std::make_unique();

    // Get extension data
    auto ext_it = primitive.extensions.find("KHR_gaussian_splatting");
    if (ext_it == primitive.extensions.end())
        return nullptr;

    GaussianSplatExtension ext = parse_extension(ext_it->second);

    // Read positions (from standard POSITION attribute)
    auto positions = read_accessor_data(
        model, primitive.attributes.at("POSITION"));
    splat->splat_count = positions.size();

    // Read rotations
    auto rotations = read_accessor_data(
        model, ext.rotation_accessor);

    // Read scales
    auto scales = read_accessor_data(
        model, ext.scale_accessor);

    // Read opacities
    auto opacities = read_accessor_data(
        model, ext.opacity_accessor);

    // Read colors
    auto colors = read_accessor_data(
        model, primitive.attributes.at("COLOR_0"));

    // Create GPU buffers
    splat->position_buffer = create_device_buffer(
        device, positions.data(),
        positions.size() * sizeof(glm::vec3),
        VK_BUFFER_USAGE_VERTEX_BUFFER_BIT);

    splat->rotation_buffer = create_device_buffer(
        device, rotations.data(),
        rotations.size() * sizeof(glm::vec4),
        VK_BUFFER_USAGE_VERTEX_BUFFER_BIT);

    splat->scale_buffer = create_device_buffer(
        device, scales.data(),
        scales.size() * sizeof(glm::vec3),
        VK_BUFFER_USAGE_VERTEX_BUFFER_BIT);

    splat->opacity_buffer = create_device_buffer(
        device, opacities.data(),
        opacities.size() * sizeof(float),
        VK_BUFFER_USAGE_VERTEX_BUFFER_BIT);

    splat->color_buffer = create_device_buffer(
        device, colors.data(),
        colors.size() * sizeof(glm::vec3),
        VK_BUFFER_USAGE_VERTEX_BUFFER_BIT);

    // Store extension properties
    splat->sh_degree = ext.sh_degree;
    splat->antialiased = ext.antialiased;
    splat->kernel = (ext.kernel == "sphere") ?
        GaussianSplat::KernelType::Sphere :
        GaussianSplat::KernelType::Ellipse;
    splat->color_space = (ext.color_space == "linear") ?
        GaussianSplat::ColorSpace::Linear :
        GaussianSplat::ColorSpace::SRGB;

    return splat;
}

If the GLTF uses `KHR_mesh_quantization`, dequantization must be handled:

// In vertex shader, dequantize positions
layout(location = 0) in vec3 inPositionQuantized;  // uint16 normalized

uniform vec3 quantization_min;
uniform vec3 quantization_range;

void main()
{
    // Dequantize: [0, 1] → [min, min + range]
    vec3 position = quantization_min + inPositionQuantized * quantization_range;

    // Continue with normal processing...
}

Or dequantize on CPU during loading:

glm::vec3 dequantize_position(uint16_t x, uint16_t y, uint16_t z,
                               const glm::vec3& min, const glm::vec3& range)
{
    return min + glm::vec3(
        (float)x / 65535.0f * range.x,
        (float)y / 65535.0f * range.y,
        (float)z / 65535.0f * range.z
    );
}

The sample doesn’t route splats through a scene-graph component at all. Instead, `render_octomap::load_gaussian_splats_data()` parses each cell’s GLTF directly and appends the result into a single flat `std::vector` (see "Framework Integration" above), and `render_octomap::load_gaussian_splats_scene()` collects the per-cell GLTF files and drives the loop:

void render_octomap::load_gaussian_splats_scene(const std::string &scene_dir)
{
    splat_instances_cpu.clear();
    splat_instance_buffer.reset();

    // Collect all *_cell_*.gltf files in the directory, then sort for
    // deterministic order (the scene is stored as tiled grid cells).
    std::vector cell_files;
    for (auto &entry : std::filesystem::directory_iterator(full_dir))
    {
        std::string name = entry.path().filename().string();
        if (name.find("_cell_") != std::string::npos && name.ends_with(".gltf"))
            cell_files.push_back(scene_dir + "/" + name);
    }
    std::sort(cell_files.begin(), cell_files.end());

    for (auto &f : cell_files)
        load_gaussian_splats_data(f);        // appends into splat_instances_cpu

    splat_count           = static_cast(splat_instances_cpu.size());
    splat_instance_buffer = std::make_unique(get_device(),
                                                                 splat_instances_cpu.size() * sizeof(SplatInstance),
                                                                 VK_BUFFER_USAGE_VERTEX_BUFFER_BIT,
                                                                 VMA_MEMORY_USAGE_CPU_TO_GPU);
    auto *buf = splat_instance_buffer->map();
    memcpy(buf, splat_instances_cpu.data(), splat_instances_cpu.size() * sizeof(SplatInstance));
    splat_instance_buffer->flush();
    splat_instance_buffer->unmap();

    create_splat_pipeline(render_pass);
}

`load_gaussian_splats_data()` reads the POSITION/ROTATION/SCALE/OPACITY/COLOR_0 accessors for a single cell straight out of the GLTF buffers (using the same accessor-decoding approach as "Step 3: Reading Buffer Data" above) and appends the resulting `SplatInstance` entries to `splat_instances_cpu`; the GPU buffer is only (re)built once, after all cells have loaded, in `load_gaussian_splats_scene()` above.

The loader validates as it goes, logging and bailing out of the current cell rather than asserting, since a malformed cell shouldn’t take down the whole map:

if (model.meshes.empty() || model.meshes[0].primitives.empty())
{
    LOGE("Splats gltf has no meshes/primitives: {}", filename);
    return;
}

// ... resolve POSITION / ROTATION / SCALE / OPACITY / COLOR_0 accessors ...

if (rot_accessor 

After all cells are loaded, `load_gaussian_splats_scene()` checks that at least one splat was found before creating GPU resources:

if (splat_instances_cpu.empty())
{
    LOGE("No splat data loaded from {}", scene_dir);
    return;
}

Now for the fun part: actually getting these splats on screen. The rendering process is surprisingly elegant once you understand what’s happening. We’re going to take 3D Gaussians floating in space and project them onto the 2D screen, then rasterize them as quads (like billboards), and finally evaluate the Gaussian function per-pixel to get smooth, blended results.

Before we dive into shader code, let’s understand the pipeline:

**Step 1 - Vertex Shader:** For each splat, we need to figure out what it looks like on screen. This means projecting the 3D Gaussian to a 2D Gaussian on the screen, calculating how big it should appear, and generating a billboard quad to cover it.

**Step 2 - Rasterization:** The GPU’s fixed-function hardware rasterizes our quads into pixels. Nothing special here - same as any other geometry.

**Step 3 - Fragment Shader:** For each pixel, we evaluate the 2D Gaussian function. This gives us a smooth falloff from the center to the edges. We multiply by the opacity and color, output premultiplied alpha, and we’re done.

**Step 4 - Blending:** The GPU blends all the quads together using alpha blending. Since we’re outputting premultiplied alpha, the blend equation is `result = src + dst * (1 - src.alpha)` — this is correct because `src.rgb` already has alpha baked in. This only produces the right result when splats are drawn back-to-front (depth sorted), which is why sorting is a required step before rendering.

Here’s the tricky part: we have a 3D Gaussian blob floating in space with its 3D covariance matrix   . We need to project it onto the 2D screen and figure out what its 2D covariance matrix    should be. If we get this wrong, the splat will look stretched or squashed on screen.

The good news? There’s a closed-form solution using the Jacobian of the perspective projection. The formula is:

  

  

Let’s break this down in English:    is the rotation part of the view matrix (how the camera is oriented).    is the Jacobian, which captures how perspective projection distorts things — objects closer to the camera project larger than distant objects.

The Jacobian looks like this:

  

  

Where `(x, y, z)` is where the splat is in view space (camera coordinates), and `(fₓ, fᵧ)` are the focal lengths from your projection matrix. Notice how everything is divided by z? That’s the perspective part - further away means smaller projection.

You don’t need to memorize this formula. What matters is: we can compute exactly how a 3D Gaussian projects to 2D, which means our shader can do this in real-time.

Alright, let’s build the vertex shader that does all this math. This shader runs once per splat vertex (we’ll draw 4 vertices per splat to make a quad). The shader’s job is to:

Take the 3D splat data (position, rotation, scale)

Build the 3D covariance matrix

Project it to 2D using that Jacobian formula

Figure out how big the splat appears on screen

Generate a quad corner position

Pass along everything the fragment shader needs

Here’s the complete implementation with comments explaining each step:

#version 450

// Per-splat attributes
layout(location = 0) in vec3 inPosition;    // Splat center
layout(location = 1) in vec4 inRotation;    // Quaternion
layout(location = 2) in vec3 inScale;       // Scale factors
layout(location = 3) in float inOpacity;    // Opacity [0, 1]
layout(location = 4) in vec3 inColor;       // RGB color

// Uniform buffer
layout(binding = 0) uniform UBO {
    mat4 view;
    mat4 proj;
    vec2 viewport;  // Width, height
    vec2 focal;     // fx, fy
} ubo;

// Output to fragment shader
layout(location = 0) out vec3 outColor;
layout(location = 1) out float outOpacity;
layout(location = 2) out vec2 outCoord;  // Gaussian coordinates

// Convert quaternion to rotation matrix
mat3 quaternionToMatrix(vec4 q)
{
    float x = q.x, y = q.y, z = q.z, w = q.w;

    return mat3(
        1.0 - 2.0*(y*y + z*z),  2.0*(x*y - w*z),        2.0*(x*z + w*y),
        2.0*(x*y + w*z),        1.0 - 2.0*(x*x + z*z),  2.0*(y*z - w*x),
        2.0*(x*z - w*y),        2.0*(y*z + w*x),        1.0 - 2.0*(x*x + y*y)
    );
}

// Compute Jacobian of perspective projection
mat3 computeJacobian(vec3 viewPos, vec2 focal)
{
    float x = viewPos.x;
    float y = viewPos.y;
    float z = viewPos.z;
    float z2 = z * z;

    // Jacobian maps 3D displacements to 2D screen displacements
    return mat3(
        focal.x / z,  0.0,           -focal.x * x / z2,
        0.0,          focal.y / z,   -focal.y * y / z2,
        0.0,          0.0,            0.0  // We only need 2x3, pad with zeros
    );
}

// Compute eigenvalues of 2x2 symmetric matrix (for radius calculation)
vec2 eigenvalues2x2(mat2 m)
{
    float a = m[0][0];
    float b = m[0][1];  // = m[1][0] since symmetric
    float c = m[1][1];

    float trace = a + c;
    float det = a * c - b * b;
    float discriminant = sqrt(max(0.0, trace * trace - 4.0 * det));

    float lambda1 = 0.5 * (trace + discriminant);
    float lambda2 = 0.5 * (trace - discriminant);

    return vec2(lambda1, lambda2);
}

void main()
{
    // 1. Transform splat center to view space
    vec4 viewPos = ubo.view * vec4(inPosition, 1.0);

    // Cull splats behind camera
    if (viewPos.z > 0.0) {
        gl_Position = vec4(0.0, 0.0, -1.0, 1.0);
        return;
    }

    // 2. Build 3D covariance matrix from rotation and scale
    mat3 R = quaternionToMatrix(inRotation);
    mat3 S = mat3(
        inScale.x, 0.0,       0.0,
        0.0,       inScale.y, 0.0,
        0.0,       0.0,       inScale.z
    );

    // Covariance: Σ = R S S^T R^T
    mat3 M = R * S;
    mat3 cov3D = M * transpose(M);

    // 3. Project 3D covariance to 2D
    mat3 J = computeJacobian(viewPos.xyz, ubo.focal);
    mat3 W = mat3(ubo.view);  // Extract rotation part only
    mat3 T = J * W;

    // Σ₂D = T Σ₃D T^T (only need upper 2x2 block)
    mat3 cov2Dfull = T * cov3D * transpose(T);
    mat2 cov2D = mat2(
        cov2Dfull[0][0], cov2Dfull[0][1],
        cov2Dfull[1][0], cov2Dfull[1][1]
    );

    // Add small value to diagonal for numerical stability
    cov2D[0][0] += 0.3;
    cov2D[1][1] += 0.3;

    // 4. Compute splat radius from eigenvalues
    vec2 eigenvals = eigenvalues2x2(cov2D);
    float maxEigenval = max(eigenvals.x, eigenvals.y);
    float radius = ceil(3.0 * sqrt(maxEigenval));  // 3 sigma = 99.7% coverage

    // 5. Generate billboard quad
    // gl_VertexIndex tells us which corner of the quad we're generating
    // Use instanced rendering with 4 vertices per splat
    vec2 quadOffsets[4] = vec2[](
        vec2(-1.0, -1.0),
        vec2( 1.0, -1.0),
        vec2(-1.0,  1.0),
        vec2( 1.0,  1.0)
    );

    int cornerIndex = gl_VertexIndex % 4;
    vec2 quadOffset = quadOffsets[cornerIndex];

    // Compute inverse of 2D covariance for Gaussian evaluation
    float det = cov2D[0][0] * cov2D[1][1] - cov2D[0][1] * cov2D[1][0];
    mat2 cov2DInv = mat2(
         cov2D[1][1] / det, -cov2D[0][1] / det,
        -cov2D[1][0] / det,  cov2D[0][0] / det
    );

    // Transform quad corner by covariance for proper ellipse shape
    // This makes the quad align with the Gaussian's principal axes
    vec2 offsetPixels = radius * quadOffset;

    // Convert to NDC offset
    vec2 offsetNDC = offsetPixels / (0.5 * ubo.viewport);

    // Project center to clip space
    vec4 clipPos = ubo.proj * viewPos;
    clipPos /= clipPos.w;

    // Add offset in NDC space
    clipPos.xy += offsetNDC * clipPos.w;

    gl_Position = clipPos;

    // 6. Output to fragment shader
    outColor = inColor;
    outOpacity = inOpacity;

    // Pass Gaussian coordinates for fragment evaluation
    // Transform to Gaussian space using inverse covariance
    outCoord = cov2DInv * (offsetPixels);
}

Notice the structure: we transform to view space, build the 3D covariance, project to 2D, compute the radius, and generate quad corners. The key insight is that `cov2DInv` (the inverse of the 2D covariance matrix) is what the fragment shader needs to evaluate the Gaussian. By computing it here and transforming our quad coordinates with it, we’ve set up everything perfectly for the fragment shader.

One more thing: notice we add 0.3 to the diagonal of `cov2D`? That’s for numerical stability - it prevents degenerate cases where the covariance matrix becomes singular (non-invertible). It’s a small epsilon that doesn’t affect visual quality but prevents crashes.

The fragment shader is much simpler. By the time we get here, all the hard work is done. We just need to evaluate the 2D Gaussian function at this pixel’s location:

#version 450

layout(location = 0) in vec3 inColor;
layout(location = 1) in float inOpacity;
layout(location = 2) in vec2 inCoord;  // Gaussian coordinates

layout(location = 0) out vec4 outColor;

void main()
{
    // Evaluate 2D Gaussian function: exp(-0.5 * x^T Σ^(-1) x)
    // inCoord already has Σ^(-1) applied, so just compute dot product
    float power = -0.5 * dot(inCoord, inCoord);

    // Clamp for numerical stability
    power = max(power, -100.0);

    // Evaluate Gaussian
    float gaussian = exp(power);

    // Apply opacity
    float alpha = gaussian * inOpacity;

    // Early discard for performance (skip nearly transparent fragments)
    if (alpha 

Beautiful! That’s only 20 lines of actual code. We compute how far we are from the Gaussian’s center (that `dot(inCoord, inCoord)` operation), evaluate the exponential falloff, multiply by opacity, and output. The `discard` for low alpha values is an optimization allowing us to drop pixels that are too transparent to see.

Notice the output `vec4(inColor * alpha, alpha)` instead of the more common `vec4(inColor, alpha)`. This is called premultiplied alpha (or associated alpha), and it’s crucial for correct Gaussian splat rendering.

Here’s why: when you blend multiple semi-transparent Gaussians on top of each other, you want them to additively accumulate. With premultiplied alpha (where `source.rgb` already contains `color × alpha`), the blend equation is:

result = source.rgb + destination.rgb * (1 - source.alpha)

With straight (non-premultiplied) alpha it would be:

result = source.rgb * source.alpha + destination.rgb * (1 - source.alpha)

Premultiplied alpha eliminates that extra multiply. More importantly, a fully transparent pixel contributes `(0, 0, 0, 0)`, which adds nothing — there is no color bleeding from transparent regions. This is why premultiplied alpha is the correct choice for Gaussian splats.

Note: this equation only composites correctly when fragments are drawn back-to-front (furthest splat first). That is why depth sorting is a mandatory step in the pipeline, not an optional optimisation.

Plus, there’s a performance bonus: the blend equation is simpler without that extra multiply for the source color.

Setting up the complete Vulkan pipeline for Gaussian splat rendering:

void create_splat_pipeline()
{
    // 1. Vertex input state - one binding per attribute buffer
    std::vector bindings = {
        {0, sizeof(glm::vec3), VK_VERTEX_INPUT_RATE_INSTANCE},  // Position
        {1, sizeof(glm::vec4), VK_VERTEX_INPUT_RATE_INSTANCE},  // Rotation
        {2, sizeof(glm::vec3), VK_VERTEX_INPUT_RATE_INSTANCE},  // Scale
        {3, sizeof(float),     VK_VERTEX_INPUT_RATE_INSTANCE},  // Opacity
        {4, sizeof(glm::vec3), VK_VERTEX_INPUT_RATE_INSTANCE},  // Color
    };

    std::vector attributes = {
        {0, 0, VK_FORMAT_R32G32B32_SFLOAT, 0},     // Position
        {1, 1, VK_FORMAT_R32G32B32A32_SFLOAT, 0},  // Rotation
        {2, 2, VK_FORMAT_R32G32B32_SFLOAT, 0},     // Scale
        {3, 3, VK_FORMAT_R32_SFLOAT, 0},           // Opacity
        {4, 4, VK_FORMAT_R32G32B32_SFLOAT, 0},     // Color
    };

    VkPipelineVertexInputStateCreateInfo vertexInputState = {};
    vertexInputState.sType = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_STATE_CREATE_INFO;
    vertexInputState.vertexBindingDescriptionCount = bindings.size();
    vertexInputState.pVertexBindingDescriptions = bindings.data();
    vertexInputState.vertexAttributeDescriptionCount = attributes.size();
    vertexInputState.pVertexAttributeDescriptions = attributes.data();

    // 2. Input assembly - triangle strip for quad generation
    VkPipelineInputAssemblyStateCreateInfo inputAssemblyState = {};
    inputAssemblyState.sType = VK_STRUCTURE_TYPE_PIPELINE_INPUT_ASSEMBLY_STATE_CREATE_INFO;
    inputAssemblyState.topology = VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP;
    inputAssemblyState.primitiveRestartEnable = VK_FALSE;

    // 3. Rasterization state
    VkPipelineRasterizationStateCreateInfo rasterizationState = {};
    rasterizationState.sType = VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_CREATE_INFO;
    rasterizationState.polygonMode = VK_POLYGON_MODE_FILL;
    rasterizationState.cullMode = VK_CULL_MODE_NONE;  // Don't cull, quads face camera
    rasterizationState.frontFace = VK_FRONT_FACE_COUNTER_CLOCKWISE;
    rasterizationState.lineWidth = 1.0f;

    // 4. Depth/stencil state - READ depth but DON'T WRITE (transparency!)
    VkPipelineDepthStencilStateCreateInfo depthStencilState = {};
    depthStencilState.sType = VK_STRUCTURE_TYPE_PIPELINE_DEPTH_STENCIL_STATE_CREATE_INFO;
    depthStencilState.depthTestEnable = VK_TRUE;
    depthStencilState.depthWriteEnable = VK_FALSE;  // Critical for transparency
    depthStencilState.depthCompareOp = VK_COMPARE_OP_LESS;

    // 5. Blend state - Premultiplied alpha blending
    VkPipelineColorBlendAttachmentState blendAttachment = {};
    blendAttachment.blendEnable = VK_TRUE;
    blendAttachment.srcColorBlendFactor = VK_BLEND_FACTOR_ONE;
    blendAttachment.dstColorBlendFactor = VK_BLEND_FACTOR_ONE_MINUS_SRC_ALPHA;
    blendAttachment.colorBlendOp = VK_BLEND_OP_ADD;
    blendAttachment.srcAlphaBlendFactor = VK_BLEND_FACTOR_ONE;
    blendAttachment.dstAlphaBlendFactor = VK_BLEND_FACTOR_ONE_MINUS_SRC_ALPHA;
    blendAttachment.alphaBlendOp = VK_BLEND_OP_ADD;
    blendAttachment.colorWriteMask = VK_COLOR_COMPONENT_R_BIT |
                                     VK_COLOR_COMPONENT_G_BIT |
                                     VK_COLOR_COMPONENT_B_BIT |
                                     VK_COLOR_COMPONENT_A_BIT;

    VkPipelineColorBlendStateCreateInfo colorBlendState = {};
    colorBlendState.sType = VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_STATE_CREATE_INFO;
    colorBlendState.attachmentCount = 1;
    colorBlendState.pAttachments = &blendAttachment;

    // Create pipeline...
}

Key configuration points:

**Instanced rendering**: Use `VK_VERTEX_INPUT_RATE_INSTANCE` to draw 4 vertices per splat

**No backface culling**: Quads always face camera

**Depth test but no write**: Essential for correct transparency ordering

**Premultiplied alpha blending**: `ONE` + `ONE_MINUS_SRC_ALPHA`

void draw_gaussian_splats(VkCommandBuffer cmd, const GaussianSplat& splat)
{
    // Bind pipeline
    vkCmdBindPipeline(cmd, VK_PIPELINE_BIND_POINT_GRAPHICS, splat_pipeline);

    // Bind uniform buffer (view, proj matrices, etc.)
    vkCmdBindDescriptorSets(cmd, VK_PIPELINE_BIND_POINT_GRAPHICS,
                            pipeline_layout, 0, 1, &descriptor_set, 0, nullptr);

    // Bind vertex buffers (one per attribute)
    VkBuffer buffers[] = {
        splat.position_buffer->get_handle(),
        splat.rotation_buffer->get_handle(),
        splat.scale_buffer->get_handle(),
        splat.opacity_buffer->get_handle(),
        splat.color_buffer->get_handle(),
    };
    VkDeviceSize offsets[] = {0, 0, 0, 0, 0};
    vkCmdBindVertexBuffers(cmd, 0, 5, buffers, offsets);

    // Draw: 4 vertices per splat, instanced
    vkCmdDraw(cmd, 4, splat.splat_count, 0, 0);
}

For correct rendering, splats must be sorted by depth (back-to-front). Common approaches:

Simple but can be slow for large splat counts:

std::sort(splats.begin(), splats.end(), [&](const Splat& a, const Splat& b) {
    float depthA = glm::dot(viewDir, a.position - cameraPos);
    float depthB = glm::dot(viewDir, b.position - cameraPos);
    return depthA > depthB;  // Back to front
});

More efficient for large datasets using compute shaders.

Divide screen into tiles and sort within each tile for better parallelism.

* 
**Frustum culling**: Skip splats outside the view frustum

* 
**Size culling**: Skip splats that project to less than 1 pixel

* 
**Opacity culling**: Skip splats with very low opacity

Reduce splat count for distant regions or lower quality settings.

Use structure-of-arrays (SoA) for better cache utilization:

struct SplatBuffers {
    std::vector positions;
    std::vector rotations;
    std::vector scales;
    std::vector opacities;
    std::vector colors;
};

The render_octomap sample demonstrates switching between different view modes:

void render_octomap::on_view_state_changed(MapView::ViewState newState)
{
    if (current_view_state == newState)
        return;

    current_view_state = newState;

    switch (newState)
    {
        case MapView::ViewState::Octomap:
            // Octomap is already loaded, just need to rebuild command buffers
            break;

        case MapView::ViewState::GLTFRegular:
            if (!gltf_scene)
                load_gltf_scene("scenes/octmap_and_splats/savedMap_v1.2.0.gltf");
            break;

        case MapView::ViewState::GLTFSplats:
            if (!splat_instance_buffer)
                load_gaussian_splats_scene("scenes/octmap_and_splats");
            break;
    }

    rebuild_command_buffers();
}

For view-dependent color effects, implement SH evaluation:

vec3 evaluateSH(vec3 dir, mat3 sh_coeffs) {
    // Evaluate spherical harmonics basis functions
    // and combine with coefficients
    return vec3(x,y,z);
}

Implement the Mip-Splatting technique for anti-aliased rendering.

For large scenes, implement tile-based streaming of splat data.

* 
[3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

* 
[KHR_gaussian_splatting GLTF Extension Proposal](https://github.com/KhronosGroup/glTF/pull/2446)

* 
[render_octomap Sample README](../README.adoc)

The `render_octomap` sample shows all of this in action. It loads GLTF files containing both traditional geometry (octomaps) and Gaussian splats, switches between different rendering modes, and demonstrates how splats integrate with existing rendering techniques. It’s a real-world SLAM reconstruction workflow where you capture an environment, process it into both mesh and splat representations, and render them side-by-side.
