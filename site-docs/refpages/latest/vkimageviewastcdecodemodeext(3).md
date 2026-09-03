# VkImageViewASTCDecodeModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewASTCDecodeModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewASTCDecodeModeEXT - Structure describing the ASTC decode mode for an image view

If the `pNext` chain includes a `VkImageViewASTCDecodeModeEXT`
structure, then that structure includes a parameter specifying the decode
mode for image views using ASTC compressed formats.

The `VkImageViewASTCDecodeModeEXT` structure is defined as:

// Provided by VK_EXT_astc_decode_mode
typedef struct VkImageViewASTCDecodeModeEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkFormat           decodeMode;
} VkImageViewASTCDecodeModeEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`decodeMode` is the intermediate format used to decode ASTC
compressed formats.

Valid Usage

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02230) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02230

`decodeMode` **must** be one of [VK_FORMAT_R16G16B16A16_SFLOAT](VkFormat.html),
[VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html), or
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](VkFormat.html)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02231) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02231

If the [    `decodeModeSharedExponent`](../../../../spec/latest/chapters/features.html#features-astc-decodeModeSharedExponent) feature is not enabled,
`decodeMode` **must** not be [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](VkFormat.html)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02232) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02232

If `decodeMode` is [VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html) the image view
**must** not include blocks using any of the ASTC HDR modes

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-format-04084) VUID-VkImageViewASTCDecodeModeEXT-format-04084

`format` of the image view **must** be one of the
[ASTC Compressed Image Formats](../../../../spec/latest/appendices/compressedtex.html#appendix-compressedtex-astc)

If `format` uses sRGB encoding then the `decodeMode` has no effect.

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-sType-sType) VUID-VkImageViewASTCDecodeModeEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_ASTC_DECODE_MODE_EXT](VkStructureType.html)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-parameter) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-parameter

 `decodeMode` **must** be a valid [VkFormat](VkFormat.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

[VK_EXT_astc_decode_mode](VK_EXT_astc_decode_mode.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewASTCDecodeModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
