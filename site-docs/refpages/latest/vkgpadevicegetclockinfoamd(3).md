# VkGpaDeviceGetClockInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaDeviceGetClockInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaDeviceGetClockInfoAMD - Structure containing returned clock ratios or clock mode to set

The `VkGpaDeviceGetClockInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaDeviceGetClockInfoAMD {
    VkStructureType    sType;
    void*              pNext;
    float              memoryClockRatioToPeak;
    float              engineClockRatioToPeak;
    uint32_t           memoryClockFrequency;
    uint32_t           engineClockFrequency;
} VkGpaDeviceGetClockInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryClockRatioToPeak` is the returned ratio of the current memory
clock to the maximum memory clock.

* 
`engineClockRatioToPeak` is the returned ratio of the current engine
clock to the maximum engine clock.

* 
`memoryClockFrequency` is the current memory clock frequency in MHz.

* 
`engineClockFrequency` is the current engine clock frequency in MHz.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaDeviceGetClockInfoAMD-sType-sType) VUID-VkGpaDeviceGetClockInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_DEVICE_GET_CLOCK_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkGpaDeviceGetClockInfoAMD-pNext-pNext) VUID-VkGpaDeviceGetClockInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkStructureType](VkStructureType.html), [vkGetGpaDeviceClockInfoAMD](vkGetGpaDeviceClockInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaDeviceGetClockInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
