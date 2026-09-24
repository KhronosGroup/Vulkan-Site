# VkGpaSampleTypeAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaSampleTypeAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaSampleTypeAMD - Enum providing the sample type

Values which **can** be set in [VkGpaSampleBeginInfoAMD](VkGpaSampleBeginInfoAMD.html)::`sampleType`
are:

// Provided by VK_AMD_gpa_interface
typedef enum VkGpaSampleTypeAMD {
    VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD = 0,
    VK_GPA_SAMPLE_TYPE_TRACE_AMD = 1,
    VK_GPA_SAMPLE_TYPE_TIMING_AMD = 2,
} VkGpaSampleTypeAMD;

* 
[VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD](#) specifies that one 64-bit result
will be returned per global performance counter, representing the
cumulative delta for that counter over the sample period.
Cumulative samples **must** begin and end in the same command buffer.

* 
[VK_GPA_SAMPLE_TYPE_TRACE_AMD](#) specifies that a buffer will be
filled with SQTT results data in RGP file format, and/or streaming
performance monitor data.
Trace samples **may** span multiple command buffers.

* 
[VK_GPA_SAMPLE_TYPE_TIMING_AMD](#) specifies that two 64-bit results
will be recorded to gather timestamp data.

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaSampleBeginInfoAMD](VkGpaSampleBeginInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaSampleTypeAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
