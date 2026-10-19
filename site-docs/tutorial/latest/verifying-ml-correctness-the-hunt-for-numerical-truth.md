# Verifying ML Correctness: The Hunt for Numerical Truth

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Debugging_and_Performance/03_verifying_correctness.html

## Table of Contents

- [The Philosophy of Truth: Why "Mostly Right" is Wrong](#_the_philosophy_of_truth_why_mostly_right_is_wrong)
- [The_Philosophy_of_Truth:_Why_"Mostly_Right"_is_Wrong](#_the_philosophy_of_truth_why_mostly_right_is_wrong)
- [The Golden Reference Strategy](#_the_golden_reference_strategy)
- [The_Golden_Reference_Strategy](#_the_golden_reference_strategy)
- [Quantifying "Correctness": Error Metrics](#_quantifying_correctness_error_metrics)
- [Quantifying_"Correctness":_Error_Metrics](#_quantifying_correctness_error_metrics)
- [1. Mean Absolute Error (MAE)](#_1_mean_absolute_error_mae)
- [1._Mean_Absolute_Error_(MAE)](#_1_mean_absolute_error_mae)
- [2. Mean Squared Error (MSE)](#_2_mean_squared_error_mse)
- [2._Mean_Squared_Error_(MSE)](#_2_mean_squared_error_mse)
- [3. Peak Signal-to-Noise Ratio (PSNR)](#_3_peak_signal_to_noise_ratio_psnr)
- [3._Peak_Signal-to-Noise_Ratio_(PSNR)](#_3_peak_signal_to_noise_ratio_psnr)
- [The "Epsilon" Problem (  )](#_the_epsilon_problem_epsilon)
- [The_"Epsilon"_Problem_(__)](#_the_epsilon_problem_epsilon)
- [Absolute vs. Relative Tolerance](#_absolute_vs_relative_tolerance)
- [Absolute_vs._Relative_Tolerance](#_absolute_vs_relative_tolerance)
- [Harvesting the Truth: A PyTorch Template](#_harvesting_the_truth_a_pytorch_template)
- [Harvesting_the_Truth:_A_PyTorch_Template](#_harvesting_the_truth_a_pytorch_template)
- [Reading the GPU: The Synchronization Handshake](#_reading_the_gpu_the_synchronization_handshake)
- [Reading_the_GPU:_The_Synchronization_Handshake](#_reading_the_gpu_the_synchronization_handshake)
- [The Multi-Stage Readback](#_the_multi_stage_readback)
- [The_Multi-Stage_Readback](#_the_multi_stage_readback)
- [Systematic Troubleshooting: The Divergence Search](#_systematic_troubleshooting_the_divergence_search)
- [Systematic_Troubleshooting:_The_Divergence_Search](#_systematic_troubleshooting_the_divergence_search)
- [1. Check Preprocessing](#_1_check_preprocessing)
- [1._Check_Preprocessing](#_1_check_preprocessing)
- [2. Check Weights and Layout](#_2_check_weights_and_layout)
- [2._Check_Weights_and_Layout](#_2_check_weights_and_layout)
- [3. Check Padding and Stride](#_3_check_padding_and_stride)
- [3._Check_Padding_and_Stride](#_3_check_padding_and_stride)
- [Numerical Stability in Shaders: Precision Preservation](#_numerical_stability_in_shaders_precision_preservation)
- [Numerical_Stability_in_Shaders:_Precision_Preservation](#_numerical_stability_in_shaders_precision_preservation)
- [The Accumulator Trick](#_the_accumulator_trick)
- [The_Accumulator_Trick](#_the_accumulator_trick)
- [Interpreting Error Patterns: The Diagnostic Table](#_interpreting_error_patterns_the_diagnostic_table)
- [Interpreting_Error_Patterns:_The_Diagnostic_Table](#_interpreting_error_patterns_the_diagnostic_table)
- [Integrating Verification into CI](#_integrating_verification_into_ci)
- [Integrating_Verification_into_CI](#_integrating_verification_into_ci)
- [Summary: Trust, but Verify](#_summary_trust_but_verify)
- [Summary:_Trust,_but_Verify](#_summary_trust_but_verify)

## Content

You’ve fixed the Vulkan-specific bugs—the validation layers are silent, RenderDoc shows your descriptor sets are bound correctly, and your command buffers are submitting without a hitch. But your image classifier is still predicting "Toaster" for an image of a "Golden Retriever."

This is the most frustrating stage of ML development: the **Silent Numerical Failure**. Your implementation is a "correct" Vulkan program, but it is an "incorrect" mathematical model. Unlike a crash, a numerical bug doesn’t stop the world; it simply corrupts it.

In this chapter, we are going to learn how to prove that your math is correct. We will bridge the gap between the high-level world of PyTorch and the low-level world of Vulkan SPIR-V kernels, using mathematical verification to find the exact point where your implementation diverges from reality.

In graphics, if a pixel is slightly the wrong shade of blue, nobody dies. In Machine Learning, "slightly wrong" can be catastrophic. If you are building a medical imaging tool or an autonomous drone, a 0.1% numerical drift in a deep layer can flip a classification from "Tumor" to "Healthy" or "Obstacle" to "Clear Sky."

Bugs in ML are **Pathological**. Because neural networks are essentially long chains of matrix multiplications, a tiny error at the start of the chain acts like a snowball rolling down a mountain. By the end, it’s an avalanche of garbage.

To build reliable AI, you must adopt the mindset of a scientist: **Your implementation is a hypothesis, and the Golden Reference is the truth.**

The only way to debug a neural network is to compare it against a **Golden Reference**—a known-correct implementation that you trust implicitly. Typically, this is the original model running in PyTorch, TensorFlow, or ONNX Runtime (CPU).

The strategy is simple but rigorous:

**Harvest**: Extract the output of every single layer from the Golden Reference during a single forward pass.

**Compare**: Run your Vulkan implementation with the exact same input and "dump" the output of every corresponding compute shader.

**Binary Search**: Find the **first** layer where the results diverge. The bug is guaranteed to be in that layer’s shader or its input configuration.

Before we can compare, we need a mathematical definition of "the same." In floating-point math, two numbers are rarely exactly equal. We need to quantify the error.

The simplest metric. It tells you the average "distance" between your result and the truth.

  

  

* 
**When to use**: Good for general health checks. It’s easy to interpret (e.g., "The average pixel is off by 0.001").

* 
**The Trap**: MAE can hide a single "Infinity" or "NaN" if the rest of the 100,000 pixels are perfect.

MSE penalizes large errors much more heavily than small ones because it squares the difference.

  

  

* 
**When to use**: Detecting "outliers." If most pixels are perfect but one pixel is wildly wrong (a "firefly"), MSE will skyrocket while MAE might stay low.

Commonly used when your ML model is reconstructing an image (like the denoiser in the Ray Tracing chapter).

  

  

* 
**When to use**: Higher is better. A PSNR > 40dB usually means the images are visually identical to the human eye.

Why can’t we just use `if (a == b)`?

Floating-point numbers are approximations. In Vulkan, your GPU might use a different "Fused Multiply-Add" (FMA) instruction than your Intel or AMD CPU. These tiny differences in rounding accumulate over thousands of operations.

If you check for an absolute difference of   :

* 
For a value of `0.1`, a difference of `0.00001` is reasonable.

* 
For a value of `1000.0`, a difference of `0.00001` is **impossible** to achieve due to how floating point precision works (the distance between adjacent floats at 1000 is much larger than 0.00001).

**The Golden Rule of ML Verification**: Use a combination of **Absolute** and **Relative** tolerance.

bool isCorrect(float vulkan, float golden, float absTol = 1e-5f, float relTol = 1e-4f) {
    float diff = std::abs(vulkan - golden);
    // Pass if EITHER the absolute distance is tiny
    // OR the relative distance is small (handles large numbers)
    return (diff 

To verify your model, you need a script that acts as your "Ground Truth Generator." We use **Forward Hooks** to capture intermediate data without modifying the model’s source code.

import torch
import torch.nn as nn
import numpy as np
import torchvision.models as models

# 1. Load the model
model = models.mobilenet_v2(pretrained=True)
model.eval()

# 2. Instrument the model (The "Hook" Pattern)
activations = {}
def get_activation(name):
    def hook(model, input, output):
        # DETACH is critical: prevents GPU memory leaks
        # CPU converts to a format C++ can read easily
        activations[name] = output.detach().cpu().numpy()
    return hook

# Register hooks for critical layers
# You can find these names by running `print(model)`
model.features[0].register_forward_hook(get_activation('layer_0_conv'))
model.features[1].register_forward_hook(get_activation('layer_1_bottleneck'))
model.classifier[1].register_forward_hook(get_activation('output_logits'))

# 3. Create a Deterministic Input
# Do NOT use random noise for verification! Use a fixed seed.
torch.manual_seed(42)
input_tensor = torch.randn(1, 3, 224, 224)

# 4. Run Inference
with torch.no_grad():
    output = model(input_tensor)

# 5. Save to Disk
# NP.SAVE creates a binary file that is easy to map in C++
np.save("ref_input.npy", input_tensor.numpy())
for name, tensor in activations.items():
    np.save(f"ref_{name}.npy", tensor)
    print(f"Captured {name}: Shape {tensor.shape}")

Reading the "Vulkan truth" back to the CPU is the most common place for bugs to hide. If you don’t synchronize correctly, you aren’t reading your results—you’re reading uninitialized garbage or the results from three frames ago.

To read a buffer safely in Vulkan, you must navigate three visibility domains:

**Compute Domain**: The GPU is writing to `DEVICE_LOCAL` memory.

**Transfer Domain**: The GPU is copying from `DEVICE_LOCAL` to `HOST_VISIBLE` memory.

**Host Domain**: The CPU is reading from the mapped memory.

void verifyBuffer(vk::Buffer deviceBuffer, vk::DeviceSize size, const std::string& name) {
    // 1. BARRIER: Wait for compute writes to finish
    vk::BufferMemoryBarrier computeBarrier{
        .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
        .dstAccessMask = vk::AccessFlagBits::eTransferRead,
        .buffer = deviceBuffer,
        .size = size
    };
    cmd.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                        vk::PipelineStageFlagBits::eTransfer,
                        {}, {}, computeBarrier, {});

    // 2. COPY: Move to a staging buffer
    cmd.copyBuffer(deviceBuffer, stagingBuffer, vk::BufferCopy(0, 0, size));

    // 3. BARRIER: Ensure copy finishes before CPU maps memory
    vk::BufferMemoryBarrier hostBarrier{
        .srcAccessMask = vk::AccessFlagBits::eTransferWrite,
        .dstAccessMask = vk::AccessFlagBits::eHostRead,
        .buffer = stagingBuffer,
        .size = size
    };
    cmd.pipelineBarrier(vk::PipelineStageFlagBits::eTransfer,
                        vk::PipelineStageFlagBits::eHost,
                        {}, {}, hostBarrier, {});

    // 4. SYNC: Wait for the entire command buffer to finish
    graphicsQueue.submit(cmdBuffer, fence);
    device.waitForFences(fence, VK_TRUE, UINT64_MAX);

    // 5. READ: Map and compare
    float* gpuData = static_cast(stagingMemory.mapMemory(0, size));
    compareWithRef(gpuData, name);
    stagingMemory.unmapMemory();
}

If your final prediction is wrong, follow this path:

Dump your `preprocessedInput` buffer. Does it match `ref_input.npy`?

* 
**Common Bug**: R/B channel swaps. Red pixels in the Blue channel will completely change the high-level features.

* 
**Common Bug**: Normalization range. Did you subtract the mean then divide by stddev? Or did you just scale to [0, 1]?

Vulkan compute kernels often prefer **Weight-Major** layout for performance, while ONNX/PyTorch use **Filter-Major** layout.

* 
**Filter-Major (NCHW)**: `[Out_Channels, In_Channels, H, W]`

* 
**Optimal GPU Layout**: `[H, W, In_Channels, Out_Channels]`

* 
**The Bug**: If you upload the weights without transposing them to match your shader’s loop order, every convolution will be garbage.

If Layer 1 matches but Layer 2 is shifted by one pixel, your padding logic is wrong.

* 
**Symmetry**: Is your padding `(1, 1, 1, 1)`? Or did you accidentally apply `(2, 0, 2, 0)`?

* 
**Rounding**: In Pooling layers, does your implementation floor or ceil the output dimensions? Vulkan and PyTorch must agree.

When summing thousands of values (e.g., in a large Fully Connected layer), the order of operations matters.

  

  

In a Vulkan shader, you might use **Shared Memory Reduction** to calculate a dot product. Depending on your workgroup size, you might sum them in a different order than PyTorch does on the CPU.

If you are using `float16` for your model weights to save bandwidth, **always accumulate in `float32`**.

// DANGEROUS: Accumulating in FP16 will lose precision rapidly
float16_t sum = 0.0hf;
for(...) sum += input[i] * weight[i];

// CORRECT: Store inputs in FP16, but use FP32 for the math
float sum = 0.0f;
for(...) sum += float(input[i]) * float(weight[i]);

This single change can reduce your    by two orders of magnitude.

| Error Pattern | Likely Cause | Solution |
| --- | --- | --- |
| **Small Constant Offset** | Floating point literal precision (e.g. using `0.1` instead of `0.1f`). | Use explicit `f` suffixes in GLSL. |
| **Growing Error (Layer by Layer)** | Accumulation precision loss (Summing 1000s of small numbers). | Accumulate in `float32` even if inputs are `float16`. |
| **Massive Random Errors** | Descriptor set mismatch or uninitialized memory. | Use RenderDoc to verify buffer bindings. |
| **Zeroed Out Regions** | Workgroup dispatch math (Integer division rounding down). | Use `(N + Size - 1) / Size` formula. |
| **Checkered Patterns** | Memory layout mismatch (HWC vs NCHW). | Verify the stride and offset logic in your `pixelIdx` calculation. |

A professional ML pipeline runs verification on every commit. You should add a `--verify` flag to your C++ application that:

Loads the `.npy` files harvested from PyTorch.

Runs one inference pass on the Vulkan device.

Calculates    for each layer.

Exits with code `0` only if all layers pass within tolerance.

# Example verification command
./my_vulkan_ml --verify --ref_dir ./golden_references --abs_tol 1e-5 --rel_tol 1e-4

If this command fails in CI, the build is rejected. This ensures that a performance optimization in one branch doesn’t secretly break the model’s accuracy.

Verification is the difference between a hobbyist and a professional ML engineer. By implementing a rigorous layer-by-layer comparison, you turn the "magic" of a neural network into a solvable engineering problem.

* 
**Harvest** ground truth from a trusted framework like PyTorch.

* 
**Synchronize** your Vulkan readbacks using barriers and fences.

* 
**Quantize** your success using MAE and MSE metrics.

* 
**Binary Search** your network to isolate the first point of divergence.

In the next chapter, we will assume your implementation is 100% correct, and we will move on to the next challenge: **Performance Profiling**.

[Previous: Debugging Vulkan Compute](02_debugging_vulkan_compute.html) | [Next: Performance Profiling](04_performance_profiling.html)
