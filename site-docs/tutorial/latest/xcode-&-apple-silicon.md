# Xcode & Apple Silicon

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/02_environment_setup/04_xcode_apple.html

## Table of Contents

- [Introduction](#_introduction)
- [Where AI actually helps: migration and packaging](#_where_ai_actually_helps_migration_and_packaging)
- [Where_AI_actually_helps:_migration_and_packaging](#_where_ai_actually_helps_migration_and_packaging)
- [Native and agentic tooling in Xcode 26](#_native_and_agentic_tooling_in_xcode_26)
- [Native_and_agentic_tooling_in_Xcode_26](#_native_and_agentic_tooling_in_xcode_26)
- [Setting up the workflow](#_setting_up_the_workflow)
- [Setting_up_the_workflow](#_setting_up_the_workflow)
- [Step 1: Swift/C++ bridging with Swift Assist](#_step_1_swiftc_bridging_with_swift_assist)
- [Step_1:_Swift/C++_bridging_with_Swift_Assist](#_step_1_swiftc_bridging_with_swift_assist)
- [Step 2: cross-platform refactoring with Goose](#_step_2_cross_platform_refactoring_with_goose)
- [Step_2:_cross-platform_refactoring_with_Goose](#_step_2_cross_platform_refactoring_with_goose)
- [Step 3: local inference via Ollama](#_step_3_local_inference_via_ollama)
- [Step_3:_local_inference_via_Ollama](#_step_3_local_inference_via_ollama)
- [Step 4: smaller models for base hardware](#_step_4_smaller_models_for_base_hardware)
- [Step_4:_smaller_models_for_base_hardware](#_step_4_smaller_models_for_base_hardware)
- [Why unified memory matters for local inference](#_why_unified_memory_matters_for_local_inference)
- [Why_unified_memory_matters_for_local_inference](#_why_unified_memory_matters_for_local_inference)
- [Tradeoffs](#_tradeoffs)
- [Before moving on](#_before_moving_on)
- [Before_moving_on](#_before_moving_on)
- [Summary](#_summary)

## Content

Vulkan on Apple platforms always goes through a translation layer, since Apple doesn’t support Vulkan natively. **MoltenVK** and **KosmicKrisp** are the two options, and they trade off differently. **KosmicKrisp** is a Mesa-based implementation built specifically for Apple Silicon, using Metal 4 to support modern Vulkan (up to 1.4); it currently targets macOS 26+ and is expanding to iOS (A14+). **MoltenVK** is the older, more broadly compatible bridge, supporting everything from Intel Macs to the newest iPhones and iPads, and is generally the safer choice for production apps that need wide device coverage.

An AI assistant is useful here mainly for managing the differences between the two and helping with the migration work when you need to switch.

The tedious part of Apple Vulkan development is usually the conditional compilation and separate build targets needed to support both bridges, not the graphics logic itself. This is a reasonable place to delegate: state the constraint (e.g. "iOS target needs MoltenVK for compatibility, but keep an experimental KosmicKrisp path for A14+") and let the assistant draft the build configuration and the surface-creation code (`vkCreateMacOSSurfaceMVK` vs `vkCreateIOSSurfaceMVK` or their KosmicKrisp equivalents), then review it — this is exactly the kind of repetitive, well-specified restructuring that’s easy to check and easy to get wrong by hand.

Xcode 26 includes **Predictive Code Completion** and **Swift Assist**, on-device models aimed at Swift and Apple-specific code. These are useful for the Swift/SwiftUI side of a Vulkan project — for example, refactoring compute shader data structures that use `VK_EXT_scalar_block_layout` for better cache behavior on an M4 Max.

For larger, multi-file work — cross-platform refactors, compile-fix loops — an external agent like **Goose** is still worth using alongside Xcode’s built-in tools rather than instead of them. Xcode handles the inner loop (Swift completions, its Instruments profiler); the external agent handles the outer loop.

// Example SwiftUI wrapper generated with Swift Assist
import SwiftUI
import MetalKit

struct MetalView: UIViewRepresentable {
    func makeUIView(context: Context) -> UIView {
        let view = UIView()
        let layer = CAMetalLayer()
        view.layer.addSublayer(layer)
        // AI will add native scaling and MoltenVK handle here
        return view
    }
    func updateUIView(_ uiView: UIView, context: Context) {}
}

# Example agent instruction for a MoltenVK/KosmicKrisp migration
Goose, refactor our 'surface_creation.cpp' to support
both MoltenVK and KosmicKrisp. Ensure we use the
'vkCreateIOSSurfaceMVK' call for universal iOS support,
but enable a high-performance path for macOS 26+
using the new KosmicKrisp Metal 4 features.

Apple Silicon’s unified memory means a local model can use significantly more memory than it could on a typical discrete GPU. A 30B model like **Qwen 3-Coder** can run locally on an M-series Max/Ultra chip with 48GB+ of available memory.

# Run the 30B model locally on Apple Silicon
ollama run qwen3-coder:30b

On a base M3 or M4 with 16GB or 24GB of RAM, a 30B model is likely too much. **Mistral-Nemo (12B)** or **Llama 4 (17B)** run efficiently on Apple’s Neural Engine and leave more memory for your Vulkan framebuffers and texture streaming.

On a typical PC, a local model is limited to whatever VRAM your GPU has. On a Mac, the model and the OS share the same memory pool, so a machine with 64GB of RAM can give a local model access to most of it — you can run a 30B model locally while still leaving headroom for large texture arrays, something that’s much harder on a 12–16GB discrete GPU. Apple’s **MLX** framework lets models run efficiently on the Neural Engine specifically, which helps here too.

**Managing the handoff between Xcode’s native AI and external agents** is the main friction point — there’s no single tool that covers both the Swift side and the heavy Vulkan refactoring. Terminal-based agents (Aider) or Goose triggers that run alongside Xcode are the usual workaround.

**Where it helps: shader translation errors.** When MoltenVK or KosmicKrisp fails to translate SPIR-V into Metal, the resulting error can be hard to parse on its own. Feeding the log to a model with context on both the Vulkan spec and MSL is a reasonable way to narrow down which SPIR-V instruction is at fault and how to adjust your GLSL/Slang source. KosmicKrisp users can also set `MESA_KK_DEBUG=msl` to inspect the generated MSL directly alongside the AI’s explanation.

The rest of this tutorial assumes an Apple setup with Xcode 26’s native completion for Swift/C++ bridging, an agent like Goose (backed by a cloud model such as Claude 4.6) for cross-file refactoring, and a local model via Ollama/MLX for fast iteration. Once these are in place, continue to [Goose & Local Intelligence](05_goose_native_agent.html) to finish setting up the agent and local inference.

Apple Vulkan development means working across two layers — Swift/Metal and Vulkan/C++ — and an AI assistant is most useful for keeping the boilerplate and translation-layer differences between MoltenVK and KosmicKrisp from eating your time, whether you’re targeting broad compatibility or KosmicKrisp’s newer feature set.

[Previous: Environment Introduction](01_introduction.html) | [Next: Goose Native Agent](05_goose_native_agent.html)
