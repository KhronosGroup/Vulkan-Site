# Fixed-Function Vertex Post-Processing

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/vertexpostproc.html

## Table of Contents

- [Transform Feedback](#vertexpostproc-transform-feedback)
- [Viewport Swizzle](#vertexpostproc-viewport-swizzle)
- [Flat Shading](#vertexpostproc-flatshading)
- [Primitive Clipping](#vertexpostproc-clipping)
- [Clipping Shader Outputs](#vertexpostproc-clipping-shader-outputs)
- [Clipping_Shader_Outputs](#vertexpostproc-clipping-shader-outputs)
- [Controlling Viewport W Scaling](#vertexpostproc-viewportwscaling)
- [Controlling_Viewport_W_Scaling](#vertexpostproc-viewportwscaling)
- [Coordinate Transformations](#vertexpostproc-coord-transform)
- [Render Pass Transform](#vertexpostproc-renderpass-transform)
- [Render_Pass_Transform](#vertexpostproc-renderpass-transform)
- [Controlling the Viewport](#vertexpostproc-viewport)
- [Controlling_the_Viewport](#vertexpostproc-viewport)

## Content

After [pre-rasterization shader stages](pipelines.html#pipelines-graphics-subsets-pre-rasterization), the following fixed-function operations are applied to
vertices of the resulting primitives:

* 
Transform feedback (see [Transform    Feedback](#vertexpostproc-transform-feedback))

* 
Viewport swizzle (see [Viewport    Swizzle](#vertexpostproc-viewport-swizzle))

* 
Flat shading (see [Flat Shading](#vertexpostproc-flatshading)).

* 
Primitive clipping, including application-defined half-spaces (see
[Primitive Clipping](#vertexpostproc-clipping)).

* 
Shader output attribute clipping (see
[Clipping Shader Outputs](#vertexpostproc-clipping-shader-outputs)).

* 
Clip space W scaling (see [Controlling    Viewport W Scaling](#vertexpostproc-viewportwscaling)).

* 
Perspective division on clip coordinates (see
[Coordinate Transformations](#vertexpostproc-coord-transform)).

* 
Viewport mapping, including depth range scaling (see
[Controlling the Viewport](#vertexpostproc-viewport)).

* 
Front face determination for polygon primitives (see
[Basic Polygon Rasterization](primsrast.html#primsrast-polygons-basic)).

Next, rasterization is performed on primitives as described in chapter
[Rasterization](primsrast.html#primsrast).

Before any other fixed-function vertex post-processing, vertex outputs from
the last shader in the
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) **can** be written out to one or more transform feedback buffers bound
to the command buffer.
To capture vertex outputs the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader **must** be declared with the `Xfb` execution mode.
Outputs decorated with `XfbBuffer` will be written out to the
corresponding transform feedback buffers bound to the command buffer when
transform feedback is active.
Transform feedback buffers are bound to the command buffer by using
[vkCmdBindTransformFeedbackBuffersEXT](#vkCmdBindTransformFeedbackBuffersEXT).
Transform feedback is made active by calling
[vkCmdBeginTransformFeedbackEXT](#vkCmdBeginTransformFeedbackEXT) and made inactive by calling
[vkCmdEndTransformFeedbackEXT](#vkCmdEndTransformFeedbackEXT).
After vertex data is written it is possible to use
[vkCmdDrawIndirectByteCountEXT](drawing.html#vkCmdDrawIndirectByteCountEXT) to start a new draw where the
`vertexCount` is derived from the number of bytes written by a previous
transform feedback.

When an individual point, line, or triangle primitive reaches the transform
feedback stage while transform feedback is active, the values of the
specified output variables are assembled into primitives and appended to the
bound transform feedback buffers.
Any primitive for which any pair of vertices have the same position **should**
be assembled for transform feedback normally but it **may** be discarded prior
to primitive assembly instead.
After activating transform feedback, the values of the first assembled
primitive are written at the starting offsets of the bound transform
feedback buffers, and subsequent primitives are appended to the buffer.
If the optional `pCounterBuffers` and `pCounterBufferOffsets`
parameters are specified, the starting points within the transform feedback
buffers are adjusted so data is appended to the previously written values
indicated by the value stored by the implementation in the counter buffer.

For multi-vertex primitives, all values for a given vertex are written
before writing values for any other vertex.
When the [`transformFeedbackPreservesProvokingVertex`](features.html#features-transformFeedbackPreservesProvokingVertex) feature is not enabled,
implementations
**may** write out any vertex within the primitive first, but all subsequent
vertices for that primitive **must** be written out in a consistent winding
order defined as follows:

* 
If neither [geometry](geometry.html#geometry) or [tessellation    shading](tessellation.html#tessellation) is active, vertices within a primitive are appended according
to the winding order described by the [    primitive topology](drawing.html#drawing-primitive-topologies) defined by the
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)::`topology` used to
execute the [drawing command](drawing.html#drawing).

* 
If [geometry shading](geometry.html#geometry) is active, vertices within a primitive
are appended according to the winding order described by the
[primitive topology](drawing.html#drawing-primitive-topologies) defined by the
[`OutputPoints`](drawing.html#drawing-point-lists), [    `OutputLineStrip`](drawing.html#drawing-line-strips), or [    `OutputTriangleStrip`](drawing.html#drawing-triangle-strips) execution mode.

* 
If [tessellation shading](tessellation.html#tessellation) is active but
[geometry shading](geometry.html#geometry) is not, vertices within a primitive are
appended according to the winding order defined by
[triangle tessellation](tessellation.html#tessellation-triangle-tessellation),
[quad tessellation](tessellation.html#tessellation-quad-tessellation), and
[isoline tessellation](tessellation.html#tessellation-isoline-tessellation).

When the [`transformFeedbackPreservesProvokingVertex`](features.html#features-transformFeedbackPreservesProvokingVertex) feature is enabled, then
in addition to writing vertices with a consistent winding order, the vertex
order **must** preserve the [provoking vertex](#vertexpostproc-flatshading) of
each primitive:

* 
When the
[pipeline’s    provoking vertex mode](#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT) is
[VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](#VkProvokingVertexModeEXT), the primitive’s
provoking vertex **must** be the first vertex written.

* 
When the
[pipeline’s    provoking vertex mode](#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT) is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](#VkProvokingVertexModeEXT), the primitive’s
provoking vertex **must** be the last vertex written.

If [`transformFeedbackPreservesTriangleFanProvokingVertex`](limits.html#limits-transformFeedbackPreservesTriangleFanProvokingVertex) is
[VK_FALSE](fundamentals.html#VK_FALSE), neither [geometry](geometry.html#geometry) nor [tessellation](tessellation.html#tessellation) shading is active, and the [primitive topology](drawing.html#drawing-primitive-topologies) is [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](drawing.html#VkPrimitiveTopology), then the
first vertex written from each primitive is implementation-defined even when
the [`transformFeedbackPreservesProvokingVertex`](features.html#features-transformFeedbackPreservesProvokingVertex) feature is enabled.

When capturing vertices, the stride associated with each transform feedback
buffer, as indicated by the `XfbStride` decoration, indicates the number
of bytes of storage reserved for each vertex in the transform feedback
buffer.
For every vertex captured, each output attribute with a `Offset`
decoration will be written to the storage reserved for the vertex at the
associated transform feedback buffer.
When writing output variables that are arrays or structures, individual
array elements or structure members are written tightly packed in order.
For vector types, individual components are written in order.
For matrix types, outputs are written as an array of column vectors.

If any component of an output with an assigned transform feedback offset was
not written to by its shader, the value recorded for that component is
**undefined**, and the primitives needed and primitives written counts in the
corresponding [VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](queries.html#VkQueryType) query will
increment as normal.
All components of an output variable **must** be written at an offset aligned
to the size of the component.
The size of each component of an output variable **must** be at least 32-bits.
When capturing a vertex, any portion of the reserved storage not associated
with an output variable with an assigned transform feedback offset will be
unmodified.

When transform feedback is inactive, no vertices are recorded.
If there is a valid counter buffer handle and counter buffer offset in the
`pCounterBuffers` and `pCounterBufferOffsets` arrays, writes to the
corresponding transform feedback buffer will start at the byte offset
represented by the value stored in the counter buffer location.

Individual lines or triangles of a strip or fan primitive will be extracted
and recorded separately.
Incomplete primitives are not recorded.

When using a geometry shader that emits vertices to multiple vertex streams,
a primitive will be assembled and output for each stream when there are
enough vertices emitted for the output primitive type.
All outputs assigned to a given transform feedback buffer are required to
come from a single vertex stream.

The sizes of the transform feedback buffers are defined by the
[vkCmdBindTransformFeedbackBuffersEXT](#vkCmdBindTransformFeedbackBuffersEXT) `pSizes` parameter for each
of the bound buffers, or the size of the bound buffer, whichever is the
lesser.
If there is less space remaining in any of the transform feedback buffers
than the size of all of the vertex data for that primitive based on the
`XfbStride` for that `XfbBuffer` then no vertex data of that primitive
is recorded in any transform feedback buffer, and the value for the number
of primitives written in the corresponding
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](queries.html#VkQueryType) query for all transform
feedback buffers is no longer incremented.

Any outputs made to a `XfbBuffer` that is not bound to a transform
feedback buffer is ignored.

To bind transform feedback memory ranges to a command buffer for use in
subsequent drawing commands, call:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
void vkCmdBindTransformFeedbackBuffers2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pBindingInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first transform feedback binding
whose state is updated by the command.

* 
`bindingCount` is the number of transform feedback bindings whose
state is updated by the command.

* 
`pBindingInfos` is a pointer to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures specifying the
ranges of memory to be used to capture transform feedback data.

Element i of `pBindingInfos` replaces the current state for the
transform feedback binding `firstBinding` +  i, for i in
[0,`bindingCount`).

Valid Usage

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-transformFeedback-02355) VUID-vkCmdBindTransformFeedbackBuffers2EXT-transformFeedback-02355

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02356) VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02356

`firstBinding` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02357) VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02357

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-None-02365) VUID-vkCmdBindTransformFeedbackBuffers2EXT-None-02365

Transform feedback **must** not be active when the `vkCmdBindTransformFeedbackBuffers2EXT` command
is recorded

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13090) VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13090

The `addressRange.address` member of all elements of
`pBindingInfos` **must** be a multiple of 4

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13091) VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13091

The buffer that the `addressRange` of each element of
`pBindingInfos` was queried from **must** have been created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13092) VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13092

The `addressRange.size` member of all elements of
`pBindingInfos` **must** be less than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBufferSize`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-parameter) VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-pBindingInfos-parameter) VUID-vkCmdBindTransformFeedbackBuffers2EXT-pBindingInfos-parameter

 If `pBindingInfos` is not `NULL`, `pBindingInfos` **must** be a valid pointer to an array of `bindingCount` valid [VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-recording) VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-cmdpool) VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-videocoding) VUID-vkCmdBindTransformFeedbackBuffers2EXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-bindingCount-arraylength) VUID-vkCmdBindTransformFeedbackBuffers2EXT-bindingCount-arraylength

 If `pBindingInfos` is not `NULL`, `bindingCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindTransformFeedbackBuffers2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

`VkBindTransformFeedbackBuffer2InfoEXT` is defined as:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
typedef struct VkBindTransformFeedbackBuffer2InfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
} VkBindTransformFeedbackBuffer2InfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is the [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) of the address
range to use.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining
the flags for the address range.

Valid Usage

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13097) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13098) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13099) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13100) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13122) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13123) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13101) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13124) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13125) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-sType-sType) VUID-VkBindTransformFeedbackBuffer2InfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_TRANSFORM_FEEDBACK_BUFFER_2_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-pNext-pNext) VUID-VkBindTransformFeedbackBuffer2InfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-parameter) VUID-VkBindTransformFeedbackBuffer2InfoEXT-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

To bind transform feedback buffers to a command buffer for use in subsequent
drawing commands, call:

|  | This functionality is superseded by [vkCmdBindTransformFeedbackBuffers2EXT](#vkCmdBindTransformFeedbackBuffers2EXT). See [Legacy Functionality](../appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_EXT_transform_feedback
void vkCmdBindTransformFeedbackBuffersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBuffer*                             pBuffers,
    const VkDeviceSize*                         pOffsets,
    const VkDeviceSize*                         pSizes);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first transform feedback binding
whose state is updated by the command.

* 
`bindingCount` is the number of transform feedback bindings whose
state is updated by the command.

* 
`pBuffers` is a pointer to an array of buffer handles.

* 
`pOffsets` is a pointer to an array of buffer offsets.

* 
`pSizes` is `NULL` or a pointer to an array of `VkDeviceSize`
buffer sizes, specifying the maximum number of bytes to capture to the
corresponding transform feedback buffer.
If `pSizes` is `NULL`, it is equivalent to setting a `pSizes`
array where every element is [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE).

The values taken from elements i of `pBuffers`, `pOffsets` and
`pSizes` replace the current state for the transform feedback binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The transform feedback binding is updated to start at the offset indicated
by `pOffsets`[i] from the start of the buffer `pBuffers`[i].

When an element of `pSizes`[i] is [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), or `pSizes`
is `NULL`, the effective range is calculated by taking the size of
`pBuffers`[i] minus `pOffsets`[i].
Otherwise, the effective range is equal to the element in `pSizes`[i].

Valid Usage

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-transformFeedback-02355) VUID-vkCmdBindTransformFeedbackBuffersEXT-transformFeedback-02355

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02356) VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02356

`firstBinding` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02357) VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02357

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-None-02365) VUID-vkCmdBindTransformFeedbackBuffersEXT-None-02365

Transform feedback **must** not be active when the `vkCmdBindTransformFeedbackBuffersEXT` command
is recorded

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02358) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02358

All elements of `pOffsets` **must** be less than the size of the
corresponding element in `pBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02359) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02359

All elements of `pOffsets` **must** be a multiple of 4

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02360) VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02360

All elements of `pBuffers` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02363) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02363

All elements of `pOffsets` plus the
[effective size](#transform-feedback-effective-size) of the element,
**must** be less than or equal to the size of the corresponding buffer in
`pBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02364) VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02364

Each element of `pBuffers` that is non-sparse **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-parameter) VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-parameter) VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-parameter

 `pBuffers` **must** be a valid pointer to an array of `bindingCount` valid [VkBuffer](resources.html#VkBuffer) handles

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-parameter) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-recording) VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-cmdpool) VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-videocoding) VUID-vkCmdBindTransformFeedbackBuffersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-bindingCount-arraylength) VUID-vkCmdBindTransformFeedbackBuffersEXT-bindingCount-arraylength

 `bindingCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commonparent) VUID-vkCmdBindTransformFeedbackBuffersEXT-commonparent

 Both of `commandBuffer`, and the elements of `pBuffers` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindTransformFeedbackBuffersEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Transform feedback for specific transform feedback buffers is made active by
calling:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
void vkCmdBeginTransformFeedback2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterRange,
    uint32_t                                    counterRangeCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstCounterRange` is the index of the first transform feedback
buffer corresponding to `pCounterInfos`[0].

* 
`counterRangeCount` is the size of the `pCounterRanges` array.

* 
`pCounterInfos` is `NULL` or a pointer to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures defining memory
ranges containing counters used to resume transform feedback from a
previous location.

If `pCounterInfos` is `NULL`, it is equivalent to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures with each element
having a `addressRange.size` of 0.

If the `addressRange.size` of an element of `pCounterInfos` at index
i is 0, transform feedback data written to `XfbBuffer` with a
`XFB` `Buffer` `Number` equal to the sum of i and
`firstCounterRange` will be written starting at an offset of 0 in the
bound transform feedback buffer.
If the `addressRange.size` of an element of `pCounterInfos` at index
i is not 0, it will instead be written starting at an offset equal to
the 32-bit value found at `pCounterInfos`[i].addressRange.address.

The active transform feedback buffers will capture primitives emitted from
the corresponding `XfbBuffer` in the bound graphics pipeline.
Any `XfbBuffer` emitted that does not output to an active transform
feedback buffer will not be captured.

Valid Usage

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-transformFeedback-02366) VUID-vkCmdBeginTransformFeedback2EXT-transformFeedback-02366

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-02367) VUID-vkCmdBeginTransformFeedback2EXT-None-02367

Transform feedback **must** not be active

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02368) VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02368

`firstCounterRange` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02369) VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02369

The sum of `firstCounterRange` and `counterRangeCount` **must** be less
than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-09630) VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-09630

The sum of `firstCounterRange` and `counterRangeCount` **must** be less
than or equal to the number of transform feedback buffers bound by
[vkCmdBindTransformFeedbackBuffers2EXT](#vkCmdBindTransformFeedbackBuffers2EXT)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-06233) VUID-vkCmdBeginTransformFeedback2EXT-None-06233

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid graphics pipeline **must** be bound to
[VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-04128) VUID-vkCmdBeginTransformFeedback2EXT-None-04128

The last
[pre-rasterization shader    stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) of the bound graphics pipeline **must** have been declared with the
`Xfb` execution mode

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-02373) VUID-vkCmdBeginTransformFeedback2EXT-None-02373

Transform feedback **must** not be made active in a render pass instance
with multiview enabled

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-10656) VUID-vkCmdBeginTransformFeedback2EXT-None-10656

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13093) VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13093

Each element of `pCounterInfos` **must** have a `addressRange.size`
that is either 0 or greater than or equal to 4

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13094) VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13094

For each element of `pCounterInfos` with a non-zero address, the
buffer the address was queried from **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-parameter) VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-parameter) VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-parameter

 If `counterRangeCount` is not `0`, and `pCounterInfos` is not `NULL`, `pCounterInfos` **must** be a valid pointer to an array of `counterRangeCount` valid [VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-recording) VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-cmdpool) VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-renderpass) VUID-vkCmdBeginTransformFeedback2EXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-videocoding) VUID-vkCmdBeginTransformFeedback2EXT-videocoding

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

vkCmdBeginTransformFeedback2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Transform feedback for specific transform feedback buffers is made inactive
by calling:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
void vkCmdEndTransformFeedback2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterRange,
    uint32_t                                    counterRangeCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstCounterBuffer` is the index of the first transform feedback
buffer corresponding to `pCounterInfos`[0].

* 
`counterRangeCount` is the size of the `pCounterInfos` array.

* 
`pCounterInfos` is `NULL` or a pointer to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures defining memory
ranges used to write counters used to later resume transform feedback.

If `pCounterInfos` is `NULL`, it is equivalent to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures with each element
having a `addressRange.size` of 0.

If the `addressRange.size` of an element of `pCounterInfos` at index
i is 0, no data is written to the address range.
If the `addressRange.size` of an element of `pCounterInfos` at index
i is not 0, the byte offset, where the next vertex data would be
written to in the transform feedback buffer at a binding equal to the sum of
i and `firstCounterBuffer`, is written to that range’s
`address`.

Valid Usage

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-transformFeedback-02374) VUID-vkCmdEndTransformFeedback2EXT-transformFeedback-02374

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-None-02375) VUID-vkCmdEndTransformFeedback2EXT-None-02375

Transform feedback **must** be active

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02376) VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02376

`firstCounterBuffer` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02377) VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02377

The sum of `firstCounterBuffer` and `counterRangeCount` **must** be
less than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-None-10657) VUID-vkCmdEndTransformFeedback2EXT-None-10657

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13095) VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13095

Each element of `pCounterInfos` **must** have a `addressRange.size`
that is either 0 or greater than or equal to 4

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13096) VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13096

For each element of `pCounterInfos` with a non-zero address, the
buffer the address was queried from **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-parameter) VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-parameter) VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-parameter

 If `counterRangeCount` is not `0`, and `pCounterInfos` is not `NULL`, `pCounterInfos` **must** be a valid pointer to an array of `counterRangeCount` valid [VkBindTransformFeedbackBuffer2InfoEXT](#VkBindTransformFeedbackBuffer2InfoEXT) structures

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-recording) VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-cmdpool) VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-renderpass) VUID-vkCmdEndTransformFeedback2EXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-videocoding) VUID-vkCmdEndTransformFeedback2EXT-videocoding

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

vkCmdEndTransformFeedback2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Transform feedback for specific transform feedback buffers is made active by
calling:

|  | This functionality is superseded by [vkCmdBeginTransformFeedback2EXT](#vkCmdBeginTransformFeedback2EXT). See [Legacy Functionality](../appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_EXT_transform_feedback
void vkCmdBeginTransformFeedbackEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterBuffer,
    uint32_t                                    counterBufferCount,
    const VkBuffer*                             pCounterBuffers,
    const VkDeviceSize*                         pCounterBufferOffsets);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstCounterBuffer` is the index of the first transform feedback
buffer corresponding to `pCounterBuffers`[0] and
`pCounterBufferOffsets`[0].

* 
`counterBufferCount` is the size of the `pCounterBuffers` and
`pCounterBufferOffsets` arrays.

* 
`pCounterBuffers` is `NULL` or a pointer to an array of
[VkBuffer](resources.html#VkBuffer) handles to counter buffers.
Each buffer contains a 4 byte integer value representing the byte offset
from the start of the corresponding transform feedback buffer from where
to start capturing vertex data.
If the byte offset stored to the counter buffer location was done using
[vkCmdEndTransformFeedbackEXT](#vkCmdEndTransformFeedbackEXT) it can be used to resume transform
feedback from the previous location.
In that case, a pipeline barrier is required between the calls to
`vkCmdEndTransformFeedbackEXT` and
`vkCmdBeginTransformFeedbackEXT`, with
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits) as the source and
destination stages,
[VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](synchronization.html#VkAccessFlagBits) as the source
access and [VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](synchronization.html#VkAccessFlagBits) as
the destination access.
If `pCounterBuffers` is `NULL`, then transform feedback will start
capturing vertex data to byte offset zero in all bound transform
feedback buffers.
For each element of `pCounterBuffers` that is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
transform feedback will start capturing vertex data to byte zero in the
corresponding bound transform feedback buffer.

* 
`pCounterBufferOffsets` is `NULL` or a pointer to an array of
`VkDeviceSize` values specifying offsets within each of the
`pCounterBuffers` where the counter values were previously written.
The location in each counter buffer at these offsets **must** be large
enough to contain 4 bytes of data.
This data is the number of bytes captured by the previous transform
feedback to this buffer.
If `pCounterBufferOffsets` is `NULL`, then it is assumed the offsets
are zero.

The active transform feedback buffers will capture primitives emitted from
the corresponding `XfbBuffer` in the bound graphics pipeline.
Any `XfbBuffer` emitted that does not output to an active transform
feedback buffer will not be captured.

Valid Usage

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-transformFeedback-02366) VUID-vkCmdBeginTransformFeedbackEXT-transformFeedback-02366

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-None-02367) VUID-vkCmdBeginTransformFeedbackEXT-None-02367

Transform feedback **must** not be active

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-firstCounter-02368) VUID-vkCmdBeginTransformFeedbackEXT-firstCounter-02368

`firstCounterBuffer` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-firstCounter-02369) VUID-vkCmdBeginTransformFeedbackEXT-firstCounter-02369

The sum of `firstCounterBuffer` and `counterBufferCount` **must** be less
than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-firstCounter-09630) VUID-vkCmdBeginTransformFeedbackEXT-firstCounter-09630

The sum of `firstCounterBuffer` and `counterBufferCount` **must** be less
than or equal to the number of transform feedback buffers bound by
[vkCmdBindTransformFeedbackBuffersEXT](#vkCmdBindTransformFeedbackBuffersEXT)

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-None-06233) VUID-vkCmdBeginTransformFeedbackEXT-None-06233

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid graphics pipeline **must** be bound to
[VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-None-04128) VUID-vkCmdBeginTransformFeedbackEXT-None-04128

The last
[pre-rasterization shader    stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) of the bound graphics pipeline **must** have been declared with the
`Xfb` execution mode

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-None-02373) VUID-vkCmdBeginTransformFeedbackEXT-None-02373

Transform feedback **must** not be made active in a render pass instance
with multiview enabled

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-None-10656) VUID-vkCmdBeginTransformFeedbackEXT-None-10656

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-counterBufferCount-02607) VUID-vkCmdBeginTransformFeedbackEXT-counterBufferCount-02607

If `counterBufferCount` is not `0`, and `pCounterBuffers` is not
`NULL`, `pCounterBuffers` **must** be a valid pointer to an array of
`counterBufferCount` `VkBuffer` handles that are either valid or
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-pCounterBufferOffsets-02370) VUID-vkCmdBeginTransformFeedbackEXT-pCounterBufferOffsets-02370

For each buffer handle in the array, if it is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
it **must** reference a buffer large enough to hold 4 bytes at the
corresponding offset from the `pCounterBufferOffsets` array

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-pCounterBuffer-02371) VUID-vkCmdBeginTransformFeedbackEXT-pCounterBuffer-02371

If `pCounterBuffer` is `NULL`, then `pCounterBufferOffsets`
**must** also be `NULL`

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-pCounterBuffers-02372) VUID-vkCmdBeginTransformFeedbackEXT-pCounterBuffers-02372

For each buffer handle in the `pCounterBuffers` array that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) it **must** have been with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-commandBuffer-parameter) VUID-vkCmdBeginTransformFeedbackEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-pCounterBufferOffsets-parameter) VUID-vkCmdBeginTransformFeedbackEXT-pCounterBufferOffsets-parameter

 If `counterBufferCount` is not `0`, and `pCounterBufferOffsets` is not `NULL`, `pCounterBufferOffsets` **must** be a valid pointer to an array of `counterBufferCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-commandBuffer-recording) VUID-vkCmdBeginTransformFeedbackEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-commandBuffer-cmdpool) VUID-vkCmdBeginTransformFeedbackEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-renderpass) VUID-vkCmdBeginTransformFeedbackEXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-videocoding) VUID-vkCmdBeginTransformFeedbackEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginTransformFeedbackEXT-commonparent) VUID-vkCmdBeginTransformFeedbackEXT-commonparent

 Both of `commandBuffer`, and the elements of `pCounterBuffers` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

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

vkCmdBeginTransformFeedbackEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Transform feedback for specific transform feedback buffers is made inactive
by calling:

|  | This functionality is superseded by [vkCmdEndTransformFeedback2EXT](#vkCmdEndTransformFeedback2EXT). See [Legacy Functionality](../appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_EXT_transform_feedback
void vkCmdEndTransformFeedbackEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterBuffer,
    uint32_t                                    counterBufferCount,
    const VkBuffer*                             pCounterBuffers,
    const VkDeviceSize*                         pCounterBufferOffsets);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstCounterBuffer` is the index of the first transform feedback
buffer corresponding to `pCounterBuffers`[0] and
`pCounterBufferOffsets`[0].

* 
`counterBufferCount` is the size of the `pCounterBuffers` and
`pCounterBufferOffsets` arrays.

* 
`pCounterBuffers` is `NULL` or a pointer to an array of
[VkBuffer](resources.html#VkBuffer) handles to counter buffers.
The counter buffers are used to record the current byte positions of
each transform feedback buffer where the next vertex output data would
be captured.
This **can** be used by a subsequent [vkCmdBeginTransformFeedbackEXT](#vkCmdBeginTransformFeedbackEXT)
call to resume transform feedback capture from this position.
It can also be used by [vkCmdDrawIndirectByteCountEXT](drawing.html#vkCmdDrawIndirectByteCountEXT) to determine
the vertex count of the draw call.

* 
`pCounterBufferOffsets` is `NULL` or a pointer to an array of
`VkDeviceSize` values specifying offsets within each of the
`pCounterBuffers` where the counter values can be written.
The location in each counter buffer at these offsets **must** be large
enough to contain 4 bytes of data.
The data stored at this location is the byte offset from the start of
the transform feedback buffer binding where the next vertex data would
be written.
If `pCounterBufferOffsets` is `NULL`, then it is assumed the offsets
are zero.

Valid Usage

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-transformFeedback-02374) VUID-vkCmdEndTransformFeedbackEXT-transformFeedback-02374

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-None-02375) VUID-vkCmdEndTransformFeedbackEXT-None-02375

Transform feedback **must** be active

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-firstCounterBuffer-02376) VUID-vkCmdEndTransformFeedbackEXT-firstCounterBuffer-02376

`firstCounterBuffer` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-firstCounterBuffer-02377) VUID-vkCmdEndTransformFeedbackEXT-firstCounterBuffer-02377

