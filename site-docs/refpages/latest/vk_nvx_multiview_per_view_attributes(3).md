# VK_NVX_multiview_per_view_attributes(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NVX_multiview_per_view_attributes.html

## Table of Contents

- [Name](#_name)
- [VK_NVX_multiview_per_view_attributes](#VK_NVX_multiview_per_view_attributes)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NVX_multiview_per_view_attributes - device extension

**Name String**

`VK_NVX_multiview_per_view_attributes`

**Extension Type**

Device extension

**Registered Extension Number**

98

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_multiview](VK_KHR_multiview.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

**SPIR-V Dependencies**

* 
[SPV_NVX_multiview_per_view_attributes](https://github.khronos.org/SPIRV-Registry/extensions/NVX/SPV_NVX_multiview_per_view_attributes.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NVX_multiview_per_view_attributes] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NVX_multiview_per_view_attributes extension*)

**Last Modified Date**

2017-01-13

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NVX_multiview_per_view_attributes`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nvx/GL_NVX_multiview_per_view_attributes.txt)

* 
This extension interacts with `[VK_NV_viewport_array2](VK_NV_viewport_array2.html)`.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Daniel Koch, NVIDIA

This extension adds a new way to write shaders to be used with multiview
subpasses, where the attributes for all views are written out by a single
invocation of the
[pre-rasterization shader stages](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).
Related SPIR-V and GLSL extensions `SPV_NVX_multiview_per_view_attributes`
and `GL_NVX_multiview_per_view_attributes` introduce per-view position and
viewport mask attributes arrays, and this extension defines how those
per-view attribute arrays are interpreted by Vulkan.
Pipelines using per-view attributes **may** only execute the
[pre-rasterization shader stages](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) once for all views rather than once per-view, which reduces
redundant shading work.

A subpass creation flag controls whether the subpass uses this extension.
A subpass **must** either exclusively use this extension or not use it at all.

Some Vulkan implementations only support the position attribute varying
between views in the X component.
A subpass can declare via a second creation flag whether all pipelines
compiled for this subpass will obey this restriction.

Shaders that use the new per-view outputs (e.g. `gl_PositionPerViewNV`)
**must** also write the non-per-view output (`gl_Position`), and the values
written **must** be such that `gl_Position =
gl_PositionPerViewNV[gl_ViewIndex]` for all views in the subpass.
Implementations are free to either use the per-view outputs or the
non-per-view outputs, whichever would be more efficient.

If the `[VK_NV_viewport_array2](VK_NV_viewport_array2.html)` extension is not also supported and
enabled, the per-view viewport mask **must** not be used.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX](VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkRenderingInfo](VkRenderingInfo.html):

[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)

* 
`VK_NVX_MULTIVIEW_PER_VIEW_ATTRIBUTES_EXTENSION_NAME`

* 
`VK_NVX_MULTIVIEW_PER_VIEW_ATTRIBUTES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_ATTRIBUTES_PROPERTIES_NVX](VkStructureType.html)

Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

* 
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](VkSubpassDescriptionFlagBits.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_ATTRIBUTES_INFO_NVX](VkStructureType.html)

* 
[`PositionPerViewNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-positionperview)

* 
[`ViewportMaskPerViewNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-viewportmaskperview)

* 
[    `PerViewAttributesNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-PerViewAttributesNV)

#version 450 core

#extension GL_KHX_multiview : enable
#extension GL_NVX_multiview_per_view_attributes : enable

layout(location = 0) in vec4 position;
layout(set = 0, binding = 0) uniform Block { mat4 mvpPerView[2]; } buf;

void main()
{
    // Output both per-view positions and gl_Position as a function
    // of gl_ViewIndex
    gl_PositionPerViewNV[0] = buf.mvpPerView[0] * position;
    gl_PositionPerViewNV[1] = buf.mvpPerView[1] * position;
    gl_Position = buf.mvpPerView[gl_ViewIndex] * position;
}

* 
Revision 1, 2017-01-13 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NVX_multiview_per_view_attributes).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
