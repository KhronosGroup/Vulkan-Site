# VkPhysicalDeviceMaintenance8FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance8FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance8FeaturesKHR - Structure describing whether the implementation supports maintenance8 functionality

The `VkPhysicalDeviceMaintenance8FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance8
typedef struct VkPhysicalDeviceMaintenance8FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance8;
} VkPhysicalDeviceMaintenance8FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance8` indicates that the
implementation supports the following:

Allow copies between depth/stencil and “matching” color attachments

* 
Allow `dstCache` in `vkMergePipelineCaches` to be implicitly
synchronized.

* 
Require src/dst sync scopes to work when doing queue family ownership
transfers

* 
Support `Offset` (as an alternative to `ConstOffset`) image operand in
texture sampling and fetch operations

* 
Use the SPIR-V definition of OpSRem and OpSMod, making these operations
produce well-defined results for negative operands

* 
Loosen layer restrictions when blitting from 3D images to other image
types

* 
Add space for an additional 64 access flags for use with
VkMemoryBarrier2, VkBufferMemoryBarrier2, and VkImageMemoryBarrier2

If the `VkPhysicalDeviceMaintenance8FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance8FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance8FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance8FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_8_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance8](VK_KHR_maintenance8.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance8FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
