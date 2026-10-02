# VkPhysicalDeviceType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceType - Supported physical device types

The physical device types which **may** be returned in
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`deviceType` are:

// Provided by VK_VERSION_1_0
typedef enum VkPhysicalDeviceType {
    VK_PHYSICAL_DEVICE_TYPE_OTHER = 0,
    VK_PHYSICAL_DEVICE_TYPE_INTEGRATED_GPU = 1,
    VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU = 2,
    VK_PHYSICAL_DEVICE_TYPE_VIRTUAL_GPU = 3,
    VK_PHYSICAL_DEVICE_TYPE_CPU = 4,
} VkPhysicalDeviceType;

* 
[VK_PHYSICAL_DEVICE_TYPE_OTHER](#) - the device does not match any
other available types.

* 
[VK_PHYSICAL_DEVICE_TYPE_INTEGRATED_GPU](#) - the device is typically
one embedded in or tightly coupled with the host.

* 
[VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU](#) - the device is typically a
separate processor connected to the host via an interlink.

* 
[VK_PHYSICAL_DEVICE_TYPE_VIRTUAL_GPU](#) - the device is typically a
virtual node in a virtualization environment.

* 
[VK_PHYSICAL_DEVICE_TYPE_CPU](#) - the device is typically running on
the same processors as the host.

The physical device type is advertised for informational purposes only, and
does not directly affect the operation of the system.
However, the device type **may** correlate with other advertised properties or
capabilities of the system, such as how many memory heaps there are.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
