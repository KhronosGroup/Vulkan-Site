# VkImageSwapchainCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageSwapchainCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageSwapchainCreateInfoKHR - Specify that an image will be bound to swapchain memory

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageSwapchainCreateInfoKHR` structure, then that structure includes
a swapchain handle indicating that the image will be bound to memory from
that swapchain.

The `VkImageSwapchainCreateInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkImageSwapchainCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
} VkImageSwapchainCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a handle of a swapchain that
the image will be bound to.

Valid Usage

* 
[](#VUID-VkImageSwapchainCreateInfoKHR-swapchain-00995) VUID-VkImageSwapchainCreateInfoKHR-swapchain-00995

If `swapchain` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the fields of
[VkImageCreateInfo](VkImageCreateInfo.html) **must** match the
[implied image creation parameters](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#swapchain-wsi-image-create-info)
of the swapchain

Valid Usage (Implicit)

* 
[](#VUID-VkImageSwapchainCreateInfoKHR-sType-sType) VUID-VkImageSwapchainCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImageSwapchainCreateInfoKHR-swapchain-parameter) VUID-VkImageSwapchainCreateInfoKHR-swapchain-parameter

 If `swapchain` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageSwapchainCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
