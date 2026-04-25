# VkPhysicalDevicePipelineRobustnessProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePipelineRobustnessProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePipelineRobustnessProperties - Structure describing the default robustness behavior of a physical device

The `VkPhysicalDevicePipelineRobustnessProperties` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePipelineRobustnessProperties {
    VkStructureType                       sType;
    void*                                 pNext;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessStorageBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessUniformBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessVertexInputs;
    VkPipelineRobustnessImageBehavior     defaultRobustnessImages;
} VkPhysicalDevicePipelineRobustnessProperties;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPhysicalDevicePipelineRobustnessProperties
typedef VkPhysicalDevicePipelineRobustnessProperties VkPhysicalDevicePipelineRobustnessPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`defaultRobustnessStorageBuffers` describes the behavior of out of
bounds accesses made to storage buffers when no robustness features are
enabled

* 
`defaultRobustnessUniformBuffers` describes the behavior of out of
bounds accesses made to uniform buffers when no robustness features are
enabled

* 
`defaultRobustnessVertexInputs` describes the behavior of out of
bounds accesses made to vertex input attributes when no robustness
features are enabled

* 
`defaultRobustnessImages` describes the behavior of out of bounds
accesses made to images when no robustness features are enabled

Some implementations of Vulkan may be able to guarantee that certain types
of accesses are always performed with robustness even when the Vulkan API’s
robustness features are not explicitly enabled.

Even when an implementation reports that accesses to a given resource type
are robust by default, it remains invalid to make an out of bounds access
without requesting the appropriate robustness feature.

If the `VkPhysicalDevicePipelineRobustnessProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineRobustnessProperties-sType-sType) VUID-VkPhysicalDevicePipelineRobustnessProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_pipeline_robustness](VK_EXT_pipeline_robustness.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html), [VkPipelineRobustnessImageBehavior](VkPipelineRobustnessImageBehavior.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDevicePipelineRobustnessProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
