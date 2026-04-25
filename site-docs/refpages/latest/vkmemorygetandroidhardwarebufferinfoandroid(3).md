# VkMemoryGetAndroidHardwareBufferInfoANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetAndroidHardwareBufferInfoANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetAndroidHardwareBufferInfoANDROID - Structure describing an Android hardware buffer memory export operation

The `VkMemoryGetAndroidHardwareBufferInfoANDROID` structure is defined
as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkMemoryGetAndroidHardwareBufferInfoANDROID {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkMemoryGetAndroidHardwareBufferInfoANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the Android hardware buffer
will be exported.

Valid Usage

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-handleTypes-01882) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-handleTypes-01882

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
**must** have been included in
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-01883) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-01883

If the `pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) used to
allocate `memory` included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)
with non-`NULL` `image` member, then that `image` **must** already
be bound to `memory`

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-sType-sType) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_ANDROID_HARDWARE_BUFFER_INFO_ANDROID](VkStructureType.html)

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-pNext) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-memory-parameter) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkDeviceMemory](VkDeviceMemory.html), [VkStructureType](VkStructureType.html), [vkGetMemoryAndroidHardwareBufferANDROID](vkGetMemoryAndroidHardwareBufferANDROID.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryGetAndroidHardwareBufferInfoANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
