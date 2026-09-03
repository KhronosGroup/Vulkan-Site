# VkConvertCooperativeVectorMatrixInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkConvertCooperativeVectorMatrixInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkConvertCooperativeVectorMatrixInfoNV - Structure specifying a request to convert the layout and type of a cooperative vector matrix

Each `VkConvertCooperativeVectorMatrixInfoNV` structure describes a
request to convert the layout and type of a cooperative vector matrix.

The `VkConvertCooperativeVectorMatrixInfoNV` structure is defined as:

// Provided by VK_NV_cooperative_vector
typedef struct VkConvertCooperativeVectorMatrixInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    size_t                               srcSize;
    VkDeviceOrHostAddressConstKHR        srcData;
    size_t*                              pDstSize;
    VkDeviceOrHostAddressKHR             dstData;
    VkComponentTypeKHR                   srcComponentType;
    VkComponentTypeKHR                   dstComponentType;
    uint32_t                             numRows;
    uint32_t                             numColumns;
    VkCooperativeVectorMatrixLayoutNV    srcLayout;
    size_t                               srcStride;
    VkCooperativeVectorMatrixLayoutNV    dstLayout;
    size_t                               dstStride;
} VkConvertCooperativeVectorMatrixInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSize` is the length in bytes of `srcData`.

* 
`srcData` is either `NULL` or a pointer to the source data in the
source layout.

* 
`pDstSize` is a pointer to an integer related to the number of bytes
required or requested to convert.

* 
`dstData` is either `NULL` or a pointer to the destination data in
the destination layout.

* 
`srcComponentType` is the type of a source matrix element.

* 
`dstComponentType` is the type of a destination matrix element.

* 
`numRows` is the number of rows in the matrix.

* 
`numColumns` is the number of columns in the matrix.

* 
`srcLayout` is the layout of the source matrix.

* 
`srcStride` is the number of bytes between a consecutive row or
column (depending on `srcLayout`) of the source matrix, if it is
row-major or column-major.

* 
`dstLayout` is the layout the matrix is converted to.

* 
`dstStride` is the number of bytes between a consecutive row or
column (depending on `dstLayout`) of destination matrix, if it is
row-major or column-major.

When called from [vkCmdConvertCooperativeVectorMatrixNV](vkCmdConvertCooperativeVectorMatrixNV.html), the
`deviceAddress` members of `srcData` and `dstData` are used.
When called from [vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html), the
`hostAddress` members of `srcData` and `dstData` are used.

For each of the source and destination matrix, if the layout is not either
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_ROW_MAJOR_NV](VkCooperativeVectorMatrixLayoutNV.html) or
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_COLUMN_MAJOR_NV](VkCooperativeVectorMatrixLayoutNV.html), then the
corresponding stride parameter is ignored.

The size of the destination is only a function of the destination layout
information, and does not depend on the source layout information.

Conversion **can** be used to convert between
[VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html) or [VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html)
and any supported lower-precision floating-point type.
In this case, the conversion uses round-to-nearest-even rounding.

Valid Usage

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-10077) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-10077

If `srcLayout` is row-major or column-major, then `srcStride`
**must** be greater than the length of a row/column, and a multiple of the
element size

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-10078) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-10078

If `dstLayout` is row-major or column-major, then `dstStride`
**must** be greater than the length of a row/column, and a multiple of the
element size

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10079) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10079

If `srcComponentType` is not a supported
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`matrixInterpretation` value
as reported by [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html),
then `srcComponentType` **must** be [VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10080) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10080

If `dstComponentType` is not a supported
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)::`matrixInterpretation` value
as reported by [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html),
then `dstComponentType` **must** be [VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10081) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10081

If `srcComponentType` and `dstComponentType` are not equal, then
one **must** be [VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html) or
[VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html) and the other **must** be a
lower-precision floating-point type

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10082) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10082

If `dstComponentType` is [VK_COMPONENT_TYPE_FLOAT_E4M3_NV](VkComponentTypeKHR.html) or
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](VkComponentTypeKHR.html), then `dstLayout` **must** be
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV](VkCooperativeVectorMatrixLayoutNV.html) or
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV](VkCooperativeVectorMatrixLayoutNV.html)

Valid Usage (Implicit)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-sType-sType) VUID-VkConvertCooperativeVectorMatrixInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CONVERT_COOPERATIVE_VECTOR_MATRIX_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-pNext-pNext) VUID-VkConvertCooperativeVectorMatrixInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcData-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcData-parameter

 `srcData` **must** be a valid [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html) union

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-pDstSize-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-pDstSize-parameter

 `pDstSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstData-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstData-parameter

 `dstData` **must** be a valid [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html) union

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-parameter

 `srcComponentType` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-parameter

 `dstComponentType` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-parameter

 `srcLayout` **must** be a valid [VkCooperativeVectorMatrixLayoutNV](VkCooperativeVectorMatrixLayoutNV.html) value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-parameter

 `dstLayout` **must** be a valid [VkCooperativeVectorMatrixLayoutNV](VkCooperativeVectorMatrixLayoutNV.html) value

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkComponentTypeKHR](VkComponentTypeKHR.html), [VkCooperativeVectorMatrixLayoutNV](VkCooperativeVectorMatrixLayoutNV.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html), [VkStructureType](VkStructureType.html), [vkCmdConvertCooperativeVectorMatrixNV](vkCmdConvertCooperativeVectorMatrixNV.html), [vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkConvertCooperativeVectorMatrixInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
