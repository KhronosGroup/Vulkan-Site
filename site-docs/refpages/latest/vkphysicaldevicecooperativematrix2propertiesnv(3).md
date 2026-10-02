# VkPhysicalDeviceCooperativeMatrix2PropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCooperativeMatrix2PropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCooperativeMatrix2PropertiesNV - Structure describing cooperative matrix properties supported by an implementation

The `VkPhysicalDeviceCooperativeMatrix2PropertiesNV` structure is
defined as:

// Provided by VK_NV_cooperative_matrix2
typedef struct VkPhysicalDeviceCooperativeMatrix2PropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           cooperativeMatrixWorkgroupScopeMaxWorkgroupSize;
    uint32_t           cooperativeMatrixFlexibleDimensionsMaxDimension;
    uint32_t           cooperativeMatrixWorkgroupScopeReservedSharedMemory;
} VkPhysicalDeviceCooperativeMatrix2PropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixWorkgroupScopeMaxWorkgroupSize` is the maximum
number of invocations in a workgroup when the module uses
`OpTypeCooperativeMatrixKHR` with `Scope` equal to `Workgroup`.

* 

`cooperativeMatrixFlexibleDimensionsMaxDimension` is the maximum
supported dimension for cooperative matrix types when the
[`cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions)
feature is enabled.

* 

`cooperativeMatrixWorkgroupScopeReservedSharedMemory` is the number
of bytes of shared memory reserved for the implementation when the
module uses `OpTypeCooperativeMatrixKHR` with `Scope` equal to
`Workgroup`.

If the `VkPhysicalDeviceCooperativeMatrix2PropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrix2PropertiesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrix2PropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_cooperative_matrix2](VK_NV_cooperative_matrix2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceCooperativeMatrix2PropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
