# vkGetImageMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageMemoryRequirements - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for an image resource which is not
created with the [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) flag set, call:

// Provided by VK_VERSION_1_0
void vkGetImageMemoryRequirements(
    VkDevice                                    device,
    VkImage                                     image,
    VkMemoryRequirements*                       pMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`image` is the image to query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements](VkMemoryRequirements.html)
structure in which the memory requirements of the image object are
returned.

Valid Usage

* 
[](#VUID-vkGetImageMemoryRequirements-image-01588) VUID-vkGetImageMemoryRequirements-image-01588

`image` **must** not have been created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) flag set

* 
[](#VUID-vkGetImageMemoryRequirements-image-04004) VUID-vkGetImageMemoryRequirements-image-04004

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-vkGetImageMemoryRequirements-image-08960) VUID-vkGetImageMemoryRequirements-image-08960

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html) external
memory handle type, then `image` **must** be bound to memory

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageMemoryRequirements-device-parameter) VUID-vkGetImageMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageMemoryRequirements-image-parameter) VUID-vkGetImageMemoryRequirements-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkGetImageMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetImageMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements](VkMemoryRequirements.html) structure

* 
[](#VUID-vkGetImageMemoryRequirements-image-parent) VUID-vkGetImageMemoryRequirements-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html), [VkMemoryRequirements](VkMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
