# VkSubpassSampleLocationsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassSampleLocationsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassSampleLocationsEXT - Structure specifying the sample locations state to use for layout transitions of attachments performed after a given subpass

The `VkSubpassSampleLocationsEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_sample_locations
typedef struct VkSubpassSampleLocationsEXT {
    uint32_t                    subpassIndex;
    VkSampleLocationsInfoEXT    sampleLocationsInfo;
} VkSubpassSampleLocationsEXT;

* 
`subpassIndex` is the index of the subpass for which the sample
locations state is provided.

* 
`sampleLocationsInfo` is the sample locations state to use for the
layout transition of the depth/stencil attachment away from the image
layout the attachment is used with in the subpass specified in
`subpassIndex`.

If the image referenced by the depth/stencil attachment used in the subpass
identified by `subpassIndex` was not created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html) or if the
subpass does not use a depth/stencil attachment, and
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html)::`variableSampleLocations`
is [VK_TRUE](VK_TRUE.html) then the values specified in `sampleLocationsInfo` are
ignored.

Valid Usage

* 
[](#VUID-VkSubpassSampleLocationsEXT-subpassIndex-01532) VUID-VkSubpassSampleLocationsEXT-subpassIndex-01532

`subpassIndex` **must** be less than the `subpassCount` specified
in [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) the render pass specified by
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)::`renderPass` was created with

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassSampleLocationsEXT-sampleLocationsInfo-parameter) VUID-VkSubpassSampleLocationsEXT-sampleLocationsInfo-parameter

 `sampleLocationsInfo` **must** be a valid [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html) structure

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html), [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassSampleLocationsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
