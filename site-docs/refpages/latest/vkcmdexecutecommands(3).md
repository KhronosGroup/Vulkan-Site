# vkCmdExecuteCommands(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdExecuteCommands.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdExecuteCommands - Execute a secondary command buffer from a primary command buffer

Secondary command buffers **must** not be directly submitted to a queue.
To record a secondary command buffer to execute as part of a primary command
buffer, call:

// Provided by VK_VERSION_1_0
void vkCmdExecuteCommands(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    commandBufferCount,
    const VkCommandBuffer*                      pCommandBuffers);

* 
`commandBuffer` is a handle to a primary command buffer that the
secondary command buffers are executed in.

* 
`commandBufferCount` is the length of the `pCommandBuffers`
array.

* 
`pCommandBuffers` is a pointer to an array of
`commandBufferCount` secondary command buffer handles, which are
recorded to execute in the primary command buffer in the order they are
listed in the array.

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html) flag, and it was recorded
into any other primary command buffer which is currently in the
[executable or recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle), that primary
command buffer becomes [invalid](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

If the [`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer) feature
is enabled it is valid usage for `vkCmdExecuteCommands` to also be
recorded to a [secondary command buffer](../../../../spec/latest/appendices/glossary.html#glossary).

Valid Usage

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00088) VUID-vkCmdExecuteCommands-pCommandBuffers-00088

Each element of `pCommandBuffers` **must** have been allocated with a
`level` of [VK_COMMAND_BUFFER_LEVEL_SECONDARY](VkCommandBufferLevel.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00089) VUID-vkCmdExecuteCommands-pCommandBuffers-00089

Each element of `pCommandBuffers` **must** be in the
[pending or executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00091) VUID-vkCmdExecuteCommands-pCommandBuffers-00091

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html) flag, it **must** not be
in the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00092) VUID-vkCmdExecuteCommands-pCommandBuffers-00092

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html) flag, it **must** not
have already been recorded to `commandBuffer`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00093) VUID-vkCmdExecuteCommands-pCommandBuffers-00093

If any element of `pCommandBuffers` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html) flag, it **must** not
appear more than once in `pCommandBuffers`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00094) VUID-vkCmdExecuteCommands-pCommandBuffers-00094

Each element of `pCommandBuffers` **must** have been allocated from a
`VkCommandPool` that was created for the same queue family as the
`VkCommandPool` from which `commandBuffer` was allocated

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00096) VUID-vkCmdExecuteCommands-pCommandBuffers-00096

If this command is called within a render pass instance, each element of
`pCommandBuffers` **must** have been recorded with the
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00099) VUID-vkCmdExecuteCommands-pCommandBuffers-00099

If this command is called within a render pass instance, and any element
of `pCommandBuffers` was recorded with
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)::`framebuffer` not equal to
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), that `VkFramebuffer` **must** match the
`VkFramebuffer` used in the current render pass instance

* 
[](#VUID-vkCmdExecuteCommands-contents-09680) VUID-vkCmdExecuteCommands-contents-09680

    If this command is called within a render pass instance begun with
    [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html), and [vkCmdNextSubpass](vkCmdNextSubpass.html) has not been
    called in the current render pass instance, the `contents` parameter
    of [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html) **must** have been
    [VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS](VkSubpassContents.html)
, or [VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_EXT](VkSubpassContents.html)

* 
[](#VUID-vkCmdExecuteCommands-None-09681) VUID-vkCmdExecuteCommands-None-09681

    If this command is called within a render pass instance begun with
    [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html), and [vkCmdNextSubpass](vkCmdNextSubpass.html) has been called
    in the current render pass instance, the `contents` parameter of the
    last call to [vkCmdNextSubpass](vkCmdNextSubpass.html) **must** have been
    [VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS](VkSubpassContents.html)
, or [VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](VkSubpassContents.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06019) VUID-vkCmdExecuteCommands-pCommandBuffers-06019

If this command is called within a render pass instance begun with
[vkCmdBeginRenderPass](vkCmdBeginRenderPass.html), each element of `pCommandBuffers` **must**
have been recorded with
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)::`subpass` set to the index of
the subpass which the given command buffer will be executed in

* 
[](#VUID-vkCmdExecuteCommands-pBeginInfo-06020) VUID-vkCmdExecuteCommands-pBeginInfo-06020

If this command is called within a render pass instance begun with
[vkCmdBeginRenderPass](vkCmdBeginRenderPass.html), the render passes specified in the
`pBeginInfo->pInheritanceInfo→renderPass` members of the
[vkBeginCommandBuffer](vkBeginCommandBuffer.html) commands used to begin recording each element
of `pCommandBuffers` **must** be
[compatible](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility) with the current render pass

* 
[](#VUID-vkCmdExecuteCommands-pNext-02865) VUID-vkCmdExecuteCommands-pNext-02865

If this command is called within a render pass instance that included
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html) in the `pNext` chain of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), then each element of `pCommandBuffers`
**must** have been recorded with
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html) in the
`pNext` chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)

* 
[](#VUID-vkCmdExecuteCommands-pNext-02866) VUID-vkCmdExecuteCommands-pNext-02866

If this command is called within a render pass instance that included
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html) in the `pNext` chain of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), then each element of `pCommandBuffers`
**must** have been recorded with
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html)::`transform`
identical to [VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html)::`transform`

* 
[](#VUID-vkCmdExecuteCommands-pNext-02867) VUID-vkCmdExecuteCommands-pNext-02867

If this command is called within a render pass instance that included
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html) in the `pNext` chain of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), then each element of `pCommandBuffers`
**must** have been recorded with
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html)::`renderArea`
identical to [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderArea`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00100) VUID-vkCmdExecuteCommands-pCommandBuffers-00100

If `vkCmdExecuteCommands` is not being called within a render pass
instance, each element of `pCommandBuffers` **must** not have been
recorded with the [VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00101) VUID-vkCmdExecuteCommands-commandBuffer-00101

If the [`inheritedQueries`](../../../../spec/latest/chapters/features.html#features-inheritedQueries) feature is
not enabled, `commandBuffer` **must** not have any queries
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00102) VUID-vkCmdExecuteCommands-commandBuffer-00102

If `commandBuffer` has a [VK_QUERY_TYPE_OCCLUSION](VkQueryType.html) query
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active), then each element of
`pCommandBuffers` **must** have been recorded with
`VkCommandBufferInheritanceInfo`::`occlusionQueryEnable` set to
[VK_TRUE](VK_TRUE.html)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00103) VUID-vkCmdExecuteCommands-commandBuffer-00103

