# VkHdrSmpteSt209450GOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHdrSmpteSt209450GOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHdrSmpteSt209450GOOGLE - specify SMPTE ST 2094-50 dynamic metadata

When the [`hdrSmpteSt209450`](../../../../spec/latest/chapters/features.html#features-hdrSmpteSt209450) feature is
enabled and
[VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE](VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE.html)::`hdrSmpteSt209450Supported`
is [VK_TRUE](VK_TRUE.html) for the swapchain’s surface, SMPTE ST 2094-50 dynamic
metadata **can** be set to control the reproduction of content by including the
`VkHdrSmpteSt209450GOOGLE` structure in the `pNext` chain of
[VkHdrMetadataEXT](VkHdrMetadataEXT.html).

The `VkHdrSmpteSt209450GOOGLE` structure is defined as:

// Provided by VK_GOOGLE_hdr_smpte_st_209450_metadata
typedef struct VkHdrSmpteSt209450GOOGLE {
    VkStructureType                            sType;
    const void*                                pNext;
    size_t                                     metadataSize;
    const void*                                pMetadata;
    VkHdrSmpteSt209450PowerPreferenceGOOGLE    powerPreference;
} VkHdrSmpteSt209450GOOGLE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`metadataSize` is the size in bytes of the buffer pointed to by
`pMetadata`.

* 
`pMetadata` is a pointer to a buffer containing the
`smpte_st_2094_50_application_info`() bitstream, as defined in Annex
C.2.1 of SMPTE ST 2094-50.
This data is copied during the call to [vkSetHdrMetadataEXT](vkSetHdrMetadataEXT.html), and
the buffer may be modified or freed after the call.
No validation is performed on the contents of this buffer.

* 
`powerPreference` is a [VkHdrSmpteSt209450PowerPreferenceGOOGLE](VkHdrSmpteSt209450PowerPreferenceGOOGLE.html)
value allowing an application to suggest a trade-off between color
accuracy and power consumption.

|  | The SMPTE ST 2094-50 metadata is intended to be used as defined in the SMPTE
| --- | --- |
ST 2094-50 specification.
The validity and use of this data is outside the scope of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-VkHdrSmpteSt209450GOOGLE-sType-sType) VUID-VkHdrSmpteSt209450GOOGLE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HDR_SMPTE_ST_209450_GOOGLE](VkStructureType.html)

* 
[](#VUID-VkHdrSmpteSt209450GOOGLE-pMetadata-parameter) VUID-VkHdrSmpteSt209450GOOGLE-pMetadata-parameter

 `pMetadata` **must** be a valid pointer to an array of `metadataSize` bytes

* 
[](#VUID-VkHdrSmpteSt209450GOOGLE-powerPreference-parameter) VUID-VkHdrSmpteSt209450GOOGLE-powerPreference-parameter

 `powerPreference` **must** be a valid [VkHdrSmpteSt209450PowerPreferenceGOOGLE](VkHdrSmpteSt209450PowerPreferenceGOOGLE.html) value

* 
[](#VUID-VkHdrSmpteSt209450GOOGLE-metadataSize-arraylength) VUID-VkHdrSmpteSt209450GOOGLE-metadataSize-arraylength

 `metadataSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkHdrMetadataEXT](VkHdrMetadataEXT.html)

[VK_GOOGLE_hdr_smpte_st_209450_metadata](VK_GOOGLE_hdr_smpte_st_209450_metadata.html), [VkHdrSmpteSt209450PowerPreferenceGOOGLE](VkHdrSmpteSt209450PowerPreferenceGOOGLE.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkHdrSmpteSt209450GOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
