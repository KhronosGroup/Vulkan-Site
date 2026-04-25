# Tooling: Crash Handling and GPU Crash Dumps

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Tooling/04_crash_minidump.html

## Table of Contents

- [Crash Handling in Vulkan Applications](#_crash_handling_in_vulkan_applications)
- [Crash_Handling_in_Vulkan_Applications](#_crash_handling_in_vulkan_applications)
- [Understanding Crashes in Vulkan Applications](#_understanding_crashes_in_vulkan_applications)
- [Understanding_Crashes_in_Vulkan_Applications](#_understanding_crashes_in_vulkan_applications)
- [Implementing Basic Crash Handling](#_implementing_basic_crash_handling)
- [Implementing_Basic_Crash_Handling](#_implementing_basic_crash_handling)
- [GPU Crash Diagnostics (Vulkan)](#_gpu_crash_diagnostics_vulkan)
- [GPU_Crash_Diagnostics_(Vulkan)](#_gpu_crash_diagnostics_vulkan)
- [NVIDIA: Nsight Aftermath (Vulkan)](#_nvidia_nsight_aftermath_vulkan)
- [NVIDIA:_Nsight_Aftermath_(Vulkan)](#_nvidia_nsight_aftermath_vulkan)
- [AMD: Radeon GPU Detective (RGD)](#_amd_radeon_gpu_detective_rgd)
- [AMD:_Radeon_GPU_Detective_(RGD)](#_amd_radeon_gpu_detective_rgd)
- [Vendor-agnostic groundwork that helps all tools](#_vendor_agnostic_groundwork_that_helps_all_tools)
- [Vendor-agnostic_groundwork_that_helps_all_tools](#_vendor_agnostic_groundwork_that_helps_all_tools)
- [Generating Minidumps](#_generating_minidumps)
- [Analyzing Minidumps](#_analyzing_minidumps)
- [Windows](#_windows)
- [Linux and macOS](#_linux_and_macos)
- [Linux_and_macOS](#_linux_and_macos)
- [Vulkan-Specific Crash Information](#_vulkan_specific_crash_information)
- [Vulkan-Specific_Crash_Information](#_vulkan_specific_crash_information)
- [Integrating with Telemetry Systems](#_integrating_with_telemetry_systems)
- [Integrating_with_Telemetry_Systems](#_integrating_with_telemetry_systems)
- [Best Practices for Crash Handling (Vulkan/GPU-focused)](#_best_practices_for_crash_handling_vulkangpu_focused)
- [Best_Practices_for_Crash_Handling_(Vulkan/GPU-focused)](#_best_practices_for_crash_handling_vulkangpu_focused)
- [Conclusion](#_conclusion)

## Content

Even with thorough testing and debugging, crashes can still occur in production environments. When they do, having robust crash handling mechanisms can help you diagnose and fix issues quickly. This chapter focuses on practical GPU crash diagnostics (e.g., NVIDIA Nsight Aftermath, AMD Radeon GPU Detective) and clarifies the role and limitations of OS process minidumps, which usually lack GPU state and are rarely sufficient to root-cause graphics/device-lost issues on their own.

Vulkan applications can crash for various reasons:

**API Usage Errors**: Incorrect use of the Vulkan API that validation layers would catch in debug builds

**Driver Bugs**: Issues in the GPU driver that may only manifest with specific hardware or workloads

**Resource Management Issues**: Memory leaks, double frees, or accessing destroyed resources

**Shader Errors**: Runtime errors in shaders that cause the GPU to hang

**System-Level Issues**: Out of memory conditions, system instability, etc.

Let’s explore how to handle these crashes and gather diagnostic information.

First, let’s implement a basic crash handler that can catch unhandled exceptions and segmentation faults:

import std;
import vulkan_raii;

// Global state for crash handling
namespace crash_handler {
    std::string app_name;
    std::string crash_log_path;
    bool initialized = false;

    // Log basic system information
    void log_system_info(std::ofstream& log) {
        log getProperties();
            log 

While OS process minidumps capture CPU-side state, GPU crashes (device lost, TDRs, hangs) require GPU-specific crash dumps to be actionable. In practice, you’ll want to integrate vendor tooling that can record GPU execution state around the fault.

Overview:

* 
Collects GPU crash dumps with information about the last executed draw/dispatch, bound pipeline/shaders, markers, and resource identifiers.

* 
Works alongside your Vulkan app; you analyze dumps with NVIDIA tools to pinpoint the failing work and shader.

Practical steps:

Enable object names and labels

* 
Use VK_EXT_debug_utils to name pipelines, shaders, images, buffers, and to insert command buffer labels for major passes and draw/dispatch groups. These names surface in crash reports and greatly aid triage.

Add frame/work markers

* 
Insert meaningful labels before/after critical rendering phases. If available on your target, also use vendor checkpoint/marker extensions (e.g., VK_NV_device_diagnostic_checkpoints) to provide fine-grained breadcrumbs.

Build shaders with unique IDs and optional debug info

* 
Ensure each pipeline/shader can be correlated (e.g., include a stable hash/UUID in your pipeline cache and application logs). Keep the mapping from IDs to source for analysis.

Initialize and enable GPU crash dumps

* 
Integrate the Nsight Aftermath Vulkan SDK per NVIDIA’s documentation. Register a callback to receive crash dump data, write it to disk, and include your marker string table for symbolication.

Handle device loss

* 
On VK_ERROR_DEVICE_LOST (or Windows TDR), flush any in-memory marker logs, persist the crash dump, and then terminate cleanly. Attempting to continue rendering is undefined.

References: NVIDIA Nsight Aftermath SDK and documentation.

* 
AMD provides tools to capture and analyze GPU crash information on RDNA hardware. Similar principles apply: enable object names, label command buffers, and preserve pipeline/shader identifiers so RGD can point back to your content.

* 
See AMD Radeon GPU Detective and related documentation for Vulkan integration and analysis workflows.

* 
Name everything via VK_EXT_debug_utils.

* 
Insert command buffer labels at meaningful boundaries (frame, pass, material batch, etc.).

* 
Persist build/version, driver, Vulkan API/UUID, and pipeline cache UUID in your logs and crash artifacts.

* 
Implement robust device lost handling: stop submitting, free/teardown safely, write artifacts, exit.

Use OS process minidumps to capture CPU-side call stacks, threads, and memory snapshots at the time of a crash. For graphics issues and device loss, they rarely contain the GPU execution state you need—treat minidumps as a complement to GPU crash dumps, not a replacement.

Below is a brief outline for generating minidumps with platform APIs (useful for correlating CPU context with a GPU crash):

import std;
import vulkan_raii;

namespace crash_handler {
    std::string app_name;
    std::string dump_path;
    bool initialized = false;

    #if defined(_WIN32)
    // Windows implementation using Windows Error Reporting (WER)
    LONG WINAPI windows_exception_handler(EXCEPTION_POINTERS* exception_pointers) {
        // Create a unique filename for the minidump
        std::string filename = dump_path + "\\" + app_name + "_" +
            std::to_string(std::chrono::system_clock::now().time_since_epoch().count()) + ".dmp";

        // Create the minidump file
        HANDLE file = CreateFileA(
            filename.c_str(),
            GENERIC_WRITE,
            0,
            nullptr,
            CREATE_ALWAYS,
            FILE_ATTRIBUTE_NORMAL,
            nullptr
        );

        if (file != INVALID_HANDLE_VALUE) {
            // Initialize minidump info
            MINIDUMP_EXCEPTION_INFORMATION exception_info;
            exception_info.ThreadId = GetCurrentThreadId();
            exception_info.ExceptionPointers = exception_pointers;
            exception_info.ClientPointers = FALSE;

            // Write the minidump
            MiniDumpWriteDump(
                GetCurrentProcess(),
                GetCurrentProcessId(),
                file,
                MiniDumpWithFullMemory,  // Dump type
                &exception_info,
                nullptr,
                nullptr
            );

            CloseHandle(file);

            std::cerr 

Minidumps are best used to understand CPU-side state around a crash (e.g., which thread faulted, call stacks leading to vkQueueSubmit/vkQueuePresent, allocator misuse) and to correlate with a GPU crash dump from vendor tools. Here’s a brief workflow on different platforms:

On Windows, you can use Visual Studio or WinDbg to analyze minidumps:

**Visual Studio**:

* 
Open Visual Studio

* 
Go to File > Open > File and select the .dmp file

* 
Visual Studio will load the minidump and show the call stack at the time of the crash

**WinDbg**:

* 
Open WinDbg

* 
Open the minidump file

* 
Use commands like `.ecxr` to examine the exception context record

* 
Use `k` to view the call stack

On Linux and macOS, you can use tools like GDB or LLDB to analyze minidumps generated by Google Breakpad:

**Using minidump_stackwalk** (part of Google Breakpad):
``
minidump_stackwalk minidump_file.dmp /path/to/symbols > stacktrace.txt
``

**Using GDB**:
``
gdb /path/to/executable
(gdb) core-file /path/to/minidump
(gdb) bt
``

For Vulkan applications, it’s helpful to include additional information in your crash reports:

void log_vulkan_detailed_info(std::ofstream& log, vk::raii::PhysicalDevice& physical_device,
                             vk::raii::Device& device) {
    // Log physical device properties
    auto properties = physical_device.getProperties();
    log 

For production applications, you might want to automatically upload crash reports to a telemetry system for analysis:

import std;
import vulkan_raii;
#include 

namespace crash_handler {
    // ... existing code ...

    std::string telemetry_url;
    bool telemetry_enabled = false;

    // Upload a minidump to the telemetry server
    bool upload_minidump(const std::string& minidump_path) {
        if (!telemetry_enabled || telemetry_url.empty()) {
            return false;
        }

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr 

To make crash data actionable for graphics issues, prefer these concrete steps:

Name and label aggressively

* 
Use VK_EXT_debug_utils to name all objects and insert command buffer labels at pass/material boundaries and before large draw/dispatch batches. Persist a small in-memory ring buffer of recent labels for inclusion in crash artifacts.

Prepare for device loss

* 
Implement a central handler for VK_ERROR_DEVICE_LOST. Stop submitting work, flush logs/markers, request vendor GPU crash dump data, and exit. Avoid attempting recovery in the same process unless you have a robust reinitialization path.

Capture GPU crash dumps on supported hardware

* 
Integrate NVIDIA Nsight Aftermath and/or AMD RGD depending on your target audience. Ship with crash dumps enabled in development/beta builds; provide a toggle for users.

Make builds symbol-friendly

* 
Keep a mapping from pipeline/shader hashes to source/IR/SPIR-V and build IDs. Enable shader debug info where feasible for diagnosis builds.

Record environment info

* 
Log driver version, Vulkan version, GPU name/PCI ID, pipeline cache UUID, app build/version, and relevant feature toggles. Include this alongside minidumps and GPU crash dumps.

Reproduce deterministically

* 
Provide a way to disable background variability (e.g., async streaming) and to replay a captured sequence of commands/scenes to reproduce the crash locally.

Respect privacy and distribution concerns

* 
Clearly document what crash data is collected (minidumps, GPU crash dumps, logs) and require opt‑in for uploads. Strip user-identifiable data.

Robust crash handling is essential for maintaining a high-quality Vulkan application. Combine vendor GPU crash dumps (Aftermath, RGD, etc.) with CPU-side minidumps and thorough logging to quickly diagnose and fix issues in production. Treat minidumps as complementary context; the actionable details for graphics faults typically come from GPU crash dump tooling.

In the next section, we’ll explore Vulkan extensions for robustness, which can reduce undefined behavior and help prevent crashes in the first place.

[Previous: Debugging with VK_KHR_debug_utils and RenderDoc](03_debugging_and_renderdoc.html) | [Next: Vulkan Extensions for Robustness](05_extensions.html)
