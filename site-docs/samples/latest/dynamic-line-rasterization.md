# Dynamic line rasterization

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/dynamic_line_rasterization/README.html

## Table of Contents

- [Overview](#_overview)
- [The sample](#_the_sample)
- [Credits](#_credits)
- [Documentation links](#_documentation_links)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/dynamic_line_rasterization). |
| --- | --- |

![screenshot](../../../_images/samples/extensions/dynamic_line_rasterization/screenshot.png)

This sample demonstrates functions from various extensions related to dynamic line rasterization. These functions can be useful for developing CAD applications.

* 
From the `VK_EXT_line_rasterization` extension:

`vkCmdSetLineStippleEXT` - sets the stipple pattern.

From the `VK_EXT_extended_dynamic_state3` extension:

* 
`vkCmdSetPolygonModeEXT` - sets how defined primitives should be rasterized.

* 
`vkCmdSetLineRasterizationModeEXT` - sets the algorithm for line rasterization.

* 
`vkCmdSetLineStippleEnableEXT` - toggles stippling for lines.

And also from the core Vulkan:

* 
`vkCmdSetLineWidth` - sets the line width.

* 
`vkCmdSetPrimitiveTopologyEXT` - defines which type of primitives is being drawn.

Dynamic line rasterization contains a wireframed cube whose appearance can be modified by the user. The cube edges and filling are rendered in a single pipeline, using a different set of indices. The `vkCmdSetPrimitiveTopologyEXT` and `vkCmdSetPolygonModeEXT` functions are used to change the way they are rendered.

Users can modify the line width (`vkCmdSetLineWidth`) and choose how the line is drawn (`vkCmdSetLineRasterizationModeEXT`). The sample also demonstrates the ability to stipple the line. Stippling is defined by two variables:

* 
`lineStipplePattern` - a `uint16_t` where each bit represents whether a point on the line is colored (1) or transparent (0).

* 
`lineStippleFactor` - a factor used to determine how many consecutive points are affected by a single pattern bit.

The sample also contains a grid rendered beneath the cube using a different pipeline. This grid represents another approach to line rasterization based on the fragment shader. Consequently, the appearance of the gridlines cannot be modified by the user.

The infinite grid shader is based on the code from the [asliceofrendering.com](https://asliceofrendering.com/scene%20helper/2020/01/05/InfiniteGrid/) blog.

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineStippleEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineStippleEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetPolygonModeEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetPolygonModeEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineRasterizationModeEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineRasterizationModeEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineStippleEnableEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineStippleEnableEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineWidth.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetLineWidth.html)
