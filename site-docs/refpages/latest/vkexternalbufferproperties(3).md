# VkExternalBufferProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalBufferProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalBufferProperties - Structure specifying supported external handle capabilities

The `VkExternalBufferProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalBufferProperties {
    VkStructureType               sType;
    void*                         pNext;
    VkExternalMemoryProperties    externalMemoryProperties;
} VkExternalBufferProperties;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalBufferProperties
typedef VkExternalBufferProperties VkExternalBufferPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalMemoryProperties` is a [VkExternalMemoryProperties](VkExternalMemoryProperties.html)
structure specifying various capabilities of the external handle type
when used with the specified buffer creation parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalBufferProperties-sType-sType) VUID-VkExternalBufferProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES](VkStructureType.html)

* 
[](#VUID-VkExternalBufferProperties-pNext-pNext) VUID-VkExternalBufferProperties-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryProperties](VkExternalMemoryProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html), [vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalBufferProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
