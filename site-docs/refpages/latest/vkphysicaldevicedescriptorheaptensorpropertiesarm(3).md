# VkPhysicalDeviceDescriptorHeapTensorPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorHeapTensorPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorHeapTensorPropertiesARM - Structure describing descriptor heap tensor properties supported by an implementation

The `VkPhysicalDeviceDescriptorHeapTensorPropertiesARM` structure is
defined as:

// Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
typedef struct VkPhysicalDeviceDescriptorHeapTensorPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       tensorDescriptorSize;
    VkDeviceSize       tensorDescriptorAlignment;
    size_t             tensorCaptureReplayOpaqueDataSize;
} VkPhysicalDeviceDescriptorHeapTensorPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `tensorDescriptorSize` specifies the
maximum size of tensor descriptors written by
[vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html).

* 
 `tensorDescriptorAlignment`
specifies the required alignment of tensor descriptors within a resource
heap.
It must be a power-of-two value, and less than or equal to
`tensorDescriptorSize`.

* 

`tensorCaptureReplayOpaqueDataSize` specifies the size of the opaque
capture/replay data for an tensor.

If the `VkPhysicalDeviceDescriptorHeapTensorPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorHeapTensorPropertiesARM-sType-sType) VUID-VkPhysicalDeviceDescriptorHeapTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_TENSOR_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDescriptorHeapTensorPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
