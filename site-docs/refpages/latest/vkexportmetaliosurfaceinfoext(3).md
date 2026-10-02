# VkExportMetalIOSurfaceInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalIOSurfaceInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalIOSurfaceInfoEXT - Structure that identifies a VkImage object and corresponding Metal IOSurfaceRef object

To export the Metal `IOSurfaceRef` object underlying a [VkImage](VkImage.html)
object, include a `VkExportMetalIOSurfaceInfoEXT` structure in the
`pNext` chain of the `pMetalObjectsInfo` parameter of a
[vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html) call.

The `VkExportMetalIOSurfaceInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalIOSurfaceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    IOSurfaceRef       ioSurface;
} VkExportMetalIOSurfaceInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is a [VkImage](VkImage.html).

* 
`ioSurface` is the Metal `IOSurfaceRef` object underlying the
[VkImage](VkImage.html) object in `image`.
The implementation will return the `IOSurfaceRef` in this member,
or it will return `NULL` if no `IOSurfaceRef` could be found
underlying the [VkImage](VkImage.html) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalIOSurfaceInfoEXT-sType-sType) VUID-VkExportMetalIOSurfaceInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_IO_SURFACE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalIOSurfaceInfoEXT-image-parameter) VUID-VkExportMetalIOSurfaceInfoEXT-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalIOSurfaceInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
