# CPU Baseline Implementation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Desktop_Applications/03_practical_implementation.html

## Table of Contents

- [What We’re Building](#_what_were_building)
- [What_We’re_Building](#_what_were_building)
- [Deep Dive: Preprocessing Logic](#_deep_dive_preprocessing_logic)
- [Deep_Dive:_Preprocessing_Logic](#_deep_dive_preprocessing_logic)
- [1. Aspect-Aware Resizing](#_1_aspect_aware_resizing)
- [1._Aspect-Aware_Resizing](#_1_aspect_aware_resizing)
- [2. Normalization: The Magic Numbers](#_2_normalization_the_magic_numbers)
- [2._Normalization:_The_Magic_Numbers](#_2_normalization_the_magic_numbers)
- [3. Layout Transpose: HWC to NCHW](#_3_layout_transpose_hwc_to_nchw)
- [3._Layout_Transpose:_HWC_to_NCHW](#_3_layout_transpose_hwc_to_nchw)
- [Getting the Model and Labels](#_getting_the_model_and_labels)
- [Getting_the_Model_and_Labels](#_getting_the_model_and_labels)
- [CPU Baseline Implementation](#_cpu_baseline_implementation)
- [CPU_Baseline_Implementation](#_cpu_baseline_implementation)
- [Inference: The "Forward Pass" in C++](#_inference_the_forward_pass_in_c)
- [Inference:_The_"Forward_Pass"_in_C++](#_inference_the_forward_pass_in_c)
- [The Importance of Numerical Stability in Softmax](#_the_importance_of_numerical_stability_in_softmax)
- [The_Importance_of_Numerical_Stability_in_Softmax](#_the_importance_of_numerical_stability_in_softmax)
- [Debugging Your First Implementation](#_debugging_your_first_implementation)
- [Debugging_Your_First_Implementation](#_debugging_your_first_implementation)
- [Performance Bottlenecks: Where Does the Time Go?](#_performance_bottlenecks_where_does_the_time_go)
- [Performance_Bottlenecks:_Where_Does_the_Time_Go?](#_performance_bottlenecks_where_does_the_time_go)
- [The Hybrid Path](#_the_hybrid_path)
- [The_Hybrid_Path](#_the_hybrid_path)
- [The R/B Channel Swap Pitfall](#_the_rb_channel_swap_pitfall)
- [The_R/B_Channel_Swap_Pitfall](#_the_rb_channel_swap_pitfall)
- [Troubleshooting: Common Pitfalls](#_troubleshooting_common_pitfalls)
- [Troubleshooting:_Common_Pitfalls](#_troubleshooting_common_pitfalls)
- [Summary](#_summary)

## Content

Now that you understand how CNNs work, let’s build the foundational image classification application. This chapter focuses on getting a working CPU baseline using ONNX Runtime. We’ll load models, preprocess images correctly, run inference, and display results.

This baseline is crucial—it gives you a correct reference implementation to verify against when you add GPU acceleration, threading, and camera input in later chapters.

The application will:

* 
Load a pre-trained MobileNetV2 model from ONNX format

* 
Accept images from files or camera

* 
Preprocess them (resize, normalize, layout transformation)

* 
Run inference to get class predictions

* 
Display top-5 results with confidence scores

We’ll implement this in stages, verifying correctness at each step.

Before we touch ONNX Runtime, we must understand the "contract" between the model and the data. If you feed the model raw pixel values (0-255), it will give you garbage. You must perform a three-step transformation.

MobileNetV2 expects a square 224×224 input. If your photo is a wide 1920×1080 landscape, you can’t just squash it to a square—that would distort the features and make the dog look like a pancake.

// Simple Bilinear Resize (Conceptual)
// We interpolate between 4 neighboring pixels to get the new value
float interpolate(float p00, float p01, float p10, float p11, float x_diff, float y_diff) {
    return p00 * (1 - x_diff) * (1 - y_diff) +
           p10 * x_diff * (1 - y_diff) +
           p01 * (1 - x_diff) * y_diff +
           p11 * x_diff * y_diff;
}

In a production app, you would usually **Crop** the center of the image to maintain the aspect ratio, then resize that square crop to 224×224.

Neural networks are trained on specific statistical distributions. For ImageNet models, the standard is:

  

  

The "Magic Numbers" for ImageNet are:
*   **Mean**: `[0.485, 0.456, 0.406]` (R, G, B)
*   **StdDev**: `[0.229, 0.224, 0.225]`

// Normalization in C++
float r = (pixel.r / 255.0f - 0.485f) / 0.229f;
float g = (pixel.g / 255.0f - 0.456f) / 0.224f;
float b = (pixel.b / 255.0f - 0.406f) / 0.225f;

These numbers represent the average and variance of the millions of images in the ImageNet dataset. By subtracting the mean, we center the data around zero, which helps the network’s activation functions (like ReLU) stay in their most effective range.

As we discussed in the previous chapter, graphics files use **Interleaved** (HWC) layout: `[R0, G0, B0, R1, G1, B1, …​]`.

Most ML models expect **Planar** (NCHW) layout: `[R0, R1, R2, …​, G0, G1, G2, …​, B0, B1, B2, …​]`.

// Transpose Logic
std::vector planarData(1 * 3 * 224 * 224);
for (int y = 0; y 

Download the pre-trained MobileNetV2 model:

cd ml_inference
mkdir -p models
cd models
wget https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-7.onnx

You also need ImageNet class labels (imagenet_labels.txt) - a 1000-line text file mapping class IDs to names. You can grab this from any ImageNet classification project on GitHub.

Start simple: load image, preprocess on CPU, run ONNX Runtime inference, display results.

class ImageClassifier {
public:
    ImageClassifier(const std::string& modelPath) {
        // The Environment is the top-level ONNX Runtime object.
        // It manages the thread pool for all sessions.
        env_ = Ort::Env(ORT_LOGGING_LEVEL_WARNING, "ImageClassifier");

        // SessionOptions allow us to tune performance.
        Ort::SessionOptions options;

        // ENABLE_ALL turns on constant folding, node fusion, and more.
        options.SetGraphOptimizationLevel(GraphOptimizationLevel::ORT_ENABLE_ALL);

        // We can also set how many threads ONNX should use for math.
        // For a CPU baseline, 4 threads is a good starting point.
        options.SetIntraOpNumThreads(4);

        session_ = Ort::Session(env_, modelPath.c_str(), options);
    }

    std::vector classify(const std::string& imagePath);

private:
    std::vector preprocessImage(const std::string& path);
    std::vector runInference(const std::vector& input);

    Ort::Env env_;
    Ort::Session session_{nullptr};
    // ...
};

When we run inference, we aren’t just calling a function; we are managing a complex exchange of memory.

std::vector ImageClassifier::runInference(const std::vector& input) {
    // 1. Memory Info: Tells ONNX we are using standard CPU RAM
    auto memory_info = Ort::MemoryInfo::CreateCpu(OrtArenaAllocator, OrtMemTypeDefault);

    // 2. Create Input Tensor: This WRAPS our std::vector.
    // It does NOT copy the data, which is efficient but means
    // our 'input' vector must stay alive until session_.Run() finishes!
    std::array input_shape = {1, 3, 224, 224};
    Ort::Value input_tensor = Ort::Value::CreateTensor(
        memory_info, const_cast(input.data()), input.size(),
        input_shape.data(), input_shape.size());

    // 3. Run: The heavy lifting happens here.
    // Note: session_.Run returns a vector of 'Ort::Value' outputs.
    auto output_tensors = session_.Run(
        Ort::RunOptions{nullptr},
        input_names.data(), &input_tensor, 1,
        output_names.data(), 1);

    // 4. Extract results
    float* output_data = output_tensors[0].GetTensorMutableData();
    return std::vector(output_data, output_data + 1000);
}

Once you have the 1000 scores (logits), you must apply Softmax to get probabilities. As we saw in the math section, this involves   .

A logit of 88.0 is common. But    is roughly   —the absolute limit of a 32-bit float. A logit of 90.0 will overflow and return `Infinity`, crashing your app or giving you `NaN` (Not a Number) results.

We solve this using the **Max-Subtraction Trick**:

  

  

This mathematically produces the exact same result but ensures the largest input to    is `0.0` (because   ). Since   , we stay perfectly within the safe range of floating-point numbers.

You can find the complete source code and CMake configuration in the `attachments/ml_inference` folder. To build the example, follow the standard CMake workflow:

mkdir build && cd build
cmake ..
cmake --build .
./classification ../test_images/dog.jpg

Expected output:

Top 5 predictions:
Golden retriever: 87.3%
Labrador retriever: 8.2%
Cocker spaniel: 2.1%
...

Congratulations! You’ve built a working CPU-based image classifier. While it’s a bit slow, it provides the perfect baseline for the GPU-accelerated chapters that follow.

On a modern CPU (like a 4-core laptop processor), you can expect this classification to take between **50ms and 150ms**.

If you profile your application, you will find an interesting split:

* 
**Image Loading & Resize**: 10-20ms (depending on image resolution)

* 
**Normalization & Transpose**: 5-10ms

* 
**Inference (MobileNetV2)**: 40-100ms

* 
**Post-processing (Softmax)**: 

Wait, if inference takes 80ms, but we want 60 FPS (16.6ms), how do we get there?

This is where the **Hybrid Approach** from the introduction becomes practical.

**Preprocessing on GPU**: In the next chapters, we’ll move the Resize and Normalization to a Vulkan Compute shader. This will reduce that 30ms CPU cost to roughly **2ms** on the GPU.

**Asynchronous Inference**: We’ll run the ONNX inference on a background thread. The UI will keep rendering at 60 FPS, and the classification results will update "when they’re ready."

By starting with this CPU baseline, you now have a "Ground Truth" implementation. When your Vulkan shader produces weird colors or your async thread crashes, you can always come back to this code to see what the correct values should be.

One of the most common bugs in CV (Computer Vision) is the **RGB vs BGR** mismatch.

* 
**stb_image**: Loads as RGB.

* 
**OpenCV**: Loads as BGR.

* 
**MobileNetV2**: Expects RGB.

If your "Golden Retriever" is being classified as a "Blueberry," you likely have your Red and Blue channels swapped. Always verify your loading library’s default color order.

Building your first ML pipeline is rarely a "first-time pass" experience. Here are the three most common reasons for getting 0% confidence or wildly incorrect results:

**Normalization Misalignment**: Did you forget to divide by 255.0 before subtracting the mean? If your input is `[0, 255]` but the model expects `[0, 1]`, the ReLU activations will "blow up" and produce extreme values.

**Layout Confusion**: Are you sure your HWC→NCHW transpose is correct? If you accidentally put Red pixels in the Blue plane, the features (like "skin tone" or "grass color") will be wrong.

**Model Version Mismatch**: There are dozens of MobileNetV2 versions. Some use 224x224 input, some use 128x128. Some use different normalization constants. Always check the `README` of the model you download from the ONNX Model Zoo.

You’ve built a working CPU baseline image classifier:

* 
**Model loading**: ONNX Runtime session with graph optimization

* 
**Preprocessing**: Aspect-aware resize, ImageNet normalization, and HWC→NCHW transpose

* 
**Inference**: ONNX Runtime C++ API managing tensor memory

* 
**Post-processing**: Numerically stable Softmax and top-K selection

* 
**Verification**: The foundation for GPU acceleration

This baseline works but is slow. The next chapters accelerate it with GPU preprocessing, add threading for responsiveness, and integrate real-time camera input.

[Previous: Image Classification Concepts](02_image_classification.html) | [Next: CI/CD Render Validation](04_ci_render_validation.html)
