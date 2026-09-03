# VkGpaPerfCounterAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaPerfCounterAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaPerfCounterAMD - Structure specifying parameters of a GPA sample

The `VkGpaPerfCounterAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaPerfCounterAMD {
    VkGpaPerfBlockAMD    blockType;
    uint32_t             blockInstance;
    uint32_t             eventID;
} VkGpaPerfCounterAMD;

* 
`blockType` is a [VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html) value specifying the GPU
block type to sample.

* 
`blockInstance` is a value specifying which instance of the GPU
block to sample.

* 
`eventID` is a value specifying the hardware-specific identifier of
the performance counter to sample.

Valid Usage (Implicit)

* 
[](#VUID-VkGpaPerfCounterAMD-blockType-parameter) VUID-VkGpaPerfCounterAMD-blockType-parameter

 `blockType` **must** be a valid [VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html) value

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaPerfBlockAMD](VkGpaPerfBlockAMD.html), [VkGpaSampleBeginInfoAMD](VkGpaSampleBeginInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaPerfCounterAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
