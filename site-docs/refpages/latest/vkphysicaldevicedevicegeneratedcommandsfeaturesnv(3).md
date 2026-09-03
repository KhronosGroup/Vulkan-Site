# VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV - Structure describing the device-generated commands features that can be supported by an implementation

The `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV` structure is
defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceGeneratedCommands;
} VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceGeneratedCommands`
indicates whether the implementation supports functionality to generate
commands on the device.
See [Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

If the `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
