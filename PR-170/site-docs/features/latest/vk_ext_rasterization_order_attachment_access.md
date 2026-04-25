# VK_EXT_rasterization_order_attachment_access

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_rasterization_order_attachment_access.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Issues](#_issues)
- [4.1. Is there any interaction with the VK_KHR_dynamic_rendering extension?](#_is_there_any_interaction_with_the_vk_khr_dynamic_rendering_extension)
- [4.1._Is_there_any_interaction_with_the_VK_KHR_dynamic_rendering_extension?](#_is_there_any_interaction_with_the_vk_khr_dynamic_rendering_extension)
- [4.2. What are the differences to the VK_ARM_rasterization_order_attachment_access extension?](#_what_are_the_differences_to_the_vk_arm_rasterization_order_attachment_access_extension)
- [4.2._What_are_the_differences_to_the_VK_ARM_rasterization_order_attachment_access_extension?](#_what_are_the_differences_to_the_vk_arm_rasterization_order_attachment_access_extension)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Issues](#_issues)

[4.1. Is there any interaction with the VK_KHR_dynamic_rendering extension?](#_is_there_any_interaction_with_the_vk_khr_dynamic_rendering_extension)
[4.2. What are the differences to the VK_ARM_rasterization_order_attachment_access extension?](#_what_are_the_differences_to_the_vk_arm_rasterization_order_attachment_access_extension)

This proposal extends the mechanism of input attachments to allow access to framebuffer attachments that are used both as input and as
color or depth/stencil attachments from one fragment to the next, in rasterization order, without explicit synchronization.

Renderpasses, and specifically subpass self-dependencies enable much of the same functionality as the framebuffer
fetch and pixel local storage extensions did for OpenGL ES.
But certain techniques such as programmable blending are awkward or impractical to implement with these alone, in part because a self-dependency
is required every time a fragment will read a value at a given sample coordinate.
For these use cases, a mechanisms that more closely matches framebuffer fetch is useful.

For simplicity, this proposal extends the original render pass API and not the [VK_KHR_dynamic_rendering](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering) API.
Raster order attachment reads are done as input attachment reads (as before), but self-dependencies are no longer required when reading a value written
by fragments earlier in rasterization order.

Since input attachments are not used in dynamic rendering, a different approach is needed there. This proposal does not address that issue.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rasterizationOrderColorAttachmentAccess;
    VkBool32           rasterizationOrderDepthAttachmentAccess;
    VkBool32           rasterizationOrderStencilAttachmentAccess;
} VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT;

These features allow the implementation to expose separately whether rasterization order access is supported
for color attachments, depth attachments, and stencil attachments.

The application declares at pipeline creation time whether rasterization order access will be used
for color, depth, or stencil aspects, by setting the appropriate combination of the following flags on the pipeline:

typedef enum VkPipelineDepthStencilStateCreateFlagBits {
    VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT = 0x00000001,
    VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT = 0x00000002,
    VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_FLAG_BITS_MAX_ENUM = 0x7FFFFFFF
} VkPipelineDepthStencilStateCreateFlagBits;
typedef VkFlags VkPipelineDepthStencilStateCreateFlags;

typedef enum VkPipelineColorBlendStateCreateFlagBits {
    VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT = 0x00000001,
    VK_PIPELINE_COLOR_BLEND_STATE_CREATE_FLAG_BITS_MAX_ENUM = 0x7FFFFFFF
} VkPipelineColorBlendStateCreateFlagBits;

Additionally, per subpass flags are added to indicate whether a subpass is compatible with
rasterization order access. The following flags are added to VkSubpassDescriptionFlagBits:

typedef enum VkSubpassDescriptionFlagBits {
    /* existing flags not shown */
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT = 0x00000010,
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT = 0x00000020,
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT = 0x00000040,
    VK_SUBPASS_DESCRIPTION_FLAG_BITS_MAX_ENUM = 0x7FFFFFFF
} VkSubpassDescriptionFlagBits;

No. This extension only affects reads from input attachments.
Render pass instances begun with `vkCmdBeginRenderingKHR` do not have input attachments and a different mechanism will be needed to provide similar functionality in that case.

None. This extension is a multi-vendor version of that extension with no changes.
The two extensions can be used interchangeably since the API structures and enumeration alias each other.
