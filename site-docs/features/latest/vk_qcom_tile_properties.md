# VK_QCOM_tile_properties

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_QCOM_tile_properties.html

## Table of Contents

- [1. Background](#_background)
- [2. Problem Statement](#_problem_statement)
- [2._Problem_Statement](#_problem_statement)
- [3. Solution Space](#_solution_space)
- [3._Solution_Space](#_solution_space)
- [4. Proposal](#_proposal)
- [5. Examples](#_examples)
- [5.1. Query tile properties when using render pass](#_query_tile_properties_when_using_render_pass)
- [5.1._Query_tile_properties_when_using_render_pass](#_query_tile_properties_when_using_render_pass)
- [5.2. Query tile properties when using dynamic rendering](#_query_tile_properties_when_using_dynamic_rendering)
- [5.2._Query_tile_properties_when_using_dynamic_rendering](#_query_tile_properties_when_using_dynamic_rendering)
- [5.3. Interpreting tile size values](#_interpreting_tile_size_values)
- [5.3._Interpreting_tile_size_values](#_interpreting_tile_size_values)
- [5.4. Interpreting origin values](#_interpreting_origin_values)
- [5.4._Interpreting_origin_values](#_interpreting_origin_values)
- [6. Issues](#_issues)
- [6.1. How to handle dynamic rendering?](#_how_to_handle_dynamic_rendering)
- [6.1._How_to_handle_dynamic_rendering?](#_how_to_handle_dynamic_rendering)
- [6.2. This extension returns only one set of dimensions for tile size so how to handle the case of non-merged subpasses where each subpass can have a different tile size?](#_this_extension_returns_only_one_set_of_dimensions_for_tile_size_so_how_to_handle_the_case_of_non_merged_subpasses_where_each_subpass_can_have_a_different_tile_size)
- [6.2._This_extension_returns_only_one_set_of_dimensions_for_tile_size_so_how_to_handle_the_case_of_non-merged_subpasses_where_each_subpass_can_have_a_different_tile_size?](#_this_extension_returns_only_one_set_of_dimensions_for_tile_size_so_how_to_handle_the_case_of_non_merged_subpasses_where_each_subpass_can_have_a_different_tile_size)
- [6.3. Adreno implementation may decide to execute certain workloads in direct rendering mode a.k.a Flex render. What is the interaction of this extension with Flex render?](#_adreno_implementation_may_decide_to_execute_certain_workloads_in_direct_rendering_mode_a_k_a_flex_render_what_is_the_interaction_of_this_extension_with_flex_render)
- [6.3._Adreno_implementation_may_decide_to_execute_certain_workloads_in_direct_rendering_mode_a.k.a_Flex_render._What_is_the_interaction_of_this_extension_with_Flex_render?](#_adreno_implementation_may_decide_to_execute_certain_workloads_in_direct_rendering_mode_a_k_a_flex_render_what_is_the_interaction_of_this_extension_with_flex_render)

## Content

Table of Contents

[1. Background](#_background)
[2. Problem Statement](#_problem_statement)
[3. Solution Space](#_solution_space)
[4. Proposal](#_proposal)
[5. Examples](#_examples)

[5.1. Query tile properties when using render pass](#_query_tile_properties_when_using_render_pass)
[5.2. Query tile properties when using dynamic rendering](#_query_tile_properties_when_using_dynamic_rendering)
[5.3. Interpreting tile size values](#_interpreting_tile_size_values)
[5.4. Interpreting origin values](#_interpreting_origin_values)

[6. Issues](#_issues)

[6.1. How to handle dynamic rendering?](#_how_to_handle_dynamic_rendering)
[6.2. This extension returns only one set of dimensions for tile size so how to handle the case of non-merged subpasses where each subpass can have a different tile size?](#_this_extension_returns_only_one_set_of_dimensions_for_tile_size_so_how_to_handle_the_case_of_non_merged_subpasses_where_each_subpass_can_have_a_different_tile_size)
[6.3. Adreno implementation may decide to execute certain workloads in direct rendering mode a.k.a Flex render. What is the interaction of this extension with Flex render?](#_adreno_implementation_may_decide_to_execute_certain_workloads_in_direct_rendering_mode_a_k_a_flex_render_what_is_the_interaction_of_this_extension_with_flex_render)

This document details API design ideas for the VK_QCOM_tile_properties extension, which allows application to query the tile properties. This extension supports both renderpasses and dynamic rendering.

Adreno GPUs uses a rendering technique called tiled rendering. In this technique, the attachments are divided into a uniform grid of small regions or "tiles". Tile size is shared by and affects all attachments in use. Splitting a render target into multiple chunks or tiles, and rendering each tile individually in order to reconstruct the full render target can be faster and more power-efficient.

A typical tile size will be such that it is contained completely within the attachment but tiles can span outside the attachment’s extent as well. This is because *Number of tiles = ceil(attachment_width / tile_width)*. Such tiles are called partially filled tiles and are less-efficient to render.

In the case of fragment density map, a "local framebuffer region" and all fragments within it will share a value for "fragment area" determined from a corresponding texel in the fragment density map as described in "Fragment Area Conversion" section in the "Fragment Density Map Operations" chapter of the Vulkan specification. Implementations are also free to fetch additional texels within an implementation-defined window as described in "Fragment Area Filter" section of "Fragment Density Map Operations" chapter of the Vulkan specification. Adreno implementations utilize this behavior and will perform both windowing and fragment area assignment within a region defined by a "tile".

The "tiles" exposed in this extension also each define a "framebuffer-local region" as described in the "Framebuffer Region Dependencies" section in the "Synchronization and Cache Control" chapter of the Vulkan specification.

Currently, developers do not know how the implementation is tiling their applications. Several application-controlled factors will implicitly influence the tile size, such as attachment resolution, number of attachments, formats, number of samples, etc.

Adreno implementations will window and apply fragment density map values on a tile-basis. Currently, applications are unable to determine the size and location of tiles, preventing them from knowing how their fragment density map will be applied and the final fragment areas that will result.

With regard to framebuffer-local dependencies, applications are unable to determine the size of the framebuffer-local region and thus must assume it is the size of a single fragment or sample. Due to this, applications must use framebuffer-global dependencies outside of single pixel or sample sized regions, possibly at the cost of efficiency.

Another problem is that currently, applications are unable to align the renderArea with tile boundaries which would achieve the most efficient rendering. The command [vkGetRenderAreaGranularity](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#vkGetRenderAreaGranularity) does not allow implementations to fully describe the tiling grid and reported granularity is based solely on a renderpass.

Create a new extension with API entry points that allows developer to query the tile properties.

With the knowledge from this extension, applications can create fragment density maps that will apply in a more direct way to the final fragment areas in use, allowing more purposeful creation of maps.

Information from this extension can also be used to determine the size and location of framebuffer-local regions, allowing applications to use local-region dependencies in place of framebuffer-global ones for potential increases in efficiency.

This extension introduces new API calls and a new struct:

VKAPI_ATTR QGLENTRY_ATTR VkResult VKAPI_CALL vkGetFramebufferTilePropertiesQCOM(
    VkDevice                     device,
    VkFramebuffer                vkFramebuffer,
    uint32_t*                    pPropertiesCount,
    VkTilePropertiesQCOM*        pProperties);

When using renderpasses, use the above command after framebuffer creation to query the tile properties from the framebuffer. `pPropertiesCount` is a pointer to an integer related to the number of `pProperties` available or queried. `pProperties` is a pointer to an array of `VkTilePropertiesQCOM` structure that holds the returned properties.
If `pProperties` is NULL, then the total number of tile properties available is returned in `pPropertiesCount`. `pPropertiesCount` must point to a variable set by the application to the number of elements in the `pProperties` array, and on return the variable is overwritten with the number of properties actually written to `pProperties`. If `pPropertiesCount` is less than the number of `pProperties` available, at most `pPropertiesCount` structures will be written, and `VK_INCOMPLETE` will be returned instead of `VK_SUCCESS`, to indicate that not all the available tile properties were returned.

The number of tile properties available is determined by the number of merged subpasses, and each tile property is associated with a merged subpass. There will be at most as many properties as there are subpasses within the render pass. To obtain the tile properties for a given merged subpass, the `pProperties` array can be indexed using the `postMergeIndex` value provided in [VkRenderPassSubpassFeedbackInfoEXT](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkRenderPassSubpassFeedbackInfoEXT).

For dynamic rendering, a new API entry point is introduced because it does not have a framebuffer:

VKAPI_ATTR QGLENTRY_ATTR VkResult VKAPI_CALL vkGetDynamicRenderingTilePropertiesQCOM(
    VkDevice                     device,
    const VkRenderingInfo*       pRenderingInfo,
    VkTilePropertiesQCOM*        pProperties);

When using dynamic rendering, use the above command to query the tile properties. `pRenderingInfo` is a pointer to the `VkRenderingInfo` structure specifying details of the render pass instance in dynamic rendering. Tile properties are returned in `pProperties` which is a pointer to `VkTilePropertiesQCOM` structure that holds the available properties.

Support for querying tile properties is indicated by feature bit in a
structure that extends
[VkPhysicalDeviceFeatures2](https://docs.vulkan.org/spec/latest/chapters/features.html#VkPhysicalDeviceFeatures2).

typedef struct VkPhysicalDeviceTilePropertiesFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tileProperties;
} VkPhysicalDeviceTilePropertiesFeaturesQCOM;

`tileProperties` indicates that the implementation supports queries for tile
properties.

A new structure is introduced to hold the tile properties.

typedef struct VkTilePropertiesQCOM {
    VkStructureType       sType;
    void*                 pNext;
    VkExtent3D            tileSize;
    VkExtent2D            apronSize;
    VkOffset2D            origin;
} VkTilePropertiesQCOM;

The reported value for `apronSize` is described in [VK_QCOM_tile_shading](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_QCOM_tile_shading).

`tileSize` describes the dimensions of a tile, with width and height describing the width and height of a tile
in pixels, and depth corresponding to the number of slices the tile spans. All attachments share the same tile
width and height.  The tile depth value reflects the maximum slice count of all in-use attachments.

`origin` is top-left corner of the first tile in attachment space.

All tiles will be tightly packed around the first tile, with edges being multiples of tile width and/or height from the origin.

uint32_t subpassCount = 2;

VkTilePropertiesQCOM* tileProperties =
  malloc(sizeof(VkTilePropertiesQCOM) * subpassCount);

// `device` is a valid VkDevice handle
// `hFramebuffer` is a handle to a valid VkFramebuffer object that we want to query
vkGetFramebufferTilePropertiesQCOM(device, hFramebuffer, tileProperties, &subpassCount);

VkRenderingInfoKHR renderingInfo = {
    .sType = VK_STRUCTURE_TYPE_RENDERING_INFO_KHR,
    .pNext = NULL,
    .flags = 0,
    .renderArea = { ... },
    .layerCount = 1,
    .colorAttachmentCount = 2,
    .pColorAttachments = colorAttachments,
    .pDepthAttachment = &depthStencilAttachment,
    .pStencilAttachment = &depthStencilAttachment };

    VkTilePropertiesQCOM tileProperties = {
    .sType = VK_STRUCTURE_TYPE_TILE_PROPERTIES_QCOM,
    .pNext = NULL,
    .... };

// `device` is a valid VkDevice handle
// `pRenderingInfo` is pointer to the `VkRenderingInfoKHR` struct that was passed to `vkCmdBeginRenderingKHR`
vkGetDynamicRenderingTilePropertiesQCOM(device, pRenderingInfo, &tileProperties);

If attachment dimensions are (768, 1440) and tile size returned is (768, 480) then it implies that there are three tiles in a (1 x 3) tile-grid. All tiles are full tiles contained within the attachment.

If attachment dimensions are (720, 1440) and tile size returned is (768, 480) then it implies that there are three tiles in a (1 x 3) tile-grid. All tiles are *partially filled* tiles as they span outside the attachment extent.

If attachment dimensions are (1920, 1080) and tile size returned is (672, 576) then it implies that there are six tiles in a (3 x 2) tile-grid. Last tiles in each row and column are *partially filled* tiles as they span outside the attachment extent.

If returned origin is (0, 0) then the first tile’s top-left corner is at the attachment’s origin (0,0).

If returned origin is (-32, -64) and tile size is (768, 480), then tile boundaries in x will lie at -32, 736, 1504, …​ and tile boundaries in y will lie at -64, 416, 896, …​".

This section describes issues that came up during discussion and their resolution.

Since the extension should support both renderpasses and dynamic rendering, dedicated API entry points were added for both.

The extension was modified to return an array of tile properties which holds properties for all requested or available subpassses instead of single value for tile properties.

In those cases, the information returned by this extension may not indicate the true execution mode of the GPU.
