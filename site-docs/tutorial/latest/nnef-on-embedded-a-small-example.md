# NNEF on Embedded: A Small Example

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Embedded_Applications/08_nnef_example.html

## Table of Contents

- [What you’ll accomplish](#_what_youll_accomplish)
- [What_you’ll_accomplish](#_what_youll_accomplish)
- [The mental model, one more time](#_the_mental_model_one_more_time)
- [The_mental_model,_one_more_time](#_the_mental_model_one_more_time)
- [1) Start with a tiny NNEF model](#_1_start_with_a_tiny_nnef_model)
- [1)_Start_with_a_tiny_NNEF_model](#_1_start_with_a_tiny_nnef_model)
- [2) Convert NNEF → ONNX](#_2_convert_nnef_onnx)
- [2)_Convert_NNEF_→_ONNX](#_2_convert_nnef_onnx)
- [3) Establish a golden reference](#_3_establish_a_golden_reference)
- [3)_Establish_a_golden_reference](#_3_establish_a_golden_reference)
- [4) Compile ONNX → Vulkan with TVM](#_4_compile_onnx_vulkan_with_tvm)
- [4)_Compile_ONNX_→_Vulkan_with_TVM](#_4_compile_onnx_vulkan_with_tvm)
- [5) Repeat the check on the device](#_5_repeat_the_check_on_the_device)
- [5)_Repeat_the_check_on_the_device](#_5_repeat_the_check_on_the_device)
- [If you prefer IREE](#_if_you_prefer_iree)
- [If_you_prefer_IREE](#_if_you_prefer_iree)
- [Troubleshooting you’re likely to meet](#_troubleshooting_youre_likely_to_meet)
- [Troubleshooting_you’re_likely_to_meet](#_troubleshooting_youre_likely_to_meet)
- [What “done” looks like](#_what_done_looks_like)
- [What_“done”_looks_like](#_what_done_looks_like)

## Content

By the end of this page you’ll have taken a tiny NNEF model, converted it to a compiler‑friendly IR, compiled it for a Vulkan‑capable embedded GPU, and verified that the numbers match a golden reference. We’ll keep the flow teachable and concrete without burying you in tool flags.

We’ll use the ONNX→TVM→Vulkan route for specificity (TVM’s ONNX import path is stable), and point to the IREE chapter for the StableHLO route if that’s a better fit for your stack.

NNEF is how the model is described. TVM or IREE turns that description into a program your device can run. Your job is to: 1) normalize the model into a format the compiler likes, 2) compile for Vulkan, 3) run the artifact via the compiler’s runtime, 4) compare against a reference you trust.

Pick something with Conv→ReLU→Pool or a small classifier—simple enough that you can reason about shapes and spot errors. You’ll have a text graph (e.g., `graph.nnef`) and binary weight files. If you haven’t read an NNEF package before, skim the [NNEF introduction](../Building_the_Inference_Engine/06_nnef_introduction.html)—it explains what’s on disk and how to think about layout and quantization.

Use a converter in your toolchain to translate the NNEF graph and weights into ONNX. The converter’s job is mechanical: map op kinds and attributes, preserve shapes and dtypes, and carry any quantization metadata. You don’t need to memorize a specific binary name—the point is to land in ONNX because TVM’s importer is robust there.

After conversion, open the ONNX file in a viewer or print the graph nodes. Sanity‑check three things: the first input’s shape, the output’s shape, and that your conv/pool attributes look right (kernel, stride, padding).

Before you involve Vulkan, generate expected outputs on CPU. ONNX Runtime makes that short and sweet. Keep this alongside your compiled path; you’ll use it again later on the device.

import onnxruntime as ort
import numpy as np

sess = ort.InferenceSession("model.onnx", providers=["CPUExecutionProvider"])
inp  = np.random.randn(1, 3, 64, 64).astype("float32")  # adjust to your model
ref  = sess.run(None, {sess.get_inputs()[0].name: inp})[0]

In TVM, you import the ONNX model into Relay, build for `target="vulkan"`, and get back a module plus a small runtime wrapper that knows how to execute it. The full example is in [the TVM chapter](../Third_Party_Libraries/13_apache_tvm.html); here’s the essential shape to anchor the idea:

from tvm import relay, target, transform
import tvm, onnx
from tvm.contrib import graph_executor

onnx_model = onnx.load("model.onnx")
mod, params = relay.frontend.from_onnx(onnx_model, {"input": inp.shape}, freeze_params=True)

with transform.PassContext(opt_level=3):
    lib = relay.build(mod, target=tvm.target.Target("vulkan"), params=params)

dev    = tvm.vulkan(0)
rt_mod = graph_executor.GraphModule(lib["default"](dev))
rt_mod.set_input("input", tvm.nd.array(inp, device=dev))
rt_mod.run()
out = rt_mod.get_output(0).numpy()

At this point you can compare `out` to `ref` and compute a simple error metric. If you’re quantized, expect small but bounded differences; otherwise they should match closely.

To deploy, export a shared library and load it the same way on your device:

lib.export_library("model_vulkan.so")

On‑device you’ll link TVM’s runtime for your ABI, load `model_vulkan.so`, set inputs, run, and fetch outputs. That call cadence is shown in the TVM page’s minimal C++ sketch.

Run the compiled module on your board, feed the same fixed input, and compute the same error metric against your saved `ref`. This is where you catch layout mix‑ups, dtype promotions, or precision decisions that differ across builds. Only after this passes should you change anything performance‑related.

The IREE path looks similar conceptually: convert NNEF→StableHLO, compile with the Vulkan backend, deploy the `.vmfb` artifact, and invoke functions via IREE’s runtime. The detailed switches and the minimal embedding live in [IREE](../Third_Party_Libraries/12_iree.html). The same golden‑reference harness applies unchanged.

Mismatched layouts are the number one cause of “it runs but looks wrong.” Decide on NCHW vs NHWC early and be consistent across preprocessing, the model, and post‑processing. If TVM import fails, try simplifying the ONNX graph (remove training ops, fold constants) and make sure all input shapes are specified. If numerics drift, bisect layer‑by‑layer to find the first tensor that disagrees and fix that, not the last layer’s output.

You can run the compiled artifact on the embedded device, the outputs match your CPU reference within an agreed tolerance, and you can measure steady‑state latency without thermal collapse. From here, you can iterate on precision (fp16/INT8), auto‑tune with TVM if needed, and optimize data movement at the boundary with Vulkan once—and only once—correctness is boring.

[Previous: ML Compilers on Embedded Devices](07_ml_compiler.html) | [Next: Conclusion](09_conclusion.html)
