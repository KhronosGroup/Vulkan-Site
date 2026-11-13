# VK_QCOM_multiview_per_view_render_areas(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_multiview_per_view_render_areas.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_multiview_per_view_render_areas](#VK_QCOM_multiview_per_view_render_areas)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_multiview_per_view_render_areas - device extension

**Name String**

`VK_QCOM_multiview_per_view_render_areas`

**Extension Type**

Device extension

**Registered Extension Number**

511

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_multiview_per_view_render_areas] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_multiview_per_view_render_areas extension*)

**Last Modified Date**

2023-01-10

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`

* 
This extension interacts with `[VK_QCOM_render_pass_transform](VK_QCOM_render_pass_transform.html)`

**Contributors**

* 
Jeff Leger, Qualcomm

* 
Jonathan Tinkham, Qualcomm

* 
Jonathan Wicks, Qualcomm

Certain use cases (e.g., side-by-side VR rendering) use multiview and render
to distinct regions of the framebuffer for each view.
On some implementations, there may be a performance benefit for providing
per-view render areas to the implementation.
Such per-view render areas can be used by the implementation to reduce the
pixels that are affected by attachment load, store, and multisample resolve
operations.

The extension enables a multiview render pass instance to define per-view
render areas.
For each view of a multiview render pass instance, only those pixels in the
per-view render area are affected by load, store, and resolve operations.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM](VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkRenderingInfo](VkRenderingInfo.html):

* 
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html)

* 
`VK_QCOM_MULTIVIEW_PER_VIEW_RENDER_AREAS_EXTENSION_NAME`

* 
`VK_QCOM_MULTIVIEW_PER_VIEW_RENDER_AREAS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_RENDER_AREAS_RENDER_PASS_BEGIN_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_RENDER_AREAS_FEATURES_QCOM](VkStructureType.html)

1) Do the per-view `renderAreas` interact with
[vkGetRenderAreaGranularity](vkGetRenderAreaGranularity.html) ?

**RESOLVED**: There is no change.
The granularity returned by [vkGetRenderAreaGranularity](vkGetRenderAreaGranularity.html) also applies to
the per-view `renderAreas`.

2) How does this extension interact with
`[VK_QCOM_render_pass_transform](VK_QCOM_render_pass_transform.html)`?

**RESOLVED**: When `[VK_QCOM_render_pass_transform](VK_QCOM_render_pass_transform.html)` is enabled, the
application provides render area in non-rotated coordinates which is rotated
by the implementation to the rotated coordinate system.
When this extension is used in combination with
`[VK_QCOM_render_pass_transform](VK_QCOM_render_pass_transform.html)`, then the `renderArea` provided
in [VkRenderingInfo](VkRenderingInfo.html)::`renderArea`,
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderArea`, or
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html)::`renderArea`
is rotated by the implementation.
The per-view render areas are not rotated.

3) How does this extension interact with
`[VK_QCOM_multiview_per_view_viewports](VK_QCOM_multiview_per_view_viewports.html)`

**RESOLVED**: There is no direct interaction.
The per-view viewports and the per-view renderAreas are orthogonal features.

4) When a per-view `renderArea` is specified, must multiview rendering
for each view of a multiview render pass be contained within the per-view
`renderArea`?

**RESOLVED**: Yes, and the `[VK_QCOM_multiview_per_view_viewports](VK_QCOM_multiview_per_view_viewports.html)` may
help here since it provides per-view scissors.

5) When per-view render areas are specified, what purpose if any do
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderArea` and
[VkRenderingInfo](VkRenderingInfo.html)::`renderArea` serve?

**RESOLVED**: The per-view `renderArea` effectively overrides the
per-renderpass `renderArea`.
The per-view `renderArea` defines the regions of the attachments that
are effected by load, store, and multisample resolve operations.
A valid implementation could ignore the per-renderpass `renderArea`.
However, as an aid to the implementation, the application must set the
per-renderpass `renderArea` to an area that is at least as large as the
union of all the per-view render areas.
Pixels that are within the per-renderpass `renderArea` but not within
any per-view render area must not be affected by load, store, or multisample
resolve operations.

* 
Revision 1, 2023-01-10 (Jeff Leger)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_multiview_per_view_render_areas).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
