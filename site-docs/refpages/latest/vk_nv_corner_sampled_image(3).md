# VK_NV_corner_sampled_image(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_corner_sampled_image.html

## Table of Contents

- [Name](#_name)
- [VK_NV_corner_sampled_image](#VK_NV_corner_sampled_image)
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

VK_NV_corner_sampled_image - device extension

**Name String**

`VK_NV_corner_sampled_image`

**Extension Type**

Device extension

**Registered Extension Number**

51

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_corner_sampled_image] @dgkoch%0A*Here describe the issue or question you have about the VK_NV_corner_sampled_image extension*)

**Last Modified Date**

2018-08-13

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Pat Brown, NVIDIA

* 
Chris Lentini, NVIDIA

This extension adds support for a new image organization, which this
extension refers to as “corner-sampled” images.
A corner-sampled image differs from a conventional image in the following
ways:

* 
Texels are centered on integer coordinates.
See [Unnormalized Texel Coordinate    Operations](../../../../spec/latest/chapters/textures.html#textures-unnormalized-to-integer)

* 
Normalized coordinates are scaled using coord × (dim - 1)
rather than coord × dim, where dim is the size of one
dimension of the image.
See [normalized texel coordinate    transform](../../../../spec/latest/chapters/textures.html#textures-normalized-to-unnormalized).

* 
Partial derivatives are scaled using coord × (dim - 1)
rather than coord × dim.
See [Scale Factor Operation](../../../../spec/latest/chapters/textures.html#textures-scale-factor).

* 
Calculation of the next higher LOD size goes according to
⌈dim / 2⌉ rather than ⌊dim / 2⌋.
See [Image Mip Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing).

* 
The minimum level size is 2x2 for 2D images and 2x2x2 for 3D images.
See [Image Mip Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing).

This image organization is designed to facilitate a system like Ptex with
separate textures for each face of a subdivision or polygon mesh.
Placing sample locations at pixel corners allows applications to maintain
continuity between adjacent patches by duplicating values along shared
edges.
Additionally, using the modified mipmapping logic along with texture
dimensions of the form 2n+1 allows continuity across shared edges
even if the adjacent patches use different LOD values.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCornerSampledImageFeaturesNV](VkPhysicalDeviceCornerSampledImageFeaturesNV.html)

* 
`VK_NV_CORNER_SAMPLED_IMAGE_EXTENSION_NAME`

* 
`VK_NV_CORNER_SAMPLED_IMAGE_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CORNER_SAMPLED_IMAGE_FEATURES_NV](VkStructureType.html)

What should this extension be named?

**DISCUSSION**: While naming this extension, we chose the most distinctive
aspect of the image organization and referred to such images as
“corner-sampled images”.
As a result, we decided to name the extension NV_corner_sampled_image.

Do we need a format feature flag so formats can advertise if they support corner-sampling?

**DISCUSSION**: Currently NVIDIA supports this for all 2D and 3D formats, but
not for cube maps or depth-stencil formats.
A format feature might be useful if other vendors would only support this on
some formats.

Do integer texel coordinates have a different range for corner-sampled images?

**RESOLVED**: No, these are unchanged.

Do unnormalized sampler coordinates work with corner-sampled images? Are there any functional differences?

**RESOLVED**: Yes.
Unnormalized coordinates are treated as already scaled for corner-sample
usage.

Should we have a diagram in the “Image Operations” chapter demonstrating different texel sampling locations?

**RESOLVED**: Maybe later.

* 
Revision 1, 2018-08-14 (Daniel Koch)

Internal revisions

Revision 2, 2018-08-14 (Daniel Koch)

* 
???

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_corner_sampled_image).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
