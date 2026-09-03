# VkPushDescriptorSetInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPushDescriptorSetInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPushDescriptorSetInfo - Structure specifying a descriptor set push operation

The `VkPushDescriptorSetInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPushDescriptorSetInfo {
    VkStructureType                sType;
    const void*                    pNext;
    VkShaderStageFlags             stageFlags;
    VkPipelineLayout               layout;
    uint32_t                       set;
    uint32_t                       descriptorWriteCount;
    const VkWriteDescriptorSet*    pDescriptorWrites;
} VkPushDescriptorSetInfo;

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to VkPushDescriptorSetInfo
typedef VkPushDescriptorSetInfo VkPushDescriptorSetInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) specifying
the shader stages that will use the descriptors.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.
If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)
structure off the `pNext`

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.

* 
`descriptorWriteCount` is the number of elements in the
`pDescriptorWrites` array.

* 
`pDescriptorWrites` is a pointer to an array of
[VkWriteDescriptorSet](VkWriteDescriptorSet.html) structures describing the descriptors to be
updated.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) | [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) |
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html).

Valid Usage

* 
[](#VUID-VkPushDescriptorSetInfo-set-00364) VUID-VkPushDescriptorSetInfo-set-00364

`set` **must** be less than
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkPushDescriptorSetInfo-set-00365) VUID-VkPushDescriptorSetInfo-set-00365

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkPushDescriptorSetInfo-pDescriptorWrites-06494) VUID-VkPushDescriptorSetInfo-pDescriptorWrites-06494

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html),
`pDescriptorWrites`[i].`pImageInfo` **must** be a valid pointer to
an array of `pDescriptorWrites`[i].`descriptorCount` valid
`VkDescriptorImageInfo` structures

* 
[](#VUID-VkPushDescriptorSetInfo-None-09495) VUID-VkPushDescriptorSetInfo-None-09495

If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkPushDescriptorSetInfo-layout-09496) VUID-VkPushDescriptorSetInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkPushDescriptorSetInfo-sType-sType) VUID-VkPushDescriptorSetInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO](VkStructureType.html)

* 
[](#VUID-VkPushDescriptorSetInfo-pNext-pNext) VUID-VkPushDescriptorSetInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)

* 
[](#VUID-VkPushDescriptorSetInfo-sType-unique) VUID-VkPushDescriptorSetInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushDescriptorSetInfo-stageFlags-parameter) VUID-VkPushDescriptorSetInfo-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkPushDescriptorSetInfo-stageFlags-requiredbitmask) VUID-VkPushDescriptorSetInfo-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkPushDescriptorSetInfo-layout-parameter) VUID-VkPushDescriptorSetInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkPushDescriptorSetInfo-pDescriptorWrites-parameter) VUID-VkPushDescriptorSetInfo-pDescriptorWrites-parameter

 `pDescriptorWrites` **must** be a valid pointer to an array of `descriptorWriteCount` valid [VkWriteDescriptorSet](VkWriteDescriptorSet.html) structures

* 
[](#VUID-VkPushDescriptorSetInfo-descriptorWriteCount-arraylength) VUID-VkPushDescriptorSetInfo-descriptorWriteCount-arraylength

 `descriptorWriteCount` **must** be greater than `0`

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineLayout](VkPipelineLayout.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [VkWriteDescriptorSet](VkWriteDescriptorSet.html), [vkCmdPushDescriptorSet2](vkCmdPushDescriptorSet2.html), [vkCmdPushDescriptorSet2](vkCmdPushDescriptorSet2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPushDescriptorSetInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
