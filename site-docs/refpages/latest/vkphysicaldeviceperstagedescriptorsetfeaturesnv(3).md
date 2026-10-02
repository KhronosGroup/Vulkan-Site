# VkPhysicalDevicePerStageDescriptorSetFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePerStageDescriptorSetFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePerStageDescriptorSetFeaturesNV - Structure describing feature to allow descriptor set layout bindings to be per-stage

The `VkPhysicalDevicePerStageDescriptorSetFeaturesNV` structure is
defined as:

// Provided by VK_NV_per_stage_descriptor_set
typedef struct VkPhysicalDevicePerStageDescriptorSetFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           perStageDescriptorSet;
    VkBool32           dynamicPipelineLayout;
} VkPhysicalDevicePerStageDescriptorSetFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `perStageDescriptorSet` indicates
that the implementation allows the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](VkDescriptorSetLayoutCreateFlagBits.html) descriptor set
layout creation flag to be used so the bindings are specified per-stage
rather than across all stages.

* 
 `dynamicPipelineLayout` indicates
the implementation allows the `layout` member of
[VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html), [VkPushConstantsInfo](VkPushConstantsInfo.html),
[VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html),
[VkPushDescriptorSetWithTemplateInfo](VkPushDescriptorSetWithTemplateInfo.html),
[VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html) and
[VkBindDescriptorBufferEmbeddedSamplersInfoEXT](VkBindDescriptorBufferEmbeddedSamplersInfoEXT.html) to be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) and [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) **can** be
chained off those structures' `pNext` instead.

If the `VkPhysicalDevicePerStageDescriptorSetFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePerStageDescriptorSetFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerStageDescriptorSetFeaturesNV-sType-sType) VUID-VkPhysicalDevicePerStageDescriptorSetFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PER_STAGE_DESCRIPTOR_SET_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_per_stage_descriptor_set](VK_NV_per_stage_descriptor_set.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePerStageDescriptorSetFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
