# VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM - Set the multiview per view render areas for a render pass instance

If a render pass instance enables multiview and if the
[`multiviewPerViewRenderAreas`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewRenderAreas)
feature is enabled, the
`VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM` structure **can** be
included in the `pNext` chain of [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)
or [VkRenderingInfo](VkRenderingInfo.html)

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`perViewRenderAreaCount` is the number of elements in the
`pPerViewRenderAreas` array.

* 
`pPerViewRenderAreas` is a pointer to an array of [VkRect2D](VkRect2D.html)
structures defining the render area for each view.

If `perViewRenderAreaCount` is not zero, then the elements of
`pPerViewRenderAreas` override the value of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderArea`
or [VkRenderingInfo](VkRenderingInfo.html)::`renderArea`
and define per-view render areas for the individual views of a multiview
render pass.
The render area for the view with *view index* `i` is specified by
`pPerViewRenderAreas`[i].

The per-view render areas define per-view regions of attachments that are
loaded, stored, and resolved according to the `loadOp`, `storeOp`,
and `resolveMode` values of the render pass instance.
When per-view render areas are defined, the value of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderArea`
or [VkRenderingInfo](VkRenderingInfo.html)::`renderArea`
**must** be a render area that includes the union of all per-view render areas,
**may** be used by the implementation for optimizations, but does not affect
loads, stores, or resolves.

If this structure is present and if `perViewRenderAreaCount` is not
zero, then `perViewRenderAreaCount` **must** be at least one greater than
the most significant bit set in any element of
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewMasks`.
or [VkRenderingInfo](VkRenderingInfo.html)::`viewMask`

If this structure is not present or if `perViewRenderAreaCount` is zero,
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderArea`
or [VkRenderingInfo](VkRenderingInfo.html)::`renderArea`
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
[`maxFramebufferWidth`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferWidth)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07864) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-offset-07864

The sum of the `offset.y` and `extent.height` members of any
element of `pPerViewRenderAreas` **must** be less than or equal to
[`maxFramebufferHeight`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferHeight)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07865) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07865

If this structure is in the `pNext` chain of
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html) and if the render pass object included an
element in [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewMasks` that
set bit `n`, then `perViewRenderAreaCount` **must** be at least equal
to `n+1`

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07866) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pNext-07866

If this structure is in the `pNext` chain of [VkRenderingInfo](VkRenderingInfo.html)
and if [VkRenderingInfo](VkRenderingInfo.html)::`viewMask` set bit `n`, then
`perViewRenderAreaCount` **must** be at least equal to `n+1`

Valid Usage (Implicit)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-sType-sType) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_RENDER_AREAS_RENDER_PASS_BEGIN_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pPerViewRenderAreas-parameter) VUID-VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM-pPerViewRenderAreas-parameter

 If `perViewRenderAreaCount` is not `0`, `pPerViewRenderAreas` **must** be a valid pointer to an array of `perViewRenderAreaCount` [VkRect2D](VkRect2D.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_QCOM_multiview_per_view_render_areas](VK_QCOM_multiview_per_view_render_areas.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
