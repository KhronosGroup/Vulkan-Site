# Fragment Density Map Operations

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/fragmentdensitymapops.html

## Table of Contents

- [Fragment Density Map Operations Overview](#_fragment_density_map_operations_overview)
- [Fragment_Density_Map_Operations_Overview](#_fragment_density_map_operations_overview)
- [Fetch Density Value](#fragmentdensitymap-fetch-density-value)
- [Fetch_Density_Value](#fragmentdensitymap-fetch-density-value)
- [Component Swizzle](#fragmentdensitymap-component-swizzle)
- [Component Mapping](#fragmentdensitymap-component-mapping)
- [Fragment Area Conversion](#fragmentdensitymap-conversion-to-fragment-area)
- [Fragment_Area_Conversion](#fragmentdensitymap-conversion-to-fragment-area)
- [Fragment Area Filter](#fragmentdensitymap-fragment-area-filter)
- [Fragment_Area_Filter](#fragmentdensitymap-fragment-area-filter)
- [Fragment Area Clamp](#fragmentdensitymap-fragment-area-clamp)
- [Fragment_Area_Clamp](#fragmentdensitymap-fragment-area-clamp)

## Content

When a fragment is generated in a render pass that has a fragment density
map attachment, its area is determined by the properties of the local
framebuffer region that the fragment occupies.
The framebuffer is divided into a uniform grid of these local regions, and
their fragment area property is derived from the density map with the
following operations:

* 
[Fetch density value](#fragmentdensitymap-fetch-density-value)

[Component swizzle](#fragmentdensitymap-component-swizzle)

* 
[Component mapping](#fragmentdensitymap-component-mapping)

[Fragment area    conversion](#fragmentdensitymap-conversion-to-fragment-area)

* 
[Fragment area filter](#fragmentdensitymap-fragment-area-filter)

* 
[Fragment area clamp](#fragmentdensitymap-fragment-area-clamp)

Each local framebuffer region at center coordinate (x,y) reads a texel
from the fragment density map.

First, the local framebuffer region center coordinate (x,y) is offset
by the value specified in
[VkRenderPassFragmentDensityMapOffsetEndInfoEXT](renderpass.html#VkRenderPassFragmentDensityMapOffsetEndInfoEXT).
If no offset is specified, then the default offset (0,0) is used.
The offset coordinate (x',y') is computed as follows:

  

  

|  | The offset is relative to the fragment density map, so it is subtracted from
| --- | --- |
the framebuffer coordinates to make the adjustment relative to the
framebuffer.

In other words, applying a positive offset in the x component will shift the
fragment density map to the right relative to the framebuffer.
This means the framebuffer coordinates need to undergo a shift to the left. |

The offset fragment coordinate (x',y') [reads a texel from the fragment density map](images.html#images-reads) at image coordinates
(x,y,0,layer,0,0), where (x,y) are calculated as:

\(x =
\mathbin{clamp}(\left\lfloor{\frac{x'}{fragmentDensityTexelSize_{width}}}\right\rfloor,
0, fragmentDensityMap_{width} - 1)\)

\(y =
\mathbin{clamp}(\left\lfloor{\frac{y'}{fragmentDensityTexelSize_{height}}}\right\rfloor,
0, fragmentDensityMap_{height} - 1)\)

Where the size of each region in the framebuffer is:

\(fragmentDensityTexelSize'_{width} =
{2^{\lceil{\log_2(\lfloor{\frac{framebuffer_{width}}{fragmentDensityMap_{width}}}\rfloor)}\rceil}}\)

\(fragmentDensityTexelSize'_{height} =
{2^{\lceil{\log_2(\lfloor{\frac{framebuffer_{height}}{fragmentDensityMap_{height}}}\rfloor)}\rceil}}\)

|  | The original spec did not include the floor in the equation above.
| --- | --- |
Implementations have shipped with and without the floor.
Given that the earliest implementations shipped with the floor, the spec now
reflects that as most content was written with this behavior.

All implementations exposing support for version 3 or greater of the
extension **must** implement with the floor included. |

If using [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering), then    and
   are defined as:

\(framebuffer_{width} = renderAreaOffset_{x} {plus}
renderAreaExtent_{width}\)

\(framebuffer_{height} = renderAreaOffset_{y} {plus}
renderAreaExtent_{height}\)

using [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`renderArea`.

This region is subject to the limits in
`VkPhysicalDeviceFragmentDensityMapPropertiesEXT` and therefore the
final region size is clamped:

\(fragmentDensityTexelSize_{width} =
\mathbin{clamp}(fragmentDensityTexelSize'_{width},minFragmentDensityTexelSize_{width},maxFragmentDensityTexelSize_{width})\)

\(fragmentDensityTexelSize_{height} =
\mathbin{clamp}(fragmentDensityTexelSize'_{height},minFragmentDensityTexelSize_{height},maxFragmentDensityTexelSize_{height})\)

When multiview is enabled for the render pass and the fragment density map
attachment view was created with `layerCount` greater than `1`, the
layer used for offsets and for fetching from the fragment density map is:

  

Otherwise, if the render pass was created with
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](renderpass.html#VkRenderPassCreateFlagBits) specified,
or the dynamic render pass was begun with
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](renderpass.html#VkRenderingFlagBitsKHR) specified,
then the layer used is:

  

Otherwise:

  

The texel fetched from the density map at (x,y,0,layer,0,0) is next
converted to density with the following operations.

The `components` member of [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) is applied to the
fetched texel as defined in [Image component swizzle](textures.html#textures-component-swizzle).

The swizzled texel’s components are mapped to a density value:

  

Fragment area for the framebuffer region is **undefined** if the density
fetched is not a normalized floating-point value greater than `0.0`.
Otherwise, the fetched fragment area for that region is derived as:

  

Optionally, the implementation **may** fetch additional density map texels in
an implementation defined window around (i,j).
The texels follow the standard conversion steps up to and including
[fragment area conversion](#fragmentdensitymap-conversion-to-fragment-area).

A single fetched fragment area for the framebuffer region is chosen by the
implementation and **must** have an area between the *min* and *max* areas of
the fetched set.

The implementation **may** clamp the fetched fragment area to one that it
supports.
The clamped fragment area **must** have a size less than or equal to the
original fetched value.
Implementations **may** vary the supported set of fragment areas per
framebuffer region.
Fragment area (1,1) **must** always be in the supported set.

|  | For example, if the fetched fragment area is (1,4) but the
| --- | --- |
implementation only supports areas of {(1,1),(2,2)}, it could choose
to clamp the area to (2,2) since it has the same size as (1,4).
While this would produce fragments that have lower quality strictly in the
x-axis, the overall density is maintained. |

The clamped fragment area is assigned to the corresponding framebuffer
region.
