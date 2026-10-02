# VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR - Structure describing whether implementation supports swapchain maintenance1 functionality

The `VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR` structure is
defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           swapchainMaintenance1;
} VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR
typedef VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR VkPhysicalDeviceSwapchainMaintenance1FeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `swapchainMaintenance1` indicates
that the implementation supports the following:

[VkSwapchainPresentFenceInfoKHR](VkSwapchainPresentFenceInfoKHR.html), specifying a fence that is
signaled when the resources associated with a present operation **can** be
safely destroyed.

* 
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html) and
[VkSwapchainPresentModeInfoKHR](VkSwapchainPresentModeInfoKHR.html), allowing the swapchain to switch
present modes without a need for recreation.

* 
[VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html), specifying the scaling
behavior of the swapchain in presence of window resizing.

* 
The [VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) flag,
allowing the implementation to defer the allocation of swapchain image
memory until first acquisition.

* 
[vkReleaseSwapchainImagesKHR](vkReleaseSwapchainImagesKHR.html), allowing acquired swapchain images
to be released without presenting them.

If the `VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SWAPCHAIN_MAINTENANCE_1_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_swapchain_maintenance1](VK_EXT_swapchain_maintenance1.html), [VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
