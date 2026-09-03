# On-GPU Inference with Cooperative Matrices

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/17_ML_Inference_Spatial/02_on_gpu_inference.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: Specialized ML Hardware](#_the_concept_specialized_ml_hardware)
- [The_Concept:_Specialized_ML_Hardware](#_the_concept_specialized_ml_hardware)
- [Advanced: Predictive Gaze and Multi-GPU Inference](#_advanced_predictive_gaze_and_multi_gpu_inference)
- [Advanced:_Predictive_Gaze_and_Multi-GPU_Inference](#_advanced_predictive_gaze_and_multi_gpu_inference)
- [Why On-GPU? Latency and Power](#_why_on_gpu_latency_and_power)
- [Why_On-GPU?_Latency_and_Power](#_why_on_gpu_latency_and_power)

## Content

Neural networks rely on heavy matrix multiplication. To process sensor data at spatial frequencies, we use **Cooperative Matrices** (detailed in our Advanced Compute series) to tap into the GPU’s dedicated ML hardware.

This chapter falls under the category: **Beyond the OpenXR Standard**.

Standard OpenXR runtimes perform sensor ingestion but do not mandate how that data is processed. You use Vulkan’s Cooperative Matrix extensions to implement high-speed ML inference on-GPU, enabling predictive filtering and object recognition that the standard OpenXR frame loop does not natively coordinate.

Neural networks rely on heavy matrix multiplication. Standard compute shaders are excellent for general-purpose tasks, but for ML, we use **Cooperative Matrices** (detailed in our Advanced Compute series). This allows a whole **Subgroup** (32 or 64 threads) to work as a single unit to multiply large matrix tiles in one operation, bypassing traditional cache levels for maximum throughput:

// Enabling cooperative matrix features using designated initializers
vk::PhysicalDeviceCooperativeMatrixFeaturesKHR coopMatrixFeatures{
    .cooperativeMatrix = VK_TRUE
};

vk::DeviceCreateInfo deviceCreateInfo{
    .pNext = &coMatrixFeatures
};

In Slang, we use the `cooperative_matrix` type to tap into dedicated hardware:

// Using Slang's Matrix fragments for cooperative ML inference
[shader("compute")]
[numthreads(32, 1, 1)]
void performHandRefinement() {
    cooperative_matrix input;
    cooperative_matrix weights;

    input.load(rawJointBuffer, jointOffset);
    weights.load(weightBuffer, weightOffset);

    // High-speed Matrix-Multiply-Accumulate (MMA)
    auto result = mul(input, weights);

    result.store(refinedPoseBuffer, poseOffset);
}

Vulkan allows us to push ML performance beyond standard ingestion:

* 
**Predictive Gaze Smoothing**: Using **Cooperative Matrix** and **Subgroup Operations**, you can run a small neural network directly in your frame loop to predict the user’s future gaze point based on recent OpenXR telemetry, faster than the extension can report.

* 
**Multi-GPU Inference**: You can use Vulkan’s **Device Groups** to distribute ML inference workloads (like object recognition) across multiple GPUs, aggregating results before the OpenXR composition pass.

Performing ML inference on the GPU is critical for spatial computing:
1.  **Latency**: Sending sensor data to the CPU for ML processing causes visible lag, breaking the feeling of **Presence**.
2.  **Power Efficiency**: Matrix accelerators are significantly more energy-efficient than general-purpose ALUs. For mobile headsets, this reduces thermal throttling.

|  | For more information on cooperative matrices and ML inference, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#VK_KHR_cooperative_matrix), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_refining_spatial_data.html)
