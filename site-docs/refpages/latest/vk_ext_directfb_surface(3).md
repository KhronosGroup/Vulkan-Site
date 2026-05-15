# VK_EXT_directfb_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_directfb_surface.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_directfb_surface](#VK_EXT_directfb_surface)
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

VK_EXT_directfb_surface - instance extension

**Name String**

`VK_EXT_directfb_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

347

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Nicolas Caramelli [caramelli](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_directfb_surface] @caramelli%0A*Here describe the issue or question you have about the VK_EXT_directfb_surface extension*)

**Last Modified Date**

2020-06-16

**IP Status**

No known IP claims.

**Contributors**

* 
Nicolas Caramelli

The `VK_EXT_directfb_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to a DirectFB
`IDirectFBSurface`, as well as a query to determine support for rendering
via DirectFB.

* 
[vkCreateDirectFBSurfaceEXT](vkCreateDirectFBSurfaceEXT.html)

* 
[vkGetPhysicalDeviceDirectFBPresentationSupportEXT](vkGetPhysicalDeviceDirectFBPresentationSupportEXT.html)

* 
[VkDirectFBSurfaceCreateInfoEXT](VkDirectFBSurfaceCreateInfoEXT.html)

* 
[VkDirectFBSurfaceCreateFlagsEXT](VkDirectFBSurfaceCreateFlagsEXT.html)

* 
`VK_EXT_DIRECTFB_SURFACE_EXTENSION_NAME`

* 
`VK_EXT_DIRECTFB_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DIRECTFB_SURFACE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2020-06-16 (Nicolas Caramelli)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_directfb_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
