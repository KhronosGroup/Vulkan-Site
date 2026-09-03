# Scene Understanding: Leveraging Vulkan in the XR Pipeline

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Embedded_Applications/06_scene_understanding_openxr.html

## Table of Contents

- [The XR Pressure Cooker: 90Hz ML](#_the_xr_pressure_cooker_90hz_ml)
- [The_XR_Pressure_Cooker:_90Hz_ML](#_the_xr_pressure_cooker_90hz_ml)
- [The High-Frequency Handshake](#_the_high_frequency_handshake)
- [The_High-Frequency_Handshake](#_the_high_frequency_handshake)
- [The Graphics Handshake](#_the_graphics_handshake)
- [The_Graphics_Handshake](#_the_graphics_handshake)
- [Synchronizing with Timeline Semaphores](#_synchronizing_with_timeline_semaphores)
- [Synchronizing_with_Timeline_Semaphores](#_synchronizing_with_timeline_semaphores)
- [Asynchronous Resource Ownership](#_asynchronous_resource_ownership)
- [Asynchronous_Resource_Ownership](#_asynchronous_resource_ownership)
- [Stereo-Aware Preprocessing](#_stereo_aware_preprocessing)
- [Texture Arrays and Batching](#_texture_arrays_and_batching)
- [Texture_Arrays_and_Batching](#_texture_arrays_and_batching)
- [Multi-View Extensions](#_multi_view_extensions)
- [Buffer Topologies: Layered vs. Side-by-Side](#_buffer_topologies_layered_vs_side_by_side)
- [Buffer_Topologies:_Layered_vs._Side-by-Side](#_buffer_topologies_layered_vs_side_by_side)
- [Task: Filling the Runtime Gaps (Privacy Masking)](#_task_filling_the_runtime_gaps_privacy_masking)
- [Task:_Filling_the_Runtime_Gaps_(Privacy_Masking)](#_task_filling_the_runtime_gaps_privacy_masking)
- [Asynchronous Hand-off: Acquiring Passthrough](#_asynchronous_hand_off_acquiring_passthrough)
- [Asynchronous_Hand-off:_Acquiring_Passthrough](#_asynchronous_hand_off_acquiring_passthrough)
- [Semantic Masking with Vulkan](#_semantic_masking_with_vulkan)
- [Semantic_Masking_with_Vulkan](#_semantic_masking_with_vulkan)
- [Compensating for "Thinking Time": The Pose Reprojection](#_compensating_for_thinking_time_the_pose_reprojection)
- [Compensating_for_"Thinking_Time":_The_Pose_Reprojection](#_compensating_for_thinking_time_the_pose_reprojection)
- [The Homography Warp](#_the_homography_warp)
- [The_Homography_Warp](#_the_homography_warp)
- [The Math of the Warp](#_the_math_of_the_warp)
- [The_Math_of_the_Warp](#_the_math_of_the_warp)
- [Custom SLAM: GPU-Accelerated Feature Extraction](#_custom_slam_gpu_accelerated_feature_extraction)
- [Custom_SLAM:_GPU-Accelerated_Feature_Extraction](#_custom_slam_gpu_accelerated_feature_extraction)
- [Managing Thermals in the Headset](#_managing_thermals_in_the_headset)
- [Managing_Thermals_in_the_Headset](#_managing_thermals_in_the_headset)
- [The Duty Cycle Strategy](#_the_duty_cycle_strategy)
- [The_Duty_Cycle_Strategy](#_the_duty_cycle_strategy)
- [Summary: The Vulkan XR Advantage](#_summary_the_vulkan_xr_advantage)
- [Summary:_The_Vulkan_XR_Advantage](#_summary_the_vulkan_xr_advantage)

## Content

In the previous chapters, we focused on "Flat" imagery or embedded sensors. But some of the most exciting applications for Vulkan ML live in **Extended Reality (XR)**. While modern OpenXR runtimes (like those from Meta, Apple, or Magic Leap) provide excellent "built-in" scene understanding—finding floors, walls, and hands automatically—they often leave the developer wanting more.

This is a **Bonus Exploration**. We aren’t here to teach you how to initialize OpenXR; we assume you already know your way around an `XrSession`. Instead, we are going to look at the unique ways Vulkan can help an OpenXR developer handle custom ML inference—tasks the runtime doesn’t provide, like identifying specific objects, protecting user privacy, or processing raw stereo feeds with ultra-low latency.

In a standard embedded app, a 50ms inference delay is a "slight lag." In an XR headset running at 90 FPS, a 50ms delay is **4.5 frames of history**. If you use that "old" data to draw an overlay, it will float behind the real world as the user moves their head, causing instant nausea.

To leverage Vulkan effectively in XR, we must move beyond the "Stop-and-Wait" model and embrace a pipeline that coordinates the **OpenXR Compositor**, the **Vulkan Compute Queue**, and the **Graphics Renderer**.

OpenXR handles the "Hardware Access," but it delegates the "Drawing" to Vulkan. When performing custom ML, we must perform a "Three-Way Handshake" between the OpenXR Passthrough, our ML Engine, and the Main Renderer.

To share textures between OpenXR and Vulkan, you must enable the [`XR_KHR_vulkan_enable2`](https://registry.khronos.org/OpenXR/specs/1.0/html/xrspec.html#XR_KHR_vulkan_enable2) extension. This extension requires you to create your Vulkan Instance and Device using specific flags requested by the OpenXR runtime.

// 1. Ask OpenXR what it needs from Vulkan
XrGraphicsRequirementsVulkanKHR graphicsRequirements{XR_TYPE_GRAPHICS_REQUIREMENTS_VULKAN_KHR};
xrGetVulkanGraphicsRequirementsKHR(xrInstance, systemId, &graphicsRequirements);

// 2. Create the Vulkan Device with OpenXR-specific graphics binding
// This structure tells the OpenXR runtime which Vulkan device we are using
// so it can synchronize texture access between the OS and our app.
XrGraphicsBindingVulkanKHR graphicsBinding{XR_TYPE_GRAPHICS_BINDING_VULKAN_KHR};
graphicsBinding.instance = vkInstance;
graphicsBinding.physicalDevice = vkPhysicalDevice;
graphicsBinding.device = vkDevice;
graphicsBinding.queueFamilyIndex = queueFamily;
graphicsBinding.queueIndex = 0;

// 3. Link to XrSessionCreateInfo
XrSessionCreateInfo sessionCreateInfo{XR_TYPE_SESSION_CREATE_INFO};
sessionCreateInfo.next = &graphicsBinding;
sessionCreateInfo.systemId = systemId;
xrCreateSession(xrInstance, &sessionCreateInfo, &session);

The biggest challenge in XR ML is synchronization. We want the GPU to be busy with the ML job while the CPU is already preparing the next frame’s geometry. We use **Vulkan Timeline Semaphores** to bridge the gap between the OpenXR frame cycle and our inference engine.

Because OpenXR uses its own internal queue for compositing, we must ensure our ML result is finished before the compositor attempts to use our final rendered frame.

// Managing Multiple Frames in Flight (XR Context)
struct FrameResources {
    vk::raii::Fence fence;
    vk::raii::Semaphore mlFinishedSemaphore; // Timeline Semaphore
    uint64_t mlValue;
};

void frameLoop() {
    xrWaitFrame(session, &waitInfo, &frameState);
    xrBeginFrame(session, &beginInfo);

    // 1. Acquire the Passthrough Texture
    XrSwapchainImageVulkanKHR xrImage;
    xrAcquireSwapchainImage(passthroughSwapchain, &acquireInfo, (XrSwapchainImageBaseHeader*)&xrImage);

    // 2. Submit ML Job to the COMPUTE Queue
    // We signal a Timeline Semaphore when the ML result is ready.
    uint64_t nextMlValue = ++globalMlCounter;

    vk::TimelineSemaphoreSubmitInfo timelineInfo;
    timelineInfo.setSignalSemaphoreValues(nextMlValue);

    vk::SubmitInfo submitInfo;
    submitInfo.setPNext(&timelineInfo);
    submitInfo.setSignalSemaphores(*mlTimelineSemaphore);

    computeQueue.submit(submitInfo);

    // 3. Render Virtual Content (GRAPHICS Queue)
    // We don't wait for the ML! We draw the virtual world immediately.
    // However, we use the ML result from 2-3 frames ago.
    uint64_t usableMlValue = std::max(0UL, nextMlValue - 2);
    renderVirtualWorld(frameState.predictedDisplayTime, usableMlValue);

    // 4. Compositor Submission
    xrEndFrame(session, &frameEndInfo);
}

By using this asynchronous submission, the ML "Thinking Time" is hidden. The result of the ML will be used in the **next** frame (or the one after), and we will use Vulkan math to compensate for the movement.

A critical nuance in the XR-Vulkan integration is that you do not "own" the swapchain images. The OpenXR runtime owns them and merely "loans" them to you.

* 
**Acquisition**: `xrAcquireSwapchainImage` provides a `VkImage` handle. You cannot use this image until `xrWaitSwapchainImage` returns successfully.

* 
**ML Integration**: If you want to use this image as a source for your ML Compute shader, you must ensure the shader finishes before you call `xrReleaseSwapchainImage`. If you fail to do this, the XR compositor might display a partially-processed texture, causing "Screen Tearing" in the user’s peripheral vision.

OpenXR provides passthrough as a **Stereo Pair** (Left and Right eyes). If you process these as two separate ML inferences, you double your power draw and latency.

A professional Vulkan XR implementation uses **VkImage Arrays** (Layered Textures). We configure our ML preprocessing shader to process both layers in a single dispatch, creating a "Batched" tensor for ONNX Runtime.

#version 450
// Preprocessing both eyes in one go
layout(local_size_x = 16, local_size_y = 16, local_size_z = 2) in;

layout(set = 0, binding = 0) uniform sampler2DArray passthroughIn;
layout(set = 0, binding = 1) writeonly buffer Output { float data[]; } outTensor;

layout(push_constant) uniform Params {
    uint targetWidth;
    uint targetHeight;
} pc;

void main() {
    uint eyeIdx = gl_GlobalInvocationID.z; // 0 = Left, 1 = Right
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);

    if (pos.x >= pc.targetWidth || pos.y >= pc.targetHeight) return;

    // 1. Hardware-Accelerated Sample
    // uv coordinates are 0.0 to 1.0
    vec2 uv = (vec2(pos) + 0.5) / vec2(pc.targetWidth, pc.targetHeight);

    // Sample from the correct layer of the XR texture array
    vec3 rgb = texture(passthroughIn, vec3(uv, eyeIdx)).rgb;

    // 2. Normalization and Planar Transpose
    // Place into the NCHW tensor at the correct batch offset
    uint planeSize = pc.targetWidth * pc.targetHeight;
    uint batchStride = eyeIdx * (3 * planeSize);
    uint pixelIdx = pos.y * pc.targetWidth + pos.x;

    // Batching logic: ImageNet Normalization
    outTensor.data[batchStride + 0 * planeSize + pixelIdx] = (rgb.r - 0.485) / 0.229;
    outTensor.data[batchStride + 1 * planeSize + pixelIdx] = (rgb.g - 0.456) / 0.224;
    outTensor.data[batchStride + 2 * planeSize + pixelIdx] = (rgb.b - 0.406) / 0.225;
}

This batching allows ONNX Runtime to use **Subgroup Wavefronts** more effectively, often resulting in a 30% speedup compared to two sequential mono inferences.

On some hardware (like the Meta Quest), you can use `VK_KHR_multiview`. This allows your fragment shaders to render to both eyes simultaneously using `gl_ViewIndex`. While this is great for rendering, for ML preprocessing, the `sampler2DArray` approach shown above is usually more portable and efficient for tensor creation.

Depending on the XR runtime (SteamVR vs. Meta Quest), passthrough might be delivered in two formats:

**Layered (Recommended)**: A `VkImage` with `arrayLayers = 2`. This is most efficient for Vulkan because you can use `sampler2DArray` or Multi-view extensions.

**Side-by-Side (SBS)**: A single wide texture (e.g., 3840x1080) where the left half is the left eye.

If your target uses SBS, your preprocessing shader must "Split" the image by adjusting the UV coordinates:

// SBS UV Logic
float splitX = (eyeIdx == 0) ? uv.x * 0.5 : 0.5 + uv.x * 0.5;
vec3 rgb = texture(passthroughSBS, vec2(splitX, uv.y)).rgb;

OpenXR runtimes give you "Planes," but they don’t give you "Context." A common requirement for enterprise XR is **Privacy Masking**—identifying computer screens or whiteboards in the real world and blurring them out in the user’s view to prevent data leakage.

In XR, the passthrough image is owned by the system compositor. We "Borrow" it for a few milliseconds. To prevent the ML from stalling the UI, we must use a **Fence Handshake**.

// Borrowing the texture for ML
void processML() {
    // 1. Wait for Compositor to release the image
    xrWaitSwapchainImage(passthroughSwapchain, &waitInfo);

    // 2. Transition layout for Compute
    vk::ImageMemoryBarrier barrier{
        .oldLayout = vk::ImageLayout::eUndefined,
        .newLayout = vk::ImageLayout::eShaderReadOnlyOptimal,
        .image = passthroughImage,
        // ...
    };

    // 3. Run ML Dispatch
    // ...

    // 4. Release back to Compositor
    xrReleaseSwapchainImage(passthroughSwapchain, &releaseInfo);
}

We use a lightweight Semantic Segmentation model (e.g., a MobileNetV2-UNet). The output is a "Privacy Mask" (1.0 = Sensitive, 0.0 = Safe).

**ML Inference**: Runs asynchronously on the passthrough feed, identifying "Screen" pixels.

**Vulkan Post-Processing**: We use the mask to drive a variable-rate blur kernel.

// Optimized Variable-Rate Blur Kernel
void main() {
    float mask = texture(mlMaskSampler, uv).r;
    vec3 color = texture(passthroughSampler, uv).rgb;

    // Adaptive Blur: Only compute the expensive blur if needed
    if (mask > 0.5) {
        vec3 blurred = vec3(0.0);
        float totalWeight = 0.0;
        float sigma = 10.0 * mask; // Blur intensity scales with mask confidence

        for(float x = -2.0; x 

Because ML takes time (e.g., 30ms), the "Privacy Mask" we just generated is technically for where the user’s head **was** 30ms ago. If we apply it directly, the blur will "drift" or "ghost" as the user turns their head.

We use Vulkan to perform a [**Homography Warp**](https://en.wikipedia.org/wiki/Homography_(computer_vision)) on the ML result. By comparing the `XrPosef` from the moment of capture    to the predicted display pose   , we can calculate a transformation matrix    that aligns the old mask with the new view.

The homography matrix    for a rotation    and translation    relative to a plane with normal    at distance    is:

  

  

For simple rotational movement (most common source of nausea), we can simplify this to:

  

  

In our Vulkan fragment shader, we use this matrix to "look back" into the ML mask:

layout(push_constant) uniform WarpData { mat3 homography; } warp;

void main() {
    // 1. Transform the current UV coordinate back to the 'ML space'
    // using the homography matrix calculated from the pose difference.
    vec3 mlSpacePos = warp.homography * vec3(uv, 1.0);
    vec2 mlUV = mlSpacePos.xy / mlSpacePos.z;

    // 2. Sample the mask using the corrected UV
    float correctedMask = texture(mlMaskSampler, mlUV).r;

    // 3. Reject samples outside the valid mask range (clamping)
    if (mlUV.x  1.0 || mlUV.y  1.0) {
        correctedMask = 0.0;
    }

    // ... use correctedMask for blurring ...
}

This "Vulkan Time-Warp" is the secret to making high-latency ML feel like zero-latency scene understanding. It ensures the blur stays perfectly "stuck" to the real-world computer screen even during fast head movements.

Sometimes the runtime’s tracking isn’t enough—for example, if you need to track a specific industrial marker or a QR code that is moving independently of the room.

Vulkan can help the OpenXR developer by performing [**ORB Feature Extraction**](https://en.wikipedia.org/wiki/Oriented_FAST_and_rotated_BRIEF) or [**Optical Flow**](https://en.wikipedia.org/wiki/Optical_flow) at 90Hz. This is particularly useful when you need to "Augment" the runtime’s pose with your own object-specific data.

**Fast Corner Detection**: We use a compute shader to implement the [**FAST (Features from Accelerated Segment Test)**](https://en.wikipedia.org/wiki/Features_from_accelerated_segment_test) algorithm. Each thread looks at a circle of 16 pixels around a candidate point.

**Descriptor Matching**: Once features are found, we use **Subgroup Matrix Math** (as discussed in the Advanced Topics section) to compare descriptors against a library of known objects.

**Result**: You get a custom `XrSpace` for your specific object, fully synchronized with the OpenXR world coordinate system.

// Simple FAST Corner Detector (GPU Optimized)
layout(local_size_x = 16, local_size_y = 16) in;

void main() {
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);
    float center = texelFetch(passthrough, pos, 0).r;

    // Check pixels in a circle (Bresenham circle)
    // If N contiguous pixels are significantly brighter/darker, it's a corner.
    uint mask = 0;
    if (abs(texelFetch(passthrough, pos + ivec2(0, 3), 0).r - center) > threshold) mask |= (1  threshold) mask |= (1 = 9) {
        storeFeature(pos);
    }
}

XR headsets are thermally fragile. Running a heavy U-Net at 90 FPS will cause the device to throttle within minutes.

Instead of running ML on every frame, use Vulkan to manage the **Inference Duty Cycle**.

* 
**Logic**: Run ML on Frame 1, skip Frames 2-5, run on Frame 6.

* 
**Smoothing**: Use the Homography Warp (Pose Reprojection) to "extrapolate" the ML mask for the skipped frames.

* 
**Benefit**: You get 90Hz visual updates with only 15Hz ML power draw.

By leveraging Vulkan directly in your OpenXR project, you gain three critical capabilities:

* 
**Asynchronous ML**: Running inference on the Compute queue without stalling the 90Hz compositor.

* 
**Latency Compensation**: Using Homography Warps to align "old" ML results with "new" head poses.

* 
**Stereo Efficiency**: Using texture arrays and batching to process both eyes in a single GPU pass.

This combination allows you to build XR applications that don’t just "show" the world, but deeply "understand" and "modify" it in real-time, going far beyond the basic features provided by the standard runtime.

[Previous: Complete Example](05_complete_example.html) | [Next: ML Compilers on Embedded Devices](07_ml_compiler.html)
