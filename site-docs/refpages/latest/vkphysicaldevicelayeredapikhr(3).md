# VkPhysicalDeviceLayeredApiKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLayeredApiKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLayeredApiKHR - API implemented by the layered implementation

The list of possible API implementations of a layered implementation
underneath the Vulkan physical device, as returned in
[VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html)::`layeredAPI`, are:

// Provided by VK_KHR_maintenance7
typedef enum VkPhysicalDeviceLayeredApiKHR {
    VK_PHYSICAL_DEVICE_LAYERED_API_VULKAN_KHR = 0,
    VK_PHYSICAL_DEVICE_LAYERED_API_D3D12_KHR = 1,
    VK_PHYSICAL_DEVICE_LAYERED_API_METAL_KHR = 2,
    VK_PHYSICAL_DEVICE_LAYERED_API_OPENGL_KHR = 3,
    VK_PHYSICAL_DEVICE_LAYERED_API_OPENGLES_KHR = 4,
} VkPhysicalDeviceLayeredApiKHR;

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_VULKAN_KHR](#) - the device implements
the Vulkan API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_D3D12_KHR](#) - the device implements
the D3D12 API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_METAL_KHR](#) - the device implements
the Metal API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_OPENGL_KHR](#) - the device implements
the OpenGL API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_OPENGLES_KHR](#) - the device
implements the OpenGL ES API.

[VK_KHR_maintenance7](VK_KHR_maintenance7.html), [VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceLayeredApiKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
