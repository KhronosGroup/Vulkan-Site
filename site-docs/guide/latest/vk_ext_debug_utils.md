# VK_EXT_debug_utils

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/extensions/VK_EXT_debug_utils.html

## Table of Contents

- [Overview](#_overview)
- [Debug Messenger](#_debug_messenger)
- [Creating a Debug Messenger](#_creating_a_debug_messenger)
- [Creating_a_Debug_Messenger](#_creating_a_debug_messenger)
- [Object Naming](#_object_naming)
- [Debug Markers and Regions](#_debug_markers_and_regions)
- [Debug_Markers_and_Regions](#_debug_markers_and_regions)
- [Debug Regions](#_debug_regions)
- [Debug Region Stack](#_debug_region_stack)
- [Debug_Region_Stack](#_debug_region_stack)
- [Inserting Debug Markers](#_inserting_debug_markers)
- [Inserting_Debug_Markers](#_inserting_debug_markers)
- [Queue Labels](#_queue_labels)
- [Best Practices](#_best_practices)
- [When to Use Debug Utils](#_when_to_use_debug_utils)
- [When_to_Use_Debug_Utils](#_when_to_use_debug_utils)
- [Naming Conventions](#_naming_conventions)
- [Integration with External Tools](#_integration_with_external_tools)
- [Integration_with_External_Tools](#_integration_with_external_tools)
- [Using Debugging Tools with VK_EXT_debug_utils](#_using_debugging_tools_with_vk_ext_debug_utils)
- [Using_Debugging_Tools_with_VK_EXT_debug_utils](#_using_debugging_tools_with_vk_ext_debug_utils)
- [RenderDoc Overview](#_renderdoc_overview)
- [Setting Up RenderDoc with Vulkan](#_setting_up_renderdoc_with_vulkan)
- [Setting_Up_RenderDoc_with_Vulkan](#_setting_up_renderdoc_with_vulkan)
- [Capturing Frames](#_capturing_frames)
- [Analyzing Captured Frames](#_analyzing_captured_frames)
- [Analyzing_Captured_Frames](#_analyzing_captured_frames)
- [Event Browser](#_event_browser)
- [Pipeline State](#_pipeline_state)
- [Resource Inspector](#_resource_inspector)
- [Common Debugging Workflows](#_common_debugging_workflows)
- [Common_Debugging_Workflows](#_common_debugging_workflows)
- [Best Practices for Debugging with RenderDoc](#_best_practices_for_debugging_with_renderdoc)
- [Best_Practices_for_Debugging_with_RenderDoc](#_best_practices_for_debugging_with_renderdoc)
- [Comparison with VK_EXT_debug_report](#_comparison_with_vk_ext_debug_report)
- [Comparison_with_VK_EXT_debug_report](#_comparison_with_vk_ext_debug_report)
- [Migrating from VK_EXT_debug_report to VK_EXT_debug_utils](#_migrating_from_vk_ext_debug_report_to_vk_ext_debug_utils)
- [Migrating_from_VK_EXT_debug_report_to_VK_EXT_debug_utils](#_migrating_from_vk_ext_debug_report_to_vk_ext_debug_utils)
- [Enabling the Extension](#_enabling_the_extension)
- [Enabling_the_Extension](#_enabling_the_extension)
- [Creating a Debug Callback](#_creating_a_debug_callback)
- [Creating_a_Debug_Callback](#_creating_a_debug_callback)
- [Mapping Message Severity](#_mapping_message_severity)
- [Mapping_Message_Severity](#_mapping_message_severity)
- [Conclusion](#_conclusion)

## Content

The `VK_EXT_debug_utils` extension provides developers with a powerful set of tools for debugging Vulkan applications. This extension allows for attaching debug information to Vulkan objects, setting up debug messengers for receiving validation messages, and inserting debug markers and labels to help identify specific operations in debugging tools.

Debugging GPU applications can be challenging due to the asynchronous nature of GPU execution. The `VK_EXT_debug_utils` extension helps bridge this gap by providing mechanisms to:

* 
Label Vulkan objects with debug names

* 
Insert debug markers in command buffers

* 
Add debug regions to command buffers

* 
Receive debug messages through callbacks

These features are particularly useful when working with external debugging tools like RenderDoc, NVIDIA Nsight, or AMD Radeon GPU Profiler, as they can display these debug annotations to help developers identify specific parts of their rendering pipeline.

The debug messenger is the core component for receiving validation and debug messages from the Vulkan implementation. It allows applications to be notified of validation layer messages, performance warnings, and other debug information.

|  | See [Validation Layer Custom Callback](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/error_messages.md#custom-callback) for more details about the debug callback. |
| --- | --- |

// Custom callback function for handling debug messages
VKAPI_ATTR VkBool32 VKAPI_CALL debugCallback(
    VkDebugUtilsMessageSeverityFlagBitsEXT messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT messageType,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData,
    void* pUserData) {

    std::cerr pMessage pMessageIdName, "VUID-vkCmdDraw-magFilter-04553") != NULL) {
        return VK_FALSE;
    }

    return VK_FALSE; // if true, call will NOT be sent down to the driver
}

VkDebugUtilsMessengerCreateInfoEXT createInfo{};
createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT;
createInfo.messageSeverity =
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT |
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT |
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT;
createInfo.messageType =
    VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT |
    VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT |
    VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT;
createInfo.pfnUserCallback = debugCallback;
createInfo.pUserData = nullptr; // Optional user data

VkDebugUtilsMessengerEXT debugMessenger;
if (vkCreateDebugUtilsMessengerEXT(instance, &createInfo, nullptr, &debugMessenger) != VK_SUCCESS) {
    throw std::runtime_error("Failed to set up debug messenger!");
}

// Don't forget to clean up after
void OnDestroy() {
    vkDestroyDebugUtilsMessengerEXT(instance, messenger, pAllocator);
}

One of the **most** useful features of the extension is the ability to assign names to Vulkan objects. This makes it much easier to identify objects in validation messages and debugging tools.

VkBuffer buffer = engine.CreateBuffer();

VkDebugUtilsObjectNameInfoEXT nameInfo{};
nameInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_NAME_INFO_EXT;
nameInfo.objectType = VK_OBJECT_TYPE_BUFFER;
nameInfo.objectHandle = (uint64_t)buffer;
nameInfo.pObjectName = "My Vertex Buffer";

vkSetDebugUtilsObjectNameEXT(device, &nameInfo);

It is that simple! When you create your Vulkan handles, to just add the `vkSetDebugUtilsObjectNameEXT` call to it right away.

Debug markers and regions allow you to annotate command buffer operations, making it easier to identify specific operations in debugging tools.

Debug regions allow you to group a set of commands together, which can be invaluable for identifying specific passes or stages in your rendering pipeline.

// Begin a debug region
void CmdBeginDebugRegion(
    VkCommandBuffer commandBuffer,
    const char* regionName,
    const float color[4]) {

    VkDebugUtilsLabelEXT labelInfo{};
    labelInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT;
    labelInfo.pLabelName = regionName;
    // Optional colors, not all tools will make use of this
    memcpy(labelInfo.color, color, sizeof(float) * 4);

    vkCmdBeginDebugUtilsLabelEXT(commandBuffer, &labelInfo);
}

// Example usage
float shadowPassColor[4] = {0.0f, 0.0f, 0.0f, 1.0f}; // Black color
CmdBeginDebugRegion(commandBuffer, "Shadow Pass", shadowPassColor);
// Record shadow pass commands...
vkCmdEndDebugUtilsLabelEXT(commandBuffer);

float geometryPassColor[4] = {0.0f, 1.0f, 0.0f, 1.0f}; // Green color
CmdBeginDebugRegion(commandBuffer, "Geometry Pass", geometryPassColor);
// Record geometry pass commands...
vkCmdEndDebugUtilsLabelEXT(commandBuffer);

The calls to `vkCmdBeginDebugUtilsLabelEXT`/`vkCmdEndDebugUtilsLabelEXT` are stack based, tools will append the various regions in when reporting a messsage.

// Region: []
vkCmdBeginDebugUtilsLabelEXT("AAA");
// Region: ["AAA"]
vkCmdBeginDebugUtilsLabelEXT("BBB");
// Region: ["AAA", "BBB"]
vkCmdEndDebugUtilsLabelEXT();
// Region: ["AAA"]
vkCmdBeginDebugUtilsLabelEXT("CCC");
// Region: ["AAA", "CCC"]
vkCmdEndDebugUtilsLabelEXT();
// Region: ["AAA"]
vkCmdEndDebugUtilsLabelEXT();
// Region: []

While the `Begin`/`End` are great for marking a region, you might want to mark an event on the timeline, this is where `Insert` is useful.

To showcase this, if you go

for (int i = 0; i 

you will get a 4 small regions which can quickly turn into a lot of micro folding in an UI. Instead if you go

for (int i = 0; i 

The UI will now just display a single element instead of a range for each item

![VK_EXT_debug_utils_being_end_insert.png](../_images/extensions/VK_EXT_debug_utils_being_end_insert.png)

|  | Tools like the Validation Layers will **not** make use of an insert as it needs a range when printing the error message |
| --- | --- |

// Insert a debug marker into a command buffer
void CmdInsertDebugMarker(
    VkCommandBuffer commandBuffer,
    const char* markerName,
    const float color[4]) {

    VkDebugUtilsLabelEXT markerInfo{};
    markerInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT;
    markerInfo.pLabelName = markerName;
    // Optional colors, not all tools will make use of this
    memcpy(markerInfo.color, color, sizeof(float) * 4);

    vkCmdInsertDebugUtilsLabelEXT(commandBuffer, &markerInfo);
}

// Example usage
float color[4] = {1.0f, 0.0f, 0.0f, 1.0f}; // Red color
CmdInsertDebugMarker(commandBuffer, "Important Draw Call", color);

Similar to command buffer markers, you can also label queue operations:

// Begin a queue label
void QueueBeginDebugRegion(
    VkQueue queue,
    const char* regionName,
    const float color[4]) {

    VkDebugUtilsLabelEXT labelInfo{};
    labelInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT;
    labelInfo.pLabelName = regionName;
    // Optional colors, not all tools will make use of this
    memcpy(labelInfo.color, color, sizeof(float) * 4);

    vkQueueBeginDebugUtilsLabelEXT(queue, &labelInfo);
}

// Insert a queue label
void QueueInsertDebugMarker(
    VkQueue queue,
    const char* markerName,
    const float color[4]) {

    VkDebugUtilsLabelEXT markerInfo{};
    markerInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT;
    markerInfo.pLabelName = markerName;
    // Optional colors, not all tools will make use of this
    memcpy(markerInfo.color, color, sizeof(float) * 4);

    vkQueueInsertDebugUtilsLabelEXT(queue, &markerInfo);
}

// End a queue label
vkQueueEndDebugUtilsLabelEXT(queue);

* 
**Development and Debugging**: Always enable debug utils during development to help identify and fix issues.

* 
**Performance Testing**: Disable debug utils for performance testing, as they can introduce overhead.

* 
**Release Builds**: Remove or disable debug utils in release builds to avoid unnecessary overhead.

Establish consistent naming conventions for your debug labels to make them more useful:

* 
Use hierarchical naming for related objects (e.g., "Scene/Characters/Hero/Mesh")

* 
Include type information in names (e.g., "VertexBuffer: Characters")

* 
For debug regions, name them after the rendering pass or operation they represent

Many external debugging tools support `VK_EXT_debug_utils` annotations:

* 
**Validation Layesr**: Displays names and regions in error messages

* 
**RenderDoc**: Displays debug markers and regions in its event timeline

* 
**NVIDIA Nsight**: Shows debug labels in its frame debugger

* 
**AMD Radeon GPU Profiler**: Uses debug regions to organize GPU workloads

The `VK_EXT_debug_utils` extension becomes even more powerful when used in conjunction with external debugging tools. This section focuses on using RenderDoc, one of the most popular graphics debugging tools, with Vulkan applications.

RenderDoc is an open-source graphics debugging tool that allows developers to capture and analyze frames from their applications. It supports Vulkan and can display debug markers, object names, and regions that were set using the `VK_EXT_debug_utils` extension.

To use RenderDoc with your Vulkan application:

Download and install RenderDoc from the official website: [https://renderdoc.org/](https://renderdoc.org/)

Launch RenderDoc

Either:

* 
Launch your application through RenderDoc by clicking "Launch Application" and selecting your executable

* 
Inject RenderDoc into an already running application by clicking "Inject into Process"

|  | RenderDoc can also be integrated directly into your application using its in-application API, which allows you to programmatically trigger captures. |
| --- | --- |

Once your application is running with RenderDoc:

Press F12 (default hotkey) or click the "Capture Frame" button to capture the current frame

The captured frame will appear in the "Captures" panel

Double-click on the capture to open it for analysis

RenderDoc provides several views to analyze a captured frame:

The Event Browser shows all Vulkan API calls in the captured frame. If you’ve used debug markers and regions with `VK_EXT_debug_utils`, they will appear in this timeline, making it easier to identify specific parts of your rendering pipeline.

Debug regions (created with `vkCmdBeginDebugUtilsLabelEXT` and `vkCmdEndDebugUtilsLabelEXT`) appear as collapsible sections in the Event Browser, and debug markers (created with `vkCmdInsertDebugUtilsLabelEXT`) appear as individual events.

The Pipeline State view shows the current state of the graphics pipeline at the selected event. Object names set with `vkSetDebugUtilsObjectNameEXT` will be displayed here, making it easier to identify resources.

The Resource Inspector allows you to examine the contents of buffers, textures, and other resources. Named objects are easier to find in the resource list.

Here are some common workflows for debugging Vulkan applications with RenderDoc:

**Identifying rendering issues**:

* 
Capture a frame

* 
Use the Event Browser to locate the draw call with the issue

* 
Examine the Pipeline State to check shader bindings, vertex inputs, and render states

* 
Use the Texture Viewer to see the output at each stage

**Tracking down resource issues**:

* 
Use object naming to identify resources in the Resource Inspector

* 
Check buffer contents and image data

* 
Verify that resources are being updated correctly

**Optimizing performance**:

* 
Use debug regions to mark different passes in your renderer

* 
Compare the time taken by different regions

* 
Look for redundant state changes or unnecessary work

**Debugging shader issues**:

* 
Select a draw call in the Event Browser

* 
Go to the Shader Viewer

* 
Inspect input and output variables

* 
Step through shader execution if needed

**Use meaningful names for debug markers and regions**:

* 
Name regions after rendering passes (e.g., "Shadow Pass", "Geometry Pass")

* 
Use hierarchical naming for nested regions

* 
Include relevant information in marker names (e.g., "Drawing Character #42")

**Name important objects**:

* 
Give descriptive names to framebuffers, render passes, pipelines, and other key resources

* 
Include purpose and type information in names (e.g., "Main Scene Depth Buffer")

**Structure your rendering code with debugging in mind**:

* 
Wrap logical groups of commands in debug regions

* 
Insert markers at key points

* 
Consider using different colors for different types of operations

**Be selective with captures**:

* 
Capturing frames with complex scenes can result in large capture files

* 
Focus on specific frames that demonstrate the issue you’re investigating

* 
Use the in-application API to capture specific frames programmatically

The `VK_EXT_debug_utils` extension is the successor to the older `VK_EXT_debug_report` extension. It provides several advantages:

* 
More detailed message information

* 
Object naming capabilities

* 
Command buffer and queue labeling

* 
Debug regions for grouping operations

* 
More granular message filtering

If you’re currently using `VK_EXT_debug_report`, it’s recommended to migrate to `VK_EXT_debug_utils` for these enhanced debugging capabilities.

This section provides guidance on how to migrate from the older `VK_EXT_debug_report` extension to the newer and more feature-rich `VK_EXT_debug_utils` extension.

First, you need to enable the `VK_EXT_debug_utils` extension instead of `VK_EXT_debug_report`:

// Old way with VK_EXT_debug_report
const char* extensions[] = { "VK_EXT_debug_report", ... };

// New way with VK_EXT_debug_utils
const char* extensions[] = { "VK_EXT_debug_utils", ... };

Replace `vkCreateDebugReportCallbackEXT`/`vkDestroyDebugReportCallbackEXT` with `vkCreateDebugUtilsMessengerEXT`/`vkDestroyDebugUtilsMessengerEXT`

The message severity flags have been renamed and expanded:

Mapping between the two:

* 
`VK_DEBUG_REPORT_INFORMATION_BIT_EXT` → `VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT`

* 
`VK_DEBUG_REPORT_WARNING_BIT_EXT` → `VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT`

* 
`VK_DEBUG_REPORT_PERFORMANCE_WARNING_BIT_EXT` → `VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT` with `VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT`

* 
`VK_DEBUG_REPORT_ERROR_BIT_EXT` → `VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT`

* 
`VK_DEBUG_REPORT_DEBUG_BIT_EXT` → `VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT`

The `VK_EXT_debug_utils` extension represents a significant advancement in Vulkan debugging capabilities. By providing a comprehensive set of tools for object naming, command annotation, and validation feedback, it addresses critical challenges in GPU application development.

Integration of this extension into development workflows yields tangible benefits:

* 
Enhanced error identification through detailed validation messages

* 
Reduced debugging time via precise object and operation labeling

* 
Improved collaboration through standardized debugging annotations

* 
Seamless integration with industry-standard graphics debugging tools

For production-grade Vulkan applications, implementing `VK_EXT_debug_utils` should be considered an essential practice rather than an optional enhancement. The minimal runtime overhead during development is far outweighed by the significant productivity gains in complex graphics pipeline troubleshooting.
