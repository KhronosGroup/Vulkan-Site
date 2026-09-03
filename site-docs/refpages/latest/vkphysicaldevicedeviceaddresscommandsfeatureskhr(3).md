# VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR - Structure describing support for device address commands

The `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceAddressCommands;
} VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceAddressCommands` specifies
whether the implementation supports commands taking a
`VkDeviceAddress` that would otherwise take a [VkBuffer](VkBuffer.html)
object.

If the `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_ADDRESS_COMMANDS_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
