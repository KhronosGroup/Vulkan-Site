# VkRenderPassPerformanceCountersByRegionBeginInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassPerformanceCountersByRegionBeginInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassPerformanceCountersByRegionBeginInfoARM - Structure specifying per region performance counters

The `VkRenderPassPerformanceCountersByRegionBeginInfoARM` structure is
defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkRenderPassPerformanceCountersByRegionBeginInfoARM {
    VkStructureType           sType;
    void*                     pNext;
    uint32_t                  counterAddressCount;
    const VkDeviceAddress*    pCounterAddresses;
    VkBool32                  serializeRegions;
    uint32_t                  counterIndexCount;
    uint32_t*                 pCounterIndices;
} VkRenderPassPerformanceCountersByRegionBeginInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`counterAddressCount` is the number of entries in the
`pCounterAddresses` array.

* 
`pCounterAddresses` is a pointer to an array of
`VkDeviceAddress` where performance counter data will be written.

* 
`serializeRegions` controls whether the implementation serializes
the execution of each region.

* 
`counterIndexCount` is the number of entries in the
`pCounterIndices` array.

* 
`pCounterIndices` is a pointer to an array of
[VkPerformanceCounterARM](VkPerformanceCounterARM.html)::`counterID` values, as enumerated by
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM](vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM.html),
to enable in this render pass instance.

Performance counters values are written to each element of
`pCounterAddresses` in an implementation-dependent manner.
These writes execute in the
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html) pipeline stage.

The index into this array is calculated as:

uint32_t index = s * L + l;

where `s` is the physical subpass index, `L` is the maximum number
of
views or
layers in the current render pass instance, and `l` is the index of the
current
view or
layer.

When using a render pass object with multiple subpasses, an implementation
**may** merge one more subpasses.
The physical subpass index represents the index into the set of subpasses
that remain after such merge operations are done.

|  | The `[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html)` extension can be used to
| --- | --- |
determine which if any subpasses have been merged.
The physical subpass index is equal to the `postMergeIndex` value provided
in [VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html). |

Within each element of `pCounterAddresses`, counter values are written
in framebuffer-space order if
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)::`identityTransformOrder`
is [VK_TRUE](VK_TRUE.html).

Each counter value is written as an unsigned 32-bit integer value.

If the render pass has a fragment density map, performance counter values
are only written for regions where the fragment area is unchanged.

Valid Usage

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-11815) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-11815

`counterAddressCount` **must** be equal to S × L, where S
is the number of subpasses in the current render pass instance, and L is
the number of layers in the current render pass instance
or the index of the most significant bit of any view mask in the current
render pass instance

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11816) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11816

For each element of `pCounterAddresses` that is not `0`, if the
buffer from which it was queried is non-sparse then it **must** be bound
completely and contiguously to a single [VkDeviceMemory](VkDeviceMemory.html) object

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11817) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-11817

For each element of `pCounterAddresses`[i], all device addresses
between `pCounterAddresses`[i] and `pCounterAddresses`[i] plus N -
1, **must** be in the buffer device address range of the same buffer, where
N is given by \(N = \mathbin{align}\left(\left\lceil w/rsw
\right\rceil \times \mathbin{align}\left(c \times sizeof(uint32\_t),
ra\right), rsa\right) \times \left\lceil h/rsh \right\rceil\), where
`w` is the value of
[VkRenderingInfo](VkRenderingInfo.html)::`renderArea.extent.width`, `h` is the
value of [VkRenderingInfo](VkRenderingInfo.html)::`renderArea.extent.height`,
`rsw` is the value of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)::`performanceCounterRegionSize.width`,
`rsh` is the value of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)::`performanceCounterRegionSize.height`,
`c` is the value of `counterIndexCount`, `ra` is the value
of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)::`regionAlignment`,
and `rsa` is the value of
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)::`rowStrideAlignment`

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-11818) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-11818

`counterIndexCount` **must** be less than or equal to
[VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html)::`maxPerRegionPerformanceCounters`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-sType-sType) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_PERFORMANCE_COUNTERS_BY_REGION_BEGIN_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-parameter) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterAddresses-parameter

 `pCounterAddresses` **must** be a valid pointer to an array of `counterAddressCount` `VkDeviceAddress` values

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterIndices-parameter) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-pCounterIndices-parameter

 `pCounterIndices` **must** be a valid pointer to an array of `counterIndexCount` `uint32_t` values

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-arraylength) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterAddressCount-arraylength

 `counterAddressCount` **must** be greater than `0`

* 
[](#VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-arraylength) VUID-VkRenderPassPerformanceCountersByRegionBeginInfoARM-counterIndexCount-arraylength

 `counterIndexCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_ARM_performance_counters_by_region](VK_ARM_performance_counters_by_region.html), `VkBool32`, `VkDeviceAddress`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassPerformanceCountersByRegionBeginInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
