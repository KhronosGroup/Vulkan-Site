# VkNativeBufferPropertiesOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkNativeBufferPropertiesOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkNativeBufferPropertiesOHOS - Properties of external memory Open Harmony OS native buffer

The `VkNativeBufferPropertiesOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkNativeBufferPropertiesOHOS {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeBits;
} VkNativeBufferPropertiesOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the external memory.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Open Harmony OS native buffer **can** be
imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkNativeBufferPropertiesOHOS-sType-sType) VUID-VkNativeBufferPropertiesOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_NATIVE_BUFFER_PROPERTIES_OHOS](VkStructureType.html)

* 
[](#VUID-VkNativeBufferPropertiesOHOS-pNext-pNext) VUID-VkNativeBufferPropertiesOHOS-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html)

* 
[](#VUID-VkNativeBufferPropertiesOHOS-sType-unique) VUID-VkNativeBufferPropertiesOHOS-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetNativeBufferPropertiesOHOS](vkGetNativeBufferPropertiesOHOS.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkNativeBufferPropertiesOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
