# VkImageStencilUsage2CreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageStencilUsage2CreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageStencilUsage2CreateInfoKHR - Specify separate 64-bit usage flags for the stencil aspect of a depth-stencil image

The `VkImageStencilUsage2CreateInfoKHR` structure is defined as:

// Provided by VK_KHR_extended_flags with VK_VERSION_1_2 or VK_EXT_separate_stencil_usage
typedef struct VkImageStencilUsage2CreateInfoKHR {
    VkStructureType          sType;
    void*                    pNext;
    VkImageUsageFlags2KHR    stencilUsage;
} VkImageStencilUsage2CreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilUsage` is a bitmask of [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html)
describing the intended usage of the stencil aspect of the image.

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageStencilUsage2CreateInfoKHR` structure, then that structure
includes the usage flags specific to the stencil aspect of the image for an
image with a depth-stencil format.

This structure specifies image usages which only apply to the stencil aspect
of a depth/stencil format image.
When this structure is included in the `pNext` chain of
[VkImageCreateInfo](VkImageCreateInfo.html), the stencil aspect of the image **must** only be used
as specified by `stencilUsage`.
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
[](#VUID-VkImageStencilUsage2CreateInfoKHR-stencilUsage-12443) VUID-VkImageStencilUsage2CreateInfoKHR-stencilUsage-12443

If `stencilUsage` includes
[VK_IMAGE_USAGE_2_TRANSIENT_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits2KHR.html), it **must** not
include bits other than
[VK_IMAGE_USAGE_2_DEPTH_STENCIL_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits2KHR.html) or
[VK_IMAGE_USAGE_2_INPUT_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits2KHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageStencilUsage2CreateInfoKHR-sType-sType) VUID-VkImageStencilUsage2CreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImageStencilUsage2CreateInfoKHR-stencilUsage-parameter) VUID-VkImageStencilUsage2CreateInfoKHR-stencilUsage-parameter

 `stencilUsage` **must** be a valid combination of [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) values

* 
[](#VUID-VkImageStencilUsage2CreateInfoKHR-stencilUsage-requiredbitmask) VUID-VkImageStencilUsage2CreateInfoKHR-stencilUsage-requiredbitmask

 `stencilUsage` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_EXT_separate_stencil_usage](VK_EXT_separate_stencil_usage.html), [VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageStencilUsage2CreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
