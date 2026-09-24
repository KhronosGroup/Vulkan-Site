# VkCommandBufferInheritanceViewportScissorInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferInheritanceViewportScissorInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferInheritanceViewportScissorInfoNV - Structure specifying command buffer inheritance information

The `VkCommandBufferInheritanceViewportScissorInfoNV` structure is
defined as:

// Provided by VK_NV_inherited_viewport_scissor
typedef struct VkCommandBufferInheritanceViewportScissorInfoNV {
    VkStructureType      sType;
    const void*          pNext;
    VkBool32             viewportScissor2D;
    uint32_t             viewportDepthCount;
    const VkViewport*    pViewportDepths;
} VkCommandBufferInheritanceViewportScissorInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewportScissor2D` specifies whether the listed dynamic state is
inherited.

* 
`viewportDepthCount` specifies the maximum number of viewports to
inherit.
When `viewportScissor2D` is [VK_FALSE](VK_FALSE.html), the behavior is as if
this value is zero.

* 
`pViewportDepths` is a pointer to a [VkViewport](VkViewport.html) structure
specifying the expected depth range for each inherited viewport.

If the `pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
`VkCommandBufferInheritanceViewportScissorInfoNV` structure, then that
structure controls whether a command buffer **can** inherit the following state
from other command buffers:

* 
[VK_DYNAMIC_STATE_SCISSOR](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html)

as well as the following state, with restrictions on inherited depth values
and viewport count:

* 
[VK_DYNAMIC_STATE_VIEWPORT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html)

If `viewportScissor2D` is [VK_FALSE](VK_FALSE.html), then the command buffer does
not inherit the listed dynamic state, and **should** set this state itself.
If this structure is not present, the behavior is as if
`viewportScissor2D` is [VK_FALSE](VK_FALSE.html).

If `viewportScissor2D` is [VK_TRUE](VK_TRUE.html), then the listed dynamic state
is inherited, and the command buffer **must** not set this
state, except that the viewport and scissor count **may** be set by binding a
graphics pipeline that does not specify this state as dynamic.

|  | Due to this restriction, applications **should** ensure either all or none of
| --- | --- |
the graphics pipelines bound in this secondary command buffer use dynamic
viewport/scissor counts. |

When the command buffer is executed as part of a the execution of a
[vkCmdExecuteCommands](vkCmdExecuteCommands.html) command, the inherited state (if enabled) is
determined by the following procedure, performed separately for each dynamic
state, and separately for each value for dynamic state that consists of
multiple values (e.g. multiple viewports).

* 
With i being the index of the executed command buffer in the
`pCommandBuffers` array of [vkCmdExecuteCommands](vkCmdExecuteCommands.html), if i >
0 and any secondary command buffer from index 0 to i-1
modifies the state, the inherited state is provisionally set to the
final value set by the last such secondary command buffer.
Binding a graphics pipeline defining the state statically is equivalent
to setting the state to an **undefined** value.

* 
Otherwise, the tentatative inherited state is that of the primary
command buffer at the point the [vkCmdExecuteCommands](vkCmdExecuteCommands.html) command was
recorded; if the state is **undefined**, then so is the provisional
inherited state.

* 
If the provisional inherited state is an **undefined** value, then the
state is not inherited.

* 
If the provisional inherited state is a viewport, with n being its
viewport index, then if n ≥ `viewportDepthCount`, or if
either [VkViewport](VkViewport.html)::`minDepth` or
[VkViewport](VkViewport.html)::`maxDepth` are not equal to the respective values
of the nth element of `pViewportDepths`, then the state is
not inherited.

* 
If the provisional inherited state passes both checks, then it becomes
the actual inherited state.

|  | There is no support for inheriting dynamic state from a secondary command
| --- | --- |
buffer executed as part of a different `vkCmdExecuteCommands` command. |

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04782) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04782

If the [    `inheritedViewportScissor2D`](../../../../spec/latest/chapters/features.html#features-inheritedViewportScissor2D) feature is not enabled,
`viewportScissor2D` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04783) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04783

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled and `viewportScissor2D` is [VK_TRUE](VK_TRUE.html), then
`viewportDepthCount` **must** be `1`

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04784) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04784

If `viewportScissor2D` is [VK_TRUE](VK_TRUE.html), then
`viewportDepthCount` **must** be greater than `0`

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04785) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04785

If `viewportScissor2D` is [VK_TRUE](VK_TRUE.html), then `pViewportDepths`
**must** be a valid pointer to an array of `viewportDepthCount` valid
`VkViewport` structures, except any requirements on `x`, `y`,
`width`, and `height` do not apply

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04786) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-viewportScissor2D-04786

If `viewportScissor2D` is [VK_TRUE](VK_TRUE.html), then the command buffer
**must** be recorded with the
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceViewportScissorInfoNV-sType-sType) VUID-VkCommandBufferInheritanceViewportScissorInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_VIEWPORT_SCISSOR_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

[VK_NV_inherited_viewport_scissor](VK_NV_inherited_viewport_scissor.html), `VkBool32`, [VkStructureType](VkStructureType.html), [VkViewport](VkViewport.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
