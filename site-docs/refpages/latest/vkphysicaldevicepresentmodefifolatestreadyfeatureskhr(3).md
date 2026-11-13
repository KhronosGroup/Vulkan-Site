# VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR - Structure describing support for VK_PRESENT_MODE_FIFO_LATEST_READY_KHR

The `VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_present_mode_fifo_latest_ready
typedef struct VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentModeFifoLatestReady;
} VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR;

// Provided by VK_EXT_present_mode_fifo_latest_ready
// Equivalent to VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR
typedef VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR VkPhysicalDevicePresentModeFifoLatestReadyFeaturesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentModeFifoLatestReady`
specifies whether the implementation supports the
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html) present mode.

If the `VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_present_mode_fifo_latest_ready](VK_EXT_present_mode_fifo_latest_ready.html), [VK_KHR_present_mode_fifo_latest_ready](VK_KHR_present_mode_fifo_latest_ready.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
