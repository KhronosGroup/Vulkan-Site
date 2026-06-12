# VkImportMetalTextureInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMetalTextureInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMetalTextureInfoEXT - Structure that identifies Metal MTLTexture objects to use when creating a VkImage.

To import one or more existing Metal `MTLTexture` objects to underlie a
[VkImage](VkImage.html) object, include one or more `VkImportMetalTextureInfoEXT`
structures in the `pNext` chain of the [VkImageCreateInfo](VkImageCreateInfo.html) structure
in a [vkCreateImage](vkCreateImage.html) command.

The `VkImportMetalTextureInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalTextureInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkImageAspectFlagBits    plane;
    MTLTexture_id            mtlTexture;
} VkImportMetalTextureInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`plane` specifies the plane of the [VkImage](VkImage.html) that the
`id` object should be attached to.

* 
`mtlTexture` is a the Metal `id` object that is to
underlie the [VkImage](VkImage.html) plane.

The `pNext` chain **must** include one `VkImportMetalTextureInfoEXT`
structure for each plane in the [VkImage](VkImage.html).
The application **must** ensure that the configuration of the Metal
`id` objects are compatible with the configuration of the
[VkImage](VkImage.html).
Failure to do so results in **undefined** behavior.

|  | Due to `id` already being backed by memory, images created with
| --- | --- |
`VkImportMetalTextureInfoEXT` in the `pNext` of the
[VkImageCreateInfo](VkImageCreateInfo.html) will be treated as bound to a VkDeviceMemory. |

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalTextureInfoEXT-sType-sType) VUID-VkImportMetalTextureInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_TEXTURE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImportMetalTextureInfoEXT-plane-parameter) VUID-VkImportMetalTextureInfoEXT-plane-parameter

 `plane` **must** be a valid [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkImageAspectFlagBits](VkImageAspectFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMetalTextureInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
