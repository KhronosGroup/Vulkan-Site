# VkImageCaptureDescriptorDataInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCaptureDescriptorDataInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCaptureDescriptorDataInfoEXT - Structure specifying an image for descriptor capture

Information about the image to get descriptor buffer capture data for is
passed in a `VkImageCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkImageCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the `VkImage` handle of the image to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-image-08079) VUID-VkImageCaptureDescriptorDataInfoEXT-image-08079

`image` **must** have been created with
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) set in
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkImageCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkImageCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-image-parameter) VUID-VkImageCaptureDescriptorDataInfoEXT-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html), [vkGetImageOpaqueCaptureDescriptorDataEXT](vkGetImageOpaqueCaptureDescriptorDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkImageCaptureDescriptorDataInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
