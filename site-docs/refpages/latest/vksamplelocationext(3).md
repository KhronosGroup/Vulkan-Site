# VkSampleLocationEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSampleLocationEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSampleLocationEXT - Structure specifying the coordinates of a sample location

The `VkSampleLocationEXT` structure is defined as:

// Provided by VK_EXT_sample_locations
typedef struct VkSampleLocationEXT {
    float    x;
    float    y;
} VkSampleLocationEXT;

* 
`x` is the horizontal coordinate of the sample’s location.

* 
`y` is the vertical coordinate of the sample’s location.

The domain space of the sample location coordinates has an upper-left origin
within the pixel in framebuffer space.

The values specified in a `VkSampleLocationEXT` structure are always
clamped to the implementation-dependent sample location coordinate range
[`sampleLocationCoordinateRange`[0],`sampleLocationCoordinateRange`[1]]
that **can** be queried using
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html).

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkSampleLocationEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
