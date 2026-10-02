# VkVideoPictureResourceInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoPictureResourceInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoPictureResourceInfoKHR - Structure specifying the parameters of a video picture resource

The `VkVideoPictureResourceInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoPictureResourceInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkOffset2D         codedOffset;
    VkExtent2D         codedExtent;
    uint32_t           baseArrayLayer;
    VkImageView        imageViewBinding;
} VkVideoPictureResourceInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`codedOffset` is the offset in texels of the image subregion to use.

* 
`codedExtent` is the size in pixels of the coded image data.

* 
`baseArrayLayer` is the array layer of the image view specified in
`imageViewBinding` to use as the video picture resource.

* 
`imageViewBinding` is an image view representing the video picture
resource.

The image subresource referred to by such a structure is defined as the
image array layer index specified in `baseArrayLayer` relative to the
image subresource range the image view specified in `imageViewBinding`
was created with.

The meaning of the `codedOffset` and `codedExtent` depends on the
command and context the video picture resource is used in, as well as on the
used [video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) and corresponding codec-specific
semantics, as described later.

A video picture resource is uniquely defined by the image subresource
referred to by an instance of this structure, together with the
`codedOffset` and `codedExtent` members that identify the image
subregion within the image subresource referenced corresponding to the video
picture resource according to the particular codec-specific semantics.

Accesses to image data within a video picture resource happen at the
granularity indicated by
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`pictureAccessGranularity`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used [video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles).
As a result, given an effective image subregion corresponding to a video
picture resource, the actual image subregion accessed **may** be larger than
that as it **may** include additional padding texels due to the picture access
granularity.
Any writes performed by video coding operations to such padding texels will
result in **undefined** texel values.

Two video picture resources match if they refer to the same image
subresource and they specify identical `codedOffset` and
`codedExtent` values.

Valid Usage

* 
[](#VUID-VkVideoPictureResourceInfoKHR-baseArrayLayer-07175) VUID-VkVideoPictureResourceInfoKHR-baseArrayLayer-07175

`baseArrayLayer` **must** be less than the
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`subresourceRange.layerCount` specified
when the image view `imageViewBinding` was created

Valid Usage (Implicit)

* 
[](#VUID-VkVideoPictureResourceInfoKHR-sType-sType) VUID-VkVideoPictureResourceInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoPictureResourceInfoKHR-pNext-pNext) VUID-VkVideoPictureResourceInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkVideoPictureResourceInfoKHR-imageViewBinding-parameter) VUID-VkVideoPictureResourceInfoKHR-imageViewBinding-parameter

 `imageViewBinding` **must** be a valid [VkImageView](VkImageView.html) handle

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkExtent2D](VkExtent2D.html), [VkImageView](VkImageView.html), [VkOffset2D](VkOffset2D.html), [VkStructureType](VkStructureType.html), [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html), [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html), [VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoPictureResourceInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
