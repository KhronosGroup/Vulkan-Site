# VK_EXT_non_seamless_cube_map(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_non_seamless_cube_map.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_non_seamless_cube_map](#VK_EXT_non_seamless_cube_map)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_non_seamless_cube_map - device extension

**Name String**

`VK_EXT_non_seamless_cube_map`

**Extension Type**

Device extension

**Registered Extension Number**

423

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Uses**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Georg Lehmann [DadSchoorse](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_non_seamless_cube_map] @DadSchoorse%0A*Here describe the issue or question you have about the VK_EXT_non_seamless_cube_map extension*)

**Extension Proposal**

[VK_EXT_non_seamless_cube_map](../../../../features/latest/features/proposals/VK_EXT_non_seamless_cube_map.html)

**Last Modified Date**

2021-09-04

**IP Status**

No known IP claims.

**Contributors**

* 
Georg Lehmann

This extension provides functionality to disable [cube map edge handling](../../../../spec/latest/chapters/textures.html#textures-cubemapedge) on a per sampler level which matches the behavior
of other graphics APIs.

This extension may be useful for building translation layers for those APIs
or for porting applications that rely on this cube map behavior.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT](VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT.html)

* 
`VK_EXT_NON_SEAMLESS_CUBE_MAP_EXTENSION_NAME`

* 
`VK_EXT_NON_SEAMLESS_CUBE_MAP_SPEC_VERSION`

* 
Extending [VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html):

[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](VkSamplerCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NON_SEAMLESS_CUBE_MAP_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2021-09-04 (Georg Lehmann)

First Version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_non_seamless_cube_map).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
