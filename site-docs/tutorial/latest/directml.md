# DirectML

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/05_directml.html

## Table of Contents

- [Introduction](#_introduction)
- [The Windows-First Philosophy](#_the_windows_first_philosophy)
- [The_Windows-First_Philosophy](#_the_windows_first_philosophy)
- [Vendor-Agnostic GPU Acceleration](#_vendor_agnostic_gpu_acceleration)
- [Vendor-Agnostic_GPU_Acceleration](#_vendor_agnostic_gpu_acceleration)
- [DirectX 12 Integration](#_directx_12_integration)
- [DirectX_12_Integration](#_directx_12_integration)
- [Windows Ecosystem Integration](#_windows_ecosystem_integration)
- [Windows_Ecosystem_Integration](#_windows_ecosystem_integration)
- [The Cross-Platform Question](#_the_cross_platform_question)
- [The_Cross-Platform_Question](#_the_cross_platform_question)
- [Architecture: DirectX 12 for Machine Learning](#_architecture_directx_12_for_machine_learning)
- [Architecture:_DirectX_12_for_Machine_Learning](#_architecture_directx_12_for_machine_learning)
- [The Operator Model](#_the_operator_model)
- [The_Operator_Model](#_the_operator_model)
- [The Execution Model](#_the_execution_model)
- [The_Execution_Model](#_the_execution_model)
- [Memory Management](#_memory_management)
- [Metacommands: Hardware-Specific Optimization](#_metacommands_hardware_specific_optimization)
- [Metacommands:_Hardware-Specific_Optimization](#_metacommands_hardware_specific_optimization)
- [Integration with Vulkan Applications](#_integration_with_vulkan_applications)
- [Integration_with_Vulkan_Applications](#_integration_with_vulkan_applications)
- [The Challenge: Two Graphics APIs](#_the_challenge_two_graphics_apis)
- [The_Challenge:_Two_Graphics_APIs](#_the_challenge_two_graphics_apis)
- [Shared Resources: The Bridge](#_shared_resources_the_bridge)
- [Shared_Resources:_The_Bridge](#_shared_resources_the_bridge)
- [Practical Integration Pattern](#_practical_integration_pattern)
- [Practical_Integration_Pattern](#_practical_integration_pattern)
- [Code Example: Shared Memory Setup](#_code_example_shared_memory_setup)
- [Code_Example:_Shared_Memory_Setup](#_code_example_shared_memory_setup)
- [Performance Considerations](#_performance_considerations)
- [Using DirectML Through ONNX Runtime](#_using_directml_through_onnx_runtime)
- [Using_DirectML_Through_ONNX_Runtime](#_using_directml_through_onnx_runtime)
- [Why Use ONNX Runtime?](#_why_use_onnx_runtime)
- [Why_Use_ONNX_Runtime?](#_why_use_onnx_runtime)
- [Using the DirectML Execution Provider](#_using_the_directml_execution_provider)
- [Using_the_DirectML_Execution_Provider](#_using_the_directml_execution_provider)
- [Integration with Vulkan via ONNX Runtime](#_integration_with_vulkan_via_onnx_runtime)
- [Integration_with_Vulkan_via_ONNX_Runtime](#_integration_with_vulkan_via_onnx_runtime)
- [Performance: How DirectML Compares](#_performance_how_directml_compares)
- [Performance:_How_DirectML_Compares](#_performance_how_directml_compares)
- [DirectML vs CUDA](#_directml_vs_cuda)
- [DirectML_vs_CUDA](#_directml_vs_cuda)
- [DirectML vs TensorFlow Lite](#_directml_vs_tensorflow_lite)
- [DirectML_vs_TensorFlow_Lite](#_directml_vs_tensorflow_lite)
- [DirectML vs ONNX Runtime (Generic Backends)](#_directml_vs_onnx_runtime_generic_backends)
- [DirectML_vs_ONNX_Runtime_(Generic_Backends)](#_directml_vs_onnx_runtime_generic_backends)
- [When DirectML Makes Sense](#_when_directml_makes_sense)
- [When_DirectML_Makes_Sense](#_when_directml_makes_sense)
- [Ideal Use Cases](#_ideal_use_cases)
- [Ideal_Use_Cases](#_ideal_use_cases)
- [When to Consider Alternatives](#_when_to_consider_alternatives)
- [When_to_Consider_Alternatives](#_when_to_consider_alternatives)
- [Summary](#_summary)

## Content

Windows has always been the dominant platform for PC gaming and graphics development. Yet for years, machine learning on Windows lagged behind Linux. CUDA worked best on Linux, TensorFlow was optimized for Linux, and Windows developers often felt like second-class citizens in the ML world.

DirectML changes this. It’s Microsoft’s solution for hardware-accelerated machine learning on Windows, designed to work with any GPU—NVIDIA, AMD, Intel, or Qualcomm. It’s built on DirectX 12, making it a natural fit for Windows graphics applications, and it integrates seamlessly with the Windows ecosystem.

This chapter explores DirectML: what makes it unique, how it compares to CUDA and other ML acceleration APIs, how to integrate it with Vulkan applications on Windows, and when it’s the right choice for your project.

DirectML is unapologetically Windows-centric. While other ML frameworks aim for cross-platform compatibility, DirectML focuses on being the best solution for Windows. This focus brings significant advantages for Windows developers.

The PC gaming market is diverse. NVIDIA dominates the high end, but AMD has significant market share, and Intel’s Arc GPUs are gaining traction. Qualcomm is entering the Windows ARM market. If you’re building a Windows application, you can’t assume your users have NVIDIA GPUs.

CUDA only works on NVIDIA GPUs. If your application uses CUDA for ML acceleration, users with AMD or Intel GPUs get no acceleration. They’re stuck with slow CPU inference, leading to poor user experience and negative reviews.

DirectML solves this problem. It’s vendor-agnostic, working with any DirectX 12-capable GPU. Your application automatically leverages whatever GPU the user has—NVIDIA, AMD, Intel, or Qualcomm. One codebase, universal acceleration.

This vendor neutrality is DirectML’s killer feature for Windows applications. You write your ML code once, and it works well on all hardware. No vendor-specific code paths, no performance cliffs for users with "the wrong" GPU.

DirectML is built on DirectX 12, Microsoft’s modern graphics API. If you’re building a Windows graphics application, you’re likely already using DirectX 12 for rendering. DirectML integrates seamlessly with your existing DirectX 12 code.

You can share command queues between rendering and ML inference. You can share memory between graphics resources and ML tensors. You can synchronize operations using DirectX 12’s fence mechanism. This tight integration eliminates the overhead of bridging between separate graphics and ML contexts.

For Vulkan developers, this creates an interesting situation. DirectML is DirectX 12-based, but Vulkan and DirectX 12 can interoperate on Windows through shared resources. We’ll explore this integration later in the chapter.

DirectML integrates deeply with the Windows ecosystem:

**Windows ML**: A high-level API built on DirectML that provides easy model loading and inference. It’s designed for application developers who want ML features without deep ML expertise.

**ONNX Runtime**: Has a DirectML execution provider, allowing ONNX models to leverage DirectML acceleration automatically.

**Visual Studio**: Full debugging and profiling support for DirectML applications.

**PIX**: Microsoft’s GPU profiler works with DirectML, letting you analyze ML inference performance alongside graphics rendering.

This ecosystem integration makes DirectML a natural choice for Windows developers. The tools you already use for graphics development work for ML development too.

DirectML is Windows-only. If you need to deploy on Linux, macOS, Android, or iOS, DirectML isn’t an option. This is a significant limitation compared to the WebGPU execution provider, which works across all platforms.

For Windows-exclusive applications (many PC games, Windows-specific tools), targeting DirectML directly or via its specific ONNX Runtime provider is a great choice. For cross-platform applications, you should use **WebGPU**. WebGPU will automatically use DirectML behind the scenes on Windows, giving you the same hardware acceleration while maintaining a single codebase that also runs on Linux and Android via Vulkan.

DirectML’s architecture mirrors DirectX 12’s design philosophy: explicit control, low overhead, and close-to-metal performance.

DirectML provides a library of ML operators—convolution, pooling, activation functions, normalization, etc. Each operator is implemented as a highly optimized GPU kernel that works across all DirectX 12-capable hardware.

Unlike OpenCL, where you write custom kernels for each operation, DirectML provides pre-built operators. This is both a strength and a limitation. The strength: operators are highly optimized and work on all hardware. The limitation: you’re constrained to the operators DirectML provides.

The operator set is comprehensive, covering most common ML operations:

* 
Convolutions (2D, 3D, depthwise, grouped, transposed)

* 
Pooling (max, average, global, adaptive)

* 
Activation functions (ReLU, Leaky ReLU, ELU, Sigmoid, Tanh, Softmax, etc.)

* 
Normalization (batch, layer, instance, local response)

* 
Element-wise operations (add, multiply, etc.)

* 
Reduction operations (sum, mean, max, min)

* 
Matrix operations (GEMM, matrix multiply)

* 
And many more

For most models, these operators are sufficient. For cutting-edge research models with exotic operations, you might need to implement custom operators or use a different framework.

DirectML uses DirectX 12’s command list model. You build a graph of operators, compile it, then record commands to execute the graph. This is similar to how you record rendering commands in DirectX 12.

The workflow:

Create a DirectML device (tied to a DirectX 12 device)

Create operator descriptors for each operation in your model

Compile operators into an execution graph

Allocate GPU memory for inputs, outputs, and intermediate tensors

Record commands to execute the graph

Submit the command list to the GPU

Wait for completion or synchronize with other work

This explicit model gives you fine-grained control over execution and synchronization, at the cost of more complex code compared to high-level frameworks.

DirectML uses DirectX 12’s resource model. Tensors are stored in DirectX 12 buffers or textures. You manage memory allocation, binding, and lifetime explicitly.

This explicit memory management is powerful but requires care. You’re responsible for:

* 
Allocating buffers large enough for your tensors

* 
Ensuring proper alignment (DirectML has specific alignment requirements)

* 
Managing buffer lifetimes (buffers must remain valid during execution)

* 
Handling memory reuse (to minimize allocation overhead)

The benefit is efficiency. You can reuse buffers across multiple inferences, share memory between rendering and ML, and optimize memory layout for your specific use case.

DirectML supports "metacommands"—hardware-specific implementations of common operations that can be significantly faster than the standard operators.

GPU vendors can provide metacommands for operations like convolution or matrix multiplication that leverage hardware-specific features. When available, DirectML automatically uses metacommands instead of standard operators, providing better performance without code changes.

This is how DirectML achieves competitive performance with OpenCL despite being vendor-agnostic. Vendors optimize metacommands for their hardware, and applications benefit automatically.

Integrating DirectML with Vulkan applications on Windows requires bridging between two different graphics APIs. This is possible but requires careful handling.

Your Vulkan application uses Vulkan for rendering. DirectML uses DirectX 12 for ML inference. These are separate APIs with separate device contexts, separate command queues, and separate memory pools.

The naive approach—treating them as completely separate—works but is inefficient. You’d copy data from Vulkan memory to CPU memory, then to DirectX 12 memory for inference, then back through CPU memory to Vulkan memory. These copies are expensive and hurt performance.

The better approach is to share resources between Vulkan and DirectX 12, eliminating unnecessary copies.

Windows provides mechanisms for sharing resources between Vulkan and DirectX 12:

**Shared Handles**: Both Vulkan and DirectX 12 support exporting and importing memory using Windows handles. You can allocate memory in Vulkan, export a handle, and import it into DirectX 12 (or vice versa).

**Shared Fences**: Similarly, you can share synchronization primitives (fences/semaphores) between Vulkan and DirectX 12, allowing proper synchronization without CPU involvement.

The workflow for shared memory:

Allocate memory in Vulkan using `VK_KHR_external_memory_win32`

Export a Windows handle to the memory

Import the handle into DirectX 12 using `ID3D12Device::OpenSharedHandle`

Both APIs can now access the same physical memory

Use shared fences to synchronize access

This eliminates data copies. Your Vulkan rendering writes to a texture, DirectML reads from the same memory for inference, and writes results back to shared memory that Vulkan can read.

Here’s a practical pattern for integrating DirectML with Vulkan:

**Setup Phase**:

Create Vulkan device and DirectX 12 device (on the same physical GPU)

Allocate shared memory for input and output tensors

Create DirectML operators and compile the inference graph

Create shared fences for synchronization

**Per-Frame Execution**:

Vulkan renders to a shared texture

Signal a shared fence from Vulkan

DirectX 12 waits on the fence

DirectML executes inference, reading from the shared texture

DirectML writes results to shared memory

Signal another shared fence from DirectX 12

Vulkan waits on the fence

Vulkan reads inference results and continues rendering

This pattern minimizes overhead while maintaining correct synchronization.

Here’s how you set up shared memory between Vulkan and DirectX 12:

// Vulkan side: Allocate exportable memory
VkExternalMemoryBufferCreateInfo externalInfo = {};
externalInfo.sType = VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO;
externalInfo.handleTypes = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT;

VkBufferCreateInfo bufferInfo = {};
bufferInfo.sType = VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO;
bufferInfo.pNext = &externalInfo;
bufferInfo.size = tensorSize;
bufferInfo.usage = VK_BUFFER_USAGE_STORAGE_BUFFER_BIT;

VkBuffer buffer;
vkCreateBuffer(device, &bufferInfo, nullptr, &buffer);

// Allocate and bind memory
VkMemoryAllocateInfo allocInfo = {};
allocInfo.sType = VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO;
allocInfo.allocationSize = memRequirements.size;
allocInfo.memoryTypeIndex = findMemoryType(memRequirements.memoryTypeBits);

VkExportMemoryAllocateInfo exportInfo = {};
exportInfo.sType = VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO;
exportInfo.handleTypes = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT;
allocInfo.pNext = &exportInfo;

VkDeviceMemory memory;
vkAllocateMemory(device, &allocInfo, nullptr, &memory);
vkBindBufferMemory(device, buffer, memory, 0);

// Export handle
VkMemoryGetWin32HandleInfoKHR handleInfo = {};
handleInfo.sType = VK_STRUCTURE_TYPE_MEMORY_GET_WIN32_HANDLE_INFO_KHR;
handleInfo.memory = memory;
handleInfo.handleType = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT;

HANDLE sharedHandle;
vkGetMemoryWin32HandleKHR(device, &handleInfo, &sharedHandle);

// DirectX 12 side: Import the handle
ID3D12Resource* d3d12Resource;
d3d12Device->OpenSharedHandle(sharedHandle, IID_PPV_ARGS(&d3d12Resource));

// Now both Vulkan and DirectX 12 can access the same memory

This is complex, but it’s a one-time setup cost. Once established, the shared memory can be used for many inference operations with no copying overhead.

Shared resource integration has overhead:

**Synchronization Cost**: Waiting on fences has some CPU overhead. Minimize the number of synchronization points.

**Memory Layout**: Vulkan and DirectX 12 might have different optimal memory layouts for the same data. You might need to choose a layout that’s acceptable for both, even if it’s not optimal for either.

**Driver Overhead**: Sharing resources between APIs involves driver coordination, which has some overhead. This is usually small but can add up if you’re sharing many resources.

For most applications, these costs are outweighed by eliminating data copies. But for very high-frequency inference (every frame at 120+ FPS), you might need to carefully profile and optimize.

While you can use DirectML directly, most applications use it through ONNX Runtime’s DirectML execution provider. This provides a higher-level API while still leveraging DirectML’s performance.

ONNX Runtime provides several advantages over direct DirectML usage:

**Simpler API**: ONNX Runtime handles operator creation, graph compilation, and memory management. You just load a model and run inference.

**Model Format Support**: ONNX Runtime loads ONNX models directly. With direct DirectML, you’d need to parse the model format yourself and create operators manually.

**Cross-Platform**: ONNX Runtime works on all platforms. You select which execution provider to use.  You may use WebGPU on all platforms as a default for GPU acceleration as this translates to being backed by DirectML in Windows and Vulkan in Linux/Android.  However, there’s some capabilites that might occur in more specific execution providers so adjust to your needs.  It is reasonable to target CPU as a standard on all platforms, then expect WebGPU, and then use CUDA or similar on NVIDIA or Metal on Apple as an example.

**Optimization**: ONNX Runtime applies graph optimizations automatically—operator fusion, constant folding, memory planning, etc.

For most applications, ONNX Runtime with DirectML execution provider is the right choice. Use direct DirectML only if you need fine-grained control or have specific requirements that ONNX Runtime doesn’t meet.

Enabling DirectML in ONNX Runtime is simple:

#include 

// Create session options
Ort::SessionOptions sessionOptions;

// Enable DirectML execution provider
Ort::ThrowOnError(OrtSessionOptionsAppendExecutionProvider_DML(sessionOptions, 0));

// Create session
Ort::Session session(env, modelPath, sessionOptions);

// Run inference (same as any ONNX Runtime session)
auto outputTensors = session.Run(runOptions, inputNames, inputTensors,
                                   inputCount, outputNames, outputCount);

That’s it. ONNX Runtime handles all DirectML setup, operator creation, and execution. Your inference automatically uses DirectML acceleration on Windows.

When using ONNX Runtime with DirectML, integration with Vulkan follows the same pattern as direct DirectML usage:

Create shared memory between Vulkan and DirectX 12

Copy input data to shared memory (or render directly to it)

Run ONNX Runtime inference (which uses DirectML internally)

Read results from shared memory

The difference is that ONNX Runtime handles the DirectML details. You don’t need to create operators or compile graphs—ONNX Runtime does that for you.

How does DirectML performance compare to CUDA, TensorFlow Lite, and other options?

On NVIDIA GPUs, CUDA is typically faster than DirectML. CUDA has more mature optimization, better compiler technology, and direct hardware access. For NVIDIA-specific applications, CUDA is the performance king.

But the gap is narrowing. DirectML’s metacommands allow vendors to provide highly optimized implementations. On recent NVIDIA GPUs with good DirectML metacommand support, the performance difference is often 10-20%, not 2-3x.

On AMD and Intel GPUs, DirectML is the only option for GPU acceleration since CUDA doesn’t work on non-NVIDIA hardware. DirectML is optimized for these GPUs and provides excellent performance.

For cross-vendor Windows applications, DirectML’s universal acceleration usually outweighs CUDA’s peak performance on NVIDIA hardware.

TensorFlow Lite is mobile-focused and not optimized for desktop GPUs. On Windows desktop, DirectML is significantly faster than TensorFlow Lite for most models.

TensorFlow Lite’s strength is mobile deployment, where its aggressive optimization and small size matter. On Windows desktop, these advantages are less relevant, and DirectML’s better desktop GPU utilization wins.

ONNX Runtime with the **WebGPU** execution provider is the generic way to run everywhere. On Windows platforms, WebGPU will use DirectML behind the scenes to achieve its acceleration.

DirectML provides a 5-50x speedup compared to CPU-only inference. While targeting DirectML explicitly provides the best possible integration for Windows-only software, the performance gain from using the generic WebGPU provider is virtually identical on Windows, making WebGPU the better choice for most cross-platform developers.

DirectML isn’t always the right choice. Here’s when it shines and when to consider alternatives.

**Windows-Exclusive Applications**: If you’re building for Windows only (many PC games, Windows-specific tools), DirectML is the natural choice.

**Cross-Vendor GPU Support**: If your users have diverse GPUs (NVIDIA, AMD, Intel), DirectML ensures everyone gets acceleration.

**DirectX 12 Applications**: If you’re already using DirectX 12 for rendering, DirectML integrates seamlessly.

**Vulkan on Windows**: If you’re using Vulkan on Windows and want GPU-accelerated ML, DirectML is a strong option (with shared resource integration).

**ONNX Runtime Users**: If you’re using ONNX Runtime for cross-platform deployment, enabling DirectML on Windows is trivial and provides significant speedup.

**Cross-Platform Deployment**: If you need to deploy on Linux, macOS, or mobile, DirectML doesn’t help. Use ONNX Runtime with the **WebGPU** backend for generic cross-platform acceleration.

**NVIDIA-Only Applications**: If you know all your users have NVIDIA GPUs, using the specific **CUDA** or **TensorRT** providers might provide better performance for your specific hardware target.

**Mobile Deployment**: DirectML is desktop-only. For mobile, use TensorFlow Lite, PyTorch Mobile, or platform-specific solutions.

**Linux Development**: DirectML is Windows-only. On Linux, use the **WebGPU** backend for generic cross-vendor acceleration, as it will automatically leverage **Vulkan** for performance.

DirectML is Microsoft’s solution for hardware-accelerated machine learning on Windows, built on DirectX 12 and designed to work with any GPU. Its vendor-agnostic approach ensures universal acceleration across NVIDIA, AMD, Intel, and Qualcomm hardware, making it ideal for Windows applications with diverse user hardware.

The architecture mirrors DirectX 12’s explicit control model, providing a comprehensive operator library, command list-based execution, and explicit memory management. Metacommands enable hardware-specific optimization while maintaining vendor neutrality.

Integration with Vulkan applications is possible through shared resources (memory and fences), eliminating data copies while maintaining proper synchronization. Most applications use DirectML through ONNX Runtime’s DirectML execution provider, which provides a simpler API while retaining DirectML’s performance benefits.

DirectML excels for Windows-exclusive applications, cross-vendor GPU support, and DirectX 12 or Vulkan applications on Windows. For cross-platform deployment or mobile applications, consider ONNX Runtime with platform-appropriate backends or TensorFlow Lite.

[Previous: PyTorch Mobile](04_pytorch_mobile.html) | [Next: Integration Patterns](06_integration_patterns.html)
