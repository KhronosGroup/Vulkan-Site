# Primitive Topology

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/primitive_topology.html

## Table of Contents

- [Pre-Rasterization stages](#pre-rasterization-stages)
- [Types of Primitive](#_types_of_primitive)
- [Types_of_Primitive](#_types_of_primitive)
- [Various Effective Topology](#_various_effective_topology)
- [Various_Effective_Topology](#_various_effective_topology)
- [Vertex Input Assembly](#_vertex_input_assembly)
- [Vertex_Input_Assembly](#_vertex_input_assembly)
- [Shader Execution Mode](#_shader_execution_mode)
- [Shader_Execution_Mode](#_shader_execution_mode)
- [Mesh output Execution Mode](#_mesh_output_execution_mode)
- [Mesh_output_Execution_Mode](#_mesh_output_execution_mode)
- [Tessellation output Execution Mode](#_tessellation_output_execution_mode)
- [Tessellation_output_Execution_Mode](#_tessellation_output_execution_mode)
- [Geometry output Execution Mode](#_geometry_output_execution_mode)
- [Geometry_output_Execution_Mode](#_geometry_output_execution_mode)
- [Polygon Mode](#_polygon_mode)
- [rasterizerDiscardEnable](#_rasterizerdiscardenable)

## Content

When using a graphics pipeline there are 2 types of shaders, [pre-rasterization shaders](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and fragment shaders.

The following are the various shader stages that can be used in pre-rasterization.

![primitive_topology_stages.svg](_images/primitive_topology_stages.svg)

The main thing to take away here is the last pre-rasterization stage might be any of the following:

* 
VK_SHADER_STAGE_VERTEX_BIT

* 
VK_SHADER_STAGE_MESH_BIT_EXT

* 
VK_SHADER_STAGE_GEOMETRY_BIT

* 
VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT (must always be with a tessellation control stage)

One of the goals of pre-rasterization is to get all the `primitives` ready for rasterization. The `primitive` is the smallest organized unit of vertices forming a basic geometric shape that’s processed by the rasterizer. The `topology` of these primitives can be defined with the values in [VkPrimitiveTopology](https://docs.vulkan.org/spec/latest/chapters/drawing.html#VkPrimitiveTopology).

The following shows a basic example how 6 vertices can be connected in different `VkPrimitiveTopology`

![primitive_topology_example.svg](_images/primitive_topology_example.svg)

It is possible for the multiple [Topology Class](https://docs.vulkan.org/spec/latest/chapters/drawing.html#drawing-primitive-topology-class) to be used during the graphics pipeline. It is important to know where in the pipeline you are when discussing "topology".

`VkPipelineInputAssemblyStateCreateInfo::topology` (or set dynamically with `vkCmdSetPrimitiveTopology`) is what is provided as an input for the vertex shader.

When using mesh shaders, this value is ignored.

|  | If you want to set `VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY` in your pipeline, make sure to be aware of the `dynamicPrimitiveTopologyUnrestricted` property. Some hardware can only let you dynamically adjust the input assembly primitive topology to be in the same [Topology Class](https://docs.vulkan.org/spec/latest/chapters/drawing.html#drawing-primitive-topology-class) |
| --- | --- |

Some stages have `Execution Mode` (SPIR-V term) that are defined in the shader code itself. This allows shader authors to determine the topology the shader will output.

It is possible to have multiple stages such as tessellation and geometry together. In this case the effective topology is only the `Execution Mode` set by the last shader stage in the pipeline.

The mesh stage will set either `OutputPoints`, `OutputLinesEXT`, or `OutputTrianglesEXT`

[Try Online](https://godbolt.org/z/jhhsoTfnT)

#extension GL_EXT_mesh_shader : require

// Only 1 of the 3 is allowed
layout(points) out;
layout(lines) out;
layout(triangles) out;

The tessellation evaluation stage will set either `Triangles`, `Quads`, or `Isolines`

[Try Online](https://godbolt.org/z/PbPT4WWrr)

// Only 1 of the 3 is allowed
layout(quads) in;
layout(isolines) in;
layout(triangles) in;

A geometry stage will set either `OutputPoints`, `OutputLineStrip`, or `OutputTriangleStrip`

[Try Online](https://godbolt.org/z/K9nn98oGv)

// Only 1 of the 3 is allowed
layout(points) out;
layout(line_strip) out;
layout(triangle_strip) out;

Once you have your primitives created you can set the [VkPolygonMode](https://docs.vulkan.org/spec/latest/chapters/primsrast.html#VkPolygonMode). This allows you to "fill in" the primitive.

![primitive_topology_polygon_mode.svg](_images/primitive_topology_polygon_mode.svg)

If you have a vertex shader that has `VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST` input and then during rasterization uses `VK_POLYGON_MODE_LINE`, the effective topology is the Line [Topology Class](https://docs.vulkan.org/spec/latest/chapters/drawing.html#drawing-primitive-topology-class) at time. This means something like `lineWidth` would be applied when filling in the polygon with `VK_POLYGON_MODE_LINE`.

`VkPipelineRasterizationStateCreateInfo::rasterizerDiscardEnable` (or set dynamically with `vkCmdSetRasterizerDiscardEnable`) controls whether primitives are discarded immediately before the rasterization stage. This is important because when this is set to `VK_TRUE` the rasterization hardware is not executed. There are many Validation Usage errors that will not occur if this is set to `VK_TRUE` because some topology hardware is unused and can be ignored.

|  | Enabling this state is meant for very specific use cases. Prior to compute shaders, this was a common technique for writting geometry shader output to a buffer. It can be used to debug/profile non-rasterization bottle necks. |
| --- | --- |
