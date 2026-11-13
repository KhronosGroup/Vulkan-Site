# Desktop Applications

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Desktop_Applications/01_introduction.html

## Table of Contents

- [From Theory to Practice](#_from_theory_to_practice)
- [From_Theory_to_Practice](#_from_theory_to_practice)
- [What We’ll Build](#_what_well_build)
- [What_We’ll_Build](#_what_well_build)
- [Chapter Structure](#_chapter_structure)
- [The Three-Path Approach](#_the_three_path_approach)
- [The_Three-Path_Approach](#_the_three_path_approach)
- [Prerequisites](#_prerequisites)
- [A Word on Performance Expectations](#_a_word_on_performance_expectations)
- [A_Word_on_Performance_Expectations](#_a_word_on_performance_expectations)
- [Getting Started](#_getting_started)

## Content

You’ve built an inference engine. You’ve loaded ONNX models and run them on the GPU. You’ve verified that your results match PyTorch’s output to within floating-point precision. That’s excellent—you understand the fundamentals.

Now let’s build something you can actually use.

This chapter shifts from educational exercises to practical desktop applications. We’re going to build complete programs that classify images in real-time, integrate ML inference with graphics rendering, and demonstrate where Vulkan’s explicit control provides real advantages over high-level frameworks.

Here’s what makes this different from the MNIST example: we’re not just verifying that inference works, we’re building applications with real user interfaces, handling arbitrary inputs, and optimizing for interactive performance. The goal isn’t to prove you understand convolutions—it’s to deliver 60 FPS with live camera input while your graphics pipeline renders the results.

This chapter builds a complete desktop image classification application that demonstrates practical ML inference integration with Vulkan. We’ll start with static image classification, then extend it to real-time camera input, showing you how to build responsive interactive applications.

The application uses MobileNetV2 to classify images into one of 1000 ImageNet categories. You’ll learn the complete workflow: loading pre-trained models, preprocessing inputs (resize, normalize, color conversion), running inference efficiently, post-processing outputs (softmax, top-k selection), and visualizing results.

More importantly, you’ll see how to integrate ML inference into a Vulkan graphics application without sacrificing performance. We’ll cover async compute for overlapping transfers with computation, efficient CPU-GPU synchronization, and the pipeline design needed to maintain 30+ FPS with live camera input while rendering results.

This follows the same teaching pattern we established with MNIST: start with the problem, walk through the solution step by step, and explain concepts as they become necessary. We won’t dump theory upfront—we’ll teach what you need when you need it.

This section is organized into focused, practical chapters:

**[Image Classification: From MNIST to CNNs](02_image_classification.html)**: Understanding why fully connected networks fail for images and how CNNs solve the problem. You’ll learn convolution operations, building convolutional layers, pooling, and modern architectural patterns. This builds on your MNIST knowledge to handle real-world image classification with proper CNN architectures.

**[CPU Baseline Implementation](03_practical_implementation.html)**: Building a working image classifier using ONNX Runtime. Load models, preprocess correctly, run inference, verify against PyTorch. This is your reference implementation.

**[CI/CD Render Validation](04_ci_render_validation.html)**: Using ML to validate Vulkan renders in continuous integration. Train classifiers to detect rendering bugs, integrate with GitHub Actions, measure semantic similarity, and verify UI layout—practical ML for engineering problems.

**[Real-Time Camera Integration](05_real_time_camera.html)**: Extending the classifier to process webcam input at 30+ FPS. GPU-accelerated preprocessing, async compute pipelines, threading for responsiveness, and performance tuning for interactive applications.

**[RL-Based Automated Exploration](06_rl_automated_exploration.html)**: Using reinforcement learning to automatically explore and test Vulkan applications. Curiosity-driven agents with Random Network Distillation, automated bug discovery, benchmarking, and GUI automation for CI and beyond.

**[Ray Tracing Optimization](07_ray_tracing_optimization.html)**: Using AI to optimize high-performance ray tracing. You’ll learn about AI-driven denoising, adaptive sampling to maximize your ray budget, and using ML to detect areas that need temporal updates.

**[Future Directions: RAG, GANs, and Beyond](08_future_directions.html)**: Exploring advanced refinements for your desktop applications. Learn how to use GANs for style transfer and RAG for intelligent engineering diagnostics.

Each chapter focuses on one practical topic, building incrementally from static images to real-time interactive applications to automated testing and intelligent exploration.

Remember the three-path teaching method from the introduction? It appears throughout these chapters:

**Path 1 - ONNX Runtime** (the pragmatic path): Use ONNX Runtime for the neural network inference while handling preprocessing and visualization with Vulkan. This is what you’d actually do in production. ONNX Runtime gives you a battle-tested implementation of hundreds of operators, automatic optimization, and broad hardware support. Your Vulkan code focuses on what it does best: image processing and graphics.

**Path 2 - Custom Vulkan** (the educational path): Implement the entire pipeline in Vulkan compute shaders, including the neural network layers. This path helps you understand what’s happening under the hood and gives you appreciation for the complexity that ONNX Runtime handles automatically. It also demonstrates the techniques you’d use if you were implementing custom operations or integrating tightly with a rendering pipeline.

**Path 3 - ML Compiler** (the compiler-driven path): Use an ML compiler (IREE, Apache TVM, OpenXLA, MAX/Mojo) to lower models into optimized kernels with a minimal runtime, often targeting Vulkan via SPIR‑V. This can deliver near hand‑written performance with better portability and a smaller runtime footprint than generic libraries—without requiring you to write shaders.

In practice, most applications use a hybrid approach. You might use ONNX Runtime for the main network, compile select models with an ML compiler when it provides a better balance of performance and footprint, and still implement custom pre/post-processing in Vulkan for tight integration. Understanding all three paths gives you the flexibility to make informed architectural decisions.

Before diving into these applications, make sure you’re comfortable with:

* 
The Vulkan compute pipeline (covered in the "Vulkan Compute for ML" chapter)

* 
Loading and parsing ONNX models (covered in "Building the Inference Engine")

* 
Implementing basic neural network layers in compute shaders (also in "Building the Inference Engine")

* 
The MNIST example from the previous chapter

We’ll build on these foundations without re-teaching the basics. If something feels unfamiliar, refer back to those chapters for detailed explanations.

You’ll also need to install ONNX Runtime if you haven’t already. The "Third Party Libraries" chapter covers installation, but here’s the quick version for Linux:

# Download ONNX Runtime
wget https://github.com/microsoft/onnxruntime/releases/download/v1.17.0/onnxruntime-linux-x64-1.17.0.tgz
tar xzf onnxruntime-linux-x64-1.17.0.tgz

# Add to your CMakeLists.txt:
# set(ONNXRUNTIME_DIR "${CMAKE_SOURCE_DIR}/third_party/onnxruntime-linux-x64-1.17.0")

For Windows and macOS, grab the appropriate package from the ONNX Runtime releases page. The API is identical across platforms.

Let’s set realistic expectations. When we talk about "real-time" performance, we mean different things depending on the application:

**Image classification**: Processing a single 224×224 image should take under 20ms on a mid-range GPU. That’s fast enough for interactive applications where you classify images on demand.

**Camera classification**: We’re targeting 30+ FPS, which means a frame budget of 33ms. On modern hardware with proper pipelining, 60 FPS (16ms budget) is achievable.

**Batch processing**: If you’re classifying thousands of images offline, throughput matters more than latency. Batch inference with proper GPU utilization can process hundreds of images per second.

These numbers assume you’re using optimized models (like MobileNetV2) and reasonable input sizes. If you try to run ResNet-152 at 1024×1024 resolution on integrated graphics, you’re going to be disappointed. Part of deploying ML inference is choosing models that match your hardware and performance requirements.

We’ll measure actual performance numbers as we build each application, and we’ll discuss optimization strategies when performance doesn’t meet expectations. But remember: the goal is building working applications that demonstrate concepts, not achieving state-of-the-art benchmark numbers. Once you understand the pipeline, optimization becomes an engineering exercise rather than a mystery.

In the next chapter, we’ll build our first real application: an image classifier using MobileNetV2. We’ll start simple—load an image from disk, classify it, print the results—then gradually add preprocessing, a GUI, and real-time performance.

This is where the tutorial shifts from "how does this work" to "how do I build this". The tone changes slightly: less theory, more code, more practical problem-solving. We’ll still explain the concepts, but always in the context of solving actual problems rather than as abstract knowledge.

Ready? Let’s build something real.

[Previous: Complete MNIST Example](../Building_the_Inference_Engine/07_putting_it_together.html) | [Next: Image Classification Concepts](02_image_classification.html)
