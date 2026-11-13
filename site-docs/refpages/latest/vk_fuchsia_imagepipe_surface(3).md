# VK_FUCHSIA_imagepipe_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_FUCHSIA_imagepipe_surface.html

## Table of Contents

- [Name](#_name)
- [VK_FUCHSIA_imagepipe_surface](#VK_FUCHSIA_imagepipe_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_FUCHSIA_imagepipe_surface - instance extension

**Name String**

`VK_FUCHSIA_imagepipe_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

215

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Craig Stout [cdotstout](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_FUCHSIA_imagepipe_surface] @cdotstout%0A*Here describe the issue or question you have about the VK_FUCHSIA_imagepipe_surface extension*)

**Last Modified Date**

2018-07-27

**IP Status**

No known IP claims.

**Contributors**

* 
Craig Stout, Google

* 
Ian Elliott, Google

* 
Jesse Hall, Google

The `VK_FUCHSIA_imagepipe_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to a Fuchsia
`imagePipeHandle`.

* 
[vkCreateImagePipeSurfaceFUCHSIA](vkCreateImagePipeSurfaceFUCHSIA.html)

* 
[VkImagePipeSurfaceCreateInfoFUCHSIA](VkImagePipeSurfaceCreateInfoFUCHSIA.html)

* 
[VkImagePipeSurfaceCreateFlagsFUCHSIA](VkImagePipeSurfaceCreateFlagsFUCHSIA.html)

* 
`VK_FUCHSIA_IMAGEPIPE_SURFACE_EXTENSION_NAME`

* 
`VK_FUCHSIA_IMAGEPIPE_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGEPIPE_SURFACE_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
Revision 1, 2018-07-27 (Craig Stout)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_FUCHSIA_imagepipe_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
