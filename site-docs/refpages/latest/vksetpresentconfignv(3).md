# VkSetPresentConfigNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSetPresentConfigNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSetPresentConfigNV - Structure specifying present metering configuration

Present Metering evenly paces out the next `numFramesPerBatch`
[vkQueuePresentKHR](vkQueuePresentKHR.html) presents.
This gives smoother pacing between presents in applications with frame
generation integrations.

The `VkSetPresentConfigNV` structure is defined as:

// Provided by VK_NV_present_metering
typedef struct VkSetPresentConfigNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           numFramesPerBatch;
    uint32_t           presentConfigFeedback;
} VkSetPresentConfigNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`numFramesPerBatch` is the number of frames to batch

* 
`presentConfigFeedback` will return the success or error status

The metering configuration applies to all swapchains in the array in
[VkPresentInfoKHR](VkPresentInfoKHR.html).
The configuration specified by `VkSetPresentConfigNV` applies to the
next `numFramesPerBatch` calls to [vkQueuePresentKHR](vkQueuePresentKHR.html) and needs to
be updated every `numFramesPerBatch` presents.

Valid Usage

* 
[](#VUID-VkSetPresentConfigNV-numFramesPerBatch-10581) VUID-VkSetPresentConfigNV-numFramesPerBatch-10581

`numFramesPerBatch` **must** not be larger than 8

Valid Usage (Implicit)

* 
[](#VUID-VkSetPresentConfigNV-sType-sType) VUID-VkSetPresentConfigNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SET_PRESENT_CONFIG_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_NV_present_metering](VK_NV_present_metering.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSetPresentConfigNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
