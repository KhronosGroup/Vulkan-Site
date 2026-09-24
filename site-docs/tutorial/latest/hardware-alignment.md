# Hardware Alignment

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/02_OpenXR_Vulkan_Handshake/03_hardware_alignment_luid.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The "PCIe Tax": Why Alignment is Mandatory](#_the_pcie_tax_why_alignment_is_mandatory)
- [The_"PCIe_Tax":_Why_Alignment_is_Mandatory](#_the_pcie_tax_why_alignment_is_mandatory)
- [Querying the XR Device](#_querying_the_xr_device)
- [Querying_the_XR_Device](#_querying_the_xr_device)
- [Using the Handle Directly](#_using_the_handle_directly)
- [Using_the_Handle_Directly](#_using_the_handle_directly)
- [Cross-Process Memory Visibility](#_cross_process_memory_visibility)
- [Cross-Process_Memory_Visibility](#_cross_process_memory_visibility)
- [Advanced: Multi-GPU Load Balancing and Device Groups](#_advanced_multi_gpu_load_balancing_and_device_groups)
- [Advanced:_Multi-GPU_Load_Balancing_and_Device_Groups](#_advanced_multi_gpu_load_balancing_and_device_groups)

## Content

In many modern computing environments, especially high-end gaming desktops, it is common to have multiple GPUs—such as an integrated GPU on the processor and a dedicated high-performance card. For spatial computing, it is absolutely critical that both our application and the OpenXR runtime are using the exact same physical hardware.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Aligning your Vulkan physical device with the XR runtime’s preferred hardware is a mandatory step to ensure high-performance resource sharing. Critically, this is not a negotiation: the OpenXR runtime **enforces** which GPU you must use, and it hands you that exact device directly. There is no matching or searching to do.

To understand why we care about hardware alignment, we must consider the cost of data movement. The PCIe bus is the highway between your CPU, system RAM, and your GPUs. While it is very fast, it is still orders of magnitude slower than the internal memory bus of a modern GPU (VRAM).

* 
**Display Discovery**: The runtime has negotiated with the operating system (e.g., via DXGI on Windows) to identify which physical GPU is electrically connected to the headset’s display.

* 
**Avoiding Cross-GPU Copies**: If our engine renders a frame on GPU A, but the headset is connected to GPU B, the OS would be forced to copy that image across the **PCIe** bus. This adds several milliseconds of latency—potentially half of your frame budget for a 90Hz headset.

* 
**Internal VRAM Efficiency**: Moving an image within the same GPU is almost instantaneous. By pinning the application to the same GPU, the runtime ensures your frames stay within high-speed VRAM at all times.

Because getting this wrong silently costs performance (or breaks resource sharing outright), OpenXR does not leave device selection up to the application at all—it tells you exactly which `VkPhysicalDevice` to use.

Once we have initialized our `xr::Instance`, we can query the specific `VkPhysicalDevice` that the runtime requires us to use. We do this by calling `xrGetVulkanGraphicsDevice2KHR` (or the older `xrGetVulkanGraphicsDeviceKHR`).

VkPhysicalDevice xrRequiredDevice;

XrVulkanGraphicsDeviceGetInfoKHR getInfo{XR_TYPE_VULKAN_GRAPHICS_DEVICE_GET_INFO_KHR};
getInfo.systemId = systemId;
getInfo.vulkanInstance = instance;

xrGetVulkanGraphicsDevice2KHR(xrInstance, &getInfo, &xrRequiredDevice);

This handle is the answer. The runtime has already resolved display topology, driver adapter enumeration, and cross-process sharing requirements on your behalf—that is precisely what this call is for. Your job is simply to use `xrRequiredDevice` as your `VkPhysicalDevice`, not to re-derive it by some other means.

In the `vulkan-hpp` RAII world, you don’t need to enumerate physical devices at all in XR mode—you already have the handle the runtime requires. Wrap it directly:

// The runtime enforces this choice; we don't search for it, we're told it.
vk::PhysicalDevice requiredDevice(xrRequiredDevice);

If you still want a `vk::raii::PhysicalDevice` (for example, to reuse suitability-checking code that expects one), find the matching entry by comparing the raw handle—not any derived identifier:

for (auto& physicalDevice : instance.enumeratePhysicalDevices()) {
    if (*physicalDevice == requiredDevice) {
        return physicalDevice;
    }
}

This is a simple handle comparison, not a hardware "fingerprint" match—the runtime already told us which device this is.

Using the runtime-provided device is the foundation of **Cross-Process Memory Visibility**. Because the XR runtime usually lives in a separate process from our engine, the images we render must be shared across process boundaries.

By using the exact `VkPhysicalDevice` the runtime requires, we guarantee that the "Wait-Acquire-Release" cycle can happen entirely on-device, without expensive CPU-side synchronization or system memory copies.

While an OpenXR session is typically tied to the single GPU connected to the display, Vulkan allows us to go further:

* 
**Vulkan Device Groups**: You can use `VK_KHR_device_group` to treat multiple GPUs as a single logical device. This allows you to use a secondary GPU for heavy compute tasks (like physics or scene decomposition) and aggregate the results on the primary GPU before handing the final frame to the XR compositor.

* 
**Handling Hardware Changes**: If the hardware configuration changes (e.g., an external GPU is disconnected), you can use Vulkan’s hardware abstraction to detect these changes and prompt the user for a clean engine restart. On restart, simply re-query `xrGetVulkanGraphicsDevice2KHR`—the runtime will hand you whatever device is now correct.

|  | For more information on hardware alignment, check out the official [OpenXR Specification on xrGetVulkanGraphicsDevice2KHR](https://registry.khronos.org/OpenXR/specs/1.1/html/xrspec.html#xrGetVulkanGraphicsDevice2KHR), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_system_integration.html) | [Next](04_vulkan_1_3_feature_requirements.html)
