# VK_EXT_metal_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_metal_surface.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_metal_surface](#VK_EXT_metal_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_metal_surface - instance extension

**Name String**

`VK_EXT_metal_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

218

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Dzmitry Malyshau [kvark](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_metal_surface] @kvark%0A*Here describe the issue or question you have about the VK_EXT_metal_surface extension*)

**Last Modified Date**

2018-10-01

**IP Status**

No known IP claims.

**Contributors**

* 
Dzmitry Malyshau, Mozilla Corp.

The `VK_EXT_metal_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) from `CAMetalLayer`, which is
the native rendering surface of Apple’s Metal framework.

* 
`CAMetalLayer`

* 
[vkCreateMetalSurfaceEXT](vkCreateMetalSurfaceEXT.html)

* 
[VkMetalSurfaceCreateInfoEXT](VkMetalSurfaceCreateInfoEXT.html)

* 
[VkMetalSurfaceCreateFlagsEXT](VkMetalSurfaceCreateFlagsEXT.html)

* 
`VK_EXT_METAL_SURFACE_EXTENSION_NAME`

* 
`VK_EXT_METAL_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_METAL_SURFACE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2018-10-01 (Dzmitry Malyshau)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_metal_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
