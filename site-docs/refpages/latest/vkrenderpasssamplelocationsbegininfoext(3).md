# VkRenderPassSampleLocationsBeginInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassSampleLocationsBeginInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassSampleLocationsBeginInfoEXT - Structure specifying sample locations to use for the layout transition of custom sample locations compatible depth/stencil attachments

The image layout of the depth aspect of a depth/stencil attachment referring
to an image created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html) is dependent
on the last sample locations used to render to the image subresource, thus
preserving the contents of such depth/stencil attachments across subpass
boundaries requires the application to specify these sample locations
whenever a layout transition of the attachment **may** occur.
This information **can** be provided by adding a
`VkRenderPassSampleLocationsBeginInfoEXT` structure to the `pNext`
chain of `VkRenderPassBeginInfo`.

The `VkRenderPassSampleLocationsBeginInfoEXT` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_sample_locations
typedef struct VkRenderPassSampleLocationsBeginInfoEXT {
    VkStructureType                          sType;
    const void*                              pNext;
    uint32_t                                 attachmentInitialSampleLocationsCount;
    const VkAttachmentSampleLocationsEXT*    pAttachmentInitialSampleLocations;
    uint32_t                                 postSubpassSampleLocationsCount;
    const VkSubpassSampleLocationsEXT*       pPostSubpassSampleLocations;
} VkRenderPassSampleLocationsBeginInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentInitialSampleLocationsCount` is the number of elements in
the `pAttachmentInitialSampleLocations` array.

* 
`pAttachmentInitialSampleLocations` is a pointer to an array of
`attachmentInitialSampleLocationsCount`
[VkAttachmentSampleLocationsEXT](VkAttachmentSampleLocationsEXT.html) structures specifying the
attachment indices and their corresponding sample location state.
Each element of `pAttachmentInitialSampleLocations` **can** specify the
sample location state to use in the automatic layout transition
performed to transition a depth/stencil attachment from the initial
layout of the attachment to the image layout specified for the
attachment in the first subpass using it.

* 
`postSubpassSampleLocationsCount` is the number of elements in the
`pPostSubpassSampleLocations` array.

* 
`pPostSubpassSampleLocations` is a pointer to an array of
`postSubpassSampleLocationsCount` [VkSubpassSampleLocationsEXT](VkSubpassSampleLocationsEXT.html)
structures specifying the subpass indices and their corresponding sample
location state.
Each element of `pPostSubpassSampleLocations` **can** specify the
sample location state to use in the automatic layout transition
performed to transition the depth/stencil attachment used by the
specified subpass to the image layout specified in a dependent subpass
or to the final layout of the attachment in case the specified subpass
is the last subpass using that attachment.
In addition, if
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html)::`variableSampleLocations`
is [VK_FALSE](VK_FALSE.html), each element of `pPostSubpassSampleLocations`
**must** specify the sample location state that matches the sample
locations used by all pipelines that will be bound to a command buffer
during the specified subpass.
If `variableSampleLocations` is [VK_TRUE](VK_TRUE.html), the sample locations
used for rasterization do not depend on
`pPostSubpassSampleLocations`.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassSampleLocationsBeginInfoEXT-sType-sType) VUID-VkRenderPassSampleLocationsBeginInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_SAMPLE_LOCATIONS_BEGIN_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkRenderPassSampleLocationsBeginInfoEXT-pAttachmentInitialSampleLocations-parameter) VUID-VkRenderPassSampleLocationsBeginInfoEXT-pAttachmentInitialSampleLocations-parameter

 If `attachmentInitialSampleLocationsCount` is not `0`, `pAttachmentInitialSampleLocations` **must** be a valid pointer to an array of `attachmentInitialSampleLocationsCount` valid [VkAttachmentSampleLocationsEXT](VkAttachmentSampleLocationsEXT.html) structures

* 
[](#VUID-VkRenderPassSampleLocationsBeginInfoEXT-pPostSubpassSampleLocations-parameter) VUID-VkRenderPassSampleLocationsBeginInfoEXT-pPostSubpassSampleLocations-parameter

 If `postSubpassSampleLocationsCount` is not `0`, `pPostSubpassSampleLocations` **must** be a valid pointer to an array of `postSubpassSampleLocationsCount` valid [VkSubpassSampleLocationsEXT](VkSubpassSampleLocationsEXT.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkAttachmentSampleLocationsEXT](VkAttachmentSampleLocationsEXT.html), [VkStructureType](VkStructureType.html), [VkSubpassSampleLocationsEXT](VkSubpassSampleLocationsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassSampleLocationsBeginInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
