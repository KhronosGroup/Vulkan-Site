# Model Optimization Techniques: Beyond the Code

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Advanced_Topics/05_model_optimization.html

## Table of Contents

- [The Pragmatic Path: Library-Level Graph Optimization](#_the_pragmatic_path_library_level_graph_optimization)
- [The_Pragmatic_Path:_Library-Level_Graph_Optimization](#_the_pragmatic_path_library_level_graph_optimization)
- [1. Graph Optimization Levels](#_1_graph_optimization_levels)
- [1._Graph_Optimization_Levels](#_1_graph_optimization_levels)
- [2. The ONNX Simplifier](#_2_the_onnx_simplifier)
- [2._The_ONNX_Simplifier](#_2_the_onnx_simplifier)
- [Strategy 1: Operator Fusion (The Bandwidth Saver)](#_strategy_1_operator_fusion_the_bandwidth_saver)
- [Strategy_1:_Operator_Fusion_(The_Bandwidth_Saver)](#_strategy_1_operator_fusion_the_bandwidth_saver)
- [The Mathematics of Folding](#_the_mathematics_of_folding)
- [The_Mathematics_of_Folding](#_the_mathematics_of_folding)
- [Strategy 2: Structured Pruning (Trimming the Fat)](#_strategy_2_structured_pruning_trimming_the_fat)
- [Strategy_2:_Structured_Pruning_(Trimming_the_Fat)](#_strategy_2_structured_pruning_trimming_the_fat)
- [Sensitivity Analysis: The "Hunt for Dead Weight"](#_sensitivity_analysis_the_hunt_for_dead_weight)
- [Sensitivity_Analysis:_The_"Hunt_for_Dead_Weight"](#_sensitivity_analysis_the_hunt_for_dead_weight)
- [Strategy 3: Knowledge Distillation (Teacher and Student)](#_strategy_3_knowledge_distillation_teacher_and_student)
- [Strategy_3:_Knowledge_Distillation_(Teacher_and_Student)](#_strategy_3_knowledge_distillation_teacher_and_student)
- [Strategy 4: The Winograd Transform (The Algebra Trick)](#_strategy_4_the_winograd_transform_the_algebra_trick)
- [Strategy_4:_The_Winograd_Transform_(The_Algebra_Trick)](#_strategy_4_the_winograd_transform_the_algebra_trick)
- [Why Winograd?](#_why_winograd)
- [Hands-on: The Winograd Transformation (C++)](#_hands_on_the_winograd_transformation_c)
- [Hands-on:_The_Winograd_Transformation_(C++)](#_hands_on_the_winograd_transformation_c)
- [Strategy 5: Dynamic Shape Optimization](#_strategy_5_dynamic_shape_optimization)
- [Strategy_5:_Dynamic_Shape_Optimization](#_strategy_5_dynamic_shape_optimization)
- [Strategy 6: GAP + FC Fusion (Classifier Head)](#_strategy_6_gap_fc_fusion_classifier_head)
- [Strategy_6:_GAP_+_FC_Fusion_(Classifier_Head)](#_strategy_6_gap_fc_fusion_classifier_head)
- [Summary: The Optimization Roadmap](#_summary_the_optimization_roadmap)
- [Summary:_The_Optimization_Roadmap](#_summary_the_optimization_roadmap)

## Content

You’ve optimized your kernels, quantized to INT8, and managed your memory heaps. But your inference is still too slow. The problem isn’t your implementation—it’s the **Model itself**.

The models you download from the "Model Zoo" are trained for one thing: **Accuracy**. They are often full of redundant operations and architectural "dead weight" that doesn’t contribute to the final prediction. In this chapter, we are going to learn how to "rewrite" the neural network using techniques like **Operator Fusion**, **Knowledge Distillation**, and the **Winograd Transform**.

If you are using ONNX Runtime, much of this "rewriting" happens automatically. However, as a professional, you must know how to control and verify these transformations.

ONNX Runtime has three levels of optimization:

* 
**Basic**: Constant folding, redundant node removal.

* 
**Extended**: Fusing simple sequences (e.g., `Conv + ReLU` → `FusedConv`).

* 
**All**: Complex vendor-specific fusions (e.g., fusing an entire Attention block for Transformers).

Ort::SessionOptions options;
// Level ORT_ENABLE_ALL is recommended for production.
options.SetGraphOptimizationLevel(GraphOptimizationLevel::ORT_ENABLE_ALL);

// You can also 'Export' the optimized model to see what it did!
options.SetOptimizedModelFilePath(L"models/optimized_model.onnx");

Sometimes the graph from PyTorch is so messy that ONNX Runtime’s internal optimizer gets confused.

* 
**The Tool**: `onnx-simplifier` (Python).

* 
**The Command**: `python -m onnxsim model.onnx model_sim.onnx`

* 
**Why?**: It pre-calculates every constant sub-expression in your model, often reducing the node count by 30-50%.

In high-performance ML, we treat the neural network as a **Computation Graph**. Every node is an operation (like Convolution) and every edge is a tensor. Optimization is the process of **Graph Rewriting**—mathematically proving that a sequence of five operations can be replaced by one single operation that produces the exact same result.

In a naive network, every layer is a separate Vulkan kernel. **Convolution    BatchNorm    ReLU**.
This forces the GPU to write the convolution output to VRAM, then read it back for BatchNorm, then write it again, then read it back for ReLU. Since we are usually memory-bandwidth bound, this is a disaster.

**The Solution**: Fuse them. We "fold" the parameters of BatchNorm and Bias into the weights of the convolution.

Given a convolution result   , BatchNorm performs:

  

  

By substituting   , we can derive new "Fused" weights    and a fused bias   :

  

  

  

  

**The Result**: You move from three kernel launches and six VRAM accesses to **one kernel launch and two VRAM accesses**. This provides a    speedup for "free" with zero loss in accuracy. This folding should be done once at "Export Time" so the shader only sees a standard convolution.

Pruning is the process of removing "unimportant" weights from the network to reduce its size and complexity. While **Unstructured Pruning** (random zeros) is popular in research, **Structured Pruning** is the only one that provides a speedup on general hardware.

Instead of individual weights, we remove **entire filters** (rows in a matrix) or **entire channels**.

How do you know which filters are "important"?

**Calibration**: Run your model on a validation dataset.

**Calculate Energy**: For every filter in a layer, calculate the sum of its absolute activations (   norm).

**The "Tail" of the Distribution**: Plot the energy of all filters. Typically, you’ll see a few "Superstars" that fire on every image, and a long "Tail" of filters that barely ever fire.

**Prune**: Physically remove the bottom 20% of filters and their corresponding inputs in the next layer.

**The Payoff**: If you prune 50% of the filters in a layer, the matrix becomes half as wide and half as tall. It is genuinely smaller and runs    faster on **any** hardware because you are doing half the math.

Sometimes a model (like ResNet-152) is just too large to run in real-time, no matter how much you optimize. In this case, we use **Knowledge Distillation**.

**The Teacher**: A massive, slow, highly accurate model (the "Gold Standard").

**The Student**: A tiny, fast model (e.g., MobileNetV2).

During training, we don’t just teach the student to predict the right label (Dog/Cat). We teach it to mimic the **Soft Probabilities** of the teacher. We use a **Temperature** parameter    to "smooth" the probabilities so the student can see the "nuances" (e.g., why the teacher thought this dog looked 10% like a cat).

  

  

**The Result**: The student model achieves higher accuracy than if it were trained alone, because it is "inheriting" the deep feature representation of the teacher. It learns to find the same patterns but with 100x fewer parameters.

For the most common convolution—the **3x3 kernel**—we can use the **Winograd    transform**. This is how high-end engines like NVIDIA cuDNN and ARM Compute Library achieve their record-breaking speeds.

![Diagram showing the flow of data through Winograd transformation and element-wise multiplication](../../_images/images/ML_Inference/Advanced_Topics/winograd_flow.svg)

Figure 1. Winograd Transform Pipeline

* 
**Traditional Conv**: Requires 9 multiplications per output pixel.

* 
**Winograd Conv**: Transforms the input and weights into a "Winograd Space," performs an element-wise multiplication, and transforms back.

  

  

Where   ,   , and    are fixed transformation matrices. For   , which produces a 2x2 output tile from a 4x4 input tile using a 3x3 filter, the transformation matrices are:

  

  

Winograd works by shifting the computational cost from **multiplications** (which are expensive and power-hungry) to **additions** (which are cheap). It reduces the number of multiplications from 9 to 4. This is a    theoretical speedup.

To use Winograd in a shader, you must first transform your **Weights** offline. Unlike BatchNorm folding, which changes the values, Winograd weight transformation changes the **Dimensions**.

// Transforming a 3x3 filter 'g' into a 4x4 Winograd filter 'GgG^T'
void transformWeightToWinograd(const float* g, float* out4x4) {
    const float G[4][3] = {
        { 1.0f,  0.0f,  0.0f},
        { 0.5f,  0.5f,  0.5f},
        { 0.5f, -0.5f,  0.5f},
        { 0.0f,  0.0f,  1.0f}
    };
    // 1. Perform G * g
    // 2. Perform (G * g) * G^T
    // Result is a 4x4 matrix ready for Hadamard product in the shader.
}

In many real-world apps, you don’t know the input size. A user might upload a portrait or landscape photo. Standard engines often "Pad" every image to a large square (e.g. 1024x1024), which is incredibly wasteful.

* 
**The Problem**: If you render a 224x224 image inside a 1024x1024 padded buffer, you are wasting    the compute power on "Zero" pixels.

* 
**The Solution**: **Bucketing**.

Define 3-4 standard aspect ratios (e.g. 1:1, 16:9, 9:16).

* 
Pre-compile 3-4 separate Vulkan compute pipelines, each tuned for one of these buckets.

* 
At runtime, pick the bucket that is the "Tightest Fit" for the user’s image.

In the final layers of a classifier, you have a **Global Average Pool (GAP)** followed by a **Fully Connected (FC)** layer.

* 
**GAP**: Averages a    tensor into a    vector.

* 
**FC**: Multiplies that vector by a    weight matrix.

Instead of two kernels, we can **Fuse** them. As the FC kernel threads load the weights, they also perform the averaging of the    spatial tile in **Shared Memory**. This eliminates the need to store the intermediate 1024-element vector in VRAM entirely.

Model optimization is about **rewriting the graph** to suit the silicon.

**Pragmatic Path**: Use `onnx-simplifier` and set `ORT_ENABLE_ALL`.

**Fuse**: Fold BatchNorm and Bias into your Convolutions at export time.

**Prune**: Perform sensitivity analysis to remove filters that never fire.

**Distill**: Use Distillation if your "Small" model isn’t accurate enough.

**Transform**: Implement Winograd for 3x3 kernels if you are compute-bound.

You have now mastered the Advanced Topics of ML Inference. You can quantize, tune for specific vendors, manage complex memory pools, and rewrite network architectures.

In our final section, we will take all these skills and apply them to the most challenging environment of all: **Embedded Applications**.

[Previous: Advanced Memory Management](04_memory_management.html) | [Next: Embedded Applications](../Embedded_Applications/01_introduction.html)
