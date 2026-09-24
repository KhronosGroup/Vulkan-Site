# VK_EXT_blend_operation_advanced(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_blend_operation_advanced.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_blend_operation_advanced](#VK_EXT_blend_operation_advanced)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_blend_operation_advanced - device extension

**Name String**

`VK_EXT_blend_operation_advanced`

**Extension Type**

Device extension

**Registered Extension Number**

149

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_blend_operation_advanced] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_blend_operation_advanced extension*)

**Last Modified Date**

2017-06-12

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds a number of “advanced” blending operations that **can**
be used to perform new color blending operations, many of which are more
complex than the standard blend modes provided by unextended Vulkan.
This extension requires different styles of usage, depending on the level of
hardware support and the enabled features:

* 
If
[VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT](VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT.html)::`advancedBlendCoherentOperations`
is [VK_FALSE](VK_FALSE.html), the new blending operations are supported, but a
memory dependency **must** separate each advanced blend operation on a
given sample.
[VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits.html) is used to
synchronize reads using advanced blend operations.

* 
If
[VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT](VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT.html)::`advancedBlendCoherentOperations`
is [VK_TRUE](VK_TRUE.html), advanced blend operations obey primitive order just
like basic blend operations.

In unextended Vulkan, the set of blending operations is limited, and **can** be
expressed very simply.
The [VK_BLEND_OP_MIN](VkBlendOp.html) and [VK_BLEND_OP_MAX](VkBlendOp.html) blend operations simply
compute component-wise minimums or maximums of source and destination color
components.
The [VK_BLEND_OP_ADD](VkBlendOp.html), [VK_BLEND_OP_SUBTRACT](VkBlendOp.html), and
[VK_BLEND_OP_REVERSE_SUBTRACT](VkBlendOp.html) modes multiply the source and destination
colors by source and destination factors and either add the two products
together or subtract one from the other.
This limited set of operations supports many common blending operations but
precludes the use of more sophisticated transparency and blending operations
commonly available in many dedicated imaging APIs.

This extension provides a number of new “advanced” blending operations.
Unlike traditional blending operations using [VK_BLEND_OP_ADD](VkBlendOp.html), these
blending equations do not use source and destination factors specified by
[VkBlendFactor](VkBlendFactor.html).
Instead, each blend operation specifies a complete equation based on the
source and destination colors.
These new blend operations are used for both RGB and alpha components; they
**must** not be used to perform separate RGB and alpha blending (via different
values of color and alpha [VkBlendOp](VkBlendOp.html)).

These blending operations are performed using premultiplied colors, where
RGB colors **can** be considered premultiplied or non-premultiplied by alpha,
according to the `srcPremultiplied` and `dstPremultiplied` members
of [VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html).
If a color is considered non-premultiplied, the (R,G,B) color components are
multiplied by the alpha component prior to blending.
For non-premultiplied color components in the range [0,1], the
corresponding premultiplied color component would have values in the range
[0 × A, 1 × A].

Many of these advanced blending equations are formulated where the result of
blending source and destination colors with partial coverage have three
separate contributions: from the portions covered by both the source and the
destination, from the portion covered only by the source, and from the
portion covered only by the destination.
The blend parameter
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`blendOverlap`
**can** be used to specify a correlation between source and destination pixel
coverage.
If set to [VK_BLEND_OVERLAP_CONJOINT_EXT](VkBlendOverlapEXT.html), the source and destination
are considered to have maximal overlap, as would be the case if drawing two
objects on top of each other.
If set to [VK_BLEND_OVERLAP_DISJOINT_EXT](VkBlendOverlapEXT.html), the source and destination
are considered to have minimal overlap, as would be the case when rendering
a complex polygon tessellated into individual non-intersecting triangles.
If set to [VK_BLEND_OVERLAP_UNCORRELATED_EXT](VkBlendOverlapEXT.html), the source and
destination coverage are assumed to have no spatial correlation within the
pixel.

In addition to the coherency issues on implementations not supporting
`advancedBlendCoherentOperations`, this extension has several
limitations worth noting.
First, the new blend operations have a limit on the number of color
attachments they **can** be used with, as indicated by
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html)::`advancedBlendMaxColorAttachments`.
Additionally, blending precision **may** be limited to 16-bit floating-point,
which **may** result in a loss of precision and dynamic range for framebuffer
formats with 32-bit floating-point components, and in a loss of precision
for formats with 12- and 16-bit signed or unsigned normalized integer
components.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT](VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html)

Extending [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html):

* 
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)

* 
[VkBlendOverlapEXT](VkBlendOverlapEXT.html)

* 
`VK_EXT_BLEND_OPERATION_ADVANCED_EXTENSION_NAME`

* 
`VK_EXT_BLEND_OPERATION_ADVANCED_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits.html)

Extending [VkBlendOp](VkBlendOp.html):

* 
[VK_BLEND_OP_BLUE_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_COLORBURN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_COLORDODGE_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_CONTRAST_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DARKEN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DIFFERENCE_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DST_ATOP_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DST_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DST_IN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DST_OUT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_DST_OVER_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_EXCLUSION_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_GREEN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_HARDLIGHT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_HARDMIX_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_HSL_COLOR_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_HSL_HUE_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_HSL_LUMINOSITY_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_HSL_SATURATION_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_INVERT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_INVERT_OVG_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_INVERT_RGB_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_LIGHTEN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_LINEARBURN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_LINEARDODGE_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_LINEARLIGHT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_MINUS_CLAMPED_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_MINUS_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_MULTIPLY_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_OVERLAY_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_PINLIGHT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_PLUS_CLAMPED_ALPHA_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_PLUS_CLAMPED_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_PLUS_DARKER_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_PLUS_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_RED_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SCREEN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SOFTLIGHT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SRC_ATOP_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SRC_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SRC_IN_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SRC_OUT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_SRC_OVER_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_VIVIDLIGHT_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_XOR_EXT](VkBlendOp.html)

* 
[VK_BLEND_OP_ZERO_EXT](VkBlendOp.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_ADVANCED_STATE_CREATE_INFO_EXT](VkStructureType.html)

None.

* 
Revision 1, 2017-06-12 (Jeff Bolz)

Internal revisions

Revision 2, 2017-06-12 (Jeff Bolz)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_blend_operation_advanced).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
