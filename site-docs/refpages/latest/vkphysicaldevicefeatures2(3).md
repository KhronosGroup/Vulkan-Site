# VkPhysicalDeviceFeatures2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFeatures2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFeatures2 - Structure describing the fine-grained features that can be supported by an implementation

The `VkPhysicalDeviceFeatures2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceFeatures2 {
    VkStructureType             sType;
    void*                       pNext;
    VkPhysicalDeviceFeatures    features;
} VkPhysicalDeviceFeatures2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceFeatures2
typedef VkPhysicalDeviceFeatures2 VkPhysicalDeviceFeatures2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`features` is a [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html) structure describing
the fine-grained features of the Vulkan 1.0 API.

The `pNext` chain of this structure is used to extend the structure with
features defined by extensions.
This structure **can** be used in [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html) or **can** be
included in the `pNext` chain of a [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure,
in which case it controls which features are enabled in lieu of
`pEnabledFeatures`.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFeatures2-sType-sType) VUID-VkPhysicalDeviceFeatures2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceFeatures2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
