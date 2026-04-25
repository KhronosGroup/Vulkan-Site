# Shader Interfaces

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/interfaces.html

## Table of Contents

- [Shader Input and Output Interfaces](#interfaces-iointerfaces)
- [Shader_Input_and_Output_Interfaces](#interfaces-iointerfaces)
- [Built-In Interface Block](#interfaces-iointerfaces-builtin)
- [Built-In_Interface_Block](#interfaces-iointerfaces-builtin)
- [User-Defined Variable Interface](#interfaces-iointerfaces-user)
- [User-Defined_Variable_Interface](#interfaces-iointerfaces-user)
- [Interface Matching](#interfaces-iointerfaces-matching)
- [Location and Component Assignment](#interfaces-iointerfaces-locations)
- [Location_and_Component_Assignment](#interfaces-iointerfaces-locations)
- [Vertex Input Interface](#interfaces-vertexinput)
- [Vertex_Input_Interface](#interfaces-vertexinput)
- [Fragment Output Interface](#interfaces-fragmentoutput)
- [Fragment_Output_Interface](#interfaces-fragmentoutput)
- [Legacy Dithering](#interfaces-legacy-dithering)
- [Fragment Tile Image Interface](#interfaces-fragmenttileimage)
- [Fragment_Tile_Image_Interface](#interfaces-fragmenttileimage)
- [Tile Attachment Interface](#interfaces-tile-attachment)
- [Tile_Attachment_Interface](#interfaces-tile-attachment)
- [Fragment Input Attachment Interface](#interfaces-inputattachment)
- [Fragment_Input_Attachment_Interface](#interfaces-inputattachment)
- [Fragment Input Attachment Compatibility](#compatibility-inputattachment)
- [Fragment_Input_Attachment_Compatibility](#compatibility-inputattachment)
- [Ray Tracing Pipeline Interface](#interfaces-raypipeline)
- [Ray_Tracing_Pipeline_Interface](#interfaces-raypipeline)
- [Shader Resource Interface](#interfaces-resources)
- [Shader_Resource_Interface](#interfaces-resources)
- [Push Constant Interface](#interfaces-resources-pushconst)
- [Push_Constant_Interface](#interfaces-resources-pushconst)
- [Descriptor Set Interface](#interfaces-resources-descset)
- [Descriptor_Set_Interface](#interfaces-resources-descset)
- [Descriptor Heap Interface](#interfaces-resources-descriptorheap)
- [Descriptor_Heap_Interface](#interfaces-resources-descriptorheap)
- [DescriptorSet and Binding Assignment](#interfaces-resources-setandbinding)
- [DescriptorSet_and_Binding_Assignment](#interfaces-resources-setandbinding)
- [Offset and Stride Assignment](#interfaces-resources-layout)
- [Offset_and_Stride_Assignment](#interfaces-resources-layout)
- [Built-In Variables](#interfaces-builtin-variables)

## Content

When a pipeline is created, the set of shaders specified in the
corresponding `VkPipelineCreateInfo` structure are implicitly linked at
a number of different interfaces.

* 
[Shader Input and Output Interface](#interfaces-iointerfaces)

* 
[Vertex Input Interface](#interfaces-vertexinput)

* 
[Fragment Output Interface](#interfaces-fragmentoutput)

* 
[Fragment Tile Image Interface](#interfaces-fragmenttileimage)

* 
[Fragment Input Attachment Interface](#interfaces-inputattachment)

* 
[Ray Tracing Pipeline Interface](#interfaces-raypipeline)

* 
[Shader Resource Interface](#interfaces-resources)

* 
[Geometry Shader Passthrough](geometry.html#geometry-passthrough-passthrough)

This chapter describes valid uses for a set of SPIR-V decorations.
Any other use of one of these decorations is invalid, with the exception
that, when using SPIR-V versions 1.4 and earlier: `Block`,
`BufferBlock`, `Offset`, `ArrayStride`, and `MatrixStride` can
also decorate types and type members used by variables in the `Private`
and `Function` storage classes.

|  | In this chapter, there are references to SPIR-V terms such as the
| --- | --- |
`MeshNV` execution model.
These terms will appear even in a build of the specification which does not
support any extensions.
This is as intended, since these terms appear in the unified SPIR-V
specification without such qualifiers. |

When multiple stages are present in a pipeline, the outputs of one stage
form an interface with the inputs of the next stage.
When such an interface involves a shader, shader outputs are matched against
the inputs of the next stage, and shader inputs are matched against the
outputs of the previous stage.

All the variables forming the shader input and output *interfaces* are
listed as operands to the `OpEntryPoint` instruction and are declared
with the `Input` or `Output` storage classes, respectively, in the
SPIR-V module.
These generally form the interfaces between consecutive shader stages,
regardless of any non-shader stages between the consecutive shader stages.

There are two classes of variables that **can** be matched between shader
stages, built-in variables and user-defined variables.
Each class has a different set of matching criteria.

For compute shaders, the input interface is formed by the built-in
interface.
The output interface is empty.

Shader [built-in](#interfaces-builtin-variables) variables meeting the
following requirements define the *built-in interface block*.
They **must**

* 
be explicitly declared (there are no implicit built-ins),

* 
be identified with a `BuiltIn` decoration,

* 
form object types as described in the
[Built-in Variables](#interfaces-builtin-variables) section, and

* 
be declared in a block whose top-level members are the built-ins.

There **must** be no more than one built-in interface block per shader per
interface
, except for the mesh output interface where there **must** be at most one
built-in interface block decorated with the `PerPrimitiveEXT` decoration
and at most one built-in interface block without this decoration
.

Built-ins **must** not have any `Location` or `Component` decorations.

The non-built-in variables listed by `OpEntryPoint` with the `Input`
or `Output` storage class form the *user-defined variable interface*.
These **must** have [numeric type](formats.html#formats-numericformat) or, recursively,
composite types of such types.
If an implementation supports [`storageInputOutput16`](features.html#features-storageInputOutput16), components **can** have a width of 16 bits.
These variables **must** be identified with a `Location` decoration and **can**
also be identified with a `Component` decoration.

An output variable, block, or structure member in a given shader stage has
an interface match with an input variable, block, or structure member in a
subsequent shader stage if they both adhere to the following conditions:

* 
They have equivalent decorations, other than:

`XfbBuffer`, `XfbStride`, `Offset`, and `Stream`

* 
one is not decorated with `Component` and the other is declared with
a `Component` of `0`

* 
[Interpolation decorations](shaders.html#shaders-interpolation-decorations)

* 
`RelaxedPrecision` if one is an input variable and the other an
output variable

Their types match as follows:

* 
if the input is declared in a tessellation control or geometry shader
as an `OpTypeArray` with an `Element` `Type` equivalent to the
`OpType*` declaration of the output, and neither is a structure
member; or

* 
if the [`maintenance4`](features.html#features-maintenance4) feature is
enabled, they are declared as `OpTypeVector` variables, and the
output has a `Component` `Count` value higher than that of the
input but the same `Component` `Type`; or

* 
if the output is declared in a mesh shader as an `OpTypeArray` with
an `Element` `Type` equivalent to the `OpType*` declaration of
the input, and neither is a structure member; or

* 
if the input is decorated with `PerVertexKHR`, and is declared in a
fragment shader as an `OpTypeArray` with an `Element` `Type`
equivalent to the `OpType*` declaration of the output, and neither
the input nor the output is a structure member; or

* 
if in any other case they are declared with an equivalent `OpType*`
declaration.

If both are structures and every member has an interface match.

|  | The word “structure” above refers to both variables that have an
| --- | --- |
`OpTypeStruct` type and interface blocks (which are also declared as
`OpTypeStruct`). |

If the pipeline is compiled as separate graphics pipeline libraries and the
[`graphicsPipelineLibraryIndependentInterpolationDecoration`](limits.html#limits-graphicsPipelineLibraryIndependentInterpolationDecoration) limit is
not supported, matches are not found if the
[interpolation decorations](shaders.html#shaders-interpolation-decorations) differ
between the last [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) and the fragment shader stage.

All input variables and blocks **must** have an interface match in the
preceding shader stage, except for built-in variables in fragment shaders.
Shaders **can** declare and write to output variables that are not declared or
read by the subsequent stage.

Matching rules for *passthrough geometry shaders* are slightly different and
are described in the [Passthrough Interface Matching](geometry.html#geometry-passthrough-interface) section.

The value of an input variable is **undefined** if the preceding stage does not
write to a matching output variable, as described above.

[User-defined variables](#interfaces-iointerfaces-user) in interfaces
between shader stages in the graphics pipeline consume a unique set of
`Location` and `Component` values.

Available space for user-defined interface variables is partitioned into a
number of 32-bit four-component vectors, each identified by a `Location`
value.
Each individual 32-bit component of a vector is then further identified by a
`Component` value.

16-bit scalar or vector values consume one `Component` slot per 16-bit
component and **must** be specified within a single `Location`.
32-bit scalar or vector values consume one `Component` slot per 32-bit
component and **must** be specified within a single `Location`.
64-bit scalar or vector values consume two consecutive `Component` slots
per 64-bit component from up to two consecutive `Location` slots.

For any shader interface variable where [one level of the array is disregarded for type matching](#interfaces-iointerfaces-matching), the outer array
level is also disregarded when assigning `Location` slots.

An array of size n with elements consuming l `Location` slots
each will consume l × n `Location` slots.
Each element of the array will consume `Component` slots in each
`Location` slot identically to a declaration using the element type.

Matrices of size n × m are assigned locations identically to
arrays of size n of vectors of length 4 (consuming all `Component`
slots) with an identical element type.

When a variable with a structure type is decorated with a `Location`, the
members in the structure type **must** not be decorated with a `Location`.
The variable’s members are assigned consecutive locations in declaration
order, starting from the first member, which is assigned the location
decoration from the variable.
The `Location` slots consumed by structure members are determined by
applying the rules above in a depth-first traversal of the instantiated
members as though the structure or block member were declared as an input or
output variable of the same type.

A variable with a structure type that is not decorated with `Block` **must**
be decorated with a `Location`.

When a variable with a structure type decorated with `Block` is declared
without a `Location` decoration, each member in the structure **must** be
decorated with a `Location`.
Types nested deeper than the top-level members **must** not have `Location`
decorations.

Multiple variable declarations in the same storage class **must** not have
overlapping `Component` slots within the same `Location`.

The number of input and output locations available for a shader input or
output interface depend on the shader stage as described in
[Shader Input and Output Locations](#interfaces-iointerfaces-limits).
All variables in both the [built-in interface block](#interfaces-builtin-variables) and the [user-defined variable interface](#interfaces-iointerfaces-user) count against these limits.
Each effective `Location` **must** have a value less than the number of
`Location` slots available for the given interface, as specified in the
“Locations Available” column in [Shader Input and Output Locations](#interfaces-iointerfaces-limits).

| Shader Interface | Locations Available |
| --- | --- |
| vertex input | `maxVertexInputAttributes` |
| vertex output | `maxVertexOutputComponents` / 4 |
| tessellation control input | `maxTessellationControlPerVertexInputComponents` / 4 |
| tessellation control output | `maxTessellationControlPerVertexOutputComponents` / 4 |
| tessellation evaluation input | `maxTessellationEvaluationInputComponents` / 4 |
| tessellation evaluation output | `maxTessellationEvaluationOutputComponents` / 4 |
| geometry input | `maxGeometryInputComponents` / 4 |
| geometry output | `maxGeometryOutputComponents` / 4 |
| fragment input | `maxFragmentInputComponents` / 4 |
| fragment output | `maxFragmentOutputAttachments` |
| mesh output | `maxMeshOutputComponents` / 4 |
| cluster culling output | `maxOutputClusterCount` |

When the vertex stage is present in a pipeline, the vertex shader input
variables form an interface with the vertex input attributes.
The vertex shader input variables are matched by the `Location` and
`Component` decorations to the vertex input attributes specified in the
`pVertexInputState` member of the [VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)
structure.

The vertex shader input variables listed by `OpEntryPoint` with the
`Input` storage class form the *vertex input interface*.
These variables **must** be identified with a `Location` decoration and **can**
also be identified with a `Component` decoration.

For the purposes of interface matching: variables declared without a
`Component` decoration are considered to have a `Component` decoration
of zero.
The number of available vertex input `Location` slots is given by the
`maxVertexInputAttributes` member of the `VkPhysicalDeviceLimits`
structure.

See [Attribute Location and Component Assignment](fxvertex.html#fxvertex-attrib-location) for details.

All vertex shader inputs declared as above **must** have a corresponding
attribute and binding in the pipeline.

Components and locations are consumed as defined for
[Location and Component Assignment](#interfaces-iointerfaces-locations).
Multiple [user-defined input variable](#interfaces-iointerfaces-user)
declarations **must** not have overlapping `Component` slots within the same
`Location`.

When the fragment stage is present in a pipeline, the fragment shader
outputs form an interface with the output attachments defined by a
[render pass instance](renderpass.html#renderpass).
The fragment shader output variables are matched by the `Location` and
`Component` decorations to specified color attachments.

The fragment shader output variables listed by `OpEntryPoint` with the
`Output` storage class form the *fragment output interface*.
These variables **must** be identified with a `Location` decoration.
They **can** also be identified with a `Component` decoration and/or an
`Index` decoration.
For the purposes of interface matching: variables declared without a
`Component` decoration are considered to have a `Component` decoration
of zero, and variables declared without an `Index` decoration are
considered to have an `Index` decoration of zero.

A fragment shader output variable identified with a `Location` decoration
of *i* is associated with
the color attachment indicated by
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments`[*i*].
When using render pass objects, it is associated with
the color attachment indicated by
[VkSubpassDescription](renderpass.html#VkSubpassDescription)::`pColorAttachments`[*i*].
Values are written to those attachments after passing through the blending
unit as described in [Blending](framebuffer.html#framebuffer-blending), if enabled.
The number of available fragment output `Location` slots is given by the
`maxFragmentOutputAttachments` member of the
`VkPhysicalDeviceLimits` structure.

If the
[`dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead)
feature is supported, fragment output locations **can** be remapped when using
dynamic rendering.

To set the fragment output location mappings during rendering, call:

// Provided by VK_VERSION_1_4
void vkCmdSetRenderingAttachmentLocations(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingAttachmentLocationInfo*    pLocationInfo);

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to vkCmdSetRenderingAttachmentLocations
void vkCmdSetRenderingAttachmentLocationsKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingAttachmentLocationInfo*    pLocationInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pLocationInfo` is a [VkRenderingAttachmentLocationInfo](#VkRenderingAttachmentLocationInfo)
structure indicating the new mappings.

This command sets the attachment location mappings for subsequent drawing
commands, and **must** match the mappings provided to the bound pipeline,
if one is bound,
which **can** be set by chaining [VkRenderingAttachmentLocationInfo](#VkRenderingAttachmentLocationInfo) to
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo).

Until this command is called, mappings in the command buffer state are
treated as each color attachment specified in [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)
having a location equal to its index in
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments`.
This state is reset whenever [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is called.

Valid Usage

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-dynamicRenderingLocalRead-09509) VUID-vkCmdSetRenderingAttachmentLocations-dynamicRenderingLocalRead-09509

[`dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead)
**must** be enabled

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-09510) VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-09510

`pLocationInfo->colorAttachmentCount` **must** be equal to the value of
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`colorAttachmentCount` used to begin the
current render pass instance

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-09511) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-09511

The current render pass instance **must** have been started or resumed by
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) in this `commandBuffer`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-parameter) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-parameter) VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-parameter

 `pLocationInfo` **must** be a valid pointer to a valid [VkRenderingAttachmentLocationInfo](#VkRenderingAttachmentLocationInfo) structure

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-recording) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-cmdpool) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-renderpass) VUID-vkCmdSetRenderingAttachmentLocations-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-videocoding) VUID-vkCmdSetRenderingAttachmentLocations-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRenderingAttachmentLocations is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkRenderingAttachmentLocationInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkRenderingAttachmentLocationInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorAttachmentCount;
    const uint32_t*    pColorAttachmentLocations;
} VkRenderingAttachmentLocationInfo;

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to VkRenderingAttachmentLocationInfo
typedef VkRenderingAttachmentLocationInfo VkRenderingAttachmentLocationInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`colorAttachmentCount` is the number of elements in
`pColorAttachmentLocations`.

* 
`pColorAttachmentLocations` is a pointer to an array of
`colorAttachmentCount` `uint32_t` values defining remapped
locations for color attachments.

This structure allows applications to remap the locations of color
attachments to different fragment shader output locations.

Each element of `pColorAttachmentLocations` set to
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) will be inaccessible to this pipeline as a color
attachment; no location will map to it.
Each element of `pColorAttachmentLocations` set to any other value will
map the specified location value to the color attachment specified in the
render pass at the corresponding index in the
`pColorAttachmentLocations` array.
Any writes to a fragment output location that is not mapped to an attachment
**must** be discarded.

If `pColorAttachmentLocations` is `NULL`, it is equivalent to setting
each element to its index within the array.

This structure **can** be included in the `pNext` chain of a
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo) structure to set this state for a
pipeline.
If this structure is not included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`.

* 
`pColorAttachmentLocations` set to `NULL`.

This structure **can** be included in the `pNext` chain of a
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo) structure to specify inherited state
from the primary command buffer.
If [VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)::renderPass is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), or
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits) is not specified in
[VkCommandBufferBeginInfo](cmdbuffers.html#VkCommandBufferBeginInfo)::flags, members of this structure are
ignored.
If this structure is not included in the `pNext` chain of
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkCommandBufferInheritanceRenderingInfo](cmdbuffers.html#VkCommandBufferInheritanceRenderingInfo)::`colorAttachmentCount`.

* 
`pColorAttachmentLocations` set to `NULL`.

Valid Usage

* 
[](#VUID-VkRenderingAttachmentLocationInfo-dynamicRenderingLocalRead-09512) VUID-VkRenderingAttachmentLocationInfo-dynamicRenderingLocalRead-09512

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`pColorAttachmentLocations` is not `NULL`, each element **must** be the
value of its index within the array

* 
[](#VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09513) VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09513

Elements of `pColorAttachmentLocations` that are not
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) **must** each be unique

* 
[](#VUID-VkRenderingAttachmentLocationInfo-colorAttachmentCount-09514) VUID-VkRenderingAttachmentLocationInfo-colorAttachmentCount-09514

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09515) VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09515

Each element of `pColorAttachmentLocations` **must** be less than
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAttachmentLocationInfo-sType-sType) VUID-VkRenderingAttachmentLocationInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

When an active fragment shader invocation finishes, the values of all
fragment shader outputs are copied out and used as blend inputs or color
attachments writes.
If there is no color attachment indicated by `Location`, the values that
would have been written to the color attachments are discarded.

Output `Component` words identified as 0, 1, 2, and 3 will be directed to
the R, G, B, and A inputs to the blending unit, respectively, or to the
output attachment if blending is disabled.
If two variables are placed within the same `Location`, they **must** have
the same [numeric type](formats.html#formats-numericformat).
`Component` words which do not correspond to any fragment shader output
will also result in **undefined** values for blending or color attachment
writes.

Fragment outputs identified with an `Index` of zero are directed to the
first input of the blending unit associated with the corresponding
`Location`.
Outputs identified with an `Index` of one are directed to the second
input of the corresponding blending unit.

Components and locations are consumed as defined for
[Location and Component Assignment](#interfaces-iointerfaces-locations).
Output variable declarations **must** not consume any of the same
`Component` slots within the same `Location` and with the same
`Index` value as any other output variable declaration.

Output values written by a fragment shader **must** be declared with either
`OpTypeFloat` or `OpTypeInt`, and a `Width` of 32.
If `storageInputOutput16` is supported, output values written by a
fragment shader **can** be also declared with either `OpTypeFloat` or
`OpTypeInt` and a `Width` of 16.
Composites of these types are also permitted.
If the color attachment has a signed or unsigned normalized fixed-point
format, color values are assumed to be floating-point and are converted to
fixed-point as described in [Conversion From Floating-Point to Normalized Fixed-Point](fundamentals.html#fundamentals-fpfixedconv); If the color
attachment has an integer format, color values are assumed to be integers
and converted to the bit-depth of the target.
Any value that cannot be represented in the attachment’s format is
**undefined**.
For any other attachment format no conversion is performed.
If the type of the values written by the fragment shader do not match the
format of the corresponding color attachment, the resulting values are
**undefined** for those components.

The application **can** enable dithering to be applied to the color output of a
subpass, by using the
[VK_SUBPASS_DESCRIPTION_ENABLE_LEGACY_DITHERING_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits) flag.
For use in a dynamic render pass, the
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](renderpass.html#VkRenderingFlagBitsKHR) flag **must** be used.
In that case, the pipelines used **must** have been created with
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR).

When dithering is enabled, the implementation **may** modify the output color
value c by one ULP.
This modification **must** only depend on the framebuffer coordinates
(xf,yf) of the sample, as well as on the value of c.

The exact details of the dithering algorithm are unspecified, including the
algorithm itself, the formats dithering is applied to, and the stage in
which it is applied.

|  | This extension is intended only for use by OpenGL emulation layers, and as
| --- | --- |
such the dithering algorithm applied to the subpass **should** be equivalent to
the vendor’s OpenGL implementation, if any. |

When a fragment stage is present in a pipeline, the fragment shader tile
image variables decorated with `Location` form an interface with the
color attachments defined by the render pass instance.
The fragment shader tile image variables are matched by `Location`
decorations to the color attachments specified in the
`pColorAttachments` array of the [VkRenderingInfoKHR](renderpass.html#VkRenderingInfoKHR) structure
describing the render pass instance the fragment shader is executed in.

The fragment shader variables listed by `OpEntryPoint` with the
`TileImageEXT` storage class and a decoration of `Location` form the
*fragment tile image interface*.
These variables **must** be declared with a type of `OpTypeImage`, and a
`Dim` operand of `TileImageDataEXT`.
The `Component` decoration is not supported for these variables.

Reading from a tile image variable with a `Location` decoration of *i*
reads from the color attachment identified by the element of
[VkRenderingInfoKHR](renderpass.html#VkRenderingInfoKHR)::`pColorAttachments` with a `location`
equal to *i*.
If the tile image variable is declared as an array of size N, it consumes N
consecutive tile image locations, starting with the index specified.
There **must** not be more than one tile image variable with the same
`Location` whether explicitly declared or implied by an array
declaration.
The number of available tile image locations is the same as the number of
available fragment output locations as given by the
`maxFragmentOutputAttachments` member of the
`VkPhysicalDeviceLimits` structure.

The basic data type (floating-point, integer, unsigned integer) of the tile
image variable **must** match the basic format of the corresponding color
attachment, or the values read from the tile image variables are poison.

The image variables declared with `TileAttachmentQCOM` storage class form
the *tile attachment interface*.

These [tile attachment variables](renderpass.html#renderpass-tile-shading-attachment-access) correspond to a per-tile view of the color, depth, or input
attachment of the current subpass or render pass instance.

Such variables **must** only be declared and accessed in compute and fragment
shaders invoked within a render pass instance that
[enables tile shading](renderpass.html#renderpass-tile-shading).
Access of such variables in a fragment shader, additionally requires that
the [tileShadingFragmentStage](features.html#features-tileShadingFragmentStage) feature
**must** be enabled.

Tile attachment variables **must** not include a `Component` decoration.
Tile attachment variables **must** not be consumed by `OpImageQuery*`
instructions.
Tile attachment variables **can** be declared as either single-sampled with
`MS` operand of `0`, or as multi-sampled with `MS` operand of `1`.
The image subresources of the tile attachment image **must** not be in
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)
or [VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)
layout in order to access its data in a shader.

Tile attachment variables statically accessed by a fragment or compute
shader **must** be backed by a descriptor that is equivalent to the
[VkImageView](resources.html#VkImageView) in the [VkFramebuffer](renderpass.html#VkFramebuffer)
or the [VkRenderingAttachmentInfo](renderpass.html#VkRenderingAttachmentInfo)
except for `subresourceRange.aspectMask`.
The `aspectMask` **must** be equal to the aspect accessed by the shader.

*Tile attachment variables* are further subdivided into *storage tile
attachment*, *sampled tile attachment*, and *input tile attachment*
variables.

* 
*Sampled tile attachment* variables **must** be declared with a
`Sampled` operand of `1`, **must** be backed by a descriptor of type
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
or [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType), and **can** be used
with `OpImageFetch`, `OpImageSparseFetch`, or used to construct an
`OpTypeSampledImage` that is subsequently consumed by
`OpImageSample*`, `OpImageSparseSample*`,
`OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatch*QCOM`,
`OpImage*Gather`, or `OpImageSparse*Gather`.
*Sampled tile attachment* variables are managed by the
[Descriptor Set Interface](#interfaces-resources-descset) as sampled
images.

* 
*Storage tile attachment* variables **must** be declared with a
`Sampled` operand of `2`, **must** be backed by a descriptor of type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), and **can** be used with
`OpImageRead`, `OpImageSparseRead`, and `OpImageWrite`
instructions.
*Storage tile attachment* variables **can** be consumed by
`OpImageTexelPointer`
for compatibility with atomic operations.
*Sampled tile attachment* variables are managed by the
[Descriptor Set Interface](#interfaces-resources-descset) as storage
images.

* 
*Input tile attachment* variables **must** be declared with a `Sampled`
operand of `2`, **must** be backed by a descriptor of type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType), and **can** be used with
`OpImageRead` instructions.
*Input tile attachment* variables are managed by the
[Descriptor Set Interface](#interfaces-resources-descset) as input
attachment images.

Tile attachment access using `OpImageWrite` instructions **must** be used
only in the compute stage.
Tile attachment access using `OpImageWrite` instructions **must** not be
used on a variable whose underlying descriptor references the same
[VkImageView](resources.html#VkImageView) bound as a depth or stencil attachment.

The basic data type (floating-point, integer, unsigned integer) of the tile
attachment variable **must** match the basic format of the corresponding input,
depth, or color attachment, otherwise the result of loads/stores for tile
attachment variables is poison.
If the render pass attachment contains both depth and stencil aspects, the
basic data type of the tile attachment variable determines if depth or
stencil aspect is accessed by the shader.

When a fragment stage is present in a pipeline, the fragment shader subpass
inputs form an interface with the input attachments of the current subpass.
The fragment shader subpass input variables are matched by
`InputAttachmentIndex` decorations to the input attachments specified in
the `pInputAttachments` array of the [VkSubpassDescription](renderpass.html#VkSubpassDescription)
structure describing the subpass that the fragment shader is executed in.

The fragment shader subpass input variables with the `UniformConstant`
storage class and a decoration of `InputAttachmentIndex` that are
statically used by `OpEntryPoint` form the *fragment input attachment
interface*.
These variables **must** be declared with a type of `OpTypeImage`, a
`Dim` operand of `SubpassData`, an `Arrayed` operand of 0, and a
`Sampled` operand of 2.
The `MS` operand of the `OpTypeImage` **must** be 0 if the `samples`
field of the corresponding [VkAttachmentDescription](renderpass.html#VkAttachmentDescription) is
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) and
[multisampled-render-to-single-sampled](renderpass.html#subpass-multisampledrendertosinglesampled)
is not enabled, and
1 otherwise.

A subpass input variable identified with an `InputAttachmentIndex`
decoration of *i* reads from the input attachment indicated by
`pInputAttachments`[*i*] member of `VkSubpassDescription`.
If the subpass input variable is declared as an array of size N,
or a runtime-sized array,
it consumes consecutive input attachments, starting with the index
specified.
For runtime-sized arrays, the number of input attachment indices consumed is
equal to [VkDescriptorSetLayoutBinding](descriptorsets.html#VkDescriptorSetLayoutBinding)::`descriptorCount`.
There **must** not be more than one input variable with the same
`InputAttachmentIndex` whether explicitly declared or implied by an array
declaration per image aspect.
A multi-aspect image (e.g. a depth/stencil format) **can** use the same input
variable.
The number of available input attachment indices is given by the
`maxPerStageDescriptorInputAttachments` member of the
`VkPhysicalDeviceLimits` structure.

When using dynamic rendering with the [`dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature enabled, a subpass input variable
with a `InputAttachmentIndex` decoration of *i* can be mapped to a color,
depth, or stencil attachment.

To set the input attachment index mappings during dynamic rendering, call:

// Provided by VK_VERSION_1_4
void vkCmdSetRenderingInputAttachmentIndices(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInputAttachmentIndexInfo*  pInputAttachmentIndexInfo);

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to vkCmdSetRenderingInputAttachmentIndices
void vkCmdSetRenderingInputAttachmentIndicesKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInputAttachmentIndexInfo*  pInputAttachmentIndexInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInputAttachmentIndexInfo` is a
[VkRenderingInputAttachmentIndexInfo](#VkRenderingInputAttachmentIndexInfo) structure indicating the new
mappings.

This command sets the input attachment index mappings for subsequent drawing
commands, and **must** match the mappings provided to the bound pipeline,
if one is bound,
which **can** be set by chaining [VkRenderingInputAttachmentIndexInfo](#VkRenderingInputAttachmentIndexInfo) to
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo).

Until this command is called, mappings in the command buffer state are
treated as each color attachment specified in [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)
mapping to subpass inputs with a `InputAttachmentIndex` equal to its
index in [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments`, and depth/stencil
attachments mapping to input attachments without these decorations.
This state is reset whenever [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) is called.

Valid Usage

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-dynamicRenderingLocalRead-09516) VUID-vkCmdSetRenderingInputAttachmentIndices-dynamicRenderingLocalRead-09516

[`dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead)
**must** be enabled

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-09517) VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-09517

`pInputAttachmentIndexInfo->colorAttachmentCount` **must** be equal to
the value of [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`colorAttachmentCount` used to
begin the current render pass instance

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-09518) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-09518

The current render pass instance **must** have been started or resumed by
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) in this `commandBuffer`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-parameter) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-parameter) VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-parameter

 `pInputAttachmentIndexInfo` **must** be a valid pointer to a valid [VkRenderingInputAttachmentIndexInfo](#VkRenderingInputAttachmentIndexInfo) structure

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-recording) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-cmdpool) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-renderpass) VUID-vkCmdSetRenderingInputAttachmentIndices-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-videocoding) VUID-vkCmdSetRenderingInputAttachmentIndices-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRenderingInputAttachmentIndices is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkRenderingInputAttachmentIndexInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkRenderingInputAttachmentIndexInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorAttachmentCount;
    const uint32_t*    pColorAttachmentInputIndices;
    const uint32_t*    pDepthInputAttachmentIndex;
    const uint32_t*    pStencilInputAttachmentIndex;
} VkRenderingInputAttachmentIndexInfo;

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to VkRenderingInputAttachmentIndexInfo
typedef VkRenderingInputAttachmentIndexInfo VkRenderingInputAttachmentIndexInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`colorAttachmentCount` is the number of elements in
`pColorAttachmentInputIndices`.

* 
`pColorAttachmentInputIndices` is a pointer to an array of
`colorAttachmentCount` `uint32_t` values defining indices for
color attachments to be used as input attachments.

* 
`pDepthInputAttachmentIndex` is either `NULL`, or a pointer to a
`uint32_t` value defining the index for the depth attachment to be
used as an input attachment.

* 
`pStencilInputAttachmentIndex` is either `NULL`, or a pointer to a
`uint32_t` value defining the index for the stencil attachment to be
used as an input attachment.

This structure allows applications to remap attachments to different input
attachment indices.

Each element of `pColorAttachmentInputIndices` set to a value of
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) indicates that the corresponding attachment will
not be used as an input attachment in this pipeline.
Any other value in each of those elements will map the corresponding
attachment to a `InputAttachmentIndex` value defined in shader code.

If `pColorAttachmentInputIndices` is `NULL`, it is equivalent to setting
each element to its index within the array.

If `pDepthInputAttachmentIndex` or `pStencilInputAttachmentIndex`
are set to `NULL`, they map to input attachments without a
`InputAttachmentIndex` decoration.
If they point to a value of [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED), it indicates that
the corresponding attachment will not be used as an input attachment in this
pipeline.
If they point to any other value it maps the corresponding attachment to a
`InputAttachmentIndex` value defined in shader code.

This structure **can** be included in the `pNext` chain of a
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo) structure to set this state for a
pipeline.
If this structure is not included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`.

* 
`pColorAttachmentInputIndices` set to `NULL`.

* 
`pDepthInputAttachmentIndex` set to `NULL`.

* 
`pStencilInputAttachmentIndex` set to `NULL`.

This structure **can** be included in the `pNext` chain of a
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo) structure to specify inherited state
from the primary command buffer.
If this structure is not included in the `pNext` chain of
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkCommandBufferInheritanceRenderingInfo](cmdbuffers.html#VkCommandBufferInheritanceRenderingInfo)::`colorAttachmentCount`.

* 
`pColorAttachmentInputIndices` set to `NULL`.

* 
`pDepthInputAttachmentIndex` set to `NULL`.

* 
`pStencilInputAttachmentIndex` set to `NULL`.

Valid Usage

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09519) VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09519

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`pColorAttachmentInputIndices` is not `NULL`, each element **must** be
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09520) VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09520

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`pDepthInputAttachmentIndex` **must** be a valid pointer to a value of
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09521) VUID-VkRenderingInputAttachmentIndexInfo-dynamicRenderingLocalRead-09521

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`pStencilInputAttachmentIndex` **must** be a valid pointer to a value
of [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09522) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09522

Elements of `pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) **must** each be unique

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09523) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09523

Elements of `pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) **must** not take the same value as the content
of `pDepthInputAttachmentIndex`

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09524) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-09524

Elements of `pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) **must** not take the same value as the content
of `pStencilInputAttachmentIndex`

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-colorAttachmentCount-09525) VUID-VkRenderingInputAttachmentIndexInfo-colorAttachmentCount-09525

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-12274) VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-12274

Elements of `pDepthInputAttachmentIndex`,
`pStencilInputAttachmentIndex`, and
`pColorAttachmentInputIndices` that are not
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) **must** be less than
[    `maxPerStageDescriptorInputAttachments`](limits.html#limits-maxPerStageDescriptorInputAttachments)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-sType-sType) VUID-VkRenderingInputAttachmentIndexInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-parameter) VUID-VkRenderingInputAttachmentIndexInfo-pColorAttachmentInputIndices-parameter

 If `colorAttachmentCount` is not `0`, and `pColorAttachmentInputIndices` is not `NULL`, `pColorAttachmentInputIndices` **must** be a valid pointer to an array of `colorAttachmentCount` `uint32_t` values

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-parameter) VUID-VkRenderingInputAttachmentIndexInfo-pDepthInputAttachmentIndex-parameter

 If `pDepthInputAttachmentIndex` is not `NULL`, `pDepthInputAttachmentIndex` **must** be a valid pointer to a valid `uint32_t` value

* 
[](#VUID-VkRenderingInputAttachmentIndexInfo-pStencilInputAttachmentIndex-parameter) VUID-VkRenderingInputAttachmentIndexInfo-pStencilInputAttachmentIndex-parameter

 If `pStencilInputAttachmentIndex` is not `NULL`, `pStencilInputAttachmentIndex` **must** be a valid pointer to a valid `uint32_t` value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

Variables identified with the `InputAttachmentIndex` **must** only be used
by a fragment stage.
The [numeric format](formats.html#formats-numericformat) of the subpass input **must**
match the format of the corresponding input attachment, or the values of
subpass loads from these variables are poison.
If the framebuffer attachment contains both depth and stencil aspects, the
numeric format of the subpass input determines if depth or stencil aspect is
accessed by the shader.

See [Input Attachment](descriptorsets.html#descriptors-inputattachment) for more details.

An input attachment that is statically accessed by a fragment shader **must**
be backed by a descriptor that is equivalent to the [VkImageView](resources.html#VkImageView) in the
[VkFramebuffer](renderpass.html#VkFramebuffer), except for `subresourceRange.aspectMask`.
The `aspectMask` **must** be equal to the aspect accessed by the shader.

Ray tracing pipelines **may** have more stages than other pipelines with
multiple instances of each stage and more dynamic interactions between the
stages, but still have interface structures that obey the same general rules
as interfaces between shader stages in other pipelines.
The three types of inter-stage interface variables for ray tracing pipelines
are:

* 
Ray payloads containing data preserved for the entire lifetime of the
ray.

* 
Hit attributes containing data about a specific hit for the duration of
its processing.

* 
Callable data for passing data into and out of a callable shader.

Ray payloads and callable data are used in explicit shader call
instructions, so they have an incoming variant to distinguish the parameter
passed to the invocation from any other payloads or data being used by
subsequent shader call instructions.

An interface structure between stages **must** match between the stages using
it.
Specifically:

* 
If an intersection shader is present, the hit attribute structure read
in an any-hit or closest hit shader **must** be the same structure as the
hit attribute structure written in the corresponding intersection shader
in the same hit group.

* 
If an intersection shader is not present, the hit attribute structure
read in an any-hit or closest hit shader **must** be a vector of 2 32-bit
floating-point values that accepts the barycentric coordinates for
triangle hits.

* 
The incoming callable data for a callable shader **must** be the same
structure as the callable data referenced by the execute callable
instruction in the calling shader.

* 
The ray payload for a shader invoked by a ray tracing command **must** be
the same structure for all shader stages using the payload for that ray,
and **must** be declared in the shader even if it is not referenced.

Any shader with an incoming ray payload, incoming callable data, or hit
attribute **must** only declare one variable of that type.

| Shader Stage | Ray Payload | Incoming Ray Payload | Hit Attribute | Callable Data | Incoming Callable Data |
| --- | --- | --- | --- | --- | --- |
| Ray Generation | r/w |  |  | r/w |  |
| Intersection |  |  | r/w |  |  |
| Any-Hit |  | r/w | r |  |  |
| Closest Hit | r/w | r/w | r | r/w |  |
| Miss | r/w | r/w |  | r/w |  |
| Callable |  |  |  | r/w | r/w |

When a shader stage accesses buffer,
tensor,
or image resources through a descriptor, as described in the
[Resource Descriptors](descriptorsets.html#descriptors) section, the shader resource variables
**must** be matched with the [pipeline layout](descriptorsets.html#descriptors-pipelinelayout)
that is provided at
shader or
pipeline creation time.
If a pipeline is created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR),
or a shader is created with [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT),
then no layout information needs to be provided.

The set of shader variables that form the *shader resource interface* for a
stage are the variables statically used by that stage’s `OpEntryPoint`
with a storage class of `Uniform`, `UniformConstant`,
`StorageBuffer`,
or `PushConstant`.
For the fragment shader, this includes the [fragment input attachment interface](#interfaces-inputattachment).

The shader resource interface consists of multiple sub-interfaces:
the descriptor heap interface,
the push constant interface, and the descriptor set interface.

The shader variables defined with a storage class of `PushConstant` that
are statically used by the shader entry points for the pipeline define the
*push constant interface*.
They **must** be:

* 
typed as `OpTypeStruct`,

* 
identified with a `Block` decoration, and

* 
laid out explicitly using the `Offset`, `ArrayStride`, and
`MatrixStride` decorations as specified in
[Offset and Stride Assignment](#interfaces-resources-layout).

There **must** be no more than one push constant block statically used per
shader entry point.

When using
descriptor buffers or
descriptor sets, each statically used member of a push constant block **must**
be placed at an `Offset` such that the entire member is entirely
contained within the [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) for each `OpEntryPoint`
that uses it, and the `stageFlags` for that range **must** specify the
appropriate [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) for that stage.
The `Offset` decoration for any member of a push constant block **must** not
cause the space required for that member to extend outside the range
[0, `maxPushConstantsSize`).

When using descriptor heaps, each statically used member of a push constant
block **must** be placed at an `Offset` such that the entire member is
entirely contained within the range specified by [vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT) in
the command buffer.
The `Offset` decoration for any member of a push constant block **must** not
cause the space required for that member to extend outside the range
[0, `maxPushDataSize`).

Push constant variables or blocks **can** be decorated with
[`BankNV`](shaders.html#shaders-pushconstant-decorations-banknv) and
[`MemberOffsetNV`](shaders.html#shaders-pushconstant-decorations-memberoffsetnv)
decorations to control their placement within push constant banks.
The `BankNV` decoration specifies which hardware bank the push constant
data should be placed in or accessed from, while `MemberOffsetNV`
provides additional offset control within the specified bank.
When these decorations are used, the push constant data placement is
determined by both the API-specified ranges and the shader-specified bank
and offset decorations, allowing for more flexible push constant management
on implementations where multiple banks are available.

Any member of a push constant block that is declared as an array **must** only
be accessed with *dynamically uniform* indices.

The *descriptor set interface* is comprised of the shader variables with the
storage class of
`StorageBuffer`,
`TileAttachmentQCOM`,
`Uniform` or `UniformConstant` (including the variables in the
[fragment input attachment interface](#interfaces-inputattachment)) that are
statically used by the shader entry points for the pipeline.

When using descriptor heaps, this interface is not used directly to access
heaps, but **may** be accessed by specifying [Shader Bindings](descriptorheaps.html#descriptorheaps-bindings) to map to the descriptor heaps.

These variables **must** have `DescriptorSet` and `Binding` decorations
specified, which are assigned and matched with the
`VkDescriptorSetLayout` objects in the pipeline layout as described in
[DescriptorSet and Binding Assignment](#interfaces-resources-setandbinding).

The `Image` `Format` of an `OpTypeImage` declaration **must** not be
**Unknown**, for variables which are used for `OpImageRead`,
`OpImageSparseRead`, or `OpImageWrite` operations, except under the
following conditions:

* 
For `OpImageWrite`, if the image format is listed in the
[storage without format](formats.html#formats-without-shader-storage-format) list
and if the [    `shaderStorageImageWriteWithoutFormat`](features.html#features-shaderStorageImageWriteWithoutFormat) feature is enabled and the
shader module declares the `StorageImageWriteWithoutFormat`
capability.

* 
For `OpImageWrite`, if the image format supports
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR) and the
shader module declares the `StorageImageWriteWithoutFormat`
capability.

* 
For `OpImageRead` or `OpImageSparseRead`, if the image format is
listed in the [storage without    format](formats.html#formats-without-shader-storage-format) list and if the [    `shaderStorageImageReadWithoutFormat`](features.html#features-shaderStorageImageReadWithoutFormat) feature is enabled and the
shader module declares the `StorageImageReadWithoutFormat`
capability.

* 
For `OpImageRead` or `OpImageSparseRead`, if the image format
supports [VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR) and
the shader module declares the `StorageImageReadWithoutFormat`
capability.

* 
For `OpImageRead`, if `Dim` is `SubpassData` (indicating a read
from an input attachment).

The `Image` `Format` of an `OpTypeImage` declaration **must** not be
**Unknown**, for variables which are used for `OpAtomic*` operations.

Variables identified with the `Uniform` storage class are used to access
transparent buffer backed resources.
Such variables **must** be:

* 
typed as `OpTypeStruct`, or an array of this type,

* 
identified with a `Block` or `BufferBlock` decoration, and

* 
laid out explicitly using the `Offset`, `ArrayStride`, and
`MatrixStride` decorations as specified in
[Offset and Stride Assignment](#interfaces-resources-layout).

Variables identified with the `StorageBuffer` storage class are used to
access transparent buffer backed resources.
Such variables **must** be:

* 
typed as `OpTypeStruct`, or an array of this type,

* 
identified with a `Block` decoration, and

* 
laid out explicitly using the `Offset`, `ArrayStride`, and
`MatrixStride` decorations as specified in
[Offset and Stride Assignment](#interfaces-resources-layout).

The `Offset` decoration for any member of a `Block`-decorated variable
in the `Uniform` storage class **must** not cause the space required for
that variable to extend outside the range [0,
`maxUniformBufferRange`).
The `Offset` decoration for any member of a `Block`-decorated variable
in the `StorageBuffer` storage class **must** not cause the space required
for that variable to extend outside the range [0,
`maxStorageBufferRange`).

Variables identified with the `Uniform` storage class **can** also be used
to access transparent descriptor set backed resources when the variable is
assigned to a descriptor set layout binding with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType).
In this case the variable **must** be typed as `OpTypeStruct` and **cannot** be
aggregated into arrays of that type.
Further, the `Offset` decoration for any member of such a variable **must**
not cause the space required for that variable to extend outside the range
[0,`maxInlineUniformBlockSize`).

*Storage tile attachment* and *sampled tile attachment* variables declared
as described in the [tile attachment interface](renderpass.html#renderpass-tile-shading-attachment-access) are also managed by this interface.
The requirements in this section for storage image variables also applies to
*storage tile attachment* variables.
The requirements in this section for sampled image variables also applies to
*sampled tile attachment* variables.
The requirements in this section for input attachment variables also applies
to *input tile attachment* variables.

Variables identified with a storage class of `UniformConstant` and a
decoration of `InputAttachmentIndex` **must** be declared as described in
[Fragment Input Attachment Interface](#interfaces-inputattachment).

SPIR-V variables decorated with a descriptor set and binding that identify a
[combined image sampler descriptor](descriptorsets.html#descriptors-combinedimagesampler) **can**
have a type of `OpTypeImage`, `OpTypeSampler` (`Sampled`=1), or
`OpTypeSampledImage`.

|  | When using descriptor heaps, there is no combined image sampler descriptor
| --- | --- |
type, but shader variables of `OpTypeSampledImage` can be mapped to a
separate image and sampler for compatibility. |

When accessing a resource through such a variable, the resource **must** be
selected via compile time constant expressions unless features are enabled
to allow dynamically uniform or non-uniform expressions, as described below:

* 
Storage images (except storage texel buffers and input attachments):

Dynamically uniform: `shaderStorageImageArrayDynamicIndexing` and
`StorageImageArrayDynamicIndexing`

* 
Non-uniform: `shaderStorageImageArrayNonUniformIndexing` and
`StorageImageArrayNonUniformIndexing`

Storage texel buffers:

* 
Dynamically uniform: `shaderStorageTexelBufferArrayDynamicIndexing`
and `StorageTexelBufferArrayDynamicIndexing`

* 
Non-uniform: `shaderStorageTexelBufferArrayNonUniformIndexing` and
`StorageTexelBufferArrayNonUniformIndexing`

Input attachments:

* 
Dynamically uniform: `shaderInputAttachmentArrayDynamicIndexing`
and `InputAttachmentArrayDynamicIndexing`

* 
Non-uniform: `shaderInputAttachmentArrayNonUniformIndexing` and
`InputAttachmentArrayNonUniformIndexing`

Sampled images (except uniform texel buffers), samplers and combined
image samplers:

* 
Dynamically uniform: `shaderSampledImageArrayDynamicIndexing` and
`SampledImageArrayDynamicIndexing`

* 
Non-uniform: `shaderSampledImageArrayNonUniformIndexing` and
`SampledImageArrayNonUniformIndexing`

Uniform texel buffers:

* 
Dynamically uniform: `shaderUniformTexelBufferArrayDynamicIndexing`
and `UniformTexelBufferArrayDynamicIndexing`

* 
Non-uniform: `shaderUniformTexelBufferArrayNonUniformIndexing` and
`UniformTexelBufferArrayNonUniformIndexing`

Uniform buffers:

* 
Dynamically uniform: `shaderUniformBufferArrayDynamicIndexing` and
`UniformBufferArrayDynamicIndexing`

* 
Non-uniform: `shaderUniformBufferArrayNonUniformIndexing` and
`UniformBufferArrayNonUniformIndexing`

Storage buffers:

* 
Dynamically uniform: `shaderStorageBufferArrayDynamicIndexing` and
`StorageBufferArrayDynamicIndexing`

* 
Non-uniform: `shaderStorageBufferArrayNonUniformIndexing` and
`StorageBufferArrayNonUniformIndexing`

Acceleration structures:

* 
Dynamically uniform: Always supported.

* 
Non-uniform: Always supported.

[weight image](descriptorsets.html#descriptors-weightimage):

* 
Dynamically uniform: Always supported.

* 
Non-uniform: Never supported.

[Block matching image](descriptorsets.html#descriptors-blockmatch):

* 
Dynamically uniform: Always supported.

* 
Non-uniform: Never supported.

Storage tensors:

* 
Dynamically uniform: `shaderStorageTensorArrayDynamicIndexing` and
`StorageTensorArrayDynamicIndexingARM`

* 
Non-uniform: `shaderStorageTensorArrayNonUniformIndexing` and
`StorageTensorArrayNonUniformIndexingARM`

|  | Implementations must take care when implementing this if subgroups are not
| --- | --- |
necessarily a subset of the invocation group for their hardware (e.g. if
multiple draw calls are packed together).
If such an implementation needs uniformity across the subgroup for any
resource access, the implementation is responsible for ensuring that indices
that are only dynamically uniform across the invocation group still function
as expected if they advertise the respective feature. |

A combined image sampler in an array that
enables sampler Y′CBCR conversion
or
samples a [subsampled image](samplers.html#samplers-subsamplesampler)
**must** only be indexed by constant integral expressions.

| Resource type | Descriptor Type |
| --- | --- |
| sampler | [VK_DESCRIPTOR_TYPE_SAMPLER](descriptorsets.html#VkDescriptorType) or
                           [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) |
| sampled image | [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType) or
                           [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) |
| storage image | [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType) |
| combined image sampler | [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType)
                           or both [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType) and
                           [VK_DESCRIPTOR_TYPE_SAMPLER](descriptorsets.html#VkDescriptorType) when using heaps |
| uniform texel buffer | [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) |
| storage texel buffer | [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) |
| uniform buffer | [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
                           [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) |
| storage buffer | [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
                           [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) |
| input attachment | [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) |
| inline uniform block | [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType) |
| acceleration structure | [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptorsets.html#VkDescriptorType)
or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptorsets.html#VkDescriptorType) |
| weight image | [VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType) |
| block matching image | [VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType) |
| storage tensor | [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) |

| Resource type | Storage Class | Type1 | Decoration(s)2 |
| --- | --- | --- | --- |
| sampler | `UniformConstant` | `OpTypeSampler` |  |
| sampled image | `UniformConstant`
or `TileAttachmentQCOM` | `OpTypeImage` (`Sampled`=1) |  |
| storage image | `UniformConstant`
or `TileAttachmentQCOM` | `OpTypeImage` (`Sampled`=2) |  |
| combined image sampler | `UniformConstant`
or `TileAttachmentQCOM` | `OpTypeSampledImage`

          `OpTypeImage` (`Sampled`=1)

          `OpTypeSampler` |  |
| uniform texel buffer | `UniformConstant` | `OpTypeImage` (`Dim`=`Buffer`, `Sampled`=1) |  |
| storage texel buffer | `UniformConstant` | `OpTypeImage` (`Dim`=`Buffer`, `Sampled`=2) |  |
| uniform buffer | `Uniform` | `OpTypeStruct` | `Block`, `Offset`, (`ArrayStride`), (`MatrixStride`) |
| storage buffer | `Uniform` | `OpTypeStruct` | `BufferBlock`, `Offset`, (`ArrayStride`), (`MatrixStride`) |
| `StorageBuffer` | `Block`, `Offset`, (`ArrayStride`), (`MatrixStride`) |
| input attachment | `UniformConstant`
or `TileAttachmentQCOM` | `OpTypeImage` (`Dim`=`SubpassData`, `Sampled`=2) | `InputAttachmentIndex` |
| inline uniform block | `Uniform` | `OpTypeStruct` | `Block`, `Offset`, (`ArrayStride`), (`MatrixStride`) |
| acceleration structure | `UniformConstant` | `OpTypeAccelerationStructureKHR` |  |
| sample weight image | `UniformConstant`
or `TileAttachmentQCOM` | `OpTypeImage` (`Depth`=0, `Dim`=`2D`,

                            `Arrayed`=1, `MS`=0, `Sampled`=1) | `WeightTextureQCOM` |
| block matching image | `UniformConstant`
or `TileAttachmentQCOM` | `OpTypeImage` (`Depth`=0, `Dim`=`2D`,

                            `Arrayed`=0, `MS`=0, `Sampled`=1) | `BlockMatchTextureQCOM` |
| storage tensor | `UniformConstant` | `OpTypeTensorARM` |  |

1

Where `OpTypeImage` is referenced, the `Dim` values `Buffer`
and `Subpassdata` are only accepted where they are specifically
referenced.
They do not correspond to resource types where a generic
`OpTypeImage` is specified.

2

In addition to `DescriptorSet` and `Binding`.

The *descriptor heap interface* is a vastly simplified interface for
accessing resources through pointers to heaps of different types, without
many of the restrictions that apply to the [descriptor set interface](#interfaces-resources-descset).

Two built-in pointers are available to shaders:

* 
[SamplerHeapEXT](descriptorheaps.html#SamplerHeapEXT) for samplers

* 
[ResourceHeapEXT](descriptorheaps.html#ResourceHeapEXT) for resources

These built-ins **must** be declared as pointers in the `UniformConstant`
`Storage` `Class`.
These built-ins **must** not be used to access data outside of the heap bound
to them.

These built-ins **can** be accessed non-uniformly, with no further decoration
required, and with no dependency on other features or properties.
The `UniformId` decoration **can** be applied to the result of accesses to
indicate that the data will be accessed uniformly to a given scope, as a
hint to improve performance on some implementations.

Resources retrieved from each heap **must** have been created with descriptors
that match the variable being declared, as follows:

| Descriptor Type | Heap | SPIR-V Type |
| --- | --- | --- |
| [VK_DESCRIPTOR_TYPE_SAMPLER](descriptorsets.html#VkDescriptorType) | `SamplerHeapEXT` | `OpTypeSampler` |
| [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeImage` |
| [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeBufferEXT` with the `Uniform` `Storage` `Class` |
| [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeBufferEXT` with the `StorageBuffer` `Storage` `Class` |
| [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeAccelerationStructureKHR` |
| [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeAccelerationStructureNV` |
| [VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeAccelerationStructureKHR` |
| [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) | `ResourceHeapEXT` | `OpTypeTensorARM` |

While the built-in heap pointers **can** be declared and dereferenced as
pointing to any type, applications **must** not access data types valid for one
heap from any other heap.

When one of the types above is read from a heap in the shader, it will read
a number of bytes equal to value advertised for the [VkDescriptorType](descriptorsets.html#VkDescriptorType)
as returned by [vkGetPhysicalDeviceDescriptorSizeEXT](descriptorheaps.html#vkGetPhysicalDeviceDescriptorSizeEXT).

For image types, there are further restrictions on the operands used for the
type, according to the descriptor type:

| Descriptor Type | `Dim` | `Arrayed` | `MS` | `Sampled` |
| --- | --- | --- | --- | --- |
| VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE | * | * | 0 | 1 |
| VK_DESCRIPTOR_TYPE_STORAGE_IMAGE | * | * | 0 or 1 | 2 |
| VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT | `SubpassData` | 0 | 0 or 1 | 2 |
| VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER | `Buffer` | 0 | 0 | 2 |
| VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER | `Buffer` | 0 | 0 | 2 |
| VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM | `2D` | 1 | 0 | 1 |
| VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM | `2D` | 0 | 0 | 1 |

For storage images and input attachments, `MS` is 0 if the image has one
sample per pixel, or 1 otherwise.
For sampled and storage images, the `Dim` and `Arrayed` qualifiers
depend on the [VkImageViewType](resources.html#VkImageViewType) specified when writing the descriptor:

| Image View Type | `Dim` | `Arrayed` |
| --- | --- | --- |
| VK_IMAGE_VIEW_TYPE_1D | `1D` | 0 |
| VK_IMAGE_VIEW_TYPE_2D | `2D` | 0 |
| VK_IMAGE_VIEW_TYPE_3D | `3D` | 0 |
| VK_IMAGE_VIEW_TYPE_CUBE | `Cube` | 0 |
| VK_IMAGE_VIEW_TYPE_1D_ARRAY | `1D` | 1 |
| VK_IMAGE_VIEW_TYPE_2D_ARRAY | `2D` | 1 |
| VK_IMAGE_VIEW_TYPE_CUBE_ARRAY | `Cube` | 1 |

The [type](../appendices/spirvenv.html#spirvenv-format-type-matching) and [format](../appendices/spirvenv.html#spirvenv-image-formats) of the image resource **must** also match between the API and SPIR-V.

Descriptors accessed via the `ResourceHeapEXT` built-in **must** be
[explicitly laid out](#interfaces-resources-layout).

There is no further limit to the number of resources that **can** be accessed
by a shader through a heap pointer beyond the size of the bound range for
each heap.

A variable decorated with a `DescriptorSet` decoration of s and a
`Binding` decoration of b indicates that this variable is
associated with the [VkDescriptorSetLayoutBinding](descriptorsets.html#VkDescriptorSetLayoutBinding) that has a
`binding` equal to b in `pSetLayouts`[*s*] that was specified
in [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo).
If using descriptor heaps, such a variable will instead be associated with a
[shader binding](descriptorheaps.html#descriptorheaps-bindings).

If not using descriptor heaps,
`DescriptorSet` decoration values **must** be between zero and
`maxBoundDescriptorSets` minus one, inclusive.
If a pipeline is created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR),
or a shader is created with [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT),
`DescriptorSet` decorations **can** be any 32-bit unsigned integer value.
`Binding` decoration values **can** be any 32-bit unsigned integer value.
Each descriptor set has its own binding name space.

If the `Binding` decoration is used with an array, the entire array is
assigned that binding value.
The decorated array **must** have an `Element` `Type` corresponding to a
descriptor type, and the size of the array **must** be no larger than the
number of descriptors in the binding.
If the array is runtime-sized, then array elements greater than or equal to
the size of that binding in the bound descriptor set **must** not be used.
If the array is runtime-sized, the [`runtimeDescriptorArray`](features.html#features-runtimeDescriptorArray) feature **must** be enabled and the
`RuntimeDescriptorArray` capability **must** be declared.
The index of each element of the array is referred to as the *arrayElement*.
For the purposes of interface matching and descriptor set
[operations](descriptorsets.html#descriptors-sets-updates), if a resource variable is not an
array, it is treated as if it has an arrayElement of zero.

|  | Even though an array is assigned to a single `Binding`, when using
| --- | --- |
[descriptor heap mappings](descriptorheaps.html#descriptorheaps-bindings), each element will be
assigned a consecutive offset according to the stride for that type.
Applications should take care to set subsequent bindings with this in mind
to avoid unintentional overlap. |

There is a limit on the number of resources of each type that **can** be
accessed by a pipeline stage as shown in
[Shader Resource Limits](#interfaces-resources-limits).
The “Resources Per Stage” column gives the limit on the number each type
of resource that **can** be statically used for an entry point in any given
stage in a pipeline.
The “Resource Types” column lists which resource types are counted against
the limit.
Some resource types count against multiple limits.
The [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType) descriptor type counts as one
individual resource and one for every unique resource limit per descriptor
set type that is present in the associated binding’s
[VkMutableDescriptorTypeListEXT](descriptorsets.html#VkMutableDescriptorTypeListEXT).
If multiple descriptor types in [VkMutableDescriptorTypeListEXT](descriptorsets.html#VkMutableDescriptorTypeListEXT) map to
the same resource limit, only one descriptor is consumed for purposes of
computing resource limits.
These limits only apply to resources accessed with `DescriptorSet` and
`Binding` values.

A pipeline layout **may** include descriptor sets and bindings which are not
referenced by any variables statically used by the entry points for the
shader stages in the binding’s `stageFlags`.
Similarly, [descriptor heap bindings](descriptorheaps.html#descriptorheaps-bindings) **may**
include mappings that are unused by the shader.

However, if a variable assigned to a given `DescriptorSet` and
`Binding` is statically used by the entry point for a shader stage, the
[heap bindings](descriptorheaps.html#descriptorheaps-bindings) **must** specify a mapping for it
when using heaps, or the
pipeline layout **must** contain a descriptor set layout binding in that
descriptor set layout and for that binding number, and that binding’s
`stageFlags` **must** include the appropriate [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits)
for that stage.
The variable **must** be of a valid resource type determined by its SPIR-V type
and storage class, as defined in
[Shader Resource and Storage Class Correspondence](#interfaces-resources-storage-class-correspondence).
The descriptor set layout binding **must** be of a corresponding descriptor
type, as defined in [Shader Resource and Descriptor Type Correspondence](#interfaces-resources-correspondence).

|  | There are no limits on the number of shader variables that can have
| --- | --- |
overlapping set and binding values in a shader; but which resources are
[statically used](shaders.html#shaders-staticuse) has an impact.
If any shader variable identifying a resource is
[statically used](shaders.html#shaders-staticuse) in a shader, then the underlying
descriptor bound at the declared set and binding **must**
[support the declared type in the shader](#interfaces-resources-correspondence) when the shader executes.

If multiple shader variables are declared with the same set and binding
values, and with the same underlying descriptor type, they can all be
statically used within the same shader.
However, accesses are not automatically synchronized, and `Aliased`
decorations should be used to avoid data hazards (see
[section
2.18.2 Aliasing in the SPIR-V specification](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#_a_id_aliasingsection_a_aliasing)).

If multiple shader variables with the same set and binding values are
declared in a single shader, but with different declared types, where any of
those are not supported by the relevant bound descriptor, that shader can
only be executed if the variables with the unsupported type are not
statically used.

A noteworthy example of using multiple statically-used shader variables
sharing the same descriptor set and binding values is a descriptor of type
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) that has multiple
corresponding shader variables in the `UniformConstant` storage class,
where some could be `OpTypeImage` (`Sampled`=1), some could be
`OpTypeSampler`, and some could be `OpTypeSampledImage`. |

| Resources per Stage | Resource Types |
| --- | --- |
| `maxPerStageDescriptorSamplers`
or `maxPerStageDescriptorUpdateAfterBindSamplers` | sampler |
| combined image sampler |
| `maxPerStageDescriptorSampledImages`
or `maxPerStageDescriptorUpdateAfterBindSampledImages` | sampled image |
| combined image sampler |
| uniform texel buffer |
| sample weight image |
| block matching image |
| `maxPerStageDescriptorStorageImages`
or `maxPerStageDescriptorUpdateAfterBindStorageImages` | storage image |
| storage texel buffer |
| `maxPerStageDescriptorUniformBuffers`
or `maxPerStageDescriptorUpdateAfterBindUniformBuffers` | uniform buffer |
| uniform buffer dynamic |
| `maxPerStageDescriptorStorageBuffers`
or `maxPerStageDescriptorUpdateAfterBindStorageBuffers` | storage buffer |
| storage buffer dynamic |
| `maxPerStageDescriptorInputAttachments`
or `maxPerStageDescriptorUpdateAfterBindInputAttachments` | input attachment1 |
| `maxPerStageDescriptorInlineUniformBlocks`
or `maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks` | inline uniform block |
| `VkPhysicalDeviceRayTracingPropertiesNV`::`maxDescriptorSetAccelerationStructures`
or
`maxPerStageDescriptorAccelerationStructures` or
`maxPerStageDescriptorUpdateAfterBindAccelerationStructures` | acceleration structure |

|  | Resources accessed directly through the
| --- | --- |
[descriptor heap interface](#interfaces-resources-descriptorheap) do not
count towards these limits. |

1

Input attachments **can** only be used in the fragment shader stage

When a SPIR-V object is declared using an
[explicit
layout](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#ExplicitLayout), it **must** be laid out according to the following additional
requirements.

|  | The numeric order of `Offset` decorations does not need to follow member
| --- | --- |
declaration order. |

**Alignment Requirements**

There are different alignment requirements depending on the specific
resources and on the features enabled.

Matrix types are defined in terms of arrays as follows:

* 
A column-major matrix with C columns and R rows is
equivalent to a C element array of vectors with R
components.

* 
A row-major matrix with C columns and R rows is equivalent
to an R element array of vectors with C components.

The *scalar alignment* of the type of an `OpTypeStruct` member is defined
recursively as follows:

* 
A scalar of size N has a scalar alignment of N.

* 
A vector type has a scalar alignment equal to that of its component
type.

* 
An array type has a scalar alignment equal to that of its element type.

* 
A structure has a scalar alignment equal to the largest scalar alignment
of any of its members.

* 
A matrix type inherits *scalar alignment* from the equivalent array
declaration.

* 
`OpTypeImage` has a scalar alignment equal to the value of
[`imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
`OpTypeBufferEXT` has a scalar alignment equal to the value of
[`bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
`OpTypeSampler` has a scalar alignment equal to the value of
[`samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
`OpTypeTensorARM` has a scalar alignment equal to the value of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

The aligned size of a `OpTypeImage`, `OpTypeBufferEXT`, or
`OpTypeSampler` can be queried from within SPIR-V using
`OpConstantSizeOfEXT`, which can be used with the `OffsetIdEXT` or
`ArrayStrideIdEXT` decorations to lay out types in a descriptor heap.
`OpConstantSizeOfEXT` returns the following for values for each type:

| Type | Size |
| --- | --- |
| `OpTypeSampler` | `samplerDescriptorSize` aligned to `samplerDescriptorAlignment` |
| `OpTypeImage` | `imageDescriptorSize` aligned to `imageDescriptorAlignment` |
| `OpTypeBufferEXT` | `bufferDescriptorSize` aligned to `bufferDescriptorAlignment` |
| `OpTypeAccelerationStructureKHR` | `bufferDescriptorSize` aligned to `bufferDescriptorAlignment` |

The *base alignment* of the type of an `OpTypeStruct` member is defined
recursively as follows:

* 
A scalar has a base alignment equal to its scalar alignment.

* 
A two-component vector has a base alignment equal to twice its scalar
alignment.

* 
A three- or four-component vector has a base alignment equal to four
times its scalar alignment.

* 
An array has a base alignment equal to the base alignment of its element
type.

* 
A structure has a base alignment equal to the largest base alignment of
any of its members.
An empty structure has a base alignment equal to the size of the
smallest scalar type permitted by the capabilities declared in the
SPIR-V module.
(e.g., for a 1 byte aligned empty structure in the `StorageBuffer`
storage class, `StorageBuffer8BitAccess` or
`UniformAndStorageBuffer8BitAccess` **must** be declared in the SPIR-V
module.)

* 
A matrix type inherits *base alignment* from the equivalent array
declaration.

The *extended alignment* of the type of an `OpTypeStruct` member is
similarly defined as follows:

* 
A scalar or vector type has an extended alignment equal to its base
alignment.

* 
An array or structure type has an extended alignment equal to the
largest extended alignment of any of its members, rounded up to a
multiple of 16.

* 
A matrix type inherits extended alignment from the equivalent array
declaration.

A member is defined to *improperly straddle* if either of the following are
true:

* 
It is a vector with total size less than or equal to 16 bytes, and has
`Offset` decorations placing its first byte at F and its last
byte at L, where floor(F / 16) != floor(L / 16).

* 
It is a vector with total size greater than 16 bytes and has its
`Offset` decorations placing its first byte at a non-integer multiple
of 16.

**Standard Buffer Layout**

Every member of an `OpTypeStruct` that is required to be explicitly laid
out **must** be aligned according to the first matching rule as follows.
If the structure is contained in pointer types of multiple storage classes,
it **must** satisfy the requirements for every storage class used to reference
it.

If the [`scalarBlockLayout`](features.html#features-scalarBlockLayout) feature
is enabled and the storage class is `Uniform`, `StorageBuffer`,
`PhysicalStorageBuffer`,
`ShaderRecordBufferKHR`,
or `PushConstant`,
or the storage class is `UniformConstant` and the type is decorated
with either `SamplerHeapEXT` or `ResourceHeapEXT`,
then every member **must** be aligned according to its scalar alignment.

If the [    `workgroupMemoryExplicitLayoutScalarBlockLayout`](features.html#features-workgroupMemoryExplicitLayoutScalarBlockLayout) feature is
enabled and the storage class is `Workgroup` then every member **must**
be aligned according to its scalar alignment.

All vectors **must** be aligned according to their scalar alignment.

If the [    `uniformBufferStandardLayout`](features.html#features-uniformBufferStandardLayout) feature is not enabled, then any
member of an `OpTypeStruct` with a storage class of `Uniform` and
a decoration of `Block` **must** be aligned according to its extended
alignment.

Every other member **must** be aligned according to its base alignment.

|  | Even if scalar alignment is supported, it is generally more performant to
| --- | --- |
use the *base alignment*. |

The memory layout **must** obey the following rules:

* 
The `Offset`
or `OffsetIdEXT`
decoration of any member **must** be a multiple of its alignment.

* 
Any `ArrayStride`,
or `ArrayStrideIdEXT`,
or `MatrixStride` decoration **must** be a multiple of the alignment of
the array or matrix as defined above.

If one of the conditions below applies

* 
The storage class is `Uniform`, `StorageBuffer`,
`PhysicalStorageBuffer`,
`ShaderRecordBufferKHR`,
or `PushConstant`, and the [    `scalarBlockLayout`](features.html#features-scalarBlockLayout) feature is not enabled.

* 
The storage class is `Workgroup`, and either the structure member is
not part of a `Block` or the
[    `workgroupMemoryExplicitLayoutScalarBlockLayout`](features.html#features-workgroupMemoryExplicitLayoutScalarBlockLayout) feature is not
enabled.

* 
The storage class is any other storage class.

the memory layout **must** also obey the following rules:

* 
Vectors **must** not improperly straddle, as defined above.

* 
The `Offset` decoration of a member **must** not place it between the
end of a structure, an array, or a matrix and the next multiple of the
alignment of that structure, array, or matrix.

|  | The **std430 layout** in GLSL satisfies these rules for types using the base
| --- | --- |
alignment.
The **std140 layout** satisfies the rules for types using the extended
alignment. |

|  | An alternate explanation of the shader memory requirements, discussing the
| --- | --- |
underlying extensions and core versions which affect them, is found in the
[Vulkan Guide](../../../guide/latest/shader_memory_layout.html). |

Built-in variables are accessed in shaders by declaring a variable decorated
with a `BuiltIn` SPIR-V decoration.
The meaning of each `BuiltIn` decoration is as follows.
In the remainder of this section, the name of a built-in is used
interchangeably with a term equivalent to a variable decorated with that
particular built-in.
Built-ins that represent integer values **can** be declared as either signed or
unsigned 32-bit integers.

[As mentioned above](#interfaces-iointerfaces-matching), some inputs and
outputs have an additional level of arrayness relative to other shader
inputs and outputs.
This level of arrayness is not included in the type descriptions below, but
**must** be included when declaring the built-in.

Any two variables declared in the `Input` storage class listed as
operands on the same `OpEntryPoint` **must** not have the same `BuiltIn`
decoration.
Any two variables declared in the `Output` storage class listed as
operands on the same `OpEntryPoint` **must** not have the same `BuiltIn`
decoration.

Built-in values for descriptor heaps are listed in the descriptor heap
chapter:

* 
[SamplerHeapEXT](descriptorheaps.html#SamplerHeapEXT)

* 
[ResourceHeapEXT](descriptorheaps.html#ResourceHeapEXT)

Types used to access these built-ins **must** be laid out explicitly using the
`Offset`, `OffsetIdEXT`, `ArrayStride`, `ArrayStrideIdEXT`, and
`MatrixStride` decorations as specified in [Offset and Stride Assignment](#interfaces-resources-layout).

`BaryCoordKHR`

The `BaryCoordKHR` decoration **can** be used to decorate a fragment shader
input variable.
This variable will contain a three-component floating-point vector with
barycentric weights that indicate the location of the fragment relative to
the screen-space locations of vertices of its primitive, obtained using
perspective interpolation.

Valid Usage

* 
[](#VUID-BaryCoordKHR-BaryCoordKHR-04154) VUID-BaryCoordKHR-BaryCoordKHR-04154

The `BaryCoordKHR` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordKHR-BaryCoordKHR-04155) VUID-BaryCoordKHR-BaryCoordKHR-04155

The variable decorated with `BaryCoordKHR` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordKHR-BaryCoordKHR-04156) VUID-BaryCoordKHR-BaryCoordKHR-04156

The variable decorated with `BaryCoordKHR` **must** be declared as a
three-component vector of 32-bit floating-point values

`BaryCoordNoPerspAMD`

The `BaryCoordNoPerspAMD` decoration **can** be used to decorate a fragment
shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using linear interpolation at the
fragment’s center.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04157) VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04157

The `BaryCoordNoPerspAMD` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04158) VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04158

The variable decorated with `BaryCoordNoPerspAMD` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04159) VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04159

The variable decorated with `BaryCoordNoPerspAMD` **must** be declared
as a two-component vector of 32-bit floating-point values

`BaryCoordNoPerspKHR`

The `BaryCoordNoPerspKHR` decoration **can** be used to decorate a fragment
shader input variable.
This variable will contain a three-component floating-point vector with
barycentric weights that indicate the location of the fragment relative to
the screen-space locations of vertices of its primitive, obtained using
linear interpolation.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04160) VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04160

The `BaryCoordNoPerspKHR` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04161) VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04161

The variable decorated with `BaryCoordNoPerspKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04162) VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04162

The variable decorated with `BaryCoordNoPerspKHR` **must** be declared
as a three-component vector of 32-bit floating-point values

`BaryCoordNoPerspCentroidAMD`

The `BaryCoordNoPerspCentroidAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using linear interpolation at the
centroid.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04163) VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04163

The `BaryCoordNoPerspCentroidAMD` decoration **must** be used only
within the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04164) VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04164

The variable decorated with `BaryCoordNoPerspCentroidAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04165) VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04165

The variable decorated with `BaryCoordNoPerspCentroidAMD` **must** be
declared as a three-component vector of 32-bit floating-point values

`BaryCoordNoPerspSampleAMD`

The `BaryCoordNoPerspSampleAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using linear interpolation at each
covered sample.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04166) VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04166

The `BaryCoordNoPerspSampleAMD` decoration **must** be used only within
the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04167) VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04167

The variable decorated with `BaryCoordNoPerspSampleAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04168) VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04168

The variable decorated with `BaryCoordNoPerspSampleAMD` **must** be
declared as a two-component vector of 32-bit floating-point values

`BaryCoordPullModelAMD`

The `BaryCoordPullModelAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain (1/W, 1/I, 1/J) evaluated at the fragment center
and **can** be used to calculate gradients and then interpolate I, J, and W at
any desired sample location.

Valid Usage

* 
[](#VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04169) VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04169

The `BaryCoordPullModelAMD` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04170) VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04170

The variable decorated with `BaryCoordPullModelAMD` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04171) VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04171

The variable decorated with `BaryCoordPullModelAMD` **must** be declared
as a three-component vector of 32-bit floating-point values

`BaryCoordSmoothAMD`

The `BaryCoordSmoothAMD` decoration **can** be used to decorate a fragment
shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using perspective interpolation at
the fragment’s center.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04172) VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04172

The `BaryCoordSmoothAMD` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04173) VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04173

The variable decorated with `BaryCoordSmoothAMD` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04174) VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04174

The variable decorated with `BaryCoordSmoothAMD` **must** be declared as
a two-component vector of 32-bit floating-point values

`BaryCoordSmoothCentroidAMD`

The `BaryCoordSmoothCentroidAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using perspective interpolation at
the centroid.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04175) VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04175

The `BaryCoordSmoothCentroidAMD` decoration **must** be used only within
the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04176) VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04176

The variable decorated with `BaryCoordSmoothCentroidAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04177) VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04177

The variable decorated with `BaryCoordSmoothCentroidAMD` **must** be
declared as a two-component vector of 32-bit floating-point values

`BaryCoordSmoothSampleAMD`

The `BaryCoordSmoothSampleAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using perspective interpolation at
each covered sample.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04178) VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04178

The `BaryCoordSmoothSampleAMD` decoration **must** be used only within
the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04179) VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04179

The variable decorated with `BaryCoordSmoothSampleAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04180) VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04180

The variable decorated with `BaryCoordSmoothSampleAMD` **must** be
declared as a two-component vector of 32-bit floating-point values

`BaseInstance`

Decorating a variable with the `BaseInstance` built-in will make that
variable contain the integer value corresponding to the first instance that
was passed to the command that invoked the current vertex shader invocation.
`BaseInstance` is the `firstInstance` parameter to a *direct drawing
command* or the `firstInstance` member of a structure consumed by an
*indirect drawing command*.

Valid Usage

* 
[](#VUID-BaseInstance-BaseInstance-04181) VUID-BaseInstance-BaseInstance-04181

The `BaseInstance` decoration **must** be used only within the
`Vertex` `Execution` `Model`

* 
[](#VUID-BaseInstance-BaseInstance-04182) VUID-BaseInstance-BaseInstance-04182

The variable decorated with `BaseInstance` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-BaseInstance-BaseInstance-04183) VUID-BaseInstance-BaseInstance-04183

The variable decorated with `BaseInstance` **must** be declared as a
scalar 32-bit integer value

`BaseVertex`

Decorating a variable with the `BaseVertex` built-in will make that
variable contain the integer value corresponding to the first vertex or
vertex offset that was passed to the command that invoked the current vertex
shader invocation.
For *non-indexed drawing commands*, this variable is the `firstVertex`
parameter to a *direct drawing command* or the `firstVertex` member of
the structure consumed by an *indirect drawing command*.
For *indexed drawing commands*, this variable is the `vertexOffset`
parameter to a *direct drawing command* or the `vertexOffset` member of
the structure consumed by an *indirect drawing command*.

Valid Usage

* 
[](#VUID-BaseVertex-BaseVertex-04184) VUID-BaseVertex-BaseVertex-04184

The `BaseVertex` decoration **must** be used only within the `Vertex`
`Execution` `Model`

* 
[](#VUID-BaseVertex-BaseVertex-04185) VUID-BaseVertex-BaseVertex-04185

The variable decorated with `BaseVertex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-BaseVertex-BaseVertex-04186) VUID-BaseVertex-BaseVertex-04186

The variable decorated with `BaseVertex` **must** be declared as a
scalar 32-bit integer value

`ClipDistance`

Decorating a variable with the `ClipDistance` built-in decoration will
make that variable contain the mechanism for controlling user clipping.
`ClipDistance` is an array such that the ith element of the array
specifies the clip distance for plane i.
A clip distance of 0 means the vertex is on the plane, a positive distance
means the vertex is inside the clip half-space, and a negative distance
means the vertex is outside the clip half-space.

|  | The array variable decorated with `ClipDistance` is explicitly sized by
| --- | --- |
the shader. |

|  | In the last [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization), these values will be linearly interpolated across the
| --- | --- |
primitive and the portion of the primitive with interpolated distances less
than 0 will be considered outside the clip volume.
If `ClipDistance` is then used by a fragment shader, `ClipDistance`
contains these linearly interpolated values. |

Valid Usage

* 
[](#VUID-ClipDistance-ClipDistance-04187) VUID-ClipDistance-ClipDistance-04187

The `ClipDistance` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `Fragment`,
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model`

* 
[](#VUID-ClipDistance-ClipDistance-04188) VUID-ClipDistance-ClipDistance-04188

The variable decorated with `ClipDistance` within the `MeshEXT`,
`MeshNV`, or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-ClipDistance-ClipDistance-04189) VUID-ClipDistance-ClipDistance-04189

The variable decorated with `ClipDistance` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-ClipDistance-ClipDistance-04190) VUID-ClipDistance-ClipDistance-04190

The variable decorated with `ClipDistance` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared in a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-ClipDistance-ClipDistance-04191) VUID-ClipDistance-ClipDistance-04191

The variable decorated with `ClipDistance` **must** be declared as an
array of 32-bit floating-point values

`ClipDistancePerViewNV`

Decorating a variable with the `ClipDistancePerViewNV` built-in
decoration will make that variable contain the per-view clip distances.
The per-view clip distances have the same semantics as `ClipDistance`.

Valid Usage

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04192) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04192

The `ClipDistancePerViewNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04193) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04193

The variable decorated with `ClipDistancePerViewNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04194) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04194

The variable decorated with `ClipDistancePerViewNV` **must** also be
decorated with the `PerViewNV` decoration

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04195) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04195

The variable decorated with `ClipDistancePerViewNV` **must** be declared
as a two-dimensional array of 32-bit floating-point values

`ClusterIDHUAWEI`

The `ClusterIDHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this variable will contain an integer value
that specifies the id of cluster being rendered by this drawing command.
When Cluster Culling Shader enable, `ClusterIDHUAWEI` will replace
gl_DrawID pass to vertex shader for cluster-related information fetching.

Valid Usage

* 
[](#VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07797) VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07797

The `ClusterIDHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07798) VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07798

The variable decorated with `ClusterIDHUAWEI` **must** be declared as a
scalar 32-bit integer value

`ClusterShadingRateHUAWEI`

The `ClusterShadingRateHUAWEI` decoration can be used to decorate a
cluster culling shader output variable.
This variable will contain an integer value specifying the shading rate of a
rendering cluster.

Valid Usage

* 
[](#VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09448) VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09448

The `ClusterShadingRateHUAWEI` decoration **must** be used only within
the `ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09449) VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09449

The variable decorated with `ClusterShadingRateHUAWEI` **must** be
declared as a scalar 32-bit integer value

`CullDistance`

Decorating a variable with the `CullDistance` built-in decoration will
make that variable contain the mechanism for controlling user culling.
If any member of this array is assigned a negative value for all vertices
belonging to a primitive, then the primitive is discarded before
rasterization.

|  | In fragment shaders, the values of the `CullDistance` array are linearly
| --- | --- |
interpolated across each primitive. |

|  | If `CullDistance` decorates an input variable, that variable will contain
| --- | --- |
the corresponding value from the `CullDistance` decorated output variable
from the previous shader stage. |

Valid Usage

* 
[](#VUID-CullDistance-CullDistance-04196) VUID-CullDistance-CullDistance-04196

The `CullDistance` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `Fragment`,
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model`

* 
[](#VUID-CullDistance-CullDistance-04197) VUID-CullDistance-CullDistance-04197

The variable decorated with `CullDistance` within the `MeshEXT`,
`MeshNV` or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-CullDistance-CullDistance-04198) VUID-CullDistance-CullDistance-04198

The variable decorated with `CullDistance` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-CullDistance-CullDistance-04199) VUID-CullDistance-CullDistance-04199

The variable decorated with `CullDistance` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-CullDistance-CullDistance-04200) VUID-CullDistance-CullDistance-04200

The variable decorated with `CullDistance` **must** be declared as an
array of 32-bit floating-point values

`CullDistancePerViewNV`

Decorating a variable with the `CullDistancePerViewNV` built-in
decoration will make that variable contain the per-view cull distances.
The per-view cull distances have the same semantics as `CullDistance`.

Valid Usage

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04201) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04201

The `CullDistancePerViewNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04202) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04202

The variable decorated with `CullDistancePerViewNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04203) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04203

The variable decorated with `CullDistancePerViewNV` **must** also be
decorated with the `PerViewNV` decoration

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04204) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04204

The variable decorated with `CullDistancePerViewNV` **must** be declared
as a two-dimensional array of 32-bit floating-point values

`CullPrimitiveEXT`

Decorating a variable with the `CullPrimitiveEXT` built-in decoration
will make that variable contain the culling state of output primitives.
If the per-primitive boolean value is `true`, the primitive will be
culled, if it is `false` it will not be culled.

Valid Usage

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07034) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07034

The `CullPrimitiveEXT` decoration **must** be used only within the
`MeshEXT` `Execution` `Model`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07035) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07035

The variable decorated with `CullPrimitiveEXT` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07036) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07036

`CullPrimitiveEXT` **must** decorate a scalar boolean member of a
structure decorated as `Block`, or decorate a variable of type
`OpTypeArray` of boolean values

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-10589) VUID-CullPrimitiveEXT-CullPrimitiveEXT-10589

If `CullPrimitiveEXT` is declared as an array of boolean values, the
size of the array **must** match the value specified by
`OutputPrimitivesEXT`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-10590) VUID-CullPrimitiveEXT-CullPrimitiveEXT-10590

If `CullPrimitiveEXT` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-10591) VUID-CullPrimitiveEXT-CullPrimitiveEXT-10591

There must be only one declaration of the `CullPrimitiveEXT`
associated with a entry point’s interface

* 
[](#VUID-CullPrimitiveEXT-CullPrimitiveEXT-07038) VUID-CullPrimitiveEXT-CullPrimitiveEXT-07038

The variable decorated with `CullPrimitiveEXT` within the
`MeshEXT` `Execution` `Model` **must** also be decorated with the
`PerPrimitiveEXT` decoration

`CullMaskKHR`

A variable decorated with the `CullMaskKHR` decoration will specify the
cull mask of the ray being processed.
The value is given by the `Cull Mask` parameter passed into one of the
`OpTrace*` instructions.

Valid Usage

* 
[](#VUID-CullMaskKHR-CullMaskKHR-06735) VUID-CullMaskKHR-CullMaskKHR-06735

The `CullMaskKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-CullMaskKHR-CullMaskKHR-06736) VUID-CullMaskKHR-CullMaskKHR-06736

The variable decorated with `CullMaskKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-CullMaskKHR-CullMaskKHR-06737) VUID-CullMaskKHR-CullMaskKHR-06737

The variable decorated with `CullMaskKHR` **must** be declared as a
scalar 32-bit integer value

`CurrentRayTimeNV`

A variable decorated with the `CurrentRayTimeNV` decoration contains the
time value passed in to `OpTraceRayMotionNV` which called this shader.

Valid Usage

* 
[](#VUID-CurrentRayTimeNV-CurrentRayTimeNV-04942) VUID-CurrentRayTimeNV-CurrentRayTimeNV-04942

The `CurrentRayTimeNV` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-CurrentRayTimeNV-CurrentRayTimeNV-04943) VUID-CurrentRayTimeNV-CurrentRayTimeNV-04943

The variable decorated with `CurrentRayTimeNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-CurrentRayTimeNV-CurrentRayTimeNV-04944) VUID-CurrentRayTimeNV-CurrentRayTimeNV-04944

The variable decorated with `CurrentRayTimeNV` **must** be declared as a
scalar 32-bit floating-point value

`DeviceIndex`

The `DeviceIndex` decoration **can** be applied to a shader input which will
be filled with the device index of the physical device that is executing the
current shader invocation.
This value will be in the range   ,
where physicalDeviceCount is the `physicalDeviceCount` member of
[VkDeviceGroupDeviceCreateInfo](devsandqueues.html#VkDeviceGroupDeviceCreateInfo).

Valid Usage

* 
[](#VUID-DeviceIndex-DeviceIndex-04205) VUID-DeviceIndex-DeviceIndex-04205

The variable decorated with `DeviceIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-DeviceIndex-DeviceIndex-04206) VUID-DeviceIndex-DeviceIndex-04206

The variable decorated with `DeviceIndex` **must** be declared as a
scalar 32-bit integer value

`DrawIndex`

Decorating a variable with the `DrawIndex` built-in will make that
variable contain the integer value corresponding to the zero-based index of
the draw that invoked the current
task, mesh, or
vertex shader invocation.
For *indirect drawing commands*, `DrawIndex` begins at zero and
increments by one for each draw executed.
The number of draws is given by the `drawCount` parameter.
For *direct drawing commands*,
if [vkCmdDrawMultiEXT](drawing.html#vkCmdDrawMultiEXT) or [vkCmdDrawMultiIndexedEXT](drawing.html#vkCmdDrawMultiIndexedEXT) is used, this
variable contains the integer value corresponding to the zero-based index of
the draw.
Otherwise
`DrawIndex` is always zero.
`DrawIndex` is dynamically uniform.

When task or mesh shaders are used, only the first active stage will have
proper access to the variable.
The value read by other stages is poison.

Valid Usage

* 
[](#VUID-DrawIndex-DrawIndex-04207) VUID-DrawIndex-DrawIndex-04207

The `DrawIndex` decoration **must** be used only within the `Vertex`,
`MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV` `Execution` `Model`

* 
[](#VUID-DrawIndex-DrawIndex-04208) VUID-DrawIndex-DrawIndex-04208

The variable decorated with `DrawIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-DrawIndex-DrawIndex-04209) VUID-DrawIndex-DrawIndex-04209

The variable decorated with `DrawIndex` **must** be declared as a scalar
32-bit integer value

`FirstIndexHUAWEI`

The `FirstIndexHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this indexed mode specific variable will
contain an integer value that specifies the base index within the index
buffer corresponding to a cluster.

Valid Usage

* 
[](#VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07799) VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07799

The `FirstIndexHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07800) VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07800

The variable decorated with `FirstIndexHUAWEI` **must** be declared as a
scalar 32-bit integer value

`FragCoord`

Decorating a variable with the `FragCoord` built-in decoration will make
that variable contain the coordinates (x,y,z,1/w) of the fragment
being processed.

The (x,y) values are the framebuffer coordinates (xf,yf) of
the fragment.

When [Sample Shading](primsrast.html#primsrast-sampleshading) is enabled, the x and
y components of `FragCoord` reflect the location of one of the
samples corresponding to the shader invocation.

Otherwise, the x and y components of `FragCoord` reflect the
location of the center of the fragment.

The z component of `FragCoord` is the interpolated depth value of
the primitive.

The w component is the interpolated   .

The `Centroid` interpolation decoration is ignored, but allowed, on
`FragCoord`.

Valid Usage

* 
[](#VUID-FragCoord-FragCoord-04210) VUID-FragCoord-FragCoord-04210

The `FragCoord` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragCoord-FragCoord-04211) VUID-FragCoord-FragCoord-04211

The variable decorated with `FragCoord` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-FragCoord-FragCoord-04212) VUID-FragCoord-FragCoord-04212

The variable decorated with `FragCoord` **must** be declared as a
four-component vector of 32-bit floating-point values

`FragDepth`

To have a shader supply a fragment-depth value, the shader **must** declare the
`DepthReplacing` execution mode.
Such a shader’s fragment-depth value will come from the variable decorated
with the `FragDepth` built-in decoration.

This value will be used for any subsequent depth testing performed by the
implementation or writes to the depth attachment.
See [fragment shader depth replacement](fragops.html#fragops-shader-depthreplacement)
for details.

Valid Usage

* 
[](#VUID-FragDepth-FragDepth-04213) VUID-FragDepth-FragDepth-04213

The `FragDepth` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragDepth-FragDepth-04214) VUID-FragDepth-FragDepth-04214

The variable decorated with `FragDepth` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-FragDepth-FragDepth-04215) VUID-FragDepth-FragDepth-04215

The variable decorated with `FragDepth` **must** be declared as a scalar
32-bit floating-point value

* 
[](#VUID-FragDepth-FragDepth-04216) VUID-FragDepth-FragDepth-04216

If the shader dynamically writes to the variable decorated with
`FragDepth`, the `DepthReplacing` `Execution` `Mode` **must** be
declared

`FirstInstanceHUAWEI`

The `FirstInstanceHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this variable will contain an integer value
that specifies the instance ID of the first instance to draw.

Valid Usage

* 
[](#VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07801) VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07801

The `FirstInstanceHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07802) VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07802

The variable decorated with `FirstInstanceHUAWEI` **must** be declared
as a scalar 32-bit integer value

`FirstVertexHUAWEI`

The `FirstVertexHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this non-indexed mode specific variable will
contain an integer value that specifies the index of the first vertex in a
cluster to draw.

Valid Usage

* 
[](#VUID-FirstVertexHUAWEI-FirstVertexHUAWEI-07803) VUID-FirstVertexHUAWEI-FirstVertexHUAWEI-07803

The `FirstVertexHUAWEI` decoration **must** be used only within the
`FirstVertexHUAWEI` `Execution` `Model`

* 
[](#VUID-FirstVertexHUAWEI-FirstVertexHUAWEI-07804) VUID-FirstVertexHUAWEI-FirstVertexHUAWEI-07804

The variable decorated with `FirstVertexHUAWEI` **must** be declared as
a scalar 32-bit integer value

`FragInvocationCountEXT`

Decorating a variable with the `FragInvocationCountEXT` built-in
decoration will make that variable contain the maximum number of fragment
shader invocations for the fragment, as determined by
`minSampleShading`.

If [Sample Shading](primsrast.html#primsrast-sampleshading) is not enabled,
`FragInvocationCountEXT` will be filled with a value of 1.

Valid Usage

* 
[](#VUID-FragInvocationCountEXT-FragInvocationCountEXT-04217) VUID-FragInvocationCountEXT-FragInvocationCountEXT-04217

The `FragInvocationCountEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragInvocationCountEXT-FragInvocationCountEXT-04218) VUID-FragInvocationCountEXT-FragInvocationCountEXT-04218

The variable decorated with `FragInvocationCountEXT` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-FragInvocationCountEXT-FragInvocationCountEXT-04219) VUID-FragInvocationCountEXT-FragInvocationCountEXT-04219

The variable decorated with `FragInvocationCountEXT` **must** be
declared as a scalar 32-bit integer value

`FragSizeEXT`

Decorating a variable with the `FragSizeEXT` built-in decoration will
make that variable contain the dimensions in pixels of the
[area](../appendices/glossary.html#glossary-fragment-area) that the fragment covers for that
invocation.

|  | When used in a custom resolve operation and the [`customResolve`](features.html#features-customResolve) feature is enabled, the dimensions in pixels returned
| --- | --- |
**may** be (1,1) if the fragment area was reduced. |

If fragment density map is not enabled, `FragSizeEXT` will be filled with
a value of (1,1).

Valid Usage

* 
[](#VUID-FragSizeEXT-FragSizeEXT-04220) VUID-FragSizeEXT-FragSizeEXT-04220

The `FragSizeEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragSizeEXT-FragSizeEXT-04221) VUID-FragSizeEXT-FragSizeEXT-04221

The variable decorated with `FragSizeEXT` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-FragSizeEXT-FragSizeEXT-04222) VUID-FragSizeEXT-FragSizeEXT-04222

The variable decorated with `FragSizeEXT` **must** be declared as a
two-component vector of 32-bit integer values

`FragStencilRefEXT`

Decorating a variable with the `FragStencilRefEXT` built-in decoration
will make that variable contain the new stencil reference value for all
samples covered by the fragment.
This value will be used as the stencil reference value used in stencil
testing.

To write to `FragStencilRefEXT`, a shader **must** declare the
`StencilRefReplacingEXT` execution mode.
If a shader declares the `StencilRefReplacingEXT` execution mode and
there is an execution path through the shader that does not set
`FragStencilRefEXT`, then the fragment’s stencil reference value is
**undefined** for executions of the shader that take that path.

Only the least significant **s** bits of the integer value of the variable
decorated with `FragStencilRefEXT` are considered for stencil testing,
where **s** is the number of bits in the stencil framebuffer attachment, and
higher order bits are discarded.

See [fragment shader stencil reference replacement](fragops.html#fragops-shader-stencilrefreplacement) for more details.

Valid Usage

* 
[](#VUID-FragStencilRefEXT-FragStencilRefEXT-04223) VUID-FragStencilRefEXT-FragStencilRefEXT-04223

The `FragStencilRefEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragStencilRefEXT-FragStencilRefEXT-04224) VUID-FragStencilRefEXT-FragStencilRefEXT-04224

The variable decorated with `FragStencilRefEXT` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-FragStencilRefEXT-FragStencilRefEXT-04225) VUID-FragStencilRefEXT-FragStencilRefEXT-04225

The variable decorated with `FragStencilRefEXT` **must** be declared as
a scalar integer value

`FragmentSizeNV`

Decorating a variable with the `FragmentSizeNV` built-in decoration will
make that variable contain the width and height of the fragment.

Valid Usage

* 
[](#VUID-FragmentSizeNV-FragmentSizeNV-04226) VUID-FragmentSizeNV-FragmentSizeNV-04226

The `FragmentSizeNV` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragmentSizeNV-FragmentSizeNV-04227) VUID-FragmentSizeNV-FragmentSizeNV-04227

The variable decorated with `FragmentSizeNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-FragmentSizeNV-FragmentSizeNV-04228) VUID-FragmentSizeNV-FragmentSizeNV-04228

The variable decorated with `FragmentSizeNV` **must** be declared as a
two-component vector of 32-bit integer values

`FrontFacing`

Decorating a variable with the `FrontFacing` built-in decoration will
make that variable contain whether the fragment is front or back facing.
This variable is non-zero if the current fragment is considered to be part
of a [front-facing](primsrast.html#primsrast-polygons-basic) polygon primitive or of a
non-polygon primitive and is zero if the fragment is considered to be part
of a back-facing polygon primitive.

Valid Usage

* 
[](#VUID-FrontFacing-FrontFacing-04229) VUID-FrontFacing-FrontFacing-04229

The `FrontFacing` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FrontFacing-FrontFacing-04230) VUID-FrontFacing-FrontFacing-04230

The variable decorated with `FrontFacing` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-FrontFacing-FrontFacing-04231) VUID-FrontFacing-FrontFacing-04231

The variable decorated with `FrontFacing` **must** be declared as a
boolean value

`FullyCoveredEXT`

Decorating a variable with the `FullyCoveredEXT` built-in decoration will
make that variable indicate whether the [fragment area](../appendices/glossary.html#glossary-fragment-area) is fully covered by the generating primitive.
This variable is non-zero if conservative rasterization is enabled and the
current fragment area is fully covered by the generating primitive, and is
zero if the fragment is not covered or partially covered, or conservative
rasterization is disabled.

Valid Usage

* 
[](#VUID-FullyCoveredEXT-FullyCoveredEXT-04232) VUID-FullyCoveredEXT-FullyCoveredEXT-04232

The `FullyCoveredEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FullyCoveredEXT-FullyCoveredEXT-04233) VUID-FullyCoveredEXT-FullyCoveredEXT-04233

The variable decorated with `FullyCoveredEXT` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-FullyCoveredEXT-FullyCoveredEXT-04234) VUID-FullyCoveredEXT-FullyCoveredEXT-04234

The variable decorated with `FullyCoveredEXT` **must** be declared as a
boolean value

* 
[](#VUID-FullyCoveredEXT-conservativeRasterizationPostDepthCoverage-04235) VUID-FullyCoveredEXT-conservativeRasterizationPostDepthCoverage-04235

If
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`conservativeRasterizationPostDepthCoverage`
is not supported the `PostDepthCoverage` `Execution` `Mode` **must** not be
declared, when a variable with the `FullyCoveredEXT` decoration is
declared

`GlobalInvocationId`

Decorating a variable with the `GlobalInvocationId` built-in decoration
will make that variable contain the location of the current invocation
within the global workgroup.
Each component is equal to the index of the local workgroup multiplied by
the size of the local workgroup plus `LocalInvocationId`.

Valid Usage

* 
[](#VUID-GlobalInvocationId-GlobalInvocationId-04236) VUID-GlobalInvocationId-GlobalInvocationId-04236

The `GlobalInvocationId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-GlobalInvocationId-GlobalInvocationId-04237) VUID-GlobalInvocationId-GlobalInvocationId-04237

The variable decorated with `GlobalInvocationId` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-GlobalInvocationId-GlobalInvocationId-04238) VUID-GlobalInvocationId-GlobalInvocationId-04238

The variable decorated with `GlobalInvocationId` **must** be declared as
a three-component vector of 32-bit integer values

`HelperInvocation`

Decorating a variable with the `HelperInvocation` built-in decoration
will make that variable contain whether the current invocation is a helper
invocation.
This variable is non-zero if the current fragment being shaded is a helper
invocation and zero otherwise.
A helper invocation is an invocation of the shader that is produced to
satisfy internal requirements such as the generation of derivatives.

|  | It is very likely that a helper invocation will have a value of
| --- | --- |
`SampleMask` fragment shader input value that is zero. |

Valid Usage

* 
[](#VUID-HelperInvocation-HelperInvocation-04239) VUID-HelperInvocation-HelperInvocation-04239

The `HelperInvocation` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-HelperInvocation-HelperInvocation-04240) VUID-HelperInvocation-HelperInvocation-04240

The variable decorated with `HelperInvocation` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HelperInvocation-HelperInvocation-04241) VUID-HelperInvocation-HelperInvocation-04241

The variable decorated with `HelperInvocation` **must** be declared as a
boolean value

`HitKindKHR`

A variable decorated with the `HitKindKHR` decoration will describe the
intersection that triggered the execution of the current shader.
The values are determined by the intersection shader.
For user-defined intersection shaders this is the value that was passed to
the “Hit Kind” operand of `OpReportIntersectionKHR`.
For triangle intersection candidates, this will be one of
`HitKindFrontFacingTriangleKHR` or `HitKindBackFacingTriangleKHR`.

Valid Usage

* 
[](#VUID-HitKindKHR-HitKindKHR-04242) VUID-HitKindKHR-HitKindKHR-04242

The `HitKindKHR` decoration **must** be used only within the
`AnyHitKHR` or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitKindKHR-HitKindKHR-04243) VUID-HitKindKHR-HitKindKHR-04243

The variable decorated with `HitKindKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-HitKindKHR-HitKindKHR-04244) VUID-HitKindKHR-HitKindKHR-04244

The variable decorated with `HitKindKHR` **must** be declared as a
scalar 32-bit integer value

`HitTNV`

A variable decorated with the `HitTNV` decoration is equivalent to a
variable decorated with the `RayTmaxKHR` decoration.

Valid Usage

* 
[](#VUID-HitTNV-HitTNV-04245) VUID-HitTNV-HitTNV-04245

The `HitTNV` decoration **must** be used only within the `AnyHitNV`
or `ClosestHitNV` `Execution` `Model`

* 
[](#VUID-HitTNV-HitTNV-04246) VUID-HitTNV-HitTNV-04246

The variable decorated with `HitTNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-HitTNV-HitTNV-04247) VUID-HitTNV-HitTNV-04247

The variable decorated with `HitTNV` **must** be declared as a scalar
32-bit floating-point value

`HitTriangleVertexPositionsKHR`

A variable decorated with the `HitTriangleVertexPositionsKHR` decoration
will specify the object space vertices of the triangle at the current
intersection in application-provided order.
The positions returned are transformed by the geometry transform, which is
performed at standard [floating-point](fundamentals.html#fundamentals-floating-point)
precision, but without a specifically defined order of floating-point
operations to perform the matrix multiplication.

Valid Usage

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08747) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08747

The `HitTriangleVertexPositionsKHR` decoration **must** be used only
within the `AnyHitKHR` or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08748) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08748

The variable decorated with `HitTriangleVertexPositionsKHR` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08749) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08749

The variable decorated with `HitTriangleVertexPositionsKHR` **must** be
declared as an array of three vectors of three 32-bit float values

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08750) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08750

The variable decorated with `HitTriangleVertexPositionsKHR` **must** be
used only if the value of `HitKindKHR` is
`HitKindFrontFacingTriangleKHR` or `HitKindBackFacingTriangleKHR`

* 
[](#VUID-HitTriangleVertexPositionsKHR-None-08751) VUID-HitTriangleVertexPositionsKHR-None-08751

The acceleration structure corresponding to the current intersection
**must** have been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](resources.html#VkBuildAccelerationStructureFlagBitsNV)

`IncomingRayFlagsKHR`

A variable with the `IncomingRayFlagsKHR` decoration will contain the ray
flags passed in to the trace call that invoked this particular shader.
Setting pipeline flags on the ray tracing pipeline **must** not cause any
corresponding flags to be set in variables with this decoration.

Valid Usage

* 
[](#VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04248) VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04248

The `IncomingRayFlagsKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04249) VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04249

The variable decorated with `IncomingRayFlagsKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04250) VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04250

The variable decorated with `IncomingRayFlagsKHR` **must** be declared
as a scalar 32-bit integer value

`IndexCountHUAWEI`

The `IndexCountHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this indexed mode specific variable will
contain an integer value that specifies the number of indexed vertices in a
cluster to draw.

Valid Usage

* 
[](#VUID-IndexCountHUAWEI-IndexCountHUAWEI-07805) VUID-IndexCountHUAWEI-IndexCountHUAWEI-07805

The `IndexCountHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-IndexCountHUAWEI-IndexCountHUAWEI-07806) VUID-IndexCountHUAWEI-IndexCountHUAWEI-07806

The variable decorated with `IndexCountHUAWEI` **must** be declared as a
scalar 32-bit integer value

`InstanceCountHUAWEI`

The `InstanceCountHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this variable will contain an integer value
that specifies the number of instance to draw in a cluster.

Valid Usage

* 
[](#VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07807) VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07807

The `InstanceCountHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07808) VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07808

The variable decorated with `InstanceCountHUAWEI` **must** be declared
as a scalar 32-bit integer value

`InstanceCustomIndexKHR`

A variable decorated with the `InstanceCustomIndexKHR` decoration will
contain the application-defined value of the instance that intersects the
current ray.
This variable contains the value that was specified in
[VkAccelerationStructureInstanceKHR](accelstructures.html#VkAccelerationStructureInstanceKHR)::`instanceCustomIndex` for the
current acceleration structure instance in the lower 24 bits and the upper 8
bits will be zero.

Valid Usage

* 
[](#VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04251) VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04251

The `InstanceCustomIndexKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04252) VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04252

The variable decorated with `InstanceCustomIndexKHR` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04253) VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04253

The variable decorated with `InstanceCustomIndexKHR` **must** be
declared as a scalar 32-bit integer value

`InstanceId`

Decorating a variable in an intersection, any-hit, or closest hit shader
with the `InstanceId` decoration will make that variable contain the
index of the instance that intersects the current ray.

Valid Usage

* 
[](#VUID-InstanceId-InstanceId-04254) VUID-InstanceId-InstanceId-04254

The `InstanceId` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-InstanceId-InstanceId-04255) VUID-InstanceId-InstanceId-04255

The variable decorated with `InstanceId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-InstanceId-InstanceId-04256) VUID-InstanceId-InstanceId-04256

The variable decorated with `InstanceId` **must** be declared as a
scalar 32-bit integer value

`InvocationId`

Decorating a variable with the `InvocationId` built-in decoration will
make that variable contain the index of the current shader invocation in a
geometry shader, or the index of the output patch vertex in a tessellation
control shader.

In a geometry shader, the index of the current shader invocation ranges from
zero to the number of [instances](geometry.html#geometry-invocations) declared in the
shader minus one.
If the instance count of the geometry shader is one or is not specified,
then `InvocationId` will be zero.

Valid Usage

* 
[](#VUID-InvocationId-InvocationId-04257) VUID-InvocationId-InvocationId-04257

The `InvocationId` decoration **must** be used only within the
`TessellationControl` or `Geometry` `Execution` `Model`

* 
[](#VUID-InvocationId-InvocationId-04258) VUID-InvocationId-InvocationId-04258

The variable decorated with `InvocationId` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-InvocationId-InvocationId-04259) VUID-InvocationId-InvocationId-04259

The variable decorated with `InvocationId` **must** be declared as a
scalar 32-bit integer value

`InvocationsPerPixelNV`

Decorating a variable with the `InvocationsPerPixelNV` built-in
decoration will make that variable contain the maximum number of fragment
shader invocations per pixel, as derived from the effective shading rate for
the fragment.
If a primitive does not fully cover a pixel, the number of fragment shader
invocations for that pixel **may** be less than the value of
`InvocationsPerPixelNV`.
If the shading rate indicates a fragment covering multiple pixels, then
`InvocationsPerPixelNV` will be one.

Valid Usage

* 
[](#VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04260) VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04260

The `InvocationsPerPixelNV` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04261) VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04261

The variable decorated with `InvocationsPerPixelNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04262) VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04262

The variable decorated with `InvocationsPerPixelNV` **must** be declared
as a scalar 32-bit integer value

`InstanceIndex`

Decorating a variable in a vertex shader with the `InstanceIndex`
built-in decoration will make that variable contain the index of the
instance that is being processed by the current vertex shader invocation.
`InstanceIndex` begins at the `firstInstance` parameter to
[vkCmdDraw](drawing.html#vkCmdDraw) or [vkCmdDrawIndexed](drawing.html#vkCmdDrawIndexed) or at the `firstInstance`
member of a structure consumed by [vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect) or
[vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect).

Valid Usage

* 
[](#VUID-InstanceIndex-InstanceIndex-04263) VUID-InstanceIndex-InstanceIndex-04263

The `InstanceIndex` decoration **must** be used only within the
`Vertex` `Execution` `Model`

* 
[](#VUID-InstanceIndex-InstanceIndex-04264) VUID-InstanceIndex-InstanceIndex-04264

The variable decorated with `InstanceIndex` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-InstanceIndex-InstanceIndex-04265) VUID-InstanceIndex-InstanceIndex-04265

The variable decorated with `InstanceIndex` **must** be declared as a
scalar 32-bit integer value

`LaunchIdKHR`

A variable decorated with the `LaunchIdKHR` decoration will specify the
index of the work item being processed.
One work item is generated for each of the `width` × `height`
× `depth` items dispatched by a
[vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR)
or
[vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV)
command.
All shader invocations inherit the same value for variables decorated with
`LaunchIdKHR`.

Valid Usage

* 
[](#VUID-LaunchIdKHR-LaunchIdKHR-04266) VUID-LaunchIdKHR-LaunchIdKHR-04266

The `LaunchIdKHR` decoration **must** be used only within the
`RayGenerationKHR`, `IntersectionKHR`, `AnyHitKHR`,
`ClosestHitKHR`, `MissKHR`, or `CallableKHR` `Execution` `Model`

* 
[](#VUID-LaunchIdKHR-LaunchIdKHR-04267) VUID-LaunchIdKHR-LaunchIdKHR-04267

The variable decorated with `LaunchIdKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-LaunchIdKHR-LaunchIdKHR-04268) VUID-LaunchIdKHR-LaunchIdKHR-04268

The variable decorated with `LaunchIdKHR` **must** be declared as a
three-component vector of 32-bit integer values

`LaunchSizeKHR`

A variable decorated with the `LaunchSizeKHR` decoration will contain the
`width`, `height`, and `depth` dimensions passed to the
[vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR)
or
[vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV)
command that initiated this shader execution.
The `width` is in the first component, the `height` is in the second
component, and the `depth` is in the third component.

Valid Usage

* 
[](#VUID-LaunchSizeKHR-LaunchSizeKHR-04269) VUID-LaunchSizeKHR-LaunchSizeKHR-04269

The `LaunchSizeKHR` decoration **must** be used only within the
`RayGenerationKHR`, `IntersectionKHR`, `AnyHitKHR`,
`ClosestHitKHR`, `MissKHR`, or `CallableKHR` `Execution` `Model`

* 
[](#VUID-LaunchSizeKHR-LaunchSizeKHR-04270) VUID-LaunchSizeKHR-LaunchSizeKHR-04270

The variable decorated with `LaunchSizeKHR` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-LaunchSizeKHR-LaunchSizeKHR-04271) VUID-LaunchSizeKHR-LaunchSizeKHR-04271

The variable decorated with `LaunchSizeKHR` **must** be declared as a
three-component vector of 32-bit integer values

`Layer`

Decorating a variable with the `Layer` built-in decoration will make that
variable contain the select layer of a multi-layer framebuffer attachment.

In a
mesh,
vertex, tessellation evaluation, or
geometry shader, any variable decorated with `Layer` can be written with
the framebuffer layer index to which the primitive produced by that shader
will be directed.

The last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) (in pipeline order) controls the `Layer` that is used.
Outputs in previous shader stages are not used, even if the last stage fails
to write the `Layer`.

If the last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `Layer`, then the first layer is used.
If a [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface includes a variable decorated with
`Layer`, it **must** write the same value to `Layer` for all output
vertices of a given primitive.
If the `Layer` value is less than 0 or greater than or equal to the
number of layers in the framebuffer, then primitives **may** still be
rasterized, fragment shaders **may** be executed, and the framebuffer values
for all layers are **undefined**.
In a mesh shader this also applies when the `Layer` value is greater than
or equal to the `maxMeshOutputLayers` limit.

If a variable with the `Layer` decoration is also decorated with
`ViewportRelativeNV`, then the `ViewportIndex` is added to the layer
that is used for rendering and that is made available in the fragment
shader.

If the shader writes to a variable decorated `ViewportMaskNV`, then the
layer selected has a different value for each viewport a primitive is
rendered to.

In a fragment shader, a variable decorated with `Layer` contains the
layer index of the primitive that the fragment invocation belongs to.

Valid Usage

* 
[](#VUID-Layer-Layer-04272) VUID-Layer-Layer-04272

The `Layer` decoration **must** be used only within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationEvaluation`, `Geometry`, or
`Fragment` `Execution` `Model`

* 
[](#VUID-Layer-Layer-04273) VUID-Layer-Layer-04273

If the [`shaderOutputLayer`](features.html#features-shaderOutputLayer) feature
is not enabled then the `Layer` decoration **must** be used only within
the `Geometry` or `Fragment` `Execution` `Model`

* 
[](#VUID-Layer-Layer-04274) VUID-Layer-Layer-04274

The variable decorated with `Layer` within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** be declared using the `Output` `Storage` `Class`

* 
[](#VUID-Layer-Layer-04275) VUID-Layer-Layer-04275

The variable decorated with `Layer` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-Layer-Layer-04276) VUID-Layer-Layer-04276

The variable decorated with `Layer` **must** be declared as a scalar
32-bit integer value for all supported execution models except
`MeshEXT`

* 
[](#VUID-Layer-Layer-07039) VUID-Layer-Layer-07039

The variable decorated with `Layer` within the `MeshEXT`
`Execution` `Model` **must** also be decorated with the `PerPrimitiveEXT`
decoration

* 
[](#VUID-Layer-Layer-10592) VUID-Layer-Layer-10592

`Layer` within the `MeshEXT` `Execution` `Model` **must** decorate a
scalar 32-bit integer member of a structure decorated as `Block`, or
decorate a variable of type `OpTypeArray` of scalar 32-bit integer
values

* 
[](#VUID-Layer-Layer-10593) VUID-Layer-Layer-10593

If `Layer` is declared as an array of 32-bit integer values, within
the `MeshEXT` `Execution` `Model`, size of the array **must** match the
value specified by `OutputPrimitivesEXT`

* 
[](#VUID-Layer-Layer-10594) VUID-Layer-Layer-10594

If `Layer` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

`LayerPerViewNV`

Decorating a variable with the `LayerPerViewNV` built-in decoration will
make that variable contain the per-view layer information.
The per-view layer has the same semantics as `Layer`, for each view.

Valid Usage

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04277) VUID-LayerPerViewNV-LayerPerViewNV-04277

The `LayerPerViewNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04278) VUID-LayerPerViewNV-LayerPerViewNV-04278

The variable decorated with `LayerPerViewNV` **must** be declared using
the `Output` `Storage` `Class`

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04279) VUID-LayerPerViewNV-LayerPerViewNV-04279

The variable decorated with `LayerPerViewNV` **must** also be decorated
with the `PerViewNV` decoration

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04280) VUID-LayerPerViewNV-LayerPerViewNV-04280

The variable decorated with `LayerPerViewNV` **must** be declared as an
array of scalar 32-bit integer values

`LocalInvocationId`

Decorating a variable with the `LocalInvocationId` built-in decoration
will make that variable contain the location of the current
cluster culling,
task, mesh, or
compute shader invocation within the local workgroup.
Each component ranges from zero through to the size of the workgroup in that
dimension minus one.

|  | If the size of the workgroup in a particular dimension is one, then the
| --- | --- |
`LocalInvocationId` in that dimension will be zero.
If the workgroup is effectively two-dimensional, then
`LocalInvocationId.z` will be zero.
If the workgroup is effectively one-dimensional, then both
`LocalInvocationId.y` and `LocalInvocationId.z` will be zero. |

Valid Usage

* 
[](#VUID-LocalInvocationId-LocalInvocationId-04281) VUID-LocalInvocationId-LocalInvocationId-04281

The `LocalInvocationId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-LocalInvocationId-LocalInvocationId-04282) VUID-LocalInvocationId-LocalInvocationId-04282

The variable decorated with `LocalInvocationId` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-LocalInvocationId-LocalInvocationId-04283) VUID-LocalInvocationId-LocalInvocationId-04283

The variable decorated with `LocalInvocationId` **must** be declared as
a three-component vector of 32-bit integer values

`LocalInvocationIndex`

Decorating a variable with the `LocalInvocationIndex` built-in decoration
will make that variable contain a one-dimensional representation of
`LocalInvocationId`.
This is computed as:

LocalInvocationIndex =
    LocalInvocationId.z * WorkgroupSize.x * WorkgroupSize.y +
    LocalInvocationId.y * WorkgroupSize.x +
    LocalInvocationId.x;

Valid Usage

* 
[](#VUID-LocalInvocationIndex-LocalInvocationIndex-04284) VUID-LocalInvocationIndex-LocalInvocationIndex-04284

The `LocalInvocationIndex` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-LocalInvocationIndex-LocalInvocationIndex-04285) VUID-LocalInvocationIndex-LocalInvocationIndex-04285

The variable decorated with `LocalInvocationIndex` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-LocalInvocationIndex-LocalInvocationIndex-04286) VUID-LocalInvocationIndex-LocalInvocationIndex-04286

The variable decorated with `LocalInvocationIndex` **must** be declared
as a scalar 32-bit integer value

`MeshViewCountNV`

Decorating a variable with the `MeshViewCountNV` built-in decoration will
make that variable contain the number of views processed by the current mesh
or task shader invocations.

Valid Usage

* 
[](#VUID-MeshViewCountNV-MeshViewCountNV-04287) VUID-MeshViewCountNV-MeshViewCountNV-04287

The `MeshViewCountNV` decoration **must** be used only within the
`MeshNV` or `TaskNV` `Execution` `Model`

* 
[](#VUID-MeshViewCountNV-MeshViewCountNV-04288) VUID-MeshViewCountNV-MeshViewCountNV-04288

The variable decorated with `MeshViewCountNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-MeshViewCountNV-MeshViewCountNV-04289) VUID-MeshViewCountNV-MeshViewCountNV-04289

The variable decorated with `MeshViewCountNV` **must** be declared as a
scalar 32-bit integer value

`MeshViewIndicesNV`

Decorating a variable with the `MeshViewIndicesNV` built-in decoration
will make that variable contain the mesh view indices.
The mesh view indices is an array of values where each element holds the
view number of one of the views being processed by the current mesh or task
shader invocations.
The values of array elements with indices greater than or equal to
`MeshViewCountNV` are poison.
If the value of `MeshViewIndicesNV`[i] is j, then any outputs
decorated with `PerViewNV` will take on the value of array element
i when processing primitives for view index j.

Valid Usage

* 
[](#VUID-MeshViewIndicesNV-MeshViewIndicesNV-04290) VUID-MeshViewIndicesNV-MeshViewIndicesNV-04290

The `MeshViewIndicesNV` decoration **must** be used only within the
`MeshNV` or `TaskNV` `Execution` `Model`

* 
[](#VUID-MeshViewIndicesNV-MeshViewIndicesNV-04291) VUID-MeshViewIndicesNV-MeshViewIndicesNV-04291

The variable decorated with `MeshViewIndicesNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-MeshViewIndicesNV-MeshViewIndicesNV-04292) VUID-MeshViewIndicesNV-MeshViewIndicesNV-04292

The variable decorated with `MeshViewIndicesNV` **must** be declared as
an array of scalar 32-bit integer values

`NumSubgroups`

Decorating a variable with the `NumSubgroups` built-in decoration will
make that variable contain the number of subgroups in the local workgroup.

Valid Usage

* 
[](#VUID-NumSubgroups-NumSubgroups-04293) VUID-NumSubgroups-NumSubgroups-04293

The `NumSubgroups` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-NumSubgroups-NumSubgroups-04294) VUID-NumSubgroups-NumSubgroups-04294

The variable decorated with `NumSubgroups` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-NumSubgroups-NumSubgroups-04295) VUID-NumSubgroups-NumSubgroups-04295

The variable decorated with `NumSubgroups` **must** be declared as a
scalar 32-bit integer value

`NumWorkgroups`

Decorating a variable with the `NumWorkgroups` built-in decoration will
make that variable contain the number of local workgroups that are part of
the dispatch that the invocation belongs to.
Each component is equal to the values of the workgroup count parameters
passed into the dispatching commands.

Valid Usage

* 
[](#VUID-NumWorkgroups-NumWorkgroups-04296) VUID-NumWorkgroups-NumWorkgroups-04296

The `NumWorkgroups` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, or `TaskEXT` `Execution` `Model`

* 
[](#VUID-NumWorkgroups-NumWorkgroups-04297) VUID-NumWorkgroups-NumWorkgroups-04297

The variable decorated with `NumWorkgroups` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-NumWorkgroups-NumWorkgroups-04298) VUID-NumWorkgroups-NumWorkgroups-04298

The variable decorated with `NumWorkgroups` **must** be declared as a
three-component vector of 32-bit integer values

`ObjectRayDirectionKHR`

A variable decorated with the `ObjectRayDirectionKHR` decoration will
specify the direction of the ray being processed, in object space.

Valid Usage

* 
[](#VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04299) VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04299

The `ObjectRayDirectionKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04300) VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04300

The variable decorated with `ObjectRayDirectionKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04301) VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04301

The variable decorated with `ObjectRayDirectionKHR` **must** be declared
as a three-component vector of 32-bit floating-point values

`ObjectRayOriginKHR`

A variable decorated with the `ObjectRayOriginKHR` decoration will
specify the origin of the ray being processed, in object space.

Valid Usage

* 
[](#VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04302) VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04302

The `ObjectRayOriginKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04303) VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04303

The variable decorated with `ObjectRayOriginKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04304) VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04304

The variable decorated with `ObjectRayOriginKHR` **must** be declared as
a three-component vector of 32-bit floating-point values

`ObjectToWorldKHR`

A variable decorated with the `ObjectToWorldKHR` decoration will contain
the current object-to-world transformation matrix, which is determined by
the instance of the current intersection.

Valid Usage

* 
[](#VUID-ObjectToWorldKHR-ObjectToWorldKHR-04305) VUID-ObjectToWorldKHR-ObjectToWorldKHR-04305

The `ObjectToWorldKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-ObjectToWorldKHR-ObjectToWorldKHR-04306) VUID-ObjectToWorldKHR-ObjectToWorldKHR-04306

The variable decorated with `ObjectToWorldKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-ObjectToWorldKHR-ObjectToWorldKHR-04307) VUID-ObjectToWorldKHR-ObjectToWorldKHR-04307

The variable decorated with `ObjectToWorldKHR` **must** be declared as a
matrix with four columns of three-component vectors of 32-bit
floating-point values

`PatchVertices`

Decorating a variable with the `PatchVertices` built-in decoration will
make that variable contain the number of vertices in the input patch being
processed by the shader.
In a Tessellation Control Shader, this is the same as the
name:patchControlPoints member of
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo).
In a Tessellation Evaluation Shader, `PatchVertices` is equal to the
tessellation control output patch size.
When the same shader is used in different pipelines where the patch sizes
are configured differently, the value of the `PatchVertices` variable
will also differ.

Valid Usage

* 
[](#VUID-PatchVertices-PatchVertices-04308) VUID-PatchVertices-PatchVertices-04308

The `PatchVertices` decoration **must** be used only within the
`TessellationControl` or `TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-PatchVertices-PatchVertices-04309) VUID-PatchVertices-PatchVertices-04309

The variable decorated with `PatchVertices` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-PatchVertices-PatchVertices-04310) VUID-PatchVertices-PatchVertices-04310

The variable decorated with `PatchVertices` **must** be declared as a
scalar 32-bit integer value

`PointCoord`

Decorating a variable with the `PointCoord` built-in decoration will make
that variable contain the coordinate of the current fragment within the
point being rasterized, normalized to the size of the point with origin in
the upper left corner of the point, as described in
[Basic Point Rasterization](primsrast.html#primsrast-points-basic).
If the primitive the fragment shader invocation belongs to is not a point,
then the variable decorated with `PointCoord` contains poison.

|  | Depending on how the point is rasterized, `PointCoord` **may** never reach
| --- | --- |
(0,0) or (1,1). |

Valid Usage

* 
[](#VUID-PointCoord-PointCoord-04311) VUID-PointCoord-PointCoord-04311

The `PointCoord` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-PointCoord-PointCoord-04312) VUID-PointCoord-PointCoord-04312

The variable decorated with `PointCoord` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-PointCoord-PointCoord-04313) VUID-PointCoord-PointCoord-04313

The variable decorated with `PointCoord` **must** be declared as a
two-component vector of 32-bit floating-point values

`PointSize`

Decorating a variable with the `PointSize` built-in decoration will make
that variable contain the size of point primitives
or the final rasterization of polygons if [polygon mode](primsrast.html#primsrast-polygonmode) is [VK_POLYGON_MODE_POINT](primsrast.html#VkPolygonMode) when
`VkPhysicalDeviceMaintenance5Properties`::`polygonModePointSize` is
set to [VK_TRUE](fundamentals.html#VK_TRUE)
.
The value written to the variable decorated with `PointSize` by the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) in the pipeline is used as the framebuffer-space size of points
produced by rasterization.
If the [`maintenance5`](features.html#features-maintenance5) feature is enabled and
a value is not written to a variable decorated with `PointSize`, a value
of 1.0 is used as the size of points.

|  | When `PointSize` decorates a variable in the `Input` `Storage` `Class`,
| --- | --- |
it contains the data written to the output variable decorated with
`PointSize` from the previous shader stage. |

Valid Usage

* 
[](#VUID-PointSize-PointSize-04314) VUID-PointSize-PointSize-04314

The `PointSize` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-PointSize-PointSize-04315) VUID-PointSize-PointSize-04315

The variable decorated with `PointSize` within the `MeshEXT`,
`MeshNV`, or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-PointSize-PointSize-04316) VUID-PointSize-PointSize-04316

The variable decorated with `PointSize` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-PointSize-PointSize-04317) VUID-PointSize-PointSize-04317

The variable decorated with `PointSize` **must** be declared as a scalar
32-bit floating-point value

`Position`

Decorating a variable with the `Position` built-in decoration will make
that variable contain the position of the current vertex.
In the last [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization), the value of the variable decorated with `Position` is
used in subsequent primitive assembly, clipping, and rasterization
operations.

|  | When `Position` decorates a variable in the `Input` `Storage` `Class`, it
| --- | --- |
contains the data written to the output variable decorated with
`Position` from the previous shader stage. |

Valid Usage

* 
[](#VUID-Position-Position-04318) VUID-Position-Position-04318

The `Position` decoration **must** be used only within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-Position-Position-04319) VUID-Position-Position-04319

The variable decorated with `Position` within the `MeshEXT`,
`MeshNV`, or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-Position-Position-04320) VUID-Position-Position-04320

The variable decorated with `Position` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-Position-Position-04321) VUID-Position-Position-04321

The variable decorated with `Position` **must** be declared as a
four-component vector of 32-bit floating-point values

`PositionPerViewNV`

Decorating a variable with the `PositionPerViewNV` built-in decoration
will make that variable contain the position of the current vertex, for each
view.

Elements of the array correspond to views in a multiview subpass, and those
elements corresponding to views in the view mask of the subpass the shader
is compiled against will be used as the position value for those views.
For the final
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) in the pipeline, values written to an output variable decorated with
`PositionPerViewNV` are used in subsequent primitive assembly, clipping,
and rasterization operations, as with `Position`.
`PositionPerViewNV` output in an earlier
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) is available as an input in the subsequent
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).

If a shader is compiled against a subpass that has the
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](renderpass.html#VkSubpassDescriptionFlagBits) bit set, then
the position values for each view **must** not differ in any component other
than the X component.
If the values do differ, one will be chosen in an implementation-dependent
manner.

Valid Usage

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04322) VUID-PositionPerViewNV-PositionPerViewNV-04322

The `PositionPerViewNV` decoration **must** be used only within the
`MeshNV`, `Vertex`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04323) VUID-PositionPerViewNV-PositionPerViewNV-04323

The variable decorated with `PositionPerViewNV` within the
`Vertex`, or `MeshNV` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04324) VUID-PositionPerViewNV-PositionPerViewNV-04324

The variable decorated with `PositionPerViewNV` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04325) VUID-PositionPerViewNV-PositionPerViewNV-04325

The variable decorated with `PositionPerViewNV` **must** be declared as
an array of four-component vector of 32-bit floating-point values with
at least as many elements as the maximum view in the subpass’s view mask
plus one

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04326) VUID-PositionPerViewNV-PositionPerViewNV-04326

The array variable decorated with `PositionPerViewNV` **must** only be
indexed by a constant or specialization constant

`PrimitiveCountNV`

Decorating a variable with the `PrimitiveCountNV` decoration will make
that variable contain the primitive count.
The primitive count specifies the number of primitives in the output mesh
produced by the mesh shader that will be processed by subsequent pipeline
stages.

Valid Usage

* 
[](#VUID-PrimitiveCountNV-PrimitiveCountNV-04327) VUID-PrimitiveCountNV-PrimitiveCountNV-04327

The `PrimitiveCountNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-PrimitiveCountNV-PrimitiveCountNV-04328) VUID-PrimitiveCountNV-PrimitiveCountNV-04328

The variable decorated with `PrimitiveCountNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveCountNV-PrimitiveCountNV-04329) VUID-PrimitiveCountNV-PrimitiveCountNV-04329

The variable decorated with `PrimitiveCountNV` **must** be declared as a
scalar 32-bit integer value

`PrimitiveId`

Decorating a variable with the `PrimitiveId` built-in decoration will
make that variable contain the index of the current primitive.

The index of the first primitive generated by a drawing command is zero, and
the index is incremented after every individual point, line, or triangle
primitive is processed.

For triangles drawn as points or line segments (see [Polygon Mode](primsrast.html#primsrast-polygonmode)), the primitive index is incremented only once, even if
multiple points or lines are eventually drawn.

Variables decorated with `PrimitiveId` are reset to zero between each
instance drawn.

Restarting a primitive topology using primitive restart has no effect on the
value of variables decorated with `PrimitiveId`.

In tessellation control and tessellation evaluation shaders, it will contain
the index of the patch within the current set of rendering primitives that
corresponds to the shader invocation.

In a geometry shader, it will contain the number of primitives presented as
input to the shader since the current set of rendering primitives was
started.

In a fragment shader, it will contain the primitive index written by the
mesh shader if a mesh shader is present, or the primitive index written by
the
geometry shader if a geometry shader is present, or with the value that
would have been presented as input to the geometry shader had it been
present.

In an intersection, any-hit, or closest hit shader, it will contain the
index within the geometry of the triangle or bounding box being processed.

|  | When the `PrimitiveId` decoration is applied to an output variable in the
| --- | --- |
mesh shader or
geometry shader, the resulting value is seen through the `PrimitiveId`
decorated input variable in the fragment shader.

The fragment shader using `PrimitiveId` will need to declare either the
`MeshShadingNV`,
`MeshShadingEXT`,
`Geometry` or `Tessellation` capability to satisfy the requirement
SPIR-V has to use `PrimitiveId`. |

Valid Usage

* 
[](#VUID-PrimitiveId-PrimitiveId-04330) VUID-PrimitiveId-PrimitiveId-04330

The `PrimitiveId` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `IntersectionKHR`, `AnyHitKHR`,
`ClosestHitKHR`, `TessellationControl`,
`TessellationEvaluation`, `Geometry`, or `Fragment`
`Execution` `Model`

* 
[](#VUID-PrimitiveId-Fragment-04331) VUID-PrimitiveId-Fragment-04331

If pipeline contains both the `Fragment` and `Geometry`
`Execution` `Model` and a variable decorated with `PrimitiveId` is read
from `Fragment` shader, then the `Geometry` shader **must** write to
the output variables decorated with `PrimitiveId` in all execution
paths

* 
[](#VUID-PrimitiveId-Fragment-04332) VUID-PrimitiveId-Fragment-04332

If pipeline contains both the `Fragment` and `MeshEXT` or
`MeshNV` `Execution` `Model` and a variable decorated with
`PrimitiveId` is read from `Fragment` shader, then the
`MeshEXT` or `MeshNV` shader **must** write to the output variables
decorated with `PrimitiveId` in all execution paths

* 
[](#VUID-PrimitiveId-Fragment-04333) VUID-PrimitiveId-Fragment-04333

If `Fragment` `Execution` `Model` contains a variable decorated with
`PrimitiveId`, then either the `MeshShadingEXT`,
`MeshShadingNV`, `Geometry` or `Tessellation` capability **must**
also be declared

* 
[](#VUID-PrimitiveId-PrimitiveId-04334) VUID-PrimitiveId-PrimitiveId-04334

The variable decorated with `PrimitiveId` within the
`TessellationControl`, `TessellationEvaluation`, `Fragment`,
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-PrimitiveId-PrimitiveId-04335) VUID-PrimitiveId-PrimitiveId-04335

The variable decorated with `PrimitiveId` within the `Geometry`
`Execution` `Model` **must** be declared using the `Input` or `Output`
`Storage` `Class`

* 
[](#VUID-PrimitiveId-PrimitiveId-04336) VUID-PrimitiveId-PrimitiveId-04336

The variable decorated with `PrimitiveId` within the `MeshEXT` or
`MeshNV` `Execution` `Model` **must** be declared using the `Output`
`Storage` `Class`

* 
[](#VUID-PrimitiveId-PrimitiveId-04337) VUID-PrimitiveId-PrimitiveId-04337

The variable decorated with `PrimitiveId` **must** be declared as a
scalar 32-bit integer value for all supported execution models except
`MeshEXT`

* 
[](#VUID-PrimitiveId-PrimitiveId-07040) VUID-PrimitiveId-PrimitiveId-07040

The variable decorated with `PrimitiveId` within the `MeshEXT`
`Execution` `Model` **must** also be decorated with the `PerPrimitiveEXT`
decoration

* 
[](#VUID-PrimitiveId-PrimitiveId-10595) VUID-PrimitiveId-PrimitiveId-10595

`PrimitiveId` within the `MeshEXT` `Execution` `Model` **must** decorate
a scalar 32-bit integer member of a structure decorated as `Block`,
or decorate a variable of type `OpTypeArray` of 32-bit integer values

* 
[](#VUID-PrimitiveId-PrimitiveId-10596) VUID-PrimitiveId-PrimitiveId-10596

If `PrimitiveId` is declared as an array of 32-bit integer values,
within the `MeshEXT` `Execution` `Model`, size of the array **must** match
the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-PrimitiveId-PrimitiveId-10597) VUID-PrimitiveId-PrimitiveId-10597

If `PrimitiveId` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

`PrimitiveIndicesNV`

Decorating a variable with the `PrimitiveIndicesNV` decoration will make
that variable contain the output array of vertex index values.
Depending on the output primitive type declared using the execution mode,
the indices are split into groups of one (`OutputPoints`), two
(`OutputLinesNV`), or three (`OutputTrianglesNV`) indices and each
group generates a primitive.

Valid Usage

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04338) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04338

The `PrimitiveIndicesNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04339) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04339

The variable decorated with `PrimitiveIndicesNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04340) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04340

The variable decorated with `PrimitiveIndicesNV` **must** be declared as
an array of scalar 32-bit integer values

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04341) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04341

All index values of the array decorated with `PrimitiveIndicesNV`
**must** be in the range [0, N-1], where N is the value
specified by the `OutputVertices` `Execution` `Mode`

* 
[](#VUID-PrimitiveIndicesNV-OutputPoints-04342) VUID-PrimitiveIndicesNV-OutputPoints-04342

If the `Execution` `Mode` is `OutputPoints`, then the array decorated
with `PrimitiveIndicesNV` **must** be the size of the value specified by
`OutputPrimitivesNV`

* 
[](#VUID-PrimitiveIndicesNV-OutputLinesNV-04343) VUID-PrimitiveIndicesNV-OutputLinesNV-04343

If the `Execution` `Mode` is `OutputLinesNV`, then the array decorated
with `PrimitiveIndicesNV` **must** be the size of two times the value
specified by `OutputPrimitivesNV`

* 
[](#VUID-PrimitiveIndicesNV-OutputTrianglesNV-04344) VUID-PrimitiveIndicesNV-OutputTrianglesNV-04344

If the `Execution` `Mode` is `OutputTrianglesNV`, then the array
decorated with `PrimitiveIndicesNV` **must** be the size of three times
the value specified by `OutputPrimitivesNV`

`PrimitivePointIndicesEXT`

Decorating a variable with the `PrimitivePointIndicesEXT` decoration will
make that variable contain the output array of vertex index values for point
primitives.

Valid Usage

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07041) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07041

The `PrimitivePointIndicesEXT` decoration **must** be used only within
the `MeshEXT` `Execution` `Model`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07042) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07042

The `PrimitivePointIndicesEXT` decoration **must** be used with the
`OutputPoints` `Execution` `Mode`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07043) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07043

The variable decorated with `PrimitivePointIndicesEXT` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07044) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07044

The variable decorated with `PrimitivePointIndicesEXT` **must** be
declared as an array of scalar 32-bit integer values

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07045) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07045

The index to access the array decorated with
`PrimitivePointIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Primitive Count” operand
of `OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-12335) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-12335

All index values written to the array decorated with
`PrimitivePointIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Vertex Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07046) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07046

The size of the array decorated with `PrimitivePointIndicesEXT` **must**
match the value specified by `OutputPrimitivesEXT`

`PrimitiveLineIndicesEXT`

Decorating a variable with the `PrimitiveLineIndicesEXT` decoration will
make that variable contain the output array of vertex index values for line
primitives.

Valid Usage

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07047) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07047

The `PrimitiveLineIndicesEXT` decoration **must** be used only within
the `MeshEXT` `Execution` `Model`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07048) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07048

The `PrimitiveLineIndicesEXT` decoration **must** be used with the
`OutputLinesEXT` `Execution` `Mode`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07049) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07049

The variable decorated with `PrimitiveLineIndicesEXT` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07050) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07050

The variable decorated with `PrimitiveLineIndicesEXT` **must** be
declared as an array of two component vector 32-bit integer values

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07051) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07051

The index to access the array decorated with
`PrimitiveLineIndicesEXT` **must** be in the range [0, N-1], where
N is the value specified by the “Primitive Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-12336) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-12336

All index values written to the array decorated with
`PrimitiveLineIndicesEXT` **must** be in the range [0, N-1], where
N is the value specified by the “Vertex Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07052) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07052

The size of the array decorated with `PrimitiveLineIndicesEXT` **must**
match the value specified by `OutputPrimitivesEXT`

`PrimitiveTriangleIndicesEXT`

Decorating a variable with the `PrimitiveTriangleIndicesEXT` decoration
will make that variable contain the output array of vertex index values for
triangle primitives.

Valid Usage

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07053) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07053

The `PrimitiveTriangleIndicesEXT` decoration **must** be used only
within the `MeshEXT` `Execution` `Model`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07054) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07054

The `PrimitiveTriangleIndicesEXT` decoration **must** be used with the
`OutputTrianglesEXT` `Execution` `Mode`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07055) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07055

The variable decorated with `PrimitiveTriangleIndicesEXT` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07056) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07056

The variable decorated with `PrimitiveTriangleIndicesEXT` **must** be
declared as an array of three component vector 32-bit integer values

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07057) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07057

The index to access the array decorated with
`PrimitiveTriangleIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Primitive Count” operand
of `OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-12337) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-12337

All index values written to the array decorated with
`PrimitiveTriangleIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Vertex Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07058) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07058

The size of the array decorated with `PrimitiveTriangleIndicesEXT`
**must** match the value specified by `OutputPrimitivesEXT`

`PrimitiveShadingRateKHR`

Decorating a variable with the `PrimitiveShadingRateKHR` built-in
decoration will make that variable contain the
[primitive fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-primitive).

The value written to the variable decorated with
`PrimitiveShadingRateKHR` by the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) in the pipeline is used as the
[primitive fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-primitive).
Outputs in previous shader stages are ignored.

If the last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `PrimitiveShadingRateKHR`, then it is as if the shader specified a
fragment shading rate value of 0, indicating a horizontal and vertical rate
of 1 pixel.

Valid Usage

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04484) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04484

The `PrimitiveShadingRateKHR` decoration **must** be used only within
the `MeshEXT`, `MeshNV`, `Vertex`, or `Geometry`
`Execution` `Model`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04485) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04485

The variable decorated with `PrimitiveShadingRateKHR` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04486) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04486

The variable decorated with `PrimitiveShadingRateKHR` **must** be
declared as a scalar 32-bit integer value for all supported execution
models except `MeshEXT`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04487) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04487

The value written to `PrimitiveShadingRateKHR` **must** include no more
than one of `Vertical2Pixels` and `Vertical4Pixels`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04488) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04488

The value written to `PrimitiveShadingRateKHR` **must** include no more
than one of `Horizontal2Pixels` and `Horizontal4Pixels`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04489) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-04489

The value written to `PrimitiveShadingRateKHR` **must** not have any
bits set other than those defined by **Fragment Shading Rate Flags**
enumerants in the SPIR-V specification

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-07059) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-07059

The variable decorated with `PrimitiveShadingRateKHR` within the
`MeshEXT` `Execution` `Model` **must** also be decorated with the
`PerPrimitiveEXT` decoration

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-10598) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-10598

`PrimitiveShadingRateKHR` within the `MeshEXT` `Execution` `Model`
**must** decorate a scalar 32-bit integer member of a structure decorated
as `Block`, or decorate a variable of type `OpTypeArray` of 32-bit
integer values

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-10599) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-10599

If `PrimitiveShadingRateKHR` is declared as an array of 32-bit
integer values, within the `MeshEXT` `Execution` `Model`, size of the
array **must** match the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-10600) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-10600

If `PrimitiveShadingRateKHR` decorates a member of a structure, the
variable declaration of the containing `Block` type **must** have an
array size that matches the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-12275) VUID-PrimitiveShadingRateKHR-PrimitiveShadingRateKHR-12275

If `PrimitiveShadingRateKHR` is declared in the `MeshEXT`
`Execution` `Model`, the [    primitiveFragmentShadingRateMeshShader](features.html#features-primitiveFragmentShadingRateMeshShader) feature **must** be enabled

`RayGeometryIndexKHR`

A variable decorated with the `RayGeometryIndexKHR` decoration will
contain the [geometry index](accelstructures.html#acceleration-structure-geometry-index) for
the acceleration structure geometry currently being shaded.

Valid Usage

* 
[](#VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04345) VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04345

The `RayGeometryIndexKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04346) VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04346

The variable decorated with `RayGeometryIndexKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04347) VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04347

The variable decorated with `RayGeometryIndexKHR` **must** be declared
as a scalar 32-bit integer value

`RayTmaxKHR`

A variable decorated with the `RayTmaxKHR` decoration will contain the
parametric tmax value of the ray being processed.
The value is independent of the space in which the ray origin and direction
exist.
The value is initialized to the parameter passed into the
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

The tmax value changes throughout the lifetime of the ray that
produced the intersection.
In the closest hit shader, the value reflects the closest distance to the
intersected primitive.
In the any-hit shader, it reflects the distance to the primitive currently
being intersected.
In the intersection shader, it reflects the distance to the closest
primitive intersected so far or the initial value.
The value can change in the intersection shader after calling
`OpReportIntersectionKHR` if the corresponding any-hit shader does not
ignore the intersection.
In a miss shader, the value is identical to the parameter passed into the
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

Valid Usage

* 
[](#VUID-RayTmaxKHR-RayTmaxKHR-04348) VUID-RayTmaxKHR-RayTmaxKHR-04348

The `RayTmaxKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-RayTmaxKHR-RayTmaxKHR-04349) VUID-RayTmaxKHR-RayTmaxKHR-04349

The variable decorated with `RayTmaxKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-RayTmaxKHR-RayTmaxKHR-04350) VUID-RayTmaxKHR-RayTmaxKHR-04350

The variable decorated with `RayTmaxKHR` **must** be declared as a
scalar 32-bit floating-point value

`RayTminKHR`

A variable decorated with the `RayTminKHR` decoration will contain the
parametric tmin value of the ray being processed.
The value is independent of the space in which the ray origin and direction
exist.
The value is the parameter passed into the [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

The tmin value remains constant for the duration of the ray query.

Valid Usage

* 
[](#VUID-RayTminKHR-RayTminKHR-04351) VUID-RayTminKHR-RayTminKHR-04351

The `RayTminKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-RayTminKHR-RayTminKHR-04352) VUID-RayTminKHR-RayTminKHR-04352

The variable decorated with `RayTminKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-RayTminKHR-RayTminKHR-04353) VUID-RayTminKHR-RayTminKHR-04353

The variable decorated with `RayTminKHR` **must** be declared as a
scalar 32-bit floating-point value

`SampleId`

Decorating a variable with the `SampleId` built-in decoration will make
that variable contain the [coverage index](primsrast.html#primsrast-multisampling-coverage-mask) for the current fragment shader invocation.
`SampleId` ranges from zero to the number of samples in the framebuffer
minus one.
If a fragment shader entry point’s interface includes an input variable
decorated with `SampleId`, [Sample Shading](primsrast.html#primsrast-sampleshading) is
considered enabled with a `minSampleShading` value of 1.0.

Valid Usage

* 
[](#VUID-SampleId-SampleId-04354) VUID-SampleId-SampleId-04354

The `SampleId` decoration **must** be used only within the `Fragment`
`Execution` `Model`

* 
[](#VUID-SampleId-SampleId-04355) VUID-SampleId-SampleId-04355

The variable decorated with `SampleId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SampleId-SampleId-04356) VUID-SampleId-SampleId-04356

The variable decorated with `SampleId` **must** be declared as a scalar
32-bit integer value

`SampleMask`

Decorating a variable with the `SampleMask` built-in decoration will make
any variable contain the [sample mask](fragops.html#fragops-shader-samplemask) for the
current fragment shader invocation.

A variable in the `Input` storage class decorated with `SampleMask`
will contain a bitmask of the set of samples covered by the primitive
generating the fragment during rasterization.
It has a sample bit set if and only if the sample is considered covered for
this fragment shader invocation.
`SampleMask`[] is an array of integers.
Bits are mapped to samples in a manner where bit B of mask M
(`SampleMask[M]`) corresponds to sample 32 × M +  B.

A variable in the `Output` storage class decorated with `SampleMask`
is an array of integers forming a bit array in a manner similar to an input
variable decorated with `SampleMask`, but where each bit represents
coverage as computed by the shader.
This computed `SampleMask` is combined with the generated coverage mask
in the [multisample coverage](fragops.html#fragops-covg) operation.

Variables decorated with `SampleMask` **must** be either an unsized array,
or explicitly sized to be no larger than the implementation-dependent
maximum sample-mask (as an array of 32-bit elements), determined by the
maximum number of samples.

If a fragment shader entry point’s interface does not include an output
variable decorated with `SampleMask`, the sample mask has no effect on
the processing of a fragment.

Valid Usage

* 
[](#VUID-SampleMask-SampleMask-04357) VUID-SampleMask-SampleMask-04357

The `SampleMask` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-SampleMask-SampleMask-04358) VUID-SampleMask-SampleMask-04358

The variable decorated with `SampleMask` **must** be declared using the
`Input` or `Output` `Storage` `Class`

* 
[](#VUID-SampleMask-SampleMask-04359) VUID-SampleMask-SampleMask-04359

The variable decorated with `SampleMask` **must** be declared as an
array of 32-bit integer values

`SamplePosition`

Decorating a variable with the `SamplePosition` built-in decoration will
make that variable contain the sub-pixel position of the sample being
shaded.
The top left of the pixel is considered to be at coordinate (0,0) and
the bottom right of the pixel is considered to be at coordinate (1,1).

If the render pass has a fragment density map attachment, the variable will
instead contain the sub-fragment position of the sample being shaded.
The top left of the fragment is considered to be at coordinate (0,0)
and the bottom right of the fragment is considered to be at coordinate
(1,1) for any fragment area.

If a fragment shader entry point’s interface includes an input variable
decorated with `SamplePosition`, [Sample Shading](primsrast.html#primsrast-sampleshading) is considered enabled with a `minSampleShading` value of 1.0.

If the current pipeline uses [custom sample locations](primsrast.html#primsrast-samplelocations) the value of any variable decorated with the `SamplePosition`
built-in decoration is poison.

Valid Usage

* 
[](#VUID-SamplePosition-SamplePosition-04360) VUID-SamplePosition-SamplePosition-04360

The `SamplePosition` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-SamplePosition-SamplePosition-04361) VUID-SamplePosition-SamplePosition-04361

The variable decorated with `SamplePosition` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SamplePosition-SamplePosition-04362) VUID-SamplePosition-SamplePosition-04362

The variable decorated with `SamplePosition` **must** be declared as a
two-component vector of 32-bit floating-point values

`ShadingRateKHR`

Decorating a variable with the `ShadingRateKHR` built-in decoration will
make that variable contain the [fragment shading rate](primsrast.html#primsrast-fragment-shading-rate) for the current fragment invocation.

Valid Usage

* 
[](#VUID-ShadingRateKHR-ShadingRateKHR-04490) VUID-ShadingRateKHR-ShadingRateKHR-04490

The `ShadingRateKHR` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-ShadingRateKHR-ShadingRateKHR-04491) VUID-ShadingRateKHR-ShadingRateKHR-04491

The variable decorated with `ShadingRateKHR` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-ShadingRateKHR-ShadingRateKHR-04492) VUID-ShadingRateKHR-ShadingRateKHR-04492

The variable decorated with `ShadingRateKHR` **must** be declared as a
scalar 32-bit integer value

`SMCountNV`

Decorating a variable with the `SMCountNV` built-in decoration will make
that variable contain the number of SMs on the device.

Valid Usage

* 
[](#VUID-SMCountNV-SMCountNV-04363) VUID-SMCountNV-SMCountNV-04363

The variable decorated with `SMCountNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SMCountNV-SMCountNV-04364) VUID-SMCountNV-SMCountNV-04364

The variable decorated with `SMCountNV` **must** be declared as a scalar
32-bit integer value

`SMIDNV`

Decorating a variable with the `SMIDNV` built-in decoration will make
that variable contain the ID of the SM on which the current shader
invocation is running.
This variable is in the range [0, `SMCountNV`-1].

Valid Usage

* 
[](#VUID-SMIDNV-SMIDNV-04365) VUID-SMIDNV-SMIDNV-04365

The variable decorated with `SMIDNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SMIDNV-SMIDNV-04366) VUID-SMIDNV-SMIDNV-04366

The variable decorated with `SMIDNV` **must** be declared as a scalar
32-bit integer value

`SubgroupId`

Decorating a variable with the `SubgroupId` built-in decoration will make
that variable contain the index of the subgroup within the local workgroup.
This variable is in range [0, `NumSubgroups`-1].

Valid Usage

* 
[](#VUID-SubgroupId-SubgroupId-04367) VUID-SubgroupId-SubgroupId-04367

The `SubgroupId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-SubgroupId-SubgroupId-04368) VUID-SubgroupId-SubgroupId-04368

The variable decorated with `SubgroupId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SubgroupId-SubgroupId-04369) VUID-SubgroupId-SubgroupId-04369

The variable decorated with `SubgroupId` **must** be declared as a
scalar 32-bit integer value

`SubgroupEqMask`

Decorating a variable with the `SubgroupEqMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bit corresponding to the `SubgroupLocalInvocationId` is set in the
variable decorated with `SubgroupEqMask`.
All other bits are set to zero.

`SubgroupEqMaskKHR` is an alias of `SubgroupEqMask`.

Valid Usage

* 
[](#VUID-SubgroupEqMask-SubgroupEqMask-04370) VUID-SubgroupEqMask-SubgroupEqMask-04370

The variable decorated with `SubgroupEqMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupEqMask-SubgroupEqMask-04371) VUID-SubgroupEqMask-SubgroupEqMask-04371

The variable decorated with `SubgroupEqMask` **must** be declared as a
four-component vector of 32-bit integer values

`SubgroupGeMask`

Decorating a variable with the `SubgroupGeMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations greater than or equal to
`SubgroupLocalInvocationId` through `SubgroupSize`-1 are set in the
variable decorated with `SubgroupGeMask`.
All other bits are set to zero.

`SubgroupGeMaskKHR` is an alias of `SubgroupGeMask`.

Valid Usage

* 
[](#VUID-SubgroupGeMask-SubgroupGeMask-04372) VUID-SubgroupGeMask-SubgroupGeMask-04372

The variable decorated with `SubgroupGeMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupGeMask-SubgroupGeMask-04373) VUID-SubgroupGeMask-SubgroupGeMask-04373

The variable decorated with `SubgroupGeMask` **must** be declared as a
four-component vector of 32-bit integer values

`SubgroupGtMask`

Decorating a variable with the `SubgroupGtMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations greater than
`SubgroupLocalInvocationId` through `SubgroupSize`-1 are set in the
variable decorated with `SubgroupGtMask`.
All other bits are set to zero.

`SubgroupGtMaskKHR` is an alias of `SubgroupGtMask`.

Valid Usage

* 
[](#VUID-SubgroupGtMask-SubgroupGtMask-04374) VUID-SubgroupGtMask-SubgroupGtMask-04374

The variable decorated with `SubgroupGtMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupGtMask-SubgroupGtMask-04375) VUID-SubgroupGtMask-SubgroupGtMask-04375

The variable decorated with `SubgroupGtMask` **must** be declared as a
four-component vector of 32-bit integer values

`SubgroupLeMask`

Decorating a variable with the `SubgroupLeMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations less than or equal to
`SubgroupLocalInvocationId` are set in the variable decorated with
`SubgroupLeMask`.
All other bits are set to zero.

`SubgroupLeMaskKHR` is an alias of `SubgroupLeMask`.

Valid Usage

* 
[](#VUID-SubgroupLeMask-SubgroupLeMask-04376) VUID-SubgroupLeMask-SubgroupLeMask-04376

The variable decorated with `SubgroupLeMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLeMask-SubgroupLeMask-04377) VUID-SubgroupLeMask-SubgroupLeMask-04377

The variable decorated with `SubgroupLeMask` **must** be declared as a
four-component vector of 32-bit integer values

`SubgroupLtMask`

Decorating a variable with the `SubgroupLtMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations less than
`SubgroupLocalInvocationId` are set in the variable decorated with
`SubgroupLtMask`.
All other bits are set to zero.

`SubgroupLtMaskKHR` is an alias of `SubgroupLtMask`.

Valid Usage

* 
[](#VUID-SubgroupLtMask-SubgroupLtMask-04378) VUID-SubgroupLtMask-SubgroupLtMask-04378

The variable decorated with `SubgroupLtMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLtMask-SubgroupLtMask-04379) VUID-SubgroupLtMask-SubgroupLtMask-04379

The variable decorated with `SubgroupLtMask` **must** be declared as a
four-component vector of 32-bit integer values

`SubgroupLocalInvocationId`

Decorating a variable with the `SubgroupLocalInvocationId` builtin
decoration will make that variable contain the index of the invocation
within the subgroup.
This variable is in range [0,`SubgroupSize`-1].

If [VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) is
specified,
or if `module` declares SPIR-V version 1.6 or higher, and the local
workgroup size in the X dimension of the `stage` is a multiple of
[`SubgroupSize`](#interfaces-builtin-variables-sgs),
full subgroups are enabled for that pipeline stage.
When full subgroups are enabled, subgroups **must** be launched with all
invocations active, i.e., there is an active invocation with
`SubgroupLocalInvocationId` for each value in range
[0,`SubgroupSize`-1].

|  | There is no direct relationship between `SubgroupLocalInvocationId` and
| --- | --- |
`LocalInvocationId` or `LocalInvocationIndex`.
If the pipeline
or shader object
was created with full subgroups applications can compute their own local
invocation index to serve the same purpose:

index = `SubgroupLocalInvocationId` + `SubgroupId` ×
`SubgroupSize`

If full subgroups are not enabled, some subgroups may be dispatched with
inactive invocations that do not correspond to a local workgroup invocation,
making the value of index unreliable. |

|  | [VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits)
| --- | --- |
and [VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) are
effectively deprecated when compiling SPIR-V 1.6 shaders, as this behavior
is the default for Vulkan with SPIR-V 1.6.
This is more aligned with developer expectations, and avoids applications
unexpectedly breaking in the future. |

Valid Usage

* 
[](#VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04380) VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04380

The variable decorated with `SubgroupLocalInvocationId` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04381) VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04381

The variable decorated with `SubgroupLocalInvocationId` **must** be
declared as a scalar 32-bit integer value

`SubgroupSize`

Decorating a variable with the `SubgroupSize` builtin decoration will
make that variable contain the implementation-dependent
[number of invocations in a subgroup](devsandqueues.html#limits-subgroupSize).
This value **must** be a power-of-two integer.

If the pipeline was created with the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) flag
set,
or the shader object was created with the
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag set,
or the SPIR-V `module` is at least version 1.6,
the `SubgroupSize` decorated variable will contain the subgroup size for
each subgroup that gets dispatched.
This value **must** be between [`minSubgroupSize`](devsandqueues.html#limits-minSubgroupSize) and [`maxSubgroupSize`](devsandqueues.html#limits-maxSubgroupSize) and **must** be uniform with [subgroup scope](shaders.html#shaders-scope-subgroup).
The value **may** vary across a single draw call, and for fragment shaders **may**
vary across a single primitive.
In compute dispatches, `SubgroupSize` **must** be uniform with
[command scope](shaders.html#shaders-scope-command).
In mesh and task shaders, `SubgroupSize` **must** be uniform with
[command scope](shaders.html#shaders-scope-command).
In a single [command scope](shaders.html#shaders-scope-command), the mesh and task
shader **may** have different `SubgroupSize`.

If the pipeline was created with a chained
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo) structure,
or the shader object was created with a chained
[VkShaderRequiredSubgroupSizeCreateInfoEXT](pipelines.html#VkShaderRequiredSubgroupSizeCreateInfoEXT) structure,
the `SubgroupSize` decorated variable will match
[`requiredSubgroupSize`](pipelines.html#pipelines-required-subgroup-size).

If
SPIR-V `module` is less than version 1.6 and
the pipeline was not created with the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) flag
set and no [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo)
structure was chained,
and the shader was not created with the
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag set and no
[VkShaderRequiredSubgroupSizeCreateInfoEXT](pipelines.html#VkShaderRequiredSubgroupSizeCreateInfoEXT) structure was chained,
the
variable decorated with `SubgroupSize` will match [`subgroupSize`](devsandqueues.html#limits-subgroupSize).

The maximum number of invocations that an implementation can support per
subgroup is 128.

|  | The old behavior for `SubgroupSize` is considered legacy as certain
| --- | --- |
compute algorithms cannot be easily implemented without the guarantees of
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) and
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits). |

Valid Usage

* 
[](#VUID-SubgroupSize-SubgroupSize-04382) VUID-SubgroupSize-SubgroupSize-04382

The variable decorated with `SubgroupSize` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupSize-SubgroupSize-04383) VUID-SubgroupSize-SubgroupSize-04383

The variable decorated with `SubgroupSize` **must** be declared as a
scalar 32-bit integer value

`TaskCountNV`

Decorating a variable with the `TaskCountNV` decoration will make that
variable contain the task count.
The task count specifies the number of subsequent mesh shader workgroups
that get generated upon completion of the task shader.

Valid Usage

* 
[](#VUID-TaskCountNV-TaskCountNV-04384) VUID-TaskCountNV-TaskCountNV-04384

The `TaskCountNV` decoration **must** be used only within the
`TaskNV` `Execution` `Model`

* 
[](#VUID-TaskCountNV-TaskCountNV-04385) VUID-TaskCountNV-TaskCountNV-04385

The variable decorated with `TaskCountNV` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-TaskCountNV-TaskCountNV-04386) VUID-TaskCountNV-TaskCountNV-04386

The variable decorated with `TaskCountNV` **must** be declared as a
scalar 32-bit integer value

`TessCoord`

Decorating a variable with the `TessCoord` built-in decoration will make
that variable contain the three-dimensional (u,v,w) barycentric
coordinate of the tessellated vertex within the patch.
u, v, and w are in the range [0,1] and vary linearly
across the primitive being subdivided.
For the tessellation modes of `Quads` or `IsoLines`, the third
component is always zero.

Valid Usage

* 
[](#VUID-TessCoord-TessCoord-04387) VUID-TessCoord-TessCoord-04387

The `TessCoord` decoration **must** be used only within the
`TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-TessCoord-TessCoord-04388) VUID-TessCoord-TessCoord-04388

The variable decorated with `TessCoord` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-TessCoord-TessCoord-04389) VUID-TessCoord-TessCoord-04389

The variable decorated with `TessCoord` **must** be declared as a
three-component vector of 32-bit floating-point values

`TessLevelOuter`

Decorating a variable with the `TessLevelOuter` built-in decoration will
make that variable contain the outer tessellation levels for the current
patch.

In tessellation control shaders, the variable decorated with
`TessLevelOuter` **can** be written to, controlling the tessellation factors
for the resulting patch.
These values are used by the tessellator to control primitive tessellation
and **can** be read by tessellation evaluation shaders.

In tessellation evaluation shaders, the variable decorated with
`TessLevelOuter` **can** read the values written by the tessellation control
shader.

Valid Usage

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04390) VUID-TessLevelOuter-TessLevelOuter-04390

The `TessLevelOuter` decoration **must** be used only within the
`TessellationControl` or `TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04391) VUID-TessLevelOuter-TessLevelOuter-04391

The variable decorated with `TessLevelOuter` within the
`TessellationControl` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04392) VUID-TessLevelOuter-TessLevelOuter-04392

The variable decorated with `TessLevelOuter` within the
`TessellationEvaluation` `Execution` `Model` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-TessLevelOuter-TessLevelOuter-04393) VUID-TessLevelOuter-TessLevelOuter-04393

The variable decorated with `TessLevelOuter` **must** be declared as an
array of size four, containing 32-bit floating-point values

`TessLevelInner`

Decorating a variable with the `TessLevelInner` built-in decoration will
make that variable contain the inner tessellation levels for the current
patch.

In tessellation control shaders, the variable decorated with
`TessLevelInner` **can** be written to, controlling the tessellation factors
for the resulting patch.
These values are used by the tessellator to control primitive tessellation
and **can** be read by tessellation evaluation shaders.

In tessellation evaluation shaders, the variable decorated with
`TessLevelInner` **can** read the values written by the tessellation control
shader.

Valid Usage

* 
[](#VUID-TessLevelInner-TessLevelInner-04394) VUID-TessLevelInner-TessLevelInner-04394

The `TessLevelInner` decoration **must** be used only within the
`TessellationControl` or `TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-TessLevelInner-TessLevelInner-04395) VUID-TessLevelInner-TessLevelInner-04395

The variable decorated with `TessLevelInner` within the
`TessellationControl` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-TessLevelInner-TessLevelInner-04396) VUID-TessLevelInner-TessLevelInner-04396

The variable decorated with `TessLevelInner` within the
`TessellationEvaluation` `Execution` `Model` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-TessLevelInner-TessLevelInner-04397) VUID-TessLevelInner-TessLevelInner-04397

The variable decorated with `TessLevelInner` **must** be declared as an
array of size two, containing 32-bit floating-point values

`TileOffsetQCOM`

The `TileOffsetQCOM` decoration **can** be applied to a shader input which
will be filled with the framebuffer coordinates of the active tile.

When [per-tile execution model](renderpass.html#renderpass-tile-shading) is enabled, for
the current shader invocation x and y components of
`TileOffsetQCOM` reflect the framebuffer integer coordinates of the
top-left texel of the tile corresponding to the shader invocation.

Otherwise, the x and y components of `TileOffsetQCOM` are
filled with (0,0).

Valid Usage

* 
[](#VUID-TileOffsetQCOM-TileOffsetQCOM-10626) VUID-TileOffsetQCOM-TileOffsetQCOM-10626

The `TileOffsetQCOM` decoration **must** be used only within the
`Fragment` `Execution` `Model` or `GLCompute` `Execution` `Model`

* 
[](#VUID-TileOffsetQCOM-TileOffsetQCOM-10627) VUID-TileOffsetQCOM-TileOffsetQCOM-10627

The variable decorated with `TileOffsetQCOM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-TileOffsetQCOM-TileOffsetQCOM-10628) VUID-TileOffsetQCOM-TileOffsetQCOM-10628

The variable decorated with `TileOffsetQCOM` **must** be declared as a
two-component vector of 32-bit integer values

`TileDimensionQCOM`

The `TileDimensionQCOM` decoration **can** be applied to a shader input
which will be filled with the width and height of the active tile.

When [per-tile execution model](renderpass.html#renderpass-tile-shading) is enabled, for
the current shader invocation x and y components of
`TileDimensionQCOM` reflect the with and height of the tile corresponding
to the shader invocation.

Otherwise, the x and y components of `TileDimensionQCOM` are
filled with (0,0).

Valid Usage

* 
[](#VUID-TileDimensionQCOM-TileDimensionQCOM-10629) VUID-TileDimensionQCOM-TileDimensionQCOM-10629

The `TileDimensionQCOM` decoration **must** be used only within the
`Fragment` `Execution` `Model` or `GLCompute` `Execution` `Model`

* 
[](#VUID-TileDimensionQCOM-TileDimensionQCOM-10630) VUID-TileDimensionQCOM-TileDimensionQCOM-10630

The variable decorated with `TileDimensionQCOM` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-TileDimensionQCOM-TileDimensionQCOM-10631) VUID-TileDimensionQCOM-TileDimensionQCOM-10631

The variable decorated with `TileDimensionQCOM` **must** be declared as
a two-component vector of 32-bit integer values

`TileApronSizeQCOM`

The `TileApronSizeQCOM` decoration **can** be applied to a shader input
which will be filled with the width and height of the active tile’s apron.

If [per-tile execution model](renderpass.html#renderpass-tile-shading) is enabled for the
current shader invocation, and is executing in a dynamic render pass or is
executing in a subpass where
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](renderpass.html#VkSubpassDescriptionFlagBits) is included in its
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

`VertexCountHUAWEI`

The `VertexCountHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this non-indexed mode specific variable will
contain an integer value that specifies the number of vertices in a cluster
to draw.

Valid Usage

* 
[](#VUID-VertexCountHUAWEI-VertexCountHUAWEI-07809) VUID-VertexCountHUAWEI-VertexCountHUAWEI-07809

The `VertexCountHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-VertexCountHUAWEI-VertexCountHUAWEI-07810) VUID-VertexCountHUAWEI-VertexCountHUAWEI-07810

The variable decorated with `VertexCountHUAWEI` **must** be declared as
a scalar 32-bit integer value

`VertexIndex`

Decorating a variable with the `VertexIndex` built-in decoration will
make that variable contain the index of the vertex that is being processed
by the current vertex shader invocation.
For non-indexed draws, this variable begins at the `firstVertex`
parameter to [vkCmdDraw](drawing.html#vkCmdDraw) or the `firstVertex` member of a structure
consumed by [vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect) and increments by one for each vertex in
the draw.
For indexed draws, its value is the content of the index buffer for the
vertex plus the `vertexOffset` parameter to [vkCmdDrawIndexed](drawing.html#vkCmdDrawIndexed) or
the `vertexOffset` member of the structure consumed by
[vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect).

|  | `VertexIndex` starts at the same starting value for each instance. |
| --- | --- |

Valid Usage

* 
[](#VUID-VertexIndex-VertexIndex-04398) VUID-VertexIndex-VertexIndex-04398

The `VertexIndex` decoration **must** be used only within the
`Vertex` `Execution` `Model`

* 
[](#VUID-VertexIndex-VertexIndex-04399) VUID-VertexIndex-VertexIndex-04399

The variable decorated with `VertexIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-VertexIndex-VertexIndex-04400) VUID-VertexIndex-VertexIndex-04400

The variable decorated with `VertexIndex` **must** be declared as a
scalar 32-bit integer value

`VertexOffsetHUAWEI`

The `VertexOffsetHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this indexed mode specific variable will
contain an integer value that specifies an offset value added to the vertex
index of a cluster before indexing into the vertex buffer.

Valid Usage

* 
[](#VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07811) VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07811

The `VertexOffsetHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07812) VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07812

The variable decorated with `VertexOffsetHUAWEI` **must** be declared as
a scalar 32-bit integer value

`ViewIndex`

The `ViewIndex` decoration **can** be applied to a shader input which will
be filled with the index of the view that is being processed by the current
shader invocation.

If multiview is enabled in the render pass, this value will be the index of
one of the bits set in the view mask of the subpass the pipeline is compiled
against.
If multiview is not enabled in the render pass, this value will be zero.

Valid Usage

* 
[](#VUID-ViewIndex-ViewIndex-04401) VUID-ViewIndex-ViewIndex-04401

The `ViewIndex` decoration **must** be used only within the
`MeshEXT`, `Vertex`, `Geometry`, `TessellationControl`,
`TessellationEvaluation` or `Fragment` `Execution` `Model`

* 
[](#VUID-ViewIndex-ViewIndex-04402) VUID-ViewIndex-ViewIndex-04402

The variable decorated with `ViewIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-ViewIndex-ViewIndex-04403) VUID-ViewIndex-ViewIndex-04403

The variable decorated with `ViewIndex` **must** be declared as a scalar
32-bit integer value

`ViewportIndex`

Decorating a variable with the `ViewportIndex` built-in decoration will
make that variable contain the index of the viewport.

In a
mesh,
vertex, tessellation evaluation, or
geometry shader, the variable decorated with `ViewportIndex` can be
written to with the viewport index to which the primitive produced by that
shader will be directed.

The selected viewport index is used to select the
viewport transform, scissor rectangle, and exclusive
scissor rectangle.

The last active
*[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization)* (in pipeline order) controls the `ViewportIndex` that is used.
Outputs in previous shader stages are not used, even if the last stage fails
to write the `ViewportIndex`.

If the last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `ViewportIndex`
, and if the [multiviewPerViewViewports](features.html#features-multiviewPerViewViewports) feature is not enabled,
then the first viewport is used.
If a [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface includes a variable decorated with
`ViewportIndex`, it **must** write the same value to `ViewportIndex` for
all output vertices of a given primitive.

In a fragment shader, the variable decorated with `ViewportIndex`
contains the viewport index of the primitive that the fragment invocation
belongs to.

If the [`multiviewPerViewViewports`](features.html#features-multiviewPerViewViewports) feature is enabled, and if the last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `ViewportIndex`, then the value of `ViewIndex` is used as an
index to select the viewport transform and scissor rectangle, and the value
of `ViewportIndex` in the fragment shader is poison.

Valid Usage

* 
[](#VUID-ViewportIndex-ViewportIndex-04404) VUID-ViewportIndex-ViewportIndex-04404

The `ViewportIndex` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `TessellationEvaluation`,
`Geometry`, or `Fragment` `Execution` `Model`

* 
[](#VUID-ViewportIndex-ViewportIndex-04405) VUID-ViewportIndex-ViewportIndex-04405

If the [    `shaderOutputViewportIndex`](features.html#features-shaderOutputViewportIndex) feature is not enabled then the
`ViewportIndex` decoration **must** be used only within the
`Geometry` or `Fragment` `Execution` `Model`

* 
[](#VUID-ViewportIndex-ViewportIndex-04406) VUID-ViewportIndex-ViewportIndex-04406

The variable decorated with `ViewportIndex` within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** be declared using the `Output` `Storage` `Class`

* 
[](#VUID-ViewportIndex-ViewportIndex-04407) VUID-ViewportIndex-ViewportIndex-04407

The variable decorated with `ViewportIndex` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-ViewportIndex-ViewportIndex-04408) VUID-ViewportIndex-ViewportIndex-04408

The variable decorated with `ViewportIndex` **must** be declared as a
scalar 32-bit integer value for all supported execution models except
`MeshEXT`

* 
[](#VUID-ViewportIndex-ViewportIndex-07060) VUID-ViewportIndex-ViewportIndex-07060

The variable decorated with `ViewportIndex` within the `MeshEXT`
`Execution` `Model` **must** also be decorated with the `PerPrimitiveEXT`
decoration

* 
[](#VUID-ViewportIndex-ViewportIndex-10601) VUID-ViewportIndex-ViewportIndex-10601

`ViewportIndex` within the `MeshEXT` `Execution` `Model` **must**
decorate a scalar 32-bit integer member of a structure decorated as
`Block`, or decorate a variable of type `OpTypeArray` of scalar
32-bit integer values

* 
[](#VUID-ViewportIndex-ViewportIndex-10602) VUID-ViewportIndex-ViewportIndex-10602

If `ViewportIndex` is declared as an array of 32-bit integer values,
within the `MeshEXT` `Execution` `Model`, size of the array **must** match
the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-ViewportIndex-ViewportIndex-10603) VUID-ViewportIndex-ViewportIndex-10603

If `ViewportIndex` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

`ViewportMaskNV`

Decorating a variable with the `ViewportMaskNV` built-in decoration will
make that variable contain the viewport mask.

In a
mesh,
vertex, tessellation evaluation, or geometry shader, the variable decorated
with `ViewportMaskNV` can be written to with the mask of which viewports
the primitive produced by that shader will directed.

The `ViewportMaskNV` variable **must** be an array that has
⌈(`VkPhysicalDeviceLimits`::`maxViewports` / 32)⌉
elements.
When a shader writes to this variable, bit B of element M controls whether a
primitive is emitted to viewport 32 × M +  B.
The viewports indicated by the mask are used to select the
viewport transform, scissor rectangle, and exclusive
scissor rectangle that a primitive will be transformed by.

The last active
*[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization)* (in pipeline order) controls the `ViewportMaskNV` that is used.
Outputs in previous shader stages are not used, even if the last stage fails
to write the `ViewportMaskNV`.
When `ViewportMaskNV` is written by the final
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization), any variable decorated with `ViewportIndex` in the fragment
shader will have the index of the viewport that was used in generating that
fragment.

If a [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface includes a variable decorated with
`ViewportMaskNV`, it **must** write the same value to `ViewportMaskNV`
for all output vertices of a given primitive.

Valid Usage

* 
[](#VUID-ViewportMaskNV-ViewportMaskNV-04409) VUID-ViewportMaskNV-ViewportMaskNV-04409

The `ViewportMaskNV` decoration **must** be used only within the
`Vertex`, `MeshNV`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model`

* 
[](#VUID-ViewportMaskNV-ViewportMaskNV-04410) VUID-ViewportMaskNV-ViewportMaskNV-04410

The variable decorated with `ViewportMaskNV` **must** be declared using
the `Output` `Storage` `Class`

* 
[](#VUID-ViewportMaskNV-ViewportMaskNV-04411) VUID-ViewportMaskNV-ViewportMaskNV-04411

The variable decorated with `ViewportMaskNV` **must** be declared as an
array of 32-bit integer values

`ViewportMaskPerViewNV`

Decorating a variable with the `ViewportMaskPerViewNV` built-in
decoration will make that variable contain the mask of viewports primitives
are broadcast to, for each view.

The value written to an element of `ViewportMaskPerViewNV` in the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) is a bitmask indicating which viewports the primitive will be
directed to.
The primitive will be broadcast to the viewport corresponding to each
non-zero bit of the bitmask, and that viewport index is used to select the
viewport transform, scissor rectangle, and exclusive
scissor rectangle, for each view.
The same values **must** be written to all vertices in a given primitive, or
else the set of viewports used for that primitive is **undefined**.

Elements of the array correspond to views in a multiview subpass, and those
elements corresponding to views in the view mask of the subpass the shader
is compiled against will be used as the viewport mask value for those views.
`ViewportMaskPerViewNV` output in an earlier
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) is not available as an input in the subsequent
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).

Although `ViewportMaskNV` is an array, `ViewportMaskPerViewNV` is not
a two-dimensional array.
Instead, `ViewportMaskPerViewNV` is limited to 32 viewports.

Valid Usage

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04412) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04412

The `ViewportMaskPerViewNV` decoration **must** be used only within the
`Vertex`, `MeshNV`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04413) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04413

The variable decorated with `ViewportMaskPerViewNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04414) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04414

The variable decorated with `ViewportMaskPerViewNV` **must** be declared
as an array of 32-bit integer values

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04415) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04415

The array decorated with `ViewportMaskPerViewNV` **must** be a size less
than or equal to 32

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04416) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04416

The array decorated with `ViewportMaskPerViewNV` **must** be a size
greater than the maximum view in the subpass’s view mask

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04417) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04417

The array variable decorated with `ViewportMaskPerViewNV` **must** only
be indexed by a constant or specialization constant

`WarpsPerSMNV`

Decorating a variable with the `WarpsPerSMNV` built-in decoration will
make that variable contain the maximum number of warps executing on a SM.

Valid Usage

* 
[](#VUID-WarpsPerSMNV-WarpsPerSMNV-04418) VUID-WarpsPerSMNV-WarpsPerSMNV-04418

The variable decorated with `WarpsPerSMNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-WarpsPerSMNV-WarpsPerSMNV-04419) VUID-WarpsPerSMNV-WarpsPerSMNV-04419

The variable decorated with `WarpsPerSMNV` **must** be declared as a
scalar 32-bit integer value

`WarpIDNV`

Decorating a variable with the `WarpIDNV` built-in decoration will make
that variable contain the ID of the warp on a SM on which the current shader
invocation is running.
This variable is in the range [0, `WarpsPerSMNV`-1].

Valid Usage

* 
[](#VUID-WarpIDNV-WarpIDNV-04420) VUID-WarpIDNV-WarpIDNV-04420

The variable decorated with `WarpIDNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-WarpIDNV-WarpIDNV-04421) VUID-WarpIDNV-WarpIDNV-04421

The variable decorated with `WarpIDNV` **must** be declared as a scalar
32-bit integer value

`WorkgroupId`

Decorating a variable with the `WorkgroupId` built-in decoration will
make that variable contain the global coordinate of the local workgroup that
the current invocation is a member of.
Each component is in the range [base,base +  count), where
base and count are based on the parameters passed into the
dispatching
or drawing
commands in each dimension.

Valid Usage

* 
[](#VUID-WorkgroupId-WorkgroupId-04422) VUID-WorkgroupId-WorkgroupId-04422

The `WorkgroupId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-WorkgroupId-WorkgroupId-04423) VUID-WorkgroupId-WorkgroupId-04423

The variable decorated with `WorkgroupId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-WorkgroupId-WorkgroupId-04424) VUID-WorkgroupId-WorkgroupId-04424

The variable decorated with `WorkgroupId` **must** be declared as a
three-component vector of 32-bit integer values

`WorkgroupSize`

|  | SPIR-V 1.6 deprecated `WorkgroupSize` in favor of using the
| --- | --- |
`LocalSizeId` Execution Mode instead.
Support for `LocalSizeId` was added with `[VK_KHR_maintenance4](../appendices/extensions.html#VK_KHR_maintenance4)` and
promoted to core in Version 1.3. |

Decorating an object with the `WorkgroupSize` built-in decoration will
make that object contain the dimensions of a local workgroup.
If an object is decorated with the `WorkgroupSize` decoration, this takes
precedence over any `LocalSize`
or `LocalSizeId`
execution mode.

Valid Usage

* 
[](#VUID-WorkgroupSize-WorkgroupSize-04425) VUID-WorkgroupSize-WorkgroupSize-04425

The `WorkgroupSize` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-WorkgroupSize-WorkgroupSize-04426) VUID-WorkgroupSize-WorkgroupSize-04426

The variable decorated with `WorkgroupSize` **must** be a specialization
constant or a constant

* 
[](#VUID-WorkgroupSize-WorkgroupSize-04427) VUID-WorkgroupSize-WorkgroupSize-04427

The variable decorated with `WorkgroupSize` **must** be declared as a
three-component vector of 32-bit integer values

* 
[](#VUID-WorkgroupSize-TileShadingRateQCOM-10635) VUID-WorkgroupSize-TileShadingRateQCOM-10635

If the `TileShadingRateQCOM` `Execution` `Mode` is used,
variables decorated with`WorkgroupSize` **must** be declared using the
`Input` `Storage` `Class`

`WorldRayDirectionKHR`

A variable decorated with the `WorldRayDirectionKHR` decoration will
specify the direction of the ray being processed, in world space.
The value is the parameter passed into the [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

Valid Usage

* 
[](#VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04428) VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04428

The `WorldRayDirectionKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04429) VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04429

The variable decorated with `WorldRayDirectionKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04430) VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04430

The variable decorated with `WorldRayDirectionKHR` **must** be declared
as a three-component vector of 32-bit floating-point values

`WorldRayOriginKHR`

A variable decorated with the `WorldRayOriginKHR` decoration will specify
the origin of the ray being processed, in world space.
The value is the parameter passed into the [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

Valid Usage

* 
[](#VUID-WorldRayOriginKHR-WorldRayOriginKHR-04431) VUID-WorldRayOriginKHR-WorldRayOriginKHR-04431

The `WorldRayOriginKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-WorldRayOriginKHR-WorldRayOriginKHR-04432) VUID-WorldRayOriginKHR-WorldRayOriginKHR-04432

The variable decorated with `WorldRayOriginKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-WorldRayOriginKHR-WorldRayOriginKHR-04433) VUID-WorldRayOriginKHR-WorldRayOriginKHR-04433

The variable decorated with `WorldRayOriginKHR` **must** be declared as
a three-component vector of 32-bit floating-point values

`WorldToObjectKHR`

A variable decorated with the `WorldToObjectKHR` decoration will contain
the current world-to-object transformation matrix, which is determined by
the instance of the current intersection.

Valid Usage

* 
[](#VUID-WorldToObjectKHR-WorldToObjectKHR-04434) VUID-WorldToObjectKHR-WorldToObjectKHR-04434

The `WorldToObjectKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-WorldToObjectKHR-WorldToObjectKHR-04435) VUID-WorldToObjectKHR-WorldToObjectKHR-04435

The variable decorated with `WorldToObjectKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-WorldToObjectKHR-WorldToObjectKHR-04436) VUID-WorldToObjectKHR-WorldToObjectKHR-04436

The variable decorated with `WorldToObjectKHR` **must** be declared as a
matrix with four columns of three-component vectors of 32-bit
floating-point values

`HitIsSphereNV`

A variable decorated with the `HitIsSphereNV` decoration will contain a
non-zero value if the current ray hit a sphere primitive or zero otherwise.

Valid Usage

* 
[](#VUID-HitIsSphereNV-HitIsSphereNV-10513) VUID-HitIsSphereNV-HitIsSphereNV-10513

The `HitIsSphereNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitIsSphereNV-HitIsSphereNV-10514) VUID-HitIsSphereNV-HitIsSphereNV-10514

The variable decorated with `HitIsSphereNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-HitIsSphereNV-HitIsSphereNV-10515) VUID-HitIsSphereNV-HitIsSphereNV-10515

The variable decorated with `HitIsSphereNV` **must** be declared as a
boolean value

`HitIsLSSNV`

A variable decorated with the `HitIsLSSNV` decoration will contain a
non-zero value if the current ray hit a LSS primitive or zero otherwise.

Valid Usage

* 
[](#VUID-HitIsLSSNV-HitIsLSSNV-10516) VUID-HitIsLSSNV-HitIsLSSNV-10516

The `HitIsLSSNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitIsLSSNV-HitIsLSSNV-10517) VUID-HitIsLSSNV-HitIsLSSNV-10517

The variable decorated with `HitIsLSSNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-HitIsLSSNV-HitIsLSSNV-10518) VUID-HitIsLSSNV-HitIsLSSNV-10518

The variable decorated with `HitIsLSSNV` **must** be declared as a
boolean value

`HitSpherePositionNV`

A variable decorated with the `HitSpherePositionNV` decoration will
contain the position of sphere primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitSpherePositionNV-HitSpherePositionNV-10519) VUID-HitSpherePositionNV-HitSpherePositionNV-10519

The `HitSpherePositionNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitSpherePositionNV-HitSpherePositionNV-10520) VUID-HitSpherePositionNV-HitSpherePositionNV-10520

The variable decorated with `HitSpherePositionNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HitSpherePositionNV-HitSpherePositionNV-10521) VUID-HitSpherePositionNV-HitSpherePositionNV-10521

The variable decorated with `HitSpherePositionNV` **must** be declared
as a three-component vector of 32-bit floating-point values

`HitSphereRadiusNV`

A variable decorated with the `HitSphereRadiusNV` decoration will contain
the radius of sphere primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitSphereRadiusNV-HitSphereRadiusNV-10522) VUID-HitSphereRadiusNV-HitSphereRadiusNV-10522

The `HitSphereRadiusNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitSphereRadiusNV-HitSphereRadiusNV-10523) VUID-HitSphereRadiusNV-HitSphereRadiusNV-10523

The variable decorated with `HitSphereRadiusNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HitSphereRadiusNV-HitSphereRadiusNV-10524) VUID-HitSphereRadiusNV-HitSphereRadiusNV-10524

The variable decorated with `HitSphereRadiusNV` **must** be declared as
a scalar 32-bit floating-point value

`HitLSSPositionsNV`

A variable decorated with the `HitLSSPositionsNV` decoration will contain
the position of the LSS primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitLSSPositionsNV-HitLSSPositionsNV-10525) VUID-HitLSSPositionsNV-HitLSSPositionsNV-10525

The `HitLSSPositionsNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitLSSPositionsNV-HitLSSPositionsNV-10526) VUID-HitLSSPositionsNV-HitLSSPositionsNV-10526

The variable decorated with `HitLSSPositionsNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HitLSSPositionsNV-HitLSSPositionsNV-10527) VUID-HitLSSPositionsNV-HitLSSPositionsNV-10527

The variable decorated with `HitLSSPositionsNV` **must** be declared as
an array of size two, containing three-component vector of 32-bit
floating-point values

`HitLSSRadiiNV`

A variable decorated with the `HitLSSRadiiNV` decoration will contain the
radii of LSS primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitLSSRadiiNV-HitLSSRadiiNV-10528) VUID-HitLSSRadiiNV-HitLSSRadiiNV-10528

The `HitLSSRadiiNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitLSSRadiiNV-HitLSSRadiiNV-10529) VUID-HitLSSRadiiNV-HitLSSRadiiNV-10529

The variable decorated with `HitLSSRadiiNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-HitLSSRadiiNV-HitLSSRadiiNV-10530) VUID-HitLSSRadiiNV-HitLSSRadiiNV-10530

The variable decorated with `HitLSSRadiiNV` **must** be declared as an
array of size two, containing 32-bit floating-point values

`CoreCountARM`

Decorating a variable with the `CoreCountARM` built-in decoration will
make that variable contain the number of cores on the device.

Valid Usage

* 
[](#VUID-CoreCountARM-CoreCountARM-07595) VUID-CoreCountARM-CoreCountARM-07595

The variable decorated with `CoreCountARM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-CoreCountARM-CoreCountARM-07596) VUID-CoreCountARM-CoreCountARM-07596

The variable decorated with `CoreCountARM` **must** be declared as a
scalar 32-bit integer value

`CoreMaxIDARM`

Decorating a variable with the `CoreMaxIDARM` built-in decoration will
make that variable contain the max ID of any shader core on the device on
which the current shader invocation is running.

Valid Usage

* 
[](#VUID-CoreMaxIDARM-CoreMaxIDARM-07597) VUID-CoreMaxIDARM-CoreMaxIDARM-07597

The variable decorated with `CoreMaxIDARM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-CoreMaxIDARM-CoreMaxIDARM-07598) VUID-CoreMaxIDARM-CoreMaxIDARM-07598

The variable decorated with `CoreMaxIDARM` **must** be declared as a
scalar 32-bit integer value

`CoreIDARM`

Decorating a variable with the `CoreIDARM` built-in decoration will make
that variable contain the ID of the core on which the current shader
invocation is running.
This variable is in the range [0, `CoreMaxIDARM`].

Valid Usage

* 
[](#VUID-CoreIDARM-CoreIDARM-07599) VUID-CoreIDARM-CoreIDARM-07599

The variable decorated with `CoreIDARM` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-CoreIDARM-CoreIDARM-07600) VUID-CoreIDARM-CoreIDARM-07600

The variable decorated with `CoreIDARM` **must** be declared as a scalar
32-bit integer value

`WarpMaxIDARM`

Decorating a variable with the `WarpMaxIDARM` built-in decoration will
make that variable contain the maximum warp ID for the core on which the
current invocation is running.

Valid Usage

* 
[](#VUID-WarpMaxIDARM-WarpMaxIDARM-07601) VUID-WarpMaxIDARM-WarpMaxIDARM-07601

The variable decorated with `WarpMaxIDARM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-WarpMaxIDARM-WarpMaxIDARM-07602) VUID-WarpMaxIDARM-WarpMaxIDARM-07602

The variable decorated with `WarpMaxIDARM` **must** be declared as a
scalar 32-bit integer value

`WarpIDARM`

Decorating a variable with the `WarpIDARM` built-in decoration will make
that variable contain the ID of the warp on a core on which the current
shader invocation is running.
This variable is in the range [0, `WarpMaxIDARM`].

Valid Usage

* 
[](#VUID-WarpIDARM-WarpIDARM-07603) VUID-WarpIDARM-WarpIDARM-07603

The variable decorated with `WarpIDARM` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-WarpIDARM-WarpIDARM-07604) VUID-WarpIDARM-WarpIDARM-07604

The variable decorated with `WarpIDARM` **must** be declared as a scalar
32-bit integer value

`CoalescedInputCountAMDX`

Decorating a variable with the `CoalescedInputCountAMDX` built-in
decoration will make that variable contain the number of node dispatches
that the implementation coalesced into the input for the current shader.
This variable will take a value in the range [1, arraySize), where
arraySize is the maximum size of the input payload array for the
shader.

Valid Usage

* 
[](#VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09172) VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09172

The variable decorated with `CoalescedInputCountAMDX` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09173) VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09173

If a variable is decorated with `CoalescedInputCountAMDX`, the
`CoalescingAMDX` execution mode **must** be declared

* 
[](#VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09174) VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09174

The variable decorated with `CoalescedInputCountAMDX` **must** be
declared as a scalar 32-bit integer value

`ShaderIndexAMDX`

Decorating a variable with the `ShaderIndexAMDX` built-in decoration will
make that variable contain the index of the shader specified when it was
compiled, either via
[VkPipelineShaderStageNodeCreateInfoAMDX](executiongraphs.html#VkPipelineShaderStageNodeCreateInfoAMDX)::`index` or by the
`ShaderIndexAMDX` execution mode.

Valid Usage

* 
[](#VUID-ShaderIndexAMDX-ShaderIndexAMDX-09175) VUID-ShaderIndexAMDX-ShaderIndexAMDX-09175

The variable decorated with `ShaderIndexAMDX` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-ShaderIndexAMDX-ShaderIndexAMDX-09176) VUID-ShaderIndexAMDX-ShaderIndexAMDX-09176

The variable decorated with `ShaderIndexAMDX` **must** be declared as a
scalar 32-bit integer value

`ClusterIDNV`

A variable decorated with the `ClusterIDNV` decoration will contain the
triangle cluster ID of a hit triangle in a cluster acceleration structure if
the current ray hit a triangle primitive or `-1` otherwise.

Valid Usage

* 
[](#VUID-ClusterIDNV-ClusterIDNV-10531) VUID-ClusterIDNV-ClusterIDNV-10531

The `ClusterIDNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-ClusterIDNV-ClusterIDNV-10532) VUID-ClusterIDNV-ClusterIDNV-10532

The variable decorated with `ClusterIDNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-ClusterIDNV-ClusterIDNV-10533) VUID-ClusterIDNV-ClusterIDNV-10533

The variable decorated with `ClusterIDNV` **must** be declared as a
scalar 32-bit integer value
