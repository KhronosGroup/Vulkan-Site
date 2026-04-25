# VkRenderingAttachmentLocationInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingAttachmentLocationInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingAttachmentLocationInfo - Structure specifying attachment locations

The `VkRenderingAttachmentLocationInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkRenderingAttachmentLocationInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorAttachmentCount;
    const uint32_t*    pColorAttachmentLocations;
} VkRenderingAttachmentLocationInfo;

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to VkRenderingAttachmentLocationInfo
typedef VkRenderingAttachmentLocationInfo VkRenderingAttachmentLocationInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`colorAttachmentCount` is the number of elements in
`pColorAttachmentLocations`.

* 
`pColorAttachmentLocations` is a pointer to an array of
`colorAttachmentCount` `uint32_t` values defining remapped
locations for color attachments.

This structure allows applications to remap the locations of color
attachments to different fragment shader output locations.

Each element of `pColorAttachmentLocations` set to
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) will be inaccessible to this pipeline as a color
attachment; no location will map to it.
Each element of `pColorAttachmentLocations` set to any other value will
map the specified location value to the color attachment specified in the
render pass at the corresponding index in the
`pColorAttachmentLocations` array.
Any writes to a fragment output location that is not mapped to an attachment
**must** be discarded.

If `pColorAttachmentLocations` is `NULL`, it is equivalent to setting
each element to its index within the array.

This structure **can** be included in the `pNext` chain of a
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) structure to set this state for a
pipeline.
If this structure is not included in the `pNext` chain of
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`.

* 
`pColorAttachmentLocations` set to `NULL`.

This structure **can** be included in the `pNext` chain of a
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) structure to specify inherited state
from the primary command buffer.
If [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)::renderPass is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), or
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html) is not specified in
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::flags, members of this structure are
ignored.
If this structure is not included in the `pNext` chain of
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), it is equivalent to specifying this
structure with the following properties:

* 
`colorAttachmentCount` set to
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`colorAttachmentCount`.

* 
`pColorAttachmentLocations` set to `NULL`.

Valid Usage

* 
[](#VUID-VkRenderingAttachmentLocationInfo-dynamicRenderingLocalRead-09512) VUID-VkRenderingAttachmentLocationInfo-dynamicRenderingLocalRead-09512

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`pColorAttachmentLocations` is not `NULL`, each element **must** be the
value of its index within the array

* 
[](#VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09513) VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09513

Elements of `pColorAttachmentLocations` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** each be unique

* 
[](#VUID-VkRenderingAttachmentLocationInfo-colorAttachmentCount-09514) VUID-VkRenderingAttachmentLocationInfo-colorAttachmentCount-09514

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09515) VUID-VkRenderingAttachmentLocationInfo-pColorAttachmentLocations-09515

Each element of `pColorAttachmentLocations` **must** be less than
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAttachmentLocationInfo-sType-sType) VUID-VkRenderingAttachmentLocationInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkStructureType](VkStructureType.html), [vkCmdSetRenderingAttachmentLocations](vkCmdSetRenderingAttachmentLocations.html), [vkCmdSetRenderingAttachmentLocations](vkCmdSetRenderingAttachmentLocations.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/interfaces.html#VkRenderingAttachmentLocationInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
