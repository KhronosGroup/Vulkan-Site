# VkCoarseSampleOrderCustomNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCoarseSampleOrderCustomNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCoarseSampleOrderCustomNV - Structure specifying parameters controlling shading rate image usage

The `VkCoarseSampleOrderCustomNV` structure is defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkCoarseSampleOrderCustomNV {
    VkShadingRatePaletteEntryNV        shadingRate;
    uint32_t                           sampleCount;
    uint32_t                           sampleLocationCount;
    const VkCoarseSampleLocationNV*    pSampleLocations;
} VkCoarseSampleOrderCustomNV;

* 
`shadingRate` is a shading rate palette entry that identifies the
fragment width and height for the combination of fragment area and
per-pixel coverage sample count to control.

* 
`sampleCount` identifies the per-pixel coverage sample count for the
combination of fragment area and coverage sample count to control.

* 
`sampleLocationCount` specifies the number of sample locations in
the custom ordering.

* 
`pSampleLocations` is a pointer to an array of
[VkCoarseSampleLocationNV](VkCoarseSampleLocationNV.html) structures specifying the location of
each sample in the custom ordering.

The `VkCoarseSampleOrderCustomNV` structure is used with a coverage
sample ordering type of [VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](VkCoarseSampleOrderTypeNV.html) to
specify the order of coverage samples for one combination of fragment width,
fragment height, and coverage sample count.

When using a custom sample ordering, element *j* in `pSampleLocations`
specifies a specific pixel location and
[sample index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) that corresponds to
[coverage index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) *j* in the
multi-pixel fragment.

Valid Usage

* 
[](#VUID-VkCoarseSampleOrderCustomNV-shadingRate-02073) VUID-VkCoarseSampleOrderCustomNV-shadingRate-02073

`shadingRate` **must** be a shading rate that generates fragments with
more than one pixel

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleCount-02074) VUID-VkCoarseSampleOrderCustomNV-sampleCount-02074

`sampleCount` **must** correspond to a sample count enumerated in
[VkSampleCountFlags](VkSampleCountFlags.html) whose corresponding bit is set in
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`framebufferNoAttachmentsSampleCounts`

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02075) VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02075

`sampleLocationCount` **must** be equal to the product of
`sampleCount`, the fragment width for `shadingRate`, and the
fragment height for `shadingRate`

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02076) VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02076

`sampleLocationCount` **must** be less than or equal to the value of
`VkPhysicalDeviceShadingRateImagePropertiesNV`::`shadingRateMaxCoarseSamples`

* 
[](#VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-02077) VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-02077

The array `pSampleLocations` **must** contain exactly one entry for
every combination of valid values for `pixelX`, `pixelY`, and
`sample` in the structure [VkCoarseSampleOrderCustomNV](#)

Valid Usage (Implicit)

* 
[](#VUID-VkCoarseSampleOrderCustomNV-shadingRate-parameter) VUID-VkCoarseSampleOrderCustomNV-shadingRate-parameter

 `shadingRate` **must** be a valid [VkShadingRatePaletteEntryNV](VkShadingRatePaletteEntryNV.html) value

* 
[](#VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-parameter) VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-parameter

 `pSampleLocations` **must** be a valid pointer to an array of `sampleLocationCount` [VkCoarseSampleLocationNV](VkCoarseSampleLocationNV.html) structures

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-arraylength) VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-arraylength

 `sampleLocationCount` **must** be greater than `0`

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCoarseSampleLocationNV](VkCoarseSampleLocationNV.html), [VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](VkPipelineViewportCoarseSampleOrderStateCreateInfoNV.html), [VkShadingRatePaletteEntryNV](VkShadingRatePaletteEntryNV.html), [vkCmdSetCoarseSampleOrderNV](vkCmdSetCoarseSampleOrderNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkCoarseSampleOrderCustomNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
