# VkImageViewCaptureDescriptorDataInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewCaptureDescriptorDataInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewCaptureDescriptorDataInfoEXT - Structure specifying an image view for descriptor capture

Information about the image view to get descriptor buffer capture data for
is passed in a `VkImageViewCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkImageViewCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
} VkImageViewCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the `VkImageView` handle of the image view to get
opaque capture data for.

Valid Usage

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-08083) VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-08083

`imageView` **must** have been created with
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageViewCreateFlagBits.html) set
in [VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkImageViewCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkImageViewCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-parameter) VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-parameter

 `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkImageView](VkImageView.html), [VkStructureType](VkStructureType.html), [vkGetImageViewOpaqueCaptureDescriptorDataEXT](vkGetImageViewOpaqueCaptureDescriptorDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkImageViewCaptureDescriptorDataInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
