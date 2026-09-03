# VkPhysicalDeviceMemoryDecompressionPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMemoryDecompressionPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMemoryDecompressionPropertiesEXT - Structure describing supported memory decompression methods by an implementation

The `VkPhysicalDeviceMemoryDecompressionPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_memory_decompression
typedef struct VkPhysicalDeviceMemoryDecompressionPropertiesEXT {
    VkStructureType                        sType;
    void*                                  pNext;
    VkMemoryDecompressionMethodFlagsEXT    decompressionMethods;
    uint64_t                               maxDecompressionIndirectCount;
} VkPhysicalDeviceMemoryDecompressionPropertiesEXT;

// Provided by VK_NV_memory_decompression
// Equivalent to VkPhysicalDeviceMemoryDecompressionPropertiesEXT
typedef VkPhysicalDeviceMemoryDecompressionPropertiesEXT VkPhysicalDeviceMemoryDecompressionPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`decompressionMethods` is a bitmask of
[VkMemoryDecompressionMethodFlagBitsEXT](VkMemoryDecompressionMethodFlagBitsEXT.html) specifying memory
decompression methods supported by the implementation.

* 
`maxDecompressionIndirectCount` specifies the maximum supported
count value identified by either
[vkCmdDecompressMemoryIndirectCountEXT](vkCmdDecompressMemoryIndirectCountEXT.html)::`maxDecompressionCount`
or the value specified in
[vkCmdDecompressMemoryIndirectCountEXT](vkCmdDecompressMemoryIndirectCountEXT.html)::`indirectCommandsCountAddress`

If [`memoryDecompression`](../../../../spec/latest/chapters/features.html#features-memoryDecompression) feature is
supported, `decompressionMethods` **must** have at least one bit set.

If the `VkPhysicalDeviceMemoryDecompressionPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryDecompressionPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryDecompressionPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html), [VK_NV_memory_decompression](VK_NV_memory_decompression.html), [VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMemoryDecompressionPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
