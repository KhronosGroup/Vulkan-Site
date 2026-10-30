# VK_HUAWEI_invocation_mask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_HUAWEI_invocation_mask.html

## Table of Contents

- [Name](#_name)
- [VK_HUAWEI_invocation_mask](#VK_HUAWEI_invocation_mask)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_HUAWEI_invocation_mask - device extension

**Name String**

`VK_HUAWEI_invocation_mask`

**Extension Type**

Device extension

**Registered Extension Number**

371

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

     or

     [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Pan Gao [PanGao-h](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_HUAWEI_invocation_mask] @PanGao-h%0A*Here describe the issue or question you have about the VK_HUAWEI_invocation_mask extension*)

**Extension Proposal**

[VK_HUAWEI_invocation_mask](../../../../features/latest/features/proposals/VK_HUAWEI_invocation_mask.html)

**Last Modified Date**

2021-05-27

**Interactions and External Dependencies**

* 
This extension requires `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)`, which
allow to bind an invocation mask image before the ray tracing command

* 
This extension requires `[VK_KHR_synchronization2](VK_KHR_synchronization2.html)`, which allows
new pipeline stage for the invocation mask image

**Contributors**

* 
Yunpeng Zhu

* 
Juntao Li, Huawei

* 
Liang Chen, Huawei

* 
Shaozhuang Shi, Huawei

* 
Hailong Chu, Huawei

The rays to trace may be sparse in some use cases.
For example, the scene only have a few regions to reflect.
Providing an invocation mask image to the ray tracing commands could
potentially give the hardware the hint to do certain optimization without
invoking an additional pass to compact the ray buffer.

* 
[vkCmdBindInvocationMaskHUAWEI](vkCmdBindInvocationMaskHUAWEI.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceInvocationMaskFeaturesHUAWEI](VkPhysicalDeviceInvocationMaskFeaturesHUAWEI.html)

* 
`VK_HUAWEI_INVOCATION_MASK_EXTENSION_NAME`

* 
`VK_HUAWEI_INVOCATION_MASK_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](VkImageUsageFlagBits.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INVOCATION_MASK_FEATURES_HUAWEI](VkStructureType.html)

RT mask is updated before each traceRay.

Step 1.
Generate InvocationMask.

//the rt mask image bind as color attachment in the fragment shader
Layout(location = 2) out vec4 outRTmask
vec4 mask = vec4(x,x,x,x);
outRTmask = mask;

Step 2.
traceRay with InvocationMask

vkCmdBindPipeline(
    commandBuffers[imageIndex],
    VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR, m_rtPipeline);
    vkCmdBindDescriptorSets(commandBuffers[imageIndex],
    VK_PIPELINE_BIND_POINT_RAY_TRACING_NV,
    m_rtPipelineLayout, 0, 1, &m_rtDescriptorSet,
    0, nullptr);

vkCmdBindInvocationMaskHUAWEI(
    commandBuffers[imageIndex],
    InvocationMaskimageView,
    InvocationMaskimageLayout);
    vkCmdTraceRaysKHR(commandBuffers[imageIndex],
    pRaygenShaderBindingTable,
    pMissShaderBindingTable,
    swapChainExtent.width,
    swapChainExtent.height, 1);

* 
Revision 1, 2021-05-27 (Yunpeng Zhu)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_HUAWEI_invocation_mask).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
