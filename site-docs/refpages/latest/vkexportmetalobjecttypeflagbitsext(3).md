# VkExportMetalObjectTypeFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalObjectTypeFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalObjectTypeFlagBitsEXT - Bitmask specifying Metal object types that can be exported from a Vulkan object

Bits which indicate the types of Metal objects that may be exported from a
corresponding Vulkan object are:

// Provided by VK_EXT_metal_objects
typedef enum VkExportMetalObjectTypeFlagBitsEXT {
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT = 0x00000001,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT = 0x00000002,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT = 0x00000004,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT = 0x00000008,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT = 0x00000010,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT = 0x00000020,
} VkExportMetalObjectTypeFlagBitsEXT;

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT](#) specifies that a
Metal `MTLDevice` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT](#) specifies
that a Metal `MTLCommandQueue` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT](#) specifies that a
Metal `MTLBuffer` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](#) specifies that a
Metal `MTLTexture` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT](#) specifies that
a Metal `IOSurface` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](#) specifies
that a Metal `MTLSharedEvent` may be exported.

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), [VkExportMetalObjectTypeFlagsEXT](VkExportMetalObjectTypeFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalObjectTypeFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
