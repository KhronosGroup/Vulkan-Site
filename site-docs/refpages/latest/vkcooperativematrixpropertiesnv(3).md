# VkCooperativeMatrixPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCooperativeMatrixPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCooperativeMatrixPropertiesNV - Structure specifying cooperative matrix properties

The `VkCooperativeMatrixPropertiesNV` structure is defined as:

// Provided by VK_NV_cooperative_matrix
typedef struct VkCooperativeMatrixPropertiesNV {
    VkStructureType      sType;
    void*                pNext;
    uint32_t             MSize;
    uint32_t             NSize;
    uint32_t             KSize;
    VkComponentTypeNV    AType;
    VkComponentTypeNV    BType;
    VkComponentTypeNV    CType;
    VkComponentTypeNV    DType;
    VkScopeNV            scope;
} VkCooperativeMatrixPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`MSize` is the number of rows in matrices A, C, and D.

* 
`KSize` is the number of columns in matrix A and rows in matrix B.

* 
`NSize` is the number of columns in matrices B, C, D.

* 
`AType` is the component type of matrix A, of type
[VkComponentTypeNV](VkComponentTypeKHR.html).

* 
`BType` is the component type of matrix B, of type
[VkComponentTypeNV](VkComponentTypeKHR.html).

* 
`CType` is the component type of matrix C, of type
[VkComponentTypeNV](VkComponentTypeKHR.html).

* 
`DType` is the component type of matrix D, of type
[VkComponentTypeNV](VkComponentTypeKHR.html).

* 
`scope` is the scope of all the matrix types, of type
[VkScopeNV](VkScopeKHR.html).

If some types are preferred over other types (e.g. for performance), they
**should** appear earlier in the list enumerated by
[vkGetPhysicalDeviceCooperativeMatrixPropertiesNV](vkGetPhysicalDeviceCooperativeMatrixPropertiesNV.html).

At least one entry in the list **must** have power of two values for all of
`MSize`, `KSize`, and `NSize`.

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeMatrixPropertiesNV-sType-sType) VUID-VkCooperativeMatrixPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_NV](VkStructureType.html)

* 
[](#VUID-VkCooperativeMatrixPropertiesNV-pNext-pNext) VUID-VkCooperativeMatrixPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_cooperative_matrix](VK_NV_cooperative_matrix.html), [VkComponentTypeKHR](VkComponentTypeKHR.html), [VkScopeKHR](VkScopeKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceCooperativeMatrixPropertiesNV](vkGetPhysicalDeviceCooperativeMatrixPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCooperativeMatrixPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
