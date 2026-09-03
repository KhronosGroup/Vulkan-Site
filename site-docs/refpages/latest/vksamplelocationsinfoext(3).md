# VkSampleLocationsInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSampleLocationsInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSampleLocationsInfoEXT - Structure specifying a set of sample locations

The `VkSampleLocationsInfoEXT` structure is defined as:

// Provided by VK_EXT_sample_locations
typedef struct VkSampleLocationsInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkSampleCountFlagBits         sampleLocationsPerPixel;
    VkExtent2D                    sampleLocationGridSize;
    uint32_t                      sampleLocationsCount;
    const VkSampleLocationEXT*    pSampleLocations;
} VkSampleLocationsInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleLocationsPerPixel` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value
specifying the number of sample locations per pixel.

* 
`sampleLocationGridSize` is the size of the sample location grid to
select custom sample locations for.

* 
`sampleLocationsCount` is the number of sample locations in
`pSampleLocations`.

* 
`pSampleLocations` is a pointer to an array of
`sampleLocationsCount` [VkSampleLocationEXT](VkSampleLocationEXT.html) structures.

This structure **can** be used either to specify the sample locations to be
used for rendering or to specify the set of sample locations an image
subresource has been last rendered with for the purposes of layout
transitions of depth/stencil images created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html).

The sample locations in `pSampleLocations` specify
`sampleLocationsPerPixel` number of sample locations for each pixel in
the grid of the size specified in `sampleLocationGridSize`.
The sample location for sample i at the pixel grid location
(x,y) is taken from `pSampleLocations`[(x +  y ×
`sampleLocationGridSize.width`) × `sampleLocationsPerPixel`
+  i].

If the render pass has a fragment density map, the implementation will
choose the sample locations for the fragment and the contents of
`pSampleLocations` **may** be ignored.

Valid Usage

* 
[](#VUID-VkSampleLocationsInfoEXT-sampleLocationsPerPixel-01526) VUID-VkSampleLocationsInfoEXT-sampleLocationsPerPixel-01526

`sampleLocationsPerPixel` **must** be a valid
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) value that is set in
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html)::`sampleLocationSampleCounts`

* 
[](#VUID-VkSampleLocationsInfoEXT-sampleLocationsCount-01527) VUID-VkSampleLocationsInfoEXT-sampleLocationsCount-01527

`sampleLocationsCount` **must** equal
`sampleLocationsPerPixel` ×
`sampleLocationGridSize.width` ×
`sampleLocationGridSize.height`

Valid Usage (Implicit)

* 
[](#VUID-VkSampleLocationsInfoEXT-sType-sType) VUID-VkSampleLocationsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLE_LOCATIONS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSampleLocationsInfoEXT-pSampleLocations-parameter) VUID-VkSampleLocationsInfoEXT-pSampleLocations-parameter

 If `sampleLocationsCount` is not `0`, `pSampleLocations` **must** be a valid pointer to an array of `sampleLocationsCount` [VkSampleLocationEXT](VkSampleLocationEXT.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageMemoryBarrier](VkImageMemoryBarrier.html)

* 
[VkImageMemoryBarrier2](VkImageMemoryBarrier2.html)

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkAttachmentSampleLocationsEXT](VkAttachmentSampleLocationsEXT.html), [VkExtent2D](VkExtent2D.html), [VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkSampleLocationEXT](VkSampleLocationEXT.html), [VkStructureType](VkStructureType.html), [VkSubpassSampleLocationsEXT](VkSubpassSampleLocationsEXT.html), [vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkSampleLocationsInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
