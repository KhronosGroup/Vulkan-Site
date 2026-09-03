# VK_MVK_macos_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MVK_macos_surface.html

## Table of Contents

- [Name](#_name)
- [VK_MVK_macos_surface](#VK_MVK_macos_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecation by VK_EXT_metal_surface](#_deprecation_by_vk_ext_metal_surface)
- [Deprecation_by_VK_EXT_metal_surface](#_deprecation_by_vk_ext_metal_surface)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MVK_macos_surface - instance extension

**Name String**

`VK_MVK_macos_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

124

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Deprecation State**

* 
*Deprecated* by
[VK_EXT_metal_surface](VK_EXT_metal_surface.html)
extension

**Contact**

* 
Bill Hollings [billhollings](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_MVK_macos_surface] @billhollings%0A*Here describe the issue or question you have about the VK_MVK_macos_surface extension*)

**Last Modified Date**

2020-07-31

**IP Status**

No known IP claims.

**Contributors**

* 
Bill Hollings, The Brenwill Workshop Ltd.

The `VK_MVK_macos_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) based on an `NSView`, the native
surface type of macOS, which is underpinned by a `CAMetalLayer`, to
support rendering to the surface using Apple’s Metal framework.

The `VK_MVK_macos_surface` extension is considered deprecated and has been
superseded by the `[VK_EXT_metal_surface](VK_EXT_metal_surface.html)` extension.

* 
[vkCreateMacOSSurfaceMVK](vkCreateMacOSSurfaceMVK.html)

* 
[VkMacOSSurfaceCreateInfoMVK](VkMacOSSurfaceCreateInfoMVK.html)

* 
[VkMacOSSurfaceCreateFlagsMVK](VkMacOSSurfaceCreateFlagsMVK.html)

* 
`VK_MVK_MACOS_SURFACE_EXTENSION_NAME`

* 
`VK_MVK_MACOS_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MACOS_SURFACE_CREATE_INFO_MVK](VkStructureType.html)

* 
Revision 1, 2017-02-15 (Bill Hollings)

Initial draft.

Revision 2, 2017-02-24 (Bill Hollings)

* 
Minor syntax fix to emphasize firm requirement for `NSView` to be
backed by a `CAMetalLayer`.

Revision 3, 2020-07-31 (Bill Hollings)

* 
Update documentation on requirements for `NSView`.

* 
Mark as deprecated by `VK_EXT_metal_surface`.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_MVK_macos_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
