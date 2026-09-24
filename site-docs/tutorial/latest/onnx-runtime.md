# ONNX Runtime

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/02_onnx_runtime.html

## Table of Contents

- [Introduction](#_introduction)
- [What Is ONNX Runtime?](#_what_is_onnx_runtime)
- [What_Is_ONNX_Runtime?](#_what_is_onnx_runtime)
- [Framework-Agnostic Design](#_framework_agnostic_design)
- [Cross-Platform Support](#_cross_platform_support)
- [Multiple Execution Providers](#_multiple_execution_providers)
- [Multiple_Execution_Providers](#_multiple_execution_providers)
- [Why ONNX Runtime for Vulkan Applications?](#_why_onnx_runtime_for_vulkan_applications)
- [Why_ONNX_Runtime_for_Vulkan_Applications?](#_why_onnx_runtime_for_vulkan_applications)
- [Complementary Strengths](#_complementary_strengths)
- [Cross-Vendor GPU Support via WebGPU](#_cross_vendor_gpu_support_via_webgpu)
- [Cross-Vendor_GPU_Support_via_WebGPU](#_cross_vendor_gpu_support_via_webgpu)
- [Broad Model Support](#_broad_model_support)
- [Broad_Model_Support](#_broad_model_support)
- [Production-Ready Reliability](#_production_ready_reliability)
- [Getting ONNX Runtime](#_getting_onnx_runtime)
- [Getting_ONNX_Runtime](#_getting_onnx_runtime)
- [Official Releases](#_official_releases)
- [Package Managers](#_package_managers)
- [Building from Source](#_building_from_source)
- [Building_from_Source](#_building_from_source)
- [Setting Up ONNX Runtime](#_setting_up_onnx_runtime)
- [Setting_Up_ONNX_Runtime](#_setting_up_onnx_runtime)
- [Project Configuration](#_project_configuration)
- [Platform-Specific Considerations](#_platform_specific_considerations)
- [Runtime Dependencies](#_runtime_dependencies)
- [Using ONNX Runtime: The Basics](#_using_onnx_runtime_the_basics)
- [Using_ONNX_Runtime:_The_Basics](#_using_onnx_runtime_the_basics)
- [Step 1: Create the Environment](#_step_1_create_the_environment)
- [Step_1:_Create_the_Environment](#_step_1_create_the_environment)
- [Step 2: Configure Session Options](#_step_2_configure_session_options)
- [Step_2:_Configure_Session_Options](#_step_2_configure_session_options)
- [Step 3: Load the Model](#_step_3_load_the_model)
- [Step_3:_Load_the_Model](#_step_3_load_the_model)
- [Step 4: Query Input/Output Information](#_step_4_query_inputoutput_information)
- [Step_4:_Query_Input/Output_Information](#_step_4_query_inputoutput_information)
- [Step 5: Prepare Input Data](#_step_5_prepare_input_data)
- [Step_5:_Prepare_Input_Data](#_step_5_prepare_input_data)
- [Step 6: Run Inference](#_step_6_run_inference)
- [Step_6:_Run_Inference](#_step_6_run_inference)
- [Step 7: Extract Results](#_step_7_extract_results)
- [Step_7:_Extract_Results](#_step_7_extract_results)
- [Integration with Vulkan Applications](#_integration_with_vulkan_applications)
- [Integration_with_Vulkan_Applications](#_integration_with_vulkan_applications)
- [Separate Contexts Approach](#_separate_contexts_approach)
- [Separate_Contexts_Approach](#_separate_contexts_approach)
- [DirectML Integration on Windows](#_directml_integration_on_windows)
- [DirectML_Integration_on_Windows](#_directml_integration_on_windows)
- [Memory Sharing (Advanced)](#_memory_sharing_advanced)
- [Memory_Sharing_(Advanced)](#_memory_sharing_advanced)
- [When to Use ONNX Runtime](#_when_to_use_onnx_runtime)
- [When_to_Use_ONNX_Runtime](#_when_to_use_onnx_runtime)
- [Summary](#_summary)

## Content

When you’re ready to deploy ML models in production, ONNX Runtime stands out as one of the most versatile and powerful options available. Developed by Microsoft and backed by a broad industry consortium, it’s designed to solve a fundamental problem: how do you take models trained in different frameworks and run them efficiently across diverse hardware?

Think about the typical ML workflow. Your research team might prefer PyTorch for its flexibility and ease of experimentation. Your production infrastructure might be built around different tools. Your deployment targets might range from high-end servers with NVIDIA GPUs to Windows desktops with AMD or Intel graphics to embedded devices with limited resources. ONNX Runtime bridges all these gaps.

This chapter explores ONNX Runtime in depth—what it is, why it’s our primary recommendation for Vulkan applications, how to set it up, and how to integrate it effectively with your rendering pipeline.

ONNX Runtime is a high-performance inference engine for machine learning models. But that simple description doesn’t capture what makes it special. Let’s break down its key characteristics.

The "ONNX" in ONNX Runtime stands for Open Neural Network Exchange—a standardized format for representing neural networks. This format acts as a universal translator between ML frameworks.

You can train a model in PyTorch, export it to ONNX format, and run it with ONNX Runtime. Or train in TensorFlow, export to ONNX, and run with ONNX Runtime. Or use Keras, scikit-learn, or any other framework that supports ONNX export. The training framework becomes a choice you make based on what works best for development, not a constraint that locks you into a particular deployment path.

This framework independence is liberating. Your research team can use whatever tools they prefer. Your production system uses ONNX Runtime. The two are decoupled, connected only by the ONNX format.

ONNX Runtime runs on Windows, Linux, macOS, Android, iOS, and various embedded platforms. The same model file, the same API, works across all of them. Write your integration code once, deploy everywhere.

This cross-platform consistency is rare in the ML world. Many frameworks have platform-specific quirks, different APIs on different platforms, or limited support for certain operating systems. ONNX Runtime provides a unified experience.

Here’s where ONNX Runtime really shines: it supports multiple "execution providers"—backends that actually run the inference. Our primary recommendation is to use **WebGPU** for a "write once, run everywhere" experience, while choosing specific providers when targeting specific hardware speedups:

* 
**WebGPU Execution Provider**: The modern standard for generic cross-platform GPU compute. It works on Windows, Linux, Android, and macOS by automatically selecting the best underlying API. On Windows, it leverages **DirectML** (DirectX 12), while on Linux and Android, it uses **Vulkan**. This is the best choice if you want your application to run generically on almost any modern hardware.

* 
**DirectML Execution Provider**: Uses Microsoft’s DirectML API for hardware-accelerated machine learning on Windows. While WebGPU uses this behind the scenes on Windows, you can choose to use the DirectML provider explicitly if your application is Windows-exclusive and you want to leverage its native performance more directly.

* 
**CPU Execution Provider**: Optimized CPU inference using libraries like Intel MKL-DNN or ARM Compute Library. Works everywhere as a reliable fallback when no GPU is available.

* 
**CUDA / TensorRT Execution Providers**: Leverage NVIDIA-specific hardware features like Tensor Cores. While these lock you into NVIDIA hardware, they provide significant speedups and are recommended if you are building for server-side deployment or NVIDIA-specific embedded devices like the Jetson.

* 
**OpenVINO Execution Provider**: Optimized specifically for Intel hardware (CPUs, integrated GPUs, VPUs).

* 
**CoreML Execution Provider**: Leverages Apple’s CoreML framework, accessing the Neural Engine on Apple Silicon for maximum efficiency on iOS and macOS.

The key insight: use **WebGPU** if you want to run everywhere generically. Switch to a specific provider like **DirectML** or **CUDA** only when you need the extra performance gain offered by a specific vendor’s hardware.

Given that this tutorial focuses on Vulkan-based graphics applications, why do we recommend ONNX Runtime as the primary ML inference solution?

Vulkan gives you low-level control over GPU rendering. ONNX Runtime gives you high-level, optimized ML inference. They complement each other beautifully.

For most ML workloads, you don’t need the same level of control that Vulkan provides for rendering. You don’t need to manage every buffer allocation, every synchronization point, every shader dispatch. You just need the inference to run fast and produce correct results. ONNX Runtime handles that complexity for you.

This lets you focus your engineering effort where it matters most: the unique aspects of your application. The rendering pipeline, the user experience, the game mechanics, the creative features. Let ONNX Runtime handle the ML inference.

Unlike CUDA-centric workflows that lock you into NVIDIA hardware, using ONNX Runtime with the WebGPU execution provider ensures your application runs on any modern GPU by leveraging the native API of your platform.

* 
**Universal Reach**: Your AMD, Intel, and NVIDIA users all get GPU-accelerated AI without needing platform-specific code.

* 
**Backends**: On Windows, WebGPU utilizes **DirectML** (DirectX 12). On Linux and Android, it leverages **Vulkan**. You get the performance of the local API while maintaining a single integration path.

* 
**Developer Simplicity**: You just request the `webgpu` provider. ONNX Runtime handles the heavy lifting of selecting the correct backend for the current environment.

* 
**Zero-Copy Potential**: Since both your rendering (Vulkan) and your inference (via WebGPU using the Vulkan backend on Linux) can share the same underlying driver resources, you can minimize expensive PCIe data movement.

ONNX Runtime supports hundreds of operations out of the box. If you download a pre-trained model from a model zoo, it will almost certainly work with ONNX Runtime without modification. This broad compatibility means you can experiment with different models, try cutting-edge architectures, and leverage the latest research without worrying about implementation details.

ONNX Runtime is used in production by Microsoft (in products like Bing, Office, and Azure), by Facebook, by many other companies. It’s been tested at massive scale, handling billions of inference requests per day. The bugs have been found and fixed. The edge cases have been handled. The performance has been optimized.

When you use ONNX Runtime, you’re building on a foundation that’s proven to work in the real world.

Let’s get practical. How do you actually obtain and set up ONNX Runtime for your project?

The primary source is the official GitHub releases page: [https://github.com/microsoft/onnxruntime/releases](https://github.com/microsoft/onnxruntime/releases)

Each release provides pre-built binaries for multiple platforms. You’ll find:

* 
Windows (x64, ARM64)

* 
Linux (x64, ARM64)

* 
macOS (x64, ARM64)

Each platform package includes:

* 
Header files (`include/` directory)

* 
Library files (`lib/` directory)

* 
Documentation and license information

Download the package for your target platform. For cross-platform development, you might download multiple packages.

For Python development or prototyping, package managers provide easy installation:

**CPU-only version**:

pip install onnxruntime

**GPU-enabled version (DirectML for Windows)**:

pip install onnxruntime-directml

**GPU-enabled version (WebGPU)**:

# WebGPU providers are typically included in standard or GPU builds.
pip install onnxruntime-gpu

For C++ development on Windows, NuGet provides packages:

# Cross-vendor GPU acceleration (DirectML)
Install-Package Microsoft.ML.OnnxRuntime.DirectML

For specialized platforms or custom configurations, you can build from source:

git clone --recursive https://github.com/microsoft/onnxruntime.git
cd onnxruntime
./build.sh --config Release --build_shared_lib --parallel

Building from source gives you full control over which execution providers to include, optimization flags, and platform-specific tuning. It’s more complex but provides maximum flexibility.

Once you have the binaries, integrating ONNX Runtime into your C++ project is straightforward.

For CMake-based projects (recommended):

# Find ONNX Runtime
find_package(onnxruntime REQUIRED)

# Link your target
target_link_libraries(your_target PRIVATE onnxruntime::onnxruntime)

If ONNX Runtime isn’t installed system-wide, specify the path:

set(ONNXRUNTIME_ROOT_DIR "/path/to/onnxruntime")
include_directories(${ONNXRUNTIME_ROOT_DIR}/include)
link_directories(${ONNXRUNTIME_ROOT_DIR}/lib)
target_link_libraries(your_target PRIVATE onnxruntime)

**Linux**: ONNX Runtime requires glibc 2.27 or later (Ubuntu 18.04+, CentOS 8+). For GPU support, ensure your WebGPU drivers are up to date.

**Windows**: Requires Visual Studio 2019 or later runtime. For GPU support, ensure DirectX 12 (for DirectML) or WebGPU drivers are available.

**macOS**: CPU-only support by default. You can use the CoreML provider to access Apple’s Neural Engine, or the WebGPU provider via Metal.

When you distribute your application, include the ONNX Runtime shared library:

* 
Windows: `onnxruntime.dll`

* 
Linux: `libonnxruntime.so`

* 
macOS: `libonnxruntime.dylib`

For GPU execution providers, users need the appropriate drivers and runtimes (Vulkan, DirectX 12, etc.) installed on their systems.

Let’s walk through the fundamental workflow for running inference with ONNX Runtime.

The `Ort::Env` object represents the ONNX Runtime environment. Create it once at application startup:

#include 

// Create environment with logging level
Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "MyApp");

The environment manages global state and logging. You typically create one environment for your entire application.

Session options control how inference runs:

Ort::SessionOptions session_options;

// Set number of threads for CPU execution
session_options.SetIntraOpNumThreads(4);

// Enable optimizations
session_options.SetGraphOptimizationLevel(
    GraphOptimizationLevel::ORT_ENABLE_ALL);

// For WebGPU execution (this will give DirectML in Windows, and Vulkan in Linux and Android)
session_options.AppendExecutionProvider("WebGPU");

The execution provider selection happens here. You can add multiple providers—ONNX Runtime will try them in order and use the first one that works.

Create a session by loading your ONNX model file:

const wchar_t* model_path = L"model.onnx";
Ort::Session session(env, model_path, session_options);

The session parses the model, allocates resources, and prepares for inference. This is a relatively expensive operation—do it once and reuse the session for multiple inference runs.

Before running inference, you need to know what inputs the model expects and what outputs it produces:

// Get input information
size_t num_input_nodes = session.GetInputCount();
const char* input_name = session.GetInputName(0, allocator);
Ort::TypeInfo input_type_info = session.GetInputTypeInfo(0);
auto input_tensor_info = input_type_info.GetTensorTypeAndShapeInfo();
std::vector input_shape = input_tensor_info.GetShape();

// Get output information
size_t num_output_nodes = session.GetOutputCount();
const char* output_name = session.GetOutputName(0, allocator);

This tells you the expected input dimensions, data types, and output structure.

Create input tensors with your data:

// Allocate memory for input
std::vector input_data(input_size);
// ... fill input_data with your preprocessed input ...

// Create input tensor
auto memory_info = Ort::MemoryInfo::CreateCpu(
    OrtArenaAllocator, OrtMemTypeDefault);
Ort::Value input_tensor = Ort::Value::CreateTensor(
    memory_info, input_data.data(), input_data.size(),
    input_shape.data(), input_shape.size());

The tensor wraps your data without copying it, so ensure the data remains valid until inference completes.

Execute the model:

std::vector input_names = {input_name};
std::vector output_names = {output_name};

auto output_tensors = session.Run(
    Ort::RunOptions{nullptr},
    input_names.data(), &input_tensor, 1,
    output_names.data(), 1);

This is where the actual inference happens. The call blocks until inference completes.

Process the output tensors:

float* output_data = output_tensors[0].GetTensorMutableData();
auto output_shape = output_tensors[0].GetTensorTypeAndShapeInfo().GetShape();

// Process output_data according to your application's needs

The output tensor contains the model’s predictions, ready for postprocessing.

Now let’s discuss how to integrate ONNX Runtime into a Vulkan-based application effectively.

The simplest and most reliable approach is to run ONNX Runtime and Vulkan in separate contexts, transferring data via CPU memory:

Render your frame with Vulkan

If you need ML inference, read relevant data from GPU to CPU

Run ONNX Runtime inference on CPU or GPU (via its own execution provider)

Transfer results back to GPU if needed for rendering

This approach is straightforward and works on all platforms. The data transfers add latency, but for many applications (where inference doesn’t happen every frame), this overhead is acceptable.

On Windows, you can use ONNX Runtime’s DirectML execution provider for tighter GPU integration:

session_options.AppendExecutionProvider_DML(0); // Device ID 0

DirectML runs on the same GPU as Vulkan, managed by the OS. While they don’t share memory directly, they share GPU compute resources. This can be more efficient than CPU-GPU transfers, especially for large models.

The tradeoff is platform specificity—this only works on Windows with DirectX 12 support.

On some platforms, you can share memory between Vulkan and ONNX Runtime using external memory extensions. This is complex and platform-specific, but it eliminates data transfers:

Allocate memory with Vulkan using external memory extensions

Export the memory handle

Import the handle into ONNX Runtime (if the execution provider supports it)

Both Vulkan and ONNX Runtime access the same physical memory

This approach requires careful synchronization and is only worth the complexity for very high-throughput scenarios where data transfer is a proven bottleneck.

ONNX Runtime is ideal when:

**Cross-Framework Compatibility**: You need to work with models from different training frameworks (PyTorch, TensorFlow, etc.).

**Desktop/Server Deployment**: You’re targeting platforms with substantial compute resources where ONNX Runtime’s optimizations shine.

**Execution Provider Flexibility**: You want the ability to switch between CPU, WebGPU, DirectML, or other backends without changing code.

**Broad Operator Support**: Your models use a wide variety of operations, and you need comprehensive support out of the box.

**Production Reliability**: You need a battle-tested solution that’s proven to work at scale.

For Vulkan applications, ONNX Runtime provides the best balance of performance, reliability, and ease of integration for most use cases.

ONNX Runtime is a high-performance, cross-platform ML inference engine that supports models from any framework. Its framework-agnostic design, multiple execution providers, and production-proven reliability make it an excellent choice for Vulkan applications.

The basic workflow—create environment, load model, prepare inputs, run inference, extract outputs—is straightforward and consistent across platforms. Integration with Vulkan can be as simple as separate contexts with CPU data transfer, or as sophisticated as shared GPU resources via DirectML on Windows.

For most Vulkan-based applications that need ML inference, ONNX Runtime should be your first choice. It provides the reliability and performance you need without the complexity of implementing inference from scratch.

[Previous: Introduction](01_introduction.html) | [Next: TensorFlow Lite](03_tensorflow_lite.html)
