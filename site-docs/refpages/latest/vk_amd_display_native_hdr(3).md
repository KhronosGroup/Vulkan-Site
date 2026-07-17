# VK_AMD_display_native_hdr(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_display_native_hdr.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_display_native_hdr](#VK_AMD_display_native_hdr)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_display_native_hdr - device extension

**Name String**

`VK_AMD_display_native_hdr`

**Extension Type**

Device extension

**Registered Extension Number**

214

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Matthaeus G. Chajdas [anteru](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_display_native_hdr] @anteru%0A*Here describe the issue or question you have about the VK_AMD_display_native_hdr extension*)

**Last Modified Date**

2018-12-18

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Aaron Hagan, AMD

* 
Aric Cyr, AMD

* 
Timothy Lottes, AMD

* 
Derrick Owens, AMD

* 
Daniel Rakos, AMD

This extension introduces the following display native HDR features to
Vulkan:

* 
A new [VkColorSpaceKHR](VkColorSpaceKHR.html) enum for setting the native display color
space.
For example, this color space would be set by the swapchain to use the
native color space in Freesync2 displays.

* 
Local dimming control

* 
[vkSetLocalDimmingAMD](vkSetLocalDimmingAMD.html)

* 
Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

[VkDisplayNativeHdrSurfaceCapabilitiesAMD](VkDisplayNativeHdrSurfaceCapabilitiesAMD.html)

Extending [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

* 
[VkSwapchainDisplayNativeHdrCreateInfoAMD](VkSwapchainDisplayNativeHdrCreateInfoAMD.html)

* 
`VK_AMD_DISPLAY_NATIVE_HDR_EXTENSION_NAME`

* 
`VK_AMD_DISPLAY_NATIVE_HDR_SPEC_VERSION`

* 
Extending [VkColorSpaceKHR](VkColorSpaceKHR.html):

[VK_COLOR_SPACE_DISPLAY_NATIVE_AMD](VkColorSpaceKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DISPLAY_NATIVE_HDR_SURFACE_CAPABILITIES_AMD](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_DISPLAY_NATIVE_HDR_CREATE_INFO_AMD](VkStructureType.html)

None.

None.

* 
Revision 1, 2018-12-18 (Daniel Rakos)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_display_native_hdr).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
