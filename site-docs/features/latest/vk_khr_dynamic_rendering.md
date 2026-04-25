# VK_KHR_dynamic_rendering

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_dynamic_rendering.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Begin/End Render Pass](#_beginend_render_pass)
- [3.1._Begin/End_Render_Pass](#_beginend_render_pass)
- [3.1.1. Attachments](#_attachments)
- [Store Op None](#_store_op_none)
- [Store_Op_None](#_store_op_none)
- [3.1.2. Rendering Flags](#_rendering_flags)
- [3.1.2._Rendering_Flags](#_rendering_flags)
- [Secondary Command Buffer Contents](#_secondary_command_buffer_contents)
- [Secondary_Command_Buffer_Contents](#_secondary_command_buffer_contents)
- [Mixed Samples](#command-buffer-inheritance-mixed-samples)
- [Multiview Per-View Attributes](#command-buffer-inheritance-multiview-per-view-attributes)
- [Multiview_Per-View_Attributes](#command-buffer-inheritance-multiview-per-view-attributes)
- [Suspending and Resuming](#suspending-and-resuming)
- [Suspending_and_Resuming](#suspending-and-resuming)
- [3.1.3. Device Groups](#_device_groups)
- [3.1.3._Device_Groups](#_device_groups)
- [3.1.4. Fragment Shading Rate](#_fragment_shading_rate)
- [3.1.4._Fragment_Shading_Rate](#_fragment_shading_rate)
- [3.1.5. Fragment Density Map](#_fragment_density_map)
- [3.1.5._Fragment_Density_Map](#_fragment_density_map)
- [3.2. Pipeline Creation](#_pipeline_creation)
- [3.2._Pipeline_Creation](#_pipeline_creation)
- [3.2.1. Multiview Per-View Attributes](#_multiview_per_view_attributes)
- [3.2.1._Multiview_Per-View_Attributes](#_multiview_per_view_attributes)
- [3.2.2. Mixed Sample Attachments](#_mixed_sample_attachments)
- [3.2.2._Mixed_Sample_Attachments](#_mixed_sample_attachments)
- [3.2.3. Fragment Shading Rate](#_fragment_shading_rate_2)
- [3.2.3._Fragment_Shading_Rate](#_fragment_shading_rate_2)
- [3.2.4. Fragment Density Map](#_fragment_density_map_2)
- [3.2.4._Fragment_Density_Map](#_fragment_density_map_2)
- [3.3. Features](#_features)
- [4. Examples](#_examples)
- [4.1. Creating a Pipeline](#_creating_a_pipeline)
- [4.1._Creating_a_Pipeline](#_creating_a_pipeline)
- [4.2. Rendering with a dynamic render pass](#_rendering_with_a_dynamic_render_pass)
- [4.2._Rendering_with_a_dynamic_render_pass](#_rendering_with_a_dynamic_render_pass)
- [5. Issues](#_issues)
- [5.1. Should we support multiview?](#_should_we_support_multiview)
- [5.1._Should_we_support_multiview?](#_should_we_support_multiview)
- [5.2. Should there be a view mask for multiview?](#_should_there_be_a_view_mask_for_multiview)
- [5.2._Should_there_be_a_view_mask_for_multiview?](#_should_there_be_a_view_mask_for_multiview)
- [5.3. Should we have functionality to replace the on-chip storage aspect of subpasses?](#_should_we_have_functionality_to_replace_the_on_chip_storage_aspect_of_subpasses)
- [5.3._Should_we_have_functionality_to_replace_the_on-chip_storage_aspect_of_subpasses?](#_should_we_have_functionality_to_replace_the_on_chip_storage_aspect_of_subpasses)
- [5.4. Should pipeline barriers work inside these limited render passes?](#_should_pipeline_barriers_work_inside_these_limited_render_passes)
- [5.4._Should_pipeline_barriers_work_inside_these_limited_render_passes?](#_should_pipeline_barriers_work_inside_these_limited_render_passes)
- [5.5. Is there a preferred render area granularity for VkRenderingInfo::renderArea similar to vkGetRenderAreaGranularity?](#_is_there_a_preferred_render_area_granularity_for_vkrenderinginforenderarea_similar_to_vkgetrenderareagranularity)
- [5.5._Is_there_a_preferred_render_area_granularity_for_VkRenderingInfo::renderArea_similar_to_vkGetRenderAreaGranularity?](#_is_there_a_preferred_render_area_granularity_for_vkrenderinginforenderarea_similar_to_vkgetrenderareagranularity)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Begin/End Render Pass](#_beginend_render_pass)
[3.2. Pipeline Creation](#_pipeline_creation)
[3.3. Features](#_features)

[4. Examples](#_examples)

[4.1. Creating a Pipeline](#_creating_a_pipeline)
[4.2. Rendering with a dynamic render pass](#_rendering_with_a_dynamic_render_pass)

[5. Issues](#_issues)

[5.1. Should we support multiview?](#_should_we_support_multiview)
[5.2. Should there be a view mask for multiview?](#_should_there_be_a_view_mask_for_multiview)
[5.3. Should we have functionality to replace the on-chip storage aspect of subpasses?](#_should_we_have_functionality_to_replace_the_on_chip_storage_aspect_of_subpasses)
[5.4. Should pipeline barriers work inside these limited render passes?](#_should_pipeline_barriers_work_inside_these_limited_render_passes)
[5.5. Is there a preferred render area granularity for `VkRenderingInfo::renderArea` similar to `vkGetRenderAreaGranularity`?](#_is_there_a_preferred_render_area_granularity_for_vkrenderinginforenderarea_similar_to_vkgetrenderareagranularity)

This document details API design ideas for the VK_KHR_dynamic_rendering extension, which adds a more dynamic and flexible way to use draw commands, as a straightforward replacement for single pass render passes.

Render passes are the number one complaint from developers about Vulkan and have been almost since launch. Some of the most pointed issues are as follows:

Other APIs have much more flexible APIs for the same functionality

Most of the render pass API in Vulkan goes unused

Most applications do not or cannot use subpasses, but still pay the cost of setting them up

The API does not fit into most existing software architectures

Fundamentally, other than load/store actions, they do not address real issues for IHVs or ISVs

When teaching Vulkan as an API, this is a huge place where people trip up

An additional problem came up recently that having this state baked into pipeline creation actively contributes to the pipeline compilation time problem and having the ability to separate out most of this state would help enormously.

This proposal *only* addresses single pass render passes; additional functionality to replace multiple subpasses will be in a separate proposal.

The following rough options exist for addressing this issue:

Drastically expand the render pass compatibility options

Allow render pass objects to be “VK_NULL_HANDLE” until record time

Create a new API that pares down the information required to the bare minimum

Option 1 has the advantage of being the least invasive in terms of API changes – it only really affects a handful of VUs, whilst still solving some of the flexibility issues.
The disadvantage of this is that applications still have to manage render pass objects, and it does not really address any of the points in the problem statement directly.

Option 2 effectively allows applications to provide the same information to applications again without any real API change, and addresses point 4 in the problem statement directly as it allows the render pass information to provided fairly late.

Option 3 is a much more drastic change in terms of the API, requiring additional paths through the API/driver that are generally somewhat annoying to manage. This has the advantage of being able to address all points in the problem statement, however.
Render pass objects also carry a lot of baggage in terms of developer opinion, and an overhaul replacement is likely to be better received for that reason.

Developers and the Vulkan WG seems to be more enthusiastic about Option 3 than other approaches, and so it is the approach proposed here.

This extension introduces new commands to begin and end a render pass:

VKAPI_ATTR void VKAPI_CALL vkCmdBeginRenderingKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInfoKHR*                   pRenderingInfo);

VKAPI_ATTR void VKAPI_CALL vkCmdEndRenderingKHR(
    VkCommandBuffer                             commandBuffer);

Neither of these commands make any reference to a render pass object – render passes are now fully dynamic.
These commands may be called inside secondary command buffers, but `vkCmdEndRenderingKHR` and `vkCmdBeginRenderingKHR` must always appear as a pair in the same command buffer.
Note that render passes can still span multiple command buffers via [suspended render passes](#suspending-and-resuming).

typedef struct VkRenderingInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    VkRenderingFlagsKHR                 flags;
    VkRect2D                            renderArea;
    uint32_t                            layerCount;
    uint32_t                            viewMask;
    uint32_t                            colorAttachmentCount;
    const VkRenderingAttachmentInfoKHR* pColorAttachments;
    const VkRenderingAttachmentInfoKHR* pDepthAttachment;
    const VkRenderingAttachmentInfoKHR* pStencilAttachment;
} VkRenderingInfoKHR;

The rendering info provided to `vkCmdBeginRenderingKHR` is the essential information needed to begin rendering, based on what is and is not currently inside the compatibility rules for render passes.
Notably, this is not a synchronization command – there is no replacement for subpass external dependencies.
Applications should use other synchronization primitives (barriers, events) to manage synchronization.

If `viewMask` is `0`, then multiview is disabled for this render pass, and `layerCount` indicates the number of layers used in each attachment.
If `viewMask` is non-zero, then multiview is enabled for this render pass, and each bit in `viewMask` indicates a layer index in each element that will rendered.

Depth and stencil image info are separated for API clarity (since everything else is applied independently), but they must point to the same image.
The same restriction applies to their respective resolve images.
For each attachment, the information provided is a the image view to bind, layout information, resolve information, and load/store ops (including a clear color).

typedef struct VkRenderingAttachmentInfoKHR {
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
} VkRenderingAttachmentInfoKHR;

There are no layout transitions or other synchronization info for images – synchronization is done exclusively by existing synchronization commands - the layouts provided are those that the image must already be in when rendering.

Image views for any attachment may be [VK_NULL_HANDLE](https://docs.vulkan.org/spec/latest/appendices/boilerplate.html#VK_NULL_HANDLE), indicating that writes to the attachment are discarded, and reads return undefined values.

Note that the resolve images do not have their own load/store operations; they are treated as if they are implicitly `VK_ATTACHMENT_LOAD_OP_DONT_CARE` and `VK_ATTACHMENT_STORE_OP_STORE` – other combinations in the existing API do not really carry any useful meaning.

`resolveMode` for color attachments must be `VK_RESOLVE_MODE_NONE` or `VK_RESOLVE_MODE_AVERAGE_BIT`.

A new store operation is provided as originally described by [VK_QCOM_render_pass_store_ops](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_QCOM_render_pass_store_ops):

VK_ATTACHMENT_STORE_OP_NONE_KHR = 1000301000,

This store operation works largely like DONT_CARE but guarantees that the store op does not access the attachment.
When a render pass accesses an attachment as read only, this can be useful in avoiding a potential write operation during the store operation, and removing the need for synchronization in some cases.

Rendering flags cover the following functionality:

typedef enum VkRenderingFlagsKHR {
    VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT_KHR = 0x00000001,
    VK_RENDERING_SUSPENDING_BIT_KHR                         = 0x00000002,
    VK_RENDERING_RESUMING_BIT_KHR                           = 0x00000004,
} VkRenderingFlagsKHR;

`VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT_KHR` works more or less identically to `VK_SUBPASS_CONTENTS_SECONDARY_COMMAND_BUFFERS`, indicating that the contents of the render pass will be entirely recorded inside a secondary command buffer and replayed.
If it is absent, the commands must be wholly recorded inside the command buffer that starts it.

This requires the introduction of a new inheritance info when dynamic rendering is used, as the renderpass will no longer provide information required by implementations:

typedef struct VkCommandBufferInheritanceRenderingInfoKHR {
    VkStructureType          sType;
    const void*              pNext;
    VkRenderingFlagsKHR      flags;
    uint32_t                 viewMask;
    uint32_t                 colorAttachmentCount;
    const VkFormat*          pColorAttachmentFormats;
    VkFormat                 depthAttachmentFormat;
    VkFormat                 stencilAttachmentFormat;
    VkSampleCountFlagBits    rasterizationSamples;
} VkCommandBufferInheritanceRenderingInfoKHR;

Information here must match that in the render pass being executed.
If no color attachments are used or the formats are all `VK_FORMAT_UNDEFINED`, and the `variableMultisampleRate` feature is supported, the rasterization sample count is ignored.
If either `depthAttachmentFormat` or `stencilAttachmentFormat` are not `VK_FORMAT_UNDEFINED`, they must have the same value.

This allows applications to use secondary command buffers with dynamic rendering as they would have done in the existing render pass API.

However, an alternative method of recording commands across multiple command buffers is also provided by [suspending render passes](#suspending-and-resuming).

If either of [VK_NV_framebuffer_mixed_samples](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_NV_framebuffer_mixed_samples) or [VK_AMD_mixed_attachment_samples](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_AMD_mixed_attachment_samples) are enabled, the sample counts of color and depth attachments may vary from the `rasterizationSamples`.
In this case, the sample count of each attachment can be specified by including the `VkAttachmentSampleInfoAMD`/`VkAttachmentSampleCountInfoNV` structure in the same `pNext` chain.

typedef struct VkAttachmentSampleCountInfoAMD {
    VkStructureType                 sType;
    const void*                     pNext;
    VkRenderingFlagsKHR             flags;
    uint32_t                        colorAttachmentCount;
    const VkSampleCountFlagBits*    pColorAttachmentSamples;
    VkSampleCountFlagBits           depthStencilAttachmentSamples;
} VkAttachmentSampleCountInfoAMD;

typedef VkAttachmentSampleCountInfoAMD VkAttachmentSampleCountInfoNV;

If [VK_NVX_multiview_per_view_attributes](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_NVX_multiview_per_view_attributes) is enabled, the multiview per-view attributes can be specified by including the `VkMultiviewPerViewAttributesInfoNVX` structure in the same `pNext` chain.

`VK_RENDERING_SUSPENDING_BIT_KHR` and `VK_RENDERING_RESUMING_BIT_KHR` allow an alternative method of recording across multiple command buffers.
Applications can suspend a render pass in one command buffer using `VK_RENDERING_SUSPENDING_BIT_KHR`, and resume it in another command buffer by starting an identical render pass with `VK_RENDERING_RESUMING_BIT_KHR`.
Suspended render passes must be resumed by a render pass with identical begin parameters, other than the presence absence of `VK_RENDERING_SUSPENDING_BIT_KHR`, `VK_RENDERING_RESUMING_BIT_KHR`, and `VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT_KHR`.

It is invalid to use action commands, synchronization commands, or record additional render passes, between a suspended render pass and the render pass which resumes it.
All pairs of resuming and suspending render passes must be submitted in the same batch.
Applications can resume a dynamic render pass in the same command buffer as it was suspended.
Applications can record a dynamic render pass wholly inside secondary command buffers.
A dynamic render pass can be both suspending and resuming.

The [VkDeviceGroupRenderPassBeginInfo](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkDeviceGroupRenderPassBeginInfo) structure can be chained from `VkRenderingInfoKHR`, with the same effect as when chained to [VkRenderPassBeginInfo](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkRenderPassBeginInfo) - setting the device mask and setting independent render areas per device.

If [VK_KHR_fragment_shading_rate](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_fragment_shading_rate) is enabled, when calling `vkCmdBeginRenderingKHR`, the following structure should be chained to `VkRenderingInfoKHR` to include a fragment shading rate attachment:

typedef struct VkRenderingFragmentShadingRateAttachmentInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    VkImageView                         imageView;
    VkImageLayout                       imageLayout;
} VkRenderingFragmentShadingRateAttachmentInfoKHR;

If [VK_EXT_fragment_density_map](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map) is enabled, when calling `vkCmdBeginRenderingKHR`, the following structure should be chained to `VkRenderingInfoKHR` to include a fragment density map attachment:

typedef struct VkRenderingFragmentDensityMapAttachmentInfoEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    VkImageView                         imageView;
    VkImageLayout                       imageLayout;
} VkRenderingFragmentDensityMapAttachmentInfoEXT;

With the removal of render pass objects, it is now necessary to provide some of that same information to applications at pipeline creation.
This structure is chained from [VkGraphicsPipelineCreateInfo](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkGraphicsPipelineCreateInfo):

typedef struct VkPipelineRenderingCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
    uint32_t           viewMask;
} VkPipelineRenderingCreateInfoKHR;

If a color or depth/stencil attachment is specified in `vkCmdBeginRenderingKHR`, its format must match that provided here.
If any format here is `VK_FORMAT_UNDEFINED`, no attachment must be specified for that attachment in `vkCmdBeginRenderingKHR`.
If either `depthAttachmentFormat` or `stencilAttachmentFormat` are not `VK_FORMAT_UNDEFINED`, they must have the same value.

The value of `viewMask` must match the value of the `viewMask` member of `VkRenderingInfoKHR`.

If [VK_NVX_multiview_per_view_attributes](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_NVX_multiview_per_view_attributes) is enabled, the multiview per-view attributes can be specified by including the `VkMultiviewPerViewAttributesInfoNVX` structure in the same `pNext` chain.

If either of [VK_NV_framebuffer_mixed_samples](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_NV_framebuffer_mixed_samples) or [VK_AMD_mixed_attachment_samples](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_AMD_mixed_attachment_samples) are enabled, the sample counts of color and depth attachments must be specified at pipeline creation as well.
As with [command buffer inheritance](#command-buffer-inheritance-mixed-samples), the sample count of each attachment can be specified by including the `VkAttachmentSampleInfoAMD`/`VkAttachmentSampleCountInfoNV` structure in the `pNext` chain.
If the structure is omitted, the sample count for each attachment is considered equal to [`VkPipelineMultisampleStateCreateInfo::rasterizationSamples`](https://docs.vulkan.org/spec/latest/chapters/primsrast.html#VkPipelineMultisampleStateCreateInfo).

If [VK_KHR_fragment_shading_rate](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_fragment_shading_rate) is enabled, a new rasterization state pipeline creation flag must be provided if a shading rate attachment will be used:

VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR

If [VK_EXT_fragment_density_map](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map) is enabled, a new rasterization state pipeline creation flag must be provided if a fragment density map will be used:

VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceDynamicRenderingFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicRendering;
} VkPhysicalDeviceDynamicRenderingFeaturesKHR

`dynamicRendering` is the core feature enabling this extension’s functionality.

VkFormat colorRenderingFormats[2] = {
    VK_FORMAT_R8G8B8A8_UNORM,
    VK_FORMAT_R32_UINT };

VkPipelineRenderingCreateInfoKHR rfInfo = {
    .sType = VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO_KHR,
    .pNext = NULL,
    .colorAttachmentCount = 2,
    .pColorAttachmentFormats = colorRenderingFormats,
    .depthAttachmentFormat = VK_FORMAT_D32_SFLOAT_S8_UINT,
    .stencilAttachmentFormat = VK_FORMAT_D32_SFLOAT_S8_UINT };

VkGraphicsPipelineCreateInfo createInfo = {
    .sType = VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO,
    .pNext = &rfInfo,
    .renderPass = VK_NULL_HANDLE,
    .... };

VkPipeline graphicsPipeline;

vkCreateGraphicsPipelines(device, pipelineCache, 1, &createInfo, NULL, &graphicsPipeline);

VkRenderingAttachmentInfoKHR colorAttachments[2] = {
    {
        .sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO_KHR
        .pNext = NULL,
        .imageView = colorImageViews[0],
        .imageLayout = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR,
        .resolveMode = VK_RESOLVE_MODE_AVERAGE_BIT,
        .resolveImageView = resolveColorImageView,
        .resolveImageLayout = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR,
        .loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR,
        .storeOp = VK_ATTACHMENT_STORE_OP_DONT_CARE,
        .clearValue = {.color = {.float32 = {0.0f,0.0f,0.0f,0.0f} } }
    }, {
        .sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO_KHR
        .pNext = NULL,
        .imageView = colorImageViews[1],
        .imageLayout = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR,
        .resolveMode = VK_RESOLVE_MODE_NONE,
        .loadOp = VK_ATTACHMENT_LOAD_OP_DONT_CARE,
        .storeOp = VK_ATTACHMENT_STORE_OP_STORE
    } };

// A single depth stencil attachment info can be used, but they can also be specified separately.
// When both are specified separately, the only requirement is that the image view is identical.
VkRenderingAttachmentInfoKHR depthStencilAttachment = {
    .sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO_KHR
    .pNext = NULL,
    .imageView = depthStencilImageView,
    .imageLayout = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR,
    .resolveMode = VK_RESOLVE_MODE_NONE,
    .loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR,
    .storeOp = VK_ATTACHMENT_STORE_OP_DONT_CARE,
    .clearValue = {.depthStencil = {.depth = 0.0f, .stencil = 0 } } };

VkRenderingInfoKHR renderingInfo = {
    .sType = VK_STRUCTURE_TYPE_RENDERING_INFO_KHR,
    .pNext = NULL,
    .flags = 0,
    .renderArea = { ... },
    .layerCount = 1,
    .colorAttachmentCount = 2,
    .pColorAttachments = colorAttachments,
    .pDepthAttachment = &depthStencilAttachment,
    .pStencilAttachment = &depthStencilAttachment };

vkCmdBeginRenderingKHR(commandBuffer, &renderingInfo);

vkCmdDraw(commandBuffer, ...);

...

vkCmdDraw(commandBuffer, ...);

vkCmdEndRenderingKHR(commandBuffer);

This section describes issues with the existing proposal – including both open issues that you have not addressed, and closed issues that are not self-evident from the proposal description.

Yes, its complexity is much reduced compared to render pass objects, and it is probably worth preserving in this limited form for compatibility reasons.

Yes.
Without multiple subpasses the view mask is significantly less useful; the layer count provided is sufficient to describe the number of views.
However, the mask allows specification of a non-contiguous array, and while it is unclear if any applications use this, it has been included to maintain compatibility with existing APIs.

No - this will be designed as a separate extension.

No - without input attachments or a solution for on-chip storage these are currently functionally useless.

During design discussions for this extension, no hardware vendor felt that this functionality was important enough to bring over to dynamic rendering.
If vendors have performance concerns, extensions such as [VK_QCOM_tile_properties](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_QCOM_tile_properties) can be exposed, and there may be scope for a future cross-vendor extension.
Applications can use values for the render area freely without alignment considerations.
