# VkSubpassBeginInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassBeginInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassBeginInfo - Structure specifying subpass begin information

The `VkSubpassBeginInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassBeginInfo {
    VkStructureType      sType;
    const void*          pNext;
    VkSubpassContents    contents;
} VkSubpassBeginInfo;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassBeginInfo
typedef VkSubpassBeginInfo VkSubpassBeginInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`contents` is a [VkSubpassContents](VkSubpassContents.html) value specifying how the
commands in the next subpass will be provided.

Valid Usage

* 
[](#VUID-VkSubpassBeginInfo-contents-09382) VUID-VkSubpassBeginInfo-contents-09382

If `contents` is
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](VkSubpassContents.html), then
at least one of the following features **must** be enabled:

[`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7)

* 
[`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassBeginInfo-sType-sType) VUID-VkSubpassBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO](VkStructureType.html)

* 
[](#VUID-VkSubpassBeginInfo-pNext-pNext) VUID-VkSubpassBeginInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSubpassBeginInfo-contents-parameter) VUID-VkSubpassBeginInfo-contents-parameter

 `contents` **must** be a valid [VkSubpassContents](VkSubpassContents.html) value

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html), [VkSubpassContents](VkSubpassContents.html), [vkCmdBeginRenderPass2](vkCmdBeginRenderPass2.html), [vkCmdBeginRenderPass2](vkCmdBeginRenderPass2.html), [vkCmdNextSubpass2](vkCmdNextSubpass2.html), [vkCmdNextSubpass2](vkCmdNextSubpass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassBeginInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
