# VkAccelerationStructureGeometrySpheresDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometrySpheresDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometrySpheresDataNV - Structure specifying a sphere geometry in a bottom-level acceleration structure

If `VkAccelerationStructureGeometrySpheresDataNV` is included in the
`pNext` chain of a [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) structure,
then that structures defines the sphere’s geometry data.

The `VkAccelerationStructureGeometrySpheresDataNV` structure is defined
as:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef struct VkAccelerationStructureGeometrySpheresDataNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkFormat                         vertexFormat;
    VkDeviceOrHostAddressConstKHR    vertexData;
    VkDeviceSize                     vertexStride;
    VkFormat                         radiusFormat;
    VkDeviceOrHostAddressConstKHR    radiusData;
    VkDeviceSize                     radiusStride;
    VkIndexType                      indexType;
    VkDeviceOrHostAddressConstKHR    indexData;
    VkDeviceSize                     indexStride;
} VkAccelerationStructureGeometrySpheresDataNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](VkFormat.html) of each sphere’s vertex
element.

* 
`vertexData` is a device or host address of memory containing vertex
data in form of pairs of centers of spheres that define all sphere
geometry.

* 
`vertexStride` is the stride in bytes between each vertex element.

* 
`radiusFormat` is the [VkFormat](VkFormat.html) of each sphere’s radius.

* 
`radiusData` is a device or host address of memory containing
sphere’s radius data value.

* 
`radiusStride` is the stride in bytes between each radius value.

* 
`indexType` is the [VkIndexType](VkIndexType.html) of each index element.

* 
`indexData` is a device or host address of memory containing index
data for vertex and radius buffers for this geometry.
When `indexType` is [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html) it **must** be `NULL`.

* 
`indexStride` is the stride in bytes between each index element.

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-None-10429) VUID-VkAccelerationStructureGeometrySpheresDataNV-None-10429

The [spheres](../../../../spec/latest/chapters/features.html#features-spheres) feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10431) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10431

`vertexStride` **must** be a multiple of:

the [size of the format](../../../../spec/latest/chapters/formats.html#formats) specified in `vertexFormat` if
that format is a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

* 
the smallest [component size](../../../../spec/latest/chapters/formats.html#formats) specified in
`vertexFormat` if that format is not a [packed     format](../../../../spec/latest/chapters/formats.html#formats-packed)

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10432) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexStride-10432

`vertexStride` and `radiusStride` **must** be less than or equal to
232-1

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-10434) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-10434

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-10435) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-10435

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`radiusFormat` **must** contain
[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-10436) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-10436

All values referenced in `radiusData` **must** be greater than or equal
to `0`

[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-10437) VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-10437

`indexType` **must** be [VK_INDEX_TYPE_UINT16](VkIndexType.html),
[VK_INDEX_TYPE_UINT32](VkIndexType.html), [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-sType-sType) VUID-VkAccelerationStructureGeometrySpheresDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_SPHERES_DATA_NV](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexData-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-vertexData-parameter

 `vertexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusFormat-parameter

 `radiusFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-radiusData-parameter

 `radiusData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-indexType-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

* 
[](#VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-parameter) VUID-VkAccelerationStructureGeometrySpheresDataNV-indexData-parameter

 `indexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html)

[VK_NV_ray_tracing_linear_swept_spheres](VK_NV_ray_tracing_linear_swept_spheres.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), `VkDeviceSize`, [VkFormat](VkFormat.html), [VkIndexType](VkIndexType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometrySpheresDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
