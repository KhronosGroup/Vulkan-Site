# VK_EXT_astc_decode_mode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_astc_decode_mode.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_astc_decode_mode](#VK_EXT_astc_decode_mode)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Example](#_example)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_astc_decode_mode - device extension

**Name String**

`VK_EXT_astc_decode_mode`

**Extension Type**

Device extension

**Registered Extension Number**

68

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_astc_decode_mode] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_astc_decode_mode extension*)

**Last Modified Date**

2018-08-07

**Contributors**

* 
Jan-Harald Fredriksen, Arm

The existing specification requires that low dynamic range (LDR) ASTC
textures are decompressed to FP16 values per component.
In many cases, decompressing LDR textures to a lower precision intermediate
result gives acceptable image quality.
Source material for LDR textures is typically authored as 8-bit UNORM
values, so decoding to FP16 values adds little value.
On the other hand, reducing precision of the decoded result reduces the size
of the decompressed data, potentially improving texture cache performance
and saving power.

The goal of this extension is to enable this efficiency gain on existing
ASTC texture data.
This is achieved by giving the application the ability to select the
intermediate decoding precision.

Three decoding options are provided:

* 
Decode to [VK_FORMAT_R16G16B16A16_SFLOAT](VkFormat.html) precision: This is the
default, and matches the required behavior in the core API.

* 
Decode to [VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html) precision: This is provided as
an option in LDR mode.

* 
Decode to [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](VkFormat.html) precision: This is
provided as an option in both LDR and HDR mode.
In this mode, negative values cannot be represented and are clamped to
zero.
The alpha component is ignored, and the results are as if alpha was 1.0.
This decode mode is optional and support can be queried via the physical
device properties.

* 
Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

[VkImageViewASTCDecodeModeEXT](VkImageViewASTCDecodeModeEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceASTCDecodeFeaturesEXT](VkPhysicalDeviceASTCDecodeFeaturesEXT.html)

* 
`VK_EXT_ASTC_DECODE_MODE_EXTENSION_NAME`

* 
`VK_EXT_ASTC_DECODE_MODE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_VIEW_ASTC_DECODE_MODE_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ASTC_DECODE_FEATURES_EXT](VkStructureType.html)

1) Are implementations allowed to decode at a higher precision than what is
requested?

RESOLUTION: No.
If we allow this, then this extension could be exposed on all
implementations that support ASTC.
But developers would have no way of knowing what precision was actually
used, and thus whether the image quality is sufficient at reduced
precision.

2) Should the decode mode be image view state and/or sampler state?

RESOLUTION: Image view state only.
Some implementations treat the different decode modes as different
texture formats.

Create an image view that decodes to [VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html)
precision:

    VkImageViewASTCDecodeModeEXT decodeMode =
    {
        .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_ASTC_DECODE_MODE_EXT,
        .pNext = NULL,
        .decodeMode = VK_FORMAT_R8G8B8A8_UNORM
    };

    VkImageViewCreateInfo createInfo =
    {
        .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO,
        .pNext = &decodeMode,
        // flags, image, viewType set to application-desired values
        .format = VK_FORMAT_ASTC_8x8_UNORM_BLOCK,
        // components, subresourceRange set to application-desired values
    };

    VkImageView imageView;
    VkResult result = vkCreateImageView(
        device,
        &createInfo,
        NULL,
        &imageView);

* 
Revision 1, 2018-08-07 (Jan-Harald Fredriksen)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_astc_decode_mode).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
