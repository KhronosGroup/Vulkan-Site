# VkCooperativeMatrixFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCooperativeMatrixFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCooperativeMatrixFlagBitsEXT - Bitmask specifying which class of cooperative matrix properties to query

Bits which **can** be set in
[VkPhysicalDeviceCooperativeMatrixInfo2EXT](VkPhysicalDeviceCooperativeMatrixInfo2EXT.html)::`flags` to select the
class of cooperative matrix properties being queried are:

// Provided by VK_EXT_cooperative_matrix_maintenance1
typedef enum VkCooperativeMatrixFlagBitsEXT {
  // Provided by VK_EXT_cooperative_matrix_maintenance1
    VK_COOPERATIVE_MATRIX_SATURATING_ACCUMULATION_BIT_EXT = 0x00000001,
} VkCooperativeMatrixFlagBitsEXT;

* 
[VK_COOPERATIVE_MATRIX_SATURATING_ACCUMULATION_BIT_EXT](#) specifies
that the query returns properties for which the shader **must** use the
`SaturatingAccumulation` operand on
`OpCooperativeMatrixMulAddKHR`.
If this bit is not set, the query returns properties for which the
shader **must** not use the `SaturatingAccumulation` operand on
`OpCooperativeMatrixMulAddKHR`.

[VK_EXT_cooperative_matrix_maintenance1](VK_EXT_cooperative_matrix_maintenance1.html), [VkCooperativeMatrixFlagsEXT](VkCooperativeMatrixFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkCooperativeMatrixFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
