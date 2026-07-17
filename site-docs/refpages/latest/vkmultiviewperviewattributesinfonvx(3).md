# VkMultiviewPerViewAttributesInfoNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMultiviewPerViewAttributesInfoNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMultiviewPerViewAttributesInfoNVX - Structure specifying the multiview per-attribute properties

The `VkMultiviewPerViewAttributesInfoNVX` structure is defined as:

// Provided by VK_NVX_multiview_per_view_attributes with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkMultiviewPerViewAttributesInfoNVX {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           perViewAttributes;
    VkBool32           perViewAttributesPositionXOnly;
} VkMultiviewPerViewAttributesInfoNVX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

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
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](VkSubpassDescriptionFlagBits.html) or
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](VkSubpassDescriptionFlagBits.html) in the subpass
description flags, the per-attribute properties of the render pass instance
**must** be specified by the `VkMultiviewPerViewAttributesInfoNVX`
structure Include the `VkMultiviewPerViewAttributesInfoNVX` structure in
the `pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) when creating a
graphics pipeline for dynamic rendering, [VkRenderingInfo](VkRenderingInfo.html) when starting
a dynamic render pass instance, and [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)
when specifying the dynamic render pass instance parameters for secondary
command buffers.

Valid Usage (Implicit)

* 
[](#VUID-VkMultiviewPerViewAttributesInfoNVX-sType-sType) VUID-VkMultiviewPerViewAttributesInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_ATTRIBUTES_INFO_NVX](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_NVX_multiview_per_view_attributes](VK_NVX_multiview_per_view_attributes.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkMultiviewPerViewAttributesInfoNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
