# VK_EXT_hdr_metadata(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_hdr_metadata.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_hdr_metadata](#VK_EXT_hdr_metadata)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_hdr_metadata - device extension

**Name String**

`VK_EXT_hdr_metadata`

**Extension Type**

Device extension

**Registered Extension Number**

106

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Courtney Goeltzenleuchter [courtney-g](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_hdr_metadata] @courtney-g%0A*Here describe the issue or question you have about the VK_EXT_hdr_metadata extension*)

**Last Modified Date**

2024-03-26

**IP Status**

No known IP claims.

**Contributors**

* 
Courtney Goeltzenleuchter, Google

* 
Sebastian Wick, Red Hat Inc.

* 
Tobias Hector, AMD

This extension defines two new structures and a function to assign SMPTE
(the Society of Motion Picture and Television Engineers) 2086 metadata and
CTA (Consumer Technology Association) 861.3 metadata to a swapchain.

SMPTE 2086 metadata defines the color volume of the display on which the
content was optimized for viewing and includes the color primaries, white
point, and luminance range.
When such content is reproduced on another display, this metadata can be
used by the presentation engine to improve processing of images.
For instance, values in the image can first be clamped to the color volume
described in the metadata, and then what remains can be remapped to the
color volume of the presentation engine.

CTA 861.3 metadata additionally includes the maximum intended luminance for
the content and the maximum average light level across frames.

This extension does not define exactly how this metadata is used, however,
it simply provides a mechanism to provide it to the presentation engine.
Presentation engines may process the image based on the metadata before
displaying it, resulting in the image being modified outside of Vulkan.
For example, the clamping of colors in the image to the color volume may
change those values in the image itself.

The metadata does not override or otherwise influence the color space and
color encoding.

* 
[vkSetHdrMetadataEXT](vkSetHdrMetadataEXT.html)

* 
[VkHdrMetadataEXT](VkHdrMetadataEXT.html)

* 
[VkXYColorEXT](VkXYColorEXT.html)

* 
`VK_EXT_HDR_METADATA_EXTENSION_NAME`

* 
`VK_EXT_HDR_METADATA_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_HDR_METADATA_EXT](VkStructureType.html)

1) Do we need a query function for the currently specified metadata?

No, Vulkan does not provide queries for state that the application can track
on its own.

2) Should we specify default metadata if not specified by the application?

No, the metadata is optional and the absence of the metadata is
well-defined.

* 
Revision 1, 2016-12-27 (Courtney Goeltzenleuchter)

Initial version

Revision 2, 2018-12-19 (Courtney Goeltzenleuchter)

* 
Correct implicit validity for VkHdrMetadataEXT structure

Revision 3, 2024-03-26 (Tobias Hector & Sebastian Wick)

* 
Clarifications and removal of erroneous “reference monitor” term

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_hdr_metadata).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
