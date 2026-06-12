# VkGpaSampleBeginInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaSampleBeginInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaSampleBeginInfoAMD - Structure specifying parameters of a GPA sample

The `VkGpaSampleBeginInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaSampleBeginInfoAMD {
    VkStructureType               sType;
    const void*                   pNext;
    VkGpaSampleTypeAMD            sampleType;
    VkBool32                      sampleInternalOperations;
    VkBool32                      cacheFlushOnCounterCollection;
    VkBool32                      sqShaderMaskEnable;
    VkGpaSqShaderStageFlagsAMD    sqShaderMask;
    uint32_t                      perfCounterCount;
    const VkGpaPerfCounterAMD*    pPerfCounters;
    uint32_t                      streamingPerfTraceSampleInterval;
    VkDeviceSize                  perfCounterDeviceMemoryLimit;
    VkBool32                      sqThreadTraceEnable;
    VkBool32                      sqThreadTraceSuppressInstructionTokens;
    VkDeviceSize                  sqThreadTraceDeviceMemoryLimit;
    VkPipelineStageFlags          timingPreSample;
    VkPipelineStageFlags          timingPostSample;
} VkGpaSampleBeginInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleType` is a [VkGpaSampleTypeAMD](VkGpaSampleTypeAMD.html) value specifying the type
of sample.

* 
`sampleInternalOperations` is a boolean indicating whether internal
driver operations are included in the results.

* 
`cacheFlushOnCounterCollection` is a boolean indicating whether the
driver should insert cache flush and invalidate events before and after
every sample.

* 
`sqShaderMaskEnable` is a boolean indicating whether
`sqShaderMask` specifies the shader stages to sample.
If [VK_FALSE](VK_FALSE.html), all shader stages are sampled.

* 
`sqShaderMask` is a bitmask of [VkGpaSqShaderStageFlagBitsAMD](VkGpaSqShaderStageFlagBitsAMD.html)
values specifying which shader stages to sample.
Shader stage bits that are not relevant to the specific device are
ignored.

* 
`perfCounterCount` is the number of counters in the
`pPerfCounters` array

* 
`pPerfCounters` is a pointer to an array of
[VkGpaPerfCounterAMD](VkGpaPerfCounterAMD.html) structures specifying the counters to be
sampled.
If `sampleType` is [VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD](VkGpaSampleTypeAMD.html)
`pPerfCounters` specifies the counters that are sampled at the
beginning and at end of the sample period.
If `sampleType` is [VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html) then the SPM
data will be added to the samples RGP data blob.

* 
`streamingPerfTraceSampleInterval` is a value specifying the period
for SPM samples in cycles, and is ignored if `sampleType` is not
[VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html).

* 
`perfCounterDeviceMemoryLimit` is a value specifying the maximum
amount of GPU memory that this sample can allocate for SPM data.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html) this value
is ignored.

* 
`sqThreadTraceEnable` is a boolean specifying whether SQTT data
should be included.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html) this value
is ignored.

* 
`sqThreadTraceSuppressInstructionTokens` is a boolean specifying
whether instruction-level SQTT tokens should be captured.
If [VK_FALSE](VK_FALSE.html), the amount of sample data is significantly reduced.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html) this value
is ignored.

* 
`sqThreadTraceDeviceMemoryLimit` is a value specifying the maximum
amount of GPU memory in bytes that this sample can allocate for the SQTT
buffer.
If `0`, the maximum size to prevent dropping tokens towards the end of
the sample is allocated.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html) this value
is ignored.

* 
`timingPreSample` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline
stages specifying where the begin timestamp should take place.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TIMING_AMD](VkGpaSampleTypeAMD.html) this
value is ignored.

* 
`timingPostSample` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline
stages specifying where the end timestamp should take place.
If `sampleType` is not [VK_GPA_SAMPLE_TYPE_TIMING_AMD](VkGpaSampleTypeAMD.html) this
value is ignored.

Valid Usage

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sampleType-12412) VUID-VkGpaSampleBeginInfoAMD-sampleType-12412

If `sampleType` is [VK_GPA_SAMPLE_TYPE_CUMULATIVE_AMD](VkGpaSampleTypeAMD.html), the
[    `VkPhysicalDeviceGpaFeaturesAMD`::`perfCounters`](../../../../spec/latest/chapters/features.html#features-perfCounters) feature **must**
be enabled

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sampleType-12413) VUID-VkGpaSampleBeginInfoAMD-sampleType-12413

If `sampleType` is [VK_GPA_SAMPLE_TYPE_TRACE_AMD](VkGpaSampleTypeAMD.html), at least one
of the [    `VkPhysicalDeviceGpaFeaturesAMD`::`streamingPerfCounters`](../../../../spec/latest/chapters/features.html#features-streamingPerfCounters) or
[    `VkPhysicalDeviceGpaFeaturesAMD`::`sqThreadTracing`](../../../../spec/latest/chapters/features.html#features-sqThreadTracing) features
**must** be enabled

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sqThreadTraceEnable-12414) VUID-VkGpaSampleBeginInfoAMD-sqThreadTraceEnable-12414

If `sqThreadTraceEnable` is [VK_TRUE](VK_TRUE.html), the
[    `VkPhysicalDeviceGpaFeaturesAMD`::`sqThreadTracing`](../../../../spec/latest/chapters/features.html#features-sqThreadTracing) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sType-sType) VUID-VkGpaSampleBeginInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_SAMPLE_BEGIN_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkGpaSampleBeginInfoAMD-pNext-pNext) VUID-VkGpaSampleBeginInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sampleType-parameter) VUID-VkGpaSampleBeginInfoAMD-sampleType-parameter

 `sampleType` **must** be a valid [VkGpaSampleTypeAMD](VkGpaSampleTypeAMD.html) value

* 
[](#VUID-VkGpaSampleBeginInfoAMD-sqShaderMask-parameter) VUID-VkGpaSampleBeginInfoAMD-sqShaderMask-parameter

 `sqShaderMask` **must** be a valid combination of [VkGpaSqShaderStageFlagBitsAMD](VkGpaSqShaderStageFlagBitsAMD.html) values

* 
[](#VUID-VkGpaSampleBeginInfoAMD-pPerfCounters-parameter) VUID-VkGpaSampleBeginInfoAMD-pPerfCounters-parameter

 `pPerfCounters` **must** be a valid pointer to an array of `perfCounterCount` valid [VkGpaPerfCounterAMD](VkGpaPerfCounterAMD.html) structures

* 
[](#VUID-VkGpaSampleBeginInfoAMD-timingPreSample-parameter) VUID-VkGpaSampleBeginInfoAMD-timingPreSample-parameter

 `timingPreSample` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-VkGpaSampleBeginInfoAMD-timingPostSample-parameter) VUID-VkGpaSampleBeginInfoAMD-timingPostSample-parameter

 `timingPostSample` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-VkGpaSampleBeginInfoAMD-perfCounterCount-arraylength) VUID-VkGpaSampleBeginInfoAMD-perfCounterCount-arraylength

 `perfCounterCount` **must** be greater than `0`

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), `VkBool32`, `VkDeviceSize`, [VkGpaPerfCounterAMD](VkGpaPerfCounterAMD.html), [VkGpaSampleTypeAMD](VkGpaSampleTypeAMD.html), [VkGpaSqShaderStageFlagsAMD](VkGpaSqShaderStageFlagsAMD.html), [VkPipelineStageFlags](VkPipelineStageFlags.html), [VkStructureType](VkStructureType.html), [vkCmdBeginGpaSampleAMD](vkCmdBeginGpaSampleAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaSampleBeginInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
