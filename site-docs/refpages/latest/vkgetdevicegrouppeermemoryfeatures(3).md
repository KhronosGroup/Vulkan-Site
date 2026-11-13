# vkGetDeviceGroupPeerMemoryFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceGroupPeerMemoryFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceGroupPeerMemoryFeatures - Query supported peer memory features of a device

*Peer memory* is memory that is allocated for a given physical device and
then bound to a resource and accessed by a different physical device, in a
logical device that represents multiple physical devices.
Some ways of reading and writing peer memory **may** not be supported by a
device.

To determine how peer memory **can** be accessed, call:

// Provided by VK_VERSION_1_1
void vkGetDeviceGroupPeerMemoryFeatures(
    VkDevice                                    device,
    uint32_t                                    heapIndex,
    uint32_t                                    localDeviceIndex,
    uint32_t                                    remoteDeviceIndex,
    VkPeerMemoryFeatureFlags*                   pPeerMemoryFeatures);

// Provided by VK_KHR_device_group
// Equivalent to vkGetDeviceGroupPeerMemoryFeatures
void vkGetDeviceGroupPeerMemoryFeaturesKHR(
    VkDevice                                    device,
    uint32_t                                    heapIndex,
    uint32_t                                    localDeviceIndex,
    uint32_t                                    remoteDeviceIndex,
    VkPeerMemoryFeatureFlags*                   pPeerMemoryFeatures);

* 
`device` is the logical device that owns the memory.

* 
`heapIndex` is the index of the memory heap from which the memory is
allocated.

* 
`localDeviceIndex` is the device index of the physical device that
performs the memory access.

* 
`remoteDeviceIndex` is the device index of the physical device that
the memory is allocated for.

* 
`pPeerMemoryFeatures` is a pointer to a
[VkPeerMemoryFeatureFlags](VkPeerMemoryFeatureFlags.html) bitmask indicating which types of memory
accesses are supported for the combination of heap, local, and remote
devices.

Valid Usage

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-heapIndex-00691) VUID-vkGetDeviceGroupPeerMemoryFeatures-heapIndex-00691

`heapIndex` **must** be less than `memoryHeapCount`

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00692) VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00692

`localDeviceIndex` **must** be a valid device index

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-remoteDeviceIndex-00693) VUID-vkGetDeviceGroupPeerMemoryFeatures-remoteDeviceIndex-00693

`remoteDeviceIndex` **must** be a valid device index

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00694) VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00694

`localDeviceIndex` **must** not equal `remoteDeviceIndex`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-device-parameter) VUID-vkGetDeviceGroupPeerMemoryFeatures-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-pPeerMemoryFeatures-parameter) VUID-vkGetDeviceGroupPeerMemoryFeatures-pPeerMemoryFeatures-parameter

 `pPeerMemoryFeatures` **must** be a valid pointer to a [VkPeerMemoryFeatureFlags](VkPeerMemoryFeatureFlags.html) value

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkPeerMemoryFeatureFlags](VkPeerMemoryFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetDeviceGroupPeerMemoryFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
