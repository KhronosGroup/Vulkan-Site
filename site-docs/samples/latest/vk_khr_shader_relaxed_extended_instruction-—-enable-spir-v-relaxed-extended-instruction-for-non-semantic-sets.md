# VK_KHR_shader_relaxed_extended_instruction — Enable SPIR-V relaxed extended instruction for non-semantic sets

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/shader_relaxed_extended_instruction/README.html

## Table of Contents

- [What is it?](#_what_is_it)
- [What_is_it?](#_what_is_it)
- [Why/when to use it](#_whywhen_to_use_it)
- [Why/when_to_use_it](#_whywhen_to_use_it)
- [What this sample does](#_what_this_sample_does)
- [What_this_sample_does](#_what_this_sample_does)
- [How to use it](#_how_to_use_it)
- [How_to_use_it](#_how_to_use_it)
- [Required Vulkan extensions and features](#_required_vulkan_extensions_and_features)
- [Required_Vulkan_extensions_and_features](#_required_vulkan_extensions_and_features)
- [Why HLSL (DXC) instead of Slang or GLSL?](#_why_hlsl_dxc_instead_of_slang_or_glsl)
- [Why_HLSL_(DXC)_instead_of_Slang_or_GLSL?](#_why_hlsl_dxc_instead_of_slang_or_glsl)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/shader_relaxed_extended). |
| --- | --- |

This sample demonstrates the device feature VK_KHR_shader_relaxed_extended_instruction and how it relates to SPV_KHR_relaxed_extended_instruction in SPIR-V. The SPIR-V extension introduces a new instruction that allows certain forward references in extended instruction sets used by non-semantic information (for example, the NonSemantic.DebugPrintf instruction set used by GL_EXT_debug_printf). In Vulkan, those non-semantic instruction sets are allowed via VK_KHR_shader_non_semantic_info.

* 
SPV_KHR_relaxed_extended_instruction adds a SPIR-V mechanism to relax forward‑reference rules for extended instruction sets, specifically for non‑semantic information.

* 
VK_KHR_shader_relaxed_extended_instruction is the Vulkan device extension/feature that allows modules using that SPIR‑V extension to be consumed by the driver.

* 
This interacts with SPV_KHR_non_semantic_info and VK_KHR_shader_non_semantic_info: the relaxed forward‑reference rule applies to non‑semantic extended instruction sets like `NonSemantic.DebugPrintf`.

The feature is exposed via `VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR` with a single boolean field `shaderRelaxedExtendedInstruction`.

* 
When compiling shaders that embed non‑semantic extended instruction sets (e.g., debug info or debugPrintf) that may use forward references that were previously disallowed.

* 
When you want tool and debugging SPIR‑V to be accepted by implementations that support this relaxation, without affecting the program’s semantics (non‑semantic content does not change the observable results).

* 
Shaders should continue to function when the feature is off; the relaxation only affects acceptance of certain SPIR‑V forms, not execution semantics.

* 
Enables device extensions: `VK_KHR_shader_relaxed_extended_instruction` and `VK_KHR_shader_non_semantic_info`.

* 
Requests the feature via the framework’s feature‑chaining helper.

* 
Builds a tiny compute pipeline whose shader calls `debugPrintfEXT` (a non‑semantic extended instruction) using a class method to demonstrate the relaxed forward‑reference pattern.

* 
Renders a visible UI and background and only dispatches the compute shader on demand (or when a UI value changes). This avoids per‑frame logging spam while still demonstrating consumption of a module that contains non‑semantic extended instructions.

* 
The sample shows a small UI panel with:

A `Value` slider (integer). Changing it triggers a one‑shot compute dispatch that prints the new value from the shader.

* 
A `Dispatch once` button to manually run a one‑shot dispatch.

* 
“Last messages” — the last 5 lines captured from `debugPrintf` via `VK_EXT_debug_utils`.

The shader prints only from thread `(0,0,0)` and only when you request a dispatch, so there is no per‑frame console spam.

* 
Device extensions (required by this sample):

`VK_KHR_shader_relaxed_extended_instruction`

* 
`VK_KHR_shader_non_semantic_info`

Instance extension for feature chaining: `VK_KHR_get_physical_device_properties2` (the framework enables this; the sample requests it explicitly).

Device feature (required): `VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR::shaderRelaxedExtendedInstruction = VK_TRUE`

|  | This sample relies on the Vulkan Validation Layers (VVL) to capture and display `debugPrintfEXT` output from the non‑semantic instruction set. Ensure that VVL is enabled when running the sample. Debug builds of Vulkan‑Samples automatically enable validation; on Release builds you may need to enable validation explicitly via your environment or runtime settings. |
| --- | --- |

Code excerpt:

ShaderRelaxedExtendedInstruction::ShaderRelaxedExtendedInstruction()
{
    title = "Shader relaxed extended instruction (VK_KHR_shader_relaxed_extended_instruction)";
    add_instance_extension(VK_KHR_GET_PHYSICAL_DEVICE_PROPERTIES_2_EXTENSION_NAME);
    add_device_extension(VK_KHR_SHADER_RELAXED_EXTENDED_INSTRUCTION_EXTENSION_NAME);
    add_device_extension(VK_KHR_SHADER_NON_SEMANTIC_INFO_EXTENSION_NAME);
}

void ShaderRelaxedExtendedInstruction::request_gpu_features(vkb::core::PhysicalDeviceC &gpu)
{
    REQUEST_REQUIRED_FEATURE(gpu,
        VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR,
        shaderRelaxedExtendedInstruction);
}

Shader (HLSL, compiled with DXC) used by this sample:

// RUN: %dxc %s -T cs_6_0 -spirv -fspv-target-env=vulkan1.3 -E main -fspv-debug=vulkan-with-source -O3

struct PushConstants { uint value; };
[[vk::push_constant]] PushConstants pc;

class A {
  void foo(uint v) {
    printf("relaxed-ext-inst demo: value = %u", v);
  }
};

[numthreads(1, 1, 1)]
void main(uint3 gid : SV_DispatchThreadID)
{
  A a;
  if (all(gid == uint3(0,0,0))) { a.foo(pc.value); }
}

At the time of writing, Slang and glslc in the Vulkan SDK does not emit the necessary debug information patterns that lead to `OpExtInstWithForwardRef` in SPIR-V for this demonstration. The HLSL/DXC path above does emit the required SPIR-V relaxed extended instruction sequence, so this sample uses HLSL for reliability.

|  | To actually see the `debugPrintfEXT` output, run with validation configured to capture debug printf (see the `shader_debugprintf` sample or use VK_EXT_layer_settings to enable `VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT`). This sample registers an INFO‑severity `VkDebugUtilsMessengerEXT` so messages are visible when validation is active. |
| --- | --- |

|  | If `VK_EXT_layer_settings` is not available from the validation layer at runtime, the sample automatically falls back to `VK_EXT_validation_features` and enables `VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT` during instance creation. In that case you do not need any environment configuration to see output. |
| --- | --- |
