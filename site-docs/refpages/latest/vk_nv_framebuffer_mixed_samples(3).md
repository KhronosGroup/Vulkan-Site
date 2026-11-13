# VK_NV_framebuffer_mixed_samples(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_framebuffer_mixed_samples.html

## Table of Contents

- [Name](#_name)
- [VK_NV_framebuffer_mixed_samples](#VK_NV_framebuffer_mixed_samples)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_framebuffer_mixed_samples - device extension

**Name String**

`VK_NV_framebuffer_mixed_samples`

**Extension Type**

Device extension

**Registered Extension Number**

153

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_framebuffer_mixed_samples] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_framebuffer_mixed_samples extension*)

**Last Modified Date**

2017-06-04

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension allows multisample rendering with a raster and depth/stencil
sample count that is larger than the color sample count.
Rasterization and the results of the depth and stencil tests together
determine the portion of a pixel that is “covered”.
It can be useful to evaluate coverage at a higher frequency than color
samples are stored.
This coverage is then “reduced” to a collection of covered color samples,
each having an opacity value corresponding to the fraction of the color
sample covered.
The opacity can optionally be blended into individual color samples.

Rendering with fewer color samples than depth/stencil samples greatly
reduces the amount of memory and bandwidth consumed by the color buffer.
However, converting the coverage values into opacity introduces artifacts
where triangles share edges and **may** not be suitable for normal triangle
mesh rendering.

One expected use case for this functionality is Stencil-then-Cover path
rendering (similar to the OpenGL GL_NV_path_rendering extension).
The stencil step determines the coverage (in the stencil buffer) for an
entire path at the higher sample frequency, and then the cover step draws
the path into the lower frequency color buffer using the coverage
information to antialias path edges.
With this two-step process, internal edges are fully covered when
antialiasing is applied and there is no corruption on these edges.

The key features of this extension are:

* 
It allows render pass and framebuffer objects to be created where the
number of samples in the depth/stencil attachment in a subpass is a
multiple of the number of samples in the color attachments in the
subpass.

* 
A coverage reduction step is added to Fragment Operations which converts
a set of covered raster/depth/stencil samples to a set of color samples
that perform blending and color writes.
The coverage reduction step also includes an optional coverage
modulation step, multiplying color values by a fractional opacity
corresponding to the number of associated raster/depth/stencil samples
covered.

* 
Extending [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html):

[VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html)

* 
[VkCoverageModulationModeNV](VkCoverageModulationModeNV.html)

* 
[VkPipelineCoverageModulationStateCreateFlagsNV](VkPipelineCoverageModulationStateCreateFlagsNV.html)

* 
`VK_NV_FRAMEBUFFER_MIXED_SAMPLES_EXTENSION_NAME`

* 
`VK_NV_FRAMEBUFFER_MIXED_SAMPLES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_MODULATION_STATE_CREATE_INFO_NV](VkStructureType.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_NV](VkStructureType.html)

* 
Revision 1, 2017-06-04 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_framebuffer_mixed_samples).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