If `commandBuffer` has a [VK_QUERY_TYPE_OCCLUSION](VkQueryType.html) query
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active), then each element of
`pCommandBuffers` **must** have been recorded with
`VkCommandBufferInheritanceInfo`::`queryFlags` having all bits
set that are set for the query

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-00104) VUID-vkCmdExecuteCommands-commandBuffer-00104

If `commandBuffer` has a [VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html)
query [active](../../../../spec/latest/chapters/queries.html#queries-operation-active), then each element of
`pCommandBuffers` **must** have been recorded with
`VkCommandBufferInheritanceInfo`::`pipelineStatistics` having
all bits set that are set in the `VkQueryPool` the query uses

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-00105) VUID-vkCmdExecuteCommands-pCommandBuffers-00105

Each element of `pCommandBuffers` **must** not begin any query types
that are [active](../../../../spec/latest/chapters/queries.html#queries-operation-active) in `commandBuffer`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-07594) VUID-vkCmdExecuteCommands-commandBuffer-07594

`commandBuffer` **must** not have any queries other than
[VK_QUERY_TYPE_OCCLUSION](VkQueryType.html) and
[VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html)
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-01820) VUID-vkCmdExecuteCommands-commandBuffer-01820

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
each element of `pCommandBuffers` **must** be a protected command
buffer

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-01821) VUID-vkCmdExecuteCommands-commandBuffer-01821

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
each element of `pCommandBuffers` **must** be an unprotected command
buffer

