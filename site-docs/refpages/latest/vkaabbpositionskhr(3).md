# VkAabbPositionsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAabbPositionsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAabbPositionsKHR - Structure specifying two opposing corners of an axis-aligned bounding box

The `VkAabbPositionsKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAabbPositionsKHR {
    float    minX;
    float    minY;
    float    minZ;
    float    maxX;
    float    maxY;
    float    maxZ;
} VkAabbPositionsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkAabbPositionsKHR
typedef VkAabbPositionsKHR VkAabbPositionsNV;

* 
`minX` is the x position of one opposing corner of a bounding box.

* 
`minY` is the y position of one opposing corner of a bounding box.

* 
`minZ` is the z position of one opposing corner of a bounding box.

* 
`maxX` is the x position of the other opposing corner of a bounding
box.

* 
`maxY` is the y position of the other opposing corner of a bounding
box.

* 
`maxZ` is the z position of the other opposing corner of a bounding
box.

Valid Usage

* 
[](#VUID-VkAabbPositionsKHR-minX-03546) VUID-VkAabbPositionsKHR-minX-03546

`minX` **must** be less than or equal to `maxX`

* 
[](#VUID-VkAabbPositionsKHR-minY-03547) VUID-VkAabbPositionsKHR-minY-03547

`minY` **must** be less than or equal to `maxY`

* 
[](#VUID-VkAabbPositionsKHR-minZ-03548) VUID-VkAabbPositionsKHR-minZ-03548

`minZ` **must** be less than or equal to `maxZ`

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAabbPositionsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
