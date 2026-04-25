# VkComponentTypeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkComponentTypeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkComponentTypeKHR - Specify SPIR-V cooperative matrix component type

Possible values for [VkComponentTypeKHR](#) include:

// Provided by VK_KHR_cooperative_matrix, VK_NV_cooperative_vector
typedef enum VkComponentTypeKHR {
    VK_COMPONENT_TYPE_FLOAT16_KHR = 0,
    VK_COMPONENT_TYPE_FLOAT32_KHR = 1,
    VK_COMPONENT_TYPE_FLOAT64_KHR = 2,
    VK_COMPONENT_TYPE_SINT8_KHR = 3,
    VK_COMPONENT_TYPE_SINT16_KHR = 4,
    VK_COMPONENT_TYPE_SINT32_KHR = 5,
    VK_COMPONENT_TYPE_SINT64_KHR = 6,
    VK_COMPONENT_TYPE_UINT8_KHR = 7,
    VK_COMPONENT_TYPE_UINT16_KHR = 8,
    VK_COMPONENT_TYPE_UINT32_KHR = 9,
    VK_COMPONENT_TYPE_UINT64_KHR = 10,
  // Provided by VK_KHR_cooperative_matrix with VK_KHR_shader_bfloat16
    VK_COMPONENT_TYPE_BFLOAT16_KHR = 1000141000,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_SINT8_PACKED_NV = 1000491000,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_UINT8_PACKED_NV = 1000491001,
  // Provided by VK_KHR_cooperative_matrix with VK_EXT_shader_float8
    VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT = 1000491002,
  // Provided by VK_KHR_cooperative_matrix with VK_EXT_shader_float8
    VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT = 1000491003,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_FLOAT16_NV = VK_COMPONENT_TYPE_FLOAT16_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_FLOAT32_NV = VK_COMPONENT_TYPE_FLOAT32_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_FLOAT64_NV = VK_COMPONENT_TYPE_FLOAT64_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT8_NV = VK_COMPONENT_TYPE_SINT8_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT16_NV = VK_COMPONENT_TYPE_SINT16_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT32_NV = VK_COMPONENT_TYPE_SINT32_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT64_NV = VK_COMPONENT_TYPE_SINT64_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT8_NV = VK_COMPONENT_TYPE_UINT8_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT16_NV = VK_COMPONENT_TYPE_UINT16_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT32_NV = VK_COMPONENT_TYPE_UINT32_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT64_NV = VK_COMPONENT_TYPE_UINT64_KHR,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_FLOAT_E4M3_NV = VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_FLOAT_E5M2_NV = VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT,
} VkComponentTypeKHR;

// Provided by VK_NV_cooperative_matrix
// Equivalent to VkComponentTypeKHR
typedef VkComponentTypeKHR VkComponentTypeNV;

* 
[VK_COMPONENT_TYPE_FLOAT16_KHR](#) corresponds to SPIR-V
`OpTypeFloat` 16.

* 
[VK_COMPONENT_TYPE_FLOAT32_KHR](#) corresponds to SPIR-V
`OpTypeFloat` 32.

* 
[VK_COMPONENT_TYPE_FLOAT64_KHR](#) corresponds to SPIR-V
`OpTypeFloat` 64.

* 
[VK_COMPONENT_TYPE_SINT8_KHR](#) corresponds to SPIR-V `OpTypeInt` 8
0/1.

* 
[VK_COMPONENT_TYPE_SINT16_KHR](#) corresponds to SPIR-V `OpTypeInt`
16 0/1.

* 
[VK_COMPONENT_TYPE_SINT32_KHR](#) corresponds to SPIR-V `OpTypeInt`
32 0/1.

* 
[VK_COMPONENT_TYPE_SINT64_KHR](#) corresponds to SPIR-V `OpTypeInt`
64 0/1.

* 
[VK_COMPONENT_TYPE_UINT8_KHR](#) corresponds to SPIR-V `OpTypeInt` 8
0/1.

* 
[VK_COMPONENT_TYPE_UINT16_KHR](#) corresponds to SPIR-V `OpTypeInt`
16 0/1.

* 
[VK_COMPONENT_TYPE_UINT32_KHR](#) corresponds to SPIR-V `OpTypeInt`
32 0/1.

* 
[VK_COMPONENT_TYPE_UINT64_KHR](#) corresponds to SPIR-V `OpTypeInt`
64 0/1.

* 
[VK_COMPONENT_TYPE_BFLOAT16_KHR](#) corresponds to SPIR-V
`OpTypeFloat` 16 BFloat16KHR.

* 
[VK_COMPONENT_TYPE_SINT8_PACKED_NV](#) corresponds to four 8-bit signed
integers packed in a 32-bit unsigned integer.

* 
[VK_COMPONENT_TYPE_UINT8_PACKED_NV](#) corresponds to four 8-bit
unsigned integers packed in a 32-bit unsigned integer.

* 
[VK_COMPONENT_TYPE_FLOAT_E4M3_NV](#) corresponds to a floating-point
type with a sign bit in the most significant bit, followed by four
exponent bits, followed by three mantissa bits.

* 
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](#) corresponds to a floating-point
type with a sign bit in the most significant bit, followed by five
exponent bits, followed by two mantissa bits.

* 
[VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT](#) corresponds to SPIR-V
`OpTypeFloat` 8 Float8E4M3EXT.

* 
[VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT](#) corresponds to SPIR-V
`OpTypeFloat` 8 Float8E5M2EXT.

[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html), [VK_NV_cooperative_matrix](VK_NV_cooperative_matrix.html), [VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html), [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html), [VkCooperativeMatrixPropertiesKHR](VkCooperativeMatrixPropertiesKHR.html), [VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html), [VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkComponentTypeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
