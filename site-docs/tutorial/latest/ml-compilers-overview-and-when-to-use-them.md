# ML Compilers: Overview and When to Use Them

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/11_ML_Compilers.html

## Table of Contents

- [Introduction](#_introduction)
- [The mental model: compile vs interpret, and the boundary contract](#_the_mental_model_compile_vs_interpret_and_the_boundary_contract)
- [The_mental_model:_compile_vs_interpret,_and_the_boundary_contract](#_the_mental_model_compile_vs_interpret_and_the_boundary_contract)
- [60‑Second Primer: MLIR, StableHLO, XLA, and IREE](#_60second_primer_mlir_stablehlo_xla_and_iree)
- [60‑Second_Primer:_MLIR,_StableHLO,_XLA,_and_IREE](#_60second_primer_mlir_stablehlo_xla_and_iree)
- [What ML Compilers Do](#_what_ml_compilers_do)
- [What_ML_Compilers_Do](#_what_ml_compilers_do)
- [Relation to Model Formats (including NNEF)](#_relation_to_model_formats_including_nnef)
- [Relation_to_Model_Formats_(including_NNEF)](#_relation_to_model_formats_including_nnef)
- [When To Choose an ML Compiler](#_when_to_choose_an_ml_compiler)
- [When_To_Choose_an_ML_Compiler](#_when_to_choose_an_ml_compiler)
- [Your first working build (concept, not a shopping list)](#_your_first_working_build_concept_not_a_shopping_list)
- [Your_first_working_build_(concept,_not_a_shopping_list)](#_your_first_working_build_concept_not_a_shopping_list)
- [A note on “just give me the SPIR‑V”](#_a_note_on_just_give_me_the_spirv)
- [A_note_on_“just_give_me_the_SPIR‑V”](#_a_note_on_just_give_me_the_spirv)

## Content

ML compilers take trained models and turn them into programs for a specific device. Instead of interpreting a graph op‑by‑op at runtime, a compiler lowers the model through intermediate representations (IRs), applies graph and kernel optimizations (fusion, tiling, layout specialization, precision changes), and emits code tuned for your hardware (GPU, CPU, DSP/NPU; for us, Vulkan via SPIR‑V).

This section introduces the ML Compiler path in our three‑path approach to inference and teaches you how to think about it so you can actually ship something:

**Path 1: Third‑Party Runtimes** (ONNX Runtime, TensorFlow Lite, etc.) — fast to integrate, widely supported.

**Path 2: Custom Vulkan** — educational and sometimes necessary for tight graphics integration.

**Path 3: ML Compilers** — a middle ground that preserves a high‑level workflow while generating efficient, portable binaries or command streams, often with Vulkan/WebGPU/Metal backends. You still “own” your app; the compiler gives you a compact artifact and a small runtime that executes it.

The most useful shift is to treat the compiled model as a program with a narrow API surface.

* 
Your app continues to own cameras, UI, file I/O, logging, power/thermal policy, and any Vulkan preprocessing/post‑processing shaders.

* 
The compiler’s runtime owns model execution: SPIR‑V modules, descriptor layouts, dispatch scheduling, and synchronization inside the model.

Keep the exchange boring: “tensors in, tensors out.” Start with simple host‑visible copies at the boundary. Once correctness is boring, optimize data movement (zero‑copy, external memory, or runtime interop hooks) only where it matters.

* 
MLIR is a compiler infrastructure for building IRs and transformations. It organizes operations and types into “dialects.” Projects like IREE use MLIR to progressively lower ML graphs toward targets like Vulkan (via SPIR‑V). See [Glossary](../glossary.html).

* 
StableHLO is a standardized ML IR (and an MLIR dialect). Treat it like a portable “assembly” for neural networks after export from frameworks.

* 
XLA is a compiler (in the OpenXLA ecosystem) used by TensorFlow/JAX to lower StableHLO/HLO to CPUs/GPUs.

* 
IREE is another OpenXLA project that compiles StableHLO/MLIR to deployable artifacts for targets like Vulkan (via SPIR‑V), Metal, CUDA, and CPU, with a small runtime.

Common MLIR dialects you may see mentioned: StableHLO, TOSA, Linalg, and MHLO. Don’t worry about the details—the chapters show concrete commands and code; the Glossary has concise definitions.

For Vulkan, the path you’ll use in this section is typically: StableHLO → IREE → SPIR‑V (Vulkan), or ONNX → TVM → SPIR‑V (Vulkan). If MLIR/StableHLO are unfamiliar, skim [OpenXLA](15_openxla.html) and see short definitions in [Glossary](../glossary.html).

Import a model (ONNX, TFLite, StableHLO/XLA, TorchScript, etc.).

Lower it into one or more intermediate representations (IRs).

Apply graph‑level and kernel‑level optimizations (fusion, tiling, quantization, layout transforms).

Generate code for the selected backend (SPIR‑V, LLVM, CUDA, Metal, etc.).

Package artifacts and minimal runtime stubs for deployment.

Compilers frequently accept ONNX and/or StableHLO/XLA. Some also support NNEF (Neural Network Exchange Format) or provide conversion tools. In practice, ONNX and StableHLO are most common today; however, if your toolchain or vendor uses NNEF, an ML compiler can be a practical way to bring NNEF models onto Vulkan through SPIR‑V or via a WebGPU path. See [NNEF Introduction](../Building_the_Inference_Engine/06_nnef_introduction.html) for how to reason about graphs, tensors, and layouts—the same thinking helps you validate compiler output.

* 
You want ahead‑of‑time (AOT) or just‑in‑time (JIT) specialization for your exact device.

* 
You need performance beyond generic runtimes but don’t want to hand‑write shaders.

* 
You require multiple backends (Vulkan, Metal, CUDA) from one source model.

* 
You plan to use quantization or mixed precision and want compiler‑driven validation.

In the following chapters, we’ll cover several options: IREE (OpenXLA project), Apache TVM, Modular’s MAX/Mojo toolchain, and OpenXLA’s XLA/StableHLO ecosystem — ending with a short “Choosing a Compiler” guide.

Aim for boring repeatability over exhaustive flags. The arc that works in practice is:

Pick a single, fixed‑shape model variant from training. If your source is NNEF, convert to ONNX or StableHLO first so you’re on a happy path for compilers.

Compile for Vulkan with your chosen tool:

* 
IREE: `--iree-hal-target-backends=vulkan` on a StableHLO/MLIR input → `.vmfb` artifact.

* 
TVM: import ONNX to Relay and `target="vulkan"` → deployable module (shared lib or AOT).

Run on your dev machine first (use headless Vulkan if needed), compare outputs to a CPU golden reference (ONNX Runtime), and only then deploy to your device.

Keep your Vulkan preprocessing/post‑processing outside the compiler runtime so the rest of your app stays identical across paths (runtimes vs compilers vs custom). This makes A/B validation and future swaps low‑risk.

Both IREE and TVM ultimately produce SPIR‑V, but they execute it via their runtimes with a shared ABI. Pulling kernels out and re‑implementing the host scheduler inside your own Vulkan engine is not a stable or supported path today. Treat compilers like you treat ONNX Runtime/TFLite: link the runtime, load the artifact, set inputs, run, fetch outputs. If you need tighter interop, look for supported hooks in the specific runtime.

[Previous: Choosing the Right Library](10_choosing_library.html) | [Next: IREE](12_iree.html)
