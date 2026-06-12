# VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT - Structure describing whether the implementation supports cleared allocation functionality

The `VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_zero_initialize_device_memory
typedef struct VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           zeroInitializeDeviceMemory;
} VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `zeroInitializeDeviceMemory`
indicates that the implementation supports zeroing memory allocations
using a user-specified flag.

If the `VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_DEVICE_MEMORY_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_zero_initialize_device_memory](VK_EXT_zero_initialize_device_memory.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
