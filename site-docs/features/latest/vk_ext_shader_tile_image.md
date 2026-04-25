# VK_EXT_shader_tile_image

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_tile_image.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. High-level choices](#_high_level_choices)
- [2.1._High-level_choices](#_high_level_choices)
- [2.2. Implementation choices](#_implementation_choices)
- [2.2._Implementation_choices](#_implementation_choices)
- [3. Proposal](#_proposal)
- [3.1. Concept](#_concept)
- [3.2. API changes](#_api_changes)
- [3.2._API_changes](#_api_changes)
- [3.2.1. Explicit Synchronization](#_explicit_synchronization)
- [3.2.1._Explicit_Synchronization](#_explicit_synchronization)
- [3.3. SPIR-V changes](#_spir_v_changes)
- [3.3._SPIR-V_changes](#_spir_v_changes)
- [3.4. GLSL changes](#_glsl_changes)
- [3.4._GLSL_changes](#_glsl_changes)
- [3.5. HLSL Changes](#_hlsl_changes)
- [3.5._HLSL_Changes](#_hlsl_changes)
- [4. Examples](#_examples)
- [4.1. Color reads](#_color_reads)
- [4.1._Color_reads](#_color_reads)
- [4.1.1. Depth reads](#_depth_reads)
- [4.1.1._Depth_reads](#_depth_reads)
- [5. Alternate Proposals](#_alternate_proposals)
- [5._Alternate_Proposals](#_alternate_proposals)
- [5.1. Proposal B: OpTypeTileImage](#_proposal_b_optypetileimage)
- [5.1._Proposal_B:_OpTypeTileImage](#_proposal_b_optypetileimage)
- [5.1.1. SPIR-V Changes](#_spir_v_changes_2)
- [5.1.1._SPIR-V_Changes](#_spir_v_changes_2)
- [5.1.2. GLSL Changes](#_glsl_changes_2)
- [5.1.2._GLSL_Changes](#_glsl_changes_2)
- [5.2. Proposal C: Storage Class / PLS style](#_proposal_c_storage_class_pls_style)
- [5.2._Proposal_C:_Storage_Class_/_PLS_style](#_proposal_c_storage_class_pls_style)
- [5.2.1. SPIR-V Changes](#_spir_v_changes_3)
- [5.2.1._SPIR-V_Changes](#_spir_v_changes_3)
- [5.2.2. GLSL Changes](#_glsl_changes_3)
- [5.2.2._GLSL_Changes](#_glsl_changes_3)
- [6. Non-coherent access](#_non_coherent_access)
- [6._Non-coherent_access](#_non_coherent_access)
- [6.1. API Changes](#_api_changes_2)
- [6.1._API_Changes](#_api_changes_2)
- [6.2. Barrier Proposal A: MemoryBarrier via vkCmdPipelineBarrier2](#_barrier_proposal_a_memorybarrier_via_vkcmdpipelinebarrier2)
- [6.2._Barrier_Proposal_A:_MemoryBarrier_via_vkCmdPipelineBarrier2](#_barrier_proposal_a_memorybarrier_via_vkcmdpipelinebarrier2)
- [6.3. Barrier Proposal B: ImageMemoryBarrier via vkCmdPipelineBarrier2](#_barrier_proposal_b_imagememorybarrier_via_vkcmdpipelinebarrier2)
- [6.3._Barrier_Proposal_B:_ImageMemoryBarrier_via_vkCmdPipelineBarrier2](#_barrier_proposal_b_imagememorybarrier_via_vkcmdpipelinebarrier2)
- [6.4. Barrier Proposal C: New simple API for tile image barriers](#_barrier_proposal_c_new_simple_api_for_tile_image_barriers)
- [6.4._Barrier_Proposal_C:_New_simple_API_for_tile_image_barriers](#_barrier_proposal_c_new_simple_api_for_tile_image_barriers)
- [6.5. SPIR-V and GLSL changes](#_spir_v_and_glsl_changes)
- [6.5._SPIR-V_and_GLSL_changes](#_spir_v_and_glsl_changes)
- [7. Issues](#_issues)
- [7.1. Should we allow early fragment tests?](#_should_we_allow_early_fragment_tests)
- [7.1._Should_we_allow_early_fragment_tests?](#_should_we_allow_early_fragment_tests)
- [7.2. Should depth / stencil fetch be a separate extension?](#_should_depth_stencil_fetch_be_a_separate_extension)
- [7.2._Should_depth_/_stencil_fetch_be_a_separate_extension?](#_should_depth_stencil_fetch_be_a_separate_extension)
- [7.3. What should we name these variables? What should the extension be named?](#_what_should_we_name_these_variables_what_should_the_extension_be_named)
- [7.3._What_should_we_name_these_variables?_What_should_the_extension_be_named?](#_what_should_we_name_these_variables_what_should_the_extension_be_named)
- [7.4. Are there any non-obvious interactions with the suspend/resume functionality in VK_KHR_dynamic_rendering?](#_are_there_any_non_obvious_interactions_with_the_suspendresume_functionality_in_vk_khr_dynamic_rendering)
- [7.4._Are_there_any_non-obvious_interactions_with_the_suspend/resume_functionality_in_VK_KHR_dynamic_rendering?](#_are_there_any_non_obvious_interactions_with_the_suspendresume_functionality_in_vk_khr_dynamic_rendering)
- [7.5. Enable / Disable raster order access](#_enable_disable_raster_order_access)
- [7.5._Enable_/_Disable_raster_order_access](#_enable_disable_raster_order_access)
- [7.6. Should this extension reuse OpTypeImage, or introduce a new type for declaring tile images?](#_should_this_extension_reuse_optypeimage_or_introduce_a_new_type_for_declaring_tile_images)
- [7.6._Should_this_extension_reuse_OpTypeImage,_or_introduce_a_new_type_for_declaring_tile_images?](#_should_this_extension_reuse_optypeimage_or_introduce_a_new_type_for_declaring_tile_images)
- [7.7. Should Color, Depth, and Stencil reads use the same SPIR-V opcode?](#_should_color_depth_and_stencil_reads_use_the_same_spir_v_opcode)
- [7.7._Should_Color,_Depth,_and_Stencil_reads_use_the_same_SPIR-V_opcode?](#_should_color_depth_and_stencil_reads_use_the_same_spir_v_opcode)
- [7.8. Should Depth and Stencil read opcodes consume an image operand specifying the attachment, or should it be implicit?](#_should_depth_and_stencil_read_opcodes_consume_an_image_operand_specifying_the_attachment_or_should_it_be_implicit)
- [7.8._Should_Depth_and_Stencil_read_opcodes_consume_an_image_operand_specifying_the_attachment,_or_should_it_be_implicit?](#_should_depth_and_stencil_read_opcodes_consume_an_image_operand_specifying_the_attachment_or_should_it_be_implicit)
- [7.9. Should this extension reuse the image Dim SubpassData or introduce a new Dim?](#_should_this_extension_reuse_the_image_dim_subpassdata_or_introduce_a_new_dim)
- [7.9._Should_this_extension_reuse_the_image_Dim_SubpassData_or_introduce_a_new_Dim?](#_should_this_extension_reuse_the_image_dim_subpassdata_or_introduce_a_new_dim)
- [7.10. Should this extension require applications to create and bind descriptors for tile images?](#_should_this_extension_require_applications_to_create_and_bind_descriptors_for_tile_images)
- [7.10._Should_this_extension_require_applications_to_create_and_bind_descriptors_for_tile_images?](#_should_this_extension_require_applications_to_create_and_bind_descriptors_for_tile_images)
- [7.11. What does 'undefined value' mean for tile image reads?](#_what_does_undefined_value_mean_for_tile_image_reads)
- [7.11._What_does_'undefined_value'_mean_for_tile_image_reads?](#_what_does_undefined_value_mean_for_tile_image_reads)
- [8. Further Functionality](#_further_functionality)
- [8._Further_Functionality](#_further_functionality)
- [8.1. Fragment Shading Rate interactions](#_fragment_shading_rate_interactions)
- [8.1._Fragment_Shading_Rate_interactions](#_fragment_shading_rate_interactions)
- [8.2. Allow non-aliased Tile Image variables and/or image format redeclaration](#_allow_non_aliased_tile_image_variables_andor_image_format_redeclaration)
- [8.2._Allow_non-aliased_Tile_Image_variables_and/or_image_format_redeclaration](#_allow_non_aliased_tile_image_variables_andor_image_format_redeclaration)
- [8.3. Tile Image size query](#_tile_image_size_query)
- [8.3._Tile_Image_size_query](#_tile_image_size_query)
- [8.4. Memoryless attachments](#_memoryless_attachments)
- [8.4._Memoryless_attachments](#_memoryless_attachments)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. High-level choices](#_high_level_choices)
[2.2. Implementation choices](#_implementation_choices)

[3. Proposal](#_proposal)

[3.1. Concept](#_concept)
[3.2. API changes](#_api_changes)
[3.3. SPIR-V changes](#_spir_v_changes)
[3.4. GLSL changes](#_glsl_changes)
[3.5. HLSL Changes](#_hlsl_changes)

[4. Examples](#_examples)

[4.1. Color reads](#_color_reads)

[5. Alternate Proposals](#_alternate_proposals)

[5.1. Proposal B: OpTypeTileImage](#_proposal_b_optypetileimage)
[5.2. Proposal C: Storage Class / PLS style](#_proposal_c_storage_class_pls_style)

[6. Non-coherent access](#_non_coherent_access)

[6.1. API Changes](#_api_changes_2)
[6.2. Barrier Proposal A: MemoryBarrier via vkCmdPipelineBarrier2](#_barrier_proposal_a_memorybarrier_via_vkcmdpipelinebarrier2)
[6.3. Barrier Proposal B: ImageMemoryBarrier via vkCmdPipelineBarrier2](#_barrier_proposal_b_imagememorybarrier_via_vkcmdpipelinebarrier2)
[6.4. Barrier Proposal C: New simple API for tile image barriers](#_barrier_proposal_c_new_simple_api_for_tile_image_barriers)
[6.5. SPIR-V and GLSL changes](#_spir_v_and_glsl_changes)

[7. Issues](#_issues)

[7.1. Should we allow early fragment tests?](#_should_we_allow_early_fragment_tests)
[7.2. Should depth / stencil fetch be a separate extension?](#_should_depth_stencil_fetch_be_a_separate_extension)
[7.3. What should we name these variables? What should the extension be named?](#_what_should_we_name_these_variables_what_should_the_extension_be_named)
[7.4. Are there any non-obvious interactions with the suspend/resume functionality in `VK_KHR_dynamic_rendering`?](#_are_there_any_non_obvious_interactions_with_the_suspendresume_functionality_in_vk_khr_dynamic_rendering)
[7.5. Enable / Disable raster order access](#_enable_disable_raster_order_access)
[7.6. Should this extension reuse OpTypeImage, or introduce a new type for declaring tile images?](#_should_this_extension_reuse_optypeimage_or_introduce_a_new_type_for_declaring_tile_images)
[7.7. Should Color, Depth, and Stencil reads use the same SPIR-V opcode?](#_should_color_depth_and_stencil_reads_use_the_same_spir_v_opcode)
[7.8. Should Depth and Stencil read opcodes consume an image operand specifying the attachment, or should it be implicit?](#_should_depth_and_stencil_read_opcodes_consume_an_image_operand_specifying_the_attachment_or_should_it_be_implicit)
[7.9. Should this extension reuse the image Dim SubpassData or introduce a new Dim?](#_should_this_extension_reuse_the_image_dim_subpassdata_or_introduce_a_new_dim)
[7.10. Should this extension require applications to create and bind descriptors for tile images?](#_should_this_extension_require_applications_to_create_and_bind_descriptors_for_tile_images)
[7.11. What does 'undefined value' mean for tile image reads?](#_what_does_undefined_value_mean_for_tile_image_reads)

[8. Further Functionality](#_further_functionality)

[8.1. Fragment Shading Rate interactions](#_fragment_shading_rate_interactions)
[8.2. Allow non-aliased Tile Image variables and/or image format redeclaration](#_allow_non_aliased_tile_image_variables_andor_image_format_redeclaration)
[8.3. Tile Image size query](#_tile_image_size_query)
[8.4. Memoryless attachments](#_memoryless_attachments)

`VK_EXT_shader_tile_image` is a device extension that explicitly enables access to on-chip pixel data. For GPUs supporting this extension, it is a replacement for many use cases for subpasses, which are not available when the `VK_KHR_dynamic_rendering` extension is used.

Some implementations, in particular tile-based GPUs, want to allow applications to effectively exploit local, e.g. on-chip, memory.
A classic example would be optimizing G-buffer based deferred shading techniques where the G-buffer is produced and consumed on-chip.

Subpasses were designed to support such use cases with an API mechanism that was portable across all implementations. In practice, that has led to some problems, including:

* 
the high level abstraction is far removed from the mental model an application developer needs to have to be able to optimize for keeping data on-chip

* 
the subpass design affects other parts of the API and is seen as a 'tax' on applications that do not target implementations that benefit from on-chip storage

* 
developers wanting to optimize for a specific class of GPUs often need to make GPU specific optimization choices, so the abstraction does not add much

These problems motivated `VK_KHR_dynamic_rendering`, which offers an alternative API without subpasses. But keeping data on-chip is still an important optimization for a class of GPUs.

This proposal aims to provide the most essential functionality of subpasses, but in an explicit manner.
The abstractions in this proposal are a closer match to what the underlying GPU implementation does and should make it easier to communicate best practices and performance guarantees to developers.

The solution space can be split in two axes: scope and abstraction level.

The abstraction level is a question of whether we want an API that is only targeted at tile-based GPUs or if we should have a higher-level API that would allow the feature to be supported on a wider range of GPUs.
The main argument for a higher abstraction level is application portability.
Arguments against additional abstractions include:

* 
It would be hard for developers to reason about performance expectations, for the same reasons that it is hard to do this for subpasses

* 
"Framebuffer fetch" and "programmable blend" semantics are naturally expressed as direct reads from color attachments, and adding abstractions just obfuscate what (some) GPU hardware is doing

* 
GPUs that are not tile-based would not gain much from exposing this - at least not unless the scope is expanded - so the abstractions add little practical value

There are two choices broadly based on what the functionality is for, and which GPUs are able to support it:

An explicit API to allow certain tile-based GPUs to expose on-chip memory with fast raster order access.

* 
Provides framebuffer fetch and Pixel Local Storage functionality and forms the basis for Tile Shader like functionality.

* 
This is mainly targeted at GPUs which defer fragment shading into framebuffer tiles where each tile is typically processed just once.

* 
This addresses use cases such as keeping G-buffer data on-chip.

* 
No DRAM bandwidth paid for render targets which are cleared on load, consumed within the render pass, and content discarded at end of render pass.

* 
Raster order access (coherent access) to framebuffer data from fragment shader is efficient or even "free" - depending on the GPU.

* 
No descriptors needed for render target access.

A slightly higher level API to enable broad GPU support for framebuffer fetch like functionality within draw calls in dynamic render passes.

* 
Provides framebuffer fetch like functionality.

* 
This is intended to be supported by a wide range of GPUs. The GPUs in general have optimized support for framebuffer fetch within a render pass.

* 
This addresses use cases such a programmable image composition, or programmable resolve.

* 
Attachment data is not guaranteed to be on-chip within a render pass and may spill to DRAM. Implementations may opportunistically cache data in their cache hierarchy.

* 
Raster order access to framebuffer data from fragment shader is not "free". Many implementations may prefer non-coherent access with explicit synchronization from applications.

* 
Descriptors need to be bound for render target access (at least for some implementations).

This proposal targets the first choice.

The options for scope include:

* 
"Framebuffer fetch" equivalent, i.e. enable access to the previously written pixel in the local framebuffer region

* 
"Pixel local storage" equivalent, i.e. as above with the addition of pixel format reinterpretation

* 
"Tile shader" equivalent, i.e. enable access to a region larger than 1x1 pixels

This proposal targets the first option, but adds building blocks to enable future enhancements.
The reasoning behind this choice is that:

* 
It should be possible to support this extension on existing GPUs

* 
Many use cases that benefit from subpasses could be implemented with this functionality

* 
Ease of integration; this option requires the least amount of changes to rendering engines

* 
Time to market; several IHVs would like at least the subpass equivalent functionality to be implemented alongside `VK_KHR_dynamic_rendering`

It is useful to provide tile image access for all attachment types.
But implementations may manage depth/stencil differently than color, which could add constraints.
We will therefore expose separate feature bits for color, depth, and stencil access.

Tile image variables currently have to 'alias' a color attachment location, and their format is implicitly specified to match the color attachment format.

images = image$ path = image$/proposals/tile_image.svg

![tile image](../_images/proposals/tile_image.svg)

Figure 1. Tile Image

Introduce the concept of a 'tile image'. When the extension is enabled, the framebuffer is logically divided into a grid of non-overlapping tiles called tile images.

Add a new feature struct `VkPhysicalDeviceShaderTileImageFeaturesEXT` containing:

* 
`shaderTileImageColorReadAccess`

* 
`shaderTileImageDepthReadAccess`

* 
`shaderTileImageStencilReadAccess`

`shaderTileImageColorReadAccess` is mandatory if this extension is supported.

`shaderTileImageColorReadAccess` provides the ability to access current (rasterization order) color values from tile memory via tile images.
There is no support for the storage format to be redefined as part of this feature.
Output data is still written via Fragment Output variables.
Since the framebuffer format is not redeclared, fixed-function blending works as normal.

Existing shaders do not to need to be modified to write to color attachments.

Reading color values using the functionality in this extension guarantees that the access is in rasterization order.
See the spec (Fragment Shader Tile Image Reads) for details on which samples reads qualify for coherent read access.

`shaderTileImageDepthReadAccess` and `shaderTileImageStencilReadAccess` provide similar ability to read the depth and stencil values of any sample location covered by the fragment.
Depth and stencil fetches use implicit tile images.
If no depth / stencil attachment is present then the values returned by fetches are undefined.
Early fragment tests are disallowed if depth or stencil fetch is used.

Reading depth/stencil values have similar rasterization order and synchronization guarantees as color.

When non-coherent tile image reads are enabled, writes via color, depth and
stencil attachments are not automatically made visible to the corresponding
attachment reads via tile images.
For the writes to be made visible, an explicit memory dependency must be
inserted between when the attachment is written to and when it is read from
by later fragments.
Such memory dependencies must be inserted every time a fragment will read
values at a particular sample (x, y, layer, sample) coordinate, if those
values have been written since the most recent pipeline barrier; or since
the start of the render pass instance, if there have been no pipeline
barriers since the start of the render pass instance.
When such memory dependencies are used the values at all sample locations
inside the fragment area are made visible, regardless of coverage.

To insert a memory dependency for explicit render pass tile image
synchronization, [vkCmdPipelineBarrier](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#vkCmdPipelineBarrier)
and [vkCmdPipelineBarrier2](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#vkCmdPipelineBarrier2)
can now be called inside a render pass instance started with
[vkCmdBeginRendering](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#vkCmdBeginRendering).
The following restrictions apply for such pipeline barriers:

* 
`dependencyFlags` must include `VK_DEPENDENCY_BY_REGION_BIT`.

* 
The pipeline barriers can include only memory barriers.
That is, buffer memory barriers and image memory barriers must not be
used.

* 
The stages in the `srcStageMask` and `dstStageMask` members of [VkMemoryBarrier2](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkMemoryBarrier2) are restricted to framebuffer
space stages.

* 
The access types in the `srcAccessMask` and `dstAccessMask` members of [VkMemoryBarrier2](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkMemoryBarrier2) are restricted to the
following types: `VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT`,
`VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT`,
`VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT`, and
`VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT`.

This proposal leverages `OpTypeImage` and makes 'TileImageDataEXT' another `Dim` similar to `SubpassData`.

Specifically:

* 
`Dim` is extended with `TileImageDataEXT`.

* 
`OpTypeImage` gets the additional constraint that if `Dim` is `TileImageDataEXT`:

`Sampled` **must** be `2`

* 
`Image Format` must be `Unknown` as the format is implicitly specified by the color attachment

(We could relax this in a further extension if we wanted to support format reinterpretation in the shader.)

`Execution Model` must be `Fragment`

`Arrayed` must be `0`

Extend the use of `Location` such that it specifies the color attachment index

Add `OpColorAttachmentReadEXT`, which is similar to `OpImageRead` but helps disambiguate between color/depth/stencil.

Add `OpDepthAttachmentReadEXT` and `OpStencilAttachmentReadEXT` to read depth/stencil

* 
These take an optional `Sample` parameter for MSAA use cases

Add a `TileImageEXT` Storage Class that is only supported for variables of `OpTypeImage` with `Dim` equal to `TileImageDataEXT`

Main changes:

* 
New type: `attachmentEXT`

* 
The `location` layout qualifier is used to specify the corresponding color attachment

* 
New storage qualifier (supported only in fragment shaders): `tileImageEXT`

* 
New functions: `colorAttachmentReadEXT`, `depthAttachmentReadEXT`, `stencilAttachmentReadEXT`

Mapping to SPIR-V:

* 
`attachmentEXT` maps to `OpTypeImage` with `Dim` equal to `TileImageDataEXT`

* 
`colorAttachmentReadEXT` maps to `OpColorAttachmentReadEXT`

* 
`depthAttachmentReadEXT` maps to `OpDepthAttachmentReadEXT`

* 
`stencilAttachmentReadEXT` maps to `OpStencilAttachmentReadEXT`

Function signatures:

// color
gvec4 colorAttachmentReadEXT(gattachment attachmentEXT);
gvec4 colorAttachmentReadEXT(gattachment attachmentEXT, int sample);

// depth
highp float depthAttachmentReadEXT();
highp float depthAttachmentReadEXT(int sample);

// stencil
lowp uint stencilAttachmentReadEXT();
lowp uint stencilAttachmentReadEXT(int sample);

// ------ Subpass Example --------
layout( set = 0, binding = 0, input_attachment_index = 0 ) uniform highp subpassInput color0;
layout( set = 0, binding = 1, input_attachment_index = 1 ) uniform highp subpassInput color1;

layout( location = 0 ) out vec4 fragColor;

void main()
{
    vec4 value = subpassLoad(color0) + subpassLoad(color1);
    fragColor = value;
}

// ----- Equivalent Tile Image approach ------

// NOTES:
// 'tileImageEXT' is a storage qualifier.
// 'attachmentEXT' is an opaque type; similar to subpassInput
// 'aliased' means that the variable shares _tile image_ with the corresponding attachment; there is no in-memory aliasing

layout( location = 0 /* aliased to color attachment 0 */ ) tileImageEXT highp attachmentEXT color0;
layout( location = 1 /* aliased to color attachment 1 */ ) tileImageEXT highp attachmentEXT color1;

layout( location = 0 ) out vec4 fragColor;

void main()
{
    vec4 value = colorAttachmentReadEXT(color0) + colorAttachmentReadEXT(color1);
    fragColor = value;
}

void main()
{
    // read sample 0: works for non-MSAA or MSAA targets
    highp float last_depth = depthAttachmentReadEXT();
}

The following proposals explore alternate ways to expose the functionality for reading from the tile memory for color data - reading depth and stencil and the API changes are kept unchanged from the main proposal.

Add new type: `TileImage`. We have two options for defining `TileImage`:

`TileImage` variables which are instanced per-pixel (or per-sample in case of multisampled framebuffers)

`TileImage` defines a 2D array of pixels similar to an image but in tile memory.

Note: Defining this as a 2D array fits well for future `Tile Shaders` functionality where tile shader invocations on a tile can access any location within a TileImage on the tile.

Add new instruction: `OpTypeTileImage`. The instruction declares a `tile image`. `Tile image` is an opaque type. `OpTypeTileImage` has the following operands:

* 
`Image Format`: the imageformat. This must be set to `Unknown` as the format is implicitly specified by the color attachment.

(We could relax this in a further extension if we wanted to support format reinterpretation in the shader.)

`MS` : indicates whether the content is multisampled. 0 - single-sampled. 1 - multisampled.

`Tile image` variables must be decorated with `Location` which specifies the color attachment index.
`Execution Model` must be `Fragment`.

Add `OpTileImageRead`, `OpDepthTileImageRead`, `OpStencilTileImageRead` to read from color, depth, stencil tile images.
Add `Tile` storage class.

GLSL changes remain the same as in the main proposal except the mapping changes to `OpTypeTileImage` instead of `OpTypeImage`:

* 
`tileImage` maps to `OpTypeTileImage`

Introduce `TileImage` as a new storage class.

* 
Variables declared with `TileImage` must have `Location` decoration specified - this specifies the attachment index to alias to.

* 
If image format reinterpretation is to be supported then a new `Imageformat` decoration is specified.

* 
`TileImage` storage class variables are multisampled with the sample count of the framebuffer if multisampling is enabled.

* 
Reading of TileImage variables is done via `OpTileImageRead`.

`OpTileImageRead` which accepts a `sample` parameter for MSAA use cases.

If aggregate types are to be supported in `TileImage` storage class, we would need the following:

* 
`Location` and `Imageformat` must only be applied to non-structure type (that is, scalars or vectors or arrays of scalars or arrays of vectors).

* 
New storage class `tileImage`.

* 
Add support for grouping `tileImage` variable declarations into an interface block.

* 
layout `location` must be specified for the variables.

* 
Add new builtin function `tileImageRead`, which accepts an optional parameter `sample`

* 
If reinterpretation of formats is supported (within the same draw call), then we need `tileImageIn` and `tileImageOut` (or make `tileImage` an auxiliary storage specifier, similar to `patch` so we could use `tileImage in` and `tileImage out`).

Some implementations have a penalty for support raster order access to tile image data. To support this functionality on such implementations we would add the following changes to the base proposal:

* 
A property bit `shaderTileImagePreferCoherentReadAccess` indicating whether the implementation prefers coherent read accesses are used.

* 
Support for specifying the barriers - three broad options (see next section)

* 
Note: The gains from tile image feature with raster order access enabled are expected to match the gains from subpasses.

`vkCmdPipelineBarrier2` would be allowed within dynamic render passes to specify a `VkMemoryBarrier2` with some restrictions. The enums `VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT` and `VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT` are reused for tileimage read accesses.

This approach would allow synchronizing all color attachments, or depth stencil attachment, but does not support synchronizing individual color attachments.

Example synchronizing two draw calls, where the first writes to color attachments and the second reads via the tileimage variables.

vkCmdDraw(...);

VkMemoryBarrier2 memoryBarrier = {
        ...
        .srcStageMask = VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
        .srcAccessMask = VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT,
        .dstStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT,
        .dstAccessMask = VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT
};

VkDependencyInfo dependencyInfo {
        ...
        VK_DEPENDENCY_BY_REGION, //dependency flags
        1, //memory barrier count
        &memoryBarrier, //memory barrier
        ...
};

vkCmdPipelineBarrier2(commandBuffer, &dependencyInfo);

vkCmdDraw(...);

`vkCmdPipelineBarrier2` would be allowed within dynamic render passes to specify a `VkMemoryBarrier2` with some restrictions. The enums `VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT` and `VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT` are reused to express tileimage read accesses.

This approach would allow synchronizing individual color attachments, or depth or stencil attachment.

Example synchronizing two draw calls, where the first writes to color attachments and the second reads via the tileimage variables.

vkCmdDraw(...);

VkImageMemoryBarrier2 imageMemoryBarrier = {
        ...
        .srcStageMask = VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
        .srcAccessMask = VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT,
        .dstStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT,
        .dstAccessMask = VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT,
        .oldLayout = ..., //layouts not allowed to be changed.
        .newLayout ...,
        .image = .., //image and subresource identifying the specific attachment.
        .subresourceRange = ..
};

VkDependencyInfo dependencyInfo {
        ...
        VK_DEPENDENCY_BY_REGION, //dependency flags
        ...
        1, //image memory barrier count
        &imageMemoryBarrier, //memory barrier
        ...
};

vkCmdPipelineBarrier2(commandBuffer, &dependencyInfo);

vkCmdDraw(...);

New API entry point `vkCmdTileBarrierEXT(..)` where the application can specify which attachments to synchronize. This can be easily extended to tile shader if an implementation desires explicit barriers - by specifying all of tile memory needs to be synchronized and explicitly specifying tile-wide synchronization.

//New Vulkan function and types
vkCmdTileBarrierEXT(
    VkCommandBuffer             commandBuffer,
    VkDependencyFlags           dependencyFlags,
    VkTileMemoryTypeFlagsEXT    tileMemoryMask);

typedef enum VkTileMemoryTypeFlagsBitsEXT {
    VK_TILE_IMAGE_COLOR_ATTACHMENTS_BIT = 0x00000001,
    VK_TILE_IMAGE_DEPTH_STENCIL_ATTACHMENT_BIT = 0x00000002,
}

Example synchronizing two draw calls, where the first writes to color attachments and the second reads via the tile image variables.

vkCmdDraw(...);

vkCmdTileBarrierEXT(commandBuffer,
    VK_DEPENDENCY_BY_REGION,
    VK_TILE_IMAGE_COLOR_ATTACHMENTS_BIT);

vkCmdDraw(...);

* 
Tile Image data variables can optionally be specified with "noncoherent" layout qualifier in GLSL. For Depth and Stencil we could use a special fragment shader layout qualifier (similar to early_fragment_tests) to indicate depth and stencil access is "noncoherent".

* 
Three new Execution modes in SPIR-V to specify that color, depth or stencil reads via the functionality in this extension are non-coherent (that is the reads are no longer guaranteed to be in raster order with respect to write operations from prior fragments).

Early fragment tests are disallowed if reading frag depth / stencil.

Access to depth / stencil is defined differently than color, but we suggest keeping them together - with separate feature bits.

Other APIs have similar but not identical concepts, so a unique name is useful.

We call these resources tile images.
On typical implementations supporting this extension, the framebuffer is divided into tiles and fragment processing is deferred such that each framebuffer tile is typically visited just once.
A tile image is a view of a framebuffer attachment, restricted to the tile being processed.

Note that fragment shaders still can only color, depth, and stencil values from their fragment location and not the entire tile.

The extension is called VK_EXT_shader_tile_image.

Not at present.
If we were to allow non-aliased tile image variables, then implementations would have to be able to guarantee that those variables never have to 'spill' from tile image.

Some implementations pay a performance cost to guarantee raster order access. We need to give them a way to disable raster order access and add support for barriers to explicitly perform synchronization.

Three proposals have been added to the Non-coherent access section in this document. The spec changes currently choose Barrier Proposal A: MemoryBarrier via vkCmdPipelineBarrier2.

Vulkan barriers have been difficult for developers to use, so Barrier Proposal C might offer a simpler API.

Consensus was to keep things consistent with existing barriers in Vulkan, so Barrier Proposal A was chosen.

OpTypeImage is reused with a special Dim for tile images, following what was done for subpass attachments.

An alternative would have been to make tile images their own type, and introduce an OpTypeTileImage type.
That would require less special-casing of OpTypeImage, but comes with higher initial burden in tooling.

No. The extension introduces separate opcodes.

Tile based GPUs which guarantee framebuffer residency in tile memory can offer efficient raster order access to color, depth, stencil data with relatively low overhead.
Some GPU implementations would have a significant performance penalty in raster order access if the implementation cannot determine from the SPIR-V shader whether a specific access is color, depth, or stencil.

This design choice is in-line with other API extensions (GL framebuffer fetch and framebuffer fetch depth stencil) and other APIs where depth/stencil access is clearly disambiguated.

No operand is necessary as there is depth and stencil uniquely identify the attachments unlike with color.

The other options considered were:

Allow depth and stencil tile images to be declared as variables. Tile images are defined to map to the color attachment specified via the `Location` decoration - some equivalent needs to be defined for depth and stencil. Pixel Local Storage like functionality of supporting format reinterpretation is only supported for color attachments, and hence must be disallowed for depth and stencil. There is very little benefit to declaring the depth and stencil variables given these restrictions.

Depth and stencil tile images are exposed as built-in variables.

Given the design choice made for issue 8, the alternate options do not add any value.

The extension introduces a new Dim.

This extension is intended to serve as foundation for further functionality - for example Pixel Local Storage like format reinterpretation, or to define the tile size and allow tile shaders to access any pixel within the tile.
In SPIR-V, input attachments use images with Dim of SubpassData. We use a new Dim so we can easily distinguish whether an image is an input attachment or a tile image.

No.
Some GPUs internally require descriptors to be able to access framebuffer data. The input attachments in Vulkan subpasses help these GPU implementations.

Other GPUs do not require apps to bind such descriptors. The intent with this extension is to provide functionality roughly in the lines of GL_EXT_shader_framebuffer_fetch, GL_EXT_shader_pixel_local_storage - which do not require apps to manage and bind descriptors.

It simply means that the value has no well-defined meaning to an application. It does *not* mean that the value is random nor that it could have been leaked from other contexts, processes, or memory other than the framebuffer attachments.

With `VK_KHR_fragment_shading_rate` multi-pixel fragments read some implementation-defined pixel from the input attachments. We could define stronger requirements in this extension.

This would provide "Pixel local storage" equivalent functionality.

A possible approach for that would be to specify the format as layout parameter - similar to image access:

layout(r11f_g11f_b10f) tile readonly highp tileImage normal;

If we were to allow non-aliased Tile Image variables, we would need to expose some limits on tile image size and tile dimensions so that applications can make performance trade-offs on tile size vs storage requirements.

We have lazily allocated images in Vulkan, but they do not guarantee that memory is not allocated.
