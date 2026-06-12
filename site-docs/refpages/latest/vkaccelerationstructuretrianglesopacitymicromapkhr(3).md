# VkAccelerationStructureTrianglesOpacityMicromapKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureTrianglesOpacityMicromapKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureTrianglesOpacityMicromapKHR - Structure specifying an opacity micromap in a bottom-level acceleration structure

The `VkAccelerationStructureTrianglesOpacityMicromapKHR` structure is
defined as:

// Provided by VK_KHR_opacity_micromap
typedef struct VkAccelerationStructureTrianglesOpacityMicromapKHR {
    VkStructureType               sType;
    void*                         pNext;
    VkIndexType                   indexType;
    VkDeviceAddress               indexBuffer;
    VkDeviceSize                  indexStride;
    uint32_t                      baseTriangle;
    VkAccelerationStructureKHR    micromap;
} VkAccelerationStructureTrianglesOpacityMicromapKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`indexType` is the type of triangle indices used when indexing this
micromap

* 
`indexBuffer` is the address containing the triangle indices

* 
`indexStride` is the byte stride between triangle indices

* 
`baseTriangle` is the base value added to the non-negative triangle
indices

* 
`micromap` is the handle to the micromap object to include in this
geometry

If `VkAccelerationStructureTrianglesOpacityMicromapKHR` is included in
the `pNext` chain of a
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html) or
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) structure, that
geometry will reference that micromap.

For each triangle in the geometry, the acceleration structure build fetches
an index from `indexBuffer` using `indexType` and `indexStride`
if present.
If `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), then the index used is
the index of the triangle in the geometry.

If that value is the unsigned cast of one of the values from
[VkOpacityMicromapSpecialIndexKHR](VkOpacityMicromapSpecialIndexKHR.html) then that triangle behaves as
described for that special value in [Ray Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

Otherwise that triangle uses the opacity micromap information from
`micromap` at that index plus `baseTriangle`.

Valid Usage

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexType-11570) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexType-11570

`indexType` **must** be
[VK_INDEX_TYPE_UINT8](VkIndexType.html),
[VK_INDEX_TYPE_UINT16](VkIndexType.html), [VK_INDEX_TYPE_UINT32](VkIndexType.html), or
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexBuffer-11571) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexBuffer-11571

If `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), `indexBuffer`
**must** be 0

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexBuffer-11572) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexBuffer-11572

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`indexBuffer` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexStride-11573) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexStride-11573

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`indexStride` **must** be a multiple of the size in bytes of
`indexType`

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexStride-11574) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexStride-11574

If `indexType` is not [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html),
`indexStride` **must** be less than or equal to 232-1

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-geometry-11576) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-geometry-11576

If `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), for each triangle
index in the geometry, index plus `baseTriangle` **must** be less than
or equal to *numTriangles*, where *numTriangles* is given by the sum of
all `count` parameters in the `pUsageCounts` or
`ppUsageCounts` provided to the micromap’s build command

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-micromap-11579) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-micromap-11579

If `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html), `micromap` **must**
not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-sType-sType) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexType-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

* 
[](#VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-micromap-parameter) VUID-VkAccelerationStructureTrianglesOpacityMicromapKHR-micromap-parameter

 If `micromap` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `micromap` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)

[VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), `VkDeviceAddress`, `VkDeviceSize`, [VkIndexType](VkIndexType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureTrianglesOpacityMicromapKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
