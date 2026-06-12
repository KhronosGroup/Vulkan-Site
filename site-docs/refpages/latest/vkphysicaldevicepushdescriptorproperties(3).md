# VkPhysicalDevicePushDescriptorProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePushDescriptorProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePushDescriptorProperties - Structure describing push descriptor limits that can be supported by an implementation

The `VkPhysicalDevicePushDescriptorProperties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePushDescriptorProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPushDescriptors;
} VkPhysicalDevicePushDescriptorProperties;

// Provided by VK_KHR_push_descriptor
// Equivalent to VkPhysicalDevicePushDescriptorProperties
typedef VkPhysicalDevicePushDescriptorProperties VkPhysicalDevicePushDescriptorPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxPushDescriptors` is
the maximum number of descriptors that **can** be used in a descriptor set
layout created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html) set.

If the `VkPhysicalDevicePushDescriptorProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePushDescriptorProperties-sType-sType) VUID-VkPhysicalDevicePushDescriptorProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDevicePushDescriptorProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
