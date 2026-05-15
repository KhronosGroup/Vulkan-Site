# VkPhysicalDeviceAccelerationStructureFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceAccelerationStructureFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceAccelerationStructureFeaturesKHR - Structure describing the acceleration structure features that can be supported by an implementation

The `VkPhysicalDeviceAccelerationStructureFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkPhysicalDeviceAccelerationStructureFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           accelerationStructure;
    VkBool32           accelerationStructureCaptureReplay;
    VkBool32           accelerationStructureIndirectBuild;
    VkBool32           accelerationStructureHostCommands;
    VkBool32           descriptorBindingAccelerationStructureUpdateAfterBind;
} VkPhysicalDeviceAccelerationStructureFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `accelerationStructure` indicates
whether the implementation supports the acceleration structure
functionality.
See [Acceleration Structures](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure).

* 

`accelerationStructureCaptureReplay` indicates whether the
implementation supports saving and reusing acceleration structure device
addresses, e.g. for trace capture and replay.

* 

`accelerationStructureIndirectBuild` indicates whether the
implementation supports indirect acceleration structure build commands,
e.g. [vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html).

* 

`accelerationStructureHostCommands` indicates whether the
implementation supports host side acceleration structure commands, e.g.
[vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html),
[vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html),
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html),
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html),
[vkWriteAccelerationStructuresPropertiesKHR](vkWriteAccelerationStructuresPropertiesKHR.html).

* 

`descriptorBindingAccelerationStructureUpdateAfterBind` indicates
whether the implementation supports updating acceleration structure
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html).

If the `VkPhysicalDeviceAccelerationStructureFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceAccelerationStructureFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAccelerationStructureFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceAccelerationStructureFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceAccelerationStructureFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
