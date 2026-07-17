# VkPhysicalDeviceTensorFeaturesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTensorFeaturesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTensorFeaturesARM - Structure describing tensor features that can be supported by an implementation

The `VkPhysicalDeviceTensorFeaturesARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkPhysicalDeviceTensorFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tensorNonPacked;
    VkBool32           shaderTensorAccess;
    VkBool32           shaderStorageTensorArrayDynamicIndexing;
    VkBool32           shaderStorageTensorArrayNonUniformIndexing;
    VkBool32           descriptorBindingStorageTensorUpdateAfterBind;
    VkBool32           tensors;
} VkPhysicalDeviceTensorFeaturesARM;

The members of the `VkPhysicalDeviceTensorFeaturesARM` structure
describe the following features:

* 
 `tensorNonPacked` indicates whether the
implementation supports the creation of tensors that are not packed
tensors.

* 
 `shaderTensorAccess` indicates
whether shader modules **can** declare the `TensorsARM` capability.

* 

`shaderStorageBufferArrayDynamicIndexing` indicates whether arrays
of storage tensors **can** be indexed by dynamically uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) **must** be indexed only by constant
integral expressions when aggregated into arrays in shader code.
This also indicates whether shader modules **can** declare the
`StorageTensorArrayDynamicIndexingARM` capability.

* 

`shaderStorageTensorArrayNonUniformIndexing` indicates whether
arrays of storage tensors **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) **must** not be indexed by non-uniform
integer expressions when aggregated into arrays in shader code.
This also indicates whether shader modules **can** declare the
`StorageTensorArrayNonUniformIndexingARM` capability.

* 

`descriptorBindingStorageTensorUpdateAfterBind` indicates whether
the implementation supports updating storage tensor descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html) **must** not be used with
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html).

* 
 `tensors` indicates whether the implementation
supports tensor resources.

If the `VkPhysicalDeviceTensorFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceTensorFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTensorFeaturesARM-sType-sType) VUID-VkPhysicalDeviceTensorFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_FEATURES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_ARM_tensors](VK_ARM_tensors.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceTensorFeaturesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
