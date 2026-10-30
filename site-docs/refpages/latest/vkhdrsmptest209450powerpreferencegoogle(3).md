# VkHdrSmpteSt209450PowerPreferenceGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHdrSmpteSt209450PowerPreferenceGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHdrSmpteSt209450PowerPreferenceGOOGLE - Power preference for SMPTE ST 2094-50 dynamic metadata tone mapping

Possible values of [VkHdrSmpteSt209450GOOGLE](VkHdrSmpteSt209450GOOGLE.html)::`powerPreference`,
specifying trade-off between color accuracy and power consumption, are:

// Provided by VK_GOOGLE_hdr_smpte_st_209450_metadata
typedef enum VkHdrSmpteSt209450PowerPreferenceGOOGLE {
    VK_HDR_SMPTE_ST_209450_POWER_PREFERENCE_COLOR_ACCURACY_GOOGLE = 0,
    VK_HDR_SMPTE_ST_209450_POWER_PREFERENCE_LOW_POWER_GOOGLE = 1,
} VkHdrSmpteSt209450PowerPreferenceGOOGLE;

* 
[VK_HDR_SMPTE_ST_209450_POWER_PREFERENCE_COLOR_ACCURACY_GOOGLE](#)
specifies that the implementation must use the tone mapping algorithm
specified in Annex A of SMPTE ST 2094-50.

* 
[VK_HDR_SMPTE_ST_209450_POWER_PREFERENCE_LOW_POWER_GOOGLE](#) specifies
that the implementation may use simplified tone mapping algorithms to
reduce power consumption, while still maintaining accuracy for grayscale
content and providing reasonable behavior for color content.

[VK_GOOGLE_hdr_smpte_st_209450_metadata](VK_GOOGLE_hdr_smpte_st_209450_metadata.html), [VkHdrSmpteSt209450GOOGLE](VkHdrSmpteSt209450GOOGLE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkHdrSmpteSt209450PowerPreferenceGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
