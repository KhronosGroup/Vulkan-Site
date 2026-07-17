# Mobile Development: Platform Considerations

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Mobile_Development/02_platform_considerations.html

## Table of Contents

- [Platform Considerations for Android and iOS](#_platform_considerations_for_android_and_ios)
- [Platform_Considerations_for_Android_and_iOS](#_platform_considerations_for_android_and_ios)
- [Android Platform Considerations](#_android_platform_considerations)
- [Android_Platform_Considerations](#_android_platform_considerations)
- [Setting Up Vulkan on Android](#_setting_up_vulkan_on_android)
- [Setting_Up_Vulkan_on_Android](#_setting_up_vulkan_on_android)
- [Android Lifecycle Management](#_android_lifecycle_management)
- [Android_Lifecycle_Management](#_android_lifecycle_management)
- [Android Input Handling](#_android_input_handling)
- [Android_Input_Handling](#_android_input_handling)
- [Vendor-Specific Considerations](#_vendor_specific_considerations)
- [iOS Platform Considerations](#_ios_platform_considerations)
- [iOS_Platform_Considerations](#_ios_platform_considerations)
- [Setting Up MoltenVK on iOS](#_setting_up_moltenvk_on_ios)
- [Setting_Up_MoltenVK_on_iOS](#_setting_up_moltenvk_on_ios)
- [iOS Lifecycle Management](#_ios_lifecycle_management)
- [iOS_Lifecycle_Management](#_ios_lifecycle_management)
- [iOS Input Handling](#_ios_input_handling)
- [iOS_Input_Handling](#_ios_input_handling)
- [Cross-Platform Considerations](#_cross_platform_considerations)
- [Best Practices for Mobile Platform Integration](#_best_practices_for_mobile_platform_integration)
- [Best_Practices_for_Mobile_Platform_Integration](#_best_practices_for_mobile_platform_integration)

## Content

Developing Vulkan applications for mobile platforms requires understanding the specific requirements and constraints of Android and iOS. In this section, we’ll explore the key considerations for each platform and how to adapt your engine accordingly.

Android has supported Vulkan since version 7.0 (Nougat), but the level of support varies across devices. Here are the key considerations for Android development:

To use Vulkan on Android, you need to:

* 
**Declare Vulkan Support**: In your AndroidManifest.xml, declare that your
application uses Vulkan:

    
    
    
    
    

* 
**Initialize Vulkan**: Use the Android Native Development Kit (NDK) to
initialize Vulkan. The process is similar to desktop Vulkan, but you’ll need
 to obtain the native window handle from Android:

// Get the native window handle from Android
ANativeWindow* native_window = ANativeWindow_fromSurface(env, surface);

// Create the Vulkan surface
VkAndroidSurfaceCreateInfoKHR create_info{};
create_info.sType = VK_STRUCTURE_TYPE_ANDROID_SURFACE_CREATE_INFO_KHR;
create_info.window = native_window;

VkSurfaceKHR vulkan_surface;
vkCreateAndroidSurfaceKHR(instance, &create_info, nullptr, &vulkan_surface);

Android applications have a complex lifecycle that you need to handle properly:

**Activity Pausing and Resuming**: When your application is paused (e.g., when the user switches to another app), you should release Vulkan resources and recreate them when the application resumes.

**Surface Changes**: The surface can change due to configuration changes (e.g., rotation). You need to handle these changes by recreating the swapchain.

**Memory Pressure**: Android can reclaim memory from your application at any time. Design your engine to handle memory pressure gracefully.

Android input handling differs from desktop:

**Touch Input**: Instead of mouse input, you’ll need to handle touch events, including multi-touch gestures.

**Sensors**: Android devices have various sensors (accelerometer, gyroscope, etc.) that you can use for input.

Different Android device manufacturers may have specific considerations:

**Custom Android Versions**: Many manufacturers use customized versions of Android. Test your application on various devices to ensure compatibility.

**GPU Architectures**: Different vendors use different GPU architectures (Adreno, Mali, PowerVR, etc.). Each has unique performance characteristics.

**Alternative App Stores**: Some devices may not have Google Play Services. Consider distributing through alternative app stores when necessary.

**SoC Variations**: System-on-Chip variations affect performance. Most mobile GPUs are tile-based renderers, so optimize your rendering pipeline accordingly using the techniques described in the TBR section.

// Example of checking for specific device vendors
bool check_device_vendor(vk::PhysicalDevice physical_device, uint32_t vendor_id) {
    vk::PhysicalDeviceProperties props = physical_device.getProperties();
    return props.vendorID == vendor_id;
}

// Common vendor IDs
const uint32_t VENDOR_ID_QUALCOMM = 0x5143; // Adreno
const uint32_t VENDOR_ID_ARM = 0x13B5;      // Mali
const uint32_t VENDOR_ID_IMAGINATION = 0x1010; // PowerVR
const uint32_t VENDOR_ID_HUAWEI = 0x19E5;   // Kirin

// You can then apply vendor-specific optimizations if needed
void configure_for_device(vk::PhysicalDevice physical_device) {
    if (check_device_vendor(physical_device, VENDOR_ID_HUAWEI)) {
        // Apply Huawei-specific optimizations if needed
    }
    // Handle other vendors as needed
}

iOS supports Vulkan through MoltenVK, a translation layer that maps Vulkan to Metal. Here are the key considerations for iOS development:

To use Vulkan on iOS, you need to:

* 
**Include MoltenVK**: Add the MoltenVK framework to your Xcode project.

* 
**Initialize MoltenVK**: Initialize MoltenVK before creating your Vulkan
instance:

// Initialize MoltenVK
MVKConfiguration config{};
vkGetMoltenVKConfigurationMVK(nullptr, &config);
config.debugMode = true;  // Enable debug mode during development
vkSetMoltenVKConfigurationMVK(nullptr, &config);

// Create Vulkan instance as usual
// ...

* 
**Create a Metal-Compatible Surface**: Create a Vulkan surface from a
CAMetalLayer:

// Get the Metal layer from your UIView
CAMetalLayer* metal_layer = (CAMetalLayer*)layer;

// Create the Vulkan surface
VkMetalSurfaceCreateInfoEXT create_info{};
create_info.sType = VK_STRUCTURE_TYPE_METAL_SURFACE_CREATE_INFO_EXT;
create_info.pLayer = metal_layer;

VkSurfaceKHR vulkan_surface;
vkCreateMetalSurfaceEXT(instance, &create_info, nullptr, &vulkan_surface);

iOS applications also have a lifecycle that you need to handle:

**Application State Changes**: Handle applicationWillResignActive, applicationDidBecomeActive, etc., by releasing and recreating Vulkan resources as needed.

**Memory Warnings**: iOS can send memory warnings when the system is low on memory. Handle these by releasing non-essential resources.

iOS input handling is similar to Android but with some differences:

**Touch Input**: iOS has its own touch event system that you’ll need to integrate with your engine.

**Sensors**: iOS devices also have various sensors that you can use for input.

To maintain a single codebase for both Android and iOS (and potentially desktop), consider:

* 
**Abstraction Layers**: Create platform-specific abstraction layers for
window creation, input handling, and other platform-specific functionality.

* 
**Conditional Compilation**: Use preprocessor directives to handle
platform-specific code:

#ifdef __ANDROID__
    // Android-specific code
#elif defined(__APPLE__)
    // iOS-specific code
#else
    // Desktop-specific code
#endif

* 
**Feature Detection**: Use Vulkan’s feature detection mechanisms to adapt to
the capabilities of the device, rather than making assumptions based on the platform.

**Test on Real Devices**: Emulators and simulators may not accurately represent the performance and behavior of real devices.

**Handle Different Screen Sizes and Aspect Ratios**: Mobile devices come in various sizes and aspect ratios. Design your UI and rendering to adapt accordingly.

**Consider Battery Life**: Mobile users are sensitive to battery drain. Optimize your engine to minimize power consumption.

**Respect Platform Guidelines**: Follow the design and user experience guidelines for each platform to ensure your application feels native.

In the next section, we’ll explore performance optimizations specifically tailored for mobile hardware, focusing on texture formats and memory usage.

[Previous: Introduction](01_introduction.html) | [Next: Performance Optimizations for Mobile](03_performance_optimizations.html)
