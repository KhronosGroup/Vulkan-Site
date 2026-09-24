# VkSubpassContents(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassContents.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassContents - Specify how commands in the first subpass of a render pass are provided

Possible values of [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html)::`contents`, specifying
how the commands in the first subpass will be provided, are:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkSubpassContents {
    VK_SUBPASS_CONTENTS_INLINE = 0,
    VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS = 1,
  // Provided by VK_KHR_maintenance7
    VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR = 1000451000,
  // Provided by VK_EXT_nested_command_buffer
    VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_EXT = VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR,
} VkSubpassContents;

* 
[VK_SUBPASS_CONTENTS_INLINE](#) specifies that the contents of the
subpass will be recorded inline in the primary command buffer, and
secondary command buffers **must** not be executed within the subpass.

* 
[VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS](#) specifies that the
contents are recorded in secondary command buffers that will be called
from the primary command buffer, and [vkCmdExecuteCommands](vkCmdExecuteCommands.html) is the
only valid command in the command buffer until [vkCmdNextSubpass](vkCmdNextSubpass.html) or
[vkCmdEndRenderPass](vkCmdEndRenderPass.html).

* 
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](#)
specifies that the contents of the subpass **can** be recorded both inline
and in secondary command buffers executed from this command buffer with
[vkCmdExecuteCommands](vkCmdExecuteCommands.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSubpassBeginInfo](VkSubpassBeginInfo.html), [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html), [vkCmdNextSubpass](vkCmdNextSubpass.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassContents).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
