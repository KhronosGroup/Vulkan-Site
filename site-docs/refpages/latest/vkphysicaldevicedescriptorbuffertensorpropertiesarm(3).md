# VkPhysicalDeviceDescriptorBufferTensorPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorBufferTensorPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorBufferTensorPropertiesARM - Structure describing descriptor buffer tensor properties supported by an implementation

The `VkPhysicalDeviceDescriptorBufferTensorPropertiesARM` structure is
defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkPhysicalDeviceDescriptorBufferTensorPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    size_t             tensorCaptureReplayDescriptorDataSize;
    size_t             tensorViewCaptureReplayDescriptorDataSize;
    size_t             tensorDescriptorSize;
} VkPhysicalDeviceDescriptorBufferTensorPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorCaptureReplayDescriptorDataSize` indicates the maximum size
in bytes of the opaque data used for capture and replay with tensors.

* 
`tensorViewCaptureReplayDescriptorDataSize` indicates the maximum
size in bytes of the opaque data used for capture and replay with tensor
views.

* 
`tensorDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor.

If the `VkPhysicalDeviceDescriptorBufferTensorPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferTensorPropertiesARM-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDescriptorBufferTensorPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
