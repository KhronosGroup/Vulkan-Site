# VkPushConstantsInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPushConstantsInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPushConstantsInfo - Structure specifying a push constant update operation

The `VkPushConstantsInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPushConstantsInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkPipelineLayout      layout;
    VkShaderStageFlags    stageFlags;
    uint32_t              offset;
    uint32_t              size;
    const void*           pValues;
} VkPushConstantsInfo;

// Provided by VK_KHR_maintenance6
// Equivalent to VkPushConstantsInfo
typedef VkPushConstantsInfo VkPushConstantsInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`layout` is the pipeline layout used to program the push constant
updates.
If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)
structure off the `pNext`

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) specifying
the shader stages that will use the push constants in the updated range.

* 
`offset` is the start offset of the push constant range to update,
in units of bytes.

* 
`size` is the size of the push constant range to update, in units of
bytes.

* 
`pValues` is a pointer to an array of `size` bytes containing
the new push constant values.

Valid Usage

* 
[](#VUID-VkPushConstantsInfo-offset-01795) VUID-VkPushConstantsInfo-offset-01795

For each byte in the range specified by `offset` and `size` and
for each shader stage in `stageFlags`, there **must** be a push
constant range in `layout` that includes that byte and that stage

* 
[](#VUID-VkPushConstantsInfo-offset-01796) VUID-VkPushConstantsInfo-offset-01796

For each byte in the range specified by `offset` and `size` and
for each push constant range that overlaps that byte, `stageFlags`
**must** include all stages in that push constant range’s
[VkPushConstantRange](VkPushConstantRange.html)::`stageFlags`

* 
[](#VUID-VkPushConstantsInfo-offset-00368) VUID-VkPushConstantsInfo-offset-00368

`offset` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantsInfo-size-00369) VUID-VkPushConstantsInfo-size-00369

`size` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantsInfo-offset-00370) VUID-VkPushConstantsInfo-offset-00370

`offset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-VkPushConstantsInfo-size-00371) VUID-VkPushConstantsInfo-size-00371

`size` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`offset`

* 
[](#VUID-VkPushConstantsInfo-None-09495) VUID-VkPushConstantsInfo-None-09495

If the [`dynamicPipelineLayout`](../../../../spec/latest/chapters/features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkPushConstantsInfo-layout-09496) VUID-VkPushConstantsInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkPushConstantsInfo-sType-sType) VUID-VkPushConstantsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO](VkStructureType.html)

* 
[](#VUID-VkPushConstantsInfo-pNext-pNext) VUID-VkPushConstantsInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) or [VkPushConstantBankInfoNV](VkPushConstantBankInfoNV.html)

* 
[](#VUID-VkPushConstantsInfo-sType-unique) VUID-VkPushConstantsInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushConstantsInfo-layout-parameter) VUID-VkPushConstantsInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkPushConstantsInfo-stageFlags-parameter) VUID-VkPushConstantsInfo-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkPushConstantsInfo-stageFlags-requiredbitmask) VUID-VkPushConstantsInfo-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkPushConstantsInfo-pValues-parameter) VUID-VkPushConstantsInfo-pValues-parameter

 `pValues` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-VkPushConstantsInfo-size-arraylength) VUID-VkPushConstantsInfo-size-arraylength

 `size` **must** be greater than `0`

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineLayout](VkPipelineLayout.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html), [vkCmdPushConstants2](vkCmdPushConstants2.html), [vkCmdPushConstants2](vkCmdPushConstants2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkPushConstantsInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
