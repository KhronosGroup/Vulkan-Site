# VK_NN_vi_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NN_vi_surface.html

## Table of Contents

- [Name](#_name)
- [VK_NN_vi_surface](#VK_NN_vi_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NN_vi_surface - instance extension

**Name String**

`VK_NN_vi_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

63

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Mathias Heyer mheyer

**Last Modified Date**

2016-12-02

**IP Status**

No known IP claims.

**Contributors**

* 
Mathias Heyer, NVIDIA

* 
Michael Chock, NVIDIA

* 
Yasuhiro Yoshioka, Nintendo

* 
Daniel Koch, NVIDIA

The `VK_NN_vi_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) associated with an
`nn`::`vi`::`Layer`.

* 
[vkCreateViSurfaceNN](vkCreateViSurfaceNN.html)

* 
[VkViSurfaceCreateInfoNN](VkViSurfaceCreateInfoNN.html)

* 
[VkViSurfaceCreateFlagsNN](VkViSurfaceCreateFlagsNN.html)

* 
`VK_NN_VI_SURFACE_EXTENSION_NAME`

* 
`VK_NN_VI_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_VI_SURFACE_CREATE_INFO_NN](VkStructureType.html)

1) Does VI need a way to query for compatibility between a particular
physical device (and queue family?) and a specific VI display?

**RESOLVED**: No.
It is currently always assumed that the device and display will always be
compatible.

2) [VkViSurfaceCreateInfoNN](VkViSurfaceCreateInfoNN.html)::`window` is intended to store an
`nn`::`vi`::`NativeWindowHandle`, but its declared type is a bare
`void*` to store the window handle.
Why the discrepancy?

**RESOLVED**: It is for C compatibility.
The definition for the VI native window handle type is defined inside the
`nn`::`vi` C++ namespace.
This prevents its use in C source files.
`nn`::`vi`::`NativeWindowHandle` is always defined to be
`void*`, so this extension uses `void*` to match.

* 
Revision 1, 2016-12-2 (Michael Chock)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NN_vi_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
