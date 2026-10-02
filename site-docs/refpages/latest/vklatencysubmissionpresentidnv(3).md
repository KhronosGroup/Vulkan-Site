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

VkLatencySubmissionPresentIdNV - Structure used to associate a queue submission with an application-rendered frame

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
`presentID` is the application-defined identifier of the
    application-rendered frame that this submission belongs to.
    It is not related to presentIds passed via
[VkPresentIdKHR](VkPresentIdKHR.html)::`pPresentIds` or
[VkPresentId2KHR](VkPresentId2KHR.html)::`pPresentIds`.

If the implicit submission attribution rules defined in
[Frame Attribution](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#low-latency2-frame-attribution) are not sufficient, an application **can**
associate submissions with application-rendered frames by chaining
`VkLatencySubmissionPresentIdNV` to its `vkQueueSubmit`
or `vkQueueSubmit2`
calls.
A non-zero `presentID` passed via `VkLatencySubmissionPresentIdNV`
**must** be greater than or equal to any non-zero `presentID` previously
passed via `VkLatencySubmissionPresentIdNV` on the same queue.

A logical device enters *explicit submission attribution* mode when any
queue on that device receives a `VkLatencySubmissionPresentIdNV` with a
non-zero `presentID`.
While a device is in explicit submission attribution mode, each
`vkQueueSubmit`
or `vkQueueSubmit2`
call will be associated with the `presentID` value of the first of these
rules to apply:

* 
The `presentID` in `VkLatencySubmissionPresentIdNV` chained to
the submission, if non-zero.

* 
The most recent `presentID` passed via
`VkLatencySubmissionPresentIdNV` on the same queue, if non-zero.

* 
The maximum `presentID` previously passed via
`VkLatencySubmissionPresentIdNV` on the device.

A `vkQueueSubmit`
or `vkQueueSubmit2`
call that chains `VkLatencySubmissionPresentIdNV` with a `presentID`
of zero clears the tracked `presentID` for that queue.
The device will exit explicit submission attribution mode when all queues'
tracked `presentID` values have been cleared.
It will then return to using the implicit attribution rules.

Explicit submission attribution is only respected by implementations
advertising support for `[VK_NV_low_latency2](VK_NV_low_latency2.html)` with a
[VkExtensionProperties](VkExtensionProperties.html)::`specVersion` greater than or equal to 3.
Implementations advertising a lower `specVersion` ignore
`VkLatencySubmissionPresentIdNV`, so applications **should** verify the
advertised `specVersion` before relying on explicit submission
attribution.

|  | Most applications do not need to pass `VkLatencySubmissionPresentIdNV`.
| --- | --- |
The implicit rules described in [Frame Attribution](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#low-latency2-frame-attribution) are
sufficient for the vast majority of applications. |

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
