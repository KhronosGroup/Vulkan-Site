# VkRenderingAttachmentFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingAttachmentFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingAttachmentFlagBitsKHR - Bitmask specifying additional properties of a rendering attachment

Bits which **can** be set in
[VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html)::`flags`, describing additional
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
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#)
specifies that the attachment **can** be used concurrently as both an input
attachment and a write-only attachment during the render pass, creating
a feedback loop while processing a fragment, and without a
[VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html) barrier separating the write
attachment and input attachment usage.
Using this flag does not remove the general requirement to use a
[VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html) barrier to resolve hazards when two
different fragments accesses a particular attachment region, where one
of them performs an attachment write, and a subsequent fragment performs
an input attachment read.
If [VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html) is
specified in the rendering info, this flag **must** be set for an
attachment to be used concurrently as an input attachment and a write
attachment in this manner.
If [VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html) is
not specified in the rendering info, this flag is implied to be set for
any attachment which has a combination of image layouts and image view
usage flags which support input attachment usage.

* 
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](#)
specifies that resolve operations happening to an sRGB encoded
attachment **must** not convert samples from nonlinear to linear before
averaging.

* 
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](#)
specifies that resolve operations happening to an sRGB encoded
attachment **must** convert samples from nonlinear to linear before
averaging.

|  | [VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](#) is intended
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
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html) if
[`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) is available and they use
feedback loops with [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html).
Feedback loops are still allowed when not using the rendering flag, but the
performance implication was an oversight in the original definition of
[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). |

|  | In some scenarios, resolving sRGB in nonlinear space instead of the expected
| --- | --- |
linear space can improve perceptual aliasing at the cost of inaccurate color
blending. |

[VK_KHR_maintenance10](VK_KHR_maintenance10.html), [VkRenderingAttachmentFlagsKHR](VkRenderingAttachmentFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingAttachmentFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
