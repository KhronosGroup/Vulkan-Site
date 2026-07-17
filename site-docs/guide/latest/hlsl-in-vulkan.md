# HLSL in Vulkan

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/hlsl.html

## Table of Contents

- [Educational resources](#educational-resources)
- [Why Use HLSL for Vulkan?](#_why_use_hlsl_for_vulkan)
- [Why_Use_HLSL_for_Vulkan?](#_why_use_hlsl_for_vulkan)
- [From the application’s point-of-view](#applications-pov)
- [From_the_application’s_point-of-view](#applications-pov)
- [Best Practices for Writing Shaders in HLSL for Vulkan](#_best_practices_for_writing_shaders_in_hlsl_for_vulkan)
- [Best_Practices_for_Writing_Shaders_in_HLSL_for_Vulkan](#_best_practices_for_writing_shaders_in_hlsl_for_vulkan)
- [Code Organization](#_code_organization)
- [Performance Considerations](#_performance_considerations)
- [Debugging and Validation](#_debugging_and_validation)
- [Debugging_and_Validation](#_debugging_and_validation)
- [Vulkan-Specific Best Practices](#_vulkan_specific_best_practices)
- [Vulkan-Specific_Best_Practices](#_vulkan_specific_best_practices)
- [Migration from GLSL to HLSL](#_migration_from_glsl_to_hlsl)
- [Migration_from_GLSL_to_HLSL](#_migration_from_glsl_to_hlsl)
- [Vulkan-Specific Semantics, Bindings, and Entry Points](#_vulkan_specific_semantics_bindings_and_entry_points)
- [Vulkan-Specific_Semantics,_Bindings,_and_Entry_Points](#_vulkan_specific_semantics_bindings_and_entry_points)
- [Descriptor Binding in HLSL](#_descriptor_binding_in_hlsl)
- [Descriptor_Binding_in_HLSL](#_descriptor_binding_in_hlsl)
- [Resource Types and Register Spaces](#_resource_types_and_register_spaces)
- [Resource_Types_and_Register_Spaces](#_resource_types_and_register_spaces)
- [HLSL to SPIR-V feature mapping manual](#hlsl-spirv-mapping-manual)
- [HLSL_to_SPIR-V_feature_mapping_manual](#hlsl-spirv-mapping-manual)
- [The Vulkan HLSL namespace](#vk-namespace)
- [The_Vulkan_HLSL_namespace](#vk-namespace)
- [Syntax comparison](#syntax-comparison)
- [GLSL](#_glsl)
- [HLSL](#_hlsl)
- [DirectXShaderCompiler (DXC)](#DirectXShaderCompiler)
- [Where to get](#_where_to_get)
- [Where_to_get](#_where_to_get)
- [Offline compilation using the stand-alone compiler](#_offline_compilation_using_the_stand_alone_compiler)
- [Offline_compilation_using_the_stand-alone_compiler](#_offline_compilation_using_the_stand_alone_compiler)
- [Runtime compilation using the library](#_runtime_compilation_using_the_library)
- [Runtime_compilation_using_the_library](#_runtime_compilation_using_the_library)
- [Vulkan shader stage to HLSL target shader profile mapping](#_vulkan_shader_stage_to_hlsl_target_shader_profile_mapping)
- [Vulkan_shader_stage_to_HLSL_target_shader_profile_mapping](#_vulkan_shader_stage_to_hlsl_target_shader_profile_mapping)
- [Shader model coverage](#_shader_model_coverage)
- [Shader_model_coverage](#_shader_model_coverage)
- [Conclusion](#_conclusion)
- [References and Further Reading](#_references_and_further_reading)
- [References_and_Further_Reading](#_references_and_further_reading)

## Content

Vulkan does not directly consume shaders in a human-readable text format, but instead uses [SPIR-V](what_is_spirv.html) as an intermediate representation. This opens the option to use shader languages other than e.g. GLSL, as long as they can target the Vulkan SPIR-V environment.

One such language is the High Level Shading Language (HLSL) by Microsoft, used by DirectX. Thanks to [recent additions to Vulkan 1.2](https://www.khronos.org/blog/hlsl-first-class-vulkan-shading-language) it is now considered a first class shading language for Vulkan that can be used just as easily as GLSL.

With [a few exceptions](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst#unsupported-hlsl-features), all Vulkan features and shader stages available with GLSL can be used with HLSL too, including recent Vulkan additions like hardware accelerated ray tracing. On the other hand, HLSL to SPIR-V supports Vulkan exclusive features that are not (yet) available in DirectX.

![what_is_spriv_dxc.png](_images/what_is_spirv_dxc.png)

If you are new to HLSL, a good starting point are the HLSL resources over at [Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl). Another great source is the [DirectX-Specs document](https://microsoft.github.io/DirectX-Specs/). It contains valuable information on recent shader features and HLSL’s shader models.

There are several advantages to using HLSL for Vulkan development:

* 
**Cross-API compatibility**: Write shaders that can be used with both Vulkan and DirectX with minimal changes

* 
**Familiar syntax**: Developers with DirectX experience can leverage their existing knowledge

* 
**Industry adoption**: HLSL is widely used in game engines and graphics applications

* 
**Tooling support**: Rich ecosystem of tools, debuggers, and IDE integrations

From the application’s point-of-view, using HLSL is exactly the same as using GLSL. As the application always consumes shaders in the SPIR-V format, the only difference is in the tooling to generate the SPIR-V shaders from the desired shading language.

* 
**Separate shader stages**: Keep different shader stages (vertex, fragment, compute, etc.) in separate files

* 
**Use structures for inputs and outputs**: Define clear structures for shader inputs and outputs

* 
**Consistent naming conventions**: Adopt a consistent naming scheme for variables, functions, and types

* 
**Modular design**: Break complex shaders into reusable functions and components

Example of a well-organized HLSL shader:

// Common structures and constants
struct VSInput {
    [[vk::location(0)]] float3 Position : POSITION0;
    [[vk::location(1)]] float3 Normal : NORMAL0;
    [[vk::location(2)]] float2 TexCoord : TEXCOORD0;
};
struct VSOutput {
    float4 Position : SV_POSITION;
    [[vk::location(0)]] float3 WorldPos : POSITION0;
    [[vk::location(1)]] float3 Normal : NORMAL0;
    [[vk::location(2)]] float2 TexCoord : TEXCOORD0;
};
// Uniform buffer with transformation matrices
struct SceneUBO {
    float4x4 model;
    float4x4 view;
    float4x4 projection;
};
[[vk::binding(0, 0)]]
ConstantBuffer ubo : register(0, 0);
// Vertex shader main function
VSOutput main(VSInput input) {
    VSOutput output = (VSOutput)0;
    // Transform position to clip space
    float4 worldPos = mul(ubo.model, float4(input.Position, 1.0));
    output.Position = mul(ubo.projection, mul(ubo.view, worldPos));
    // Pass through other attributes
    output.WorldPos = worldPos.xyz;
    output.Normal = mul((float3x3)ubo.model, input.Normal);
    output.TexCoord = input.TexCoord;
    return output;
}

* 
**Minimize divergent control flow**: Avoid complex branching within shader wavefronts

* 
**Optimize memory access patterns**: Group related data together to improve cache coherency

* 
**Reduce register pressure**: Limit the number of variables in high-register-usage sections

* 
**Use appropriate precision**: Use lower precision types (`half`, `min16float`) when full precision isn’t needed

* 
**Leverage subgroup operations**: Use subgroup/wave intrinsics for efficient parallel operations

* 
**Prefer compile-time constants**: Use specialization constants for values known at pipeline creation time

Example of using specialization constants:

// Define specialization constants
[[vk::constant_id(0)]] const bool USE_NORMAL_MAPPING = true;
[[vk::constant_id(1)]] const int LIGHT_COUNT = 4;
[[vk::constant_id(2)]] const float SPECULAR_POWER = 32.0;
// Use in conditional code
float3 CalculateNormal(float3 normal, float3 tangent, float2 texCoord) {
    if (USE_NORMAL_MAPPING) {
        // Complex normal mapping calculation
        return CalculateNormalFromMap(normal, tangent, texCoord);
    } else {
        // Simple pass-through
        return normalize(normal);
    }
}

* 
**Add debug markers**: Use comments or debug variables to mark important sections

* 
**Validate inputs**: Check for NaN or invalid values in critical calculations

* 
**Use validation layers**: Enable Vulkan validation layers during development

* 
**Leverage shader debugging tools**: Use tools like RenderDoc or NVIDIA Nsight for shader debugging

* 
**Implement fallbacks**: Provide simpler code paths for debugging complex algorithms

* 
**Explicit bindings**: Always specify explicit descriptor set and binding indices

* 
**Consistent descriptor layouts**: Maintain consistent descriptor layouts across shader stages

* 
**Minimize descriptor set changes**: Group resources to minimize descriptor set changes during rendering

* 
**Consider push constants**: Use push constants for frequently changing small data

* 
**Be mindful of SPIR-V limitations**: Some HLSL features may not translate directly to SPIR-V

For a detailed, side-by-side comparison of GLSL and HLSL syntax, data types, resource binding, built-ins vs. semantics, and more, see [High Level Shader Language Comparison](high_level_shader_language_comparison.html).

HLSL offers two approaches for binding resources in Vulkan:

* 
**HLSL register syntax**:

Texture2D albedoMap : register(t0, space1);
SamplerState samplerState : register(s0, space1);

* 
**Vulkan-specific attributes**:

[[vk::binding(0, 1)]]
Texture2D albedoMap;
[[vk::binding(0, 1)]]
SamplerState samplerState;

You can also combine both approaches for cross-API compatibility:

[[vk::binding(0, 1)]]
Texture2D albedoMap : register(t0, space1);

| Resource Type | HLSL Type | Register Type | Vulkan Equivalent |
| --- | --- | --- | --- |
| Uniform Buffer | ConstantBuffer | b | VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER |
| Storage Buffer | RWStructuredBuffer | u | VK_DESCRIPTOR_TYPE_STORAGE_BUFFER |
| Texture | Texture2D, Texture3D, etc. | t | VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE |
| Storage Image | RWTexture2D, etc. | u | VK_DESCRIPTOR_TYPE_STORAGE_IMAGE |
| Sampler | SamplerState | s | VK_DESCRIPTOR_TYPE_SAMPLER |

A great starting point on using HLSL in Vulkan via SPIR-V is the [HLSL to SPIR-V feature mapping manual](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst). It contains detailed information on semantics, syntax, supported features and extensions and much more and is a must-read. The [decoder ring](decoder_ring.html) also has a translation table for concepts and terms used in Vulkan and DirectX.

To make HLSL compatible with Vulkan, an [implicit namespace](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst#the-implicit-vk-namespace)) has been introduced that provides an interface for for Vulkan-specific features.

Similar to regular programming languages, HLSL and GLSL differ in their syntax. While GLSL is more procedural (like C), HLSL is more object-oriented (like C++).

Here is the same shader written in both languages to give quick comparison on how they basically differ, including the aforementioned namespace that e.g. adds explicit locations:

[Try Online](https://godbolt.org/z/jcPofTK9j)

#version 450

layout (location = 0) in vec3 inPosition;
layout (location = 1) in vec3 inColor;

layout (binding = 0) uniform UBO
{
	mat4 projectionMatrix;
	mat4 modelMatrix;
	mat4 viewMatrix;
} ubo;

layout (location = 0) out vec3 outColor;

void main()
{
	outColor = inColor * float(gl_VertexIndex);
	gl_Position = ubo.projectionMatrix * ubo.viewMatrix * ubo.modelMatrix * vec4(inPosition.xyz, 1.0);
}

[Try Online](https://godbolt.org/z/Y4sd9anMY)

struct VSInput
{
[[vk::location(0)]] float3 Position : POSITION0;
[[vk::location(1)]] float3 Color : COLOR0;
};

struct UBO
{
	float4x4 projectionMatrix;
	float4x4 modelMatrix;
	float4x4 viewMatrix;
};

cbuffer ubo : register(b0, space0) { UBO ubo; }

struct VSOutput
{
	float4 Pos : SV_POSITION;
[[vk::location(0)]] float3 Color : COLOR0;
};

VSOutput main(VSInput input, uint VertexIndex : SV_VertexID)
{
	VSOutput output = (VSOutput)0;
	output.Color = input.Color * float(VertexIndex);
	output.Pos = mul(ubo.projectionMatrix, mul(ubo.viewMatrix, mul(ubo.modelMatrix, float4(input.Position.xyz, 1.0))));
	return output;
}

Aside from the syntax differences, built-ins use HLSL names. E.g. `gl_vertex` becomes `VertexIndex` in HLSL. A list of GLSL to HLSL built-in mappings can be found [here](https://anteru.net/blog/2016/mapping-between-HLSL-and-GLSL/).

As is the case with GLSL to SPIR-V, to use HLSL with Vulkan, a shader compiler is required. Whereas [glslang](https://github.com/KhronosGroup/glslang) is the reference GLSL to SPIR-V compiler, the [DirectXShaderCompiler](https://github.com/microsoft/DirectXShaderCompiler) (DXC) is the reference HLSL to SPIR-V compiler. Thanks to open source contributions, the SPIR-V backend of DXC is now supported and enabled in official release builds and can be used out-of-the box. While other shader compiling tools like [glslang](https://github.com/KhronosGroup/glslang/wiki/HLSL-FAQ) also offer HLSL support, DXC has the most complete and up-to-date support and is the recommended way of generating SPIR-V from HLSL.

The [LunarG Vulkan SDK](https://vulkan.lunarg.com/) includes pre-compiled DXC binaries, libraries and headers to get you started. If you’re looking for the latest releases, check the [official DXC repository](https://github.com/microsoft/DirectXShaderCompiler/releases).

Compiling a shader offline via the pre-compiled dxc binary is similar to compiling with glslang:

dxc.exe -spirv -T vs_6_0 -E main .\triangle.vert -Fo .\triangle.vert.spv

`-T` selects the profile to compile the shader against (`vs_6_0` = Vertex shader model 6, `ps_6_0` = Pixel/fragment shader model 6, etc.).

`-E` selects the main entry point for the shader.

Extensions are implicitly enabled based on feature usage, but can also be explicitly specified:

dxc.exe -spirv -T vs_6_1 -E main .\input.vert -Fo .\output.vert.spv -fspv-extension=SPV_EXT_descriptor_indexing

The resulting SPIR-V can then be directly loaded, same as SPIR-V generated from GLSL.

DXC can also be integrated into a Vulkan application using the DirectX Compiler API. This allows for runtime compilation of shaders. Doing so requires you to include the `dxcapi.h` header and link against the `dxcompiler` library. The easiest way is using the dynamic library and distributing it with your application (e.g. `dxcompiler.dll` on Windows).

Compiling HLSL to SPIR-V at runtime then is pretty straight-forward:

#include "include/dxc/dxcapi.h"

...

HRESULT hres;

// Initialize DXC library
CComPtr library;
hres = DxcCreateInstance(CLSID_DxcLibrary, IID_PPV_ARGS(&library));
if (FAILED(hres)) {
	throw std::runtime_error("Could not init DXC Library");
}

// Initialize DXC compiler
CComPtr compiler;
hres = DxcCreateInstance(CLSID_DxcCompiler, IID_PPV_ARGS(&compiler));
if (FAILED(hres)) {
	throw std::runtime_error("Could not init DXC Compiler");
}

// Initialize DXC utility
CComPtr utils;
hres = DxcCreateInstance(CLSID_DxcUtils, IID_PPV_ARGS(&utils));
if (FAILED(hres)) {
	throw std::runtime_error("Could not init DXC Utiliy");
}

// Load the HLSL text shader from disk
uint32_t codePage = DXC_CP_ACP;
CComPtr sourceBlob;
hres = utils->LoadFile(filename.c_str(), &codePage, &sourceBlob);
if (FAILED(hres)) {
	throw std::runtime_error("Could not load shader file");
}

// Select target profile based on shader file extension
LPCWSTR targetProfile{};
size_t idx = filename.rfind('.');
if (idx != std::string::npos) {
	std::wstring extension = filename.substr(idx + 1);
	if (extension == L"vert") {
		targetProfile = L"vs_6_1";
	}
	if (extension == L"frag") {
		targetProfile = L"ps_6_1";
	}
	// Mapping for other file types go here (cs_x_y, lib_x_y, etc.)
}

// Configure the compiler arguments for compiling the HLSL shader to SPIR-V
std::vector arguments = {
	// (Optional) name of the shader file to be displayed e.g. in an error message
	filename.c_str(),
	// Shader main entry point
	L"-E", L"main",
	// Shader target profile
	L"-T", targetProfile,
	// Compile to SPIRV
	L"-spirv"
};

// Compile shader
DxcBuffer buffer{};
buffer.Encoding = DXC_CP_ACP;
buffer.Ptr = sourceBlob->GetBufferPointer();
buffer.Size = sourceBlob->GetBufferSize();

CComPtr result{ nullptr };
hres = compiler->Compile(
	&buffer,
	arguments.data(),
	(uint32_t)arguments.size(),
	nullptr,
	IID_PPV_ARGS(&result));

if (SUCCEEDED(hres)) {
	result->GetStatus(&hres);
}

// Output error if compilation failed
if (FAILED(hres) && (result)) {
	CComPtr errorBlob;
	hres = result->GetErrorBuffer(&errorBlob);
	if (SUCCEEDED(hres) && errorBlob) {
		std::cerr GetBufferPointer();
		throw std::runtime_error("Compilation failed");
	}
}

// Get compilation result
CComPtr code;
result->GetResult(&code);

// Create a Vulkan shader module from the compilation result
VkShaderModuleCreateInfo shaderModuleCI{};
shaderModuleCI.sType = VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO;
shaderModuleCI.codeSize = code->GetBufferSize();
shaderModuleCI.pCode = (uint32_t*)code->GetBufferPointer();
VkShaderModule shaderModule;
vkCreateShaderModule(device, &shaderModuleCI, nullptr, &shaderModule);

When compiling HLSL with DXC you need to select a target shader profile. The name for a profile consists of the shader type and the desired shader model.

| Vulkan shader stage | HLSL target shader profile | Remarks |
| --- | --- | --- |
| `VK_SHADER_STAGE_VERTEX_BIT` | `vs` |  |
| `VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT` | `hs` | Hull shader in HLSL terminology |
| `VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT` | `ds` | Domain shader in HLSL terminology |
| `VK_SHADER_STAGE_GEOMETRY_BIT` | `gs` |  |
| `VK_SHADER_STAGE_FRAGMENT_BIT` | `ps` | Pixel shader in HLSL terminology |
| `VK_SHADER_STAGE_COMPUTE_BIT` | `cs` |  |
| `VK_SHADER_STAGE_RAYGEN_BIT_KHR`,
`VK_SHADER_STAGE_ANY_HIT_BIT_KHR`,
`VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR`,
`VK_SHADER_STAGE_MISS_BIT_KHR`,
`VK_SHADER_STAGE_INTERSECTION_BIT_KHR`,
`VK_SHADER_STAGE_CALLABLE_BIT_KHR` | `lib` | All raytracing related shaders are built using the `lib` shader target profile and must use at least shader model 6.3 (e.g. `lib_6_3`). |
| `VK_SHADER_STAGE_TASK_BIT` | `as` | Amplification shader in HLSL terminology. Must use at least shader model 6.5 (e.g. `as_6_5`). |
| `VK_SHADER_STAGE_MESH_BIT` | `ms` | Must use at least shader model 6.5 (e.g. `ms_6_5`). |

So if you for example you want to compile a compute shader targeting shader model 6.6 features, the target shader profile would be `cs_6_6`. For a ray tracing any hit shader it would be `lib_6_3`.

DirectX and HLSL use a fixed shader model notion to describe the supported feature set. This is different from Vulkan and SPIR-V’s flexible extension based way of adding features to shaders. The following table tries to list Vulkan’s coverage for the HLSL shader models without guarantee of completeness:

| Shader Model | Supported | Remarks |
| --- | --- | --- |
| Shader Model 5.1 and below | ✔ | Excluding features without Vulkan equivalent |
| [Shader Model 6.0](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.0) | ✔ | Wave intrinsics, 64-bit integers |
| [Shader Model 6.1](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.1) | ✔ | SV_ViewID, SV_Barycentrics |
| [Shader Model 6.2](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.2) | ✔ | 16-bit types, Denorm mode |
| [Shader Model 6.3](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.3) | ✔ | Hardware accelerated ray tracing |
| [Shader Model 6.4](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.4) | ✔ | Shader integer dot product, SV_ShadingRate |
| [Shader Model 6.5](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.5) | ⚠️ (partially) | DXR1.1 (KHR ray tracing), Mesh and Amplification shaders, additional Wave intrinsics |
| [Shader Model 6.6](https://github.com/microsoft/DirectXShaderCompiler/wiki/Shader-Model-6.6) | ⚠️ (partially) | VK_NV_compute_shader_derivatives, VK_KHR_shader_atomic_int64, VK_EXT_descriptor_buffer, VK_EXT_mutable_descriptor_type |
| [Shader Model 6.7](https://microsoft.github.io/DirectX-Specs/d3d/HLSL_ShaderModel6_7.html) | ⚠️ (partially) | VK_KHR_shader_quad_control, VkPhysicalDeviceFeatures::shaderStorageImageMultisample |

HLSL provides a powerful alternative to GLSL for Vulkan shader development. By following the best practices and guidelines in this chapter, you can create efficient, maintainable, and portable shaders that leverage the strengths of HLSL while taking full advantage of Vulkan’s abilities.

The migration from GLSL to HLSL may require some effort, but the benefits in terms of code reuse, language features, and cross-API compatibility can be significant for many projects.

* 
[HLSL to SPIR-V Feature Mapping Manual](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst)

* 
[SPIR-V Guide](https://github.com/KhronosGroup/SPIRV-Guide)

* 
[HLSL as a First Class Vulkan Shading Language](https://www.khronos.org/blog/hlsl-first-class-vulkan-shading-language)

* 
[Vulkan Interfaces with SPIR-V](https://docs.vulkan.org/spec/latest/chapters/interfaces.html)

* 
[Microsoft HLSL Documentation](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl)
