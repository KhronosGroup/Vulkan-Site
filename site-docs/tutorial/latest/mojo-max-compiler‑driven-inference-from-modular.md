# Mojo / MAX: Compiler‑Driven Inference from Modular

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/14_mojo_max.html

## Table of Contents

- [Overview](#_overview)
- [Tools you’ll need](#_tools_youll_need)
- [Tools_you’ll_need](#_tools_youll_need)
- [Positioning vs. IREE/TVM](#_positioning_vs_ireetvm)
- [Positioning_vs._IREE/TVM](#_positioning_vs_ireetvm)
- [The idea before the commands](#_the_idea_before_the_commands)
- [The_idea_before_the_commands](#_the_idea_before_the_commands)
- [Practical workflow (high‑level)](#_practical_workflow_highlevel)
- [Practical_workflow_(high‑level)](#_practical_workflow_highlevel)
- [Target backends and Vulkan](#_target_backends_and_vulkan)
- [Target_backends_and_Vulkan](#_target_backends_and_vulkan)
- [Integration patterns](#_integration_patterns)
- [Validating correctness (don’t skip this)](#_validating_correctness_dont_skip_this)
- [Validating_correctness_(don’t_skip_this)](#_validating_correctness_dont_skip_this)
- [Android and embedded notes](#_android_and_embedded_notes)
- [Android_and_embedded_notes](#_android_and_embedded_notes)
- [Troubleshooting](#_troubleshooting)
- [NNEF Interop](#_nnef_interop)

## Content

Mojo (programming language) and MAX (inference engine) from Modular focus on giving developers a Python‑like experience with compiler‑level performance. The workflow emphasizes importing common model formats, performing graph and kernel optimizations, and deploying compact, production‑ready artifacts. The stack evolves rapidly; treat this chapter as practical guidance rather than a fixed spec. Our goal here is to teach the mental model and the integration shape so you can execute a first working build and evaluate fit.

Plan to validate in Python first. Have your training framework handy for export, an ONNX toolchain if you standardize on ONNX, and the MAX/Mojo SDK for your platform. Exact installers and CLIs change frequently—follow Modular’s current docs to get the right versions for your OS. Keep a CPU golden reference ready (e.g., ONNX Runtime) so you can quantify correctness as you change compilers or precision.

If you need a highly controllable open compiler with Vulkan AOT today, [IREE](12_iree.html) and [TVM](13_apache_tvm.html) are the most mature for Vulkan. MAX/Mojo prioritize developer ergonomics and an integrated experience. When they meet your platform needs, you get a very pleasant workflow with strong performance.

Be explicit about backend requirements. MAX commonly emphasizes CPU and vendor GPU backends (e.g., CUDA/Metal). Vulkan availability is platform‑dependent and may arrive indirectly (via SPIR‑V/WebGPU paths) in some environments. If Vulkan is a hard requirement across targets, verify current support on your devices; otherwise prefer IREE/TVM for this tutorial’s Vulkan‑first path.

MAX compiles your model once and gives you a packaged artifact plus a small runtime that you call from your app. Keep your preprocessing/post‑processing in Vulkan so you can share code with other paths in this tutorial. Treat MAX like a library boundary: tensors in, tensors out.

You’ll convert/import, compile/package, then run/deploy. Most teams standardize on ONNX as the handoff, with PyTorch→ONNX or TensorFlow→SavedModel/ONNX. Compile for your targets and ship the artifact with the runtime. In your app, call the packaged model like a library. Keep Vulkan preprocessing/post‑processing outside so the rest of your code stays the same across compilers.

Anchor the process with one fixed‑shape model and one reproducible input tensor. Run a CPU golden reference once and save the expected output. Each time you change compiler options or backends, compare against the same reference with a simple error metric (MAE/RMSE). This turns integration into a controlled experiment rather than guesswork.

Because CLI and API details change over time, consult current documentation for exact invocations. The key architectural idea is consistent with the rest of this tutorial: compile once per model/config, ship a small runtime, and keep your Vulkan preprocessing/postprocessing separate for clarity and performance.

Backend coverage changes as releases land. On desktop, expect strong CPU and vendor GPU backends (CUDA/Metal). Vulkan support may arrive indirectly (SPIR‑V or WebGPU paths) depending on platform and release—verify on your target hardware. On mobile/embedded, double‑check supported backends and keep an eye on footprint.

If Vulkan availability is a hard requirement and you need to ship now, prefer IREE/TVM. If MAX’s supported backends meet your hardware, it can be the most comfortable path for teams that value a cohesive toolchain.

Regardless of compiler choice, the integration pattern with your Vulkan app is the same:

1) Preprocess in Vulkan: resize/normalize into a tensor buffer to avoid CPU overhead.
2) Invoke the compiled model via the engine runtime.
3) Post‑process in Vulkan/CPU and present.

This keeps copies to a minimum and lets you overlap work using async compute.

Keep a reference path (e.g., ONNX Runtime on CPU) next to your compiled path. Feed identical inputs, compute an error metric, and bisect differences layer‑by‑layer when results diverge. Lock this into a small script you can run on every build; it pays for itself the first time a driver update or precision change would have shipped a silent regression.

Cross‑compile the runtime for your ABI, ship the packaged model with your assets, and measure on‑device. If you need duty‑cycle control for thermals, apply the same framing used in the Embedded chapters: run inference intermittently and use Vulkan to interpolate between results when visual continuity matters.

If a model fails to import, simplify the graph at export, verify shapes, and try an alternate interchange (ONNX vs SavedModel). If runtime outputs look off, compare against a golden reference (CPU) and fix the first divergent layer before you chase performance.

Use NNEF→ONNX conversion as the first step. Once in ONNX, follow the standard compiler import path for MAX/Mojo.

[Previous: Apache TVM](13_apache_tvm.html) | [Next: OpenXLA](15_openxla.html)
