# VkBindImageMemorySwapchainInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindImageMemorySwapchainInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindImageMemorySwapchainInfoKHR - Structure specifying swapchain image memory to bind to

If the `pNext` chain of [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html) includes a
`VkBindImageMemorySwapchainInfoKHR` structure, then that structure
includes a swapchain handle and image index indicating that the image will
be bound to memory from that swapchain.

The `VkBindImageMemorySwapchainInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkBindImageMemorySwapchainInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
    uint32_t           imageIndex;
} VkBindImageMemorySwapchainInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a swapchain handle.

* 
`imageIndex` is an image index within `swapchain`.

If `swapchain` is not `NULL`, the `swapchain` and `imageIndex`
are used to determine the memory that the image is bound to, instead of
`memory` and `memoryOffset`.

Memory **can** be bound to a swapchain and use the `pDeviceIndices` or
`pSplitInstanceBindRegions` members of
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html).

Valid Usage

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-imageIndex-01644) VUID-VkBindImageMemorySwapchainInfoKHR-imageIndex-01644

`imageIndex` **must** be less than the number of images in
`swapchain`

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-07756) VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-07756

If the `swapchain` has been created with
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html),
`imageIndex` **must** be one that has previously been returned by
[vkAcquireNextImageKHR](vkAcquireNextImageKHR.html) or [vkAcquireNextImage2KHR](vkAcquireNextImage2KHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-sType-sType) VUID-VkBindImageMemorySwapchainInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_SWAPCHAIN_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-parameter) VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindImageMemorySwapchainInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
