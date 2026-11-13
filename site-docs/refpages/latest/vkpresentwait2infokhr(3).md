# VkPresentWait2InfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentWait2InfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentWait2InfoKHR - Structure describing parameters of a presentation wait

The `VkPresentWait2InfoKHR` structure is defined as:

// Provided by VK_KHR_present_wait2
typedef struct VkPresentWait2InfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           presentId;
    uint64_t           timeout;
} VkPresentWait2InfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentId` is the presentation presentId to wait for.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

Valid Usage (Implicit)

* 
[](#VUID-VkPresentWait2InfoKHR-sType-sType) VUID-VkPresentWait2InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_WAIT_2_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPresentWait2InfoKHR-pNext-pNext) VUID-VkPresentWait2InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_present_wait2](VK_KHR_present_wait2.html), [VkStructureType](VkStructureType.html), [vkWaitForPresent2KHR](vkWaitForPresent2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentWait2InfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
