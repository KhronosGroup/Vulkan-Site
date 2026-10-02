# VkPipelineRobustnessImageBehavior(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRobustnessImageBehavior.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRobustnessImageBehavior - Enum controlling the robustness of image accesses in a pipeline stage

Possible values of the `images` member of
[VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html) are:

// Provided by VK_VERSION_1_4
typedef enum VkPipelineRobustnessImageBehavior {
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT = 0,
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED = 1,
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS = 2,
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2 = 3,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2,
} VkPipelineRobustnessImageBehavior;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPipelineRobustnessImageBehavior
typedef VkPipelineRobustnessImageBehavior VkPipelineRobustnessImageBehaviorEXT;

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT](#) specifies
that [out of bounds](../../../../spec/latest/chapters/shaders.html#shaders-execution-memory-access-bounds) image
accesses follow the behavior of robust image access features enabled for
the device.

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED](#) specifies that
image accesses **must** not be [    out of bounds](../../../../spec/latest/chapters/shaders.html#shaders-execution-memory-access-bounds).

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](#)
specifies that image accesses conform to [Robust Image Access](../../../../spec/latest/chapters/shaders.html#shaders-robust-image-access)
guarantees.

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](#)
specifies that image accesses conform to
[Robust Image Access 2](../../../../spec/latest/chapters/shaders.html#shaders-robust-image-access2) guarantees.

[VK_EXT_pipeline_robustness](VK_EXT_pipeline_robustness.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPhysicalDevicePipelineRobustnessProperties](VkPhysicalDevicePipelineRobustnessProperties.html), [VkPhysicalDeviceVulkan14Properties](VkPhysicalDeviceVulkan14Properties.html), [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineRobustnessImageBehavior).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
