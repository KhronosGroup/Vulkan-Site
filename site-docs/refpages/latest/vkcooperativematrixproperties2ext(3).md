# VkCooperativeMatrixProperties2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCooperativeMatrixProperties2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCooperativeMatrixProperties2EXT - Structure specifying cooperative matrix properties

The `VkCooperativeMatrixProperties2EXT` structure is defined as:

// Provided by VK_EXT_cooperative_matrix_maintenance1
typedef struct VkCooperativeMatrixProperties2EXT {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              MGranularity;
    uint32_t              NGranularity;
    uint32_t              KGranularity;
    VkComponentTypeKHR    AType;
    VkComponentTypeKHR    BType;
    VkComponentTypeKHR    CType;
    VkComponentTypeKHR    ResultType;
} VkCooperativeMatrixProperties2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`MGranularity` is the granularity of the number of rows in matrices
`A`, `C`, and `Result`.
The rows **must** be an integer multiple of this value.

* 
`KGranularity` is the granularity of columns in matrix `A` and
rows in matrix `B`.
The columns/rows **must** be an integer multiple of this value.

* 
`NGranularity` is the granularity of columns in matrices `B`,
`C`, `Result`.
The columns **must** be an integer multiple of this value.

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

If some types are preferred over other types (e.g. for performance), they
**should** appear earlier in the list enumerated by
[vkGetPhysicalDeviceCooperativeMatrixProperties2EXT](vkGetPhysicalDeviceCooperativeMatrixProperties2EXT.html).

At least one entry in the list **must** have power of two values for all of
`MGranularity`, `KGranularity`, and `NGranularity`.

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeMatrixProperties2EXT-sType-sType) VUID-VkCooperativeMatrixProperties2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_2_EXT](VkStructureType.html)

* 
[](#VUID-VkCooperativeMatrixProperties2EXT-pNext-pNext) VUID-VkCooperativeMatrixProperties2EXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_cooperative_matrix_maintenance1](VK_EXT_cooperative_matrix_maintenance1.html), [VkComponentTypeKHR](VkComponentTypeKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceCooperativeMatrixProperties2EXT](vkGetPhysicalDeviceCooperativeMatrixProperties2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCooperativeMatrixProperties2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
