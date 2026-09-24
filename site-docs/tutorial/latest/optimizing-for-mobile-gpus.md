# Optimizing for Mobile GPUs

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/12_Mobile_and_Embedded_Compute/03_mobile_optimization.html

## Table of Contents

- [A Different Objective Function](#_a_different_objective_function)
- [A_Different_Objective_Function](#_a_different_objective_function)
- [Minimize DRAM Traffic Above All](#_minimize_dram_traffic_above_all)
- [Minimize_DRAM_Traffic_Above_All](#_minimize_dram_traffic_above_all)
- [A Worked Example: Fusing a Blur and a Tone-Map](#_a_worked_example_fusing_a_blur_and_a_tone_map)
- [A_Worked_Example:_Fusing_a_Blur_and_a_Tone-Map](#_a_worked_example_fusing_a_blur_and_a_tone_map)
- [Exploit 16-bit Precision](#_exploit_16_bit_precision)
- [Exploit_16-bit_Precision](#_exploit_16_bit_precision)
- [Right-Size the Workgroup](#_right_size_the_workgroup)
- [Right-Size_the_Workgroup](#_right_size_the_workgroup)
- [Manage Thermals and Frequency](#_manage_thermals_and_frequency)
- [Manage_Thermals_and_Frequency](#_manage_thermals_and_frequency)
- [Profile on the Real Device](#_profile_on_the_real_device)
- [Profile_on_the_Real_Device](#_profile_on_the_real_device)
- [Reading What the Profilers Tell You](#_reading_what_the_profilers_tell_you)
- [Reading_What_the_Profilers_Tell_You](#_reading_what_the_profilers_tell_you)
- [Summary](#_summary)

## Content

On the desktop we optimize almost exclusively for **time**: how many milliseconds does the dispatch take? On mobile and embedded devices the objective function gains two more terms that are often **more** important than raw latency:

* 
**Energy** — every joule spent is battery drained and heat generated.

* 
**Sustained performance** — a kernel that runs fast for one second but triggers **thermal throttling** is slower, on average, than one that runs steadily within the power envelope.

This reframes everything from the previous chapters. The fastest kernel is frequently the one that touches DRAM the least.

Because external memory bandwidth dominates the mobile power budget, your primary optimization lever is **data movement**, not arithmetic.

* 
**Fuse passes.** Two kernels that each read and write a full-resolution buffer cost two round-trips to DRAM. Fusing them into a single kernel that keeps the intermediate in registers or shared memory can halve your bandwidth.

* 
**Use shared memory and subgroups aggressively.** The LDS tiling (Chapter 3) and subgroup shuffles (Chapter 4) we used for **speed** on desktop are, on mobile, primarily **power** optimizations — keeping data on-chip avoids the expensive DRAM hop.

* 
**Compress and pack.** Store intermediates at the smallest precision that is correct (see below), and pack multiple values per word to reduce the number of transactions.

Suppose a photography pipeline blurs an image and then applies a tone-map curve. The naive approach is two dispatches:

// Pass 1: read src (R), write blurred (W) -> one full-image read + one full-image write
// Pass 2: read blurred (R), write final (W) -> another full read + full write

For a 12-megapixel image at FP16 (2 bytes/channel, 4 channels) that is roughly 96 MB **each** way, four times over: about 384 MB of DRAM traffic. On a phone where every megabyte moved costs measurable battery and heat, that is the dominant cost — the arithmetic is almost free by comparison.

Fusing the two stages into a single kernel keeps the blurred pixel in a register and applies the tone-map immediately, eliminating the intermediate buffer’s write **and** read:

[numthreads(8, 8, 1)]   // 64 invocations: safe under a 128-invocation limit
void fusedBlurToneMap(uint3 id : SV_DispatchThreadID)
{
    if (any(id.xy >= imageSize)) return;        // bounds check, see Chapter 2

    half4 blurred = boxBlur(srcImage, id.xy);   // gather happens via texture cache
    half4 mapped  = toneMap(blurred);           // stays in registers, no DRAM hop
    dstImage[id.xy] = mapped;                    // single write to DRAM
}

This halves the round-trips (about 192 MB instead of 384 MB) and removes one full-size allocation. On mobile this is frequently the single biggest win available, and it costs nothing in arithmetic.

Most modern mobile GPUs execute **FP16** at twice the rate of FP32 and, critically, move half as many bytes. For workloads tolerant of reduced precision — image processing, many ML inference kernels, audio — switching storage and arithmetic to 16-bit is often a near-free 2x.

Because this tutorial is Slang-first, here is the half-precision kernel in Slang, where `half` maps directly to a 16-bit float and the compiler emits the 16-bit SPIR-V capabilities for you:

RWStructuredBuffer values;

[numthreads(64, 1, 1)]
void scale(uint3 id : SV_DispatchThreadID)
{
    // Half-precision math: half the bytes moved, less power, often 2x throughput.
    values[id.x] = values[id.x] * half(1.5);
}

The equivalent GLSL makes the required extensions explicit, which is useful to know when reading vendor samples:

#extension GL_EXT_shader_16bit_storage    : require
#extension GL_EXT_shader_explicit_arithmetic_types_float16 : require

layout(set = 0, binding = 0) buffer Data { float16_t values[]; };

void main() {
    uint i = gl_GlobalInvocationID.x;
    values[i] = values[i] * float16_t(1.5);
}

Either way, you must enable `VkPhysicalDeviceShaderFloat16Int8Features::shaderFloat16` and the matching 16-bit storage feature at device creation (see the defensive feature-enabling code in the previous section), and **always** verify the values remain numerically acceptable for your use case. A useful trick is to keep accumulation in FP32 while storing inputs and outputs in FP16 — the same mixed-precision idea from the Cooperative Matrices chapter, applied for bandwidth rather than for tensor units.

The desktop habit of "just use 256 or 1024 invocations" is actively harmful on mobile:

* 
Respect `maxComputeWorkGroupInvocations` (can be 128) and `maxComputeSharedMemorySize` (can be 16 KB), queried in the previous section.

* 
Prefer workgroup sizes that are a multiple of the device’s reported `subgroupSize` so that no lanes are wasted.

* 
Smaller workgroups can improve **occupancy** on the narrow mobile cores and reduce shared-memory pressure. Profile, don’t assume.

A phone cannot sustain its peak GPU clock. After a few seconds of heavy load the governor reduces frequency to stay within the thermal envelope, and your measured throughput drops. Practical strategies:

* 
**Measure sustained, not peak.** Benchmark over tens of seconds, not a single dispatch, to see the throttled steady state.

* 
**Amortize, don’t burst.** For background or periodic work, spreading compute across frames at a lower clock can deliver more total work per joule than a flat-out burst followed by throttling.

* 
**Use `VK_EXT_global_priority` carefully.** Elevated queue priority can starve the rest of the system and worsen the thermal/UX trade-off.

Emulators and desktop GPUs will lie to you about mobile performance. Use vendor tools on the actual hardware:

* 
[**Arm Performance Studio** (formerly Streamline)](https://developer.arm.com/Tools%20and%20Software/Arm%20Performance%20Studio) ([https://developer.arm.com/Tools%20and%20Software/Arm%20Performance%20Studio](https://developer.arm.com/Tools%20and%20Software/Arm%20Performance%20Studio)) — the primary profiling suite for Mali and Immortalis GPUs. It includes **Arm Streamline** for timeline-level CPU/GPU counters, **Mali Offline Compiler** for per-shader register and throughput estimates, and **Mali Texture Compression Tool**. Free download, Windows/Linux/macOS host.

* 
[**Qualcomm Snapdragon Profiler**](https://developer.qualcomm.com/software/snapdragon-profiler) ([https://developer.qualcomm.com/software/snapdragon-profiler](https://developer.qualcomm.com/software/snapdragon-profiler)) — captures GPU counters, memory bandwidth, and a Vulkan command-buffer trace on Adreno devices. Also bundles the **Adreno GPU Profiler** for lower-level shader analysis. Requires a Qualcomm developer account (free).

* 
[**Imagination PVRTune**](https://developer.imaginationtech.com/pvrtune/) ([https://developer.imaginationtech.com/pvrtune/](https://developer.imaginationtech.com/pvrtune/)) — GPU counter capture and timeline viewer for PowerVR/BXT/IMG parts. Pairs with **PVRShaderEditor** (offline shader analysis) and **PowerVR SDK** tools. Free download.

* 
[**Android GPU Inspector (AGI)**](https://gpuinspector.dev/) ([https://gpuinspector.dev/](https://gpuinspector.dev/)) — Google’s open-source, vendor-neutral profiler. Captures a full **frame trace** including all Vulkan API calls, resource lifetimes, and — on supported devices — hardware performance counters. Best starting point when you are unsure which vendor’s tool to reach for first; it works on Mali, Adreno, and other drivers that expose the `VK_LAYER_performance_counters` layer.

These expose the metric that matters most here — external memory **read/write bytes** — alongside ALU utilization and occupancy. A good habit is to compute the **theoretical** minimum traffic for your kernel (input bytes + output bytes), then compare it to the measured external read/write bytes the profiler reports. If you are moving 3–4x the theoretical minimum, you have redundant DRAM traffic to fuse or cache away. This is the mobile equivalent of the Roofline analysis from the Performance Auditing chapter, but with **bytes and joules** on the axes instead of FLOPS.

For `clvk`-based workloads the Vulkan-level capture in AGI is especially useful: because `clvk` translates your OpenCL calls into Vulkan commands, AGI shows you exactly which `vkCmdDispatch` calls were generated and where the barriers and memory traffic landed.

Optimizing mobile compute is about **bandwidth and watts** first, arithmetic second. Fuse passes, keep data on-chip with shared memory and subgroups, drop to FP16 where correctness allows, right-size workgroups to the device’s real limits, and validate sustained performance on hardware with vendor profilers. With those habits, the same kernels you wrote for the desktop become well-behaved citizens of a battery-powered device.

[Previous: Compute on Android](02_android_compute.html) | [Next: Beyond Mobile: Embedded and Headless Compute](04_embedded_beyond_mobile.html)
