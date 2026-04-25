# VkAccelerationStructureTrianglesOpacityMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureTrianglesOpacityMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureTrianglesOpacityMicromapEXT - Structure specifying an opacity micromap in a bottom-level acceleration structure

The `VkAccelerationStructureTrianglesOpacityMicromapEXT` structure is
defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkAccelerationStructureTrianglesOpacityMicromapEXT {
    VkStructureType                     sType;
    void*                               pNext;
    VkIndexType                         indexType;
    VkDeviceOrHostAddressConstKHR       indexBuffer;
    VkDeviceSize                        indexStride;
    uint32_t                            baseTriangle;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageEXT*           pUsageCounts;
    const VkMicromapUsageEXT* const*    ppUsageCounts;
    VkMicromapEXT                       micromap;
} VkAccelerationStructureTrianglesOpacityMicromapEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`indexType` is the type of triangle indices used when indexing this
micromap.

* 
`indexBuffer` is a device or host address of memory containing the
triangle indices.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html) it **must** be `NULL`.

* 
`indexStride` is the byte stride between triangle indices.

* 
`baseTriangle` is the base value added to the non-negative triangle
indices.

* 
`usageCountsCount` specifies the number of usage counts structures
that will be used to determine the size of this micromap.

* 
`pUsageCounts` is a pointer to an array of [VkMicromapUsageEXT](VkMicromapUsageEXT.html)
structures.

* 
`ppUsageCounts` is a pointer to an array of pointers to
[VkMicromapUsageEXT](VkMicromapUsageEXT.html) structures.

* 
`micromap` is the handle to the micromap object to include in this
geometry.

If `VkAccelerationStructureTrianglesOpacityMicromapEXT` is included in
the `pNext` chain of a
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html) or
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) structure, that
geometry will reference that micromap.

For each triangle in the geometry, the acceleration structure build fetches
an index from `indexBuffer` using `indexType` and `indexStride`
if present.
If `indexBuffer` is `NULL` then the index used is the index of the
triangle in the geometry.

If that value is the unsigned cast of one of the values from
[VkOpacityMicromapSpecialIndexEXT](VkOpacityMicromapSpecialIndexEXT.html) then that triangle behaves as
described for that special value in [Ray Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

Otherwise that triangle uses the opacity micromap information from
`micromap` at that index plus `baseTriangle`.

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`.
The elements of the non-`NULL` array describe the total count used to build
this geometry.
For a given `format` and `subdivisionLevel` the number of triangles
in this geometry matching those values after indirection and special index
handling **must** be equal to the sum of matching `count` provided.

If `micromap` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then every value read from
`indexBuffer` **must** be one of the values in
[VkOpacityMicromapSpecialIndexEXT](VkOpacityMicromapSpecialIndexEXT.html).

Valid Usage

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-07335) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-07335

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10719) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10719

`indexType` **must** be [VK_INDEX_TYPE_UINT16](VkIndexType.html),
[VK_INDEX_TYPE_UINT32](VkIndexType.html), or [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10722) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10722

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then
`indexStride` **must** be a multiple of the size in bytes of
`indexType`

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10723) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-10723

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then
`indexStride` **must** be less than or equal to 232-1

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-sType-sType) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_EXT](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-pUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `pUsageCounts` is not `NULL`, `pUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` [VkMicromapUsageEXT](VkMicromapUsageEXT.html) structures

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-ppUsageCounts-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-ppUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `ppUsageCounts` is not `NULL`, `ppUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid pointers to [VkMicromapUsageEXT](VkMicromapUsageEXT.html) structures

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-micromap-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapEXT-micromap-parameter

 If `micromap` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `micromap` **must** be a valid [VkMicromapEXT](VkMicromapEXT.html) handle

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), `VkDeviceSize`, [VkIndexType](VkIndexType.html), [VkMicromapEXT](VkMicromapEXT.html), [VkMicromapUsageEXT](VkMicromapUsageEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureTrianglesOpacityMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