* 
[](#VUID-vkCmdExecuteCommands-None-02286) VUID-vkCmdExecuteCommands-None-02286

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-06533) VUID-vkCmdExecuteCommands-commandBuffer-06533

If this command is called within a render pass instance and any recorded
command in `commandBuffer` in the current subpass will write to an
image subresource as an attachment, commands recorded in elements of
`pCommandBuffers` **must** not read from the memory backing that image
subresource in any other way

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-06534) VUID-vkCmdExecuteCommands-commandBuffer-06534

If this command is called within a render pass instance and any recorded
command in `commandBuffer` in the current subpass will read from an
image subresource used as an attachment in any way other than as an
attachment, commands recorded in elements of `pCommandBuffers` **must**
not write to that image subresource as an attachment

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06535) VUID-vkCmdExecuteCommands-pCommandBuffers-06535

If this command is called within a render pass instance and any recorded
command in a given element of `pCommandBuffers` will write to an
image subresource as an attachment, commands recorded in elements of
`pCommandBuffers` at a higher index **must** not read from the memory
backing that image subresource in any other way

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06536) VUID-vkCmdExecuteCommands-pCommandBuffers-06536

If this command is called within a render pass instance and any recorded
command in a given element of `pCommandBuffers` will read from an
image subresource used as an attachment in any way other than as an
attachment, commands recorded in elements of `pCommandBuffers` at a
higher index **must** not write to that image subresource as an attachment

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06021) VUID-vkCmdExecuteCommands-pCommandBuffers-06021

If `pCommandBuffers` contains any [suspended    render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension), there **must** be no action or synchronization
commands between that render pass instance and any render pass instance
that resumes it

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-06022) VUID-vkCmdExecuteCommands-pCommandBuffers-06022

If `pCommandBuffers` contains any [suspended    render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension), there **must** be no render pass instances between
that render pass instance and any render pass instance that resumes it

