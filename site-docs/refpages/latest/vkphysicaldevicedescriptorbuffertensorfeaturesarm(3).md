# VkPhysicalDeviceDescriptorBufferTensorFeaturesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorBufferTensorFeaturesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorBufferTensorFeaturesARM - Structure describing the descriptor buffer tensor features that can be supported by an implementation

The `VkPhysicalDeviceDescriptorBufferTensorFeaturesARM` structure is
defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkPhysicalDeviceDescriptorBufferTensorFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorBufferTensorDescriptors;
} VkPhysicalDeviceDescriptorBufferTensorFeaturesARM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`descriptorBufferTensorDescriptors` indicates that the
implementation supports putthing shader-accessible tensor descriptors
directly in memory.

If the `VkPhysicalDeviceDescriptorBufferTensorFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDescriptorBufferTensorFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferTensorFeaturesARM-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferTensorFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_FEATURES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDescriptorBufferTensorFeaturesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
