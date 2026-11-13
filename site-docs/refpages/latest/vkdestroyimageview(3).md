# vkDestroyImageView(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyImageView.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyImageView - Destroy an image view object

To destroy an image view, call:

// Provided by VK_VERSION_1_0
void vkDestroyImageView(
    VkDevice                                    device,
    VkImageView                                 imageView,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the image view.

* 
`imageView` is the image view to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyImageView-imageView-01026) VUID-vkDestroyImageView-imageView-01026

All submitted commands that refer to `imageView` **must** have
completed execution

* 
[](#VUID-vkDestroyImageView-imageView-01027) VUID-vkDestroyImageView-imageView-01027

If `VkAllocationCallbacks` were provided when `imageView` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyImageView-imageView-01028) VUID-vkDestroyImageView-imageView-01028

If no `VkAllocationCallbacks` were provided when `imageView` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyImageView-device-parameter) VUID-vkDestroyImageView-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyImageView-imageView-parameter) VUID-vkDestroyImageView-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-vkDestroyImageView-pAllocator-parameter) VUID-vkDestroyImageView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyImageView-imageView-parent) VUID-vkDestroyImageView-imageView-parent

 If `imageView` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `imageView` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkImageView](VkImageView.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyImageView).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
