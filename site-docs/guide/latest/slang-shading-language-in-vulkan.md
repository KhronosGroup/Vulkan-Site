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
- [Additional Language Features](#_additional_language_features)
- [Additional_Language_Features](#_additional_language_features)
- [Generics](#_generics)
- [Interfaces and Polymorphism](#_interfaces_and_polymorphism)
- [Interfaces_and_Polymorphism](#_interfaces_and_polymorphism)
- [Modules and Namespaces](#_modules_and_namespaces)
- [Modules_and_Namespaces](#_modules_and_namespaces)
- [Resource Binding Model](#_resource_binding_model)
- [Resource_Binding_Model](#_resource_binding_model)
- [Using Slang in your application](#_using_slang_in_your_application)
- [Using_Slang_in_your_application](#_using_slang_in_your_application)
- [Compiling shaders](#_compiling_shaders)
- [Offline compilation using the stand-alone compiler](#_offline_compilation_using_the_stand_alone_compiler)
- [Offline_compilation_using_the_stand-alone_compiler](#_offline_compilation_using_the_stand_alone_compiler)
- [Runtime compilation using the library](#_runtime_compilation_using_the_library)
- [Runtime_compilation_using_the_library](#_runtime_compilation_using_the_library)
- [Best Practices for Writing Shaders in Slang for Vulkan](#_best_practices_for_writing_shaders_in_slang_for_vulkan)
- [Best_Practices_for_Writing_Shaders_in_Slang_for_Vulkan](#_best_practices_for_writing_shaders_in_slang_for_vulkan)
- [Code Organization](#_code_organization)
- [Performance Considerations](#_performance_considerations)
- [Vulkan-Specific Best Practices](#_vulkan_specific_best_practices)
- [Vulkan-Specific_Best_Practices](#_vulkan_specific_best_practices)
- [Advanced Topics](#_advanced_topics)
- [Cross-Compilation and Portability](#_cross_compilation_and_portability)
- [Cross-Compilation_and_Portability](#_cross_compilation_and_portability)
- [Shader Composition and Reuse](#_shader_composition_and_reuse)
- [Shader_Composition_and_Reuse](#_shader_composition_and_reuse)
- [Reflection and Shader Introspection](#_reflection_and_shader_introspection)
- [Reflection_and_Shader_Introspection](#_reflection_and_shader_introspection)
- [References and Further Reading](#_references_and_further_reading)
- [References_and_Further_Reading](#_references_and_further_reading)

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

Beyond the syntax differences shown above, Slang adds several language features not available in GLSL or standard HLSL.

Slang adds full support for generics, similar to C# or Java, allowing for type-safe parameterized code:

T min(T a, T b)
{
    return a (1.0, 2.0);
int intResult = min(5, 3);

Slang introduces interfaces, enabling polymorphic behavior in shaders:

interface IMaterial
{
    float3 evaluateBRDF(float3 viewDir, float3 lightDir, float3 normal);
}

struct LambertianMaterial : IMaterial
{
    float3 albedo;

    float3 evaluateBRDF(float3 viewDir, float3 lightDir, float3 normal)
    {
        return albedo / 3.14159;
    }
}

// Use polymorphically, without knowing the concrete type
void shadeSurface(IMaterial material, float3 viewDir, float3 lightDir, float3 normal)
{
    float3 result = material.evaluateBRDF(viewDir, lightDir, normal);
}

Slang provides a module system for better code organization. Symbols must be marked `public` to be visible outside their module, and modules do not introduce namespaces - imported symbols are used directly:

// In file: lighting.slang
module Lighting;

public float3 calculateDirectLighting(float3 normal, float3 lightDir, float3 color)
{
    float NdotL = max(0, dot(normal, lightDir));
    return color * NdotL;
}

// In file: main.slang
import Lighting;

float3 directLight = calculateDirectLighting(normal, lightDir, color);

In addition to implicit, order-based binding, Slang supports grouping related resources into parameter blocks:

struct MaterialResources
{
    Texture2D albedoMap;
    SamplerState samplerState;
};
ParameterBlock material;

// Usage
float4 albedo = material.albedoMap.Sample(material.samplerState, uv);

Parameter blocks are assigned a descriptor set and binding automatically. An explicit binding can still be set with `vk::binding` when a stable layout across shader edits is **required**

[[vk::binding(0, 1)]]
ParameterBlock material;

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

`slangc` can also compile HLSL or GLSL source directly to SPIR-V, using the `-lang` option to select the input language:

# HLSL compatibility mode
slangc -target spirv -lang hlsl -entry main -o shader.spv shader.hlsl

# GLSL compatibility mode
slangc -target spirv -allow-glsl -entry main -o shader.spv shader.glsl

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

* 
**Use modules**: Organize code into logical modules with clear responsibilities

* 
**Leverage imports**: Use imports instead of includes for better dependency management

* 
**Use interfaces**: Define interfaces for common functionality to enable polymorphism

* 
**Profile interface dispatch**: Test the performance impact of interface-based polymorphism; interfaces are often resolved at compile time through specialization, but this isn’t guaranteed for every use

* 
**Leverage compile-time evaluation**: Use generics and specialization to move work to compile time

* 
**Consider specialization**: Generate specialized shader variants for performance-critical paths

* 
**Use parameter blocks**: Organize resources into parameter blocks for better organization

* 
**Let Slang assign bindings**: Slang automatically assigns descriptor set and binding indices, so explicit `vk::binding` attributes are usually unnecessary; add them only when you need a stable binding layout across shader edits or need to match bindings set up elsewhere in your application

* 
**Cross-API compatibility**: Use conditional compilation for Vulkan-specific code where parameter blocks aren’t a good fit (see below)

Slang does not automatically define target-specific preprocessor macros, since preprocessing runs once regardless of how many targets you compile for. Define your own macro on the command line (e.g. `-DTARGET_VULKAN=1`) for each target build:

// TARGET_VULKAN is defined on the command line,
// e.g. `slangc -target spirv -DTARGET_VULKAN=1 ...`
#ifdef TARGET_VULKAN
[[vk::binding(0, 0)]]
#endif
ParameterBlock globals;

Interfaces, generics, and modules are independent Slang features that combine well for building reusable shader code:

// In lighting.slang
module Lighting;

public interface ILight
{
    float3 calculateLighting(float3 position, float3 normal, float3 viewDir);
}

// In directional_light.slang
module Lights.Directional;
import Lighting;

public struct DirectionalLight : ILight
{
    float3 direction;
    float3 color;

    float3 calculateLighting(float3 position, float3 normal, float3 viewDir)
    {
        // Implementation
    }
}

// In main shader
module Main;
import Lighting;
import Lights.Directional;

float3 shadeSurface(ILight light, float3 position, float3 normal, float3 viewDir)
{
    return light.calculateLighting(position, normal, viewDir);
}

Slang provides a reflection API for inspecting compiled shader code from host application code:

* 
**Type and field layout**: Query the fields, types, and memory layout of a program

* 
**Resource binding layout**: Query the descriptor set and binding assigned to each resource, which can be used to build descriptor set layouts without hardcoding bindings

* 
**Entry point parameters**: Query the parameters of a given entry point

Reflection data is retrieved after compiling or linking a program, through `slang::ProgramLayout` and related interfaces such as `TypeLayoutReflection` and `VariableLayoutReflection`. See the [Slang reflection API documentation](https://shader-slang.org/slang/user-guide/reflection) for details and examples.

* 
[Slang GitHub Repository](https://github.com/shader-slang/slang)

* 
[Slang Documentation](https://docs.shader-slang.org/en/latest/)

* 
[Slang Language Guide](https://github.com/shader-slang/spec)

* 
[SPIR-V Guide](https://github.com/KhronosGroup/SPIRV-Guide)

* 
[Vulkan Interfaces with SPIR-V](https://docs.vulkan.org/spec/latest/chapters/interfaces.html)

* 
[HLSL in Vulkan](hlsl.html)
