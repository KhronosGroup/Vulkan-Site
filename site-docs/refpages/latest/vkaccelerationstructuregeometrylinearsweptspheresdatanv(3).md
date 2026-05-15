# VkAccelerationStructureGeometryLinearSweptSpheresDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryLinearSweptSpheresDataNV - Structure specifying a LSS geometry in a bottom-level acceleration structure

If `VkAccelerationStructureGeometryLinearSweptSpheresDataNV` is included
in the `pNext` chain of a [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html)
structure, then that structures defines the linear swept sphere’s (LSS)
geometry data.

The `VkAccelerationStructureGeometryLinearSweptSpheresDataNV` structure
is defined as:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef struct VkAccelerationStructureGeometryLinearSweptSpheresDataNV {
    VkStructureType                          sType;
    const void*                              pNext;
    VkFormat                                 vertexFormat;
    VkDeviceOrHostAddressConstKHR            vertexData;
    VkDeviceSize                             vertexStride;
    VkFormat                                 radiusFormat;
    VkDeviceOrHostAddressConstKHR            radiusData;
    VkDeviceSize                             radiusStride;
    VkIndexType                              indexType;
    VkDeviceOrHostAddressConstKHR            indexData;
    VkDeviceSize                             indexStride;
    VkRayTracingLssIndexingModeNV            indexingMode;
    VkRayTracingLssPrimitiveEndCapsModeNV    endCapsMode;
} VkAccelerationStructureGeometryLinearSweptSpheresDataNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexFormat` is the [VkFormat](VkFormat.html) of each LSS vertex element.

* 
`vertexData` is a device or host address of memory containing vertex
data for this geometry.

* 
`vertexStride` is the stride in bytes between each vertex element.

* 
`radiusFormat` is the [VkFormat](VkFormat.html) of each LSS radius.

* 
`radiusData` is a device or host address of memory containing LSS
radius data value.

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

* 
`indexingMode` is a [VkRayTracingLssIndexingModeNV](VkRayTracingLssIndexingModeNV.html) value
specifying the mode of indexing.

* 
`endCapsMode` is a [VkRayTracingLssPrimitiveEndCapsModeNV](VkRayTracingLssPrimitiveEndCapsModeNV.html) value
specifying the endcaps mode for LSS primitives.

If an index buffer is not specified in `indexData`, LSS primitives are
rendered individually using subsequent pairs of vertices similar to
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST](VkPrimitiveTopology.html).

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-None-10419) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-None-10419

The [linearSweptSpheres](../../../../spec/latest/chapters/features.html#features-linearSweptSpheres) feature **must** be
enabled

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10421) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10421

`vertexStride` **must** be a multiple of:

the [size of the format](../../../../spec/latest/chapters/formats.html#formats) specified in `vertexFormat` if
that format is a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

* 
the [component size](../../../../spec/latest/chapters/formats.html#formats) specified in `vertexFormat` if that
format is not a [packed format](../../../../spec/latest/chapters/formats.html#formats-packed)

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10422) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexStride-10422

`vertexStride` and `radiusStride` **must** be less than or equal to
232-1

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-10423) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-10423

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`vertexFormat` **must** contain
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-10424) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-10424

The [format features](../../../../spec/latest/chapters/resources.html#resources-buffer-view-format-features) of
`radiusFormat` **must** contain
[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-10426) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-10426

All values referenced in `radiusData` **must** be greater than or equal
to `0`

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-10427) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-10427

If `indexingMode` is
[VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](VkRayTracingLssIndexingModeNV.html), `indexData`
**must** not be `NULL`

[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-10428) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-10428

`indexType` **must** be [VK_INDEX_TYPE_UINT16](VkIndexType.html),
[VK_INDEX_TYPE_UINT32](VkIndexType.html), or [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-sType-sType) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_LINEAR_SWEPT_SPHERES_DATA_NV](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexData-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-vertexData-parameter

 `vertexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusFormat-parameter

 `radiusFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-radiusData-parameter

 `radiusData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexType-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexData-parameter

 `indexData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-indexingMode-parameter

 `indexingMode` **must** be a valid [VkRayTracingLssIndexingModeNV](VkRayTracingLssIndexingModeNV.html) value

* 
[](#VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-endCapsMode-parameter) VUID-VkAccelerationStructureGeometryLinearSweptSpheresDataNV-endCapsMode-parameter

 `endCapsMode` **must** be a valid [VkRayTracingLssPrimitiveEndCapsModeNV](VkRayTracingLssPrimitiveEndCapsModeNV.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html)

[VK_NV_ray_tracing_linear_swept_spheres](VK_NV_ray_tracing_linear_swept_spheres.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), `VkDeviceSize`, [VkFormat](VkFormat.html), [VkIndexType](VkIndexType.html), [VkRayTracingLssIndexingModeNV](VkRayTracingLssIndexingModeNV.html), [VkRayTracingLssPrimitiveEndCapsModeNV](VkRayTracingLssPrimitiveEndCapsModeNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometryLinearSweptSpheresDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
