# VkImageStencilUsageCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageStencilUsageCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageStencilUsageCreateInfo - Specify separate usage flags for the stencil aspect of a depth-stencil image

The `VkImageStencilUsageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkImageStencilUsageCreateInfo {
    VkStructureType      sType;
    const void*          pNext;
    VkImageUsageFlags    stencilUsage;
} VkImageStencilUsageCreateInfo;

// Provided by VK_EXT_separate_stencil_usage
// Equivalent to VkImageStencilUsageCreateInfo
typedef VkImageStencilUsageCreateInfo VkImageStencilUsageCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilUsage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) describing
the intended usage of the stencil aspect of the image.

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageStencilUsageCreateInfo` structure, then that structure includes
the usage flags specific to the stencil aspect of the image for an image
with a depth-stencil format.

This structure specifies image usages which only apply to the stencil aspect
of a depth/stencil format image.
When this structure is included in the `pNext` chain of
[VkImageCreateInfo](VkImageCreateInfo.html), the stencil aspect of the image **must** only be used
as specified by `stencilUsage`.
When this structure is not included in the `pNext` chain of
[VkImageCreateInfo](VkImageCreateInfo.html), the stencil aspect of an image **must** only be used
as specified by [VkImageCreateInfo](VkImageCreateInfo.html)::`usage`.
Use of other aspects of an image are unaffected by this structure.

This structure **can** also be included in the `pNext` chain of
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) to query additional capabilities
specific to image creation parameter combinations including a separate set
of usage flags for the stencil aspect of the image using
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html).
When this structure is not included in the `pNext` chain of
`VkPhysicalDeviceImageFormatInfo2` then the implicit value of
`stencilUsage` matches that of
`VkPhysicalDeviceImageFormatInfo2`::`usage`.

Valid Usage

* 
[](#VUID-VkImageStencilUsageCreateInfo-stencilUsage-02539) VUID-VkImageStencilUsageCreateInfo-stencilUsage-02539

If `stencilUsage` includes
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), it **must** not include bits
other than [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageStencilUsageCreateInfo-sType-sType) VUID-VkImageStencilUsageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkImageStencilUsageCreateInfo-stencilUsage-parameter) VUID-VkImageStencilUsageCreateInfo-stencilUsage-parameter

 `stencilUsage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkImageStencilUsageCreateInfo-stencilUsage-requiredbitmask) VUID-VkImageStencilUsageCreateInfo-stencilUsage-requiredbitmask

 `stencilUsage` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_EXT_separate_stencil_usage](VK_EXT_separate_stencil_usage.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
