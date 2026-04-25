# VkVideoFormatPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoFormatPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoFormatPropertiesKHR - Structure enumerating the video image formats

The `VkVideoFormatPropertiesKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoFormatPropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkFormat              format;
    VkComponentMapping    componentMapping;
    VkImageCreateFlags    imageCreateFlags;
    VkImageType           imageType;
    VkImageTiling         imageTiling;
    VkImageUsageFlags     imageUsageFlags;
} VkVideoFormatPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is a [VkFormat](VkFormat.html) that specifies the format that **can** be
used with the specified video profiles and image usages.

* 
`componentMapping` defines the color channel order used for the
format.
`format` along with `componentMapping` describe how the color
channels are ordered when producing video decoder output or are expected
to be ordered in video encoder input, when applicable.
If the `format` reported does not require component swizzling then
all members of `componentMapping` will be set to
[VK_COMPONENT_SWIZZLE_IDENTITY](VkComponentSwizzle.html).

* 
`imageCreateFlags` is a bitmask of [VkImageCreateFlagBits](VkImageCreateFlagBits.html)
specifying the supported image creation flags for the format.

* 
`imageType` is a [VkImageType](VkImageType.html) that specifies the image type the
format **can** be used with.

* 
`imageTiling` is a [VkImageTiling](VkImageTiling.html) that specifies the image
tiling the format **can** be used with.

* 
`imageUsageFlags` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html)
specifying the supported image usage flags for the format.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoFormatPropertiesKHR-sType-sType) VUID-VkVideoFormatPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_FORMAT_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoFormatPropertiesKHR-pNext-pNext) VUID-VkVideoFormatPropertiesKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoFormatAV1QuantizationMapPropertiesKHR](VkVideoFormatAV1QuantizationMapPropertiesKHR.html), [VkVideoFormatH265QuantizationMapPropertiesKHR](VkVideoFormatH265QuantizationMapPropertiesKHR.html), or [VkVideoFormatQuantizationMapPropertiesKHR](VkVideoFormatQuantizationMapPropertiesKHR.html)

* 
[](#VUID-VkVideoFormatPropertiesKHR-sType-unique) VUID-VkVideoFormatPropertiesKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkComponentMapping](VkComponentMapping.html), [VkFormat](VkFormat.html), [VkImageCreateFlags](VkImageCreateFlags.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoFormatPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
