# VkCommandBufferBeginInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferBeginInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferBeginInfo - Structure specifying a command buffer begin operation

The `VkCommandBufferBeginInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCommandBufferBeginInfo {
    VkStructureType                          sType;
    const void*                              pNext;
    VkCommandBufferUsageFlags                flags;
    const VkCommandBufferInheritanceInfo*    pInheritanceInfo;
} VkCommandBufferBeginInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkCommandBufferUsageFlagBits](VkCommandBufferUsageFlagBits.html)
specifying usage behavior for the command buffer.

* 
`pInheritanceInfo` is a pointer to a
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) structure, used if
`commandBuffer` is a secondary command buffer.
If this is a primary command buffer, then this value is ignored.

Valid Usage

* 
[](#VUID-VkCommandBufferBeginInfo-flags-09123) VUID-VkCommandBufferBeginInfo-flags-09123

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html), the
[VkCommandPool](VkCommandPool.html) that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-VkCommandBufferBeginInfo-flags-00055) VUID-VkCommandBufferBeginInfo-flags-00055

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html), the
`framebuffer` member of `pInheritanceInfo` **must** be either
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), or a valid `VkFramebuffer` that is compatible
with the `renderPass` member of `pInheritanceInfo`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-09240) VUID-VkCommandBufferBeginInfo-flags-09240

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html) and the
[`dynamicRendering`](../../../../spec/latest/chapters/features.html#features-dynamicRendering) feature is not
enabled, the `renderPass` member of `pInheritanceInfo` **must** not
be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06002) VUID-VkCommandBufferBeginInfo-flags-06002

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html) and the
`renderPass` member of `pInheritanceInfo` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pNext` chain of `pInheritanceInfo`
**must** include a [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html) structure

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06003) VUID-VkCommandBufferBeginInfo-flags-06003

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html), the
`renderPass` member of `pInheritanceInfo` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the `pNext` chain of
`pInheritanceInfo` includes a [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html)
or [VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) structure, the
`colorAttachmentCount` member of that structure **must** be equal to
the value of
[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)::`colorAttachmentCount`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06000) VUID-VkCommandBufferBeginInfo-flags-06000

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)
and the `renderPass` member of `pInheritanceInfo` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the `renderPass` member of `pInheritanceInfo` **must** be a valid
`VkRenderPass`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-06001) VUID-VkCommandBufferBeginInfo-flags-06001

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)
and the `renderPass` member of `pInheritanceInfo` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the `subpass` member of `pInheritanceInfo` **must** be a valid
subpass index within the `renderPass` member of
`pInheritanceInfo`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-10617) VUID-VkCommandBufferBeginInfo-flags-10617

If `flags` contains
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)
, the `renderPass` member of `pInheritanceInfo` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and `renderPass` was created with [tile    shading enabled](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading), [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html)
**must** be included in
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-10618) VUID-VkCommandBufferBeginInfo-flags-10618

If `flags` does not contain
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html)
, the `renderPass` member of `pInheritanceInfo` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
or `renderPass` was not created with tile shading enabled,
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-VkCommandBufferBeginInfo-flags-10619) VUID-VkCommandBufferBeginInfo-flags-10619

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) is included in
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`,
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`tileApronSize` **must**
be equal to the `tileApronSize` used to create `renderPass`

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferBeginInfo-sType-sType) VUID-VkCommandBufferBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_BEGIN_INFO](VkStructureType.html)

* 
[](#VUID-VkCommandBufferBeginInfo-pNext-pNext) VUID-VkCommandBufferBeginInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDeviceGroupCommandBufferBeginInfo](VkDeviceGroupCommandBufferBeginInfo.html)

* 
[](#VUID-VkCommandBufferBeginInfo-sType-unique) VUID-VkCommandBufferBeginInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandBufferBeginInfo-flags-parameter) VUID-VkCommandBufferBeginInfo-flags-parameter

 `flags` **must** be a valid combination of [VkCommandBufferUsageFlagBits](VkCommandBufferUsageFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkCommandBufferUsageFlags](VkCommandBufferUsageFlags.html), [VkStructureType](VkStructureType.html), [vkBeginCommandBuffer](vkBeginCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferBeginInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
