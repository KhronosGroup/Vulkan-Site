# VK_KHR_get_physical_device_properties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_get_physical_device_properties2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_get_physical_device_properties2](#VK_KHR_get_physical_device_properties2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_get_physical_device_properties2 - instance extension

**Name String**

`VK_KHR_get_physical_device_properties2`

**Extension Type**

Instance extension

**Registered Extension Number**

60

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_get_physical_device_properties2] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_get_physical_device_properties2 extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Ian Elliott, Google

This extension provides new queries for device features, device properties,
and format properties that can be easily extended by other extensions,
without introducing any further queries.
The Vulkan 1.0 feature/limit/formatproperty structures do not include
`sType`/`pNext` members.
This extension wraps them in new structures with `sType`/`pNext`
members, so an application can query a chain of feature/limit/formatproperty
structures by constructing the chain and letting the implementation fill
them in.
A new command is added for each `vkGetPhysicalDevice*` command in core
Vulkan 1.0.
The new feature structure (and a `pNext` chain of extending structures)
can also be passed in to device creation to enable features.

This extension also allows applications to use the physical-device
components of device extensions before [vkCreateDevice](vkCreateDevice.html) is called.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkGetPhysicalDeviceFeatures2KHR](vkGetPhysicalDeviceFeatures2.html)

* 
[vkGetPhysicalDeviceFormatProperties2KHR](vkGetPhysicalDeviceFormatProperties2.html)

* 
[vkGetPhysicalDeviceImageFormatProperties2KHR](vkGetPhysicalDeviceImageFormatProperties2.html)

* 
[vkGetPhysicalDeviceMemoryProperties2KHR](vkGetPhysicalDeviceMemoryProperties2.html)

* 
[vkGetPhysicalDeviceProperties2KHR](vkGetPhysicalDeviceProperties2.html)

* 
[vkGetPhysicalDeviceQueueFamilyProperties2KHR](vkGetPhysicalDeviceQueueFamilyProperties2.html)

* 
[vkGetPhysicalDeviceSparseImageFormatProperties2KHR](vkGetPhysicalDeviceSparseImageFormatProperties2.html)

* 
[VkFormatProperties2KHR](VkFormatProperties2.html)

* 
[VkImageFormatProperties2KHR](VkImageFormatProperties2.html)

* 
[VkPhysicalDeviceImageFormatInfo2KHR](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkPhysicalDeviceMemoryProperties2KHR](VkPhysicalDeviceMemoryProperties2.html)

* 
[VkPhysicalDeviceProperties2KHR](VkPhysicalDeviceProperties2.html)

* 
[VkPhysicalDeviceSparseImageFormatInfo2KHR](VkPhysicalDeviceSparseImageFormatInfo2.html)

* 
[VkQueueFamilyProperties2KHR](VkQueueFamilyProperties2.html)

* 
[VkSparseImageFormatProperties2KHR](VkSparseImageFormatProperties2.html)

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFeatures2KHR](VkPhysicalDeviceFeatures2.html)

* 
`VK_KHR_GET_PHYSICAL_DEVICE_PROPERTIES_2_EXTENSION_NAME`

* 
`VK_KHR_GET_PHYSICAL_DEVICE_PROPERTIES_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2_KHR](VkStructureType.html)

    // Get features with a hypothetical future extension.
    VkHypotheticalExtensionFeaturesKHR hypotheticalFeatures =
    {
        .sType = VK_STRUCTURE_TYPE_HYPOTHETICAL_FEATURES_KHR,
        .pNext = NULL,
    };

    VkPhysicalDeviceFeatures2KHR features =
    {
        .sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2_KHR,
        .pNext = &hypotheticalFeatures,
    };

    // After this call, features and hypotheticalFeatures have been filled out.
    vkGetPhysicalDeviceFeatures2KHR(physicalDevice, &features);

    // Properties/limits can be chained and queried similarly.

    // Enable some features:
    VkHypotheticalExtensionFeaturesKHR enabledHypotheticalFeatures =
    {
        .sType = VK_STRUCTURE_TYPE_HYPOTHETICAL_FEATURES_KHR,
        .pNext = NULL,
    };

    VkPhysicalDeviceFeatures2KHR enabledFeatures =
    {
        .sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2_KHR,
        .pNext = &enabledHypotheticalFeatures,
    };

    enabledFeatures.features.xyz = VK_TRUE;
    enabledHypotheticalFeatures.abc = VK_TRUE;

    VkDeviceCreateInfo deviceCreateInfo =
    {
        .sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO,
        .pNext = &enabledFeatures,
        ...
        .pEnabledFeatures = NULL,
    };

    VkDevice device;
    vkCreateDevice(physicalDevice, &deviceCreateInfo, NULL, &device);

* 
Revision 1, 2016-09-12 (Jeff Bolz)

Internal revisions

Revision 2, 2016-11-02 (Ian Elliott)

* 
Added ability for applications to use the physical-device components of
device extensions before vkCreateDevice is called.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_get_physical_device_properties2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
