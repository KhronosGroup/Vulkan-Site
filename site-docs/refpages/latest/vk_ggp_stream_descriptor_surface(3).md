# VK_GGP_stream_descriptor_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_GGP_stream_descriptor_surface.html

## Table of Contents

- [Name](#_name)
- [VK_GGP_stream_descriptor_surface](#VK_GGP_stream_descriptor_surface)
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

VK_GGP_stream_descriptor_surface - instance extension

**Name String**

`VK_GGP_stream_descriptor_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

50

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Jean-Francois Roy [jfroy](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_GGP_stream_descriptor_surface] @jfroy%0A*Here describe the issue or question you have about the VK_GGP_stream_descriptor_surface extension*)

**Last Modified Date**

2019-01-28

**IP Status**

No known IP claims.

**Contributors**

* 
Jean-Francois Roy, Google

* 
Brad Grantham, Google

* 
Connor Smith, Google

* 
Cort Stratton, Google

* 
Hai Nguyen, Google

* 
Ian Elliott, Google

* 
Jesse Hall, Google

* 
Jim Ray, Google

* 
Katherine Wu, Google

* 
Kaye Mason, Google

* 
Kuangye Guo, Google

* 
Mark Segal, Google

* 
Nicholas Vining, Google

* 
Paul Lalonde, Google

* 
Richard O’Grady, Google

The `VK_GGP_stream_descriptor_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to a Google Games
Platform `GgpStreamDescriptor`.

* 
[vkCreateStreamDescriptorSurfaceGGP](vkCreateStreamDescriptorSurfaceGGP.html)

* 
[VkStreamDescriptorSurfaceCreateInfoGGP](VkStreamDescriptorSurfaceCreateInfoGGP.html)

* 
[VkStreamDescriptorSurfaceCreateFlagsGGP](VkStreamDescriptorSurfaceCreateFlagsGGP.html)

* 
`VK_GGP_STREAM_DESCRIPTOR_SURFACE_EXTENSION_NAME`

* 
`VK_GGP_STREAM_DESCRIPTOR_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_STREAM_DESCRIPTOR_SURFACE_CREATE_INFO_GGP](VkStructureType.html)

* 
Revision 1, 2018-11-26 (Jean-Francois Roy)

Initial revision.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_GGP_stream_descriptor_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
