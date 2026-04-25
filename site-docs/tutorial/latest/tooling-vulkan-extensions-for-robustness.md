# Tooling: Vulkan Extensions for Robustness

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Tooling/05_extensions.html

## Table of Contents

- [Vulkan Extensions for Robustness](#_vulkan_extensions_for_robustness)
- [Vulkan_Extensions_for_Robustness](#_vulkan_extensions_for_robustness)
- [Understanding Undefined Behavior in Vulkan](#_understanding_undefined_behavior_in_vulkan)
- [Understanding_Undefined_Behavior_in_Vulkan](#_understanding_undefined_behavior_in_vulkan)
- [VK_EXT_robustness2 Extension](#_vk_ext_robustness2_extension)
- [VK_EXT_robustness2_Extension](#_vk_ext_robustness2_extension)
- [Key Features](#_key_features)
- [Enabling VK_EXT_robustness2](#_enabling_vk_ext_robustness2)
- [Enabling_VK_EXT_robustness2](#_enabling_vk_ext_robustness2)
- [Using Robust Access in Practice](#_using_robust_access_in_practice)
- [Using_Robust_Access_in_Practice](#_using_robust_access_in_practice)
- [Other Robustness Extensions](#_other_robustness_extensions)
- [Other_Robustness_Extensions](#_other_robustness_extensions)
- [VK_KHR_buffer_device_address](#_vk_khr_buffer_device_address)
- [VK_EXT_descriptor_indexing](#_vk_ext_descriptor_indexing)
- [Combining Robustness Extensions with Debugging Tools](#_combining_robustness_extensions_with_debugging_tools)
- [Combining_Robustness_Extensions_with_Debugging_Tools](#_combining_robustness_extensions_with_debugging_tools)
- [Best Practices for Using Robustness Extensions](#_best_practices_for_using_robustness_extensions)
- [Best_Practices_for_Using_Robustness_Extensions](#_best_practices_for_using_robustness_extensions)
- [Conclusion](#_conclusion)

## Content

Vulkan’s explicit design gives developers fine-grained control over the graphics pipeline, but this control comes with responsibility. Undefined behavior can occur when applications make mistakes like accessing out-of-bounds memory or using uninitialized resources. In this section, we’ll explore Vulkan extensions that can help make your application more robust against such issues, with a particular focus on VK_EXT_robustness2.

Before diving into robustness extensions, let’s understand what kinds of undefined behavior can occur in Vulkan applications:

**Out-of-bounds Access**: Accessing memory outside the bounds of a buffer or image

**Use-after-free**: Using a resource after it has been destroyed

**Uninitialized Memory**: Reading from memory that hasn’t been initialized

**Invalid Descriptors**: Using descriptors that point to invalid or incompatible resources

**Shader Execution Errors**: Division by zero, infinite loops, etc.

In standard Vulkan, these errors can lead to unpredictable behavior, including:

* 
Application crashes

* 
GPU hangs requiring a system restart

* 
Corrupted rendering

* 
Security vulnerabilities

* 
Inconsistent behavior across different hardware

Robustness extensions aim to provide more predictable behavior in these scenarios, often at a small performance cost.

The VK_EXT_robustness2 extension is an improved version of the original VK_EXT_robustness extension. It provides more comprehensive protection against undefined behavior, particularly for out-of-bounds accesses.

VK_EXT_robustness2 offers several important features:

**Robust Buffer Access**: Out-of-bounds reads from buffers return zero values instead of causing undefined behavior

**Robust Image Access**: Out-of-bounds reads from images return zero or transparent black

**Null Descriptor Handling**: Reads from null descriptors return zero values

**Robust Buffer Access 2**: An improved version that also handles out-of-bounds writes by discarding them

Let’s see how to enable and use this extension.

bool check_robustness2_support(vk::raii::PhysicalDevice& physical_device) {
    // Check if the extension is supported
    auto available_extensions = physical_device.enumerateDeviceExtensionProperties();

    for (const auto& extension : available_extensions) {
        if (strcmp(extension.extensionName, VK_EXT_ROBUSTNESS_2_EXTENSION_NAME) == 0) {
            return true;
        }
    }

    return false;
}

void enable_robustness2(vk::DeviceCreateInfo& device_create_info,
                       std::vector& enabled_extensions) {
    // Add the extension to the list of enabled extensions
    enabled_extensions.push_back(VK_EXT_ROBUSTNESS_2_EXTENSION_NAME);
    device_create_info.setPEnabledExtensionNames(enabled_extensions);

    // Set up the robustness2 features
    vk::PhysicalDeviceRobustness2FeaturesEXT robustness2_features{};
    robustness2_features.setRobustBufferAccess2(VK_TRUE);
    robustness2_features.setRobustImageAccess2(VK_TRUE);
    robustness2_features.setNullDescriptor(VK_TRUE);

    // Add to the pNext chain
    robustness2_features.pNext = device_create_info.pNext;
    device_create_info.pNext = &robustness2_features;
}

vk::raii::Device create_robust_device(vk::raii::PhysicalDevice& physical_device,
                                     vk::raii::Instance& instance) {
    // Check for support
    if (!check_robustness2_support(physical_device)) {
        std::cerr  enabled_extensions;
    // Add your other required extensions here

    vk::DeviceCreateInfo create_info{};
    // Set up your queues, features, etc.

    // Enable robustness2
    enable_robustness2(create_info, enabled_extensions);

    // Create the device
    return vk::raii::Device(physical_device, create_info);
}

Once you’ve enabled the extension, robust buffer and image access will be applied automatically. However, you should be aware of some considerations:

**Performance Impact**: Robust access can have a performance cost, as the GPU needs to perform bounds checking

**Not a Substitute for Correctness**: While robustness extensions make your application more resilient, they don’t fix the underlying bugs

**Debug vs. Release**: Consider enabling robustness in debug builds for development and testing, but evaluate the performance impact for release builds

Here’s an example of how robust buffer access can prevent crashes:

// Without robust buffer access, this could crash or produce undefined results
void potentially_dangerous_operation(vk::raii::CommandBuffer& cmd_buffer,
                                    vk::raii::Buffer& buffer,
                                    vk::raii::DescriptorSet& descriptor_set,
                                    uint32_t dynamic_offset,
                                    uint32_t buffer_size) {
    // If dynamic_offset is too large, this would normally cause undefined behavior
    // With robust buffer access, out-of-bounds reads will return zero
    cmd_buffer.bindDescriptorSets(
        vk::PipelineBindPoint::eCompute,
        pipeline_layout,
        0,
        1,
        &(*descriptor_set),
        1,
        &dynamic_offset
    );

    // Dispatch compute work that might read out of bounds
    cmd_buffer.dispatch(buffer_size / 64 + 1, 1, 1);  // Potentially too many workgroups
}

While VK_EXT_robustness2 is the focus of this section, there are other extensions that can help improve application robustness:

This extension allows you to use physical device addresses for buffers, which can be useful for advanced techniques. It includes robustness features for handling invalid addresses (when combined with robust access features like VK_EXT_robustness2 or core robustBufferAccess):

void enable_buffer_device_address(vk::DeviceCreateInfo& device_create_info,
                                 std::vector& enabled_extensions) {
    enabled_extensions.push_back(VK_KHR_BUFFER_DEVICE_ADDRESS_EXTENSION_NAME);
    device_create_info.setPEnabledExtensionNames(enabled_extensions);

    // Enable Buffer Device Address features
    vk::PhysicalDeviceBufferDeviceAddressFeatures buffer_device_address_features{};
    buffer_device_address_features.setBufferDeviceAddress(VK_TRUE);
    buffer_device_address_features.setBufferDeviceAddressCaptureReplay(VK_TRUE);

    // Optionally chain robustness features to ensure invalid addresses read as zero and writes are discarded
    // (If you've already enabled VK_EXT_robustness2 elsewhere, this is not required here.)
    vk::PhysicalDeviceRobustness2FeaturesEXT robustness2_features{};
    robustness2_features.setRobustBufferAccess2(VK_TRUE);
    robustness2_features.setRobustImageAccess2(VK_TRUE);
    robustness2_features.setNullDescriptor(VK_TRUE);

    // Chain features: robustness2 -> BDA -> existing pNext
    robustness2_features.pNext = &buffer_device_address_features;
    buffer_device_address_features.pNext = device_create_info.pNext;
    device_create_info.pNext = &robustness2_features;
}

This extension allows for more flexible descriptor indexing, including robustness-related capabilities such as tolerating out-of-bounds indices (reads become zero when robust access is enabled), partially bound descriptor sets, and update-after-bind. To actually make use of these behaviors you need to enable both device features and descriptor set layout binding flags:

void enable_descriptor_indexing(vk::DeviceCreateInfo& device_create_info,
                               std::vector& enabled_extensions) {
    enabled_extensions.push_back(VK_EXT_DESCRIPTOR_INDEXING_EXTENSION_NAME);
    device_create_info.setPEnabledExtensionNames(enabled_extensions);

    vk::PhysicalDeviceDescriptorIndexingFeatures indexing_features{};
    // Shader indexing capabilities (commonly needed alongside robustness)
    indexing_features.setShaderSampledImageArrayNonUniformIndexing(VK_TRUE);
    indexing_features.setShaderStorageBufferArrayNonUniformIndexing(VK_TRUE);

    // Robustness-enabling behaviors
    indexing_features.setRuntimeDescriptorArray(VK_TRUE);
    indexing_features.setDescriptorBindingPartiallyBound(VK_TRUE);
    indexing_features.setDescriptorBindingSampledImageUpdateAfterBind(VK_TRUE);
    indexing_features.setDescriptorBindingStorageBufferUpdateAfterBind(VK_TRUE);
    indexing_features.setDescriptorBindingUpdateUnusedWhilePending(VK_TRUE);

    // Add to the pNext chain (can be chained together with VK_EXT_robustness2)
    indexing_features.pNext = device_create_info.pNext;
    device_create_info.pNext = &indexing_features;
}

For descriptor arrays, you must also specify binding flags at layout creation time:

// Example: descriptor set layout with a runtime-sized array that can be partially bound
vk::DescriptorSetLayoutBinding binding{};
binding.binding = 0;
binding.descriptorType = vk::DescriptorType::eCombinedImageSampler;
binding.descriptorCount = 128; // example array size; for true runtime arrays also enable variable descriptor counts
binding.stageFlags = vk::ShaderStageFlagBits::eFragment;

vk::DescriptorBindingFlags binding_flags =
    vk::DescriptorBindingFlagBits::ePartiallyBound |
    vk::DescriptorBindingFlagBits::eUpdateAfterBind;

vk::DescriptorSetLayoutBindingFlagsCreateInfo flags_ci{};
flags_ci.setBindingCount(1);
flags_ci.setPBindingFlags(&binding_flags);

vk::DescriptorSetLayoutCreateInfo dsl_ci{};
dsl_ci.setPBindings(&binding);
dsl_ci.setBindingCount(1);
// Required when using update-after-bind flags
// (some descriptor types require pool and layout flags to match update-after-bind usage)
dsl_ci.flags |= vk::DescriptorSetLayoutCreateFlagBits::eUpdateAfterBindPool;

dsl_ci.pNext = &flags_ci;

vk::raii::DescriptorSetLayout set_layout{device, dsl_ci};

If you need truly variable-length descriptor arrays at runtime, also enable variable descriptor counts and use the corresponding allocate info:

// Enable the device feature
// indexing_features.setDescriptorBindingVariableDescriptorCount(VK_TRUE); // do this where features are enabled

uint32_t max_descriptors_for_set0 = 1024; // requested at allocation time

vk::DescriptorSetVariableDescriptorCountAllocateInfo variable_counts_info{};
variable_counts_info.setDescriptorSetCount(1);
variable_counts_info.setPDescriptorCounts(&max_descriptors_for_set0);

vk::DescriptorSetAllocateInfo alloc_info{};
alloc_info.setDescriptorPool(descriptor_pool);
alloc_info.setDescriptorSetCount(1);
alloc_info.setPSetLayouts(&*set_layout);
alloc_info.pNext = &variable_counts_info;

auto descriptor_sets = vk::raii::DescriptorSets{device, alloc_info};

Note: With VK_EXT_robustness2’s nullDescriptor = VK_TRUE and descriptor indexing’s partially-bound behavior, unbound array elements will read as zero rather than invoking undefined behavior.

For maximum effectiveness, combine robustness extensions with the debugging tools we discussed in previous sections:

class RobustVulkanApplication {
public:
    RobustVulkanApplication() {
        initialize_vulkan();
    }

    void run() {
        // Main application loop
        while (!should_close()) {
            try {
                update();
                render();
            } catch (const vk::SystemError& e) {
                // Handle recoverable Vulkan errors
                std::cerr  extensions;
        // Add required extensions

        vk::DeviceCreateInfo create_info{};
        // Set up queues, etc.

        // Enable robustness if available
        if (has_robustness2) {
            enable_robustness2(create_info, extensions);
        }

        // Enable other robustness-related extensions
        enable_buffer_device_address(create_info, extensions);
        enable_descriptor_indexing(create_info, extensions);

        return vk::raii::Device(physical_device, create_info);
    }

    bool recover_from_error() {
        // Attempt to recover from errors
        // This might involve recreating swapchain, command buffers, etc.
        try {
            // Reset command buffers
            // Recreate swapchain if needed
            // ...
            return true;
        } catch (const std::exception& e) {
            std::cerr 

To make the most of robustness extensions:

**Check for Support**: Always check if the extension is supported before trying to use it

**Fallback Behavior**: Implement fallback behavior for devices that don’t support the extensions

**Performance Testing**: Measure the performance impact of enabling robustness features

**Combine with Validation**: Use validation layers during development to catch issues early

**Don’t Rely on Robustness**: Fix the underlying issues rather than relying on robustness extensions to mask them

**Document Usage**: Clearly document which extensions your application requires and why

Vulkan robustness extensions, particularly VK_EXT_robustness2, provide valuable tools for making your application more resilient to undefined behavior. By combining these extensions with proper error handling, validation layers, and debugging tools, you can create a more stable and reliable Vulkan application.

In the next and final section, we’ll summarize what we’ve learned about tooling for Vulkan applications and discuss how to apply these techniques in your own projects.

[Previous: Crash Handling and Minidumps](04_crash_minidump.html) | [Next: Packaging and Distribution](06_packaging_and_distribution.html)
