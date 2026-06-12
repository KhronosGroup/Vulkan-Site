# VkExternalFormatANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalFormatANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalFormatANDROID - Structure containing an Android hardware buffer external format

`VkExternalFormatANDROID` is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkExternalFormatANDROID {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           externalFormat;
} VkExternalFormatANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalFormat` is an implementation-defined identifier for the
external format

When included in the `pNext` chain of another structure, it indicates
[additional format information](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats) beyond what is provided by [VkFormat](VkFormat.html) values for an
Android hardware buffer.
If `externalFormat` is zero, it indicates that no external format is
used, and implementations should rely only on other format information.
If this structure is not present, it is equivalent to setting
`externalFormat` to zero.

Valid Usage

* 
[](#VUID-VkExternalFormatANDROID-externalFormat-01894) VUID-VkExternalFormatANDROID-externalFormat-01894

`externalFormat` **must** be `0` or a value returned in the
`externalFormat` member of
[VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html) by an earlier call
to [vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFormatANDROID-sType-sType) VUID-VkExternalFormatANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_ANDROID](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentDescription2](VkAttachmentDescription2.html)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalFormatANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
