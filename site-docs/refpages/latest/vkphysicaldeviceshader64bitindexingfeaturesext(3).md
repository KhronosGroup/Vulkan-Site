# VkPhysicalDeviceShader64BitIndexingFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShader64BitIndexingFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShader64BitIndexingFeaturesEXT - Structure describing 64-bit indexing features that can be supported by an implementation

The `VkPhysicalDeviceShader64BitIndexingFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_64bit_indexing
typedef struct VkPhysicalDeviceShader64BitIndexingFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shader64BitIndexing;
} VkPhysicalDeviceShader64BitIndexingFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shader64BitIndexing` indicates
    that the implementation supports [using 64-bit    address calculations](../../../../spec/latest/appendices/spirvenv.html#spirvenv-64bindexing) for indexing
cooperative matrices,
cooperative vectors,
    storage buffers, and physical storage buffers.

If the `VkPhysicalDeviceShader64BitIndexingFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShader64BitIndexingFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShader64BitIndexingFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShader64BitIndexingFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_64_BIT_INDEXING_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_shader_64bit_indexing](VK_EXT_shader_64bit_indexing.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShader64BitIndexingFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