* 
[](#VUID-vkCmdExecuteCommands-variableSampleLocations-06023) VUID-vkCmdExecuteCommands-variableSampleLocations-06023

If the [`variableSampleLocations`](../../../../spec/latest/chapters/limits.html#limits-variableSampleLocations)
limit is not supported, and any element of `pCommandBuffers`
contains any [suspended render pass instances](../../../../spec/latest/chapters/renderpass.html#renderpass-suspension),
where a graphics pipeline has been bound, any pipelines bound in the
render pass instance that resumes it, or any subsequent render pass
instances that resume from that one and so on, **must** use the same sample
locations

* 
[](#VUID-vkCmdExecuteCommands-flags-06024) VUID-vkCmdExecuteCommands-flags-06024

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), its [VkRenderingInfo](VkRenderingInfo.html)::`flags`
parameter **must** have included
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](VkRenderingFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-pBeginInfo-06025) VUID-vkCmdExecuteCommands-pBeginInfo-06025

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the render passes specified in the
`pBeginInfo->pInheritanceInfo→renderPass` members of the
[vkBeginCommandBuffer](vkBeginCommandBuffer.html) commands used to begin recording each element
of `pCommandBuffers` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdExecuteCommands-flags-06026) VUID-vkCmdExecuteCommands-flags-06026

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `flags` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
[VkRenderingInfo](VkRenderingInfo.html)::`flags` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html), excluding
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](VkRenderingFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-colorAttachmentCount-06027) VUID-vkCmdExecuteCommands-colorAttachmentCount-06027

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `colorAttachmentCount` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdExecuteCommands-imageView-06028) VUID-vkCmdExecuteCommands-imageView-06028

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), if the `imageView` member of an element
of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-imageView-07606) VUID-vkCmdExecuteCommands-imageView-07606

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), if the `imageView` member of an element
of the [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-06029) VUID-vkCmdExecuteCommands-pDepthAttachment-06029

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), if the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-06030) VUID-vkCmdExecuteCommands-pStencilAttachment-06030

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), if the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`stencilAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-06774) VUID-vkCmdExecuteCommands-pDepthAttachment-06774

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-06775) VUID-vkCmdExecuteCommands-pStencilAttachment-06775

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`stencilAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11500) VUID-vkCmdExecuteCommands-pCommandBuffers-11500

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and contains a custom resolve, then each
element of `pCommandBuffers` **must** have been recorded with a
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) struct chained to its
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11501) VUID-vkCmdExecuteCommands-pCommandBuffers-11501

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and does not contain a custom resolve, then
each element of `pCommandBuffers` **must** not have been recorded with
a [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) struct chained to its
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11502) VUID-vkCmdExecuteCommands-pCommandBuffers-11502

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, then each element of
`pCommandBuffers` **must** have been recorded with
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` as [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-11503) VUID-vkCmdExecuteCommands-pCommandBuffers-11503

If the current render pass instance was begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and contains a custom resolve, and
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not been recorded in the render
pass instance, then each element of `pCommandBuffers` **must** have
been recorded with
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` as
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-vkCmdExecuteCommands-colorAttachmentCount-11532) VUID-vkCmdExecuteCommands-colorAttachmentCount-11532

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) that contains a custom resolve, the
`colorAttachmentCount` member of the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be equal to
the [VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdExecuteCommands-resolveImageView-11533) VUID-vkCmdExecuteCommands-resolveImageView-11533

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) that contains a custom resolve, if the
`resolveImageView` member of an element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be equal to
the format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-resolveImageView-11534) VUID-vkCmdExecuteCommands-resolveImageView-11534

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) that contains a custom resolve, if the
`resolveImageView` member of an element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
element of the `pColorAttachmentFormats` member of the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-11535) VUID-vkCmdExecuteCommands-pDepthAttachment-11535

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), if the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthAttachmentFormat` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-11536) VUID-vkCmdExecuteCommands-pStencilAttachment-11536

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) that contains a custom resolve, if the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
value of the `stencilAttachmentFormat` member of the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be equal to
the format used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-11537) VUID-vkCmdExecuteCommands-pDepthAttachment-11537

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) that contains a custom resolve and the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
value of the `depthAttachmentFormat` member of the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-11538) VUID-vkCmdExecuteCommands-pStencilAttachment-11538

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) that contains a custom resolve and the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
value of the `stencilAttachmentFormat` member of the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) structure included in the `pNext`
chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to
begin recording each element of `pCommandBuffers` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-vkCmdExecuteCommands-resolveImageView-11526) VUID-vkCmdExecuteCommands-resolveImageView-11526

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, and the `resolveImageView`
member of an element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
**must** be equal to the sample count used to create that
`resolveImageView`

* 
[](#VUID-vkCmdExecuteCommands-pDepthAttachment-11527) VUID-vkCmdExecuteCommands-pDepthAttachment-11527

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, and the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
value of
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
**must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pStencilAttachment-11528) VUID-vkCmdExecuteCommands-pStencilAttachment-11528

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has been
recorded in the render pass instance, and the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->resolveImageView`
parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
value of
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
**must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-viewMask-06031) VUID-vkCmdExecuteCommands-viewMask-06031

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `viewMask` member of the
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
[VkRenderingInfo](VkRenderingInfo.html)::`viewMask` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdExecuteCommands-pNext-06032) VUID-vkCmdExecuteCommands-pNext-06032

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and the `pNext` chain of
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, if the `imageView`
member of an element of the
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
element of the `pColorAttachmentSamples` member of the
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06033) VUID-vkCmdExecuteCommands-pNext-06033

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and the `pNext` chain of
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, if the
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthStencilAttachmentSamples` member of the
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06034) VUID-vkCmdExecuteCommands-pNext-06034

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) and the `pNext` chain of
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, if the
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView` parameter to
[vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of the
`depthStencilAttachmentSamples` member of the
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure included in the
`pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06035) VUID-vkCmdExecuteCommands-pNext-06035

    If this command is called within a render pass instance begun with
    [vkCmdBeginRendering](vkCmdBeginRendering.html), and the `pNext` chain of
    [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) does not include a
    [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
    [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure,
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render pass instance, and
    if the `imageView` member of an element of the
    [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments` parameter to
    [vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
    [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
    **must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06036) VUID-vkCmdExecuteCommands-pNext-06036

    If this command is called within a render pass instance begun with
    [vkCmdBeginRendering](vkCmdBeginRendering.html) and the `pNext` chain of
    [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) does not include a
    [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
    [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure,
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render pass instance, and
    if the [VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment->imageView`
    parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
    value of
    [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
    **must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-06037) VUID-vkCmdExecuteCommands-pNext-06037

    If this command is called within a render pass instance begun with
    [vkCmdBeginRendering](vkCmdBeginRendering.html) and the `pNext` chain of
    [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) does not include a
    [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
    [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure,
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) has not yet been recorded in the render pass instance, and
    if the [VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment->imageView`
    parameter to [vkCmdBeginRendering](vkCmdBeginRendering.html) is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
    value of
    [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
    **must** be equal to the sample count used to create that image view

* 
[](#VUID-vkCmdExecuteCommands-pNext-09299) VUID-vkCmdExecuteCommands-pNext-09299

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), with any color attachment using a resolve
mode of [VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
the `pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) used to
create each element of `pCommandBuffers` **must** include a
[VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure with an `externalFormat`
matching that used to create the resolve attachment in the render pass

* 
[](#VUID-vkCmdExecuteCommands-pNext-09300) VUID-vkCmdExecuteCommands-pNext-09300

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html) with any color attachment using a resolve mode
of [VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), and the
`pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) does not
include a [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, the value of
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`rasterizationSamples`
**must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-09375) VUID-vkCmdExecuteCommands-commandBuffer-09375

`commandBuffer` **must** not be a [secondary command    buffer](../../../../spec/latest/appendices/glossary.html#glossary)
unless the [`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer)
feature is enabled

* 
[](#VUID-vkCmdExecuteCommands-nestedCommandBuffer-09376) VUID-vkCmdExecuteCommands-nestedCommandBuffer-09376

If the [`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer)
feature is enabled, and `commandBuffer` is a [secondary    command buffer](../../../../spec/latest/appendices/glossary.html#glossary), the [command buffer nesting level](../../../../spec/latest/appendices/glossary.html#glossary) of each
element of `pCommandBuffers` **must** be less than
[    `maxCommandBufferNestingLevel`](../../../../spec/latest/chapters/limits.html#limits-maxCommandBufferNestingLevel)

* 
[](#VUID-vkCmdExecuteCommands-nestedCommandBufferRendering-09377) VUID-vkCmdExecuteCommands-nestedCommandBufferRendering-09377

If the [    `nestedCommandBufferRendering`](../../../../spec/latest/chapters/features.html#features-nestedCommandBufferRendering) feature is not enabled, and
`commandBuffer` is a [secondary command buffer](../../../../spec/latest/appendices/glossary.html#glossary),
`commandBuffer` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-nestedCommandBufferSimultaneousUse-09378) VUID-vkCmdExecuteCommands-nestedCommandBufferSimultaneousUse-09378

If the [    `nestedCommandBufferSimultaneousUse`](../../../../spec/latest/chapters/features.html#features-nestedCommandBufferSimultaneousUse) feature is not enabled, and
`commandBuffer` is a [secondary command buffer](../../../../spec/latest/appendices/glossary.html#glossary), each
element of `pCommandBuffers` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-09504) VUID-vkCmdExecuteCommands-pCommandBuffers-09504

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the color attachment mapping state specified
by [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html) in the inheritance info of
each element of `pCommandBuffers` and in the current state of
`commandBuffer` **must** match

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-09505) VUID-vkCmdExecuteCommands-pCommandBuffers-09505

If this command is called within a render pass instance begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the input attachment mapping state specified
by [VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) in the inheritance info of
each element of `pCommandBuffers` and in the current state of
`commandBuffer` **must** match

* 
[](#VUID-vkCmdExecuteCommands-memory-10724) VUID-vkCmdExecuteCommands-memory-10724

If this command is called within a render pass instance, the size of
`memory` member of the [VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html) structure
included in the `pNext` chain of
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`pInheritanceInfo` used to begin
recording each element of `pCommandBuffers` **must** be equal to the
active bound [bound tile memory object](../../../../spec/latest/chapters/memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10620) VUID-vkCmdExecuteCommands-pCommandBuffers-10620

If this command is being recorded within a render pass instance with
[tile shading](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading) enabled, all elements of
`pCommandBuffers` **must** have been recorded with
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) included in
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10621) VUID-vkCmdExecuteCommands-pCommandBuffers-10621

If the [per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model)
is enabled, all elements of `pCommandBuffers` **must** have been
recorded with
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-vkCmdExecuteCommands-tileApronSize-10622) VUID-vkCmdExecuteCommands-tileApronSize-10622

If this command is being recorded within a render pass instance, the
`tileApronSize` used to create the render pass instance **must** equal
the [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`tileApronSize`
used to record all elements of `pCommandBuffers`

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10623) VUID-vkCmdExecuteCommands-pCommandBuffers-10623

If any element of `pCommandBuffers` was recorded with
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) included in
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`, this command
**must** be recorded in a render pass that has tile shading enabled

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-10624) VUID-vkCmdExecuteCommands-pCommandBuffers-10624

If any element of `pCommandBuffers` was recorded with
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`,
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) **must**
be enabled

* 
[](#VUID-vkCmdExecuteCommands-tileApronSize-10625) VUID-vkCmdExecuteCommands-tileApronSize-10625

If this command is not being recorded into a render pass instance, the
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`tileApronSize` that
was recorded into all elements of `pCommandBuffers` **must** equal
`(0,0)`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11351) VUID-vkCmdExecuteCommands-commandBuffer-11351

If there is a sampler descriptor heap bound to `commandBuffer`, each
element of `pCommandBuffers` **must** have been recorded with a value
of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
that is either `NULL` or a pointer to a bind info that is identical to
that set via the last call to [vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11352) VUID-vkCmdExecuteCommands-commandBuffer-11352

If there is a resource descriptor heap bound to `commandBuffer`,
each element of `pCommandBuffers` **must** have been recorded with a
value of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
that is either `NULL` or a pointer to a bind info that is identical to
that set via the last call to [vkCmdBindResourceHeapEXT](vkCmdBindResourceHeapEXT.html)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11473) VUID-vkCmdExecuteCommands-commandBuffer-11473

If there is no sampler descriptor heap bound to `commandBuffer`,
each element of `pCommandBuffers` **must** have been recorded with a
value of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
set to `NULL`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-11474) VUID-vkCmdExecuteCommands-commandBuffer-11474

If there is no resource descriptor heap bound to `commandBuffer`,
each element of `pCommandBuffers` **must** have been recorded with a
value of
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
set to `NULL`

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-12373) VUID-vkCmdExecuteCommands-commandBuffer-12373

`commandBuffer` **must** not have any shader instrumentation
[active](../../../../spec/latest/chapters/shaders.html#shaders-instrumentation-active)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-parameter) VUID-vkCmdExecuteCommands-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdExecuteCommands-pCommandBuffers-parameter) VUID-vkCmdExecuteCommands-pCommandBuffers-parameter

 `pCommandBuffers` **must** be a valid pointer to an array of `commandBufferCount` valid [VkCommandBuffer](VkCommandBuffer.html) handles

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-recording) VUID-vkCmdExecuteCommands-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdExecuteCommands-commandBuffer-cmdpool) VUID-vkCmdExecuteCommands-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdExecuteCommands-videocoding) VUID-vkCmdExecuteCommands-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdExecuteCommands-commandBufferCount-arraylength) VUID-vkCmdExecuteCommands-commandBufferCount-arraylength

 `commandBufferCount` **must** be greater than `0`

* 
[](#VUID-vkCmdExecuteCommands-commonparent) VUID-vkCmdExecuteCommands-commonparent

 Both of `commandBuffer`, and the elements of `pCommandBuffers` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

VK_QUEUE_TRANSFER_BIT | Indirection |

Conditional Rendering

vkCmdExecuteCommands is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkCmdExecuteCommands).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
