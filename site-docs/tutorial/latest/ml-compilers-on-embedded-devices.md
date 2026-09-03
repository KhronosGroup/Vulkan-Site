# ML Compilers on Embedded Devices

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Embedded_Applications/07_ml_compiler.html

## Table of Contents

- [Why compilers change the game on small devices](#_why_compilers_change_the_game_on_small_devices)
- [Why_compilers_change_the_game_on_small_devices](#_why_compilers_change_the_game_on_small_devices)
- [The boundary contract: who owns what](#_the_boundary_contract_who_owns_what)
- [The_boundary_contract:_who_owns_what](#_the_boundary_contract_who_owns_what)
- [Picking a path: IREE or TVM](#_picking_a_path_iree_or_tvm)
- [Picking_a_path:_IREE_or_TVM](#_picking_a_path_iree_or_tvm)
- [Shape the model for the device you have](#_shape_the_model_for_the_device_you_have)
- [Shape_the_model_for_the_device_you_have](#_shape_the_model_for_the_device_you_have)
- [The first working build (concept, not a shopping list)](#_the_first_working_build_concept_not_a_shopping_list)
- [The_first_working_build_(concept,_not_a_shopping_list)](#_the_first_working_build_concept_not_a_shopping_list)
- [Integrating the runtime into a Vulkan app](#_integrating_the_runtime_into_a_vulkan_app)
- [Integrating_the_runtime_into_a_Vulkan_app](#_integrating_the_runtime_into_a_vulkan_app)
- [Proving you’re correct (before you tune anything)](#_proving_youre_correct_before_you_tune_anything)
- [Proving_you’re_correct_(before_you_tune_anything)](#_proving_youre_correct_before_you_tune_anything)
- [Measuring what matters on embedded](#_measuring_what_matters_on_embedded)
- [Measuring_what_matters_on_embedded](#_measuring_what_matters_on_embedded)
- [A short deployment checklist (framed as decisions)](#_a_short_deployment_checklist_framed_as_decisions)
- [A_short_deployment_checklist_(framed_as_decisions)](#_a_short_deployment_checklist_framed_as_decisions)

## Content

On embedded platforms, every milliwatt and every megabyte matters. You’re balancing three constraints at once: tight memory, variable GPU/CPU clocks (often throttled by thermals), and drivers that don’t always look like their desktop cousins. A general‑purpose interpreter can carry overhead you can’t afford. A compiler takes your trained model and specializes it for the exact device you’ll ship on, producing a compact artifact and a tiny runtime that knows how to drive the GPU well.

The mental shift is important: you’re no longer “loading a model and interpreting ops.” You’re shipping a program generated from that model. That program contains SPIR‑V kernels (for Vulkan targets) and the host‑side logic to bind buffers and dispatch them in the right order. Your job moves from “author kernels” to “choose the right compiler path, integrate its runtime cleanly, and validate numerics.”

Think of your app and the compiler runtime meeting at a narrow boundary.

* 
Your app owns product concerns: camera I/O, pre/post‑processing shaders, UI, storage, power policy, logging, crash handling.

* 
The compiler’s runtime owns the model execution: device selection, SPIR‑V modules, descriptor layouts, dispatch scheduling, synchronization within the model.

Keep the boundary boring. Exchange data in a couple of well‑defined buffers or images. Start with simple host‑visible copies at the boundary; once correctness is locked in, consider zero‑copy or handle‑level interop only if the runtime exposes stable hooks for it.

Both IREE and Apache TVM can target Vulkan on embedded GPUs. They take different approaches, and that affects how you work day‑to‑day.

* 
IREE: feed StableHLO/MLIR, compile with the Vulkan backend, and link a small C/C++ runtime. Strengths: slim footprint, Vulkan‑first design, good embedded story. You’ll typically convert sources (ONNX/TFLite/NNEF) into StableHLO as a staging IR before compiling. See [IREE](../Third_Party_Libraries/12_iree.html) for the exact switches and a minimal embedding.

* 
TVM: import to Relay (commonly from ONNX), build for `target="vulkan"`, and load the produced module via TVM’s runtime (graph executor or AOT/CRT). Strengths: broad import support, auto‑scheduling to tune for a specific device, flexibility. See [TVM](../Third_Party_Libraries/13_apache_tvm.html) for the concrete Python and C++ shapes.

You don’t have to pick forever—prototype both, measure latency/variance/power, and ship the one that meets your constraints with the least complexity.

Compilers do more with models that are easy to reason about. You can help them by making a few principled choices during export:

* 
Prefer static shapes on the hot path. Dynamic shapes expand code size and can limit aggressive scheduling. If inputs vary (e.g., camera resolution), normalize at the boundary to a small set of fixed sizes.

* 
Decide on precision up front. If you can validate INT8 safely for your task, enable quantization before compiling; it reduces bandwidth and can cut latency significantly on mobile iGPUs. If you stay in fp16/fp32, be explicit about where conversions happen so you don’t pay hidden costs.

* 
Keep layouts consistent. Channels‑last vs channels‑first can flip memory access patterns on their head. Match your pre/post‑processing to whatever the compiler chooses or locks in.

Here’s the arc that reliably gets you to “runs correctly on the device” without drowning in options:

Export a single, fixed‑shape variant of your model. If your source of truth is NNEF, convert to ONNX or StableHLO first ([NNEF introduction](../Building_the_Inference_Engine/06_nnef_introduction.html) explains why this is a clean staging step).

Compile for Vulkan with your chosen toolchain. In IREE, that means using the Vulkan HAL backend; in TVM, setting `target="vulkan"` when you build Relay.

Run the artifact on your dev machine first. Use a headless Vulkan ICD if needed ([Headless Vulkan](../Desktop_Applications/04_ci_render_validation.html)) to eliminate device‑bring‑up variables.

Only then deploy to the board and repeat the same correctness check on‑device.

One tiny command block to anchor the idea (details live in the dedicated chapters):

# IREE (conceptual): compile to a Vulkan module
iree-compile model.stablehlo  \
  --iree-hal-target-backends=vulkan \
  -o model.vmfb

# TVM (conceptual): build an ONNX model for Vulkan
# (Python) relay.build(mod, target="vulkan", params=params)

Notice what is not here: we’re not editing SPIR‑V or juggling descriptor sets ourselves. The runtime generated by the compiler owns that.

Treat the compiler runtime like you would treat ONNX Runtime or TFLite: initialize it once, prepare input/output buffers, call into it each frame or request, and then hand the results back to your app.

In practice this feels like:

Initialize the runtime with a Vulkan backend (IREE) or create a Vulkan device target (TVM).

Create or wrap input/output tensors. Start with host‑visible allocations and memcpy; evolve to device‑local with explicit copies once you have correctness.

Invoke the compiled function by name.

Read back outputs and proceed with your pipeline.

// Pseudocode: not production code, just the call cadence
auto runtime = init_compiler_runtime_vulkan(/* VkInstance/Device if supported */);
auto module  = runtime.load("model.vmfb" /* or model_vulkan.so */);
Tensor in    = runtime.make_tensor(shape, dtype);
Tensor out   = runtime.make_tensor(out_shape, dtype);

runtime.set_input(module, "input", in);
runtime.run(module);
runtime.get_output(module, 0, out);

If you later need tighter interop (sharing a VkDevice or memory), look for the supported hooks in the runtime. Re‑implementing the host‑side scheduler inside your own Vulkan codebase is not a stable path today.

Build a golden path you trust and keep it next to your compiled path. ONNX Runtime on CPU is the usual choice. Feed identical inputs, compute an error metric like mean absolute error, and stop at the first mismatch. With quantized models, set realistic tolerances and decompose differences layer‑by‑layer until you find the first divergence.

This discipline is what lets you change quantization settings, switch compilers, or refactor pre/post‑processing without fear.

Latency distributions beat single numbers—measure p50/p90/p99 over a realistic window, not just a warm cache run. Watch clocks and thermals; many SoCs down‑clock after 10–30 seconds. Separate time spent inside the compiler runtime from the time you spend copying at the boundary; optimize the bigger bar first. When INT8 wins, it usually wins by reducing memory traffic, not by making ALU magically faster.

Decide where artifacts live (on disk, in your APK, in firmware) and how you version them. Decide which ABIs you support and set up cross‑compilation of the runtime in CI. Decide your fallback: if the Vulkan path isn’t available, do you run a CPU version, or disable the feature? Decide how you’ll validate on every commit (headless Vulkan in CI plus a couple of fixed test vectors is often enough).

If you pause to make those decisions explicitly, the rest of the bring‑up tends to be smooth.

[Previous: Scene Understanding with OpenXR](06_scene_understanding_openxr.html) | [Next: NNEF on Embedded: A Small Example](08_nnef_example.html)
