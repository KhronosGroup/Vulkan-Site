# VkHdrMetadataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHdrMetadataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHdrMetadataEXT - Specify HDR metadata

The `VkHdrMetadataEXT` structure is defined as:

// Provided by VK_EXT_hdr_metadata
typedef struct VkHdrMetadataEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkXYColorEXT       displayPrimaryRed;
    VkXYColorEXT       displayPrimaryGreen;
    VkXYColorEXT       displayPrimaryBlue;
    VkXYColorEXT       whitePoint;
    float              maxLuminance;
    float              minLuminance;
    float              maxContentLightLevel;
    float              maxFrameAverageLightLevel;
} VkHdrMetadataEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayPrimaryRed` is a [VkXYColorEXT](VkXYColorEXT.html) structure specifying the
red primary of the display used to optimize the content

* 
`displayPrimaryGreen` is a [VkXYColorEXT](VkXYColorEXT.html) structure specifying
the green primary of the display used to optimize the content

* 
`displayPrimaryBlue` is a [VkXYColorEXT](VkXYColorEXT.html) structure specifying
the blue primary of the display used to optimize the content

* 
`whitePoint` is a [VkXYColorEXT](VkXYColorEXT.html) structure specifying the
white-point of the display used to optimize the content

* 
`maxLuminance` is the maximum luminance of the display used to
optimize the content in nits

* 
`minLuminance` is the minimum luminance of the display used to
optimize the content in nits

* 
`maxContentLightLevel` is the value in nits of the desired luminance
for the brightest pixels in the displayed image.

* 
`maxFrameAverageLightLevel` is the value in nits of the average
luminance of the frame which has the brightest average luminance
anywhere in the content.

If any of the above values are unknown, they **can** be set to 0.

|  | The meta-data provided here is intended to be used as defined in the SMPTE
| --- | --- |
2086, CTA 861.3 and CIE 15:2004 specifications.
The validity and use of this data is outside the scope of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-VkHdrMetadataEXT-sType-sType) VUID-VkHdrMetadataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HDR_METADATA_EXT](VkStructureType.html)

* 
[](#VUID-VkHdrMetadataEXT-pNext-pNext) VUID-VkHdrMetadataEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkHdrVividDynamicMetadataHUAWEI](VkHdrVividDynamicMetadataHUAWEI.html)

* 
[](#VUID-VkHdrMetadataEXT-sType-unique) VUID-VkHdrMetadataEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_EXT_hdr_metadata](VK_EXT_hdr_metadata.html), [VkStructureType](VkStructureType.html), [VkXYColorEXT](VkXYColorEXT.html), [vkSetHdrMetadataEXT](vkSetHdrMetadataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkHdrMetadataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
