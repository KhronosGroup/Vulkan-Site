# VkD3D12FenceSubmitInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkD3D12FenceSubmitInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkD3D12FenceSubmitInfoKHR - Structure specifying values for Direct3D 12 fence-backed semaphores

To specify the values to use when waiting for and signaling semaphores whose
[current payload](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing) refers to a
Direct3D 12 fence, add a [VkD3D12FenceSubmitInfoKHR](#) structure to the
`pNext` chain of the [VkSubmitInfo](VkSubmitInfo.html) structure.
The `VkD3D12FenceSubmitInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkD3D12FenceSubmitInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           waitSemaphoreValuesCount;
    const uint64_t*    pWaitSemaphoreValues;
    uint32_t           signalSemaphoreValuesCount;
    const uint64_t*    pSignalSemaphoreValues;
} VkD3D12FenceSubmitInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreValuesCount` is the number of semaphore wait values
specified in `pWaitSemaphoreValues`.

* 
`pWaitSemaphoreValues` is a pointer to an array of
`waitSemaphoreValuesCount` values for the corresponding semaphores
in [VkSubmitInfo](VkSubmitInfo.html)::`pWaitSemaphores` to wait for.

* 
`signalSemaphoreValuesCount` is the number of semaphore signal
values specified in `pSignalSemaphoreValues`.

* 
`pSignalSemaphoreValues` is a pointer to an array of
`signalSemaphoreValuesCount` values for the corresponding semaphores
in [VkSubmitInfo](VkSubmitInfo.html)::`pSignalSemaphores` to set when signaled.

If the semaphore in [VkSubmitInfo](VkSubmitInfo.html)::`pWaitSemaphores` or
[VkSubmitInfo](VkSubmitInfo.html)::`pSignalSemaphores` corresponding to an entry in
`pWaitSemaphoreValues` or `pSignalSemaphoreValues` respectively does
not currently have a [payload](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-payloads)
referring to a Direct3D 12 fence, the implementation **must** ignore the value
in the `pWaitSemaphoreValues` or `pSignalSemaphoreValues` entry.

|  | As the introduction of the external semaphore handle type
| --- | --- |
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) predates that of
timeline semaphores, support for importing semaphore payloads from external
handles of that type into semaphores created (implicitly or explicitly) with
a [VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html) is preserved for
backwards compatibility.
However, applications **should** prefer importing such handle types into
semaphores created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html), and use the
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure instead of the
`VkD3D12FenceSubmitInfoKHR` structure to specify the values to use when
waiting for and signaling such semaphores. |

Valid Usage

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-waitSemaphoreValuesCount-00079) VUID-VkD3D12FenceSubmitInfoKHR-waitSemaphoreValuesCount-00079

`waitSemaphoreValuesCount` **must** be the same value as
`VkSubmitInfo`::`waitSemaphoreCount`, where this structure is in
the `pNext` chain of a `VkSubmitInfo` structure

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-signalSemaphoreValuesCount-00080) VUID-VkD3D12FenceSubmitInfoKHR-signalSemaphoreValuesCount-00080

`signalSemaphoreValuesCount` **must** be the same value as
`VkSubmitInfo`::`signalSemaphoreCount`, where this structure is
in the `pNext` chain of a `VkSubmitInfo` structure

Valid Usage (Implicit)

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-sType-sType) VUID-VkD3D12FenceSubmitInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_D3D12_FENCE_SUBMIT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-pWaitSemaphoreValues-parameter) VUID-VkD3D12FenceSubmitInfoKHR-pWaitSemaphoreValues-parameter

 If `waitSemaphoreValuesCount` is not `0`, and `pWaitSemaphoreValues` is not `NULL`, `pWaitSemaphoreValues` **must** be a valid pointer to an array of `waitSemaphoreValuesCount` `uint64_t` values

* 
[](#VUID-VkD3D12FenceSubmitInfoKHR-pSignalSemaphoreValues-parameter) VUID-VkD3D12FenceSubmitInfoKHR-pSignalSemaphoreValues-parameter

 If `signalSemaphoreValuesCount` is not `0`, and `pSignalSemaphoreValues` is not `NULL`, `pSignalSemaphoreValues` **must** be a valid pointer to an array of `signalSemaphoreValuesCount` `uint64_t` values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkD3D12FenceSubmitInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
