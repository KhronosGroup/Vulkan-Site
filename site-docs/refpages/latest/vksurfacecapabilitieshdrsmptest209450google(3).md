# VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE - Structure describing SMPTE ST 2094-50 dynamic metadata capabilities of a surface

The `VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE` structure is defined
as:

// Provided by VK_GOOGLE_hdr_smpte_st_209450_metadata
typedef struct VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdrSmpteSt209450Supported;
} VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hdrSmpteSt209450Supported` is a boolean describing whether the
surface is able to support SMPTE ST 2094-50 dynamic metadata.

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) to determine support for SMPTE ST 2094-50
dynamic metadata on a surface.
If `hdrSmpteSt209450Supported` is [VK_FALSE](VK_FALSE.html), it indicates that
attaching SMPTE ST 2094-50 dynamic metadata is not possible for this
surface.

Applications **must** not attempt to include [VkHdrSmpteSt209450GOOGLE](VkHdrSmpteSt209450GOOGLE.html) in
the `pNext` chain of a [VkHdrMetadataEXT](VkHdrMetadataEXT.html) for a swapchain created
for a surface if `hdrSmpteSt209450Supported` is [VK_FALSE](VK_FALSE.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE-sType-sType) VUID-VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_HDR_SMPTE_ST_209450_GOOGLE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_GOOGLE_hdr_smpte_st_209450_metadata](VK_GOOGLE_hdr_smpte_st_209450_metadata.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
