# Proposal: VK_GOOGLE_hdr_smpte_st_209450_metadata

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_GOOGLE_hdr_smpte_st_209450_metadata.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New Structures](#_new_structures)
- [3.1._New_Structures](#_new_structures)
- [3.2. New Enums](#_new_enums)
- [3.2._New_Enums](#_new_enums)
- [4. Issues](#_issues)
- [4.1. Issue 1: How is the bitstream validated?](#_issue_1_how_is_the_bitstream_validated)
- [4.1._Issue_1:_How_is_the_bitstream_validated?](#_issue_1_how_is_the_bitstream_validated)
- [4.2. Issue 2: SMPTE 2094-50 metadata includes a family of tone-mapping curves associated with a target headroom. Should there also be mechanism to restrict the headroom?](#_issue_2_smpte_2094_50_metadata_includes_a_family_of_tone_mapping_curves_associated_with_a_target_headroom_should_there_also_be_mechanism_to_restrict_the_headroom)
- [4.2._Issue_2:_SMPTE_2094-50_metadata_includes_a_family_of_tone-mapping_curves_associated_with_a_target_headroom._Should_there_also_be_mechanism_to_restrict_the_headroom?](#_issue_2_smpte_2094_50_metadata_includes_a_family_of_tone_mapping_curves_associated_with_a_target_headroom_should_there_also_be_mechanism_to_restrict_the_headroom)
- [4.3. Issue 3: How will the presentation engine be validated that tone-mapping was correctly performed?](#_issue_3_how_will_the_presentation_engine_be_validated_that_tone_mapping_was_correctly_performed)
- [4.3._Issue_3:_How_will_the_presentation_engine_be_validated_that_tone-mapping_was_correctly_performed?](#_issue_3_how_will_the_presentation_engine_be_validated_that_tone_mapping_was_correctly_performed)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New Structures](#_new_structures)
[3.2. New Enums](#_new_enums)

[4. Issues](#_issues)

[4.1. Issue 1: How is the bitstream validated?](#_issue_1_how_is_the_bitstream_validated)
[4.2. Issue 2: SMPTE 2094-50 metadata includes a family of tone-mapping curves associated with a target headroom. Should there also be mechanism to restrict the headroom?](#_issue_2_smpte_2094_50_metadata_includes_a_family_of_tone_mapping_curves_associated_with_a_target_headroom_should_there_also_be_mechanism_to_restrict_the_headroom)
[4.3. Issue 3: How will the presentation engine be validated that tone-mapping was correctly performed?](#_issue_3_how_will_the_presentation_engine_be_validated_that_tone_mapping_was_correctly_performed)

This proposal defines a new device extension, `VK_GOOGLE_hdr_smpte_st_209450_metadata`, which allows applications to attach SMPTE ST 2094-50 dynamic metadata to a swapchain.

High Dynamic Range (HDR) video content often uses dynamic metadata to guide tone mapping on a frame-by-frame or scene-by-scene basis.
The [SMPTE ST 2094-50](https://github.com/SMPTE/st2094-50) standard defines such dynamic metadata.
Vulkan currently supports static HDR metadata via the [`VK_EXT_hdr_metadata`](../../../../refpages/latest/refpages/source/VK_EXT_hdr_metadata.html) extension, which uses the [`VkHdrMetadataEXT`](../../../../refpages/latest/refpages/source/VkHdrMetadataEXT.html) structure.
However, there is no mechanism in Vulkan to associate SMPTE ST 2094-50 dynamic metadata with swapchain images.

Additionally, some presentation engines may have multiple implementations for applying the 2094-50 metadata. For example, a presentation engine on a mobile device may delegate tone mapping to a hardware accelerated block that has low color accuracy. That same presentation engine may also have a path to apply tone mapping through a high precision GPU shader, at the cost of power. There is currently no way to guide the presentation engine on how to apply this metadata (e.g., prioritizing power saving over color accuracy).

There is prior art (see: [`VK_HUAWEI_hdr_vivid`](../../../../refpages/latest/refpages/source/VK_HUAWEI_hdr_vivid.html)) for extending the existing [`VkHdrMetadataEXT`](../../../../refpages/latest/refpages/source/VkHdrMetadataEXT.html) structure via its `pNext` chain to pass dynamic metadata.
We follow this existing pattern.

We propose the `VK_GOOGLE_hdr_smpte_st_209450_metadata` extension.
It depends on [`VK_EXT_hdr_metadata`](../../../../refpages/latest/refpages/source/VK_EXT_hdr_metadata.html) and [`VK_KHR_get_surface_capabilities2`](../../../../refpages/latest/refpages/source/VK_KHR_get_surface_capabilities2.html).

`VkHdrSmpteSt209450GOOGLE` is introduced, which can be chained to the `pNext` member of [`VkHdrMetadataEXT`](../../../../refpages/latest/refpages/source/VkHdrMetadataEXT.html):

typedef struct VkHdrSmpteSt209450GOOGLE {
    VkStructureType                           sType;
    const void*                               pNext;
    size_t                                    metadataSize;
    const void*                               pMetadata;
    VkHdrSmpteSt209450PowerPreferenceGOOGLE powerPreference;
} VkHdrSmpteSt209450GOOGLE;

* 
`pMetadata` points to a buffer containing the `smpte_st_2094_50_application_info()` bitstream.

* 
`metadataSize` is the size of the buffer.

* 
`powerPreference` suggests a trade-off between color accuracy and power consumption.

The `VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE` structure is introduced to query support from the [`VkPhysicalDevice`](../../../../refpages/latest/refpages/source/VkPhysicalDevice.html):

typedef struct VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdrSmpteSt209450;
} VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE;

The `VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE` structure is introduced, which can be chained to the `pNext` member of [`VkSurfaceCapabilities2KHR`](../../../../refpages/latest/refpages/source/VkSurfaceCapabilities2KHR.html) to query per-surface support:

typedef struct VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdrSmpteSt209450Supported;
} VkSurfaceCapabilitiesHdrSmpteSt209450GOOGLE;

typedef enum VkHdrSmpteSt209450PowerPreferenceGOOGLE {
    VK_HDR_SMPTE_ST_209450_POWER_PREFERENCE_COLOR_ACCURACY_GOOGLE = 0,
    VK_HDR_SMPTE_ST_209450_POWER_PREFERENCE_LOW_POWER_GOOGLE = 1,
} VkHdrSmpteSt209450PowerPreferenceGOOGLE;

No validation is expected to be performed on the contents of the buffer pointed to by `pMetadata` by the Vulkan implementation. It is passed directly to the presentation engine.

Headroom is a more general concept common to modern presentation engines, and may be composed with other mechanisms for displaying HDR (for example, source-based mechanisms). Therefore, a separate extension for querying and restricting headroom on a swapchain may be more appropriate.

Validating that tone-mapping matched the SMPTE 2094-50 specification is not in scope.
