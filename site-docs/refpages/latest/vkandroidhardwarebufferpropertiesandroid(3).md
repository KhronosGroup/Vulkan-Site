# VkAndroidHardwareBufferPropertiesANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAndroidHardwareBufferPropertiesANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAndroidHardwareBufferPropertiesANDROID - Properties of External Memory Android Hardware Buffers

The `VkAndroidHardwareBufferPropertiesANDROID` structure returned is
defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkAndroidHardwareBufferPropertiesANDROID {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeBits;
} VkAndroidHardwareBufferPropertiesANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the external memory

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Android hardware buffer **can** be imported
as.

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-sType) VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_PROPERTIES_ANDROID](VkStructureType.html)

* 
[](#VUID-VkAndroidHardwareBufferPropertiesANDROID-pNext-pNext) VUID-VkAndroidHardwareBufferPropertiesANDROID-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html), [VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html), or [VkAndroidHardwareBufferFormatResolvePropertiesANDROID](VkAndroidHardwareBufferFormatResolvePropertiesANDROID.html)

* 
[](#VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-unique) VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkAndroidHardwareBufferPropertiesANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
