# VkAttachmentSampleLocationsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentSampleLocationsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentSampleLocationsEXT - Structure specifying the sample locations state to use in the initial layout transition of attachments

The `VkAttachmentSampleLocationsEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_sample_locations
typedef struct VkAttachmentSampleLocationsEXT {
    uint32_t                    attachmentIndex;
    VkSampleLocationsInfoEXT    sampleLocationsInfo;
} VkAttachmentSampleLocationsEXT;

* 
`attachmentIndex` is the index of the attachment for which the
sample locations state is provided.

* 
`sampleLocationsInfo` is the sample locations state to use for the
layout transition of the given attachment from the initial layout of the
attachment to the image layout specified for the attachment in the first
subpass using it.

If the image referenced by the framebuffer attachment at index
`attachmentIndex` was not created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html) then the
values specified in `sampleLocationsInfo` are ignored.

Valid Usage

* 
[](#VUID-VkAttachmentSampleLocationsEXT-attachmentIndex-01531) VUID-VkAttachmentSampleLocationsEXT-attachmentIndex-01531

`attachmentIndex` **must** be less than the `attachmentCount`
specified in [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) the render pass specified by
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderPass` was created with

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentSampleLocationsEXT-sampleLocationsInfo-parameter) VUID-VkAttachmentSampleLocationsEXT-sampleLocationsInfo-parameter

 `sampleLocationsInfo` **must** be a valid [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html) structure

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html), [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentSampleLocationsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
