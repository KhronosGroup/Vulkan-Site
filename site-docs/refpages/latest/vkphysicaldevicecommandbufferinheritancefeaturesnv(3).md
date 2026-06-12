# VkPhysicalDeviceCommandBufferInheritanceFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCommandBufferInheritanceFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCommandBufferInheritanceFeaturesNV - Structure describing whether the command buffer inheritance feature is supported by an implementation

The `VkPhysicalDeviceCommandBufferInheritanceFeaturesNV` structure is
defined as:

// Provided by VK_NV_command_buffer_inheritance
typedef struct VkPhysicalDeviceCommandBufferInheritanceFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           commandBufferInheritance;
} VkPhysicalDeviceCommandBufferInheritanceFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `commandBufferInheritance`
indicates that command buffers executed in a queue inherit graphics and
compute state from the previously executed command buffer in that queue.

If the `VkPhysicalDeviceCommandBufferInheritanceFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceCommandBufferInheritanceFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCommandBufferInheritanceFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCommandBufferInheritanceFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMMAND_BUFFER_INHERITANCE_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_command_buffer_inheritance](VK_NV_command_buffer_inheritance.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceCommandBufferInheritanceFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
