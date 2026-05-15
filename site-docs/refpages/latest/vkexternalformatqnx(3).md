# VkExternalFormatQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalFormatQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalFormatQNX - Structure containing a QNX Screen buffer external format

To create an image with an
[QNX Screen external format](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-external-formats), add a `VkExternalFormatQNX` structure in the `pNext` chain
of [VkImageCreateInfo](VkImageCreateInfo.html).
`VkExternalFormatQNX` is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkExternalFormatQNX {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           externalFormat;
} VkExternalFormatQNX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalFormat` is an implementation-defined identifier for the
external format

If `externalFormat` is zero, the effect is as if the
`VkExternalFormatQNX` structure was not present.
Otherwise, the `image` will have the specified external format.

Valid Usage

* 
[](#VUID-VkExternalFormatQNX-externalFormat-08956) VUID-VkExternalFormatQNX-externalFormat-08956

`externalFormat` **must** be `0` or a value returned in the
`externalFormat` member of [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)
by an earlier call to [vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFormatQNX-sType-sType) VUID-VkExternalFormatQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_QNX](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)

[VK_QNX_external_memory_screen_buffer](VK_QNX_external_memory_screen_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalFormatQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
