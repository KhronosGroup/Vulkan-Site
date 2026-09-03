# VkRenderPass(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPass.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPass - Opaque handle to a render pass object

A render pass object represents a collection of attachments, subpasses, and
dependencies between the subpasses, and describes how the attachments are
used over the course of the subpasses.

Render passes are represented by `VkRenderPass` handles:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkRenderPass)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkSubpassShadingPipelineCreateInfoHUAWEI](VkSubpassShadingPipelineCreateInfoHUAWEI.html), [vkCreateRenderPass](vkCreateRenderPass.html), [vkCreateRenderPass2](vkCreateRenderPass2.html), [vkCreateRenderPass2](vkCreateRenderPass2.html), [vkDestroyRenderPass](vkDestroyRenderPass.html), [vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI](vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI.html), [vkGetRenderAreaGranularity](vkGetRenderAreaGranularity.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPass).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
