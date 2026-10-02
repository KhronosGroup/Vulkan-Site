# VkCoarseSampleLocationNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCoarseSampleLocationNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCoarseSampleLocationNV - Structure specifying parameters controlling shading rate image usage

The `VkCoarseSampleLocationNV` structure identifies a specific pixel and
[sample index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) for one of the
coverage samples in a fragment that is larger than one pixel.
This structure is defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkCoarseSampleLocationNV {
    uint32_t    pixelX;
    uint32_t    pixelY;
    uint32_t    sample;
} VkCoarseSampleLocationNV;

* 
`pixelX` is added to the x coordinate of the upper-leftmost pixel of
each fragment to identify the pixel containing the coverage sample.

* 
`pixelY` is added to the y coordinate of the upper-leftmost pixel of
each fragment to identify the pixel containing the coverage sample.

* 
`sample` is the number of the coverage sample in the pixel
identified by `pixelX` and `pixelY`.

Valid Usage

* 
[](#VUID-VkCoarseSampleLocationNV-pixelX-02078) VUID-VkCoarseSampleLocationNV-pixelX-02078

`pixelX` **must** be less than the width (in pixels) of the fragment

* 
[](#VUID-VkCoarseSampleLocationNV-pixelY-02079) VUID-VkCoarseSampleLocationNV-pixelY-02079

`pixelY` **must** be less than the height (in pixels) of the fragment

* 
[](#VUID-VkCoarseSampleLocationNV-sample-02080) VUID-VkCoarseSampleLocationNV-sample-02080

`sample` **must** be less than the number of coverage samples in each
pixel belonging to the fragment

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkCoarseSampleLocationNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
