# VkExternalFormatOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalFormatOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalFormatOHOS - Structure containing an Open Harmony OS hardware buffer external format

The `VkExternalFormatOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkExternalFormatOHOS {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           externalFormat;
} VkExternalFormatOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalFormat` is an implementation-defined identifier for the
external format.

To obtain additional format that are not provided by [VkFormat](VkFormat.html) for an
Open Harmony OS hardware buffer, this structure should be included in the
pNext chain of another structure.
The return value of `externalFormat` indicates whether an additional
format exists.
If zero is returned, then no external format is used and other format
information should be used for implementations, and this is also true if
this structure is not present.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFormatOHOS-sType-sType) VUID-VkExternalFormatOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_OHOS](VkStructureType.html)

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

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalFormatOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
