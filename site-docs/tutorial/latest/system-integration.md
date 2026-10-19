# System Integration

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/02_OpenXR_Vulkan_Handshake/02_system_integration.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Architectural Boundary: Why a Handshake?](#_the_architectural_boundary_why_a_handshake)
- [The_Architectural_Boundary:_Why_a_Handshake?](#_the_architectural_boundary_why_a_handshake)
- [Querying XR Graphics Requirements](#_querying_xr_graphics_requirements)
- [Querying_XR_Graphics_Requirements](#_querying_xr_graphics_requirements)
- [Coordinated Engine Initialization](#_coordinated_engine_initialization)
- [Coordinated_Engine_Initialization](#_coordinated_engine_initialization)
- [Zero-Copy Efficiency: Advanced Vulkan Advantages](#_zero_copy_efficiency_advanced_vulkan_advantages)
- [Zero-Copy_Efficiency:_Advanced_Vulkan_Advantages](#_zero_copy_efficiency_advanced_vulkan_advantages)

## Content

In a standard desktop application, our engine is typically responsible for creating a `VkInstance` and selecting a `VkPhysicalDevice` based on its own internal logic. When we move to OpenXR, we are no longer the sole decision-maker. We must first negotiate with the XR runtime to ensure our graphics context is compatible with the headset’s compositor.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Connecting your Vulkan engine to an XR runtime is a mandatory process defined by the OpenXR specification. You must perform this coordinated handshake to ensure that your application and the runtime can share resources efficiently and safely.

The bridge between OpenXR and Vulkan is the extension **XR_KHR_vulkan_enable2**. This extension provides the mechanism for OpenXR to specify exactly which instance and device extensions are required, as well as any specific feature flags that must be enabled for the spatial pipeline to function.

To understand why this negotiation is necessary, we must look at what the **OpenXR Runtime** (like SteamVR, Meta Link, or Monado) is doing behind the scenes. Unlike a standard windowing system, an XR runtime often operates as a separate, high-priority system service or process.

* 
**Process Isolation**: The runtime manages the physical hardware (cameras, IMUs, and displays) and performs critical tasks like **Asynchronous Reprojection**—warping the final image if our engine misses its frame deadline.

* 
**VRAM Sharing**: Because the runtime and our engine are separate processes, they must share access to the GPU’s memory. This is a "Zero-Copy" handoff where we both see the same physical memory addresses.

* 
**Validation**: When you call `xrCreateSession`, the runtime validates that the `VkInstance` and `VkDevice` you provided were created with the extensions it requested.

The handshake is our way of telling the OS and the XR runtime: "We are both speaking the same dialect of Vulkan, using the same extensions, and looking at the same physical silicon."

Before we can create our Vulkan instance, we must initialize our OpenXR instance and query the graphics requirements for the specific system (the headset) we are targeting using `xrGetVulkanGraphicsRequirements2KHR`.

This call populates an `XrGraphicsRequirementsVulkanKHR` structure, which contains two critical pieces of information:

**minApiVersionSupported**: The minimum Vulkan version the runtime supports.

**maxApiVersionSupported**: The maximum Vulkan version the runtime has been tested with.

Since we are targeting Vulkan 1.3, we must verify that our chosen version falls within this range. Most modern runtimes are rapidly updating to support the latest specifications, ensuring we have access to the advanced synchronization tools we need.

Our engine’s initialization logic needs to be modified to accept these external requirements. Instead of hardcoding a static list of instance extensions, we perform a coordinated handshake:

**Query OpenXR**: Ask the runtime for its mandatory instance extensions using `xrGetVulkanInstanceExtensionsKHR`.

**Merge and Initialize**: Combine these OpenXR requirements with our engine’s own mandatory extensions (such as `VK_EXT_debug_utils`) and create the instance.

// Example of merging requirements in our Engine's initialization using designated initializers
std::vector instanceExtensions = engineDefaults.getInstanceExtensions();

// 1. Query the length of the extension string
uint32_t xrExtensionCount = 0;
xrGetVulkanInstanceExtensionsKHR(xrInstance, systemId, 0, &xrExtensionCount, nullptr);

// 2. Retrieve the space-separated string
std::string xrExtensionString(xrExtensionCount, '\0');
xrGetVulkanInstanceExtensionsKHR(xrInstance, systemId, xrExtensionCount, &xrExtensionCount, xrExtensionString.data());

// 3. Parse the string into individual extension names
std::stringstream ss(xrExtensionString);
std::string extension;
while (ss >> extension) {
    if (std::find(instanceExtensions.begin(), instanceExtensions.end(), extension) == instanceExtensions.end()) {
        instanceExtensions.push_back(strdup(extension.c_str()));
    }
}

vk::ApplicationInfo applicationInfo{
    .pApplicationName = "SpatialEngine",
    .applicationVersion = 1,
    .pEngineName = "VulkanSpatial",
    .engineVersion = 1,
    .apiVersion = VK_API_VERSION_1_3
};

vk::InstanceCreateInfo createInfo{
    .pApplicationInfo = &applicationInfo,
    .enabledLayerCount = static_cast(layers.size()),
    .ppEnabledLayerNames = layers.data(),
    .enabledExtensionCount = static_cast(instanceExtensions.size()),
    .ppEnabledExtensionNames = instanceExtensions.data()
};

vk::raii::Instance instance(context, createInfo);

|  | **The String Parsing Pitfall**: `xrGetVulkanInstanceExtensionsKHR` returns the required extensions as a single, space-separated string (e.g., `"VK_KHR_external_memory_capabilities VK_KHR_get_physical_device_properties2"`). You must manually parse this string and split it into individual `const char*` entries before passing them to `vk::InstanceCreateInfo`. |
| --- | --- |

The ultimate goal of this handshake is **Zero-Copy Efficiency**. If we selected a GPU that the XR runtime couldn’t talk to, the operating system would be forced to copy our final rendered frames through system memory to reach the headset’s display. This would destroy our frame budget and introduce "judder"—the visual stuttering that causes motion sickness in XR.

While the runtime provides mandatory extensions for the graphics handshake, Vulkan allows us to go further:

* 
**Enabling Custom Profiling Extensions**: The handshake doesn’t automatically enable engine-specific tools like `VK_EXT_calibrated_timestamps`. Vulkan allows you to merge these custom requirements into the XR-driven initialization, providing deep performance insights that the OpenXR standard does not natively expose.

* 
**Intercepting API Calls for Debugging**: By using Vulkan’s layer system, you can intercept the internal commands the runtime sends to your GPU, allowing you to debug synchronization issues or resource leaks that occur within the OpenXR-Vulkan bridge.

|  | For more details, consult the official [XR_KHR_vulkan_enable2 Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#XR_KHR_vulkan_enable2), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_hardware_alignment_luid.html)
