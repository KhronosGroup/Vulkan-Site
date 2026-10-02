# VkCooperativeVectorMatrixLayoutNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCooperativeVectorMatrixLayoutNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCooperativeVectorMatrixLayoutNV - Specify cooperative vector matrix layout

Possible values for [VkCooperativeVectorMatrixLayoutNV](#) include:

// Provided by VK_NV_cooperative_vector
typedef enum VkCooperativeVectorMatrixLayoutNV {
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_ROW_MAJOR_NV = 0,
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_COLUMN_MAJOR_NV = 1,
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV = 2,
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV = 3,
} VkCooperativeVectorMatrixLayoutNV;

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_ROW_MAJOR_NV](#) corresponds to
SPIR-V `RowMajorNV` layout.

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_COLUMN_MAJOR_NV](#) corresponds to
SPIR-V `ColumnMajorNV` layout.

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV](#)
corresponds to SPIR-V `InferencingOptimalNV` layout.

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV](#)
corresponds to SPIR-V `TrainingOptimalNV` layout.

All enum values match the corresponding SPIR-V value.

Row-major layout has elements of each row stored consecutively in memory,
with a controllable stride from the start of one row to the start of the
next row.
Column-major layout has elements of each column stored consecutively in
memory, with a controllable stride from the start of one column to the start
of the next column.
Inferencing-optimal and Training-optimal layouts are
implementation-dependent, and the application **can** convert a matrix to those
layouts using [vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html) or
[vkCmdConvertCooperativeVectorMatrixNV](vkCmdConvertCooperativeVectorMatrixNV.html).
Training-optimal layout with [VK_COMPONENT_TYPE_FLOAT16_KHR](VkComponentTypeKHR.html) or
[VK_COMPONENT_TYPE_FLOAT32_KHR](VkComponentTypeKHR.html) type has the additional guarantee that
the application **can** reinterpret the data as an array of elements and
perform element-wise operations on the data, and finite values in any
padding elements do not affect the result of a matrix-vector multiply
(inf/NaN values **may** still cause NaN values in the result).

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCooperativeVectorMatrixLayoutNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
