# VK_AMD_texture_gather_bias_lod(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_texture_gather_bias_lod.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_texture_gather_bias_lod](#VK_AMD_texture_gather_bias_lod)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_texture_gather_bias_lod - device extension

**Name String**

`VK_AMD_texture_gather_bias_lod`

**Extension Type**

Device extension

**Registered Extension Number**

42

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_AMD_texture_gather_bias_lod](https://github.khronos.org/SPIRV-Registry/extensions/AMD/SPV_AMD_texture_gather_bias_lod.html)

**Contact**

* 
Rex Xu [amdrexu](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_texture_gather_bias_lod] @amdrexu%0A*Here describe the issue or question you have about the VK_AMD_texture_gather_bias_lod extension*)

**Last Modified Date**

2017-03-21

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_AMD_texture_gather_bias_lod`](https://registry.khronos.org/OpenGL/extensions/AMD/AMD_texture_gather_bias_lod.txt)

**Contributors**

* 
Dominik Witczak, AMD

* 
Daniel Rakos, AMD

* 
Graham Sellers, AMD

* 
Matthaeus G. Chajdas, AMD

* 
Qun Lin, AMD

* 
Rex Xu, AMD

* 
Timothy Lottes, AMD

This extension adds two related features.

Firstly, support for the following SPIR-V extension in Vulkan is added:

* 
`SPV_AMD_texture_gather_bias_lod`

Secondly, the extension allows the application to query which formats can be
used together with the new function prototypes introduced by the SPIR-V
extension.

* 
Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

[VkTextureLODGatherFormatPropertiesAMD](VkTextureLODGatherFormatPropertiesAMD.html)

* 
`VK_AMD_TEXTURE_GATHER_BIAS_LOD_EXTENSION_NAME`

* 
`VK_AMD_TEXTURE_GATHER_BIAS_LOD_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_TEXTURE_LOD_GATHER_FORMAT_PROPERTIES_AMD](VkStructureType.html)

* 
[    `ImageGatherBiasLodAMD`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ImageGatherBiasLodAMD)

struct VkTextureLODGatherFormatPropertiesAMD
{
    VkStructureType sType;
    const void*     pNext;
    VkBool32        supportsTextureGatherLODBiasAMD;
};

// ----------------------------------------------------------------------------------------
// How to detect if an image format can be used with the new function prototypes.
VkPhysicalDeviceImageFormatInfo2   formatInfo;
VkImageFormatProperties2           formatProps;
VkTextureLODGatherFormatPropertiesAMD textureLODGatherSupport;

textureLODGatherSupport.sType = VK_STRUCTURE_TYPE_TEXTURE_LOD_GATHER_FORMAT_PROPERTIES_AMD;
textureLODGatherSupport.pNext = nullptr;

formatInfo.sType  = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2;
formatInfo.pNext  = nullptr;
formatInfo.format = ...;
formatInfo.type   = ...;
formatInfo.tiling = ...;
formatInfo.usage  = ...;
formatInfo.flags  = ...;

formatProps.sType = VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2;
formatProps.pNext = &textureLODGatherSupport;

vkGetPhysicalDeviceImageFormatProperties2(physical_device, &formatInfo, &formatProps);

if (textureLODGatherSupport.supportsTextureGatherLODBiasAMD == VK_TRUE)
{
    // physical device supports SPV_AMD_texture_gather_bias_lod for the specified
    // format configuration.
}
else
{
    // physical device does not support SPV_AMD_texture_gather_bias_lod for the
    // specified format configuration.
}

* 
Revision 1, 2017-03-21 (Dominik Witczak)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_texture_gather_bias_lod).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
