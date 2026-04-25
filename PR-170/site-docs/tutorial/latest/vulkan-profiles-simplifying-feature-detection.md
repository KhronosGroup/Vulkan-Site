# Vulkan Profiles: Simplifying Feature Detection

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/13_Vulkan_Profiles.html

## Table of Contents

- [Introduction](#_introduction)
- [Understanding Vulkan Profiles](#_understanding_vulkan_profiles)
- [Understanding_Vulkan_Profiles](#_understanding_vulkan_profiles)
- [What Are Vulkan Profiles?](#_what_are_vulkan_profiles)
- [What_Are_Vulkan_Profiles?](#_what_are_vulkan_profiles)
- [Types of Vulkan Profiles](#_types_of_vulkan_profiles)
- [Types_of_Vulkan_Profiles](#_types_of_vulkan_profiles)
- [How Profiles Simplify Your Code](#_how_profiles_simplify_your_code)
- [How_Profiles_Simplify_Your_Code](#_how_profiles_simplify_your_code)
- [Eliminating Manual Feature Detection](#_eliminating_manual_feature_detection)
- [Eliminating_Manual_Feature_Detection](#_eliminating_manual_feature_detection)
- [Benefits of Using Profiles](#_benefits_of_using_profiles)
- [Benefits_of_Using_Profiles](#_benefits_of_using_profiles)
- [Implementing Profiles in Your Application](#_implementing_profiles_in_your_application)
- [Implementing_Profiles_in_Your_Application](#_implementing_profiles_in_your_application)
- [Adding the Vulkan Profiles Library](#_adding_the_vulkan_profiles_library)
- [Adding_the_Vulkan_Profiles_Library](#_adding_the_vulkan_profiles_library)
- [Defining the Profile Requirements](#_defining_the_profile_requirements)
- [Defining_the_Profile_Requirements](#_defining_the_profile_requirements)
- [Creating a Device with the Profile](#_creating_a_device_with_the_profile)
- [Creating_a_Device_with_the_Profile](#_creating_a_device_with_the_profile)
- [Using Profile-Specific Features](#_using_profile_specific_features)
- [Using_Profile-Specific_Features](#_using_profile_specific_features)
- [Error Handling with Profiles](#_error_handling_with_profiles)
- [Error_Handling_with_Profiles](#_error_handling_with_profiles)
- [Comparing Manual Feature Detection vs. Profiles](#_comparing_manual_feature_detection_vs_profiles)
- [Comparing_Manual_Feature_Detection_vs._Profiles](#_comparing_manual_feature_detection_vs_profiles)
- [Manual Feature Detection (Previous Chapter)](#_manual_feature_detection_previous_chapter)
- [Manual_Feature_Detection_(Previous_Chapter)](#_manual_feature_detection_previous_chapter)
- [Using Profiles (This Chapter)](#_using_profiles_this_chapter)
- [Using_Profiles_(This_Chapter)](#_using_profiles_this_chapter)
- [Best Practices for Using Profiles](#_best_practices_for_using_profiles)
- [Best_Practices_for_Using_Profiles](#_best_practices_for_using_profiles)
- [Conclusion](#_conclusion)

## Content

In this chapter, we’ll explore Vulkan profiles, a powerful feature that builds upon the ecosystem utilities we discussed in the previous chapter. Vulkan profiles provide a standardized way to:

Define a set of features, extensions, and limits that your application requires

Automatically check for compatibility with the user’s hardware

Eliminate the need for manual feature detection and fallback paths

Significantly reduce boilerplate code

Vulkan profiles are particularly valuable for developers who want to ensure their applications work consistently across a wide range of hardware without the complexity of manually checking for feature support.

Vulkan profiles are predefined collections of features, extensions, limits, and formats that represent a specific target environment or set of best practices. They provide a higher-level abstraction over the low-level Vulkan API, making it easier to:

* 
Target specific hardware capabilities

* 
Ensure compatibility across different GPUs

* 
Implement best practices consistently

* 
Reduce boilerplate code for feature detection

Instead of manually checking for each feature and extension and implementing fallback paths, you can simply specify a profile that your application requires. The Vulkan profiles library will handle the compatibility checks and provide appropriate error messages if the user’s hardware doesn’t meet the requirements.

Several types of profiles are available:

**API Profiles**: Represent specific Vulkan API versions (e.g., Vulkan 1.1, 1.2, 1.3)

**Vendor Profiles**: Target specific hardware vendors (e.g., NVIDIA, AMD, Intel)

**Platform Profiles**: Target specific platforms (e.g., Windows, Linux, Android)

**Best Practices Profile**: Implements recommended practices for Vulkan development

In this chapter, we’ll use the Best Practices profile as an example,
additionally, we will demonstrate how profiles can simplify your code by
eliminating the need for manual feature detection.

Up until now, we had to manually check for feature support and implement
fallback paths:

Check if the device supports Vulkan 1.3

If not, check if it supports the dynamic rendering extension

If neither is supported, fall back to traditional render passes

Repeat this process for every feature (timeline semaphores, synchronization2, etc.)

Maintain separate code paths for each feature

This approach leads to complex, hard-to-maintain code with multiple conditional branches.

With profiles, this entire process is simplified to:

Check if the profile is supported

If supported, use all features guaranteed by the profile

If not, optionally fall back to a more basic approach

Using profiles offers several advantages:

**Drastically reduced code complexity**: No need for multiple feature checks and conditional branches

**Improved maintainability**: Fewer code paths to test and debug

**Future-proofing**: As new Vulkan versions are released, profiles can be updated without changing your code

**Clearer requirements**: Profiles provide a clear specification of what your application needs

**Simplified error handling**: One check instead of many

Let’s see how to implement profiles in your Vulkan application. We’ll use the Best Practices profile as an example to demonstrate how profiles can replace the manual feature detection we had to do in the previous chapter.

First, you need to include the Vulkan profiles header:

#include 

This header provides the necessary functions and structures to work with Vulkan profiles.

The Vulkan Profiles header is NOT part of the standard Vulkan headers.
It is only available if you use the Vulkan SDK. Make sure you have the Vulkan SDK installed and properly configured in your development environment.

Instead of manually checking for features and extensions, you can define your profile requirements:

// Define the profile we want to use
const VpProfileProperties profile = {
    VP_KHR_ROADMAP_2022_NAME,
    VP_KHR_ROADMAP_2022_SPEC_VERSION
};

// Check if the profile is supported
VkBool32 supported = false;
vpGetPhysicalDeviceProfileSupport(instance, physicalDevice, &profile, &supported);

if (!supported) {
    throw std::runtime_error("Roadmap 2022 profile is not supported on this device");
}

When creating a logical device, you can use the profile to automatically enable the required features and extensions:

// Create device with Best Practices profile
VkDeviceCreateInfo deviceCreateInfo = {};
deviceCreateInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;

// Set up queue create infos
// ...

// Apply the Best Practices profile to the device creation
vpCreateDevice(physicalDevice, &deviceCreateInfo, &bestPracticesProfile, nullptr, &device);

This automatically enables all the features and extensions required by the Best Practices profile, without having to manually specify them.

The Best Practices profile may enable specific features that you can use in your application:

// The profile guarantees these features are available
// No need to check for support or provide fallback paths

// Example: Using dynamic rendering (guaranteed by the profile)
vk::RenderingAttachmentInfo colorAttachment{
    .imageView = swapChainImageViews[imageIndex],
    .imageLayout = vk::ImageLayout::eAttachmentOptimal,
    .loadOp = vk::AttachmentLoadOp::eClear,
    .storeOp = vk::AttachmentStoreOp::eStore,
    .clearValue = clearColor
};

vk::RenderingInfo renderingInfo{
    .renderArea = {{0, 0}, swapChainExtent},
    .layerCount = 1,
    .colorAttachmentCount = 1,
    .pColorAttachments = &colorAttachment
};

commandBuffer.beginRendering(renderingInfo);
// ... draw commands ...
commandBuffer.endRendering();

When using profiles, error handling becomes more straightforward:

try {
    // Try to create a device with the Best Practices profile
    vpCreateDevice(physicalDevice, &deviceCreateInfo, &bestPracticesProfile, nullptr, &device);
} catch (const std::exception& e) {
    // Profile is not supported, provide user-friendly error message
    std::cerr 

Let’s compare the two approaches to understand just how much code and complexity profiles can eliminate:

In the previous chapter, we had to write code like this for **each feature** we wanted to use:

// Check if dynamic rendering is supported
bool dynamicRenderingSupported = false;

// Check for Vulkan 1.3 support
if (deviceProperties.apiVersion >= VK_VERSION_1_3) {
    dynamicRenderingSupported = true;
} else {
    // Check for the extension on older Vulkan versions
    for (const auto& extension : availableExtensions) {
        if (strcmp(extension.extensionName, VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME) == 0) {
            dynamicRenderingSupported = true;
            break;
        }
    }
}

// Store this information for later use
appInfo.dynamicRenderingSupported = dynamicRenderingSupported;

And then we had to create conditional code paths throughout our application:

// When creating the pipeline
if (appInfo.dynamicRenderingSupported) {
    // Use dynamic rendering
    vk::PipelineRenderingCreateInfo renderingInfo{
        .colorAttachmentCount = 1,
        .pColorAttachmentFormats = &swapChainImageFormat
    };
    pipelineInfo.pNext = &renderingInfo;
    pipelineInfo.renderPass = nullptr;
} else {
    // Use traditional render pass
    pipelineInfo.pNext = nullptr;
    pipelineInfo.renderPass = renderPass;
    pipelineInfo.subpass = 0;
}

// When recording command buffers
if (appInfo.dynamicRenderingSupported) {
    // Begin dynamic rendering
    vk::RenderingAttachmentInfo colorAttachment{/*...*/};
    vk::RenderingInfo renderingInfo{/*...*/};
    commandBuffer.beginRendering(renderingInfo);
} else {
    // Begin traditional render pass
    vk::RenderPassBeginInfo renderPassInfo{/*...*/};
    commandBuffer.beginRenderPass(renderPassInfo, vk::SubpassContents::eInline);
}

// And again at the end of the command buffer
if (appInfo.dynamicRenderingSupported) {
    commandBuffer.endRendering();
} else {
    commandBuffer.endRenderPass();
}

We had to repeat this pattern for **every feature** we wanted to use conditionally (timeline semaphores, synchronization2, etc.), resulting in complex, branching code that’s challenging to maintain.

With profiles, all of that complexity is reduced to:

// Define the profile
const VpProfileProperties profile = {
    VP_KHR_ROADMAP_2022_NAME,
    VP_KHR_ROADMAP_2022_SPEC_VERSION
};

// Check if the profile is supported
VkBool32 supported = false;
vpGetPhysicalDeviceProfileSupport(instance, physicalDevice, &profile, &supported);

if (supported) {
    // Create device with the profile - all features enabled automatically
    vpCreateDevice(physicalDevice, &deviceCreateInfo, &profile, nullptr, &device);

    // Now we can use any feature guaranteed by the profile without checks
    // For example, dynamic rendering is always available:
    vk::RenderingAttachmentInfo colorAttachment{/*...*/};
    vk::RenderingInfo renderingInfo{/*...*/};
    commandBuffer.beginRendering(renderingInfo);
    // ... draw commands ...
    commandBuffer.endRendering();
}

The profile approach eliminates:

Multiple feature detection checks

Conditional code paths throughout your application

The need to track feature support in your application state

The complexity of maintaining and testing multiple code paths

This results in code that is:

Significantly shorter

Easier to read and understand

Less prone to errors

Easier to maintain and update

When using Vulkan profiles, consider these best practices:

**Choose the right profile**: Select a profile that matches your application’s requirements without being overly restrictive.

**Provide fallback options**: If the Best Practices profile isn’t supported, consider falling back to a more basic profile.

**Communicate requirements clearly**: Inform users about the hardware requirements based on the profiles you support.

**Test on various hardware**: Even with profiles, it’s important to test your application on different GPUs.

**Stay updated**: Profiles evolve with new Vulkan versions, so keep your implementation up to date.

Vulkan profiles provide a powerful way to simplify your Vulkan code by eliminating the need for manual feature detection and conditional code paths. As we’ve seen in this chapter, profiles can dramatically reduce the amount of code you need to write and maintain, making your application:

More concise and readable

Easier to maintain and update

Less prone to errors

More consistent across different hardware

The example we’ve explored in this chapter demonstrates how profiles can replace the complex feature detection and fallback paths we had to implement in the previous chapter. By using profiles, you can focus more on your application’s core functionality and less on the intricacies of hardware compatibility.

[C++ code](_attachments/33_vulkan_profiles.cpp)
