# VK_NV_inherited_viewport_scissor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_inherited_viewport_scissor.html

## Table of Contents

- [Name](#_name)
- [VK_NV_inherited_viewport_scissor](#VK_NV_inherited_viewport_scissor)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_inherited_viewport_scissor - device extension

**Name String**

`VK_NV_inherited_viewport_scissor`

**Extension Type**

Device extension

**Registered Extension Number**

279

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
David Zhao Akeley [akeley98](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_inherited_viewport_scissor] @akeley98%0A*Here describe the issue or question you have about the VK_NV_inherited_viewport_scissor extension*)

**Last Modified Date**

2021-02-04

**Contributors**

* 
David Zhao Akeley, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Christoph Kubisch, NVIDIA

This extension adds the ability for a secondary command buffer to inherit
the dynamic viewport and scissor state from a primary command buffer, or a
previous secondary command buffer executed within the same
[vkCmdExecuteCommands](vkCmdExecuteCommands.html) call.
It addresses a frequent scenario in applications that deal with window
resizing and want to improve utilization of reusable secondary command
buffers.
The functionality is provided through
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html).
Viewport inheritance is effectively limited to the 2D rectangle; secondary
command buffers must re-specify the inherited depth range values.

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceInheritedViewportScissorFeaturesNV](VkPhysicalDeviceInheritedViewportScissorFeaturesNV.html)

* 
`VK_NV_INHERITED_VIEWPORT_SCISSOR_EXTENSION_NAME`

* 
`VK_NV_INHERITED_VIEWPORT_SCISSOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_VIEWPORT_SCISSOR_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INHERITED_VIEWPORT_SCISSOR_FEATURES_NV](VkStructureType.html)

(1) Why are viewport depth values configured in the
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html) struct, rather than by
a `vkCmd…​` function?

**DISCUSSION**:

We considered both adding a new `vkCmdSetViewportDepthNV` function, and
modifying [vkCmdSetViewport](vkCmdSetViewport.html) to ignore the `x`, `y`,
`width`, and `height` values when called with a secondary command
buffer that activates this extension.

The primary design considerations for this extension are debuggability and
easy integration into existing applications.
The main issue with adding a new `vkCmdSetViewportDepthNV` function is
reducing ease-of-integration.
A new function pointer will have to be loaded, but more importantly, a new
function would require changes to be supported in graphics debuggers; this
would delay widespread adoption of the extension.

The proposal to modify [vkCmdSetViewport](vkCmdSetViewport.html) would avoid these issues.
However, we expect that the intent of applications using this extension is
to have the viewport values used for drawing exactly match the inherited
values; thus, it would be better for debuggability if no function for
modifying the viewport depth alone is provided.
By specifying viewport depth values when starting secondary command buffer
recording, and requiring the specified depth values to match the inherited
depth values, we allow for validation layers that flag depth changes as
errors.

This design also better matches the hardware model.
In fact, there is no need to re-execute a depth-setting command.
The graphics device retains the viewport depth state; it is the CPU-side
state of [VkCommandBuffer](VkCommandBuffer.html) that must be re-initialized.

(2) Why are viewport depth values specified as a partial [VkViewport](VkViewport.html)
struct, rather than a leaner depth-only struct?

**DISCUSSION**:

We considered adding a new `VkViewportDepthNV` struct containing only
`minDepth` and `maxDepth`.
However, as application developers would need to maintain both a
`VK_NV_inherited_viewport_scissor` code path and a fallback code path (at
least in the short term), we ultimately chose to continue using the existing
[VkViewport](VkViewport.html) structure.
Doing so would allow application developers to reuse the same
[VkViewport](VkViewport.html) array for both code paths, rather than constructing
separate `VkViewportDepthNV` and [VkViewport](VkViewport.html) arrays for each code
path.

* 
Revision 1, 2020-02-04 (David Zhao Akeley)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_inherited_viewport_scissor).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
