# VK_QCOM_multiview_per_view_viewports(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_multiview_per_view_viewports.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_multiview_per_view_viewports](#VK_QCOM_multiview_per_view_viewports)
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

VK_QCOM_multiview_per_view_viewports - device extension

**Name String**

`VK_QCOM_multiview_per_view_viewports`

**Extension Type**

Device extension

**Registered Extension Number**

489

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
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_multiview_per_view_viewports] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_multiview_per_view_viewports extension*)

**Last Modified Date**

2022-11-22

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`

* 
This extension interacts with `[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html)`

**Contributors**

* 
Jeff Leger, Qualcomm

* 
Jonathan Tinkham, Qualcomm

* 
Jonathan Wicks, Qualcomm

Certain use cases for multiview have a need for specifying a separate
viewport and scissor for each view, without using shader-based viewport
indexing as introduced with `[VK_EXT_shader_viewport_index_layer](VK_EXT_shader_viewport_index_layer.html)`.

This extension adds a new way to control ViewportIndex with multiview.
When the [`multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled and if the last
pre-rasterization shader entry point’s interface does not use the
`ViewportIndex` built-in decoration, then each view of a multiview render
pass instance will use a viewport and scissor index equal to the
`ViewIndex`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM](VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM.html)

* 
`VK_QCOM_MULTIVIEW_PER_VIEW_VIEWPORTS_EXTENSION_NAME`

* 
`VK_QCOM_MULTIVIEW_PER_VIEW_VIEWPORTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_VIEWPORTS_FEATURES_QCOM](VkStructureType.html)

1) Is it possible to enable/disable the
[`multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports)
feature for individual render pass instances?

**RESOLVED**: No, when the multiviewPerViewViewports feature is enabled during
vkCreateDevice, then all created render pass instances (including dynamic
render passes from `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`) and all created
VkPipelines will have the feature enabled.
This approach was chosen because it simplifies application code and there is
no known use case to enable/disable the feature for individual render passes
or pipelines.

2) When this extension is used, is the value of `ViewportIndex`
implicitly written by the last pre-rasterization shader stage and can the
value of `ViewportIndex` be read in the fragment shader?

**RESOLVED**: No, use of the extension does not add an implicit write to
`ViewportIndex` in any shader stage, and additionally, the value of
`ViewportIndex` in the fragment shader is undefined.

* 
Revision 1, 2022-11-22 (Jeff Leger)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_multiview_per_view_viewports).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
