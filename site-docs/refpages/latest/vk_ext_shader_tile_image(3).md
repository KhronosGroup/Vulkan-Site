# VK_EXT_shader_tile_image(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_tile_image.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_tile_image](#VK_EXT_shader_tile_image)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_tile_image - device extension

**Name String**

`VK_EXT_shader_tile_image`

**Extension Type**

Device extension

**Registered Extension Number**

396

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_tile_image](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_tile_image.html)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_tile_image] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_shader_tile_image extension*)

**Extension Proposal**

[VK_EXT_shader_tile_image](../../../../features/latest/features/proposals/VK_EXT_shader_tile_image.html)

**Last Modified Date**

2023-03-23

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shader_tile_image`](https://raw.githubusercontent.com/KhronosGroup/GLSL/main/extensions/ext/GLSL_EXT_shader_tile_image.txt)

**Contributors**

* 
Sandeep Kakarlapudi, Arm

* 
Jan-Harald Fredriksen, Arm

* 
James Fitzpatrick, Imagination

* 
Andrew Garrard, Imagination

* 
Jeff Leger, Qualcomm

* 
Huilong Wang, Huawei

* 
Graeme Leese, Broadcom

* 
Hans-Kristian Arntzen, Valve

* 
Tobias Hector, AMD

* 
Jeff Bolz, NVIDIA

* 
Shahbaz Youssefi, Google

This extension allows fragment shader invocations to read color, depth, and
stencil values at their pixel location in rasterization order.
The functionality is only available when using dynamic render passes
introduced by VK_KHR_dynamic_rendering.
Example use cases are programmable blending and deferred shading.

See [fragment shader tile image reads](../../../../spec/latest/chapters/fragops.html#fragops-shader-tileimage-reads) for
more information.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderTileImageFeaturesEXT](VkPhysicalDeviceShaderTileImageFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderTileImagePropertiesEXT](VkPhysicalDeviceShaderTileImagePropertiesEXT.html)

* 
`VK_EXT_SHADER_TILE_IMAGE_EXTENSION_NAME`

* 
`VK_EXT_SHADER_TILE_IMAGE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_PROPERTIES_EXT](VkStructureType.html)

None.

Color read example.

layout( location = 0 /* aliased to color attachment 0 */ ) tileImageEXT highp attachmentEXT color0;
layout( location = 1 /* aliased to color attachment 1 */ ) tileImageEXT highp attachmentEXT color1;

layout( location = 0 ) out vec4 fragColor;

void main()
{
    vec4 value = colorAttachmentReadEXT(color0) + colorAttachmentReadEXT(color1);
    fragColor = value;
}

Depth & Stencil read example.

void main()
{
    // read sample 0: works for non-MSAA or MSAA targets
    highp float last_depth = depthAttachmentReadEXT();
    lowp uint last_stencil = stencilAttachmentReadEXT();

    //..
}

* 
Revision 1, 2023-03-23 (Sandeep Kakarlapudi)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_tile_image).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
