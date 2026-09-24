# VkDeviceGroupPresentModeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupPresentModeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupPresentModeFlagBitsKHR - Bitmask specifying supported device group present modes

Bits which **may** be set in
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`modes`, indicating which
device group presentation modes are supported, are:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
typedef enum VkDeviceGroupPresentModeFlagBitsKHR {
    VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR = 0x00000001,
    VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR = 0x00000002,
    VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR = 0x00000004,
    VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR = 0x00000008,
} VkDeviceGroupPresentModeFlagBitsKHR;

* 
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#) specifies that any
physical device with a presentation engine **can** present its own
swapchain images.

* 
[VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR](#) specifies that any
physical device with a presentation engine **can** present swapchain images
from any physical device in its `presentMask`.

* 
[VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR](#) specifies that any
physical device with a presentation engine **can** present the sum of
swapchain images from any physical devices in its `presentMask`.

* 
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](#) specifies
that multiple physical devices with a presentation engine **can** each
present their own swapchain images.

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_surface](VK_KHR_surface.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDeviceGroupPresentInfoKHR](VkDeviceGroupPresentInfoKHR.html), [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDeviceGroupPresentModeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
