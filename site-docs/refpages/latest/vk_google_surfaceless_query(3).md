# VK_GOOGLE_surfaceless_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_GOOGLE_surfaceless_query.html

## Table of Contents

- [Name](#_name)
- [VK_GOOGLE_surfaceless_query](#VK_GOOGLE_surfaceless_query)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_GOOGLE_surfaceless_query - instance extension

**Name String**

`VK_GOOGLE_surfaceless_query`

**Extension Type**

Instance extension

**Registered Extension Number**

434

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_GOOGLE_surfaceless_query] @syoussefi%0A*Here describe the issue or question you have about the VK_GOOGLE_surfaceless_query extension*)

**Extension Proposal**

[VK_GOOGLE_surfaceless_query](../../../../features/latest/features/proposals/VK_GOOGLE_surfaceless_query.html)

**Last Modified Date**

2022-08-03

**IP Status**

No known IP claims.

**Contributors**

* 
Ian Elliott, Google

* 
Shahbaz Youssefi, Google

* 
James Jones, NVIDIA

This extension allows the [vkGetPhysicalDeviceSurfaceFormatsKHR](vkGetPhysicalDeviceSurfaceFormatsKHR.html) and
[vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html) functions to accept
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) as their `surface` parameter, allowing potential
surface formats, color spaces and present modes to be queried without
providing a surface.
Identically, [vkGetPhysicalDeviceSurfaceFormats2KHR](vkGetPhysicalDeviceSurfaceFormats2KHR.html),
[vkGetPhysicalDeviceSurfacePresentModes2EXT](vkGetPhysicalDeviceSurfacePresentModes2EXT.html), and
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html) would accept
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) in
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface`.
**This can only be supported on platforms where the results of these queries
are surface-agnostic and a single presentation engine is the implicit target
of all present operations**.

* 
`VK_GOOGLE_SURFACELESS_QUERY_EXTENSION_NAME`

* 
`VK_GOOGLE_SURFACELESS_QUERY_SPEC_VERSION`

* 
Revision 1, 2021-12-14 (Shahbaz Youssefi)

Internal revisions

Revision 2, 2022-08-03 (Shahbaz Youssefi)

* 
Precisions to which parts of the query responses are defined when
surfaceless

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_GOOGLE_surfaceless_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
