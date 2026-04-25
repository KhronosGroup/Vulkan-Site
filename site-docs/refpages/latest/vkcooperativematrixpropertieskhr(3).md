# VkCooperativeMatrixPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCooperativeMatrixPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCooperativeMatrixPropertiesKHR - Structure specifying cooperative matrix properties

The `VkCooperativeMatrixPropertiesKHR` structure is defined as:

// Provided by VK_KHR_cooperative_matrix
typedef struct VkCooperativeMatrixPropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              MSize;
    uint32_t              NSize;
    uint32_t              KSize;
    VkComponentTypeKHR    AType;
    VkComponentTypeKHR    BType;
    VkComponentTypeKHR    CType;
    VkComponentTypeKHR    ResultType;
    VkBool32              saturatingAccumulation;
    VkScopeKHR            scope;
} VkCooperativeMatrixPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`MSize` is the number of rows in matrices `A`, `C`, and
`Result`.

* 
`KSize` is the number of columns in matrix `A` and rows in matrix
`B`.

* 
`NSize` is the number of columns in matrices `B`, `C`,
`Result`.

* 
`AType` is the component type of matrix `A`, of type
[VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`BType` is the component type of matrix `B`, of type
[VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`CType` is the component type of matrix `C`, of type
[VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`ResultType` is the component type of matrix `Result`, of type
[VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`saturatingAccumulation` indicates whether the
`SaturatingAccumulation` operand to `OpCooperativeMatrixMulAddKHR`
**must** be present or not.
If it is [VK_TRUE](VK_TRUE.html), the `SaturatingAccumulation` operand **must** be
present.
If it is [VK_FALSE](VK_FALSE.html), the `SaturatingAccumulation` operand **must**
not be present.

* 
`scope` is the scope of all the matrix types, of type
[VkScopeKHR](VkScopeKHR.html).

If some types are preferred over other types (e.g. for performance), they
**should** appear earlier in the list enumerated by
[vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR](vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR.html).

At least one entry in the list **must** have power of two values for all of
`MSize`, `KSize`, and `NSize`.

If the
[`cooperativeMatrixWorkgroupScope`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixWorkgroupScope)
feature is not supported,
`scope` **must** be [VK_SCOPE_SUBGROUP_KHR](VkScopeKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeMatrixPropertiesKHR-sType-sType) VUID-VkCooperativeMatrixPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkCooperativeMatrixPropertiesKHR-pNext-pNext) VUID-VkCooperativeMatrixPropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html), `VkBool32`, [VkComponentTypeKHR](VkComponentTypeKHR.html), [VkScopeKHR](VkScopeKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR](vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCooperativeMatrixPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
