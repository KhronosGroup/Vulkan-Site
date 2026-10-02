# VkOutOfBandQueueTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOutOfBandQueueTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOutOfBandQueueTypeNV - Type of out of band queue

The [VkOutOfBandQueueTypeNV](#) enum is defined as:

// Provided by VK_NV_low_latency2
typedef enum VkOutOfBandQueueTypeNV {
    VK_OUT_OF_BAND_QUEUE_TYPE_RENDER_NV = 0,
    VK_OUT_OF_BAND_QUEUE_TYPE_PRESENT_NV = 1,
} VkOutOfBandQueueTypeNV;

The members of the [VkOutOfBandQueueTypeNV](#) are used to describe the
queue type in [VkOutOfBandQueueTypeInfoNV](VkOutOfBandQueueTypeInfoNV.html) as described below:

* 
[VK_OUT_OF_BAND_QUEUE_TYPE_RENDER_NV](#) specifies that work will be
submitted to this queue.

* 
[VK_OUT_OF_BAND_QUEUE_TYPE_PRESENT_NV](#) specifies that this queue
will be presented from.

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkOutOfBandQueueTypeInfoNV](VkOutOfBandQueueTypeInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkOutOfBandQueueTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
