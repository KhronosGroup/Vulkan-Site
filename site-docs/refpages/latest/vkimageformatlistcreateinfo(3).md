# VkImageFormatListCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageFormatListCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageFormatListCreateInfo - Specify that an image **can** be used with a particular set of formats

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageFormatListCreateInfo` structure, then that structure contains a
list of all formats that **can** be used when creating views of this image.

The `VkImageFormatListCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkImageFormatListCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           viewFormatCount;
    const VkFormat*    pViewFormats;
} VkImageFormatListCreateInfo;

// Provided by VK_KHR_image_format_list
// Equivalent to VkImageFormatListCreateInfo
typedef VkImageFormatListCreateInfo VkImageFormatListCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewFormatCount` is the number of entries in the `pViewFormats`
array.

* 
`pViewFormats` is a pointer to an array of [VkFormat](VkFormat.html) values
specifying all formats which **can** be used when creating views of this
image.

If `viewFormatCount` is zero, `pViewFormats` is ignored and the
image is created as if the `VkImageFormatListCreateInfo` structure were
not included in the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html).

Valid Usage

* 
[](#VUID-VkImageFormatListCreateInfo-viewFormatCount-09540) VUID-VkImageFormatListCreateInfo-viewFormatCount-09540

If `viewFormatCount` is not 0, each element of `pViewFormats`
**must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageFormatListCreateInfo-sType-sType) VUID-VkImageFormatListCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkImageFormatListCreateInfo-pViewFormats-parameter) VUID-VkImageFormatListCreateInfo-pViewFormats-parameter

 If `viewFormatCount` is not `0`, `pViewFormats` **must** be a valid pointer to an array of `viewFormatCount` valid [VkFormat](VkFormat.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_KHR_image_format_list](VK_KHR_image_format_list.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageFormatListCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
