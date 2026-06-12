# VkGeometryTrianglesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryTrianglesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryTrianglesNV - Structure specifying a triangle geometry in a bottom-level acceleration structure

The `VkGeometryTrianglesNV` structure specifies triangle geometry in a
bottom-level acceleration structure and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryTrianglesNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           vertexData;
    VkDeviceSize       vertexOffset;
    uint32_t           vertexCount;
    VkDeviceSize       vertexStride;
    VkFormat           vertexFormat;
    VkBuffer           indexData;
    VkDeviceSize       indexOffset;
    uint32_t           indexCount;
    VkIndexType        indexType;
    VkBuffer           transformData;
    VkDeviceSize       transformOffset;
} VkGeometryTrianglesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexData` is the buffer containing vertex data for this geometry.

* 
`vertexOffset` is the offset in bytes within `vertexData`
containing vertex data for this geometry.

* 
`vertexCount` is the number of valid vertices.

* 
`vertexStride` is the stride in bytes between each vertex.

* 
`vertexFormat` is a [VkFormat](VkFormat.html) describing the format of each
vertex element.

* 
`indexData` is the buffer containing index data for this geometry.

* 
`indexOffset` is the offset in bytes within `indexData`
containing index data for this geometry.

* 
`indexCount` is the number of indices to include in this geometry.

* 
`indexType` is a [VkIndexType](VkIndexType.html) describing the format of each
index.

* 
`transformData` is an optional buffer containing an
[VkTransformMatrixNV](VkTransformMatrixKHR.html) structure defining a transformation to be
applied to this geometry.

* 
`transformOffset` is the offset in bytes in `transformData` of
the transform information described above.

If `indexType` is [VK_INDEX_TYPE_NONE_NV](VkIndexType.html), then this structure
describes a set of triangles determined by `vertexCount`.
Otherwise, this structure describes a set of indexed triangles determined by
`indexCount`.

Valid Usage

* 
[](#VUID-VkGeometryTrianglesNV-vertexOffset-02428) VUID-VkGeometryTrianglesNV-vertexOffset-02428

`vertexOffset` **must** be less than the size of `vertexData`

* 
[](#VUID-VkGeometryTrianglesNV-vertexOffset-02429) VUID-VkGeometryTrianglesNV-vertexOffset-02429

`vertexOffset` **must** be a multiple of the component size of
`vertexFormat`

* 
[](#VUID-VkGeometryTrianglesNV-vertexFormat-02430) VUID-VkGeometryTrianglesNV-vertexFormat-02430

`vertexFormat` **must** be one of [VK_FORMAT_R32G32B32_SFLOAT](VkFormat.html),
[VK_FORMAT_R32G32_SFLOAT](VkFormat.html), [VK_FORMAT_R16G16B16_SFLOAT](VkFormat.html),
[VK_FORMAT_R16G16_SFLOAT](VkFormat.html), [VK_FORMAT_R16G16_SNORM](VkFormat.html), or
[VK_FORMAT_R16G16B16_SNORM](VkFormat.html)

* 
[](#VUID-VkGeometryTrianglesNV-vertexStride-03818) VUID-VkGeometryTrianglesNV-vertexStride-03818

`vertexStride` **must** be less than or equal to 232-1

* 
[](#VUID-VkGeometryTrianglesNV-indexOffset-02431) VUID-VkGeometryTrianglesNV-indexOffset-02431

`indexOffset` **must** be less than the size of `indexData`

* 
[](#VUID-VkGeometryTrianglesNV-indexOffset-02432) VUID-VkGeometryTrianglesNV-indexOffset-02432

`indexOffset` **must** be a multiple of the element size of
`indexType`

* 
[](#VUID-VkGeometryTrianglesNV-indexType-02433) VUID-VkGeometryTrianglesNV-indexType-02433

`indexType` **must** be [VK_INDEX_TYPE_UINT16](VkIndexType.html),
[VK_INDEX_TYPE_UINT32](VkIndexType.html), or [VK_INDEX_TYPE_NONE_NV](VkIndexType.html)

* 
[](#VUID-VkGeometryTrianglesNV-indexData-02434) VUID-VkGeometryTrianglesNV-indexData-02434

`indexData` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) if `indexType` is
[VK_INDEX_TYPE_NONE_NV](VkIndexType.html)

* 
[](#VUID-VkGeometryTrianglesNV-indexData-02435) VUID-VkGeometryTrianglesNV-indexData-02435

`indexData` **must** be a valid `VkBuffer` handle if
`indexType` is not [VK_INDEX_TYPE_NONE_NV](VkIndexType.html)

* 
[](#VUID-VkGeometryTrianglesNV-indexCount-02436) VUID-VkGeometryTrianglesNV-indexCount-02436

`indexCount` **must** be `0` if `indexType` is
[VK_INDEX_TYPE_NONE_NV](VkIndexType.html)

* 
[](#VUID-VkGeometryTrianglesNV-transformOffset-02437) VUID-VkGeometryTrianglesNV-transformOffset-02437

`transformOffset` **must** be less than the size of `transformData`

* 
[](#VUID-VkGeometryTrianglesNV-transformOffset-02438) VUID-VkGeometryTrianglesNV-transformOffset-02438

`transformOffset` **must** be a multiple of `16`

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryTrianglesNV-sType-sType) VUID-VkGeometryTrianglesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GEOMETRY_TRIANGLES_NV](VkStructureType.html)

* 
[](#VUID-VkGeometryTrianglesNV-pNext-pNext) VUID-VkGeometryTrianglesNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeometryTrianglesNV-vertexData-parameter) VUID-VkGeometryTrianglesNV-vertexData-parameter

 If `vertexData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `vertexData` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkGeometryTrianglesNV-vertexFormat-parameter) VUID-VkGeometryTrianglesNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkGeometryTrianglesNV-indexData-parameter) VUID-VkGeometryTrianglesNV-indexData-parameter

 If `indexData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `indexData` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkGeometryTrianglesNV-indexType-parameter) VUID-VkGeometryTrianglesNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

* 
[](#VUID-VkGeometryTrianglesNV-transformData-parameter) VUID-VkGeometryTrianglesNV-transformData-parameter

 If `transformData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `transformData` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkGeometryTrianglesNV-commonparent) VUID-VkGeometryTrianglesNV-commonparent

 Each of `indexData`, `transformData`, and `vertexData` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkFormat](VkFormat.html), [VkGeometryDataNV](VkGeometryDataNV.html), [VkIndexType](VkIndexType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkGeometryTrianglesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
