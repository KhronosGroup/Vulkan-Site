# VkGeometryDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryDataNV - Structure specifying geometry in a bottom-level acceleration structure

The `VkGeometryDataNV` structure specifies geometry in a bottom-level
acceleration structure and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryDataNV {
    VkGeometryTrianglesNV    triangles;
    VkGeometryAABBNV         aabbs;
} VkGeometryDataNV;

* 
`triangles` contains triangle data if
[VkGeometryNV](VkGeometryNV.html)::`geometryType` is
[VK_GEOMETRY_TYPE_TRIANGLES_NV](VkGeometryTypeKHR.html).

* 
`aabbs` contains axis-aligned bounding box data if
[VkGeometryNV](VkGeometryNV.html)::`geometryType` is
[VK_GEOMETRY_TYPE_AABBS_NV](VkGeometryTypeKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryDataNV-triangles-parameter) VUID-VkGeometryDataNV-triangles-parameter

 `triangles` **must** be a valid [VkGeometryTrianglesNV](VkGeometryTrianglesNV.html) structure

* 
[](#VUID-VkGeometryDataNV-aabbs-parameter) VUID-VkGeometryDataNV-aabbs-parameter

 `aabbs` **must** be a valid [VkGeometryAABBNV](VkGeometryAABBNV.html) structure

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkGeometryAABBNV](VkGeometryAABBNV.html), [VkGeometryNV](VkGeometryNV.html), [VkGeometryTrianglesNV](VkGeometryTrianglesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkGeometryDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
