# VkDeviceGroupPresentCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupPresentCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupPresentCapabilitiesKHR - Present capabilities from other physical devices

The `VkDeviceGroupPresentCapabilitiesKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
typedef struct VkDeviceGroupPresentCapabilitiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    uint32_t                            presentMask[VK_MAX_DEVICE_GROUP_SIZE];
    VkDeviceGroupPresentModeFlagsKHR    modes;
} VkDeviceGroupPresentCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentMask` is an array of [VK_MAX_DEVICE_GROUP_SIZE](VK_MAX_DEVICE_GROUP_SIZE.html)
`uint32_t` masks, where the mask at element i is non-zero if
physical device i has a presentation engine, and where bit j
is set in element i if physical device i **can** present
swapchain images from physical device j.
If element i is non-zero, then bit i **must** be set.

* 
`modes` is a bitmask of [VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html)
indicating which device group presentation modes are supported.

`modes` always has [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html) set.

The present mode flags are also used when presenting an image, in
[VkDeviceGroupPresentInfoKHR](VkDeviceGroupPresentInfoKHR.html)::`mode`.

If a device group only includes a single physical device, then `modes`
**must** equal [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupPresentCapabilitiesKHR-sType-sType) VUID-VkDeviceGroupPresentCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_CAPABILITIES_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceGroupPresentCapabilitiesKHR-pNext-pNext) VUID-VkDeviceGroupPresentCapabilitiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_surface](VK_KHR_surface.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html), [VkStructureType](VkStructureType.html), [vkGetDeviceGroupPresentCapabilitiesKHR](vkGetDeviceGroupPresentCapabilitiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDeviceGroupPresentCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
