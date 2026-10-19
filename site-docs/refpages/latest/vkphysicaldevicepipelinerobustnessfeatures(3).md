# VkPhysicalDevicePipelineRobustnessFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePipelineRobustnessFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePipelineRobustnessFeatures - Structure describing whether an implementation supports robustness requests on a per-pipeline stage granularity

The `VkPhysicalDevicePipelineRobustnessFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePipelineRobustnessFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineRobustness;
} VkPhysicalDevicePipelineRobustnessFeatures;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPhysicalDevicePipelineRobustnessFeatures
typedef VkPhysicalDevicePipelineRobustnessFeatures VkPhysicalDevicePipelineRobustnessFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pipelineRobustness`
indicates that robustness **can** be requested on a per-pipeline-stage
granularity.

|  | Enabling the [`pipelineRobustness`](../../../../spec/latest/chapters/features.html#features-pipelineRobustness)
| --- | --- |
feature may, on some platforms, incur a minor performance cost when the
[`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) feature is not
enabled, even for pipelines which do not make use of any robustness
features.
If robustness is not needed, the [`pipelineRobustness`](../../../../spec/latest/chapters/features.html#features-pipelineRobustness) feature should not be enabled by an application. |

If the `VkPhysicalDevicePipelineRobustnessFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePipelineRobustnessFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineRobustnessFeatures-sType-sType) VUID-VkPhysicalDevicePipelineRobustnessFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_pipeline_robustness](VK_EXT_pipeline_robustness.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePipelineRobustnessFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
