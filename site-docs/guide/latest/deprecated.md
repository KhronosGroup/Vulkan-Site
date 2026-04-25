# Deprecated

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/deprecated.html

## Table of Contents

- [Deprecated Items](#_deprecated_items)
- [How to Use This Guide](#_how_to_use_this_guide)
- [How_to_Use_This_Guide](#_how_to_use_this_guide)
- [Notes on Deprecation](#_notes_on_deprecation)
- [Notes_on_Deprecation](#_notes_on_deprecation)
- [Additional Resources](#_additional_resources)
- [Detailed Fallback Instructions](#_detailed_fallback_instructions)
- [Detailed_Fallback_Instructions](#_detailed_fallback_instructions)
- [Device Layers](#device_layers_replacement)
- [What They Were](#_what_they_were)
- [What_They_Were](#_what_they_were)
- [Replacement](#_replacement)
- [Code Example](#_code_example)
- [Fallback Strategy](#_fallback_strategy)
- [VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT](#top_of_pipe_replacement)
- [What It Was](#_what_it_was)
- [What_It_Was](#_what_it_was)
- [Replacement](#_replacement_2)
- [Code Example](#_code_example_2)
- [Fallback Strategy](#_fallback_strategy_2)
- [VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT](#bottom_of_pipe_replacement)
- [What It Was](#_what_it_was_2)
- [What_It_Was](#_what_it_was_2)
- [Replacement](#_replacement_3)
- [Code Example](#_code_example_3)
- [Fallback Strategy](#_fallback_strategy_3)
- [VK_PIPELINE_STAGE_VERTEX_INPUT_BIT](#vertex_input_replacement)
- [What It Was](#_what_it_was_3)
- [What_It_Was](#_what_it_was_3)
- [Replacement](#_replacement_4)
- [Code Example](#_code_example_4)
- [Fallback Strategy](#_fallback_strategy_4)
- [VK_PIPELINE_STAGE_TRANSFER_BIT](#all_transfer_replacement)
- [What It Was](#_what_it_was_4)
- [What_It_Was](#_what_it_was_4)
- [Replacement](#_replacement_5)
- [Code Example](#_code_example_5)
- [Fallback Strategy](#_fallback_strategy_5)
- [VK_ACCESS_SHADER_READ_BIT](#shader_read_replacement)
- [What It Was](#_what_it_was_5)
- [What_It_Was](#_what_it_was_5)
- [Replacement](#_replacement_6)
- [Code Example](#_code_example_6)
- [Fallback Strategy](#_fallback_strategy_6)
- [VK_ACCESS_SHADER_WRITE_BIT](#shader_write_replacement)
- [What It Was](#_what_it_was_6)
- [What_It_Was](#_what_it_was_6)
- [Replacement](#_replacement_7)
- [Code Example](#_code_example_7)
- [Fallback Strategy](#_fallback_strategy_7)
- [Physical Device Queries](#physical_device_queries_replacement)
- [Physical_Device_Queries](#physical_device_queries_replacement)
- [What They Were](#_what_they_were_2)
- [What_They_Were](#_what_they_were_2)
- [Replacement](#_replacement_8)
- [Code Example](#_code_example_8)
- [Fallback Strategy](#_fallback_strategy_8)
- [Version Macros](#version_macros_replacement)
- [What They Were](#_what_they_were_3)
- [What_They_Were](#_what_they_were_3)
- [Replacement](#_replacement_9)
- [Code Example](#_code_example_9)
- [Fallback Strategy](#_fallback_strategy_9)
- [Render Pass Functions](#render_pass_functions_replacement)
- [Render_Pass_Functions](#render_pass_functions_replacement)
- [What They Were](#_what_they_were_4)
- [What_They_Were](#_what_they_were_4)
- [Replacement](#_replacement_10)
- [Code Example](#_code_example_10)
- [Fallback Strategy](#_fallback_strategy_10)
- [Render Pass Objects](#render_pass_objects_replacement)
- [Render_Pass_Objects](#render_pass_objects_replacement)
- [What They Were](#_what_they_were_5)
- [What_They_Were](#_what_they_were_5)
- [Replacement](#_replacement_11)
- [Code Example](#_code_example_11)
- [Fallback Strategy](#_fallback_strategy_11)
- [Pipeline Objects](#pipelines_shader_objects_replacement)
- [What They Were](#_what_they_were_6)
- [What_They_Were](#_what_they_were_6)
- [Replacement](#_replacement_12)
- [Code Example](#_code_example_12)
- [Fallback Strategy](#_fallback_strategy_12)

## Content

This guide provides fallback instructions for deprecated items in Vulkan. It helps developers understand what deprecated features were, what they did, and how to use their modern replacements while maintaining backward compatibility where needed.

The following table lists deprecated items in Vulkan along with their replacements and links to detailed fallback instructions:

| Deprecated Item | What it was/did | Replacement | When Deprecated | GPU Info Link |
| --- | --- | --- | --- | --- |
| Device Layers | Device layers were a way to intercept, evaluate, and modify Vulkan functions at the device level. | Instance layers should be used instead. All layer functionality is now available through instance layers. | Early in Vulkan’s life |  |
| Physical Device Queries | Functions like `vkGetPhysicalDeviceFeatures` used to query device capabilities. | Use `vkGetPhysicalDeviceFeatures2` and related functions that provide greater extensibility. See [Physical Device Queries](#physical_device_queries_replacement) for details. | Vulkan 1.1 | [View on GPU Info](https://vulkan.gpuinfo.org/listreports.php?instanceextension=VK_KHR_get_physical_device_properties2&platform=all) |
| Version Macros | Macros like `VK_MAKE_VERSION` and `VK_VERSION_MAJOR` that don’t account for API variant. | Use macros that include API variant like `VK_MAKE_API_VERSION` and `VK_API_VERSION_MAJOR`. See [Version Macros](#version_macros_replacement) for details. | Vulkan 1.1 | [View in Spec](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.1) |
| Render Pass Functions | Original render pass creation and management functions. | Use version 2 functions like `vkCreateRenderPass2` that provide greater extensibility. See [Render Pass Functions](#render_pass_functions_replacement) for details. | Vulkan 1.2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_create_renderpass2) |
| Render Pass Objects | `VkRenderPass` and `VkFramebuffer` objects for defining rendering operations. | Use dynamic rendering via `vkCmdBeginRendering` and `vkCmdEndRendering`. See [Render Pass Objects](#render_pass_objects_replacement) for details. | Vulkan 1.4 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_dynamic_rendering) |
| VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT | Used in synchronization to represent the earliest possible pipeline stage. | Different replacements depending on usage context. See [VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT](#top_of_pipe_replacement) for details. | With VK_KHR_synchronization2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_synchronization2) |
| VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT | Used in synchronization to represent the latest possible pipeline stage. | Different replacements depending on usage context. See [VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT](#bottom_of_pipe_replacement) for details. | With VK_KHR_synchronization2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_synchronization2) |
| VK_PIPELINE_STAGE_VERTEX_INPUT_BIT | Used to represent the vertex input stage in the pipeline. | Split into more specific flags: `VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT_KHR` and `VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT_KHR`. | With VK_KHR_synchronization2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_synchronization2) |
| VK_PIPELINE_STAGE_TRANSFER_BIT | Used to represent all transfer operations in the pipeline. | Split into more specific flags: `VK_PIPELINE_STAGE_2_COPY_BIT_KHR`, `VK_PIPELINE_STAGE_2_RESOLVE_BIT_KHR`, `VK_PIPELINE_STAGE_2_BLIT_BIT_KHR`, and `VK_PIPELINE_STAGE_2_CLEAR_BIT_KHR`. | With VK_KHR_synchronization2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_synchronization2) |
| VK_ACCESS_SHADER_READ_BIT | Used to represent all shader read operations. | Split into more specific flags: `VK_ACCESS_2_UNIFORM_READ_BIT_KHR`, `VK_ACCESS_2_SHADER_SAMPLED_READ_BIT_KHR`, and `VK_ACCESS_2_SHADER_STORAGE_READ_BIT_KHR`. | With VK_KHR_synchronization2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_synchronization2) |
| VK_ACCESS_SHADER_WRITE_BIT | Used to represent shader write operations. | Renamed to `VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT_KHR` to better describe the scope of what resources in the shader are described by the access flag. | With VK_KHR_synchronization2 | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_KHR_synchronization2) |
| Pipeline Objects | `VkPipeline` objects (graphics and compute) used to bind shaders and fixed-function state as a monolithic unit. | Use Shader Objects via `VK_EXT_shader_object` for a pipeline-free workflow that binds shaders and state directly. See [Pipeline Objects](#pipelines_shader_objects_replacement) for details. | With VK_EXT_shader_object | [View on GPU Info](https://vulkan.gpuinfo.org/displayextensiondetail.php?extension=VK_EXT_shader_object) |

**Identify Deprecated Items**: Determine if your application uses any deprecated Vulkan features.

**Understand the Replacement**: Read about what each deprecated item was and its recommended replacement.

**Implement Fallbacks**: Use the detailed sections below to implement proper fallbacks for backward compatibility.

**Test Thoroughly**: Ensure your application works correctly with both the deprecated item and its replacement.

* 
Deprecated items will still work in current Vulkan implementations.

* 
Using replacements for deprecated items often provides better performance or more precise control.

* 
When targeting newer Vulkan versions, it’s best to use the recommended replacements.

* 
For backward compatibility with older Vulkan implementations, fallback code may be necessary.

* 
[Vulkan Specification](https://docs.vulkan.org/spec/latest/): Official documentation for all Vulkan features

* 
[Vulkan
Specification Legacy](https://docs.vulkan.org/spec/latest/appendices/legacy.html): Current official list of legacy Vulkan features

* 
[Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples): Sample code demonstrating various Vulkan features

* 
[Checking for Support](checking_for_support.adoc): Guide on how to check for feature support at runtime

* 
[Vulkan Versions](versions.adoc): Information about different Vulkan versions and their features

Device layers were a way to intercept, evaluate, and modify Vulkan functions at the device level. They were deprecated early in Vulkan’s life in favor of instance layers.

Device layers were similar to instance layers but were associated with a specific VkDevice. They allowed for device-specific validation and debugging.

All layer functionality is now available through instance layers. Instance layers can intercept both instance-level and device-level Vulkan functions.

// DEPRECATED: Using device layers
const char* deviceLayerNames[] = { "VK_LAYER_LUNARG_standard_validation" };
VkDeviceCreateInfo createInfo = {};
createInfo.enabledLayerCount = 1;
createInfo.ppEnabledLayerNames = deviceLayerNames;
vkCreateDevice(physicalDevice, &createInfo, nullptr, &device);

// RECOMMENDED: Using instance layers only
const char* instanceLayerNames[] = { "VK_LAYER_KHRONOS_validation" };
VkInstanceCreateInfo instanceCreateInfo = {};
instanceCreateInfo.enabledLayerCount = 1;
instanceCreateInfo.ppEnabledLayerNames = instanceLayerNames;
vkCreateInstance(&instanceCreateInfo, nullptr, &instance);

// When creating the device, don't specify any layers
VkDeviceCreateInfo createInfo = {};
createInfo.enabledLayerCount = 0;
createInfo.ppEnabledLayerNames = nullptr;
vkCreateDevice(physicalDevice, &createInfo, nullptr, &device);

Since device layers were deprecated very early, there’s no need for a fallback strategy. All Vulkan implementations should support instance layers instead of device layers.

`VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT` was used in synchronization to represent the earliest possible pipeline stage. It was deprecated with the introduction of VK_KHR_synchronization2.

This flag represented a "pseudo-stage" at the beginning of the pipeline, before any actual work begins. It was often used in synchronization primitives to indicate that a dependency should be satisfied before any actual work begins.

The replacement depends on the context in which `VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT` is used:

When used in the first synchronization scope (srcStageMask):

* 
Replace with `VK_PIPELINE_STAGE_2_NONE_KHR` and `VK_ACCESS_2_NONE_KHR`

When used in the second synchronization scope (dstStageMask):

* 
Replace with `VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT_KHR` and `VK_ACCESS_2_NONE_KHR`

// DEPRECATED: Using VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT in srcStageMask
VkMemoryBarrier memoryBarrier = {
    .srcAccessMask = 0,
    .dstAccessMask = VK_ACCESS_SHADER_READ_BIT
};
vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT,  // srcStageMask
    VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT,  // dstStageMask
    0,
    1, &memoryBarrier,
    0, nullptr,
    0, nullptr
);

// RECOMMENDED: Using VK_PIPELINE_STAGE_2_NONE_KHR in srcStageMask
VkMemoryBarrier2KHR memoryBarrier2 = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_BARRIER_2_KHR,
    .pNext = nullptr,
    .srcStageMask = VK_PIPELINE_STAGE_2_NONE_KHR,
    .srcAccessMask = VK_ACCESS_2_NONE_KHR,
    .dstStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR,
    .dstAccessMask = VK_ACCESS_2_SHADER_READ_BIT_KHR
};

VkDependencyInfoKHR dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
    .pNext = nullptr,
    .dependencyFlags = 0,
    .memoryBarrierCount = 1,
    .pMemoryBarriers = &memoryBarrier2,
    .bufferMemoryBarrierCount = 0,
    .pBufferMemoryBarriers = nullptr,
    .imageMemoryBarrierCount = 0,
    .pImageMemoryBarriers = nullptr
};

vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);

To support both deprecated and new APIs, you can check for the availability of the VK_KHR_synchronization2 extension:

bool hasSync2 = false;
// Check if VK_KHR_synchronization2 is available
uint32_t extensionCount = 0;
vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, nullptr);
std::vector extensions(extensionCount);
vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, extensions.data());

for (const auto& extension : extensions) {
    if (strcmp(extension.extensionName, VK_KHR_SYNCHRONIZATION_2_EXTENSION_NAME) == 0) {
        hasSync2 = true;
        break;
    }
}

// Function to create a barrier based on available extensions
void CreateBarrier(VkCommandBuffer commandBuffer, bool isSourceTopOfPipe) {
    if (hasSync2) {
        // Use synchronization2 API
        VkMemoryBarrier2KHR memoryBarrier2 = {
            .sType = VK_STRUCTURE_TYPE_MEMORY_BARRIER_2_KHR,
            .pNext = nullptr,
            .srcStageMask = isSourceTopOfPipe ? VK_PIPELINE_STAGE_2_NONE_KHR : VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT_KHR,
            .srcAccessMask = VK_ACCESS_2_NONE_KHR,
            .dstStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR,
            .dstAccessMask = VK_ACCESS_2_SHADER_READ_BIT_KHR
        };

        VkDependencyInfoKHR dependencyInfo = {
            .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
            .pNext = nullptr,
            .dependencyFlags = 0,
            .memoryBarrierCount = 1,
            .pMemoryBarriers = &memoryBarrier2,
            .bufferMemoryBarrierCount = 0,
            .pBufferMemoryBarriers = nullptr,
            .imageMemoryBarrierCount = 0,
            .pImageMemoryBarriers = nullptr
        };

        vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);
    } else {
        // Use original API
        VkMemoryBarrier memoryBarrier = {
            .sType = VK_STRUCTURE_TYPE_MEMORY_BARRIER,
            .pNext = nullptr,
            .srcAccessMask = 0,
            .dstAccessMask = VK_ACCESS_SHADER_READ_BIT
        };

        vkCmdPipelineBarrier(
            commandBuffer,
            VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT,  // srcStageMask
            VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT,  // dstStageMask
            0,
            1, &memoryBarrier,
            0, nullptr,
            0, nullptr
        );
    }
}

`VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT` was used in synchronization to represent the latest possible pipeline stage. It was deprecated with the introduction of VK_KHR_synchronization2.

This flag represented a "pseudo-stage" at the end of the pipeline, after all actual work is completed. It was often used in synchronization primitives to indicate that a dependency should be satisfied after all work is completed.

The replacement depends on the context in which `VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT` is used:

When used in the first synchronization scope (srcStageMask):

* 
Replace with `VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT_KHR` and `VK_ACCESS_2_NONE_KHR`

When used in the second synchronization scope (dstStageMask):

* 
Replace with `VK_PIPELINE_STAGE_2_NONE_KHR` and `VK_ACCESS_2_NONE_KHR`

// DEPRECATED: Using VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT in srcStageMask
VkMemoryBarrier memoryBarrier = {
    .srcAccessMask = VK_ACCESS_SHADER_WRITE_BIT,
    .dstAccessMask = 0
};
vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT,  // srcStageMask
    VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT,  // dstStageMask
    0,
    1, &memoryBarrier,
    0, nullptr,
    0, nullptr
);

// RECOMMENDED: Using VK_PIPELINE_STAGE_2_NONE_KHR in dstStageMask
VkMemoryBarrier2KHR memoryBarrier2 = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_BARRIER_2_KHR,
    .pNext = nullptr,
    .srcStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR,
    .srcAccessMask = VK_ACCESS_2_SHADER_WRITE_BIT_KHR,
    .dstStageMask = VK_PIPELINE_STAGE_2_NONE_KHR,
    .dstAccessMask = VK_ACCESS_2_NONE_KHR
};

VkDependencyInfoKHR dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
    .pNext = nullptr,
    .dependencyFlags = 0,
    .memoryBarrierCount = 1,
    .pMemoryBarriers = &memoryBarrier2,
    .bufferMemoryBarrierCount = 0,
    .pBufferMemoryBarriers = nullptr,
    .imageMemoryBarrierCount = 0,
    .pImageMemoryBarriers = nullptr
};

vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);

The fallback strategy is similar to the one for `VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT`. Check for the availability of the VK_KHR_synchronization2 extension and use the appropriate API.

`VK_PIPELINE_STAGE_VERTEX_INPUT_BIT` was used to represent the vertex input stage in the pipeline. With VK_KHR_synchronization2, it was split into more specific flags.

This flag represented the stage of the pipeline where vertex and index data is consumed. It was used in synchronization primitives to indicate operations related to vertex input.

Split into more specific flags:

* 
`VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT_KHR`: Represents the stage where index data is consumed

* 
`VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT_KHR`: Represents the stage where vertex attribute data is consumed

// DEPRECATED: Using VK_PIPELINE_STAGE_VERTEX_INPUT_BIT
VkBufferMemoryBarrier bufferBarrier = {
    .srcAccessMask = VK_ACCESS_TRANSFER_WRITE_BIT,
    .dstAccessMask = VK_ACCESS_VERTEX_ATTRIBUTE_READ_BIT,
    .buffer = vertexBuffer,
    // ... other fields
};
vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_TRANSFER_BIT,
    VK_PIPELINE_STAGE_VERTEX_INPUT_BIT,
    0,
    0, nullptr,
    1, &bufferBarrier,
    0, nullptr
);

// RECOMMENDED: Using specific vertex input stage flags
VkBufferMemoryBarrier2KHR bufferBarrier2 = {
    .sType = VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2_KHR,
    .pNext = nullptr,
    .srcStageMask = VK_PIPELINE_STAGE_2_TRANSFER_BIT_KHR,
    .srcAccessMask = VK_ACCESS_2_TRANSFER_WRITE_BIT_KHR,
    .dstStageMask = VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT_KHR,
    .dstAccessMask = VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT_KHR,
    .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .buffer = vertexBuffer,
    .offset = 0,
    .size = VK_WHOLE_SIZE
};

VkDependencyInfoKHR dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
    .pNext = nullptr,
    .dependencyFlags = 0,
    .memoryBarrierCount = 0,
    .pMemoryBarriers = nullptr,
    .bufferMemoryBarrierCount = 1,
    .pBufferMemoryBarriers = &bufferBarrier2,
    .imageMemoryBarrierCount = 0,
    .pImageMemoryBarriers = nullptr
};

vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);

Check for the availability of the VK_KHR_synchronization2 extension and use the appropriate API. When using the new API, choose the most specific flag that applies to your use case.

`VK_PIPELINE_STAGE_TRANSFER_BIT` was used to represent all transfer operations in the pipeline. With VK_KHR_synchronization2, it was split into more specific flags.

This flag represented all transfer operations, including copy, resolve, blit, and clear operations. It was used in synchronization primitives to indicate operations related to data transfer.

Split into more specific flags:

* 
`VK_PIPELINE_STAGE_2_COPY_BIT_KHR`: Represents copy operations

* 
`VK_PIPELINE_STAGE_2_RESOLVE_BIT_KHR`: Represents resolve operations

* 
`VK_PIPELINE_STAGE_2_BLIT_BIT_KHR`: Represents blit operations

* 
`VK_PIPELINE_STAGE_2_CLEAR_BIT_KHR`: Represents clear operations

// DEPRECATED: Using VK_PIPELINE_STAGE_TRANSFER_BIT
VkImageMemoryBarrier imageBarrier = {
    .srcAccessMask = VK_ACCESS_TRANSFER_WRITE_BIT,
    .dstAccessMask = VK_ACCESS_SHADER_READ_BIT,
    .oldLayout = VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL,
    .newLayout = VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
    .image = image,
    // ... other fields
};
vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_TRANSFER_BIT,
    VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT,
    0,
    0, nullptr,
    0, nullptr,
    1, &imageBarrier
);

// RECOMMENDED: Using specific transfer stage flags
VkImageMemoryBarrier2KHR imageBarrier2 = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2_KHR,
    .pNext = nullptr,
    .srcStageMask = VK_PIPELINE_STAGE_2_COPY_BIT_KHR,  // Assuming a copy operation
    .srcAccessMask = VK_ACCESS_2_TRANSFER_WRITE_BIT_KHR,
    .dstStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR,
    .dstAccessMask = VK_ACCESS_2_SHADER_READ_BIT_KHR,
    .oldLayout = VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL,
    .newLayout = VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
    .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .image = image,
    .subresourceRange = {
        .aspectMask = VK_IMAGE_ASPECT_COLOR_BIT,
        .baseMipLevel = 0,
        .levelCount = 1,
        .baseArrayLayer = 0,
        .layerCount = 1
    }
};

VkDependencyInfoKHR dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
    .pNext = nullptr,
    .dependencyFlags = 0,
    .memoryBarrierCount = 0,
    .pMemoryBarriers = nullptr,
    .bufferMemoryBarrierCount = 0,
    .pBufferMemoryBarriers = nullptr,
    .imageMemoryBarrierCount = 1,
    .pImageMemoryBarriers = &imageBarrier2
};

vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);

Check for the availability of the VK_KHR_synchronization2 extension and use the appropriate API. When using the new API, choose the most specific flag that applies to your use case.

`VK_ACCESS_SHADER_READ_BIT` was used to represent all shader read operations. With VK_KHR_synchronization2, it was split into more specific flags.

This flag represented all read operations performed by shaders, including reading from uniform buffers, storage buffers, and sampled images. It was used in synchronization primitives to indicate shader read operations.

Split into more specific flags:

* 
`VK_ACCESS_2_UNIFORM_READ_BIT_KHR`: Represents reads from uniform buffers

* 
`VK_ACCESS_2_SHADER_SAMPLED_READ_BIT_KHR`: Represents reads from sampled images

* 
`VK_ACCESS_2_SHADER_STORAGE_READ_BIT_KHR`: Represents reads from storage buffers and images

// DEPRECATED: Using VK_ACCESS_SHADER_READ_BIT
VkImageMemoryBarrier imageBarrier = {
    .srcAccessMask = VK_ACCESS_TRANSFER_WRITE_BIT,
    .dstAccessMask = VK_ACCESS_SHADER_READ_BIT,
    .oldLayout = VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL,
    .newLayout = VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
    .image = image,
    // ... other fields
};
vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_TRANSFER_BIT,
    VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT,
    0,
    0, nullptr,
    0, nullptr,
    1, &imageBarrier
);

// RECOMMENDED: Using specific shader read access flags
VkImageMemoryBarrier2KHR imageBarrier2 = {
    .sType = VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2_KHR,
    .pNext = nullptr,
    .srcStageMask = VK_PIPELINE_STAGE_2_TRANSFER_BIT_KHR,
    .srcAccessMask = VK_ACCESS_2_TRANSFER_WRITE_BIT_KHR,
    .dstStageMask = VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR,
    .dstAccessMask = VK_ACCESS_2_SHADER_SAMPLED_READ_BIT_KHR,  // Assuming a sampled image
    .oldLayout = VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL,
    .newLayout = VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
    .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .image = image,
    .subresourceRange = {
        .aspectMask = VK_IMAGE_ASPECT_COLOR_BIT,
        .baseMipLevel = 0,
        .levelCount = 1,
        .baseArrayLayer = 0,
        .layerCount = 1
    }
};

VkDependencyInfoKHR dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
    .pNext = nullptr,
    .dependencyFlags = 0,
    .memoryBarrierCount = 0,
    .pMemoryBarriers = nullptr,
    .bufferMemoryBarrierCount = 0,
    .pBufferMemoryBarriers = nullptr,
    .imageMemoryBarrierCount = 1,
    .pImageMemoryBarriers = &imageBarrier2
};

vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);

Check for the availability of the VK_KHR_synchronization2 extension and use the appropriate API. When using the new API, choose the most specific flag that applies to your use case.

`VK_ACCESS_SHADER_WRITE_BIT` was used to represent shader write operations. With VK_KHR_synchronization2, it was renamed to better describe its scope.

This flag represented write operations performed by shaders to storage buffers and images. It was used in synchronization primitives to indicate shader write operations.

Renamed to `VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT_KHR` to better describe the scope of what resources in the shader are described by the access flag.

// DEPRECATED: Using VK_ACCESS_SHADER_WRITE_BIT
VkBufferMemoryBarrier bufferBarrier = {
    .srcAccessMask = VK_ACCESS_SHADER_WRITE_BIT,
    .dstAccessMask = VK_ACCESS_TRANSFER_READ_BIT,
    .buffer = storageBuffer,
    // ... other fields
};
vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT,
    VK_PIPELINE_STAGE_TRANSFER_BIT,
    0,
    0, nullptr,
    1, &bufferBarrier,
    0, nullptr
);

// RECOMMENDED: Using VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT_KHR
VkBufferMemoryBarrier2KHR bufferBarrier2 = {
    .sType = VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2_KHR,
    .pNext = nullptr,
    .srcStageMask = VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT_KHR,
    .srcAccessMask = VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT_KHR,
    .dstStageMask = VK_PIPELINE_STAGE_2_TRANSFER_BIT_KHR,
    .dstAccessMask = VK_ACCESS_2_TRANSFER_READ_BIT_KHR,
    .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .buffer = storageBuffer,
    .offset = 0,
    .size = VK_WHOLE_SIZE
};

VkDependencyInfoKHR dependencyInfo = {
    .sType = VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR,
    .pNext = nullptr,
    .dependencyFlags = 0,
    .memoryBarrierCount = 0,
    .pMemoryBarriers = nullptr,
    .bufferMemoryBarrierCount = 1,
    .pBufferMemoryBarriers = &bufferBarrier2,
    .imageMemoryBarrierCount = 0,
    .pImageMemoryBarriers = nullptr
};

vkCmdPipelineBarrier2KHR(commandBuffer, &dependencyInfo);

Check for the availability of the VK_KHR_synchronization2 extension and use the appropriate API.

Physical device query functions like `vkGetPhysicalDeviceFeatures` were used to query device capabilities in Vulkan 1.0. These were deprecated with the introduction of version 2 query functions in Vulkan 1.1.

The original physical device query functions provided basic information about device capabilities but lacked extensibility. The main functions included:

* 
`vkGetPhysicalDeviceFeatures`: Queried supported features

* 
`vkGetPhysicalDeviceProperties`: Queried device properties

* 
`vkGetPhysicalDeviceMemoryProperties`: Queried memory properties

* 
`vkGetPhysicalDeviceQueueFamilyProperties`: Queried queue family properties

The version 2 query functions provide the same functionality but with greater extensibility through the pNext chain:

* 
`vkGetPhysicalDeviceFeatures2`: Replaces `vkGetPhysicalDeviceFeatures`

* 
`vkGetPhysicalDeviceProperties2`: Replaces `vkGetPhysicalDeviceProperties`

* 
`vkGetPhysicalDeviceMemoryProperties2`: Replaces `vkGetPhysicalDeviceMemoryProperties`

* 
`vkGetPhysicalDeviceQueueFamilyProperties2`: Replaces `vkGetPhysicalDeviceQueueFamilyProperties`

When enabling device features, `VkPhysicalDeviceFeatures2` should be provided in the pNext chain of `VkDeviceCreateInfo` instead of using `VkDeviceCreateInfo::pEnabledFeatures`.

// DEPRECATED: Using original physical device query functions
VkPhysicalDeviceFeatures deviceFeatures;
vkGetPhysicalDeviceFeatures(physicalDevice, &deviceFeatures);

// Enable features when creating device
VkDeviceCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
createInfo.pEnabledFeatures = &deviceFeatures;
vkCreateDevice(physicalDevice, &createInfo, nullptr, &device);

// RECOMMENDED: Using version 2 query functions
VkPhysicalDeviceFeatures2 deviceFeatures2 = {};
deviceFeatures2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;

// Can extend with additional feature structs
VkPhysicalDeviceVulkan11Features vulkan11Features = {};
vulkan11Features.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES;
deviceFeatures2.pNext = &vulkan11Features;

vkGetPhysicalDeviceFeatures2(physicalDevice, &deviceFeatures2);

// Enable features when creating device using pNext chain
VkDeviceCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
createInfo.pNext = &deviceFeatures2; // Pass features through pNext
createInfo.pEnabledFeatures = nullptr; // Don't use this field anymore
vkCreateDevice(physicalDevice, &createInfo, nullptr, &device);

To support both Vulkan 1.0 and newer versions, check for the availability of the version 2 functions:

// Check if Vulkan 1.1 or VK_KHR_get_physical_device_properties2 is supported
bool hasPhysicalDeviceProperties2 = false;

// For instance-level version check
uint32_t apiVersion = VK_API_VERSION_1_0;
if (vkEnumerateInstanceVersion) {
    vkEnumerateInstanceVersion(&apiVersion);
    if (apiVersion >= VK_API_VERSION_1_1) {
        hasPhysicalDeviceProperties2 = true;
    }
}

// Or check for extension if not using Vulkan 1.1
if (!hasPhysicalDeviceProperties2) {
    uint32_t extensionCount = 0;
    vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, nullptr);
    std::vector extensions(extensionCount);
    vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, extensions.data());

    for (const auto& extension : extensions) {
        if (strcmp(extension.extensionName, VK_KHR_GET_PHYSICAL_DEVICE_PROPERTIES_2_EXTENSION_NAME) == 0) {
            hasPhysicalDeviceProperties2 = true;
            break;
        }
    }
}

// Function to query features based on available functionality
void QueryDeviceFeatures(VkPhysicalDevice physicalDevice, VkPhysicalDeviceFeatures* features,
                         VkPhysicalDeviceVulkan11Features* vulkan11Features = nullptr) {
    if (hasPhysicalDeviceProperties2 && vulkan11Features) {
        // Use version 2 query with extensions
        VkPhysicalDeviceFeatures2 features2 = {};
        features2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
        features2.pNext = vulkan11Features;

        vkGetPhysicalDeviceFeatures2(physicalDevice, &features2);
        *features = features2.features;
    } else {
        // Fall back to original query
        vkGetPhysicalDeviceFeatures(physicalDevice, features);
    }
}

Version macros that do not take the API variant into account, such as `VK_MAKE_VERSION` or `VK_VERSION_MAJOR`, were deprecated in favor of macros that include the API variant.

The original version macros were used to create and manipulate Vulkan version numbers without accounting for the API variant:

* 
`VK_MAKE_VERSION`: Created a version number from major, minor, and patch components

* 
`VK_VERSION_MAJOR`: Extracted the major version from a version number

* 
`VK_VERSION_MINOR`: Extracted the minor version from a version number

* 
`VK_VERSION_PATCH`: Extracted the patch version from a version number

* 
`VK_API_VERSION`: Created a specific API version

The replacement macros include the API variant:

* 
`VK_MAKE_API_VERSION`: Creates a version number including the variant

* 
`VK_API_VERSION_MAJOR`: Extracts the major version

* 
`VK_API_VERSION_MINOR`: Extracts the minor version

* 
`VK_API_VERSION_PATCH`: Extracts the patch version

* 
`VK_API_VERSION_VARIANT`: Extracts the variant

Instead of `VK_API_VERSION`, specific version defines (e.g., `VK_API_VERSION_1_0`) or the `VK_MAKE_API_VERSION` macro should be used.

// DEPRECATED: Using original version macros
uint32_t version = VK_MAKE_VERSION(1, 2, 0);
uint32_t major = VK_VERSION_MAJOR(version);
uint32_t minor = VK_VERSION_MINOR(version);
uint32_t patch = VK_VERSION_PATCH(version);

// Using VK_API_VERSION directly
uint32_t apiVersion = VK_API_VERSION(1, 0, 0);

// RECOMMENDED: Using API variant-aware macros
uint32_t version = VK_MAKE_API_VERSION(0, 1, 2, 0);
uint32_t variant = VK_API_VERSION_VARIANT(version);
uint32_t major = VK_API_VERSION_MAJOR(version);
uint32_t minor = VK_API_VERSION_MINOR(version);
uint32_t patch = VK_API_VERSION_PATCH(version);

// Using specific version defines
uint32_t apiVersion = VK_API_VERSION_1_0;

The original macros still work in current Vulkan implementations, but it’s recommended to use the newer macros for future compatibility. There’s no need for a complex fallback strategy as the macros are defined in the Vulkan headers and are available in all Vulkan implementations.

The original render pass functions were deprecated with the introduction of version 2 functions in Vulkan 1.2, which provide greater extensibility.

The original render pass functions were used to create and manage render passes:

* 
`vkCreateRenderPass`: Created a render pass object

* 
`vkCmdBeginRenderPass`: Began a render pass

* 
`vkCmdNextSubpass`: Advanced to the next subpass

* 
`vkCmdEndRenderPass`: Ended a render pass

The version 2 functions provide the same functionality but with greater extensibility through additional parameters and pNext chains:

* 
`vkCreateRenderPass2`: Replaces `vkCreateRenderPass`

* 
`vkCmdBeginRenderPass2`: Replaces `vkCmdBeginRenderPass`

* 
`vkCmdNextSubpass2`: Replaces `vkCmdNextSubpass`

* 
`vkCmdEndRenderPass2`: Replaces `vkCmdEndRenderPass`

Note that render pass objects themselves are further deprecated by dynamic rendering in Vulkan 1.4.

// DEPRECATED: Using original render pass functions
VkRenderPassBeginInfo renderPassBegin = {};
renderPassBegin.sType = VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO;
renderPassBegin.renderPass = renderPass;
renderPassBegin.framebuffer = framebuffer;
renderPassBegin.renderArea = {{0, 0}, {width, height}};
renderPassBegin.clearValueCount = 2;
renderPassBegin.pClearValues = clearValues;

vkCmdBeginRenderPass(commandBuffer, &renderPassBegin, VK_SUBPASS_CONTENTS_INLINE);
// Render operations...
vkCmdNextSubpass(commandBuffer, VK_SUBPASS_CONTENTS_INLINE);
// More render operations...
vkCmdEndRenderPass(commandBuffer);

// RECOMMENDED: Using version 2 render pass functions
VkRenderPassBeginInfo renderPassBegin = {};
renderPassBegin.sType = VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO;
renderPassBegin.renderPass = renderPass;
renderPassBegin.framebuffer = framebuffer;
renderPassBegin.renderArea = {{0, 0}, {width, height}};
renderPassBegin.clearValueCount = 2;
renderPassBegin.pClearValues = clearValues;

VkSubpassBeginInfo subpassBeginInfo = {};
subpassBeginInfo.sType = VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO;
subpassBeginInfo.contents = VK_SUBPASS_CONTENTS_INLINE;

VkSubpassEndInfo subpassEndInfo = {};
subpassEndInfo.sType = VK_STRUCTURE_TYPE_SUBPASS_END_INFO;

vkCmdBeginRenderPass2(commandBuffer, &renderPassBegin, &subpassBeginInfo);
// Render operations...
vkCmdNextSubpass2(commandBuffer, &subpassBeginInfo, &subpassEndInfo);
// More render operations...
vkCmdEndRenderPass2(commandBuffer, &subpassEndInfo);

To support both original and version 2 render pass functions, check for the availability of Vulkan 1.2 or the `VK_KHR_create_renderpass2` extension:

// Check if Vulkan 1.2 or VK_KHR_create_renderpass2 is supported
bool hasRenderPass2 = false;

// For device-level version check
VkPhysicalDeviceProperties properties;
vkGetPhysicalDeviceProperties(physicalDevice, &properties);
if (properties.apiVersion >= VK_API_VERSION_1_2) {
    hasRenderPass2 = true;
}

// Or check for extension if not using Vulkan 1.2
if (!hasRenderPass2) {
    uint32_t extensionCount = 0;
    vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, nullptr);
    std::vector extensions(extensionCount);
    vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, extensions.data());

    for (const auto& extension : extensions) {
        if (strcmp(extension.extensionName, VK_KHR_CREATE_RENDERPASS_2_EXTENSION_NAME) == 0) {
            hasRenderPass2 = true;
            break;
        }
    }
}

// Function to begin render pass based on available functionality
void BeginRenderPass(VkCommandBuffer commandBuffer, const VkRenderPassBeginInfo* renderPassBegin) {
    if (hasRenderPass2) {
        VkSubpassBeginInfo subpassBeginInfo = {};
        subpassBeginInfo.sType = VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO;
        subpassBeginInfo.contents = VK_SUBPASS_CONTENTS_INLINE;

        vkCmdBeginRenderPass2(commandBuffer, renderPassBegin, &subpassBeginInfo);
    } else {
        vkCmdBeginRenderPass(commandBuffer, renderPassBegin, VK_SUBPASS_CONTENTS_INLINE);
    }
}

Render pass objects (`VkRenderPass` and `VkFramebuffer`) were deprecated with the introduction of dynamic rendering in Vulkan 1.4.

Render pass objects defined the structure of rendering operations:

* 
`VkRenderPass`: Defined the structure of a render pass, including attachments and subpasses

* 
`VkFramebuffer`: Defined the specific image views to use as attachments for a render pass

These objects required applications to define the entire rendering structure upfront, which could be inflexible for some rendering techniques.

Dynamic rendering allows applications to begin and end render passes without creating `VkRenderPass` and `VkFramebuffer` objects:

* 
`vkCmdBeginRendering`: Begins a dynamic rendering pass

* 
`vkCmdEndRendering`: Ends a dynamic rendering pass

In Vulkan 1.4, `VK_KHR_dynamic_rendering_local_read` was also promoted to core, which allows the expression of most subpass functionality.

// DEPRECATED: Using render pass objects
// Create render pass
VkAttachmentDescription colorAttachment = {};
// ... set up attachment
VkAttachmentReference colorAttachmentRef = {};
colorAttachmentRef.attachment = 0;
colorAttachmentRef.layout = VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL;
VkSubpassDescription subpass = {};
subpass.pipelineBindPoint = VK_PIPELINE_BIND_POINT_GRAPHICS;
subpass.colorAttachmentCount = 1;
subpass.pColorAttachments = &colorAttachmentRef;
VkRenderPassCreateInfo renderPassInfo = {};
renderPassInfo.sType = VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO;
renderPassInfo.attachmentCount = 1;
renderPassInfo.pAttachments = &colorAttachment;
renderPassInfo.subpassCount = 1;
renderPassInfo.pSubpasses = &subpass;
VkRenderPass renderPass;
vkCreateRenderPass(device, &renderPassInfo, nullptr, &renderPass);

// Create framebuffer
VkFramebufferCreateInfo framebufferInfo = {};
framebufferInfo.sType = VK_STRUCTURE_TYPE_FRAMEBUFFER_CREATE_INFO;
framebufferInfo.renderPass = renderPass;
framebufferInfo.attachmentCount = 1;
framebufferInfo.pAttachments = &colorImageView;
framebufferInfo.width = width;
framebufferInfo.height = height;
framebufferInfo.layers = 1;
VkFramebuffer framebuffer;
vkCreateFramebuffer(device, &framebufferInfo, nullptr, &framebuffer);

// Begin render pass
VkRenderPassBeginInfo renderPassBegin = {};
renderPassBegin.sType = VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO;
renderPassBegin.renderPass = renderPass;
renderPassBegin.framebuffer = framebuffer;
renderPassBegin.renderArea = {{0, 0}, {width, height}};
renderPassBegin.clearValueCount = 1;
renderPassBegin.pClearValues = &clearValue;
vkCmdBeginRenderPass(commandBuffer, &renderPassBegin, VK_SUBPASS_CONTENTS_INLINE);
// Render operations...
vkCmdEndRenderPass(commandBuffer);

// RECOMMENDED: Using dynamic rendering
VkRenderingAttachmentInfo colorAttachmentInfo = {};
colorAttachmentInfo.sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO;
colorAttachmentInfo.imageView = colorImageView;
colorAttachmentInfo.imageLayout = VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL;
colorAttachmentInfo.loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR;
colorAttachmentInfo.storeOp = VK_ATTACHMENT_STORE_OP_STORE;
colorAttachmentInfo.clearValue = clearValue;

VkRenderingInfo renderingInfo = {};
renderingInfo.sType = VK_STRUCTURE_TYPE_RENDERING_INFO;
renderingInfo.renderArea = {{0, 0}, {width, height}};
renderingInfo.layerCount = 1;
renderingInfo.colorAttachmentCount = 1;
renderingInfo.pColorAttachments = &colorAttachmentInfo;

vkCmdBeginRendering(commandBuffer, &renderingInfo);
// Render operations...
vkCmdEndRendering(commandBuffer);

To support both render pass objects and dynamic rendering, check for the availability of Vulkan 1.4 or the `VK_KHR_dynamic_rendering` extension:

// Check if Vulkan 1.4 or VK_KHR_dynamic_rendering is supported
bool hasDynamicRendering = false;

// For device-level version check
VkPhysicalDeviceProperties properties;
vkGetPhysicalDeviceProperties(physicalDevice, &properties);
if (properties.apiVersion >= VK_API_VERSION_1_4) {
    hasDynamicRendering = true;
}

// Or check for extension if not using Vulkan 1.4
if (!hasDynamicRendering) {
    uint32_t extensionCount = 0;
    vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, nullptr);
    std::vector extensions(extensionCount);
    vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, extensions.data());

    for (const auto& extension : extensions) {
        if (strcmp(extension.extensionName, VK_KHR_DYNAMIC_RENDERING_EXTENSION_NAME) == 0) {
            hasDynamicRendering = true;
            break;
        }
    }
}

// If using dynamic rendering, need to enable the feature
if (hasDynamicRendering) {
    VkPhysicalDeviceDynamicRenderingFeatures dynamicRenderingFeatures = {};
    dynamicRenderingFeatures.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES;
    dynamicRenderingFeatures.dynamicRendering = VK_TRUE;

    VkDeviceCreateInfo createInfo = {};
    createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
    createInfo.pNext = &dynamicRenderingFeatures;
    // ... other device creation parameters
    vkCreateDevice(physicalDevice, &createInfo, nullptr, &device);
}

// Rendering function that uses appropriate method based on availability
void RenderFrame(VkCommandBuffer commandBuffer, VkImageView colorImageView, VkClearValue clearValue) {
    if (hasDynamicRendering) {
        // Use dynamic rendering
        VkRenderingAttachmentInfo colorAttachmentInfo = {};
        colorAttachmentInfo.sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO;
        colorAttachmentInfo.imageView = colorImageView;
        colorAttachmentInfo.imageLayout = VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL;
        colorAttachmentInfo.loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR;
        colorAttachmentInfo.storeOp = VK_ATTACHMENT_STORE_OP_STORE;
        colorAttachmentInfo.clearValue = clearValue;

        VkRenderingInfo renderingInfo = {};
        renderingInfo.sType = VK_STRUCTURE_TYPE_RENDERING_INFO;
        renderingInfo.renderArea = {{0, 0}, {width, height}};
        renderingInfo.layerCount = 1;
        renderingInfo.colorAttachmentCount = 1;
        renderingInfo.pColorAttachments = &colorAttachmentInfo;

        vkCmdBeginRendering(commandBuffer, &renderingInfo);
        // Render operations...
        vkCmdEndRendering(commandBuffer);
    } else {
        // Use traditional render pass
        // ... (code to use renderPass and framebuffer)
        vkCmdBeginRenderPass(commandBuffer, &renderPassBegin, VK_SUBPASS_CONTENTS_INLINE);
        // Render operations...
        vkCmdEndRenderPass(commandBuffer);
    }
}

Pipeline objects (`VkPipeline` for graphics and compute) are not formally deprecated, but when `VK_EXT_shader_object` is available they are recommended to be replaced by Shader Objects for a more flexible, modular workflow.

Pipelines encapsulate shader stages and fixed-function state into a single monolithic object created up front (e.g., via `vkCreateGraphicsPipelines` / `vkCreateComputePipelines`). They are efficient at execution time, but can be expensive to create and inflexible when frequently changing shaders or state.

Shader Objects (`VK_EXT_shader_object`) allow you to:

* 
Create shader objects directly from SPIR-V with `vkCreateShadersEXT`.

* 
Bind them per-stage at command recording time with `vkCmdBindShadersEXT`.

* 
Set most fixed-function state dynamically via existing dynamic state commands.

This “pipeline-free” approach reduces pipeline permutation explosion and can simplify hot-reloading and rapid iteration.

See also: [Shader Objects section of ways to provide spirv](ways_to_provide_spirv.adoc).

// Traditional: bind a pre-baked pipeline
vkCmdBindPipeline(cmd, VK_PIPELINE_BIND_POINT_GRAPHICS, graphicsPipeline);

// Shader Objects: create and bind shaders directly
VkShaderCreateInfoEXT vsCI{ };
vsCI.sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT;
vsCI.stage = VK_SHADER_STAGE_VERTEX_BIT;
vsCI.codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT;
vsCI.pCode = vertSpirv; // const void*
vsCI.codeSize = vertSpirvSize;

VkShaderCreateInfoEXT fsCI{ };
fsCI.sType = VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT;
fsCI.stage = VK_SHADER_STAGE_FRAGMENT_BIT;
fsCI.codeType = VK_SHADER_CODE_TYPE_SPIRV_EXT;
fsCI.pCode = fragSpirv;
fsCI.codeSize = fragSpirvSize;

VkShaderEXT shaders[2]{};
vkCreateShadersEXT(device, 1, &vsCI, nullptr, &shaders[0]);
vkCreateShadersEXT(device, 1, &fsCI, nullptr, &shaders[1]);

// Bind shaders instead of a pipeline
vkCmdBindShadersEXT(cmd, VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT, shaders);

// Set dynamic state as needed (examples)
vkCmdSetViewport(cmd, 0, 1, &viewport);
vkCmdSetScissor(cmd, 0, 1, &scissor);
// ... other dynamic states as required

// Draw as usual
vkCmdDraw(cmd, vertexCount, 1, 0, 0);

Rather than maintaining two separate code paths (one for shader objects and one for traditional pipelines), the recommended approach is to write your application using only the Shader Objects API and rely on the [`VK_LAYER_KHRONOS_shader_object` extension layer](https://github.com/KhronosGroup/Vulkan-ExtensionLayer/blob/main/docs/shader_object_layer.md) to transparently provide `VK_EXT_shader_object` support on drivers that do not natively implement it.

The extension layer translates Shader Object calls into pipeline-based operations under the hood, so your application does not need to include any pipeline fallback logic.

Write your rendering code exclusively against the Shader Objects API (`vkCreateShadersEXT`, `vkCmdBindShadersEXT`, dynamic state commands).

Enable the `VK_LAYER_KHRONOS_shader_object` layer at deployment time for platforms where native `VK_EXT_shader_object` support is not available. The layer automatically disables itself when the underlying driver already provides the extension.

// Write shader object code only — no pipeline fallback needed.
// Enable VK_EXT_shader_object at device creation time.

VkPhysicalDeviceShaderObjectFeaturesEXT shaderObjectFeatures{ };
shaderObjectFeatures.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_FEATURES_EXT;
shaderObjectFeatures.shaderObject = VK_TRUE;

VkDeviceCreateInfo devCI{ VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO };
devCI.pNext = &shaderObjectFeatures;
// add VK_EXT_shader_object to enabled extension list
// ...

vkCreateDevice(physicalDevice, &devCI, nullptr, &device);

// Record command buffers using only Shader Objects
vkCmdBindShadersEXT(cmd, VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT, shaders);
vkCmdSetViewport(cmd, 0, 1, &viewport);
vkCmdSetScissor(cmd, 0, 1, &scissor);
// ... other dynamic states as required
vkCmdDraw(cmd, vertexCount, 1, 0, 0);

|  | The extension layer requires `VK_KHR_dynamic_rendering` support on the target device. It is not currently available on Android, where `VK_KHR_dynamic_rendering` support is limited. |
| --- | --- |
