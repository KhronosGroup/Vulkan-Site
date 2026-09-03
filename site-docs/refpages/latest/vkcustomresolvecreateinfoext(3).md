# VkCustomResolveCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCustomResolveCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCustomResolveCreateInfoEXT - Structure specifying format info for custom resolves

The `VkCustomResolveCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
typedef struct VkCustomResolveCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           customResolve;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
} VkCustomResolveCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`customResolve` indicates whether this pipeline will be used for a
resolve operation.

* 
`colorAttachmentCount` is the number of entries in
`pColorAttachmentFormats`.

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](VkFormat.html)
values defining the format of color resolve attachments used in custom
resolves in the same render pass.

* 
`depthAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the depth resolve attachment used in custom resolves in the
same render pass.

* 
`stencilAttachmentFormat` is a [VkFormat](VkFormat.html) value defining the
format of the stencil resolve attachment used in custom resolves in the
same render pass.

If the `pNext` chain includes this structure for one of:

* 
a [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) for a pipeline created without a
[VkRenderPass](VkRenderPass.html)

* 
a [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) for a secondary command buffer
within a render pass instance begun with [vkCmdBeginRendering](vkCmdBeginRendering.html).

it specifies the formats used in custom resolves within the same render
pass.
It also specifies that the corresponding object will be used in a render
pass which contains a custom resolve operation.

If the `pNext` chain includes this structure for a
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html) for a fragment shader object, it only specifies
that the fragment shader will be used in a custom resolve operation.

If a graphics pipeline is created with a valid [VkRenderPass](VkRenderPass.html),
parameters of this structure are ignored.

If `customResolve` is [VK_FALSE](VK_FALSE.html), the pipeline **can** only be used
outside the custom resolve section.
If `customResolve` is [VK_TRUE](VK_TRUE.html), the pipeline **can** only be used
inside the custom resolve section.

When a dynamic render pass instance contains a custom resolve operation
and the [`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled
, all pipelines used to draw in such render pass **must** include this
structure and have identical format information in it.
When a dynamic render pass does not contain a custom resolve operation
and the [`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled
, all pipelines used to draw in such render pass **must** not include this
structure.

If the [`dynamicRenderingUnusedAttachments`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, then when this
structure is not included in the `pNext` chain for
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), `customResolve` is [VK_FALSE](VK_FALSE.html),
`colorAttachmentCount` is `0`, and `depthAttachmentFormat` and
`stencilAttachmentFormat` are [VK_FORMAT_UNDEFINED](VkFormat.html).

If `depthAttachmentFormat`, `stencilAttachmentFormat`, or any
element of `pColorAttachmentFormats` is [VK_FORMAT_UNDEFINED](VkFormat.html), it
indicates that the corresponding attachment is unused within the resolve
portion of the render pass.
Valid formats indicate that an attachment **can** be used - but it is still
valid to set the attachment to `NULL` when beginning rendering.

When passed as a `pNext` member to a [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html) struct
for use with fragment density maps, the `colorAttachmentCount`,
`pColorAttachmentFormats`, `depthAttachmentFormat`, and
`stencilAttachmentFormat` members of this struct are ignored.
When not passed as a `pNext` member, `customResolve` is
[VK_FALSE](VK_FALSE.html).

Valid Usage

* 
[](#VUID-VkCustomResolveCreateInfoEXT-colorAttachmentCount-11507) VUID-VkCustomResolveCreateInfoEXT-colorAttachmentCount-11507

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11508) VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11508

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format that includes a depth component

* 
[](#VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11509) VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11509

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format with [potential format    features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-pColorAttachmentFormats-11510) VUID-VkCustomResolveCreateInfoEXT-pColorAttachmentFormats-11510

If any element of `pColorAttachmentFormats` is not
[VK_FORMAT_UNDEFINED](VkFormat.html), it **must** be a format with
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
, or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html) if the
[`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment) feature
is enabled

* 
[](#VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11511) VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11511

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format that includes a stencil aspect

* 
[](#VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11512) VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11512

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html), it
**must** be a format with [potential format    features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11513) VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11513

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html) and
`stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](VkFormat.html),
`depthAttachmentFormat` **must** equal `stencilAttachmentFormat`

Valid Usage (Implicit)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-sType-sType) VUID-VkCustomResolveCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUSTOM_RESOLVE_CREATE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)

[VK_EXT_custom_resolve](VK_EXT_custom_resolve.html), [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkCustomResolveCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
