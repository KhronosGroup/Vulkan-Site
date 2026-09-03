# OpenXLA: XLA, StableHLO, and Where Vulkan Fits

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/15_openxla.html

## Table of Contents

- [Overview](#_overview)
- [How to think about it](#_how_to_think_about_it)
- [How_to_think_about_it](#_how_to_think_about_it)
- [A tiny practical workflow (Vulkan case)](#_a_tiny_practical_workflow_vulkan_case)
- [A_tiny_practical_workflow_(Vulkan_case)](#_a_tiny_practical_workflow_vulkan_case)
- [Limitations and expectations](#_limitations_and_expectations)
- [Limitations_and_expectations](#_limitations_and_expectations)
- [Incorporating IREE output into a Vulkan app](#_incorporating_iree_output_into_a_vulkan_app)
- [Incorporating_IREE_output_into_a_Vulkan_app](#_incorporating_iree_output_into_a_vulkan_app)
- [“Can I integrate the compiled model without IREE’s runtime?”](#_can_i_integrate_the_compiled_model_without_irees_runtime)
- [“Can_I_integrate_the_compiled_model_without_IREE’s_runtime?”](#_can_i_integrate_the_compiled_model_without_irees_runtime)
- [NNEF interop](#_nnef_interop)

## Content

OpenXLA is the umbrella for XLA, StableHLO, and related projects (including IREE) that together form a modern, open ML compiler stack. StableHLO is the standardized IR that many frameworks can export to (JAX and TensorFlow most directly), and XLA provides mature lowering to CPU and GPU backends. Vulkan is typically reached via IREE, which consumes StableHLO/MLIR and emits SPIR‑V.

Why this page exists: in the IREE chapter we mention StableHLO and XLA early. This short chapter gives you the mental model so those terms don’t feel like inside baseball.

Treat StableHLO as the language your model speaks after export. From that common language, you choose a downstream compiler for your target. If you’re headed to Vulkan, you’ll use IREE to lower StableHLO to SPIR‑V and ship a small runtime that records Vulkan dispatches. If you’re targeting CUDA/ROCm/CPU, you’ll stay with XLA’s backends (or other downstreams) and never touch Vulkan.

This separation is useful because training teams can standardize on producing StableHLO, while deployment teams choose the right downstream per platform without changing the training export.

Practical note: today, StableHLO export is most straightforward from JAX and TensorFlow; other ecosystems may require a conversion hop. When your end target is Vulkan, prefer StableHLO → IREE so you stay on a well‑supported path in this tutorial.

Export to StableHLO from training (or convert), compile with IREE for Vulkan using `--iree-hal-target-backends=vulkan`, then load the `.vmfb` in your app via IREE’s runtime. The full, step‑by‑step version is in [IREE](12_iree.html).

If your team already uses XLA in training, the StableHLO/IREE path minimizes friction when targeting Vulkan.

OpenXLA/XLA themselves do not directly target Vulkan in the way you’d ship a Vulkan binary. Vulkan is a first‑class target of IREE. Keep the mental model clear: StableHLO → IREE → SPIR‑V (Vulkan) for this tutorial.

IREE compiles your model to an artifact (commonly a `.vmfb` bytecode or ahead‑of‑time compiled module) and executes it via the IREE runtime. In a Vulkan application, this looks and feels just like using any other model runtime (e.g., ONNX Runtime or TFLite):

* 
Initialize the runtime and select the Vulkan HAL backend

* 
Load the compiled artifact

* 
Create input/output buffers (usually via runtime helpers)

* 
Invoke functions by name and read back results

In other words, you embed IREE’s runtime library alongside your app, and let it own the SPIR‑V modules, descriptor sets, and dispatch scheduling.

Conceptually, IREE lowers to SPIR‑V kernels plus host‑side scheduling logic; however, the artifact and the runtime share an ABI that isn’t exported as “drop‑in” SPIR‑V + standalone host code. Extracting kernels and re‑implementing the host scheduling inside your own Vulkan engine is theoretically possible but not a supported/stable path today—you’d be relying on internal details and would need to replicate significant parts of the runtime (descriptor management, push constants, synchronization, pipelines, etc.).

Practical guidance for this tutorial:

* 
Treat IREE as a runtime you link and call, the same way you would link ONNX Runtime or TFLite. The [IREE chapter](12_iree.html) shows the minimal embedding.

* 
If your app needs tighter interop (e.g., sharing a VkDevice or memory), look for the runtime’s supported hooks rather than trying to bypass it entirely.

If your source is NNEF, convert to ONNX or StableHLO first. From StableHLO, follow the IREE flow to reach Vulkan. This keeps the pipeline simple and repeatable.

[Previous: Mojo / MAX](14_mojo_max.html) | [Next: Choosing the Right Compiler](16_choosing_compiler.html)
