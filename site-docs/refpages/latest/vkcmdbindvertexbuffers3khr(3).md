# vkCmdBindVertexBuffers3KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindVertexBuffers3KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindVertexBuffers3KHR - Bind strided address ranges as vertex buffers to a command buffer and dynamically set strides

To bind strided address ranges as vertex buffers to a command buffer for use
in subsequent drawing commands, call:

// Provided by VK_KHR_device_address_commands
void vkCmdBindVertexBuffers3KHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBindVertexBuffer3InfoKHR*           pBindingInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first vertex input binding whose
state is updated by the command.

* 
`bindingCount` is the number of vertex input bindings whose state is
updated by the command.

* 
`pInfos` is a pointer to an array of
[VkBindVertexBuffer3InfoKHR](VkBindVertexBuffer3InfoKHR.html) structures defining address ranges to
bind as vertex buffers.

The values taken from the address ranges defined by elements i of
`pInfos` replace the current state for the vertex input binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The vertex input binding is updated to the range of memory indicated by
`pInfos`[i].
All vertex input attributes that use each of these bindings will use these
updated addresses in their address calculations for subsequent drawing
commands.
If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
elements of `pInfos` **can** have a `addressRange.size` and
`addressRange.address` of 0.
If a vertex input attribute is bound to a vertex input binding with a
`size` and `address` of 0, the values taken from memory are
considered to be zero, and missing G, B, or A components are
[filled with (0](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input-extraction).

This command also [dynamically sets](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the byte
strides between consecutive elements within the strided range defined by
`pInfos`[i] to the value of `pInfos`[i].addressRange.stride
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, strides are specified by the
VkVertexInputBindingDescription::stride values used to create the currently
active pipeline.

If
drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects)
or if
the bound pipeline state object was also created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](VkDynamicState.html) dynamic state enabled
then [vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html) **can** be used instead of
`vkCmdBindVertexBuffers2` to set the stride.

|  | Unlike the static state to set the same, `stride` for each address range
| --- | --- |
must be between 0 and the maximum extent of the attributes in the binding.
[vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html) does not have this restriction so can be used
if other stride values are desired. |

Valid Usage

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13070) VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13070

`firstBinding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13071) VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13071

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-addressRange-13073) VUID-vkCmdBindVertexBuffers3KHR-addressRange-13073

The `addressRange.stride` of all elements of `pInfos` **must** be
either 0 or greater than or equal to the maximum extent of all vertex
input attributes fetched from the corresponding binding, where the
extent is calculated as the
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`offset` plus
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`format` size

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-parameter) VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-pBindingInfos-parameter) VUID-vkCmdBindVertexBuffers3KHR-pBindingInfos-parameter

 `pBindingInfos` **must** be a valid pointer to an array of `bindingCount` valid [VkBindVertexBuffer3InfoKHR](VkBindVertexBuffer3InfoKHR.html) structures

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-recording) VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-cmdpool) VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-videocoding) VUID-vkCmdBindVertexBuffers3KHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-bindingCount-arraylength) VUID-vkCmdBindVertexBuffers3KHR-bindingCount-arraylength

 `bindingCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindVertexBuffers3KHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkBindVertexBuffer3InfoKHR](VkBindVertexBuffer3InfoKHR.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#vkCmdBindVertexBuffers3KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
