# VkOutOfBandQueueTypeInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOutOfBandQueueTypeInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOutOfBandQueueTypeInfoNV - Structure used to describe the queue that is being marked as Out of Band

The [VkOutOfBandQueueTypeInfoNV](#) structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkOutOfBandQueueTypeInfoNV {
    VkStructureType           sType;
    const void*               pNext;
    VkOutOfBandQueueTypeNV    queueType;
} VkOutOfBandQueueTypeInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueType` describes the usage of the queue to be marked as out of
band.

Valid Usage (Implicit)

* 
[](#VUID-VkOutOfBandQueueTypeInfoNV-sType-sType) VUID-VkOutOfBandQueueTypeInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OUT_OF_BAND_QUEUE_TYPE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkOutOfBandQueueTypeInfoNV-queueType-parameter) VUID-VkOutOfBandQueueTypeInfoNV-queueType-parameter

 `queueType` **must** be a valid [VkOutOfBandQueueTypeNV](VkOutOfBandQueueTypeNV.html) value

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkOutOfBandQueueTypeNV](VkOutOfBandQueueTypeNV.html), [VkStructureType](VkStructureType.html), [vkQueueNotifyOutOfBandNV](vkQueueNotifyOutOfBandNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkOutOfBandQueueTypeInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
