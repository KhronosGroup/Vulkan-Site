# VkPhysicalDeviceDescriptorHeapFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorHeapFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorHeapFeaturesEXT - Structure describing support for descriptor heaps

The `VkPhysicalDeviceDescriptorHeapFeaturesEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkPhysicalDeviceDescriptorHeapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorHeap;
    VkBool32           descriptorHeapCaptureReplay;
} VkPhysicalDeviceDescriptorHeapFeaturesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `descriptorHeap` specifies whether
[descriptor heaps](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps) **can** be used.

* 

`descriptorHeapCaptureReplay` specifies whether
[heap descriptors](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-writing) **can** be captured and
replayed.

If the `VkPhysicalDeviceDescriptorHeapFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDescriptorHeapFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorHeapFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorHeapFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDescriptorHeapFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
