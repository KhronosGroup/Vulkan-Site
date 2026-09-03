# VkImportAndroidHardwareBufferInfoANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportAndroidHardwareBufferInfoANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportAndroidHardwareBufferInfoANDROID - Import memory from an Android hardware buffer

To import memory created outside of the current Vulkan instance from an
Android hardware buffer, add a
`VkImportAndroidHardwareBufferInfoANDROID` structure to the `pNext`
chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkImportAndroidHardwareBufferInfoANDROID` structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkImportAndroidHardwareBufferInfoANDROID {
    VkStructureType            sType;
    const void*                pNext;
    struct AHardwareBuffer*    buffer;
} VkImportAndroidHardwareBufferInfoANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the Android hardware buffer to import.

If the [vkAllocateMemory](vkAllocateMemory.html) command succeeds, the implementation **must**
acquire a reference to the imported hardware buffer, which it **must** release
when the device memory object is freed.
If the command fails, the implementation **must** not retain a reference.

Valid Usage

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-09863) VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-09863

    If `buffer` is not `NULL`, Android hardware buffers **must** be
    supported for import, as reported by
[VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html),
    [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html), or
    [VkExternalBufferProperties](VkExternalBufferProperties.html)

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-01881) VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-01881

If `buffer` is not `NULL`, it **must** be a valid Android hardware
buffer object with `AHardwareBuffer_Desc`::`usage` compatible with
Vulkan as described in [Android    Hardware Buffers](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer)

Valid Usage (Implicit)

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-sType-sType) VUID-VkImportAndroidHardwareBufferInfoANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_ANDROID_HARDWARE_BUFFER_INFO_ANDROID](VkStructureType.html)

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-parameter) VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-parameter

 `buffer` **must** be a valid pointer to an `AHardwareBuffer` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportAndroidHardwareBufferInfoANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
