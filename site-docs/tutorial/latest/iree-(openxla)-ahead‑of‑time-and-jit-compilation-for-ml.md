# IREE (OpenXLA): Ahead‑of‑Time and JIT Compilation for ML

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/12_iree.html

## Table of Contents

- [Overview](#_overview)
- [If MLIR/StableHLO/XLA are new to you (60‑second primer)](#_if_mlirstablehloxla_are_new_to_you_60second_primer)
- [If_MLIR/StableHLO/XLA_are_new_to_you_(60‑second_primer)](#_if_mlirstablehloxla_are_new_to_you_60second_primer)
- [What You’ll Build in This Chapter](#_what_youll_build_in_this_chapter)
- [What_You’ll_Build_in_This_Chapter](#_what_youll_build_in_this_chapter)
- [When to Use IREE](#_when_to_use_iree)
- [When_to_Use_IREE](#_when_to_use_iree)
- [End‑to‑End Workflow (Practical)](#_endtoend_workflow_practical)
- [End‑to‑End_Workflow_(Practical)](#_endtoend_workflow_practical)
- [0) Tools You’ll Need](#_0_tools_youll_need)
- [0)_Tools_You’ll_Need](#_0_tools_youll_need)
- [The idea before the commands](#_the_idea_before_the_commands)
- [The_idea_before_the_commands](#_the_idea_before_the_commands)
- [What you’ll build in this chapter](#_what_youll_build_in_this_chapter_2)
- [What_you’ll_build_in_this_chapter](#_what_youll_build_in_this_chapter_2)
- [When to use IREE](#_when_to_use_iree_2)
- [When_to_use_IREE](#_when_to_use_iree_2)
- [End‑to‑end workflow](#_endtoend_workflow)
- [1) Export or prepare the model](#_1_export_or_prepare_the_model)
- [1)_Export_or_prepare_the_model](#_1_export_or_prepare_the_model)
- [2) Compile for Vulkan](#_2_compile_for_vulkan)
- [2)_Compile_for_Vulkan](#_2_compile_for_vulkan)
- [3) Minimal Runtime: Load and Invoke](#_3_minimal_runtime_load_and_invoke)
- [3)_Minimal_Runtime:_Load_and_Invoke](#_3_minimal_runtime_load_and_invoke)
- [Reusing Inputs/Outputs Efficiently](#_reusing_inputsoutputs_efficiently)
- [Reusing_Inputs/Outputs_Efficiently](#_reusing_inputsoutputs_efficiently)
- [Function Names and Signatures](#_function_names_and_signatures)
- [Function_Names_and_Signatures](#_function_names_and_signatures)
- [4) Integrate With Your Vulkan App](#_4_integrate_with_your_vulkan_app)
- [4)_Integrate_With_Your_Vulkan_App](#_4_integrate_with_your_vulkan_app)
- [Build & Packaging Notes (CMake)](#_build_packaging_notes_cmake)
- [Build_&_Packaging_Notes_(CMake)](#_build_packaging_notes_cmake)
- [Pre/Post‑Processing](#_prepostprocessing)
- [Validating Your Pipeline](#_validating_your_pipeline)
- [Validating_Your_Pipeline](#_validating_your_pipeline)
- [Numerics and Performance Tips](#_numerics_and_performance_tips)
- [Numerics_and_Performance_Tips](#_numerics_and_performance_tips)
- [Android and Embedded Notes](#_android_and_embedded_notes)
- [Android_and_Embedded_Notes](#_android_and_embedded_notes)
- [NNEF Interop](#_nnef_interop)
- [Troubleshooting](#_troubleshooting)
- [Shipping Checklist](#_shipping_checklist)

## Content

IREE is an ML compiler and runtime that lowers models to highly efficient executables for multiple backends—Vulkan, Metal, CUDA, and CPU—with a strong focus on portability and small runtime footprint. Conceptually, IREE takes a high‑level model (commonly in StableHLO or other MLIR dialects), applies graph‑level and kernel‑level optimizations, and emits backend‑specific code (SPIR‑V for Vulkan). You ship the compiled artifact alongside a tiny runtime and call functions like regular library APIs.

If you want “hand‑written shader” performance without actually writing shaders, this is the path. It fits perfectly as the third path in this tutorial: compiler‑driven ML on Vulkan.

You’ll see the terms MLIR, StableHLO, XLA, and OpenXLA in this chapter. Quick definitions so you’re not lost:

* 
MLIR: a compiler infrastructure for building intermediate representations (IRs) and transformations. MLIR organizes concepts into “dialects” (collections of ops and types) that represent different stages or domains. IREE uses MLIR internally to lower ML graphs toward targets like Vulkan (via SPIR‑V). StableHLO itself is an MLIR dialect. See [Glossary](../glossary.html).

* 
StableHLO: a standardized intermediate representation (IR) for ML graphs. Think of it as a portable “assembly language” for neural nets after export from frameworks. Many tools can produce/consume it.

* 
XLA: a mature compiler (from the OpenXLA project) used primarily by TensorFlow/JAX to lower StableHLO/HLO to CPU/GPU backends.

* 
IREE: another OpenXLA project focused on producing deployable artifacts for targets like Vulkan (via SPIR‑V), Metal, CUDA, and CPU—with a small runtime.

For Vulkan, the typical path is: StableHLO → IREE → SPIR‑V (runs on Vulkan). If your model isn’t in StableHLO yet, don’t worry—you can start from ONNX or TFLite and convert. We cover the background in [OpenXLA: XLA and StableHLO](15_openxla.html), and concise definitions (including MLIR) live in the [Glossary](../glossary.html).

By the end, you’ll have a repeatable pipeline and application code that:

* 
Converts/export a trained model into StableHLO/MLIR that IREE understands

* 
Compiles that model to a `.vmfb` artifact targeting Vulkan

* 
Loads the module from C++ and executes it repeatedly with new inputs

* 
Packages the artifact with your app (desktop and Android/embedded)

* 
Knows where to look when something goes wrong (unsupported ops, shapes, device)

For most games and apps, ONNX Runtime or TensorFlow Lite will get you to production faster. Choose IREE when:

* 
You want a small runtime with AOT compilation for tight deployments (embedded/mobile/desktop tools).

* 
You need Vulkan as a first‑class target (ship SPIR‑V and run on any vendor that supports Vulkan compute).

* 
You want portable performance across vendors without vendor SDK dependencies.

* 
You’re comfortable running a compile step in your build/CI and shipping the compiled module.

The simplest path today is: export to StableHLO (or import via upstream tools), compile with `iree-compile` targeting Vulkan, then load and invoke the compiled module from C/C++.

Before we talk concepts or show commands, let’s make sure you can actually run them. You’ll use two pieces: the IREE command‑line tools (the compiler and a few helpers) and the IREE runtime that your C/C++ application links against. For day‑to‑day desktop development the quickest path is to install the CLI with Python wheels, then verify things are on your PATH.

python -m pip install --upgrade iree-compiler iree-runtime

# Sanity check: these should print help/version text
iree-compile --version
iree-run-module --help

For your application, you’ll link to IREE’s small C runtime. On some platforms you can consume prebuilt packages; on others you’ll build from source and install CMake packages/headers into a known prefix that your project can find. We’ll show CMake notes later in this chapter when we wire up a minimal C++ program.

That’s the whole toolbox for getting started: a compiler you’ll run in your build or CI, and a lightweight runtime you’ll link into your app.

Here’s the mental model. You start with a trained model in a compiler‑friendly form (most commonly StableHLO, which is an MLIR dialect). IREE takes that model, optimizes it, and lowers it to target code—SPIR‑V for Vulkan—then packages it into a single file (`.vmfb`). At runtime, your app loads that file, points IREE at your Vulkan device, and invokes functions by name. No shader authoring, no driver‑specific SDKs—just a tiny runtime recording Vulkan compute work on your behalf.

If MLIR or StableHLO are new terms, treat MLIR as the compiler framework and StableHLO as “portable ML assembly.” XLA and IREE are both part of OpenXLA: XLA is commonly used by TensorFlow/JAX; IREE is the deploy‑focused path we use to reach Vulkan. You’ll find crisp definitions in the [Glossary](../glossary.html) and a short explainer in [OpenXLA](15_openxla.html). The only thing you need to remember for this chapter is the flow: StableHLO → IREE → SPIR‑V (runs on Vulkan).

We’ll build a repeatable pipeline you can drop into any project: export a trained model to a form IREE understands, compile it to a `.vmfb` that targets Vulkan, load it from C++, and call it in a loop with new inputs. Along the way we’ll talk about packaging the artifact next to your app and how to diagnose the common “first run” problems (wrong function name, unsupported ops, shape mismatches, device issues).

For many applications, ONNX Runtime or TensorFlow Lite is the quickest path to production. Reach for IREE when you want a small runtime and ahead‑of‑time compilation, you need Vulkan as a first‑class target across vendors, and you’re happy to run a compile step in your build or CI and ship the compiled module as part of your app.

The normal day‑to‑day flow is: export to StableHLO (or convert from your framework), compile with `iree-compile` for Vulkan, then load and call the compiled module from C/C++.

Start by exporting your trained model to something the compiler can understand. StableHLO is the most direct route. If you’re starting from ONNX or TFLite, convert to StableHLO using the current tools in your framework’s ecosystem—the exact command evolves, but the path is well‑worn. We’ll keep Python to a minimum here; the goal is simply to produce StableHLO (or MLIR) that `iree-compile` can consume.

While you’re here, lock down shapes and layouts. If your function has dynamic dimensions, decide what you’ll actually use at runtime and be consistent between export and invocation. And pick a tensor layout (NCHW or NHWC) that matches your Vulkan preprocessing so you’re not shuffling data later.

Now compile to a deployable module (`.vmfb`):

iree-compile model.stablehlo \
  --iree-hal-target-backends=vulkan \
  --o=model_vulkan.vmfb

That `--iree-hal-target-backends=vulkan` flag selects the Vulkan backend (IREE will emit SPIR‑V under the hood). You can add flags for numerics and layouts—fp16 is often a good step once you’ve verified correctness—but start simple and measure first.

Verifying the compiled module without writing any code:

# List exported functions and inputs/outputs
iree-run-module --module=model_vulkan.vmfb --list-functions

# Run a function with randomly generated inputs (useful smoke test)
iree-run-module \
  --module=model_vulkan.vmfb \
  --function=main \
  --input=1x3x224x224xf32=0  # shape and dtype; values auto-filled

If your function name isn’t `main`, use whatever your export produced.

IREE’s runtime is a small C API. Here’s a minimal, self‑contained skeleton that loads a compiled module, creates a Vulkan device, and runs an entry function. It’s written in C++ for brevity but uses the C API types.

#include 
#include 
#include 
#include 

// Utility that checks an iree_status_t and aborts on failure.
static void IREE_CHECK_OK(iree_status_t status) {
  if (IREE_UNLIKELY(!iree_status_is_ok(status))) {
    iree_status_fprint(stderr, status);
    abort();
  }
}

int main(int argc, char** argv) {
  iree_allocator_t host_allocator = iree_allocator_system();

  // 1) VM instance
  iree_vm_instance_t* instance = NULL;
  IREE_CHECK_OK(iree_vm_instance_create(IREE_VM_TYPE_CAPACITY_DEFAULT, host_allocator, &instance));

  // 2) Create Vulkan HAL driver and device
  iree_hal_driver_t* driver = NULL;
  IREE_CHECK_OK(iree_hal_vulkan_driver_create(IREE_SV("vulkan"), host_allocator, &driver));

  iree_hal_device_t* device = NULL;
  IREE_CHECK_OK(iree_hal_driver_create_default_device(driver, host_allocator, &device));

  // 3) Load compiled module (.vmfb)
  const char* vmfb_path = (argc > 1) ? argv[1] : "model_vulkan.vmfb";
  iree_vm_module_t* bytecode_module = NULL;
  IREE_CHECK_OK(iree_vm_bytecode_module_load_from_file(
      iree_make_cstring_view(vmfb_path), IREE_VM_BYTECODE_MODULE_FLAG_NONE,
      host_allocator, host_allocator, &bytecode_module));

  // 4) HAL module gives programs access to the device
  iree_vm_module_t* hal_module = NULL;
  IREE_CHECK_OK(iree_hal_module_create(device, host_allocator, &hal_module));

  // 5) Create a context with HAL + your module
  iree_vm_module_t* modules[] = {hal_module, bytecode_module};
  iree_vm_context_t* context = NULL;
  IREE_CHECK_OK(iree_vm_context_create_with_modules(instance, IREE_ARRAYSIZE(modules),
                                                    modules, host_allocator, &context));

  // 6) Look up the exported function
  // Replace "main" with your model’s exported entry (e.g., module.function)
  iree_string_view_t entry_name = iree_make_cstring_view("main");
  iree_vm_function_t function;
  IREE_CHECK_OK(iree_vm_context_resolve_function(context, entry_name, &function));

  // 7) Prepare inputs (simple example: one 1D float tensor)
  const float input_data[4] = {1, 2, 3, 4};
  iree_hal_buffer_params_t params = {
      .type = IREE_HAL_MEMORY_TYPE_DEVICE_VISIBLE,
      .usage = IREE_HAL_BUFFER_USAGE_DEFAULT | IREE_HAL_BUFFER_USAGE_TRANSFER,
  };
  iree_hal_buffer_view_t* input = NULL;
  IREE_CHECK_OK(iree_hal_buffer_view_allocate_and_assign(
      device, /*shape_rank=*/1, (iree_hal_dim_t[]){4}, IREE_HAL_ELEMENT_TYPE_FLOAT_32,
      IREE_HAL_ENCODING_TYPE_DENSE_ROW_MAJOR, params, sizeof(input_data),
      (const void*)input_data, &input));

  iree_vm_list_t* inputs = NULL;
  IREE_CHECK_OK(iree_vm_list_create(/*element_type=*/NULL, 1, host_allocator, &inputs));
  iree_vm_ref_t input_ref = iree_hal_buffer_view_move_ref(input);
  IREE_CHECK_OK(iree_vm_list_push_ref_move(inputs, &input_ref));

  // 8) Invoke
  iree_vm_list_t* outputs = NULL;
  IREE_CHECK_OK(iree_vm_invoke(context, function, IREE_VM_INVOCATION_FLAG_NONE,
                               /*policy=*/NULL, inputs, &outputs, host_allocator));

  // 9) Read back the first output as a buffer view
  iree_hal_buffer_view_t* out_view = NULL;
  iree_vm_ref_t out_ref = iree_vm_list_get_ref_deref(outputs, 0);
  out_view = (iree_hal_buffer_view_t*)out_ref.ptr;

  // (Optional) Map or copy to host to inspect results
  iree_host_size_t out_element_count = 0;
  IREE_CHECK_OK(iree_hal_buffer_view_compute_num_elements(out_view, &out_element_count));
  std::vector host_out(out_element_count);

  iree_hal_buffer_t* out_buffer = iree_hal_buffer_view_buffer(out_view);
  IREE_CHECK_OK(iree_hal_device_transfer_d2h(
      device, out_buffer, /*source_offset=*/0,
      host_out.data(), host_out.size() * sizeof(float), IREE_HAL_TRANSFER_BUFFER_FLAG_DEFAULT,
      host_allocator));

  // Print first few values (for sanity)
  for (int i = 0; i (host_out.size(), 4); ++i) {
    fprintf(stdout, "out[%d]=%f\n", i, host_out[i]);
  }

  // Cleanup (omitted for brevity)
  return 0;
}

This is intentionally minimal. Real apps pool devices/queues, reuse lists, and pre‑allocate buffers. The HAL module bridges the compiled program with your Vulkan device so dispatches are recorded and executed on Vulkan under the hood.

For real-time apps, you’ll call the same function many times. Reuse your `iree_vm_context_t`, keep a pre-allocated input `iree_hal_buffer_view_t` that you update in place each frame, and keep the `iree_vm_list_t` containers around. Avoid recreating the VM, driver, device, and context per call.

Exported functions are identified by name (e.g., `module.my_inference`). List them with `--list-functions` as shown above. If your model has multiple inputs or dynamic shapes, prepare a `iree_vm_list_t` with items in the expected order and shapes. Mismatched ranks/dtypes will return a descriptive `iree_status_t` at invocation.

The easiest integration is to let IREE own its Vulkan device and run on a dedicated compute queue. If you need tighter control (sharing an existing `VkInstance/VkDevice`), IREE’s Vulkan HAL supports wrapping externally‑created Vulkan handles. Start with the simple path; move to shared devices when you need explicit interop or synchronization with your renderer.

Two practical patterns you can ship today:

1) Simple host copies at the boundary (recommended first):

* 
Preprocess in Vulkan → copy results to a host-visible buffer → upload into IREE input buffer

* 
Run IREE → copy output back to host if needed → upload/consume in Vulkan
This is easy to validate and isolates concerns while you’re proving correctness.

2) Single-owner device (advanced):

* 
Allow IREE to create the Vulkan device and run inference; keep your own Vulkan work on separate queues (or time-sliced) and pass data via transfers. When you’re bounded by copies, explore sharing/wrapping your device so IREE records into the same VkDevice you use for rendering. This requires careful synchronization and version-matching with IREE’s HAL—do this after you have a working app.

We keep preprocessing/postprocessing in Vulkan for consistency with the rest of this tutorial: your graphics/compute code handles images and visualization; IREE handles the model math.

How you link the runtime depends on how you obtained IREE:

* 
If you installed IREE with CMake packages: use `find_package` and link the runtime and Vulkan HAL targets provided by your installation.

* 
If you built from source and have headers/libs locally: add include paths and libraries directly.

Sketch (adjust target names to your installation):

cmake_minimum_required(VERSION 3.22)
project(iree_demo LANGUAGES CXX)

find_package(Threads REQUIRED)
# If available in your environment:
# find_package(iree_runtime CONFIG REQUIRED)

add_executable(app main.cpp)
# target_link_libraries(app PRIVATE iree::runtime iree::hal::vulkan Threads::Threads)

# Fallback: manually add include dirs and libs from your IREE build/install
# target_include_directories(app PRIVATE ${IREE_INCLUDE_DIRS})
# target_link_libraries(app PRIVATE ${IREE_LIBS})

Package the `.vmfb` next to your executable or inside your game/app assets folder. Load it by relative path or your engine’s virtual file system.

IREE focuses on the model itself. Keep your image preprocessing and postprocessing in Vulkan (or CPU) as described elsewhere in this tutorial. A common pattern is:

1) Vulkan compute pass to resize/normalize into a tensor buffer
2) IREE invocation on that tensor
3) Vulkan pass (or CPU) for post‑processing/visualization

This keeps copies to a minimum and lets you overlap work with async compute.

Before integrating deeply, prove correctness quickly:

1) Run the model with your actual input tensors via `iree-run-module` and capture outputs to disk.
2) Run the same model via PyTorch/ONNX Runtime on CPU and save outputs.
3) Compare numerically (MAE/MSE). If they differ significantly, fix export/normalization first.

* 
Prefer fp16 when your model allows it. Compile with flags enabling fp16 math and measure.

* 
Batch where it helps; IREE handles fused kernels well, but you still pay memory traffic costs.

* 
Profile with your GPU tools. Even compiler‑generated kernels are bound by memory patterns.

Other practical knobs that often matter:

* 
Avoid gratuitous layout conversions. Keep preprocessing layout aligned with what your exported graph expects.

* 
Keep tensors device‑local and reuse allocations. Recreate as little as possible per frame.

* 
Measure end‑to‑end latency (including copies). A perfectly fast kernel can still lose to bad plumbing.

* 
Cross‑compile IREE runtime for your target (Android NDK or your embedded toolchain) and ship `.vmfb` with your assets.

* 
Use the same `--iree-hal-target-backends=vulkan` module on desktop and mobile; Vulkan keeps it portable.

* 
Keep binaries small by only linking backends you need (e.g., Vulkan + VM bytecode).

Practical deployment steps on Android:

1) Compile the `.vmfb` on your build machine and place it under `app/src/main/assets/`.
2) Build IREE runtime for your ABIs (e.g., `arm64-v8a`) and link it via your NDK project.
3) Load the asset at startup, create the VM/context/device once, and reuse them across frames.
4) Use asynchronous compute and timeline semaphores to overlap transfers and inference with rendering.

If your source format is NNEF, convert to ONNX or StableHLO first. From there, the pipeline is the same: `iree-compile` to Vulkan, load with the runtime, and invoke. We’ll show a concrete end‑to‑end example in the Embedded NNEF chapter.

* 
“Function not found” at invoke: list functions with `--list-functions` and use the exported name. Ensure the module you ship is the one you compiled last.

* 
“Unsupported op” during compile: simplify the model or change the export path; verify the op set is supported by StableHLO/IREE on your version.

* 
Shape/dtype mismatch: check that your runtime tensor ranks and element types match the compiled signature exactly. Print shapes at the call site.

* 
Vulkan device/instance errors: try a simpler system first (desktop with one GPU), disable validation layers, and confirm a minimal Vulkan app works on the machine.

* 
Model export is scripted and versioned (hash the `.vmfb` in CI)

* 
`iree-run-module` parity check vs golden reference passes

* 
App creates VM/context/device once and reuses buffers

* 
Pre/post‑processing runs in Vulkan, copies minimized and overlapped

* 
Android/embedded build uses only required backends to minimize size

[Previous: ML Compilers Overview](11_ML_Compilers.html) | [Next: Apache TVM](13_apache_tvm.html)
