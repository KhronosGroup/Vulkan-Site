# VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR - Structure describing indirect copy features supported by an implementation

The `VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           indirectMemoryCopy;
    VkBool32           indirectMemoryToImageCopy;
} VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `indirectMemoryCopy` indicates
whether [indirect memory to memory copies](../../../../spec/latest/chapters/copies.html#indirect-copies) are
supported.

* 
 `indirectMemoryToImageCopy`
indicates whether [indirect memory to image copies](../../../../spec/latest/chapters/copies.html#indirect-copies)
are supported.

If the `VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
