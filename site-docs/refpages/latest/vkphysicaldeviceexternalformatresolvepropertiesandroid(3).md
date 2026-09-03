# VkPhysicalDeviceExternalFormatResolvePropertiesANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalFormatResolvePropertiesANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalFormatResolvePropertiesANDROID - Structure describing external format resolve supported by an implementation

The `VkPhysicalDeviceExternalFormatResolvePropertiesANDROID` structure
is defined as:

// Provided by VK_ANDROID_external_format_resolve
typedef struct VkPhysicalDeviceExternalFormatResolvePropertiesANDROID {
    VkStructureType     sType;
    void*               pNext;
    VkBool32            nullColorAttachmentWithExternalFormatResolve;
    VkChromaLocation    externalFormatResolveChromaOffsetX;
    VkChromaLocation    externalFormatResolveChromaOffsetY;
} VkPhysicalDeviceExternalFormatResolvePropertiesANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`nullColorAttachmentWithExternalFormatResolve` indicates that there
**must** be no color attachment image when performing external format
resolves if it is [VK_TRUE](VK_TRUE.html).

* 

`externalFormatResolveChromaOffsetX` indicates the
[VkChromaLocation](VkChromaLocation.html) that an implementation uses in the X axis for
accesses to an external format image as a resolve attachment.
This **must** be consistent between external format resolves and load
operations from external format resolve attachments to color attachments
when `nullColorAttachmentWithExternalFormatResolve` is
[VK_TRUE](VK_TRUE.html).

* 

`externalFormatResolveChromaOffsetY` indicates the
[VkChromaLocation](VkChromaLocation.html) that an implementation uses in the Y axis for
accesses to an external format image as a resolve attachment.
This **must** be consistent between external format resolves and load
operations from external format resolve attachments to color attachments
when `nullColorAttachmentWithExternalFormatResolve` is
[VK_TRUE](VK_TRUE.html).

If the `VkPhysicalDeviceExternalFormatResolvePropertiesANDROID` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalFormatResolvePropertiesANDROID-sType-sType) VUID-VkPhysicalDeviceExternalFormatResolvePropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_PROPERTIES_ANDROID](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ANDROID_external_format_resolve](VK_ANDROID_external_format_resolve.html), `VkBool32`, [VkChromaLocation](VkChromaLocation.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceExternalFormatResolvePropertiesANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
