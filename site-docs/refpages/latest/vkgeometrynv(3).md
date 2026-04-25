# VkGeometryNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryNV - Structure specifying a geometry in a bottom-level acceleration structure

The `VkGeometryNV` structure describes geometry in a bottom-level
acceleration structure and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryNV {
    VkStructureType       sType;
    const void*           pNext;
    VkGeometryTypeKHR     geometryType;
    VkGeometryDataNV      geometry;
    VkGeometryFlagsKHR    flags;
} VkGeometryNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`geometryType` specifies the [VkGeometryTypeKHR](VkGeometryTypeKHR.html) which this
geometry refers to.

* 
`geometry` contains the geometry data as described in
[VkGeometryDataNV](VkGeometryDataNV.html).

* 
`flags` has [VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html) describing options for this
geometry.

Valid Usage

* 
[](#VUID-VkGeometryNV-geometryType-03503) VUID-VkGeometryNV-geometryType-03503

`geometryType` **must** be [VK_GEOMETRY_TYPE_TRIANGLES_NV](VkGeometryTypeKHR.html) or
[VK_GEOMETRY_TYPE_AABBS_NV](VkGeometryTypeKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryNV-sType-sType) VUID-VkGeometryNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GEOMETRY_NV](VkStructureType.html)

* 
[](#VUID-VkGeometryNV-pNext-pNext) VUID-VkGeometryNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeometryNV-geometryType-parameter) VUID-VkGeometryNV-geometryType-parameter

 `geometryType` **must** be a valid [VkGeometryTypeKHR](VkGeometryTypeKHR.html) value

* 
[](#VUID-VkGeometryNV-geometry-parameter) VUID-VkGeometryNV-geometry-parameter

 `geometry` **must** be a valid [VkGeometryDataNV](VkGeometryDataNV.html) structure

* 
[](#VUID-VkGeometryNV-flags-parameter) VUID-VkGeometryNV-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html) values

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html), [VkGeometryDataNV](VkGeometryDataNV.html), [VkGeometryFlagsKHR](VkGeometryFlagsKHR.html), [VkGeometryTypeKHR](VkGeometryTypeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkGeometryNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
