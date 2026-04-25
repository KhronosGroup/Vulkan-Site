# VkLatencySubmissionPresentIdNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLatencySubmissionPresentIdNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLatencySubmissionPresentIdNV - Structure used to associate a queueSubmit with a presentId

The [VkLatencySubmissionPresentIdNV](#) structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySubmissionPresentIdNV {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           presentID;
} VkLatencySubmissionPresentIdNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentID` is used to associate the `vkQueueSubmit` with the
    presentId used for a given `vkQueuePresentKHR` via
[VkPresentIdKHR](VkPresentIdKHR.html)::`pPresentIds` or
[VkPresentId2KHR](VkPresentId2KHR.html)::`pPresentIds`.

For any submission to be tracked with low latency mode pacing, it needs to
be associated with other submissions in a given present.
To associate a submission with `presentID` for low latency mode, the
`pNext` chain of [vkQueueSubmit](vkQueueSubmit.html) **must** include a
`VkLatencySubmissionPresentIdNV` structure.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySubmissionPresentIdNV-sType-sType) VUID-VkLatencySubmissionPresentIdNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SUBMISSION_PRESENT_ID_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

* 
[VkSubmitInfo2](VkSubmitInfo2.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkLatencySubmissionPresentIdNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
