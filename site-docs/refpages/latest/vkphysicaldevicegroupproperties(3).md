# VkPhysicalDeviceGroupProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceGroupProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceGroupProperties - Structure specifying physical device group properties

The `VkPhysicalDeviceGroupProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceGroupProperties {
    VkStructureType     sType;
    void*               pNext;
    uint32_t            physicalDeviceCount;
    VkPhysicalDevice    physicalDevices[VK_MAX_DEVICE_GROUP_SIZE];
    VkBool32            subsetAllocation;
} VkPhysicalDeviceGroupProperties;

// Provided by VK_KHR_device_group_creation
// Equivalent to VkPhysicalDeviceGroupProperties
typedef VkPhysicalDeviceGroupProperties VkPhysicalDeviceGroupPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`physicalDeviceCount` is the number of physical devices in the
group.

* 
`physicalDevices` is an array of [VK_MAX_DEVICE_GROUP_SIZE](VK_MAX_DEVICE_GROUP_SIZE.html)
[VkPhysicalDevice](VkPhysicalDevice.html) handles representing all physical devices in the
group.
The first `physicalDeviceCount` elements of the array will be valid.

* 
`subsetAllocation` specifies whether logical devices created from
the group support allocating device memory on a subset of devices, via
the `deviceMask` member of the [VkMemoryAllocateFlagsInfo](VkMemoryAllocateFlagsInfo.html).
If this is [VK_FALSE](VK_FALSE.html), then all device memory allocations are made
across all physical devices in the group.
If `physicalDeviceCount` is `1`, then `subsetAllocation` **must**
be [VK_FALSE](VK_FALSE.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGroupProperties-sType-sType) VUID-VkPhysicalDeviceGroupProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceGroupProperties-pNext-pNext) VUID-VkPhysicalDeviceGroupProperties-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkPhysicalDevice](VkPhysicalDevice.html), [VkStructureType](VkStructureType.html), [vkEnumeratePhysicalDeviceGroups](vkEnumeratePhysicalDeviceGroups.html), [vkEnumeratePhysicalDeviceGroups](vkEnumeratePhysicalDeviceGroups.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceGroupProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
