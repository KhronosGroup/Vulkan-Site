# VkExportMetalTextureInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalTextureInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalTextureInfoEXT - Structure that identifies a VkImage, VkImageView, or VkBufferView object and corresponding Metal MTLTexture object

To export a Metal `MTLTexture` object underlying a [VkImage](VkImage.html),
[VkImageView](VkImageView.html), or [VkBufferView](VkBufferView.html) object, include a
`VkExportMetalTextureInfoEXT` structure in the `pNext` chain of the
`pMetalObjectsInfo` parameter of a [vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html) call.

The `VkExportMetalTextureInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalTextureInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkImage                  image;
    VkImageView              imageView;
    VkBufferView             bufferView;
    VkImageAspectFlagBits    plane;
    MTLTexture_id            mtlTexture;
} VkExportMetalTextureInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a [VkImage](VkImage.html).

* 
`imageView` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a [VkImageView](VkImageView.html).

* 
`bufferView` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a [VkBufferView](VkBufferView.html).

* 
`plane` specifies the plane of a multi-planar [VkImage](VkImage.html) or
[VkImageView](VkImageView.html).

* 
`mtlTexture` is the Metal `id` object underlying the
[VkImage](VkImage.html), [VkImageView](VkImageView.html), or [VkBufferView](VkBufferView.html) object in
`image`, `imageView`, or `bufferView`, respectively, at the
plane indicated in `aspectMask`.
The implementation will return the `MTLTexture` in this member, or it
will return `NULL` if no `MTLTexture` could be found underlying the
[VkImage](VkImage.html), [VkImageView](VkImageView.html), or [VkBufferView](VkBufferView.html) object, at the
plane indicated in `aspectMask`.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalTextureInfoEXT-sType-sType) VUID-VkExportMetalTextureInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_TEXTURE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalTextureInfoEXT-image-parameter) VUID-VkExportMetalTextureInfoEXT-image-parameter

 If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkExportMetalTextureInfoEXT-imageView-parameter) VUID-VkExportMetalTextureInfoEXT-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-VkExportMetalTextureInfoEXT-bufferView-parameter) VUID-VkExportMetalTextureInfoEXT-bufferView-parameter

 If `bufferView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `bufferView` **must** be a valid [VkBufferView](VkBufferView.html) handle

* 
[](#VUID-VkExportMetalTextureInfoEXT-plane-parameter) VUID-VkExportMetalTextureInfoEXT-plane-parameter

 `plane` **must** be a valid [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value

* 
[](#VUID-VkExportMetalTextureInfoEXT-commonparent) VUID-VkExportMetalTextureInfoEXT-commonparent

 Each of `bufferView`, `image`, and `imageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkBufferView](VkBufferView.html), [VkImage](VkImage.html), [VkImageAspectFlagBits](VkImageAspectFlagBits.html), [VkImageView](VkImageView.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalTextureInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
