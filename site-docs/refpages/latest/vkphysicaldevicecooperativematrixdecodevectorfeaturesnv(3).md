# VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV - Structure describing cooperative matrix decode vector features that can be supported by an implementation

The `VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV` structure
is defined as:

// Provided by VK_NV_cooperative_matrix_decode_vector
typedef struct VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrixDecodeVector;
} VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixDecodeVector` indicates that the implementation
supports the `CooperativeMatrixDecodeVectorNV` SPIR-V capability.
This allows `OpCooperativeMatrixLoadTensorNV` to use an optional
**DecodeVectorFunc** operand to decode multiple block-adjacent elements
per callback, as defined in
`SPV_NV_cooperative_matrix_decode_vector`.

If the `VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_DECODE_VECTOR_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_cooperative_matrix_decode_vector](VK_NV_cooperative_matrix_decode_vector.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
