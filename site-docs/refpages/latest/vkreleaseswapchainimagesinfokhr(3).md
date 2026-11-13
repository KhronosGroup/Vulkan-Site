# VkReleaseSwapchainImagesInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkReleaseSwapchainImagesInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkReleaseSwapchainImagesInfoKHR - Structure describing a list of swapchain image indices to be released

The `VkReleaseSwapchainImagesInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkReleaseSwapchainImagesInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
    uint32_t           imageIndexCount;
    const uint32_t*    pImageIndices;
} VkReleaseSwapchainImagesInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkReleaseSwapchainImagesInfoKHR
typedef VkReleaseSwapchainImagesInfoKHR VkReleaseSwapchainImagesInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is a swapchain to which images are being released.

* 
`imageIndexCount` is the number of image indices to be released.

* 
`pImageIndices` is a pointer to an array of indices into the array
of `swapchain`’s presentable images, with `imageIndexCount`
entries.

Valid Usage

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07785) VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07785

Each element of `pImageIndices` **must** be the index of a presentable
image acquired from the swapchain specified by `swapchain`

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07786) VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07786

All uses of presentable images identified by elements of
`pImageIndices` **must** have completed execution

Valid Usage (Implicit)

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-sType-sType) VUID-VkReleaseSwapchainImagesInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RELEASE_SWAPCHAIN_IMAGES_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pNext-pNext) VUID-VkReleaseSwapchainImagesInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-swapchain-parameter) VUID-VkReleaseSwapchainImagesInfoKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-parameter) VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-parameter

 `pImageIndices` **must** be a valid pointer to an array of `imageIndexCount` `uint32_t` values

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-imageIndexCount-arraylength) VUID-VkReleaseSwapchainImagesInfoKHR-imageIndexCount-arraylength

 `imageIndexCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

[VK_EXT_swapchain_maintenance1](VK_EXT_swapchain_maintenance1.html), [VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html), [VkStructureType](VkStructureType.html), [VkSwapchainKHR](VkSwapchainKHR.html), [vkReleaseSwapchainImagesKHR](vkReleaseSwapchainImagesKHR.html), [vkReleaseSwapchainImagesKHR](vkReleaseSwapchainImagesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkReleaseSwapchainImagesInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
