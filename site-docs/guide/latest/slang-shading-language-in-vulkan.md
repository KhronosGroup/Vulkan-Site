# Slang Shading Language in Vulkan

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/slang.html

## Table of Contents

- [Educational resources](#_educational_resources)
- [Key differences between Slang and GLSL](#_key_differences_between_slang_and_glsl)
- [Key_differences_between_Slang_and_GLSL](#_key_differences_between_slang_and_glsl)
- [Syntax comparison](#_syntax_comparison)
- [GLSL](#_glsl)
- [Vertex shader](#_vertex_shader)
- [Fragment shader](#_fragment_shader)
- [Slang](#_slang)
- [Using Slang in your application](#_using_slang_in_your_application)
- [Using_Slang_in_your_application](#_using_slang_in_your_application)
- [Compiling shaders](#_compiling_shaders)
- [Offline compilation using the stand-alone compiler](#_offline_compilation_using_the_stand_alone_compiler)
- [Offline_compilation_using_the_stand-alone_compiler](#_offline_compilation_using_the_stand_alone_compiler)
- [Runtime compilation using the library](#_runtime_compilation_using_the_library)
- [Runtime_compilation_using_the_library](#_runtime_compilation_using_the_library)

## Content

Vulkan does not directly consume shaders in a human-readable text format, but instead uses [SPIR-V](what_is_spirv.html) as an intermediate representation. This opens the option to use shader languages other than e.g. GLSL, as long as they can target the Vulkan SPIR-V environment.

One such language is the [Slang Shading Language](https://shader-slang.org) developed by NVIDIA. It was designed to address the evolving needs of real-time graphics development, especially with regard to shader code bases getting larger and more complex. It supports multiple APIs, among them is first-class support for Vulkan’s SPIR-V.

![Slang overview](_images/slang-write-once-run-anywhere-graphic.webp)

Slang is developed in the [Open Source](https://github.com/shader-slang) and is under the [governance of Khronos](https://www.khronos.org/news/press/khronos-group-launches-slang-initiative-hosting-open-source-compiler-contributed-by-nvidia), meaning it has broad industry support and is actively maintained.

Its syntax is similar to [HLSL](hlsl.html) with additions like modules to make the language easier to use and to better handle complex code bases.

It has great tooling support with debuggers like [RenderDoc](https://renderdoc.org/) and [Nsight](https://developer.nvidia.com/nsight-graphics). Syntax highlighting is available for most popular IDEs like [Visual Studio](https://marketplace.visualstudio.com/items?itemName=shader-slang.slang-vs-extension) and [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=shader-slang.slang-language-extension).

If you are new to Slang, here are some educational points:

* 
[Slang website](https://shader-slang.org/)

* 
[Getting started with Slang](https://shader-slang.org/docs/getting-started/)

* 
[Slang User’s Guide](https://docs.shader-slang.org/en/latest/external/slang/docs/user-guide/)

* 
[SPIR-V specific functionalities](https://docs.shader-slang.org/en/latest/external/slang/docs/user-guide/a2-01-spirv-target-specific.html)

* 
[Porting from HLSL](https://shader-slang.org/docs/coming-from-hlsl/)

* 
[Porting from GLSL](https://shader-slang.org/docs/coming-from-glsl/)

* 
[Interactive Slang shader playground](https://shader-slang.org/slang-playground/)

* 
[The Vulkan Samples come with Slang shaders](../../samples/latest/README.html)

This section summarizes the most important differences a developer will encounter when moving from GLSL to Slang.

| Feature | Slang | GLSL |
| --- | --- | --- |
| Programming style | Object-oriented (C++-like) | Procedural (C-like) |
| Stages per source file | Multiple | One |
| Entry point name | User-defined | Always `main` |
| Stage declaration | `[shader("…​")]` attribute | Compiler flag or file extension |
| Vector types | `float2`, `float3`, `float4` | `vec2`, `vec3`, `vec4` |
| Matrix types | `float2x2`–`float4x4` | `mat2`–`mat4` |
| Default matrix layout | Column-major (Command-line), row-major (Library) | Column-major |
| Resource binding | Automatic or explicit | `layout(set=M, binding=N)` — always explicit |
| File reuse | `import` module system | `#include` preprocessor |
| Namespaces | Yes | No |
| Interfaces and generics | Yes | No |
| Pointers | Yes (for GPU-side use) | No |

Slang and GLSL differ heavily in their syntax. While GLSL is more procedural (like C), Slang is more object-oriented (like C++).

Here is the same shader written in both languages to give a quick comparison on how they basically differ, including the aforementioned namespace that e.g. adds explicit locations:

In GLSL, you need one shader per stage.

[Try Online](https://godbolt.org/z/6fefo9cWT)

#version 450

layout (location = 0) in vec3 inPos;
layout (location = 1) in vec2 inUV;

layout (binding = 0) uniform UBO
{
	mat4 projection;
	mat4 model;
} ubo;

layout (location = 0) out vec2 outUV;

void main()
{
	outUV = inUV;
	gl_Position = ubo.projection * ubo.model * vec4(inPos.xyz, 1.0);
}

[Try Online](https://godbolt.org/z/4ecx89TWE)

#version 450

layout (binding = 1) uniform sampler2D samplerColor;

layout (location = 0) in vec2 inUV;

layout (location = 0) out vec4 outFragColor;

void main()
{
	outFragColor = texture(samplerColor, inUV);
}

In Slang, a single file can contain multiple shader stages. This helps reduce duplication. Also note how we don’t have to specify explicit bindings, as they’re implicitly deduced for `ubo` and `samplerColor` from their ordering.

[Try Online](https://godbolt.org/z/rEYeG6EdY)

struct VSInput
{
	float3 Pos;
	float2 UV;
	float3 Normal;
};

struct VSOutput
{
	float4 Pos : SV_POSITION;
	float2 UV;
};

struct UBO
{
    float4x4 projection;
    float4x4 model;
};
ConstantBuffer ubo;

Sampler2D samplerColor;

[shader("vertex")]
VSOutput vertexMain(VSInput input)
{
	VSOutput output;
	output.UV = input.UV;
	output.Pos = mul(ubo.projection, mul(ubo.model, float4(input.Pos.xyz, 1.0)));
	return output;
}

[shader("fragment")]
float4 fragmentMain(VSOutput input)
{
    return samplerColor.Sample(input.UV);
}

From the application’s point-of-view, using Slang is exactly the same as using GLSL. As the application always consumes shaders in the SPIR-V format, the only difference is in the tooling to generate the SPIR-V shaders from the desired shading language.

To get SPIR-V from Slang requires a compiler. Just like GLSL and HLSL, Slang comes with both an offline compiler (a binary for multiple operating systems) and a library for runtime compilation. Both can be downloaded via [github](https://github.com/shader-slang/slang/releases) and are also part of the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home).

Compiling a shader offline via the pre-compiled `slangc` binary is similar to compiling with glslang:

slangc texture.slang -target spirv -o texture.vert.spv

This will generate a single SPIR-V file with all shader stages provided in the Slang source file.

Specific shader stages can be compiled like this:

slangc texture.slang -target spirv -entry vertexMain -stage vertex -o texture.vert.spv

Capabilities are implicitly enabled based on feature usage, but can also be explicitly specified:

slangc heap.slang -target spirv -entry vertexMain -stage vertex -o heap.vert.spv -capability spvDescriptorHeapEXT

The resulting SPIR-V can then be directly loaded by the app, same as SPIR-V generated from GLSL.

Slang can also be integrated into a Vulkan application using the Slang Compiler API. This allows for runtime compilation of shaders. Doing so requires you to include the slang compiler headers and link against the `slang` (or `slang-compiler`) library.

Compiling Slang to SPIR-V at runtime then is pretty straight-forward:

#include "slang/slang.h"
#include "slang/slang-com-ptr.h"

...

// Initialize the Slang shader compiler
slang::createGlobalSession(slangGlobalSession.writeRef());
auto slangTargets{ std::to_array({ {.format{SLANG_SPIRV}, .profile{slangGlobalSession->findProfile("spirv")} } }) };
auto slangOptions{ std::to_array({ { slang::CompilerOptionName::EmitSpirvDirectly, {slang::CompilerOptionValueKind::Int, 1} } }) };
slang::SessionDesc slangSessionDesc{
	.targets{slangTargets.data()},
	.targetCount{SlangInt(slangTargets.size())},
	// Match GLSL's matrix layout
	.defaultMatrixLayoutMode = SLANG_MATRIX_LAYOUT_COLUMN_MAJOR,
	.compilerOptionEntries{slangOptions.data()},
	.compilerOptionEntryCount{uint32_t(slangOptions.size())}
};

// Load and compile the shader
Slang::ComPtr slangSession;
slangGlobalSession->createSession(slangSessionDesc, slangSession.writeRef());
Slang::ComPtr slangModule{ slangSession->loadModuleFromSource("shader", "shader.slang", nullptr, nullptr) };
Slang::ComPtr spirv;
slangModule->getTargetCode(0, spirv.writeRef());
VkShaderModuleCreateInfo shaderModuleCI{
	.sType = VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO,
	.codeSize = spirv->getBufferSize(),
	.pCode = (uint32_t*)spirv->getBufferPointer()
};

// Create the shader module to be used by the application
VkShaderModule shaderModule{};
chk(vkCreateShaderModule(device, &shaderModuleCI, nullptr, &shaderModule));

// Take shader stages from the single module we just compiled
VkPipelineShaderStageCreateInfo vertexShader{
	.sType = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO,
	.stage = VK_SHADER_STAGE_VERTEX_BIT,
	.module = shaderModule, .pName = "main"
};
VkPipelineShaderStageCreateInfo fragmentShader{
	.sType = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO,
	.stage = VK_SHADER_STAGE_FRAGMENT_BIT,
	.module = shaderModule, .pName = "main"
};
VkGraphicsPipelineCreateInfo pipelineCI{
	...
	.stageCount = 2,
	.pStages = shaderStages.data(),
};
chk(vkCreateGraphicsPipelines(device, VK_NULL_HANDLE, 1, &pipelineCI, nullptr, &pipeline));
