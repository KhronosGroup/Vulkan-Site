# Apache TVM: End‑to‑End Compiler Stack

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/13_apache_tvm.html

## Table of Contents

- [Overview](#_overview)
- [Tools you’ll need](#_tools_youll_need)
- [Tools_you’ll_need](#_tools_youll_need)
- [When TVM Makes Sense](#_when_tvm_makes_sense)
- [When_TVM_Makes_Sense](#_when_tvm_makes_sense)
- [The idea before the commands](#_the_idea_before_the_commands)
- [The_idea_before_the_commands](#_the_idea_before_the_commands)
- [End‑to‑End Vulkan Workflow (Practical)](#_endtoend_vulkan_workflow_practical)
- [End‑to‑End_Vulkan_Workflow_(Practical)](#_endtoend_vulkan_workflow_practical)
- [Verify correctness before you optimize](#_verify_correctness_before_you_optimize)
- [Verify_correctness_before_you_optimize](#_verify_correctness_before_you_optimize)
- [Minimal C++ runtime (sketch)](#_minimal_c_runtime_sketch)
- [Minimal_C++_runtime_(sketch)](#_minimal_c_runtime_sketch)
- [Tuning when you need the last 20%](#_tuning_when_you_need_the_last_20)
- [Tuning_when_you_need_the_last_20%](#_tuning_when_you_need_the_last_20)
- [Integration With Vulkan Apps](#_integration_with_vulkan_apps)
- [Integration_With_Vulkan_Apps](#_integration_with_vulkan_apps)
- [About the runtime (and avoiding it)](#_about_the_runtime_and_avoiding_it)
- [About_the_runtime_(and_avoiding_it)](#_about_the_runtime_and_avoiding_it)
- [Android and Embedded Notes](#_android_and_embedded_notes)
- [Android_and_Embedded_Notes](#_android_and_embedded_notes)
- [Numerics and Layouts](#_numerics_and_layouts)
- [Numerics_and_Layouts](#_numerics_and_layouts)
- [Troubleshooting](#_troubleshooting)
- [NNEF Interop](#_nnef_interop)

## Content

Apache TVM is an end‑to‑end ML compiler stack that turns high‑level models into optimized executables for many targets: Vulkan/OpenCL GPUs, CPUs (LLVM), and various accelerators. TVM centers on Relay (a graph IR) and a scheduling system that can auto‑tune kernels for your specific device. If you want a compiler you can steer and measure, TVM gives you knobs for both graph‑level and kernel‑level optimization.

You’ll work in Python for the first mile. Bring NumPy, an ONNX reader, and TVM. Installation differs by platform; follow TVM’s docs for a prebuilt package or a from‑source build. It’s perfectly fine to validate everything in Python first and add a C/C++ integration once you’re happy with the results.

If your primary goal is a small runtime with a Vulkan‑first AOT flow, [IREE](12_iree.html) is often simpler. Choose TVM when you need device‑specific auto‑tuning to squeeze extra performance on a particular GPU/SoC, broad import support (ONNX, TensorFlow, PyTorch via TorchScript), multiple GPU options (Vulkan and OpenCL), or flexibility to customize schedules and introduce new kernels.

Relay represents your model. You import into Relay, pick a target (here, `"vulkan"`), and ask TVM to build. TVM generates kernels and a small runtime wrapper that knows how to execute on your device. If you need more speed on a specific phone or iGPU, TVM’s auto‑scheduler can search for better schedules using real measurements, then you rebuild with those results. Start with a correct baseline; only tune what actually matters.

The TVM “hello world” for Vulkan is: import an ONNX model into Relay, build for `target="vulkan"`, save the artifact, and run it with the TVM runtime. Here’s the shape of that flow in Python.

import onnx
import numpy as np
import tvm
from tvm import relay
from tvm.contrib import graph_executor

# 1) Load ONNX and convert to Relay
onnx_model = onnx.load("model.onnx")
input_name = "input"
shape_dict = {input_name: (1, 3, 224, 224)}  # adjust to your model
mod, params = relay.frontend.from_onnx(onnx_model, shape_dict, freeze_params=True)

# 2) Build for Vulkan
target = tvm.target.Target("vulkan")
with tvm.transform.PassContext(opt_level=3):
    lib = relay.build(mod, target=target, params=params)

# 3) Run on a Vulkan device
dev = tvm.vulkan(0)
rt_mod = graph_executor.GraphModule(lib["default"](dev))

x = np.random.randn(1, 3, 224, 224).astype("float32")
rt_mod.set_input(input_name, tvm.nd.array(x, device=dev))
rt_mod.run()
out = rt_mod.get_output(0).numpy()
print(out.shape)

# 4) Export artifact for deployment (shared library with embedded graph/params)
lib.export_library("model_vulkan.so")

Before tuning, compare against a golden reference so you know you’re matching the trained model numerically. A quick ONNX Runtime check does the job.

import onnxruntime as ort

sess = ort.InferenceSession("model.onnx", providers=["CPUExecutionProvider"])
ref = sess.run(None, {input_name: x.astype(np.float32)})[0]

tv = rt_mod.get_output(0).numpy()
mae = np.mean(np.abs(tv - ref))
print("MAE:", mae)

The exported `.so` is a self‑contained artifact you can load from Python or C/C++. TVM’s runtime owns the Vulkan work; you won’t write SPIR‑V yourself—TVM emits and dispatches it.

Here’s what loading the module from C++ looks like at a high level. Exact helpers change over time; consult TVM’s runtime docs for the headers that match your version.

#include 
#include 

int main() {
  tvm::runtime::Module mod = tvm::runtime::Module::LoadFromFile("model_vulkan.so");

  // Create a device: kVulkan(0) selects the first Vulkan device
  DLDevice dev{kDLVulkan, 0};

  // Create the graph executor module (symbol name is "default")
  tvm::runtime::Module gmod = mod.GetFunction("default")(dev);
  tvm::runtime::PackedFunc set_input = gmod.GetFunction("set_input");
  tvm::runtime::PackedFunc run       = gmod.GetFunction("run");
  tvm::runtime::PackedFunc get_output= gmod.GetFunction("get_output");

  // Allocate input NDArray on device and set it
  // (Allocation helpers omitted; in practice you create a DLTensor/NDArray)
  // set_input("input", input_dlpack_or_ndarray);

  run();
  // get_output(0, output_dlpack_or_ndarray);
  return 0;
}

If you prefer a minimal footprint, TVM also supports an AOT executor with the C runtime (CRT). That flow generates C functions you can call directly, at the cost of a more involved build step. It’s useful for embedded targets where you control the platform.

After your baseline is correct and measured, you can ask TVM’s auto‑scheduler (MetaSchedule/Ansor) to search for faster schedules on your actual device. This uses real measurements and produces records you can reuse in CI.

from tvm import meta_schedule as ms

with tvm.transform.PassContext(opt_level=3):
    tuned_lib = ms.tune_relay(
        mod=mod,
        params=params,
        target=target,
        work_dir="tuning_logs",
        max_trials_global=1000,
    )

tuned_lib.export_library("model_vulkan_tuned.so")

Expect the biggest wins on mobile and integrated GPUs. Desktop dGPUs often perform well without tuning.

The easiest path is to let TVM own its Vulkan context for the compiled module and communicate via host buffers at the API boundary: do your preprocessing in Vulkan (resize/normalize into a staging or device buffer), copy to the TVM input tensor, run inference, and copy results back for post‑processing.

If you need tighter interop (e.g., wrap an existing `VkDevice` or share memory), be aware that the Vulkan runtime integration lives inside TVM. Direct handle‑level interop is limited to what TVM exposes; most apps start with simple copies and then optimize data movement once the pipeline is correct.

TVM produces a compiled artifact (e.g., a shared library or AOT module) that is executed via TVM’s runtime (graph executor or AOT/CRT). In a Vulkan application, this is analogous to using ONNX Runtime or TFLite: you link TVM’s runtime, load the artifact, set inputs, run, and fetch outputs.

While TVM’s Vulkan backend ultimately generates SPIR‑V, it does not currently export a clean, stable “standalone SPIR‑V + ready‑to‑drop host scheduling code” interface. Attempting to peel out kernels and re‑implement the host side within your own engine means re‑creating ABI details the runtime manages (descriptor set layouts, buffer binding order, pipeline lifetimes, synchronization, etc.). Practically, plan to embed the TVM runtime just like any other model runtime.

Vulkan makes TVM portable across vendors on Android. Cross‑compile the runtime for your ABI, deploy the compiled module, and use the auto‑scheduler with an on‑device runner (or RPC) to get tuned schedules. For very small devices, investigate the AOT + CRT path to minimize footprint.

As with any compiler‑driven path, layouts matter. Channels‑last vs channels‑first can change performance characteristics significantly. Try to keep preprocessing layouts consistent with what the compiler chooses after Relay transforms. If your model supports fp16 safely, enable it and re‑measure; memory traffic dominates many kernels.

If `from_onnx` fails, simplify the model (run an ONNX simplifier), freeze parameters, and make sure all input shapes are specified. If runtime results look off, compare tensors layer‑by‑layer against a golden reference and fix the first divergence before continuing.

TVM’s stable path is via ONNX. If your source is NNEF, convert NNEF→ONNX, then follow the ONNX→Relay→Vulkan flow shown above. This mirrors the guidance in the NNEF deep dive and keeps your build robust.

[Previous: IREE](12_iree.html) | [Next: Mojo / MAX](14_mojo_max.html)
