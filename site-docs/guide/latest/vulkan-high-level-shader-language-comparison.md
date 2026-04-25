# Vulkan High Level Shader Language Comparison

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/high_level_shader_language_comparison.html

## Table of Contents

- [Extensions](#_extensions)
- [Data types](#_data_types)
- [Matrix Layout](#_matrix_layout)
- [Implicit vk Namespace](#_implicit_vk_namespace)
- [Implicit_vk_Namespace](#_implicit_vk_namespace)
- [SPIR-V macro](#_spir_v_macro)
- [SPIR-V intrinsics](#_spir_v_intrinsics)
- [Built-ins vs. Semantics](#_built_ins_vs_semantics)
- [Built-ins_vs._Semantics](#_built_ins_vs_semantics)
- [Examples](#_examples)
- [Shader interface](#_shader_interface)
- [Descriptor bindings](#_descriptor_bindings)
- [GLSL](#_glsl)
- [HLSL way](#_hlsl_way)
- [Vulkan namespace](#_vulkan_namespace)
- [Examples](#_examples_2)
- [GLSL](#_glsl_2)
- [HLSL](#_hlsl)
- [Uniforms](#_uniforms)
- [GLSL](#_glsl_3)
- [HLSL](#_hlsl_2)
- [Shader inputs](#_shader_inputs)
- [GLSL](#_glsl_4)
- [HLSL](#_hlsl_3)
- [Shader outputs](#_shader_outputs)
- [Passing data between stages](#_passing_data_between_stages)
- [Passing_data_between_stages](#_passing_data_between_stages)
- [GLSL](#_glsl_5)
- [HLSL](#_hlsl_4)
- [Writing attachments](#_writing_attachments)
- [GLSL](#_glsl_6)
- [HLSL](#_hlsl_5)
- [Push constants](#_push_constants)
- [GLSL](#_glsl_7)
- [HLSL](#_hlsl_6)
- [Specialization constants](#_specialization_constants)
- [GLSL](#_glsl_8)
- [HLSL](#_hlsl_7)
- [Sub passes](#_sub_passes)
- [GLSL](#_glsl_9)
- [HLSL](#_hlsl_8)
- [Texture reads](#_texture_reads)
- [Image formats](#_image_formats)
- [GLSL](#_glsl_10)
- [HLSL](#_hlsl_9)
- [Built-ins and functions mapping](#_built_ins_and_functions_mapping)
- [Built-ins_and_functions_mapping](#_built_ins_and_functions_mapping)
- [Buffer device address](#_buffer_device_address)
- [Buffer_device_address](#_buffer_device_address)
- [GLSL](#_glsl_11)
- [HLSL](#_hlsl_10)
- [Raytracing](#_raytracing)
- [Shader stage selection](#_shader_stage_selection)
- [Shader_stage_selection](#_shader_stage_selection)
- [Shader record buffer](#_shader_record_buffer)
- [Shader_record_buffer](#_shader_record_buffer)
- [GLSL](#_glsl_12)
- [HLSL](#_hlsl_11)
- [Built-Ins](#_built_ins)
- [Compute](#_compute)
- [Local workgroup size](#_local_workgroup_size)
- [Local_workgroup_size](#_local_workgroup_size)
- [GLSL](#_glsl_13)
- [HLSL](#_hlsl_12)
- [Shared memory](#_shared_memory)
- [GLSL](#_glsl_14)
- [HLSL](#_hlsl_13)
- [Built-Ins](#_built_ins_2)
- [Barriers](#_barriers)
- [Mesh, task (amplification) and geometry shaders](#_mesh_task_amplification_and_geometry_shaders)
- [Mesh,_task_(amplification)_and_geometry_shaders](#_mesh_task_amplification_and_geometry_shaders)
- [Tessellation shaders](#_tessellation_shaders)
- [Subgroups](#_subgroups)
- [Misc](#_misc)
- [Functions](#_functions)

## Content

Table of Contents

[Extensions](#_extensions)
[Data types](#_data_types)

[Matrix Layout](#_matrix_layout)

[Implicit vk Namespace](#_implicit_vk_namespace)
[SPIR-V macro](#_spir_v_macro)
[SPIR-V intrinsics](#_spir_v_intrinsics)
[Built-ins vs. Semantics](#_built_ins_vs_semantics)

[Examples](#_examples)

[Shader interface](#_shader_interface)

[Descriptor bindings](#_descriptor_bindings)
[Uniforms](#_uniforms)
[Shader inputs](#_shader_inputs)
[Shader outputs](#_shader_outputs)
[Push constants](#_push_constants)
[Specialization constants](#_specialization_constants)
[Sub passes](#_sub_passes)
[Texture reads](#_texture_reads)
[Image formats](#_image_formats)

[Built-ins and functions mapping](#_built_ins_and_functions_mapping)

[Buffer device address](#_buffer_device_address)
[Raytracing](#_raytracing)
[Compute](#_compute)
[Mesh, task (amplification) and geometry shaders](#_mesh_task_amplification_and_geometry_shaders)
[Tessellation shaders](#_tessellation_shaders)
[Subgroups](#_subgroups)
[Misc](#_misc)

[Functions](#_functions)

While Vulkan itself consumes shaders in a binary format called [SPIR-V](what_is_spirv.html), shaders are usually written in a high level language. This section provides a mapping between shader functionality for the most common ones used with Vulkan: GLSL and HLSL. This is mostly aimed at people wanting to migrate from one high level shader language to another. It’s meant as a starting point and not as a complete porting guide to one language from another

|  | For more details on using HLSL with Vulkan, visit [this chapter](hlsl.html). |
| --- | --- |

|  | The following listings are by no means complete, and mappings for newer extensions may be missing. Also note that concepts do not always map 1:1 between GLSL and HLSL. E.g. there are no semantic in GLSL while some newer GLSL functionality may not (yet) be available in HLSL. |
| --- | --- |

In GLSL extensions need to be explicitly enabled using the `#extension` directive. This is **not** necessary in HLSL. The compiler will implicitly select suitable SPIR-V extensions based on the shader. If required one can use `-fspv-extension` arguments to explicitly select extensions.

|  | Types work similar in GLSL and HLSL. But where GLSL e.g. has explicit vector or matrix types, HLSL uses basic types. On the other hand HLSL offers advanced type features like C++ templates. This paragraph contains a basic summary with some examples to show type differences between the two languages. |
| --- | --- |

| **GLSL** | **HLSL** | **Example** |
| --- | --- | --- |
| vec*n* | float*n* | vec4 → float4 |
| ivec*n* | int*n* | ivec3 -→ int3 |
| mat*nxm* or shorthand mat*n* | float*nxm* | mat4 → float4x4 |

* 
[HLSL data types (Microsoft)](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-data-types)

* 
[GLSL data types (OpenGL wiki)](https://www.khronos.org/opengl/wiki/Data_Type_(GLSL))

The syntax for casting types also differs:

GLSL:

mat4x3 mat = mat4x3(ubo.view);

HLSL:

float4x3 mat = (float4x3)(ubo.view);

It is important to be mindful that matrices in GLSL are column-major, while matrices in HLSL are row-major. This affects things like matrix construction.

![high_level_shader_language_comparison_matrix.png](_images/high_level_shader_language_comparison_matrix.png)

For Vulkan concepts that are not available in DirectX, an [implicit namespace](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst#the-implicit-vk-namespace) has been added that marks Vulkan specific features.

When using [DXC](hlsl.html#DirectXShaderCompiler) to compile HLSL to SPIR-V you can use the `__spirv__` macro for Vulkan specific code. This is useful if HLSL shaders need to work with both Vulkan and D3D:

#ifdef __spirv__
[[vk::binding(0, 1)]]
#endif
ConstantBuffer node : register(b0, space1);

DXC supports [SPIR-V intrinsics](https://github.com/microsoft/DirectXShaderCompiler/wiki/GL_EXT_spirv_intrinsics-for-SPIR-V-code-gen) with the `GL_EXT_spirv_intrinsics` extension. This adds support for embedding arbitrary SPIR-V in the middle of of GLSL for features not available in DirectX. For this new keywords are added to the `vk` namespace that map SPIR-V opcodes, incl. `vk::ext_extension`, `vk::ext_capability`, `vk::ext_builtin_input`, `vk::ext_execution_mode` and `vk::ext_instruction`.

Example for using the stencil export SPIR-V extension in HLSL:

[[vk::ext_capability(/* StencilExportEXT */ 5013)]]
[[vk::ext_extension("SPV_EXT_shader_stencil_export")]]
vk::ext_execution_mode(/* StencilRefReplacingEXT */ 5027);

Example for setting up the built-in to access vertex positions in ray tracing:

[[vk::ext_extension("SPV_KHR_ray_tracing_position_fetch")]]
[[vk::ext_capability(RayTracingPositionFetchKHR)]]
[[vk::ext_builtin_input(HitTriangleVertexPositionsKHR)]]
const static float3 gl_HitTriangleVertexPositions[3];

|  | While GLSL makes heavy use of input and output variables built into the languages called "built-ins", there is no such concept in HLSL. HLSL instead uses [semantics](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics), strings that are attached to inputs or inputs that contain information about the intended use of that variable. They are prefixed with `SV_`. For HLSL input values are explicit arguments for the main entry point and the shader needs to explicitly return an output. |
| --- | --- |

Writing positions from the vertex shader:

GLSL:

layout (location = 0) in vec4 inPos;

void main() {
    // The vertex output position is written to the gl_Position built-in
    gl_Position = ubo.projectionMatrix * ubo.viewMatrix * ubo.modelMatrix * inPos.xyz;
}

HLSL

struct VSOutput
{
    // The SV_POSITION semantic declares the Pos member as the vertex output position
    float4 Pos : SV_POSITION;
};

VSOutput main(VSInput input)
{
    VSOutput output = (VSOutput)0;
    output.Pos = mul(ubo.projectionMatrix, mul(ubo.viewMatrix, mul(ubo.modelMatrix, input.Pos)));
    return output;
}

Reading the vertex index:

GLSL:

void main()
{
    // The vertex index is stored in the gl_VertexIndex built-in
    outUV = vec2((gl_VertexIndex 

HLSL

struct VSInput
{
    // The SV_VertexID semantic declares the VertexIndex member as the vertex index input
    uint VertexIndex : SV_VertexID
};

VSOutput main(VSInput input)
{
    VSOutput output = (VSOutput)0;
    output.UV = float2((input.VertexIndex 

|  | Shader interfaces greatly differ between GLSL and HLSL. |
| --- | --- |

layout (set = , binding = ) uniform  

There are two options for defining descriptor set and binding indices in HLSL when using Vulkan.

  : register(, space)

Using this syntax, descriptor set and binding indices will be implicitly assigned from the set and binding index.

[[vk::binding(binding-index, set-index)]]
 

With this option, descriptor set and binding indices are explicitly set using `vk::binding`.

|  | It’s possible to use both the `vk::binding[]` and `register()` syntax for one descriptor. This can be useful if a shader is used for both Vulkan and DirectX. |
| --- | --- |

layout (set = 1, binding = 0) uniform Node {
    mat4 matrix;
} node;

struct Node {
    float4x4 transform;
};

// HLSL style
ConstantBuffer node : register(b0, space1);

// Vulkan style
[[vk::binding(0, 1)]]
ConstantBuffer node;

// Combined
[[vk::binding(0, 1)]]
ConstantBuffer node : register(b0, space1);

layout (set = , binding = ) uniform  

Examples:

// Uniform buffer
layout (set = 0, binding = 0) uniform UBO
{
    mat4 projection;
} ubo;

// Combined image sampler
layout (set = 0, binding = 1) uniform sampler2D samplerColor;

  : register(, space)

or

[[vk::binding(binding-index, set-index)]]
 

Examples:

// Uniform buffer
struct UBO
{
    float4x4 projection;
};
ConstantBuffer ubo : register(b0, space0);

// Combined image sampler
Texture2D textureColor : register(t1);
SamplerState samplerColor : register(s1);

If using the HLSL descriptor binding syntax `` can be:

| **Type** | **Register Description** | **Vulkan resource** |
| --- | --- | --- |
| b | Constant buffer | Uniform buffer |
| t | Texture and texture buffer | Uniform texel buffer and read-only shader storage buffer |
| c | Buffer offset | `layout(offset = N)` |
| s | Sampler | same |
| u | Unordered Access View | Shader storage buffer, storage image and storage texel buffer |

layout (location = ) in  ;

Example:

layout (location = 0) in vec3 inPos;
layout (location = 1) in vec3 inNormal;
layout (location = 2) in vec2 inUV0;
layout (location = 3) in vec2 inUV1;

[[vk::location()]]   : ;

Example:

struct VSInput
{
[[vk::location(0)]] float3 Pos : POSITION;
[[vk::location(1)]] float3 Normal : NORMAL;
[[vk::location(2)]] float2 UV0 : TEXCOORD0;
[[vk::location(3)]] float2 UV1 : TEXCOORD1;
};

VSOutput main(VSInput input) {
}

`` can be

| **Semantic** | **Description** | **Type** |
| --- | --- | --- |
| BINORMAL[n] | Binormal | float4 |
| BLENDINDICES[n] | Blend indices | uint |
| BLENDWEIGHT[n] | Blend weights | float |
| COLOR[n] | Diffuse and specular color | float4 |
| NORMAL[n] | Normal vector | float4 |
| POSITION[n] | Vertex position in object space. | float4 |
| POSITIONT | Transformed vertex position | float4 |
| PSIZE[n] | Point size | float |
| TANGENT[n] | Tangent | float4 |
| TEXCOORD[n] | Texture coordinates | float4 |

`n` is an optional integer between 0 and the number of resources supported. ([source](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics))

E.g. for vertex and tessellations shaders.

layout (location = ) out/in  ;

Example:

layout (location = 0) out vec3 outNormal;
layout (location = 1) out vec3 outColor;
layout (location = 2) out vec2 outUV;
layout (location = 3) out vec3 outViewVec;

void main() {
    gl_Position = vec4(inPos, 1.0);
    outNormal = inNormal;
}

[[vk::location()]]   : ;

Example:

struct VSOutput
{
                    float4 Pos : SV_POSITION;
[[vk::location(0)]] float3 Normal : NORMAL;
[[vk::location(1)]] float3 Color : COLOR;
[[vk::location(2)]] float2 UV : TEXCOORD0;
[[vk::location(3)]] float3 ViewVec : TEXCOORD1;
}

VSOutput main(VSInput input) {
    VSOutput output = (VSOutput)0;
    output.Pos = float4(input.Pos.xyz, 1.0);
    output.Normal = input.Normal;
    return output;
}

For fragment shaders.

layout (location = ) out/in  ;

Example:

layout (location = 0) out vec4 outPosition;
layout (location = 1) out vec4 outNormal;
layout (location = 2) out vec4 outAlbedo;

void main() {
    outPosition = ...
    outNormal = ...
    outAlbedo = ...
}

  : SV_TARGET;

Example:

struct FSOutput
{
    float4 Position : SV_TARGET0;
    float4 Normal : SV_TARGET1;
    float4 Albedo : SV_TARGET2;
};

FSOutput main(VSOutput input) {
    output.Position = ...
    output.Normal = ...
    output.Albedo = ...
    return output;
}

|  | Push constants must be handled through a root signature in D3D. |
| --- | --- |

layout (push_constant) uniform  {  } 

Example:

layout (push_constant) uniform PushConsts {
    mat4 matrix;
} pushConsts;

[[vk::push_constant]]  ;

struct PushConsts {
    float4x4 matrix;
};
[[vk::push_constant]] PushConsts pushConsts;

|  | Specialization constants are only available in Vulkan, D3D doesn’t offer anything similar. |
| --- | --- |

layout (constant_id = ) const int  = ;

Example:

layout (constant_id = 0) const int SPEC_CONST = 0;

[[vk::constant_id()]] const int  = ;

Example:

[[vk::constant_id(0)]] const int SPEC_CONST = 0;

layout (input_attachment_index = , binding = ) uniform subpassInput ;

Example:

layout (input_attachment_index = 0, binding = 0) uniform subpassInput input0;

[[vk::input_attachment_index()]][[vk::binding()]] SubpassInput ;

Example:

[[vk::input_attachment_index(0)]][[vk::binding(0)]] SubpassInput input0;

|  | Where GLSL uses global functions to access images, HLSL uses member functions of the texture object. |
| --- | --- |

Example:

GLSL:

layout (binding = 0, set = 0) uniform sampler2D sampler0;

void main() {
    vec4 color = texture(sampler0, inUV);
}

HLSL:

Texture2D texture0 : register(t0, space0);
SamplerState sampler0 : register(s0, space0);

float4 main(VSOutput input) : SV_TARGET {
    float4 color = texture0.Sample(sampler0, input.UV);
}

| **GLSL** | **HLSL** |
| --- | --- |
| texture | Sample |
| textureGrad | SampleGrad |
| textureLod | SampleLevel |
| textureSize | GetDimensions |
| textureProj | n.a., requires manual perspective divide |
| texelFetch | Load |
| sparseTexelsResidentARB | CheckAccessFullyMapped |

layout (set = , binding = , ) uniform   ;

Example:

layout (set = 0, binding = 0, rgba8) uniform writeonly image2D outputImage;

[[vk::image_format()]]
RWTexture2D  : register(, space);

Example:

[[vk::image_format("rgba8")]]
RWTexture2D resultImage : register(u0, space0);

|  | Currently, HLSL only supports a [subset](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst#rawbufferload-and-rawbufferstore) of `VK_KHR_buffer_device_address`. |
| --- | --- |

Example:

layout(push_constant) uniform PushConstants {
    uint64_t bufferAddress;
} pushConstants;

layout(buffer_reference, scalar) buffer Data {vec4 f[]; };

void main() {
    Data data = Data(pushConstants.bufferAddress);
}

Example:

struct PushConstants {
    uint64_t bufferAddress;
};
[[vk::push_constant]] PushConstants pushConstants;

void main() {
    float4 data = vk::RawBufferLoad(pushConstants.bufferAddress);
}

While GLSL implicitly detects the shader stage (for raytracing) via file extension (or explicitly via compiler arguments), for HLSL raytracing shaders need to be marked by the `[shader("stage")]` semantic:

Example:

[shader("closesthit")]
void main(inout RayPayload rayPayload, in float2 attribs) {
}

Stage names match GLSL: `raygeneration`, `intersection`, `anyhit`, `closesthit`, `miss`, `callable`

Example:

layout(shaderRecordEXT, std430) buffer SBT {
    float data;
};

Example:

struct SBT {
    float data;
};
[[vk::shader_record_ext]]
ConstantBuffer sbt;

| **GLSL** | **HLSL** | Note |
| --- | --- | --- |
| accelerationStructureEXT | RaytracingAccelerationStructure |  |
| executeCallableEXT | CallShader |  |
| ignoreIntersectionEXT | IgnoreHit |  |
| reportIntersectionEXT | ReportHit |  |
| terminateRayEXT | AcceptHitAndEndSearch |  |
| traceRayEXT | TraceRay |  |
| rayPayloadEXT (storage qualifier) | Last argument of TraceRay |  |
| rayPayloadInEXT (storage qualifier) | First argument for main entry of any hit, closest hit and miss stage |  |
| hitAttributeEXT (storage qualifier) | Last argument of ReportHit |  |
| callableDataEXT (storage qualifier) | Last argument of CallShader |  |
| callableDataInEXT (storage qualifier) | First argument for main entry of callabe stage |  |
| gl_LaunchIDEXT | DispatchRaysIndex |  |
| gl_LaunchSizeEXT | DispatchRaysDimensions |  |
| gl_PrimitiveID | PrimitiveIndex |  |
| gl_InstanceID | InstanceIndex |  |
| gl_InstanceCustomIndexEXT | InstanceID |  |
| gl_GeometryIndexEXT | GeometryIndex |  |
| gl_VertexIndex | SV_VertexID |  |
| gl_WorldRayOriginEXT | WorldRayOrigin |  |
| gl_WorldRayDirectionEXT | WorldRayDirection |  |
| gl_ObjectRayOriginEXT | ObjectRayOrigin |  |
| gl_ObjectRayDirectionEXT | ObjectRayDirection |  |
| gl_RayTminEXT | RayTMin |  |
| gl_RayTmaxEXT | RayTCurrent |  |
| gl_IncomingRayFlagsEXT | RayFlags |  |
| gl_HitTEXT | RayTCurrent |  |
| gl_HitKindEXT | HitKind |  |
| gl_ObjectToWorldEXT | ObjectToWorld4x3 |  |
| gl_WorldToObjectEXT | WorldToObject4x3 |  |
| gl_WorldToObject3x4EXT | WorldToObject3x4 |  |
| gl_ObjectToWorld3x4EXT | ObjectToWorld3x4 |  |
| gl_RayFlagsNoneEXT | RAY_FLAG_NONE |  |
| gl_RayFlagsOpaqueEXT | RAY_FLAG_FORCE_OPAQUE |  |
| gl_RayFlagsNoOpaqueEXT | RAY_FLAG_FORCE_NON_OPAQUE |  |
| gl_RayFlagsTerminateOnFirstHitEXT | RAY_FLAG_ACCEPT_FIRST_HIT_AND_END_SEARCH |  |
| gl_RayFlagsSkipClosestHitShaderEXT | RAY_FLAG_SKIP_CLOSEST_HIT_SHADER |  |
| gl_RayFlagsCullBackFacingTrianglesEXT | RAY_FLAG_CULL_BACK_FACING_TRIANGLES |  |
| gl_RayFlagsCullFrontFacingTrianglesEXT | RAY_FLAG_CULL_FRONT_FACING_TRIANGLES |  |
| gl_RayFlagsCullOpaqueEXT | RAY_FLAG_CULL_OPAQUE |  |
| gl_RayFlagsCullNoOpaqueEXT | RAY_FLAG_CULL_NON_OPAQUE | requires `GL_EXT_ray_flags_primitive_culling` |
| gl_RayFlagsSkipTrianglesEXT | RAY_FLAG_SKIP_TRIANGLES | requires `GL_EXT_ray_flags_primitive_culling` |
| gl_RayFlagsSkipAABBEXT | RAY_FLAG_SKIP_PROCEDURAL_PRIMITIVES |  |
| gl_HitKindFrontFacingTriangleEXT | HIT_KIND_TRIANGLE_FRONT_FACE |  |
| gl_HitKindBackFacingTriangleEXT | HIT_KIND_TRIANGLE_BACK_FACE |  |
| gl_HitTriangleVertexPositionsEXT | Requires [SPIR-V intrinsics](#_spir_v_intrinsics):

[[vk::ext_extension("SPV_KHR_ray_tracing_position_fetch")]]
[[vk::ext_capability(RayTracingPositionFetchKHR)]]
[[vk::ext_builtin_input(HitTriangleVertexPositionsKHR)]] | Requires `GL_EXT_ray_tracing_position_fetch` |
| shadercallcoherent | n.a. |  |

layout (local_size_x = , local_size_y = , local_size_z = ) in;

Example:

layout (local_size_x = 1, local_size_y = 1, local_size_z = 1) in;

[numthreads(, , )]

Example:

[numthreads(1, 1, 1)]
void main() {}

Example:

shared vec4 sharedData[1024];

Example:

groupshared float4 sharedData[1024];

| **GLSL** | **HLSL** |
| --- | --- |
| gl_GlobalInvocationID | SV_DispatchThreadID |
| gl_LocalInvocationID | SV_GroupThreadID |
| gl_WorkGroupID | SV_GroupID |
| gl_LocalInvocationIndex | SV_GroupIndex |
| gl_NumWorkGroups | n.a. |
| gl_WorkGroupSize | n.a. |

Example:

GLSL:

barrier();
for (int j = 0; j 

HLSL:

GroupMemoryBarrierWithGroupSync();
for (int j = 0; j 

|  | Barriers heavily differ between GLSL and HLSL. Some HLSL barriers don’t have direct mapping to GLSL (such functions are in *italics*, and GLSL barriers have been used for them as accurately as possible). |
| --- | --- |

| **GLSL** | **HLSL** |
| --- | --- |
| memoryBarrierShared | *GroupMemoryBarrier* |
| barrier | GroupMemoryBarrierWithGroupSync |
| memoryBarrierImage + memoryBarrierBuffer | DeviceMemoryBarrier |
| memoryBarrierImage + memoryBarrierBuffer + barrier | *DeviceMemoryBarrierWithGroupSync* |
| memoryBarrier + barrier | AllMemoryBarrierWithGroupSync |
| memoryBarrier | AllMemoryBarrier |

|  | `barrier` implicitly sets a memory barrier for `shared`/`groupshared` memory. Roughly speaking, the `barrier` contains the `memoryBarrierShared`/`GroupMemoryBarrier`. |
| --- | --- |

These shader stages share several functions and built-ins

| **GLSL** | **HLSL** |
| --- | --- |
| EmitMeshTasksEXT | DispatchMesh |
| SetMeshOutputsEXT | SetMeshOutputCounts |
| EmitVertex | *StreamType*.Append (e.g. {TriangleStream}) |
| EndPrimitive | *StreamType*.RestartStrip |
| gl_PrimitiveShadingRateEXT | SV_ShadingRate |
| gl_CullPrimitiveEXT | SV_CullPrimitive |
| gl_in | Array argument for main entry (e.g. {triangle VSInput input[3]}) |

| **GLSL** | **HLSL** |
| --- | --- |
| gl_InvocationID | SV_OutputControlPointID |
| gl_TessLevelInner | SV_InsideTessFactor |
| gl_TessLevelOuter | SV_TessFactor |
| gl_TessCoord | SV_DomainLocation |

| **GLSL** | **HLSL** |
| --- | --- |
| gl_HelperInvocation | WaveIsHelperLane |
| n.a. | WaveOnce |
| readFirstInvocationARB | WaveReadFirstLane |
| readInvocationARB | WaveReadLaneAt |
| anyInvocationARB | WaveAnyTrue |
| allInvocationsARB | WaveAllTrue |
| allInvocationsEqualARB | WaveAllEqual |
| ballotARB | WaveBallot |
| gl_NumSubgroups | NumSubgroups decorated OpVariable |
| gl_SubgroupID | SubgroupId decorated OpVariable |
| gl_SubgroupSize | WaveGetLaneCount |
| gl_SubgroupInvocationID | WaveGetLaneIndex |
| gl_SubgroupEqMask | n.a. |
| gl_SubgroupGeMask | n.a. |
| gl_SubgroupGtMask | n.a. |
| gl_SubgroupLeMask | n.a. |
| gl_SubgroupLtMask | SubgroupLtMask decorated OpVariable |
| subgroupElect | WaveIsFirstLane |
| subgroupAny | WaveActiveAnyTrue |
| subgroupAll | WaveActiveAllTrue |
| subgroupBallot | WaveActiveBallot |
| subgroupAllEqual | WaveActiveAllEqual |
| subgroupBallotBitCount | WaveActiveCountBits |
| subgroupAnd | WaveActiveBitAdd |
| subgroupOr | WaveActiveBitOr |
| subgroupXor | WaveActiveBitXor |
| subgroupAdd | WaveActiveSum |
| subgroupMul | WaveActiveProduct |
| subgroupMin | WaveActiveMin |
| subgroupMax | WaveActiveMax |
| subgroupExclusiveAdd | WavePrefixSum |
| subgroupExclusiveMul | WavePrefixProduct |
| subgroupBallotExclusiveBitCount | WavePrefixCountBits |
| subgroupBroadcast | WaveReadLaneAt |
| subgroupBroadcastFirst | WaveReadLaneFirst |
| subgroupQuadSwapHorizontal | QuadReadAcrossX |
| subgroupQuadSwapVertical | QuadReadAcrossY |
| subgroupQuadSwapDiagonal | QuadReadAcrossDiagonal |
| subgroupQuadBroadcast | QuadReadLaneAt |

| **GLSL** | **HLSL** | **Note** |
| --- | --- | --- |
| gl_PointSize | [[vk::builtin("PointSize")]] | Vulkan only, no direct HLSL equivalent |
| gl_BaseVertexARB | [[vk::builtin("BaseVertex")]] | Vulkan only, no direct HLSL equivalent |
| gl_BaseInstanceARB | [[vk::builtin("BaseInstance")]] | Vulkan only, no direct HLSL equivalent |
| gl_DrawID | [[vk::builtin("DrawIndex")]] | Vulkan only, no direct HLSL equivalent |
| gl_DeviceIndex | [[vk::builtin("DeviceIndex")]] | Vulkan only, no direct HLSL equivalent |
| gl_ViewportMask | [[vk::builtin("ViewportMaskNV")]] | Vulkan only, no direct HLSL equivalent |
| gl_FragCoord | SV_Position |  |
| gl_FragDepth | SV_Depth |  |
| gl_FrontFacing | SV_IsFrontFace |  |
| gl_InstanceIndex | SV_InstanceID |  |
| gl_ViewIndex | SV_ViewID |  |
| gl_ClipDistance | SV_ClipDistance |  |
| gl_CullDistance | SV_CullDistance |  |
| gl_PointCoord | SV_Position |  |
| gl_Position | SV_Position |  |
| gl_PrimitiveID | SV_PrimitiveID |  |
| gl_ViewportIndex | SV_ViewportArrayIndex |  |
| gl_Layer | SV_RenderTargetArrayIndex |  |
| gl_SampleID | SV_SampleIndex |  |
| gl_SamplePosition | EvaluateAttributeAtSample |  |
| subpassLoad | .SubpassLoad |  |
| imageLoad | RWTexture1D/2D/3D[] |  |
| imageStore | RWTexture1D/2D/3D[] |  |
| atomicAdd | InterlockedAdd |  |
| atomicCompSwap | InterlockedCompareExchange |  |
| imageAtomicExchange | InterlockedExchange |  |
| nonuniformEXT | NonUniformResourceIndex |  |
| gl_BaryCoordEXT | SV_Barycentrics |  |
| gl_BaryCoordNoPerspEXT | SV_Barycentrics with noperspective |  |

|  | Most GLSL functions are also available in HLSL and vice-versa. This chapter lists functions with divergent names. Functions that have a 1:1 counterpart (e.g. `isNan`) aren’t listed. |
| --- | --- |

| **GLSL** | **HLSL** |
| --- | --- |
| dFdx | ddx |
| dFdxCoarse | ddx_coarse |
| dFdxFine | ddx_fine |
| dFdy | ddy |
| dFdyCoarse | ddy_coarse |
| dFdyFine | ddy_fine |
| fma | mad |
| fract | frac |
| mix | lerp |

* 
[HLSL intrinsic function (Microsoft)](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions)

* 
[OpenGL reference pages](https://registry.khronos.org/OpenGL-Refpages/gl4/index.php)
