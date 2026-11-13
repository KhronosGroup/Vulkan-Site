# VkGeometryAABBNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryAABBNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryAABBNV - Structure specifying axis-aligned bounding box geometry in a bottom-level acceleration structure

The `VkGeometryAABBNV` structure specifies axis-aligned bounding box
geometry in a bottom-level acceleration structure, and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryAABBNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           aabbData;
    uint32_t           numAABBs;
    uint32_t           stride;
    VkDeviceSize       offset;
} VkGeometryAABBNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`aabbData` is the buffer containing axis-aligned bounding box data.

* 
`numAABBs` is the number of AABBs in this geometry.

* 
`stride` is the stride in bytes between AABBs in `aabbData`.

* 
`offset` is the offset in bytes of the first AABB in `aabbData`.

The AABB data in memory is six 32-bit floats consisting of the minimum x, y,
and z values followed by the maximum x, y, and z values.

Valid Usage

* 
[](#VUID-VkGeometryAABBNV-offset-02439) VUID-VkGeometryAABBNV-offset-02439

`offset` **must** be less than the size of `aabbData`

* 
[](#VUID-VkGeometryAABBNV-offset-02440) VUID-VkGeometryAABBNV-offset-02440

`offset` **must** be a multiple of `8`

* 
[](#VUID-VkGeometryAABBNV-stride-02441) VUID-VkGeometryAABBNV-stride-02441

`stride` **must** be a multiple of `8`

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryAABBNV-sType-sType) VUID-VkGeometryAABBNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GEOMETRY_AABB_NV](VkStructureType.html)

* 
[](#VUID-VkGeometryAABBNV-pNext-pNext) VUID-VkGeometryAABBNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeometryAABBNV-aabbData-parameter) VUID-VkGeometryAABBNV-aabbData-parameter

 If `aabbData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `aabbData` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkGeometryDataNV](VkGeometryDataNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkGeometryAABBNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
