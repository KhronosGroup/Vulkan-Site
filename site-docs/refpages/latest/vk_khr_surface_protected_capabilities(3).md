# VK_KHR_surface_protected_capabilities(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_surface_protected_capabilities.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_surface_protected_capabilities](#VK_KHR_surface_protected_capabilities)
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

VK_KHR_surface_protected_capabilities - instance extension

**Name String**

`VK_KHR_surface_protected_capabilities`

**Extension Type**

Instance extension

**Registered Extension Number**

240

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

**Contact**

* 
Sandeep Shinde [sashinde](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_surface_protected_capabilities] @sashinde%0A*Here describe the issue or question you have about the VK_KHR_surface_protected_capabilities extension*)

**Last Modified Date**

2018-12-18

**IP Status**

No known IP claims.

**Contributors**

* 
Sandeep Shinde, NVIDIA

* 
James Jones, NVIDIA

* 
Daniel Koch, NVIDIA

This extension extends [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html), providing
applications a way to query whether swapchains **can** be created with the
[VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) flag set.

Vulkan 1.1 added (optional) support for protect memory and protected
resources including buffers ([VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)), images
([VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html)), and swapchains
([VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)).
However, on implementations which support multiple windowing systems, not
all window systems **may** be able to provide a protected display path.

This extension provides a way to query if a protected swapchain created for
a surface (and thus a specific windowing system) **can** be displayed on
screen.
It extends the existing [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) structure with a new
[VkSurfaceProtectedCapabilitiesKHR](VkSurfaceProtectedCapabilitiesKHR.html) structure from which the application
**can** obtain information about support for protected swapchain creation
through [vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html).

* 
Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

[VkSurfaceProtectedCapabilitiesKHR](VkSurfaceProtectedCapabilitiesKHR.html)

* 
`VK_KHR_SURFACE_PROTECTED_CAPABILITIES_EXTENSION_NAME`

* 
`VK_KHR_SURFACE_PROTECTED_CAPABILITIES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SURFACE_PROTECTED_CAPABILITIES_KHR](VkStructureType.html)

* 
Revision 1, 2018-12-18 (Sandeep Shinde, Daniel Koch)

Internal revisions.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_surface_protected_capabilities).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
