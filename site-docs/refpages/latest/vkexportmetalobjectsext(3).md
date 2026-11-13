# vkExportMetalObjectsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkExportMetalObjectsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkExportMetalObjectsEXT - Export Metal objects from the corresponding Vulkan objects

To export Metal objects that underlie Vulkan objects, call:

// Provided by VK_EXT_metal_objects
void vkExportMetalObjectsEXT(
    VkDevice                                    device,
    VkExportMetalObjectsInfoEXT*                pMetalObjectsInfo);

* 
`device` is the device that created the Vulkan objects.

* 
`pMetalObjectsInfo` is a pointer to a
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html) structure whose `pNext` chain
contains structures, each identifying a Vulkan object and providing a
pointer through which the Metal object will be returned.

Valid Usage (Implicit)

* 
[](#VUID-vkExportMetalObjectsEXT-device-parameter) VUID-vkExportMetalObjectsEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkExportMetalObjectsEXT-pMetalObjectsInfo-parameter) VUID-vkExportMetalObjectsEXT-pMetalObjectsInfo-parameter

 `pMetalObjectsInfo` **must** be a valid pointer to a [VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html) structure

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkDevice](VkDevice.html), [VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkExportMetalObjectsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