The sum of `firstCounterBuffer` and `counterBufferCount` **must** be
less than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-None-10657) VUID-vkCmdEndTransformFeedbackEXT-None-10657

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-counterBufferCount-02608) VUID-vkCmdEndTransformFeedbackEXT-counterBufferCount-02608

If `counterBufferCount` is not `0`, and `pCounterBuffers` is not
`NULL`, `pCounterBuffers` **must** be a valid pointer to an array of
`counterBufferCount` `VkBuffer` handles that are either valid or
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-pCounterBufferOffsets-02378) VUID-vkCmdEndTransformFeedbackEXT-pCounterBufferOffsets-02378

For each buffer handle in the array, if it is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
it **must** reference a buffer large enough to hold 4 bytes at the
corresponding offset from the `pCounterBufferOffsets` array

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-pCounterBuffer-02379) VUID-vkCmdEndTransformFeedbackEXT-pCounterBuffer-02379

If `pCounterBuffer` is `NULL`, then `pCounterBufferOffsets`
**must** also be `NULL`

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-pCounterBuffers-02380) VUID-vkCmdEndTransformFeedbackEXT-pCounterBuffers-02380

For each buffer handle in the `pCounterBuffers` array that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) it **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-commandBuffer-parameter) VUID-vkCmdEndTransformFeedbackEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-pCounterBufferOffsets-parameter) VUID-vkCmdEndTransformFeedbackEXT-pCounterBufferOffsets-parameter

 If `counterBufferCount` is not `0`, and `pCounterBufferOffsets` is not `NULL`, `pCounterBufferOffsets` **must** be a valid pointer to an array of `counterBufferCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-commandBuffer-recording) VUID-vkCmdEndTransformFeedbackEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-commandBuffer-cmdpool) VUID-vkCmdEndTransformFeedbackEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-renderpass) VUID-vkCmdEndTransformFeedbackEXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-videocoding) VUID-vkCmdEndTransformFeedbackEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndTransformFeedbackEXT-commonparent) VUID-vkCmdEndTransformFeedbackEXT-commonparent

 Both of `commandBuffer`, and the elements of `pCounterBuffers` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

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

vkCmdEndTransformFeedbackEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Each primitive sent to a given viewport has a swizzle and **optional** negation
applied to its clip coordinates.
The swizzle that is applied depends on the viewport index, and is controlled
by the `VkPipelineViewportSwizzleStateCreateInfoNV` pipeline state:

// Provided by VK_NV_viewport_swizzle
typedef struct VkPipelineViewportSwizzleStateCreateInfoNV {
    VkStructureType                                sType;
    const void*                                    pNext;
    VkPipelineViewportSwizzleStateCreateFlagsNV    flags;
    uint32_t                                       viewportCount;
    const VkViewportSwizzleNV*                     pViewportSwizzles;
} VkPipelineViewportSwizzleStateCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`viewportCount` is the number of viewport swizzles used by the
pipeline.

* 
`pViewportSwizzles` is a pointer to an array of
[VkViewportSwizzleNV](#VkViewportSwizzleNV) structures, defining the viewport swizzles.

Valid Usage

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-01215) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-01215

`viewportCount` **must** be greater than or equal to the
`viewportCount` set in `VkPipelineViewportStateCreateInfo`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_SWIZZLE_STATE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-flags-zerobitmask) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-pViewportSwizzles-parameter) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-pViewportSwizzles-parameter

 `pViewportSwizzles` **must** be a valid pointer to an array of `viewportCount` valid [VkViewportSwizzleNV](#VkViewportSwizzleNV) structures

* 
[](#VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-arraylength) VUID-VkPipelineViewportSwizzleStateCreateInfoNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)

// Provided by VK_NV_viewport_swizzle
typedef VkFlags VkPipelineViewportSwizzleStateCreateFlagsNV;

`VkPipelineViewportSwizzleStateCreateFlagsNV` is a bitmask type for
setting a mask, but is currently reserved for future use.

The `VkPipelineViewportSwizzleStateCreateInfoNV` state is set by adding
this structure to the `pNext` chain of a
`VkPipelineViewportStateCreateInfo` structure and setting the graphics
pipeline state with [vkCreateGraphicsPipelines](pipelines.html#vkCreateGraphicsPipelines).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the viewport swizzle state,
call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_viewport_swizzle, VK_EXT_shader_object with VK_NV_viewport_swizzle
void vkCmdSetViewportSwizzleNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkViewportSwizzleNV*                  pViewportSwizzles);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose parameters
are updated by the command.

* 
`viewportCount` is the number of viewports whose parameters are
updated by the command.

* 
`pViewportSwizzles` is a pointer to an array of
[VkViewportSwizzleNV](#VkViewportSwizzleNV) structures specifying viewport swizzles.

This command sets the viewport swizzle state for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportSwizzleStateCreateInfoNV](#VkPipelineViewportSwizzleStateCreateInfoNV)::`viewportCount`, and
[VkPipelineViewportSwizzleStateCreateInfoNV](#VkPipelineViewportSwizzleStateCreateInfoNV)::`pViewportSwizzles`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportSwizzleNV-None-09423) VUID-vkCmdSetViewportSwizzleNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ViewportSwizzle`](#features-extendedDynamicState3ViewportSwizzle) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportSwizzleNV-commandBuffer-parameter) VUID-vkCmdSetViewportSwizzleNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetViewportSwizzleNV-pViewportSwizzles-parameter) VUID-vkCmdSetViewportSwizzleNV-pViewportSwizzles-parameter

 `pViewportSwizzles` **must** be a valid pointer to an array of `viewportCount` valid [VkViewportSwizzleNV](#VkViewportSwizzleNV) structures

* 
[](#VUID-vkCmdSetViewportSwizzleNV-commandBuffer-recording) VUID-vkCmdSetViewportSwizzleNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportSwizzleNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportSwizzleNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetViewportSwizzleNV-videocoding) VUID-vkCmdSetViewportSwizzleNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportSwizzleNV-viewportCount-arraylength) VUID-vkCmdSetViewportSwizzleNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewportSwizzleNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Each viewport specified from 0 to `viewportCount` - 1 has its x,y,z,w
swizzle state set to the corresponding `x`, `y`, `z` and `w`
in the [VkViewportSwizzleNV](#VkViewportSwizzleNV) structure.
Each component is of type [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV), which
determines the type of swizzle for that component.
The value of `x` computes the new x component of the position as:

if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_X_NV) x' = x;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_X_NV) x' = -x;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Y_NV) x' = y;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_Y_NV) x' = -y;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Z_NV) x' = z;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_Z_NV) x' = -z;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_W_NV) x' = w;
if (x == VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_W_NV) x' = -w;

