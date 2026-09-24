# VK_EXT_swapchain_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_swapchain_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_swapchain_maintenance1](#VK_EXT_swapchain_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_swapchain_maintenance1](#_promotion_to_vk_khr_swapchain_maintenance1)
- [Promotion_to_VK_KHR_swapchain_maintenance1](#_promotion_to_vk_khr_swapchain_maintenance1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_swapchain_maintenance1 - device extension

**Name String**

`VK_EXT_swapchain_maintenance1`

**Extension Type**

Device extension

**Registered Extension Number**

276

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html)

and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html)
extension

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_swapchain_maintenance1] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_swapchain_maintenance1 extension*)

**Extension Proposal**

[VK_EXT_swapchain_maintenance1](../../../../features/latest/features/proposals/VK_EXT_swapchain_maintenance1.html)

**Last Modified Date**

2022-12-16

**Interactions and External Dependencies**

* 
Promoted to `[VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html)`

**Contributors**

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Shahbaz Youssefi, Google

* 
Chris Forbes, Google

* 
Ian Elliott, Google

* 
Yiwei Zhang, Google

* 
Charlie Lao, Google

* 
Lina Versace, Google

* 
Ralph Potter, Samsung

* 
Igor Nazarov, Samsung

* 
Hyunchang Kim, Samsung

* 
Suenghwan Lee, Samsung

* 
Munseong Kang, Samsung

* 
Joonyong Park, Samsung

* 
Hans-Kristian Arntzen, Valve

* 
Lisa Wu, Arm

* 
Daniel Stone, Collabora

* 
Pan Gao, Huawei

`[VK_EXT_swapchain_maintenance1](#)` adds a collection of window system
integration features that were intentionally left out or overlooked in the
original `[VK_KHR_swapchain](VK_KHR_swapchain.html)` extension.

The new features are as follows:

* 
Specify a fence that will be signaled when the resources associated with
a present operation **can** be safely destroyed.

* 
Allow changing the present mode a swapchain is using at per-present
granularity.

* 
Allow applications to define the behavior when presenting a swapchain
image to a surface with different dimensions than the image.
Using this feature **may** allow implementations to avoid returning
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) in this situation.

* 
Allow applications to defer swapchain memory allocation for improved
startup time and memory footprint.

* 
Allow applications to release previously acquired images without
presenting them.

All functionality in this extension is included in
`[VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html)`, with the suffix changed to KHR.
The original type, enum, and command names are still available as aliases of
the KHR functionality.

* 
[vkReleaseSwapchainImagesEXT](vkReleaseSwapchainImagesKHR.html)

* 
[VkReleaseSwapchainImagesInfoEXT](VkReleaseSwapchainImagesInfoKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceSwapchainMaintenance1FeaturesEXT](VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR.html)

Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

* 
[VkSwapchainPresentFenceInfoEXT](VkSwapchainPresentFenceInfoKHR.html)

* 
[VkSwapchainPresentModeInfoEXT](VkSwapchainPresentModeInfoKHR.html)

Extending [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

* 
[VkSwapchainPresentModesCreateInfoEXT](VkSwapchainPresentModesCreateInfoKHR.html)

* 
[VkSwapchainPresentScalingCreateInfoEXT](VkSwapchainPresentScalingCreateInfoKHR.html)

* 
`VK_EXT_SWAPCHAIN_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_EXT_SWAPCHAIN_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SWAPCHAIN_MAINTENANCE_1_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RELEASE_SWAPCHAIN_IMAGES_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_FENCE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODES_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_SCALING_CREATE_INFO_EXT](VkStructureType.html)

Extending [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html):

* 
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)

* 
Revision 0, 2019-05-28 (James Jones)

Initial revisions

Revision 1, 2022-08-21 (Shahbaz Youssefi)

* 
Add functionality and complete spec

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_swapchain_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
