# vkDestroyImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyImage - Destroy an image object

To destroy an image, call:

// Provided by VK_VERSION_1_0
void vkDestroyImage(
    VkDevice                                    device,
    VkImage                                     image,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the image.

* 
`image` is the image to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyImage-image-01000) VUID-vkDestroyImage-image-01000

All submitted commands that refer to `image`, either directly or via
a `VkImageView`, **must** have completed execution

* 
[](#VUID-vkDestroyImage-image-01001) VUID-vkDestroyImage-image-01001

If `VkAllocationCallbacks` were provided when `image` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyImage-image-01002) VUID-vkDestroyImage-image-01002

If no `VkAllocationCallbacks` were provided when `image` was
created, `pAllocator` **must** be `NULL`

* 
[](#VUID-vkDestroyImage-image-04882) VUID-vkDestroyImage-image-04882

`image` **must** not have been acquired from
[vkGetSwapchainImagesKHR](vkGetSwapchainImagesKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyImage-device-parameter) VUID-vkDestroyImage-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyImage-image-parameter) VUID-vkDestroyImage-image-parameter

 If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkDestroyImage-pAllocator-parameter) VUID-vkDestroyImage-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyImage-image-parent) VUID-vkDestroyImage-image-parent

 If `image` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `image` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