Similar selections are performed for the `y`, `z`, and `w`
coordinates.
This swizzling is applied before clipping and perspective divide.
If the swizzle for an active viewport index is not specified, the swizzle
for `x` is [VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_X_NV](#VkViewportCoordinateSwizzleNV), `y`
is [VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Y_NV](#VkViewportCoordinateSwizzleNV), `z` is
[VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Z_NV](#VkViewportCoordinateSwizzleNV) and `w` is
[VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_W_NV](#VkViewportCoordinateSwizzleNV).

Viewport swizzle parameters are specified by setting the `pNext` pointer
of `VkGraphicsPipelineCreateInfo` to point to a
`VkPipelineViewportSwizzleStateCreateInfoNV` structure.
[VkPipelineViewportSwizzleStateCreateInfoNV](#VkPipelineViewportSwizzleStateCreateInfoNV) uses
`VkViewportSwizzleNV` to set the viewport swizzle parameters.

The `VkViewportSwizzleNV` structure is defined as:

// Provided by VK_NV_viewport_swizzle
typedef struct VkViewportSwizzleNV {
    VkViewportCoordinateSwizzleNV    x;
    VkViewportCoordinateSwizzleNV    y;
    VkViewportCoordinateSwizzleNV    z;
    VkViewportCoordinateSwizzleNV    w;
} VkViewportSwizzleNV;

* 
`x` is a [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value specifying the
swizzle operation to apply to the x component of the primitive

* 
`y` is a [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value specifying the
swizzle operation to apply to the y component of the primitive

* 
`z` is a [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value specifying the
swizzle operation to apply to the z component of the primitive

* 
`w` is a [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value specifying the
swizzle operation to apply to the w component of the primitive

Valid Usage (Implicit)

* 
[](#VUID-VkViewportSwizzleNV-x-parameter) VUID-VkViewportSwizzleNV-x-parameter

 `x` **must** be a valid [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value

* 
[](#VUID-VkViewportSwizzleNV-y-parameter) VUID-VkViewportSwizzleNV-y-parameter

 `y` **must** be a valid [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value

* 
[](#VUID-VkViewportSwizzleNV-z-parameter) VUID-VkViewportSwizzleNV-z-parameter

 `z` **must** be a valid [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value

* 
[](#VUID-VkViewportSwizzleNV-w-parameter) VUID-VkViewportSwizzleNV-w-parameter

 `w` **must** be a valid [VkViewportCoordinateSwizzleNV](#VkViewportCoordinateSwizzleNV) value

Possible values of the [VkViewportSwizzleNV](#VkViewportSwizzleNV)::`x`, `y`, `z`,
and `w` members, specifying swizzling of the corresponding components of
primitives, are:

// Provided by VK_NV_viewport_swizzle
typedef enum VkViewportCoordinateSwizzleNV {
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_X_NV = 0,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_X_NV = 1,
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Y_NV = 2,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_Y_NV = 3,
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Z_NV = 4,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_Z_NV = 5,
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_W_NV = 6,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_W_NV = 7,
} VkViewportCoordinateSwizzleNV;

These values are described in detail in [Viewport Swizzle](#vertexpostproc-viewport-swizzle).

*Flat shading* a vertex output attribute means to assign all vertices of the
primitive the same value for that output.
The output values assigned are those of the *provoking vertex* of the
primitive.
Flat shading is applied to those vertex attributes that
[match](interfaces.html#interfaces-iointerfaces-matching) fragment input attributes which
are decorated as `Flat`.

If neither
[mesh](VK_NV_mesh_shader/mesh.html#mesh),
[geometry](geometry.html#geometry) nor [tessellation shading](tessellation.html#tessellation) is active,
the provoking vertex is determined by the [primitive topology](drawing.html#drawing-primitive-topologies) defined by
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)::`topology` used to execute
the [drawing command](drawing.html#drawing).

If a shader using `MeshNV` `Execution` `Model` is active, the provoking
vertex is determined by the [primitive topology](drawing.html#drawing-primitive-topologies) defined by the [`OutputPoints`](drawing.html#drawing-point-lists),
[`OutputLinesNV`](drawing.html#drawing-line-lists), or [`OutputTrianglesNV`](drawing.html#drawing-triangle-lists) execution mode.

If a shader using `MeshEXT` `Execution` `Model` is active, the provoking
vertex is determined by the [primitive topology](drawing.html#drawing-primitive-topologies) defined by the [`OutputPoints`](drawing.html#drawing-point-lists),
[`OutputLinesEXT`](drawing.html#drawing-line-lists), or [`OutputTrianglesEXT`](drawing.html#drawing-triangle-lists) execution mode.

If [geometry shading](geometry.html#geometry) is active, the provoking vertex is
determined by the [primitive topology](drawing.html#drawing-primitive-topologies)
defined by the [`OutputPoints`](drawing.html#drawing-point-lists),
[`OutputLineStrip`](drawing.html#drawing-line-strips), or [`OutputTriangleStrip`](drawing.html#drawing-triangle-strips) execution mode.

If [tessellation shading](tessellation.html#tessellation) is active but [geometry shading](geometry.html#geometry) is not, the provoking vertex **may** be any of the vertices in each
primitive.

For a given primitive topology, the pipeline’s provoking vertex mode
determines which vertex is the provoking vertex.
To specify the provoking vertex mode, include a
`VkPipelineRasterizationProvokingVertexStateCreateInfoEXT` structure in
the [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)::`pNext` chain when
creating the pipeline.

The `VkPipelineRasterizationProvokingVertexStateCreateInfoEXT` structure
is defined as:

// Provided by VK_EXT_provoking_vertex
typedef struct VkPipelineRasterizationProvokingVertexStateCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkProvokingVertexModeEXT    provokingVertexMode;
} VkPipelineRasterizationProvokingVertexStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`provokingVertexMode` is a [VkProvokingVertexModeEXT](#VkProvokingVertexModeEXT) value
selecting the provoking vertex mode.

If this structure is not provided when creating the pipeline, the pipeline
will use the [VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](#VkProvokingVertexModeEXT) mode.

If the [`provokingVertexModePerPipeline`](limits.html#limits-provokingVertexModePerPipeline) limit is [VK_FALSE](fundamentals.html#VK_FALSE), then all
pipelines bound within a render pass instance **must** have the same
`provokingVertexMode`.

Valid Usage

* 
[](#VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-04883) VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-04883

If `provokingVertexMode` is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](#VkProvokingVertexModeEXT), then the
[`provokingVertexLast`](features.html#features-provokingVertexLast) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_PROVOKING_VERTEX_STATE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-parameter) VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-parameter

 `provokingVertexMode` **must** be a valid [VkProvokingVertexModeEXT](#VkProvokingVertexModeEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)

Possible values of
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT)::`provokingVertexMode`
are:

// Provided by VK_EXT_provoking_vertex
typedef enum VkProvokingVertexModeEXT {
    VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT = 0,
    VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT = 1,
} VkProvokingVertexModeEXT;

* 
[VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](#VkProvokingVertexModeEXT) specifies that the
provoking vertex is the first non-adjacency vertex in the list of
vertices used by a primitive.

* 
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](#VkProvokingVertexModeEXT) specifies that the
provoking vertex is the last non-adjacency vertex in the list of
vertices used by a primitive.

These modes are described more precisely in
[Primitive Topologies](drawing.html#drawing-primitive-topologies).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`provokingVertexMode` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_provoking_vertex, VK_EXT_provoking_vertex with VK_EXT_shader_object
void vkCmdSetProvokingVertexModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkProvokingVertexModeEXT                    provokingVertexMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`provokingVertexMode` specifies the `provokingVertexMode` state.

This command sets the `provokingVertexMode` state for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT)::`provokingVertexMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-None-09423) VUID-vkCmdSetProvokingVertexModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ProvokingVertexMode`](#features-extendedDynamicState3ProvokingVertexMode) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-07447) VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-07447

If `provokingVertexMode` is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](#VkProvokingVertexModeEXT), then the
[`provokingVertexLast`](features.html#features-provokingVertexLast) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-parameter) VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-parameter) VUID-vkCmdSetProvokingVertexModeEXT-provokingVertexMode-parameter

 `provokingVertexMode` **must** be a valid [VkProvokingVertexModeEXT](#VkProvokingVertexModeEXT) value

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-recording) VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetProvokingVertexModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetProvokingVertexModeEXT-videocoding) VUID-vkCmdSetProvokingVertexModeEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetProvokingVertexModeEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Primitives are culled against the *cull volume* and then clipped to the
*clip volume*.
In clip coordinates, the *view volume* is defined by:

  

  

where
if
[VkPipelineViewportDepthClipControlCreateInfoEXT](#VkPipelineViewportDepthClipControlCreateInfoEXT)::`negativeOneToOne`
is [VK_TRUE](fundamentals.html#VK_TRUE) zm is equal to -wc otherwise
zm is equal to zero.

This view volume **can** be further restricted by as many as
`VkPhysicalDeviceLimits`::`maxClipDistances` application-defined
half-spaces.

The cull volume is the intersection of up to
`VkPhysicalDeviceLimits`::`maxCullDistances` application-defined
half-spaces (if no application-defined cull half-spaces are enabled, culling
against the cull volume is skipped).

A shader **must** write a single cull distance for each enabled cull half-space
to elements of the `CullDistance` array.
If the cull distance for any enabled cull half-space is negative for all of
the vertices of the primitive under consideration, the primitive is
discarded.
Otherwise the primitive is clipped against the clip volume as defined below.

The clip volume is the intersection of up to
`VkPhysicalDeviceLimits`::`maxClipDistances` application-defined
half-spaces with the view volume (if no application-defined clip half-spaces
are enabled, the clip volume is the view volume).

A shader **must** write a single clip distance for each enabled clip half-space
to elements of the `ClipDistance` array.
Clip half-space i is then given by the set of points satisfying the
inequality

ci(**P**) ≥ 0

where ci(**P**) is the clip distance i at point **P**.
For point primitives, ci(**P**) is simply the clip distance for the
vertex in question.
For line and triangle primitives, per-vertex clip distances are interpolated
using a weighted mean, with weights derived according to the algorithms
described in sections [Basic Line Segment Rasterization](primsrast.html#primsrast-lines-basic) and [Basic Polygon Rasterization](primsrast.html#primsrast-polygons-basic), using the perspective interpolation equations.

The number of application-defined clip and cull half-spaces that are enabled
is determined by the explicit size of the built-in arrays `ClipDistance`
and `CullDistance`, respectively, declared as an output in the interface
of the entry point of the final shader stage before clipping.

If [VkPipelineRasterizationDepthClipStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT) is present in
the graphics pipeline state then depth clipping is disabled if
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT)::`depthClipEnable`
is [VK_FALSE](fundamentals.html#VK_FALSE).
Otherwise, if [VkPipelineRasterizationDepthClipStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT) is
not present, depth clipping is disabled when
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)::`depthClampEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE).

To [dynamically set](pipelines.html#pipelines-dynamic-state) enable or disable depth
clamping, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetDepthClampEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthClampEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthClampEnable` specifies whether depth clamping is enabled.

This command sets whether depth clamping is enabled or disabled for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)::`depthClampEnable` value
used to create the currently active pipeline.

If the depth clamping state is changed dynamically, and the pipeline was not
created with [VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](pipelines.html#VkDynamicState) enabled, then
depth clipping is enabled when depth clamping is disabled and vice versa.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-None-09423) VUID-vkCmdSetDepthClampEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3DepthClampEnable`](#features-extendedDynamicState3DepthClampEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetDepthClampEnableEXT-depthClamp-07449) VUID-vkCmdSetDepthClampEnableEXT-depthClamp-07449

If the [`depthClamp`](features.html#features-depthClamp) feature is not enabled,
`depthClampEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-recording) VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClampEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDepthClampEnableEXT-videocoding) VUID-vkCmdSetDepthClampEnableEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDepthClampEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) enable or disable depth
clipping, call:

// Provided by VK_EXT_depth_clip_enable with VK_EXT_extended_dynamic_state3, VK_EXT_depth_clip_enable with VK_EXT_shader_object
void vkCmdSetDepthClipEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthClipEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthClipEnable` specifies whether depth clipping is enabled.

This command sets whether depth clipping is enabled or disabled for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT)::`depthClipEnable`
value used to create the currently active pipeline, or by the inverse of
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)::`depthClampEnable` if
`VkPipelineRasterizationDepthClipStateCreateInfoEXT` is not specified.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-None-09423) VUID-vkCmdSetDepthClipEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3DepthClipEnable`](#features-extendedDynamicState3DepthClipEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetDepthClipEnableEXT-depthClipEnable-07451) VUID-vkCmdSetDepthClipEnableEXT-depthClipEnable-07451

The [`depthClipEnable`](features.html#features-depthClipEnable) feature **must** be
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-recording) VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClipEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDepthClipEnableEXT-videocoding) VUID-vkCmdSetDepthClipEnableEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDepthClipEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

When depth clipping is disabled, the plane equation

zm ≤ zc ≤ wc

(see the clip volume definition above) is ignored by view volume clipping
(effectively, there is no near or far plane clipping).

If the primitive under consideration is a point or line segment, then
clipping passes it unchanged if its vertices lie entirely within the clip
volume.

Possible values of
[VkPhysicalDevicePointClippingProperties](limits.html#VkPhysicalDevicePointClippingProperties)::`pointClippingBehavior`,
specifying clipping behavior of a point primitive whose vertex lies outside
the clip volume, are:

// Provided by VK_VERSION_1_1
typedef enum VkPointClippingBehavior {
    VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES = 0,
    VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY = 1,
  // Provided by VK_KHR_maintenance2
    VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES_KHR = VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES,
  // Provided by VK_KHR_maintenance2
    VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY_KHR = VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY,
} VkPointClippingBehavior;

// Provided by VK_KHR_maintenance2
// Equivalent to VkPointClippingBehavior
typedef VkPointClippingBehavior VkPointClippingBehaviorKHR;

* 
[VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES](#VkPointClippingBehaviorKHR) specifies that the
primitive is discarded if the vertex lies outside any clip plane,
including the planes bounding the view volume.

* 
[VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY](#VkPointClippingBehaviorKHR) specifies that
the primitive is discarded only if the vertex lies outside any user clip
plane.

If either of a line segment’s vertices lie outside of the clip volume, the
line segment **may** be clipped, with new vertex coordinates computed for each
vertex that lies outside the clip volume.
A clipped line segment endpoint lies on both the original line segment and
the boundary of the clip volume.

This clipping produces a value, 0 ≤ t ≤ 1, for each clipped
vertex.
If the coordinates of a clipped vertex are **P** and the unclipped
line segment’s vertex coordinates are **P**1 and **P**2,
then t satisfies the following equation

**P** = t **P**1 +  (1-t) **P**2.

t is used to clip vertex output attributes as described in
[Clipping Shader Outputs](#vertexpostproc-clipping-shader-outputs).

If the primitive is a polygon, it passes unchanged if every one of its edges
lies entirely inside the clip volume, and is either clipped or discarded
otherwise.
If the edges of the polygon intersect the boundary of the clip volume, the
intersecting edges are reconnected by new edges that lie along the boundary
of the clip volume - in some cases requiring the introduction of new
vertices into a polygon.

If a polygon intersects an edge of the clip volume’s boundary, the clipped
polygon **must** include a point on this boundary edge.

Primitives rendered with application-defined half-spaces **must** satisfy a
complementarity criterion.
Suppose a series of primitives is drawn where each vertex i has a
single specified clip distance di (or a number of similarly
specified clip distances, if multiple half-spaces are enabled).
Next, suppose that the same series of primitives are drawn again with each
such clip distance replaced by -di (and the graphics pipeline is
otherwise the same).
In this case, primitives **must** not be missing any pixels, and pixels **must**
not be drawn twice in regions where those primitives are cut by the clip
planes.

The `VkPipelineViewportDepthClipControlCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_depth_clip_control
typedef struct VkPipelineViewportDepthClipControlCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           negativeOneToOne;
} VkPipelineViewportDepthClipControlCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`negativeOneToOne` sets the zm in the *view volume* to
-wc

Valid Usage

* 
[](#VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-negativeOneToOne-06470) VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-negativeOneToOne-06470

If the [`depthClipControl`](features.html#features-depthClipControl) feature is
not enabled, `negativeOneToOne` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-sType-sType) VUID-VkPipelineViewportDepthClipControlCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLIP_CONTROL_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)

To [dynamically set](pipelines.html#pipelines-dynamic-state) `negativeOneToOne`,
call:

// Provided by VK_EXT_depth_clip_control with VK_EXT_extended_dynamic_state3, VK_EXT_depth_clip_control with VK_EXT_shader_object
void vkCmdSetDepthClipNegativeOneToOneEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    negativeOneToOne);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`negativeOneToOne` specifies the `negativeOneToOne` state.

This command sets the `negativeOneToOne` state for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportDepthClipControlCreateInfoEXT](#VkPipelineViewportDepthClipControlCreateInfoEXT)::`negativeOneToOne`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-None-09423) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3DepthClipNegativeOneToOne`](#features-extendedDynamicState3DepthClipNegativeOneToOne) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-depthClipControl-07453) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-depthClipControl-07453

The [`depthClipControl`](features.html#features-depthClipControl) feature **must**
be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-parameter) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-recording) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDepthClipNegativeOneToOneEXT-videocoding) VUID-vkCmdSetDepthClipNegativeOneToOneEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDepthClipNegativeOneToOneEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Next, vertex output attributes are clipped.
The output values associated with a vertex that lies within the clip volume
are unaffected by clipping.
If a primitive is clipped, however, the output values assigned to vertices
produced by clipping are clipped.

Let the output values assigned to the two vertices **P**1 and
**P**2 of an unclipped edge be **c**1 and **c**2.
The value of t (see [Primitive Clipping](#vertexpostproc-clipping))
for a clipped point **P** is used to obtain the output value
associated with **P** as

**c** = t **c**1 +  (1-t) **c**2.

(Multiplying an output value by a scalar means multiplying each of *x*, *y*,
*z*, and *w* by the scalar.)

Since this computation is performed in clip space before division by
wc, clipped output values are perspective-correct.

Polygon clipping creates a clipped vertex along an edge of the clip volume’s
boundary.
This situation is handled by noting that polygon clipping proceeds by
clipping against one half-space at a time.
Output value clipping is done in the same way, so that clipped points always
occur at the intersection of polygon edges (possibly already clipped) with
the clip volume’s boundary.

For vertex output attributes whose matching fragment input attributes are
decorated with `NoPerspective`, the value of t used to obtain the
output value associated with **P** will be adjusted to produce results
that vary linearly in framebuffer space.

Output attributes of integer or unsigned integer type **must** always be flat
shaded.
Flat shaded attributes are constant over the primitive being rasterized (see
[Basic Line Segment Rasterization](primsrast.html#primsrast-lines-basic) and
[Basic Polygon Rasterization](primsrast.html#primsrast-polygons-basic)), and no
interpolation is performed.
The output value **c** is taken from either **c**1 or
**c**2, since flat shading has already occurred and the two values
are identical.

If viewport **W** scaling is enabled, the **W** component of the clip coordinate
is modified by the provided coefficients from the corresponding viewport as
follows.

wc' = xcoeff xc +  ycoeff yc +  wc

The `VkPipelineViewportWScalingStateCreateInfoNV` structure is defined
as:

// Provided by VK_NV_clip_space_w_scaling
typedef struct VkPipelineViewportWScalingStateCreateInfoNV {
    VkStructureType                sType;
    const void*                    pNext;
    VkBool32                       viewportWScalingEnable;
    uint32_t                       viewportCount;
    const VkViewportWScalingNV*    pViewportWScalings;
} VkPipelineViewportWScalingStateCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewportWScalingEnable` controls whether viewport **W** scaling is
enabled.

* 
`viewportCount` is the number of viewports used by **W** scaling, and
**must** match the number of viewports in the pipeline if viewport **W**
scaling is enabled.

* 
`pViewportWScalings` is a pointer to an array of
[VkViewportWScalingNV](#VkViewportWScalingNV) structures defining the **W** scaling
parameters for the corresponding viewports.
If the viewport **W** scaling state is dynamic, this member is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportWScalingStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportWScalingStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_W_SCALING_STATE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineViewportWScalingStateCreateInfoNV-viewportCount-arraylength) VUID-VkPipelineViewportWScalingStateCreateInfoNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)

The `VkPipelineViewportWScalingStateCreateInfoNV` state is set by adding
this structure to the `pNext` chain of a
`VkPipelineViewportStateCreateInfo` structure and setting the graphics
pipeline state with [vkCreateGraphicsPipelines](pipelines.html#vkCreateGraphicsPipelines).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`viewportWScalingEnable` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_clip_space_w_scaling, VK_EXT_shader_object with VK_NV_clip_space_w_scaling
void vkCmdSetViewportWScalingEnableNV(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    viewportWScalingEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`viewportWScalingEnable` specifies the `viewportWScalingEnable`
state.

This command sets the `viewportWScalingEnable` state for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportWScalingStateCreateInfoNV](#VkPipelineViewportWScalingStateCreateInfoNV)::`viewportWScalingEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportWScalingEnableNV-None-09423) VUID-vkCmdSetViewportWScalingEnableNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ViewportWScalingEnable`](#features-extendedDynamicState3ViewportWScalingEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportWScalingEnableNV-commandBuffer-parameter) VUID-vkCmdSetViewportWScalingEnableNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetViewportWScalingEnableNV-commandBuffer-recording) VUID-vkCmdSetViewportWScalingEnableNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportWScalingEnableNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportWScalingEnableNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetViewportWScalingEnableNV-videocoding) VUID-vkCmdSetViewportWScalingEnableNV-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewportWScalingEnableNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the viewport **W** scaling
parameters, call:

// Provided by VK_NV_clip_space_w_scaling
void vkCmdSetViewportWScalingNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkViewportWScalingNV*                 pViewportWScalings);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose parameters
are updated by the command.

* 
`viewportCount` is the number of viewports whose parameters are
updated by the command.

* 
`pViewportWScalings` is a pointer to an array of
[VkViewportWScalingNV](#VkViewportWScalingNV) structures specifying viewport parameters.

The viewport parameters taken from element i of
`pViewportWScalings` replace the current state for the viewport index
`firstViewport` +  i, for i in [0,
`viewportCount`).

This command sets the viewport **W** scaling for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportWScalingStateCreateInfoNV](#VkPipelineViewportWScalingStateCreateInfoNV)::`pViewportWScalings`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportWScalingNV-firstViewport-01324) VUID-vkCmdSetViewportWScalingNV-firstViewport-01324

The sum of `firstViewport` and `viewportCount` **must** be between
`1` and [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxViewports`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportWScalingNV-commandBuffer-parameter) VUID-vkCmdSetViewportWScalingNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetViewportWScalingNV-pViewportWScalings-parameter) VUID-vkCmdSetViewportWScalingNV-pViewportWScalings-parameter

 `pViewportWScalings` **must** be a valid pointer to an array of `viewportCount` [VkViewportWScalingNV](#VkViewportWScalingNV) structures

* 
[](#VUID-vkCmdSetViewportWScalingNV-commandBuffer-recording) VUID-vkCmdSetViewportWScalingNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportWScalingNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportWScalingNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetViewportWScalingNV-videocoding) VUID-vkCmdSetViewportWScalingNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportWScalingNV-viewportCount-arraylength) VUID-vkCmdSetViewportWScalingNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewportWScalingNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Both [VkPipelineViewportWScalingStateCreateInfoNV](#VkPipelineViewportWScalingStateCreateInfoNV) and
[vkCmdSetViewportWScalingNV](#vkCmdSetViewportWScalingNV) use `VkViewportWScalingNV` to set the
viewport transformation parameters.

The `VkViewportWScalingNV` structure is defined as:

// Provided by VK_NV_clip_space_w_scaling
typedef struct VkViewportWScalingNV {
    float    xcoeff;
    float    ycoeff;
} VkViewportWScalingNV;

* 
`xcoeff` and `ycoeff` are the viewport’s W scaling factor for x
and y respectively.

*Clip coordinates* for a vertex result from shader execution, which yields a
vertex coordinate `Position`.

Perspective division on clip coordinates yields *normalized device
coordinates*, followed by a *viewport* transformation (see
[Controlling the Viewport](#vertexpostproc-viewport)) to convert these
coordinates into *framebuffer coordinates*.

If a vertex in clip coordinates has a position given by

  

  

then the vertex’s normalized device coordinates are

  

  

A *render pass transform* **can** be enabled for render pass instances.
The clip coordinates (xc, yc) that result from vertex shader
execution are transformed by a rotation of 0, 90, 180, or 270 degrees in the
XY plane, centered at the origin.

When *Render pass transform* is enabled, the transform applies to all
primitives for all subpasses of the render pass.
The transformed vertex in clip coordinates has a position given by

  

  

where

* 
*θ* is 0 degrees for
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)

* 
*θ* is 90 degrees for
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)

* 
*θ* is 180 degrees for
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)

* 
*θ* is 270 degrees for
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)

The transformed vertex’s normalized device coordinates are

  

  

When render pass transform is enabled for a render pass instance, the
following additional features are enabled:

* 
Each [VkViewport](#VkViewport) specified by either
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)::`pViewports` or
[vkCmdSetViewport](#vkCmdSetViewport) will have its width/height (px, py) and
its center (ox, oy) similarly transformed by the
implementation.

* 
Each scissor specified by
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)::`pScissors` or
[vkCmdSetScissor](fragops.html#vkCmdSetScissor) will have its (offsetx, offsety) and
(extentx, extenty) similarly transformed by the
implementation.

* 
The `renderArea` specified in
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](cmdbuffers.html#VkCommandBufferInheritanceRenderPassTransformInfoQCOM) and
[VkRenderPassBeginInfo](renderpass.html#VkRenderPassBeginInfo) will be similarly transformed by the
implementation.

* 
The (x, y) components of shader variables with built-in
decorations `FragCoord`, `SamplePosition`, or `PointCoord` will
be similarly transformed by the implementation.

* 
The (x,y) components of the `offset` operand of the
`InterpolateAtOffset` extended instruction will be similarly
transformed by the implementation.

* 
The values returned by SPIR-V [    derivative instructions](shaders.html#shaders-derivative-operations) `OpDPdx`, `OpDPdy`, `OpDPdxCourse`,
`OpDPdyCourse`, `OpDPdxFine`, `OpDPdyFine` will be similarly
transformed by the implementation.

The net result of the above, is that applications **can** act as if rendering
to a framebuffer oriented with the
[VkSurfaceCapabilitiesKHR](VK_KHR_surface/wsi.html#VkSurfaceCapabilitiesKHR)::`currentTransform`.
In other words, applications **can** act as if the presentation engine will be
performing the transformation of the swapchain image after rendering and
prior to presentation to the user.
In fact, the transformation of the various items cited above are being
handled by the implementation as the rendering takes place.

The viewport transformation is determined by the selected viewport’s width
and height in pixels, px and py, respectively, and its
center (ox, oy) (also in pixels), as well as its depth range min
and max determining a depth range scale value pz and a depth range
bias value oz (defined below).
The vertex’s framebuffer coordinates (xf, yf) and depth zf
are given by

xf = (px / 2) xd +  ox

yf = (py / 2) yd +  oy

zf = pz × zd +  oz

Multiple viewports are available, numbered zero up to
`VkPhysicalDeviceLimits`::`maxViewports` minus one.
The number of viewports used by a pipeline is controlled by the
`viewportCount` member of the `VkPipelineViewportStateCreateInfo`
structure used in pipeline creation.

xf and yf have limited precision, where the number of
fractional bits retained is specified by
`VkPhysicalDeviceLimits`::`subPixelPrecisionBits`.
When rasterizing [line segments](primsrast.html#primsrast-lines), the number of fractional
bits is specified by
`VkPhysicalDeviceLineRasterizationProperties`::`lineSubPixelPrecisionBits`.

The `VkPipelineViewportStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineViewportStateCreateInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkPipelineViewportStateCreateFlags    flags;
    uint32_t                              viewportCount;
    const VkViewport*                     pViewports;
    uint32_t                              scissorCount;
    const VkRect2D*                       pScissors;
} VkPipelineViewportStateCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`viewportCount` is the number of viewports used by the pipeline.

* 
`pViewports` is a pointer to an array of [VkViewport](#VkViewport)
structures, defining the viewport transforms.
If the viewport state is dynamic, this member is ignored.

* 
`scissorCount` is the number of [scissors](fragops.html#fragops-scissor) and
**must** match the number of viewports.

* 
`pScissors` is a pointer to an array of [VkRect2D](fundamentals.html#VkRect2D) structures
defining the rectangular bounds of the scissor for the corresponding
viewport.
If the scissor state is dynamic, this member is ignored.

Valid Usage

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportCount-01216) VUID-VkPipelineViewportStateCreateInfo-viewportCount-01216

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** not be greater than `1`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-01217) VUID-VkPipelineViewportStateCreateInfo-scissorCount-01217

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `scissorCount` **must** not be greater than `1`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportCount-01218) VUID-VkPipelineViewportStateCreateInfo-viewportCount-01218

`viewportCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-01219) VUID-VkPipelineViewportStateCreateInfo-scissorCount-01219

`scissorCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-x-02821) VUID-VkPipelineViewportStateCreateInfo-x-02821

The `x` and `y` members of `offset` member of any element of
`pScissors` **must** be greater than or equal to `0`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-offset-02822) VUID-VkPipelineViewportStateCreateInfo-offset-02822

Evaluation of (`offset.x` +  `extent.width`) **must** not
cause a signed integer addition overflow for any element of
`pScissors`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-offset-02823) VUID-VkPipelineViewportStateCreateInfo-offset-02823

Evaluation of (`offset.y` +  `extent.height`) **must**
not cause a signed integer addition overflow for any element of
`pScissors`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-04134) VUID-VkPipelineViewportStateCreateInfo-scissorCount-04134

If `scissorCount` and `viewportCount` are both not dynamic, then
`scissorCount` and `viewportCount` **must** be identical

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportCount-04135) VUID-VkPipelineViewportStateCreateInfo-viewportCount-04135

If the graphics pipeline is being created with
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](pipelines.html#VkDynamicState) set then `viewportCount`
**must** be `0`, otherwise
`viewportCount` **must** be greater than `0`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-scissorCount-04136) VUID-VkPipelineViewportStateCreateInfo-scissorCount-04136

If the graphics pipeline is being created with
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](pipelines.html#VkDynamicState) set then `scissorCount`
**must** be `0`, otherwise
`scissorCount` **must** be greater than `0`

* 
[](#VUID-VkPipelineViewportStateCreateInfo-viewportWScalingEnable-01726) VUID-VkPipelineViewportStateCreateInfo-viewportWScalingEnable-01726

If the `viewportWScalingEnable` member of a
[VkPipelineViewportWScalingStateCreateInfoNV](#VkPipelineViewportWScalingStateCreateInfoNV) structure included in
the `pNext` chain is [VK_TRUE](fundamentals.html#VK_TRUE), the `viewportCount` member
of the [VkPipelineViewportWScalingStateCreateInfoNV](#VkPipelineViewportWScalingStateCreateInfoNV) structure **must**
be greater than or equal to
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)::`viewportCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportStateCreateInfo-sType-sType) VUID-VkPipelineViewportStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineViewportStateCreateInfo-pNext-pNext) VUID-VkPipelineViewportStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](primsrast.html#VkPipelineViewportCoarseSampleOrderStateCreateInfoNV), [VkPipelineViewportDepthClampControlCreateInfoEXT](fragops.html#VkPipelineViewportDepthClampControlCreateInfoEXT), [VkPipelineViewportDepthClipControlCreateInfoEXT](#VkPipelineViewportDepthClipControlCreateInfoEXT), [VkPipelineViewportExclusiveScissorStateCreateInfoNV](fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV), [VkPipelineViewportShadingRateImageStateCreateInfoNV](primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV), [VkPipelineViewportSwizzleStateCreateInfoNV](#VkPipelineViewportSwizzleStateCreateInfoNV), or [VkPipelineViewportWScalingStateCreateInfoNV](#VkPipelineViewportWScalingStateCreateInfoNV)

* 
[](#VUID-VkPipelineViewportStateCreateInfo-sType-unique) VUID-VkPipelineViewportStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineViewportStateCreateInfo-flags-zerobitmask) VUID-VkPipelineViewportStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

To [dynamically set](pipelines.html#pipelines-dynamic-state) the viewport count and
viewports, call:

// Provided by VK_VERSION_1_3
void vkCmdSetViewportWithCount(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    viewportCount,
    const VkViewport*                           pViewports);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetViewportWithCount
void vkCmdSetViewportWithCountEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    viewportCount,
    const VkViewport*                           pViewports);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`viewportCount` specifies the viewport count.

* 
`pViewports` specifies the viewports to use for drawing.

This command sets the viewport count and viewports state for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)::`viewportCount` and
`pViewports` values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportWithCount-None-08971) VUID-vkCmdSetViewportWithCount-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

[](#VUID-vkCmdSetViewportWithCount-viewportCount-03394) VUID-vkCmdSetViewportWithCount-viewportCount-03394

`viewportCount` **must** be between `1` and
`VkPhysicalDeviceLimits`::`maxViewports`, inclusive

[](#VUID-vkCmdSetViewportWithCount-viewportCount-03395) VUID-vkCmdSetViewportWithCount-viewportCount-03395

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `1`

[](#VUID-vkCmdSetViewportWithCount-commandBuffer-04819) VUID-vkCmdSetViewportWithCount-commandBuffer-04819

`commandBuffer` **must** not have
[VkCommandBufferInheritanceViewportScissorInfoNV](cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV)::`viewportScissor2D`
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportWithCount-commandBuffer-parameter) VUID-vkCmdSetViewportWithCount-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetViewportWithCount-pViewports-parameter) VUID-vkCmdSetViewportWithCount-pViewports-parameter

 `pViewports` **must** be a valid pointer to an array of `viewportCount` valid [VkViewport](#VkViewport) structures

* 
[](#VUID-vkCmdSetViewportWithCount-commandBuffer-recording) VUID-vkCmdSetViewportWithCount-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportWithCount-commandBuffer-cmdpool) VUID-vkCmdSetViewportWithCount-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetViewportWithCount-videocoding) VUID-vkCmdSetViewportWithCount-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportWithCount-viewportCount-arraylength) VUID-vkCmdSetViewportWithCount-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewportWithCount is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the scissor count and
scissor rectangular bounds, call:

// Provided by VK_VERSION_1_3
void vkCmdSetScissorWithCount(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    scissorCount,
    const VkRect2D*                             pScissors);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetScissorWithCount
void vkCmdSetScissorWithCountEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    scissorCount,
    const VkRect2D*                             pScissors);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`scissorCount` specifies the scissor count.

* 
`pScissors` specifies the scissors to use for drawing.

This command sets the scissor count and scissor rectangular bounds state for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
[VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo)::`scissorCount` and
`pScissors` values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetScissorWithCount-None-08971) VUID-vkCmdSetScissorWithCount-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

[](#VUID-vkCmdSetScissorWithCount-scissorCount-03397) VUID-vkCmdSetScissorWithCount-scissorCount-03397

`scissorCount` **must** be between `1` and
`VkPhysicalDeviceLimits`::`maxViewports`, inclusive

[](#VUID-vkCmdSetScissorWithCount-scissorCount-03398) VUID-vkCmdSetScissorWithCount-scissorCount-03398

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `scissorCount` **must** be `1`

[](#VUID-vkCmdSetScissorWithCount-x-03399) VUID-vkCmdSetScissorWithCount-x-03399

The `x` and `y` members of `offset` member of any element of
`pScissors` **must** be greater than or equal to `0`

[](#VUID-vkCmdSetScissorWithCount-offset-03400) VUID-vkCmdSetScissorWithCount-offset-03400

Evaluation of (`offset.x` +  `extent.width`) **must** not
cause a signed integer addition overflow for any element of
`pScissors`

[](#VUID-vkCmdSetScissorWithCount-offset-03401) VUID-vkCmdSetScissorWithCount-offset-03401

Evaluation of (`offset.y` +  `extent.height`) **must**
not cause a signed integer addition overflow for any element of
`pScissors`

[](#VUID-vkCmdSetScissorWithCount-commandBuffer-04820) VUID-vkCmdSetScissorWithCount-commandBuffer-04820

`commandBuffer` **must** not have
[VkCommandBufferInheritanceViewportScissorInfoNV](cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV)::`viewportScissor2D`
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetScissorWithCount-commandBuffer-parameter) VUID-vkCmdSetScissorWithCount-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetScissorWithCount-pScissors-parameter) VUID-vkCmdSetScissorWithCount-pScissors-parameter

 `pScissors` **must** be a valid pointer to an array of `scissorCount` [VkRect2D](fundamentals.html#VkRect2D) structures

* 
[](#VUID-vkCmdSetScissorWithCount-commandBuffer-recording) VUID-vkCmdSetScissorWithCount-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetScissorWithCount-commandBuffer-cmdpool) VUID-vkCmdSetScissorWithCount-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetScissorWithCount-videocoding) VUID-vkCmdSetScissorWithCount-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetScissorWithCount-scissorCount-arraylength) VUID-vkCmdSetScissorWithCount-scissorCount-arraylength

 `scissorCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetScissorWithCount is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineViewportStateCreateFlags;

`VkPipelineViewportStateCreateFlags` is a bitmask type for setting a
mask, but is currently reserved for future use.

A *[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization)* **can** direct each primitive to zero or more viewports.
The destination viewports for a primitive are selected by the last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) that has an output variable decorated with `ViewportIndex`
(selecting a single viewport) or `ViewportMaskNV` (selecting multiple
viewports).
The viewport transform uses the viewport corresponding to either the value
assigned to `ViewportIndex` or one of the bits set in
`ViewportMaskNV`, and taken from an implementation-dependent vertex of
each primitive.
If `ViewportIndex` or any of the bits in `ViewportMaskNV` are outside
the range zero to `viewportCount` minus one for a primitive, or if the
last active [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) did not assign a value to either `ViewportIndex` or
`ViewportMaskNV` for all vertices of a primitive due to flow control, the
values resulting from the viewport transformation of the vertices of such
primitives are **undefined**.
If the last [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) does not have an output decorated with `ViewportIndex` or
`ViewportMaskNV`, the viewport numbered zero is used by the viewport
transformation.

A single vertex **can** be used in more than one individual primitive, in
primitives such as [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP](drawing.html#VkPrimitiveTopology).
In this case, the viewport transformation is applied separately for each
primitive.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the viewport transformation
parameters, call:

// Provided by VK_VERSION_1_0
void vkCmdSetViewport(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkViewport*                           pViewports);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose parameters
are updated by the command.

* 
`viewportCount` is the number of viewports whose parameters are
updated by the command.

* 
`pViewports` is a pointer to an array of [VkViewport](#VkViewport) structures
specifying viewport parameters.

This command sets the viewport transformation parameters state for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_VIEWPORT](pipelines.html#VkDynamicState)
set in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
`VkPipelineViewportStateCreateInfo`::`pViewports` values used to
create the currently active pipeline.

The viewport parameters taken from element i of `pViewports`
replace the current state for the viewport index `firstViewport`
+  i, for i in [0, `viewportCount`).

Valid Usage

* 
[](#VUID-vkCmdSetViewport-firstViewport-01223) VUID-vkCmdSetViewport-firstViewport-01223

The sum of `firstViewport` and `viewportCount` **must** be between
`1` and `VkPhysicalDeviceLimits`::`maxViewports`, inclusive

* 
[](#VUID-vkCmdSetViewport-firstViewport-01224) VUID-vkCmdSetViewport-firstViewport-01224

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `firstViewport` **must** be `0`

* 
[](#VUID-vkCmdSetViewport-viewportCount-01225) VUID-vkCmdSetViewport-viewportCount-01225

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `1`

* 
[](#VUID-vkCmdSetViewport-commandBuffer-04821) VUID-vkCmdSetViewport-commandBuffer-04821

`commandBuffer` **must** not have
[VkCommandBufferInheritanceViewportScissorInfoNV](cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV)::`viewportScissor2D`
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewport-commandBuffer-parameter) VUID-vkCmdSetViewport-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetViewport-pViewports-parameter) VUID-vkCmdSetViewport-pViewports-parameter

 `pViewports` **must** be a valid pointer to an array of `viewportCount` valid [VkViewport](#VkViewport) structures

* 
[](#VUID-vkCmdSetViewport-commandBuffer-recording) VUID-vkCmdSetViewport-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewport-commandBuffer-cmdpool) VUID-vkCmdSetViewport-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetViewport-videocoding) VUID-vkCmdSetViewport-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewport-viewportCount-arraylength) VUID-vkCmdSetViewport-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewport is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Both [VkPipelineViewportStateCreateInfo](#VkPipelineViewportStateCreateInfo) and [vkCmdSetViewport](#vkCmdSetViewport) use
`VkViewport` to set the viewport transformation parameters.

The `VkViewport` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkViewport {
    float    x;
    float    y;
    float    width;
    float    height;
    float    minDepth;
    float    maxDepth;
} VkViewport;

* 
`x` and `y` are the viewport’s upper left corner (x,y).

* 
`width` and `height` are the viewport’s width and height,
respectively.

* 
`minDepth` and `maxDepth` are the depth range for the viewport.

|  | Despite their names, `minDepth` **can** be less than, equal to, or greater
| --- | --- |
than `maxDepth`. |

The framebuffer depth coordinate `z`f **may** be represented using
either a fixed-point or floating-point representation.
However, a floating-point representation **must** be used if the depth/stencil
attachment has a floating-point depth component.
If an m-bit fixed-point representation is used, we assume that it
represents each value   , where k ∈ {
0, 1, …​, 2m-1 }, as k (e.g. 1.0 is represented in binary as a
string of all ones).

The viewport parameters shown in the above equations are found from these
values as

ox = `x` +  `width` / 2

oy = `y` +  `height` / 2

oz = `minDepth`
(or (`maxDepth` + `minDepth`) / 2 if
[VkPipelineViewportDepthClipControlCreateInfoEXT](#VkPipelineViewportDepthClipControlCreateInfoEXT)::`negativeOneToOne`
is [VK_TRUE](fundamentals.html#VK_TRUE))

px = `width`

py = `height`

pz = `maxDepth` - `minDepth`
(or (`maxDepth` - `minDepth`) / 2 if
[VkPipelineViewportDepthClipControlCreateInfoEXT](#VkPipelineViewportDepthClipControlCreateInfoEXT)::`negativeOneToOne`
is [VK_TRUE](fundamentals.html#VK_TRUE))

If a render pass transform is enabled, the values (px,py) and
(ox, oy) defining the viewport are transformed as described in
[render pass transform](#vertexpostproc-renderpass-transform) before
participating in the viewport transform.

The application **can** specify a negative term for `height`, which has the
effect of negating the y coordinate in clip space before performing the
transform.
When using a negative `height`, the application **should** also adjust the
`y` value to point to the lower left corner of the viewport instead of
the upper left corner.
Using the negative `height` allows the application to avoid having to
negate the y component of the `Position` output from the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).

The width and height of the [implementation-dependent maximum viewport dimensions](limits.html#limits-maxViewportDimensions) **must** be greater than
or equal to the width and height of the largest image which **can** be created
and attached to a framebuffer.

The floating-point viewport bounds are represented with an
[implementation-dependent precision](limits.html#limits-viewportSubPixelBits).

Valid Usage

* 
[](#VUID-VkViewport-width-01770) VUID-VkViewport-width-01770

`width` **must** be greater than `0.0`

* 
[](#VUID-VkViewport-width-01771) VUID-VkViewport-width-01771

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewportDimensions`[0]

* 
[](#VUID-VkViewport-apiVersion-07917) VUID-VkViewport-apiVersion-07917

If the [VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1) extension is not enabled, the
[VK_AMD_negative_viewport_height](../appendices/extensions.html#VK_AMD_negative_viewport_height) extension is not enabled, and
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
1.1, `height` **must** be greater than `0.0`

* 
[](#VUID-VkViewport-height-01773) VUID-VkViewport-height-01773

The absolute value of `height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewportDimensions`[1]

* 
[](#VUID-VkViewport-x-01774) VUID-VkViewport-x-01774

`x` **must** be greater than or equal to `viewportBoundsRange`[0]

* 
[](#VUID-VkViewport-x-01232) VUID-VkViewport-x-01232

(`x` +  `width`) **must** be less than or equal to
`viewportBoundsRange`[1]

* 
[](#VUID-VkViewport-y-01775) VUID-VkViewport-y-01775

`y` **must** be greater than or equal to `viewportBoundsRange`[0]

* 
[](#VUID-VkViewport-y-01776) VUID-VkViewport-y-01776

`y` **must** be less than or equal to `viewportBoundsRange`[1]

* 
[](#VUID-VkViewport-y-01777) VUID-VkViewport-y-01777

(`y` +  `height`) **must** be greater than or equal to
`viewportBoundsRange`[0]

* 
[](#VUID-VkViewport-y-01233) VUID-VkViewport-y-01233

(`y` +  `height`) **must** be less than or equal to
`viewportBoundsRange`[1]

* 
[](#VUID-VkViewport-minDepth-01234) VUID-VkViewport-minDepth-01234

If the `[VK_EXT_depth_range_unrestricted](../appendices/extensions.html#VK_EXT_depth_range_unrestricted)` extension is not
enabled,
`minDepth` **must** be between `0.0` and `1.0`, inclusive

* 
[](#VUID-VkViewport-maxDepth-01235) VUID-VkViewport-maxDepth-01235

If the `[VK_EXT_depth_range_unrestricted](../appendices/extensions.html#VK_EXT_depth_range_unrestricted)` extension is not
enabled,
`maxDepth` **must** be between `0.0` and `1.0`, inclusive
