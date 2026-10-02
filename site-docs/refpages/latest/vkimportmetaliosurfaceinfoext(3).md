# VkImportMetalIOSurfaceInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMetalIOSurfaceInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMetalIOSurfaceInfoEXT - Structure that identifies a VkImage object and corresponding Metal IOSurfaceRef object to use.

To import, or create, a Metal `IOSurfaceRef` object to underlie a
[VkImage](VkImage.html) object, include a `VkImportMetalIOSurfaceInfoEXT`
structure in the `pNext` chain of the [VkImageCreateInfo](VkImageCreateInfo.html) structure
in a [vkCreateImage](vkCreateImage.html) command.

The `VkImportMetalIOSurfaceInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalIOSurfaceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    IOSurfaceRef       ioSurface;
} VkImportMetalIOSurfaceInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`ioSurface` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or the Metal
`IOSurfaceRef` object that is to underlie the [VkImage](VkImage.html).

If `ioSurface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it will be used to underlie
the [VkImage](VkImage.html).
If `ioSurface` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the implementation will create a
new `IOSurface` to underlie the [VkImage](VkImage.html).

If provided, the application **must** ensure that the configuration of the
`IOSurfaceRef` object is compatible with the configuration of the
[VkImage](VkImage.html).
Failure to do so results in **undefined** behavior.

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalIOSurfaceInfoEXT-sType-sType) VUID-VkImportMetalIOSurfaceInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_IO_SURFACE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMetalIOSurfaceInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
