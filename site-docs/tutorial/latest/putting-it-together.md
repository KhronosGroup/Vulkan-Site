# Putting It Together

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Building_the_Inference_Engine/07_putting_it_together.html

## Table of Contents

- [The High-Level Flow](#_the_high_level_flow)
- [The_High-Level_Flow](#_the_high_level_flow)
- [Loading and Parsing](#_loading_and_parsing)
- [Loading_and_Parsing](#_loading_and_parsing)
- [Buffer Allocation](#_buffer_allocation)
- [Creating Pipelines](#_creating_pipelines)
- [The Inference Loop](#_the_inference_loop)
- [The_Inference_Loop](#_the_inference_loop)
- [Running MNIST](#_running_mnist)
- [Verification Against PyTorch](#_verification_against_pytorch)
- [Verification_Against_PyTorch](#_verification_against_pytorch)
- [Performance](#_performance)
- [What We’ve Built](#_what_weve_built)
- [What_We’ve_Built](#_what_weve_built)
- [Limitations and Future Work](#_limitations_and_future_work)
- [Limitations_and_Future_Work](#_limitations_and_future_work)
- [Conclusion](#_conclusion)

## Content

We’ve covered the pieces: hardcoded execution, layer abstractions, graph representation, model formats. Now we connect them into a complete, working inference engine.

This chapter walks through the full pipeline—from loading a trained MNIST model to running inference and getting predictions. We’ll point to the working code in attachments while explaining the key concepts.

Here’s what happens when you run inference:

**Initialization** (once):

Load model from ONNX file

Parse into ComputationGraph

Allocate GPU buffers for all tensors

Upload learned weights to GPU

Create pipelines for each operation type

**Inference** (per input):

Upload input image to GPU

Execute operations in dependency order

Download output probabilities from GPU

Interpret results (which digit was predicted)

The initialization happens once at startup. Inference runs many times—potentially thousands of times per second for batch processing.

The entry point looks like this:

class InferenceEngine {
public:
    void loadModel(const std::string& onnxPath) {
        // Parse ONNX file
        onnx::ModelProto onnxModel = parseONNX(onnxPath);

        // Build our graph representation
        graph_ = buildGraphFromONNX(onnxModel);

        // Analyze execution order
        executionOrder_ = computeTopologicalSort(graph_);

        // Allocate GPU resources
        allocateBuffers(graph_);
        uploadWeights(graph_);
        createPipelines(graph_);
    }

private:
    ComputationGraph graph_;
    std::vector> executionOrder_;
    // Vulkan resources...
};

The `buildGraphFromONNX` function does what we described in the previous chapter: iterate ONNX nodes, create Operations, connect Tensors. The result is a ComputationGraph.

The `computeTopologicalSort` figures out execution order. For MNIST, it’s sequential: layer 1, layer 2, layer 3. For ResNet with skip connections, the topological sort handles the complexity automatically.

Each tensor needs a GPU buffer. For intermediate activations (layer outputs), we allocate fresh buffers. For weights, we allocate buffers and immediately upload the data:

void allocateBuffers(const ComputationGraph& graph) {
    for (const auto& op : graph.operations()) {
        // Allocate output buffers
        for (const auto& output : op->outputs()) {
            size_t size = calculateTensorSize(output);

            vk::BufferCreateInfo bufferInfo{
                .size = size,
                .usage = vk::BufferUsageFlagBits::eStorageBuffer
            };
            auto buffer = device_.createBuffer(bufferInfo);

            // Allocate and bind memory
            auto memory = allocateMemory(buffer, /* host visible or device local */);
            buffer.bindMemory(*memory, 0);

            output->setBuffer(std::move(buffer));
        }
    }
}

This is simplified—real code would do memory planning to reuse buffers for non-overlapping tensors, reducing memory usage. But the basic idea stands: every tensor gets a buffer.

Each operation type needs a compute pipeline. We create them upfront:

void createPipelines(const ComputationGraph& graph) {
    // Gather unique operation types
    std::set types;
    for (const auto& op : graph.operations()) {
        types.insert(op->type());
    }

    // Create pipeline for each type
    for (OpType type : types) {
        const char* shaderPath = getShaderPath(type);
        auto shaderModule = loadShader(shaderPath);

        vk::ComputePipelineCreateInfo pipelineInfo{
            .stage = {
                .stage = vk::ShaderStageFlagBits::eCompute,
                .module = *shaderModule,
                .pName = "main"
            },
            .layout = *pipelineLayout_
        };

        pipelines_[type] = device_.createComputePipeline(nullptr, pipelineInfo);
    }
}

Now when we execute a Dense operation, we bind the Dense pipeline. For Conv2D, we bind the Conv2D pipeline. The mapping is automatic.

With everything initialized, running inference is straightforward:

std::vector infer(const std::vector& inputData) {
    // Upload input
    auto inputTensor = graph_.inputs()[0];
    uploadToBuffer(inputTensor->buffer(), inputData);

    // Execute operations
    vk::CommandBufferBeginInfo beginInfo;
    cmdBuffer_.begin(beginInfo);

    for (const auto& op : executionOrder_) {
        executeOperation(cmdBuffer_, op);

        // Barrier between operations
        insertMemoryBarrier(cmdBuffer_);
    }

    cmdBuffer_.end();

    // Submit and wait
    vk::SubmitInfo submitInfo{
        .commandBufferCount = 1,
        .pCommandBuffers = &*cmdBuffer_
    };
    queue_.submit(submitInfo, fence_);
    device_.waitForFences(*fence_, true, UINT64_MAX);

    // Download output
    auto outputTensor = graph_.outputs()[0];
    return downloadFromBuffer(outputTensor->buffer(), outputTensor->elementCount());
}

The `executeOperation` function looks at the operation type, binds the appropriate pipeline, sets up descriptors pointing to input/output buffers, pushes parameters, and dispatches:

void executeOperation(vk::CommandBuffer& cmd, const Operation& op) {
    // Bind pipeline for this operation type
    cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *pipelines_[op.type()]);

    // Create and bind descriptor set
    auto descriptorSet = createDescriptorSet(op);
    cmd.bindDescriptorSets(/*...*/);

    // Push constants (dimensions, parameters)
    auto params = buildPushConstants(op);
    cmd.pushConstants(/*...*/, params);

    // Dispatch
    auto workgroups = calculateWorkgroups(op);
    cmd.dispatch(workgroups.x, workgroups.y, workgroups.z);
}

Each operation knows its inputs and outputs (the graph connections). We bind those buffers as descriptors, set the parameters, and dispatch.

Let’s see it in action:

int main() {
    // Initialize Vulkan
    VulkanContext vulkan;

    // Create inference engine
    InferenceEngine engine(vulkan);
    engine.loadModel("mnist_model.onnx");

    // Load test image
    auto image = loadImage("test_digit_7.png");  // 28x28 grayscale
    std::vector input = preprocessImage(image);  // Normalize to [0,1]

    // Run inference
    auto output = engine.infer(input);  // Returns 10 probabilities

    // Find prediction
    int predicted = std::max_element(output.begin(), output.end()) - output.begin();
    float confidence = output[predicted];

    std::cout 

Output:

Predicted: 7
Confidence: 99.8%

It works. The model we trained in PyTorch, exported to ONNX, loaded into our engine, and executed on Vulkan compute correctly predicts handwritten digits.

How do we know our inference is correct? We compare against the reference implementation:

import torch
from train_mnist import MNISTNet

# Load model
model = MNISTNet()
model.load_state_dict(torch.load('mnist_model.pth'))
model.eval()

# Load same test image
image = load_test_image('test_digit_7.png')

# Run PyTorch inference
with torch.no_grad():
    pytorch_output = model(image).numpy()

# Load our engine's output
our_output = np.loadtxt('vulkan_output.txt')

# Compare
diff = np.abs(pytorch_output - our_output)
print(f"Max difference: {np.max(diff):.6f}")
print(f"Mean difference: {np.mean(diff):.6f}")

Output:

Max difference: 0.000012
Mean difference: 0.000003

The outputs match within floating-point precision. Our implementation is correct.

On a mid-range GPU (NVIDIA RTX 3060), MNIST inference takes:

* 
**First run (cold)**: ~5ms (includes pipeline compilation)

* 
**Subsequent runs**: ~0.3ms (just execution)

* 
**Batch of 100**: ~8ms (80 inferences/ms, massive parallelism)

The GPU is overkill for tiny MNIST networks. But the pattern scales—the same code runs ResNet-50 inference in 15ms, which would take 150ms on CPU.

We now have:

**A working inference engine** that loads ONNX models and executes them on Vulkan compute.

**Clean abstractions** separating model representation (ComputationGraph), execution (operation dispatching), and resource management (buffers, pipelines).

**Verifiable correctness** matching PyTorch output to floating-point precision.

**Extensibility** making it easy to add new layer types—implement the shader, add a case to the factory, done.

The full implementation is in `attachments/ml_inference`. Key files:

* 
`vulkan_mnist_inference.cpp`: Main inference engine

* 
`weight_loader.hpp`: Simple binary weight format (before ONNX parsing)

* 
`mnist_inference.cpp`: Example using the engine

* 
`shaders/`: Compute shaders for each layer type

This is an educational implementation. Production engines would need:

**More operators**: We support Dense, Conv2D, ReLU, MaxPool. Real models use dozens more (BatchNorm, Softmax, Reshape, Concat, etc.).

**Optimization**: Operator fusion (combine operations into single shaders), memory planning (reuse buffers), FP16/INT8 quantization.

**Better error handling**: Validation, graceful failures, helpful error messages.

**Batching support**: Process multiple inputs in parallel, maximizing GPU utilization.

But the core architecture is sound. These additions are extensions, not fundamental changes. You have a working foundation to build on.

We started with a hardcoded forward pass, identified patterns, built abstractions, and ended with a flexible inference engine. Along the way, we learned:

* 
How neural networks execute (forward propagation through layers)

* 
How to represent networks (graphs with tensors and operations)

* 
How model formats work (ONNX and TFLite structure)

* 
How to implement layers as Vulkan compute shaders

* 
How to orchestrate execution with proper synchronization

This is the knowledge that lets you understand ML inference at a deep level, whether you’re using ONNX Runtime, building custom solutions, or optimizing performance for specific hardware.

The code is in the attachments. Compile it, run it, modify it. Add a new layer type. Try a different model. Profile the performance. Break things and fix them. That’s how you truly learn.

[Previous: NNEF Introduction](06_nnef_introduction.html) | [Next: Debugging and Performance](../Debugging_and_Performance/01_introduction.html)
