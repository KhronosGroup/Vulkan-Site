# VkPushConstantRange(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPushConstantRange.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPushConstantRange - Structure specifying a push constant range

The `VkPushConstantRange` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPushConstantRange {
    VkShaderStageFlags    stageFlags;
    uint32_t              offset;
    uint32_t              size;
} VkPushConstantRange;

* 
`stageFlags` is a set of stage flags describing the shader stages
that will access a range of push constants.
If a particular stage is not included in the range, then accessing
members of that range of push constants from the corresponding shader
stage will return **undefined** values.

* 
`offset` and `size` are the start offset and size, respectively,
consumed by the range.
Both `offset` and `size` are in units of bytes and **must** be a
multiple of 4.
The layout of the push constant variables is specified in the shader.

Valid Usage

* 
[](#VUID-VkPushConstantRange-offset-00294) VUID-VkPushConstantRange-offset-00294

`offset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-VkPushConstantRange-offset-00295) VUID-VkPushConstantRange-offset-00295

`offset` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantRange-size-00296) VUID-VkPushConstantRange-size-00296

`size` **must** be greater than `0`

* 
[](#VUID-VkPushConstantRange-size-00297) VUID-VkPushConstantRange-size-00297

`size` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantRange-size-00298) VUID-VkPushConstantRange-size-00298

`size` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`offset`

Valid Usage (Implicit)

* 
[](#VUID-VkPushConstantRange-stageFlags-parameter) VUID-VkPushConstantRange-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkPushConstantRange-stageFlags-requiredbitmask) VUID-VkPushConstantRange-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkIndirectCommandsPushConstantTokenEXT](VkIndirectCommandsPushConstantTokenEXT.html), [VkIndirectExecutionSetShaderInfoEXT](VkIndirectExecutionSetShaderInfoEXT.html), [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html), [VkShaderStageFlags](VkShaderStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPushConstantRange).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
