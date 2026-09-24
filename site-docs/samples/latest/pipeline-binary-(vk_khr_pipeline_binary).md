# Pipeline binary (VK_KHR_pipeline_binary)

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/pipeline_binary/README.html

## Table of Contents

- [Overview](#_overview)
- [Why and when to use it](#_why_and_when_to_use_it)
- [Why_and_when_to_use_it](#_why_and_when_to_use_it)
- [How it works (TL;DR)](#_how_it_works_tldr)
- [How_it_works_(TL;DR)](#_how_it_works_tldr)
- [Required Vulkan extensions and features](#_required_vulkan_extensions_and_features)
- [Required_Vulkan_extensions_and_features](#_required_vulkan_extensions_and_features)
- [Interactive UI Features](#_interactive_ui_features)
- [Interactive_UI_Features](#_interactive_ui_features)
- [Pipeline Binary Info](#_pipeline_binary_info)
- [Pipeline_Binary_Info](#_pipeline_binary_info)
- [Interactive Demo](#_interactive_demo)
- [Performance Statistics](#_performance_statistics)
- [Walkthrough of the code](#_walkthrough_of_the_code)
- [Walkthrough_of_the_code](#_walkthrough_of_the_code)
- [Best practices and caveats](#_best_practices_and_caveats)
- [Best_practices_and_caveats](#_best_practices_and_caveats)
- [References](#_references)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/pipeline_binary). |
| --- | --- |

VK_KHR_pipeline_binary lets you explicitly capture and reuse driver-produced pipeline binaries. Instead of relying only on opaque pipeline caches, you **can**

* 
Compute a portable pipeline key up front for a given set of creation parameters.

* 
Ask the driver to give you an implementation-specific binary for that key.

* 
Persist that binary and reuse it on the same driver/device to avoid runtime compilation hitches.

This sample provides an interactive demonstration of the complete pipeline binary workflow. It creates a compute pipeline, captures its binary, and allows you to:

* 
Recreate pipelines from scratch or from cached binaries with performance timing

* 
Save binaries to disk and load them back

* 
Compare creation times to see the performance benefits

* 
Observe the speedup gained from using pre-compiled binaries

Pipeline caches are useful, but they are intentionally opaque and not keyed by a structure you can compute deterministically. Pipeline binaries add:

* 
Deterministic cache management (you can compute the key before creating a pipeline).

* 
Cross-process or install-time pre-warming strategies.

* 
A clear, explicit handle (VkPipelineBinaryKHR) you can store and manage.

They complement other techniques:

* 
VK_EXT_graphics_pipeline_library reduces link-time work, but doesn’t hand you the final binary for persistence.

* 
VK_EXT_shader_object changes the binding model, not binary persistence.

Prepare the same creation info you’d pass to vkCreate*Pipelines (compute or graphics).

Wrap it in VkPipelineCreateInfoKHR.

vkGetPipelineKeyKHR(device, &VkPipelineCreateInfoKHR, &VkPipelineBinaryKeyKHR) → portable key.

vkCreatePipelineBinariesKHR(device, &VkPipelineBinaryCreateInfoKHR, …) → VkPipelineBinaryKHR handle.

vkGetPipelineBinaryDataKHR(device, &VkPipelineBinaryDataInfoKHR, …) → query size, then fetch bytes.

Store bytes together with device/vendor/driver identifiers and the key.

To use feature chaining like the other samples, this sample enables the following and requests the needed feature explicitly:

* 
Instance: `VK_KHR_get_physical_device_properties2` — required by the framework to chain extension feature structs during device creation.

* 
Device: `VK_KHR_pipeline_binary` — the extension demonstrated here.

* 
Device: `VK_KHR_maintenance5` — defines the `VkPipelineCreateFlags2` flag space that includes CAPTURE_DATA (not required for this sample’s path, but commonly expected by validation).

* 
Device: `VK_KHR_dynamic_rendering`, `VK_KHR_depth_stencil_resolve`, `VK_KHR_create_renderpass2` — commonly used by the framework/WSI paths; enabled to avoid spurious present-time validation issues.

Note: This sample uses the `pPipelineCreateInfo` path when creating pipeline binaries, so it does not require creating a live pipeline with `CAPTURE_DATA` set.

The sample provides an interactive GUI with three main sections:

Displays initial information about pipeline binary support, properties, and the captured binary details including key size and binary signature.

Provides buttons to interact with the pipeline binary system:

* 
**Recreate Pipeline (from scratch)**: Destroys and recreates the pipeline using normal creation, measuring the time taken.

* 
**Recreate Pipeline (from binary)**: Recreates the pipeline using the cached binary data, demonstrating faster creation.

* 
**Save Binary to File**: Persists the binary and its key to disk (`pipeline_binary.bin`).

* 
**Load Binary from File**: Loads a previously saved binary from disk, enabling cross-session reuse.

Shows timing measurements and performance comparisons:

* 
Creation time from scratch (in milliseconds)

* 
Creation time from binary (in milliseconds)

* 
Speedup factor (how much faster binary creation is)

* 
Total recreation counts for each method

* 
Binary size and key size information

* 
log_pipeline_binary_support() uses vkGetPhysicalDeviceFeatures2/properties2 to show what the driver supports and prefers regarding internal caches and compression.

* 
demo_pipeline_key_and_binary():

Reuses the cached compute pipeline creation info and wraps it in VkPipelineCreateInfoKHR.

* 
Calls vkGetPipelineKeyKHR to compute the key.

* 
Calls vkCreatePipelineBinariesKHR with pPipelineCreateInfo set (and pipeline/pKeysAndDataInfo null) to get a VkPipelineBinaryKHR.

* 
Calls vkGetPipelineBinaryDataKHR twice to first query size, then fetch bytes (requires a valid VkPipelineBinaryKeyKHR pointer on both calls).

* 
Stores the binary data and key in member variables for later reuse.

recreate_pipeline_from_scratch(): Destroys and recreates the pipeline normally, measuring creation time with high-resolution timing.

recreate_pipeline_from_binary(): Creates a pipeline from the cached binary data using VkPipelineBinaryKeysAndDataKHR, demonstrating the reuse path and measuring performance.

save_binary_to_file() / load_binary_from_file(): Demonstrate persistence by writing/reading the key and binary data to/from disk.

on_update_ui_overlay(): Provides the interactive GUI with buttons and real-time statistics display.

* 
Treat captured binaries as opaque and device/driver-specific; don’t assume portability across vendors or driver revisions.

* 
Record identity metadata (vendor ID, device ID, driver version, pipeline key) so you can invalidate stale entries.

* 
Some drivers may prefer or enforce internal caches; honor properties like pipelineBinaryPrefersInternalCache.

* 
Not all implementations will return data; some may return zero bytes. Handle that gracefully.

* 
Any change in creation parameters changes the key and the resulting binary.

* 
VK_KHR_pipeline_binary specification: [pipeline binaries](#https://docs.vulkan.org/spec/latest/chapters/pipelines.html#pipelines-binaries)

* 
Related samples: [graphics_pipeline_library](#../graphics_pipeline_library/README.adoc), [pipeline_cache](#../pipeline_cache/README.adoc)

* 
Khronos Blog: [Bringing explicit pipeline caching control](#https://www.khronos.org/blog/bringing-explicit-pipeline-caching-control-to-vulkan)  ← this blog includes graphs and explanation which could help with understanding how this works.
