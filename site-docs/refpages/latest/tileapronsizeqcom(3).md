# TileApronSizeQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/TileApronSizeQCOM.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

TileApronSizeQCOM - Tile apron size of a shader invocation

`TileApronSizeQCOM`

The `TileApronSizeQCOM` decoration **can** be applied to a shader input
which will be filled with the width and height of the active tile’s apron.

If [per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading) is enabled for the
current shader invocation, and is executing in a dynamic render pass or is
executing in a subpass where
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](VkSubpassDescriptionFlagBits.html) is included in its
`flags`, x and y components of `TileApronSizeQCOM`
reflect the with and height of the tile apron corresponding to the shader
invocation.

Otherwise, the x and y components of `TileApronSizeQCOM` are
filled with (0,0).

Valid Usage

* 
[](#VUID-TileApronSizeQCOM-TileApronSizeQCOM-10632) VUID-TileApronSizeQCOM-TileApronSizeQCOM-10632

The `TileApronSizeQCOM` decoration **must** be used only within the
`Fragment` `Execution` `Model` or `GLCompute` `Execution` `Model`

* 
[](#VUID-TileApronSizeQCOM-TileApronSizeQCOM-10633) VUID-TileApronSizeQCOM-TileApronSizeQCOM-10633

The variable decorated with `TileApronSizeQCOM` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-TileApronSizeQCOM-TileApronSizeQCOM-10634) VUID-TileApronSizeQCOM-TileApronSizeQCOM-10634

The variable decorated with `TileApronSizeQCOM` **must** be declared as
a two-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
