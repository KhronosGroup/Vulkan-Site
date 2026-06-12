# VkFramebuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFramebuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFramebuffer - Opaque handle to a framebuffer object

Render passes operate in conjunction with *framebuffers*.
Framebuffers represent a collection of specific memory attachments that a
render pass instance uses.

Framebuffers are represented by `VkFramebuffer` handles:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkFramebuffer)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [vkCreateFramebuffer](vkCreateFramebuffer.html), [vkDestroyFramebuffer](vkDestroyFramebuffer.html), [vkGetFramebufferTilePropertiesQCOM](vkGetFramebufferTilePropertiesQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkFramebuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
