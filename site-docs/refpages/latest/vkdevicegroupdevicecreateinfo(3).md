# VkDeviceGroupDeviceCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupDeviceCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupDeviceCreateInfo - Create a logical device from multiple physical devices

A logical device **can** be created that connects to one or more physical
devices by adding a `VkDeviceGroupDeviceCreateInfo` structure to the
`pNext` chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html).
The `VkDeviceGroupDeviceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupDeviceCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    uint32_t                   physicalDeviceCount;
    const VkPhysicalDevice*    pPhysicalDevices;
} VkDeviceGroupDeviceCreateInfo;

// Provided by VK_KHR_device_group_creation
// Equivalent to VkDeviceGroupDeviceCreateInfo
typedef VkDeviceGroupDeviceCreateInfo VkDeviceGroupDeviceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`physicalDeviceCount` is the number of elements in the
`pPhysicalDevices` array.

* 
`pPhysicalDevices` is a pointer to an array of physical device
handles belonging to the same device group.

The elements of the `pPhysicalDevices` array are an ordered list of the
physical devices that the logical device represents.
These **must** be a subset of a single device group, and need not be in the
same order as they were enumerated.
The order of the physical devices in the `pPhysicalDevices` array
determines the *device index* of each physical device, with element i
being assigned a device index of i.
Certain commands and structures refer to one or more physical devices by
using device indices or *device masks* formed using device indices.

A logical device created without using `VkDeviceGroupDeviceCreateInfo`,
or with `physicalDeviceCount` equal to zero, is equivalent to a
`physicalDeviceCount` of one and `pPhysicalDevices` pointing to the
`physicalDevice` parameter to [vkCreateDevice](vkCreateDevice.html).
In particular, the device index of that physical device is zero.

Valid Usage

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00375) VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00375

Each element of `pPhysicalDevices` **must** be unique

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00376) VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00376

All elements of `pPhysicalDevices` **must** be in the same device group
as enumerated by [vkEnumeratePhysicalDeviceGroups](vkEnumeratePhysicalDeviceGroups.html)

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-physicalDeviceCount-00377) VUID-VkDeviceGroupDeviceCreateInfo-physicalDeviceCount-00377

If `physicalDeviceCount` is not `0`, the `physicalDevice`
parameter of [vkCreateDevice](vkCreateDevice.html) **must** be an element of
`pPhysicalDevices`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-sType-sType) VUID-VkDeviceGroupDeviceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-parameter) VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-parameter

 If `physicalDeviceCount` is not `0`, `pPhysicalDevices` **must** be a valid pointer to an array of `physicalDeviceCount` valid [VkPhysicalDevice](VkPhysicalDevice.html) handles

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceGroupDeviceCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
