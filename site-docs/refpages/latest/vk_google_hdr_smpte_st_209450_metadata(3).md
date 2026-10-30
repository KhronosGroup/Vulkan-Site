# VK_GOOGLE_hdr_smpte_st_209450_metadata(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_GOOGLE_hdr_smpte_st_209450_metadata.html

## Table of Contents

- [Name](#_name)
- [VK_GOOGLE_hdr_smpte_st_209450_metadata](#VK_GOOGLE_hdr_smpte_st_209450_metadata)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_GOOGLE_hdr_smpte_st_209450_metadata - device extension

**Name String**

`VK_GOOGLE_hdr_smpte_st_209450_metadata`

**Extension Type**

Device extension

**Registered Extension Number**

719

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_EXT_hdr_metadata](VK_EXT_hdr_metadata.html)

**Contact**

* 
Christopher Cameron [ccameron](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_GOOGLE_hdr_smpte_st_209450_metadata] @ccameron%0A*Here describe the issue or question you have about the VK_GOOGLE_hdr_smpte_st_209450_metadata extension*)

**Extension Proposal**

[VK_GOOGLE_hdr_smpte_st_209450_metadata](../../../../features/latest/features/proposals/VK_GOOGLE_hdr_smpte_st_209450_metadata.html)

**Last Modified Date**

2026-10-08

**IP Status**

No known IP claims.

**Contributors**

* 
Alec Mouri, Google

* 
Christopher Cameron, Google

* 
John Reck, Google

This extension provides a mechanism for an application to attach SMPTE ST
2094-50 dynamic metadata to a swapchain via the
`VkHdrSmpteSt209450GOOGLE` structure.

The SMPTE ST 2094-50 standard defines dynamic metadata for use in high
dynamic range (HDR) image sequences.
This metadata provides information for tone mapping of image content to
displays characterized by their HDR headroom.

* 
Extending [VkHdrMetadataEXT](VkHdrMetadataEXT.html):

[VkHdrSmpteSt209450GOOGLE](VkHdrSmpteSt209450GOOGLE.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE](VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE](VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE.html)

* 
[VkHdrSmpteSt209450PowerPreferenceGOOGLE](VkHdrSmpteSt209450PowerPreferenceGOOGLE.html)

* 
`VK_GOOGLE_HDR_SMPTE_ST_209450_METADATA_EXTENSION_NAME`

* 
`VK_GOOGLE_HDR_SMPTE_ST_209450_METADATA_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_HDR_SMPTE_ST_209450_GOOGLE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HDR_SMPTE_ST_209450_FEATURES_GOOGLE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_HDR_SMPTE_ST_209450_GOOGLE](VkStructureType.html)

* 
Revision 1, 2026-10-08 (Christopher Cameron)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_GOOGLE_hdr_smpte_st_209450_metadata).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
