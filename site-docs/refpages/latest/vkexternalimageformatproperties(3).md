# VkExternalImageFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalImageFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalImageFormatProperties - Structure specifying supported external handle properties

The `VkExternalImageFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalImageFormatProperties {
    VkStructureType               sType;
    void*                         pNext;
    VkExternalMemoryProperties    externalMemoryProperties;
} VkExternalImageFormatProperties;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalImageFormatProperties
typedef VkExternalImageFormatProperties VkExternalImageFormatPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalMemoryProperties` is a [VkExternalMemoryProperties](VkExternalMemoryProperties.html)
structure specifying various capabilities of the external handle type
when used with the specified image creation parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalImageFormatProperties-sType-sType) VUID-VkExternalImageFormatProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryProperties](VkExternalMemoryProperties.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalImageFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
