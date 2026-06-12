# VkBindDescriptorBufferEmbeddedSamplersInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindDescriptorBufferEmbeddedSamplersInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindDescriptorBufferEmbeddedSamplersInfoEXT - Structure specifying embedded immutable sampler offsets to set in a command buffer

The `VkBindDescriptorBufferEmbeddedSamplersInfoEXT` structure is defined
as:

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
typedef struct VkBindDescriptorBufferEmbeddedSamplersInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkShaderStageFlags    stageFlags;
    VkPipelineLayout      layout;
    uint32_t              set;
} VkBindDescriptorBufferEmbeddedSamplersInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) specifying
the shader stages that will use the embedded immutable samplers.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.
If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)
structure off the `pNext`

* 
`set` is the number of the set to be bound.

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
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08070) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08070

The [VkDescriptorSetLayout](VkDescriptorSetLayout.html) at index `set` when `layout` was
created **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)
bit set

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08071) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08071

`set` **must** be less than or equal to
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-None-09495) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-None-09495

If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-09496) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-09496

If `layout` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-sType) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_BUFFER_EMBEDDED_SAMPLERS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-pNext-pNext) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-unique) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-parameter) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-requiredbitmask) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-parameter) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VkPipelineLayout](VkPipelineLayout.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [vkCmdBindDescriptorBufferEmbeddedSamplers2EXT](vkCmdBindDescriptorBufferEmbeddedSamplers2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkBindDescriptorBufferEmbeddedSamplersInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
