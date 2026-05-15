# VK_EXT_metal_objects(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_metal_objects.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_metal_objects](#VK_EXT_metal_objects)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_metal_objects - device extension

**Name String**

`VK_EXT_metal_objects`

**Extension Type**

Device extension

**Registered Extension Number**

312

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Bill Hollings [billhollings](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_metal_objects] @billhollings%0A*Here describe the issue or question you have about the VK_EXT_metal_objects extension*)

**Extension Proposal**

[VK_EXT_metal_objects](../../../../features/latest/features/proposals/VK_EXT_metal_objects.html)

**Last Modified Date**

2024-04-04

**IP Status**

No known IP claims.

**Contributors**

* 
Bill Hollings, The Brenwill Workshop Ltd.

* 
Dzmitry Malyshau, Mozilla Corp.

In a Vulkan implementation that is layered on top of Metal on Apple device
platforms, this extension provides the ability to import and export the
underlying Metal objects associated with specific Vulkan objects.

As detailed in the
[extension
proposal document](https://github.com/KhronosGroup/Vulkan-Docs/tree/main/proposals/VK_EXT_metal_objects.adoc), this extension adds one new Vulkan command,
[vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html), to export underlying Metal objects from
Vulkan objects, and supports importing the appropriate existing Metal
objects when creating Vulkan objects of types [VkDeviceMemory](VkDeviceMemory.html),
[VkImage](VkImage.html), [VkSemaphore](VkSemaphore.html), and [VkEvent](VkEvent.html),

The intent is that this extension will be advertised and supported only on
implementations that are layered on top of Metal on Apple device platforms.

* 
`IOSurfaceRef`

* 
`MTLBuffer_id`

* 
`MTLCommandQueue_id`

* 
`MTLDevice_id`

* 
`MTLSharedEvent_id`

* 
`MTLTexture_id`

* 
[vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

* 
Extending [VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html):

[VkExportMetalBufferInfoEXT](VkExportMetalBufferInfoEXT.html)

* 
[VkExportMetalCommandQueueInfoEXT](VkExportMetalCommandQueueInfoEXT.html)

* 
[VkExportMetalDeviceInfoEXT](VkExportMetalDeviceInfoEXT.html)

* 
[VkExportMetalIOSurfaceInfoEXT](VkExportMetalIOSurfaceInfoEXT.html)

* 
[VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html)

* 
[VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkImportMetalIOSurfaceInfoEXT](VkImportMetalIOSurfaceInfoEXT.html)

* 
[VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)

Extending [VkInstanceCreateInfo](VkInstanceCreateInfo.html), [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html), [VkEventCreateInfo](VkEventCreateInfo.html):

* 
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkImportMetalBufferInfoEXT](VkImportMetalBufferInfoEXT.html)

Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html), [VkEventCreateInfo](VkEventCreateInfo.html):

* 
[VkImportMetalSharedEventInfoEXT](VkImportMetalSharedEventInfoEXT.html)

* 
[VkExportMetalObjectTypeFlagBitsEXT](VkExportMetalObjectTypeFlagBitsEXT.html)

* 
[VkExportMetalObjectTypeFlagsEXT](VkExportMetalObjectTypeFlagsEXT.html)

* 
`VK_EXT_METAL_OBJECTS_EXTENSION_NAME`

* 
`VK_EXT_METAL_OBJECTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_EXPORT_METAL_BUFFER_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_COMMAND_QUEUE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_DEVICE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_IO_SURFACE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECTS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECT_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_SHARED_EVENT_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_METAL_TEXTURE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_METAL_BUFFER_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_METAL_IO_SURFACE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_METAL_SHARED_EVENT_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_METAL_TEXTURE_INFO_EXT](VkStructureType.html)

None.

* 
Revision 1, 2022-05-28 (Bill Hollings)

Initial draft.

* 
Incorporated feedback from review by the Vulkan Working Group.
Renamed many structures, moved import/export of MTLBuffer to
VkDeviceMemory, added export of MTLSharedEvent, added import of
MTLSharedEvent for VkSemaphore and VkEvent, and changed used bit mask
fields to individual bit fields to simplify Valid Usage rules.

Revision 2, 2024-04-04 (Bill Hollings)

* 
Add an `__unsafe_unretained` ownership qualifier to all Metal object
declarations, to support Automatic Reference Counting (ARC) on Apple
devices.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_metal_objects).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
