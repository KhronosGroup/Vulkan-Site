# VkPipelineRobustnessBufferBehavior(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRobustnessBufferBehavior.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRobustnessBufferBehavior - Enum controlling the robustness of buffer accesses in a pipeline stage

Possible values of the `storageBuffers`, `uniformBuffers`, and
`vertexInputs` members of [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html) are:

// Provided by VK_VERSION_1_4
typedef enum VkPipelineRobustnessBufferBehavior {
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT = 0,
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED = 1,
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS = 2,
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2 = 3,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2,
} VkPipelineRobustnessBufferBehavior;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPipelineRobustnessBufferBehavior
typedef VkPipelineRobustnessBufferBehavior VkPipelineRobustnessBufferBehaviorEXT;

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](#) specifies
that [out of bounds](../../../../spec/latest/chapters/shaders.html#shaders-execution-memory-access-bounds) buffer
accesses follow the behavior of robust buffer access features enabled
for the device.

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED](#) specifies that
buffer accesses **must** not be [    out of bounds](../../../../spec/latest/chapters/shaders.html#shaders-execution-memory-access-bounds).

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](#)
specifies that buffer accesses conform to
[Robust Buffer Access](../../../../spec/latest/chapters/shaders.html#shaders-robust-buffer-access) guarantees.

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#)
specifies that buffer accesses conform to
[Robust Buffer Access 2](../../../../spec/latest/chapters/shaders.html#shaders-robust-buffer-access2) guarantees.

[VK_EXT_pipeline_robustness](VK_EXT_pipeline_robustness.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPhysicalDevicePipelineRobustnessProperties](VkPhysicalDevicePipelineRobustnessProperties.html), [VkPhysicalDeviceVulkan14Properties](VkPhysicalDeviceVulkan14Properties.html), [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineRobustnessBufferBehavior).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
