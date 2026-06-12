# VK_EXT_depth_range_unrestricted(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_depth_range_unrestricted.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_depth_range_unrestricted](#VK_EXT_depth_range_unrestricted)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_depth_range_unrestricted - device extension

**Name String**

`VK_EXT_depth_range_unrestricted`

**Extension Type**

Device extension

**Registered Extension Number**

14

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_depth_range_unrestricted] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_depth_range_unrestricted extension*)

**Last Modified Date**

2017-06-22

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension removes the [VkViewport](VkViewport.html) `minDepth` and
`maxDepth` restrictions that the values must be between `0.0` and `1.0`,
inclusive.
It also removes the same restriction on
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) `minDepthBounds` and
`maxDepthBounds`.
Finally it removes the restriction on the `depth` value in
[VkClearDepthStencilValue](VkClearDepthStencilValue.html).

* 
`VK_EXT_DEPTH_RANGE_UNRESTRICTED_EXTENSION_NAME`

* 
`VK_EXT_DEPTH_RANGE_UNRESTRICTED_SPEC_VERSION`

1) How do [VkViewport](VkViewport.html) `minDepth` and `maxDepth` values outside
of the `0.0` to `1.0` range interact with
[Primitive Clipping](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-clipping)?

**RESOLVED**: The behavior described in [Primitive Clipping](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-clipping) still applies.
If depth clamping is disabled the depth values are still clipped to 0
≤ zc ≤ wc before the viewport transform.
If depth clamping is enabled the above equation is ignored and the depth
values are instead clamped to the [VkViewport](VkViewport.html) `minDepth` and
`maxDepth` values, which in the case of this extension can be outside of
the `0.0` to `1.0` range.

2) What happens if a resulting depth fragment is outside of the `0.0` to
`1.0` range and the depth buffer is fixed-point rather than floating-point?

**RESOLVED**: This situation can also arise without this extension (when
fragment shaders replace depth values, for example), and this extension does
not change the behavior, which is defined in the [Depth Test](../../../../spec/latest/chapters/fragops.html#fragops-depth) section of the Fragment Operations chapter.

* 
Revision 1, 2017-06-22 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_depth_range_unrestricted).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
