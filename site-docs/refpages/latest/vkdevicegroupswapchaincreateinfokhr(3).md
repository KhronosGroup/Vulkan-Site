# VkDeviceGroupSwapchainCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupSwapchainCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupSwapchainCreateInfoKHR - Structure specifying parameters of a newly created swapchain object

If the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) includes a
`VkDeviceGroupSwapchainCreateInfoKHR` structure, then that structure
includes a set of device group present modes that the swapchain **can** be used
with.

The `VkDeviceGroupSwapchainCreateInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkDeviceGroupSwapchainCreateInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    VkDeviceGroupPresentModeFlagsKHR    modes;
} VkDeviceGroupSwapchainCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`modes` is a bitfield of modes that the swapchain **can** be used with.

If this structure is not present, `modes` is considered to be
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupSwapchainCreateInfoKHR-sType-sType) VUID-VkDeviceGroupSwapchainCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_SWAPCHAIN_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-parameter) VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-parameter

 `modes` **must** be a valid combination of [VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html) values

* 
[](#VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-requiredbitmask) VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-requiredbitmask

 `modes` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDeviceGroupSwapchainCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
