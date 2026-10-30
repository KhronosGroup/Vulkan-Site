# VkTextureLODGatherFormatPropertiesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTextureLODGatherFormatPropertiesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTextureLODGatherFormatPropertiesAMD - Structure informing whether or not texture gather bias/LOD functionality is supported for a given image format and a given physical device.

To determine if texture gather functions that take explicit LOD and/or bias
argument values **can** be used with a given image format, add a
[VkTextureLODGatherFormatPropertiesAMD](#) structure to the `pNext`
chain of the [VkImageFormatProperties2](VkImageFormatProperties2.html) structure in a call to
`vkGetPhysicalDeviceImageFormatProperties2`.

The `VkTextureLODGatherFormatPropertiesAMD` structure is defined as:

// Provided by VK_AMD_texture_gather_bias_lod
typedef struct VkTextureLODGatherFormatPropertiesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           supportsTextureGatherLODBiasAMD;
} VkTextureLODGatherFormatPropertiesAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportsTextureGatherLODBiasAMD` tells if the image format can be
used with texture gather bias/LOD functions, as introduced by the
`[VK_AMD_texture_gather_bias_lod](VK_AMD_texture_gather_bias_lod.html)` extension.
This field is set by the implementation.
An application-specified value is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkTextureLODGatherFormatPropertiesAMD-sType-sType) VUID-VkTextureLODGatherFormatPropertiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TEXTURE_LOD_GATHER_FORMAT_PROPERTIES_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_AMD_texture_gather_bias_lod](VK_AMD_texture_gather_bias_lod.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkTextureLODGatherFormatPropertiesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
