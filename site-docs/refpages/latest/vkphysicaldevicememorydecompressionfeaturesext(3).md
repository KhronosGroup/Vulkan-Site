# VkPhysicalDeviceMemoryDecompressionFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMemoryDecompressionFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMemoryDecompressionFeaturesEXT - Structure describing if memory decompression is supported by an implementation

The `VkPhysicalDeviceMemoryDecompressionFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_memory_decompression
typedef struct VkPhysicalDeviceMemoryDecompressionFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           memoryDecompression;
} VkPhysicalDeviceMemoryDecompressionFeaturesEXT;

// Provided by VK_NV_memory_decompression
// Equivalent to VkPhysicalDeviceMemoryDecompressionFeaturesEXT
typedef VkPhysicalDeviceMemoryDecompressionFeaturesEXT VkPhysicalDeviceMemoryDecompressionFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `memoryDecompression` indicates
whether memory decompression is supported.

If the `VkPhysicalDeviceMemoryDecompressionFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMemoryDecompressionFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryDecompressionFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryDecompressionFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VK_NV_memory_decompression](VK_NV_memory_decompression.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMemoryDecompressionFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
