# VkGpaDeviceClockModeInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaDeviceClockModeInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaDeviceClockModeInfoAMD - Structure containing returned clock ratios or clock mode to set

The `VkGpaDeviceClockModeInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaDeviceClockModeInfoAMD {
    VkStructureType            sType;
    const void*                pNext;
    VkGpaDeviceClockModeAMD    clockMode;
    float                      memoryClockRatioToPeak;
    float                      engineClockRatioToPeak;
} VkGpaDeviceClockModeInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`clockMode` is a enum:VkGpaDeviceClockModeAMD value specify which
clock mode to set, or whether to query the current clocks.

* 
`memoryClockRatioToPeak` is the returned ratio of the current memory
clock to the maximum memory clock, if `clockMode` is
[VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](VkGpaDeviceClockModeAMD.html).

* 
`engineClockRatioToPeak` is the returned ratio of the current engine
clock to the maximum engine clock, if `clockMode` is
[VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](VkGpaDeviceClockModeAMD.html).

If `clockMode` is [VK_GPA_DEVICE_CLOCK_MODE_QUERY_AMD](VkGpaDeviceClockModeAMD.html),
`memoryClockRatioToPeak` and `engineClockRatioToPeak` are filled
with the ratios of their current values to their maximums respectively,
otherwise they are left unchanged.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaDeviceClockModeInfoAMD-sType-sType) VUID-VkGpaDeviceClockModeInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_DEVICE_CLOCK_MODE_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkGpaDeviceClockModeInfoAMD-pNext-pNext) VUID-VkGpaDeviceClockModeInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGpaDeviceClockModeInfoAMD-clockMode-parameter) VUID-VkGpaDeviceClockModeInfoAMD-clockMode-parameter

 `clockMode` **must** be a valid [VkGpaDeviceClockModeAMD](VkGpaDeviceClockModeAMD.html) value

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaDeviceClockModeAMD](VkGpaDeviceClockModeAMD.html), [VkStructureType](VkStructureType.html), [vkSetGpaDeviceClockModeAMD](vkSetGpaDeviceClockModeAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaDeviceClockModeInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
