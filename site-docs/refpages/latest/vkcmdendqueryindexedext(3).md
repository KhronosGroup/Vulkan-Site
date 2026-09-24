# vkCmdEndQueryIndexedEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndQueryIndexedEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndQueryIndexedEXT - Ends a query

To end an indexed query after the set of desired drawing or dispatching
commands is recorded, call:

// Provided by VK_EXT_transform_feedback
void vkCmdEndQueryIndexedEXT(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    query,
    uint32_t                                    index);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`queryPool` is the query pool that is managing the results of the
query.

* 
`query` is the query index within the query pool where the result is
stored.

* 
`index` is the query type specific index.

The command completes the query in `queryPool` identified by `query`
and `index`, and marks it as available.

The `vkCmdEndQueryIndexedEXT` command operates the same as the
[vkCmdEndQuery](vkCmdEndQuery.html) command, except that it also accepts a query type
specific `index` parameter.

This command defines an execution dependency between other query commands
that reference the same query index.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the operation of this command.

Valid Usage

* 
[](#VUID-vkCmdEndQueryIndexedEXT-None-02342) VUID-vkCmdEndQueryIndexedEXT-None-02342

All queries used by the command **must** be
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active)

* 
[](#VUID-vkCmdEndQueryIndexedEXT-query-02343) VUID-vkCmdEndQueryIndexedEXT-query-02343

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-02344) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-02344

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdEndQueryIndexedEXT-query-02345) VUID-vkCmdEndQueryIndexedEXT-query-02345

If `vkCmdEndQueryIndexedEXT` is called within a render pass
instance, the sum of `query` and the number of bits set in the
current subpass’s view mask **must** be less than or equal to the number of
queries in `queryPool`

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryType-06694) VUID-vkCmdEndQueryIndexedEXT-queryType-06694

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html)
or [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html),
the `index` parameter **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackStreams`

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryType-06695) VUID-vkCmdEndQueryIndexedEXT-queryType-06695

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html)
and not [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html),
the `index` **must** be zero

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryType-06696) VUID-vkCmdEndQueryIndexedEXT-queryType-06696

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html)
or [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html),
`index` **must** equal the `index` used to begin the query

* 
[](#VUID-vkCmdEndQueryIndexedEXT-None-07007) VUID-vkCmdEndQueryIndexedEXT-None-07007

If called within a subpass of a render pass instance, the corresponding
`vkCmdBeginQuery`* command **must** have been called previously within
the same subpass

* 
[](#VUID-vkCmdEndQueryIndexedEXT-None-10682) VUID-vkCmdEndQueryIndexedEXT-None-10682

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-parameter) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryPool-parameter) VUID-vkCmdEndQueryIndexedEXT-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-recording) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-cmdpool) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndQueryIndexedEXT-suspended) VUID-vkCmdEndQueryIndexedEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndQueryIndexedEXT-videocoding) VUID-vkCmdEndQueryIndexedEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commonparent) VUID-vkCmdEndQueryIndexedEXT-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdEndQueryIndexedEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryPool](VkQueryPool.html), [vkCmdBeginQuery](vkCmdBeginQuery.html), [vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html), [vkCmdEndQuery](vkCmdEndQuery.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdEndQueryIndexedEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
