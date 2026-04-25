# VkExportMetalDeviceInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalDeviceInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalDeviceInfoEXT - Structure that identifies a VkDevice object and corresponding Metal MTLDevice object

To export the Metal `MTLDevice` object underlying the
[VkPhysicalDevice](VkPhysicalDevice.html) associated with a [VkDevice](VkDevice.html) object, include a
`VkExportMetalDeviceInfoEXT` structure in the `pNext` chain of the
`pMetalObjectsInfo` parameter of a [vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html) call.

The `VkExportMetalDeviceInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalDeviceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    MTLDevice_id       mtlDevice;
} VkExportMetalDeviceInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mtlDevice` is the Metal `id` object underlying the
[VkPhysicalDevice](VkPhysicalDevice.html) associated with the [VkDevice](VkDevice.html) object
identified in the call.
The implementation will return the `MTLDevice` in this member, or it
will return `NULL` if no `MTLDevice` could be found underlying the
[VkPhysicalDevice](VkPhysicalDevice.html) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalDeviceInfoEXT-sType-sType) VUID-VkExportMetalDeviceInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_DEVICE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalDeviceInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
