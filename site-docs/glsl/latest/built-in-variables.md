# Built-In Variables

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/builtins.html

## Table of Contents

- [Built-In Language Variables](#built-in-language-variables)
- [Built-In_Language_Variables](#built-in-language-variables)
- [Vertex Shader Special Variables](#vertex-shader-special-variables)
- [Vertex_Shader_Special_Variables](#vertex-shader-special-variables)
- [Tessellation Control Shader Special Variables](#tessellation-control-shader-special-variables)
- [Tessellation_Control_Shader_Special_Variables](#tessellation-control-shader-special-variables)
- [Tessellation Control Input Variables](#tessellation-control-input-variables)
- [Tessellation_Control_Input_Variables](#tessellation-control-input-variables)
- [Tessellation Control Output Variables](#tessellation-control-output-variables)
- [Tessellation_Control_Output_Variables](#tessellation-control-output-variables)
- [Tessellation Evaluation Shader Special Variables](#tessellation-evaluation-shader-special-variables)
- [Tessellation_Evaluation_Shader_Special_Variables](#tessellation-evaluation-shader-special-variables)
- [Tessellation Evaluation Input Variables](#tessellation-evaluation-input-variables)
- [Tessellation_Evaluation_Input_Variables](#tessellation-evaluation-input-variables)
- [Tessellation Evaluation Output Variables](#tessellation-evaluation-output-variables)
- [Tessellation_Evaluation_Output_Variables](#tessellation-evaluation-output-variables)
- [Geometry Shader Special Variables](#geometry-shader-special-variables)
- [Geometry_Shader_Special_Variables](#geometry-shader-special-variables)
- [Geometry Shader Input Variables](#geometry-shader-input-variables)
- [Geometry_Shader_Input_Variables](#geometry-shader-input-variables)
- [Geometry Shader Output Variables](#geometry-shader-output-variables)
- [Geometry_Shader_Output_Variables](#geometry-shader-output-variables)
- [Fragment Shader Special Variables](#fragment-shader-special-variables)
- [Fragment_Shader_Special_Variables](#fragment-shader-special-variables)
- [Compute Shader Special Variables](#compute-shader-special-variables)
- [Compute_Shader_Special_Variables](#compute-shader-special-variables)
- [Compatibility Profile Built-In Language Variables](#compatibility-profile-built-in-language-variables)
- [Compatibility_Profile_Built-In_Language_Variables](#compatibility-profile-built-in-language-variables)
- [Compatibility Profile Vertex Shader Built-In Inputs](#compatibility-profile-vertex-shader-built-in-inputs)
- [Compatibility_Profile_Vertex_Shader_Built-In_Inputs](#compatibility-profile-vertex-shader-built-in-inputs)
- [Built-In Constants](#built-in-constants)
- [Compatibility Profile Built-In Constants](#compatibility-profile-built-in-constants)
- [Compatibility_Profile_Built-In_Constants](#compatibility-profile-built-in-constants)
- [Built-In Uniform State](#built-in-uniform-state)
- [Built-In_Uniform_State](#built-in-uniform-state)
- [Compatibility Profile State](#compatibility-profile-state)
- [Compatibility_Profile_State](#compatibility-profile-state)
- [Redeclaring Built-In Blocks](#redeclaring-built-in-blocks)
- [Redeclaring_Built-In_Blocks](#redeclaring-built-in-blocks)

## Content

Some operations occur outside shader functionality and need to provide
values to or receive values from shader executables.
Shaders communicate with fixed-function pipeline stages, and
optionally with other shader executables, through the use of built-in input
and output variables.

The built-in vertex shader variables are intrinsically declared as follows:

in int gl_VertexID;       // only present when not targeting Vulkan
in int gl_InstanceID;     // only present when not targeting Vulkan
in int gl_VertexIndex;    // only present when targeting Vulkan
in int gl_InstanceIndex;  // only present when targeting Vulkan
in int gl_DrawID;
in int gl_BaseVertex;
in int gl_BaseInstance;

out gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
};

The variable *gl_Position* is intended for writing the homogeneous vertex
position.
It can be written at any time during shader execution.
This value will be used by primitive assembly, clipping, culling, and other
fixed functionality operations, if present, that operate on primitives after
vertex processing has occurred.
Its value is undefined after the vertex processing stage if the vertex
shader executable does not write *gl_Position*.

The variable *gl_PointSize* is intended for a shader to write the size of
the point to be rasterized.
It is measured in pixels.
If *gl_PointSize* is not written to, its value is undefined in subsequent
pipe stages.

The variable *gl_ClipDistance* is intended for writing clip distances, and
provides the forward compatible mechanism for controlling user clipping.
The element *gl_ClipDistance[i]* specifies a clip distance for each half-space
*i*.
A distance of 0 means the vertex is on the boundary of the half-space, a positive distance means
the vertex is inside the clip volume, and a negative distance means the point
is outside the clip volume.
The clip distances will be linearly interpolated across the primitive and
the portion of the primitive with interpolated distances less than 0 will be
clipped.

The *gl_ClipDistance* array is predeclared as unsized and must be either explicitly
sized by the shader redeclaring it with a size or implicitly sized by
indexing it only with constant integral expressions.
This needs to size the array to include all the clip half-spaces that are enabled
via the API; if the size does not include all enabled half-spaces,
results are undefined.
The size can be at most *gl_MaxClipDistances*.
The number of varying components (see *gl_MaxVaryingComponents)* consumed by
*gl_ClipDistance* will match the size of the array, no matter how many
half-spaces are enabled.
The shader must also set all values in *gl_ClipDistance* that have been
enabled via the API, or results are undefined.
Values written into *gl_ClipDistance* for half-spaces that are not enabled have
no effect.

The variable *gl_CullDistance* provides a mechanism for controlling user
culling.
The element *gl_CullDistance[i]* specifies a cull distance for half-space *i*.
A distance of 0 means the vertex is on the boundary of the half-space, a positive distance means
the vertex is inside the cull volume, and a negative distance means the
point is outside the cull volume.
Primitives whose vertices all have a negative cull distance for half-spaces *i*
will be discarded.

The *gl_CullDistance* array is predeclared as unsized and must be either explicitly
sized by the shader redeclaring it with a size or implicitly sized by
indexing it only with constant integral expressions.
The size determines the number and set of enabled cull distances and can be
at most *gl_MaxCullDistances*.
The number of varying components (see *gl_MaxVaryingComponents*) consumed by
*gl_CullDistance* will match the size of the array.
Shaders writing *gl_CullDistance* must write all enabled distances, or
culling results are undefined.

As an output variable, *gl_CullDistance* provides the place for the shader
to write these distances.
As an input in all but the fragment language, it reads the values written in
the previous shader stage.
In the fragment language, *gl_CullDistance* array contains linearly
interpolated values for the vertex values written by a shader to the
*gl_CullDistance* vertex output variable.

It is a compile-time or link-time error for the set of shaders forming a
program to have the sum of the sizes of the *gl_ClipDistance* and
*gl_CullDistance* arrays to be larger than
*gl_MaxCombinedClipAndCullDistances*.

The variable *gl_VertexID* is a vertex shader input variable that holds an
integer index for the vertex, as defined under “Shader Inputs” in section
11.1.3.9 “Shader Inputs” of the [OpenGL Specification](references.html#references).
It is only present when not targeting Vulkan.
Even when present, the value of *gl_VertexID* is not always defined.

The variable *gl_InstanceID* is a vertex shader input variable that holds
the instance number of the current primitive in an instanced draw call (see
“Shader Inputs” in section 11.1.3.9 “Shader Inputs” of the
[OpenGL Specification](references.html#references)).
It is only present when not targeting Vulkan.
If the current primitive does not come from an instanced draw call, the
value of *gl_InstanceID* is zero.

The variable *gl_VertexIndex* is a vertex language input variable that
holds an integer index for the vertex, relative to a base.
It is only present when targeting Vulkan.
Even when present, the value of *gl_VertexIndex* is not always defined.

The variable *gl_InstanceIndex* is a vertex language input variable that
holds the instance number of the current primitive in an instanced draw
call, relative to a base.
It is only present when targeting Vulkan.
If the current primitive does not come from an instanced draw call,
the value of gl_InstanceIndex is zero.

The variable *gl_DrawID* is a vertex shader input variable that holds the
integer index of the drawing command to which the current vertex belongs
(see “Shader Inputs” in section 11.1.3.9 of the [OpenGL Specification](references.html#references)).
If the vertex is not invoked by a **Multi*** form of a draw command, then the
value of *gl_DrawID* is zero.

The variable *gl_BaseVertex* is a vertex shader input variable that holds
the integer value passed to the baseVertex parameter of the command that
resulted in the current shader invocation (see “Shader Inputs” in section
11.1.3.9 of the [OpenGL Specification](references.html#references)).

The variable *gl_BaseInstance* is a vertex shader input variable that holds
the integer value passed to the baseInstance parameter of the command that
resulted in the current shader invocation (see “Shader Inputs” in section
11.1.3.9 of the [OpenGL Specification](references.html#references)).

In the tessellation control shader, built-in variables are intrinsically
declared as:

in gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
} gl_in[gl_MaxPatchVertices];

in int gl_PatchVerticesIn;
in int gl_PrimitiveID;
in int gl_InvocationID;

out gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
} gl_out[];

patch out float gl_TessLevelOuter[4];
patch out float gl_TessLevelInner[2];

*gl_Position*, *gl_PointSize*, *gl_ClipDistance*, and *gl_CullDistance*
contain the values written in the previous shader stage to the corresponding
outputs.

*gl_PatchVerticesIn* contains the number of vertices in the input patch
being processed by the shader.
A single shader can read patches of differing sizes, so the value of
*gl_PatchVerticesIn* may differ between patches.

*gl_PrimitiveID* contains the number of primitives processed by the shader
since the current set of rendering primitives was started.

*gl_InvocationID* contains the number of the output patch vertex assigned to
the tessellation control shader invocation.
It is assigned integer values in the range [0, N-1], where N is the number
of output patch vertices per primitive.

*gl_Position*, *gl_PointSize*, *gl_ClipDistance*, and *gl_CullDistance* are
used in the same fashion as the corresponding output variables in the vertex
shader.

The values written to *gl_TessLevelOuter* and *gl_TessLevelInner* are
assigned to the corresponding outer and inner tessellation levels of the
output patch.
They are used by the tessellation primitive generator to control primitive
tessellation and may be read by tessellation evaluation shaders.

In the tessellation evaluation shader, built-in variables are intrinsically
declared as:

in gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
} gl_in[gl_MaxPatchVertices];

in int gl_PatchVerticesIn;
in int gl_PrimitiveID;
in vec3 gl_TessCoord;
patch in float gl_TessLevelOuter[4];
patch in float gl_TessLevelInner[2];

out gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
};

*gl_Position*, *gl_PointSize*, *gl_ClipDistance*, and *gl_CullDistance*
contain the values written in the previous shader stage to the corresponding
outputs.

*gl_PatchVerticesIn* and *gl_PrimitiveID* are defined in the same fashion as
the corresponding input variables in the tessellation control shader.

*gl_TessCoord* specifies a three-component *(u,v,w)* vector identifying the
position of the vertex being processed by the shader relative to the
primitive being tessellated.
Its values will obey the properties

gl_TessCoord.x == 1.0 - (1.0 - gl_TessCoord.x) // two operations performed
gl_TessCoord.y == 1.0 - (1.0 - gl_TessCoord.y) // two operations performed
gl_TessCoord.z == 1.0 - (1.0 - gl_TessCoord.z) // two operations performed

to aid in replicating subdivision computations.

If a tessellation control shader is active, the input variables
*gl_TessLevelOuter* and *gl_TessLevelInner* are filled with the
corresponding outputs written by the tessellation control shader.
Otherwise, they are assigned with default tessellation levels specified in
section 11.2.3.3 “Tessellation Evaluation Shader Inputs” of the
[OpenGL Specification](references.html#references).

*gl_Position*, *gl_PointSize*, *gl_ClipDistance*, and *gl_CullDistance* are
used in the same fashion as the corresponding output variables in the vertex
shader.

In the geometry shader, built-in variables are intrinsically declared as:

in gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
} gl_in[];

in int gl_PrimitiveIDIn;
in int gl_InvocationID;

out gl_PerVertex {
    vec4 gl_Position;
    float gl_PointSize;
    float gl_ClipDistance[];
    float gl_CullDistance[];
};

out int gl_PrimitiveID;
out int gl_Layer;
out int gl_ViewportIndex;

*gl_Position*, *gl_PointSize*, *gl_ClipDistance*, and *gl_CullDistance*
contain the values written in the previous shader stage to the corresponding
outputs.

*gl_PrimitiveIDIn* contains the number of primitives processed by the shader
since the current set of rendering primitives was started.

*gl_InvocationID* contains the invocation number assigned to the geometry
shader invocation.
It is assigned integer values in the range [0, N-1], where N is the number
of geometry shader invocations per primitive.

*gl_Position*, *gl_PointSize*, *gl_ClipDistance*, and *gl_CullDistance* are
used in the same fashion as the corresponding output variables in the vertex
shader.

*gl_PrimitiveID* is filled with a single integer that serves as a primitive
identifier to the fragment shader.
This is then available to fragment shaders, which will select the written
primitive ID from the provoking vertex of the primitive being shaded.
If a fragment shader using *gl_PrimitiveID* is active and a geometry shader
is also active, the geometry shader must write to *gl_PrimitiveID* or the
fragment shader input *gl_PrimitiveID* is undefined.
See section 11.3.4.5 “Geometry Shader Outputs” of the
[OpenGL Specification](references.html#references) for more information.

*gl_Layer* is used to select a specific layer (or face and layer of a cube
map) of a multi-layer framebuffer attachment.
The actual layer used will come from one of the vertices in the primitive
being shaded.
Which vertex the layer comes from is determined as discussed in section
11.3.4.6 “Layer and Viewport Selection” of the [OpenGL Specification](references.html#references)
but may be undefined, so it is best to write the same layer value for all
vertices of a primitive.
If a shader statically assigns a value to *gl_Layer*, layered rendering mode
is enabled.
See section 11.3.4.5 “Geometry Shader Outputs” and section 9.4.9 “Layered
Framebuffers” of the [OpenGL Specification](references.html#references) for more information.
If a shader statically assigns a value to *gl_Layer*, and there is an
execution path through the shader that does not set *gl_Layer*, then the
value of *gl_Layer* is undefined for executions of the shader that take that
path.

The output variable *gl_Layer* takes on a special value when used with an
array of cube map textures.
Instead of only referring to the layer, it is used to select a cube map face
and a layer.
Setting *gl_Layer* to the value *layer*6+face* will render to face *face* of
the cube defined in layer *layer*.
The face values are defined in table 9.3 of section 9.4.9 “Layered
Framebuffers” of the [OpenGL Specification](references.html#references),
but repeated below for clarity.

| Face Value | Resulting Target |
| --- | --- |
| 0 | TEXTURE_CUBE_MAP_POSITIVE_X |
| 1 | TEXTURE_CUBE_MAP_NEGATIVE_X |
| 2 | TEXTURE_CUBE_MAP_POSITIVE_Y |
| 3 | TEXTURE_CUBE_MAP_NEGATIVE_Y |
| 4 | TEXTURE_CUBE_MAP_POSITIVE_Z |
| 5 | TEXTURE_CUBE_MAP_NEGATIVE_Z |

For example, to render to the positive *y* cube map face located in the 5th
layer of the cube map array, *gl_Layer* should be set to *5 * 6 + 2*.

The output variable *gl_ViewportIndex* provides the index of the viewport to
which the next primitive emitted from the geometry shader should be drawn.
Primitives generated by the geometry shader will undergo viewport
transformation and scissor testing using the viewport transformation and
scissor rectangle selected by the value of *gl_ViewportIndex*.
The viewport index used will come from one of the vertices in the primitive
being shaded.
However, which vertex the viewport index comes from is
implementation-dependent, so it is best to use the same viewport index for
all vertices of the primitive.
If a geometry shader does not assign a value to *gl_ViewportIndex*, viewport
transform and scissor rectangle zero will be used.
If a geometry shader statically assigns a value to *gl_ViewportIndex* and
there is a path through the shader that does not assign a value to
*gl_ViewportIndex*, the value of *gl_ViewportIndex* is undefined for
executions of the shader that take that path.
See section 11.3.4.6 “Layer and Viewport Selection” of the
[OpenGL Specification](references.html#references) for more information.

The built-in special variables that are accessible from a fragment shader
are intrinsically declared as follows:

in vec4 gl_FragCoord;
in bool gl_FrontFacing;
in float gl_ClipDistance[];
in float gl_CullDistance[];
in vec2 gl_PointCoord;
in int gl_PrimitiveID;
in int gl_SampleID;
in vec2 gl_SamplePosition;
in int gl_SampleMaskIn[];
in int gl_Layer;
in int gl_ViewportIndex;
in bool gl_HelperInvocation;

out float gl_FragDepth;
out int gl_SampleMask[];

The output of the fragment shader executable is processed by the fixed
function operations at the back end of the API pipeline.

The fixed functionality computed depth for a fragment may be obtained by
reading *gl_FragCoord.z*, described below.

Writing to *gl_FragDepth* will establish the depth value for the fragment
being processed.
If depth buffering is enabled, and no shader writes *gl_FragDepth*, then the
fixed function value for depth will be used as the fragment’s depth value.
If a shader statically assigns a value to *gl_FragDepth*, and there is an
execution path through the shader that does not set *gl_FragDepth*, then the
value of the fragment’s depth may be undefined for executions of the shader
that take that path.
That is, if the set of linked fragment shaders statically contain a write to
*gl_FragDepth*, then it is responsible for always writing it.

If a shader executes the **discard** keyword, the fragment is discarded, and
the values of any user-defined fragment outputs, *gl_FragDepth*, and
*gl_SampleMask* become irrelevant.

The variable *gl_FragCoord* is available as an input variable from within
fragment shaders and it holds the window relative coordinates (*x*, *y*,
*z*, *1/w*) values for the fragment.
If multi-sampling, this value can be for any location within the pixel, or
one of the fragment samples.
The use of **centroid** does not further restrict this value to be inside the
current primitive.
This value is the result of the fixed functionality that interpolates
primitives after vertex processing to generate fragments.
The *z* component is the depth value that would be used for the fragment’s
depth if no shader contained any writes to *gl_FragDepth*.
This is useful for invariance if a shader conditionally computes
*gl_FragDepth* but otherwise wants the fixed functionality fragment depth.

Fragment shaders have access to the input built-in variable
*gl_FrontFacing*, whose value is **true** if the fragment belongs to a
front-facing primitive.
One use of this is to emulate two-sided lighting by selecting one of two
colors calculated by a vertex or geometry shader.

The values in *gl_PointCoord* are two-dimensional coordinates indicating
where within a point primitive the current fragment is located, when point
sprites are enabled.
They range from 0.0 to 1.0 across the point.
If the current primitive is not a point, or if point sprites are not
enabled, then the values read from *gl_PointCoord* are undefined.

For both the input array *gl_SampleMaskIn[]* and the output array
*gl_SampleMask[]*, bit *B* of mask *M* (*gl_SampleMaskIn[M]* or
*gl_SampleMask[M]*) corresponds to sample *32*M+B*.
These arrays have **ceil**(*s*/32) elements, where *s* is the maximum number
of color samples supported by the implementation.

The input variable *gl_SampleMaskIn* indicates the set of samples covered by
the primitive generating the fragment during multisample rasterization.
It has a sample bit set if and only if the sample is considered covered for
this fragment shader invocation.

The output array *gl_SampleMask[]* sets the sample mask for the fragment
being processed.
Coverage for the current fragment will become the logical AND of the
coverage mask and the output *gl_SampleMask*.
This array must be sized in the fragment shader either implicitly or
explicitly, to be no larger than the implementation-dependent maximum
sample-mask (as an array of 32bit elements), determined by the maximum
number of samples..
If the fragment shader statically assigns a value to *gl_SampleMask*, the
sample mask will be undefined for any array elements of any fragment shader
invocations that fail to assign a value.
If a shader does not statically assign a value to *gl_SampleMask*, the
sample mask has no effect on the processing of a fragment.

The input variable *gl_SampleID* is filled with the sample number of the
sample currently being processed.
This variable is in the range *0* to *gl_NumSamples-1*, where
*gl_NumSamples* is the total number of samples in the framebuffer, or 1 if
rendering to a non-multisample framebuffer.
Any static use of this variable in a fragment shader causes the entire
shader to be evaluated per-sample.

The input variable *gl_SamplePosition* contains the position of the current
sample within the multisample draw buffer.
The *x* and *y* components of *gl_SamplePosition* contain the sub-pixel
coordinate of the current sample and will have values in the range 0.0 to
1.0.
Any static use of this variable in a fragment shader causes the entire
shader to be evaluated per sample.

The value *gl_HelperInvocation* is **true** if the fragment shader invocation
is considered a *helper invocation* and is **false** otherwise.
A helper invocation is a fragment shader invocation that is created solely
for the purposes of evaluating derivatives for use in non-helper fragment
shader invocations.
Such derivatives are computed implicitly in the built-in function
**texture**() (see “[Texture Functions](builtinfunctions.html#texture-functions)”), and
explicitly in the derivative functions in
“[Derivative Functions](builtinfunctions.html#derivative-functions)”, for example **dFdx**() and
**dFdy**().

Fragment shader helper invocations execute the same shader code as
non-helper invocations, but will not have side effects that modify the
framebuffer or other shader-accessible memory.
In particular:

* 
Fragments corresponding to helper invocations are discarded when shader
execution is complete, without updating the framebuffer.

* 
Stores to image and buffer variables performed by helper invocations
have no effect on the underlying image or buffer memory.

* 
Atomic operations to image, buffer, or atomic counter variables
performed by helper invocations have no effect on the underlying image
or buffer memory.
The values returned by such atomic operations are undefined.

Helper invocations may be generated for pixels not covered by a primitive
being rendered.
While fragment shader inputs qualified with **centroid** are normally required
to be sampled in the intersection of the pixel and the primitive, the
requirement is ignored for such pixels since there is no intersection
between the pixel and primitive.

Helper invocations may also be generated for fragments that are covered by a
primitive being rendered when the fragment is killed by early fragment tests
(using the **early_fragment_tests** qualifier) or where the implementation is
able to determine that executing the fragment shader would have no effect
other than assisting in computing derivatives for other fragment shader
invocations.

The set of helper invocations generated when processing any set of
primitives is implementation-dependent.

*gl_ClipDistance* contains linearly interpolated values for the vertex-
pipeline values written by a shader to the *gl_ClipDistance* output
variable. Only elements in this array that have clipping enabled will
have defined values.

*gl_CullDistance* contains linearly interpolated values for the vertex-
pipeline values written by a shader to the *gl_CullDistance* output
variable.

The input variable *gl_PrimitiveID* is filled with the value written to the
*gl_PrimitiveID* geometry shader output, if a geometry shader is present.
Otherwise, it is filled with the number of primitives processed by the
shader since the current set of rendering primitives was started.

The input variable *gl_Layer* is filled with the value written to the
*gl_Layer* geometry shader output, if a geometry shader is present.
If the geometry stage does not dynamically assign a value to *gl_Layer*, the
value of *gl_Layer* in the fragment stage will be undefined.
If the geometry stage makes no static assignment to *gl_Layer*, the input
value in the fragment stage will be zero.
Otherwise, the fragment stage will read the same value written by the
geometry stage, even if that value is out of range.
If a fragment shader contains a static access to *gl_Layer*, it will count
against the implementation defined limit for the maximum number of inputs to
the fragment stage.

The input variable *gl_ViewportIndex* is filled with the value written to
the output variable *gl_ViewportIndex* in the geometry stage, if a geometry
shader is present.
If the geometry stage does not dynamically assign a value to
*gl_ViewportIndex*, the value of *gl_ViewportIndex* in the fragment shader
will be undefined.
If the geometry stage makes no static assignment to *gl_ViewportIndex*, the
fragment stage will read zero.
Otherwise, the fragment stage will read the same value written by the
geometry stage, even if that value is out of range.
If a fragment shader contains a static access to *gl_ViewportIndex*, it will
count against the implementation defined limit for the maximum number of
inputs to the fragment stage.

In the compute shader, built-in variables are declared as follows:

// workgroup dimensions
in uvec3 gl_NumWorkGroups;
const uvec3 gl_WorkGroupSize;

// workgroup and invocation IDs
in uvec3 gl_WorkGroupID;
in uvec3 gl_LocalInvocationID;

// derived variables
in uvec3 gl_GlobalInvocationID;
in uint gl_LocalInvocationIndex;

The built-in variable *gl_NumWorkGroups* is a compute-shader input variable
containing the number of workgroups in each dimension of the dispatch that
will execute the compute shader.
Its content is equal to the values specified in the *num_groups_x*,
*num_groups_y*, and *num_groups_z* parameters passed to the
*DispatchCompute* API entry point.

The built-in constant *gl_WorkGroupSize* is a compute-shader constant
containing the workgroup size of the shader.
The size of the workgroup in the *X*, *Y*, and *Z* dimensions is stored in
the *x*, *y*, and *z* components.
The constant values in *gl_WorkGroupSize* will match those specified in the
required **local_size_x**, **local_size_y**, and **local_size_z** layout
qualifiers for the current shader.
This is a constant so that it can be used to size arrays of memory that can
be shared within the workgroup.
It is a compile-time error to use *gl_WorkGroupSize* in a shader that does
not declare a fixed workgroup size, or before that shader has declared a
fixed workgroup size, using **local_size_x**, **local_size_y**, and
**local_size_z**. Use of variables whose values are derived from
*gl_WorkGroupSize*, however, is not constrained to follow a declaration of the
fixed workgroup size.

The built-in variable *gl_WorkGroupID* is a compute-shader input variable
containing the three-dimensional index of the workgroup that the
current invocation is executing in.
The possible values range across the parameters passed into
*DispatchCompute*, i.e., from (0, 0, 0) to (*gl_NumWorkGroups.x* - 1,
*gl_NumWorkGroups.y* - 1, *gl_NumWorkGroups.z* -1).

The built-in variable *gl_LocalInvocationID* is a compute-shader input
variable containing the three-dimensional index of the current work item
within the workgroup.
The possible values for this variable range across the workgroup
size, i.e., (0,0,0) to (*gl_WorkGroupSize.x* - 1, *gl_WorkGroupSize.y* - 1,
*gl_WorkGroupSize.z* - 1). Use of *gl_LocalInvocationID* is allowed
before declarations of **local_size_x**, **local_size_y**, and **local_size_z**.

The built-in variable *gl_GlobalInvocationID* is a compute shader input
variable containing the global index of the current work item.
This value uniquely identifies this invocation from all other invocations
across all workgroups initiated by the current *DispatchCompute* call.
This is computed as:

gl_GlobalInvocationID =
    gl_WorkGroupID * gl_WorkGroupSize + gl_LocalInvocationID;

The built-in variable *gl_LocalInvocationIndex* is a compute shader input
variable that contains the one-dimensional representation of the
*gl_LocalInvocationID*.
This is computed as:

gl_LocalInvocationIndex =
    gl_LocalInvocationID.z * gl_WorkGroupSize.x * gl_WorkGroupSize.y +
    gl_LocalInvocationID.y * gl_WorkGroupSize.x +
    gl_LocalInvocationID.x;

Use of *gl_LocalInvocationIndex* is allowed before declarations of
**local_size_x**, **local_size_y**, and **local_size_z**.

When using the compatibility profile, the GL can provide fixed functionality
behavior for the vertex and fragment programmable pipeline stages.
For example, mixing a fixed functionality vertex stage with a programmable
fragment stage.

The following built-in vertex, tessellation control, tessellation
evaluation, and geometry output variables are available to specify inputs
for the subsequent programmable shader stage or the fixed functionality
fragment stage.
A particular one should be written to if any functionality in a
corresponding fragment shader or fixed pipeline uses it or state derived
from it.
Otherwise, behavior is undefined.
The following members are added to the output *gl_PerVertex* block in these
languages:

out gl_PerVertex { // part of the gl_PerVertex block described in 7.1
    // in addition to other gl_PerVertex members...
    vec4  gl_ClipVertex;
    vec4  gl_FrontColor;
    vec4  gl_BackColor;
    vec4  gl_FrontSecondaryColor;
    vec4  gl_BackSecondaryColor;
    vec4  gl_TexCoord[];
    float gl_FogFragCoord;
};

The output variable *gl_ClipVertex* provides a place for vertex and geometry
shaders to write the coordinate to be used with the user clipping half-spaces.
Writing to *gl_ClipDistance* is the preferred method for user clipping.
It is a compile-time or link-time error for the set of shaders forming a
program to statically read or write both *gl_ClipVertex* and either
*gl_ClipDistance* or *gl_CullDistance*.
If neither *gl_ClipVertex* nor *gl_ClipDistance* is written, their values
are undefined and any clipping against user clip half-spaces is also undefined.

Similarly to what was previously described for the core profile, the
*gl_PerVertex* block can be redeclared in a shader to explicitly include
these additional members.
For example:

out gl_PerVertex {
    vec4 gl_Position;    // will use gl_Position
    vec4 gl_FrontColor;  // will consume gl_color in the fragment shader
    vec4 gl_BackColor;
    vec4 gl_TexCoord[3]; // 3 elements of gl_TexCoord will be used
}; // no other aspects of the fixed interface will be used

The user must ensure the clip vertex and user clipping half-spaces are defined in
the same coordinate space.

The output variables *gl_FrontColor*, *glFrontSecondaryColor*,
*gl_BackColor*, and *glBackSecondaryColor* assign primary and secondary
colors for front and back faces of primitives containing the vertex being
processed.
The output variable *gl_TexCoord* assigns texture coordinates for the vertex
being processed.

For *gl_FogFragCoord*, the value written will be used as the “c” value in
section 16.4 “Fog” of the Compatibility profile of the
[OpenGL Specification](references.html#references), by the fixed functionality pipeline.
For example, if the z-coordinate of the fragment in eye space is desired as
“c”, then that’s what the vertex shader executable should write into
*gl_FogFragCoord*.

As with all arrays, indices used to subscript *gl_TexCoord* must either be a
constant integral expressions, or this array must be redeclared by the
shader with a size.
The size can be at most *gl_MaxTextureCoords*.
Using indices close to 0 may aid the implementation in preserving varying
resources.
The redeclaration of *gl_TexCoord* can also be done at global scope as, for
example:

in vec4 gl_TexCoord[3];
out vec4 gl_TexCoord[4];

(This treatment is a special case for *gl_TexCoord[]*, not a general method
for redeclaring members of blocks.) It is a compile-time error to redeclare
*gl_TexCoord[]* at global scope if there is a redeclaration of the
corresponding built-in block; only one form of redeclaration is allowed
within a shader (and hence within a stage, as block redeclarations must
match across all shaders using it).

In the tessellation control, evaluation, and geometry shaders, the outputs
of the previous stage described above are also available in the input
*gl_PerVertex* block in these languages.

in gl_PerVertex { // part of the gl_PerVertex block described in 7.1
    // in addition to other gl_PerVertex members...
    vec4  gl_ClipVertex;
    vec4  gl_FrontColor;
    vec4  gl_BackColor;
    vec4  gl_FrontSecondaryColor;
    vec4  gl_BackSecondaryColor;
    vec4  gl_TexCoord[];
    float gl_FogFragCoord;
} gl_in[];

These can be redeclared to establish an explicit pipeline interface, the
same way as described above for the output block *gl_PerVertex*, and the
input redeclaration must match the output redeclaration of the previous
stage.
However, when a built-in interface block with an instance name is redeclared
(e.g. *gl_in*), the instance name must be included in the redeclaration.
It is a compile-time error to not include the built-in instance name or to
change its name.
For example,

in gl_PerVertex {
    vec4 gl_ClipVertex;
    vec4 gl_FrontColor;
} gl_in[]; // must be present and must be "gl_in[]"

Built-in block arrays predeclared with a size can be redeclared with unsized syntax.
This keeps their size equal to the original predeclared size.

Treatment of *gl_TexCoord[]* redeclaration is also identical to that
described for the output block *gl_TexCoord[]* redeclaration.

The following fragment input block is also available in a fragment shader
when using the compatibility profile:

in gl_PerFragment {
    in float gl_FogFragCoord;
    in vec4  gl_TexCoord[];
    in vec4  gl_Color;
    in vec4  gl_SecondaryColor;
};

The values in *gl_Color* and *gl_SecondaryColor* will be derived
automatically by the system from *gl_FrontColor*, *gl_BackColor*,
*gl_FrontSecondaryColor*, and *gl_BackSecondaryColor* based on which face is
visible in the primitive producing the fragment.
If fixed functionality is used for vertex processing, then *gl_FogFragCoord*
will either be the z-coordinate of the fragment in eye space, or the
interpolation of the fog coordinate, as described in section 16.4 “Fog” of
the Compatibility profile of the [OpenGL Specification](references.html#references).
The *gl_TexCoord[]* values are the interpolated *gl_TexCoord[]* values from
a vertex shader or the texture coordinates of any fixed pipeline based
vertex functionality.

Indices to the fragment shader *gl_TexCoord* array are as described above in
the vertex shader text.

As described above for the input and output *gl_PerVertex* blocks, the
*gl_PerFragment* block can be redeclared to create an explicit interface to
another program.
When matching these interfaces between separate programs, members in the
*gl_PerVertex* output block must be declared if and only if the
corresponding fragment shader members generated from them are present in the
*gl_PerFragment* input block.
These matches are described in detail in section 7.4.1 “Shader Interface
Matching” of the [OpenGL Specification](references.html#references).
If they don’t match within a program, a link-time error will result.
If the mismatch is between two programs, values passed between programs are
undefined.
Unlike with all other block matching, the order of declaration within
*gl_PerFragment* does not have to match across shaders and does not have to
correspond with order of declaration in a matching *gl_PerVertex*
redeclaration.

The following fragment output variables are available in a fragment shader
when using the compatibility profile:

out vec4 gl_FragColor;
out vec4 gl_FragData[gl_MaxDrawBuffers];

Writing to *gl_FragColor* specifies the fragment color that will be used by
the subsequent fixed functionality pipeline.
If subsequent fixed functionality consumes fragment color and an execution
of the fragment shader executable does not write a value to *gl_FragColor*
then the fragment color consumed is undefined.

The variable *gl_FragData* is an array.
Writing to *gl_FragData[n]* specifies the fragment data that will be used by
the subsequent fixed functionality pipeline for data *n*.
If subsequent fixed functionality consumes fragment data and an execution of
a fragment shader executable does not write a value to it, then the fragment
data consumed is undefined.

If a shader statically assigns a value to *gl_FragColor*, it may not assign
a value to any element of *gl_FragData*.
If a shader statically writes a value to any element of *gl_FragData*, it
may not assign a value to *gl_FragColor*.
That is, a shader may assign values to either *gl_FragColor* or
*gl_FragData*, but not both.
Multiple shaders linked together must also consistently write just one of
these variables.
Similarly, if user-declared output variables are in use (statically assigned
to), then the built-in variables *gl_FragColor* and *gl_FragData* may not be
assigned to.
These incorrect usages all generate compile-time or link-time errors.

If a shader executes the **discard** keyword, the fragment is discarded, and
the values of *gl_FragDepth* and *gl_FragColor* become irrelevant.

The following predeclared input names can be used from within a vertex
shader to access the current values of OpenGL state when using the
compatibility profile.

in vec4 gl_Color;
in vec4 gl_SecondaryColor;
in vec3 gl_Normal;
in vec4 gl_Vertex;
in vec4 gl_MultiTexCoord0;
in vec4 gl_MultiTexCoord1;
in vec4 gl_MultiTexCoord2;
in vec4 gl_MultiTexCoord3;
in vec4 gl_MultiTexCoord4;
in vec4 gl_MultiTexCoord5;
in vec4 gl_MultiTexCoord6;
in vec4 gl_MultiTexCoord7;
in float gl_FogCoord;

The following built-in constants are declared in all shaders.
The actual values used are implementation-dependent, but must be at least
the value shown.

//
// Implementation-dependent constants. The example values below
// are the minimum values allowed for these maximums.
//

const int gl_MaxVertexAttribs = 16;
const int gl_MaxVertexUniformVectors = 256;
const int gl_MaxVertexUniformComponents = 1024;
const int gl_MaxVertexOutputComponents = 64;
const int gl_MaxVaryingComponents = 60;
const int gl_MaxVaryingVectors = 15;
const int gl_MaxVertexTextureImageUnits = 16;
const int gl_MaxVertexImageUniforms = 0;
const int gl_MaxVertexAtomicCounters = 0;
const int gl_MaxVertexAtomicCounterBuffers = 0;

const int gl_MaxTessPatchComponents = 120;
const int gl_MaxPatchVertices = 32;
const int gl_MaxTessGenLevel = 64;

const int gl_MaxTessControlInputComponents = 128;
const int gl_MaxTessControlOutputComponents = 128;
const int gl_MaxTessControlTextureImageUnits = 16;
const int gl_MaxTessControlUniformComponents = 1024;
const int gl_MaxTessControlTotalOutputComponents = 4096;
const int gl_MaxTessControlImageUniforms = 0;
const int gl_MaxTessControlAtomicCounters = 0;
const int gl_MaxTessControlAtomicCounterBuffers = 0;

const int gl_MaxTessEvaluationInputComponents = 128;
const int gl_MaxTessEvaluationOutputComponents = 128;
const int gl_MaxTessEvaluationTextureImageUnits = 16;
const int gl_MaxTessEvaluationUniformComponents = 1024;
const int gl_MaxTessEvaluationImageUniforms = 0;
const int gl_MaxTessEvaluationAtomicCounters = 0;
const int gl_MaxTessEvaluationAtomicCounterBuffers = 0;

const int gl_MaxGeometryInputComponents = 64;
const int gl_MaxGeometryOutputComponents = 128;
const int gl_MaxGeometryImageUniforms = 0;
const int gl_MaxGeometryTextureImageUnits = 16;
const int gl_MaxGeometryOutputVertices = 256;
const int gl_MaxGeometryTotalOutputComponents = 1024;
const int gl_MaxGeometryUniformComponents = 1024;
const int gl_MaxGeometryVaryingComponents = 64;            // deprecated
const int gl_MaxGeometryAtomicCounters = 0;
const int gl_MaxGeometryAtomicCounterBuffers = 0;

const int gl_MaxFragmentImageUniforms = 8;
const int gl_MaxFragmentInputComponents = 128;
const int gl_MaxFragmentUniformVectors = 256;
const int gl_MaxFragmentUniformComponents = 1024;
const int gl_MaxFragmentAtomicCounters = 8;
const int gl_MaxFragmentAtomicCounterBuffers = 1;

const int gl_MaxDrawBuffers = 8;
const int gl_MaxTextureImageUnits = 16;
const int gl_MinProgramTexelOffset = -8;
const int gl_MaxProgramTexelOffset = 7;
const int gl_MaxImageUnits = 8;
const int gl_MaxSamples = 4;
const int gl_MaxImageSamples = 0;
const int gl_MaxClipDistances = 8;
const int gl_MaxCullDistances = 8;
const int gl_MaxViewports = 16;

const int gl_MaxComputeImageUniforms = 8;
const ivec3 gl_MaxComputeWorkGroupCount = { 65535, 65535, 65535 };
const ivec3 gl_MaxComputeWorkGroupSize = { 1024, 1024, 64 };
const int gl_MaxComputeUniformComponents = 1024;
const int gl_MaxComputeTextureImageUnits = 16;
const int gl_MaxComputeAtomicCounters = 8;
const int gl_MaxComputeAtomicCounterBuffers = 8;

const int gl_MaxCombinedTextureImageUnits = 96;
const int gl_MaxCombinedImageUniforms = 48;
const int gl_MaxCombinedImageUnitsAndFragmentOutputs = 8;  // deprecated
const int gl_MaxCombinedShaderOutputResources = 16;
const int gl_MaxCombinedAtomicCounters = 8;
const int gl_MaxCombinedAtomicCounterBuffers = 1;
const int gl_MaxCombinedClipAndCullDistances = 8;
const int gl_MaxAtomicCounterBindings = 1;
const int gl_MaxAtomicCounterBufferSize = 32;

const int gl_MaxTransformFeedbackBuffers = 4;
const int gl_MaxTransformFeedbackInterleavedComponents = 64;

const highp int gl_MaxInputAttachments = 1;  // only present when targeting Vulkan

The constant *gl_MaxVaryingFloats* is removed in the core profile, use
*gl_MaxVaryingComponents* instead.

const int gl_MaxTextureUnits = 2;
const int gl_MaxTextureCoords = 8;
const int gl_MaxClipPlanes = 8;
const int gl_MaxVaryingFloats = 60;

Built-in uniform state is not available when generating SPIR-V.
Otherwise, as an aid to accessing OpenGL processing state, the following
uniform variables are built into the OpenGL Shading Language.

//
// Depth range in window coordinates,
// section 13.6.1 "Controlling the Viewport" in the
// OpenGL Specification.
//
// Note: Depth-range state is only for viewport 0.
//
struct gl_DepthRangeParameters {
    float near; // n
    float far;  // f
    float diff; // f - n
};
uniform gl_DepthRangeParameters gl_DepthRange;
uniform int gl_NumSamples;

These variables are only guaranteed to be available in the fragment stage.
In other stages, their presence and function is implementation-defined.

These variables are present only in the compatibility profile.
They are not available to compute shaders, but are available to all other
shaders.

//
// compatibility profile only
//
uniform mat4 gl_ModelViewMatrix;
uniform mat4 gl_ProjectionMatrix;
uniform mat4 gl_ModelViewProjectionMatrix;
uniform mat4 gl_TextureMatrix[gl_MaxTextureCoords];

//
// compatibility profile only
//
uniform mat3 gl_NormalMatrix; // transpose of the inverse of the
                              // upper leftmost 3x3 of gl_ModelViewMatrix

uniform mat4 gl_ModelViewMatrixInverse;
uniform mat4 gl_ProjectionMatrixInverse;
uniform mat4 gl_ModelViewProjectionMatrixInverse;
uniform mat4 gl_TextureMatrixInverse[gl_MaxTextureCoords];

uniform mat4 gl_ModelViewMatrixTranspose;
uniform mat4 gl_ProjectionMatrixTranspose;
uniform mat4 gl_ModelViewProjectionMatrixTranspose;
uniform mat4 gl_TextureMatrixTranspose[gl_MaxTextureCoords];

uniform mat4 gl_ModelViewMatrixInverseTranspose;
uniform mat4 gl_ProjectionMatrixInverseTranspose;
uniform mat4 gl_ModelViewProjectionMatrixInverseTranspose;
uniform mat4 gl_TextureMatrixInverseTranspose[gl_MaxTextureCoords];

//
// compatibility profile only
//
uniform float gl_NormalScale;

//
// compatibility profile only
//
uniform vec4 gl_ClipPlane[gl_MaxClipPlanes];

//
// compatibility profile only
//
struct gl_PointParameters {
    float size;
    float sizeMin;
    float sizeMax;
    float fadeThresholdSize;
    float distanceConstantAttenuation;
    float distanceLinearAttenuation;
    float distanceQuadraticAttenuation;
};

uniform gl_PointParameters gl_Point;

//
// compatibility profile only
//
struct gl_MaterialParameters {
 vec4 emission;   // Ecm
 vec4 ambient;    // Acm
 vec4 diffuse;    // Dcm
 vec4 specular;   // Scm
 float shininess; // Srm
};
uniform gl_MaterialParameters gl_FrontMaterial;
uniform gl_MaterialParameters gl_BackMaterial;

//
// compatibility profile only
//
struct gl_LightSourceParameters {
    vec4 ambient;               // Acli
    vec4 diffuse;               // Dcli
    vec4 specular;              // Scli
    vec4 position;              // Ppli
    vec4 halfVector;            // Derived: Hi
    vec3 spotDirection;         // Sdli
    float spotExponent;         // Srli
    float spotCutoff;           // Crli
                                // (range: [0.0,90.0], 180.0)
    float spotCosCutoff;        // Derived: cos(Crli)
                                // (range: [1.0,0.0],-1.0)
    float constantAttenuation;  // K0
    float linearAttenuation;    // K1
    float quadraticAttenuation; // K2
};

uniform gl_LightSourceParameters gl_LightSource[gl_MaxLights];

struct gl_LightModelParameters {
    vec4 ambient;                  // Acs
};

uniform gl_LightModelParameters gl_LightModel;

//
// compatibility profile only
//
// Derived state from products of light and material.
//

struct gl_LightModelProducts {
    vec4 sceneColor; // Derived. Ecm + Acm * Acs
};

uniform gl_LightModelProducts gl_FrontLightModelProduct;
uniform gl_LightModelProducts gl_BackLightModelProduct;

struct gl_LightProducts {
    vec4 ambient; // Acm * Acli
    vec4 diffuse; // Dcm * Dcli
    vec4 specular; // Scm * Scli
};

uniform gl_LightProducts gl_FrontLightProduct[gl_MaxLights];
uniform gl_LightProducts gl_BackLightProduct[gl_MaxLights];

//
// compatibility profile only
//
uniform vec4 gl_TextureEnvColor[gl_MaxTextureUnits];
uniform vec4 gl_EyePlaneS[gl_MaxTextureCoords];
uniform vec4 gl_EyePlaneT[gl_MaxTextureCoords];
uniform vec4 gl_EyePlaneR[gl_MaxTextureCoords];
uniform vec4 gl_EyePlaneQ[gl_MaxTextureCoords];
uniform vec4 gl_ObjectPlaneS[gl_MaxTextureCoords];
uniform vec4 gl_ObjectPlaneT[gl_MaxTextureCoords];
uniform vec4 gl_ObjectPlaneR[gl_MaxTextureCoords];
uniform vec4 gl_ObjectPlaneQ[gl_MaxTextureCoords];

//
// compatibility profile only
//
struct gl_FogParameters {
    vec4 color;
    float density;
    float start;
    float end;
    float scale; // Derived: 1.0 / (end - start)
};

uniform gl_FogParameters gl_Fog;

The *gl_PerVertex* block can be redeclared in a shader to explicitly
indicate what subset of the fixed pipeline interface will be used.
This is necessary to establish the interface between multiple programs.
For example:

out gl_PerVertex {
    vec4 gl_Position;   // will use gl_Position
    float gl_PointSize; // will use gl_PointSize
    vec4 t;             // error, only gl_PerVertex members allowed
}; // no other members of gl_PerVertex will be used

This establishes the output interface the shader will use with the
subsequent pipeline stage.
It must be a subset of the built-in members of *gl_PerVertex*.
Such a redeclaration can also add the **invariant** qualifier, interpolation
qualifiers, and the layout qualifiers **xfb_offset**, **xfb_buffer**, and
**xfb_stride**.
It can also add an array size for unsized arrays.
For example:

out layout(xfb_buffer = 1, xfb_stride = 16) gl_PerVertex {
    vec4 gl_Position;
    layout(xfb_offset = 0) float gl_ClipDistance[4];
};

Other layout qualifiers, like **location**, cannot be added to such a
redeclaration, unless specifically stated.

If a built-in interface block is redeclared, it must appear in the shader
before any use of any member included in the built-in declaration, or a
compile-time error will result.
It is also a compile-time error to redeclare the block more than once or to
redeclare a built-in block and then use a member from that built-in block
that was not included in the redeclaration.
Also, if a built-in interface block is redeclared, no member of the built-in
declaration can be redeclared outside the block redeclaration.
If multiple shaders using members of a built-in block belonging to the same
interface are linked together in the same program, they must all redeclare
the built-in block in the same way, as described in
“[Interface Blocks](variables.html#interface-blocks)” for interface block matching, or a
link-time error will result.
It will also be a link-time error if some shaders in a program redeclare a
specific built-in interface block while another shader in that program does
not redeclare that interface block yet still uses a member of that interface
block.
If a built-in block interface is formed across shaders in different
programs, the shaders must all redeclare the built-in block in the same way
(as described for a single program), or the values passed along the
interface are undefined.
