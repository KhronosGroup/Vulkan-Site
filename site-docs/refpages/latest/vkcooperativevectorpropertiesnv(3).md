# VkCooperativeVectorPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCooperativeVectorPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCooperativeVectorPropertiesNV - Structure specifying cooperative vector properties

Each `VkCooperativeVectorPropertiesNV` structure describes a single
supported combination of types for a matrix-vector multiply (or
multiply-add) operation (`OpCooperativeVectorMatrixMulNV` or
`OpCooperativeVectorMatrixMulAddNV`).

The `VkCooperativeVectorPropertiesNV` structure is defined as:

// Provided by VK_NV_cooperative_vector
typedef struct VkCooperativeVectorPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkComponentTypeKHR    inputType;
    VkComponentTypeKHR    inputInterpretation;
    VkComponentTypeKHR    matrixInterpretation;
    VkComponentTypeKHR    biasInterpretation;
    VkComponentTypeKHR    resultType;
    VkBool32              transpose;
} VkCooperativeVectorPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`inputType` is the component type of vector `Input`, of type
[VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`inputInterpretation` is the value of `InputInterpretation`, of
type [VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`matrixInterpretation` is the value of `MatrixInterpretation`, of
type [VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`biasInterpretation` is the value of `BiasInterpretation`, of
type [VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`resultType` is the component type of `Result` `Type`, of type
[VkComponentTypeKHR](VkComponentTypeKHR.html).

* 
`transpose` is a boolean indicating whether opaque layout matrices
with this combination of input and output types supports transposition.

[VK_COMPONENT_TYPE_SINT8_PACKED_NV](VkComponentTypeKHR.html) and
[VK_COMPONENT_TYPE_UINT8_PACKED_NV](VkComponentTypeKHR.html) **must** not be used for members other
than `inputInterpretation`.

The following combinations **must** be supported (each row is a required
combination):

| inputType | inputInterpretation | matrixInterpretation | biasInterpretation | resultType |
| --- | --- | --- | --- | --- |
| FLOAT16 | FLOAT16 | FLOAT16 | FLOAT16 | FLOAT16 |
| UINT32 | SINT8_PACKED | SINT8 | SINT32 | SINT32 |
| SINT8 | SINT8 | SINT8 | SINT32 | SINT32 |
| FLOAT32 | SINT8 | SINT8 | SINT32 | SINT32 |
| FLOAT16 | FLOAT_E4M3 | FLOAT_E4M3 | FLOAT16 | FLOAT16 |
| FLOAT16 | FLOAT_E5M2 | FLOAT_E5M2 | FLOAT16 | FLOAT16 |

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeVectorPropertiesNV-sType-sType) VUID-VkCooperativeVectorPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_VECTOR_PROPERTIES_NV](VkStructureType.html)

* 
[](#VUID-VkCooperativeVectorPropertiesNV-pNext-pNext) VUID-VkCooperativeVectorPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCooperativeVectorPropertiesNV-inputType-parameter) VUID-VkCooperativeVectorPropertiesNV-inputType-parameter

 `inputType` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-inputInterpretation-parameter) VUID-VkCooperativeVectorPropertiesNV-inputInterpretation-parameter

 `inputInterpretation` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-matrixInterpretation-parameter) VUID-VkCooperativeVectorPropertiesNV-matrixInterpretation-parameter

 `matrixInterpretation` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-biasInterpretation-parameter) VUID-VkCooperativeVectorPropertiesNV-biasInterpretation-parameter

 `biasInterpretation` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-resultType-parameter) VUID-VkCooperativeVectorPropertiesNV-resultType-parameter

 `resultType` **must** be a valid [VkComponentTypeKHR](VkComponentTypeKHR.html) value

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), `VkBool32`, [VkComponentTypeKHR](VkComponentTypeKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCooperativeVectorPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
