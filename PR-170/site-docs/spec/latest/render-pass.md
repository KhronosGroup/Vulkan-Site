# Render Pass

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/renderpass.html

## Table of Contents

- [Render Pass Objects](#renderpass-objects)
- [Render_Pass_Objects](#renderpass-objects)
- [Render Pass Creation](#renderpass-creation)
- [Render_Pass_Creation](#renderpass-creation)
- [Render Pass Compatibility](#renderpass-compatibility)
- [Render_Pass_Compatibility](#renderpass-compatibility)
- [Framebuffers](#_framebuffers)
- [Render Pass Load Operations](#renderpass-load-operations)
- [Render_Pass_Load_Operations](#renderpass-load-operations)
- [Render Pass Store Operations](#renderpass-store-operations)
- [Render_Pass_Store_Operations](#renderpass-store-operations)
- [Render Pass Multisample Resolve Operations](#renderpass-resolve-operations)
- [Render_Pass_Multisample_Resolve_Operations](#renderpass-resolve-operations)
- [Render Pass Commands](#renderpass-commands)
- [Render_Pass_Commands](#renderpass-commands)
- [Render Pass Creation Feedback](#renderpass-creation-feedback)
- [Render_Pass_Creation_Feedback](#renderpass-creation-feedback)
- [Common Render Pass Data Races (Informative)](#common-render-pass-data-races)
- [Common_Render_Pass_Data_Races_(Informative)](#common-render-pass-data-races)
- [Sampling From a Read-Only Attachment](#_sampling_from_a_read_only_attachment)
- [Sampling_From_a_Read-Only_Attachment](#_sampling_from_a_read_only_attachment)
- [Non-Overlapping Access Between Resources](#_non_overlapping_access_between_resources)
- [Non-Overlapping_Access_Between_Resources](#_non_overlapping_access_between_resources)
- [Depth/Stencil and Input Attachments](#_depthstencil_and_input_attachments)
- [Depth/Stencil_and_Input_Attachments](#_depthstencil_and_input_attachments)
- [Synchronization Options](#_synchronization_options)
- [Tile Shading Render Pass](#renderpass-tile-shading)
- [Tile_Shading_Render_Pass](#renderpass-tile-shading)
- [Tile Attachment Variables](#renderpass-tile-shading-attachment-access)
- [Tile_Attachment_Variables](#renderpass-tile-shading-attachment-access)
- [Tiling Aprons](#renderpass-tile-shading-aprons)
- [Tile Attachment Coordinate Validation](#renderpass-tile-shading-offset-validation)
- [Tile_Attachment_Coordinate_Validation](#renderpass-tile-shading-offset-validation)
- [Tile Shading Fragment Regions](#renderpass-tile-shading-fragment-region)
- [Tile_Shading_Fragment_Regions](#renderpass-tile-shading-fragment-region)
- [Per-Tile Execution Model](#renderpass-per-tile-execution-model)
- [Per-Tile_Execution_Model](#renderpass-per-tile-execution-model)
- [Area-Based Dispatch](#area-based-dispatch)

## Content

[Draw commands](drawing.html#drawing) **must** be recorded within a *render pass
instance*.
Each render pass instance defines a set of image resources, referred to as
*attachments*, used during rendering.

To begin a render pass instance, call:

// Provided by VK_VERSION_1_3
void vkCmdBeginRendering(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInfo*                      pRenderingInfo);

// Provided by VK_KHR_dynamic_rendering
// Equivalent to vkCmdBeginRendering
void vkCmdBeginRenderingKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInfo*                      pRenderingInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderingInfo` is a pointer to a [VkRenderingInfo](#VkRenderingInfo) structure
specifying details of the render pass instance to begin.

After beginning a render pass instance, the command buffer is ready to
record [draw commands](drawing.html#drawing).

If `pRenderingInfo->flags` includes [VK_RENDERING_RESUMING_BIT](#VkRenderingFlagBitsKHR) then
this render pass is resumed from a render pass instance that has been
suspended earlier in [submission order](synchronization.html#synchronization-submission-order).

If there is an instance of [VkTileMemorySizeInfoQCOM](#VkTileMemorySizeInfoQCOM) included in the
`pNext` chain of [VkRenderingInfo](#VkRenderingInfo), the structure is ignored.

Valid Usage

* 
[](#VUID-vkCmdBeginRendering-dynamicRendering-06446) VUID-vkCmdBeginRendering-dynamicRendering-06446

The [`dynamicRendering`](features.html#features-dynamicRendering) feature **must**
be enabled

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-06068) VUID-vkCmdBeginRendering-commandBuffer-06068

If `commandBuffer` is a secondary command buffer,
and the [`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)
feature is not enabled,
`pRenderingInfo->flags` **must** not include
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](#VkRenderingFlagBitsKHR)

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-10914) VUID-vkCmdBeginRendering-commandBuffer-10914

If `commandBuffer` is a secondary command buffer,
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits) **must** not have
been set in [VkCommandBufferBeginInfo](cmdbuffers.html#VkCommandBufferBeginInfo)::`flags` when
`commandBuffer` began

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09588) VUID-vkCmdBeginRendering-pRenderingInfo-09588

If `pRenderingInfo->pDepthAttachment` is not `NULL` and
`pRenderingInfo->pDepthAttachment→imageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), when
`pRenderingInfo->pDepthAttachment→imageView` is accessed it **must**
be in the layout specified by
`pRenderingInfo->pDepthAttachment→imageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09589) VUID-vkCmdBeginRendering-pRenderingInfo-09589

If `pRenderingInfo->pDepthAttachment` is not `NULL`,
`pRenderingInfo->pDepthAttachment→imageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pRenderingInfo->pDepthAttachment→imageResolveMode` is not
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), and
`pRenderingInfo->pDepthAttachment→resolveImageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pRenderingInfo->pDepthAttachment→resolveImageView` **must** be in the
layout specified by
`pRenderingInfo->pDepthAttachment→resolveImageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09590) VUID-vkCmdBeginRendering-pRenderingInfo-09590

If `pRenderingInfo->pStencilAttachment` is not `NULL` and
`pRenderingInfo->pStencilAttachment→imageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), when
`pRenderingInfo->pStencilAttachment→imageView` is accessed it **must**
be in the layout specified by
`pRenderingInfo->pStencilAttachment→imageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09591) VUID-vkCmdBeginRendering-pRenderingInfo-09591

If `pRenderingInfo->pStencilAttachment` is not `NULL`,
`pRenderingInfo->pStencilAttachment→imageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pRenderingInfo->pStencilAttachment→imageResolveMode` is not
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), and
`pRenderingInfo->pStencilAttachment→resolveImageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pRenderingInfo->pStencilAttachment→resolveImageView` **must** be in
the layout specified by
`pRenderingInfo->pStencilAttachment→resolveImageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09592) VUID-vkCmdBeginRendering-pRenderingInfo-09592

For each element of `pRenderingInfo->pColorAttachments`, if
`imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), when that image view is
accessed it **must** be in the layout specified by the `imageLayout`
member of that same element of `pRenderingInfo->pColorAttachments`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09593) VUID-vkCmdBeginRendering-pRenderingInfo-09593

For each element of `pRenderingInfo->pColorAttachments`, if
either `imageResolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR), or
`imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is not
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), and `resolveImageView` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `resolveImageView` **must** be in the layout
specified by `resolveImageLayout`

* 
[](#VUID-vkCmdBeginRendering-flags-10641) VUID-vkCmdBeginRendering-flags-10641

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) is included in
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`,
`commandBuffer` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits)

* 
[](#VUID-vkCmdBeginRendering-flags-10642) VUID-vkCmdBeginRendering-flags-10642

[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags` **must** not
include [VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM)

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-11750) VUID-vkCmdBeginRendering-pRenderingInfo-11750

If `pRenderingInfo->flags` contains
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](#VkRenderingFlagBitsKHR),
[`maintenance10`](features.html#features-maintenance10) **must** be enabled

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-11751) VUID-vkCmdBeginRendering-pRenderingInfo-11751

If `pRenderingInfo->flags` does not contain
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](#VkRenderingFlagBitsKHR),
attachments **must** not specify
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR)

* 
[](#VUID-vkCmdBeginRendering-imageView-12276) VUID-vkCmdBeginRendering-imageView-12276

If [VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT)::`imageView`
is not equal to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), when `imageView` is accessed
it **must** be in the layout specified by
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT)::`imageLayout`

* 
[](#VUID-vkCmdBeginRendering-imageView-12277) VUID-vkCmdBeginRendering-imageView-12277

If
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR)::`imageView`
is not equal to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), when `imageView` is accessed
it **must** be in the layout specified by
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR)::`imageLayout`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-parameter) VUID-vkCmdBeginRendering-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-parameter) VUID-vkCmdBeginRendering-pRenderingInfo-parameter

 `pRenderingInfo` **must** be a valid pointer to a valid [VkRenderingInfo](#VkRenderingInfo) structure

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-recording) VUID-vkCmdBeginRendering-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-cmdpool) VUID-vkCmdBeginRendering-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginRendering-renderpass) VUID-vkCmdBeginRendering-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginRendering-suspended) VUID-vkCmdBeginRendering-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginRendering-videocoding) VUID-vkCmdBeginRendering-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginRendering is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkRenderingInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkRenderingInfo {
    VkStructureType                     sType;
    const void*                         pNext;
    VkRenderingFlags                    flags;
    VkRect2D                            renderArea;
    uint32_t                            layerCount;
    uint32_t                            viewMask;
    uint32_t                            colorAttachmentCount;
    const VkRenderingAttachmentInfo*    pColorAttachments;
    const VkRenderingAttachmentInfo*    pDepthAttachment;
    const VkRenderingAttachmentInfo*    pStencilAttachment;
} VkRenderingInfo;

// Provided by VK_KHR_dynamic_rendering, VK_QCOM_tile_properties with VK_KHR_dynamic_rendering or VK_VERSION_1_3
// Equivalent to VkRenderingInfo
typedef VkRenderingInfo VkRenderingInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderingFlagBits](#VkRenderingFlagBits).

* 
`renderArea` is the render area that is affected by the render pass
instance.

* 
`layerCount` is the number of layers rendered to in each attachment
when `viewMask` is `0`.

* 
`viewMask` is a bitfield of view indices describing which views are
active during rendering, when it is not `0`.

* 
`colorAttachmentCount` is the number of elements in
`pColorAttachments`.

* 
`pColorAttachments` is a pointer to an array of
`colorAttachmentCount` [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo) structures
describing any color attachments used.

* 
`pDepthAttachment` is a pointer to a [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo)
structure describing a depth attachment.

* 
`pStencilAttachment` is a pointer to a
[VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo) structure describing a stencil
attachment.

If `viewMask` is not `0`, multiview is enabled.

If there is an instance of [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) included
in the `pNext` chain and its `deviceRenderAreaCount` member is not
`0`, then `renderArea` is ignored, and the render area is defined
per-device by that structure.

If multiview is enabled, and the [`multiviewPerViewRenderAreas`](features.html#features-multiviewPerViewRenderAreas) feature is enabled, and there is an
instance of [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM)
included in the `pNext` chain with `perViewRenderAreaCount` not
equal to `0`, then the elements of
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM)::`pPerViewRenderAreas`
override `renderArea` and define a render area for each view.
In this case, `renderArea` **must** be an area at least as large as the
union of all the per-view render areas.

Each element of the `pColorAttachments` array corresponds to an output
location in the shader, i.e. if the shader declares an output variable
decorated with a `Location` value of **X**, then it uses the attachment
provided in `pColorAttachments`[**X**].
If the `imageView` member of any element of `pColorAttachments` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and `resolveMode` is not
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
writes to the corresponding location by a fragment are discarded.

The `aspectMask` of any image view specified for `pDepthAttachment`
or `pStencilAttachment` is ignored.
Instead, depth attachments are automatically treated as if
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) was specified for their aspect masks, and
stencil attachments are automatically treated as if
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits) was specified for their aspect masks.

Valid Usage

* 
[](#VUID-VkRenderingInfo-viewMask-06069) VUID-VkRenderingInfo-viewMask-06069

If `viewMask` is `0`, `layerCount` **must** not be `0`

* 
[](#VUID-VkRenderingInfo-multisampledRenderToSingleSampled-06857) VUID-VkRenderingInfo-multisampledRenderToSingleSampled-06857

If none of the following are enabled:

The `[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

* 
The [     `multisampledRenderToSingleSampled`](features.html#features-multisampledRenderToSingleSampled) feature

`imageView` members of `pDepthAttachment`, `pStencilAttachment`,
and elements of `pColorAttachments` that are not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
**must** have been created with the same `sampleCount`

[](#VUID-VkRenderingInfo-imageView-09429) VUID-VkRenderingInfo-imageView-09429

`imageView` members of elements of `pColorAttachments` that are
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have been created with the same
`sampleCount`
, if the [    `multisampledRenderToSingleSampled`](features.html#features-multisampledRenderToSingleSampled) feature is not enabled

[](#VUID-VkRenderingInfo-None-08994) VUID-VkRenderingInfo-None-08994

If [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo)::`deviceRenderAreaCount`
is 0,
`renderArea.extent.width` **must** be greater than 0

[](#VUID-VkRenderingInfo-None-08995) VUID-VkRenderingInfo-None-08995

If [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo)::`deviceRenderAreaCount`
is 0,
`renderArea.extent.height` **must** be greater than 0

[](#VUID-VkRenderingInfo-imageView-06858) VUID-VkRenderingInfo-imageView-06858

If
[multisampled-render-to-single-sampled](#subpass-multisampledrendertosinglesampled)
is enabled, then all attachments referenced by `imageView` members
of `pDepthAttachment`, `pStencilAttachment`, and elements of
`pColorAttachments` that are not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have a
sample count that is either [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) or equal to
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

[](#VUID-VkRenderingInfo-imageView-06859) VUID-VkRenderingInfo-imageView-06859

If
[multisampled-render-to-single-sampled](#subpass-multisampledrendertosinglesampled)
is enabled, then all attachments referenced by `imageView` members
of `pDepthAttachment`, `pStencilAttachment`, and elements of
`pColorAttachments` that are not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and have a
sample count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) **must** have been created with
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits) in
their [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`

[](#VUID-VkRenderingInfo-pNext-06077) VUID-VkRenderingInfo-pNext-06077

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.x` **must** be greater than or equal to 0

[](#VUID-VkRenderingInfo-pNext-06078) VUID-VkRenderingInfo-pNext-06078

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.y` **must** be greater than or equal to 0

[](#VUID-VkRenderingInfo-pNext-07815) VUID-VkRenderingInfo-pNext-07815

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
the sum of `renderArea.extent.width` and `renderArea.offset.x`
**must** be less than or equal to
[`maxFramebufferWidth`](limits.html#limits-maxFramebufferWidth)

[](#VUID-VkRenderingInfo-pNext-07816) VUID-VkRenderingInfo-pNext-07816

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
the sum of `renderArea.extent.height` and `renderArea.offset.y`
**must** be less than or equal to
[`maxFramebufferHeight`](limits.html#limits-maxFramebufferWidth)

[](#VUID-VkRenderingInfo-pNext-06079) VUID-VkRenderingInfo-pNext-06079

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
the width of the `imageView` member of each element of
`pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment` that is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be
greater than or equal to `renderArea.offset.x` + 
`renderArea.extent.width`

[](#VUID-VkRenderingInfo-pNext-06080) VUID-VkRenderingInfo-pNext-06080

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
the height of the `imageView` member of each element of
`pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment` that is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be
greater than or equal to `renderArea.offset.y` + 
`renderArea.extent.height`

[](#VUID-VkRenderingInfo-pNext-06083) VUID-VkRenderingInfo-pNext-06083

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo), the width of the `imageView`
member of any element of `pColorAttachments`,
`pDepthAttachment`, or `pStencilAttachment` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be greater than or equal to the sum of the
`offset.x` and `extent.width` members of each element of
`pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pNext-06084) VUID-VkRenderingInfo-pNext-06084

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo), the height of the
`imageView` member of any element of `pColorAttachments`,
`pDepthAttachment`, or `pStencilAttachment` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be greater than or equal to the sum of the
`offset.y` and `extent.height` members of each element of
`pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pDepthAttachment-06085) VUID-VkRenderingInfo-pDepthAttachment-06085

If neither `pDepthAttachment` or `pStencilAttachment` are `NULL`
and the `imageView` member of either structure is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `imageView` member of each structure **must**
be the same

[](#VUID-VkRenderingInfo-pDepthAttachment-06086) VUID-VkRenderingInfo-pDepthAttachment-06086

If neither `pDepthAttachment` or `pStencilAttachment` are
`NULL`, and the `resolveMode` member of each is not
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), the `resolveImageView` member of each
structure **must** be the same

[](#VUID-VkRenderingInfo-colorAttachmentCount-06087) VUID-VkRenderingInfo-colorAttachmentCount-06087

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
that `imageView` **must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

[](#VUID-VkRenderingInfo-colorAttachmentCount-09476) VUID-VkRenderingInfo-colorAttachmentCount-09476

If `colorAttachmentCount` is not `0` and there is an element of
`pColorAttachments` with
either its `resolveMode` member set to
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR), or
its `imageView` member not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and its
`resolveMode` member not set to [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), the
`resolveImageView` member of that element of `pColorAttachments`
**must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

[](#VUID-VkRenderingInfo-pDepthAttachment-06547) VUID-VkRenderingInfo-pDepthAttachment-06547

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pDepthAttachment->imageView` **must** have been created with a format
that includes a depth component

[](#VUID-VkRenderingInfo-pDepthAttachment-06088) VUID-VkRenderingInfo-pDepthAttachment-06088

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pDepthAttachment->imageView` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

[](#VUID-VkRenderingInfo-pDepthAttachment-09477) VUID-VkRenderingInfo-pDepthAttachment-09477

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pDepthAttachment->resolveImageView` **must** have been created with
the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

[](#VUID-VkRenderingInfo-pStencilAttachment-06548) VUID-VkRenderingInfo-pStencilAttachment-06548

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pStencilAttachment->imageView` **must** have been created with a
format that includes a stencil aspect

[](#VUID-VkRenderingInfo-pStencilAttachment-06089) VUID-VkRenderingInfo-pStencilAttachment-06089

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pStencilAttachment->imageView` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

[](#VUID-VkRenderingInfo-pStencilAttachment-09478) VUID-VkRenderingInfo-pStencilAttachment-09478

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pStencilAttachment->resolveImageView` **must** have been created with
the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

[](#VUID-VkRenderingInfo-colorAttachmentCount-06090) VUID-VkRenderingInfo-colorAttachmentCount-06090

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the `layout` member of that element of `pColorAttachments` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06091) VUID-VkRenderingInfo-colorAttachmentCount-06091

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), if
the `resolveMode` member of that element of `pColorAttachments`
is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), its `resolveImageLayout` member
**must** not be [VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pDepthAttachment-06092) VUID-VkRenderingInfo-pDepthAttachment-06092

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pDepthAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pDepthAttachment-06093) VUID-VkRenderingInfo-pDepthAttachment-06093

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pDepthAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pStencilAttachment-06094) VUID-VkRenderingInfo-pStencilAttachment-06094

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pStencilAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-flags-11514) VUID-VkRenderingInfo-flags-11514

If `flags` contains [VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR) or
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](#VkRenderingFlagBitsKHR), then the
[`customResolve`](features.html#features-customResolve) feature **must** enabled

[](#VUID-VkRenderingInfo-pColorAttachments-11515) VUID-VkRenderingInfo-pColorAttachments-11515

For any element of `pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment`, if `resolveMode` contains
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR), then `flags` **must** contain
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR)

[](#VUID-VkRenderingInfo-flags-11516) VUID-VkRenderingInfo-flags-11516

If `flags` contains [VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR), then
for any element of `pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment`, `resolveMode` **must** be
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) or [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingInfo-pStencilAttachment-06095) VUID-VkRenderingInfo-pStencilAttachment-06095

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pStencilAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-layerCount-07817) VUID-VkRenderingInfo-layerCount-07817

`layerCount` **must** be less than or equal to
[`maxFramebufferLayers`](limits.html#limits-maxFramebufferLayers)

[](#VUID-VkRenderingInfo-viewMask-10859) VUID-VkRenderingInfo-viewMask-10859

If `viewMask` is `0`, Each `pColorAttachment->imageView` and
`pColorAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have a `layerCount` that is greater than
or equal to `VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-viewMask-10860) VUID-VkRenderingInfo-viewMask-10860

If `viewMask` is `0`, Each `pDepthAttachment->imageView` and
`pDepthAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have a `layerCount` that is greater than
or equal to `VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-viewMask-10861) VUID-VkRenderingInfo-viewMask-10861

If `viewMask` is `0`, Each `pStencilAttachment->imageView` and
`pStencilAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have a `layerCount` that is greater than
or equal to `VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-colorAttachmentCount-06096) VUID-VkRenderingInfo-colorAttachmentCount-06096

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the `layout` member of that element of `pColorAttachments` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)
or [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06097) VUID-VkRenderingInfo-colorAttachmentCount-06097

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), if
the `resolveMode` member of that element of `pColorAttachments`
is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), its `resolveImageLayout` member
**must** not be
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pDepthAttachment-06098) VUID-VkRenderingInfo-pDepthAttachment-06098

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pDepthAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pStencilAttachment-06099) VUID-VkRenderingInfo-pStencilAttachment-06099

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pStencilAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06100) VUID-VkRenderingInfo-colorAttachmentCount-06100

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the `layout` member of that element of `pColorAttachments` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06101) VUID-VkRenderingInfo-colorAttachmentCount-06101

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), if
the `resolveMode` member of that element of `pColorAttachments`
is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), its `resolveImageLayout` member
**must** not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pDepthAttachment-07732) VUID-VkRenderingInfo-pDepthAttachment-07732

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pDepthAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pDepthAttachment-07733) VUID-VkRenderingInfo-pDepthAttachment-07733

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pDepthAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pStencilAttachment-07734) VUID-VkRenderingInfo-pStencilAttachment-07734

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pStencilAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pStencilAttachment-07735) VUID-VkRenderingInfo-pStencilAttachment-07735

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pStencilAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingInfo-pDepthAttachment-06102) VUID-VkRenderingInfo-pDepthAttachment-06102

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pDepthAttachment->resolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`supportedDepthResolveModes`

[](#VUID-VkRenderingInfo-pStencilAttachment-06103) VUID-VkRenderingInfo-pStencilAttachment-06103

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pStencilAttachment->resolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`supportedStencilResolveModes`

[](#VUID-VkRenderingInfo-pDepthAttachment-06104) VUID-VkRenderingInfo-pDepthAttachment-06104

If `pDepthAttachment` or `pStencilAttachment` are both not
`NULL`, `pDepthAttachment->imageView` and
`pStencilAttachment->imageView` are both not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolveNone`
is [VK_FALSE](fundamentals.html#VK_FALSE), the `resolveMode` of both structures **must** be the
same value

[](#VUID-VkRenderingInfo-pDepthAttachment-06105) VUID-VkRenderingInfo-pDepthAttachment-06105

If `pDepthAttachment` or `pStencilAttachment` are both not
`NULL`, `pDepthAttachment->imageView` and
`pStencilAttachment->imageView` are both not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolve`
is [VK_FALSE](fundamentals.html#VK_FALSE), and the `resolveMode` of neither structure is
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), the `resolveMode` of both structures
**must** be the same value

[](#VUID-VkRenderingInfo-colorAttachmentCount-06106) VUID-VkRenderingInfo-colorAttachmentCount-06106

`colorAttachmentCount` **must** be less than or equal to
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxColorAttachments`

[](#VUID-VkRenderingInfo-imageView-06107) VUID-VkRenderingInfo-imageView-06107

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and the
[    `fragmentDensityMapNonSubsampledImages`](features.html#features-fragmentDensityMapNonSubsampledImages) feature is not enabled,
valid `imageView` and `resolveImageView` members of
`pDepthAttachment`, `pStencilAttachment`, and each element of
`pColorAttachments` **must** be a [VkImageView](resources.html#VkImageView) created with
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits)

[](#VUID-VkRenderingInfo-imageView-06108) VUID-VkRenderingInfo-imageView-06108

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and `viewMask`
is not `0`, `imageView` **must** have a `layerCount` greater than
or equal to the index of the most significant bit in `viewMask`

[](#VUID-VkRenderingInfo-imageView-06109) VUID-VkRenderingInfo-imageView-06109

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and `viewMask`
is `0`, `imageView` **must** have a `layerCount` equal to `1`

[](#VUID-VkRenderingInfo-pNext-06112) VUID-VkRenderingInfo-pNext-06112

If
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0 and
the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView`
**must** have a width greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06114) VUID-VkRenderingInfo-pNext-06114

If
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0 and
the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView`
**must** have a height greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06113) VUID-VkRenderingInfo-pNext-06113

If the `pNext` chain contains a
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) structure, its
`deviceRenderAreaCount` member is not 0, and the `imageView`
member of a [VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT)
structure included in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`imageView` **must** have a width greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pNext-06115) VUID-VkRenderingInfo-pNext-06115

If the `pNext` chain contains a
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) structure, its
`deviceRenderAreaCount` member is not 0, and the `imageView`
member of a [VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT)
structure included in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`imageView` **must** have a height greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-imageView-06116) VUID-VkRenderingInfo-imageView-06116

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** not be
equal to the `imageView` or `resolveImageView` member of
`pDepthAttachment`, `pStencilAttachment`, or any element of
`pColorAttachments`

[](#VUID-VkRenderingInfo-flags-10826) VUID-VkRenderingInfo-flags-10826

If `flags` contains
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderingFlagBitsKHR), then
`layerCount` **must** be less than or equal to
[    `maxFragmentDensityMapLayers`](limits.html#limits-maxFragmentDensityMapLayers)

[](#VUID-VkRenderingInfo-fragmentDensityMapLayered-10827) VUID-VkRenderingInfo-fragmentDensityMapLayered-10827

If the [    `fragmentDensityMapLayered`](features.html#features-fragmentDensityMapLayered) feature is not enabled, `flags`
**must** not contain
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderingFlagBitsKHR)

[](#VUID-VkRenderingInfo-pNext-06119) VUID-VkRenderingInfo-pNext-06119

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0,
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0, and
the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView`
**must** have a width greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06121) VUID-VkRenderingInfo-pNext-06121

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0,
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0 and
the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView`
**must** have a height greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06120) VUID-VkRenderingInfo-pNext-06120

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0,
the `pNext` chain contains a [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo)
structure, its `deviceRenderAreaCount` member is not 0, and the
`imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView`
**must** have a width greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pNext-06122) VUID-VkRenderingInfo-pNext-06122

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0,
the `pNext` chain contains a [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo)
structure, its `deviceRenderAreaCount` member is not 0, and the
`imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView`
**must** have a height greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-imageView-06123) VUID-VkRenderingInfo-imageView-06123

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and `viewMask`
is `0`, `imageView` **must** have a `layerCount` that is either
equal to `1` or greater than or equal to
`VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-imageView-06124) VUID-VkRenderingInfo-imageView-06124

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and `viewMask`
is not `0`, `imageView` **must** have a `layerCount` that either
equal to `1` or greater than or equal to the index of the most
significant bit in `viewMask`

[](#VUID-VkRenderingInfo-imageView-06125) VUID-VkRenderingInfo-imageView-06125

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** not be
equal to the `imageView` or `resolveImageView` member of
`pDepthAttachment`, `pStencilAttachment`, or any element of
`pColorAttachments`

[](#VUID-VkRenderingInfo-imageView-06126) VUID-VkRenderingInfo-imageView-06126

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** not be
equal to the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain

[](#VUID-VkRenderingInfo-multiview-06127) VUID-VkRenderingInfo-multiview-06127

If the [`multiview`](features.html#features-multiview) feature is not enabled,
`viewMask` **must** be `0`

[](#VUID-VkRenderingInfo-viewMask-06128) VUID-VkRenderingInfo-viewMask-06128

The index of the most significant bit in `viewMask` **must** be less
than [`maxMultiviewViewCount`](devsandqueues.html#limits-maxMultiviewViewCount)

[](#VUID-VkRenderingInfo-perViewRenderAreaCount-07857) VUID-VkRenderingInfo-perViewRenderAreaCount-07857

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM) structure
included in the `pNext` chain is not `0`, then the
[    `multiviewPerViewRenderAreas`](features.html#features-multiviewPerViewRenderAreas) feature **must** be enabled

[](#VUID-VkRenderingInfo-perViewRenderAreaCount-07858) VUID-VkRenderingInfo-perViewRenderAreaCount-07858

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM) structure
included in the `pNext` chain is not `0`, then `renderArea`
**must** specify a render area that includes the union of all per view
render areas

[](#VUID-VkRenderingInfo-None-09044) VUID-VkRenderingInfo-None-09044

Valid attachments specified by this structure **must** not be bound to
memory locations that are bound to any other valid attachments specified
by this structure

[](#VUID-VkRenderingInfo-flags-10012) VUID-VkRenderingInfo-flags-10012

If `flags` includes [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](#VkRenderingFlagBitsKHR) then
at least one of the following features **must** be enabled

* 
[`maintenance7`](features.html#features-maintenance7)

* 
[`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)

[](#VUID-VkRenderingInfo-pDepthAttachment-09318) VUID-VkRenderingInfo-pDepthAttachment-09318

`pDepthAttachment->resolveMode` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingInfo-pStencilAttachment-09319) VUID-VkRenderingInfo-pStencilAttachment-09319

`pStencilAttachment->resolveMode` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingInfo-colorAttachmentCount-09320) VUID-VkRenderingInfo-colorAttachmentCount-09320

If `colorAttachmentCount` is not `1`, the `resolveMode` member
of any element of `pColorAttachments` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingInfo-resolveMode-09321) VUID-VkRenderingInfo-resolveMode-09321

If the `resolveMode` of any element of `pColorAttachments` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT)::`imageView`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkRenderingInfo-resolveMode-09322) VUID-VkRenderingInfo-resolveMode-09322

If the `resolveMode` of any element of `pColorAttachments` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR)::`imageView`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkRenderingInfo-pNext-09535) VUID-VkRenderingInfo-pNext-09535

If the `pNext` chain contains a [VkRenderPassStripeBeginInfoARM](#VkRenderPassStripeBeginInfoARM)
structure, the union of stripe areas defined by the elements of
[VkRenderPassStripeBeginInfoARM](#VkRenderPassStripeBeginInfoARM)::`pStripeInfos` **must** cover the
`renderArea`

[](#VUID-VkRenderingInfo-colorAttachmentCount-09479) VUID-VkRenderingInfo-colorAttachmentCount-09479

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
that `imageView` **must** have been created with the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-colorAttachmentCount-09480) VUID-VkRenderingInfo-colorAttachmentCount-09480

If `colorAttachmentCount` is not `0`, and there is an element of
`pColorAttachments` with
either its `resolveMode` member set to
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR), or
its `imageView` member not set to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and its
`resolveMode` member not set to [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), the
`resolveImageView` member of that element of `pColorAttachments`
**must** have been created with the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pDepthAttachment-09481) VUID-VkRenderingInfo-pDepthAttachment-09481

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pDepthAttachment->imageView` **must** have been created with the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pDepthAttachment-09482) VUID-VkRenderingInfo-pDepthAttachment-09482

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pDepthAttachment->resolveImageView` **must** have been created with
the [identity swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pStencilAttachment-09483) VUID-VkRenderingInfo-pStencilAttachment-09483

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`pStencilAttachment->imageView` **must** have been created with the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pStencilAttachment-09484) VUID-VkRenderingInfo-pStencilAttachment-09484

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR),
`pStencilAttachment->resolveImageView` **must** have been created with
the [identity swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-imageView-09485) VUID-VkRenderingInfo-imageView-09485

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been
created with the [identity    swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-imageView-09486) VUID-VkRenderingInfo-imageView-09486

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been
created with the [identity    swizzle](resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-imageView-10643) VUID-VkRenderingInfo-imageView-10643

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

[](#VUID-VkRenderingInfo-resolveMode-10644) VUID-VkRenderingInfo-resolveMode-10644

If the `resolveMode` of any element of `pColorAttachments` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingInfo-sType-sType) VUID-VkRenderingInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingInfo-pNext-pNext) VUID-VkRenderingInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo), [VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT), [VkMultiviewPerViewAttributesInfoNVX](#VkMultiviewPerViewAttributesInfoNVX), [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM), [VkRenderPassPerformanceCountersByRegionBeginInfoARM](#VkRenderPassPerformanceCountersByRegionBeginInfoARM), [VkRenderPassStripeBeginInfoARM](#VkRenderPassStripeBeginInfoARM), [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM), [VkRenderingFragmentDensityMapAttachmentInfoEXT](#VkRenderingFragmentDensityMapAttachmentInfoEXT), [VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR), or [VkTileMemorySizeInfoQCOM](#VkTileMemorySizeInfoQCOM)

* 
[](#VUID-VkRenderingInfo-sType-unique) VUID-VkRenderingInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderingInfo-flags-parameter) VUID-VkRenderingInfo-flags-parameter

 `flags` **must** be a valid combination of [VkRenderingFlagBits](#VkRenderingFlagBits) values

* 
[](#VUID-VkRenderingInfo-pColorAttachments-parameter) VUID-VkRenderingInfo-pColorAttachments-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo) structures

* 
[](#VUID-VkRenderingInfo-pDepthAttachment-parameter) VUID-VkRenderingInfo-pDepthAttachment-parameter

 If `pDepthAttachment` is not `NULL`, `pDepthAttachment` **must** be a valid pointer to a valid [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo) structure

* 
[](#VUID-VkRenderingInfo-pStencilAttachment-parameter) VUID-VkRenderingInfo-pStencilAttachment-parameter

 If `pStencilAttachment` is not `NULL`, `pStencilAttachment` **must** be a valid pointer to a valid [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo) structure

Bits which **can** be set in [VkRenderingInfo](#VkRenderingInfo)::`flags` describing
additional properties of the render pass are:

// Provided by VK_VERSION_1_3
typedef enum VkRenderingFlagBits {
    VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT = 0x00000001,
    VK_RENDERING_SUSPENDING_BIT = 0x00000002,
    VK_RENDERING_RESUMING_BIT = 0x00000004,
  // Provided by VK_EXT_legacy_dithering with (VK_KHR_dynamic_rendering or VK_VERSION_1_3) and (VK_KHR_maintenance5 or VK_VERSION_1_4)
    VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT = 0x00000008,
  // Provided by VK_KHR_maintenance7
    VK_RENDERING_CONTENTS_INLINE_BIT_KHR = 0x00000010,
  // Provided by VK_VALVE_fragment_density_map_layered
    VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE = 0x00000020,
  // Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_RENDERING_FRAGMENT_REGION_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT = 0x00000080,
  // Provided by VK_KHR_maintenance10 with (VK_VERSION_1_4 or VK_KHR_dynamic_rendering_local_read) and (VK_VERSION_1_3 or VK_KHR_dynamic_rendering)
    VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR = 0x00000100,
  // Provided by VK_KHR_dynamic_rendering
    VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT_KHR = VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT,
  // Provided by VK_KHR_dynamic_rendering
    VK_RENDERING_SUSPENDING_BIT_KHR = VK_RENDERING_SUSPENDING_BIT,
  // Provided by VK_KHR_dynamic_rendering
    VK_RENDERING_RESUMING_BIT_KHR = VK_RENDERING_RESUMING_BIT,
  // Provided by VK_EXT_nested_command_buffer
    VK_RENDERING_CONTENTS_INLINE_BIT_EXT = VK_RENDERING_CONTENTS_INLINE_BIT_KHR,
} VkRenderingFlagBits;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkRenderingFlagBits
typedef VkRenderingFlagBits VkRenderingFlagBitsKHR;

* 
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](#VkRenderingFlagBitsKHR) specifies that
draw calls for the render pass instance will be recorded in secondary
command buffers.
If the [`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)
feature is enabled, the draw calls **can** come from both inline and
[vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands).

* 
[VK_RENDERING_RESUMING_BIT](#VkRenderingFlagBitsKHR) specifies that the render pass instance
is resuming an earlier suspended render pass instance.

* 
[VK_RENDERING_SUSPENDING_BIT](#VkRenderingFlagBitsKHR) specifies that the render pass
instance will be suspended.

* 
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](#VkRenderingFlagBitsKHR) specifies that
[Legacy Dithering](interfaces.html#interfaces-legacy-dithering) is enabled for the
render pass instance.

* 
[VK_RENDERING_CONTENTS_INLINE_BIT_KHR](#VkRenderingFlagBitsKHR) specifies that draw calls for
the render pass instance **can** be recorded inline within the current
command buffer.
This **can** be combined with the
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](#VkRenderingFlagBitsKHR) bit to allow
draw calls to be recorded both inline and in secondary command buffers.

* 
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderingFlagBitsKHR) specifies that
the render pass **can** be used with layered fragment density maps.

* 
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](#VkRenderingFlagBitsKHR)
specifies that
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR) will
always be specified for any attachment which invokes the behavior
described by [that    flag](#rendering-attachment-input-attachment-feedback).

* 
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](#VkRenderingFlagBitsKHR) specifies that the render
pass **can** access samples which are not covered in its `SampleMask`.

* 
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR) specifies that the render pass
contains a custom resolve.
When this bit is set, [vkCmdBeginCustomResolveEXT](#vkCmdBeginCustomResolveEXT) **can** be called.

The contents of `pRenderingInfo` **must** match between suspended render
pass instances and the render pass instances that resume them, other than
the presence or absence of the [VK_RENDERING_RESUMING_BIT](#VkRenderingFlagBitsKHR),
[VK_RENDERING_SUSPENDING_BIT](#VkRenderingFlagBitsKHR), and
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](#VkRenderingFlagBitsKHR) flags.
No action or synchronization commands, or other render pass instances, are
allowed between suspending and resuming render pass instances.

// Provided by VK_VERSION_1_3
typedef VkFlags VkRenderingFlags;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkRenderingFlags
typedef VkRenderingFlags VkRenderingFlagsKHR;

`VkRenderingFlags` is a bitmask type for setting a mask of zero or more
[VkRenderingFlagBits](#VkRenderingFlagBits).

The `VkRenderingAttachmentInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkRenderingAttachmentInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageView              imageView;
    VkImageLayout            imageLayout;
    VkResolveModeFlagBits    resolveMode;
    VkImageView              resolveImageView;
    VkImageLayout            resolveImageLayout;
    VkAttachmentLoadOp       loadOp;
    VkAttachmentStoreOp      storeOp;
    VkClearValue             clearValue;
} VkRenderingAttachmentInfo;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkRenderingAttachmentInfo
typedef VkRenderingAttachmentInfo VkRenderingAttachmentInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view that will be used for rendering.

* 
`imageLayout` is the layout that `imageView` will be in during
rendering.

* 
`resolveMode` is a [VkResolveModeFlagBits](#VkResolveModeFlagBits) value defining how
data written to `imageView` will be resolved into
`resolveImageView`.

* 
`resolveImageView` is an image view used to write resolved data at
the end of rendering.

* 
`resolveImageLayout` is the layout that `resolveImageView` will
be in during rendering.

* 
`loadOp` is a [VkAttachmentLoadOp](#VkAttachmentLoadOp) value defining the
[load operation](#renderpass-load-operations) for the attachment.

* 
`storeOp` is a [VkAttachmentStoreOp](#VkAttachmentStoreOp) value defining the
[store operation](#renderpass-store-operations) for the attachment.

* 
`clearValue` is a [VkClearValue](clears.html#VkClearValue) structure defining values used
to clear `imageView` when `loadOp` is
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp).

Values in `imageView` are loaded and stored according to the values of
`loadOp` and `storeOp`, within the render area
for each device
specified in [VkRenderingInfo](#VkRenderingInfo).
If `imageView` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and `resolveMode` is not
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
other members of this structure are ignored; writes to this attachment will
be discarded, and no [load](#renderpass-load-operations),
[store](#renderpass-store-operations), or [multisample resolve](#renderpass-resolve-operations) operations will be performed.

If `resolveMode` is [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), then
`resolveImageView` is ignored.
If `resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), and
`resolveImageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a
[render pass multisample resolve operation](#renderpass-resolve-operations)
is defined for the attachment subresource.
If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR), and the
[`nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](fundamentals.html#VK_TRUE),
values are only **undefined** once [load operations](#renderpass-load-operations) have completed.

The contents of a resolve attachment within the render area become
**undefined** at the time [vkCmdBeginCustomResolveEXT](#vkCmdBeginCustomResolveEXT) is called if all of
the following conditions are true:

* 
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR) is set.

* 
The attachment sets `resolveMode` to
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR).

This affects color, depth, and stencil attachments.
In addition, there is an implicit [store operation](#renderpass-store-operations) of [VK_ATTACHMENT_STORE_OP_STORE](#VkAttachmentStoreOp) for these attachments.

|  | The resolve mode and store operation are independent; it is valid to write
| --- | --- |
both resolved and unresolved values, and equally valid to discard the
unresolved values while writing the resolved ones. |

Store and resolve operations are only performed at the end of a render pass
instance that does not specify the [VK_RENDERING_SUSPENDING_BIT_KHR](#VkRenderingFlagBitsKHR)
flag.
If the [VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR) is specified and an
attachment uses the [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) resolve mode, the
resolve attachment will only be written by draws recorded following a call
to [vkCmdBeginCustomResolveEXT](#vkCmdBeginCustomResolveEXT).

Load operations are only performed at the beginning of a render pass
instance that does not specify the [VK_RENDERING_RESUMING_BIT_KHR](#VkRenderingFlagBitsKHR) flag.

Image contents at the end of a suspended render pass instance remain defined
for access by a resuming render pass instance.

If the [`nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](fundamentals.html#VK_TRUE),
and `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR), values in the
color attachment will be loaded from the resolve attachment at the start of
rendering, and **may** also be reloaded any time after a resolve occurs or the
resolve attachment is written to; if this occurs it **must** happen-before any
writes to the color attachment are performed which happen-after the resolve
that triggers this.
If any color component in the external format is subsampled, values will be
read from the nearest sample in the image when they are loaded.

Valid Usage

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-06129) VUID-VkRenderingAttachmentInfo-imageView-06129

    If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and has a non-integer
    color format, `resolveMode` **must** be [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR) or
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) or
    [VK_RESOLVE_MODE_AVERAGE_BIT](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-06130) VUID-VkRenderingAttachmentInfo-imageView-06130

    If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and has an integer color
    format, `resolveMode` **must** be [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR) or
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) or
    [VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-06861) VUID-VkRenderingAttachmentInfo-imageView-06861

If all of the following are true:

`imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
`resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
the `pNext` chain of [VkRenderingInfo](#VkRenderingInfo) does not include a
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](fundamentals.html#VK_TRUE)

`imageView` **must** not have a sample count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

[](#VUID-VkRenderingAttachmentInfo-imageView-06862) VUID-VkRenderingAttachmentInfo-imageView-06862

If all of the following are true:

* 
`imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
`resolveMode` is not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
the `pNext` chain of [VkRenderingInfo](#VkRenderingInfo) does not include a
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](fundamentals.html#VK_TRUE)

`resolveImageView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkRenderingAttachmentInfo-imageView-06863) VUID-VkRenderingAttachmentInfo-imageView-06863

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `resolveMode` is not
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), the `pNext` chain of
[VkRenderingInfo](#VkRenderingInfo) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](fundamentals.html#VK_TRUE), and `imageView` has a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), `resolveImageView` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkRenderingAttachmentInfo-None-12256) VUID-VkRenderingAttachmentInfo-None-12256

If all of the following are true:

* 
`imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
`imageView` has a sample count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
the `pNext` chain of [VkRenderingInfo](#VkRenderingInfo) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](fundamentals.html#VK_TRUE)

then `resolveMode` **must** not be [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingAttachmentInfo-imageView-06864) VUID-VkRenderingAttachmentInfo-imageView-06864

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `resolveImageView`
is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and `resolveMode` is not
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageView` **must** have a sample
count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

[](#VUID-VkRenderingAttachmentInfo-imageView-06865) VUID-VkRenderingAttachmentInfo-imageView-06865

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `resolveImageView`
is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and `resolveMode` is
neither [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) nor
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `imageView` and `resolveImageView`
**must** have the same [VkFormat](formats.html#VkFormat)

[](#VUID-VkRenderingAttachmentInfo-imageView-06135) VUID-VkRenderingAttachmentInfo-imageView-06135

    If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
    not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout), or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06136) VUID-VkRenderingAttachmentInfo-imageView-06136

    If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
    not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
    [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout), or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06137) VUID-VkRenderingAttachmentInfo-imageView-06137

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06138) VUID-VkRenderingAttachmentInfo-imageView-06138

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
not be [VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06139) VUID-VkRenderingAttachmentInfo-imageView-06139

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06140) VUID-VkRenderingAttachmentInfo-imageView-06140

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
not be [VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06141) VUID-VkRenderingAttachmentInfo-imageView-06141

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06142) VUID-VkRenderingAttachmentInfo-imageView-06142

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06143) VUID-VkRenderingAttachmentInfo-imageView-06143

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
not be
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06144) VUID-VkRenderingAttachmentInfo-imageView-06144

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-10780) VUID-VkRenderingAttachmentInfo-imageView-10780

If [feedback loop is enabled](#renderpass-feedbackloop) for the
attachment identified by `imageView`, then `imageView` **must**
have been created with a `usage` value including
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits), either
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits), and either
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits)

[](#VUID-VkRenderingAttachmentInfo-imageView-06145) VUID-VkRenderingAttachmentInfo-imageView-06145

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
not be [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-imageView-06146) VUID-VkRenderingAttachmentInfo-imageView-06146

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](resources.html#VkImageLayout)

[](#VUID-VkRenderingAttachmentInfo-externalFormatResolve-09323) VUID-VkRenderingAttachmentInfo-externalFormatResolve-09323

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled, `resolveMode` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09324) VUID-VkRenderingAttachmentInfo-resolveMode-09324

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
`resolveImageView` **must** be a valid image view

[](#VUID-VkRenderingAttachmentInfo-nullColorAttachmentWithExternalFormatResolve-09325) VUID-VkRenderingAttachmentInfo-nullColorAttachmentWithExternalFormatResolve-09325

If the [    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_TRUE](fundamentals.html#VK_TRUE) and `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
`resolveImageView` **must** have been created with an image with a
`samples` value of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09326) VUID-VkRenderingAttachmentInfo-resolveMode-09326

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
`resolveImageView` **must** have been created with an external format
specified by [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09327) VUID-VkRenderingAttachmentInfo-resolveMode-09327

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR),
`resolveImageView` **must** have been created with a
`subresourceRange.layerCount` of `1`

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09328) VUID-VkRenderingAttachmentInfo-resolveMode-09328

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR) and
[    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_TRUE](fundamentals.html#VK_TRUE),
`imageView` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09329) VUID-VkRenderingAttachmentInfo-resolveMode-09329

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR) and
[    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](fundamentals.html#VK_FALSE),
`imageView` **must** be a valid [VkImageView](resources.html#VkImageView)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09330) VUID-VkRenderingAttachmentInfo-resolveMode-09330

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR) and
[    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](fundamentals.html#VK_FALSE),
`imageView` **must** have a format equal to the value of
[VkAndroidHardwareBufferFormatResolvePropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatResolvePropertiesANDROID)::`colorAttachmentFormat`
as returned by a call to
[vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) for the Android
hardware buffer that was used to create `resolveImageView`

[](#VUID-VkRenderingAttachmentInfo-resolveImageView-10728) VUID-VkRenderingAttachmentInfo-resolveImageView-10728

If `resolveImageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the underlying
resource must not be bound to a `VkDeviceMemory` object allocated
from a `VkMemoryHeap` with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property

[](#VUID-VkRenderingAttachmentInfo-pNext-11752) VUID-VkRenderingAttachmentInfo-pNext-11752

If the `pNext` chain includes a
[VkRenderingAttachmentFlagsInfoKHR](#VkRenderingAttachmentFlagsInfoKHR) structure, and `flags`
includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR) or
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR),
`imageView` **must** have a format using sRGB encoding

[](#VUID-VkRenderingAttachmentInfo-pNext-11753) VUID-VkRenderingAttachmentInfo-pNext-11753

If the `pNext` chain includes a
[VkRenderingAttachmentFlagsInfoKHR](#VkRenderingAttachmentFlagsInfoKHR) structure, and `flags`
includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR) or
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR),
`resolveMode` **must** be equal to [VK_RESOLVE_MODE_AVERAGE_BIT](#VkResolveModeFlagBitsKHR)

[](#VUID-VkRenderingAttachmentInfo-pNext-11754) VUID-VkRenderingAttachmentInfo-pNext-11754

If the `pNext` chain includes a
[VkRenderingAttachmentFlagsInfoKHR](#VkRenderingAttachmentFlagsInfoKHR) structure, and `flags`
includes
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR),
`imageView` **must** have an image that was created with the
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAttachmentInfo-sType-sType) VUID-VkRenderingAttachmentInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingAttachmentInfo-pNext-pNext) VUID-VkRenderingAttachmentInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentFeedbackLoopInfoEXT](#VkAttachmentFeedbackLoopInfoEXT) or [VkRenderingAttachmentFlagsInfoKHR](#VkRenderingAttachmentFlagsInfoKHR)

* 
[](#VUID-VkRenderingAttachmentInfo-sType-unique) VUID-VkRenderingAttachmentInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-parameter) VUID-VkRenderingAttachmentInfo-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-VkRenderingAttachmentInfo-imageLayout-parameter) VUID-VkRenderingAttachmentInfo-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkRenderingAttachmentInfo-resolveMode-parameter) VUID-VkRenderingAttachmentInfo-resolveMode-parameter

 If `resolveMode` is not `0`, `resolveMode` **must** be a valid [VkResolveModeFlagBits](#VkResolveModeFlagBits) value

* 
[](#VUID-VkRenderingAttachmentInfo-resolveImageView-parameter) VUID-VkRenderingAttachmentInfo-resolveImageView-parameter

 If `resolveImageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `resolveImageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-VkRenderingAttachmentInfo-resolveImageLayout-parameter) VUID-VkRenderingAttachmentInfo-resolveImageLayout-parameter

 `resolveImageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkRenderingAttachmentInfo-loadOp-parameter) VUID-VkRenderingAttachmentInfo-loadOp-parameter

 `loadOp` **must** be a valid [VkAttachmentLoadOp](#VkAttachmentLoadOp) value

* 
[](#VUID-VkRenderingAttachmentInfo-storeOp-parameter) VUID-VkRenderingAttachmentInfo-storeOp-parameter

 `storeOp` **must** be a valid [VkAttachmentStoreOp](#VkAttachmentStoreOp) value

* 
[](#VUID-VkRenderingAttachmentInfo-clearValue-parameter) VUID-VkRenderingAttachmentInfo-clearValue-parameter

 `clearValue` **must** be a valid [VkClearValue](clears.html#VkClearValue) union

* 
[](#VUID-VkRenderingAttachmentInfo-commonparent) VUID-VkRenderingAttachmentInfo-commonparent

 Both of `imageView`, and `resolveImageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

To specify an attachment as an *input attachment* or to specify resolve
operation flags, the `VkRenderingAttachmentFlagsInfoKHR` structure **can**
be added to the `pNext` chain of [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo).

The `VkRenderingAttachmentFlagsInfoKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkRenderingAttachmentFlagsInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkRenderingAttachmentFlagsKHR    flags;
} VkRenderingAttachmentFlagsInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderingAttachmentFlagsKHR](#VkRenderingAttachmentFlagsKHR)

Valid Usage

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11755) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11755

`flags` **must** not include
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR)
if the
[`dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead)
feature is not enabled

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11756) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11756

If `flags` includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR),
`flags` **must** not include
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR)

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11757) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11757

If `flags` includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR) or
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR),
[`resolveSrgbFormatSupportsTransferFunctionControl`](limits.html#limits-resolveSrgbFormatSupportsTransferFunctionControl)
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-sType-sType) VUID-VkRenderingAttachmentFlagsInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_FLAGS_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-parameter) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkRenderingAttachmentFlagBitsKHR](#VkRenderingAttachmentFlagBitsKHR) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo)

Bits which **can** be set in
[VkRenderingAttachmentFlagsInfoKHR](#VkRenderingAttachmentFlagsInfoKHR)::`flags`, describing additional
properties of a rendering attachment, are:

// Provided by VK_KHR_maintenance10
typedef enum VkRenderingAttachmentFlagBitsKHR {
  // Provided by VK_KHR_maintenance10 with (VK_VERSION_1_4 or VK_KHR_dynamic_rendering_local_read) and (VK_VERSION_1_3 or VK_KHR_dynamic_rendering)
    VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR = 0x00000001,
  // Provided by VK_KHR_maintenance10 with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_maintenance10 with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR = 0x00000004,
} VkRenderingAttachmentFlagBitsKHR;

* 
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR)
specifies that the attachment **can** be used concurrently as both an input
attachment and a write-only attachment during the render pass, creating
a feedback loop while processing a fragment, and without a
[VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits) barrier separating the write
attachment and input attachment usage.
Using this flag does not remove the general requirement to use a
[VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits) barrier to resolve hazards when two
different fragments accesses a particular attachment region, where one
of them performs an attachment write, and a subsequent fragment performs
an input attachment read.
If [VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](#VkRenderingFlagBitsKHR) is
specified in the rendering info, this flag **must** be set for an
attachment to be used concurrently as an input attachment and a write
attachment in this manner.
If [VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](#VkRenderingFlagBitsKHR) is
not specified in the rendering info, this flag is implied to be set for
any attachment which has a combination of image layouts and image view
usage flags which support input attachment usage.

* 
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR)
specifies that resolve operations happening to an sRGB encoded
attachment **must** not convert samples from nonlinear to linear before
averaging.

* 
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR)
specifies that resolve operations happening to an sRGB encoded
attachment **must** convert samples from nonlinear to linear before
averaging.

|  | [VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#VkRenderingAttachmentFlagBitsKHR) is intended
| --- | --- |
to give implementations similar information as a subpass where an attachment
could be used as both a color attachment and input attachment.
Some implementations require extra work to make this scenario work beyond
just considering the image layouts.
Implementations which have no such considerations may treat this flag as a
noop.
The primary use case for this flag is to enable feedback loops inside a
single shader.

Applications are encouraged to use
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](#VkRenderingFlagBitsKHR) if
[`maintenance10`](features.html#features-maintenance10) is available and they use
feedback loops with [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read).
Feedback loops are still allowed when not using the rendering flag, but the
performance implication was an oversight in the original definition of
[VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). |

|  | In some scenarios, resolving sRGB in nonlinear space instead of the expected
| --- | --- |
linear space can improve perceptual aliasing at the cost of inaccurate color
blending. |

// Provided by VK_KHR_maintenance10
typedef VkFlags VkRenderingAttachmentFlagsKHR;

`VkRenderingAttachmentFlagsKHR` is a bitmask type for setting a mask of
zero or more [VkRenderingAttachmentFlagBitsKHR](#VkRenderingAttachmentFlagBitsKHR).

To [enable feedback loop](#renderpass-feedbackloop) for an attachment, the
`VkAttachmentFeedbackLoopInfoEXT` structure **can** be added to the
`pNext` chain of [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo).

The `VkAttachmentFeedbackLoopInfoEXT` structure is defined as:

// Provided by VK_KHR_unified_image_layouts with VK_EXT_attachment_feedback_loop_layout and (VK_VERSION_1_3 or VK_KHR_dynamic_rendering)
typedef struct VkAttachmentFeedbackLoopInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           feedbackLoopEnable;
} VkAttachmentFeedbackLoopInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`feedbackLoopEnable` specifies that
[feedback loop is enabled](#renderpass-feedbackloop) for the attachment
identified by [VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo)::`imageView`.

Valid Usage

* 
[](#VUID-VkAttachmentFeedbackLoopInfoEXT-unifiedImageLayouts-10782) VUID-VkAttachmentFeedbackLoopInfoEXT-unifiedImageLayouts-10782

If the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts)
feature is not enabled, `feedbackLoopEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentFeedbackLoopInfoEXT-sType-sType) VUID-VkAttachmentFeedbackLoopInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_FEEDBACK_LOOP_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo)

The `VkRenderingFragmentShadingRateAttachmentInfoKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shading_rate with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkRenderingFragmentShadingRateAttachmentInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
    VkImageLayout      imageLayout;
    VkExtent2D         shadingRateAttachmentTexelSize;
} VkRenderingFragmentShadingRateAttachmentInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view that will be used as a fragment
shading rate attachment.

* 
`imageLayout` is the layout that `imageView` will be in during
rendering.

* 
`shadingRateAttachmentTexelSize` specifies the number of pixels
corresponding to each texel in `imageView`.

This structure can be included in the `pNext` chain of
[VkRenderingInfo](#VkRenderingInfo) to define a
[fragment shading rate attachment](primsrast.html#primsrast-fragment-shading-rate-attachment).
If `imageView` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), or if this structure is not
specified, the implementation behaves as if a valid shading rate attachment
was specified with all texels specifying a single pixel per fragment.

Valid Usage

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06147) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06147

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06148) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06148

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been
created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flag
set_KHR

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06149) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06149

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`shadingRateAttachmentTexelSize.width` **must** be a power of two value

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06150) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06150

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.width`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06151) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06151

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`shadingRateAttachmentTexelSize.width` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.width`](limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06152) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06152

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`shadingRateAttachmentTexelSize.height` **must** be a power of two
value

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06153) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06153

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.height`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06154) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06154

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`shadingRateAttachmentTexelSize.height` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.height`](limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06155) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06155

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the quotient of
`shadingRateAttachmentTexelSize.width` and
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06156) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06156

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the quotient of
`shadingRateAttachmentTexelSize.height` and
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-sType-sType) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-parameter) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageLayout-parameter) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingInfo](#VkRenderingInfo)

The `VkRenderingFragmentDensityMapAttachmentInfoEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkRenderingFragmentDensityMapAttachmentInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
    VkImageLayout      imageLayout;
} VkRenderingFragmentDensityMapAttachmentInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view that will be used as a fragment
density map attachment.

* 
`imageLayout` is the layout that `imageView` will be in during
rendering.

This structure can be included in the `pNext` chain of
[VkRenderingInfo](#VkRenderingInfo) to define a fragment density map.
If this structure is not included in the `pNext` chain, `imageView`
is treated as [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

Valid Usage

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06157) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06157

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
be [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06158) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06158

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been
created with the [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06159) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06159

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** not have been
created with [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-apiVersion-07908) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-apiVersion-07908

If
the [`multiview`](features.html#features-multiview) feature is not enabled,
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
1.1, and
`imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have a
`layerCount` equal to `1`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-sType-sType) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-parameter) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-parameter

 `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageLayout-parameter) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingInfo](#VkRenderingInfo)

To query the render area granularity for a render pass instance, call:

// Provided by VK_VERSION_1_4
void vkGetRenderingAreaGranularity(
    VkDevice                                    device,
    const VkRenderingAreaInfo*                  pRenderingAreaInfo,
    VkExtent2D*                                 pGranularity);

// Provided by VK_KHR_maintenance5
// Equivalent to vkGetRenderingAreaGranularity
void vkGetRenderingAreaGranularityKHR(
    VkDevice                                    device,
    const VkRenderingAreaInfo*                  pRenderingAreaInfo,
    VkExtent2D*                                 pGranularity);

* 
`device` is the logical device that owns the render pass instance.

* 
`pRenderingAreaInfo` is a pointer to a [VkRenderingAreaInfo](#VkRenderingAreaInfo)
structure specifying details of the render pass instance to query the
render area granularity for.

* 
`pGranularity` is a pointer to a [VkExtent2D](fundamentals.html#VkExtent2D) structure in which
the granularity is returned.

The conditions leading to an optimal `renderArea` are:

* 
the `offset.x` member in `renderArea` is a multiple of the
`width` member of the returned [VkExtent2D](fundamentals.html#VkExtent2D) (the horizontal
granularity).

* 
the `offset.y` member in `renderArea` is a multiple of the
`height` member of the returned [VkExtent2D](fundamentals.html#VkExtent2D) (the vertical
granularity).

* 
either the `extent.width` member in `renderArea` is a multiple
of the horizontal granularity or `offset.x`+`extent.width` is
equal to the `width` of each attachment used in the render pass
instance.

* 
either the `extent.height` member in `renderArea` is a multiple
of the vertical granularity or `offset.y`+`extent.height` is
equal to the `height` of each attachment used in the render pass
instance.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRenderingAreaGranularity-device-parameter) VUID-vkGetRenderingAreaGranularity-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetRenderingAreaGranularity-pRenderingAreaInfo-parameter) VUID-vkGetRenderingAreaGranularity-pRenderingAreaInfo-parameter

 `pRenderingAreaInfo` **must** be a valid pointer to a valid [VkRenderingAreaInfo](#VkRenderingAreaInfo) structure

* 
[](#VUID-vkGetRenderingAreaGranularity-pGranularity-parameter) VUID-vkGetRenderingAreaGranularity-pGranularity-parameter

 `pGranularity` **must** be a valid pointer to a [VkExtent2D](fundamentals.html#VkExtent2D) structure

The `VkRenderingAreaInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkRenderingAreaInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           viewMask;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
} VkRenderingAreaInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkRenderingAreaInfo
typedef VkRenderingAreaInfo VkRenderingAreaInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewMask` is the viewMask used for rendering.

* 
`colorAttachmentCount` is the number of entries in
`pColorAttachmentFormats`

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](formats.html#VkFormat)
values defining the format of color attachments used in the render pass
instance.

* 
`depthAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the depth attachment used in the render pass instance.

* 
`stencilAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the stencil attachment used in the render pass instance.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAreaInfo-sType-sType) VUID-VkRenderingAreaInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_AREA_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingAreaInfo-pNext-pNext) VUID-VkRenderingAreaInfo-pNext-pNext

 `pNext` **must** be `NULL`

The `VkRenderPassStripeBeginInfoARM` structure is defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkRenderPassStripeBeginInfoARM {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            stripeInfoCount;
    const VkRenderPassStripeInfoARM*    pStripeInfos;
} VkRenderPassStripeBeginInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stripeInfoCount` is the number of stripes in this render pass
instance

* 
`pStripeInfos` is a pointer to an array of `stripeInfoCount`
[VkRenderPassStripeInfoARM](#VkRenderPassStripeInfoARM) structures describing the stripes used
by the render pass instance.

This structure can be included in the `pNext` chain of
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)
or [VkRenderingInfo](#VkRenderingInfo)
to define how the render pass instance is split into stripes.

Valid Usage

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-09450) VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-09450

`stripeInfoCount` **must** be less than or equal to
`VkPhysicalDeviceRenderPassStripedPropertiesARM`::`maxRenderPassStripes`

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-stripeArea-09451) VUID-VkRenderPassStripeBeginInfoARM-stripeArea-09451

The `stripeArea` defined by each element of `pStripeInfos` **must**
not overlap the `stripeArea` of any other element

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-sType-sType) VUID-VkRenderPassStripeBeginInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_BEGIN_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-pStripeInfos-parameter) VUID-VkRenderPassStripeBeginInfoARM-pStripeInfos-parameter

 `pStripeInfos` **must** be a valid pointer to an array of `stripeInfoCount` valid [VkRenderPassStripeInfoARM](#VkRenderPassStripeInfoARM) structures

* 
[](#VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-arraylength) VUID-VkRenderPassStripeBeginInfoARM-stripeInfoCount-arraylength

 `stripeInfoCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

* 
[VkRenderingInfo](#VkRenderingInfo)

The `VkRenderPassStripeInfoARM` structure is defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkRenderPassStripeInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkRect2D           stripeArea;
} VkRenderPassStripeInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stripeArea` is the stripe area, and is described in more detail
below.

`stripeArea` is the render area that is affected by this stripe of the
render pass instance.
It **must** be a subregion of the `renderArea` of the render pass instance.

Valid Usage

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09452) VUID-VkRenderPassStripeInfoARM-stripeArea-09452

`stripeArea.offset.x` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](limits.html#VkPhysicalDeviceRenderPassStripedPropertiesARM)::`renderPassStripeGranularity.width`

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09453) VUID-VkRenderPassStripeInfoARM-stripeArea-09453

`stripeArea.extent.width` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](limits.html#VkPhysicalDeviceRenderPassStripedPropertiesARM)::`renderPassStripeGranularity.width`,
or the sum of `stripeArea.offset.x` and
`stripeArea.extent.width` **must** be equal to the
`renderArea.extent.width` of the render pass instance

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09454) VUID-VkRenderPassStripeInfoARM-stripeArea-09454

`stripeArea.offset.y` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](limits.html#VkPhysicalDeviceRenderPassStripedPropertiesARM)::`renderPassStripeGranularity.height`

* 
[](#VUID-VkRenderPassStripeInfoARM-stripeArea-09455) VUID-VkRenderPassStripeInfoARM-stripeArea-09455

`stripeArea.extent.height` **must** be a multiple of
[VkPhysicalDeviceRenderPassStripedPropertiesARM](limits.html#VkPhysicalDeviceRenderPassStripedPropertiesARM)::`renderPassStripeGranularity.height`,
or the sum of `stripeArea.offset.y` and
`stripeArea.extent.height` **must** be equal to the
`renderArea.extent.height` of the render pass instance

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassStripeInfoARM-sType-sType) VUID-VkRenderPassStripeInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassStripeInfoARM-pNext-pNext) VUID-VkRenderPassStripeInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

The `VkRenderPassPerformanceCountersByRegionBeginInfoARM` structure is
defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkRenderPassPerformanceCountersByRegionBeginInfoARM {
    VkStructureType           sType;
    void*                     pNext;
    uint32_t                  counterAddressCount;
    const VkDeviceAddress*    pCounterAddresses;
    VkBool32                  serializeRegions;
    uint32_t                  counterIndexCount;
    uint32_t*                 pCounterIndices;
} VkRenderPassPerformanceCountersByRegionBeginInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`counterAddressCount` is the number of entries in the
`pCounterAddresses` array.

* 
`pCounterAddresses` is a pointer to an array of
`VkDeviceAddress` where performance counter data will be written.

* 
`serializeRegions` controls whether the implementation serializes
the execution of each region.

* 
`counterIndexCount` is the number of entries in the
`pCounterIndices` array.

* 
`pCounterIndices` is a pointer to an array of
[VkPerformanceCounterARM](devsandqueues.html#VkPerformanceCounterARM)::`counterID` values, as enumerated by
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM](devsandqueues.html#vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM),
to enable in this render pass instance.

Performance counters values are written to each element of
`pCounterAddresses` in an implementation-dependent manner.
These writes execute in the
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage.

The index into this array is calculated as:

uint32_t index = s * L + l;

where `s` is the physical subpass index, `L` is the maximum number
of
views or
layers in the current render pass instance, and `l` is the index of the
current
view or
layer.

When using a render pass object with multiple subpasses, an implementation
**may** merge one more subpasses.
The physical subpass index represents the index into the set of subpasses
that remain after such merge operations are done.

|  | The `[VK_EXT_subpass_merge_feedback](../appendices/extensions.html#VK_EXT_subpass_merge_feedback)` extension can be used to
| --- | --- |
determine which if any subpasses have been merged.
The physical subpass index is equal to the `postMergeIndex` value provided
in [VkRenderPassSubpassFeedbackInfoEXT](#VkRenderPassSubpassFeedbackInfoEXT). |

Within each element of `pCounterAddresses`, counter values are written
in framebuffer-space order if
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM)::`identityTransformOrder`
is [VK_TRUE](fundamentals.html#VK_TRUE).

Each counter value is written as an unsigned 32-bit integer value.

If the render pass has a fragment density map, performance counter values
are only written for regions where the fragment area is unchanged.

Valid Usage

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-11815) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-11815

`counterAddressCount` **must** be equal to S × L, where S
is the number of subpasses in the current render pass instance, and L is
the number of layers in the current render pass instance
or the index of the most significant bit of any view mask in the current
render pass instance

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11816) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11816

For each element of `pCounterAddresses` that is not `0`, if the
buffer from which it was queried is non-sparse then it **must** be bound
completely and contiguously to a single [VkDeviceMemory](memory.html#VkDeviceMemory) object

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11817) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11817

For each element of `pCounterAddresses`[i], all device addresses
between `pCounterAddresses`[i] and `pCounterAddresses`[i] plus N -
1, **must** be in the buffer device address range of the same buffer, where
N is given by \(N = \mathbin{align}\left(\left\lceil w/rsw
\right\rceil \times \mathbin{align}\left(c \times sizeof(uint32\_t),
ra\right), rsa\right) \times \left\lceil h/rsh \right\rceil\), where
`w` is the value of
[VkRenderingInfo](#VkRenderingInfo)::`renderArea.extent.width`, `h` is the
value of [VkRenderingInfo](#VkRenderingInfo)::`renderArea.extent.height`,
`rsw` is the value of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM)::`performanceCounterRegionSize.width`,
`rsh` is the value of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM)::`performanceCounterRegionSize.height`,
`c` is the value of `counterIndexCount`, `ra` is the value
of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM)::`regionAlignment`,
and `rsa` is the value of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM)::`rowStrideAlignment`

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-11818) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-11818

`counterIndexCount` **must** be less than or equal to
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM)::`maxPerRegionPerformanceCounters`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-sType-sType) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_PERFORMANCE_COUNTERS_BY_REGION_BEGIN_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-parameter) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-parameter

 `pCounterAddresses` **must** be a valid pointer to an array of `counterAddressCount` `VkDeviceAddress` values

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterIndices-parameter) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterIndices-parameter

 `pCounterIndices` **must** be a valid pointer to an array of `counterIndexCount` `uint32_t` values

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-arraylength) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-arraylength

 `counterAddressCount` **must** be greater than `0`

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-arraylength) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-arraylength

 `counterIndexCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

* 
[VkRenderingInfo](#VkRenderingInfo)

To begin resolving attachments using render pass draws, call:

// Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
void vkCmdBeginCustomResolveEXT(
    VkCommandBuffer                             commandBuffer,
    const VkBeginCustomResolveInfoEXT*          pBeginCustomResolveInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pBeginCustomResolveInfo` is an optional struct with which to extend
functionality.

Following this call, any `resolveImageView` with `resolveMode` set
to [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) will be written by outputs which
would otherwise have written to the `imageView` image until the end of
the current render pass instance.

Following this call, the fragment area **may** be reduced to (1,1) if a
fragment density map is attached.
If this occurs, reads of input attachments mapped to a color, depth, or
stencil attachment return the value for the original larger fragment
containing the smaller fragment.
Reads of input attachments not mapped to a color, depth, or stencil
attachment use the new fragment area.

|  | Because the content of any depth/stencil resolve attachment as well as any
| --- | --- |
color resolve attachment is **undefined** at the beginning of a resolve
operation, any depth testing, stencil testing, or blending operation which
sources these **undefined** values also has **undefined** result value. |

During a custom resolve pass, multiple fragment invocations writing to the
same (x, y, layer,
view,
sample) coordinate, i.e. overdraw, will produce **undefined** behavior.

|  | Implementations are allowed to implement custom resolve attachment writes
| --- | --- |
through other mechanisms than framebuffer attachment writes, which would
normally obey rules of rasterization order. |

Valid Usage

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-11517) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-11517

The current render pass instance **must** have been started or resumed by
[vkCmdBeginRendering](#vkCmdBeginRendering) in this `commandBuffer`

* 
[](#VUID-vkCmdBeginCustomResolveEXT-None-11518) VUID-vkCmdBeginCustomResolveEXT-None-11518

[vkCmdBeginCustomResolveEXT](#vkCmdBeginCustomResolveEXT) **must** not have already been recorded in
the current render pass instance

* 
[](#VUID-vkCmdBeginCustomResolveEXT-None-11519) VUID-vkCmdBeginCustomResolveEXT-None-11519

The current render pass instance **must** have specified
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](#VkRenderingFlagBitsKHR)

* 
[](#VUID-vkCmdBeginCustomResolveEXT-None-11520) VUID-vkCmdBeginCustomResolveEXT-None-11520

The current render pass instance **must** not have specified
[VK_RENDERING_SUSPENDING_BIT](#VkRenderingFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-parameter) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginCustomResolveEXT-pBeginCustomResolveInfo-parameter) VUID-vkCmdBeginCustomResolveEXT-pBeginCustomResolveInfo-parameter

 If `pBeginCustomResolveInfo` is not `NULL`, `pBeginCustomResolveInfo` **must** be a valid pointer to a valid [VkBeginCustomResolveInfoEXT](#VkBeginCustomResolveInfoEXT) structure

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-recording) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-cmdpool) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginCustomResolveEXT-renderpass) VUID-vkCmdBeginCustomResolveEXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginCustomResolveEXT-suspended) VUID-vkCmdBeginCustomResolveEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginCustomResolveEXT-videocoding) VUID-vkCmdBeginCustomResolveEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdBeginCustomResolveEXT is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkBeginCustomResolveInfoEXT` structure is defined as:

// Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
typedef struct VkBeginCustomResolveInfoEXT {
    VkStructureType    sType;
    void*              pNext;
} VkBeginCustomResolveInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkBeginCustomResolveInfoEXT-sType-sType) VUID-VkBeginCustomResolveInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BEGIN_CUSTOM_RESOLVE_INFO_EXT](fundamentals.html#VkStructureType)

To end a render pass instance, call:

// Provided by VK_VERSION_1_3
void vkCmdEndRendering(
    VkCommandBuffer                             commandBuffer);

// Provided by VK_KHR_dynamic_rendering
// Equivalent to vkCmdEndRendering
void vkCmdEndRenderingKHR(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer in which to record the
command.

If the value of `pRenderingInfo->flags` used to begin this render pass
instance included [VK_RENDERING_SUSPENDING_BIT](#VkRenderingFlagBitsKHR), then this render pass
is suspended and will be resumed later in
[submission order](synchronization.html#synchronization-submission-order).

|  | There is no implicit ordering between separate render passes, even in the
| --- | --- |
same command buffer, and even when the attachments match.
Some applications rely on the continuation of
[rasterization order](primsrast.html#primsrast-order) between multiple render passes with
attachments defined in the same way, in order to perform non-rendering
operations (such as copies or compute operations) between draw calls, but
this has never been required by the specification.
There is also no explicit barrier currently in the API that provides the
guarantee that applications rely on without additional performance
penalties.

New applications should avoid relying on this ordering until an appropriate
barrier is added to the API.

Implementations where applications are performing this splitting are
encouraged to continue supporting this guarantee until a suitable barrier is
added to the API.

Existing applications relying on this ordering should expect that it will
continue working on platforms where it currently does.
Once a new extension adds support for a new barrier, developers are
encouraged to adapt their applications to use this when available. |

Valid Usage

* 
[](#VUID-vkCmdEndRendering-None-06161) VUID-vkCmdEndRendering-None-06161

The current render pass instance **must** have been begun with
[vkCmdBeginRendering](#vkCmdBeginRendering)

* 
[](#VUID-vkCmdEndRendering-commandBuffer-06162) VUID-vkCmdEndRendering-commandBuffer-06162

The current render pass instance **must** have been begun in
`commandBuffer`

* 
[](#VUID-vkCmdEndRendering-None-06781) VUID-vkCmdEndRendering-None-06781

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdEndRendering-None-06999) VUID-vkCmdEndRendering-None-06999

If `vkCmdBeginQuery`* was called within the render pass, the
corresponding `vkCmdEndQuery`* **must** have been called subsequently
within the same subpass

* 
[](#VUID-vkCmdEndRendering-None-10645) VUID-vkCmdEndRendering-None-10645

This command **must** not be recorded when
[per-tile execution model](#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndRendering-commandBuffer-parameter) VUID-vkCmdEndRendering-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndRendering-commandBuffer-recording) VUID-vkCmdEndRendering-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndRendering-commandBuffer-cmdpool) VUID-vkCmdEndRendering-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndRendering-renderpass) VUID-vkCmdEndRendering-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndRendering-suspended) VUID-vkCmdEndRendering-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndRendering-videocoding) VUID-vkCmdEndRendering-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndRendering is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To end a render pass instance, call:

// Provided by VK_KHR_maintenance10
void vkCmdEndRendering2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingEndInfoKHR*                pRenderingEndInfo);

// Provided by VK_EXT_fragment_density_map_offset
// Equivalent to vkCmdEndRendering2KHR
void vkCmdEndRendering2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingEndInfoKHR*                pRenderingEndInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderingEndInfo` is `NULL` or a pointer to a
[VkRenderingEndInfoKHR](#VkRenderingEndInfoKHR) structure containing information about how
the render pass will be ended.

If the value of `pRenderingInfo->flags` used to begin this render pass
instance included [VK_RENDERING_SUSPENDING_BIT](#VkRenderingFlagBitsKHR), then this render pass
is suspended and will be resumed later in
[submission order](synchronization.html#synchronization-submission-order).

|  | There is no implicit ordering between separate render passes, even in the
| --- | --- |
same command buffer, and even when the attachments match.
Some applications rely on the continuation of
[rasterization order](primsrast.html#primsrast-order) between multiple render passes with
attachments defined in the same way, in order to perform non-rendering
operations (such as copies or compute operations) between draw calls, but
this has never been required by the specification.
There is also no explicit barrier currently in the API that provides the
guarantee that applications rely on without additional performance
penalties.

New applications should avoid relying on this ordering until an appropriate
barrier is added to the API.

Implementations where applications are performing this splitting are
encouraged to continue supporting this guarantee until a suitable barrier is
added to the API.

Existing applications relying on this ordering should expect that it will
continue working on platforms where it currently does.
Once a new extension adds support for a new barrier, developers are
encouraged to adapt their applications to use this when available. |

Valid Usage

* 
[](#VUID-vkCmdEndRendering2KHR-None-10610) VUID-vkCmdEndRendering2KHR-None-10610

The current render pass instance **must** have been begun with
[vkCmdBeginRendering](#vkCmdBeginRendering)

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-10611) VUID-vkCmdEndRendering2KHR-commandBuffer-10611

The current render pass instance **must** have been begun in
`commandBuffer`

* 
[](#VUID-vkCmdEndRendering2KHR-None-10612) VUID-vkCmdEndRendering2KHR-None-10612

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdEndRendering2KHR-None-10613) VUID-vkCmdEndRendering2KHR-None-10613

If `vkCmdBeginQuery`* was called within the render pass, the
corresponding `vkCmdEndQuery`* **must** have been called subsequently
within the same subpass

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-parameter) VUID-vkCmdEndRendering2KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndRendering2KHR-pRenderingEndInfo-parameter) VUID-vkCmdEndRendering2KHR-pRenderingEndInfo-parameter

 If `pRenderingEndInfo` is not `NULL`, `pRenderingEndInfo` **must** be a valid pointer to a valid [VkRenderingEndInfoKHR](#VkRenderingEndInfoKHR) structure

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-recording) VUID-vkCmdEndRendering2KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-cmdpool) VUID-vkCmdEndRendering2KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndRendering2KHR-renderpass) VUID-vkCmdEndRendering2KHR-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndRendering2KHR-suspended) VUID-vkCmdEndRendering2KHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndRendering2KHR-videocoding) VUID-vkCmdEndRendering2KHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndRendering2KHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkRenderingEndInfoKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkRenderingEndInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
} VkRenderingEndInfoKHR;

// Provided by VK_EXT_fragment_density_map_offset
// Equivalent to VkRenderingEndInfoKHR
typedef VkRenderingEndInfoKHR VkRenderingEndInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingEndInfoKHR-sType-sType) VUID-VkRenderingEndInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_END_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderingEndInfoKHR-pNext-pNext) VUID-VkRenderingEndInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkRenderPassFragmentDensityMapOffsetEndInfoEXT](#VkRenderPassFragmentDensityMapOffsetEndInfoEXT)

* 
[](#VUID-VkRenderingEndInfoKHR-sType-unique) VUID-VkRenderingEndInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

|  | For more complex rendering graphs, it is possible to pre-define a static
| --- | --- |
*render pass* object, which as well as allowing draw commands, allows the
definition of framebuffer-local dependencies between multiple subpasses.
These objects have a lot of setup cost compared to
[vkCmdBeginRendering](#vkCmdBeginRendering), but use of subpass dependencies can confer
important performance benefits on some devices. |

The `VkTilePropertiesQCOM` structure is defined as:

// Provided by VK_QCOM_tile_properties
typedef struct VkTilePropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkExtent3D         tileSize;
    VkExtent2D         apronSize;
    VkOffset2D         origin;
} VkTilePropertiesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tileSize` is the dimensions of a tile, with width and height
describing the width and height of a tile in pixels, and depth
corresponding to the number of slices the tile spans.

* 
`apronSize` is the dimension of the
[apron](#renderpass-tile-shading-aprons).

* 
`origin` is the top-left corner of the first tile in attachment
space.

All tiles will be tightly packed around the first tile, with edges being
multiples of tile width and/or height from the origin.

The `tileSize` is guaranteed to be a multiple of
[`tileGranularity`](limits.html#limits-tileGranularity).

Valid Usage (Implicit)

* 
[](#VUID-VkTilePropertiesQCOM-sType-sType) VUID-VkTilePropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_PROPERTIES_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTilePropertiesQCOM-pNext-pNext) VUID-VkTilePropertiesQCOM-pNext-pNext

 `pNext` **must** be `NULL`

To query the tile properties when using dynamic rendering, call:

// Provided by VK_QCOM_tile_properties
VkResult vkGetDynamicRenderingTilePropertiesQCOM(
    VkDevice                                    device,
    const VkRenderingInfo*                      pRenderingInfo,
    VkTilePropertiesQCOM*                       pProperties);

* 
`device` is a logical device associated with the render pass.

* 
`pRenderingInfo` is a pointer to the [VkRenderingInfo](#VkRenderingInfo) structure
specifying details of the render pass instance in dynamic rendering.

* 
`pProperties` is a pointer to a [VkTilePropertiesQCOM](#VkTilePropertiesQCOM) structure
in which the properties are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDynamicRenderingTilePropertiesQCOM-device-parameter) VUID-vkGetDynamicRenderingTilePropertiesQCOM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDynamicRenderingTilePropertiesQCOM-pRenderingInfo-parameter) VUID-vkGetDynamicRenderingTilePropertiesQCOM-pRenderingInfo-parameter

 `pRenderingInfo` **must** be a valid pointer to a valid [VkRenderingInfo](#VkRenderingInfo) structure

* 
[](#VUID-vkGetDynamicRenderingTilePropertiesQCOM-pProperties-parameter) VUID-vkGetDynamicRenderingTilePropertiesQCOM-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkTilePropertiesQCOM](#VkTilePropertiesQCOM) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

A render pass object represents a collection of attachments, subpasses, and
dependencies between the subpasses, and describes how the attachments are
used over the course of the subpasses.

Render passes are represented by `VkRenderPass` handles:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkRenderPass)

An *attachment description* describes the properties of an attachment
including its format, sample count, and how its contents are treated at the
beginning and end of each render pass instance.

A *subpass* represents a phase of rendering that reads and writes a subset
of the attachments in a render pass.
Rendering commands are recorded into a particular subpass of a render pass
instance.

A *subpass description* describes the subset of attachments that is involved
in the execution of a subpass.
Each subpass **can** read from some attachments as *input attachments*, write
to some as *color attachments* or *depth/stencil attachments*,
perform *shader resolve operations* to *color_attachments* or
*depth/stencil_attachments*,
and perform *multisample resolve operations* to *resolve attachments*.
A subpass description **can** also include a set of *preserve attachments*,
which are attachments that are not read or written by the subpass but whose
contents **must** be preserved throughout the subpass.

A subpass *uses an attachment* if the attachment is a color, depth/stencil,
resolve,
depth/stencil resolve,
fragment shading rate,
or input attachment for that subpass (as determined by the
`pColorAttachments`, `pDepthStencilAttachment`,
`pResolveAttachments`,
[VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)::`pDepthStencilResolveAttachment`,
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR)::`pFragmentShadingRateAttachment->attachment`,
and `pInputAttachments` members of [VkSubpassDescription](#VkSubpassDescription),
respectively).
A subpass does not use an attachment if that attachment is preserved by the
subpass.
The *first use of an attachment* is in the lowest numbered subpass that uses
that attachment.
Similarly, the *last use of an attachment* is in the highest numbered
subpass that uses that attachment.

The subpasses in a render pass all render to the same dimensions, and
fragments for pixel (x,y,layer) in one subpass **can** only read attachment
contents written by previous subpasses at that same (x,y,layer) location.
For multi-pixel fragments, the pixel read from an input attachment is
selected from the pixels covered by that fragment in an
implementation-dependent manner.
However, this selection **must** be made consistently for any fragment with the
same shading rate for the lifetime of the [VkDevice](devsandqueues.html#VkDevice).

|  | By describing a complete set of subpasses in advance, render passes provide
| --- | --- |
the implementation an opportunity to optimize the storage and transfer of
attachment data between subpasses.

In practice, this means that subpasses with a simple framebuffer-space
dependency **may** be merged into a single tiled rendering pass, keeping the
attachment data on-chip for the duration of a render pass instance.
However, it is also quite common for a render pass to only contain a single
subpass. |

*Subpass dependencies* describe [execution and memory dependencies](synchronization.html#synchronization-dependencies) between subpasses.

A *subpass dependency chain* is a sequence of subpass dependencies in a
render pass, where the source subpass of each subpass dependency (after the
first) equals the destination subpass of the previous dependency.

Execution of subpasses **may** overlap or execute out of order with regards to
other subpasses, unless otherwise enforced by an execution dependency.
Each subpass only respects [submission order](synchronization.html#synchronization-submission-order) for commands recorded in the same subpass, and the
[vkCmdBeginRenderPass](#vkCmdBeginRenderPass) and [vkCmdEndRenderPass](#vkCmdEndRenderPass) commands that
delimit the render pass - commands within other subpasses are not included.
This affects most other [implicit ordering guarantees](synchronization.html#synchronization-implicit).

A render pass describes the structure of subpasses and attachments
independent of any specific image views for the attachments.
The specific image views that will be used for the attachments, and their
dimensions, are specified in `VkFramebuffer` objects.
Framebuffers are created with respect to a specific render pass that the
framebuffer is compatible with (see [Render Pass Compatibility](#renderpass-compatibility)).
Collectively, a render pass and a framebuffer define the complete render
target state for one or more subpasses as well as the algorithmic
dependencies between the subpasses.

The various pipeline stages of the drawing commands for a given subpass **may**
execute concurrently and/or out of order, both within and across drawing
commands, whilst still respecting [pipeline order](synchronization.html#synchronization-pipeline-stages-order).
However for a given (x,y,layer,sample) sample location, certain per-sample
operations are performed in [rasterization order](primsrast.html#primsrast-order).

[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) is a constant indicating that a render pass
attachment is not used.

#define VK_ATTACHMENT_UNUSED              (~0U)

To create a render pass, call:

|  | This functionality is superseded by [vkCreateRenderPass2](#vkCreateRenderPass2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkCreateRenderPass(
    VkDevice                                    device,
    const VkRenderPassCreateInfo*               pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkRenderPass*                               pRenderPass);

* 
`device` is the logical device that creates the render pass.

* 
`pCreateInfo` is a pointer to a [VkRenderPassCreateInfo](#VkRenderPassCreateInfo)
structure describing the parameters of the render pass.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pRenderPass` is a pointer to a [VkRenderPass](#VkRenderPass) handle in which
the resulting render pass object is returned.

Valid Usage

* 
[](#VUID-vkCreateRenderPass-device-10000) VUID-vkCreateRenderPass-device-10000

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateRenderPass-flags-10646) VUID-vkCreateRenderPass-flags-10646

[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags` **must** not
include [VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRenderPass-device-parameter) VUID-vkCreateRenderPass-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateRenderPass-pCreateInfo-parameter) VUID-vkCreateRenderPass-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) structure

* 
[](#VUID-vkCreateRenderPass-pAllocator-parameter) VUID-vkCreateRenderPass-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateRenderPass-pRenderPass-parameter) VUID-vkCreateRenderPass-pRenderPass-parameter

 `pRenderPass` **must** be a valid pointer to a [VkRenderPass](#VkRenderPass) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkRenderPassCreateInfo` structure is defined as:

|  | This functionality is superseded by [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkRenderPassCreateInfo {
    VkStructureType                   sType;
    const void*                       pNext;
    VkRenderPassCreateFlags           flags;
    uint32_t                          attachmentCount;
    const VkAttachmentDescription*    pAttachments;
    uint32_t                          subpassCount;
    const VkSubpassDescription*       pSubpasses;
    uint32_t                          dependencyCount;
    const VkSubpassDependency*        pDependencies;
} VkRenderPassCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderPassCreateFlagBits](#VkRenderPassCreateFlagBits)

* 
`attachmentCount` is the number of attachments used by this render
pass.

* 
`pAttachments` is a pointer to an array of `attachmentCount`
[VkAttachmentDescription](#VkAttachmentDescription) structures describing the attachments used
by the render pass.

* 
`subpassCount` is the number of subpasses to create.

* 
`pSubpasses` is a pointer to an array of `subpassCount`
[VkSubpassDescription](#VkSubpassDescription) structures describing each subpass.

* 
`dependencyCount` is the number of memory dependencies between pairs
of subpasses.

* 
`pDependencies` is a pointer to an array of `dependencyCount`
[VkSubpassDependency](#VkSubpassDependency) structures describing dependencies between
pairs of subpasses.

|  | Care should be taken to avoid a data race here; if any subpasses access
| --- | --- |
attachments with overlapping memory locations, and one of those accesses is
a write, a subpass dependency needs to be included between them. |

Valid Usage

* 
[](#VUID-VkRenderPassCreateInfo-attachment-00834) VUID-VkRenderPassCreateInfo-attachment-00834

If the `attachment` member of any element of
`pInputAttachments`, `pColorAttachments`,
`pResolveAttachments` or `pDepthStencilAttachment`, or any
element of `pPreserveAttachments` in any element of `pSubpasses`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then it **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-06471) VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-06471

If the pNext chain includes a
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT) structure and the
`fragmentDensityMapAttachment` member is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then `attachment` **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo-fragmentDensityMapLayered-10828) VUID-VkRenderPassCreateInfo-fragmentDensityMapLayered-10828

If the [    `fragmentDensityMapLayered`](features.html#features-fragmentDensityMapLayered) feature is not enabled, `flags`
**must** not contain
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderPassCreateFlagBits)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-00836) VUID-VkRenderPassCreateInfo-pAttachments-00836

For any member of `pAttachments` with a `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-02511) VUID-VkRenderPassCreateInfo-pAttachments-02511

For any member of `pAttachments` with a `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-01566) VUID-VkRenderPassCreateInfo-pAttachments-01566

For any member of `pAttachments` with a `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-01567) VUID-VkRenderPassCreateInfo-pAttachments-01567

For any member of `pAttachments` with a `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01926) VUID-VkRenderPassCreateInfo-pNext-01926

If the `pNext` chain includes a
[VkRenderPassInputAttachmentAspectCreateInfo](#VkRenderPassInputAttachmentAspectCreateInfo) structure, the
`subpass` member of each element of its `pAspectReferences`
member **must** be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01927) VUID-VkRenderPassCreateInfo-pNext-01927

If the `pNext` chain includes a
[VkRenderPassInputAttachmentAspectCreateInfo](#VkRenderPassInputAttachmentAspectCreateInfo) structure, the
`inputAttachmentIndex` member of each element of its
`pAspectReferences` member **must** be less than the value of
`inputAttachmentCount` in the element of `pSubpasses` identified
by its `subpass` member

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01963) VUID-VkRenderPassCreateInfo-pNext-01963

If the `pNext` chain includes a
[VkRenderPassInputAttachmentAspectCreateInfo](#VkRenderPassInputAttachmentAspectCreateInfo) structure, for any
element of the `pInputAttachments` member of any element of
`pSubpasses` where the `attachment` member is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the `aspectMask` member of the
corresponding element of
[VkRenderPassInputAttachmentAspectCreateInfo](#VkRenderPassInputAttachmentAspectCreateInfo)::`pAspectReferences`
**must** only include aspects that are present in images of the format
specified by the element of `pAttachments` at `attachment`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01928) VUID-VkRenderPassCreateInfo-pNext-01928

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, and its
`subpassCount` member is not zero, that member **must** be equal to the
value of `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01929) VUID-VkRenderPassCreateInfo-pNext-01929

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, if its
`dependencyCount` member is not zero, it **must** be equal to
`dependencyCount`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01930) VUID-VkRenderPassCreateInfo-pNext-01930

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, for each non-zero
element of `pViewOffsets`, the `srcSubpass` and `dstSubpass`
members of `pDependencies` at the same index **must** not be equal

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02512) VUID-VkRenderPassCreateInfo-pNext-02512

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, for each element of
`pDependencies` with a `dependencyFlags` member that does not
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits), the corresponding element of
the `pViewOffsets` member of that
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) instance **must** be `0`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02513) VUID-VkRenderPassCreateInfo-pNext-02513

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, elements of its
`pViewMasks` member **must** either all be `0`, or all not be `0`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02514) VUID-VkRenderPassCreateInfo-pNext-02514

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, and each element of its
`pViewMasks` member is `0`, the `dependencyFlags` member of each
element of `pDependencies` **must** not include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits)

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02515) VUID-VkRenderPassCreateInfo-pNext-02515

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo) structure, and each element of its
`pViewMasks` member is `0`, its `correlationMaskCount` member
**must** be `0`

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-00837) VUID-VkRenderPassCreateInfo-pDependencies-00837

For each element of `pDependencies`, if the `srcSubpass` is not
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), all stage flags included in the
`srcStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits) or a pipeline stage supported
by the [pipeline](synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the source subpass

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-00838) VUID-VkRenderPassCreateInfo-pDependencies-00838

For each element of `pDependencies`, if the `dstSubpass` is not
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), all stage flags included in the
`dstStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits) or a pipeline stage supported
by the [pipeline](synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the destination subpass

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-06866) VUID-VkRenderPassCreateInfo-pDependencies-06866

For each element of `pDependencies`, if its `srcSubpass` is not
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), it **must** be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-06867) VUID-VkRenderPassCreateInfo-pDependencies-06867

For each element of `pDependencies`, if its `dstSubpass` is not
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), it **must** be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pResolveAttachments-10647) VUID-VkRenderPassCreateInfo-pResolveAttachments-10647

If any element of `pResolveAttachments` of any element of
`pSubpasses` references an attachment description with a format of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-10648) VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-10648

If
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT)::`fragmentDensityMapAttachment`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo-None-10915) VUID-VkRenderPassCreateInfo-None-10915

If any subpass preserves an attachment, there **must** be a subpass
dependency from a prior subpass which uses or preserves that attachment

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreateInfo-sType-sType) VUID-VkRenderPassCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassCreateInfo-pNext-pNext) VUID-VkRenderPassCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT), [VkRenderPassInputAttachmentAspectCreateInfo](#VkRenderPassInputAttachmentAspectCreateInfo), [VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo), [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM), or [VkTileMemorySizeInfoQCOM](#VkTileMemorySizeInfoQCOM)

* 
[](#VUID-VkRenderPassCreateInfo-sType-unique) VUID-VkRenderPassCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderPassCreateInfo-flags-parameter) VUID-VkRenderPassCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkRenderPassCreateFlagBits](#VkRenderPassCreateFlagBits) values

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-parameter) VUID-VkRenderPassCreateInfo-pAttachments-parameter

 If `attachmentCount` is not `0`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkAttachmentDescription](#VkAttachmentDescription) structures

* 
[](#VUID-VkRenderPassCreateInfo-pSubpasses-parameter) VUID-VkRenderPassCreateInfo-pSubpasses-parameter

 `pSubpasses` **must** be a valid pointer to an array of `subpassCount` valid [VkSubpassDescription](#VkSubpassDescription) structures

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-parameter) VUID-VkRenderPassCreateInfo-pDependencies-parameter

 If `dependencyCount` is not `0`, `pDependencies` **must** be a valid pointer to an array of `dependencyCount` valid [VkSubpassDependency](#VkSubpassDependency) structures

* 
[](#VUID-VkRenderPassCreateInfo-subpassCount-arraylength) VUID-VkRenderPassCreateInfo-subpassCount-arraylength

 `subpassCount` **must** be greater than `0`

Bits which **can** be set in [VkRenderPassCreateInfo](#VkRenderPassCreateInfo)::`flags`,
describing additional properties of the render pass, are:

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkRenderPassCreateFlagBits {
  // Provided by VK_QCOM_render_pass_transform
    VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM = 0x00000002,
  // Provided by VK_VALVE_fragment_density_map_layered
    VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE = 0x00000004,
} VkRenderPassCreateFlagBits;

* 
[VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](#VkRenderPassCreateFlagBits) specifies that the
created render pass is compatible with
[render pass transform](vertexpostproc.html#vertexpostproc-renderpass-transform).

* 
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderPassCreateFlagBits)
specifies that the created render pass is usable with layered fragment
density maps.

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkRenderPassCreateFlags;

`VkRenderPassCreateFlags` is a bitmask type for setting a mask of zero
or more [VkRenderPassCreateFlagBits](#VkRenderPassCreateFlagBits).

If the [VkRenderPassCreateInfo](#VkRenderPassCreateInfo)::`pNext` chain includes a
`VkRenderPassMultiviewCreateInfo` structure, then that structure
includes an array of view masks, view offsets, and correlation masks for the
render pass.

The `VkRenderPassMultiviewCreateInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_1
typedef struct VkRenderPassMultiviewCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           subpassCount;
    const uint32_t*    pViewMasks;
    uint32_t           dependencyCount;
    const int32_t*     pViewOffsets;
    uint32_t           correlationMaskCount;
    const uint32_t*    pCorrelationMasks;
} VkRenderPassMultiviewCreateInfo;

// Provided by VK_KHR_multiview
// Equivalent to VkRenderPassMultiviewCreateInfo
typedef VkRenderPassMultiviewCreateInfo VkRenderPassMultiviewCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`subpassCount` is zero or the number of subpasses in the render
pass.

* 
`pViewMasks` is a pointer to an array of `subpassCount` view
masks, where each mask is a bitfield of view indices describing which
views rendering is broadcast to in each subpass, when multiview is
enabled.
If `subpassCount` is zero, each view mask is treated as zero.

* 
`dependencyCount` is zero or the number of dependencies in the
render pass.

* 
`pViewOffsets` is a pointer to an array of `dependencyCount`
view offsets, one for each dependency.
If `dependencyCount` is zero, each dependency’s view offset is
treated as zero.
Each view offset controls which views in the source subpass the views in
the destination subpass depend on.

* 
`correlationMaskCount` is zero or the number of correlation masks.

* 
`pCorrelationMasks` is a pointer to an array of
`correlationMaskCount` view masks indicating sets of views that **may**
be more efficient to render concurrently.

When a subpass uses a non-zero view mask, *multiview* functionality is
considered to be enabled.
Multiview is all-or-nothing for a render pass - that is, either all
subpasses **must** have a non-zero view mask (though some subpasses **may** have
only one view) or all **must** be zero.
Multiview causes all drawing and clear commands in the subpass to behave as
if they were broadcast to each view, where a view is represented by one
layer of the framebuffer attachments.
All draws and clears are broadcast to each *view index* whose bit is set in
the view mask.
The view index is provided in the `ViewIndex` shader input variable, and
color, depth/stencil, and input attachments all read/write the layer of the
framebuffer corresponding to the view index.

If the view mask is zero for all subpasses, multiview is considered to be
disabled and all drawing commands execute normally, without this additional
broadcasting.

Some implementations **may** not support multiview in conjunction with
[mesh shaders](features.html#features-multiviewMeshShader),
[geometry shaders](features.html#features-multiview-gs) or [tessellation shaders](features.html#features-multiview-tess).

When multiview is enabled, the [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits) bit in a
dependency **can** be used to express a view-local dependency, meaning that
each view in the destination subpass depends on a single view in the source
subpass.
Unlike pipeline barriers, a subpass dependency **can** potentially have a
different view mask in the source subpass and the destination subpass.
If the dependency is view-local, then each view (dstView) in the
destination subpass depends on the view dstView + 
`pViewOffsets`[dependency] in the source subpass.
If there is not such a view in the source subpass, then this dependency does
not affect that view in the destination subpass.
If the dependency is not view-local, then all views in the destination
subpass depend on all views in the source subpass, and the view offset is
ignored.
A non-zero view offset is not allowed in a self-dependency.

The elements of `pCorrelationMasks` are a set of masks of views
indicating that views in the same mask **may** exhibit spatial coherency
between the views, making it more efficient to render them concurrently.
Correlation masks **must** not have a functional effect on the results of the
multiview rendering.

When multiview is enabled, at the beginning of each subpass all non-render
pass state is **undefined**.
In particular, each time [vkCmdBeginRenderPass](#vkCmdBeginRenderPass) or
[vkCmdNextSubpass](#vkCmdNextSubpass) is called the graphics pipeline **must** be bound, any
relevant descriptor sets or vertex/index buffers **must** be bound, and any
relevant dynamic state or push constants **must** be set before they are used.

A multiview subpass **can** declare that its shaders will write per-view
attributes for all views in a single invocation, by setting the
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#VkSubpassDescriptionFlagBits) bit in the subpass
description.
The only supported per-view attributes are position and viewport mask, and
per-view position and viewport masks are written to output array variables
decorated with `PositionPerViewNV` and `ViewportMaskPerViewNV`,
respectively.
If the `[VK_NV_viewport_array2](../appendices/extensions.html#VK_NV_viewport_array2)` extension is not supported and
enabled, `ViewportMaskPerViewNV` **must** not be used.
Values written to elements of `PositionPerViewNV` and
`ViewportMaskPerViewNV` **must** not depend on the `ViewIndex`.
The shader **must** also write to an output variable decorated with
`Position`, and the value written to `Position` **must** equal the value
written to `PositionPerViewNV`[`ViewIndex`].
Similarly, if `ViewportMaskPerViewNV` is written to then the shader **must**
also write to an output variable decorated with `ViewportMaskNV`, and the
value written to `ViewportMaskNV` **must** equal the value written to
`ViewportMaskPerViewNV`[`ViewIndex`].
Implementations will either use values taken from `Position` and
`ViewportMaskNV` and invoke the shader once for each view, or will use
values taken from `PositionPerViewNV` and `ViewportMaskPerViewNV` and
invoke the shader fewer times.
The values written to `Position` and `ViewportMaskNV` **must** not depend
on the values written to `PositionPerViewNV` and
`ViewportMaskPerViewNV`, or vice versa (to allow compilers to eliminate
the unused outputs).
All attributes that do not have `*PerViewNV` counterparts **must** not depend
on `ViewIndex`.

Per-view attributes are all-or-nothing for a subpass.
That is, all pipelines compiled against a subpass that includes the
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#VkSubpassDescriptionFlagBits) bit **must** write
per-view attributes to the `*PerViewNV[]` shader outputs, in addition to the
non-per-view (e.g. `Position`) outputs.
Pipelines compiled against a subpass that does not include this bit **must**
not include the `*PerViewNV[]` outputs in their interfaces.

Valid Usage

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-pCorrelationMasks-00841) VUID-VkRenderPassMultiviewCreateInfo-pCorrelationMasks-00841

Each view index **must** not be set in more than one element of
`pCorrelationMasks`

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-multiview-06555) VUID-VkRenderPassMultiviewCreateInfo-multiview-06555

If the [`multiview`](features.html#features-multiview) feature is not enabled,
each element of `pViewMasks` **must** be `0`

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-pViewMasks-06697) VUID-VkRenderPassMultiviewCreateInfo-pViewMasks-06697

The index of the most significant bit in each element of
`pViewMasks` **must** be less than [    `maxMultiviewViewCount`](devsandqueues.html#limits-maxMultiviewViewCount)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-sType-sType) VUID-VkRenderPassMultiviewCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-pViewMasks-parameter) VUID-VkRenderPassMultiviewCreateInfo-pViewMasks-parameter

 If `subpassCount` is not `0`, `pViewMasks` **must** be a valid pointer to an array of `subpassCount` `uint32_t` values

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-pViewOffsets-parameter) VUID-VkRenderPassMultiviewCreateInfo-pViewOffsets-parameter

 If `dependencyCount` is not `0`, `pViewOffsets` **must** be a valid pointer to an array of `dependencyCount` `int32_t` values

* 
[](#VUID-VkRenderPassMultiviewCreateInfo-pCorrelationMasks-parameter) VUID-VkRenderPassMultiviewCreateInfo-pCorrelationMasks-parameter

 If `correlationMaskCount` is not `0`, `pCorrelationMasks` **must** be a valid pointer to an array of `correlationMaskCount` `uint32_t` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)

The `VkMultiviewPerViewAttributesInfoNVX` structure is defined as:

// Provided by VK_NVX_multiview_per_view_attributes with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkMultiviewPerViewAttributesInfoNVX {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           perViewAttributes;
    VkBool32           perViewAttributesPositionXOnly;
} VkMultiviewPerViewAttributesInfoNVX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`perViewAttributes` specifies that shaders compiled for this
pipeline write the attributes for all views in a single invocation of
each vertex processing stage.
All pipelines executed within a render pass instance that includes this
bit **must** write per-view attributes to the `*PerViewNV[]` shader
outputs, in addition to the non-per-view (e.g. `Position`) outputs.

* 
`perViewAttributesPositionXOnly` specifies that shaders compiled for
this pipeline use per-view positions which only differ in value in the x
component.
Per-view viewport mask **can** also be used.

When dynamic render pass instances are being used, instead of specifying
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#VkSubpassDescriptionFlagBits) or
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](#VkSubpassDescriptionFlagBits) in the subpass
description flags, the per-attribute properties of the render pass instance
**must** be specified by the `VkMultiviewPerViewAttributesInfoNVX`
structure Include the `VkMultiviewPerViewAttributesInfoNVX` structure in
the `pNext` chain of [VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo) when creating a
graphics pipeline for dynamic rendering, [VkRenderingInfo](#VkRenderingInfo) when starting
a dynamic render pass instance, and [VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)
when specifying the dynamic render pass instance parameters for secondary
command buffers.

Valid Usage (Implicit)

* 
[](#VUID-VkMultiviewPerViewAttributesInfoNVX-sType-sType) VUID-VkMultiviewPerViewAttributesInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_ATTRIBUTES_INFO_NVX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

* 
[VkRenderingInfo](#VkRenderingInfo)

If the [VkRenderPassCreateInfo](#VkRenderPassCreateInfo)::`pNext` chain includes a
`VkRenderPassFragmentDensityMapCreateInfoEXT` structure, then that
structure includes a fragment density map attachment for the render pass.

The `VkRenderPassFragmentDensityMapCreateInfoEXT` structure is defined
as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_fragment_density_map
typedef struct VkRenderPassFragmentDensityMapCreateInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkAttachmentReference    fragmentDensityMapAttachment;
} VkRenderPassFragmentDensityMapCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fragmentDensityMapAttachment` is the fragment density map to use
for the render pass.

The fragment density map is read at an implementation-dependent time with
the following constraints determined by the attachment’s image view
`flags`:

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](resources.html#VkImageViewCreateFlagBits)
specifies that the fragment density map will be read by the device
during [VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](resources.html#VkImageViewCreateFlagBits)
specifies that the fragment density map will be read by the host during
[vkEndCommandBuffer](cmdbuffers.html#vkEndCommandBuffer) of the primary command buffer that the render
pass is recorded into

* 
Otherwise the fragment density map will be read by the host during
[vkCmdBeginRenderPass](#vkCmdBeginRenderPass)

The fragment density map **may** additionally be read by the device during
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits) for any mode.

If this structure is not present, it is as if
`fragmentDensityMapAttachment` was given as [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED).

Valid Usage

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02548) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02548

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`fragmentDensityMapAttachment` **must** not be an element of
`VkSubpassDescription`::`pInputAttachments`,
`VkSubpassDescription`::`pColorAttachments`,
`VkSubpassDescription`::`pResolveAttachments`,
`VkSubpassDescription`::`pDepthStencilAttachment`, or
`VkSubpassDescription`::`pPreserveAttachments` for any subpass

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02549) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02549

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`layout` **must** be equal to
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02550) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02550

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`fragmentDensityMapAttachment` **must** reference an attachment with a
`loadOp` equal to [VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp) or
[VK_ATTACHMENT_LOAD_OP_DONT_CARE](#VkAttachmentLoadOp)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02551) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02551

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`fragmentDensityMapAttachment` **must** reference an attachment with a
`storeOp` equal to [VK_ATTACHMENT_STORE_OP_DONT_CARE](#VkAttachmentStoreOp)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-sType-sType) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-parameter) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-parameter

 `fragmentDensityMapAttachment` **must** be a valid [VkAttachmentReference](#VkAttachmentReference) structure

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)

* 
[VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)

The `VkAttachmentDescription` structure is defined as:

|  | This functionality is superseded by [VkAttachmentDescription2](#VkAttachmentDescription2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkAttachmentDescription {
    VkAttachmentDescriptionFlags    flags;
    VkFormat                        format;
    VkSampleCountFlagBits           samples;
    VkAttachmentLoadOp              loadOp;
    VkAttachmentStoreOp             storeOp;
    VkAttachmentLoadOp              stencilLoadOp;
    VkAttachmentStoreOp             stencilStoreOp;
    VkImageLayout                   initialLayout;
    VkImageLayout                   finalLayout;
} VkAttachmentDescription;

* 
`flags` is a bitmask of [VkAttachmentDescriptionFlagBits](#VkAttachmentDescriptionFlagBits)
specifying additional properties of the attachment.

* 
`format` is a [VkFormat](formats.html#VkFormat) value specifying the format of the
image view that will be used for the attachment.

* 
`samples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value specifying the
number of samples of the image.

* 
`loadOp` is a [VkAttachmentLoadOp](#VkAttachmentLoadOp) value specifying how the
contents of color and depth components of the attachment are treated at
the beginning of the subpass where it is first used.

* 
`storeOp` is a [VkAttachmentStoreOp](#VkAttachmentStoreOp) value specifying how the
contents of color and depth components of the attachment are treated at
the end of the subpass where it is last used.

* 
`stencilLoadOp` is a [VkAttachmentLoadOp](#VkAttachmentLoadOp) value specifying how
the contents of stencil components of the attachment are treated at the
beginning of the subpass where it is first used.

* 
`stencilStoreOp` is a [VkAttachmentStoreOp](#VkAttachmentStoreOp) value specifying how
the contents of stencil components of the attachment are treated at the
end of the last subpass where it is used.

* 
`initialLayout` is the layout the attachment image subresource will
be in when a render pass instance begins.

* 
`finalLayout` is the layout the attachment image subresource will be
transitioned to when a render pass instance ends.

If the attachment uses a color format, then `loadOp` and `storeOp`
are used, and `stencilLoadOp` and `stencilStoreOp` are ignored.
If the format has depth and/or stencil components, `loadOp` and
`storeOp` apply only to the depth data, while `stencilLoadOp` and
`stencilStoreOp` define how the stencil data is handled.
`loadOp` and `stencilLoadOp` define the
[load operations](#renderpass-load-operations) for the attachment.
`storeOp` and `stencilStoreOp` define the
[store operations](#renderpass-store-operations) for the attachment.
If an attachment is not used by any subpass, `loadOp`, `storeOp`,
`stencilStoreOp`, and `stencilLoadOp` will be ignored for that
attachment, and no load or store ops will be performed.
However, any transition specified by `initialLayout` and
`finalLayout` will still be executed.

If `flags` includes [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits), then
the attachment is treated as if it shares physical memory with another
attachment in the same render pass.
This information limits the ability of the implementation to reorder certain
operations (like layout transitions and the `loadOp`) such that it is
not improperly reordered against other uses of the same physical memory via
a different attachment.
This is described in more detail below.

If a render pass uses multiple attachments that alias the same device
memory, those attachments **must** each include the
[VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits) bit in their attachment
description flags.
Attachments aliasing the same memory occurs in multiple ways:

* 
Multiple attachments being assigned the same image view as part of
framebuffer creation.

* 
Attachments using distinct image views that correspond to the same image
subresource of an image.

* 
Attachments using views of distinct image subresources which are bound
to overlapping memory ranges.

|  | Render passes **must** include subpass dependencies (either directly or via a
| --- | --- |
subpass dependency chain) between any two subpasses that operate on the same
attachment or aliasing attachments and those subpass dependencies **must**
include execution and memory dependencies separating uses of the aliases, if
at least one of those subpasses writes to one of the aliases.
These dependencies **must** not include the [VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits)
if the aliases are views of distinct image subresources which overlap in
memory. |

Multiple attachments that alias the same memory **must** not be used in a
single subpass.
A given attachment index **must** not be used multiple times in a single
subpass, with one exception: two subpass attachments **can** use the same
attachment index if at least one use is as an input attachment and neither
use is as a resolve or preserve attachment.
In other words, the same view **can** be used simultaneously as an input and
color or depth/stencil attachment, but **must** not be used as multiple color
or depth/stencil attachments nor as resolve or preserve attachments.

If a set of attachments alias each other, then all except the first to be
used in the render pass **must** use an `initialLayout` of
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), since the earlier uses of the other aliases
make their contents **undefined**.
Once an alias has been used and a different alias has been used after it,
the first alias **must** not be used in any later subpasses.
However, an application **can** assign the same image view to multiple aliasing
attachment indices, which allows that image view to be used multiple times
even if other aliases are used in between.

|  | Once an attachment needs the [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits)
| --- | --- |
bit, there **should** be no additional cost of introducing additional aliases,
and using these additional aliases **may** allow more efficient clearing of the
attachments on multiple uses via [VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp). |

Valid Usage

* 
[](#VUID-VkAttachmentDescription-format-06699) VUID-VkAttachmentDescription-format-06699

If `format` includes a color or depth component and `loadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp), then `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-finalLayout-00843) VUID-VkAttachmentDescription-finalLayout-00843

    `finalLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03280) VUID-VkAttachmentDescription-format-03280

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03281) VUID-VkAttachmentDescription-format-03281

If `format` is a depth/stencil format, `initialLayout` **must** not
be [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03282) VUID-VkAttachmentDescription-format-03282

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03283) VUID-VkAttachmentDescription-format-03283

If `format` is a depth/stencil format, `finalLayout` **must** not
be [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-06487) VUID-VkAttachmentDescription-format-06487

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-06488) VUID-VkAttachmentDescription-format-06488

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-separateDepthStencilLayouts-03284) VUID-VkAttachmentDescription-separateDepthStencilLayouts-03284

If the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),

* 
[](#VUID-VkAttachmentDescription-separateDepthStencilLayouts-03285) VUID-VkAttachmentDescription-separateDepthStencilLayouts-03285

If the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),

* 
[](#VUID-VkAttachmentDescription-format-03286) VUID-VkAttachmentDescription-format-03286

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03287) VUID-VkAttachmentDescription-format-03287

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-06906) VUID-VkAttachmentDescription-format-06906

If `format` is a depth/stencil format which includes both depth and
stencil components, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-06907) VUID-VkAttachmentDescription-format-06907

If `format` is a depth/stencil format which includes both depth and
stencil components, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03290) VUID-VkAttachmentDescription-format-03290

If `format` is a depth/stencil format which includes only the depth
component, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03291) VUID-VkAttachmentDescription-format-03291

If `format` is a depth/stencil format which includes only the depth
component, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-synchronization2-06908) VUID-VkAttachmentDescription-synchronization2-06908

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-synchronization2-06909) VUID-VkAttachmentDescription-synchronization2-06909

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-attachmentFeedbackLoopLayout-07309) VUID-VkAttachmentDescription-attachmentFeedbackLoopLayout-07309

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-attachmentFeedbackLoopLayout-07310) VUID-VkAttachmentDescription-attachmentFeedbackLoopLayout-07310

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-samples-08745) VUID-VkAttachmentDescription-samples-08745

`samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is
set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](resources.html#resources-image-creation-limits)) for the given
`format`

* 
[](#VUID-VkAttachmentDescription-dynamicRenderingLocalRead-09544) VUID-VkAttachmentDescription-dynamicRenderingLocalRead-09544

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-dynamicRenderingLocalRead-09545) VUID-VkAttachmentDescription-dynamicRenderingLocalRead-09545

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-flags-11773) VUID-VkAttachmentDescription-flags-11773

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
`flags` **must** not include
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)

* 
[](#VUID-VkAttachmentDescription-flags-11774) VUID-VkAttachmentDescription-flags-11774

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
[`resolveSrgbFormatSupportsTransferFunctionControl`](limits.html#limits-resolveSrgbFormatSupportsTransferFunctionControl)
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkAttachmentDescription-flags-11775) VUID-VkAttachmentDescription-flags-11775

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
[`maintenance10`](features.html#features-maintenance10) **must** be enabled

* 
[](#VUID-VkAttachmentDescription-flags-11776) VUID-VkAttachmentDescription-flags-11776

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
`format` **must** use sRGB encoding

* 
[](#VUID-VkAttachmentDescription-flags-11777) VUID-VkAttachmentDescription-flags-11777

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkAttachmentDescription-format-06698) VUID-VkAttachmentDescription-format-06698

`format` **must** not be VK_FORMAT_UNDEFINED

* 
[](#VUID-VkAttachmentDescription-format-06700) VUID-VkAttachmentDescription-format-06700

If `format` includes a stencil component and `stencilLoadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp), then `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03292) VUID-VkAttachmentDescription-format-03292

If `format` is a depth/stencil format which includes only the
stencil component, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-03293) VUID-VkAttachmentDescription-format-03293

If `format` is a depth/stencil format which includes only the
stencil component, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-06242) VUID-VkAttachmentDescription-format-06242

If `format` is a depth/stencil format which includes both depth and
stencil components, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription-format-06243) VUID-VkAttachmentDescription-format-06243

If `format` is a depth/stencil format which includes both depth and
stencil components, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentDescription-flags-parameter) VUID-VkAttachmentDescription-flags-parameter

 `flags` **must** be a valid combination of [VkAttachmentDescriptionFlagBits](#VkAttachmentDescriptionFlagBits) values

* 
[](#VUID-VkAttachmentDescription-format-parameter) VUID-VkAttachmentDescription-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAttachmentDescription-samples-parameter) VUID-VkAttachmentDescription-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-VkAttachmentDescription-loadOp-parameter) VUID-VkAttachmentDescription-loadOp-parameter

 `loadOp` **must** be a valid [VkAttachmentLoadOp](#VkAttachmentLoadOp) value

* 
[](#VUID-VkAttachmentDescription-storeOp-parameter) VUID-VkAttachmentDescription-storeOp-parameter

 `storeOp` **must** be a valid [VkAttachmentStoreOp](#VkAttachmentStoreOp) value

* 
[](#VUID-VkAttachmentDescription-stencilLoadOp-parameter) VUID-VkAttachmentDescription-stencilLoadOp-parameter

 `stencilLoadOp` **must** be a valid [VkAttachmentLoadOp](#VkAttachmentLoadOp) value

* 
[](#VUID-VkAttachmentDescription-stencilStoreOp-parameter) VUID-VkAttachmentDescription-stencilStoreOp-parameter

 `stencilStoreOp` **must** be a valid [VkAttachmentStoreOp](#VkAttachmentStoreOp) value

* 
[](#VUID-VkAttachmentDescription-initialLayout-parameter) VUID-VkAttachmentDescription-initialLayout-parameter

 `initialLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkAttachmentDescription-finalLayout-parameter) VUID-VkAttachmentDescription-finalLayout-parameter

 `finalLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

Bits which **can** be set in [VkAttachmentDescription](#VkAttachmentDescription)::`flags`,
describing additional properties of the attachment, are:

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkAttachmentDescriptionFlagBits {
    VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT = 0x00000001,
  // Provided by VK_KHR_maintenance10
    VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_maintenance10
    VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR = 0x00000004,
} VkAttachmentDescriptionFlagBits;

* 
[VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits) specifies that the
attachment aliases the same device memory as other attachments.

* 
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
specifies that resolve operations happening to an sRGB encoded
attachment **must** not convert samples from nonlinear to linear before
averaging.

* 
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
specifies that resolve operations happening to an sRGB encoded
attachment **must** convert samples from nonlinear to linear before
averaging.

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkAttachmentDescriptionFlags;

`VkAttachmentDescriptionFlags` is a bitmask type for setting a mask of
zero or more [VkAttachmentDescriptionFlagBits](#VkAttachmentDescriptionFlagBits).

The `VkRenderPassInputAttachmentAspectCreateInfo` structure is defined
as:

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_1
typedef struct VkRenderPassInputAttachmentAspectCreateInfo {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   aspectReferenceCount;
    const VkInputAttachmentAspectReference*    pAspectReferences;
} VkRenderPassInputAttachmentAspectCreateInfo;

// Provided by VK_KHR_maintenance2
// Equivalent to VkRenderPassInputAttachmentAspectCreateInfo
typedef VkRenderPassInputAttachmentAspectCreateInfo VkRenderPassInputAttachmentAspectCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`aspectReferenceCount` is the number of elements in the
`pAspectReferences` array.

* 
`pAspectReferences` is a pointer to an array of
`aspectReferenceCount` [VkInputAttachmentAspectReference](#VkInputAttachmentAspectReference)
structures containing a mask describing which aspect(s) **can** be accessed
for a given input attachment within a given subpass.

To specify which aspects of an input attachment **can** be read, add a
[VkRenderPassInputAttachmentAspectCreateInfo](#VkRenderPassInputAttachmentAspectCreateInfo) structure to the
`pNext` chain of the [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) structure:

An application **can** access any aspect of an input attachment that does not
have a specified aspect mask in the `pAspectReferences` array.
Otherwise, an application **must** not access aspect(s) of an input attachment
other than those in its specified aspect mask.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassInputAttachmentAspectCreateInfo-sType-sType) VUID-VkRenderPassInputAttachmentAspectCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassInputAttachmentAspectCreateInfo-pAspectReferences-parameter) VUID-VkRenderPassInputAttachmentAspectCreateInfo-pAspectReferences-parameter

 `pAspectReferences` **must** be a valid pointer to an array of `aspectReferenceCount` valid [VkInputAttachmentAspectReference](#VkInputAttachmentAspectReference) structures

* 
[](#VUID-VkRenderPassInputAttachmentAspectCreateInfo-aspectReferenceCount-arraylength) VUID-VkRenderPassInputAttachmentAspectCreateInfo-aspectReferenceCount-arraylength

 `aspectReferenceCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)

The `VkInputAttachmentAspectReference` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_1
typedef struct VkInputAttachmentAspectReference {
    uint32_t              subpass;
    uint32_t              inputAttachmentIndex;
    VkImageAspectFlags    aspectMask;
} VkInputAttachmentAspectReference;

// Provided by VK_KHR_maintenance2
// Equivalent to VkInputAttachmentAspectReference
typedef VkInputAttachmentAspectReference VkInputAttachmentAspectReferenceKHR;

* 
`subpass` is an index into the `pSubpasses` array of the parent
`VkRenderPassCreateInfo` structure.

* 
`inputAttachmentIndex` is an index into the `pInputAttachments`
of the specified subpass.

* 
`aspectMask` is a mask of which aspect(s) **can** be accessed within
the specified subpass.

This structure specifies an aspect mask for a specific input attachment of a
specific subpass in the render pass.

`subpass` and `inputAttachmentIndex` index into the render pass as:

pCreateInfo->pSubpasses[subpass].pInputAttachments[inputAttachmentIndex]

Valid Usage

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-01964) VUID-VkInputAttachmentAspectReference-aspectMask-01964

`aspectMask` **must** not include [VK_IMAGE_ASPECT_METADATA_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-02250) VUID-VkInputAttachmentAspectReference-aspectMask-02250

`aspectMask` **must** not include
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for any index *i*

Valid Usage (Implicit)

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-parameter) VUID-VkInputAttachmentAspectReference-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) values

* 
[](#VUID-VkInputAttachmentAspectReference-aspectMask-requiredbitmask) VUID-VkInputAttachmentAspectReference-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

The `VkSubpassDescription` structure is defined as:

|  | This functionality is superseded by [VkSubpassDescription2](#VkSubpassDescription2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkSubpassDescription {
    VkSubpassDescriptionFlags       flags;
    VkPipelineBindPoint             pipelineBindPoint;
    uint32_t                        inputAttachmentCount;
    const VkAttachmentReference*    pInputAttachments;
    uint32_t                        colorAttachmentCount;
    const VkAttachmentReference*    pColorAttachments;
    const VkAttachmentReference*    pResolveAttachments;
    const VkAttachmentReference*    pDepthStencilAttachment;
    uint32_t                        preserveAttachmentCount;
    const uint32_t*                 pPreserveAttachments;
} VkSubpassDescription;

* 
`flags` is a bitmask of [VkSubpassDescriptionFlagBits](#VkSubpassDescriptionFlagBits)
specifying usage of the subpass.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value specifying
the pipeline type supported for this subpass.

* 
`inputAttachmentCount` is the number of input attachments.

* 
`pInputAttachments` is a pointer to an array of
[VkAttachmentReference](#VkAttachmentReference) structures defining the input attachments
for this subpass and their layouts.

* 
`colorAttachmentCount` is the number of color attachments.

* 
`pColorAttachments` is a pointer to an array of
`colorAttachmentCount` [VkAttachmentReference](#VkAttachmentReference) structures
defining the color attachments for this subpass and their layouts.

* 
`pResolveAttachments` is `NULL` or a pointer to an array of
`colorAttachmentCount` [VkAttachmentReference](#VkAttachmentReference) structures
defining the resolve attachments for this subpass and their layouts.

* 
`pDepthStencilAttachment` is a pointer to a
[VkAttachmentReference](#VkAttachmentReference) structure specifying the depth/stencil
attachment for this subpass and its layout.

* 
`preserveAttachmentCount` is the number of preserved attachments.

* 
`pPreserveAttachments` is a pointer to an array of
`preserveAttachmentCount` render pass attachment indices identifying
attachments that are not used by this subpass, but whose contents **must**
be preserved throughout the subpass.

Each element of the `pInputAttachments` array corresponds to an input
attachment index in a fragment shader, i.e. if a shader declares an image
variable decorated with a `InputAttachmentIndex` value of **X**, then it
uses the attachment provided in `pInputAttachments`[**X**].
Input attachments **must** also be bound to the pipeline in a descriptor set.
If the `attachment` member of any element of `pInputAttachments` is
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the application **must** not read from the
corresponding input attachment index.
Fragment shaders **can** use subpass input variables to access the contents of
an input attachment at the fragment’s (xf,yf) framebuffer
coordinates and layer.
Input attachments **must** not be used by any subpasses within a render pass
that enables [render pass transform](vertexpostproc.html#vertexpostproc-renderpass-transform).

Each element of the `pColorAttachments` array corresponds to an output
location in the shader, i.e. if the shader declares an output variable
decorated with a `Location` value of **X**, then it uses the attachment
provided in `pColorAttachments`[**X**].
If the `attachment` member of any element of `pColorAttachments` is
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
or if [Color Write Enable](framebuffer.html#framebuffer-color-write-enable) has been
disabled for the corresponding attachment index,
then writes to the corresponding location by a fragment shader are
discarded.

If
`flags` does not include
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), and if
`pResolveAttachments` is not `NULL`, each of its elements corresponds to
a color attachment (the element in `pColorAttachments` at the same
index), and a [multisample resolve operation](#renderpass-resolve-operations) is defined for each attachment unless the resolve attachment
index is [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED).

Similarly, if
`flags` does not include
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), and
[VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)::`pDepthStencilResolveAttachment`
is not `NULL` and does not have the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), it
corresponds to the depth/stencil attachment in
`pDepthStencilAttachment`, and
[multisample resolve operation](#renderpass-resolve-operations) for depth
and stencil are defined by
[VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)::`depthResolveMode` and
[VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)::`stencilResolveMode`,
respectively.
If [VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)::`depthResolveMode` is
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR) or the `pDepthStencilResolveAttachment` does
not have a depth aspect, no resolve operation is performed for the depth
attachment.
If [VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)::`stencilResolveMode`
is [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR) or the `pDepthStencilResolveAttachment`
does not have a stencil aspect, no resolve operation is performed for the
stencil attachment.

If the image subresource range referenced by the depth/stencil attachment is
created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits), then the
[multisample resolve operation](#renderpass-resolve-operations) uses the
sample locations state specified in the `sampleLocationsInfo` member of
the element of the
`VkRenderPassSampleLocationsBeginInfoEXT`::`pPostSubpassSampleLocations`
for the subpass.

If `pDepthStencilAttachment` is `NULL`, or if its attachment index is
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), it indicates that no depth/stencil attachment
will be used in the subpass.

Following this call, if the [`customResolve`](features.html#features-customResolve)
feature is enabled the fragment area **may** be reduced to (1,1) if a
fragment density map is attached to the render pass.
If this occurs, reads of input attachments **may** return the value for the
original larger fragment containing the smaller fragment or use the new
fragment area.

The contents of an attachment within the render area become **undefined** at
the start of a subpass **S** if all of the following conditions are true:

* 
The attachment is used as a color, depth/stencil, or resolve attachment
in any subpass in the render pass.

* 
There is a subpass **S1** that uses or preserves the attachment, and a
subpass dependency from **S1** to **S**.

* 
The attachment is not used or preserved in subpass **S**.

In addition, the contents of an attachment within the render area become
**undefined** at the start of a subpass **S** if all of the following conditions
are true:

* 
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits) is set.

* 
The attachment is used as a color or depth/stencil in the subpass.

For color attachments, this operation will be performed in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage, with any
image accesses performed via [VK_ACCESS_INPUT_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits),
[VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits), and
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).
For depth/stencil attachments, this operation **may** be performed in either
the [VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage, with any
image accesses performed via [VK_ACCESS_INPUT_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits),
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits), and
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).

Once the contents of an attachment become **undefined** in subpass **S**, they
remain **undefined** for subpasses in subpass dependency chains starting with
subpass **S** until they are written again.
However, they remain valid for subpasses in other subpass dependency chains
starting with subpass **S1** if all subpasses in each chain use or preserve
the attachment.

|  | If a subpass has multiple dependency chains where some of the chains
| --- | --- |
preserve the attachment, and others do not, the contents of the attachment
are **undefined** for that subpass. |

Valid Usage

* 
[](#VUID-VkSubpassDescription-attachment-06912) VUID-VkSubpassDescription-attachment-06912

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06913) VUID-VkSubpassDescription-attachment-06913

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06914) VUID-VkSubpassDescription-attachment-06914

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06915) VUID-VkSubpassDescription-attachment-06915

If the `attachment` member of `pDepthStencilAttachment` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06916) VUID-VkSubpassDescription-attachment-06916

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06917) VUID-VkSubpassDescription-attachment-06917

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06918) VUID-VkSubpassDescription-attachment-06918

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06919) VUID-VkSubpassDescription-attachment-06919

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06920) VUID-VkSubpassDescription-attachment-06920

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06921) VUID-VkSubpassDescription-attachment-06921

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06922) VUID-VkSubpassDescription-attachment-06922

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-attachment-06923) VUID-VkSubpassDescription-attachment-06923

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription-flags-10683) VUID-VkSubpassDescription-flags-10683

If `flags` includes
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](#VkSubpassDescriptionFlagBits), the render
pass **must** have been created with a
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`tileApronSize` greater
than `(0,0)`

* 
[](#VUID-VkSubpassDescription-inputAttachmentCount-12293) VUID-VkSubpassDescription-inputAttachmentCount-12293

`inputAttachmentCount` **must** be less than or equal to
[    `maxPerStageDescriptorInputAttachments`](limits.html#limits-maxPerStageDescriptorInputAttachments)

* 
[](#VUID-VkSubpassDescription-colorAttachmentCount-00845) VUID-VkSubpassDescription-colorAttachmentCount-00845

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkSubpassDescription-loadOp-00846) VUID-VkSubpassDescription-loadOp-00846

If the first use of an attachment in this render pass is as an input
attachment, and the attachment is not also used as a color or
depth/stencil attachment in the same subpass, then `loadOp` **must**
not be [VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp)

* 
[](#VUID-VkSubpassDescription-pipelineBindPoint-04952) VUID-VkSubpassDescription-pipelineBindPoint-04952

`pipelineBindPoint` **must** be [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint)
or [VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkSubpassDescription-pResolveAttachments-00847) VUID-VkSubpassDescription-pResolveAttachments-00847

If `pResolveAttachments` is not `NULL`, for each resolve attachment
that is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the corresponding color
attachment **must** not be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkSubpassDescription-pResolveAttachments-00848) VUID-VkSubpassDescription-pResolveAttachments-00848

If `pResolveAttachments` is not `NULL`, for each resolve attachment
that is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the corresponding color
attachment **must** not have a sample count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkSubpassDescription-pResolveAttachments-00849) VUID-VkSubpassDescription-pResolveAttachments-00849

If `pResolveAttachments` is not `NULL`, each resolve attachment that
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkSubpassDescription-pResolveAttachments-00850) VUID-VkSubpassDescription-pResolveAttachments-00850

If `pResolveAttachments` is not `NULL`, each resolve attachment that
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have the same [VkFormat](formats.html#VkFormat) as
its corresponding color attachment

* 
[](#VUID-VkSubpassDescription-pColorAttachments-09430) VUID-VkSubpassDescription-pColorAttachments-09430

All attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have the same sample count

* 
[](#VUID-VkSubpassDescription-pInputAttachments-02647) VUID-VkSubpassDescription-pInputAttachments-02647

All attachments in `pInputAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) contain at
least [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkSubpassDescription-pColorAttachments-02648) VUID-VkSubpassDescription-pColorAttachments-02648

All attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkSubpassDescription-pResolveAttachments-02649) VUID-VkSubpassDescription-pResolveAttachments-02649

All attachments in `pResolveAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkSubpassDescription-pDepthStencilAttachment-02650) VUID-VkSubpassDescription-pDepthStencilAttachment-02650

If `pDepthStencilAttachment` is not `NULL` and the attachment is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) then it **must** have an image format whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkSubpassDescription-linearColorAttachment-06496) VUID-VkSubpassDescription-linearColorAttachment-06496

If the [`linearColorAttachment`](features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling), all attachments in `pInputAttachments`
that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-VkSubpassDescription-linearColorAttachment-06497) VUID-VkSubpassDescription-linearColorAttachment-06497

If the [`linearColorAttachment`](features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling), all attachments in `pColorAttachments`
that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-VkSubpassDescription-linearColorAttachment-06498) VUID-VkSubpassDescription-linearColorAttachment-06498

If the [`linearColorAttachment`](features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling), all attachments in
`pResolveAttachments` that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must**
have image formats whose [potential format    features](formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-VkSubpassDescription-None-09431) VUID-VkSubpassDescription-None-09431

If either of the following is enabled:

The `[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

all attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have a sample count that is smaller than or
equal to the sample count of `pDepthStencilAttachment` if it is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription-pDepthStencilAttachment-01418) VUID-VkSubpassDescription-pDepthStencilAttachment-01418

If none of the following are enabled:

* 
The `[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

all attachments in `pDepthStencilAttachment` and `pColorAttachments`
that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have the same sample count

[](#VUID-VkSubpassDescription-attachment-00853) VUID-VkSubpassDescription-attachment-00853

Each element of `pPreserveAttachments` **must** not be
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription-pPreserveAttachments-00854) VUID-VkSubpassDescription-pPreserveAttachments-00854

Each element of `pPreserveAttachments` **must** not also be an element
of any other member of the subpass description

[](#VUID-VkSubpassDescription-layout-02519) VUID-VkSubpassDescription-layout-02519

If any attachment is used by more than one [VkAttachmentReference](#VkAttachmentReference)
member, then each use **must** use the same `layout`

[](#VUID-VkSubpassDescription-flags-00856) VUID-VkSubpassDescription-flags-00856

If `flags` includes
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](#VkSubpassDescriptionFlagBits), it **must**
also include [VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#VkSubpassDescriptionFlagBits)

[](#VUID-VkSubpassDescription-flags-03341) VUID-VkSubpassDescription-flags-03341

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), and if
`pResolveAttachments` is not `NULL`, then each resolve attachment
**must** be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription-flags-03343) VUID-VkSubpassDescription-flags-03343

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), then the subpass
**must** be the last subpass in a subpass dependency chain

[](#VUID-VkSubpassDescription-pInputAttachments-02868) VUID-VkSubpassDescription-pInputAttachments-02868

If the render pass is created with
[VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](#VkRenderPassCreateFlagBits) each of the elements of
`pInputAttachments` **must** be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription-pDepthStencilAttachment-04438) VUID-VkSubpassDescription-pDepthStencilAttachment-04438

`pDepthStencilAttachment` and `pColorAttachments` **must** not
contain references to the same attachment

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDescription-flags-parameter) VUID-VkSubpassDescription-flags-parameter

 `flags` **must** be a valid combination of [VkSubpassDescriptionFlagBits](#VkSubpassDescriptionFlagBits) values

* 
[](#VUID-VkSubpassDescription-pipelineBindPoint-parameter) VUID-VkSubpassDescription-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkSubpassDescription-pInputAttachments-parameter) VUID-VkSubpassDescription-pInputAttachments-parameter

 If `inputAttachmentCount` is not `0`, `pInputAttachments` **must** be a valid pointer to an array of `inputAttachmentCount` valid [VkAttachmentReference](#VkAttachmentReference) structures

* 
[](#VUID-VkSubpassDescription-pColorAttachments-parameter) VUID-VkSubpassDescription-pColorAttachments-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkAttachmentReference](#VkAttachmentReference) structures

* 
[](#VUID-VkSubpassDescription-pResolveAttachments-parameter) VUID-VkSubpassDescription-pResolveAttachments-parameter

 If `colorAttachmentCount` is not `0`, and `pResolveAttachments` is not `NULL`, `pResolveAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkAttachmentReference](#VkAttachmentReference) structures

* 
[](#VUID-VkSubpassDescription-pDepthStencilAttachment-parameter) VUID-VkSubpassDescription-pDepthStencilAttachment-parameter

 If `pDepthStencilAttachment` is not `NULL`, `pDepthStencilAttachment` **must** be a valid pointer to a valid [VkAttachmentReference](#VkAttachmentReference) structure

* 
[](#VUID-VkSubpassDescription-pPreserveAttachments-parameter) VUID-VkSubpassDescription-pPreserveAttachments-parameter

 If `preserveAttachmentCount` is not `0`, `pPreserveAttachments` **must** be a valid pointer to an array of `preserveAttachmentCount` `uint32_t` values

Bits which **can** be set in [VkSubpassDescription](#VkSubpassDescription)::`flags`,
specifying usage of the subpass, are:

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkSubpassDescriptionFlagBits {
  // Provided by VK_NVX_multiview_per_view_attributes
    VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX = 0x00000001,
  // Provided by VK_NVX_multiview_per_view_attributes
    VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX = 0x00000002,
  // Provided by VK_QCOM_tile_shading
    VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM = 0x00000100,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT = 0x00000010,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT = 0x00000020,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_legacy_dithering
    VK_SUBPASS_DESCRIPTION_ENABLE_LEGACY_DITHERING_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_custom_resolve
    VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_custom_resolve
    VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT = 0x00000008,
  // Provided by VK_QCOM_render_pass_shader_resolve
    VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_QCOM = VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT,
  // Provided by VK_QCOM_render_pass_shader_resolve
    VK_SUBPASS_DESCRIPTION_SHADER_RESOLVE_BIT_QCOM = VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_ARM = VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_ARM = VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_ARM = VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT,
} VkSubpassDescriptionFlagBits;

* 
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#VkSubpassDescriptionFlagBits) specifies that
shaders compiled for this subpass write the attributes for all views in
a single invocation of each
[pre-rasterization shader    stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).
All pipelines compiled against a subpass that includes this bit **must**
write per-view attributes to the `*PerViewNV[]` shader outputs, in
addition to the non-per-view (e.g. `Position`) outputs.

* 
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](#VkSubpassDescriptionFlagBits) specifies
that shaders compiled for this subpass use per-view positions which only
differ in value in the x component.
Per-view viewport mask **can** also be used.

* 
[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](#VkSubpassDescriptionFlagBits) specifies that the
framebuffer region is the fragment region, that is, the minimum region
dependencies are by pixel rather than by sample, such that any fragment
shader invocation **can** access any sample associated with that fragment
shader invocation.

* 
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits) specifies that the
subpass performs shader resolve operations.

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](#VkSubpassDescriptionFlagBits)
specifies that this subpass supports pipelines created with
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](framebuffer.html#VkPipelineColorBlendStateCreateFlagBits).

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](#VkSubpassDescriptionFlagBits)
specifies that this subpass supports pipelines created with
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits).

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](#VkSubpassDescriptionFlagBits)
specifies that this subpass supports pipelines created with
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits).

* 
[VK_SUBPASS_DESCRIPTION_ENABLE_LEGACY_DITHERING_BIT_EXT](#VkSubpassDescriptionFlagBits) specifies
that [Legacy Dithering](interfaces.html#interfaces-legacy-dithering) is enabled for
this subpass.

* 
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](#VkSubpassDescriptionFlagBits) specifies that
[apron regions](#renderpass-tile-shading-aprons) **can** be read within
this subpass when [tile shading is enabled](#renderpass-tile-shading).

|  | Shader resolve operations allow for custom resolve operations, but
| --- | --- |
overdrawing pixels **may** have a performance and/or power cost.
Furthermore, since the content of any depth stencil attachment or color
attachment is **undefined** at the beginning of a shader resolve subpass, any
depth testing, stencil testing, or blending operation which sources these
**undefined** values also has **undefined** result value. |

|  | There is no equivalent to
| --- | --- |
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](#VkSubpassDescriptionFlagBits),
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](#VkSubpassDescriptionFlagBits),
or
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](#VkSubpassDescriptionFlagBits)
for render pass instances begun with [vkCmdBeginRendering](#vkCmdBeginRendering).
For such render passes, only the corresponding pipeline flags are specified. |

|  | This functionality is superseded by [Vulkan Version 1.2](../appendices/versions.html#versions-1.2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkSubpassDescriptionFlags;

`VkSubpassDescriptionFlags` is a bitmask type for setting a mask of zero
or more [VkSubpassDescriptionFlagBits](#VkSubpassDescriptionFlagBits).

The `VkAttachmentReference` structure is defined as:

|  | This functionality is superseded by [VkAttachmentReference2](#VkAttachmentReference2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkAttachmentReference {
    uint32_t         attachment;
    VkImageLayout    layout;
} VkAttachmentReference;

* 
`attachment` is either an integer value identifying an attachment at
the corresponding index in
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)::`pAttachments`, or
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) to signify that this attachment is not used.

* 
`layout` is a [VkImageLayout](resources.html#VkImageLayout) value specifying the layout the
attachment uses during the subpass.

Valid Usage

* 
[](#VUID-VkAttachmentReference-layout-03077) VUID-VkAttachmentReference-layout-03077

    If `attachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `layout`
    **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout), or
    [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentReference-separateDepthStencilLayouts-03313) VUID-VkAttachmentReference-separateDepthStencilLayouts-03313

If the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled, and
`attachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `layout` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),

* 
[](#VUID-VkAttachmentReference-synchronization2-06910) VUID-VkAttachmentReference-synchronization2-06910

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentReference-attachmentFeedbackLoopLayout-07311) VUID-VkAttachmentReference-attachmentFeedbackLoopLayout-07311

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentReference-dynamicRenderingLocalRead-09546) VUID-VkAttachmentReference-dynamicRenderingLocalRead-09546

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, `layout`
**must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentReference-layout-parameter) VUID-VkAttachmentReference-layout-parameter

 `layout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL) is a special subpass index value expanding
synchronization scope outside a subpass.
It is described in more detail by [VkSubpassDependency](#VkSubpassDependency).

#define VK_SUBPASS_EXTERNAL               (~0U)

The `VkSubpassDependency` structure is defined as:

|  | This functionality is superseded by [VkSubpassDependency2](#VkSubpassDependency2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkSubpassDependency {
    uint32_t                srcSubpass;
    uint32_t                dstSubpass;
    VkPipelineStageFlags    srcStageMask;
    VkPipelineStageFlags    dstStageMask;
    VkAccessFlags           srcAccessMask;
    VkAccessFlags           dstAccessMask;
    VkDependencyFlags       dependencyFlags;
} VkSubpassDependency;

* 
`srcSubpass` is the subpass index of the first subpass in the
dependency, or [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL).

* 
`dstSubpass` is the subpass index of the second subpass in the
dependency, or [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL).

* 
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits)
specifying the [source stage    mask](synchronization.html#synchronization-pipeline-stages-masks).
If set to [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits), it is equivalent to
setting it to [VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](synchronization.html#VkPipelineStageFlagBits).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits)
specifying the [destination    stage mask](synchronization.html#synchronization-pipeline-stages-masks) If set to [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits), it is
equivalent to setting it to [VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](synchronization.html#VkPipelineStageFlagBits).

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) specifying a
[source access mask](synchronization.html#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) specifying a
[destination access mask](synchronization.html#synchronization-access-masks).

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](synchronization.html#VkDependencyFlagBits).

If `srcSubpass` is equal to `dstSubpass` then the
[VkSubpassDependency](#VkSubpassDependency) does not directly define a
[dependency](synchronization.html#synchronization-dependencies).
Instead, it enables pipeline barriers to be used in a render pass instance
within the identified subpass, where the scopes of one pipeline barrier
**must** be a subset of those described by one subpass dependency.
Subpass dependencies specified in this way that include
[framebuffer-space stages](synchronization.html#synchronization-framebuffer-regions) in the
`srcStageMask` **must** only include
[framebuffer-space stages](synchronization.html#synchronization-framebuffer-regions) in
`dstStageMask`, and **must** include [VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits).
When a subpass dependency is specified in this way for a subpass that has
more than one view in its view mask, its `dependencyFlags` **must** include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits).

If `srcSubpass` and `dstSubpass` are not equal, when a render pass
instance which includes a subpass dependency is submitted to a queue, it
defines a [dependency](synchronization.html#synchronization-dependencies) between the subpasses
identified by `srcSubpass` and `dstSubpass`.

If `srcSubpass` is equal to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), the first
[synchronization scope](synchronization.html#synchronization-dependencies-scopes) includes
commands that occur earlier in [submission order](synchronization.html#synchronization-submission-order) than the [vkCmdBeginRenderPass](#vkCmdBeginRenderPass) used to begin the render pass
instance.
Otherwise, the first set of commands includes all commands submitted as part
of the subpass instance identified by `srcSubpass` and any
[load](#renderpass-load-operations), [store](#renderpass-store-operations), or [multisample resolve](#renderpass-resolve-operations)
operations on attachments used in `srcSubpass`.
In either case, the first synchronization scope is limited to operations on
the pipeline stages determined by the
[source stage mask](synchronization.html#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.

If `dstSubpass` is equal to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), the second
[synchronization scope](synchronization.html#synchronization-dependencies-scopes) includes
commands that occur later in [submission order](synchronization.html#synchronization-submission-order) than the [vkCmdEndRenderPass](#vkCmdEndRenderPass) used to end the render pass
instance.
Otherwise, the second set of commands includes all commands submitted as
part of the subpass instance identified by `dstSubpass` and any
[load](#renderpass-load-operations), [store](#renderpass-store-operations), and [multisample resolve](#renderpass-resolve-operations)
operations on attachments used in `dstSubpass`.
In either case, the second synchronization scope is limited to operations on
the pipeline stages determined by the
[destination stage mask](synchronization.html#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.

The first [access scope](synchronization.html#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[source stage mask](synchronization.html#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.
It is also limited to access types in the [source access mask](synchronization.html#synchronization-access-masks) specified by `srcAccessMask`.

The second [access scope](synchronization.html#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[destination stage mask](synchronization.html#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.
It is also limited to access types in the [destination access mask](synchronization.html#synchronization-access-masks) specified by `dstAccessMask`.

The [availability and visibility operations](synchronization.html#synchronization-dependencies-available-and-visible) defined by a subpass dependency affect the execution
of [image layout transitions](#renderpass-layout-transitions) within the
render pass.

|  | For non-attachment resources, the memory dependency expressed by subpass
| --- | --- |
dependency is nearly identical to that of a [VkMemoryBarrier](synchronization.html#VkMemoryBarrier) (with
matching `srcAccessMask` and `dstAccessMask` parameters) submitted
as a part of a [vkCmdPipelineBarrier](synchronization.html#vkCmdPipelineBarrier) (with matching `srcStageMask`
and `dstStageMask` parameters).
The only difference being that its scopes are limited to the identified
subpasses rather than potentially affecting everything before and after.

For attachments however, subpass dependencies work more like a
[VkImageMemoryBarrier](synchronization.html#VkImageMemoryBarrier) defined similarly to the [VkMemoryBarrier](synchronization.html#VkMemoryBarrier)
above, the queue family indices set to [VK_QUEUE_FAMILY_IGNORED](synchronization.html#VK_QUEUE_FAMILY_IGNORED), and
layouts as follows:

* 
The equivalent to `oldLayout` is the attachment’s layout according
to the subpass description for `srcSubpass`.

* 
The equivalent to `newLayout` is the attachment’s layout according
to the subpass description for `dstSubpass`. |

Valid Usage

* 
[](#VUID-VkSubpassDependency-srcStageMask-04090) VUID-VkSubpassDependency-srcStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-04091) VUID-VkSubpassDependency-srcStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-04092) VUID-VkSubpassDependency-srcStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-04093) VUID-VkSubpassDependency-srcStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-04094) VUID-VkSubpassDependency-srcStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-04095) VUID-VkSubpassDependency-srcStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-04096) VUID-VkSubpassDependency-srcStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-07318) VUID-VkSubpassDependency-srcStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-03937) VUID-VkSubpassDependency-srcStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-VkSubpassDependency-srcStageMask-07949) VUID-VkSubpassDependency-srcStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcStageMask-10754) VUID-VkSubpassDependency-srcStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04090) VUID-VkSubpassDependency-dstStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04091) VUID-VkSubpassDependency-dstStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04092) VUID-VkSubpassDependency-dstStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04093) VUID-VkSubpassDependency-dstStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04094) VUID-VkSubpassDependency-dstStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04095) VUID-VkSubpassDependency-dstStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-04096) VUID-VkSubpassDependency-dstStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-07318) VUID-VkSubpassDependency-dstStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-03937) VUID-VkSubpassDependency-dstStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-VkSubpassDependency-dstStageMask-07949) VUID-VkSubpassDependency-dstStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-dstStageMask-10754) VUID-VkSubpassDependency-dstStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency-srcSubpass-00864) VUID-VkSubpassDependency-srcSubpass-00864

`srcSubpass` **must** be less than or equal to `dstSubpass`, unless
one of them is [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), to avoid cyclic dependencies
and ensure a valid execution order

* 
[](#VUID-VkSubpassDependency-srcSubpass-00865) VUID-VkSubpassDependency-srcSubpass-00865

`srcSubpass` and `dstSubpass` **must** not both be equal to
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL)

* 
[](#VUID-VkSubpassDependency-srcSubpass-06809) VUID-VkSubpassDependency-srcSubpass-06809

If `srcSubpass` is equal to `dstSubpass` and `srcStageMask`
includes a [framebuffer-space    stage](synchronization.html#synchronization-framebuffer-regions), `dstStageMask` **must** only contain
[framebuffer-space stages](synchronization.html#synchronization-framebuffer-regions)

* 
[](#VUID-VkSubpassDependency-srcAccessMask-00868) VUID-VkSubpassDependency-srcAccessMask-00868

Any access flag included in `srcAccessMask` **must** be supported by
one of the pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-VkSubpassDependency-dstAccessMask-00869) VUID-VkSubpassDependency-dstAccessMask-00869

Any access flag included in `dstAccessMask` **must** be supported by
one of the pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-VkSubpassDependency-srcSubpass-02243) VUID-VkSubpassDependency-srcSubpass-02243

If `srcSubpass` equals `dstSubpass`, and `srcStageMask` and
`dstStageMask` both include a
[framebuffer-space stage](synchronization.html#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits)

* 
[](#VUID-VkSubpassDependency-dependencyFlags-02520) VUID-VkSubpassDependency-dependencyFlags-02520

If `dependencyFlags` includes [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits),
`srcSubpass` **must** not be equal to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL)

* 
[](#VUID-VkSubpassDependency-dependencyFlags-02521) VUID-VkSubpassDependency-dependencyFlags-02521

If `dependencyFlags` includes [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits),
`dstSubpass` **must** not be equal to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL)

* 
[](#VUID-VkSubpassDependency-srcSubpass-00872) VUID-VkSubpassDependency-srcSubpass-00872

If `srcSubpass` equals `dstSubpass` and that subpass has more
than one bit set in the view mask, then `dependencyFlags` **must**
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits)

* 
[](#VUID-VkSubpassDependency-dependencyFlags-10203) VUID-VkSubpassDependency-dependencyFlags-10203

`dependencyFlags` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](synchronization.html#VkDependencyFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDependency-srcStageMask-parameter) VUID-VkSubpassDependency-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkSubpassDependency-dstStageMask-parameter) VUID-VkSubpassDependency-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkSubpassDependency-srcAccessMask-parameter) VUID-VkSubpassDependency-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) values

* 
[](#VUID-VkSubpassDependency-dstAccessMask-parameter) VUID-VkSubpassDependency-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) values

* 
[](#VUID-VkSubpassDependency-dependencyFlags-parameter) VUID-VkSubpassDependency-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](synchronization.html#VkDependencyFlagBits) values

When multiview is enabled, the execution of the multiple views of one
subpass **may** not occur simultaneously or even back-to-back, and rather **may**
be interleaved with the execution of other subpasses.
The load and store operations apply to attachments on a per-view basis.
For example, an attachment using [VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp) will have
each view cleared on first use, but the first use of one view may be
temporally distant from the first use of another view.

|  | A good mental model for multiview is to think of a multiview subpass as if
| --- | --- |
it were a collection of individual (per-view) subpasses that are logically
grouped together and described as a single multiview subpass in the API.
Similarly, a multiview attachment can be thought of like several individual
attachments that happen to be layers in a single image.
A view-local dependency between two multiview subpasses acts like a set of
one-to-one dependencies between corresponding pairs of per-view subpasses.
A view-global dependency between two multiview subpasses acts like a set of
N × M dependencies between all pairs of per-view subpasses in
the source and destination.
Thus, it is a more compact representation which also makes clear the
commonality and reuse that is present between views in a subpass.
This interpretation motivates the answers to questions like “when does the
load op apply” - it is on the first use of each view of an attachment, as
if each view was a separate attachment.

The content of each view follows the description in
[attachment content behavior](#renderpass-attachment-contents).
In particular, if an attachment is preserved, all views within the
attachment are preserved. |

If any two subpasses of a render pass activate transform feedback to the
same bound transform feedback buffers, a subpass dependency **must** be
included (either directly or via some intermediate subpasses) between them.

If there is no subpass dependency from [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL) to the
first subpass that uses an attachment, then an implicit subpass dependency
exists from [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL) to the first subpass it is used in.
The implicit subpass dependency only exists if there exists an automatic
layout transition away from `initialLayout`.
The subpass dependency operates as if defined with the following parameters:

VkSubpassDependency implicitDependency = {
    .srcSubpass = VK_SUBPASS_EXTERNAL,
    .dstSubpass = firstSubpass, // First subpass attachment is used in
    .srcStageMask = VK_PIPELINE_STAGE_NONE,
    .dstStageMask = VK_PIPELINE_STAGE_ALL_COMMANDS_BIT,
    .srcAccessMask = 0,
    .dstAccessMask = VK_ACCESS_INPUT_ATTACHMENT_READ_BIT |
                     VK_ACCESS_COLOR_ATTACHMENT_READ_BIT |
                     VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT |
                     VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT |
                     VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT,
    .dependencyFlags = 0
};

Similarly, if there is no subpass dependency from the last subpass that uses
an attachment to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), then an implicit subpass
dependency exists from the last subpass it is used in to
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL).
The implicit subpass dependency only exists if there exists an automatic
layout transition into `finalLayout`.
The subpass dependency operates as if defined with the following parameters:

VkSubpassDependency implicitDependency = {
    .srcSubpass = lastSubpass, // Last subpass attachment is used in
    .dstSubpass = VK_SUBPASS_EXTERNAL,
    .srcStageMask = VK_PIPELINE_STAGE_ALL_COMMANDS_BIT,
    .dstStageMask = VK_PIPELINE_STAGE_NONE,
    .srcAccessMask = VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT |
                     VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT,
    .dstAccessMask = 0,
    .dependencyFlags = 0
};

As subpasses **may** overlap or execute out of order with regards to other
subpasses unless a subpass dependency chain describes otherwise, the layout
transitions required between subpasses **cannot** be known to an application.
Instead, an application provides the layout that each attachment **must** be in
at the start and end of a render pass, and the layout it **must** be in during
each subpass it is used in.
The implementation then **must** execute layout transitions between subpasses
in order to guarantee that the images are in the layouts required by each
subpass, and in the final layout at the end of the render pass.

Automatic layout transitions apply to the entire image subresource attached
to the framebuffer.
If
multiview is not enabled and
the attachment is a view of a 1D or 2D image, the automatic layout
transitions apply to the number of layers specified by
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`layers`.
If multiview is enabled and the attachment is a view of a 1D or 2D image,
the automatic layout transitions apply to the layers corresponding to views
which are used by some subpass in the render pass, even if that subpass does
not reference the given attachment.
If
the [`maintenance9`](features.html#features-maintenance9) feature is not enabled,
and
the attachment view is a 2D or 2D array view of a 3D image, even if the
attachment view only refers to a subset of the slices of the selected mip
level of the 3D image, automatic layout transitions apply to the entire
subresource referenced which is the entire mip level in this case.
If the attachment view is a 2D or 2D array view of a 3D image and
[`maintenance9`](features.html#features-maintenance9) feature is enabled, layout
transitions apply only to the subresource the attachment view refers to.

Automatic layout transitions away from the layout used in a subpass
happen-after the availability operations for all dependencies with that
subpass as the `srcSubpass`.

Automatic layout transitions into the layout used in a subpass happen-before
the visibility operations for all dependencies with that subpass as the
`dstSubpass`.

Automatic layout transitions away from `initialLayout` happen-after the
availability operations for all dependencies with a `srcSubpass` equal
to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), where `dstSubpass` uses the attachment
that will be transitioned.
For attachments created with [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits),
automatic layout transitions away from `initialLayout` happen-after the
availability operations for all dependencies with a `srcSubpass` equal
to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), where `dstSubpass` uses any aliased
attachment.

Automatic layout transitions into `finalLayout` happen-before the
visibility operations for all dependencies with a `dstSubpass` equal to
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), where `srcSubpass` uses the attachment that
will be transitioned.
For attachments created with [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits),
automatic layout transitions into `finalLayout` happen-before the
visibility operations for all dependencies with a `dstSubpass` equal to
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), where `srcSubpass` uses any aliased
attachment.

The image layout of the depth aspect of a depth/stencil attachment referring
to an image created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits) is dependent
on the last sample locations used to render to the attachment, thus
automatic layout transitions use the sample locations state specified in
[VkRenderPassSampleLocationsBeginInfoEXT](#VkRenderPassSampleLocationsBeginInfoEXT).

Automatic layout transitions of an attachment referring to a depth/stencil
image created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits) use the
sample locations the image subresource range referenced by the attachment
was last rendered with.
If the current render pass does not use the attachment as a depth/stencil
attachment in any subpass that happens-before, the automatic layout
transition uses the sample locations state specified in the
`sampleLocationsInfo` member of the element of the
`VkRenderPassSampleLocationsBeginInfoEXT`::`pAttachmentInitialSampleLocations`
array for which the `attachmentIndex` member equals the attachment index
of the attachment, if one is specified.
Otherwise, the automatic layout transition uses the sample locations state
specified in the `sampleLocationsInfo` member of the element of the
`VkRenderPassSampleLocationsBeginInfoEXT`::`pPostSubpassSampleLocations`
array for which the `subpassIndex` member equals the index of the
subpass that last used the attachment as a depth/stencil attachment, if one
is specified.

If no sample locations state has been specified for an automatic layout
transition performed on an attachment referring to a depth/stencil image
created with [VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits)
the contents of the depth aspect of the depth/stencil attachment become
**undefined** as if the layout of the attachment was transitioned from the
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) layout.

If two subpasses use the same attachment, and both subpasses use the
attachment in a read-only layout, no subpass dependency needs to be
specified between those subpasses.
If an implementation treats those layouts separately, it **must** insert an
implicit subpass dependency between those subpasses to separate the uses in
each layout.
The subpass dependency operates as if defined with the following parameters:

// Used for input attachments
VkPipelineStageFlags inputAttachmentStages = VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT;
VkAccessFlags inputAttachmentDstAccess = VK_ACCESS_INPUT_ATTACHMENT_READ_BIT;

// Used for depth/stencil attachments
VkPipelineStageFlags depthStencilAttachmentStages = VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT | VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT;
VkAccessFlags depthStencilAttachmentDstAccess = VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT;

VkSubpassDependency implicitDependency = {
    .srcSubpass = firstSubpass;
    .dstSubpass = secondSubpass;
    .srcStageMask = inputAttachmentStages | depthStencilAttachmentStages;
    .dstStageMask = inputAttachmentStages | depthStencilAttachmentStages;
    .srcAccessMask = 0;
    .dstAccessMask = inputAttachmentDstAccess | depthStencilAttachmentDstAccess;
    .dependencyFlags = 0;
};

When
drawing using [shader objects](shaders.html#shaders-objects),
or when
the graphics pipeline is created with
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, the
application **must** specify which types of attachments that are written to
during a render pass will also be accessed as non-attachments in the render
pass.

To [dynamically set](pipelines.html#pipelines-dynamic-state) whether a pipeline **can**
access a resource as a non-attachment while it is also used as an attachment
that is written to, call:

// Provided by VK_EXT_attachment_feedback_loop_dynamic_state
void vkCmdSetAttachmentFeedbackLoopEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkImageAspectFlags                          aspectMask);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`aspectMask` specifies the types of attachments for which feedback
loops will be enabled.
Attachment types whose aspects are not included in `aspectMask` will
have feedback loops disabled.

For attachments that are written to in a render pass, only attachments with
the aspects specified in `aspectMask` **can** be accessed as
non-attachments by subsequent [drawing commands](drawing.html#drawing).

Valid Usage

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopDynamicState-08862) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopDynamicState-08862

The [    `attachmentFeedbackLoopDynamicState`](features.html#features-attachmentFeedbackLoopDynamicState) feature **must** be enabled

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-08863) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-08863

`aspectMask` **must** only include [VK_IMAGE_ASPECT_NONE](resources.html#VkImageAspectFlagBits),
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits), and
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopLayout-08864) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-attachmentFeedbackLoopLayout-08864

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`aspectMask` **must** be [VK_IMAGE_ASPECT_NONE](resources.html#VkImageAspectFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-parameter) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-parameter) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) values

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-recording) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-videocoding) VUID-vkCmdSetAttachmentFeedbackLoopEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetAttachmentFeedbackLoopEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

A more extensible version of render pass creation is also defined below.

To create a render pass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
VkResult vkCreateRenderPass2(
    VkDevice                                    device,
    const VkRenderPassCreateInfo2*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkRenderPass*                               pRenderPass);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCreateRenderPass2
VkResult vkCreateRenderPass2KHR(
    VkDevice                                    device,
    const VkRenderPassCreateInfo2*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkRenderPass*                               pRenderPass);

* 
`device` is the logical device that creates the render pass.

* 
`pCreateInfo` is a pointer to a [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)
structure describing the parameters of the render pass.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pRenderPass` is a pointer to a [VkRenderPass](#VkRenderPass) handle in which
the resulting render pass object is returned.

This command is functionally identical to [vkCreateRenderPass](#vkCreateRenderPass), but
includes extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage

* 
[](#VUID-vkCreateRenderPass2-device-10001) VUID-vkCreateRenderPass2-device-10001

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateRenderPass2-flags-10649) VUID-vkCreateRenderPass2-flags-10649

[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags` **must** not
include [VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRenderPass2-device-parameter) VUID-vkCreateRenderPass2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateRenderPass2-pCreateInfo-parameter) VUID-vkCreateRenderPass2-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2) structure

* 
[](#VUID-vkCreateRenderPass2-pAllocator-parameter) VUID-vkCreateRenderPass2-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateRenderPass2-pRenderPass-parameter) VUID-vkCreateRenderPass2-pRenderPass-parameter

 `pRenderPass` **must** be a valid pointer to a [VkRenderPass](#VkRenderPass) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkRenderPassCreateInfo2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkRenderPassCreateInfo2 {
    VkStructureType                    sType;
    const void*                        pNext;
    VkRenderPassCreateFlags            flags;
    uint32_t                           attachmentCount;
    const VkAttachmentDescription2*    pAttachments;
    uint32_t                           subpassCount;
    const VkSubpassDescription2*       pSubpasses;
    uint32_t                           dependencyCount;
    const VkSubpassDependency2*        pDependencies;
    uint32_t                           correlatedViewMaskCount;
    const uint32_t*                    pCorrelatedViewMasks;
} VkRenderPassCreateInfo2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkRenderPassCreateInfo2
typedef VkRenderPassCreateInfo2 VkRenderPassCreateInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderPassCreateFlagBits](#VkRenderPassCreateFlagBits)

* 
`attachmentCount` is the number of attachments used by this render
pass.

* 
`pAttachments` is a pointer to an array of `attachmentCount`
[VkAttachmentDescription2](#VkAttachmentDescription2) structures describing the attachments
used by the render pass.

* 
`subpassCount` is the number of subpasses to create.

* 
`pSubpasses` is a pointer to an array of `subpassCount`
[VkSubpassDescription2](#VkSubpassDescription2) structures describing each subpass.

* 
`dependencyCount` is the number of dependencies between pairs of
subpasses.

* 
`pDependencies` is a pointer to an array of `dependencyCount`
[VkSubpassDependency2](#VkSubpassDependency2) structures describing dependencies between
pairs of subpasses.

* 
`correlatedViewMaskCount` is the number of correlation masks.

* 
`pCorrelatedViewMasks` is a pointer to an array of view masks
indicating sets of views that **may** be more efficient to render
concurrently.

Parameters defined by this structure with the same name as those in
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo) have the identical effect to those parameters;
the child structures are variants of those used in
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo) which add `sType` and `pNext`
parameters, allowing them to be extended.

If the [VkSubpassDescription2](#VkSubpassDescription2)::`viewMask` member of any element of
`pSubpasses` is not zero, *multiview* functionality is considered to be
enabled for this render pass.

`correlatedViewMaskCount` and `pCorrelatedViewMasks` have the same
effect as [VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo)::`correlationMaskCount`
and [VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo)::`pCorrelationMasks`,
respectively.

Valid Usage

* 
[](#VUID-VkRenderPassCreateInfo2-None-03049) VUID-VkRenderPassCreateInfo2-None-03049

If any two subpasses operate on attachments with overlapping ranges of
the same `VkDeviceMemory` object, and at least one subpass writes to
that area of `VkDeviceMemory`, a subpass dependency **must** be
included (either directly or via some intermediate subpasses) between
them

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-03050) VUID-VkRenderPassCreateInfo2-attachment-03050

If the `attachment` member of any element of
`pInputAttachments`, `pColorAttachments`,
`pResolveAttachments` or `pDepthStencilAttachment`, or the
attachment indexed by any element of `pPreserveAttachments` in any
element of `pSubpasses` is bound to a range of a
`VkDeviceMemory` object that overlaps with any other attachment in
any subpass (including the same subpass), the
`VkAttachmentDescription2` structures describing them **must** include
[VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits) in `flags`

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-03051) VUID-VkRenderPassCreateInfo2-attachment-03051

If the `attachment` member of any element of
`pInputAttachments`, `pColorAttachments`,
`pResolveAttachments` or `pDepthStencilAttachment`, or any
element of `pPreserveAttachments` in any element of `pSubpasses`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then it **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-06472) VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-06472

If the pNext chain includes a
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT) structure and the
`fragmentDensityMapAttachment` member is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then `attachment` **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo2-fragmentDensityMapLayered-10829) VUID-VkRenderPassCreateInfo2-fragmentDensityMapLayered-10829

If the [    `fragmentDensityMapLayered`](features.html#features-fragmentDensityMapLayered) feature is not enabled, `flags`
**must** not contain
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderPassCreateFlagBits)

* 
[](#VUID-VkRenderPassCreateInfo2-pSubpasses-06473) VUID-VkRenderPassCreateInfo2-pSubpasses-06473

If the `pSubpasses` pNext chain includes a
[VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve) structure and the
`pDepthStencilResolveAttachment` member is not `NULL` and does not
have the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then `attachment` **must**
be less than `attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-02522) VUID-VkRenderPassCreateInfo2-pAttachments-02522

For any member of `pAttachments` with a `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-02523) VUID-VkRenderPassCreateInfo2-pAttachments-02523

For any member of `pAttachments` with a `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-03054) VUID-VkRenderPassCreateInfo2-pDependencies-03054

For each element of `pDependencies`, if the `srcSubpass` is not
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), all stage flags included in the
`srcStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits) or a pipeline stage supported
by the [pipeline](synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the source subpass

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-03055) VUID-VkRenderPassCreateInfo2-pDependencies-03055

For each element of `pDependencies`, if the `dstSubpass` is not
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), all stage flags included in the
`dstStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits) or a pipeline stage supported
by the [pipeline](synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the destination subpass

* 
[](#VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-03056) VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-03056

The set of bits included in any element of `pCorrelatedViewMasks`
**must** not overlap with the set of bits included in any other element of
`pCorrelatedViewMasks`

* 
[](#VUID-VkRenderPassCreateInfo2-viewMask-03057) VUID-VkRenderPassCreateInfo2-viewMask-03057

If the [VkSubpassDescription2](#VkSubpassDescription2)::`viewMask` member of all
elements of `pSubpasses` is `0`, `correlatedViewMaskCount` **must**
be `0`

* 
[](#VUID-VkRenderPassCreateInfo2-viewMask-03058) VUID-VkRenderPassCreateInfo2-viewMask-03058

The [VkSubpassDescription2](#VkSubpassDescription2)::`viewMask` member of all elements
of `pSubpasses` **must** either all be `0`, or all not be `0`

* 
[](#VUID-VkRenderPassCreateInfo2-viewMask-03059) VUID-VkRenderPassCreateInfo2-viewMask-03059

If the [VkSubpassDescription2](#VkSubpassDescription2)::`viewMask` member of all
elements of `pSubpasses` is `0`, the `dependencyFlags` member of
any element of `pDependencies` **must** not include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits)

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-03060) VUID-VkRenderPassCreateInfo2-pDependencies-03060

For each element of `pDependencies` where its `srcSubpass`
member equals its `dstSubpass` member, if the `viewMask` member
of the corresponding element of `pSubpasses` includes more than one
bit, its `dependencyFlags` member **must** include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits)

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-02525) VUID-VkRenderPassCreateInfo2-attachment-02525

If the `attachment` member of any element of the
`pInputAttachments` member of any element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the `aspectMask` member of that element
of `pInputAttachments` **must** only include aspects that are present
in images of the format specified by the element of `pAttachments`
specified by `attachment`

* 
[](#VUID-VkRenderPassCreateInfo2-srcSubpass-02526) VUID-VkRenderPassCreateInfo2-srcSubpass-02526

The `srcSubpass` member of each element of `pDependencies` **must**
be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo2-dstSubpass-02527) VUID-VkRenderPassCreateInfo2-dstSubpass-02527

The `dstSubpass` member of each element of `pDependencies` **must**
be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-04585) VUID-VkRenderPassCreateInfo2-pAttachments-04585

If any element of `pAttachments` is used as a fragment shading rate
attachment in any subpass, it **must** not be used as any other attachment
in the render pass

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-09387) VUID-VkRenderPassCreateInfo2-pAttachments-09387

If any element of `pAttachments` is used as a fragment shading rate
attachment, the `loadOp` for that attachment **must** not be
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp)

* 
[](#VUID-VkRenderPassCreateInfo2-flags-04521) VUID-VkRenderPassCreateInfo2-flags-04521

If `flags` includes [VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](#VkRenderPassCreateFlagBits),
an element of `pSubpasses` includes an instance of
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR) in its `pNext` chain,
and the `pFragmentShadingRateAttachment` member of that structure is
not equal to `NULL`, the `attachment` member of
`pFragmentShadingRateAttachment` **must** be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-04586) VUID-VkRenderPassCreateInfo2-pAttachments-04586

If any element of `pAttachments` is used as a fragment shading rate
attachment in any subpass, it **must** have an image format whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-06244) VUID-VkRenderPassCreateInfo2-attachment-06244

If the `attachment` member of the `pDepthStencilAttachment`
member of an element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the `layout` member of that same
structure is either [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), and the `pNext` chain
of that structure does not include a
[VkAttachmentReferenceStencilLayout](#VkAttachmentReferenceStencilLayout) structure, then the element of
`pAttachments` with an index equal to `attachment` **must** not
have a `format` that includes both depth and stencil components

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-06245) VUID-VkRenderPassCreateInfo2-attachment-06245

If the `attachment` member of the `pDepthStencilAttachment`
member of an element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and the `layout` member of that same
structure is either [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), then the element of
`pAttachments` with an index equal to `attachment` **must** have a
`format` that includes only a stencil component

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-06246) VUID-VkRenderPassCreateInfo2-attachment-06246

If the `attachment` member of the `pDepthStencilAttachment`
member of an element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and the `layout` member of that same
structure is either [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), then the element of
`pAttachments` with an index equal to `attachment` **must** not
have a `format` that includes only a stencil component

* 
[](#VUID-VkRenderPassCreateInfo2-pResolveAttachments-09331) VUID-VkRenderPassCreateInfo2-pResolveAttachments-09331

If any element of `pResolveAttachments` of any element of
`pSubpasses` references an attachment description with a format of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat),
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT)::`fragmentDensityMapAttachment->attachment`
**must** be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkRenderPassCreateInfo2-pResolveAttachments-10650) VUID-VkRenderPassCreateInfo2-pResolveAttachments-10650

If any element of `pResolveAttachments` of any element of
`pSubpasses` references an attachment description with a format of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-10651) VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-10651

If
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT)::`fragmentDensityMapAttachment`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo2-None-10916) VUID-VkRenderPassCreateInfo2-None-10916

If any subpass preserves an attachment, there **must** be a subpass
dependency from a prior subpass which uses or preserves that attachment

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreateInfo2-sType-sType) VUID-VkRenderPassCreateInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassCreateInfo2-pNext-pNext) VUID-VkRenderPassCreateInfo2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkRenderPassCreationControlEXT](#VkRenderPassCreationControlEXT), [VkRenderPassCreationFeedbackCreateInfoEXT](#VkRenderPassCreationFeedbackCreateInfoEXT), [VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT), [VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM), or [VkTileMemorySizeInfoQCOM](#VkTileMemorySizeInfoQCOM)

* 
[](#VUID-VkRenderPassCreateInfo2-sType-unique) VUID-VkRenderPassCreateInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderPassCreateInfo2-flags-parameter) VUID-VkRenderPassCreateInfo2-flags-parameter

 `flags` **must** be a valid combination of [VkRenderPassCreateFlagBits](#VkRenderPassCreateFlagBits) values

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-parameter) VUID-VkRenderPassCreateInfo2-pAttachments-parameter

 If `attachmentCount` is not `0`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkAttachmentDescription2](#VkAttachmentDescription2) structures

* 
[](#VUID-VkRenderPassCreateInfo2-pSubpasses-parameter) VUID-VkRenderPassCreateInfo2-pSubpasses-parameter

 `pSubpasses` **must** be a valid pointer to an array of `subpassCount` valid [VkSubpassDescription2](#VkSubpassDescription2) structures

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-parameter) VUID-VkRenderPassCreateInfo2-pDependencies-parameter

 If `dependencyCount` is not `0`, `pDependencies` **must** be a valid pointer to an array of `dependencyCount` valid [VkSubpassDependency2](#VkSubpassDependency2) structures

* 
[](#VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-parameter) VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-parameter

 If `correlatedViewMaskCount` is not `0`, `pCorrelatedViewMasks` **must** be a valid pointer to an array of `correlatedViewMaskCount` `uint32_t` values

* 
[](#VUID-VkRenderPassCreateInfo2-subpassCount-arraylength) VUID-VkRenderPassCreateInfo2-subpassCount-arraylength

 `subpassCount` **must** be greater than `0`

The `VkAttachmentDescription2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentDescription2 {
    VkStructureType                 sType;
    const void*                     pNext;
    VkAttachmentDescriptionFlags    flags;
    VkFormat                        format;
    VkSampleCountFlagBits           samples;
    VkAttachmentLoadOp              loadOp;
    VkAttachmentStoreOp             storeOp;
    VkAttachmentLoadOp              stencilLoadOp;
    VkAttachmentStoreOp             stencilStoreOp;
    VkImageLayout                   initialLayout;
    VkImageLayout                   finalLayout;
} VkAttachmentDescription2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkAttachmentDescription2
typedef VkAttachmentDescription2 VkAttachmentDescription2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkAttachmentDescriptionFlagBits](#VkAttachmentDescriptionFlagBits)
specifying additional properties of the attachment.

* 
`format` is a [VkFormat](formats.html#VkFormat) value specifying the format of the
image that will be used for the attachment.

* 
`samples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value specifying the
number of samples of the image.

* 
`loadOp` is a [VkAttachmentLoadOp](#VkAttachmentLoadOp) value specifying how the
contents of color and depth components of the attachment are treated at
the beginning of the subpass where it is first used.

* 
`storeOp` is a [VkAttachmentStoreOp](#VkAttachmentStoreOp) value specifying how the
contents of color and depth components of the attachment are treated at
the end of the subpass where it is last used.

* 
`stencilLoadOp` is a [VkAttachmentLoadOp](#VkAttachmentLoadOp) value specifying how
the contents of stencil components of the attachment are treated at the
beginning of the subpass where it is first used.

* 
`stencilStoreOp` is a [VkAttachmentStoreOp](#VkAttachmentStoreOp) value specifying how
the contents of stencil components of the attachment are treated at the
end of the last subpass where it is used.

* 
`initialLayout` is the layout the attachment image subresource will
be in when a render pass instance begins.

* 
`finalLayout` is the layout the attachment image subresource will be
transitioned to when a render pass instance ends.

Parameters defined by this structure with the same name as those in
[VkAttachmentDescription](#VkAttachmentDescription) have the identical effect to those parameters.

If the [`separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is enabled, and `format` is
a depth/stencil format, `initialLayout` and `finalLayout` **can** be
set to a layout that only specifies the layout of the depth aspect.

If the `pNext` chain includes a
[VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure, then the
`stencilInitialLayout` and `stencilFinalLayout` members specify the
initial and final layouts of the stencil aspect of a depth/stencil format,
and `initialLayout` and `finalLayout` only apply to the depth
aspect.
For depth-only formats, the [VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout)
structure is ignored.
For stencil-only formats, the initial and final layouts of the stencil
aspect are taken from the [VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout)
structure if present, or `initialLayout` and `finalLayout` if not
present.

If `format` is a depth/stencil format, and either `initialLayout` or
`finalLayout` does not specify a layout for the stencil aspect, then the
application **must** specify the initial and final layouts of the stencil
aspect by including a [VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure
in the `pNext` chain.

`loadOp` and `storeOp` are ignored for fragment shading rate
attachments.
No access to the shading rate attachment is performed in `loadOp` and
`storeOp`.
Instead, access to
[VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](synchronization.html#VkAccessFlagBits) is performed
as fragments are rasterized.

Valid Usage

* 
[](#VUID-VkAttachmentDescription2-format-06699) VUID-VkAttachmentDescription2-format-06699

If `format` includes a color or depth component and `loadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp), then `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-finalLayout-00843) VUID-VkAttachmentDescription2-finalLayout-00843

    `finalLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03280) VUID-VkAttachmentDescription2-format-03280

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03281) VUID-VkAttachmentDescription2-format-03281

If `format` is a depth/stencil format, `initialLayout` **must** not
be [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03282) VUID-VkAttachmentDescription2-format-03282

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03283) VUID-VkAttachmentDescription2-format-03283

If `format` is a depth/stencil format, `finalLayout` **must** not
be [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-06487) VUID-VkAttachmentDescription2-format-06487

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-06488) VUID-VkAttachmentDescription2-format-06488

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03284) VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03284

If the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),

* 
[](#VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03285) VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03285

If the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),

* 
[](#VUID-VkAttachmentDescription2-format-03286) VUID-VkAttachmentDescription2-format-03286

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03287) VUID-VkAttachmentDescription2-format-03287

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-06906) VUID-VkAttachmentDescription2-format-06906

If `format` is a depth/stencil format which includes both depth and
stencil components, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-06907) VUID-VkAttachmentDescription2-format-06907

If `format` is a depth/stencil format which includes both depth and
stencil components, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03290) VUID-VkAttachmentDescription2-format-03290

If `format` is a depth/stencil format which includes only the depth
component, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-03291) VUID-VkAttachmentDescription2-format-03291

If `format` is a depth/stencil format which includes only the depth
component, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-synchronization2-06908) VUID-VkAttachmentDescription2-synchronization2-06908

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-synchronization2-06909) VUID-VkAttachmentDescription2-synchronization2-06909

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07309) VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07309

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07310) VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07310

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-samples-08745) VUID-VkAttachmentDescription2-samples-08745

`samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is
set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](resources.html#resources-image-creation-limits)) for the given
`format`

* 
[](#VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09544) VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09544

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09545) VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09545

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-flags-11773) VUID-VkAttachmentDescription2-flags-11773

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
`flags` **must** not include
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)

* 
[](#VUID-VkAttachmentDescription2-flags-11774) VUID-VkAttachmentDescription2-flags-11774

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
[`resolveSrgbFormatSupportsTransferFunctionControl`](limits.html#limits-resolveSrgbFormatSupportsTransferFunctionControl)
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkAttachmentDescription2-flags-11775) VUID-VkAttachmentDescription2-flags-11775

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
[`maintenance10`](features.html#features-maintenance10) **must** be enabled

* 
[](#VUID-VkAttachmentDescription2-flags-11776) VUID-VkAttachmentDescription2-flags-11776

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
`format` **must** use sRGB encoding

* 
[](#VUID-VkAttachmentDescription2-flags-11777) VUID-VkAttachmentDescription2-flags-11777

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkAttachmentDescription2-pNext-06704) VUID-VkAttachmentDescription2-pNext-06704

If
the `pNext` chain does not include a
[VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure,
`format` includes a stencil component, and `stencilLoadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp), then `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-pNext-06705) VUID-VkAttachmentDescription2-pNext-06705

If the `pNext` chain includes a
[VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure, `format`
includes a stencil component, and `stencilLoadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp), then
[VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout)::`stencilInitialLayout`
**must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-06249) VUID-VkAttachmentDescription2-format-06249

If `format` is a depth/stencil format which includes both depth and
stencil components, and `initialLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), the `pNext` chain
**must** include a [VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure

* 
[](#VUID-VkAttachmentDescription2-format-06250) VUID-VkAttachmentDescription2-format-06250

If `format` is a depth/stencil format which includes both depth and
stencil components, and `finalLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), the `pNext` chain
**must** include a [VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure

* 
[](#VUID-VkAttachmentDescription2-format-06247) VUID-VkAttachmentDescription2-format-06247

If the `pNext` chain does not include a
[VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure and `format`
only includes a stencil component, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-06248) VUID-VkAttachmentDescription2-format-06248

If the `pNext` chain does not include a
[VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout) structure and `format`
only includes a stencil component, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescription2-format-09332) VUID-VkAttachmentDescription2-format-09332

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled,
`format` **must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkAttachmentDescription2-format-09334) VUID-VkAttachmentDescription2-format-09334

If `format` is [VK_FORMAT_UNDEFINED](formats.html#VkFormat), there **must** be a
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID) structure in the `pNext` chain with a
`externalFormat` that is not equal to `0`

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentDescription2-sType-sType) VUID-VkAttachmentDescription2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAttachmentDescription2-pNext-pNext) VUID-VkAttachmentDescription2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentDescriptionStencilLayout](#VkAttachmentDescriptionStencilLayout), [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID), or [VkExternalFormatOHOS](resources.html#VkExternalFormatOHOS)

* 
[](#VUID-VkAttachmentDescription2-sType-unique) VUID-VkAttachmentDescription2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAttachmentDescription2-flags-parameter) VUID-VkAttachmentDescription2-flags-parameter

 `flags` **must** be a valid combination of [VkAttachmentDescriptionFlagBits](#VkAttachmentDescriptionFlagBits) values

* 
[](#VUID-VkAttachmentDescription2-format-parameter) VUID-VkAttachmentDescription2-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkAttachmentDescription2-samples-parameter) VUID-VkAttachmentDescription2-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-VkAttachmentDescription2-loadOp-parameter) VUID-VkAttachmentDescription2-loadOp-parameter

 `loadOp` **must** be a valid [VkAttachmentLoadOp](#VkAttachmentLoadOp) value

* 
[](#VUID-VkAttachmentDescription2-storeOp-parameter) VUID-VkAttachmentDescription2-storeOp-parameter

 `storeOp` **must** be a valid [VkAttachmentStoreOp](#VkAttachmentStoreOp) value

* 
[](#VUID-VkAttachmentDescription2-stencilLoadOp-parameter) VUID-VkAttachmentDescription2-stencilLoadOp-parameter

 `stencilLoadOp` **must** be a valid [VkAttachmentLoadOp](#VkAttachmentLoadOp) value

* 
[](#VUID-VkAttachmentDescription2-stencilStoreOp-parameter) VUID-VkAttachmentDescription2-stencilStoreOp-parameter

 `stencilStoreOp` **must** be a valid [VkAttachmentStoreOp](#VkAttachmentStoreOp) value

* 
[](#VUID-VkAttachmentDescription2-initialLayout-parameter) VUID-VkAttachmentDescription2-initialLayout-parameter

 `initialLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkAttachmentDescription2-finalLayout-parameter) VUID-VkAttachmentDescription2-finalLayout-parameter

 `finalLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

The `VkAttachmentDescriptionStencilLayout` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentDescriptionStencilLayout {
    VkStructureType    sType;
    void*              pNext;
    VkImageLayout      stencilInitialLayout;
    VkImageLayout      stencilFinalLayout;
} VkAttachmentDescriptionStencilLayout;

// Provided by VK_KHR_separate_depth_stencil_layouts
// Equivalent to VkAttachmentDescriptionStencilLayout
typedef VkAttachmentDescriptionStencilLayout VkAttachmentDescriptionStencilLayoutKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilInitialLayout` is the layout the stencil aspect of the
attachment image subresource will be in when a render pass instance
begins.

* 
`stencilFinalLayout` is the layout the stencil aspect of the
attachment image subresource will be transitioned to when a render pass
instance ends.

Valid Usage

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-03308) VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-03308

`stencilInitialLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03309) VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03309

`stencilFinalLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03310) VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-03310

    `stencilFinalLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-sType-sType) VUID-VkAttachmentDescriptionStencilLayout-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-parameter) VUID-VkAttachmentDescriptionStencilLayout-stencilInitialLayout-parameter

 `stencilInitialLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-parameter) VUID-VkAttachmentDescriptionStencilLayout-stencilFinalLayout-parameter

 `stencilFinalLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentDescription2](#VkAttachmentDescription2)

The `VkSubpassDescription2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassDescription2 {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSubpassDescriptionFlags        flags;
    VkPipelineBindPoint              pipelineBindPoint;
    uint32_t                         viewMask;
    uint32_t                         inputAttachmentCount;
    const VkAttachmentReference2*    pInputAttachments;
    uint32_t                         colorAttachmentCount;
    const VkAttachmentReference2*    pColorAttachments;
    const VkAttachmentReference2*    pResolveAttachments;
    const VkAttachmentReference2*    pDepthStencilAttachment;
    uint32_t                         preserveAttachmentCount;
    const uint32_t*                  pPreserveAttachments;
} VkSubpassDescription2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassDescription2
typedef VkSubpassDescription2 VkSubpassDescription2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSubpassDescriptionFlagBits](#VkSubpassDescriptionFlagBits)
specifying usage of the subpass.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value specifying
the pipeline type supported for this subpass.

* 
`viewMask` is a bitfield of view indices describing which views
rendering is broadcast to in this subpass, when multiview is enabled.

* 
`inputAttachmentCount` is the number of input attachments.

* 
`pInputAttachments` is a pointer to an array of
[VkAttachmentReference2](#VkAttachmentReference2) structures defining the input attachments
for this subpass and their layouts.

* 
`colorAttachmentCount` is the number of color attachments.

* 
`pColorAttachments` is a pointer to an array of
`colorAttachmentCount` [VkAttachmentReference2](#VkAttachmentReference2) structures
defining the color attachments for this subpass and their layouts.

* 
`pResolveAttachments` is `NULL` or a pointer to an array of
`colorAttachmentCount` [VkAttachmentReference2](#VkAttachmentReference2) structures
defining the resolve attachments for this subpass and their layouts.

* 
`pDepthStencilAttachment` is a pointer to a
[VkAttachmentReference2](#VkAttachmentReference2) structure specifying the depth/stencil
attachment for this subpass and its layout.

* 
`preserveAttachmentCount` is the number of preserved attachments.

* 
`pPreserveAttachments` is a pointer to an array of
`preserveAttachmentCount` render pass attachment indices identifying
attachments that are not used by this subpass, but whose contents **must**
be preserved throughout the subpass.

Parameters defined by this structure with the same name as those in
[VkSubpassDescription](#VkSubpassDescription) have the identical effect to those parameters.

`viewMask` has the same effect for the described subpass as
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo)::`pViewMasks` has on each
corresponding subpass.

If a [VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR) structure is included in
the `pNext` chain, `pFragmentShadingRateAttachment` is not `NULL`,
and its `attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the
identified attachment defines a fragment shading rate attachment for that
subpass.

If any element of `pResolveAttachments` is an image specified with an
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID), values in the corresponding color attachment
will be resolved to the resolve attachment in the same manner as specified
for [](#VkResolveModeFlagBits)[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR).

If the [`nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](fundamentals.html#VK_TRUE),
values in the color attachment will be loaded from the resolve attachment at
the start of rendering, and **may** also be reloaded any time after a resolve
occurs or the resolve attachment is written to; if this occurs it **must**
happen-before any writes to the color attachment are performed which
happen-after the resolve that triggers this.
If any color component in the external format is subsampled, values will be
read from the nearest sample in the image when they are loaded.
If the color attachment is also used as an input attachment, the same
behavior applies.

Setting the color attachment to [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) when an external
resolve attachment is used and the
[`nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](fundamentals.html#VK_TRUE)
will not result in color attachment writes to be discarded for that
attachment.

When [`nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_TRUE](fundamentals.html#VK_TRUE), the
color output from the subpass can still be read via an input attachment; but
the application cannot bind an image view for the color attachment as there
is no such image view bound.
Instead to access the data as an input attachment applications **can** use the
resolve attachment in its place - using the resolve attachment image for the
descriptor, and setting the corresponding element of `pInputAttachments`
to the index of the resolve attachment.

Loads or input attachment reads from the resolve attachment are performed as
if using a [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) with the following
parameters:

VkSamplerYcbcrConversionCreateInfo createInfo = {
    .sType = VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO,
    .pNext = NULL,
    .format = VK_FORMAT_UNDEFINED,
    .ycbcrModel = VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY,
    .ycbcrRange = VK_SAMPLER_YCBCR_RANGE_ITU_FULL,
    .components = {
        .r = VK_COMPONENT_SWIZZLE_B
        .g = VK_COMPONENT_SWIZZLE_R
        .b = VK_COMPONENT_SWIZZLE_G
        .a = VK_COMPONENT_SWIZZLE_IDENTITY},
    .xChromaOffset = properties.chromaOffsetX,
    .yChromaOffset = properties.chromaOffsetY,
    .chromaFilter = VK_FILTER_NEAREST,
    .forceExplicitReconstruction = ... };

where `properties` is equal to
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](limits.html#VkPhysicalDeviceExternalFormatResolvePropertiesANDROID) returned by the
device and `forceExplicitReconstruction` is effectively ignored as the
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](samplers.html#VkSamplerYcbcrModelConversionKHR) model is used.
The applied swizzle is the same effective swizzle that would be applied by
the [VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY](samplers.html#VkSamplerYcbcrModelConversionKHR) model, but no
range expansion is applied.

Valid Usage

* 
[](#VUID-VkSubpassDescription2-attachment-06912) VUID-VkSubpassDescription2-attachment-06912

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06913) VUID-VkSubpassDescription2-attachment-06913

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06914) VUID-VkSubpassDescription2-attachment-06914

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06915) VUID-VkSubpassDescription2-attachment-06915

If the `attachment` member of `pDepthStencilAttachment` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06916) VUID-VkSubpassDescription2-attachment-06916

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06917) VUID-VkSubpassDescription2-attachment-06917

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06918) VUID-VkSubpassDescription2-attachment-06918

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06919) VUID-VkSubpassDescription2-attachment-06919

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06920) VUID-VkSubpassDescription2-attachment-06920

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06921) VUID-VkSubpassDescription2-attachment-06921

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06922) VUID-VkSubpassDescription2-attachment-06922

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-attachment-06923) VUID-VkSubpassDescription2-attachment-06923

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-flags-10683) VUID-VkSubpassDescription2-flags-10683

If `flags` includes
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](#VkSubpassDescriptionFlagBits), the render
pass **must** have been created with a
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`tileApronSize` greater
than `(0,0)`

* 
[](#VUID-VkSubpassDescription2-inputAttachmentCount-12293) VUID-VkSubpassDescription2-inputAttachmentCount-12293

`inputAttachmentCount` **must** be less than or equal to
[    `maxPerStageDescriptorInputAttachments`](limits.html#limits-maxPerStageDescriptorInputAttachments)

* 
[](#VUID-VkSubpassDescription2-colorAttachmentCount-00845) VUID-VkSubpassDescription2-colorAttachmentCount-00845

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkSubpassDescription2-loadOp-00846) VUID-VkSubpassDescription2-loadOp-00846

If the first use of an attachment in this render pass is as an input
attachment, and the attachment is not also used as a color or
depth/stencil attachment in the same subpass, then `loadOp` **must**
not be [VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp)

* 
[](#VUID-VkSubpassDescription2-attachment-06251) VUID-VkSubpassDescription2-attachment-06251

If the `attachment` member of `pDepthStencilAttachment` is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and its `pNext` chain includes a
[VkAttachmentReferenceStencilLayout](#VkAttachmentReferenceStencilLayout) structure, the `layout`
member of `pDepthStencilAttachment` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[](#VUID-VkSubpassDescription2-pipelineBindPoint-04953) VUID-VkSubpassDescription2-pipelineBindPoint-04953

`pipelineBindPoint` **must** be [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint)
or [VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](pipelines.html#VkPipelineBindPoint)

* 
[](#VUID-VkSubpassDescription2-pResolveAttachments-03067) VUID-VkSubpassDescription2-pResolveAttachments-03067

If `pResolveAttachments` is not `NULL`, each resolve attachment that
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkSubpassDescription2-externalFormatResolve-09335) VUID-VkSubpassDescription2-externalFormatResolve-09335

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled and `pResolveAttachments` is not `NULL`, for
each resolve attachment that does not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the corresponding color attachment **must** not
have the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09336) VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09336

If the [    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_FALSE](fundamentals.html#VK_FALSE) and `pResolveAttachments` is not `NULL`, for each
resolve attachment that has a format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat), the
corresponding color attachment **must** not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09337) VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09337

If the [    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_TRUE](fundamentals.html#VK_TRUE) and `pResolveAttachments` is not `NULL`, for each
resolve attachment that has a format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat), the
corresponding color attachment **must** have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkSubpassDescription2-externalFormatResolve-09338) VUID-VkSubpassDescription2-externalFormatResolve-09338

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled and `pResolveAttachments` is not `NULL`, for
each resolve attachment that is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the
corresponding color attachment **must** not have a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkSubpassDescription2-externalFormatResolve-09339) VUID-VkSubpassDescription2-externalFormatResolve-09339

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled, each element of `pResolveAttachments` **must**
have the same [VkFormat](formats.html#VkFormat) as its corresponding color attachment

* 
[](#VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06869) VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06869

If the [    `multisampledRenderToSingleSampled`](features.html#features-multisampledRenderToSingleSampled) feature is not enabled, all
attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have the same sample count

* 
[](#VUID-VkSubpassDescription2-pInputAttachments-02897) VUID-VkSubpassDescription2-pInputAttachments-02897

All attachments in `pInputAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)
and any of the following is true:

the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled

* 
the [     `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
does not have a non-zero value of
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat`

**must** have image formats whose [potential format features](formats.html#potential-format-features) contain at least [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkSubpassDescription2-pColorAttachments-02898) VUID-VkSubpassDescription2-pColorAttachments-02898

All attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkSubpassDescription2-pResolveAttachments-09343) VUID-VkSubpassDescription2-pResolveAttachments-09343

All attachments in `pResolveAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and do not have an image format of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) **must** have image formats whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkSubpassDescription2-pDepthStencilAttachment-02900) VUID-VkSubpassDescription2-pDepthStencilAttachment-02900

If `pDepthStencilAttachment` is not `NULL` and the attachment is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) then it **must** have an image format whose
[potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkSubpassDescription2-linearColorAttachment-06499) VUID-VkSubpassDescription2-linearColorAttachment-06499

If the [`linearColorAttachment`](features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling), all attachments in `pInputAttachments`
that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkSubpassDescription2-linearColorAttachment-06500) VUID-VkSubpassDescription2-linearColorAttachment-06500

If the [`linearColorAttachment`](features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling), all attachments in `pColorAttachments`
that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have image formats whose
[potential format features](formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkSubpassDescription2-linearColorAttachment-06501) VUID-VkSubpassDescription2-linearColorAttachment-06501

If the [`linearColorAttachment`](features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling), all attachments in
`pResolveAttachments` that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must**
have image formats whose [potential format    features](formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkSubpassDescription2-None-09456) VUID-VkSubpassDescription2-None-09456

If either of the following is enabled:

* 
The `[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

all attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have a sample count that is smaller than or
equal to the sample count of `pDepthStencilAttachment` if it is not
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription2-pNext-06870) VUID-VkSubpassDescription2-pNext-06870

If the `pNext` chain includes a
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](fundamentals.html#VK_TRUE),
then all attachments in `pColorAttachments` and
`pDepthStencilAttachment` that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)
**must** have a sample count that is either [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) or
equal to
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

[](#VUID-VkSubpassDescription2-pNext-06871) VUID-VkSubpassDescription2-pNext-06871

If the `pNext` chain includes a
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](fundamentals.html#VK_TRUE),
and `pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), and has a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), the `pNext` chain **must** also include a
[VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve) structure with
`pDepthStencilResolveAttachment` that is either `NULL` or has the
value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06872) VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06872

If none of the following are enabled:

* 
The `[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension

* 
The [     `multisampledRenderToSingleSampled`](features.html#features-multisampledRenderToSingleSampled) feature

all attachments in `pDepthStencilAttachment` and `pColorAttachments`
that are not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) **must** have the same sample count

[](#VUID-VkSubpassDescription2-attachment-03073) VUID-VkSubpassDescription2-attachment-03073

Each element of `pPreserveAttachments` **must** not be
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription2-pPreserveAttachments-03074) VUID-VkSubpassDescription2-pPreserveAttachments-03074

Each element of `pPreserveAttachments` **must** not also be an element
of any other member of the subpass description

[](#VUID-VkSubpassDescription2-layout-02528) VUID-VkSubpassDescription2-layout-02528

If any attachment is used by more than one [VkAttachmentReference2](#VkAttachmentReference2)
member, then each use **must** use the same `layout`

[](#VUID-VkSubpassDescription2-flags-03076) VUID-VkSubpassDescription2-flags-03076

If `flags` includes
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](#VkSubpassDescriptionFlagBits), it **must**
also include [VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#VkSubpassDescriptionFlagBits)

[](#VUID-VkSubpassDescription2-attachment-02799) VUID-VkSubpassDescription2-attachment-02799

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then the `aspectMask` member
**must** be a valid combination of [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits)

[](#VUID-VkSubpassDescription2-attachment-02800) VUID-VkSubpassDescription2-attachment-02800

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then the `aspectMask` member
**must** not be `0`

[](#VUID-VkSubpassDescription2-attachment-02801) VUID-VkSubpassDescription2-attachment-02801

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then the `aspectMask` member
**must** not include [VK_IMAGE_ASPECT_METADATA_BIT](resources.html#VkImageAspectFlagBits)

[](#VUID-VkSubpassDescription2-attachment-04563) VUID-VkSubpassDescription2-attachment-04563

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), then the `aspectMask` member
**must** not include `VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for
any index *i*

[](#VUID-VkSubpassDescription2-pDepthStencilAttachment-04440) VUID-VkSubpassDescription2-pDepthStencilAttachment-04440

An attachment **must** not be used in both `pDepthStencilAttachment`
and `pColorAttachments`

[](#VUID-VkSubpassDescription2-multiview-06558) VUID-VkSubpassDescription2-multiview-06558

If the [`multiview`](features.html#features-multiview) feature is not enabled,
`viewMask` **must** be `0`

[](#VUID-VkSubpassDescription2-viewMask-06706) VUID-VkSubpassDescription2-viewMask-06706

The index of the most significant bit in `viewMask` **must** be less
than [`maxMultiviewViewCount`](devsandqueues.html#limits-maxMultiviewViewCount)

[](#VUID-VkSubpassDescription2-externalFormatResolve-09344) VUID-VkSubpassDescription2-externalFormatResolve-09344

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and
`colorAttachmentCount` is not `1`, any element of
`pResolveAttachments` that is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), **must**
not have a format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

[](#VUID-VkSubpassDescription2-externalFormatResolve-09345) VUID-VkSubpassDescription2-externalFormatResolve-09345

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, any element
of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and has a
format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat), and the corresponding element of
`pColorAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the color
attachment **must** have a `samples` value of `1`

[](#VUID-VkSubpassDescription2-externalFormatResolve-09346) VUID-VkSubpassDescription2-externalFormatResolve-09346

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and any
element of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)
and has a format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat), `viewMask` **must** be
`0`

[](#VUID-VkSubpassDescription2-externalFormatResolve-09347) VUID-VkSubpassDescription2-externalFormatResolve-09347

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and any
element of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)
and has a format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat),
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR)::`pFragmentShadingRateAttachment`
**must** either be `NULL` or a [VkAttachmentReference2](#VkAttachmentReference2) structure with
an `attachment` value of [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription2-externalFormatResolve-09348) VUID-VkSubpassDescription2-externalFormatResolve-09348

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and any
element of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)
and has a format of [VK_FORMAT_UNDEFINED](formats.html#VkFormat), elements of
`pInputAttachments` referencing either a color attachment or resolve
attachment used in this subpass **must** not include
`VK_IMAGE_ASPECT_PLANE*_i_*BIT` for any index *i* in its
`aspectMask`

[](#VUID-VkSubpassDescription2-flags-04907) VUID-VkSubpassDescription2-flags-04907

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), and if
`pResolveAttachments` is not `NULL`, then each resolve attachment
**must** be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription2-flags-04908) VUID-VkSubpassDescription2-flags-04908

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), and if
`pDepthStencilResolveAttachment` is not `NULL`, then the
depth/stencil resolve attachment **must** be [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

[](#VUID-VkSubpassDescription2-flags-04909) VUID-VkSubpassDescription2-flags-04909

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#VkSubpassDescriptionFlagBits), then the subpass
**must** be the last subpass in a subpass dependency chain

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDescription2-sType-sType) VUID-VkSubpassDescription2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubpassDescription2-pNext-pNext) VUID-VkSubpassDescription2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR), [VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT), [VkRenderPassCreationControlEXT](#VkRenderPassCreationControlEXT), [VkRenderPassSubpassFeedbackCreateInfoEXT](#VkRenderPassSubpassFeedbackCreateInfoEXT), or [VkSubpassDescriptionDepthStencilResolve](#VkSubpassDescriptionDepthStencilResolve)

* 
[](#VUID-VkSubpassDescription2-sType-unique) VUID-VkSubpassDescription2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubpassDescription2-flags-parameter) VUID-VkSubpassDescription2-flags-parameter

 `flags` **must** be a valid combination of [VkSubpassDescriptionFlagBits](#VkSubpassDescriptionFlagBits) values

* 
[](#VUID-VkSubpassDescription2-pipelineBindPoint-parameter) VUID-VkSubpassDescription2-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkSubpassDescription2-pInputAttachments-parameter) VUID-VkSubpassDescription2-pInputAttachments-parameter

 If `inputAttachmentCount` is not `0`, `pInputAttachments` **must** be a valid pointer to an array of `inputAttachmentCount` valid [VkAttachmentReference2](#VkAttachmentReference2) structures

* 
[](#VUID-VkSubpassDescription2-pColorAttachments-parameter) VUID-VkSubpassDescription2-pColorAttachments-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkAttachmentReference2](#VkAttachmentReference2) structures

* 
[](#VUID-VkSubpassDescription2-pResolveAttachments-parameter) VUID-VkSubpassDescription2-pResolveAttachments-parameter

 If `colorAttachmentCount` is not `0`, and `pResolveAttachments` is not `NULL`, `pResolveAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkAttachmentReference2](#VkAttachmentReference2) structures

* 
[](#VUID-VkSubpassDescription2-pDepthStencilAttachment-parameter) VUID-VkSubpassDescription2-pDepthStencilAttachment-parameter

 If `pDepthStencilAttachment` is not `NULL`, `pDepthStencilAttachment` **must** be a valid pointer to a valid [VkAttachmentReference2](#VkAttachmentReference2) structure

* 
[](#VUID-VkSubpassDescription2-pPreserveAttachments-parameter) VUID-VkSubpassDescription2-pPreserveAttachments-parameter

 If `preserveAttachmentCount` is not `0`, `pPreserveAttachments` **must** be a valid pointer to an array of `preserveAttachmentCount` `uint32_t` values

The `VkSubpassDescriptionDepthStencilResolve` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassDescriptionDepthStencilResolve {
    VkStructureType                  sType;
    const void*                      pNext;
    VkResolveModeFlagBits            depthResolveMode;
    VkResolveModeFlagBits            stencilResolveMode;
    const VkAttachmentReference2*    pDepthStencilResolveAttachment;
} VkSubpassDescriptionDepthStencilResolve;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkSubpassDescriptionDepthStencilResolve
typedef VkSubpassDescriptionDepthStencilResolve VkSubpassDescriptionDepthStencilResolveKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthResolveMode` is a [VkResolveModeFlagBits](#VkResolveModeFlagBits) value describing
the depth resolve mode.

* 
`stencilResolveMode` is a [VkResolveModeFlagBits](#VkResolveModeFlagBits) value
describing the stencil resolve mode.

* 
`pDepthStencilResolveAttachment` is `NULL` or a pointer to a
[VkAttachmentReference2](#VkAttachmentReference2) structure defining the depth/stencil
resolve attachment for this subpass and its layout.

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) includes a
`VkSubpassDescriptionDepthStencilResolve` structure, then that structure
describes [multisample resolve operations](#renderpass-resolve-operations)
for the depth/stencil attachment in a subpass.
If this structure is not included in the `pNext` chain of
[VkSubpassDescription2](#VkSubpassDescription2), or if it is and either
`pDepthStencilResolveAttachment` is `NULL` or its attachment index is
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), it indicates that no depth/stencil resolve
attachment will be used in the subpass.

Valid Usage

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03177) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03177

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `pDepthStencilAttachment`
**must** not be `NULL` or have the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03179) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03179

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `pDepthStencilAttachment`
**must** not have a sample count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03180) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03180

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`pDepthStencilResolveAttachment` **must** have a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-02651) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-02651

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) then it **must** have an image format
whose [potential format features](formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03181) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03181

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and [VkFormat](formats.html#VkFormat) of
`pDepthStencilResolveAttachment` has a depth component, then the
[VkFormat](formats.html#VkFormat) of `pDepthStencilAttachment` **must** have a depth
component with the same number of bits and [    numeric format](formats.html#formats-numericformat)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03182) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03182

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), and [VkFormat](formats.html#VkFormat) of
`pDepthStencilResolveAttachment` has a stencil component, then the
[VkFormat](formats.html#VkFormat) of `pDepthStencilAttachment` **must** have a stencil
component with the same number of bits and [    numeric format](formats.html#formats-numericformat)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03178) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03178

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `depthResolveMode` and
`stencilResolveMode` **must** not both be [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-depthResolveMode-03183) VUID-VkSubpassDescriptionDepthStencilResolve-depthResolveMode-03183

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and the [VkFormat](formats.html#VkFormat) of
`pDepthStencilResolveAttachment` has a depth component, then the
value of `depthResolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`supportedDepthResolveModes`
or [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-stencilResolveMode-03184) VUID-VkSubpassDescriptionDepthStencilResolve-stencilResolveMode-03184

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and the [VkFormat](formats.html#VkFormat) of
`pDepthStencilResolveAttachment` has a stencil component, then the
value of `stencilResolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`supportedStencilResolveModes`
or [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03185) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03185

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the [VkFormat](formats.html#VkFormat) of
`pDepthStencilResolveAttachment` has both depth and stencil
components,
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolve`
is [VK_FALSE](fundamentals.html#VK_FALSE), and
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolveNone`
is [VK_FALSE](fundamentals.html#VK_FALSE), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03186) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-03186

If `pDepthStencilResolveAttachment` is not `NULL` and does not have
the value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the [VkFormat](formats.html#VkFormat) of
`pDepthStencilResolveAttachment` has both depth and stencil
components,
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolve`
is [VK_FALSE](fundamentals.html#VK_FALSE) and
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolveNone`
is [VK_TRUE](fundamentals.html#VK_TRUE), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical or one of them **must** be
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06873) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06873

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure, the
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](fundamentals.html#VK_TRUE),
and `pDepthStencilAttachment` is not `NULL` and does not have the
value [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `depthResolveMode` and
`stencilResolveMode` **must** not both be [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06874) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06874

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](fundamentals.html#VK_TRUE),
and `pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), and has a [VkFormat](formats.html#VkFormat) that has a depth
component, then the value of `depthResolveMode` **must** be one of the
bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`supportedDepthResolveModes`
or [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06875) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06875

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](fundamentals.html#VK_TRUE),
and `pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), and has a [VkFormat](formats.html#VkFormat) with a stencil
component, then the value of `stencilResolveMode` **must** be one of
the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`supportedStencilResolveModes`
or [VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06876) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06876

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](fundamentals.html#VK_TRUE),
`pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), and has a [VkFormat](formats.html#VkFormat) with both depth and
stencil components, and both
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolve`
and
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolveNone`
are [VK_FALSE](fundamentals.html#VK_FALSE), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06877) VUID-VkSubpassDescriptionDepthStencilResolve-pNext-06877

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) includes a
`VkMultisampledRenderToSingleSampledInfoEXT` structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](fundamentals.html#VK_TRUE),
`pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), and has a [VkFormat](formats.html#VkFormat) with both depth and
stencil components,
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolve`
is [VK_FALSE](fundamentals.html#VK_FALSE), and
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties)::`independentResolveNone`
is [VK_TRUE](fundamentals.html#VK_TRUE), then the values of `depthResolveMode` and
`stencilResolveMode` **must** be identical or one of them **must** be
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-sType-sType) VUID-VkSubpassDescriptionDepthStencilResolve-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-parameter) VUID-VkSubpassDescriptionDepthStencilResolve-pDepthStencilResolveAttachment-parameter

 If `pDepthStencilResolveAttachment` is not `NULL`, `pDepthStencilResolveAttachment` **must** be a valid pointer to a valid [VkAttachmentReference2](#VkAttachmentReference2) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDescription2](#VkSubpassDescription2)

The `VkFragmentShadingRateAttachmentInfoKHR` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkFragmentShadingRateAttachmentInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    const VkAttachmentReference2*    pFragmentShadingRateAttachment;
    VkExtent2D                       shadingRateAttachmentTexelSize;
} VkFragmentShadingRateAttachmentInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pFragmentShadingRateAttachment` is `NULL` or a pointer to a
[VkAttachmentReference2](#VkAttachmentReference2) structure defining the fragment shading
rate attachment for this subpass.

* 
`shadingRateAttachmentTexelSize` specifies the size of the portion
of the framebuffer corresponding to each texel in
`pFragmentShadingRateAttachment`.

If no shading rate attachment is specified, or if this structure is not
specified, the implementation behaves as if a valid shading rate attachment
was specified with all texels specifying a single pixel per fragment.

Valid Usage

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04524) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04524

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), its
`layout` member **must** be equal to [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04525) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04525

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`shadingRateAttachmentTexelSize.width` **must** be a power of two value

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04526) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04526

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.width`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04527) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04527

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`shadingRateAttachmentTexelSize.width` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.width`](limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04528) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04528

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`shadingRateAttachmentTexelSize.height` **must** be a power of two
value

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04529) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04529

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.height`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04530) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04530

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED),
`shadingRateAttachmentTexelSize.height` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.height`](limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04531) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04531

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the quotient
of `shadingRateAttachmentTexelSize.width` and
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04532) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04532

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), the quotient
of `shadingRateAttachmentTexelSize.height` and
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

Valid Usage (Implicit)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-sType-sType) VUID-VkFragmentShadingRateAttachmentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-parameter) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-parameter

 If `pFragmentShadingRateAttachment` is not `NULL`, `pFragmentShadingRateAttachment` **must** be a valid pointer to a valid [VkAttachmentReference2](#VkAttachmentReference2) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDescription2](#VkSubpassDescription2)

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2)
or [VkRenderingInfo](#VkRenderingInfo)
includes a `VkMultisampledRenderToSingleSampledInfoEXT` structure, then
that structure describes how multisampled rendering is performed on single
sampled attachments in that subpass.

The `VkMultisampledRenderToSingleSampledInfoEXT` structure is defined
as:

// Provided by VK_EXT_multisampled_render_to_single_sampled
typedef struct VkMultisampledRenderToSingleSampledInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkBool32                 multisampledRenderToSingleSampledEnable;
    VkSampleCountFlagBits    rasterizationSamples;
} VkMultisampledRenderToSingleSampledInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`multisampledRenderToSingleSampledEnable` controls whether
multisampled rendering to single-sampled attachments is performed as
described [below](#multisampled-render-to-single-sampled).

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) specifying
the number of samples used in rasterization.

Valid Usage

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-06878) VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-06878

The value of `rasterizationSamples` **must** not be
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-pNext-06880) VUID-VkMultisampledRenderToSingleSampledInfoEXT-pNext-06880

If added to the `pNext` chain of [VkRenderingInfo](#VkRenderingInfo), each
`imageView` member of any element of
[VkRenderingInfo](#VkRenderingInfo)::`pColorAttachments`,
[VkRenderingInfo](#VkRenderingInfo)::`pDepthAttachment`, or
[VkRenderingInfo](#VkRenderingInfo)::`pStencilAttachment` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** have a format that supports the sample count
specified in `rasterizationSamples`

Valid Usage (Implicit)

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-sType-sType) VUID-VkMultisampledRenderToSingleSampledInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-parameter) VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-parameter

 `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingInfo](#VkRenderingInfo)

* 
[VkSubpassDescription2](#VkSubpassDescription2)

If the `pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2)
or [VkRenderingInfo](#VkRenderingInfo)
includes a [VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure whose
`multisampledRenderToSingleSampledEnable` field is [VK_TRUE](fundamentals.html#VK_TRUE), the
graphics pipelines **must** have
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)::`rasterizationSamples` equal to
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`,
and the subpass attachments **can** have a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits).
For attachments with a sample count of [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits),
multisampled rendering is performed to an intermediate multisampled image
with
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`
samples, implicitly allocated by the implementation for the duration of the
subpass.
For such attachments:

* 
If `loadOp` equals to [VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp), samples of
the implicit image are initialized by replicating the value from the
corresponding pixel in the attachment.

* 
If `storeOp` or `stencilStoreOp` is equal to
[VK_ATTACHMENT_STORE_OP_STORE](#VkAttachmentStoreOp), the implicit image is implicitly
resolved prior to storage in the attachment.

Memory constraints due to high primitive counts **may** result in an implicit
split of the subpass.
This is the equivalent of partial rasterization of geometry in a render pass
that ends in `storeOp` and `stencilStoreOp` equal to
[VK_ATTACHMENT_STORE_OP_STORE](#VkAttachmentStoreOp), followed by another render pass with
`loadOp` and `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp) with appropriate barriers in between.
When [VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) is used, the
implementation is allowed to resolve attachments with a sample count of
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) and lose multisampled data on such splits.
The implementation **may** similarly split the render pass at subpass
boundaries even if they use the same value for
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`.

The `VkAttachmentReference2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentReference2 {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              attachment;
    VkImageLayout         layout;
    VkImageAspectFlags    aspectMask;
} VkAttachmentReference2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkAttachmentReference2
typedef VkAttachmentReference2 VkAttachmentReference2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachment` is either an integer value identifying an attachment at
the corresponding index in
[VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)::`pAttachments`, or
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) to signify that this attachment is not used.

* 
`layout` is a [VkImageLayout](resources.html#VkImageLayout) value specifying the layout the
attachment uses during the subpass.

* 
`aspectMask` is a mask of which aspect(s) **can** be accessed within
the specified subpass as an input attachment.

Parameters defined by this structure with the same name as those in
[VkAttachmentReference](#VkAttachmentReference) have the identical effect to those parameters.

`aspectMask` is ignored when this structure is used to describe anything
other than an input attachment reference.

If the [`separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is enabled, and `attachment`
has a depth/stencil format, `layout` **can** be set to a layout that only
specifies the layout of the depth aspect.

If `layout` only specifies the layout of the depth aspect of the
attachment, the layout of the stencil aspect is specified by the
`stencilLayout` member of a [VkAttachmentReferenceStencilLayout](#VkAttachmentReferenceStencilLayout)
structure included in the `pNext` chain.
Otherwise, `layout` describes the layout for all relevant image aspects.

Valid Usage

* 
[](#VUID-VkAttachmentReference2-layout-03077) VUID-VkAttachmentReference2-layout-03077

    If `attachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `layout`
    **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout), or
    [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentReference2-separateDepthStencilLayouts-03313) VUID-VkAttachmentReference2-separateDepthStencilLayouts-03313

If the [    `separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts) feature is not enabled, and
`attachment` is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED), `layout` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),

* 
[](#VUID-VkAttachmentReference2-synchronization2-06910) VUID-VkAttachmentReference2-synchronization2-06910

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentReference2-attachmentFeedbackLoopLayout-07311) VUID-VkAttachmentReference2-attachmentFeedbackLoopLayout-07311

If the [    `attachmentFeedbackLoopLayout`](features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`layout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[](#VUID-VkAttachmentReference2-dynamicRenderingLocalRead-09546) VUID-VkAttachmentReference2-dynamicRenderingLocalRead-09546

If the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled, `layout`
**must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentReference2-sType-sType) VUID-VkAttachmentReference2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAttachmentReference2-pNext-pNext) VUID-VkAttachmentReference2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkAttachmentReferenceStencilLayout](#VkAttachmentReferenceStencilLayout)

* 
[](#VUID-VkAttachmentReference2-sType-unique) VUID-VkAttachmentReference2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAttachmentReference2-layout-parameter) VUID-VkAttachmentReference2-layout-parameter

 `layout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

The `VkAttachmentReferenceStencilLayout` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentReferenceStencilLayout {
    VkStructureType    sType;
    void*              pNext;
    VkImageLayout      stencilLayout;
} VkAttachmentReferenceStencilLayout;

// Provided by VK_KHR_separate_depth_stencil_layouts
// Equivalent to VkAttachmentReferenceStencilLayout
typedef VkAttachmentReferenceStencilLayout VkAttachmentReferenceStencilLayoutKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilLayout` is a [VkImageLayout](resources.html#VkImageLayout) value specifying the layout
the stencil aspect of the attachment uses during the subpass.

Valid Usage

* 
[](#VUID-VkAttachmentReferenceStencilLayout-stencilLayout-03318) VUID-VkAttachmentReferenceStencilLayout-stencilLayout-03318

`stencilLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_PREINITIALIZED](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentReferenceStencilLayout-sType-sType) VUID-VkAttachmentReferenceStencilLayout-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAttachmentReferenceStencilLayout-stencilLayout-parameter) VUID-VkAttachmentReferenceStencilLayout-stencilLayout-parameter

 `stencilLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentReference2](#VkAttachmentReference2)

The `VkSubpassDependency2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassDependency2 {
    VkStructureType         sType;
    const void*             pNext;
    uint32_t                srcSubpass;
    uint32_t                dstSubpass;
    VkPipelineStageFlags    srcStageMask;
    VkPipelineStageFlags    dstStageMask;
    VkAccessFlags           srcAccessMask;
    VkAccessFlags           dstAccessMask;
    VkDependencyFlags       dependencyFlags;
    int32_t                 viewOffset;
} VkSubpassDependency2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassDependency2
typedef VkSubpassDependency2 VkSubpassDependency2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSubpass` is the subpass index of the first subpass in the
dependency, or [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL).

* 
`dstSubpass` is the subpass index of the second subpass in the
dependency, or [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL).

* 
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits)
specifying the [source stage    mask](synchronization.html#synchronization-pipeline-stages-masks).
If set to [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits), it is equivalent to
setting it to [VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](synchronization.html#VkPipelineStageFlagBits).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits)
specifying the [destination    stage mask](synchronization.html#synchronization-pipeline-stages-masks) If set to [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits), it is
equivalent to setting it to [VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](synchronization.html#VkPipelineStageFlagBits).

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) specifying a
[source access mask](synchronization.html#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) specifying a
[destination access mask](synchronization.html#synchronization-access-masks).

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](synchronization.html#VkDependencyFlagBits).

* 
`viewOffset` controls which views in the source subpass the views in
the destination subpass depend on.

Parameters defined by this structure with the same name as those in
[VkSubpassDependency](#VkSubpassDependency) have the identical effect to those parameters.

`viewOffset` has the same effect for the described subpass dependency as
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo)::`pViewOffsets` has on each
corresponding subpass dependency.

If a [VkMemoryBarrier2](synchronization.html#VkMemoryBarrier2) is included in the `pNext` chain,
`srcStageMask`, `dstStageMask`, `srcAccessMask`, and
`dstAccessMask` parameters are ignored.
The synchronization and access scopes instead are defined by the parameters
of [VkMemoryBarrier2](synchronization.html#VkMemoryBarrier2).
If either `srcStageMask` or `dstStageMask` are set to
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](synchronization.html#VkPipelineStageFlagBits), it is equivalent to setting
[VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](synchronization.html#VkPipelineStageFlagBits).

Valid Usage

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04090) VUID-VkSubpassDependency2-srcStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04091) VUID-VkSubpassDependency2-srcStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04092) VUID-VkSubpassDependency2-srcStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04093) VUID-VkSubpassDependency2-srcStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04094) VUID-VkSubpassDependency2-srcStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04095) VUID-VkSubpassDependency2-srcStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04096) VUID-VkSubpassDependency2-srcStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-07318) VUID-VkSubpassDependency2-srcStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-03937) VUID-VkSubpassDependency2-srcStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-VkSubpassDependency2-srcStageMask-07949) VUID-VkSubpassDependency2-srcStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-10754) VUID-VkSubpassDependency2-srcStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04090) VUID-VkSubpassDependency2-dstStageMask-04090

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04091) VUID-VkSubpassDependency2-dstStageMask-04091

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04092) VUID-VkSubpassDependency2-dstStageMask-04092

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04093) VUID-VkSubpassDependency2-dstStageMask-04093

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04094) VUID-VkSubpassDependency2-dstStageMask-04094

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04095) VUID-VkSubpassDependency2-dstStageMask-04095

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04096) VUID-VkSubpassDependency2-dstStageMask-04096

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-07318) VUID-VkSubpassDependency2-dstStageMask-07318

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-03937) VUID-VkSubpassDependency2-dstStageMask-03937

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-VkSubpassDependency2-dstStageMask-07949) VUID-VkSubpassDependency2-dstStageMask-07949

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-10754) VUID-VkSubpassDependency2-dstStageMask-10754

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-VkSubpassDependency2-srcSubpass-03084) VUID-VkSubpassDependency2-srcSubpass-03084

`srcSubpass` **must** be less than or equal to `dstSubpass`, unless
one of them is [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL), to avoid cyclic dependencies
and ensure a valid execution order

* 
[](#VUID-VkSubpassDependency2-srcSubpass-03085) VUID-VkSubpassDependency2-srcSubpass-03085

`srcSubpass` and `dstSubpass` **must** not both be equal to
[VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL)

* 
[](#VUID-VkSubpassDependency2-srcSubpass-06810) VUID-VkSubpassDependency2-srcSubpass-06810

If `srcSubpass` is equal to `dstSubpass` and `srcStageMask`
includes a [framebuffer-space    stage](synchronization.html#synchronization-framebuffer-regions), `dstStageMask` **must** only contain
[framebuffer-space stages](synchronization.html#synchronization-framebuffer-regions)

* 
[](#VUID-VkSubpassDependency2-srcAccessMask-03088) VUID-VkSubpassDependency2-srcAccessMask-03088

Any access flag included in `srcAccessMask` **must** be supported by
one of the pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-VkSubpassDependency2-dstAccessMask-03089) VUID-VkSubpassDependency2-dstAccessMask-03089

Any access flag included in `dstAccessMask` **must** be supported by
one of the pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-03090) VUID-VkSubpassDependency2-dependencyFlags-03090

If `dependencyFlags` includes [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits),
`srcSubpass` **must** not be equal to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL)

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-03091) VUID-VkSubpassDependency2-dependencyFlags-03091

If `dependencyFlags` includes [VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits),
`dstSubpass` **must** not be equal to [VK_SUBPASS_EXTERNAL](#VK_SUBPASS_EXTERNAL)

* 
[](#VUID-VkSubpassDependency2-srcSubpass-02245) VUID-VkSubpassDependency2-srcSubpass-02245

If `srcSubpass` equals `dstSubpass`, and `srcStageMask` and
`dstStageMask` both include a
[framebuffer-space stage](synchronization.html#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits)

* 
[](#VUID-VkSubpassDependency2-viewOffset-02530) VUID-VkSubpassDependency2-viewOffset-02530

If `viewOffset` is not equal to `0`, `srcSubpass` **must** not be
equal to `dstSubpass`

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-03092) VUID-VkSubpassDependency2-dependencyFlags-03092

If `dependencyFlags` does not include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](synchronization.html#VkDependencyFlagBits), `viewOffset` **must** be `0`

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-10204) VUID-VkSubpassDependency2-dependencyFlags-10204

`dependencyFlags` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](synchronization.html#VkDependencyFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDependency2-sType-sType) VUID-VkSubpassDependency2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubpassDependency2-pNext-pNext) VUID-VkSubpassDependency2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkMemoryBarrier2](synchronization.html#VkMemoryBarrier2) or [VkMemoryBarrierAccessFlags3KHR](synchronization.html#VkMemoryBarrierAccessFlags3KHR)

* 
[](#VUID-VkSubpassDependency2-sType-unique) VUID-VkSubpassDependency2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubpassDependency2-srcStageMask-parameter) VUID-VkSubpassDependency2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkSubpassDependency2-dstStageMask-parameter) VUID-VkSubpassDependency2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) values

* 
[](#VUID-VkSubpassDependency2-srcAccessMask-parameter) VUID-VkSubpassDependency2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) values

* 
[](#VUID-VkSubpassDependency2-dstAccessMask-parameter) VUID-VkSubpassDependency2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits](synchronization.html#VkAccessFlagBits) values

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-parameter) VUID-VkSubpassDependency2-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](synchronization.html#VkDependencyFlagBits) values

To destroy a render pass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkDestroyRenderPass(
    VkDevice                                    device,
    VkRenderPass                                renderPass,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the render pass.

* 
`renderPass` is the handle of the render pass to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyRenderPass-renderPass-00873) VUID-vkDestroyRenderPass-renderPass-00873

All submitted commands that refer to `renderPass` **must** have
completed execution

* 
[](#VUID-vkDestroyRenderPass-renderPass-00874) VUID-vkDestroyRenderPass-renderPass-00874

If `VkAllocationCallbacks` were provided when `renderPass` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyRenderPass-renderPass-00875) VUID-vkDestroyRenderPass-renderPass-00875

If no `VkAllocationCallbacks` were provided when `renderPass`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyRenderPass-device-parameter) VUID-vkDestroyRenderPass-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyRenderPass-renderPass-parameter) VUID-vkDestroyRenderPass-renderPass-parameter

 If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `renderPass` **must** be a valid [VkRenderPass](#VkRenderPass) handle

* 
[](#VUID-vkDestroyRenderPass-pAllocator-parameter) VUID-vkDestroyRenderPass-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyRenderPass-renderPass-parent) VUID-vkDestroyRenderPass-renderPass-parent

 If `renderPass` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `renderPass` **must** be externally synchronized

Framebuffers and graphics pipelines are created based on a specific render
pass object.
They **must** only be used with that render pass object, or one compatible with
it.

Two attachment references are compatible if they have matching format and
sample count, or are both [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED).

Two arrays of attachment references are compatible if all corresponding
pairs of attachments are compatible.
If the arrays are of different lengths, attachment references not present in
the smaller array are treated as [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED).
If the pointer that would contain the reference is `NULL`, the attachment
reference is treated as [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED).

Two render passes are compatible if their corresponding color, input,
resolve, and depth/stencil attachment references are compatible and if they
are otherwise identical except for:

* 
Initial and final image layout in attachment descriptions

* 
Load and store operations in attachment descriptions

* 
Image layout in attachment references

* 
The inclusion of
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)

* 
The inclusion of
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#VkAttachmentDescriptionFlagBits)

As an additional special case, if two render passes have a single subpass,
the resolve attachment reference
and depth/stencil resolve mode
compatibility requirements are ignored.

A framebuffer is compatible with a render pass if it was created using the
same render pass or a compatible render pass.

Render passes operate in conjunction with *framebuffers*.
Framebuffers represent a collection of specific memory attachments that a
render pass instance uses.

Framebuffers are represented by `VkFramebuffer` handles:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkFramebuffer)

To create a framebuffer, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkCreateFramebuffer(
    VkDevice                                    device,
    const VkFramebufferCreateInfo*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkFramebuffer*                              pFramebuffer);

* 
`device` is the logical device that creates the framebuffer.

* 
`pCreateInfo` is a pointer to a [VkFramebufferCreateInfo](#VkFramebufferCreateInfo)
structure describing additional information about framebuffer creation.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pFramebuffer` is a pointer to a [VkFramebuffer](#VkFramebuffer) handle in which
the resulting framebuffer object is returned.

Valid Usage

* 
[](#VUID-vkCreateFramebuffer-device-10002) VUID-vkCreateFramebuffer-device-10002

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateFramebuffer-pCreateInfo-02777) VUID-vkCreateFramebuffer-pCreateInfo-02777

If `pCreateInfo->flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), and `attachmentCount` is
not `0`, each element of `pCreateInfo->pAttachments` **must** have been
created on `device`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateFramebuffer-device-parameter) VUID-vkCreateFramebuffer-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateFramebuffer-pCreateInfo-parameter) VUID-vkCreateFramebuffer-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkFramebufferCreateInfo](#VkFramebufferCreateInfo) structure

* 
[](#VUID-vkCreateFramebuffer-pAllocator-parameter) VUID-vkCreateFramebuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateFramebuffer-pFramebuffer-parameter) VUID-vkCreateFramebuffer-pFramebuffer-parameter

 `pFramebuffer` **must** be a valid pointer to a [VkFramebuffer](#VkFramebuffer) handle

* 
[](#VUID-vkCreateFramebuffer-device-queuecount) VUID-vkCreateFramebuffer-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkFramebufferCreateInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkFramebufferCreateInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkFramebufferCreateFlags    flags;
    VkRenderPass                renderPass;
    uint32_t                    attachmentCount;
    const VkImageView*          pAttachments;
    uint32_t                    width;
    uint32_t                    height;
    uint32_t                    layers;
} VkFramebufferCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkFramebufferCreateFlagBits](#VkFramebufferCreateFlagBits)

* 
`renderPass` is a render pass defining what render passes the
framebuffer will be compatible with.
See [Render Pass Compatibility](#renderpass-compatibility) for details.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`attachmentCount` is the number of attachments.

* 
`pAttachments` is a pointer to an array of [VkImageView](resources.html#VkImageView)
handles, each of which will be used as the corresponding attachment in a
render pass instance.
If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), this
parameter is ignored.

* 
`width`, `height` and `layers` define the dimensions of the
framebuffer.
If the render pass uses multiview, then `layers` **must** be one and
each attachment requires a number of layers that is greater than the
maximum bit index set in the view mask in the subpasses in which it is
used.

For any depth/stencil attachments used by this framebuffer in
`pAttachments`,
or set later through
[VkRenderPassAttachmentBeginInfoKHR](#VkRenderPassAttachmentBeginInfoKHR)::`pAttachments`,
the `aspectMask` is ignored.

It is legal for a subpass to use no color or depth/stencil attachments,
either because it has no attachment references or because all of them are
[VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED).
This kind of subpass **can** use shader side effects such as image stores and
atomics to produce an output.
In this case, the subpass continues to use the `width`, `height`,
and `layers` of the framebuffer to define the dimensions of the
rendering area, and the `rasterizationSamples` from each pipeline’s
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) to define the number of samples
used in rasterization; however, if
[VkPhysicalDeviceFeatures](features.html#VkPhysicalDeviceFeatures)::`variableMultisampleRate` is
[VK_FALSE](fundamentals.html#VK_FALSE), then all pipelines to be bound with the subpass **must** have
the same value for
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`.
In all such cases, `rasterizationSamples` **must** be a valid
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is set in
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`framebufferNoAttachmentsSampleCounts`.

Valid Usage

* 
[](#VUID-VkFramebufferCreateInfo-attachmentCount-00876) VUID-VkFramebufferCreateInfo-attachmentCount-00876

`attachmentCount` **must** be equal to the attachment count specified
in `renderPass`

* 
[](#VUID-VkFramebufferCreateInfo-flags-02778) VUID-VkFramebufferCreateInfo-flags-02778

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits) and `attachmentCount` is
not `0`, `pAttachments` **must** be a valid pointer to an array of
`attachmentCount` valid [VkImageView](resources.html#VkImageView) handles

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00877) VUID-VkFramebufferCreateInfo-pAttachments-00877

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as a color attachment or resolve
attachment by `renderPass` **must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-02633) VUID-VkFramebufferCreateInfo-pAttachments-02633

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as a depth/stencil attachment by
`renderPass` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-02634) VUID-VkFramebufferCreateInfo-pAttachments-02634

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as a depth/stencil resolve attachment by
`renderPass` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00879) VUID-VkFramebufferCreateInfo-pAttachments-00879

If `renderpass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `flags` does not
include [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as an input attachment by
`renderPass` **must** have been created with the
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-02552) VUID-VkFramebufferCreateInfo-pAttachments-02552

Each element of `pAttachments` that is used as a fragment density
map attachment by `renderPass` **must** not have been created with a
`flags` value including [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-02553) VUID-VkFramebufferCreateInfo-renderPass-02553

If `renderPass` has a fragment density map attachment and the
[    `fragmentDensityMapNonSubsampledImages`](features.html#features-fragmentDensityMapNonSubsampledImages) feature is not enabled,
each element of `pAttachments` **must** have been created with a
`flags` value including [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits)
unless that element is the fragment density map attachment

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-10830) VUID-VkFramebufferCreateInfo-renderPass-10830

If `renderPass` was created with
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkRenderPassCreateFlagBits), then
`layers` **must** be less than or equal to
[    `maxFragmentDensityMapLayers`](limits.html#limits-maxFragmentDensityMapLayers)

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-12327) VUID-VkFramebufferCreateInfo-pAttachments-12327

If flags does not include VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT, then each
element of `pAttachments` that is used as a resolve attachment by
`renderPass` **must** not be bound to a `VkDeviceMemory` object
allocated from a `VkMemoryHeap` with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00880) VUID-VkFramebufferCreateInfo-pAttachments-00880

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` **must** have been created with a [VkFormat](formats.html#VkFormat) value
that matches the [VkFormat](formats.html#VkFormat) specified by the corresponding
`VkAttachmentDescription` in `renderPass`

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00881) VUID-VkFramebufferCreateInfo-pAttachments-00881

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` **must** have been created with a `samples` value
that matches the `samples` value specified by the corresponding
`VkAttachmentDescription` in `renderPass`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04533) VUID-VkFramebufferCreateInfo-flags-04533

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as an input, color, resolve, or
depth/stencil attachment by `renderPass` **must** have been created
with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`extent.width` greater than or equal
to `width`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04534) VUID-VkFramebufferCreateInfo-flags-04534

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as an input, color, resolve, or
depth/stencil attachment by `renderPass` **must** have been created
with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`extent.height` greater than or
equal to `height`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04535) VUID-VkFramebufferCreateInfo-flags-04535

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as an input, color, resolve, or
depth/stencil attachment by `renderPass` **must** have been created
with a [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`subresourceRange.layerCount`
greater than or equal to `layers`

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-04536) VUID-VkFramebufferCreateInfo-renderPass-04536

If `renderPass` was specified with non-zero view masks, each element
of `pAttachments` that is used as an input, color, resolve, or
depth/stencil attachment by `renderPass` **must** have a
`layerCount` greater than the index of the most significant bit set
in any of those view masks

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-02746) VUID-VkFramebufferCreateInfo-renderPass-02746

Each element of `pAttachments` that is referenced by
`fragmentDensityMapAttachment` **must** have a `layerCount` equal
to `1`
or if `renderPass` was specified with non-zero view masks, greater
than the index of the most significant bit set in any of those view
masks

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-02555) VUID-VkFramebufferCreateInfo-pAttachments-02555

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), an element of
`pAttachments` that is referenced by
`fragmentDensityMapAttachment` **must** have a width at least as large
as
  

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-02556) VUID-VkFramebufferCreateInfo-pAttachments-02556

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), an element of
`pAttachments` that is referenced by
`fragmentDensityMapAttachment` **must** have a height at least as large
as
  

* 
[](#VUID-VkFramebufferCreateInfo-flags-04537) VUID-VkFramebufferCreateInfo-flags-04537

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), and `renderPass` was
specified with non-zero view masks, each element of `pAttachments`
that is used as a [fragment    shading rate attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) by `renderPass` **must** have a
`layerCount` that is either `1`, or greater than the index of the
most significant bit set in any of those view masks

* 
[](#VUID-VkFramebufferCreateInfo-flags-04538) VUID-VkFramebufferCreateInfo-flags-04538

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), and `renderPass` was not
specified with non-zero view masks, each element of `pAttachments`
that is used as a [fragment    shading rate attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) by `renderPass` **must** have a
`layerCount` that is either `1`, or greater than `layers`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04539) VUID-VkFramebufferCreateInfo-flags-04539

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0,
`flags` does not include [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits),
an element of `pAttachments` that is used as a
[fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) **must** have a width at least as large as
⌈`width` / `texelWidth`⌉, where `texelWidth`
is the largest value of `shadingRateAttachmentTexelSize.width` in a
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR) which references that
attachment

* 
[](#VUID-VkFramebufferCreateInfo-flags-04540) VUID-VkFramebufferCreateInfo-flags-04540

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0,
`flags` does not include [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits),
an element of `pAttachments` that is used as a
[fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) **must** have a height at least as large as
⌈`height` / `texelHeight`⌉, where
`texelHeight` is the largest value of
`shadingRateAttachmentTexelSize.height` in a
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR) which references that
attachment

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00883) VUID-VkFramebufferCreateInfo-pAttachments-00883

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` **must** only specify a single mip level

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00884) VUID-VkFramebufferCreateInfo-pAttachments-00884

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` **must** have been created with the identity swizzle

* 
[](#VUID-VkFramebufferCreateInfo-width-00885) VUID-VkFramebufferCreateInfo-width-00885

`width` **must** be greater than `0`

* 
[](#VUID-VkFramebufferCreateInfo-width-00886) VUID-VkFramebufferCreateInfo-width-00886

`width` **must** be less than or equal to [    `maxFramebufferWidth`](limits.html#limits-maxFramebufferWidth)

* 
[](#VUID-VkFramebufferCreateInfo-height-00887) VUID-VkFramebufferCreateInfo-height-00887

`height` **must** be greater than `0`

* 
[](#VUID-VkFramebufferCreateInfo-height-00888) VUID-VkFramebufferCreateInfo-height-00888

`height` **must** be less than or equal to
[`maxFramebufferHeight`](limits.html#limits-maxFramebufferHeight)

* 
[](#VUID-VkFramebufferCreateInfo-layers-00889) VUID-VkFramebufferCreateInfo-layers-00889

`layers` **must** be greater than `0`

* 
[](#VUID-VkFramebufferCreateInfo-layers-00890) VUID-VkFramebufferCreateInfo-layers-00890

`layers` **must** be less than or equal to
[`maxFramebufferLayers`](limits.html#limits-maxFramebufferLayers)

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-02531) VUID-VkFramebufferCreateInfo-renderPass-02531

If `renderPass` was specified with non-zero view masks, `layers`
**must** be `1`

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-00891) VUID-VkFramebufferCreateInfo-pAttachments-00891

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is a 2D or 2D array image view taken from a 3D
image **must** not be a depth/stencil format

* 
[](#VUID-VkFramebufferCreateInfo-flags-03189) VUID-VkFramebufferCreateInfo-flags-03189

If the [`imagelessFramebuffer`](features.html#features-imagelessFramebuffer)
feature is not enabled, `flags` **must** not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-flags-03190) VUID-VkFramebufferCreateInfo-flags-03190

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`pNext` chain **must** include a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure

* 
[](#VUID-VkFramebufferCreateInfo-flags-03191) VUID-VkFramebufferCreateInfo-flags-03191

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`attachmentImageInfoCount` member of a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the `pNext`
chain **must** be equal to either zero or `attachmentCount`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04541) VUID-VkFramebufferCreateInfo-flags-04541

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`width` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the
`pNext` chain that is used as an input, color, resolve, or
depth/stencil attachment in `renderPass` **must** be greater than or
equal to `width`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04542) VUID-VkFramebufferCreateInfo-flags-04542

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`height` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the
`pNext` chain that is used as an input, color, resolve, or
depth/stencil attachment in `renderPass` **must** be greater than or
equal to `height`

* 
[](#VUID-VkFramebufferCreateInfo-flags-03196) VUID-VkFramebufferCreateInfo-flags-03196

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`width` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the
`pNext` chain that is referenced by
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT)::`fragmentDensityMapAttachment`
in `renderPass` **must** be greater than or equal to
  

* 
[](#VUID-VkFramebufferCreateInfo-flags-03197) VUID-VkFramebufferCreateInfo-flags-03197

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`height` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included
in the `pNext` chain that is referenced by
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT)::`fragmentDensityMapAttachment`
in `renderPass` **must** be greater than or equal to
  

* 
[](#VUID-VkFramebufferCreateInfo-flags-04543) VUID-VkFramebufferCreateInfo-flags-04543

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0, and
`flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`width` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the
`pNext` chain that is used as a
[fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) **must** be greater than or equal to ⌈`width` /
`texelWidth`⌉, where `texelWidth` is the largest value of
`shadingRateAttachmentTexelSize.width` in a
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR) which references that
attachment

* 
[](#VUID-VkFramebufferCreateInfo-flags-04544) VUID-VkFramebufferCreateInfo-flags-04544

If
the [`maintenance7`](features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](fundamentals.html#VK_FALSE) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](#VkRenderingFragmentShadingRateAttachmentInfoKHR) structure was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` greater
than 0, and
`flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`height` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the
`pNext` chain that is used as a
[fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) **must** be greater than or equal to ⌈`height`
/ `texelHeight`⌉, where `texelHeight` is the largest value
of `shadingRateAttachmentTexelSize.height` in a
[VkFragmentShadingRateAttachmentInfoKHR](#VkFragmentShadingRateAttachmentInfoKHR) which references that
attachment

* 
[](#VUID-VkFramebufferCreateInfo-flags-04545) VUID-VkFramebufferCreateInfo-flags-04545

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`layerCount` member of any element of the
`pAttachmentImageInfos` member of a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the `pNext`
chain that is used as a [    fragment shading rate attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) **must** be either `1`, or greater than
or equal to `layers`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04587) VUID-VkFramebufferCreateInfo-flags-04587

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits) and
`renderPass` was specified with non-zero view masks, the
`layerCount` member of any element of the
`pAttachmentImageInfos` member of a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure in the `pNext`
chain that is used as a [    fragment shading rate attachment](primsrast.html#primsrast-fragment-shading-rate-attachment) **must** be either `1`, or greater than
the index of the most significant bit set in any of those view masks

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-03198) VUID-VkFramebufferCreateInfo-renderPass-03198

If multiview is enabled for `renderPass` and `flags` includes
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the `layerCount` member
of any element of the `pAttachmentImageInfos` member of a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included in the
`pNext` chain used as an input, color, resolve, or depth/stencil
attachment in `renderPass` **must** be greater than the maximum bit
index set in the view mask in the subpasses in which it is used in
`renderPass`

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-04546) VUID-VkFramebufferCreateInfo-renderPass-04546

If
multiview is not enabled for `renderPass` and
`flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`layerCount` member of any element of the
`pAttachmentImageInfos` member of a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included in the
`pNext` chain used as an input, color, resolve, or depth/stencil
attachment in `renderPass` **must** be greater than or equal to
`layers`

* 
[](#VUID-VkFramebufferCreateInfo-flags-03201) VUID-VkFramebufferCreateInfo-flags-03201

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`usage` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included
in the `pNext` chain that refers to an attachment used as a color
attachment or resolve attachment by `renderPass` **must** include
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-flags-03202) VUID-VkFramebufferCreateInfo-flags-03202

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`usage` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included
in the `pNext` chain that refers to an attachment used as a
depth/stencil attachment by `renderPass` **must** include
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-flags-03203) VUID-VkFramebufferCreateInfo-flags-03203

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`usage` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included
in the `pNext` chain that refers to an attachment used as a
depth/stencil resolve attachment by `renderPass` **must** include
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-flags-03204) VUID-VkFramebufferCreateInfo-flags-03204

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`usage` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included
in the `pNext` chain that refers to an attachment used as an input
attachment by `renderPass` **must** include
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-flags-03205) VUID-VkFramebufferCreateInfo-flags-03205

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), at
least one element of the `pViewFormats` member of any element of the
`pAttachmentImageInfos` member of a
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included in the
`pNext` chain **must** be equal to the corresponding value of
[VkAttachmentDescription](#VkAttachmentDescription)::`format` used to create
`renderPass`

* 
[](#VUID-VkFramebufferCreateInfo-flags-04113) VUID-VkFramebufferCreateInfo-flags-04113

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` **must** have been created with
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`viewType` not equal to
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType)

* 
[](#VUID-VkFramebufferCreateInfo-flags-04548) VUID-VkFramebufferCreateInfo-flags-04548

If `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of
`pAttachments` that is used as a fragment shading rate attachment by
`renderPass` **must** have been created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-VkFramebufferCreateInfo-flags-04549) VUID-VkFramebufferCreateInfo-flags-04549

If `flags` includes [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the
`usage` member of any element of the `pAttachmentImageInfos`
member of a [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo) structure included
in the `pNext` chain that refers to an attachment used as a fragment
shading rate attachment by `renderPass` **must** include
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits)

* 
[](#VUID-VkFramebufferCreateInfo-samples-06881) VUID-VkFramebufferCreateInfo-samples-06881

If
[multisampled-render-to-single-sampled](#subpass-multisampledrendertosinglesampled)
is enabled for any subpass, all color, depth/stencil, and input
attachments used in that subpass which have
`VkAttachmentDescription`::`samples` or
`VkAttachmentDescription2`::`samples` equal to
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) **must** have been created with
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits) in
their [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`

* 
[](#VUID-VkFramebufferCreateInfo-samples-07009) VUID-VkFramebufferCreateInfo-samples-07009

If
[multisampled-render-to-single-sampled](#subpass-multisampledrendertosinglesampled)
is enabled for any subpass, all color, depth/stencil, and input
attachments used in that subpass which have
`VkAttachmentDescription`::`samples` or
`VkAttachmentDescription2`::`samples` equal to
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) **must** have a format that supports the sample
count specified in
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

* 
[](#VUID-VkFramebufferCreateInfo-nullColorAttachmentWithExternalFormatResolve-09349) VUID-VkFramebufferCreateInfo-nullColorAttachmentWithExternalFormatResolve-09349

If the [    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](fundamentals.html#VK_FALSE),
and `flags` does not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits),
the format of the color attachment for each subpass in `renderPass`
that includes an external format image as a resolve attachment **must**
have a format equal to the value of
[VkAndroidHardwareBufferFormatResolvePropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatResolvePropertiesANDROID)::`colorAttachmentFormat`
as returned by a call to
[vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) for the Android
hardware buffer that was used to create the image view use as its
resolve attachment

* 
[](#VUID-VkFramebufferCreateInfo-pAttachments-09350) VUID-VkFramebufferCreateInfo-pAttachments-09350

If
`flags` does not include [VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits),
then if
an element of `pAttachments` has a format of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** have been created with a
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` value identical to
that provided in the [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat`
specified by the corresponding [VkAttachmentDescription2](#VkAttachmentDescription2) in
`renderPass`

Valid Usage (Implicit)

* 
[](#VUID-VkFramebufferCreateInfo-sType-sType) VUID-VkFramebufferCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAMEBUFFER_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFramebufferCreateInfo-pNext-pNext) VUID-VkFramebufferCreateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)

* 
[](#VUID-VkFramebufferCreateInfo-sType-unique) VUID-VkFramebufferCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkFramebufferCreateInfo-flags-parameter) VUID-VkFramebufferCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkFramebufferCreateFlagBits](#VkFramebufferCreateFlagBits) values

* 
[](#VUID-VkFramebufferCreateInfo-renderPass-parameter) VUID-VkFramebufferCreateInfo-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](#VkRenderPass) handle

* 
[](#VUID-VkFramebufferCreateInfo-commonparent) VUID-VkFramebufferCreateInfo-commonparent

 Both of `renderPass`, and the elements of `pAttachments` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkFramebufferAttachmentsCreateInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkFramebufferAttachmentsCreateInfo {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   attachmentImageInfoCount;
    const VkFramebufferAttachmentImageInfo*    pAttachmentImageInfos;
} VkFramebufferAttachmentsCreateInfo;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkFramebufferAttachmentsCreateInfo
typedef VkFramebufferAttachmentsCreateInfo VkFramebufferAttachmentsCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentImageInfoCount` is the number of attachments being
described.

* 
`pAttachmentImageInfos` is a pointer to an array of
[VkFramebufferAttachmentImageInfo](#VkFramebufferAttachmentImageInfo) structures, each structure
describing a number of parameters of the corresponding attachment in a
render pass instance.

Valid Usage (Implicit)

* 
[](#VUID-VkFramebufferAttachmentsCreateInfo-sType-sType) VUID-VkFramebufferAttachmentsCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFramebufferAttachmentsCreateInfo-pAttachmentImageInfos-parameter) VUID-VkFramebufferAttachmentsCreateInfo-pAttachmentImageInfos-parameter

 If `attachmentImageInfoCount` is not `0`, `pAttachmentImageInfos` **must** be a valid pointer to an array of `attachmentImageInfoCount` valid [VkFramebufferAttachmentImageInfo](#VkFramebufferAttachmentImageInfo) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)

The `VkFramebufferAttachmentImageInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkFramebufferAttachmentImageInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkImageCreateFlags    flags;
    VkImageUsageFlags     usage;
    uint32_t              width;
    uint32_t              height;
    uint32_t              layerCount;
    uint32_t              viewFormatCount;
    const VkFormat*       pViewFormats;
} VkFramebufferAttachmentImageInfo;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkFramebufferAttachmentImageInfo
typedef VkFramebufferAttachmentImageInfo VkFramebufferAttachmentImageInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits), matching the
value of [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags` used to create an image
that will be used with this framebuffer.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits), matching the
value of [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage` used to create an image
used with this framebuffer.

* 
`width` is the width of the image view used for rendering.

* 
`height` is the height of the image view used for rendering.

* 
`layerCount` is the number of array layers of the image view used
for rendering.

* 
`viewFormatCount` is the number of entries in the `pViewFormats`
array, matching the value of
[VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo)::`viewFormatCount` used to create
an image used with this framebuffer.

* 
`pViewFormats` is a pointer to an array of [VkFormat](formats.html#VkFormat) values
specifying all of the formats which **can** be used when creating views of
the image, matching the value of
[VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo)::`pViewFormats` used to create an
image used with this framebuffer.

Images that **can** be used with the framebuffer when beginning a render pass,
as specified by [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo), **must** be created with
parameters that are identical to those specified here.

Valid Usage

* 
[](#VUID-VkFramebufferAttachmentImageInfo-viewFormatCount-09536) VUID-VkFramebufferAttachmentImageInfo-viewFormatCount-09536

If `viewFormatCount` is not 0,
and the render pass is not being used with an external format resolve
attachment,
each element of `pViewFormats` **must** not be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkFramebufferAttachmentImageInfo-sType-sType) VUID-VkFramebufferAttachmentImageInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFramebufferAttachmentImageInfo-pNext-pNext) VUID-VkFramebufferAttachmentImageInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkFramebufferAttachmentImageInfo-flags-parameter) VUID-VkFramebufferAttachmentImageInfo-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits) values

* 
[](#VUID-VkFramebufferAttachmentImageInfo-usage-parameter) VUID-VkFramebufferAttachmentImageInfo-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-VkFramebufferAttachmentImageInfo-usage-requiredbitmask) VUID-VkFramebufferAttachmentImageInfo-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkFramebufferAttachmentImageInfo-pViewFormats-parameter) VUID-VkFramebufferAttachmentImageInfo-pViewFormats-parameter

 If `viewFormatCount` is not `0`, `pViewFormats` **must** be a valid pointer to an array of `viewFormatCount` valid [VkFormat](formats.html#VkFormat) values

Bits which **can** be set in [VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags`,
specifying options for framebuffers, are:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkFramebufferCreateFlagBits {
  // Provided by VK_VERSION_1_2
    VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT = 0x00000001,
  // Provided by VK_KHR_imageless_framebuffer
    VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT_KHR = VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT,
} VkFramebufferCreateFlagBits;

* 
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits) specifies that image views are
not specified, and only attachment compatibility information will be
provided via a [VkFramebufferAttachmentImageInfo](#VkFramebufferAttachmentImageInfo) structure.

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkFramebufferCreateFlags;

`VkFramebufferCreateFlags` is a bitmask type for setting a mask of zero
or more [VkFramebufferCreateFlagBits](#VkFramebufferCreateFlagBits).

To destroy a framebuffer, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkDestroyFramebuffer(
    VkDevice                                    device,
    VkFramebuffer                               framebuffer,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the framebuffer.

* 
`framebuffer` is the handle of the framebuffer to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-00892) VUID-vkDestroyFramebuffer-framebuffer-00892

All submitted commands that refer to `framebuffer` **must** have
completed execution

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-00893) VUID-vkDestroyFramebuffer-framebuffer-00893

If `VkAllocationCallbacks` were provided when `framebuffer` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-00894) VUID-vkDestroyFramebuffer-framebuffer-00894

If no `VkAllocationCallbacks` were provided when `framebuffer`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyFramebuffer-device-parameter) VUID-vkDestroyFramebuffer-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-parameter) VUID-vkDestroyFramebuffer-framebuffer-parameter

 If `framebuffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `framebuffer` **must** be a valid [VkFramebuffer](#VkFramebuffer) handle

* 
[](#VUID-vkDestroyFramebuffer-pAllocator-parameter) VUID-vkDestroyFramebuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyFramebuffer-framebuffer-parent) VUID-vkDestroyFramebuffer-framebuffer-parent

 If `framebuffer` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `framebuffer` **must** be externally synchronized

Render pass load operations define the initial values of an attachment
during a render pass instance.

Load operations for attachments with a depth/stencil format execute in the
[VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage.
Load operations for attachments with a color format execute in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage.
The load operation for each sample in an attachment happens-before any
recorded command which accesses the sample in that render pass instance via
that attachment or an alias.
In a render pass object with multiple [subpasses](#renderpass-subpass), load
operations are performed in the first subpass which uses an attachment.

|  | Because load operations always happen first, external synchronization with
| --- | --- |
attachment access only needs to synchronize the load operations with
previous commands; not the operations within the render pass instance.
This does not apply when using [VK_ATTACHMENT_LOAD_OP_NONE](#VkAttachmentLoadOp). |

Load operations only update values within the defined render area for the
render pass instance.
However, any writes performed by a load operation (as defined by its access
masks) to a given attachment **may** read and write back any memory locations
within the image subresource bound for that attachment.
For depth/stencil images,
if the [maintenance7](features.html#features-maintenance7) feature is not enabled or
[`separateDepthStencilAttachmentAccess`](limits.html#limits-separateDepthStencilAttachmentAccess)
is [VK_FALSE](fundamentals.html#VK_FALSE),
writes to one aspect **may** also result in read-modify-write operations for
the other aspect.
If the subresource is bound to an attachment with
[feedback loop enabled](#renderpass-feedbackloop), implementations **must** not
access pixels outside of the render area.

|  | As entire subresources could be accessed by load operations, applications
| --- | --- |
cannot safely access values outside of the render area during a render pass
instance when a load operation that modifies values is used. |

Load operations that **can** be used for a render pass are:

// Provided by VK_VERSION_1_0
typedef enum VkAttachmentLoadOp {
    VK_ATTACHMENT_LOAD_OP_LOAD = 0,
    VK_ATTACHMENT_LOAD_OP_CLEAR = 1,
    VK_ATTACHMENT_LOAD_OP_DONT_CARE = 2,
  // Provided by VK_VERSION_1_4
    VK_ATTACHMENT_LOAD_OP_NONE = 1000400000,
  // Provided by VK_EXT_load_store_op_none
    VK_ATTACHMENT_LOAD_OP_NONE_EXT = VK_ATTACHMENT_LOAD_OP_NONE,
  // Provided by VK_KHR_load_store_op_none
    VK_ATTACHMENT_LOAD_OP_NONE_KHR = VK_ATTACHMENT_LOAD_OP_NONE,
} VkAttachmentLoadOp;

* 
[VK_ATTACHMENT_LOAD_OP_LOAD](#VkAttachmentLoadOp) specifies that the previous contents of
the image within the render area will be preserved as the initial
values.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits).

* 
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp) specifies that the contents within the
render area will be cleared to a uniform value, which is specified when
a render pass instance is begun.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).

* 
[VK_ATTACHMENT_LOAD_OP_DONT_CARE](#VkAttachmentLoadOp) specifies that the previous
contents within the area need not be preserved; the contents of the
attachment will be **undefined** inside the render area.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).

* 
[VK_ATTACHMENT_LOAD_OP_NONE](#VkAttachmentLoadOp) specifies that the previous contents of
the image will be **undefined** inside the render pass.
No access type is used as the image is not accessed.

During a render pass instance, input and color attachments with color
formats that have a component size of 8, 16, or 32 bits **must** be represented
in the attachment’s format throughout the instance.
Attachments with other floating- or fixed-point color formats, or with depth
components **may** be represented in a format with a precision higher than the
attachment format, but **must** be represented with the same range.
When such a component is loaded via the `loadOp`, it will be converted
into an implementation-dependent format used by the render pass.
Such components **must** be converted from the render pass format, to the
format of the attachment, before they are resolved or stored at the end of a
render pass instance via `storeOp`.
Conversions occur as described in [Numeric Representation and Computation](fundamentals.html#fundamentals-numerics) and [Fixed-Point Data Conversions](fundamentals.html#fundamentals-fixedconv).

Render pass store operations define how values written to an attachment
during a render pass instance are stored to memory.

Store operations for attachments with a depth/stencil format execute in the
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage.
Store operations for attachments with a color format execute in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage.
The store operation for each sample in an attachment happens-after any
recorded command which accesses the sample via that attachment or an alias.
In a render pass object with multiple [subpasses](#renderpass-subpass),
store operations are performed in the last subpass which uses an attachment.

|  | Because store operations always happen after other accesses in a render pass
| --- | --- |
instance, external synchronization with attachment access in an earlier
render pass only needs to synchronize with the store operations; not the
operations within the render pass instance.
This does not apply when using [VK_ATTACHMENT_STORE_OP_NONE](#VkAttachmentStoreOp). |

Store operations only update values within the defined render area for the
render pass instance.
However, any writes performed by a store operation (as defined by its access
masks) to a given attachment **may** read and write back any memory locations
within the image subresource bound for that attachment.
For depth/stencil images,
if
[`separateDepthStencilAttachmentAccess`](limits.html#limits-separateDepthStencilAttachmentAccess)
is [VK_FALSE](fundamentals.html#VK_FALSE),
writes to one aspect **may** also result in read-modify-write operations for
the other aspect.
If the subresource is bound to an attachment with
[feedback loop enabled](#renderpass-feedbackloop), implementations **must** not
access pixels outside of the render area.

|  | As entire subresources could be accessed by store operations, applications
| --- | --- |
cannot safely access values outside of the render area via aliased resources
during a render pass instance when a store operation that modifies values is
used. |

Possible values of [VkAttachmentDescription](#VkAttachmentDescription)::`storeOp` and
`stencilStoreOp`, specifying how the contents of the attachment are
treated, are:

// Provided by VK_VERSION_1_0
typedef enum VkAttachmentStoreOp {
    VK_ATTACHMENT_STORE_OP_STORE = 0,
    VK_ATTACHMENT_STORE_OP_DONT_CARE = 1,
  // Provided by VK_VERSION_1_3
    VK_ATTACHMENT_STORE_OP_NONE = 1000301000,
  // Provided by VK_KHR_dynamic_rendering, VK_KHR_load_store_op_none
    VK_ATTACHMENT_STORE_OP_NONE_KHR = VK_ATTACHMENT_STORE_OP_NONE,
  // Provided by VK_QCOM_render_pass_store_ops
    VK_ATTACHMENT_STORE_OP_NONE_QCOM = VK_ATTACHMENT_STORE_OP_NONE,
  // Provided by VK_EXT_load_store_op_none
    VK_ATTACHMENT_STORE_OP_NONE_EXT = VK_ATTACHMENT_STORE_OP_NONE,
} VkAttachmentStoreOp;

* 
[VK_ATTACHMENT_STORE_OP_STORE](#VkAttachmentStoreOp) specifies the contents generated
during the render pass and within the render area are written to memory.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).

* 
[VK_ATTACHMENT_STORE_OP_DONT_CARE](#VkAttachmentStoreOp) specifies the contents within the
render area are not needed after rendering, and **may** be discarded; the
contents of the attachment will be **undefined** inside the render area.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).

* 
[VK_ATTACHMENT_STORE_OP_NONE](#VkAttachmentStoreOp) specifies the contents within the
render area are not accessed by the store operation as long as no values
are written to the attachment during the render pass.
If values are written during the render pass, this behaves identically
to [VK_ATTACHMENT_STORE_OP_DONT_CARE](#VkAttachmentStoreOp) and with matching access
semantics.

|  | [VK_ATTACHMENT_STORE_OP_DONT_CARE](#VkAttachmentStoreOp) **can** cause contents generated during
| --- | --- |
previous render passes to be discarded before reaching memory, even if no
write to the attachment occurs during the current render pass. |

Fixed-function render pass multisample resolve operations combine sample
values from a single pixel in a multisample attachment and store the result
to the corresponding pixel in a single sample attachment.

|  | Because [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) specifies that the attachment
| --- | --- |
will be resolved by shaders in the render pass instead of fixed-function
operations, resolve operations with [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) do
not count as fixed-function multisample resolve operations. |

Fixed-function multisample resolve operations for attachments execute in the
[VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) pipeline stage.
A final resolve operation for all pixels in the render area happens-after
any recorded command which writes a pixel via the multisample attachment to
be resolved or an explicit alias of it in the subpass that it is specified.
Any single sample attachment specified for use in a fixed-function
multisample resolve operation **may** have its contents modified at any point
once rendering begins for the render pass instance.
Reads from the multisample attachment can be synchronized with
[VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits).
Access to the single sample attachment can be synchronized with
[VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits) and
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](synchronization.html#VkAccessFlagBits).
These pipeline stage and access types are used whether the attachments are
color or depth/stencil attachments.

When using render pass objects, a subpass dependency specified with the
above pipeline stages and access flags will ensure synchronization with
fixed-function multisample resolve operations for any attachments that were
last accessed by that subpass.
This allows later subpasses to read resolved values as input attachments.

Fixed-function resolve operations only update values within the defined
render area for the render pass instance.
However, any writes performed by a resolve operation (as defined by its
access masks) to a given attachment **may** read and write back any memory
locations within the image subresource bound for that attachment.
For depth/stencil images,
if
[`separateDepthStencilAttachmentAccess`](limits.html#limits-separateDepthStencilAttachmentAccess)
is [VK_FALSE](fundamentals.html#VK_FALSE),
writes to one aspect **may** also result in read-modify-write operations for
the other aspect.
If the subresource is bound to an attachment with
[feedback loop enabled](#renderpass-feedbackloop), implementations **must** not
access pixels outside of the render area.

|  | As entire subresources could be accessed by fixed-function multisample
| --- | --- |
resolve operations, applications cannot safely access values outside of the
render area via aliased resources during a render pass instance when a
multisample resolve operation is performed. |

Multisample values in a multisample attachment are combined according to the
resolve mode used:

// Provided by VK_VERSION_1_2
typedef enum VkResolveModeFlagBits {
    VK_RESOLVE_MODE_NONE = 0,
    VK_RESOLVE_MODE_SAMPLE_ZERO_BIT = 0x00000001,
    VK_RESOLVE_MODE_AVERAGE_BIT = 0x00000002,
    VK_RESOLVE_MODE_MIN_BIT = 0x00000004,
    VK_RESOLVE_MODE_MAX_BIT = 0x00000008,
  // Provided by VK_ANDROID_external_format_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID = 0x00000010,
  // Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_RESOLVE_MODE_CUSTOM_BIT_EXT = 0x00000020,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_NONE_KHR = VK_RESOLVE_MODE_NONE,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_SAMPLE_ZERO_BIT_KHR = VK_RESOLVE_MODE_SAMPLE_ZERO_BIT,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_AVERAGE_BIT_KHR = VK_RESOLVE_MODE_AVERAGE_BIT,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_MIN_BIT_KHR = VK_RESOLVE_MODE_MIN_BIT,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_MAX_BIT_KHR = VK_RESOLVE_MODE_MAX_BIT,
  // Provided by VK_ANDROID_external_format_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
  // VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_ANDROID is a legacy alias
    VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_ANDROID = VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID,
} VkResolveModeFlagBits;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkResolveModeFlagBits
typedef VkResolveModeFlagBits VkResolveModeFlagBitsKHR;

* 
[VK_RESOLVE_MODE_NONE](#VkResolveModeFlagBitsKHR) specifies that no resolve operation is done.

* 
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](#VkResolveModeFlagBitsKHR) specifies that result of the
resolve operation is equal to the value of sample 0.

* 
[VK_RESOLVE_MODE_AVERAGE_BIT](#VkResolveModeFlagBitsKHR) specifies that result of the resolve
operation is the average of the sample values.

* 
[VK_RESOLVE_MODE_MIN_BIT](#VkResolveModeFlagBitsKHR) specifies that result of the resolve
operation is the minimum of the sample values.

* 
[VK_RESOLVE_MODE_MAX_BIT](#VkResolveModeFlagBitsKHR) specifies that result of the resolve
operation is the maximum of the sample values.

* 
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR) specifies
that rather than a multisample resolve, a single sampled color
attachment will be downsampled into a Y′CBCR format image specified by
an external Android format.
Unlike other resolve modes, implementations can resolve multiple times
during rendering, or even bypass writing to the color attachment
altogether, as long as the final value is resolved to the resolve
attachment.
Values in the G, B, and R channels of the color
attachment will be written to the Y, CB, and CR
channels of the external format image, respectively.
Chroma values are calculated as if sampling with a linear filter from
the color attachment at full rate, at the location the chroma values sit
according to
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](limits.html#VkPhysicalDeviceExternalFormatResolvePropertiesANDROID)::`externalFormatResolveChromaOffsetX`,
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](limits.html#VkPhysicalDeviceExternalFormatResolvePropertiesANDROID)::`externalFormatResolveChromaOffsetY`,
and the chroma sample rate of the resolved image.

* 
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#VkResolveModeFlagBitsKHR) specifies that the attachment will
be resolved by shaders in the render pass instead of fixed-function
operations.

If no resolve mode is otherwise specified, [VK_RESOLVE_MODE_AVERAGE_BIT](#VkResolveModeFlagBitsKHR)
is used.

If [VK_RESOLVE_MODE_AVERAGE_BIT](#VkResolveModeFlagBitsKHR) is used, and the source format is a
floating-point or normalized type, the sample values for each pixel are
resolved with implementation-defined numerical precision.

If the [numeric format](formats.html#formats-numericformat) of the resolve attachment
uses sRGB encoding, the implementation **should** convert samples from
nonlinear to linear before averaging samples as described in the “sRGB
EOTF” section of the [Khronos Data Format Specification](introduction.html#data-format).
In this case, the implementation **must** convert the linear averaged value to
nonlinear before writing the resolved result to resolve attachment.
If the [`maintenance10`](features.html#features-maintenance10) feature is enabled,
whether a nonlinear to linear conversion happens for sRGB resolve is defined
by
[`resolveSrgbFormatAppliesTransferFunction`](limits.html#limits-resolveSrgbFormatAppliesTransferFunction).
This behavior **can** be overridden with appropriate
`VK_*`*RESOLVE*{SKIP,ENABLE}_TRANSFER_FUNCTION_BIT_KHR flag usage.

|  | No range compression or Y′CBCR model conversion is performed by
| --- | --- |
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#VkResolveModeFlagBitsKHR); applications
have to do these conversions themselves.
Value outputs are expected to match those that would be read through a
[Y′CBCR sampler using ](textures.html#textures-sampler-YCbCr-conversion-modelconversion)[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](samplers.html#VkSamplerYcbcrModelConversionKHR).
The color space that the values should be in is defined by the platform and
is not exposed via Vulkan. |

// Provided by VK_VERSION_1_2
typedef VkFlags VkResolveModeFlags;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkResolveModeFlags
typedef VkResolveModeFlags VkResolveModeFlagsKHR;

`VkResolveModeFlags` is a bitmask type for setting a mask of zero or
more [VkResolveModeFlagBits](#VkResolveModeFlagBits).

An application records the commands for a render pass instance one subpass
at a time, by beginning a render pass instance, iterating over the subpasses
to record commands for that subpass, and then ending the render pass
instance.

To begin a render pass instance, call:

|  | This functionality is superseded by [vkCmdBeginRenderPass2](#vkCmdBeginRenderPass2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdBeginRenderPass(
    VkCommandBuffer                             commandBuffer,
    const VkRenderPassBeginInfo*                pRenderPassBegin,
    VkSubpassContents                           contents);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderPassBegin` is a pointer to a [VkRenderPassBeginInfo](#VkRenderPassBeginInfo)
structure specifying the render pass to begin an instance of, and the
framebuffer the instance uses.

* 
`contents` is a [VkSubpassContents](#VkSubpassContents) value specifying how the
commands in the first subpass will be provided.

After beginning a render pass instance, the command buffer is ready to
record the commands for the first subpass of that render pass.

Valid Usage

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00895) VUID-vkCmdBeginRenderPass-initialLayout-00895

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-01758) VUID-vkCmdBeginRenderPass-initialLayout-01758

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-02842) VUID-vkCmdBeginRenderPass-initialLayout-02842

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then the corresponding
attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass-stencilInitialLayout-02843) VUID-vkCmdBeginRenderPass-stencilInitialLayout-02843

If any of the `stencilInitialLayout` or `stencilFinalLayout`
member of the `VkAttachmentDescriptionStencilLayout` structures or
the `stencilLayout` member of the
`VkAttachmentReferenceStencilLayout` structures specified when
creating the render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then the corresponding
attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00897) VUID-vkCmdBeginRenderPass-initialLayout-00897

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00898) VUID-vkCmdBeginRenderPass-initialLayout-00898

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00899) VUID-vkCmdBeginRenderPass-initialLayout-00899

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00900) VUID-vkCmdBeginRenderPass-initialLayout-00900

If the `initialLayout` member of any of the
`VkAttachmentDescription` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is not [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), then each
such `initialLayout` **must** be equal to the current layout of the
corresponding attachment image subresource of the framebuffer specified
in the `framebuffer` member of `pRenderPassBegin`

* 
[](#VUID-vkCmdBeginRenderPass-srcStageMask-06451) VUID-vkCmdBeginRenderPass-srcStageMask-06451

The `srcStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass-dstStageMask-06452) VUID-vkCmdBeginRenderPass-dstStageMask-06452

The `dstStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass-framebuffer-02532) VUID-vkCmdBeginRenderPass-framebuffer-02532

For any attachment in `framebuffer` that is used by `renderPass`
and is bound to memory locations that are also bound to another
attachment used by `renderPass`, and if at least one of those uses
causes either attachment to be written to, both attachments **must** have
had the [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits) set

* 
[](#VUID-vkCmdBeginRenderPass-framebuffer-09045) VUID-vkCmdBeginRenderPass-framebuffer-09045

If any attachments specified in `framebuffer` are used by
`renderPass` and are bound to overlapping memory locations, there
**must** be only one that is used as a color attachment, depth/stencil, or
resolve attachment in any subpass

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-07000) VUID-vkCmdBeginRenderPass-initialLayout-07000

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with either the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and
either the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-07001) VUID-vkCmdBeginRenderPass-initialLayout-07001

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-09537) VUID-vkCmdBeginRenderPass-initialLayout-09537

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits)
usage flag set, or both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
and either of [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass-contents-09640) VUID-vkCmdBeginRenderPass-contents-09640

If `contents` is
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](#VkSubpassContents), then
at least one of the following features **must** be enabled:

[`maintenance7`](features.html#features-maintenance7)

* 
[`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginRenderPass-commandBuffer-parameter) VUID-vkCmdBeginRenderPass-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginRenderPass-pRenderPassBegin-parameter) VUID-vkCmdBeginRenderPass-pRenderPassBegin-parameter

 `pRenderPassBegin` **must** be a valid pointer to a valid [VkRenderPassBeginInfo](#VkRenderPassBeginInfo) structure

* 
[](#VUID-vkCmdBeginRenderPass-contents-parameter) VUID-vkCmdBeginRenderPass-contents-parameter

 `contents` **must** be a valid [VkSubpassContents](#VkSubpassContents) value

* 
[](#VUID-vkCmdBeginRenderPass-commandBuffer-recording) VUID-vkCmdBeginRenderPass-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginRenderPass-commandBuffer-cmdpool) VUID-vkCmdBeginRenderPass-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginRenderPass-renderpass) VUID-vkCmdBeginRenderPass-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginRenderPass-suspended) VUID-vkCmdBeginRenderPass-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginRenderPass-videocoding) VUID-vkCmdBeginRenderPass-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginRenderPass-bufferlevel) VUID-vkCmdBeginRenderPass-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdBeginRenderPass is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To begin a render pass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
void vkCmdBeginRenderPass2(
    VkCommandBuffer                             commandBuffer,
    const VkRenderPassBeginInfo*                pRenderPassBegin,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCmdBeginRenderPass2
void vkCmdBeginRenderPass2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderPassBeginInfo*                pRenderPassBegin,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderPassBegin` is a pointer to a [VkRenderPassBeginInfo](#VkRenderPassBeginInfo)
structure specifying the render pass to begin an instance of, and the
framebuffer the instance uses.
After recording this command, the render pass and framebuffer **may** be
accessed at any point that `commandBuffer` is in the recording or
pending state until it is reset.

* 
`pSubpassBeginInfo` is a pointer to a [VkSubpassBeginInfo](#VkSubpassBeginInfo)
structure containing information about the subpass which is about to
begin rendering.

After beginning a render pass instance, the command buffer is ready to
record the commands for the first subpass of that render pass.

Valid Usage

* 
[](#VUID-vkCmdBeginRenderPass2-framebuffer-02779) VUID-vkCmdBeginRenderPass2-framebuffer-02779

Both the `framebuffer` and `renderPass` members of
`pRenderPassBegin` **must** have been created on the same
[VkDevice](devsandqueues.html#VkDevice) that `commandBuffer` was allocated on

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03094) VUID-vkCmdBeginRenderPass2-initialLayout-03094

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03096) VUID-vkCmdBeginRenderPass2-initialLayout-03096

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-02844) VUID-vkCmdBeginRenderPass2-initialLayout-02844

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then the corresponding
attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass2-stencilInitialLayout-02845) VUID-vkCmdBeginRenderPass2-stencilInitialLayout-02845

If any of the `stencilInitialLayout` or `stencilFinalLayout`
member of the `VkAttachmentDescriptionStencilLayout` structures or
the `stencilLayout` member of the
`VkAttachmentReferenceStencilLayout` structures specified when
creating the render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) then the corresponding
attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03097) VUID-vkCmdBeginRenderPass2-initialLayout-03097

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03098) VUID-vkCmdBeginRenderPass2-initialLayout-03098

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03099) VUID-vkCmdBeginRenderPass2-initialLayout-03099

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03100) VUID-vkCmdBeginRenderPass2-initialLayout-03100

If the `initialLayout` member of any of the
`VkAttachmentDescription` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is not [VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout), then each
such `initialLayout` **must** be equal to the current layout of the
corresponding attachment image subresource of the framebuffer specified
in the `framebuffer` member of `pRenderPassBegin`

* 
[](#VUID-vkCmdBeginRenderPass2-srcStageMask-06453) VUID-vkCmdBeginRenderPass2-srcStageMask-06453

The `srcStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass2-dstStageMask-06454) VUID-vkCmdBeginRenderPass2-dstStageMask-06454

The `dstStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass2-framebuffer-02533) VUID-vkCmdBeginRenderPass2-framebuffer-02533

For any attachment in `framebuffer` that is used by `renderPass`
and is bound to memory locations that are also bound to another
attachment used by `renderPass`, and if at least one of those uses
causes either attachment to be written to, both attachments **must** have
had the [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](#VkAttachmentDescriptionFlagBits) set

* 
[](#VUID-vkCmdBeginRenderPass2-framebuffer-09046) VUID-vkCmdBeginRenderPass2-framebuffer-09046

If any attachments specified in `framebuffer` are used by
`renderPass` and are bound to overlapping memory locations, there
**must** be only one that is used as a color attachment, depth/stencil, or
resolve attachment in any subpass

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-07002) VUID-vkCmdBeginRenderPass2-initialLayout-07002

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with either the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set, and
either the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-07003) VUID-vkCmdBeginRenderPass2-initialLayout-07003

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-09538) VUID-vkCmdBeginRenderPass2-initialLayout-09538

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits)
usage flag set, or both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass2-flags-10652) VUID-vkCmdBeginRenderPass2-flags-10652

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) was included in the
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags` used to create
the `renderPass`, `commandBuffer` **must** not have been recorded
with [VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginRenderPass2-commandBuffer-parameter) VUID-vkCmdBeginRenderPass2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginRenderPass2-pRenderPassBegin-parameter) VUID-vkCmdBeginRenderPass2-pRenderPassBegin-parameter

 `pRenderPassBegin` **must** be a valid pointer to a valid [VkRenderPassBeginInfo](#VkRenderPassBeginInfo) structure

* 
[](#VUID-vkCmdBeginRenderPass2-pSubpassBeginInfo-parameter) VUID-vkCmdBeginRenderPass2-pSubpassBeginInfo-parameter

 `pSubpassBeginInfo` **must** be a valid pointer to a valid [VkSubpassBeginInfo](#VkSubpassBeginInfo) structure

* 
[](#VUID-vkCmdBeginRenderPass2-commandBuffer-recording) VUID-vkCmdBeginRenderPass2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginRenderPass2-commandBuffer-cmdpool) VUID-vkCmdBeginRenderPass2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginRenderPass2-renderpass) VUID-vkCmdBeginRenderPass2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginRenderPass2-suspended) VUID-vkCmdBeginRenderPass2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginRenderPass2-videocoding) VUID-vkCmdBeginRenderPass2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginRenderPass2-bufferlevel) VUID-vkCmdBeginRenderPass2-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdBeginRenderPass2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkRenderPassBeginInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkRenderPassBeginInfo {
    VkStructureType        sType;
    const void*            pNext;
    VkRenderPass           renderPass;
    VkFramebuffer          framebuffer;
    VkRect2D               renderArea;
    uint32_t               clearValueCount;
    const VkClearValue*    pClearValues;
} VkRenderPassBeginInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`renderPass` is the render pass to begin an instance of.

* 
`framebuffer` is the framebuffer containing the attachments that are
used with the render pass.

* 
`renderArea` is the render area that is affected by the render pass
instance, and is described in more detail below.

* 
`clearValueCount` is the number of elements in `pClearValues`.

* 
`pClearValues` is a pointer to an array of `clearValueCount`
[VkClearValue](clears.html#VkClearValue) structures containing clear values for each
attachment, if the attachment uses a `loadOp` value of
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp) or if the attachment has a
depth/stencil format and uses a `stencilLoadOp` value of
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp).
The array is indexed by attachment number.
Only elements corresponding to cleared attachments are used.
Other elements of `pClearValues` are ignored.

`renderArea` is the render area that is affected by the render pass
instance.
The effects of attachment load, store, and multisample resolve operations
are restricted to the pixels whose x and y coordinates fall within the
render area on all attachments.
The render area extends to all layers of `framebuffer`.
The application **must** ensure (using scissor if necessary) that all rendering
is contained within the render area.
The render area, after any transform specified by
[VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM)::`transform` is applied, **must**
be contained within the framebuffer dimensions.

If [render pass transform](vertexpostproc.html#vertexpostproc-renderpass-transform) is
enabled, then `renderArea` **must** equal the framebuffer pre-transformed
dimensions.
After `renderArea` has been transformed by
[VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM)::`transform`, the resulting
render area **must** be equal to the framebuffer dimensions.

If multiview is enabled in `renderPass`, and
[`multiviewPerViewRenderAreas`](features.html#features-multiviewPerViewRenderAreas)
feature is enabled, and there is an instance of
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM) included in the
`pNext` chain with `perViewRenderAreaCount` not equal to `0`, then
the elements of
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM)::`pPerViewRenderAreas`
override `renderArea` and define a render area for each view.
In this case, `renderArea` **must** be an area at least as large as the
union of all the per-view render areas.

If the [`subpassShading`](features.html#features-subpassShading) feature is enabled,
then `renderArea` **must** equal the framebuffer dimensions.

|  | There **may** be a performance cost for using a render area smaller than the
| --- | --- |
framebuffer, unless it matches the render area granularity for the render
pass. |

Valid Usage

* 
[](#VUID-VkRenderPassBeginInfo-clearValueCount-00902) VUID-VkRenderPassBeginInfo-clearValueCount-00902

`clearValueCount` **must** be greater than the largest attachment index
in `renderPass` specifying a `loadOp` (or `stencilLoadOp`,
if the attachment has a depth/stencil format) of
[VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp)

* 
[](#VUID-VkRenderPassBeginInfo-clearValueCount-04962) VUID-VkRenderPassBeginInfo-clearValueCount-04962

If `clearValueCount` is not `0`, `pClearValues` **must** be a valid
pointer to an array of `clearValueCount` [VkClearValue](clears.html#VkClearValue) unions

* 
[](#VUID-VkRenderPassBeginInfo-renderPass-00904) VUID-VkRenderPassBeginInfo-renderPass-00904

`renderPass` **must** be [compatible](#renderpass-compatibility) with
the `renderPass` member of the [VkFramebufferCreateInfo](#VkFramebufferCreateInfo)
structure specified when creating `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-None-08996) VUID-VkRenderPassBeginInfo-None-08996

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.extent.width` **must** be greater than 0

* 
[](#VUID-VkRenderPassBeginInfo-None-08997) VUID-VkRenderPassBeginInfo-None-08997

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.extent.height` **must** be greater than 0

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02850) VUID-VkRenderPassBeginInfo-pNext-02850

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.x` **must** be greater than or equal to 0

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02851) VUID-VkRenderPassBeginInfo-pNext-02851

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.y` **must** be greater than or equal to 0

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02852) VUID-VkRenderPassBeginInfo-pNext-02852

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.x` +  `renderArea.extent.width`
**must** be less than or equal to
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`width` the `framebuffer` was
created with

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02853) VUID-VkRenderPassBeginInfo-pNext-02853

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.y` +  `renderArea.extent.height`
**must** be less than or equal to
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`height` the `framebuffer` was
created with

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02856) VUID-VkRenderPassBeginInfo-pNext-02856

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo), `offset.x` + 
`extent.width` of each element of `pDeviceRenderAreas` **must** be
less than or equal to [VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`width` the
`framebuffer` was created with

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02857) VUID-VkRenderPassBeginInfo-pNext-02857

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo), `offset.y` + 
`extent.height` of each element of `pDeviceRenderAreas` **must**
be less than or equal to [VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`height` the
`framebuffer` was created with

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03207) VUID-VkRenderPassBeginInfo-framebuffer-03207

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that did not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), and the `pNext` chain
includes a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo) structure, its
`attachmentCount` **must** be zero

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03208) VUID-VkRenderPassBeginInfo-framebuffer-03208

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), the `attachmentCount` of
a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo) structure included in the
`pNext` chain **must** be equal to the value of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`attachmentImageInfoCount`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-02780) VUID-VkRenderPassBeginInfo-framebuffer-02780

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** have been created on
the same [VkDevice](devsandqueues.html#VkDevice) as `framebuffer` and `renderPass`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03209) VUID-VkRenderPassBeginInfo-framebuffer-03209

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a value of [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
equal to the `flags` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-12328) VUID-VkRenderPassBeginInfo-framebuffer-12328

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each `pAttachments`
member of [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo) that is used as a
resolve attachment by `renderPass` **must** not be bound to a
`VkDeviceMemory` object allocated from a `VkMemoryHeap` with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-04627) VUID-VkRenderPassBeginInfo-framebuffer-04627

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
with [an inherited usage](resources.html#resources-image-inherited-usage) equal to
the `usage` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03211) VUID-VkRenderPassBeginInfo-framebuffer-03211

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
with a width equal to the `width` member of the corresponding
element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03212) VUID-VkRenderPassBeginInfo-framebuffer-03212

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
with a height equal to the `height` member of the corresponding
element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03213) VUID-VkRenderPassBeginInfo-framebuffer-03213

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a value of
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`subresourceRange.layerCount` equal to
the `layerCount` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03214) VUID-VkRenderPassBeginInfo-framebuffer-03214

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a value of
[VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo)::`viewFormatCount` equal to the
`viewFormatCount` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03215) VUID-VkRenderPassBeginInfo-framebuffer-03215

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a set of elements in
[VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo)::`pViewFormats` equal to the set
of elements in the `pViewFormats` member of the corresponding
element of
[VkFramebufferAttachmentsCreateInfo](#VkFramebufferAttachmentsCreateInfo)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03216) VUID-VkRenderPassBeginInfo-framebuffer-03216

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a value of
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`format` equal to the corresponding
value of [VkAttachmentDescription](#VkAttachmentDescription)::`format` in `renderPass`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-09353) VUID-VkRenderPassBeginInfo-framebuffer-09353

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), and the
[    `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](fundamentals.html#VK_FALSE),
the format of the color attachment for each subpass that includes an
external format image as a resolve attachment **must** have a format equal
to the value of
[VkAndroidHardwareBufferFormatResolvePropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatResolvePropertiesANDROID)::`colorAttachmentFormat`
as returned by a call to
[vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) for the Android
hardware buffer that was used to create the image view use as its
resolve attachment

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-09354) VUID-VkRenderPassBeginInfo-framebuffer-09354

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a value of
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` equal to
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` in the `pNext`
chain of the corresponding [VkAttachmentDescription2](#VkAttachmentDescription2) structure used
to create `renderPass`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-09047) VUID-VkRenderPassBeginInfo-framebuffer-09047

If `framebuffer` was created with a
[VkFramebufferCreateInfo](#VkFramebufferCreateInfo)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](#VkFramebufferCreateFlagBits), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo)
structure included in the `pNext` chain **must** be a [VkImageView](resources.html#VkImageView)
of an image created with a value of
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`samples` equal to the corresponding value
of [VkAttachmentDescription](#VkAttachmentDescription)::`samples` in `renderPass`
, or [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) if `renderPass` was created with
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT) structure in the
`pNext` chain with `multisampledRenderToSingleSampledEnable`
equal to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02869) VUID-VkRenderPassBeginInfo-pNext-02869

If the `pNext` chain includes
[VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM), `renderArea.offset` **must**
equal (0,0)

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02870) VUID-VkRenderPassBeginInfo-pNext-02870

If the `pNext` chain includes
[VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM), `renderArea.extent`
transformed by [VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM)::`transform`
**must** equal the `framebuffer` dimensions

* 
[](#VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07859) VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07859

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM) structure
included in the `pNext` chain is not `0`, then the
[    `multiviewPerViewRenderAreas`](features.html#features-multiviewPerViewRenderAreas) feature **must** be enabled

* 
[](#VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07860) VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07860

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM) structure
included in the `pNext` chain is not `0`, then `renderArea`
**must** specify a render area that includes the union of all per view
render areas

* 
[](#VUID-VkRenderPassBeginInfo-pNext-09539) VUID-VkRenderPassBeginInfo-pNext-09539

If the `pNext` chain contains a [VkRenderPassStripeBeginInfoARM](#VkRenderPassStripeBeginInfoARM)
structure, the union of stripe areas defined by the elements of
[VkRenderPassStripeBeginInfoARM](#VkRenderPassStripeBeginInfoARM)::`pStripeInfos` **must** cover the
`renderArea`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassBeginInfo-sType-sType) VUID-VkRenderPassBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassBeginInfo-pNext-pNext) VUID-VkRenderPassBeginInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupRenderPassBeginInfo](#VkDeviceGroupRenderPassBeginInfo), [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM), [VkRenderPassAttachmentBeginInfo](#VkRenderPassAttachmentBeginInfo), [VkRenderPassPerformanceCountersByRegionBeginInfoARM](#VkRenderPassPerformanceCountersByRegionBeginInfoARM), [VkRenderPassSampleLocationsBeginInfoEXT](#VkRenderPassSampleLocationsBeginInfoEXT), [VkRenderPassStripeBeginInfoARM](#VkRenderPassStripeBeginInfoARM), or [VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM)

* 
[](#VUID-VkRenderPassBeginInfo-sType-unique) VUID-VkRenderPassBeginInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderPassBeginInfo-renderPass-parameter) VUID-VkRenderPassBeginInfo-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](#VkRenderPass) handle

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-parameter) VUID-VkRenderPassBeginInfo-framebuffer-parameter

 `framebuffer` **must** be a valid [VkFramebuffer](#VkFramebuffer) handle

* 
[](#VUID-VkRenderPassBeginInfo-commonparent) VUID-VkRenderPassBeginInfo-commonparent

 Both of `framebuffer`, and `renderPass` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The image layout of the depth aspect of a depth/stencil attachment referring
to an image created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits) is dependent
on the last sample locations used to render to the image subresource, thus
preserving the contents of such depth/stencil attachments across subpass
boundaries requires the application to specify these sample locations
whenever a layout transition of the attachment **may** occur.
This information **can** be provided by adding a
`VkRenderPassSampleLocationsBeginInfoEXT` structure to the `pNext`
chain of `VkRenderPassBeginInfo`.

The `VkRenderPassSampleLocationsBeginInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_sample_locations
typedef struct VkRenderPassSampleLocationsBeginInfoEXT {
    VkStructureType                          sType;
    const void*                              pNext;
    uint32_t                                 attachmentInitialSampleLocationsCount;
    const VkAttachmentSampleLocationsEXT*    pAttachmentInitialSampleLocations;
    uint32_t                                 postSubpassSampleLocationsCount;
    const VkSubpassSampleLocationsEXT*       pPostSubpassSampleLocations;
} VkRenderPassSampleLocationsBeginInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentInitialSampleLocationsCount` is the number of elements in
the `pAttachmentInitialSampleLocations` array.

* 
`pAttachmentInitialSampleLocations` is a pointer to an array of
`attachmentInitialSampleLocationsCount`
[VkAttachmentSampleLocationsEXT](#VkAttachmentSampleLocationsEXT) structures specifying the
attachment indices and their corresponding sample location state.
Each element of `pAttachmentInitialSampleLocations` **can** specify the
sample location state to use in the automatic layout transition
performed to transition a depth/stencil attachment from the initial
layout of the attachment to the image layout specified for the
attachment in the first subpass using it.

* 
`postSubpassSampleLocationsCount` is the number of elements in the
`pPostSubpassSampleLocations` array.

* 
`pPostSubpassSampleLocations` is a pointer to an array of
`postSubpassSampleLocationsCount` [VkSubpassSampleLocationsEXT](#VkSubpassSampleLocationsEXT)
structures specifying the subpass indices and their corresponding sample
location state.
Each element of `pPostSubpassSampleLocations` **can** specify the
sample location state to use in the automatic layout transition
performed to transition the depth/stencil attachment used by the
specified subpass to the image layout specified in a dependent subpass
or to the final layout of the attachment in case the specified subpass
is the last subpass using that attachment.
In addition, if
[VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT)::`variableSampleLocations`
is [VK_FALSE](fundamentals.html#VK_FALSE), each element of `pPostSubpassSampleLocations`
**must** specify the sample location state that matches the sample
locations used by all pipelines that will be bound to a command buffer
during the specified subpass.
If `variableSampleLocations` is [VK_TRUE](fundamentals.html#VK_TRUE), the sample locations
used for rasterization do not depend on
`pPostSubpassSampleLocations`.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassSampleLocationsBeginInfoEXT-sType-sType) VUID-VkRenderPassSampleLocationsBeginInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_SAMPLE_LOCATIONS_BEGIN_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassSampleLocationsBeginInfoEXT-pAttachmentInitialSampleLocations-parameter) VUID-VkRenderPassSampleLocationsBeginInfoEXT-pAttachmentInitialSampleLocations-parameter

 If `attachmentInitialSampleLocationsCount` is not `0`, `pAttachmentInitialSampleLocations` **must** be a valid pointer to an array of `attachmentInitialSampleLocationsCount` valid [VkAttachmentSampleLocationsEXT](#VkAttachmentSampleLocationsEXT) structures

* 
[](#VUID-VkRenderPassSampleLocationsBeginInfoEXT-pPostSubpassSampleLocations-parameter) VUID-VkRenderPassSampleLocationsBeginInfoEXT-pPostSubpassSampleLocations-parameter

 If `postSubpassSampleLocationsCount` is not `0`, `pPostSubpassSampleLocations` **must** be a valid pointer to an array of `postSubpassSampleLocationsCount` valid [VkSubpassSampleLocationsEXT](#VkSubpassSampleLocationsEXT) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

The `VkAttachmentSampleLocationsEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_sample_locations
typedef struct VkAttachmentSampleLocationsEXT {
    uint32_t                    attachmentIndex;
    VkSampleLocationsInfoEXT    sampleLocationsInfo;
} VkAttachmentSampleLocationsEXT;

* 
`attachmentIndex` is the index of the attachment for which the
sample locations state is provided.

* 
`sampleLocationsInfo` is the sample locations state to use for the
layout transition of the given attachment from the initial layout of the
attachment to the image layout specified for the attachment in the first
subpass using it.

If the image referenced by the framebuffer attachment at index
`attachmentIndex` was not created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits) then the
values specified in `sampleLocationsInfo` are ignored.

Valid Usage

* 
[](#VUID-VkAttachmentSampleLocationsEXT-attachmentIndex-01531) VUID-VkAttachmentSampleLocationsEXT-attachmentIndex-01531

`attachmentIndex` **must** be less than the `attachmentCount`
specified in [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) the render pass specified by
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderPass` was created with

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentSampleLocationsEXT-sampleLocationsInfo-parameter) VUID-VkAttachmentSampleLocationsEXT-sampleLocationsInfo-parameter

 `sampleLocationsInfo` **must** be a valid [VkSampleLocationsInfoEXT](primsrast.html#VkSampleLocationsInfoEXT) structure

The `VkSubpassSampleLocationsEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_sample_locations
typedef struct VkSubpassSampleLocationsEXT {
    uint32_t                    subpassIndex;
    VkSampleLocationsInfoEXT    sampleLocationsInfo;
} VkSubpassSampleLocationsEXT;

* 
`subpassIndex` is the index of the subpass for which the sample
locations state is provided.

* 
`sampleLocationsInfo` is the sample locations state to use for the
layout transition of the depth/stencil attachment away from the image
layout the attachment is used with in the subpass specified in
`subpassIndex`.

If the image referenced by the depth/stencil attachment used in the subpass
identified by `subpassIndex` was not created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits) or if the
subpass does not use a depth/stencil attachment, and
[VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT)::`variableSampleLocations`
is [VK_TRUE](fundamentals.html#VK_TRUE) then the values specified in `sampleLocationsInfo` are
ignored.

Valid Usage

* 
[](#VUID-VkSubpassSampleLocationsEXT-subpassIndex-01532) VUID-VkSubpassSampleLocationsEXT-subpassIndex-01532

`subpassIndex` **must** be less than the `subpassCount` specified
in [VkRenderPassCreateInfo](#VkRenderPassCreateInfo) the render pass specified by
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderPass` was created with

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassSampleLocationsEXT-sampleLocationsInfo-parameter) VUID-VkSubpassSampleLocationsEXT-sampleLocationsInfo-parameter

 `sampleLocationsInfo` **must** be a valid [VkSampleLocationsInfoEXT](primsrast.html#VkSampleLocationsInfoEXT) structure

To begin a render pass instance with [render pass transform](vertexpostproc.html#vertexpostproc-renderpass-transform) enabled, add the
[VkRenderPassTransformBeginInfoQCOM](#VkRenderPassTransformBeginInfoQCOM) to the `pNext` chain of
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo) structure passed to the
[vkCmdBeginRenderPass](#vkCmdBeginRenderPass) command specifying the render pass transform.

The `VkRenderPassTransformBeginInfoQCOM` structure is defined as:

// Provided by VK_QCOM_render_pass_transform
typedef struct VkRenderPassTransformBeginInfoQCOM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSurfaceTransformFlagBitsKHR    transform;
} VkRenderPassTransformBeginInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR) value
describing the transform to be applied to rasterization.

Valid Usage

* 
[](#VUID-VkRenderPassTransformBeginInfoQCOM-transform-02871) VUID-VkRenderPassTransformBeginInfoQCOM-transform-02871

`transform` **must** be [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR),
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR),
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR), or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)

* 
[](#VUID-VkRenderPassTransformBeginInfoQCOM-flags-02872) VUID-VkRenderPassTransformBeginInfoQCOM-flags-02872

The `renderpass` **must** have been created with
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)::`flags` containing
[VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](#VkRenderPassCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassTransformBeginInfoQCOM-sType-sType) VUID-VkRenderPassTransformBeginInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_TRANSFORM_BEGIN_INFO_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

The tile properties queried using [VK_QCOM_tile_properties](../appendices/extensions.html#VK_QCOM_tile_properties) depend on
the size of the reserved tile memory by the application.
This size **can** be specified by the following structure to
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo), [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)
, or [VkRenderingInfo](#VkRenderingInfo)
to specify the reserved tile memory size for the render pass object.

For dynamic render passes, this structure **can** be attached to the
`pNext` member of [VkRenderingInfo](#VkRenderingInfo) passed to
[vkGetDynamicRenderingTilePropertiesQCOM](#vkGetDynamicRenderingTilePropertiesQCOM).

The `VkTileMemorySizeInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_memory_heap with VK_QCOM_tile_properties
typedef struct VkTileMemorySizeInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       size;
} VkTileMemorySizeInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`size` is the size in bytes of tile memory used by the render pass
or preserved for later use.

The returned tile properties are invalid if the `size` is not equal to
the [bound tile memory’s](memory.html#memory-bind-tile-memory) allocation size when
the render pass is executed.

If this structure is not provided, the `size` of the reserved region
defaults to `0`.

|  | Tile memory is reserved for application use by binding tile memory objects
| --- | --- |
to the command buffer.

The size provided by this command is informational only for use when
evaluating tile properties.
If the application does not need to query the tile properties, then this
size **can** be safely omitted. |

Valid Usage

* 
[](#VUID-VkTileMemorySizeInfoQCOM-size-10729) VUID-VkTileMemorySizeInfoQCOM-size-10729

`size` must be less than or equal to the largest size memory heap
with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property

Valid Usage (Implicit)

* 
[](#VUID-VkTileMemorySizeInfoQCOM-sType-sType) VUID-VkTileMemorySizeInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_MEMORY_SIZE_INFO_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)

* 
[VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)

* 
[VkRenderingInfo](#VkRenderingInfo)

The `VkSubpassBeginInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`contents` is a [VkSubpassContents](#VkSubpassContents) value specifying how the
commands in the next subpass will be provided.

Valid Usage

* 
[](#VUID-VkSubpassBeginInfo-contents-09382) VUID-VkSubpassBeginInfo-contents-09382

If `contents` is
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](#VkSubpassContents), then
at least one of the following features **must** be enabled:

[`maintenance7`](features.html#features-maintenance7)

* 
[`nestedCommandBuffer`](features.html#features-nestedCommandBuffer)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassBeginInfo-sType-sType) VUID-VkSubpassBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubpassBeginInfo-pNext-pNext) VUID-VkSubpassBeginInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSubpassBeginInfo-contents-parameter) VUID-VkSubpassBeginInfo-contents-parameter

 `contents` **must** be a valid [VkSubpassContents](#VkSubpassContents) value

Possible values of [vkCmdBeginRenderPass](#vkCmdBeginRenderPass)::`contents`, specifying
how the commands in the first subpass will be provided, are:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
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
[VK_SUBPASS_CONTENTS_INLINE](#VkSubpassContents) specifies that the contents of the
subpass will be recorded inline in the primary command buffer, and
secondary command buffers **must** not be executed within the subpass.

* 
[VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS](#VkSubpassContents) specifies that the
contents are recorded in secondary command buffers that will be called
from the primary command buffer, and [vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands) is the
only valid command in the command buffer until [vkCmdNextSubpass](#vkCmdNextSubpass) or
[vkCmdEndRenderPass](#vkCmdEndRenderPass).

* 
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](#VkSubpassContents)
specifies that the contents of the subpass **can** be recorded both inline
and in secondary command buffers executed from this command buffer with
[vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands).

If the `pNext` chain of [VkRenderPassBeginInfo](#VkRenderPassBeginInfo)
or [VkRenderingInfo](#VkRenderingInfo)
includes a `VkDeviceGroupRenderPassBeginInfo` structure, then that
structure includes a device mask and set of render areas for the render pass
instance.

The `VkDeviceGroupRenderPassBeginInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupRenderPassBeginInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceMask;
    uint32_t           deviceRenderAreaCount;
    const VkRect2D*    pDeviceRenderAreas;
} VkDeviceGroupRenderPassBeginInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkDeviceGroupRenderPassBeginInfo
typedef VkDeviceGroupRenderPassBeginInfo VkDeviceGroupRenderPassBeginInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceMask` is the device mask for the render pass instance.

* 
`deviceRenderAreaCount` is the number of elements in the
`pDeviceRenderAreas` array.

* 
`pDeviceRenderAreas` is a pointer to an array of [VkRect2D](fundamentals.html#VkRect2D)
structures defining the render area for each physical device.

The `deviceMask` serves several purposes.
It is an upper bound on the set of physical devices that **can** be used during
the render pass instance, and the initial device mask when the render pass
instance begins.
In addition, commands transitioning to the next subpass in a render pass
instance and commands ending the render pass instance, and, accordingly
render pass [load](#renderpass-load-operations),
[store](#renderpass-store-operations), and [multisample resolve](#renderpass-resolve-operations) operations and subpass dependencies corresponding to
the render pass instance, are executed on the physical devices included in
the device mask provided here.

If `deviceRenderAreaCount` is not zero, then the elements of
`pDeviceRenderAreas` override the value of
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderArea`, and provide a render area
specific to each physical device.
These render areas serve the same purpose as
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderArea`, including controlling the
region of attachments that are cleared by [VK_ATTACHMENT_LOAD_OP_CLEAR](#VkAttachmentLoadOp)
and that are resolved into resolve attachments.

If this structure is not present, the render pass instance’s device mask is
the value of [VkDeviceGroupCommandBufferBeginInfo](cmdbuffers.html#VkDeviceGroupCommandBufferBeginInfo)::`deviceMask`.
If this structure is not present or if `deviceRenderAreaCount` is zero,
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderArea` is used for all physical
devices.

Valid Usage

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-deviceMask-00905) VUID-VkDeviceGroupRenderPassBeginInfo-deviceMask-00905

`deviceMask` **must** be a valid device mask value

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-deviceMask-00906) VUID-VkDeviceGroupRenderPassBeginInfo-deviceMask-00906

`deviceMask` **must** not be zero

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-deviceMask-00907) VUID-VkDeviceGroupRenderPassBeginInfo-deviceMask-00907

`deviceMask` **must** be a subset of the command buffer’s initial
device mask

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-deviceRenderAreaCount-00908) VUID-VkDeviceGroupRenderPassBeginInfo-deviceRenderAreaCount-00908

`deviceRenderAreaCount` **must** either be zero or equal to the number
of physical devices in the logical device

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-offset-06166) VUID-VkDeviceGroupRenderPassBeginInfo-offset-06166

The `offset.x` member of any element of `pDeviceRenderAreas`
**must** be greater than or equal to 0

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-offset-06167) VUID-VkDeviceGroupRenderPassBeginInfo-offset-06167

The `offset.y` member of any element of `pDeviceRenderAreas`
**must** be greater than or equal to 0

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-offset-06168) VUID-VkDeviceGroupRenderPassBeginInfo-offset-06168

The sum of the `offset.x` and `extent.width` members of any
element of `pDeviceRenderAreas` **must** be less than or equal to
[`maxFramebufferWidth`](limits.html#limits-maxFramebufferWidth)

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-offset-06169) VUID-VkDeviceGroupRenderPassBeginInfo-offset-06169

The sum of the `offset.y` and `extent.height` members of any
element of `pDeviceRenderAreas` **must** be less than or equal to
[`maxFramebufferHeight`](limits.html#limits-maxFramebufferHeight)

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-extent-08998) VUID-VkDeviceGroupRenderPassBeginInfo-extent-08998

The `extent.width` member of any element of `pDeviceRenderAreas`
**must** be greater than 0

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-extent-08999) VUID-VkDeviceGroupRenderPassBeginInfo-extent-08999

The `extent.height` member of any element of
`pDeviceRenderAreas` **must** be greater than 0

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-sType-sType) VUID-VkDeviceGroupRenderPassBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceGroupRenderPassBeginInfo-pDeviceRenderAreas-parameter) VUID-VkDeviceGroupRenderPassBeginInfo-pDeviceRenderAreas-parameter

 If `deviceRenderAreaCount` is not `0`, `pDeviceRenderAreas` **must** be a valid pointer to an array of `deviceRenderAreaCount` [VkRect2D](fundamentals.html#VkRect2D) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

* 
[VkRenderingInfo](#VkRenderingInfo)

The `VkRenderPassAttachmentBeginInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkRenderPassAttachmentBeginInfo {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              attachmentCount;
    const VkImageView*    pAttachments;
} VkRenderPassAttachmentBeginInfo;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkRenderPassAttachmentBeginInfo
typedef VkRenderPassAttachmentBeginInfo VkRenderPassAttachmentBeginInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentCount` is the number of attachments.

* 
`pAttachments` is a pointer to an array of `VkImageView`
handles, each of which will be used as the corresponding attachment in
the render pass instance.

Valid Usage

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03218) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03218

Each element of `pAttachments` **must** only specify a single mip level

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03219) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03219

Each element of `pAttachments` **must** have been created with the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-04114) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-04114

Each element of `pAttachments` **must** have been created with
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`viewType` not equal to
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-07010) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-07010

If
[multisampled-render-to-single-sampled](#subpass-multisampledrendertosinglesampled)
is enabled for any subpass, all element of `pAttachments` which have
a sample count equal to [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) **must** have a format
that supports the sample count specified in
[VkMultisampledRenderToSingleSampledInfoEXT](#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-sType-sType) VUID-VkRenderPassAttachmentBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-parameter) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-parameter

 If `attachmentCount` is not `0`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkImageView](resources.html#VkImageView) handles

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

If a render pass instance enables multiview and if the
[`multiviewPerViewRenderAreas`](features.html#features-multiviewPerViewRenderAreas)
feature is enabled, the
`VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM` structure **can** be
included in the `pNext` chain of [VkRenderPassBeginInfo](#VkRenderPassBeginInfo)
or [VkRenderingInfo](#VkRenderingInfo)

The `VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM` structure is
defined as:

// Provided by VK_QCOM_multiview_per_view_render_areas
typedef struct VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           perViewRenderAreaCount;
    const VkRect2D*    pPerViewRenderAreas;
} VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`perViewRenderAreaCount` is the number of elements in the
`pPerViewRenderAreas` array.

* 
`pPerViewRenderAreas` is a pointer to an array of [VkRect2D](fundamentals.html#VkRect2D)
structures defining the render area for each view.

If `perViewRenderAreaCount` is not zero, then the elements of
`pPerViewRenderAreas` override the value of
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderArea`
or [VkRenderingInfo](#VkRenderingInfo)::`renderArea`
and define per-view render areas for the individual views of a multiview
render pass.
The render area for the view with *view index* `i` is specified by
`pPerViewRenderAreas`[i].

The per-view render areas define per-view regions of attachments that are
loaded, stored, and resolved according to the `loadOp`, `storeOp`,
and `resolveMode` values of the render pass instance.
When per-view render areas are defined, the value of
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderArea`
or [VkRenderingInfo](#VkRenderingInfo)::`renderArea`
**must** be a render area that includes the union of all per-view render areas,
**may** be used by the implementation for optimizations, but does not affect
loads, stores, or resolves.

If this structure is present and if `perViewRenderAreaCount` is not
zero, then `perViewRenderAreaCount` **must** be at least one greater than
the most significant bit set in any element of
[VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo)::`pViewMasks`.
or [VkRenderingInfo](#VkRenderingInfo)::`viewMask`

If this structure is not present or if `perViewRenderAreaCount` is zero,
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)::`renderArea`
or [VkRenderingInfo](#VkRenderingInfo)::`renderArea`
is used for all views.

Valid Usage

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07861) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07861

The `offset.x` member of any element of `pPerViewRenderAreas`
**must** be greater than or equal to 0

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07862) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07862

The `offset.y` member of any element of `pPerViewRenderAreas`
**must** be greater than or equal to 0

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07863) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07863

The sum of the `offset.x` and `extent.width` members of any
element of `pPerViewRenderAreas` **must** be less than or equal to
[`maxFramebufferWidth`](limits.html#limits-maxFramebufferWidth)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07864) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07864

The sum of the `offset.y` and `extent.height` members of any
element of `pPerViewRenderAreas` **must** be less than or equal to
[`maxFramebufferHeight`](limits.html#limits-maxFramebufferHeight)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07865) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07865

If this structure is in the `pNext` chain of
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo) and if the render pass object included an
element in [VkRenderPassMultiviewCreateInfo](#VkRenderPassMultiviewCreateInfo)::`pViewMasks` that
set bit `n`, then `perViewRenderAreaCount` **must** be at least equal
to `n+1`

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07866) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07866

If this structure is in the `pNext` chain of [VkRenderingInfo](#VkRenderingInfo)
and if [VkRenderingInfo](#VkRenderingInfo)::`viewMask` set bit `n`, then
`perViewRenderAreaCount` **must** be at least equal to `n+1`

Valid Usage (Implicit)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-sType-sType) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_RENDER_AREAS_RENDER_PASS_BEGIN_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pPerViewRenderAreas-parameter) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pPerViewRenderAreas-parameter

 If `perViewRenderAreaCount` is not `0`, `pPerViewRenderAreas` **must** be a valid pointer to an array of `perViewRenderAreaCount` [VkRect2D](fundamentals.html#VkRect2D) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo)

* 
[VkRenderingInfo](#VkRenderingInfo)

To query the render area granularity, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetRenderAreaGranularity(
    VkDevice                                    device,
    VkRenderPass                                renderPass,
    VkExtent2D*                                 pGranularity);

* 
`device` is the logical device that owns the render pass.

* 
`renderPass` is a handle to a render pass.

* 
`pGranularity` is a pointer to a [VkExtent2D](fundamentals.html#VkExtent2D) structure in which
the granularity is returned.

The conditions leading to an optimal `renderArea` are:

* 
the `offset.x` member in `renderArea` is a multiple of the
`width` member of the returned [VkExtent2D](fundamentals.html#VkExtent2D) (the horizontal
granularity).

* 
the `offset.y` member in `renderArea` is a multiple of the
`height` member of the returned [VkExtent2D](fundamentals.html#VkExtent2D) (the vertical
granularity).

* 
either the `extent.width` member in `renderArea` is a multiple
of the horizontal granularity or `offset.x`+`extent.width` is
equal to the `width` of the `framebuffer` in the
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo).

* 
either the `extent.height` member in `renderArea` is a multiple
of the vertical granularity or `offset.y`+`extent.height` is
equal to the `height` of the `framebuffer` in the
[VkRenderPassBeginInfo](#VkRenderPassBeginInfo).

Subpass dependencies are not affected by the render area, and apply to the
entire image subresources attached to the framebuffer as specified in the
description of [automatic layout transitions](#renderpass-layout-transitions).
Similarly, pipeline barriers are valid even if their effect extends outside
the render area.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRenderAreaGranularity-device-parameter) VUID-vkGetRenderAreaGranularity-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetRenderAreaGranularity-renderPass-parameter) VUID-vkGetRenderAreaGranularity-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](#VkRenderPass) handle

* 
[](#VUID-vkGetRenderAreaGranularity-pGranularity-parameter) VUID-vkGetRenderAreaGranularity-pGranularity-parameter

 `pGranularity` **must** be a valid pointer to a [VkExtent2D](fundamentals.html#VkExtent2D) structure

* 
[](#VUID-vkGetRenderAreaGranularity-renderPass-parent) VUID-vkGetRenderAreaGranularity-renderPass-parent

 `renderPass` **must** have been created, allocated, or retrieved from `device`

To transition to the next subpass in the render pass instance after
recording the commands for a subpass, call:

|  | This functionality is superseded by [vkCmdNextSubpass2](#vkCmdNextSubpass2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdNextSubpass(
    VkCommandBuffer                             commandBuffer,
    VkSubpassContents                           contents);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`contents` specifies how the commands in the next subpass will be
provided, in the same fashion as the corresponding parameter of
[vkCmdBeginRenderPass](#vkCmdBeginRenderPass).

The subpass index for a render pass begins at zero when
`vkCmdBeginRenderPass` is recorded, and increments each time
`vkCmdNextSubpass` is recorded.

After transitioning to the next subpass, the application **can** record the
commands for that subpass.

Valid Usage

* 
[](#VUID-vkCmdNextSubpass-None-00909) VUID-vkCmdNextSubpass-None-00909

The current subpass index **must** be less than the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdNextSubpass-None-02349) VUID-vkCmdNextSubpass-None-02349

This command **must** not be recorded when transform feedback is active

Valid Usage (Implicit)

* 
[](#VUID-vkCmdNextSubpass-commandBuffer-parameter) VUID-vkCmdNextSubpass-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdNextSubpass-contents-parameter) VUID-vkCmdNextSubpass-contents-parameter

 `contents` **must** be a valid [VkSubpassContents](#VkSubpassContents) value

* 
[](#VUID-vkCmdNextSubpass-commandBuffer-recording) VUID-vkCmdNextSubpass-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdNextSubpass-commandBuffer-cmdpool) VUID-vkCmdNextSubpass-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdNextSubpass-renderpass) VUID-vkCmdNextSubpass-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdNextSubpass-suspended) VUID-vkCmdNextSubpass-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdNextSubpass-videocoding) VUID-vkCmdNextSubpass-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdNextSubpass-bufferlevel) VUID-vkCmdNextSubpass-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdNextSubpass is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To transition to the next subpass in the render pass instance after
recording the commands for a subpass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
void vkCmdNextSubpass2(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCmdNextSubpass2
void vkCmdNextSubpass2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pSubpassBeginInfo` is a pointer to a [VkSubpassBeginInfo](#VkSubpassBeginInfo)
structure containing information about the subpass which is about to
begin rendering.

* 
`pSubpassEndInfo` is a pointer to a [VkSubpassEndInfo](#VkSubpassEndInfo) structure
containing information about how the previous subpass will be ended.

`vkCmdNextSubpass2` is semantically identical to [vkCmdNextSubpass](#vkCmdNextSubpass),
except that it is extensible, and that `contents` is provided as part of
an extensible structure instead of as a flat parameter.

Valid Usage

* 
[](#VUID-vkCmdNextSubpass2-None-03102) VUID-vkCmdNextSubpass2-None-03102

The current subpass index **must** be less than the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdNextSubpass2-None-02350) VUID-vkCmdNextSubpass2-None-02350

This command **must** not be recorded when transform feedback is active

Valid Usage (Implicit)

* 
[](#VUID-vkCmdNextSubpass2-commandBuffer-parameter) VUID-vkCmdNextSubpass2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdNextSubpass2-pSubpassBeginInfo-parameter) VUID-vkCmdNextSubpass2-pSubpassBeginInfo-parameter

 `pSubpassBeginInfo` **must** be a valid pointer to a valid [VkSubpassBeginInfo](#VkSubpassBeginInfo) structure

* 
[](#VUID-vkCmdNextSubpass2-pSubpassEndInfo-parameter) VUID-vkCmdNextSubpass2-pSubpassEndInfo-parameter

 `pSubpassEndInfo` **must** be a valid pointer to a valid [VkSubpassEndInfo](#VkSubpassEndInfo) structure

* 
[](#VUID-vkCmdNextSubpass2-commandBuffer-recording) VUID-vkCmdNextSubpass2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdNextSubpass2-commandBuffer-cmdpool) VUID-vkCmdNextSubpass2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdNextSubpass2-renderpass) VUID-vkCmdNextSubpass2-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdNextSubpass2-suspended) VUID-vkCmdNextSubpass2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdNextSubpass2-videocoding) VUID-vkCmdNextSubpass2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdNextSubpass2-bufferlevel) VUID-vkCmdNextSubpass2-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdNextSubpass2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record a command to end a render pass instance after recording the
commands for the last subpass, call:

|  | This functionality is superseded by [vkCmdEndRenderPass2](#vkCmdEndRenderPass2). See [Legacy Functionality](../appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdEndRenderPass(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer in which to end the current
render pass instance.

Ending a render pass instance performs any multisample resolve operations on
the final subpass.

|  | There is no implicit ordering between separate render passes, even in the
| --- | --- |
same command buffer, and even when the attachments match.
Some applications rely on the continuation of
[rasterization order](primsrast.html#primsrast-order) between multiple render passes with
attachments defined in the same way, in order to perform non-rendering
operations (such as copies or compute operations) between draw calls, but
this has never been required by the specification.
There is also no explicit barrier currently in the API that provides the
guarantee that applications rely on without additional performance
penalties.

New applications should avoid relying on this ordering until an appropriate
barrier is added to the API.

Implementations where applications are performing this splitting are
encouraged to continue supporting this guarantee until a suitable barrier is
added to the API.

Existing applications relying on this ordering should expect that it will
continue working on platforms where it currently does.
Once a new extension adds support for a new barrier, developers are
encouraged to adapt their applications to use this when available. |

Valid Usage

* 
[](#VUID-vkCmdEndRenderPass-None-00910) VUID-vkCmdEndRenderPass-None-00910

The current subpass index **must** be equal to the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdEndRenderPass-None-02351) VUID-vkCmdEndRenderPass-None-02351

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdEndRenderPass-None-06170) VUID-vkCmdEndRenderPass-None-06170

The current render pass instance **must** not have been begun with
[vkCmdBeginRendering](#vkCmdBeginRendering)

* 
[](#VUID-vkCmdEndRenderPass-None-07004) VUID-vkCmdEndRenderPass-None-07004

If `vkCmdBeginQuery`* was called within a subpass of the render
pass, the corresponding `vkCmdEndQuery`* **must** have been called
subsequently within the same subpass

* 
[](#VUID-vkCmdEndRenderPass-None-10653) VUID-vkCmdEndRenderPass-None-10653

This command **must** not be recorded when
[per-tile execution model](#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndRenderPass-commandBuffer-parameter) VUID-vkCmdEndRenderPass-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndRenderPass-commandBuffer-recording) VUID-vkCmdEndRenderPass-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndRenderPass-commandBuffer-cmdpool) VUID-vkCmdEndRenderPass-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndRenderPass-renderpass) VUID-vkCmdEndRenderPass-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndRenderPass-suspended) VUID-vkCmdEndRenderPass-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndRenderPass-videocoding) VUID-vkCmdEndRenderPass-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndRenderPass-bufferlevel) VUID-vkCmdEndRenderPass-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdEndRenderPass is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record a command to end a render pass instance after recording the
commands for the last subpass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
void vkCmdEndRenderPass2(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCmdEndRenderPass2
void vkCmdEndRenderPass2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

* 
`commandBuffer` is the command buffer in which to end the current
render pass instance.

* 
`pSubpassEndInfo` is a pointer to a [VkSubpassEndInfo](#VkSubpassEndInfo) structure
containing information about how the last subpass will be ended.

`vkCmdEndRenderPass2` is semantically identical to
[vkCmdEndRenderPass](#vkCmdEndRenderPass), except that it is extensible.

|  | There is no implicit ordering between separate render passes, even in the
| --- | --- |
same command buffer, and even when the attachments match.
Some applications rely on the continuation of
[rasterization order](primsrast.html#primsrast-order) between multiple render passes with
attachments defined in the same way, in order to perform non-rendering
operations (such as copies or compute operations) between draw calls, but
this has never been required by the specification.
There is also no explicit barrier currently in the API that provides the
guarantee that applications rely on without additional performance
penalties.

New applications should avoid relying on this ordering until an appropriate
barrier is added to the API.

Implementations where applications are performing this splitting are
encouraged to continue supporting this guarantee until a suitable barrier is
added to the API.

Existing applications relying on this ordering should expect that it will
continue working on platforms where it currently does.
Once a new extension adds support for a new barrier, developers are
encouraged to adapt their applications to use this when available. |

Valid Usage

* 
[](#VUID-vkCmdEndRenderPass2-None-03103) VUID-vkCmdEndRenderPass2-None-03103

The current subpass index **must** be equal to the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdEndRenderPass2-None-02352) VUID-vkCmdEndRenderPass2-None-02352

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdEndRenderPass2-None-06171) VUID-vkCmdEndRenderPass2-None-06171

The current render pass instance **must** not have been begun with
[vkCmdBeginRendering](#vkCmdBeginRendering)

* 
[](#VUID-vkCmdEndRenderPass2-None-07005) VUID-vkCmdEndRenderPass2-None-07005

If `vkCmdBeginQuery`* was called within a subpass of the render
pass, the corresponding `vkCmdEndQuery`* **must** have been called
subsequently within the same subpass

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndRenderPass2-commandBuffer-parameter) VUID-vkCmdEndRenderPass2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndRenderPass2-pSubpassEndInfo-parameter) VUID-vkCmdEndRenderPass2-pSubpassEndInfo-parameter

 `pSubpassEndInfo` **must** be a valid pointer to a valid [VkSubpassEndInfo](#VkSubpassEndInfo) structure

* 
[](#VUID-vkCmdEndRenderPass2-commandBuffer-recording) VUID-vkCmdEndRenderPass2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndRenderPass2-commandBuffer-cmdpool) VUID-vkCmdEndRenderPass2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndRenderPass2-renderpass) VUID-vkCmdEndRenderPass2-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndRenderPass2-suspended) VUID-vkCmdEndRenderPass2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndRenderPass2-videocoding) VUID-vkCmdEndRenderPass2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndRenderPass2-bufferlevel) VUID-vkCmdEndRenderPass2-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdEndRenderPass2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkSubpassEndInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassEndInfo {
    VkStructureType    sType;
    const void*        pNext;
} VkSubpassEndInfo;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassEndInfo
typedef VkSubpassEndInfo VkSubpassEndInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassEndInfo-sType-sType) VUID-VkSubpassEndInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_END_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubpassEndInfo-pNext-pNext) VUID-VkSubpassEndInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkRenderPassFragmentDensityMapOffsetEndInfoEXT](#VkRenderPassFragmentDensityMapOffsetEndInfoEXT)

* 
[](#VUID-VkSubpassEndInfo-sType-unique) VUID-VkSubpassEndInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

If the [VkSubpassEndInfo](#VkSubpassEndInfo)::`pNext` chain
or [VkRenderingEndInfoEXT](#VkRenderingEndInfoEXT)::`pNext` chain
includes a `VkRenderPassFragmentDensityMapOffsetEndInfoEXT` structure,
then that structure includes an array of fragment density map offsets per
layer for the render pass.

The `VkRenderPassFragmentDensityMapOffsetEndInfoEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map_offset
typedef struct VkRenderPassFragmentDensityMapOffsetEndInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             fragmentDensityOffsetCount;
    const VkOffset2D*    pFragmentDensityOffsets;
} VkRenderPassFragmentDensityMapOffsetEndInfoEXT;

// Provided by VK_QCOM_fragment_density_map_offset
// Equivalent to VkRenderPassFragmentDensityMapOffsetEndInfoEXT
typedef VkRenderPassFragmentDensityMapOffsetEndInfoEXT VkSubpassFragmentDensityMapOffsetEndInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fragmentDensityOffsetCount` is the number of offsets being
specified.

* 
`pFragmentDensityOffsets` is a pointer to an array of
[VkOffset2D](fundamentals.html#VkOffset2D) structs, each of which describes the offset per layer.

The array elements are given per `layer` as defined by
[Fetch Density Value](fragmentdensitymapops.html#fragmentdensitymap-fetch-density-value), where
index = layer.
Each (x,y) offset is in framebuffer pixels and shifts the fetch of the
fragment density map by that amount.
Offsets can be positive or negative.

If neither the [VkSubpassEndInfo](#VkSubpassEndInfo)::`pNext` chain for the last
subpass of a render pass nor the [VkRenderingEndInfoEXT](#VkRenderingEndInfoEXT)::`pNext`
chain of a dynamic render pass include
`VkRenderPassFragmentDensityMapOffsetEndInfoEXT`, or if
`fragmentDensityOffsetCount` is zero, then the offset (0,0) is
used for [Fetch Density Value](fragmentdensitymapops.html#fragmentdensitymap-fetch-density-value).

Valid Usage

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapOffsets-06503) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapOffsets-06503

If the [    `fragmentDensityMapOffset`](features.html#features-fragmentDensityMapOffset) feature is not enabled or fragment
density map is not enabled in the render pass,
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapAttachment-06504) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapAttachment-06504

If
[VkRenderPassFragmentDensityMapCreateInfoEXT](#VkRenderPassFragmentDensityMapCreateInfoEXT)::`fragmentDensityMapAttachment`
is not [VK_ATTACHMENT_UNUSED](#VK_ATTACHMENT_UNUSED) and was not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](resources.html#VkImageCreateFlagBits),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pDepthStencilAttachment-06505) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pDepthStencilAttachment-06505

If the depth or stencil attachments for the render pass are used and
were not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](resources.html#VkImageCreateFlagBits),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pInputAttachments-06506) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pInputAttachments-06506

If any used input attachments for the render pass were not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](resources.html#VkImageCreateFlagBits),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pColorAttachments-06507) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pColorAttachments-06507

If any used color attachments for the render pass were not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](resources.html#VkImageCreateFlagBits),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pResolveAttachments-06508) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pResolveAttachments-06508

If any used resolve attachments for the render pass were not created
with [VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](resources.html#VkImageCreateFlagBits),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pPreserveAttachments-06509) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pPreserveAttachments-06509

If any used preserve attachments for the render pass were not created
with [VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](resources.html#VkImageCreateFlagBits),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06510) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06510

If `fragmentDensityOffsetCount` is not `0` and multiview is enabled
for the render pass, `fragmentDensityOffsetCount` **must** equal the
`layerCount` that was specified in creating the fragment density map
attachment view

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06511) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06511

If `fragmentDensityOffsetCount` is not `0` and multiview is not
enabled for the render pass, `fragmentDensityOffsetCount` **must**
equal `1`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-x-06512) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-x-06512

The `x` component of each element of `pFragmentDensityOffsets`
**must** be an integer multiple of
`fragmentDensityOffsetGranularity.width`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-y-06513) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-y-06513

The `y` component of each element of `pFragmentDensityOffsets`
**must** be an integer multiple of
`fragmentDensityOffsetGranularity.height`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-10730) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-10730

Each element of `pFragmentDensityOffsets` **must** be identical for
every [vkCmdEndRendering2KHR](#vkCmdEndRendering2KHR) call made in a render pass

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-sType-sType) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-parameter) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-parameter

 If `fragmentDensityOffsetCount` is not `0`, `pFragmentDensityOffsets` **must** be a valid pointer to an array of `fragmentDensityOffsetCount` [VkOffset2D](fundamentals.html#VkOffset2D) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingEndInfoKHR](#VkRenderingEndInfoKHR)

* 
[VkSubpassEndInfo](#VkSubpassEndInfo)

A `VkRenderPassCreationControlEXT` structure **can** be included in the
`pNext` chain of `VkRenderPassCreateInfo2` or `pNext` chain of
[VkSubpassDescription2](#VkSubpassDescription2).
The `VkRenderPassCreationControlEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassCreationControlEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           disallowMerging;
} VkRenderPassCreationControlEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`disallowMerging` is a boolean value indicating whether subpass
merging will be disabled.

If a `VkRenderPassCreationControlEXT` structure is included in the
`pNext` chain of [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2) and its value of
`disallowMerging` is [VK_TRUE](fundamentals.html#VK_TRUE), the implementation will disable
subpass merging for the entire render pass.
If a `VkRenderPassCreationControlEXT` structure is included in the
`pNext` chain of [VkSubpassDescription2](#VkSubpassDescription2) and its value of
`disallowMerging` is [VK_TRUE](fundamentals.html#VK_TRUE), the implementation will disable
merging the described subpass with previous subpasses in the render pass.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreationControlEXT-sType-sType) VUID-VkRenderPassCreationControlEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_CONTROL_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)

* 
[VkSubpassDescription2](#VkSubpassDescription2)

To obtain feedback about the creation of a render pass, include a
`VkRenderPassCreationFeedbackCreateInfoEXT` structure in the `pNext`
chain of [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2).
The `VkRenderPassCreationFeedbackCreateInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassCreationFeedbackCreateInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkRenderPassCreationFeedbackInfoEXT*    pRenderPassFeedback;
} VkRenderPassCreationFeedbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pRenderPassFeedback` is a pointer to a
[VkRenderPassCreationFeedbackInfoEXT](#VkRenderPassCreationFeedbackInfoEXT) structure in which feedback is
returned.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreationFeedbackCreateInfoEXT-sType-sType) VUID-VkRenderPassCreationFeedbackCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_FEEDBACK_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassCreationFeedbackCreateInfoEXT-pRenderPassFeedback-parameter) VUID-VkRenderPassCreationFeedbackCreateInfoEXT-pRenderPassFeedback-parameter

 `pRenderPassFeedback` **must** be a valid pointer to a [VkRenderPassCreationFeedbackInfoEXT](#VkRenderPassCreationFeedbackInfoEXT) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)

The `VkRenderPassCreationFeedbackInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassCreationFeedbackInfoEXT {
    uint32_t    postMergeSubpassCount;
} VkRenderPassCreationFeedbackInfoEXT;

* 
`postMergeSubpassCount` is the subpass count after merge.

Feedback about the creation of a subpass **can** be obtained by including a
`VkRenderPassSubpassFeedbackCreateInfoEXT` structure in the `pNext`
chain of [VkSubpassDescription2](#VkSubpassDescription2).
`VkRenderPassSubpassFeedbackCreateInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassSubpassFeedbackCreateInfoEXT {
    VkStructureType                        sType;
    const void*                            pNext;
    VkRenderPassSubpassFeedbackInfoEXT*    pSubpassFeedback;
} VkRenderPassSubpassFeedbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pSubpassFeedback` is a pointer to a
[VkRenderPassSubpassFeedbackInfoEXT](#VkRenderPassSubpassFeedbackInfoEXT) structure in which feedback is
returned.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-sType-sType) VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_SUBPASS_FEEDBACK_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-pSubpassFeedback-parameter) VUID-VkRenderPassSubpassFeedbackCreateInfoEXT-pSubpassFeedback-parameter

 `pSubpassFeedback` **must** be a valid pointer to a [VkRenderPassSubpassFeedbackInfoEXT](#VkRenderPassSubpassFeedbackInfoEXT) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDescription2](#VkSubpassDescription2)

The `VkRenderPassSubpassFeedbackInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read). See [Legacy Functionality](../appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkRenderPassSubpassFeedbackInfoEXT {
    VkSubpassMergeStatusEXT    subpassMergeStatus;
    char                       description[VK_MAX_DESCRIPTION_SIZE];
    uint32_t                   postMergeIndex;
} VkRenderPassSubpassFeedbackInfoEXT;

* 
`subpassMergeStatus` is a [VkSubpassMergeStatusEXT](#VkSubpassMergeStatusEXT) value
specifying information about whether the subpass is merged with the
previous subpass and the reason why it is not merged.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which provides additional
details.

* 
`postMergeIndex` is the subpass index after the subpass merging.

Possible values of
`VkRenderPassSubpassFeedbackInfoEXT`:subpassMergeStatus are:

// Provided by VK_EXT_subpass_merge_feedback
typedef enum VkSubpassMergeStatusEXT {
    VK_SUBPASS_MERGE_STATUS_MERGED_EXT = 0,
    VK_SUBPASS_MERGE_STATUS_DISALLOWED_EXT = 1,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SIDE_EFFECTS_EXT = 2,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SAMPLES_MISMATCH_EXT = 3,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_VIEWS_MISMATCH_EXT = 4,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_ALIASING_EXT = 5,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPENDENCIES_EXT = 6,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INCOMPATIBLE_INPUT_ATTACHMENT_EXT = 7,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_TOO_MANY_ATTACHMENTS_EXT = 8,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INSUFFICIENT_STORAGE_EXT = 9,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPTH_STENCIL_COUNT_EXT = 10,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_RESOLVE_ATTACHMENT_REUSE_EXT = 11,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SINGLE_SUBPASS_EXT = 12,
    VK_SUBPASS_MERGE_STATUS_NOT_MERGED_UNSPECIFIED_EXT = 13,
} VkSubpassMergeStatusEXT;

* 
[VK_SUBPASS_MERGE_STATUS_MERGED_EXT](#VkSubpassMergeStatusEXT) specifies that the subpass is
merged with a previous subpass.

* 
[VK_SUBPASS_MERGE_STATUS_DISALLOWED_EXT](#VkSubpassMergeStatusEXT) specifies that the subpass
is not merged because merging was disabled using
[VkRenderPassCreationControlEXT](#VkRenderPassCreationControlEXT).
If the render pass does not allow subpass merging, then all subpass
statuses are set to this value.
If a subpass description does not allow subpass merging, then only that
subpass’s status is set to this value.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SIDE_EFFECTS_EXT](#VkSubpassMergeStatusEXT) specifies that
the subpass is not merged because it contains side effects.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SAMPLES_MISMATCH_EXT](#VkSubpassMergeStatusEXT) specifies
that the subpass is not merged because sample count is not compatible
with the previous subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_VIEWS_MISMATCH_EXT](#VkSubpassMergeStatusEXT) specifies
that the subpass is not merged because view masks do not match with
previous subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_ALIASING_EXT](#VkSubpassMergeStatusEXT) specifies that the
subpass is not merged because of attachments aliasing between them.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPENDENCIES_EXT](#VkSubpassMergeStatusEXT) specifies that
the subpass is not merged because subpass dependencies do not allow
merging.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INCOMPATIBLE_INPUT_ATTACHMENT_EXT](#VkSubpassMergeStatusEXT)
specifies that the subpass is not merged because input attachment is not
a color attachment from previous subpass or the formats are
incompatible.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_TOO_MANY_ATTACHMENTS_EXT](#VkSubpassMergeStatusEXT)
specifies that the subpass is not merged because of too many
attachments.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_INSUFFICIENT_STORAGE_EXT](#VkSubpassMergeStatusEXT)
specifies that the subpass is not merged because of insufficient memory.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_DEPTH_STENCIL_COUNT_EXT](#VkSubpassMergeStatusEXT)
specifies that the subpass is not merged because of too many
depth/stencil attachments.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_RESOLVE_ATTACHMENT_REUSE_EXT](#VkSubpassMergeStatusEXT)
specifies that the subpass is not merged because a resolve attachment is
reused as an input attachment in a subsequent subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_SINGLE_SUBPASS_EXT](#VkSubpassMergeStatusEXT) specifies
that the subpass is not merged because the render pass has only one
subpass.

* 
[VK_SUBPASS_MERGE_STATUS_NOT_MERGED_UNSPECIFIED_EXT](#VkSubpassMergeStatusEXT) specifies that
the subpass is not merged for unspecified reasons.
Implementations **should** return this value when no other
[VkSubpassMergeStatusEXT](#VkSubpassMergeStatusEXT) value is appropriate.

Due to the complexity of how rendering is performed, there are several ways
an application can accidentally introduce a data race, usually by doing
something that may seem benign but actually cannot be supported.
This section indicates a number of the more common cases as guidelines to
help avoid them.

Vulkan includes read-only layouts for depth/stencil images, that allow the
images to be both read during a render pass for the purposes of
depth/stencil tests, and read as a non-attachment.

However, because [VK_ATTACHMENT_STORE_OP_STORE](#VkAttachmentStoreOp) and
[VK_ATTACHMENT_STORE_OP_DONT_CARE](#VkAttachmentStoreOp) may perform write operations, even if
no recorded command writes to an attachment, reading from an image while
also using it as an attachment with these store operations can result in a
data race.
If the reads from the non-attachment are performed in a fragment shader
where the accessed samples match those covered by the fragment shader, no
data race will occur as store operations are guaranteed to operate after
fragment shader execution for the set of samples the fragment covers.
Notably, input attachments can also be used for this case.
Reading other samples or in any other shader stage can result in unexpected
behavior due to the potential for a data race, and validation errors should
be generated for doing so.
In practice, many applications have shipped reading samples outside of the
covered fragment without any observable issue, but there is no guarantee
that this will always work, and it is not advisable to rely on this in new
or re-worked code bases.
As [VK_ATTACHMENT_STORE_OP_NONE](#VkAttachmentStoreOp) is guaranteed to perform no writes,
applications wishing to read an image as both an attachment and a
non-attachment should make use of this store operation, coupled with a load
operation that also performs no writes.

When relying on non-overlapping accesses between attachments and other
resources, it is important to note that [load](#renderpass-load-operations)
and [store](#renderpass-store-operations) operations have fairly wide
alignment requirements - potentially affecting entire subresources and
adjacent depth/stencil aspects.
This makes it invalid to access a non-attachment subresource that is
simultaneously being used as an attachment where either access performs a
write operation.

The only exception to this is if a subresource is explicitly specified for
use as a feedback loop attachment.
Feedback loop is enabled for an attachment if either of the following
conditions are satisfied:

* 
The corresponding attachment is in the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
For the attachment identified by
[VkRenderingAttachmentInfo](#VkRenderingAttachmentInfo)::`imageView`,
[VkAttachmentFeedbackLoopInfoEXT](#VkAttachmentFeedbackLoopInfoEXT)::`feedbackLoopEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

In that case the overlap is defined to occur at a per-pixel granularity, and
applications can read data from pixels outside the render area without
introducing a data race.

In addition to the attachment layout requirements, extra state **must** be set
for non-attachment uses to be valid.
For every image aspect accessed with feedback loops, one of the following
conditions **must** be satisfied:

* 
The feedback loop attachment is a color attachment, and the bound
pipeline was created with
[VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits).

* 
The feedback loop attachment is a depth-stencil attachment, and the
bound pipeline was created with
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits).

* 

There is no bound pipeline or the bound pipeline was created with
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](pipelines.html#VkDynamicState) and the
`aspectMask` state in [vkCmdSetAttachmentFeedbackLoopEnableEXT](#vkCmdSetAttachmentFeedbackLoopEnableEXT)
has been set and not subsequently [    invalidated](pipelines.html#dynamic-state-lifetime) in the current command buffer, and `aspectMask`
includes all aspects which require feedback loop.

When rendering to only the depth OR stencil aspect of an image, an input
attachment accessing the other aspect will
not cause a data race only under very specific conditions.
To avoid a data race, the aspect not being written **must** be in a read-only
layout, and writes to it **must** be disabled in the draw state.
For example, to read from stencil while writing depth, the attachment **must**
be in [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) (or
equivalent), and the stencil write mask **must** be 0.
Similarly to read from depth while writing stencil, the attachment **must** be
in [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) (or
equivalent), and depth write enable **must** be [VK_FALSE](fundamentals.html#VK_FALSE).

There are several synchronization options available to synchronize between
accesses to resources within a render pass.
Some of the options are outlined below:

* 
A [VkSubpassDependency](#VkSubpassDependency) in a render pass object can synchronize
attachment writes and [multisample    resolve operations](#renderpass-resolve-operations) from a prior subpass for subsequent input
attachment reads.

* 
A [vkCmdPipelineBarrier](synchronization.html#vkCmdPipelineBarrier) inside a subpass can synchronize prior
attachment writes in the subpass with subsequent input attachment reads.

* 
A [vkCmdPipelineBarrier](synchronization.html#vkCmdPipelineBarrier) inside a subpass can synchronize prior
attachment writes in the subpass with subsequent non-attachment reads if
[feedback loop is enabled](#renderpass-feedbackloop) for the attachment.

* 
If a subresource is used as a color and input attachment, and the
pipeline performing the read was created with
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](framebuffer.html#VkPipelineColorBlendStateCreateFlagBits)

* 
If a subresource is used as a depth and input attachment, and the
pipeline performing the read was created with
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits)

* 
If a subresource is used as a stencil and input attachment, and the
pipeline performing the read was created with
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits)

* 
If a subresource is used as two separate non-attachment resources,
writes to a pixel or individual sample in a fragment shader can be
synchronized with access to the same pixel or sample in another fragment
shader by using one of the [fragment    interlock](shaders.html#shaders-scope-fragment-interlock) execution modes.

Tile shading **can** be enabled within a render pass.

To enable tile shading for a render pass object, add a
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM) to the `pNext` chain of
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)
or [VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)
.
To enable tile shading for a dynamic render pass, add a
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM) to the `pNext` chain of
[VkRenderingInfo](#VkRenderingInfo).
To execute a secondary command buffer within a render pass, add a
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM) to the `pNext` chain of
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo) when the secondary command buffer is
recorded.

The `VkRenderPassTileShadingCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkRenderPassTileShadingCreateInfoQCOM {
    VkStructureType                     sType;
    const void*                         pNext;
    VkTileShadingRenderPassFlagsQCOM    flags;
    VkExtent2D                          tileApronSize;
} VkRenderPassTileShadingCreateInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkTileShadingRenderPassFlagBitsQCOM](#VkTileShadingRenderPassFlagBitsQCOM).

* 
`tileApronSize` is a [VkExtent2D](fundamentals.html#VkExtent2D) describing the is size of the
[tiling apron](#renderpass-tile-shading-aprons) in each dimension.

If this structure is not present, the render pass will have `flags` set
to `0` and `tileApronSize` is set to `(0,0)`.

Valid Usage

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShading-10658) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShading-10658

If the [`tileShading`](features.html#features-tileShading) feature is not
enabled, [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) **must** not be
included in `flags`

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10659) VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10659

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) is not included in
`flags` or the [`tileShadingApron`](features.html#features-tileShadingApron)
feature is not enabled, `tileApronSize` **must** be `(0,0)`

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10660) VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10660

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) is not included in
`flags`, or neither the
[tileShadingPerTileDispatch](features.html#features-tileShadingPerTileDispatch) and
[tileShadingPerTileDraw](features.html#features-tileShadingPerTileDraw) features are
enabled, `flags` **must** not include
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShadingAnisotropicApron-10661) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShadingAnisotropicApron-10661

If the [    `tileShadingAnisotropicApron`](features.html#features-tileShadingAnisotropicApron) feature is not enabled,
`tileApronSize.x` and **must** be equal to `tileApronSize.y`

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10662) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10662

`tileApronSize.x` **must** be less than or equal to
[`maxApronSize`](limits.html#limits-maxApronSize)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10663) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10663

`tileApronSize.y` **must** be less than or equal to
[`maxApronSize`](limits.html#limits-maxApronSize)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-sType-sType) VUID-VkRenderPassTileShadingCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_TILE_SHADING_CREATE_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-parameter) VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-parameter

 `flags` **must** be a valid combination of [VkTileShadingRenderPassFlagBitsQCOM](#VkTileShadingRenderPassFlagBitsQCOM) values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkRenderPassCreateInfo](#VkRenderPassCreateInfo)

* 
[VkRenderPassCreateInfo2](#VkRenderPassCreateInfo2)

* 
[VkRenderingInfo](#VkRenderingInfo)

Bits which **can** be set in
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`flags` describing
additional properties of the render pass are:

// Provided by VK_QCOM_tile_shading
typedef enum VkTileShadingRenderPassFlagBitsQCOM {
    VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM = 0x00000001,
    VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM = 0x00000002,
} VkTileShadingRenderPassFlagBitsQCOM;

* 
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) specifies that the
render pass has tile shading enabled.

* 
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](#VkTileShadingRenderPassFlagBitsQCOM) specifies
that the secondary command buffer will be executed within a
[per-tile execution block](#renderpass-per-tile-execution-model).

// Provided by VK_QCOM_tile_shading
typedef VkFlags VkTileShadingRenderPassFlagsQCOM;

`VkTileShadingRenderPassFlagsQCOM` is a bitmask type for setting a mask
of zero or more [VkTileShadingRenderPassFlagBitsQCOM](#VkTileShadingRenderPassFlagBitsQCOM).

Within a [tile shading render pass](#renderpass-tile-shading), fragment and
compute shader invocations **can** use the [Tile Attachment Interface](interfaces.html#interfaces-tile-attachment) to perform load/store, operations on *storage tile
attachment* variables, to perform load operations on *input tile attachment*
variables, and to perform sampling operations on *sampled tile attachment*
variables.
*Storage tile attachment*, *sampled tile attachment*, and *input tile
attachment* variables **must** be declared and used as described in the tile
attachment interface.

In a render pass that [enables](#renderpass-tile-shading) tile shading, a
*tiling apron* **can** be enabled by setting
[VkRenderPassTileShadingCreateInfoQCOM](#VkRenderPassTileShadingCreateInfoQCOM)::`tileApronSize` to a value
other than (0,0).
Additionally, subpass `flags` **must** include
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](#VkSubpassDescriptionFlagBits)
if the render pass is not a dynamic render pass
or the apron size for that subpass will be (0,0).
The tile apron enables shader invocations to load from tile attachment
variables at a location that is outside the current tile.
The `width` and `height` value of `tileApronSize` specifies the
number of pixels in the horizontal and vertical directions that are included
in the apron region.
For example, (1,1) means that the apron region extends the top, bottom,
left, and right margins of the tile by 1 pixel.
The `tileApronSize` **must** not exceed
[VkPhysicalDeviceTileShadingPropertiesQCOM](limits.html#VkPhysicalDeviceTileShadingPropertiesQCOM)::maxApronSize.

|  | A good mental model for the tiling apron is to think of it as enabling
| --- | --- |
"overlapping tiles".
The top/bottom and left/right margins of each tile are extended to include a
few pixels of the adjacent tiles.
Those pixels that are outside the original tile extents, but within the
apron extents are “apron pixels”.
In a render pass that enables tile shading, apron pixels will be initialized
by the [VkAttachmentLoadOp](#VkAttachmentLoadOp), and **may** be updated by any draw within the
render pass, but are always discarded and never written by
[VkAttachmentStoreOp](#VkAttachmentStoreOp).
Apron pixels **can** be read as a result of using `OpImageRead`,
`OpImageSparseRead`, `OpImageSample*`, `OpImageSparseSample*`,
`OpImage*Gather`, `OpImageSparse*Gather`,
`OpImageSampleWeightedQCOM`, OpImageBoxFilterQCOM,
OpImageBlockMatch*QCOM,
`OpImageFetch`, or `OpImageSparseFetch` but **cannot** be written using
`OpImageWrite` or with atomic operations using
`OpImageTexelPointer`.

For image processing use cases, the tiling apron allows fragment and compute
shader invocations to read or sample color attachment pixels within the
neighborhood of a given fragment, even if the given fragment is close to a
tile edge.

Enabling the apron **may** reduce the GPU efficiency, with larger apron sizes
having a greater potential impact.
Aprons **should** be enabled only when needing to access pixels outside the
tile. |

Image operations that access a tile attachment **can** use normalized,
unnormalized, or integer texel coordinates, but the final set of (i,j,[k])
integer texel coordinates accessed in [texel filtering](textures.html#textures-texel-filtering) **must** be within the extents of the current tile and apron as
well as within the render pass `renderArea`.
Any out of bounds shader access will result in poison.

The [robustImageAccess](features.html#features-robustImageAccess) and
[robustImageAccess2](features.html#features-robustImageAccess2) features do not apply to
tile attachment accesses.

The built-in variables
[`TileOffsetQCOM`](interfaces.html#interfaces-builtin-variables-tileoffset),
[TileApronSizeQCOM](interfaces.html#interfaces-builtin-variables-tileapronsize), and
[`TileDimensionQCOM`](interfaces.html#interfaces-builtin-variables-tilesize) define the
extent of the current tile and apron.

For *storage tile attachment* stores using `OpImageWrite` and with an
`Image` operand from storage class `TileAttachmentQCOM`, the
`Coordinate` operand    **must** specify a framebuffer location
within the render pass `renderArea` and within the extent of the tile.

  

  

For *storage tile attachment* using `OpImageRead` or
`OpImageSparseRead`, or *input tile attachment* loads using
`OpImageRead`, and with an `Image` operand from storage class
`TileAttachmentQCOM`, the `Coordinate` operand    **must**
specify a framebuffer location within the render pass `renderArea` and
within the combined extent of the tile and apron.

  

  

where:

   represents `offset` operand to
`OpImageWrite`

   represents `offset` operand to
`OpImageRead`

   represents
[TileOffsetQCOM](interfaces.html#interfaces-builtin-variables-tileoffset)

   represents
[TileDimensionQCOM](interfaces.html#interfaces-builtin-variables-tilesize)

   represents the render pass
`renderArea.offset`

   represents the render pass
`renderArea.extent`

   represents
[TileApronSizeQCOM](interfaces.html#interfaces-builtin-variables-tileapronsize)

For *storage tile attachment* atomic operations using
`OpImageTexelPointer`, the `Coordinate` operand **must** specify a
framebuffer location within the render pass `RenderArea` and within the
extent of the tile.
The `Coordinate` **must** not point to the apron region.

When accessing a *sampled tile attachment* using `OpImageSample*`,
`OpImageSparseSample*`, `OpImageFetch`, `OpImageSparseFetch*`,
`OpImageSampleWeightedQCOM`, OpImageBoxFilterQCOM,
OpImageBlockMatch*QCOM,
`OpImage*Gather`, or `OpImageSparse*Gather`, and with an `Image`
operand from storage class `TileAttachmentQCOM`, the `Coordinate`
operand **must** not result in a any texels accessed that are outside the
`renderArea` or outside the combined extent of the tile and apron.

|  | It is the application’s responsibility to guarantee that the instruction and
| --- | --- |
texture coordinates do not cause any out of bounds texels to be accessed as
a result of loads, stores, atomics, or the sampling filter.
In practice, this may require that the coordinates are clamped in the shader
code. |

If *tile shading* is [enabled](#renderpass-tile-shading) for a render pass
instance, then [framebuffer-local dependencies](synchronization.html#synchronization-framebuffer-regions) defined using [VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits) specify a
[framebuffer region](synchronization.html#synchronization-framebuffer-regions) equal to the
region covered by the *active tile*.

When [per-tile execution model](#renderpass-per-tile-execution-model) is
enabled an *active tile* is associated with each of the per-tile command
invocations with an extent described by shader built-in variables
[`TileOffsetQCOM`](interfaces.html#interfaces-builtin-variables-tileoffset),
[`TileDimensionQCOM`](interfaces.html#interfaces-builtin-variables-tilesize), and
[`TileApronSizeQCOM`](interfaces.html#interfaces-builtin-variables-tileapronsize).
Otherwise, the extent of the *active tile* is defined by the tile exposed by
`[VK_QCOM_tile_properties](../appendices/extensions.html#VK_QCOM_tile_properties)` that contains the framebuffer coordinate
   of the fragment being processed.

|  | Without tile shading the [*framebuffer region*](synchronization.html#synchronization-framebuffer-regions) described by [VK_DEPENDENCY_BY_REGION_BIT](synchronization.html#VkDependencyFlagBits) must be assumed by
| --- | --- |
applications to be no larger than a single pixel or single sample.

The larger tile-sized *framebuffer region* provided by tile shading allows
applications to achieve increased rendering efficiency on some tiling
architectures.
It enables synchronization commands with a framebuffer-local dependency to
be used for a dependency across fragments with different framebuffer
coordinates, as long as the fragments are located within the same tile.
In this situation, it avoids an otherwise required framebuffer-global
dependency and corresponding data flushing to memory as noted in the
[synchronization chapter](synchronization.html#synchronization-framebuffer-regions). |

Within a [tile shading render pass](#renderpass-tile-shading) instance, the
per-tile execution model can be enabled.

To enable the per-tile execution model, call:

// Provided by VK_QCOM_tile_shading
void vkCmdBeginPerTileExecutionQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkPerTileBeginInfoQCOM*               pPerTileBeginInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pPerTileBeginInfo` is a pointer to a [VkPerTileBeginInfoQCOM](#VkPerTileBeginInfoQCOM)
structure containing information about how the *per-tile execution
model* is started.

When *per-tile execution model* is enabled, recorded `vkCmdDraw*` or
`vkCmdDispatch*` commands are invoked per tile.
That is, the recorded draw or dispatch is invoked exactly once for each
*covered tile*.
The set of *covered tiles* for a given render pass instance consists of the
set of render pass tiles, which **can** be queried with
`[VK_QCOM_tile_properties](../appendices/extensions.html#VK_QCOM_tile_properties)`, that are completely or partially covered
by the `renderArea` for the render pass instance.
The draw or dispatch commands **may** be invoked for uncovered tiles.

Each per-tile command invocation is associated with a single tile, the
*active tile*.
These per-tile invocations are not specified to execute in any particular
order, but the size and offset of the *active tile* is available via shader
built-ins.

When *per-tile execution model* is enabled, the following restrictions
apply:

* 
Transform feedback commands such as
[vkCmdBeginTransformFeedbackEXT](vertexpostproc.html#vkCmdBeginTransformFeedbackEXT),
[vkCmdEndTransformFeedbackEXT](vertexpostproc.html#vkCmdEndTransformFeedbackEXT), [vkCmdBeginQueryIndexedEXT](queries.html#vkCmdBeginQueryIndexedEXT), and
[vkCmdEndQueryIndexedEXT](queries.html#vkCmdEndQueryIndexedEXT), **must** not be recorded.

* 
Query commands such as [vkCmdWriteTimestamp](queries.html#vkCmdWriteTimestamp),
[vkCmdDebugMarkerBeginEXT](debugging.html#vkCmdDebugMarkerBeginEXT), [vkCmdDebugMarkerEndEXT](debugging.html#vkCmdDebugMarkerEndEXT),
[vkCmdDebugMarkerInsertEXT](debugging.html#vkCmdDebugMarkerInsertEXT),
[vkCmdBeginQuery](queries.html#vkCmdBeginQuery), and [vkCmdEndQuery](queries.html#vkCmdEndQuery), **must** not be recorded.

* 
Event commands such as
[vkCmdWaitEvents2](synchronization.html#vkCmdWaitEvents2) and
    [vkCmdWaitEvents](synchronization.html#vkCmdWaitEvents) **must** not be recorded.

* 
Render pass clears like [vkCmdClearAttachments](clears.html#vkCmdClearAttachments) **must** not be
recorded

* 
Access of an attachment with layout
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) as provided
by `[VK_EXT_attachment_feedback_loop_layout](../appendices/extensions.html#VK_EXT_attachment_feedback_loop_layout)` is disallowed

* 
Any commands that would cause a invocations of one of the following
shader stages are not allowed

tessellation

* 
geometry

* 
ray tracing

* 
mesh shading

Valid Usage

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-None-10664) VUID-vkCmdBeginPerTileExecutionQCOM-None-10664

The current render pass **must** be a [tile    shading render pass](#renderpass-tile-shading)

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-None-10665) VUID-vkCmdBeginPerTileExecutionQCOM-None-10665

The [tileShadingPerTileDispatch](features.html#features-tileShadingPerTileDispatch)
or [tileShadingPerTileDraw](features.html#features-tileShadingPerTileDraw) feature
must be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-parameter) VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-pPerTileBeginInfo-parameter) VUID-vkCmdBeginPerTileExecutionQCOM-pPerTileBeginInfo-parameter

 `pPerTileBeginInfo` **must** be a valid pointer to a valid [VkPerTileBeginInfoQCOM](#VkPerTileBeginInfoQCOM) structure

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-recording) VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-cmdpool) VUID-vkCmdBeginPerTileExecutionQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-renderpass) VUID-vkCmdBeginPerTileExecutionQCOM-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginPerTileExecutionQCOM-videocoding) VUID-vkCmdBeginPerTileExecutionQCOM-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBeginPerTileExecutionQCOM is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkPerTileBeginInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPerTileBeginInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
} VkPerTileBeginInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkPerTileBeginInfoQCOM-sType-sType) VUID-VkPerTileBeginInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PER_TILE_BEGIN_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerTileBeginInfoQCOM-pNext-pNext) VUID-VkPerTileBeginInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

To disable per-tile execution model, call:

// Provided by VK_QCOM_tile_shading
void vkCmdEndPerTileExecutionQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkPerTileEndInfoQCOM*                 pPerTileEndInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pPerTileEndInfo` is a pointer to a [VkPerTileEndInfoQCOM](#VkPerTileEndInfoQCOM)
structure containing information about how the *per-tile execution
model* is ended.

This command disables *per-tile execution model*.

Valid Usage

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-None-10666) VUID-vkCmdEndPerTileExecutionQCOM-None-10666

The *per-tile execution model* **must** have been enabled in the current
render pass

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-None-10667) VUID-vkCmdEndPerTileExecutionQCOM-None-10667

The current render pass **must** be a [tile    shading render pass](#renderpass-tile-shading)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-parameter) VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-pPerTileEndInfo-parameter) VUID-vkCmdEndPerTileExecutionQCOM-pPerTileEndInfo-parameter

 `pPerTileEndInfo` **must** be a valid pointer to a valid [VkPerTileEndInfoQCOM](#VkPerTileEndInfoQCOM) structure

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-recording) VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-cmdpool) VUID-vkCmdEndPerTileExecutionQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-renderpass) VUID-vkCmdEndPerTileExecutionQCOM-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndPerTileExecutionQCOM-videocoding) VUID-vkCmdEndPerTileExecutionQCOM-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdEndPerTileExecutionQCOM is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkPerTileEndInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPerTileEndInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
} VkPerTileEndInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkPerTileEndInfoQCOM-sType-sType) VUID-VkPerTileEndInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PER_TILE_END_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerTileEndInfoQCOM-pNext-pNext) VUID-VkPerTileEndInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

When the [per-tile execution model](#renderpass-per-tile-execution-model)
is enabled, the command [vkCmdDispatchTileQCOM](dispatch.html#vkCmdDispatchTileQCOM) **can** be used to provide
an area-based dispatch, where the implementation determines the work group
count and size based on the tile size and a given shading rate.
