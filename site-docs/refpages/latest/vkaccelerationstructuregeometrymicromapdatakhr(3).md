# VkAccelerationStructureGeometryMicromapDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryMicromapDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryMicromapDataKHR - Structure specifying the data used to build a micromap

When building micromaps with [vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html), a
`VkAccelerationStructureGeometryMicromapDataKHR` structure can be added
to the `pNext` chain of [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) to
specify the data used to build the micromap.

The `VkAccelerationStructureGeometryMicromapDataKHR` structure is
defined as:

// Provided by VK_KHR_opacity_micromap
typedef struct VkAccelerationStructureGeometryMicromapDataKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageKHR*           pUsageCounts;
    const VkMicromapUsageKHR* const*    ppUsageCounts;
    VkDeviceAddress                     data;
    VkDeviceAddress                     triangleArray;
    VkDeviceSize                        triangleArrayStride;
} VkAccelerationStructureGeometryMicromapDataKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usageCountsCount` specifies the number of usage counts structures
that will be used to determine the size of this micromap.

* 
`pUsageCounts` is a pointer to an array of [VkMicromapUsageKHR](VkMicromapUsageKHR.html)
structures.

* 
`ppUsageCounts` is a pointer to an array of pointers to
[VkMicromapUsageKHR](VkMicromapUsageKHR.html) structures.

* 
`data` is the device address to memory which contains the data for
the micromap.

* 
`triangleArray` is the device address to memory containing the
[VkMicromapTriangleKHR](VkMicromapTriangleKHR.html) data

* 
`triangleArrayStride` is the stride in bytes between each element of
`triangleArray`

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`.
The elements of the non-`NULL` array describe the total counts used to build
each micromap.
Each element contains a `count` which is the number of micromap
triangles of that `format` and `subdivisionLevel` contained in the
micromap.
Multiple elements with the same `format` and `subdivisionLevel` are
allowed and the total count for that `format` and `subdivisionLevel`
is the sum of the `count` for each element.

Each micromap triangle refers to one element in `triangleArray` which
contains the `format` and `subdivisionLevel` for that particular
triangle as well as a `dataOffset` in bytes which is the location
relative to `data` where that triangle’s micromap data begins.
The data at `triangleArray` is laid out as a 4 byte unsigned integer for
the `dataOffset` followed by a 2 byte unsigned integer for the
subdivision level then a 2 byte unsigned integer for the format.
In practice, compilers compile [VkMicromapTriangleKHR](VkMicromapTriangleKHR.html) to match this
pattern.

For opacity micromaps, the data at `data` is packed as either one bit
per element for [VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR](VkOpacityMicromapFormatKHR.html) or two bits per
element for [VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR](VkOpacityMicromapFormatKHR.html) and is packed from
LSB to MSB in each byte.
The data at each index in those bytes is interpreted as discussed in
[Ray Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-pUsageCounts-11642) VUID-VkAccelerationStructureGeometryMicromapDataKHR-pUsageCounts-11642

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-count-11643) VUID-VkAccelerationStructureGeometryMicromapDataKHR-count-11643

The total sum of `count` from all elements of `pUsageCounts` and
`ppUsageCounts` **must** be less than or equal to
[`maxMicromapTriangles`](../../../../spec/latest/chapters/limits.html#limits-maxMicromapTriangles)

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-subdivisionLevel-11645) VUID-VkAccelerationStructureGeometryMicromapDataKHR-subdivisionLevel-11645

For each member of `pUsageCounts` or `ppUsageCounts`, if
`format` is [VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR](VkOpacityMicromapFormatKHR.html),
`subdivisionLevel` **must** be less than or equal to
[    `maxOpacity2StateSubdivisionLevel`](../../../../spec/latest/chapters/limits.html#limits-maxOpacity2StateSubdivisionLevel)

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-triangleArrayStride-11646) VUID-VkAccelerationStructureGeometryMicromapDataKHR-triangleArrayStride-11646

`triangleArrayStride` **must** be greater than or equal to `8` bytes

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-triangleArrayStride-11647) VUID-VkAccelerationStructureGeometryMicromapDataKHR-triangleArrayStride-11647

`triangleArrayStride` **must** be a multiple of `4` bytes

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryMicromapDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MICROMAP_DATA_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-pUsageCounts-parameter) VUID-VkAccelerationStructureGeometryMicromapDataKHR-pUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `pUsageCounts` is not `NULL`, `pUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid [VkMicromapUsageKHR](VkMicromapUsageKHR.html) structures

* 
[](#VUID-VkAccelerationStructureGeometryMicromapDataKHR-ppUsageCounts-parameter) VUID-VkAccelerationStructureGeometryMicromapDataKHR-ppUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `ppUsageCounts` is not `NULL`, `ppUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid pointers to valid [VkMicromapUsageKHR](VkMicromapUsageKHR.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html)

[VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html), `VkDeviceAddress`, `VkDeviceSize`, [VkMicromapUsageKHR](VkMicromapUsageKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_opacity_micromap/micromaps.html#VkAccelerationStructureGeometryMicromapDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
