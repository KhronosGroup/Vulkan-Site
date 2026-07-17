# VK_QCOM_tile_shading(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_tile_shading.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_tile_shading](#VK_QCOM_tile_shading)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_tile_shading - device extension

**Name String**

`VK_QCOM_tile_shading`

**Extension Type**

Device extension

**Registered Extension Number**

310

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html)

**SPIR-V Dependencies**

* 
[SPV_QCOM_tile_shading](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_tile_shading.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_tile_shading] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_tile_shading extension*)

**Extension Proposal**

[VK_QCOM_tile_shading](../../../../features/latest/features/proposals/VK_QCOM_tile_shading.html)

**Last Modified Date**

2025-8-13

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`

* 
This extension interacts with `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)`

* 
This extension interacts with `[VK_EXT_debug_marker](VK_EXT_debug_marker.html)`

* 
This extension interacts with
`[VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html)`

* 
This extension interacts with
`[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html)`

* 
This extension interacts with `[VK_QCOM_image_processing](VK_QCOM_image_processing.html)`

**Contributors**

* 
Jeff Leger, Qualcomm

* 
Matt Netsch, Qualcomm

* 
Srihari Babu Alla, Qualcomm

* 
Matthew Smith, Qualcomm

* 
Kevin Matlage, Qualcomm

* 
Alex Bourd, Qualcomm

This extension exposes tile shading in Vulkan.
Many mobile GPUs utilize Tile-Based Deferred Rendering (TBDR) to optimize
for power and performance.
Conversely, most desktop GPUs use immediate-mode rendering (IM).
Adreno ™ GPUs uniquely have the ability to operate in either mode, and
when this extension is not enabled, the Adreno driver will select the most
optimal mode (TBDR or IM) based on the workload; this feature is called
FlexRender ™.
When this extension is in use, FlexRender is disabled and the GPU operates
exclusively in TBDR wherever possible.

The TBDR mode divides the color and depth/stencil buffer attachments into a
regular grid of smaller regions called “tiles”.
When a render pass instance is submitted for execution on an Adreno GPU, the
rendering is split into two phases: a single “visibility pass” followed by
multiple “rendering passes” where a separate render pass is issued for
each tile in the framebuffer.

The “visibility pass” processes the geometry: identifies which tiles are
covered by each primitive, eliminates occluded primitives and unneeded state
changes, and performs other tile-specific optimizations.
The primitive coverage information collected during the visibility pass is
used in the subsequent “rendering pass” for each tile.
During the rendering pass for each tile, any primitives that were determined
not to cover the current tile are skipped.

This deferred rasterization additionally utilizes a specialized
high-bandwidth on-die memory, “tile memory”.
Tile memory is dramatically more efficient than other device memory.
The tile memory temporarily stores the color and other attachments for each
tile during rasterization.
After each tile is fully rasterized, the resulting tile is typically copied
to device memory backing the attachment as specified by the render pass
STORE_OP.
The per-tile rendering passes occur independently for each tile, with
multiple tiles potentially being processed in parallel.

This extension enables applications to leverage the power and performance of
tile memory in new ways:

* 
Adds a mechanism for recording dispatches or draws that are guaranteed
to be executed per-tile.

* 
Such draws bypass the above-mentioned visibility-based skipping and are
guaranteed to be executed for every tile in the rendering pass.

* 
Shaders can declare “tile attachments” variables, providing shader
access to color, depth/stencil, and input attachment pixels.

* 
Fragment and compute shaders can read these render pass attachments at
any location within the tile.
Compute shaders can also write to color attachments at any location
within the tile.

* 
Shaders can use new built-in variables that provide the location, size,
and apron region of the tile.

* 
A new tile dispatch command automatically scales workgroup sizes and
counts to the tile size, given a desired shading rate.

* 
Framebuffer-local dependencies are expanded to tile-sized regions,
rather than a single pixel or sample.

* 
A tile shading render pass can also enable tiling “aprons”.
This is a specialized rendering mode where the GPU renders overlapping
tiles that enable specific use cases.

* 
[vkCmdBeginPerTileExecutionQCOM](vkCmdBeginPerTileExecutionQCOM.html)

* 
[vkCmdDispatchTileQCOM](vkCmdDispatchTileQCOM.html)

* 
[vkCmdEndPerTileExecutionQCOM](vkCmdEndPerTileExecutionQCOM.html)

* 
[VkDispatchTileInfoQCOM](VkDispatchTileInfoQCOM.html)

* 
[VkPerTileBeginInfoQCOM](VkPerTileBeginInfoQCOM.html)

* 
[VkPerTileEndInfoQCOM](VkPerTileEndInfoQCOM.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTileShadingFeaturesQCOM](VkPhysicalDeviceTileShadingFeaturesQCOM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceTileShadingPropertiesQCOM](VkPhysicalDeviceTileShadingPropertiesQCOM.html)

Extending [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkRenderingInfo](VkRenderingInfo.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

* 
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)

* 
[VkTileShadingRenderPassFlagBitsQCOM](VkTileShadingRenderPassFlagBitsQCOM.html)

* 
[VkTileShadingRenderPassFlagsQCOM](VkTileShadingRenderPassFlagsQCOM.html)

* 
`VK_QCOM_TILE_SHADING_EXTENSION_NAME`

* 
`VK_QCOM_TILE_SHADING_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DISPATCH_TILE_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PER_TILE_BEGIN_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PER_TILE_END_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_PROPERTIES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_TILE_SHADING_CREATE_INFO_QCOM](VkStructureType.html)

Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

* 
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](VkSubpassDescriptionFlagBits.html)

* 
[`TileOffsetQCOM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-tileoffset)

* 
[`TileDimensionQCOM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-tilesize)

* 
[`TileApronSizeQCOM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-tileapronsize)

* 
[`TileShadingQCOM`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-TileShadingQCOM)

1) Some early Adreno drivers advertised support for version 1 of this
extension without supporting the required
[`tileShadingApron`](../../../../spec/latest/chapters/features.html#features-tileShadingApron) feature.
To cover all Adreno devices on the market, applications should not assume
any version of this extension supports the `tileShadingApron` feature
without performing a feature query.

* 
Revision 2, 2025-08-13 (Matthew Netsch)

Make the `tileShadingApron` feature optional

Revision 1, 2023-10-12 (Jeff Leger)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_tile_shading).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
