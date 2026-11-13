# Choosing the Right ML Compiler

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/16_choosing_compiler.html

## Table of Contents

- [Introduction](#_introduction)
- [Start with the non‑negotiables](#_start_with_the_nonnegotiables)
- [Start_with_the_non‑negotiables](#_start_with_the_nonnegotiables)
- [A Simple Decision Flow](#_a_simple_decision_flow)
- [A_Simple_Decision_Flow](#_a_simple_decision_flow)
- [Scenario guidance](#_scenario_guidance)
- [NNEF considerations](#_nnef_considerations)
- [Proof‑of‑Concept Checklist](#_proofofconcept_checklist)

## Content

There isn’t a single “best” ML compiler—there’s a best fit for your constraints. Optimize for inputs (ONNX, StableHLO, TFLite, NNEF), target platforms (desktop, mobile, embedded), required backends (Vulkan, Metal, CUDA), developer workflow, runtime footprint, and how much effort you’ll invest in tuning.

Decide what you absolutely must have. If Vulkan is required across your platforms, your first candidates are [IREE](12_iree.html) and [TVM](13_apache_tvm.html). If a tiny runtime and ahead‑of‑time packaging are essential, favor IREE or TVM’s AOT/CRT path. When you need device‑specific auto‑tuning for a particular phone or iGPU, TVM shines. If your training pipeline already speaks StableHLO/XLA, prefer exporting StableHLO and compiling with IREE for Vulkan; for non‑Vulkan targets, XLA stays in its lane. And if your team is standardized on Modular’s tools and their backends cover your hardware, MAX/Mojo can be the most comfortable fit.

Inputs: ONNX / StableHLO / TFLite / NNEF
Targets: Vulkan / Metal / CUDA / CPU

          ┌───────────────────────────────────────────────────────┐
          │ Need Vulkan and small runtime?                        │
          └───────────────┬───────────────────────────────────────┘
                          Yes                         No
                           │                           │
                           ▼                           ▼
                     Use IREE first              Prefer XLA/MAX/CPU
                     (StableHLO→SPIR‑V)          backends as needed
                           │
                           │ Need device‑specific tuning? (mobile/iGPU)
                           ├──────────► Yes: Consider TVM (Vulkan/OpenCL)
                           │               with auto‑scheduler
                           │
                           └──────────► No: Ship IREE AOT

This flow gets you to an initial choice quickly. From there, build a proof‑of‑concept to validate.

If you’re shipping Vulkan on desktop and Android and want a small, simple runtime, start with IREE. If your world is one phone or one iGPU where every millisecond matters, use TVM on Vulkan and tune. If your organization already exports StableHLO from TensorFlow/JAX, keep that export and compile with IREE for Vulkan. If you’re happily inside Modular’s ecosystem and your devices are supported, MAX/Mojo may be the least friction.

Two concrete pictures to anchor the thinking:

1) Embedded camera app (battery/thermals matter): You want predictable latency under thermal throttling and a tiny footprint. Export a fixed‑shape model, compile with IREE for Vulkan, validate numerics vs a CPU golden reference, and ship. If p95 latency is still too high on your device, try TVM and auto‑tune on‑device; keep the same validation harness. Pick the one that meets your latency/variance target with the smallest integration cost.

2) Desktop batch tool (throughput dominates): You process folders of images or short videos. Both IREE and TVM work; the simpler path wins. Start with TVM if you anticipate per‑GPU tuning across a fleet of diverse hardware. Start with IREE if you want one portable artifact with minimal runtime baggage. In either case, measure throughput per watt and per dollar if you pay for machines.

If your source of truth is NNEF, convert to ONNX or StableHLO first. From StableHLO, use IREE to reach Vulkan; from ONNX, import into TVM (Relay) and target Vulkan. For non‑Vulkan targets, follow the native downstream (MAX/Metal, XLA/CUDA). Script the conversion and test on a tiny sample so surprises show up early.

Use your real model on your real device. Keep it narrative, not a shopping list:

First, lock a fixed input tensor and save a CPU golden output (ONNX Runtime). Next, compile the model with IREE and TVM for Vulkan using their default, conservative options. Run both on your target for a few minutes: do N warmups, then measure p50/p95 latency and memory while clocks/thermals settle. Only after both paths are correct and stable should you try fp16 or INT8. If you need the last 20% on a specific phone/iGPU, run TVM’s auto‑scheduler and re‑measure; otherwise prefer the simpler integration. Make the decision with numbers in hand and artifact/runtime sizes on the table.

Common traps to avoid:

* 
Picking based on someone else’s benchmark instead of your model and device.

* 
Skipping the golden‑reference comparison and “tolerating” silent numeric drift.

* 
Mixing layouts between preprocessing and the compiled graph; decide once and stick to it.

* 
Tuning before you’re correct, or optimizing copies when kernel time dominates (or vice versa).

* 
Reporting only mean latency; p95 (and p99 on interactive apps) is what users feel.

[Previous: OpenXLA](15_openxla.html) | [Next: Vulkan Compute for ML](../Vulkan_Compute_for_ML/01_introduction.html)
